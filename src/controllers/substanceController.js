/**
 * Substances Controller
 * ---------------------
 * Handles requests for chemical substances.
 * Uses Prisma ORM to query a PostgreSQL database.
 */

import prisma from '../../prisma/client.js';
import { optionalCode, optionalString, validateInt } from '../utils/validators.js';


/**
 * Controller: listSubstances
 * --------------------------
 * List ChemicalSubstances with optional filters and pagination.
 *
 * Supported query params:
 *  - search: string (case-insensitive "contains" match on name)
 *  - paragraphCode: string (exact match, filter by parent paragraph)
 *  - code: string (exact match on substance code)
 *  - skip: number (offset, default 0, min 0)
 *  - take: number (page size, default 20, range 1–100)
 *
 * Response:
 *  {
 *    items: [ ...substances ],
 *    total: number,  // total count matching filters
 *    skip: number,
 *    take: number
 *  }
 *
 * Status codes: see policy at top of src/app.js
 *
 * Route: GET /api/substances
 */
export async function listSubstances(req, res) {
    // Parse filters from query
    const search = optionalString(req.query.search, 'search term')
    const paragraphCode = optionalCode(req.query.paragraphCode, 'paragraph code')
    const code = optionalCode(req.query.code, 'chemical substance code')

    // Parse and clamp pagination params
    const skip = validateInt(req.query.skip ?? 0, { label: 'skip', min: 0 })
    const take = validateInt(req.query.take ?? 20, { label: 'take', min: 1, max: 100 }) // clamp 1..100

    // Build Prisma 'where' object
    const where = {
        ...(search ? { name: { contains: search, mode: 'insensitive' } } : {}),
        ...(paragraphCode ? { paragraphCode } : {}),
        ...(code ? { code } : {}),
    }

    // Fetch paginated results and total count in parallel
    const [items, total] = await Promise.all([
        prisma.chemicalSubstance.findMany({
            where,
            orderBy: { name: 'asc' },
            skip,
            take,
        }),
        prisma.chemicalSubstance.count({ where })
    ])
    res.json({ items, total, skip, take })
}