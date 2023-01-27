
import { DataTypes, Model, Sequelize } from 'sequelize';
import {BaseMain} from "../baseMain";
import {BaseLecturerRelation} from "../lecturer/baseLecturerRelation";


export interface RelationApplicationLectureLecturer extends BaseLecturerRelation {
    ApplicationLectureId: number;
}

export interface IRelationApplicationLectureLecturerInstance extends Model<RelationApplicationLectureLecturer>, RelationApplicationLectureLecturer { }


export const RelationApplicationLectureLecturer = (sequelize: Sequelize) =>
    sequelize.define<IRelationApplicationLectureLecturerInstance>(
        "RelationApplicationLectureLecturer",
        {
            Id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            LecturerId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            ApplicationLectureId: {
                type: DataTypes.INTEGER,
                allowNull: false,
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


