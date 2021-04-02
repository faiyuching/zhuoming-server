import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import {
  validateRequest,
  NotFoundError,
  requireAuth,
  NotAuthorizedError,
  BadRequestError,
} from '@sgtickets/common';
import { Category } from '../../models/library/category';

const router = express.Router();

router.put(
  '/category/:category_id',
  // requireAuth,
  // [
  //   body('title').not().isEmpty().withMessage('Title is required'),
  //   body('price')
  //     .isFloat({ gt: 0 })
  //     .withMessage('Price must be provided and must be greater than 0'),
  // ],
  validateRequest,
  async (req: Request, res: Response) => {
    const category = await Category.findOne({ where: { category_id: req.params.category_id } });

    if (!category) {
      throw new NotFoundError();
    }

    // if (category.id) {
    //   throw new BadRequestError('Cannot edit a reserved ticket');
    // }

    // if (category.organizer_id !== req.currentUser!.id) {
    //   throw new NotAuthorizedError();
    // }

    category.set({
      category_name: req.body.category_name,
    });
    await category.save();

    res.send(category);
  }
);

export { router as categoryUpdateRouter };
