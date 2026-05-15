// app/actions.ts
'use server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function saveRSVPToDb(data: { name: string, guests: string, kids: string, hotel: string }) {
  try {
    await prisma.guest.create({
      data: {
        name: data.name,
        message: `Adults: ${data.guests}, Kids: ${data.kids}, Hotel: ${data.hotel}`,
        attending: true,
      }
    })
    return { success: true }
  } catch (error) {
    console.error("Database Error:", error)
    return { success: false }
  }
}