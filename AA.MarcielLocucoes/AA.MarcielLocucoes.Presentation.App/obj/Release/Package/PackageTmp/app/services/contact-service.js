'use strict';
angular.module('app').factory('contactService', function ($http, global) {
    return {
        sendMail: function (model) {
            return $http.post(global.baseUrl + '/v1/contact/send', JSON.stringify(model));
        }
    }
});