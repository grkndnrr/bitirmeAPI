import {StudentRepository} from "../../infastructure/repositories/student/StudentRepository";
import express from "express";
import MiddlewareHandler from "../middleware";
import Utils from "../helpers/utils";
import StudentController from "../../controllers/student/StudentController";


export const studentRouter = ({
    studentRepository
}: {
    studentRepository: StudentRepository
}) => {
    const router = express.Router();
    const studentController = new StudentController( studentRepository, null );
    router.route("").post(
        new MiddlewareHandler()
            .use(async (ctx, inputs) => {
                const result = await studentController.register(inputs.body);
                Utils.SUCCESS_RESPONSE(ctx, result);
            })
            .listen(),
    );
    router.route("/login").post(
        new MiddlewareHandler()
            .use(async (ctx, inputs) => {
                const result = await studentController.login(inputs.body);
                Utils.SUCCESS_RESPONSE(ctx, result);
            })
            .listen(),
    );

    return router;
}