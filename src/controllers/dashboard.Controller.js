import asyncHandler from "express-async-handler";
import { Op } from "sequelize";
import tripModel from "../models/tripModel.js";
import { userModel } from "../models/userModel.js";
import { reconModel } from "../models/reconModel.js";
import agentModel from "../models/agentModel.js";

export const getDashboard = asyncHandler(async (req, res) => {
  const { startDate, endDate } = req.query;

  // Check if both startDate and endDate are provided
  if (!startDate || !endDate) {
    return res
      .status(400)
      .json({ message: "Both startDate and endDate are required" });
  }

  // Convert the timestamps to Date objects
  const start = new Date(Date.parse(startDate));
  const end = new Date((Date.parse(endDate)));

  try {
    const trip = await tripModel.findAll({
      attributes: [
        "orderValue",
        "transferPrice",
        "salesSpoc",
        "opsSpoc",
        "status",
      ],
      where: {
        bookingDate: {
          [Op.between]: [start, end],
        },
      },
    });

    const user = await userModel.findAll();

    const recon = await reconModel.findAll({
      where: {
        created_at: {
          [Op.between]: [start, end],
        },
      },
    });

    const agent = await agentModel.findAll();

    // ! main data
    const activeAgents = agent.filter(
      (agent) => agent.status === "ACTIVE"
    ).length;
    const notCancelledTrips = trip.filter(
      (item) => item.status !== "CANCELLED"
    );
    const gmv = notCancelledTrips.reduce(
      (total, item) => parseInt(total) + parseInt(item.orderValue),
      0
    );
    const gpv =
      gmv -
      notCancelledTrips.reduce(
        (total, item) => parseInt(total) + parseInt(item?.transferPrice || 0),
        0
      );

    // ! bookingVsSalesSpoc
    const salesSpoc = user.filter((user) => user.profile === "Sales");
    const bookings = [];
    const sales = salesSpoc.map((sales) => sales.name);
    salesSpoc.forEach((sales) => {
      bookings.push(
        trip.filter((item) => item.salesSpoc === sales.name).length
      );
    });
    const bookingVsSalesSpoc = { sales, bookings };

    // ! Status Chart vs Number
    const confirmed = trip.filter((item) => item.status === "CONFIRMED").length;
    const cancelled = trip.filter((item) => item.status === "CANCELLED").length;
    const ontour = trip.filter((item) => item.status === "ON-TOUR").length;
    const travelled = trip.filter((item) => item.status === "TRAVELLED").length;

    const chartVsNo = [cancelled, confirmed, ontour, travelled];

    // ! bookingVsOpsSpoc
    const opsSpoc = user.filter((user) => user.profile === "Operations");
    const booking = opsSpoc.map(
      (opss) => trip.filter((item) => item.opsSpoc === opss.name).length
    );
    const ops = opsSpoc.map((item) => item.name);

    const bookingVsOpsSpoc = { ops, bookings: booking };

    // ! gmv vs salesSpoc
    const gmvVsSalesSpoc = salesSpoc.map((sales) => 
      notCancelledTrips
        .filter((item) => item.salesSpoc === sales.name)
        .reduce(
          (total, tripi) => parseInt(total) + parseInt(tripi.orderValue),
          0
        )
    );

    // ! gpv vs salesSpoc
    const gpvVsSalesSpoc = salesSpoc.map(
      (sales) =>
        notCancelledTrips
          .filter((item) => item.salesSpoc === sales.name)
          .reduce(
            (total, tripi) => parseInt(total) + parseInt(tripi.orderValue),
            0
          ) -
        trip
          .filter((item) => item.salesSpoc === sales.name)
          .reduce(
            (total, tripi) =>
              parseInt(total) + parseInt(tripi?.transferPrice || 0),
            0
          )
    );
    console.log(gmvVsSalesSpoc, gpvVsSalesSpoc);


    // ! user activity
    const userActivity = user.map((item) => ({
      name: item.name,
      status: item.status,
      registered: new String(item.createdAt).slice(3, 15),
      activity: "10 sec ago",
      avatar: "https://i.pravatar.cc/40?img=1",
    }));
    if (!user || !trip || !recon) {
      return res.status(404).json({ message: "Data not found" });
    }

    res.status(200).json({
      STATUS: "SUCCESS",
      MESSAGE: "Dashboard data fetched successfully",
      OUTPUT: {
        noOfBookings: trip.length,
        activeAgents,
        gmv,
        gpv,
      },
      chart: chartVsNo,
      bvss: bookingVsSalesSpoc,
      gpvs: gpvVsSalesSpoc,
      gvss: gmvVsSalesSpoc,
      bvso: bookingVsOpsSpoc,
      user: userActivity,
      sales
    });
  } catch (error) {
    console.log(error);
    res.status(201).json({ message: error.message });
  }
});

export const userSpecificDashboard = asyncHandler(async (req, res) => {
  const { startDate, endDate, user } = req.query;

  const sales = JSON.parse(user);

  // Check if both startDate and endDate are provided
  if (!startDate || !endDate) {
    return res
      .status(400)
      .json({ message: "Both startDate and endDate are required" });
  }

  // Convert the timestamps to Date objects
  const start = new Date(startDate);
  const end = new Date(Date(endDate) + 24 * 60 * 60 * 1000);

  try {
    const trip = await tripModel.findAll({
      where: {
        bookingDate: {
          [Op.between]: [start, end],
        },
        salesSpoc: sales.name,
      },
    });

    const agent = await agentModel.findAll();

    // ! main data
    const activeAgents = agent.filter(
      (agent) => agent.status === "ACTIVE"
    ).length;
    const notCancelledTrips = trip.filter(
      (item) => item.status !== "CANCELLED"
    );
    const gmv = notCancelledTrips.reduce(
      (total, item) => parseInt(total) + parseInt(item.orderValue),
      0
    );
    const gpv =
      gmv -
      notCancelledTrips.reduce(
        (total, item) => parseInt(total) + parseInt(item?.transferPrice || 0),
        0
      );

    // ! Status Chart vs Number
    const confirmed = trip.filter((item) => item.status === "CONFIRMED").length;
    const cancelled = trip.filter((item) => item.status === "CANCELLED").length;
    const ontour = trip.filter((item) => item.status === "ON-TOUR").length;
    const travelled = trip.filter((item) => item.status === "TRAVELLED").length;

    const chartVsNo = [cancelled, confirmed, ontour, travelled];

    res.status(200).json({
      STATUS: "SUCCESS",
      MESSAGE: "Dashboard data fetched successfully",
      OUTPUT: {
        noOfBookings: trip.length,
        activeAgents,
        gmv,
        gpv,
      },
      chart: chartVsNo,
    });
  } catch (error) {
    console.log(error);
    res.status(201).json({ message: error.message });
  }
});
