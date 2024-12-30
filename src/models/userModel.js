import { DataTypes } from "sequelize";
import { z } from "zod";
import { v4 as uuidv4 } from "uuid";
import sequelize from "../dbConfig/dbConfig.js";

export const userSchema = z.object({
    name: z.string(),
    phone: z.string().optional(),
    profile: z.string().optional(),
    email: z.string(),
    password: z.string(),
    status: z.string().optional(),
});

export const userModel = sequelize.define(
        "user",
        {
            id: {
                type: DataTypes.STRING,
                allowNull: false,
                primaryKey: true,
                defaultValue: uuidv4(),
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            phone: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            profile: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            password: {
                type: DataTypes.STRING(64),
                allowNull: false,
            },
            status: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: "active",
            },
        },
        {
            timestamps: true,
            createdAt: "createdAt",
            updatedAt: "updatedAt",
        }
    );