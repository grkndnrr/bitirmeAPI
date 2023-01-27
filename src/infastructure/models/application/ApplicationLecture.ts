
import { DataTypes, Model, Sequelize } from 'sequelize';
import { ApplicationBase } from "./applicationBase";


export interface ApplicationLecture extends ApplicationBase {


}

export interface IApplicationLectureInstance extends Model<ApplicationLecture>, ApplicationLecture { }


export const ApplicationLecture = (sequelize: Sequelize) =>
    sequelize.define<IApplicationLectureInstance>(
        "ApplicationLecture",
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


