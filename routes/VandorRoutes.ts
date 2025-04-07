import express, { Request, Response } from 'express';
import { GetVandorProfile, UpdateVandorProfile, VandorLogin } from '../controllers';

const router = express.Router();

router.post('/login', VandorLogin);

router.get('/profile', GetVandorProfile);

router.put('/profile', UpdateVandorProfile);



export { router as VandorRoutes }