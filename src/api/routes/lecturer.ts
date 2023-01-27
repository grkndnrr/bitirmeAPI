import {LecturerRepository} from "../../infastructure/repositories/lecturer/LecturerRepository";
import express from "express";
import MiddlewareHandler from "../middleware";
import Utils from "../helpers/utils";
import LecturerController from "../../controllers/lecturer/LecturerController";


export const lecturerRouter = ({
    lecturerRepository
}: {
    lecturerRepository: LecturerRepository
}) => {
    const router = express.Router();
    const lecturerController = new LecturerController( lecturerRepository, null );
    router.route("").post(
        new MiddlewareHandler()
            .use(async (ctx, inputs) => {
                const result = await lecturerController.register(inputs.body);
                Utils.SUCCESS_RESPONSE(ctx, result);
            })
            .listen(),
    );
    router.route("/login").post(
        new MiddlewareHandler()
            .use(async (ctx, inputs) => {
                const result = await lecturerController.login(inputs.body);
                Utils.SUCCESS_RESPONSE(ctx, result);
            })
            .listen(),
    );

    return router;
}