import express, { Request, Response } from 'express';
import {
    requireAuth,
    NotFoundError,
    NotAuthorizedError
} from '@sgtickets/common';
import { Task } from '../../models/response/task';

const router = express.Router();

router.get('/task/:task_id',
    // requireAuth,
    async (req: Request, res: Response) => {

        const { task_id } = req.params;
        const task = await Task.findOne({ where: { task_id: task_id } });

        if (!task) {
            throw new NotFoundError();
        }

        // if (response.organizer_id !== req.currentUser!.id) {
        //   throw new NotAuthorizedError();
        // }

        res.send(task);
    });

export { router as taskShowRouter };
