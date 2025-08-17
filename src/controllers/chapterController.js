/**
 * Chapter Controller
 * --------------
 * Handles requests for BNF chapters.
 * Uses Prisma ORM to query a PostgreSQL database.
 * 
 * Status codes: see policy at top of src/app.js
 */

import prisma from '../../prisma/client.js';
import { validateCode } from '../utils/validators.js';

/**
 * Controller: getChapters
 * Fetch all BNF chapters from the database, ordered by `code` ascending.
 * Route: GET /api/chapters
 */
export async function getChapters(req, res) {
  const chapters = await prisma.bNFChapter.findMany({
    orderBy: { code: 'asc' },
  })
  res.json(chapters)
}

/**
 * Controller: getChapterByCode
 * Fetch a single BNF chapter by its unique code.
 * Route: GET /api/chapters/:code
 */
export async function getChapterByCode(req, res) {
  // Validate the code param
  const code = validateCode(req.params.code, 'chapter code')
  const chapter = await prisma.bNFChapter.findUnique({
    where: { code },
  })

  // If chapter does not exist, return a 404 Not found
  if (!chapter) return res.status(404).json({ error: 'Not found' })
  
  // Chapter found -> send as JSON
  res.json(chapter)
}

/**
 * Controller: getSectionsForChapter
 * Fetch all BNF sections belonging to a chapter
 * Route: GET /api/chapters/:code/sections
 */
export async function getSectionsForChapter(req, res) {
  // Validate the code param
  const code = validateCode(req.params.code, 'chapter code')
  const chapter = await prisma.bNFChapter.findUnique({
    where: { code },
    select: {
      code: true,
      sections: { orderBy: { code: 'asc' }},
    },
  })
  // If chapter does not exist, return a 404 Not found
  if (!chapter) return res.status(404).json({ error: 'Not found' })
  res.json(chapter.sections)
}