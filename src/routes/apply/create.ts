import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import {
    requireAuth,
    validateRequest,
    BadRequestError
} from '@sgtickets/common';
import { Apply } from '../../models/response/apply';
const router = express.Router();

router.post(
    '/apply',
    // requireAuth,
    // [
    //     body('description')
    //         .trim()
    //         .isLength({ min: 5, max: 100 })
    //         .withMessage('description must be between 2 and 20 characters'),
    // ],
    validateRequest,
    async (req: Request, res: Response) => {

        const {
            user_id,
            response_id,
            group_id,
            job_id,
            task_id,
            role,
            description,
            reason
        } = req.body;

        const apply = await Apply.create({
            user_id,
            response_id,
            group_id,
            job_id,
            task_id,
            role,
            description,
            reason,
        });

        res.status(201).send(apply);
    }
);

export { router as applyCreateRouter };