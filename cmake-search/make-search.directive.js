/**
 * Created by hp on 2017-4-27.
 */
angular.module('makeSearchModule')
    .directive('makeSearchDirective',function () {
        return {
            register:"ACE",
            replace:true,
            templateUrl:"cmake-search/make-search.template.html",
            controller:['$scope','$http','serverUrl','$rootScope',function ($scope,$http,serverUrl,$rootScope) {
                $scope.course=1;
                $scope.s=4;
                $scope.c=4;
                //$scope.filterText= $rootScope.filterText;
                $http.get(serverUrl+'course/index')
                    .then(function successCallback(response) {
                        // 请求成功执行代码

                        $scope.courseData = response.data;
                    }, function errorCallback(response) {
                        // 请求失败执行代码
                    });
                $http.get(serverUrl+'actualcomb/')
                    .then(function successCallback(response) {
                        // 请求成功执行代码
                        $scope.actualcombData = response.data;
                        console.log(response.data );
                    }, function errorCallback(response) {
                        // 请求失败执行代码
                    });
                //猿问全部
                $http.get(serverUrl+'question/getAllquestion')
                    .then(function successCallback(response) {
                        // 请求成功执行代码
                        $scope.questionAllData = response.data;
                        // console.log(questionIndexData)
                    }, function errorCallback(response) {
                        // 请求失败执行代码
                        console.log("nosuccess")
                    });
            }]
        }
    })

