import sequelize from '../dbConfig/dbConfig.js';
import { z } from "zod";

export const bookingSchema = z.object({
    BookingDate: z.string(),
    SalesSPOC: z.string(),
    CustomerName: z.string(),
    ArrivalDate: z.string(),
    DepartureDate: z.string(),
    TravelMonth: z.string(),
    CountryCode: z.string(),
    OrderValue: z.string(),
    WhatsappNumber: z.string(),
});

export const bookingModel = sequelize.define(
        "booking",
        {
            booking_id: {
                type: uuidv4(),
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            ...bookingSchema.shape,
        },
        {
            tableName: "booking",
        },
        Booking.hasOne(destModel(sequelize), (
            {
                foreignKey: "destination_id",
            }
        )),
        Booking.hasOne(agentModel(sequelize), (
            {
                foreignKey: "agent_id",
            }
        ),
        ))


(async () => {
    await bookingModel.sync();
})