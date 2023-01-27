
import { DataTypes, Model, Sequelize } from 'sequelize';
import {BaseMain} from "../baseMain";
import {StudentType} from "../../../helper/enums";


export interface Student extends BaseMain {
    StudentType: number;
    OrganizationId: string;

}

export interface IStudentInstance extends Model<Student>, Student {

}


export const Student = (sequelize: Sequelize) =>
    sequelize.define<IStudentInstance>(
        "Student",
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
            OrganizationId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            FullName: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            StudentType: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: StudentType.First
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


