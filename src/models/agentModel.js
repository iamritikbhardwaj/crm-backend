import { v4 as uuidv4 } from "uuid";
import sequelize from "../dbConfig/dbConfig.js";
import { DataTypes } from "sequelize";

export const agentModel = sequelize.define(
    "agent",
    {
        agent_id: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
            defaultValue: uuidv4(),
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
    }
);


export default agentModel;