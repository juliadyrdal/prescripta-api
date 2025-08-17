/**
 * BNF Paragraphs
 * ----------
 * Defines API endpoints for reading BNF data.
 * Delegates actual DB logic to paragraphController.js.
 * All routes are mounted under /api/paragraphs in app.js.
 * Status codes: see policy in src/app.js.
 */

import express from 'express'
import { asyncHandler } from "../utils/asyncHandler.js";
import { 
    getParagraphs,
    getParagraphByCode,
    getSubstancesForParagraph, 
} from '../controllers/paragraphController.js';

const router = express.Router()

// Get all BNF Paragraphs.
router.get('/', asyncHandler(getParagraphs))

// Get a single BNF Paragraph by its unique code.
router.get('/:code', asyncHandler(getParagraphByCode))

// Get all substances belonging to a paragraph.
router.get('/:code/substances', asyncHandler(getSubstancesForParagraph))

// /api/paragraphs/:code/top-chemicals

export default router;
