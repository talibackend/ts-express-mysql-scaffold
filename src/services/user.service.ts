import { ResponseType } from "../types/api.types";
import { messages } from "../utils/consts";
import { StatusCodes } from "http-status-codes";
import { CreateUserType } from "../types/user.types";
import { User } from "../models/User";

export const createUserService = async (payload : CreateUserType): Promise<ResponseType> => {
    const { name } = payload;
    let user = await User.findOne({ where : { name } });

    if(!user){
        throw { ok : false, message : messages.USER_ALREADY_EXIST, status : StatusCodes.BAD_REQUEST };
    }

    user = await User.create({ name });

    return { ok : true, message : messages.ACCOUNT_CREATED, status : StatusCodes.OK, body : { user } };
}