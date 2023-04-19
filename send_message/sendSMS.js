
const twilio = require("twilio")(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

module.exports = function send_SMS(to, message) {
  twilio.messages
    .create({
      from: "+16206756053",
      to: "+91" + to,
      body: message,
    })
    .then(function (res) {
      console.log("message is sent!",to);
    })
    .catch(function (err) {
      console.log(err);
    });
};
