import express, { Request, Response } from 'express';
import {
    requireAuth,
    NotFoundError,
    NotAuthorizedError
} from '@sgtickets/common';
import { Tag } from '../../../models/forum/tag';

const router = express.Router();

router.get('/tag/:tag_id',
    // requireAuth,
    async (req: Request, res: Response) => {

        const { tag_id } = req.params;
        const tag = await Tag.findOne({ where: { tag_id: tag_id } });

        if (!tag) {
            throw new NotFoundError();
        }

        // if (response.organizer_id !== req.currentUser!.id) {
        //   throw new NotAuthorizedError();
        // }

        res.send(tag);
    });

export { router as tagShowRouter };
