import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import {
    requireAuth,
    validateRequest,
    BadRequestError
} from '@sgtickets/common';
import { Apply } from '../../../models/response/apply';
import { Notice } from '../../../models/notice';

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

        const existingApply = await Apply.findOne({ where: { task_id: task_id, user_id: user_id } });

        if (existingApply) {
            throw new BadRequestError('Already applied');
        }

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

        const notice = await Notice.create({
            user_id,
            type: "task",
            action: "apply",
            status: "unread",
            task_id: task_id,
        });

        res.status(201).send({ apply, notice });
    }
);

export { router as applyCreateRouter };