import { Sequelize, DataTypes, Model } from 'sequelize';

const sequelize = new Sequelize('postgres://postgres:postgres@localhost:5432/authorizationDB');

interface UserInstance extends Model {
  id: number;
  username: string;
  password: string;
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

sequelize
  .sync()
  .then(() => {
    console.log('База данных синхронизирована, таблица User создана');
  })
  .catch((error) => {
    console.error('Ошибка при синхронизации базы данных:', error);
  });

export { sequelize, User, ProtectedUser };
