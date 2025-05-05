import { Stripe } from "stripe"

const stripe = new Stripe(process.env.STRIPE_SKKEY)

const sendPaymentLink = async (email, amount, currency) => {
    const paymentLink = await stripe.paymentLinks.create({
        line_items: [
            {
                price_data: {
                    currency: currency,
                    product_data: {
                        name: "Invoice",
                    },
                    unit_amount: amount * 100,
                },
                quantity: 1,
            },
        ],
        email: email,
        metadata: {
            email: email,
        },
    });
    return paymentLink.url;
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
        const { agent_email: email, amount, currency } = req.body;

        console.log(`Email: ${email}, Amount: ${amount}, Currency: ${currency}`);

        if (!email || !amount || !currency) {
            throw new Error("Missing required parameters: email, amount, or currency");
        }

        // Ensure amount is a number
        const parsedAmount = parseFloat(amount);
        if (isNaN(parsedAmount)) {
            throw new Error("Amount must be a valid number");
        }

        const paymentLink = await sendPaymentLink(email, parsedAmount, currency);
        console.log(`Invoice sent with payment link: ${paymentLink}`);
        
        req.paymentLink = paymentLink;
        next();
    } catch (error) {
        console.error("Error while creating payment link using stripe:", error);
        
        // Handle the error appropriately
        if (res && res.status) {
            res.status(500).json({ 
                success: false, 
                error: error.message || "Failed to create payment link" 
            });
        } else if (typeof next === 'function') {
            next(error);
        }
    }
}