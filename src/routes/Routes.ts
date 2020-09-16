import { Router } from 'express';
import register from '../controllers/auth/register';
import login from '../controllers/auth/login';
import checkToken from '../middlewares/CheckToken';
import logout from '../controllers/auth/logout';
const router = Router();

router.post('/register',register.saveusers);
router.post('/login',login.perform);
router.post('/logout',checkToken.checktoken,logout.logout);
router.post('/get', checkToken.checktoken, async(req:any, res) => {
    // View logged in user profile
    res.status(200).send(req.user)
})
// router.post('/logout',CheckToken.checktoken,(req:any,res:any)=>{
//         res.status(200).send(req.user);
// });
router.post('/checktoken',checkToken.checktoken,(req:any,res:any)=>{
        res.status(200).send(req.user);
});

export default router;