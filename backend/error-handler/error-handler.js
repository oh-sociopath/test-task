import {Exception} from "./exception.js";

export function responseJsonHandler(error, result, response) {
  if (error) {
    if (!error.message) {
      error.message = "Unhandled message"
    }
    return response.status(error.status ? error.status : 404).json({message: error.message});
  }
  response.json(result);
}

export const routeHandler = function (callback) {
  return async (req, res, next) => {
    try {
      console.log('req: ', req);
      console.log('res: ', res);

      responseJsonHandler(null, await callback(req, res, next), res);
    } catch (err) {
      responseJsonHandler(new Exception(err.message, err.status), null, res);
    }
  }
}
