import * as mongoose from 'mongoose';
import { Schema, Document } from 'mongoose';
import { IUser } from '../interfaces/vendors/models/user'
import * as bcrypt from "bcrypt-nodejs";
import * as jwt from 'jsonwebtoken';
const process_env_JWT = 'UIT';
export interface IUserModel extends IUser, Document {
  billingAddress(): string;
  comparePassword(password: string, cb: any): string;
  validPassword(password: string, cb: any): string;
  gravatar(_size: number): string;
  // findByCredentials(): Promise<any>;
  generateAuthToken(): Promise<String>;
  VerifyAuthToken():Promise<string>;
}

export const UserSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  password: { type: String },
  // passwordResetToken: { type: String },
  // passwordResetExpires: Date,

  facebook: { type: String },
  twitter: { type: String },
  google: { type: String },
  github: { type: String },
  instagram: { type: String },
  linkedin: { type: String },
  steam: { type: String },
  tokens: Array,

  fullname: { type: String },
  gender: { type: String },
  geolocation: { type: String },
  website: { type: String },
  picture: { type: String }
}, {
  timestamps: true
});
UserSchema.pre<IUserModel>('save', function (_next) {
  const user = this;

  if (!user.isModified('password')) {
    return _next();
  }

  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return _next(err);
    }
    bcrypt.hash(user.password, salt, null, (err, hash) => {
      if (err) {
        return _next(err)
      }
      user.password = hash;
      console.log(user.password);
      return _next();
    })
  })
});
UserSchema.methods.comparePassword = function (_requestPassword, _cb): any {

  bcrypt.compare(_requestPassword, this.password, (err, isMatch) => {
    console.log("Compare" + this);
    return _cb(err, isMatch);
  })
}
// UserSchema.methods.VerifyAuthToken = async function (): Promise<string> {
//   const user = this;
//   const token = jwt.sign(
//     {
//       _id: user._id,
//     },
//     process_env_JWT
//   )

//   user.tokens = user.tokens.concat({ token });
//   console.log("Token" + " " + user.tokens);
//   await user.save();
//   return token;
// }
UserSchema.methods.generateAuthToken = async function (): Promise<string> {
  const user = this;
  console.log("ABC" + this);
  const token = jwt.sign(
    {
      _id: user._id,
      _username:user.username
    },
    process_env_JWT
  )

  user.tokens = user.tokens.concat({ token });
  console.log("Token" + " " + user.tokens);
  await user.save();
  return token;
}


export default mongoose.model<IUserModel>('User', UserSchema);