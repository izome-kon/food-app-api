import express, { Request, Response } from 'express';
import { GetVandorProfile, UpdateVandorProfile, VandorLogin } from '../controllers';
import { Authenticate } from '../middlewares';

const router = express.Router();

router.post('/login', VandorLogin);

router.get('/profile', Authenticate, GetVandorProfile);

router.put('/profile', Authenticate, UpdateVandorProfile);



export { router as VandorRoutes }