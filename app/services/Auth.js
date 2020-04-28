const AuthModel = require("../models/Auth");

exports.signin = async (username, password) => {
  try {
    let query = {
      username,
      password,
    };

    return new Promise((resolve, reject)=>{
        AuthModel.findOne(query)
        .then((user) => {
          if (!user) {
            resolve( {
              status: false,
              msg: "Invalid Username / Password",
            });
          }
  
          let user_info = {};
          user_info.username = user.username;
          user_info.full_name = user.full_name;
          user_info.token = "WILL BE REPLACED LATER";
  
          resolve( {
            status: true,
            message: "Login Successful",
            result: user_info,
          });
        })
        .catch((err) => {
          return {
            status: false,
            msg: "Failed to Login",
          };
        });
    })

   
  } catch (error) {
    console.log("error :", error);
    return {
      status: false,
      msg: "Something went wrong.",
    };
  }
};
