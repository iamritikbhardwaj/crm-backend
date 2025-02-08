import asyncHandler from "express-async-handler";
import { Op } from "sequelize";

export const getDashboard = asyncHandler(async (req, res) => {
  // Retrieve startDate and endDate from query params
  const { startDate, endDate } = req.query;

  // Check if both startDate and endDate are provided
  if (!startDate || !endDate) {
    return res
      .status(400)
      .json({ message: "Both startDate and endDate are required" });
  }

  // Convert the date strings to Date objects
  const start = new Date(startDate);
  const end = new Date(endDate);

  const user = await userModel.findAll({
    where: {
      createdAt: {
        [Op.between]: [start, end],
      },
    },
  });

  const trip = await tripModel.findAll({
    where: {
      createdAt: {
        [Op.between]: [start, end],
      },
    },
  });

  const payment = await paymentModel.findAll({
    where: {
      createdAt: {
        [Op.between]: [start, end],
      },
    },
  });

  const recon = await reconModel.findAll({
    where: {
      createdAt: {
        [Op.between]: [start, end],
      },
    },
  });

  if (!user || !trip || !payment || !recon) {
    return res.status(404).json({ message: "Data not found" });
  }

  res.status(200).json({
    STATUS: "SUCCESS",
    MESSAGE: "Dashboard data fetched successfully",
    OUTPUT: JSON.stringify({
      users: user.length,
      trips: trip.length,
      payments: payment.length,
      recon: recon.length,
    }, null, 2),
  });
});
