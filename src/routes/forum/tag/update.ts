import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import {
  validateRequest,
  NotFoundError,
  requireAuth,
  NotAuthorizedError,
  BadRequestError,
} from '@sgtickets/common';
import { Tag } from '../../../models/forum/tag';

const router = express.Router();

router.put(
  '/tag/:tag_id',
  // requireAuth,
  // [
  //   body('title').not().isEmpty().withMessage('Title is required'),
  //   body('price')
  //     .isFloat({ gt: 0 })
  //     .withMessage('Price must be provided and must be greater than 0'),
  // ],
  validateRequest,
  async (req: Request, res: Response) => {
    const tag = await Tag.findOne({ where: { tag_id: req.params.tag_id } });

    if (!tag) {
      throw new NotFoundError();
    }

    // if (tag.id) {
    //   throw new BadRequestError('Cannot edit a reserved ticket');
    // }

    // if (tag.organizer_id !== req.currentUser!.id) {
    //   throw new NotAuthorizedError();
    // }

    tag.set({
      tag_name: req.body.tag_name,
    });
    await tag.save();

    res.send(tag);
  }
);

export { router as tagUpdateRouter };
