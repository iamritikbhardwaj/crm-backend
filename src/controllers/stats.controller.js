import asyncHandler from "express-async-handler"

export const getSummary = asyncHandler(async(req, res) => {
    console.log("just a dummy data for test")
    

    return res.status(200).json({
        STATUS: "Success",
        MESSAGE: "This is to confirm that get stats req was received"
    })
})