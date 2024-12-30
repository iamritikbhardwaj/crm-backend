import destModel from '../models/destModel.js';
import agentModel from '../models/agentModel.js';
import tripModel from '../models/tripModel.js';
import { bookingModel } from '../models/bookingModel.js';
import supModel from '../models/supModel.js';
import bookingDetailsModel from '../models/bookindetails.js';

export default async function dbInit() {
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

  // Agent <-> Booking (One-to-Many)
  await agentModel.hasMany(bookingModel, {
    as: 'bookings',
    foreignKey: 'agent_id',  // Assuming 'agent_id' is the foreign key in bookingModel
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });
  await bookingModel.belongsTo(agentModel, {
    as: 'agents',
    foreignKey: 'agent_id',  // Foreign key in bookingModel
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });

  // Booking <-> Destination (Many-to-Many through bookingDetailsModel)
  await bookingModel.belongsToMany(destModel, {
    through: bookingDetailsModel,
    as: 'destinations',  // Alias for accessing destinations related to a booking
    foreignKey: 'booking_id',  // Foreign key in bookingDetailsModel
    otherKey: 'destination_id',  // Foreign key in bookingDetailsModel
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });
  await destModel.belongsToMany(bookingModel, {
    through: bookingDetailsModel,
    as: 'bookings',  // Alias for accessing bookings related to a destination
    foreignKey: 'destination_id',  // Foreign key in bookingDetailsModel
    otherKey: 'booking_id',  // Foreign key in bookingDetailsModel
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });

  // Trip <-> Supplier (One-to-Many)
  await tripModel.hasMany(supModel, {
    as: 'suppliers',
    foreignKey: 'trip_id',  // Assuming 'trip_id' is the foreign key in supModel
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });
  await supModel.belongsTo(tripModel, {
    as: 'trip',
    foreignKey: 'trip_id',  // The foreign key in supModel
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });

  // Trip <-> BookingDetails (One-to-One or One-to-Many depending on your logic)
  await tripModel.hasOne(bookingDetailsModel, {
    as: 'bookingDetails',
    foreignKey: 'trip_id',  // Assuming 'trip_id' is the foreign key in bookingDetailsModel
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });
  await bookingDetailsModel.belongsTo(tripModel, {
    as: 'trip',
    foreignKey: 'trip_id',  // Foreign key in bookingDetailsModel
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });
}
