import sequelize from "../dbConfig/dbConfig.js";
import { DataTypes } from "sequelize";

const issuesModel = sequelize.define(
    "issues",
    {
        issue_id: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        resolution: {
            type: DataTypes.STRING,
            allowNull: false
        },
        responsible: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
    }
);

export default issuesModel;