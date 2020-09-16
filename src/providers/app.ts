import * as express from "express";
import * as bodyParser from "body-parser";
import router from "../routes/Routes"
// import * as cors from "cors";
import { Database } from './Database';
import * as bcrypt from 'bcrypt-nodejs';
class App {

    public router = router;
    public app: express.Application;
    public routePrv = router;

    constructor() {
        this.app = express();
        this.config();
        this.loadDatabase();
        this.app.use('/jwt', this.router);

    }

    private config(): void {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
    
        // this.app.use(cors);
    }
    public loadDatabase(): void {
        Database.init();
    }
}

export default new App().app;