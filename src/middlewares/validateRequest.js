import { z } from "zod";

const validate = (schema) => {
  return (req, res, next) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors = error.errors.map((err) => err.message);
        return res.status(400).json({
          STATUS: "FAIL",
          MESSAGE: "Validation error",
          OUTPUT: errors,
        });
      }
      next(error);
    }
  };
};

export default validate;