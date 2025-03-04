import {
  AuthenticationResponseJSON,
  generateAuthenticationOptions,
  generateRegistrationOptions,
  verifyAuthenticationResponse,
  verifyRegistrationResponse,
} from '@simplewebauthn/server';
import dotenv from 'dotenv';
import { Context } from 'koa';

import { WebAuthService } from '../services/webAuthService';

dotenv.config();

const CLIENT_URL = process.env.CLIENT_URL ?? 'http://localhost:3000';
const RP_ID = process.env.RP_ID ?? 'localhost';

export const generateRegistary = async (ctx: Context) => {
  const { email } = ctx.request.body as any;
  if (!email) {
    ctx.status = 400;
    ctx.body = { error: 'email is required' };
    return;
  }

  const options = await generateRegistrationOptions({
    rpID: RP_ID,
    rpName: 'Authorization_variants',
    userName: email,
    authenticatorSelection: {
      userVerification: 'required',
      residentKey: 'required',
    },
  });

  ctx.cookies.set(
    'regInfo',
    JSON.stringify({
      userId: options.user.id,
      email,
      challenge: options.challenge,
    }),
    { httpOnly: true, maxAge: 60000, sameSite: false, secure: false },
  );

  ctx.body = options;
};

export const verifyRegistary = async (ctx: Context) => {
  const regInfo = JSON.parse(ctx.cookies.get('regInfo') as string);

  if (!regInfo) {
    ctx.status = 400;
    ctx.body = { error: 'Registration info not found' };
    return;
  }

  const { attResp } = ctx.request.body as any;

  const verification = (await verifyRegistrationResponse({
    response: attResp,
    expectedChallenge: regInfo.challenge,
    expectedOrigin: CLIENT_URL,
    expectedRPID: RP_ID,
    requireUserVerification: true,
  })) as any;

  const regInfoVer = verification.registrationInfo;

  if (verification.verified) {
    WebAuthService.createUser(regInfo.userId, regInfo.email, {
      credentialID: regInfoVer?.credential.id,
      credentialPublicKey: Buffer.from(regInfoVer?.credential.publicKey),
      counter: regInfoVer?.credential.counter,
      credentialDeviceType: regInfoVer?.credentialDeviceType,
      credentialBackedUp: regInfoVer?.credentialBackedUp,
      transport: JSON.stringify(regInfoVer?.credential.transports),
    });
    ctx.cookies.set('regInfo', '', { httpOnly: true, maxAge: 0 });
    ctx.body = { verified: verification.verified };
  } else {
    ctx.status = 400;
    ctx.body = { verified: false, error: 'Verification failed' };
    return;
  }
};

export const verifyLogin = async (ctx: Context) => {
  const authInfo = JSON.parse(ctx.cookies.get('authInfo') as string);

  if (!authInfo) {
    ctx.status = 400;
    ctx.body = { error: 'Authentication info not found' };
    return;
  }

  const user = await WebAuthService.getUserById(authInfo.userId);

  if (user == null || user.credentialID != (ctx.request.body as any).authJSON.id) {
    ctx.status = 400;
    ctx.body = { error: 'Invalid user' };
    return;
  }

  const verification = await verifyAuthenticationResponse({
    response: (ctx.request.body as any).authJSON as AuthenticationResponseJSON,
    expectedChallenge: authInfo.challenge,
    expectedOrigin: CLIENT_URL,
    expectedRPID: RP_ID,
    credential: {
      id: user.credentialID,
      publicKey: new Uint8Array(user.credentialPublicKey),
      counter: Number(user.counter),
      transports: JSON.parse(user.transport),
    },
  });

  if (verification.verified) {
    WebAuthService.updateUserCounter(user.username, verification.authenticationInfo.newCounter);
    ctx.cookies.set('authInfo', '', { httpOnly: true, maxAge: 0 });

    ctx.body = { verified: verification.verified };
  } else {
    ctx.status = 400;
    ctx.body = { verified: false, error: 'Verification failed' };
    return;
  }
};

export const initAuth = async (ctx: Context) => {
  const { email } = ctx.request.body as any;
  if (!email) {
    ctx.status = 400;
    ctx.body = { error: 'email is required' };
    return;
  }

  const user = await WebAuthService.getUserByEmail(email);
  if (user == null) {
    ctx.status = 400;
    ctx.body = { error: 'No user for this email' };
    return;
  }

  const options = await generateAuthenticationOptions({
    rpID: RP_ID,
    allowCredentials: [
      {
        id: user?.credentialID as string,
        transports: JSON.parse(user?.transport || ''),
      },
    ],
    userVerification: 'required',
  });

  ctx.cookies.set(
    'authInfo',
    JSON.stringify({
      userId: user?.credentialID,
      challenge: options.challenge,
    }),
    { httpOnly: true, maxAge: 60000, sameSite: false, secure: false },
  );

  ctx.body = options;
};
