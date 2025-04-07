import express, { Request, Response } from 'express';
import { CreateVandor, GetVandors, GetVandorById } from '../controllers';

const router = express.Router();

router.post('/vandor', CreateVandor);
router.get('/vandor', GetVandors);
router.get('/vandor/:id', GetVandorById);

export { router as AdminRoutes }