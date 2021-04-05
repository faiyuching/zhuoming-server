import express, { Request, Response } from 'express';
import { requireAuth } from '@sgtickets/common';
import { Responses } from '../../../models/response/responses';
import { User } from '../../../models/user';

const router = express.Router();

router.get('/responses',
    // requireAuth,
    async (req: Request, res: Response) => {
        // { include: [User] }
        const responses = await Responses.findAll();
        res.send(responses);

    });

export { router as responseIndexRouter };
