import { IRequest, IResponse, INext } from '../interfaces/vendors/index';
import { JsonWebTokenError } from 'jsonwebtoken';
import * as jwt from 'jsonwebtoken';
import Users from '../models/Users';
const process_env_JWT = 'UIT';
class CheckToken {
    public static async checktoken(req:any, res: IResponse, next: INext) {
        const token = req.header('Authorization').replace('Bearer ', '')
    const data:any = jwt.verify(token, process_env_JWT)
    console.log(data);
     try {
         const user = await Users.findOne({ _id: data._id, 'tokens.token': token })
         if (!user) {
             throw new Error()
         }
         req.user = user
         req.token = token
         next()
     } catch (error) {
         res.status(401).send({ error: 'Not authorized to access this resource' })
     }
    }
     public static protectedRoute(req:any,res:IResponse,next:INext){
         if(req.user){
             return next();
         }
        res.json({
             error:['Unauthorized']
         })
     }

}
export default CheckToken;