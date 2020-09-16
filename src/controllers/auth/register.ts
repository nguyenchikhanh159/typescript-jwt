import * as mongoose from 'mongoose';
import { Request, Response, NextFunction } from 'express';
import Users from '../../models/Users';


class Register {
    // public Users=Users;
    public static async saveusers(req: Request, res: Response, next: NextFunction) {
        console.log(req.body.password);

        const user = new Users({
            username: req.body.username,
            password: req.body.password
        })

         Users.findOne({ username: req.body.username }, async (err, data) => {
           try {
            if (err) {
                return next(err);
            }
            if (data) {
                return res.redirect('/signup');
            }
            await user.save();
            const token= await user.generateAuthToken();
            res.status(201).send({user,token});
           } catch (error) {
               res.status(400).send(error);
           }
        })

    }
}

export default Register;