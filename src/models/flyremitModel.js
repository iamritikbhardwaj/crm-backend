import sequelize from "../dbConfig/dbConfig.js";
import { DataTypes } from "sequelize";

const flyremitModel = sequelize.define(
    "flyremit",
    {
        flyremit_id: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
        },
    },
    {
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
    }
)

export default flyremitModel;