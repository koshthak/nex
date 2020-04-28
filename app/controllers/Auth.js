const AuthService = require("../services/Auth");
const responder = require("../utils/responder");
const validators = require("../utils/validators");

exports.signin = async (req, res) => {
  try {
    //Validate request
    let missingParamsORValues = validators.validateParams(req.body, [
      "username",
      "password",
    ]);
    if (
      !missingParamsORValues["missingParams"] ||
      !missingParamsORValues["emptyParams"]
    ) {
      responder.validationErrorWithData({
        res,
        msg: "Invalid Request. Missing Params/Empty Params",
        data: {
          missing_params: missingParamsORValues["missingParams"],
          empty_params: missingParamsORValues["emptyParams"],
        },
      });
    }

    let response = await AuthService.signin(
      req.body.username,
      req.body.password
    );
    console.log('response :>> ', response);
    if (response.status) {
      responder.successResponseWithData(res, response.msg, response.result);
    } else {
      responder.ErrorResponse(res, response.msg);
    }
  } catch (error) {
    console.log("error :", error);
    res.send({
      status: 0,
      message: "Something went wrong.",
    });
  }
};
