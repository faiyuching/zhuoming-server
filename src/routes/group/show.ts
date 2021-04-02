import express, { Request, Response } from 'express';
import {
    requireAuth,
    NotFoundError,
    NotAuthorizedError
} from '@sgtickets/common';
import { Group } from '../../models/response/group';

const router = express.Router();

router.get('/group/:group_id',
    // requireAuth,
    async (req: Request, res: Response) => {

        const { group_id } = req.params;
        const group = await Group.findOne({ where: { group_id: group_id } });

        if (!group) {
            throw new NotFoundError();
        }

        // if (response.organizer_id !== req.currentUser!.id) {
        //   throw new NotAuthorizedError();
        // }

        res.send(group);
    });

export { router as groupShowRouter };
