/**
 * validators.js
 * -------------
 * Reusable helpers for validating route and query parameters.
 * Returns either a valid value or throws an error.
 */

/**
 * Validate: Code param
 * Check that code param is a non-empty alphanumeric string. 
 * Return clean, trimmed version.
 */
export function validateCode(code, label = 'code') {
  // If code param is null or undefined, fall back on empty string
  const value = (code || '').trim()
  // Check code param is non-empty alphanumeric string
  if (!value || !/^[A-Z0-9]+$/i.test(value)) { // Regex /^[A-Z0-9]+$/i → only allows letters (A–Z, case-insensitive) and numbers
    // If code param is invalid, throw 400 bad request error
    const err = new Error(`Invalid ${label}`)
    err.status = 400
    throw err
  }
  // Return clean, trimmed code param
  return value
}

/**
 * Validate: Optional code
 * Check if user provided code, if not return null.
 * Check if code is an alphanumeric string.
 * Return clean, trimmed version.
 */
export function optionalCode(code, label='code') {
  // If code is null or undefined, fall back on empty string
  const value = (code || '').trim()
  // If empty, return null
  if (!value) return null
  // Check if alphanumeric
  if (!/^[A-Z0-9]+$/i.test(value)) {
    // If invalid, throw 400 bad request error
    const err = new Error(`Invalid ${label}`)
    err.status = 400
    throw err
  }
  // Return clean, trimmed code
  return value
}

/**
 * Validate: Optional string
 * Check if user provided string, if not return null.
 * If string provided, return trimmed version. 
 * If invalid, throw 400 bad request.
 */
export function optionalString(value, { label = 'string' } = {}) {
  // If not provided, return null
  if (value == null) return null
  // Convert type to string
  const trimmed = String(value).trim()
  // Provided, but only spaces, return null
  if (trimmed.length === 0) return null

  // Check if alphanumeric
  if (!/^[a-z0-9\s]+$/i.test(trimmed)) {
    // If invalid, throw 400 bad request error
    const err = new Error(`Invalid ${label}`)
    err.status = 400
    throw err
  }
  // Return clean, trimmed optional string
  return trimmed
}

/**
 * Validate: Integer
 * Check if valid number is provided, and is between min and max. 
 * If invalid or outside min...max, throw 400 bad request.
 */
export function validateInt(value, { label='number', min=0, max=Infinity } = {}) {
  // Convert type to number
  const num = Number(value)
  // Checks num is not NaN or Infinity, checks num is between min and max 
  if (!Number.isFinite(num) || num < min || num > max) {
    // If invalid, throw 400 bad request error
    const err = new Error(`Invalid ${label}`)
    err.status = 400
    throw err
  }
  // Return clean number, within min...max
  return num
}