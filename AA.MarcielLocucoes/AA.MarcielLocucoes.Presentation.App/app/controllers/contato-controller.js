'use strict';
angular.module('app').controller('ContatoController', function ($scope) {

    $scope.contactModel = {};

    $scope.sendEmail = function (isValid) {
        if (isValid) {
            alert('ok');
        } else {
            alert('error');
        }
    }
});
