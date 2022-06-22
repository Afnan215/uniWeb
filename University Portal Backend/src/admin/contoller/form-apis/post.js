let comment = require("../../../models/commentModel");
const moment = require("moment");
const user = require("../../../models/userModel");
const bcrypt = require("bcrypt");
const email = require("nodemailer");
const hostName = require("os").hostname();
var nodemailer = require("nodemailer");
var smtpTransport = require("nodemailer-smtp-transport");
const contactUser = require("../../../models/contactUs");

// console.log("host--->",hostName)

module.exports.saveComment = async function (req, res) {
  try {
    let data = req.body;
    const comments = new comment(data);
    comments.save(async function (err, data) {
      if (err) {
        res.status(400).json({
          timestamp: moment().unix(),
          success: false,
          message: err.message,
          err: err,
        });
      } else {
        res.status(200).json({
          timestamp: moment().unix(),
          success: true,
          message: " COMMENT POSTED SUCESSFULLY!",
          data: data,
        });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      timestamp: moment().unix(),
      success: false,
      message: error.message,
      err: error,
    });
  }
};
module.exports.registerUser = async function (req, res) {
  try {
    // let testAccount = await email.createTestAccount();
    let password = "cecmnbrytovoiqxs";
    var transporter = nodemailer.createTransport(
      smtpTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        auth: {
          user: "universityadmissionportal33@gmail.com",
          pass: password,
          // pass: 'Uniadmin@123',
        },
      })
    );
    let data = req.body;
    const salt = 5;
    if (data.confirmPassword !== data.password) {
      return res.status(400).send({
        timestamp: moment().unix(),
        success: false,
        message: "CONFIRM PASSWORD NOT MATCHED!",
      });
    }
    let userExist = await user.find({ email: req.body.email });
    if (userExist.length > 0 || userExist.length) {
      return res.status(401).json({
        timestamp: moment().unix(),
        success: false,
        message: "Email is already registered with us.",
      });
    }
    bcrypt.genSalt(salt, function (err, salt) {
      bcrypt.hash(req.body.password, salt, function (err, hash) {
        data.password = hash;
        const userData = new user(data);
        userData.save(async (err, data) => {
          if (err) {
            res.status(400).json({
              timestamp: moment().unix(),
              success: false,
              message: "Error While Register User!",
              err: err,
            });
          } else {
            res.status(200).json({
              timestamp: moment().unix(),
              success: true,
              message: "REGISTERED SUCCESSFULLY!",
              data: data,
            });
            // console.log('data----', data)
            var mailOptions = {
              from: "universityadmissionportal33@gmail.com",
              to: `${data.email}`,
              subject: "Account Registration || [University Admission portal]",
              text: `Hi ${data.firstName}, You are succesfully registered with Admission portal, kindly fill up the contact us form for your subjects details/queries.`,
              // html:`<b>Thanks & Regards,</br>\n
              // <br>Admin: UniversityAdmission@portal</br>\n
              // <br>Ph/contact: 001-234-5678</br>\n
              // <br>campus-code:12021</b>`,
              // Html:
            };
            transporter.sendMail(mailOptions, function (error, info) {
              if (error) {
                console.log(error);
              } else {
                console.log("Email sent-Registration: " + info.response);
              }
            });
          }
        });
      });
    });
  } catch (error) {
    res.status(400).json({
      timestamp: moment().unix(),
      success: false,
      message: error.message,
      err: error,
    });
  }
};

module.exports.login = async function (req, res) {
  try {
    let data = req.body;
    if (!data || data.email == "" || data.password == "") {
      res.status(400).json({
        timestamp: moment().unix(),
        success: false,
        message: "Password Or Email Can Not Be Blank",
      });
    } else {
      let condition = { email: req.body.email };
      let loginDetails = await user.find(condition);
      if (
        loginDetails.length &&
        loginDetails.length > 0 &&
        loginDetails != null
      ) {
        let userPassword = loginDetails[0].password;
        let matchedPassword = await bcrypt.compare(
          req.body.password,
          userPassword
        );
        if (matchedPassword) {
          delete loginDetails[0].password;
          res.status(200).json({
            timestamp: moment().unix(),
            success: true,
            message: `LOGGED IN SUCCESSFULLY AS ${
              loginDetails[0].firstName + " " + loginDetails[0].lastName
            }.`.toUpperCase(),
            data: loginDetails,
          });
        } else {
          res.status(200).json({
            timestamp: moment().unix(),
            success: false,
            message: "PLEASE ENTER CORRECT EMAIL OR PASSWORD ",
          });
        }
      } else if (loginDetails.length == 0) {
        res.status(200).json({
          timestamp: moment().unix(),
          success: true,
          message: `ENTERED EMAIL IS NOT REGISTERD`,
        });
      }
    }
  } catch (err) {
    res.status(400).json({
      timestamp: moment().unix(),
      success: false,
      message: err.message,
      err: err,
    });
  }
};
module.exports.forgotPasswordUrl = async function (req, res) {
  try {
    let userData = await user.findOne({ email: req.body.email });
    if (userData) {
      let password = "cecmnbrytovoiqxs";
      var transporter = nodemailer.createTransport(
        smtpTransport({
          service: "gmail",
          host: "smtp.gmail.com",
          auth: {
            user: "universityadmissionportal33@gmail.com",
            pass: password,
          },
        })
      );
      var mailOptions = {
        from: "universityadmissionportal33@gmail.com",
        to: `${data.email}`,
        subject: "[University Admisison Portal] Reset Password",
        text: "CLICK BELOW LINK TO RESET YOUR PASSWORD",
        // Html:
      };
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
      res.status(200).json({
        timestamp: moment().unix(),
        success: true,
        message: "Mail has been sent to your email for reset password",
      });
    } else {
      return res.status(400).json({
        timestamp: moment().unix(),
        success: false,
        message: "Email Not Found!",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      timestamp: moment().unix(),
      success: false,
      message: error.message,
      err: error,
    });
  }
};

module.exports.contactUs = async function (req, res) {
  try {
    let data = req.body;
    const contactedUsers = new contactUser(data);
    contactedUsers.save(async function (err, data) {
      if (err) {
        res.status(400).json({
          timestamp: moment().unix(),
          success: false,
          message: err.message,
          err: err,
        });
      } else {
        res.status(200).json({
          timestamp: moment().unix(),
          success: true,
          message: "Details collected!",
          // data: data,
        });
        let password = "cecmnbrytovoiqxs";
        var transporter = nodemailer.createTransport(
          smtpTransport({
            service: "gmail",
            host: "smtp.gmail.com",
            auth: {
              user: "universityadmissionportal33@gmail.com",
              pass: password,
              // pass: 'Uniadmin@123',
            },
          })
        );
        var mailOptions = {
          from: "universityadmissionportal33@gmail.com",
          to: `${data.email}`,
          subject: "[University Admisison Portal] || Thanks for Contacting us",
          text:`Hi ${data.userName}, We have recieved your request, we will contact you shortly.\nSelective subjects : ${data.subjects}\n`,
          // Html: "<br>Thanks & Regards</br>"
        };
        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log("Email sent: " + info.response);
          }
        });
      }
    });
  } catch (err) {
    return res.status(400).json({
      timestamp: moment().unix(),
      success: false,
      message: err.message,
      err: err,
    });
  }
};
