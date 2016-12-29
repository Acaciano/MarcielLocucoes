'use strict';
angular.module('app').controller('ContatoController', function ($scope, $http, global) {

    $scope.contactModel = {};
    $scope.message = "-";
    $scope.boxMessageSuccess = false;
    $scope.boxMessageError = false;

    $scope.sendEmail = function (isValid) {
        if (isValid) {

            $scope.loading = true;

            $http({
                method: 'POST',
                url: global.baseUrl + '/v1/contact/send',
                data: $scope.contactModel
            }).then(function successCallback(response) {
                if (response.data.success) {
                    $scope.message = response.data.message;
                    $scope.boxMessageSuccess = true;
                    $scope.boxMessageError = false;
                    $scope.loading = false;

                    setTimeout(function() {
                        location.href = '/';
                    }, 4000);

                } else {
                    $scope.message = response.data.message;
                    $scope.boxMessageSuccess = false;
                    $scope.boxMessageError = true;
                    $scope.loading = false;
                }
            }, function errorCallback(response) {
                $scope.message = "Não foi possivel enviar o contato, tente novamente mais tarde.";

                $scope.boxMessageSuccess = false;
                $scope.boxMessageError = true;
                $scope.loading = false;
            });

        }
    }

    $scope.close = function() {
        $scope.boxMessageError = false;
    }
});
