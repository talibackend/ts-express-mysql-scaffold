import dotenv from 'dotenv';
dotenv.config();
import express, { Express } from 'express';
import cors from 'cors';
import { sequelize } from './config/database';
import { log } from './utils/logger';
import { messages } from './utils/consts';
import transferRoutes from './routes/transfer';
import { sideCar } from './sidecar/server';
// import { searchCreatePrimaryWalletClient } from './sidecar/clients/transfer';


const app : Express = express();

sequelize.sync({ alter : true }).then(async ()=>{
    log('info', messages.DB_CONNECTED);
    app.listen(process.env.PORT, ()=>{ log('info', messages.SERVER_STARTED) });
    sideCar();
    // searchCreatePrimaryWalletClient(5).then((value)=>{ console.log(value) }).catch((err)=>{ console.log(err) })
}).catch(err=>{ log('error', { message : messages.SERVER_FAILED_TO_START, err }); });

app.use(cors({ origin : process.env.GATEWAY_BASE_URL }));
app.use(express.json({ limit : '50mb' }));

app.use('/', transferRoutes);

