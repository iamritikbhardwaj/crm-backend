import { DataTypes } from "sequelize";
import sequelize from "../dbConfig/dbConfig.js";

export const paymentUploadsModel = sequelize.define(
  "payment_uploads",
  {
    transaction_id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    payment_date: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    paying_currency: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    payment_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // agent name from agent table
    credit_card: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    payment_upload_status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    remitance_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    remitance_swift_copy: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    agent_remarks: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    finance_remarks: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    payment_instument: {
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

export const agentLedgerModel = sequelize.define(
  "agent_ledger",
  {
    transaction_id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    agent_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    transaction_date: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    booking_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    cancellation_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    refund_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    tour_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    payment_method: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    credit: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    debit: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    balance: {
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

export const cancellationModel = sequelize.define(
  "cancellation",
  {
    cancellation_id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    cancellation_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    // booking id from booking table
  },
  {
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

export const refundModel = sequelize.define( // ! agent booking cancellation supplier 
  "refunds",
  {
    refund_id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    // booking id from booking table
    // cancellation date from cancellation table
    refund_status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "NON-REFUNDED",
    },
    // cancellation id cancellation tab;e
    remarks: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    refund_amount: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    refund_currency: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    payment_processor: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    booking_amount: {
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

export const supplier_paymentsModel = sequelize.define(
  "supplier_payments",
  {
    // booking id from booking table
    payment_id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    cancellation_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    cancellation_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    local_transfer_price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    payment_status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    selling_price: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    selling_currency: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    banktransfer_price: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    payment_processor_fee: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    payment_processor: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    transfer_price: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    payment_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

export const supplierLedgerModel = sequelize.define(
  "supplier_ledger",
  {
    transaction_id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    supplier_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    transaction_date: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    booking_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    cancellation_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    refund_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    tour_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    payment_method: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    credit: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    debit: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    balance: {
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