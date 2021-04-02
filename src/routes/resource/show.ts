import express, { Request, Response } from 'express';
import {
    requireAuth,
    NotFoundError,
    NotAuthorizedError
} from '@sgtickets/common';
import { Resource } from '../../models/library/resource';

const router = express.Router();

router.get('/resource/:resource_id',
    // requireAuth,
    async (req: Request, res: Response) => {

        const { resource_id } = req.params;
        const resource = await Resource.findOne({ where: { resource_id: resource_id } });

        if (!resource) {
            throw new NotFoundError();
        }

        // if (response.organizer_id !== req.currentUser!.id) {
        //   throw new NotAuthorizedError();
        // }

        res.send(resource);
    });

export { router as resourceShowRouter };
