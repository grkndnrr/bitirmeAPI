import {Path, POST} from "typescript-rest";
import {BaseController} from "../baseController";
import {StudentRepository} from "../../infastructure/repositories/student/StudentRepository";
import {AuthDto} from "../../core/dto/AuthDto";
import {Tags} from "typescript-rest-swagger";
import {StudentLoginRequestDto} from "../../core/dto/student/request/StudentLoginRequestDto";
import {JwtResponseDto} from "../../core/dto/JwtResponseDto";
import {Login, Register} from "../../core/usecase/Student";
import {StudentRegisterRequestDto} from "../../core/dto/student/request/StudentRegisterRequestDto";

@Path('student')
export default class StudentController extends BaseController {

    studentRepository: StudentRepository = null;

    constructor(studentRepository?: StudentRepository, student?: AuthDto) {
        super(student);
        this.studentRepository = studentRepository;
    }
    @POST
    @Path('login')
    @Tags('Student')
    async login(req: StudentLoginRequestDto): Promise<JwtResponseDto> {
        const response = await Login(this.studentRepository, req);
        return response;
    }

    @POST
    @Path('')
    @Tags('Student')
    async register(req: StudentRegisterRequestDto): Promise<JwtResponseDto> {
        const response = await Register(this.studentRepository, req);
        return response;
    }

}