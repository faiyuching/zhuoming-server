import express, { Request, Response } from 'express';
import {
    requireAuth,
    NotFoundError,
    NotAuthorizedError
} from '@sgtickets/common';
import { Group } from '../../models/group';

const router = express.Router();

router.get('/group/:id',
    // requireAuth,
    async (req: Request, res: Response) => {

        const { id } = req.params;
        const group = await Group.findOne({ where: { id: id } });

        if (!group) {
            throw new NotFoundError();
        }

        // if (response.organizer_id !== req.currentUser!.id) {
        //   throw new NotAuthorizedError();
        // }

        res.send(group);
    });

export { router as groupShowRouter };
