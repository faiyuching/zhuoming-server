import express, { Request, Response } from 'express';
import { requireAuth } from '@sgtickets/common';
import { Topic } from '../../../models/library/topic';
import { Category } from '../../../models/library/category';

const router = express.Router();

router.get('/topics',
    // requireAuth,
    async (req: Request, res: Response) => {
        const { category_name } = req.query
        let topics

        if(!category_name || category_name === 'undefined'){
            topics = await Topic.findAll({
                include: [Category],
                order: [['created_at', 'ASC']],
            });
        }else{
            const category = await Category.findOne({ where: { category_name: category_name } });
            topics = await Topic.findAll({
                include: [Category],
                order: [['created_at', 'ASC']],
                where: { category_id: category?.category_id }
            });
        }

        res.send(topics);

    });

export { router as topicIndexRouter };
