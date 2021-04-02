import express, { Request, Response } from 'express';
import { requireAuth } from '@sgtickets/common';
import { User } from '../../models/user';

const router = express.Router();

router.get('/user/:user_id',
    // requireAuth,
    async (req: Request, res: Response) => {
        
        const user = await User.findOne({ where: { user_id: req.params.user_id } });
        res.send(user);

    });

export { router as userShowRouter };
