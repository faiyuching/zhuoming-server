import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import {
    requireAuth,
    validateRequest,
    BadRequestError
} from '@sgtickets/common';
import { Category } from '../../models/library/category';
const router = express.Router();

router.post(
    '/category',
    // requireAuth,
    [
        body('category_name')
            .trim()
            .isLength({ min: 2, max: 20 })
            .withMessage('category name must be between 2 and 20 characters'),
    ],
    validateRequest,
    async (req: Request, res: Response) => {

        const { user_id, category_name } = req.body;

        const existingCategory = await Category.findOne({ where: { category_name: category_name } });

        if (existingCategory) {
            throw new BadRequestError('Category name in use');
        }

        const category = await Category.create({ user_id, category_name });

        res.status(201).send(category);
    }
);

export { router as categoryCreateRouter };