
import { DataTypes, Model, Sequelize } from 'sequelize';
import {BaseMain} from "../baseMain";
import {BaseLecturerRelation} from "../lecturer/baseLecturerRelation";
import {BaseStudentRelation} from "../student/baseStudentRelation";


export interface RelationApplicationLectureStudent extends BaseStudentRelation {
    ApplicationLectureId: number;
}

export interface IRelationApplicationLectureStudentInstance extends Model<RelationApplicationLectureStudent>, RelationApplicationLectureStudent { }


export const RelationApplicationLectureStudent = (sequelize: Sequelize) =>
    sequelize.define<IRelationApplicationLectureStudentInstance>(
        "RelationApplicationLectureStudent",
        {
            Id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            StudentId: {
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


