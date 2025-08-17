import { PrismaClient } from '@prisma/client'

let prisma

if (process.env.NODE_ENV === 'production') {
  // Create new client in production.
  prisma = new PrismaClient()
} else {
  // Reuse client in development, avoids hot reload issues.
  if (!global.prisma) {
    global.prisma = new PrismaClient()
  }
  prisma = global.prisma
}

export default prisma

