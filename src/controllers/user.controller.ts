import { Request, Response } from 'express';
import { log } from '../utils/logger';
import { createUserValidation } from '../utils/validations/user.validation';
import { createUserService } from '../services/user.service';

export default {
    createUser : async (req : Request | any, res : Response) : Promise<Response> =>{
        const { body, ip, url } = req;

        try{
            let payload = await createUserValidation(body);
            let service = await createUserService(payload);
            return res.status(service.status).json({...service});
        }catch(error : any){
            log('error', { error, ip, url });
            return res.status(error.status).json({...error});
        }
    }
}