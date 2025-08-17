/**
 * Paragraph Controller
 * --------------
 * Handles requests for BNF paragraphs.
 * Uses Prisma ORM to query a PostgreSQL database.
 * 
 * Status codes: see policy at top of src/app.js
 */

import prisma from '../../prisma/client.js';
import { validateCode } from '../utils/validators.js';

/**
 * Controller: getParagraphs
 * Fetch all BNF paragraphs from database, order by 'code' ascending.
 * Route: GET /api/paragraphs
 */
export async function getParagraphs(req, res) {
  const paragraphs = await prisma.bNFParagraph.findMany({
    orderBy: { code: 'asc' }
  })
  res.json(paragraphs)
}

/**
 * Controller: getParagraphByCode
 * Fetch a single BNF paragraph by its unique code.
 * Route: GET /api/paragraphs/:code
 */
export async function getParagraphByCode(req, res) {
  // Validate the code param
  const code = validateCode(req.params.code, 'paragraph code')
  const paragraph = await prisma.bNFParagraph.findUnique({
    where: { code }
  })

  // If paragraph does not exist, return 404 Not found.
  if (!paragraph) return res.status(404).json({ error: 'Not found' })
  
  // Paragraph found -> send as JSON
  res.json(paragraph)
}

/**
 * Controller: getSubstancesForParagraph
 * Fetch all substances belonging to a BNF paragraph.
 * Route: GET /api/paragraphs/:code/substances
 */
export async function getSubstancesForParagraph(req, res) {
  // Validate the code param
  const code = validateCode(req.params.code, 'paragraph code')
  const paragraph = await prisma.bNFParagraph.findUnique({
    where: { code },
    select: {
      code: true,
      substances: { orderBy: { code: 'asc' }},
    },
  })
  // If paragraph does not exist, return 404 Not found.
  if (!paragraph) return res.status(404).json({ error: 'Not found' })
  res.json(paragraph.substances)
}