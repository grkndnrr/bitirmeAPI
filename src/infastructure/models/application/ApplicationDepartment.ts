
import { DataTypes, Model, Sequelize } from 'sequelize';
import { ApplicationBase } from "./applicationBase";


export interface ApplicationDepartment extends ApplicationBase {


}

export interface IApplicationDepartmentInstance extends Model<ApplicationDepartment>, ApplicationDepartment { }


export const ApplicationDepartment = (sequelize: Sequelize) =>
    sequelize.define<IApplicationDepartmentInstance>(
        "ApplicationDepartment",
        {

            Id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            Value: {
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


