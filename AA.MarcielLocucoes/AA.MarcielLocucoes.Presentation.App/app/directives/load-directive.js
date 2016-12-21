angular.module('app').directive('loading', function () {
    var ddo = {};

    ddo.restrict = "E";

    ddo.template = '<div style="width: 100%; margin: 5px auto;padding: 8px;"><img src="/content/img/load2.gif" style="width: 50px; float: left" /><h3 class="h4 mar-no"  style="font-size: 13px; float: left; padding-top: 20px;" >Aguarde...</h3></div>';

    ddo.link = function (scope, element) {
        scope.$watch('loading', function (val) {
            if (val) {
                $(element).show();
            } else {
                $(element).hide();
            }
        });
    }

    return ddo;
});
