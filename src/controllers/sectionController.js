/**
 * Section Controller
 * --------------
 * Handles requests for BNF sections.
 * Uses Prisma ORM to query a PostgreSQL database.
 * 
 * Status codes: see policy at top of src/app.js
 */

import prisma from '../../prisma/client.js';
import { validateCode } from '../utils/validators.js';

/**
 * Controller: getSections
 * Fetch all BNF sections from database, order by 'code' ascending.
 * Route: GET /api/sections
 */
export async function getSections(req, res) {
  const sections = await prisma.bNFSection.findMany({
    orderBy: { code: 'asc' },
  })
  res.json(sections)
}

/**
 * Controller: getSectionByCode
 * Fetch a single BNF section by its unique code.
 * Route: GET /api/sections/:code
 */
export async function getSectionByCode(req, res) {
  // Validate the code param
  const code = validateCode(req.params.code, 'section code')
  const section = await prisma.bNFSection.findUnique({
    where: { code }
  })

  // If section does not exist, return 404 Not found.
  if (!section) return res.status(404).json({ error: 'Not found' })

  // Chapter found -> send as JSON
  res.json(section)
}

/**
 * Controller: getParagraphsForSection
 * Fetch all BNF paragraphs belonging to a chapter
 * Route: GET /api/sections/:code/paragraphs
 */
export async function getParagraphsForSection(req, res) {
  // Validate the code param
  const code = validateCode(req.params.code, 'section code')
  const section = await prisma.bNFSection.findUnique({
    where: { code },
    select: {
      code: true,
      paragraphs: { orderBy: { code: 'asc' }},
    },
  })
  // If section does not exist, return 404 Not found.
  if (!section) return res.status(404).json({ error: 'Not found' })
  res.json(section.paragraphs)
}