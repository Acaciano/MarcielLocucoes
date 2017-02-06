'use strict';
angular.module('app').controller('ContatoController', function ($scope, $http, global) {

    $scope.contactModel = {};
    $scope.message = "-";
    $scope.boxMessageSuccess = false;
    $scope.boxMessageError = false;

    $scope.sendEmail = function (isValid) {
        if (isValid) {

            $scope.loading = true;

            var value = $.param($scope.contactModel);

            $http({
                method: 'POST',
                url: 'email.php',
                data: value,
                headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' }
            })
		    .success(function (data) {
		        if (data.enviado) {
		            
		            $scope.message = "Email foi enviado com sucesso, Entraremos em contato em breve!";
		            $scope.boxMessageSuccess = true;
		            $scope.boxMessageError = false;
		            $scope.loading = false;

		            setTimeout(function () {
		                location.href = '/';
		            }, 4000);

		        } else {
		            $scope.message = "Não foi possivel enviar o e-mail, tente novamente mais tarde.";
		            $scope.boxMessageSuccess = false;
		            $scope.boxMessageError = true;
		            $scope.loading = false;
		        }
		    })
		    .error(function (error) {
		        $scope.message = "Não foi possivel enviar o e-mail, tente novamente mais tarde.";

		        $scope.boxMessageSuccess = false;
		        $scope.boxMessageError = true;
		        $scope.loading = false;
		    });
        }
    }

    $scope.close = function () {
        $scope.boxMessageError = false;
    }
});
