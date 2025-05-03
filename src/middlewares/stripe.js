import { Stripe } from "stripe"

const stripe = new Stripe(process.env.STRIPE_SKKEY)

const sendInvoiceWithPaymentLink = async (email, amount, currency) => {
    try {
        // Create a customer with the provided email
        const customer = await stripe.customers.create({
            email: email,
        });

        // Create an invoice for the customer
        const invoice = await stripe.invoices.create({
            customer: customer.id, // Use the customer ID directly
            collection_method: 'send_invoice',
            days_until_due: 10, // Adjust as needed
        });

        // Create an invoice item with the specified amount and currency
        await stripe.invoiceItems.create({
            customer: invoice.customer,
            amount: Math.round(amount * 100), // Ensure amount is a valid integer in cents
            currency: currency,
            invoice: invoice.id,
        });

        // Finalize the invoice
        const finalizedInvoice = await stripe.invoices.finalizeInvoice(invoice.id);
        
        // Send the invoice to the customer
        await stripe.invoices.sendInvoice(finalizedInvoice.id);

        // Return the hosted invoice URL for payment
        return finalizedInvoice.hosted_invoice_url;
    } catch (error) {
        console.error("Error occurred while creating invoice using stripe:", error);
        throw error; // Re-throw the error for proper error handling
    }
};

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
        const { email, amount, currency } = req.body;

        if (!email || !amount || !currency) {
            throw new Error("Missing required parameters: email, amount, or currency");
        }

        // Ensure amount is a number
        const parsedAmount = parseFloat(amount);
        if (isNaN(parsedAmount)) {
            throw new Error("Amount must be a valid number");
        }

        const paymentLink = await sendInvoiceWithPaymentLink(email, parsedAmount, currency);
        console.log(`Invoice sent with payment link: ${paymentLink}`);
        
        // Assuming you want to pass the payment link to the next middleware
        // or send it as a response
        if (typeof next === 'function') {
            next(paymentLink);
        } else {
            res.status(200).json({ success: true, paymentLink });
        }
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