import destModel from '../models/destModel.js';
import { paymentModel } from '../models/paymentModel.js';
import supModel from '../models/supModel.js';
import tripModel from '../models/tripModel.js';
import supPayModel from '../models/supPayModel.js';
import { reconModel } from '../models/reconModel.js';
import issuesModel from '../models/issues.models.js';
import payLinkModel from '../models/payLink.model.js';
import flyremitModel from '../models/flyremitModel.js';
import { agentModel, benificiaryModel, agentAccountDetails, agentDocuments, notifications } from '../models/agentModel.js';
import { ActivityFreezeQuotationModel, freezequotationModel, HotelFreezeQuotationModel } from '../models/freezequotation.model.js';

export async function dbInit() {
  try {
    // Relationships
    destModel.hasMany(supModel, {
      as: 'suppliers',
      foreignKey: 'destination_id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
    supModel.belongsTo(destModel, {
      as: 'destinations',
      foreignKey: 'destination_id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });

    // Trip - Payment relationship
    tripModel.hasMany(paymentModel, {
      as: 'payments',
      foreignKey: 'tripId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
    paymentModel.belongsTo(tripModel, {
      as: 'Trips',
      foreignKey: 'tripId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });

    // Trip - SupPay relationship
    tripModel.hasMany(supPayModel, {
      as: 'supPayment',
      foreignKey: 'tripId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
    supPayModel.belongsTo(tripModel, {
      as: 'Trips',
      foreignKey: 'tripId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });

    // Trip - Recon relationship
    tripModel.hasMany(reconModel, {
      as: 'recon',
      foreignKey: 'tripId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
    reconModel.belongsTo(tripModel, {
      as: 'Trips',
      foreignKey: 'tripId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });

    // Trip - issues
    tripModel.hasMany(issuesModel, {
      as: 'issues',
      foreignKey: 'tripId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
    issuesModel.belongsTo(tripModel, {
      as: 'Trips',
      foreignKey: 'tripId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });

    tripModel.hasMany(payLinkModel, {
      as: 'paylink',
      foreignKey: 'tripId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });

    payLinkModel.belongsTo(tripModel, {
      as: 'Trips',
      foreignKey: 'tripId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });

    // flyremit agent relationship
    agentModel.hasOne(flyremitModel, {
      as: 'flyremit',
      foreignKey: 'agent_id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
    flyremitModel.belongsTo(agentModel, {
      as: 'agent',
      foreignKey: 'agent_id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });

        // ! freezequotation relations
    // trip one-one freezequotation
    tripModel.hasOne(freezequotationModel, {
      as: "freezequotation",
      foreignKey: "tripId",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
    freezequotationModel.belongsTo(tripModel, {
      as: "trip",
      foreignKey: "tripId",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    // freezequotation one-many products freezequotation
    freezequotationModel.hasMany(ActivityFreezeQuotationModel, {
      as: "freezequotation_products",
      foreignKey: "freezequotation_id",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
    ActivityFreezeQuotationModel.belongsTo(freezequotationModel, {
      as: "freezequotation",
      foreignKey: "freezequotation_id",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    // freezequotation one-many hotels freezequotation
    freezequotationModel.hasMany(HotelFreezeQuotationModel, {
      as: "freezequotation_hotels",
      foreignKey: "freezequotation_id",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
    HotelFreezeQuotationModel.belongsTo(freezequotationModel, {
      as: "freezequotation",
      foreignKey: "freezequotation_id",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    // agent relations
    agentModel.hasOne(benificiaryModel, {
      as: "benificiary",
      foreignKey: "agent_id",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    })
    agentModel.hasOne(agentAccountDetails, {
      as: "agent_account_details",
      foreignKey: "agent_id",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    })
    agentModel.hasOne(agentDocuments, {
      as: "agent_documents",
      foreignKey: "agent_id",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    })
    agentModel.hasOne(notifications, {
      as: "notifications",
      foreignKey: "agent_id",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    })

    benificiaryModel.belongsTo(agentModel, {
      as: "agent",
      foreignKey: "agent_id",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    })
    agentAccountDetails.belongsTo(agentModel, {
      as: "agent",
      foreignKey: "agent_id",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    })
    agentDocuments.belongsTo(agentModel, {
      as: "agent",
      foreignKey: "agent_id",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    })
    notifications.belongsTo(agentModel, {
      as: "agent",
      foreignKey: "agent_id",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    })

    // Sync models
    console.time('dbSync');
    await Promise.all([
      tripModel.sync(),
      supModel.sync(),
      destModel.sync(),
      paymentModel.sync(),
      supPayModel.sync(),
      reconModel.sync(),
      issuesModel.sync(),
      payLinkModel.sync(),
      flyremitModel.sync(),
      freezequotationModel.sync(),
      ActivityFreezeQuotationModel.sync(),
      HotelFreezeQuotationModel.sync(),
      // agentModel.sync(),
      // benificiaryModel.sync(),
      // agentAccountDetails.sync(),
      // agentDocuments.sync(),
      // notifications.sync(),
    ]);
    console.timeEnd('dbSync');
    console.log('Database initialized successfully!');
  } catch (error) {
    console.error('Error initializing the database:', error);
  }
}
