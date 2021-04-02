import express, { Request, Response } from 'express';
import {
    requireAuth,
    NotFoundError,
    NotAuthorizedError
} from '@sgtickets/common';
import { Filetype } from '../../models/library/filetype';

const router = express.Router();

router.get('/filetype/:filetype_id',
    // requireAuth,
    async (req: Request, res: Response) => {

        const { filetype_id } = req.params;
        const filetype = await Filetype.findOne({ where: { filetype_id: filetype_id } });

        if (!filetype) {
            throw new NotFoundError();
        }

        // if (response.organizer_id !== req.currentUser!.id) {
        //   throw new NotAuthorizedError();
        // }

        res.send(filetype);
    });

export { router as filetypeShowRouter };
