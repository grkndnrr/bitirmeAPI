import {IRepositoryInstance} from "../IRepositoryInstance";
import {StudentLoginResponseDto} from "../../../core/dto/student/response/StudentLoginResponseDto";
import {StudentLoginRequestDto} from "../../../core/dto/student/request/StudentLoginRequestDto";
import {connect} from "../../database";
import Utils from "../../../helper/utils";
import CreateError from 'http-errors';
import {ErrorCodes, HTTP_STATES} from "../../../helper/enums";
import moment from "moment";
import {StudentRegisterRequestDto} from "../../../core/dto/student/request/StudentRegisterRequestDto";
interface IStudentRepository extends IRepositoryInstance {
    register( request: StudentRegisterRequestDto ): Promise< StudentLoginResponseDto >
    login(request: StudentLoginRequestDto): Promise< StudentLoginResponseDto >

}

export class StudentRepository implements IStudentRepository{
    async login(request: StudentLoginRequestDto): Promise<StudentLoginResponseDto> {
        const { Student } = await connect();
        const student = await Student.findOne({
            where: {
                OrganizationId: request.studentId,
                Password: Utils.hash256(request.password),
                IsDeleted: false,
            },
            attributes: ["FullName", "UniqueKey"]
        }) // Select FullName, UniqueKey from Student where OrganizationId = $studentId and Password = $hashed and IsDeleted = false limit 1;

        if (!student) throw new CreateError(400, ErrorCodes.StudentNotFound)
        const validHours =  24
        const expDate = moment().utc().add(validHours, 'hours');
        return new StudentLoginResponseDto(
            student.FullName,
            student.UniqueKey,
            expDate.toDate(),
            `${validHours}h`
        )
    }

    async register( request: StudentRegisterRequestDto ): Promise< StudentLoginResponseDto >{
        const { Student } = await connect();
        const entryCount = await Student.count(
            {
                where: {
                    OrganizationId: request.studentId
                }
            }
        );
        if ( entryCount > 0 ) throw new CreateError( HTTP_STATES.DEFAULT_ERROR, ErrorCodes.StudentExists );

        const student = await Student.create(
            {
                OrganizationId: request.studentId,
                Password: Utils.hash256( request.password ),
                UniqueKey: Utils.uuid(),
                StudentType: request.studentType
            }
        );
        const validHours =  24
        const expDate = moment().utc().add(validHours, 'hours');
        return new StudentLoginResponseDto(
            student.FullName,
            student.UniqueKey,
            expDate.toDate(),
            `${validHours}h`
        )
    }

}