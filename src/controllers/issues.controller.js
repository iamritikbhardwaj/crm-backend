import asyncHandler from "express-async-handler";
import issuesModel from "../models/issues.models.js";
import { v4 as uuidv4 } from "uuid";
import { json } from "sequelize";

export const getAllIssues = asyncHandler(async (req, res) => {
  console.log("getAllIssues");
  const { tripId } = req.query;
  try {
    const issues = await issuesModel.findAll({
      where: {
        tripId: tripId,
      },
    });
    if (!issues) {
      res.status(400);
      return res.status(400).json("Invalid trip data");
    } else {
      res.status(200).json({
        STATUS: "SUCCESS",
        MESSAGE: "Issues fetched successfully",
        OUTPUT: issues,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      STATUS: "FAIL",
      MESSAGE: "Internal server error while fetching issues",
      OUTPUT: [],
    });
  }
});

export const createIssue = asyncHandler(async (req, res) => {
  const issue = req.body;
  const { date, description, responsible, resolution } = issue;
  const tripId = req.query.tripId;
  const issue_id = req.query.issue_id;
  console.log(req.body, tripId, issue_id);
  console.log("createIssue");
  try {
    if (issue_id !== undefined) {
      const newIssue = await issuesModel.update(
        { issue_id: uuidv4(), issue },
        {
          where: issue_id,
        }
      );
      if (newIssue) {
        res.status(200).json({
          STATUS: "SUCCESS",
          MESSAGE: "Issue created successfully",
          OUTPUT: newIssue,
        });
      } else {
        res.status(400);
        return res.status(400).json({
          STATUS: "FAIL",
          MESSAGE: "Invalid issue data",
          OUTPUT: [],
        });
      }
    } else {
      console.log("about to create the issue");
      const newIssue = await issuesModel.create({
        issue_id: uuidv4(),
        date: new Date(date),
        description: description,
        responsible: responsible,
        resolution: resolution,
        tripId: tripId,
      });
      if (newIssue) {
        res.status(200).json({
          STATUS: "SUCCESS",
          MESSAGE: "Issue created successfully",
          OUTPUT: newIssue,
        });
      } else {
        res.status(400);
        return res.status(400).json({
          STATUS: "FAIL",
          MESSAGE: "Invalid issue data",
          OUTPUT: [],
        });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      STATUS: "FAIL",
      MESSAGE: "Internal server error while creating issue",
      OUTPUT: error.message || error.MESSAGE || "some error occured"
    });
  }
});

export const deleteIssue = asyncHandler(async (req, res) => {
  const { issue_id } = req.query;
  try {
    const response = await issuesModel.destroy({
      where: {
        issue_id,
      },
    });
    if (response) {
      res.status(200).json({
        STATUS: "SUCCESS",
        MESSAGE: "Issue deleted successfully",
        OUTPUT: response,
      });
    } else {
      res.status(400);
      return res.status(400).json({
        STATUS: "FAIL",
        MESSAGE: "Invalid issue data",
        OUTPUT: [],
      });
    }
  } catch (error) {
    console.log(error, "server error in delete trip issue");
    res.status(500).json({
      STATUS: "SERVER ERROR",
      MESSAGE: "There was an server error while deleting an issue.",
      OUTPUT: error.message || error.MESSAGE || "some error occured"
    });
  }
});
