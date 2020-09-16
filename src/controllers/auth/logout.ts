import { Request, Response, NextFunction } from 'express';
import Users, { UserSchema } from '../../models/Users';
import * as jwt from 'jsonwebtoken';
import { IRequest, IResponse, INext } from '../../interfaces/vendors/index';

class Logout {
    public static async logout(req,res: IResponse, next: INext): Promise<any> {
         const {user}=req;
         console.log(user);
         if(user)
         {
             req.user.tokens=req.user.tokens.filter((token)=>{
                 return token.token!=req.token;
             })
             await req.user.save();
             res.status(200).send("Logout Success");
            }

    }
}
export default Logout;