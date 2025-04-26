import {Router} from 'express';
import {upload} from '../Middlewares/multer.js';
import { detailView ,editView,allMember,createTeamMember,createPassword} from '../Controller/TeamMember.controller.js';

const router = Router();



 router.route('/new').post(upload.single('userImage'),createTeamMember);
 router.route('/createPassword/:id').put(createPassword);
 router.route('/list').get(allMember);
 router.route('/view/:id').get(detailView);
 router.route('/view/:id').put(editView);


export default router;