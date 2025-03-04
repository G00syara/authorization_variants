import { startAuthentication, startRegistration } from '@simplewebauthn/browser';
import axios, { AxiosError } from 'axios';
import React, { useState } from 'react';

const backendUrl = process.env.REACT_APP_BACKEND_URL;

const WebAuthLogin: React.FC = () => {
  const [inputEmail, setInputEmail] = useState('');
  const [isRegistration, setIsRegistration] = useState(false);

  const registration = async () => {
    if (!inputEmail) return alert('Поле почта пустое');

    let optionsJSON;

    try {
      const response = await axios.post(
        `${backendUrl}webAuth/generate-registration-options`,
        {
          email: inputEmail,
        },
        { withCredentials: true },
      );

      optionsJSON = response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        alert(`Ошибка: ${error.response?.data?.error || error.message}`);
        return;
      } else {
        alert(`Ошибка: ${String(error)}`);
        return;
      }
    }

    let attResp;
    try {
      attResp = await startRegistration({ optionsJSON });
    } catch (error) {
      if (error instanceof AxiosError) {
        alert(`Ошибка: ${error.response?.data?.error || error.message}`);
        return;
      } else {
        alert(`Ошибка: ${String(error)}`);
        return;
      }
    }

    let verificationJSON;

    try {
      const verificationResp = await axios.post(
        `${backendUrl}webAuth/verify-registration`,
        {
          attResp,
        },
        { withCredentials: true },
      );
      verificationJSON = verificationResp.data;
    } catch (error) {
      alert(`Ошибка: ${String(error)}`);
      return;
    }
    if (verificationJSON && verificationJSON.verified) {
      setIsRegistration(true);
      alert('Success!');
      return;
    } else {
      alert(`Oh no, something went wrong! Response: ${JSON.stringify(verificationJSON)}`);
      return;
    }
  };

  const login = async () => {
    if (!inputEmail) return alert('Поле почта пустое');

    if (!isRegistration) return alert('Вы ещё не зарегистрировались');

    let options;

    try {
      const response = await axios.post(
        `${backendUrl}webAuth/init-auth`,
        {
          email: inputEmail,
        },
        { withCredentials: true },
      );

      options = response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        alert(`Ошибка: ${error.response?.data?.error || error.message}`);
        return;
      } else {
        alert(`Ошибка: ${String(error)}`);
        return;
      }
    }

    const authJSON = await startAuthentication(options);

    let optionsVer;

    try {
      const response = await axios.post(
        `${backendUrl}webAuth/verify-auth`,
        {
          authJSON,
        },
        { withCredentials: true },
      );

      optionsVer = response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        alert(`Ошибка: ${error.response?.data?.error || error.message}`);
        return;
      } else {
        alert(`Ошибка: ${String(error)}`);
        return;
      }
    }

    if (optionsVer && optionsVer.verified) {
      alert('Success!');
    } else {
      alert(`Oh no, something went wrong! Response: ${JSON.stringify(optionsVer)}`);
      return;
    }
  };
  return (
    <>
      <input
        value={inputEmail}
        style={{ color: 'black' }}
        onChange={(e) => setInputEmail(e.target.value)}
        placeholder="Введите email"
      />
      <button onClick={() => login()}>Авторизоваться</button>
      <button onClick={() => registration()}>Зарегистрироваться</button>
    </>
  );
};

export default WebAuthLogin;
