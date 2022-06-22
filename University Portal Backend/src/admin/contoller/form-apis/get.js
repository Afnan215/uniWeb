const user = require("../../../models/userModel");

const moment = require("moment");

module.exports.getStudent = async function (req, res) {
  try {
    let students = await user.find({}, { firstName: 1, email: 1, _id: 0 });
    if (students.length && students.length > 0) {
      return res.status(200).json({
        timestamp: moment().unix(),
        success: true,
        data: students,
      });
    }
  } catch (error) {
    console.log(error);
   return res.status(400).json({
      timestamp: moment().unix(),
      success: false,
      message: error.message,
      err: error,
    });
  }
};
