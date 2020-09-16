import * as mongoose from 'mongoose';
import * as bluebird from 'bluebird';
import { MongoError } from 'mongodb';


export class Database {
    public static url = 'mongodb://localhost:27017/jwt';
    public static init(): any {
        const options = { useNewUrlParser: true, useUnifiedTopology: true };

        (<any>mongoose).Promise = bluebird;

        mongoose.set('useCreateIndex', true);

        mongoose.connect(this.url, options, (error: MongoError) => {
            if (error) {
                console.log(error);
            }
            else{
                console.log('Successfully connected to the database');
            }
        })
    }
}
export default mongoose;