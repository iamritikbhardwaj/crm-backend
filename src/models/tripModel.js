import sequelize from '../dbConfig/dbConfig.js';
import { z } from "zod";

export const tripSchema = z.object({
        BookingID: z.string(),
        PaymentStatus: z.string(),
        Validation: z.string(),
        OpsSpoc: z.string(),
        OpsStatus: z.string(),
    });

export const tripModel = sequelize.define(
        "trip",
        {
            trip_id: {
                type: uuidv4(),
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            ...tripSchema.shape,
        },
        {
            tableName: "trip",
        },
        {
            timestamps: true,
        },
        {
            createdAt: "created_at",
            updatedAt: "updated_at",
        },
        Trip.hasOne(bookingModel(sequelize), {
            foreignKey: "booking_id",
        },
        Trip.hasOne(supModel(sequelize), {
            foreignKey: "supplier_id",
        }),
        )
    );

    (async () => {
     await tripModel.sync()
    })();

    export default tripModel;