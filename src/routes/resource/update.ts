import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import {
  validateRequest,
  NotFoundError,
  requireAuth,
  NotAuthorizedError,
  BadRequestError,
} from '@sgtickets/common';
import { Resource } from '../../models/library/resource';

const router = express.Router();

router.put(
  '/resource/:resource_id',
  // requireAuth,
  // [
  //   body('title').not().isEmpty().withMessage('Title is required'),
  //   body('price')
  //     .isFloat({ gt: 0 })
  //     .withMessage('Price must be provided and must be greater than 0'),
  // ],
  validateRequest,
  async (req: Request, res: Response) => {
    const resource = await Resource.findOne({ where: { resource_id: req.params.resource_id } });

    if (!resource) {
      throw new NotFoundError();
    }

    // if (resource.id) {
    //   throw new BadRequestError('Cannot edit a reserved ticket');
    // }

    // if (resource.organizer_id !== req.currentUser!.id) {
    //   throw new NotAuthorizedError();
    // }

    resource.set({
      category_id: req.body.category_id,
      filetype_id: req.body.filetype_id,
      topic_id: req.body.topic_id,
      resource_name: req.body.resource_name,
    });
    await resource.save();

    res.send(resource);
  }
);

export { router as resourceUpdateRouter };
