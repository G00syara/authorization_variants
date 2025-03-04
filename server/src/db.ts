import { Sequelize, DataTypes, Model } from 'sequelize';

const sequelize = new Sequelize('postgres://postgres:postgres@localhost:5432/authorizationDB');

interface UserInstance extends Model {
  id: number;
  username: string;
  password: string;
}

interface WebAuthInstance extends Model {
  id: number;
  username: string;
  credentialID: string;
  credentialPublicKey: Buffer;
  counter: string;
  credentialDeviceType: string;
  credentialBackedUp: string;
  transport: string;
  email: string;
}

const User = sequelize.define<UserInstance>('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const ProtectedUser = sequelize.define<UserInstance>('ProtectedUser', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const JWTUser = sequelize.define<UserInstance>('JWTUser', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const FullJwtUser = sequelize.define<UserInstance & { refreshToken: string | null }>('FullJwtUser', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  refreshToken: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

const CSRFUser = sequelize.define<UserInstance>('CSRFUser', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const WebAuth = sequelize.define<WebAuthInstance>('WebAuth', {
  username: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true,
  },
  credentialID: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  credentialPublicKey: {
    type: DataTypes.BLOB,
    allowNull: true,
  },
  counter: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  credentialDeviceType: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  credentialBackedUp: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  transport: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

sequelize
  .sync()
  .then(() => {
    console.log('База данных синхронизирована, таблица User создана');
  })
  .catch((error) => {
    console.error('Ошибка при синхронизации базы данных:', error);
  });

export { sequelize, User, ProtectedUser, JWTUser, FullJwtUser, CSRFUser, WebAuth };
