import express, { Request, Response } from 'express';
import { requireAuth, NotFoundError } from '@sgtickets/common';
import { Resource } from '../../../models/library/resource';
import { Filetype } from '../../../models/library/filetype';
import { Category } from '../../../models/library/category';

const router = express.Router();

router.get('/resources',
    // requireAuth,
    async (req: Request, res: Response) => {
        const { filetype_name, category_name } = req.query
        let resources

        if (filetype_name !== 'undefined' && category_name !== 'undefined') {
            const filetype = await Filetype.findOne({ where: { filetype_name: filetype_name } });
            const category = await Category.findOne({ where: { category_name: category_name } });
            resources = await Resource.findAll({
                include: [Filetype, Category],
                order: [['created_at', 'DESC']],
                where: { filetype_id: filetype?.filetype_id, category_id: category?.category_id }
            });
        } else if (filetype_name === 'undefined' && category_name !== 'undefined') {
            const category = await Category.findOne({ where: { category_name: category_name } });
            resources = await Resource.findAll({
                include: [Filetype, Category],
                order: [['created_at', 'DESC']],
                where: { category_id: category?.category_id }
            });
        } else if (filetype_name !== 'undefined' && category_name === 'undefined') {
            const filetype = await Filetype.findOne({ where: { filetype_name: filetype_name } });
            resources = await Resource.findAll({
                include: [Filetype, Category],
                order: [['created_at', 'DESC']],
                where: { filetype_id: filetype?.filetype_id }
            });
        } else if (filetype_name === 'undefined' && category_name === 'undefined') {
            resources = await Resource.findAll({
                include: [Filetype, Category],
                order: [['created_at', 'DESC']],
            });
        }


        res.send(resources);

    });

export { router as resourceIndexRouter };
