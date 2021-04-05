import express, { Request, Response } from 'express';
import { requireAuth } from '@sgtickets/common';
import { Resource } from '../../../models/library/resource';
import { User } from '../../../models/user';
import { Responses } from '../../../models/response/responses';

const router = express.Router();

router.get('/resources',
    // requireAuth,
    async (req: Request, res: Response) => {

        const resources = await Resource.findAll();
        res.send(resources);

    });

export { router as resourceIndexRouter };
