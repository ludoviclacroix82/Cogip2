// routes/route.ts
import { Router, Request, Response } from 'express'
const CompanyController = require('../Controllers/CompanyController')

const router = Router();

// Basic test route
router.get('/', (req: Request, res: Response) => {
    res.send('Hello World!')
});

// Route for fetching all companies
router.get('/companies',CompanyController.viewAll)

export default router