import destModel from '../models/destModel.js';
import { paymentModel } from '../models/paymentModel.js';
import supModel from '../models/supModel.js';
import tripModel from '../models/tripModel.js';
import supPayModel from '../models/supPayModel.js';
import { reconModel } from '../models/reconModel.js';

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

    // Sync models
    console.time('dbSync');
    await Promise.all([
      tripModel.sync(),
      supModel.sync(),
      destModel.sync(),
      paymentModel.sync(),
      supPayModel.sync(),
      reconModel.sync(),
    ]);
    console.timeEnd('dbSync');
    console.log('Database initialized successfully!');
  } catch (error) {
    console.error('Error initializing the database:', error);
  }
}
