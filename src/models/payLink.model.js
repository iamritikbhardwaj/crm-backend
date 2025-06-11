import sequelize from "../dbConfig/dbConfig.js";
import { DataTypes } from "sequelize";

const payLinkModel = sequelize.define(
    "paylink",
    {
        link_id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
        },
        link: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        agent_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        agent_email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        amount: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        currency: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        xerate: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        commision: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        source: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        agent_id: {
            type: DataTypes.STRING,
            allowNull: true,
        }
    },
    {
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
    },
);

export default payLinkModel;