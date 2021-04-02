import express, { Request, Response } from 'express';
import { requireAuth } from '@sgtickets/common';
import { Filetype } from '../../models/library/filetype';
import { User } from '../../models/user';
import { Responses } from '../../models/response/responses';

const router = express.Router();

router.get('/filetype',
    // requireAuth,
    async (req: Request, res: Response) => {

        const filetype = await Filetype.findAll();
        res.send(filetype);

    });

export { router as filetypeIndexRouter };
