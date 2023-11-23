import { Sequelize, DataTypes } from 'sequelize'

export const DBInit = () => {
  const sequelize = new Sequelize(
    '<your_db>',
    '<your_user>',
    '<your_pass>',
    {
      host: '<your_host>',
      dialect: 'mysql'
    }
  )

  sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.')
  }).catch((error) => {
    console.error('Unable to connect to the database: ', error)
  })

  // USER CREATE TABLE
  const Users = sequelize.define('USERS', {
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    last_login: {
      type: DataTypes.DATE
    }
  })

  const UserPhones = sequelize.define('user_phones', {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    number: {
      type: DataTypes.STRING,
      allowNull: false
    },
    ddd: {
      type: DataTypes.STRING,
      allowNull: false
    }
  })

  sequelize.sync().then(() => {
    console.log('tables created successfully!')
    sequelize.close()
  }).catch((error) => {
    console.error('Unable to create table : ', error)
  })
}
