import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import {
    requireAuth,
    validateRequest,
    BadRequestError
} from '@sgtickets/common';
import { Task } from '../../../models/response/task';
const router = express.Router();

router.post(
    '/task',
    // requireAuth,
    [
        body('task_name')
            .trim()
            .isLength({ min: 2, max: 20 })
            .withMessage('task name must be between 2 and 20 characters'),
    ],
    validateRequest,
    async (req: Request, res: Response) => {

        const {
            user_id,
            response_id,
            group_id,
            job_id,
            task_name,
            description,
            need_shimo,
            need_people
        } = req.body;

        const existingTask = await Task.findOne({ where: { task_name: task_name } });

        if (existingTask) {
            throw new BadRequestError('Task name in use');
        }

        const task = await Task.create({
            user_id,
            response_id,
            group_id,
            job_id,
            task_name,
            description,
            need_shimo,
            need_people,
            begin_time: Date.now()
        });

        res.status(201).send(task);
    }
);

export { router as taskCreateRouter };