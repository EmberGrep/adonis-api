'use strict';

const Env = use('Env');
const Ouch = use('youch');
const Http = exports = module.exports = {};

/**
 * handle errors occured during a Http request.
 *
 * @param  {Object} error
 * @param  {Object} request
 * @param  {Object} response
 */
Http.handleError = function* (error, request, response) {
  /**
   * DEVELOPMENT REPORTER
   */
  // if (Env.get('NODE_ENV') === 'development') {
  //   return (new Ouch())
  //      .pushHandler((new Ouch.handlers.JsonResponseHandler(
  //            /* handle errors from ajax and json request only*/false,
  //            /* return formatted trace information along with error response*/false,
  //            false
  //        )))
  //      // .pushHandler(new Ouch.handlers.PrettyPageHandler())
  //      .handleException(error, request.request, response.response, (output) => {
  //        const status = error.status || 500;
  //
  //        response.status(status).send(JSON.parse(output));
  //        console.log('Error handled properly');
  //      });
  // }

  response.jsonApiError(error);
};

/**
 * listener for Http.start event, emitted after
 * starting http server.
 */
Http.onStart = function () {
};
