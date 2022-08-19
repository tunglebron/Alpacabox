exports.globalResponse = (req, res, next) => {

  /**
  * Request response success
  * @author: lntung
  * CreatedDate: 13/06/2022
  */
  res.success = function ({
    result = {}
  }) {
    return res.json({
      result,
      code: 200,
      message: "Request successfully",
    });
  };

  /**
  * Request response for user's errors
  * @author: lntung
  * CreatedDate: 13/06/2022
  */
  res.error = function ({
    err = {}
  }) {
    return res.json({
      error: err,
      code: 400,
      message: "Error"
    });
  };

  /**
  * Response bad request
  * @author: lntung
  * CreatedDate: 13/06/2022
  */
  res.badreq = function ({
    err = {}
  }) {
    return res.json({
      "error": {
        "Error Code": err.code,
        "Error Message": err.message,
        "Error Stack": err.stack
      },
      code: 400,
      message: "Bad Request"
    });
  };

  /**
  * Request response fobidden
  * @author: lntung
  * CreatedDate: 13/06/2022
  */
  res.forbidden = function ({
    err = {}
  }) {
    let message = "Forbidden";
    return res.json({
      error: err,
      code: 403,
      message
    });
  };

  /**
  * Request response unauthorization or unauthentication
  * @author: lntung
  * CreatedDate: 13/06/2022
  */
  res.unauth = function ({
    err = {}
  }) {
    return res.json({
      error: err,
      code: 401,
      message: "Unauthorization"
    });
  };

  /**
  * Response if occurs error while process a request
  * @author: lntung
  * CreatedDate: 13/06/2022
  */
  res.internal = function ({
    err = {}
  }) {
    return res.json({
      error: {
        "Error Code": err.code,
        "Error Message": err.message,
        "Error Stack": err.stack
      },
      code: 500,
      message: "Internal Server Error"
    });
  };

  next();
};

exports.requestNotFound = (req, res, next) => {
  /**
  * Request response if user access to non-existent path
  * @author: lntung
  * CreatedDate: 13/06/2022
  */
  res.json({
    code: 404,
    message: "Request not found"
  });
}

exports.errorHandling = (err, req, res, next) => {
  /**
  * Response if occurs internal server error
  * @author: lntung
  * CreatedDate: 13/06/2022
  */
  res.json({
    error: err.message,
    code: 500,
    message: "Internal Server Error"
  });
}
