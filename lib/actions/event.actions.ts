'use server'

import { connectToDatabase } from "../database"
import { handleError } from "../utils"

import User from "../database/models/user.model"
import Event from "../database/models/event.model"

import { CreateEventParams } from "@/types"

// CREATE
export async function createEvent({ event, userId, path }: CreateEventParams) {
  try {
    await connectToDatabase()

    const organizer = await User.findById(userId)
    if (!organizer) throw new Error('Organizer not found')

    const newEvent = await Event.create({ ...event, category: event.categoryId, organizer: userId })
    //revalidatePath(path)

    return JSON.parse(JSON.stringify(newEvent))
  } catch (error) {
    handleError(error)
  }
}