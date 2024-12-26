import { asyncHandler } from "express-async-handler";
import { agentModel } from "../models/agentModel.js";

export const getAllAgent = asyncHandler(async (req, res) => {
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
     const id = req?.params?.id
     console.log(agentData, 'agentData');
     
     try {
          if(id) {
          log('update agent')
          const agent = await agentModel.update(agentData, {
               where: {
                    id: id
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
     }else {const agent = await agentModel.create(agentData);
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
          console.log(error);
          res.status(500).json({
               STATUS: 'FAIL',
               MESSAGE: 'Error creating agent',
               OUTPUT: null
          });
     }
});

export const deleteAgent = asyncHandler(async (req, res) => {
     const id = req?.params?.id;
     console.log(id, 'id');
     try {
          const agent = await agentModel.destroy({
               where: {
                    id: id
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