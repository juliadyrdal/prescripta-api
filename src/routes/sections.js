/**
 * BNF Sections
 * ----------
 * Defines API endpoints for reading BNF data.
 * Delegates actual DB logic to sectionController.js.
 * All routes are mounted under /api/section in app.js.
 * Status codes: see policy in src/app.js.
 */

import express from 'express'
import { asyncHandler } from '../utils/asyncHandler.js'
import { 
    getSections,
    getSectionByCode,
    getParagraphsForSection 
} from '../controllers/sectionController.js'

const router = express.Router()

// Get all BNF Sections.
router.get('/', asyncHandler(getSections))

// Get a single BNF Section by its unique code.
router.get('/:code', asyncHandler(getSectionByCode))

// Get all paragraphs belonging to a section.
router.get('/:code/paragraphs', asyncHandler(getParagraphsForSection))

export default router;