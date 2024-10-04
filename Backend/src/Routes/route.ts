// routes/route.ts
import { Router, Request, Response } from 'express'

const CompanyControllers = require('../Controllers/CompanyControllers')
const CountryControllers = require('../Controllers/CountryControllers')
const InvoicesControllers = require('../Controllers/InvoicesControllers')

const router = Router()


router.get('/', (req: Request, res: Response) => {
    res.send('Hello World!')
});

// Route companies 
/**
 * @openapi
 * /companies:
 *   get: 
 *     tags:
 *       - Companies
 *     description: Get all companies
 *     responses: 
 *       200: 
 *         description: Success
 */
router.get('/companies',CompanyControllers.viewAll)

/**
 * @openapi
 * /companies/{id}:
 *   get:
 *     tags:
 *       - Companies
 *     description: Get a company by its ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the company to retrieve
 *         schema:
 *           type: integer
 *     responses: 
 *       200: 
 *         description: Success
 *       404:
 *         description: Company not found
 */
router.get('/companies/:id',CompanyControllers.view)

/**
 * @openapi
 * /companies:
 *   post:
 *     tags:
 *       - Companies
 *     description: Create a new Company
 *     requestBody:  
 *       required: true
 *       content:
 *         application/json:  
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Company name
 *                 example: "My Company"  # Exemple de valeur
 *               type_id:
 *                 type: integer
 *                 description: ID Type of company [client ....]
 *                 example: 1  # Exemple de valeur
 *               country_id:
 *                 type: integer
 *                 description: ID Country of company [fr, be .....]
 *                 example: 33  # Exemple de valeur
 *               tva:
 *                 type: string
 *                 description: VAT of the company
 *                 example: "FR123456789"  # Exemple de valeur
 *     responses: 
 *       201: 
 *         description: Success
 *       409:
 *         description: The VAT is already recorded for a company. 
 */
router.post('/companies', CompanyControllers.create)

/**
 * @openapi
 * /companies/{id}:
 *   patch:
 *     tags:
 *       - Companies
 *     description: Update company with the specified ID
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the company
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Company name
 *                 example: "My Company"  # Example value
 *                 required: false
 *               type_id:
 *                 type: integer
 *                 description: ID of the type of company [client, supplier, etc.]
 *                 example: 1  # Example value
 *                 required: false
 *               country_id:
 *                 type: integer
 *                 description: ID of the country of the company [fr, be, etc.]
 *                 example: 33  # Example value
 *                 required: false
 *               tva:
 *                 type: string
 *                 description: VAT number of the company
 *                 example: "FR123456789"  # Example value
 *                 required: false
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Company not found        
 */
router.patch('/companies/:id',CompanyControllers.update)

/**
 * @openapi
 * /companies/{id}:
 *  delete:
 *   tags:
 *    - Companies
 *   description : Delete Company whit ID
 *   parameters:
 *    - name: id
 *      in: path
 *      required: true
 *      description: The ID of the company to retrieve
 *      schema:
 *        type: integer
 *   responses: 
 *     200: 
 *       description: Success
 *     404:
 *       description: Company not found    
 */
router.delete('/companies/:id',CompanyControllers.deleteCompany)

// Route Countries

/**
 * @openapi
 * /countries:
 *   get:
 *    tags:
 *     - Countries
 *    description: Get All coutries
 *    responses:
 *     200:
 *       description: sucess
 */
router.get('/countries',CountryControllers.viewAll)

/**
 * @openapi
 * /countries/{id}:
 *   get:
 *     tags: 
 *       - Countries
 *     description: Get Country with ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Id of the Country
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Country not found
 */
router.get('/countries/:id',CountryControllers.view)

/**
 * @openapi
 * /countries:
 *   post:
 *     tags:
 *       - Countries
 *     description: Créer un pays
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nom du pays
 *                 example: "Mon Pays"  # Exemple de valeur
 *               initials:
 *                 type: string
 *                 description: Initiales du pays
 *                 example: "In"  # Exemple de valeur
 *     responses:  
 *       200:
 *         description: Succès 
 *       409:
 *         description: The country Exist !  
 */
router.post('/countries',CountryControllers.create)

/**
 * @openapi
 * /countries/{id}:
 *   delete:
 *     tags:
 *       - Countries
 *     description:  Delete Country with ID
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Id country
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Sucess
 *       400:
 *         description: Coutry no found
 */
router.delete('/countries/:id',CountryControllers.deleteCountry)


// Routes Invoices
/**
 * @openapi
 * /invoices:
 *   get:
 *     tags:
 *       - Invoices
 *     description: Get all invoices
 *     responses:
 *       200:
 *         description: Sucess
 */
router.get('/invoices',InvoicesControllers.viewAll)

/**
 * @openapi
 * /invoices/{ref}:
 *   get:
 *     tags:
 *       - Invoices
 *     description :  Get invoice with Ref
 *     parameters:
 *       - name: ref
 *         in: path
 *         description: Reference invoice
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Sucess
 *       400:
 *         description: Invoice no found
 */
router.get('/invoices/:ref',InvoicesControllers.view)

router.post('/invoices',InvoicesControllers.create)
export default router