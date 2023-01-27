import {LecturerRepository} from "../../infastructure/repositories/lecturer/LecturerRepository";
import {LecturerLoginRequestDto} from "../dto/lecturer/request/LecturerLoginRequestDto";
import {JwtResponseDto} from "../dto/JwtResponseDto";
import process from "process";
import {sign} from "jsonwebtoken";
import {AuthType} from "../../helper/enums";
import {LecturerRegisterRequestDto} from "../dto/lecturer/request/LecturerRegisterRequestDto";

export const Login = async (
    lecturerRepository: LecturerRepository,
    req: LecturerLoginRequestDto
): Promise<JwtResponseDto> => {
    const { JWT_KEY } = process.env;
    const lecturerLoginResponse = await lecturerRepository.login(req);
    const token = sign(
        {
            uniqueKey: lecturerLoginResponse.uniqueKey,
            fullName: lecturerLoginResponse.fullName,
            type: AuthType.Lecturer,
        },
        JWT_KEY,
        {
            expiresIn: lecturerLoginResponse.expirationOption
        }
    );
    return new JwtResponseDto(token, lecturerLoginResponse.expirationDate);
}


export const Register = async (
    lecturerRepository: LecturerRepository,
    req: LecturerRegisterRequestDto
): Promise<JwtResponseDto> => {
    const { JWT_KEY } = process.env;
    const lecturerLoginResponse = await lecturerRepository.register(req);
    const token = sign(
        {
            uniqueKey: lecturerLoginResponse.uniqueKey,
            fullName: lecturerLoginResponse.fullName,
            type: AuthType.Lecturer,
        },
        JWT_KEY,
        {
            expiresIn: lecturerLoginResponse.expirationOption
        }
    );
    return new JwtResponseDto(token, lecturerLoginResponse.expirationDate);
}