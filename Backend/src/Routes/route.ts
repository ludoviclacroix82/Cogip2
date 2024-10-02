// routes/route.ts
import { Router, Request, Response } from 'express'

const CompanyControllers = require('../Controllers/CompanyControllers')
const CountryControllers = require('../Controllers/CountryControllers')

const router = Router()


router.get('/', (req: Request, res: Response) => {
    res.send('Hello World!')
});

// Route companies 
router.get('/companies',CompanyControllers.viewAll)
router.get('/companies/:id',CompanyControllers.view)

router.post('/companies/view', CompanyControllers.create)
router.delete('/companies/:id',CompanyControllers.deleteCompany)

// Route Countries

router.get('/countries',CountryControllers.viewAll);

export default router