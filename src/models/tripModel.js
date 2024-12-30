import { DataTypes } from 'sequelize';
import sequelize from '../dbConfig/dbConfig.js';
import { randomBytes } from 'crypto';

const generateRandomLetters = () => {
  return randomBytes(2)
    .toString('hex')
    .toUpperCase()
    .replace(/[^A-Z]/g, '')
    .slice(0, 2); // Generate two random uppercase letters
};

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
            },
            status: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            paymentStatus: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            validation: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            opsSpoc: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            opsStatus: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
       { hooks: {
            beforeCreate: async (trip) => {
              const currentYear = new Date().getFullYear().toString().slice(2);
      
              let uniqueTripId = null;
      
              while (!uniqueTripId) {
                const randomLetters = generateRandomLetters();
      
                // Fetch the latest invoice number
                const lastTrip = await tripModel.findOne({
                  order: [['createdAt', 'DESC']], // Sort by creation date, latest first
                  attributes: ['tripId'], // Only fetch the tripId field
                });
      
                let newInvoiceNumber = 1; // Default to 1 if no trips exist
      
                if (lastTrip) {
                  const lastInvoiceNumber = parseInt(
                    lastTrip.tripId.slice(4),
                    10 // Extract and convert the last 4 digits to a number
                  );
                  newInvoiceNumber = lastInvoiceNumber + 1;
                }
      
                // Format the new trip ID
                const formattedInvoice = String(newInvoiceNumber).padStart(4, '0'); // Ensure 4 digits
                const generatedId = `${randomLetters}${currentYear}${formattedInvoice}`;
      
                // Check uniqueness
                const existingTrip = await tripModel.findOne({ where: { tripId: generatedId } });
                if (!existingTrip) {
                  uniqueTripId = generatedId; // Set the unique trip ID
                }
              }
      
              trip.tripId = uniqueTripId;
            },
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