import dotenv from 'dotenv';
dotenv.config();
import express, { Express } from 'express';
import cors from 'cors';
import { sequelize } from './config/database';
import { log } from './utils/logger';
import { messages } from './utils/consts';
import userRoutes from './routes/user.routes';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';


const app : Express = express();

const swaggerOptions = {
  failOnErrors: true,
  definition : {
    openapi: '3.0.0',
    info : {
      version : "1.0.0",
      title : "Documentation for virtual pay"
    }
  },
  apis : [ __dirname+'/swagger/*.js' ],
  components : {
    securitySchemes : {
      bearerAuth : {
        type : 'http',
        scheme : 'bearer',
        bearerFormer : 'JWT'
      }
    }
  }
}

sequelize.sync({ alter : true }).then(async ()=>{
    log('info', messages.DB_CONNECTED);
    app.listen(process.env.PORT, ()=>{ log('info', messages.SERVER_STARTED) });
}).catch(err=>{ log('error', { message : messages.SERVER_FAILED_TO_START, err }); });

app.use(cors());
app.use(express.json({ limit : '50mb' }));

app.use('/user', userRoutes);
app.use(
    "/docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerJSDoc(swaggerOptions), { explorer : true })
  );
  
