import { DataTypes } from 'sequelize';
import sequelize from '../dbConfig/dbConfig.js';

export const tripModel = sequelize.define(
        "Trip",
        {
            tripId: {
                type: DataTypes.STRING,
                allowNull: false,
                primaryKey: true,
            },
            payment: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0,
            },
            status: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: 'PENDING',
            },
            paymentStatus: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: 'Unpaid',
            },
            validation: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            opsSpoc: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            opsStatus: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            bookingDate: {
              type: DataTypes.DATE,
              allowNull: false,
              defaultValue: sequelize.fn('NOW'), // Default to current timestamp
            },
            status: { // where are we setting this
              type: DataTypes.STRING,
              allowNull: true,
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
            createdAt: "created_at",
            updatedAt: "updated_at",
        },
    );

    (async () => {
      await sequelize.sync();
  })();

    export default tripModel;