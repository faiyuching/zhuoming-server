import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import {
    requireAuth,
    validateRequest,
    BadRequestError
} from '@sgtickets/common';
import { Resource } from '../../models/library/resource';
const router = express.Router();

router.post(
    '/resource',
    // requireAuth,
    [
        body('resource_name')
            .trim()
            .isLength({ min: 2, max: 20 })
            .withMessage('resource name must be between 2 and 20 characters'),
    ],
    validateRequest,
    async (req: Request, res: Response) => {

        const { user_id, category_id, filetype_id, topic_id, resource_name } = req.body;

        const existingResource = await Resource.findOne({ where: { resource_name: resource_name } });

        if (existingResource) {
            throw new BadRequestError('Resource name in use');
        }

        const resource = await Resource.create({ user_id, category_id, filetype_id, topic_id, resource_name });

        res.status(201).send(resource);
    }
);

export { router as resourceCreateRouter };