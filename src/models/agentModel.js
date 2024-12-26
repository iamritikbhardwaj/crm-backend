import { z } from "zod";
import { v4 as uuidv4 } from "uuid";
import sequelize from "../dbConfig/dbConfig.js";

export const agentSchema = z.object({
    Agent: z.string(),
    Status: z.string(),
});

export const agentModel = sequelize.define(
    "agent",
    {
        agent_id: {
            type: uuidv4(),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        ...agentSchema.shape,
    },
    {
        tableName: "agent",
    }
);

( async () => {
    try{
        await agentModel.sync
        console.log("Agent Model Synced");
    } catch (error) {
        console.log(error);
    }
})();

export default agentModel;