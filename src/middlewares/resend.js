import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// ! in this mail we need to provide from, to, username and password
const userMail = async (name, email, password) => {
  try {
    const data = await resend.emails.send({
      from: "ActivityBeds <noreply@tomatotrails.com>",
      to: email,
      subject: "Successful Login Creation",
      text: `Dear ${name},
            Your account has been created, kindly find your login details below to access our Delivery CRM
            URL
            http://91.205.105.35:63193/login
            USERNAME
            ${email}
            PASSWORD
            ${password}
            
            Warm Regards
 
            ActivityBeds
            Think Global…Go Local!!!`,
    });
    console.log(data);
  } catch (error) {
    console.error(error);
  }
};

// ! in this mail we need to provide from, to, user name , booking id, customer name, start date, end date, pax, sales spoc
const createBookingMail = async (mail) => {
  try {
    const data = await resend.emails.send({
      from: "ActivityBeds <noreply@tomatotrails.com>",
      to: mail.email,
      subject: "Successful Booking Creation",
      text: `Dear ${mail.user},
      The new Booking is created as per below details. It is under Que for the Validation Team. You will get the email if the booking is Confirmed/Rejected.
      BOOKING ID ${mail.booking_id}
       
      CUSTOMER NAME ${mail.customer_name}
       
      START DATE ${mail.start_date}
       
      END DATE ${mail.end_date}
       
      NO OF ADULT/CHILD ${mail.pax}
       
      SALES SPOC ${mail.sales_spoc}
            
      Warm Regards
 
      ActivityBeds
      Think Global…Go Local!!!`,
    });
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

const confirmBookingMail = async (mail) => {
  try {
    const data = await resend.emails.send({
      from: "ActivityBeds <noreply@tomatotrails.com>",
      to: mail.email,
      subject: "Successful Trip Creation",
      text: `Dear ${mail.user},
        Your New Booking is Confirmed by the Validation Team & the Delivery SPOC is assigned for the same. Pls find the details of the Confirmed Trip for your reference.
        TRIP ID ${mail.tripId}
         
        CUSTOMER NAME ${mail.customer_name}
         
        START DATE ${mail.start_date}
         
        END DATE ${mail.end_date}
         
        NO OF ADULT/CHILD ${mail.pax}
         
        SALES SPOC ${mail.sales_spoc}

        OPS SPOC ${mail.ops_spoc}
              
        Warm Regards
   
        ActivityBeds
        Think Global…Go Local!!!`,
    });
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

const rejectBookingMail = async (mail) => {
  try {
    const data = await resend.emails.send({
      from: "ActivityBeds <noreply@tomatotrails.com>",
      to: mail.email,
      subject: "New Booking Rejected",
      text: `Dear ${mail.user},
        The new Booking is REJECTED by Validation Team as per below Comments. Pls read the same & try to resolve. Thereafter pls create the New Booking.
        Pls Note that data is erased from the database on Rejection of Booking.        
        BOOKING ID ${mail.booking_id}
         
        CUSTOMER NAME ${mail.customer_name}
         
        START DATE ${mail.start_date}
         
        END DATE ${mail.end_date}
         
        NO OF ADULT/CHILD ${mail.pax}
         
        SALES SPOC ${mail.sales_spoc}

        Rejection Comments ${mail.comments}
              
        Warm Regards
   
        ActivityBeds
        Think Global…Go Local!!!`,
    });
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

const cancelBookingMail = async (mail) => {
  try {
    const data = await resend.emails.send({
      from: "ActivityBeds <noreply@tomatotrails.com>",
      to: mail.email,
      subject: "Trip ID Cancelled",
      text: `Dear ${mail.user},
      Your Trip ID is canceled by the operation team. Pls find the details of the Cancelled Trip for your reference.
      
      TRIP ID ${mail.tripId}
      
      CUSTOMER NAME ${mail.customer_name}
      
      START DATE ${mail.start_date}
      
      END DATE ${mail.end_date}
      
      NO OF ADULT/CHILD ${mail.pax}
      
      SALES SPOC ${mail.sales_spoc}
      
      OPS SPOC ${mail.ops_spoc}
      
      Warm Regards
      
      ActivityBeds
      Think Global…Go Local!!!`,
    });
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

const voucherMail = async (mail) => {
  try {
    const data = await resend.emails.send({
      from: "ActivityBeds <noreply@tomatotrails.com>",
      to: mail.email,
      subject: `Trip ID ${mail.tripId} Voucher Attached`,
      text: `Dear ${mail.user},
            Your Vouchers for the TRIP had been released. Pls find the details of the Trip for which the Voucher is Attached..            TRIP ID ${mail.tripId}
             
            CUSTOMER NAME ${mail.customer_name}
             
            START DATE ${mail.start_date}
             
            END DATE ${mail.end_date}
             
            NO OF ADULT/CHILD ${mail.pax}
             
            SALES SPOC ${mail.sales_spoc}
    
            OPS SPOC ${mail.ops_spoc}
                  
            Warm Regards
       
            ActivityBeds
            Think Global…Go Local!!!`,
    });
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

const reconMail = async (mail) => {
  try {
    const data = await resend.emails.send({
      from: "ActivityBeds <noreply@tomatotrails.com>",
      to: mail.email,
      subject: `Trip ID ${mail.tripId} – Reconciliation Done`,
      text: `Dear ${mail.user},
        The Reconciliation is completed for the below TRIP ID. Pls validate the same so that the Accounts are closed.               
              CUSTOMER NAME ${mail.customer_name}
               
              START DATE ${mail.start_date}
               
              END DATE ${mail.end_date}
               
              NO OF ADULT/CHILD ${mail.pax}
               
              SALES SPOC ${mail.sales_spoc}
      
              OPS SPOC ${mail.ops_spoc}
                    
              Warm Regards
         
              ActivityBeds
              Think Global…Go Local!!!`,
    });
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

export {
  userMail,
  createBookingMail,
  confirmBookingMail,
  rejectBookingMail,
  cancelBookingMail,
  voucherMail,
  reconMail,
};
