import express, { Request, Response } from 'express';
import {
  requireAuth,
  NotFoundError,
  NotAuthorizedError,
} from '@sgtickets/common';
import { Category } from '../../models/library/category';

const router = express.Router();

router.delete(
  '/category/:category_id',
  // requireAuth,
  async (req: Request, res: Response) => {
    const { category_id } = req.params;

    const category = await Category.findOne({ where: { category_id: category_id } });

    if (!category) {
      throw new NotFoundError();
    }
    // if (response.id !== req.currentUser!.id) {
    //   throw new NotAuthorizedError();
    // }

    await Category.destroy({ where: { category_id: category_id } });

    res.status(204).send(category);
  }
);

export { router as categoryDeleteRouter };
