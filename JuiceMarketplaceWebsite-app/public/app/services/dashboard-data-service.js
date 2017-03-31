angular.module('dashboard').factory('DashboardDataService', ['$q', '$http', 'moment', function($q, $http, moment) {
    
    function getDrinksByHours(hours) {
        var defer = $q.defer();
        var sinceDate = moment().subtract(hours, 'hours').format('YYYY-MM-DD HH:mm:ss');
        $http({
            method: 'GET',
            url: '/reports?sinceDate=' + sinceDate
        }).then(function(result) {
            defer.resolve(result);
        }, function(error) {
            defer.reject(error);
        });
        return defer.promise;
    }


    function getTopDrinksEver() {
        var defer = $q.defer();
        $http({
            method: 'GET',
            url: '/reports?sinceDate=' + moment('1970-01-01').format('YYYY-MM-DD HH:mm:ss') + '&topValue=10'
        }).then(function(result) {
            defer.resolve(result);
        }, function(error) {
            defer.reject(error);
        });
        return defer.promise;    
    }


    function getTopDrinksOfToday() {
        var defer = $q.defer();
        $http({
            method: 'GET',
            url: '/reports?sinceDate=' +  moment().subtract(24, 'hours').format('YYYY-MM-DD HH:mm:ss') + '&topValue=10'
        }).then(function(result) {
            defer.resolve(result);
        }, function(error) {
            defer.reject(error);
        });
        return defer.promise;    
    }


    function getFavoriteJuices() {
        var defer = $q.defer();
        $http({
            method: 'GET',
            url: '/reports/favorit?sinceDate=' +  moment().subtract(24, 'hours').format('YYYY-MM-DD HH:mm:ss')
        }).then(function(result) {
            defer.resolve(result);
        }, function(error) {
            defer.reject(error);
        });
        return defer.promise;
    }


    function getWorkload() {
        var defer = $q.defer();
        $http({
            method: 'GET',
            url: '/reports/workload?sinceDate=' +  moment().startOf('day').format('YYYY-MM-DD HH:mm:ss')
        }).then(function(result) {
            defer.resolve(result);
        }, function(error) {
            defer.reject(error);
        });
        return defer.promise;
    }


    function getRevenuePerHour() {
        var defer = $q.defer();
        $http({
            method: 'GET',
            url: '/reports/revenue?sinceDate=' +  moment().startOf('day').format('YYYY-MM-DD HH:mm:ss') + '&time=hour'
        }).then(function(result) {
            defer.resolve(result);
        }, function(error) {
            defer.reject(error);
        });
        return defer.promise;
    }


    function getRevenuePerDay() {
        var defer = $q.defer();
        $http({
            method: 'GET',
            url: '/reports/revenue?sinceDate=' +  moment().subtract(7, 'days').format('YYYY-MM-DD HH:mm:ss') + '&time=day'
        }).then(function(result) {
            defer.resolve(result);
        }, function(error) {
            defer.reject(error);
        });
        return defer.promise;
    }


    return {
        getDrinksByHours: getDrinksByHours,
        getTopDrinksEver: getTopDrinksEver,
        getTopDrinksOfToday: getTopDrinksOfToday,
        getFavoriteJuicesSince: getFavoriteJuices,
        getWorkloadSince: getWorkload,
        getRevenuePerHour: getRevenuePerHour,
        getRevenuePerDay: getRevenuePerDay
    };
}]);
