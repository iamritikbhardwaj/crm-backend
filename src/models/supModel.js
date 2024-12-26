import sequelize from '../dbConfig/dbConfig.js';
import { z } from "zod";

export const supSchema = z.object({
    Supplier: z.string(),
    Status: z.string(),
});

export const supModel = sequelize.define(
    "supplier",
    {
        supplier_id: {
            type: uuidv4(),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        ...supSchema.shape,
    },
    {
        tableName: "supplier",
    }
);

( async () => {
    await supModel.sync();
})();

export default supModel;