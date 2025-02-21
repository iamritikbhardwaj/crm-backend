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
const createBookingMail = async (email, name, booking_id, customer_name, start_date, end_date, pax, cc) => {
  try {
    const data = await resend.emails.send({
      from: "ActivityBeds <noreply@tomatotrails.com>",
      to: email,
      bcc: cc,
      subject: "Successful Booking Creation",
      text: `Dear ${name},
      The new Booking is created as per below details. It is under Que for the Validation Team. You will get the email if the booking is Confirmed/Rejected.
      BOOKING ID ${booking_id}
       
      CUSTOMER NAME ${customer_name}
       
      START DATE ${start_date}
       
      END DATE ${end_date}
       
      NO OF ADULT/CHILD ${pax?.A}/${pax?.C}-${pax?.Ca}
       
      SALES SPOC ${name}
            
      Warm Regards
 
      ActivityBeds
      Think Global…Go Local!!!`,
    });
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

const confirmBookingMail = async (email, user, tripId, customer_name, start_date, end_date, pax, sales_spoc, ops_spoc, cc) => {
  try {
    const data = await resend.emails.send({
      from: "ActivityBeds <noreply@tomatotrails.com>",
      to: email,
      bcc: cc,
      subject: "Successful Trip Creation",
      text: `Dear ${user},
        Your New Booking is Confirmed by the Validation Team & the Delivery SPOC is assigned for the same. Pls find the details of the Confirmed Trip for your reference.
        TRIP ID ${tripId}
         
        CUSTOMER NAME ${customer_name}
         
        START DATE ${start_date}
         
        END DATE ${end_date}
         
        NO OF ADULT/CHILD ${pax?.A}/${pax?.C}-${pax?.Ca}
         
        SALES SPOC ${sales_spoc}

        OPS SPOC ${ops_spoc}
              
        Warm Regards
   
        ActivityBeds
        Think Global…Go Local!!!`,
    });
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

const rejectBookingMail = async (email, user, booking_id, customer_name, start_date, end_date, pax, comments) => {
  try {
    const data = await resend.emails.send({
      from: "ActivityBeds <noreply@tomatotrails.com>",
      to: email,
      subject: "New Booking Rejected",
      text: `Dear ${user},
        The new Booking is REJECTED by Validation Team as per below Comments. Pls read the same & try to resolve. Thereafter pls create the New Booking.
        Pls Note that data is erased from the database on Rejection of Booking.        
        BOOKING ID ${booking_id}
         
        CUSTOMER NAME ${customer_name}
         
        START DATE ${start_date}
         
        END DATE ${end_date}
         
        NO OF ADULT/CHILD ${pax?.A}/${pax?.C}-${pax?.Ca}
         
        SALES SPOC ${user}

        Rejection Comments ${comments}
              
        Warm Regards
   
        ActivityBeds
        Think Global…Go Local!!!`,
    });
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

const cancelBookingMail = async (email, user, tripId, customer_name, start_date, end_date, pax, ops_spoc, cc, comments) => {
  try {
    const data = await resend.emails.send({
      from: "ActivityBeds <noreply@tomatotrails.com>",
      to: email,
      bcc: cc,
      subject: "Trip ID Cancelled",
      text: `Dear ${user},
      Your Trip ID is canceled by the operation team. Pls find the details of the Cancelled Trip for your reference.
      
      TRIP ID ${tripId}
      
      CUSTOMER NAME ${customer_name}
      
      START DATE ${start_date}
      
      END DATE ${end_date}
      
      NO OF ADULT/CHILD ${pax?.A}/${pax?.C}-${pax?.Ca}
      
      SALES SPOC ${user}
      
      OPS SPOC ${ops_spoc}

      Rejection Comments ${comments}
      
      Warm Regards
      
      ActivityBeds
      Think Global…Go Local!!!`,
    });
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

const voucherMail = async (email, user, tripId, customer_name, start_date, end_date, pax, sales_spoc, ops_spoc) => {
  try {
    const data = await resend.emails.send({
      from: "ActivityBeds <noreply@tomatotrails.com>",
      to: email,
      subject: `Trip ID ${tripId} Voucher Attached`,
      text: `Dear ${user},
            Your Vouchers for the TRIP had been released. Pls find the details of the Trip for which the Voucher is Attached..            TRIP ID ${tripId}
             
            CUSTOMER NAME ${customer_name}
             
            START DATE ${start_date}
             
            END DATE ${end_date}
             
            NO OF ADULT/CHILD ${pax?.A}/${pax?.C}-${pax?.Ca}
             
            SALES SPOC ${sales_spoc}
    
            OPS SPOC ${ops_spoc}
                  
            Warm Regards
       
            ActivityBeds
            Think Global…Go Local!!!`,
    });
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

const reconMail = async (email, user, tripId, customer_name, start_date, end_date, pax, sales_spoc, ops_spoc, cc) => {
  try {
    const data = await resend.emails.send({
      from: "ActivityBeds <noreply@tomatotrails.com>",
      to: cc,
      cc: email,
      subject: `Trip ID ${tripId} – Reconciliation Done`,
      text: `Dear ${user},
        The Reconciliation is completed for the below TRIP ID. Pls validate the same so that the Accounts are closed.               
              CUSTOMER NAME ${customer_name}
               
              START DATE ${start_date}
               
              END DATE ${end_date}
               
              NO OF ADULT/CHILD ${pax?.A}/${pax?.C}-${pax?.Ca}
               
              SALES SPOC ${sales_spoc}
      
              OPS SPOC ${ops_spoc}
                    
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
