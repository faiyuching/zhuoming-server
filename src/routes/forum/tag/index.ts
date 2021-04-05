import express, { Request, Response } from 'express';
import { requireAuth } from '@sgtickets/common';
import { Tag } from '../../../models/forum/tag';
import { User } from '../../../models/user';
import { Responses } from '../../../models/response/responses';

const router = express.Router();

router.get('/tag',
    // requireAuth,
    async (req: Request, res: Response) => {

        const tag = await Tag.findAll();
        res.send(tag);

    });

export { router as tagIndexRouter };
