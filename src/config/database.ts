import { Sequelize } from "sequelize-typescript";
import { User } from '../models/User';

export const sequelize = new Sequelize({
    dialect: 'mysql',
    host : process.env.DB_HOST,
    port : parseInt(`${process.env.DB_PORT}`),
    username : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_NAME
});

sequelize.addModels([
    User
]);