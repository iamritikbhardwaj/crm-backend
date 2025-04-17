import asyncHandler from "express-async-handler";
import { agentModel } from "../models/agentModel.js";
import { v4 as uuidv4 } from "uuid";

export const getAllAgents = asyncHandler(async (req, res) => {
     console.log('getAllAgent');
    try { const agent = await agentModel.findAll();
     console.log(agent, 'agent');
     res.status(200).json({
          STATUS: 'SUCCESS',
          MESSAGE: 'Agents fetched successfully',
          OUTPUT: agent
     });}
     catch (error) {
          console.log(error);
          res.status(500).json({
                STATUS: 'FAIL',
                MESSAGE: 'Error fetching agents',
                OUTPUT: null
          });
     }
});

export const createAgent = asyncHandler(async (req, res) => {
     const agentData = req.body;
     const id = req?.query?.id;
     const { name, status } = agentData;
     console.log(agentData, 'agentData');
     console.log(req.query, 'id');
     
     try {
          if(req.query.hasOwnProperty('id')) {
          console.log('update agent')
          const agent = await agentModel.update(agentData, {
               where: {
                    agent_id: id
               }
          })
          if(!agent) {
               res.status(400);
               throw new Error('Invalid agent data');
          } else {
               res.status(200).json({
                    STATUS: 'SUCCESS',
                    MESSAGE: 'Agent updated successfully',
                    OUTPUT: agent
               });
          }
     } else {
          const agent = await agentModel.create({agent_id: uuidv4(), name: name, status: status});
          console.log(agent, 'agent');
     if (!agent) {
          res.status(400);
          throw new Error('Invalid agent data');
     } else {
          res.status(200).json({
               STATUS: 'SUCCESS',
               MESSAGE: 'Agent created successfully',
               OUTPUT: agent
          });
     }}}
     catch (error) {
          if (error.name === "SequelizeValidationError") {
               console.error("Validation Error:", error.errors);
             } else {
               console.error("Unexpected Error:", error.errors);
             }
             res.status(201).json({
               STATUS: "FAIL",
               MESSAGE: "Error creating supplier",
               OUTPUT: error
             })
     }
});

export const deleteAgent = asyncHandler(async (req, res) => {
     const id = req?.params?.id;
     console.log(id, 'id');
     try {
          const agent = await agentModel.destroy({
               where: {
                    agent_id: id
               }
          });
          res.status(200).json({
               STATUS: 'SUCCESS',
               MESSAGE: 'Agent deleted successfully',
               OUTPUT: agent
          });
     } catch (error) {
          console.log(error);
          res.status(500).json({
               STATUS: 'FAIL',
               MESSAGE: 'Error deleting agent',
               OUTPUT: null
          });
     }
});