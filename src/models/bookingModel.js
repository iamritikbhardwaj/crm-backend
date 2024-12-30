import { DataTypes } from 'sequelize';
import sequelize from '../dbConfig/dbConfig.js';
import { v4 as uuidv4 } from "uuid";

export const bookingModel = sequelize.define(
        "booking",
        {
            booking_id: {
                type: DataTypes.STRING,
                allowNull: false,
                primaryKey: true,
                defaultValue: uuidv4(),
            },
            bookingDate: {
                type: DataTypes.DATE,
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
            paxAdult: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            paxChild: {
                type: DataTypes.JSON,
                allowNull: false,
                defaultValue: [],
            },
            childAge: {
                type: DataTypes.VIRTUAL,
                allowNull: false,
                get() {
                    return this.paxChild ? this.paxChild.length : 0;
                },
            },
            arrivalDate: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            departureDate: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            countryCode: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            constactDetais: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            orderValue: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },
        {
            timestamps: true,
            createdAt: "created_at",
            updatedAt: "updated_at",
        }
        )
