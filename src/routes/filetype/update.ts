import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import {
  validateRequest,
  NotFoundError,
  requireAuth,
  NotAuthorizedError,
  BadRequestError,
} from '@sgtickets/common';
import { Filetype } from '../../models/library/filetype';

const router = express.Router();

router.put(
  '/filetype/:filetype_id',
  // requireAuth,
  // [
  //   body('title').not().isEmpty().withMessage('Title is required'),
  //   body('price')
  //     .isFloat({ gt: 0 })
  //     .withMessage('Price must be provided and must be greater than 0'),
  // ],
  validateRequest,
  async (req: Request, res: Response) => {
    const filetype = await Filetype.findOne({ where: { filetype_id: req.params.filetype_id } });

    if (!filetype) {
      throw new NotFoundError();
    }

    // if (filetype.id) {
    //   throw new BadRequestError('Cannot edit a reserved ticket');
    // }

    // if (filetype.organizer_id !== req.currentUser!.id) {
    //   throw new NotAuthorizedError();
    // }

    filetype.set({
      filetype_name: req.body.filetype_name,
    });
    await filetype.save();

    res.send(filetype);
  }
);

export { router as filetypeUpdateRouter };
