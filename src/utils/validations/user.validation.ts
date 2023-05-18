import { StatusCodes } from 'http-status-codes';
import * as Joi from 'joi';
import { ObjectSchema } from 'joi';
import { CreateUserType } from '../../types/user.types';

export const createUserValidation = async (body : any) : Promise<CreateUserType> =>{
    const schema : ObjectSchema = Joi.object({
        name : Joi.string().required()
    });

    const { error, value } = schema.validate(body);

    if(error){
        throw { ok : false, message : error.details[0].message, status : StatusCodes.BAD_REQUEST };
    }

    return value;
}