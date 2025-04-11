import { DataTypes } from "sequelize";
import sequelize from "../dbConfig/dbConfig.js";

export const reconModel = sequelize.define(
    "recon",
    {
        recon_id: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
        },
        online: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        offline: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        land: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
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
