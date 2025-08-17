/**
 * BNF Chemical Substances
 * ----------
 * Defines API endpoints for reading BNF data.
 * Delegates actual DB logic to bnfController.js.
 * All routes are mounted under /api/bnf in app.js.
 * Status codes: see policy in src/app.js.
 */

import express from 'express'
import { asyncHandler } from '../utils/asyncHandler.js'
import { listSubstances } from '../controllers/substanceController.js'

const router = express.Router()

/**
 * List chemical substances.
 * Query params:
 *  - search, paragraphCode, code
 *  - skip, take (pagination)
 * 
 * Get all substances: /api/substances
 * Search by name: /api/substances?search=met
 * Paginate results: /api/substances?skip=20&take=10
 * Filter by parent paragraph: /api/substances?paragraphCode=010101
*/
router.get('/', asyncHandler(listSubstances))

// /api/substances/:code 
// /api/substances/:code/stats

export default router;