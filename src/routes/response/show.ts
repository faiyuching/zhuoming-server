import express, { Request, Response } from 'express';
import {
    requireAuth,
    NotFoundError,
    NotAuthorizedError
} from '@sgtickets/common';
import { Responses } from '../../models/responses';

const router = express.Router();

router.get('/response/:id',
    // requireAuth,
    async (req: Request, res: Response) => {

        const { id } = req.params;

        let response;

        if (id === "current") {
            response = await Responses.findOne({ where: { end_time: null } });
        } else {
            response = await Responses.findOne({ where: { id: id } });
        }

        if (!response) {
            throw new NotFoundError();
        }

        // if (response.organizer_id !== req.currentUser!.id) {
        //   throw new NotAuthorizedError();
        // }

        res.send(response);
    });

export { router as responseShowRouter };
