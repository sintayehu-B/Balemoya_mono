const mongoose = require("mongoose"),
  moment = require("moment"),
  ReportResponseSchema = new mongoose.Schema({
    dateOfResponse: {
      type: Date,
      default: moment.utc().valueOf(),
    },
    message: {
      type: String,
      required: false,
    },
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserAdmin",
    },
    // reportID: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "UserReport",
    //   },
    // ],
  });
module.exports = mongoose.model("ReportResponse", ReportResponseSchema);
