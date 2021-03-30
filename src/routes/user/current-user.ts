import express from 'express';
import { currentUser } from '@sgtickets/common';

const router = express.Router();

router.get('/user/currentuser', currentUser, (req, res) => {
  res.send({ currentUser: req.currentUser || null });
});

export { router as currentUserRouter };
