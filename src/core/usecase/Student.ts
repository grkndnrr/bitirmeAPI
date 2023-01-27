import process from "process";
import {StudentRepository} from "../../infastructure/repositories/student/StudentRepository";
import {StudentLoginRequestDto} from "../dto/student/request/StudentLoginRequestDto";
import {JwtResponseDto} from "../dto/JwtResponseDto";
import {sign} from "jsonwebtoken";
import {StudentRegisterRequestDto} from "../dto/student/request/StudentRegisterRequestDto";
import {AuthType} from "../../helper/enums";

export const Login = async (
    studentRepository: StudentRepository,
    req: StudentLoginRequestDto
): Promise<JwtResponseDto> => {
    const { JWT_KEY } = process.env;
    const studentLoginResponse = await studentRepository.login(req);
    const token = sign(
        {
            uniqueKey: studentLoginResponse.uniqueKey,
            fullName: studentLoginResponse.fullName,
            type: AuthType.Student,
        },
        JWT_KEY,
        {
            expiresIn: studentLoginResponse.expirationOption
        }
    );
    return new JwtResponseDto(token, studentLoginResponse.expirationDate);
}

export const Register = async (
    studentRepository: StudentRepository,
    req: StudentRegisterRequestDto
): Promise<JwtResponseDto> => {
    const { JWT_KEY } = process.env;
    const studentLoginResponse = await studentRepository.register(req);
    const token = sign(
        {
            uniqueKey: studentLoginResponse.uniqueKey,
            fullName: studentLoginResponse.fullName,
            type: AuthType.Student,
        },
        JWT_KEY,
        {
            expiresIn: studentLoginResponse.expirationOption
        }
    );
    return new JwtResponseDto(token, studentLoginResponse.expirationDate);
}