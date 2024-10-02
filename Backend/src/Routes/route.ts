// routes/route.ts
import { Router, Request, Response } from 'express'

const CompanyController = require('../Controllers/CompanyController')

const router = Router();


router.get('/', (req: Request, res: Response) => {
    res.send('Hello World!')
});


router.get('/companies',CompanyController.viewAll)
router.get('/companies/:id',CompanyController.view)

router.post('/companies/view', CompanyController.create)
router.delete('/companies/:id',CompanyController.deleteCompany)

export default router