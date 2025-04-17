import { DataTypes } from 'sequelize';
import sequelize from '../dbConfig/dbConfig.js';
import { v4 as uuidv4 } from "uuid";

export const supModel = sequelize.define(
    "supplier",
    {
        supplier_id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue: uuidv4(),
        },
        name:  {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
            tolowerCase: true
        },
        destination_id: {
            type: DataTypes.UUID,
            references: {
              model: 'destinations',  // Name of the destination table
              key: 'destination_id',
            },
            allowNull: false,
          },
    },
    {
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
);

export default supModel;