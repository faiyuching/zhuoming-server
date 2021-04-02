import express, { Request, Response } from 'express';
import { requireAuth } from '@sgtickets/common';
import { Apply } from '../../models/response/apply';
import { User } from '../../models/user';
// import { Responses } from '../../models/responses';
// import { Group } from '../../models/group';
// import { Job } from '../../models/job';
// import { Task } from '../../models/task';

const router = express.Router();

router.get('/applies',
    // requireAuth,
    async (req: Request, res: Response) => {
        console.log(req.query)
        const applys = await Apply.findAll({
            // where: { response_id: req.query.response_id },
            order: [['apply_id', 'DESC']],
            include: [User],
        });
        res.send(applys);

    });

export { router as applyIndexRouter };
