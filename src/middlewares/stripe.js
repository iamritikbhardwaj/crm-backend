import { Stripe } from "stripe"
import flyremitModel from "../models/flyremitModel.js";

const stripe = new Stripe(process.env.STRIPE_SKKEY)

const sendPaymentLink = async (email, amount, currency) => {
    try {
        // Convert amount to integer cents (Stripe requires integer amounts)
        const unitAmount = Math.round(parseFloat(amount) * 100);

        // Ensure currency is lowercase as Stripe requires
        const normalizedCurrency = String(currency).toLowerCase();

        console.log(`Creating payment link with: ${unitAmount} ${normalizedCurrency} for ${email}`);

        // First create a price object
        const price = await stripe.prices.create({
            currency: normalizedCurrency,
            unit_amount: unitAmount,
            product_data: {
                name: "Invoice Payment",
            },
        });

        // Then create a payment link with that price
        const paymentLink = await stripe.paymentLinks.create({
            line_items: [
                {
                    price: price.id,
                    quantity: 1,
                },
            ],
            metadata: {
                email: email,
            },
        });

        console.log("Payment link created successfully:", paymentLink.url);
        return paymentLink.url;
    } catch (error) {
        console.error("Error in sendPaymentLink function:", error);
        throw error; // Re-throw to be handled by the calling function
    }
}

/**
 * Creates a Stripe payment link for a given amount, currency, and email.
 *
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @param {Function} next - The next middleware function
 * @returns {Promise<void>}
 * @throws {Error} If there is an error while creating the payment link
 */
export const createPaymentLink = async (req, res, next) => {
    try {

        // Extract parameters from request body
        const { agent_email: email, amount, currency, commision, xerate } = req.body;
        const agentId = req.body.agent_name.split(" ")[0];
        const tripId = req.query.tripId

        const inr = parseInt((amount * xerate) + (amount * xerate) * (commision / 100)) + 1


        console.log(`Processing payment request - Email: ${email}, Amount: ${amount}, Currency: ${currency}`);

        // flyremit check
        if (parseFloat(commision) === 1.5) {
            const agent = await flyremitModel.findOne({
                where: {
                    agent_id: agentId
                }
            })
            if (!agent) {
                console.log(commision)
                req.paymentLink = `https://v5agent.flyremit.com/Activitybeds/abagent/Registration?ActivitybedsId=${agentId}`
                next();
            } else {
                req.paymentLink = `https://v5agent.flyremit.com/Activitybeds/abagent/result?AgentId=${agentId}&BookingId=${tripId}&Amount=${inr}`;
                next();
            }
        } else {
            // Validate required parameters
            if (!email) {
                return res.status(400).json({
                    success: false,
                    error: "Missing required parameter: email"
                });
            }

            if (!amount) {
                return res.status(400).json({
                    success: false,
                    error: "Missing required parameter: amount"
                });
            }

            if (!currency) {
                return res.status(400).json({
                    success: false,
                    error: "Missing required parameter: currency"
                });
            }

            const finalAmount = parseFloat(amount) * parseFloat(xerate)

            // Validate amount is a number
            const parsedAmount = (finalAmount) + (finalAmount * parseFloat(commision) / 100);
            if (isNaN(parsedAmount) || parsedAmount <= 0) {
                return res.status(400).json({
                    success: false,
                    error: "Amount must be a positive number"
                });
            }

            // Create payment link
            const paymentLink = await sendPaymentLink(email, parsedAmount, currency);
            console.log(`Payment link created: ${paymentLink}`);

            // Attach to request object for the next middleware
            req.paymentLink = paymentLink;

            // Continue to next middleware
            next();
        }


    } catch (error) {
        console.error("Error in createPaymentLink middleware:", error);

        // Send error response
        return res.status(500).json({
            success: false,
            error: error.message || "Failed to create payment link"
        });
    }
}