'use strict';

var app = angular.module('App', ['pascalprecht.translate']);
app.config(function ($translateProvider) {
    $translateProvider.useLoader("asyncLoader");
    $translateProvider.preferredLanguage('en');
    $translateProvider.useSanitizeValueStrategy(null);////'sanitize'
}).factory('asyncLoader', function ($q, $http) {
    return function (operation) {
        var deferred = $q.defer();

        //if (operation.key === 'en') {
        //    $http.get('lang/en.json').then(function (res) {
        //        deferred.resolve(res.data);
        //    })
        //} else if (operation.key === 'cn') {
        //    $http.get('lang/cn.json').then(function (res) {
        //        deferred.resolve(res.data)
        //    })
        //}

        $http.get('lang/' + operation.key + '.json').then(function (res) {
            deferred.resolve(res.data);
        });
        return deferred.promise;
    }
}).controller("mainCtrl", function ($scope, $http, $translate) {
    $http.get('lang/mapping.json').then(function (res) {
        //suppose res.statusCode = 200
        $scope.data = res.data;
    });
    $scope.changeLanguage = function (langKey) {
        $translate.use(langKey);
    }
});