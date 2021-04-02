import express, { Request, Response } from 'express';
import { requireAuth } from '@sgtickets/common';
import { Responses } from '../../models/response/responses';

const router = express.Router();

router.get('/response/current',
    // requireAuth,
    async (req: Request, res: Response) => {

        const response = await Responses.findOne({ where: { end_time: null } });

        res.send(response);
    });

export { router as responseCurrentRouter };
