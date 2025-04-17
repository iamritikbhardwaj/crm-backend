import { Op } from "sequelize";
import sequelize from "../dbConfig/dbConfig.js";
import { tripModel } from "../models/tripModel.js";

// Function to update booking status based on dates
async function updateTripStatus() {
  try {
    const updatedRows = await tripModel.update(
      {
        status: sequelize.Sequelize.literal(`
          CASE
            WHEN departureDate <= CURDATE() AND status = 'ON-TOUR' THEN 'TRAVELLED' 
            WHEN arrivalDate <= CURDATE() AND status != 'TRAVELLED' THEN 'ON-TOUR' 
            ELSE status 
          END
        `),
      },
      {
        where: {
          status: { [Op.ne]: "CANCELLED" }, // Ensure the status is not 'CANCELLED'
        },
      }
    );

    console.log(`${updatedRows[0]} bookings updated successfully.`);
  } catch (error) {
    console.error("Error updating booking status:", error);
  }
}

export default updateTripStatus;
