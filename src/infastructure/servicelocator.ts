import {StudentRepository} from "./repositories/student/StudentRepository";
import {LecturerRepository} from "./repositories/lecturer/LecturerRepository";

export const services = () => {
  const services: {
      studentRepository: StudentRepository,
      lecturerRepository: LecturerRepository
  } = {
      studentRepository: new StudentRepository(),
      lecturerRepository: new LecturerRepository()
  };

  return services;
};
