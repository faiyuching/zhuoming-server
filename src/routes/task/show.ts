import express, { Request, Response } from 'express';
import {
    requireAuth,
    NotFoundError,
    NotAuthorizedError
} from '@sgtickets/common';
import { Task } from '../../models/task';

const router = express.Router();

router.get('/task/:id',
    // requireAuth,
    async (req: Request, res: Response) => {

        const { id } = req.params;
        const task = await Task.findOne({ where: { id: id } });

        if (!task) {
            throw new NotFoundError();
        }

        // if (response.organizer_id !== req.currentUser!.id) {
        //   throw new NotAuthorizedError();
        // }

        res.send(task);
    });

export { router as taskShowRouter };
