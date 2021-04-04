import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import {
    requireAuth,
    validateRequest,
    BadRequestError
} from '@sgtickets/common';
import { Responses } from '../../models/response/responses';
import { DATE } from 'sequelize/types';
const router = express.Router();

router.post(
    '/response',
    // requireAuth,
    // [
    //     body('response_name')
    //         .trim()
    //         .isLength({ min: 4, max: 20 })
    //         .withMessage('response name must be between 4 and 20 characters'),
    // ],
    // validateRequest,
    async (req: Request, res: Response) => {

        console.log(req.body)
        const {
            user_id,
            response_name,
            disaster_type,
            response_level,
            needs_time,
            join_mode,
            need_people,
            slogan,
            statement
        } = req.body;

        const existingResponse = await Responses.findOne({ where: { response_name: response_name } });

        if (existingResponse) {
            throw new BadRequestError('response name in use');
        }

        const response = await Responses.create({
            user_id,
            response_name,
            disaster_type,
            response_level,
            needs_time,
            join_mode,
            need_people,
            slogan,
            statement
        });

        res.status(201).send(response);
    }
);

export { router as responseCreateRouter };