import { DataTypes } from 'sequelize';
import sequelize from '../dbConfig/dbConfig.js';
import { v4 as uuidv4 } from 'uuid';

// Define the booking model
export const bookingModel = sequelize.define(
  'booking',
  {
    booking_id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      defaultValue: uuidv4(), // Let the application handle UUID generation
    },
    bookingDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW, // Default to current timestamp
    },
    destination: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    salesSpoc: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    agent: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    customerName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    arrivalDate: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    departureDate: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pax: {
      type: DataTypes.JSON, // Use JSON instead of JSONB
      allowNull: false,
    },
    orderValue: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    countryCode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    whatsappNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    documents: {
      type: DataTypes.JSON, // Use JSON instead of JSONB
      allowNull: true,
    },
  },
  {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
);

