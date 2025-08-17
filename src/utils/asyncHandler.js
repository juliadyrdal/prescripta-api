/**
 * asyncHandler
 * ------------
 * Wraps async controller functions so that any thrown/rejected 
 * error is passed to next(), triggering the central error handler.
 * Avoids repeating try/catch in each controller.
 */
export const asyncHandler = fn => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next)