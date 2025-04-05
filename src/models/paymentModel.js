import { DataTypes } from "sequelize";
import sequelize from "../dbConfig/dbConfig.js";

export const paymentModel = sequelize.define(
    "payment",
    {
        payment_id: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
        },
        amount: {
            type: DataTypes.DECIMAL(10,2),
            allowNull: false,
        },
        paymentMode: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        remarks: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        validatedBy: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false,
        }, 
        convRate: {
            type: DataTypes.DECIMAL(10,2),
            allowNull: true,
        },
        conFee: {
            type: DataTypes.DECIMAL(10,2),
            allowNull: true,
        },
        tripId: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
              model: 'Trips',  // Name of the destination table
              key: 'tripId',
            },
            allowNull: false,
          },
    },
    {
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
    }
);