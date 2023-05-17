import { Sequelize } from "sequelize-typescript";
import { TemporaryAccountDetails } from "../models/TemporaryAccountDetails";
import { Transaction } from "../models/Transaction";
import { Wallet } from "../models/Wallet";

export const sequelize = new Sequelize({
    dialect: 'mysql',
    host : process.env.DB_HOST,
    port : parseInt(`${process.env.DB_PORT}`),
    username : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_NAME
});

sequelize.addModels([
    TemporaryAccountDetails,
    Wallet,
    Transaction
]);