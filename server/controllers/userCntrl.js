import asynHandler from "express-async-handler";
import { prisma } from "../config/prismaConfig.js";

export const createUser = asynHandler(async (req, res) => {
  console.log("creating a user");

  let { email } = req.body;
  const userExists = await prisma.user.findUnique({ where: { email: email } });
  if (!userExists) {
    const user = await prisma.user.create({ data: req.body });
    res.send({
      message: "User resgistered successfully",
      user: user,
    });
  } else res.status(201).send({ message: "User Already Resgistered" });
});

//Function to Book a Visit to a particular residency

export const bookVisit = asynHandler(async (req, res) => {
  const { email, date } = req.body;
  const { id } = req.params;

  try {
    const alreadyBooked = await prisma.user.findUnique({
      where: { email },
      select: { bookedVisits: true },
    });
    if (alreadyBooked.bookedVisits.some((visit) => visit.id === id)) {
      res.status(400).json({ message: "A booking already exists by you" });
    } else {
      await prisma.user.update({
        where: { email: email },
        data: {
          bookedVisits: { push: { id, date } },
        },
      });
      res.send("Your Visit is Successfully Booked!");
    }
  } catch (err) {
    throw new Error(err.message);
  }
});

// Function to fetch all bookings of a user

export const getAllBookings = asynHandler(async (req, res) => {
  const { email } = req.body;

  try {
    const bookings = await prisma.user.findUnique({
      where: { email },
      select: { bookedVisits: true },
    });
    res.status(200).send(bookings);
  } catch (err) {
    throw new Error(err.message);
  }
});

// Function to Cancel an already made booking

export const cancelBoooking = asynHandler(async (req, res) => {
  const { email } = req.body;
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({
      email: { email: email },
      select: { bookedVisits: true },
    });
    const index = user.bookedVisits.findIndex((visit) => visit.id === id);

    if (index === -1) {
      res.status(404).json({ message: "Booking Not Found" });
    } else {
      user.bookedVisits.splice(index, 1);
      await prisma.user.update ({
        where: {email},
        data: {
            bookedVisits: user.bookedVisits
        }
      })
    }
  } catch (err) {
    throw new Error(err.message);
  }
});
