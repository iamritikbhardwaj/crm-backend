import { v4 as uuidv4 } from "uuid";
import sequelize from "../dbConfig/dbConfig.js";
import { DataTypes } from "sequelize";

export const agentModel = sequelize.define(
    "agent",
    {
        agent_id: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
            defaultValue: uuidv4(),
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        address: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        state: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        city: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        country: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        pincode: {
            type: DataTypes.NUMBER,
            allowNull: true,
        },
        certificates: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: true,
        }
    },
    {
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
    }
);

export const benificiaryModel = sequelize.define(
    "benificiary",
    {
        benificiary_id: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
            defaultValue: uuidv4(),
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        address: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        state: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        city: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        country: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        pincode: {
            type: DataTypes.NUMBER,
            allowNull: true,
        },
        certificates: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: true,
        },
        presentage_owned: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
    }
);

export const notifications = sequelize.define(
    "notifications",
    {
        notification_id: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
            defaultValue: uuidv4(),
        },
        updates: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        reminders: {
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

export const agentDocuments = sequelize.define(
    "documents",
    {
        document_id: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
            defaultValue: uuidv4(),
        },
        documents: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: false,
        },
    },
    {
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
    }
);

export const agentAccountDetails = sequelize.define(
    "account_details",
    {
        account_id: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
            defaultValue: uuidv4(),
        },
        currency: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        language: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        account_manager: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        account_manager_email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        agent_type: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        destination: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
    }
)