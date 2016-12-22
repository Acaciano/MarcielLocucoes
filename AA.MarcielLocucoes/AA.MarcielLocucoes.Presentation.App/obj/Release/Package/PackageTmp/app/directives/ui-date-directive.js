angular.module("app").directive("uiDate", function ($filter) {
    return {
        require: "ngModel",
        link: function (scope, element, attrs, ctrl, filter) {
            //console.log(scope.$id);
            //console.log(element);
            //console.log(attrs);

            var _formatDate = function (date) {
                date = date.replace(/[^0-9]+/g, "");
                if (date.length > 2) {
                    date = date.substring(0, 2) + "/" + date.substring(2);
                }
                if (date.length > 5) {
                    date = date.substring(0, 5) + "/" + date.substring(5, 9);
                }
                return date;
            };

            element.bind("keyup", function () {
                //console.log(ctrl.$viewValue);
                ctrl.$setViewValue(_formatDate(ctrl.$viewValue));
                ctrl.$render();
            });

            ctrl.$parsers.push(function (value) {
                //console.log(value);
                if (value.length === 10) {  //só vou atualizar o scope quando tiver o valor completo
                    //return value;
                    //se eu quiser retornar um date
                    var dateArray = value.split("/");
                    //console.log(dateArray);
                    return new Date(dateArray[2], dateArray[1] - 1, dateArray[0]);
                }
            });

            ctrl.$formatters.push(function (value) {
                return $filter("date")(value, "dd/MM/yyyy");
            });
        }
    };
});