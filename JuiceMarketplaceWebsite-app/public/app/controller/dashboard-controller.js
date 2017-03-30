angular
    .module('dashboard')
    .controller('DashboardController', ['$scope', '$timeout', 'c3SimpleService', 'DashboardDataService',
        function ($scope, $timeout, c3SimpleService, dashboardDataService) {

            $scope.donut = {
                data: {
                    columns: [],
                    type: 'donut'
                },
                donut: {
                    title: "",
                    label: {
                        show: true,
                        format: function (value, ratio, id) {
                            return d3.format()(value);
                        }
                    }
                }
            };

            $scope.topEver = {
                data: {
                    x: 'x',
                    columns: [],
                    type: 'bar'
                },
                axis: {
                    rotated: true,
                    x: {
                        type: 'category'
                    }
                },
                legend: {
                    show: false
                }
            };

            $scope.topToday = {
                data: {
                    x: 'x',
                    columns: [],
                    type: 'bar'
                },
                axis: {
                    rotated: true,
                    x: {
                        type: 'category'
                    }
                },
                legend: {
                    show: false
                }
            };

            $scope.dailyWorkload = {
                data: {
                    columns: [],
                    type: 'bar',
                    groups: []
                },
                axis: {
                    x: {
                        label: 'Hour',
                        type: 'category',
                        categories: [
                            '8-9',
                            '9-10',
                            '10-11',
                            '11-12',
                            '12-13',
                            '13-14',
                            '14-15',
                            '15-16',
                            '16-17',
                            '17-18',
                            '18-19',
                            '19-20',
                            '20-21',
                            '21-22'
                        ]
                    },
                    y: {
                        label: 'Amount'
                    }
                },
                legend: {
                    position: 'right'
                },
                grid: {
                    x: {
                        show: false
                    },
                    y: {
                        show: true
                    }
                }
            };

            $scope.revenuePerHour = {
                data: {
                    columns: [],
                    types: {
                        data: 'area-step'
                    }
                },
                axis: {
                    x: {
                        label: 'Hour',
                        type: 'category',
                        categories: [
                            '8-9',
                            '9-10',
                            '10-11',
                            '11-12',
                            '12-13',
                            '13-14',
                            '14-15',
                            '15-16',
                            '16-17',
                            '17-18',
                            '18-19',
                            '19-20',
                            '20-21',
                            '21-22'
                        ]
                    },
                    y: {
                        label: 'Revenue'
                    }
                },
                legend: {
                    show: false
                }
            };

            $scope.revenuePerDay = {
                data: {
                    columns: [],
                    types: {
                        data: 'area'
                    }
                },
                axis: {
                    x: {
                        label: 'Day',
                        type: 'category',
                        categories: []
                    },
                    y: {
                        label: 'Revenue'
                    }
                },
                legend: {
                    show: false
                }
            };

            $scope.clickEvent = function (datum, mouseEvent) {
                $scope.chart.data.hide.push(datum.id);
            };

            $scope.getDrinksByHours = function (hours) {
                dashboardDataService.getDrinksByHours(hours).then(function (data) {
                    var drinks = data.data;
                    $scope.getactivatedlicensessince = drinks[0].getactivatedlicensessince;
                }, function (error) {
                    console.log(error);
                });
            }


            $scope.getTopDrinksEver = function () {
                dashboardDataService.getTopDrinksEver().then(function (data) {
                    var drinks = data.data;
                    drinks.sort(function (a, b) {
                        return b.rank - a.rank;
                    });
                    $scope.topEver.data.columns = [];

                    var keys = ['x'];
                    var values = ['value'];

                    drinks.forEach(function (drink) {
                        keys.push(drink.technologydataname);
                        values.push(drink.rank);
                    }, this);

                    $scope.topEver.data.columns.push(keys);
                    $scope.topEver.data.columns.push(values);

                }, function (error) {
                    console.log(error);
                });
            }


            $scope.getTopDrinksOfToday = function () {
                dashboardDataService.getTopDrinksOfToday().then(function (data) {
                    var drinks = data.data;
                    drinks.sort(function (a, b) {
                        return b.rank - a.rank;
                    });
                    $scope.topToday.data.columns = [];

                    var keys = ['x'];
                    var values = ['value'];

                    drinks.forEach(function (drink) {
                        keys.push(drink.technologydataname);
                        values.push(drink.rank);
                    }, this);

                    $scope.topToday.data.columns.push(keys);
                    $scope.topToday.data.columns.push(values);

                }, function (error) {
                    console.log(error);
                });
            }

            $scope.getFavoriteJuicesSince = function () {
                dashboardDataService.getFavoriteJuicesSince().then(function (data) {
                    var juices = data.data;
                    $scope.donut.data.columns = [];

                    juices.forEach(function (drink) {
                        var item = [drink.componentname, drink.amount];
                        $scope.donut.data.columns.push(item);
                    }, this);

                }, function (error) {
                    console.log(error);
                });
            }

            $scope.getWorkloadSince = function () {
                dashboardDataService.getWorkloadSince().then(function (data) {

                    $scope.dailyWorkload.data.columns = [];
                    $scope.dailyWorkload.data.groups = [];

                    var drinks = getDistinctTechnologyData(data.data);
                    var columns = [];

                    for (var index in drinks) {
                        columns.push(new Array(drinks[index]));
                    }

                    for (var i = 0; i <= 13; i++) {
                        columns.forEach(function (column) {
                            column.push(0);
                        }, this);

                        data.data.forEach(function (technologyData) {
                            if (technologyData.dayhour == i + 8) {
                                columns.forEach(function (column) {
                                    if (column[0] === technologyData.technologydataname) {
                                        column[i + 1] += technologyData.amount;
                                    }
                                }, this);
                            }
                        }, this);
                    }

                    $scope.dailyWorkload.data.columns = columns;
                    $scope.dailyWorkload.data.groups.push(drinks);

                }, function (error) {
                    console.log(error);
                });
            };

            $scope.getRevenuePerHour = function () {
                dashboardDataService.getRevenuePerHour().then(function (data) {
                    $scope.revenuePerHour.data.columns = [];

                    var columns = [];
                    columns.push(new Array('data'));

                    for (var i = 0; i <= 13; i++) {
                        columns[0].push(0);
                        data.data.forEach(function (revenueData) {
                            if (revenueData.hour == i + 8) {
                                columns[0][i + 1] += revenueData.revenue;
                            }
                        }, this);
                    }

                    $scope.revenuePerHour.data.columns = columns;
                });
            }

            $scope.getRevenuePerDay = function () {
                dashboardDataService.getRevenuePerDay().then(function (data) {
                    $scope.revenuePerDay.data.columns = [];
                    $scope.revenuePerDay.axis.x.categories = [];

                    var columns = [];
                    var categories = [];

                    columns.push(new Array('data'));

                    var i = 1;
                    data.data.forEach(function (revenueData) {
                        columns[0][i] = revenueData.revenue;
                        categories[i-1] = moment(revenueData.date).format('YYYY-MM-DD');
                        i++;
                    }, this);

                    $scope.revenuePerDay.data.columns = columns;
                    $scope.revenuePerDay.axis.x.categories = categories;
                });
            }

            function getDistinctTechnologyData(data) {
                var technologies = [];

                for(var i in data) {
                    if (technologies.indexOf(data[i].technologydataname) == -1) {
                        technologies.push(data[i].technologydataname);
                    }
                    else {
                        console.log("Duplicate:" + data[i]);
                    }
                }
               return technologies;
            }

            var getData = function () {
                $scope.getDrinksByHours(5);
                $scope.getTopDrinksOfToday();
                $scope.getTopDrinksEver();
                $scope.getFavoriteJuicesSince();
                $scope.getWorkloadSince();
                $scope.getRevenuePerHour();
                $scope.getRevenuePerDay();
                nextLoad();
            }

            var loadTime = 60000;
            var loadPromise; //Pointer to the promise created by the Angular $timout service

            var cancelNextLoad = function () {
                $timeout.cancel(loadPromise);
            };

            var nextLoad = function () {
                //Always make sure the last timeout is cleared before starting a new one
                cancelNextLoad();
                loadPromise = $timeout(getData, loadTime);
            };

            //Start polling the data from the server
            getData();

            //Always clear the timeout when the view is destroyed, otherwise it will keep polling
            $scope.$on('$destroy', function () {
                cancelNextLoad();
            });
        }]);