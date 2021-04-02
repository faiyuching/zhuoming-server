import express, { Request, Response } from 'express';
import {
    requireAuth,
    NotFoundError,
    NotAuthorizedError
} from '@sgtickets/common';
import { Apply } from '../../models/response/apply';
import { User } from '../../models/user';
import { Responses } from '../../models/response/responses';
import { Group } from '../../models/response/group';
import { Job } from '../../models/response/job';
import { Task } from '../../models/response/task';

const router = express.Router();

router.get('/apply/:apply_id',
    // requireAuth,
    async (req: Request, res: Response) => {

        const { apply_id } = req.params;
        const apply = await Apply.findOne({
            where: { apply_id: apply_id },
            include: [User, Responses, Group, Job, Task],
        });

        if (!apply) {
            throw new NotFoundError();
        }

        // if (response.organizer_id !== req.currentUser!.id) {
        //   throw new NotAuthorizedError();
        // }

        res.send(apply);
    });

export { router as applyShowRouter };
