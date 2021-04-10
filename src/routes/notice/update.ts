import express, { Request, Response } from 'express';
import {
  validateRequest,
  NotFoundError,
  requireAuth,
} from '@sgtickets/common';
import { Notice } from '../../models/notice';

const router = express.Router();

router.put(
  '/notice/:notice_id',
  // requireAuth,
  validateRequest,
  async (req: Request, res: Response) => {
    const notice = await Notice.findOne({ where: { notice_id: req.params.notice_id } });

    if (!notice) {
      throw new NotFoundError();
    }

    notice.set({
      status: req.body.status,
    });
    await notice.save();

    res.send(notice);
  }
);

export { router as noticeUpdateRouter };
