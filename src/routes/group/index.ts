import express, { Request, Response } from 'express';
import { requireAuth } from '@sgtickets/common';
import { Group } from '../../models/response/group';
import { User } from '../../models/user';
import { Responses } from '../../models/response/responses';

const router = express.Router();

router.get('/groups',
    // requireAuth,
    async (req: Request, res: Response) => {

        const groups = await Group.findAll({ include: [User, Responses] });
        res.send(groups);

    });

export { router as groupIndexRouter };
