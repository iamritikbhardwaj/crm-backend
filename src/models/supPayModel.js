import { DataTypes } from "sequelize";
import sequelize from "../dbConfig/dbConfig.js";

const vendorPayModel = sequelize.define(
  "vendor_pay",
  {
    vendor_pay_id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    destination: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    currency: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    payment_status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    booking_status: {
      type: DataTypes.STRING,
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
export default vendorPayModel;