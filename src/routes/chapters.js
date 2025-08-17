/**
 * BNF Chapters
 * ----------
 * Defines API endpoints for reading BNF data.
 * Delegates actual DB logic to chapterController.js.
 * All routes are mounted under /api/chapters in app.js.
 * Status codes: see policy in src/app.js.
 */

import express from 'express'
import { asyncHandler } from '../utils/asyncHandler.js'
import { 
    getChapters,
    getChapterByCode,
    getSectionsForChapter, 
} from '../controllers/chapterController.js'

const router = express.Router()

// Get all BNF Chapters.
router.get('/', asyncHandler(getChapters))

// Get a single BNF chapter by its unique code.
router.get('/:code', asyncHandler(getChapterByCode))

// Get all sections belonging to a chapter.
router.get('/:code/sections', asyncHandler(getSectionsForChapter))

export default router;
