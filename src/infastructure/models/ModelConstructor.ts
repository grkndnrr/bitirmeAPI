import { Sequelize, Model, ModelStatic } from 'sequelize';
import {IStudentInstance, Student} from "./student/Student";
import {ILecturerInstance, Lecturer} from "./lecturer/Lecturer";
import {ApplicationLecture, IApplicationLectureInstance} from "./application/ApplicationLecture";
import {ApplicationLecturerType, IApplicationLecturerTypeInstance} from "./application/ApplicationLecturerType";
import {ApplicationDepartment, IApplicationDepartmentInstance} from "./application/ApplicationDepartment";
import {
    IRelationApplicationLectureLecturerInstance,
    RelationApplicationLectureLecturer
} from "./relation/RelationApplicationLectureLecturer";
import {
    IRelationApplicationLectureStudentInstance,
    RelationApplicationLectureStudent
} from "./relation/RelationApplicationLectureStudent";
import {Base} from "./base";

/**
 * Model Constructions
 */

class ISchemaSkeleton {
    Student: ModelStatic<IStudentInstance>;
    Lecturer: ModelStatic<ILecturerInstance>;

    RelationApplicationLectureLecturer: ModelStatic<IRelationApplicationLectureLecturerInstance>;
    RelationApplicationLectureStudent: ModelStatic<IRelationApplicationLectureStudentInstance>;

    ApplicationLecture: ModelStatic<IApplicationLectureInstance>;
    ApplicationLecturerType: ModelStatic<IApplicationLecturerTypeInstance>;
    ApplicationDepartment: ModelStatic<IApplicationDepartmentInstance>;

}
class SchemaSkeleton extends ISchemaSkeleton {
    Models;
    constructor() {
        super()
        this.Models = [
            Student,
            Lecturer,

            RelationApplicationLectureStudent,
            RelationApplicationLectureLecturer,

            ApplicationLecture,
            ApplicationLecturerType,
            ApplicationDepartment
        ]
    }
}
const generateModel = <Instance extends Model<Base>>(schema: ModelStatic<Instance>): Record<string, ModelStatic<Instance>> => {
    const record: Record<string, ModelStatic<Instance>> = {};
    const key = schema.tableName.includes("_")
        ? schema.tableName.replace("_", ".")
        : schema.tableName
    record[key] = schema;
    return record;
}
export const ModelGenerator = (sequelize: Sequelize): ISchemaSkeleton => {
    const schemaSkeleton = new SchemaSkeleton();
    let objectToAssign: ISchemaSkeleton;
    schemaSkeleton.Models.forEach((model: (sequelize: Sequelize) => ModelStatic<Model<Base>>) => {
        const modelInit = model(sequelize)
        objectToAssign = { ...objectToAssign, ...generateModel(modelInit) }
    })
    return objectToAssign;
}
