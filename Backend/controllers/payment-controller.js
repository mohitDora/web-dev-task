const razorpay = require("razorpay");
const crypto = require("crypto");
const Payment = require("../models/payment-model");

const instance = new razorpay({
    key_id: "rzp_test_KRVElbWtOpWHD9",
    key_secret: "utmGBMoFW6Wf5TzOAkqyXRNp",
  });
  
  const checkout = async (req, res) => {
    try {
      const options ={
          amount: Number (req.body.amount *100),
          currency:"INR",
      };
      const order = await instance.orders.create(options);
      console.log(order);
      res.status(200).json({
          success:true,order
      })
  
    } catch (error) {
      res.status(400).json({ message: { error } });
    }
  };

const verification = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature,  } =
      req.body;
      
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expected = crypto
      .createHmac("sha256", "utmGBMoFW6Wf5TzOAkqyXRNp")
      .update(body.toString())
      .digest("hex");
    const isauth = (expected === razorpay_signature);
    if (isauth) {
      await Payment.create({
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
         
      });
      res.redirect(
        "https://web-dev-task-client.vercel.app/courses"
      );
    }
  } catch (error) {
    res.status(400).json({ message: { error } });
  }
};

const key = async (req, res) => {
  return res.status(200).json({ key: "rzp_test_KRVElbWtOpWHD9" });
};

module.exports = { checkout, verification, key };