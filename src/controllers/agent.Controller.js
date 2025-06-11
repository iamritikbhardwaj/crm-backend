import asyncHandler from "express-async-handler";
import { agentModel } from "../models/agentModel.js";
import { v4 as uuidv4 } from "uuid";
import flyremitModel from "../models/flyremitModel.js";
import payLinkModel from "../models/payLink.model.js";

export const getAllAgents = asyncHandler(async (req, res) => {
     console.log('getAgents');
     const name = req.query?.name;
     console.log(name, 'name');
     try {
          if (req.query.hasOwnProperty('name')) {
               console.log('get agent by name')
               const agent = await agentModel.findOne({
                    where: {
                         name
                    }
               });
               console.log(agent, 'agent');
               if (agent) {
                    res.status(200).json({
                         STATUS: 'SUCCESS',
                         MESSAGE: 'Agents fetched successfully',
                         OUTPUT: agent
                    });
               } else {
                    res.status(404).json({
                         STATUS: 'FAILED',
                         MESSAGE: 'Agents not fetched',
                         OUTPUT: agent
                    });
               }
          } else {
               const agent = await agentModel.findAll();
               console.log(agent, 'agent');
               if (agent) {
                    res.status(200).json({
                         STATUS: 'SUCCESS',
                         MESSAGE: 'Agents fetched successfully',
                         OUTPUT: agent
                    });
               } else {
                    res.status(404).json({
                         STATUS: 'FAILED',
                         MESSAGE: 'Agents not fetched',
                         OUTPUT: agent
                    });
               }
          }
     }
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
          if (req.query.hasOwnProperty('id')) {
               console.log('update agent')
               const agent = await agentModel.update(agentData, {
                    where: {
                         agent_id: id
                    }
               })
               if (!agent) {
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
               const agent = await agentModel.create({ agent_id: uuidv4(), name: name, status: status });
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
               }
          }
     }
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

export const mapFlyAgent = asyncHandler(async (req, res) => {
     const flyremit_id = req?.query?.flyremit_id;

     const agent_id = req?.query?.agent_id;
     console.log(flyremit_id, agent_id, 'flyremit_id');
     try {
          const paylink = await payLinkModel.findOne({
               where: {
                    agent_id: agent_id
               }
          })
          const { tripId, amount , xerate, commision} = paylink
          const inr = parseInt((amount * xerate) + (amount * xerate) * (commision / 100)) + 1

          const agents = await flyremitModel.findOne({
               where: {
                    agent_id: agent_id
               }
          });
          let agent;
          if (!agents) {
               agent = await flyremitModel.create({ agent_id: agent_id, flyremit_id: flyremit_id });
          } else {
               res.status(200).redirect(`https://v5agent.flyremit.com/Activitybeds/abagent/result?AgentId=${agent_id}&BookingId=${tripId}&Amount=${inr}`);
          }
          if (paylink && agent) {
               res.status(200).redirect(`https://v5agent.flyremit.com/Activitybeds/abagent/result?AgentId=${agent_id}&BookingId=${tripId}&Amount=${inr}`);
          } else if (!agent) {
               res.status(400).json({
                    STATUS: 'FAIL',
                    MESSAGE: 'There was an error mapping agent please try again',
                    OUTPUT: agent
               });
          } else {
               res.status(404).json({
                    STATUS: 'FAIL',
                    MESSAGE: 'There was an error fetching paymentlink please try again',
                    OUTPUT: agent
               });
          }
     } catch (error) {
          console.log(error);
          res.status(500).json({
               STATUS: 'FAIL',
               MESSAGE: 'Error mapping agent please try again',
               OUTPUT: []
          });
     }
});

export const callFlyRemit = asyncHandler(async (req, res) => {
     const tranId = req?.body?.tranId;
     const tranStatus = req?.body?.tranStatus;
     const tripId = req?.body?.tripId;

     try {
          res.status(200).json({
               STATUS: 'SUCCESS',
               MESSAGE: 'Here is the processed link',
               OUTPUT: `https://crm.tomatotrails.com/viewAllBooking?tripId=${tripId}&tranId=${tranId}&tranStatus=${tranStatus}`
          });
     } catch (error) {
          console.log(error);
          res.status(500).json({
               STATUS: 'FAIL',
               MESSAGE: 'Error mapping agent please try again',
               OUTPUT: null
          });
     }
})