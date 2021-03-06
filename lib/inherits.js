/**
 * @author  Hamza Waqas <hamzawaqas@live.com>
 * @since   1/14/14
 */

(function() {
    var _ = require('lodash')
        , request = require('request')
        , util = require('util')
        , url = require('url');

    var Handler = function(subClass) {
        this.createCall = function(method, path, options, callback) {
            return function(config) {
                if (_.isFunction(options)) {
                    callback = options;
                    options = {};
                }
                path = url.format({
                    pathname: path,
                    query: options
                });
                path = url.resolve(config.api_url, path);
                console.log(path)

                var parameters = {
                    url: path,
                    method: method
                };

                request(parameters, function(err, response, body) {
                    return callback(err, JSON.parse(body) || body);
                });
            }
        };

        _.merge(subClass, this);
        return this;
    }.bind(this);

    module.exports = Handler;
}).call(this);