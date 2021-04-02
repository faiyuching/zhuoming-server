import express, { Request, Response } from 'express';
import {
    requireAuth,
    NotFoundError,
    NotAuthorizedError
} from '@sgtickets/common';
import { Category } from '../../models/library/category';

const router = express.Router();

router.get('/category/:category_id',
    // requireAuth,
    async (req: Request, res: Response) => {

        const { category_id } = req.params;
        const category = await Category.findOne({ where: { category_id: category_id } });

        if (!category) {
            throw new NotFoundError();
        }

        // if (response.organizer_id !== req.currentUser!.id) {
        //   throw new NotAuthorizedError();
        // }

        res.send(category);
    });

export { router as categoryShowRouter };
