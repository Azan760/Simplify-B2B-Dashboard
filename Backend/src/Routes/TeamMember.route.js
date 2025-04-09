import {Router} from 'express';
import { createTeamMember,createPassword, } from '../Controller/TeamMember.controller.js';
import {allMember} from "../Controller/TeamMember.controller.js"
import {upload} from '../Middlewares/multer.js';
import { editView } from '../Controller/TeamMember.controller.js';

const router = Router();



 router.route('/new').post(upload.single('userImage'),createTeamMember);
 router.route('/createPassword/:id').put(createPassword);
 router.route('/list').get(allMember);
 router.route('/view/:id').get(editView);

export default router;