import { Table, Model, Column, DataType } from 'sequelize-typescript'

@Table
export class User extends Model{
    @Column({ type : DataType.INTEGER, allowNull : false, primaryKey : true, autoIncrement : true })
    public id!: number

    @Column({ type : DataType.STRING, allowNull : false })
    public name!: string
}