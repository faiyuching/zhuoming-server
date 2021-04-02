import express, { Request, Response } from 'express';
import { requireAuth } from '@sgtickets/common';
import { User } from '../../models/user';

const router = express.Router();

router.get('/users',
    // requireAuth,
    async (req: Request, res: Response) => {

        const users = await User.findAll();
        res.send(users);

    });

export { router as userIndexRouter };
