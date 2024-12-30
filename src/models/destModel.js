import { DataTypes } from 'sequelize';
import sequelize from '../dbConfig/dbConfig.js';
import { v4 as uuidv4 } from "uuid";

export const destModel = sequelize.define(

    "destination",
    {
        destination_id: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
            defaultValue: uuidv4(),
        },
        destination: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        currency: {
            type: DataTypes.STRING,
            allowNull: false,
            
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'active',
        },
        
    },
    {
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
);

export default destModel;