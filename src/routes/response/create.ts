import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import {
    requireAuth,
    validateRequest,
    BadRequestError
} from '@sgtickets/common';
import { Responses } from '../../models/responses';
import { DATE } from 'sequelize/types';
const router = express.Router();

router.post(
    '/response',
    // requireAuth,
    [
        body('response_name')
            .trim()
            .isLength({ min: 4, max: 20 })
            .withMessage('response name must be between 4 and 20 characters'),
    ],
    validateRequest,
    async (req: Request, res: Response) => {

        const {
            user_id,
            response_name,
            // disaster_type,
            // response_level,
            // begin_time,
            // needs_time,
            // join_mode,
            // need_people,
            // statement
        } = req.body;

        const existingResponse = await Responses.findOne({ where: { response_name: response_name } });

        if (existingResponse) {
            throw new BadRequestError('response name in use');
        }

        const response = await Responses.create({
            user_id,
            response_name,
            // disaster_type,
            // response_level,
            begin_time: Date.now(),
            // needs_time,
            // join_mode,
            // need_people,
            // statement
        });

        res.status(201).send(response);
    }
);

export { router as responseCreateRouter };