import { Request, Response, NextFunction } from 'express';
import Users, { UserSchema } from '../../models/Users';
import * as jwt from 'jsonwebtoken';
import { IRequest, IResponse, INext } from '../../interfaces/vendors/index';

class Login {
    public static async perform(req: IRequest, res: IResponse, next: INext): Promise<any> {
        const _username = req.body.username;
        const _password = req.body.password;
        try {
            Users.findOne({ username: _username }, (error, user) => {
                if (error) {
                    return res.status(401).send(error);
                }
                if (!user) {
                    return res.status(401).send("Login Failed!");
                }
                console.log("USER"+user);
                user.comparePassword(_password, (error, isMatch) => {
                    if (error) {
                        return res.status(401).send(error);
                    }
                    if (!isMatch) {
                        return res.status(401).send("Password not match");
                    }
                    const token = user.generateAuthToken();
                    res.send({ user, token });
                })

            })
        } catch (error) {
            res.status(401).send(error);
        }


    }
}
export default Login;