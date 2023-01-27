import ApiLogger from "../logger";
import {Sequelize, Dialect, ModelStatic} from 'sequelize';
import { ModelGenerator } from "./models/ModelConstructor";

const { SQL_HOST, SQL_USERNAME, SQL_PWD, SQL_DB, SQL_TYPE, SQL_PORT } = process.env;
// db connection
const sequelize = new Sequelize(SQL_DB, SQL_USERNAME, SQL_PWD, {
    host: SQL_HOST,
    port: parseInt(SQL_PORT),
    logging: (message) => {
        ApiLogger.log(message);
    },
    dialect: SQL_TYPE as Dialect,
    dialectOptions: {
        // ssl: {
        //     ca: fs.readFileSync('./ssl/BaltimoreCyberTrustRoot.crt.pem')
        // },
        supportBigNumbers: true,
        bigNumberStrings: true,
        // options: {
        //   encrypt: false,
        //   instanceName: SQL_INSTANCE,
        // },
    },
    pool: {
        max: 5,
        min: 0,
        idle: 10000,
    },
    retry: {
        match: [/Deadlock/i],
        max: 3,
    },
});

const Models = {
    ...ModelGenerator(sequelize)
};
export const connection: { isConnected: boolean, sequelize: Sequelize } = { isConnected: false, sequelize: null };
const ModelRelationships: Array<{
    /* eslint @typescript-eslint/no-explicit-any: "off" */
    schema: ModelStatic<any>;
    hasParent?: boolean;
    relations?: Array<{
        /* eslint @typescript-eslint/no-explicit-any: "off" */
        schema: ModelStatic<any>;
        foreignKey?: string;
        as?: string;
        manyAs?: string;
        targetKey?: string;
    }>
}> = [
    {
        schema: Models.ApplicationLecture,
        hasParent: true
    },

    {
        schema: Models.ApplicationDepartment,
        hasParent: true
    },

    {
        schema: Models.ApplicationLecturerType,
        hasParent: true
    },
    {
        schema: Models.Student,
        relations: [
            { schema: Models.RelationApplicationLectureStudent, foreignKey: "Id", as: "StudentRelationLecture", targetKey: "StudentId" }
        ]
    },
    {
        schema: Models.Lecturer,
        relations: [
            { schema: Models.RelationApplicationLectureLecturer, foreignKey: "Id", as: "LecturerRelationLecture", targetKey: "LecturerId" }
        ]
    },
    {
        schema: Models.RelationApplicationLectureLecturer,
        relations: [
            {
                schema: Models.Lecturer, foreignKey: "LecturerId", as: "RelationLectureLecturerLecturer"
            },
            {
                schema: Models.ApplicationLecture, foreignKey: "ApplicationLectureId", as: "RelationLectureLecturerApplication"
            }
        ]
    },
    {
        schema: Models.RelationApplicationLectureStudent,
        relations: [
            {
                schema: Models.Student, foreignKey: "LecturerId", as: "RelationLectureStudent"
            },
            {
                schema: Models.ApplicationLecture, foreignKey: "ApplicationLectureId", as: "RelationStudentLecture"
            }
        ]
    }

]
const relationshipInitialize = () => {
    ModelRelationships.forEach((mainTable) => {
        const table = mainTable.schema.tableName;
        if (mainTable.hasParent) {
            if (!mainTable.relations)
                mainTable.relations = [{ schema: Models[table], foreignKey: 'ParentId' }]
        }

        if (mainTable.relations) {
            mainTable.relations.forEach((relation) => {
                const relationTable = relation.schema.tableName;
                const options: {
                    foreignKey?: string,
                    as?: string,
                    targetKey?: string
                } = {}
                if (relation.foreignKey)
                    options.foreignKey = relation.foreignKey;
                else
                    options.foreignKey = `${relationTable}Id`;

                if (relation.as)
                    options.as = relation.as;

                if( relation.targetKey )
                    options.targetKey = relation.targetKey;

                Models[relationTable].hasMany(Models[table], relation.manyAs ? { ...options, as: relation.manyAs } : options);
                Models[table].belongsTo(Models[relationTable], options);
            });
        }
    });
}

export const connect = async () => {
    if (connection.isConnected) {
        ApiLogger.log('=> Using existing connection.');
        return Models;
    }
    relationshipInitialize();

    await sequelize.authenticate();
    connection.sequelize = sequelize;
    connection.isConnected = true;
    ApiLogger.log('=> Created a new connection.');
    return Models;
}