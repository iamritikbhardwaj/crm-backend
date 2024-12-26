import sequelize from '../dbConfig/dbConfig.js';
import { z } from "zod";

export const destSchema = z.object({
    Destination: z.string(),
    CountryCode: z.string(),
});

export const destModel = sequelize.define(
    "destination",
    {
        destination_id: {
            type: uuidv4(),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        ...destSchema.shape,
    },
    {
        tableName: "destination",
    }
);

( async () => {
    await destModel.sync();
})();

export default destModel;