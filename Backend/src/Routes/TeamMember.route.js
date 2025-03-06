import {Router} from 'express';
import { createTeamMember,createPassword, } from '../Controller/TeamMember.controller.js';
import {allMember} from "../Controller/AllMember.js"
import {upload} from '../Middlewares/multer.js';

const router = Router();



 router.route('/new').post(upload.single('userImage'),createTeamMember);
 router.route('/createPassword/:id').put(createPassword);
 router.route('/list').get(allMember);

export default router;