
import { DataTypes, Model, Sequelize } from 'sequelize';
import {BaseMain} from "../baseMain";


export interface Lecturer extends BaseMain {
    Email: string;
    ApplicationLecturerTypeId: number;


}

export interface ILecturerInstance extends Model<Lecturer>, Lecturer { }


export const Lecturer = (sequelize: Sequelize) =>
    sequelize.define<ILecturerInstance>(
        "Lecturer",
        {

            Id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            UniqueKey: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            Password: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            Email: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            ApplicationLecturerTypeId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            FullName: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            IsDeleted: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
                allowNull: true,
            },
            InsertedDate: {
                type: DataTypes.DATE,
                allowNull: true,
                defaultValue: DataTypes.NOW,
            },
            DeletedDate: {
                type: DataTypes.DATE,
                allowNull: true,
            },
        },
        {
            freezeTableName: true,
            createdAt: false,
            updatedAt: false,
        }
    );


