import { DataTypes, UUIDV4 } from "sequelize";
import sequelize from "../dbConfig/dbConfig.js";

const bookingDetailsModel = sequelize.define(
    "booking_details",
    {
        id: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
            defaultValue: UUIDV4(),
        },
        booking_id: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        destination: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
    }
);  

export default bookingDetailsModel;