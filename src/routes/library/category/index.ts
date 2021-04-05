import express, { Request, Response } from 'express';
import { requireAuth } from '@sgtickets/common';
import { Category } from '../../../models/library/category';
import { User } from '../../../models/user';
import { Responses } from '../../../models/response/responses';

const router = express.Router();

router.get('/categories',
    // requireAuth,
    async (req: Request, res: Response) => {

        const categories = await Category.findAll();
        res.send(categories);

    });

export { router as categoryIndexRouter };
