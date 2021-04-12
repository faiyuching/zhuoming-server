import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import {
    requireAuth,
    validateRequest,
    BadRequestError,
    NotFoundError
} from '@sgtickets/common';
import { Resource } from '../../../models/library/resource';
import { Filetype } from '../../../models/library/filetype';
import { Category } from '../../../models/library/category';
const router = express.Router();

router.post(
    '/resource',
    // requireAuth,
    validateRequest,
    async (req: Request, res: Response) => {
        console.log(req.body)

        const { user_id, resource_link, resource_name, fileTypeValue, categoryValue, recomment_reason } = req.body;

        const filetype = await Filetype.findOne({ where: { filetype_name: fileTypeValue } });
        const category = await Category.findOne({ where: { category_name: categoryValue } });
        const existingResource = await Resource.findOne({ where: { resource_name: resource_name } });

        if (!filetype) {
            throw new NotFoundError();
        }

        if (!category) {
            throw new NotFoundError();
        }

        if (existingResource) {
            throw new BadRequestError('Resource name in use');
        }

        const resource = await Resource.create({
            user_id,
            resource_link,
            resource_name,
            filetype_id: filetype!.filetype_id,
            category_id: category!.category_id,
            recomment_reason
        });

        res.status(201).send(resource);
    }
);

export { router as resourceCreateRouter };