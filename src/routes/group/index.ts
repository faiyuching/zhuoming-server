import express, { Request, Response } from 'express';
import { requireAuth } from '@sgtickets/common';
import { Group } from '../../models/response/group';
import { User } from '../../models/user';
import { Responses } from '../../models/response/responses';

const router = express.Router();

router.get('/groups',
    // requireAuth,
    async (req: Request, res: Response) => {
        const { response_id } = req.query

        const groups = await Group.findAll({
            include: [User, Responses],
            order: [['created_at', 'DESC']],
            where: { response_id: response_id }
        });

        res.send(groups);

    });

export { router as groupIndexRouter };
