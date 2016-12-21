angular.module('mask', [])
.directive('fcformat', ['$filter', '$location', '$locale', function ($filter, $location, $locale) {
    window.$locale = $locale;
    return {
        require: '?ngModel',
        link: function (scope, elem, attrs, ctrl) {
            if (!ctrl) return;

            function phone(v) {
                v = v.replace(/\D/g, "");
                if (v.length > 8) {
                    v = v.replace(/(\d{5})(\d)/, "$1-$2");
                }
                else {
                    v = v.replace(/(\d{4})(\d)/, "$1-$2");
                }
                return v;
            };

            function phoneDdd(v) {
                v = v.replace(/\D/g, "");
                if (v.length > 10) {
                    v = v.replace(/(\d{0})(\d)/, "$1($2");
                    v = v.replace(/(\d{2})(\d)/, "$1)$2");
                    v = v.replace(/(\d{5})(\d)/, "$1-$2");
                }
                else {
                    v = v.replace(/(\d{0})(\d)/, "$1($2");
                    v = v.replace(/(\d{2})(\d)/, "$1)$2");
                    v = v.replace(/(\d{4})(\d)/, "$1-$2");
                }
                return v;
            };

            function zipCode(v) {
                v = v.replace(/\D/g, "")
                v = v.replace(/^(\d{5})(\d)/, "$1-$2")
                return v;
            };

            function time(v) {
                var value = v.replace(/\D/g, "");
                if (value.length == 1)
                    value = value > 2 ? '0' + value : value;
                else if (value.length == 2)
                    value = value > 23 ? 23 : value;
                else if (value.length == 3)
                    value = value[2] > 5 ? '' + value[0] + value[1] + '5' : value;
                value = value.replace(/(\d{2})(\d)/, "$1:$2");
                return value;
            };

            function currency(v) {
                if (!v)
                    return;
                v = v.toString();
                v = v.replace(/\D/g, "");
                v = v.replace(/(\d)(\d{11})$/, "$1" + $locale.NUMBER_FORMATS.GROUP_SEP + "$2");
                v = v.replace(/(\d)(\d{8})$/, "$1" + $locale.NUMBER_FORMATS.GROUP_SEP + "$2");
                v = v.replace(/(\d)(\d{5})$/, "$1" + $locale.NUMBER_FORMATS.GROUP_SEP + "$2");
                v = v.replace(/(\d)(\d{2})$/, "$1" + $locale.NUMBER_FORMATS.DECIMAL_SEP + "$2");
                return v;
            }

            function cep(v) {
                var maxlength = 9;
                v = v.replace(/\D/g, "");
                v = v.replace(/(\d{5})(\d{1,3})$/, "$1-$2");
                if (v.length > maxlength) {
                    var v = text.substring(0, maxlength);
                    
                    return v;
                }
                return v;
            }

            function maskDate(v) {
                v = v.replace(/\D/g, "");
                v = v.replace(/(\d{2})(\d)/, "$1/$2");
                v = v.replace(/(\d{2})(\d{1,4})$/, "$1/$2");
                return v;
            }

            function cpf(v) {
                v = v.replace(/\D/g, "")
                v = v.replace(/(\d{3})(\d)/, "$1.$2")
                v = v.replace(/(\d{3})(\d)/, "$1.$2")
                v = v.replace(/(\d{3})(\d{1,2})$/, "$1-$2")
                return v
            }

            function cnpj(v) {
                v = v.replace(/\D/g, "")
                v = v.replace(/^(\d{2})(\d)/, "$1.$2")
                v = v.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
                v = v.replace(/\.(\d{3})(\d)/, ".$1/$2")
                v = v.replace(/(\d{4})(\d)/, "$1-$2");
                return v
            }

            function onlyLetters(v) {
                v = v.replace(/[^\w\s]/gi, "");

                return v;
            }

            function onlyLettersAndNumber(v) {
                v = v.replace(/[^a-z0-9\ ]/, "");

                return v;
            }

            //to view
            ctrl.$formatters.unshift(function (value) {
                switch (attrs.fcformat) {
                    case 'time':
                        return $filter('date')(value, 'HH:mm');
                    case 'currency':
                        return $filter('currency')(value, '', 2);
                    case 'phone':
                        if (value == undefined)
                            return value;

                        if (value.length > 8)
                            var formatter = new StringMask('99999-9999');
                        else
                            var formatter = new StringMask('9999-9999');

                        return formatter.apply(value);
                }
                return value;
            });


            function toModel(value) {
                switch (attrs.fcformat) {
                    case 'number':
                        value = value.replace(/\D/g, "");
                        elem.val(value);
                        return value;
                    case 'phone':
                        value = phone(value);
                        elem.val(value);
                        return value;
                    case 'phoneDdd':
                        value = phoneDdd(value);
                        elem.val(value);
                        return value;
                    case 'zipCode':
                        value = zipCode(value);
                        elem.val(value);
                        return value;
                    case 'cep':
                        value = cep(value);
                        elem.val(value);
                        return value;
                    case 'date':
                        value = maskDate(value);
                        elem.val(value);
                        return value;
                    case 'cpf':
                        value = cpf(value);
                        elem.val(value);
                        return value;
                    case 'cnpj':
                        value = cnpj(value);
                        elem.val(value);
                        return value;
                    case 'onlyLetters':
                        value = onlyLetters(value);
                        elem.val(value);
                        return value;
                    case 'letterAndNumber':
                        value = onlyLettersAndNumber(value);
                        elem.val(value);
                        return value;
                    case 'time':
                        value = time(value);
                        elem.val(value);

                        if (({}).toString.call(ctrl.$modelValue).match(/\s([a-zA-Z]+)/)[1].toLowerCase() == 'date') {
                            ctrl.$modelValue.setHours(value.split(':')[0] || 0);
                            ctrl.$modelValue.setMinutes(value.split(':')[1] || 0);
                            ctrl.$modelValue.setMinutes(value.split(':')[2] || 0);
                            ctrl.$modelValue.setMinutes(value.split('.')[3] || 0);
                            return ctrl.$modelValue;
                        }
                        else if (value.length == 5) {
                            var date = new Date();
                            date.setHours(value.split(':')[0] || 0);
                            date.setMinutes(value.split(':')[1] || 0);
                            return date;
                        }
                        else
                            return undefined;
                    case 'currency':
                        if (!value || value == '')
                            return;
                        value = currency(value);
                        elem.val(value);
                        while (value.indexOf($locale.NUMBER_FORMATS.GROUP_SEP) != -1)
                            value = value.replace($locale.NUMBER_FORMATS.GROUP_SEP, "");
                        value = value.replace($locale.NUMBER_FORMATS.DECIMAL_SEP, ".");
                        return parseFloat(value);
                }
            }
            ctrl.$parsers.unshift(toModel);
        }
    };
}]);