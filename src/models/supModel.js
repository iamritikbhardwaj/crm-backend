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
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
            tolowerCase: true
        },
    },
    {
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
);

(async () => {
    await sequelize.sync();
})();

export default supModel;