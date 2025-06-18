import sequelize from "../dbConfig/dbConfig.js";
import { DataTypes } from "sequelize";

export const ActivityFreezeQuotationModel = sequelize.define(
    "product_freezequotation",
    {
        activity_freezequotation_id: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "Hotel"
        },
        travel_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        pick_up: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        drop: {
            type: DataTypes.STRING,
            allowNull: true
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        supplier: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        canc_deadline: {
            type: DataTypes.STRING,
            allowNull: false
        },
        discounting_lc: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        transfer_price_usd: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: true
        },
        freezequotation_id: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: "freezequotations",
                key: "freezequotation_id"
            },
            onDelete: "CASCADE",
            onUpdate: "CASCADE"
        },

    },
    {
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
    }
);

export const HotelFreezeQuotationModel = sequelize.define(
    "hotel_freezequotation",
    {
        hotel_freezequotation_id: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "Hotel"
        },
        check_in: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        check_out: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        supplier: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        canc_deadline: {
            type: DataTypes.STRING,
            allowNull: false
        },
        discounting_lc: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        transfer_price_usd: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: true
        },
        freezequotation_id: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: "freezequotations",
                key: "freezequotation_id"
            },
            onDelete: "CASCADE",
            onUpdate: "CASCADE"
        },

    },
    {
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
    }
);

export const freezequotationModel = sequelize.define(
    "freezequotations",
    {
        freezequotation_id: {
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
);