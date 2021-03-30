import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import {
  validateRequest,
  NotFoundError,
  requireAuth,
  NotAuthorizedError,
  BadRequestError,
} from '@sgtickets/common';
import { Group } from '../../models/group';

const router = express.Router();

router.put(
  '/group/:group_id',
  // requireAuth,
  // [
  //   body('title').not().isEmpty().withMessage('Title is required'),
  //   body('price')
  //     .isFloat({ gt: 0 })
  //     .withMessage('Price must be provided and must be greater than 0'),
  // ],
  validateRequest,
  async (req: Request, res: Response) => {
    const group = await Group.findOne({ where: { group_id: req.params.group_id } });

    if (!group) {
      throw new NotFoundError();
    }

    // if (group.id) {
    //   throw new BadRequestError('Cannot edit a reserved ticket');
    // }

    // if (group.organizer_id !== req.currentUser!.id) {
    //   throw new NotAuthorizedError();
    // }

    group.set({
      group_name: req.body.group_name,
      description: req.body.description,
    });
    await group.save();

    res.send(group);
  }
);

export { router as groupUpdateRouter };
