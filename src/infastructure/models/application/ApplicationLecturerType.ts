
import { DataTypes, Model, Sequelize } from 'sequelize';
import { ApplicationBase } from "./applicationBase";


export interface ApplicationLecturerType extends ApplicationBase {


}

export interface IApplicationLecturerTypeInstance extends Model<ApplicationLecturerType>, ApplicationLecturerType { }


export const ApplicationLecturerType = (sequelize: Sequelize) =>
    sequelize.define<IApplicationLecturerTypeInstance>(
        "ApplicationLecturerType",
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


