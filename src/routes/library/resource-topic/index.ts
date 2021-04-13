import express, { Request, Response } from 'express';
import { requireAuth } from '@sgtickets/common';
import { ResourceTopic } from '../../../models/library/resource-topic';
import { Resource } from '../../../models/library/resource';
import { Category } from '../../../models/library/category';
import { Filetype } from '../../../models/library/filetype';

const router = express.Router();

router.get('/resource/topic/:topic_id',
    // requireAuth,
    async (req: Request, res: Response) => {
        const { topic_id } = req.params

        const resource_topic = await ResourceTopic.findAll({ where: { topic_id: topic_id } });

        let resources: any = []

        for (let i = 0; i < resource_topic.length; i++) {
            const resource = await Resource.findOne({
                where: { resource_id: resource_topic[i].resource_id },
                include: [Category, Filetype],
            });
            resources.push(resource)
        }

        res.send(resources);

    });

export { router as resourceTopicIndexRouter };
