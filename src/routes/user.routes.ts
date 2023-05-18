import express, { Router, Request, Response } from 'express';
import controller from '../controllers/user.controller';

const routes : Router = express.Router();

/**
 * @openapi
 * /user:
 *  post:
 *      summary: Endpoint to create user
 *      tags:
 *          - User
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                              required: true
 *                              example: Femi Fatokun
 *      responses:
 *          '200':
 *              description: Request successful
 *          '400':
 *              description: Bad Request
 *          '500':
 *              description: Internal server error
 *          '404':
 *              description: Not found  
 */
routes.post('/', async (req : Request, res : Response) : Promise<Response> =>{ return await controller.createUser(req, res); });

export default routes;