import express, { Request, Response } from 'express';
import {
  requireAuth,
  NotFoundError,
  NotAuthorizedError,
} from '@sgtickets/common';
import { Filetype } from '../../models/library/filetype';

const router = express.Router();

router.delete(
  '/filetype/:filetype_id',
  // requireAuth,
  async (req: Request, res: Response) => {
    const { filetype_id } = req.params;

    const filetype = await Filetype.findOne({ where: { filetype_id: filetype_id } });

    if (!filetype) {
      throw new NotFoundError();
    }
    // if (response.id !== req.currentUser!.id) {
    //   throw new NotAuthorizedError();
    // }

    await Filetype.destroy({ where: { filetype_id: filetype_id } });

    res.status(204).send(filetype);
  }
);

export { router as filetypeDeleteRouter };
