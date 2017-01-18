'use strict';
angular.module('app').controller('ContatoController', function ($scope, $http, global) {

    $scope.contactModel = {};
    $scope.message = "-";
    $scope.boxMessageSuccess = false;
    $scope.boxMessageError = false;

    $scope.sendEmail = function (isValid) {
        if (isValid) {

            $scope.loading = true;

            //$http({
            //    method: 'POST',
            //    url: global.baseUrl + '/v1/contact/send',
            //    data: $scope.contactModel
            //}).then(function successCallback(response) {
            //    if (response.data.success) {
            //        $scope.message = response.data.message;
            //        $scope.boxMessageSuccess = true;
            //        $scope.boxMessageError = false;
            //        $scope.loading = false;

            //        setTimeout(function () {
            //            location.href = '/';
            //        }, 4000);

            //    } else {
            //        $scope.message = response.data.message;
            //        $scope.boxMessageSuccess = false;
            //        $scope.boxMessageError = true;
            //        $scope.loading = false;
            //    }
            //}, function errorCallback(response) {
            //    $scope.message = "Não foi possivel enviar o contato, tente novamente mais tarde.";

            //    $scope.boxMessageSuccess = false;
            //    $scope.boxMessageError = true;
            //    $scope.loading = false;
            //});


            //função que será usada para preparar os dados no formato que poderemos usar no servidor para envio do email
			var param = function(data) {
				var returnString = '';
				for (d in data){
					if (data.hasOwnProperty(d))
					   returnString += d + '=' + data[d] + '&';
				}
				// Remove o último & que não é necessário
				return returnString.slice( 0, returnString.length - 1 );
			};

            $http({
                method: 'POST',
                url: 'email.php',
				data : param($scope.contactModel),
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
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
