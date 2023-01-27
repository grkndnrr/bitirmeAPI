import {IRepositoryInstance} from "../IRepositoryInstance";
import {LecturerLoginResponseDto} from "../../../core/dto/lecturer/response/LecturerLoginResponseDto";
import {LecturerLoginRequestDto} from "../../../core/dto/lecturer/request/LecturerLoginRequestDto";
import {connect} from "../../database";
import Utils from "../../../helper/utils";
import CreateError from 'http-errors';
import {ErrorCodes, HTTP_STATES} from "../../../helper/enums";
import moment from "moment";
import {StudentLoginResponseDto} from "../../../core/dto/student/response/StudentLoginResponseDto";
import {LecturerRegisterRequestDto} from "../../../core/dto/lecturer/request/LecturerRegisterRequestDto";
interface ILecturerRepository extends IRepositoryInstance {
    login(request: LecturerLoginRequestDto): Promise< LecturerLoginResponseDto >

}

export class LecturerRepository implements ILecturerRepository{
    async login(request: LecturerLoginRequestDto): Promise<LecturerLoginResponseDto> {
        const { Lecturer } = await connect();
        const lecturer = await Lecturer.findOne({
            where: {
                Email: request.email,
                Password: Utils.hash256(request.password),
                IsDeleted: false,
            },
            attributes: ["FullName", "UniqueKey"]
        }) // Select FullName, UniqueKey from Lecturer where OrganizationId = $lecturerId and Password = $hashed and IsDeleted = false limit 1;

        if (!lecturer) throw new CreateError(400, ErrorCodes.LecturerNotFound)
        const validHours =  24
        const expDate = moment().utc().add(validHours, 'hours');
        return new LecturerLoginResponseDto(
            lecturer.FullName,
            lecturer.UniqueKey,
            expDate.toDate(),
            `${validHours}h`
        )
    }

    async register( request: LecturerRegisterRequestDto ): Promise< StudentLoginResponseDto >{
        const { Lecturer } = await connect();
        const entryCount = await Lecturer.count(
            {
                where: {
                    Email: request.email
                }
            }
        );
        if ( entryCount > 0 ) throw new CreateError( HTTP_STATES.DEFAULT_ERROR, ErrorCodes.LecturerExists );

        const lecturer = await Lecturer.create(
            {
                Email: request.email,
                Password: Utils.hash256( request.password ),
                UniqueKey: Utils.uuid(),
                ApplicationLecturerTypeId: request.lecturerType,
                FullName: request.fullName,

            }
        );
        const validHours =  24
        const expDate = moment().utc().add(validHours, 'hours');
        return new StudentLoginResponseDto(
            lecturer.FullName,
            lecturer.UniqueKey,
            expDate.toDate(),
            `${validHours}h`
        )
    }



}