import {Path, POST} from "typescript-rest";
import {BaseController} from "../baseController";
import {LecturerRepository} from "../../infastructure/repositories/lecturer/LecturerRepository";
import {AuthDto} from "../../core/dto/AuthDto";
import {Tags} from "typescript-rest-swagger";
import {LecturerLoginRequestDto} from "../../core/dto/lecturer/request/LecturerLoginRequestDto";
import {JwtResponseDto} from "../../core/dto/JwtResponseDto";
import {Login, Register} from "../../core/usecase/Lecturer";
import {LecturerRegisterRequestDto} from "../../core/dto/lecturer/request/LecturerRegisterRequestDto";

@Path('lecturer')
export default class LecturerController extends BaseController {

    lecturerRepository: LecturerRepository = null;

    constructor(lecturerRepository?: LecturerRepository, lecturer?: AuthDto) {
        super(lecturer);
        this.lecturerRepository = lecturerRepository;
    }
    @POST
    @Path('login')
    @Tags('Lecturer')
    async login(req: LecturerLoginRequestDto): Promise<JwtResponseDto> {
        const response = await Login(this.lecturerRepository, req);
        return response;
    }

    @POST
    @Path('')
    @Tags('Lecturer')
    async register(req: LecturerRegisterRequestDto): Promise<JwtResponseDto> {
        const response = await Register(this.lecturerRepository, req);
        return response;
    }

}