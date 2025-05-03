import sequelize from "../dbConfig/dbConfig.js";
import { DataTypes } from "sequelize";

const payLinkModel = sequelize.define(
    "paylink",
    {
        paylink_id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
        },
        link: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
    },
);

export default payLinkModel;