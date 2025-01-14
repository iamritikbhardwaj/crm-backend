import destModel from '../models/destModel.js';
import supModel from '../models/supModel.js';

export async function dbInit() {
  // Destination <-> Supplier (One-to-Many)
  await destModel.hasMany(supModel, {
    as: 'suppliers',
    foreignKey: 'destination_id',  // Assuming 'destination_id' is the foreign key in supModel
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });
  await supModel.belongsTo(destModel, {
    as: 'destination',
    foreignKey: 'destination_id',  // The foreign key in supModel
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });
}
