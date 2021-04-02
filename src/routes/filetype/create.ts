import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import {
    requireAuth,
    validateRequest,
    BadRequestError
} from '@sgtickets/common';
import { Filetype } from '../../models/library/filetype';
const router = express.Router();

router.post(
    '/filetype',
    // requireAuth,
    [
        body('filetype_name')
            .trim()
            .isLength({ min: 2, max: 20 })
            .withMessage('filetype name must be between 2 and 20 characters'),
    ],
    validateRequest,
    async (req: Request, res: Response) => {

        const { user_id, filetype_name } = req.body;

        const existingFiletype = await Filetype.findOne({ where: { filetype_name: filetype_name } });

        if (existingFiletype) {
            throw new BadRequestError('Filetype name in use');
        }

        const filetype = await Filetype.create({ user_id, filetype_name });

        res.status(201).send(filetype);
    }
);

export { router as filetypeCreateRouter };