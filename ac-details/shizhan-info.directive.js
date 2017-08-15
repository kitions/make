/**
 * Created by hp on 2017-4-23.
 */
angular.module('shizhanInfoModule')
    .directive('shizhanInfoDirective',function () {
        return {
            register:"ACE",
            replace:true,
            templateUrl:"ac-details/shizhan-info.template.html",
            controller:['$scope',"$state",'$stateParams','serverUrl','$http','$rootScope',function ($scope,$state,$stateParams,serverUrl,$http,$rootScope) {
                $scope.count =1;
                var data = {ano:$stateParams.ano}
                // console.log($stateParams.ano)
                //请求页面详情
                $http.get(serverUrl+'actualcomb/a_details?ano='+$stateParams.ano)
                    .then(function successCallback(response) {
                        // 请求成功执行代码
                        $scope.getActualcombDetail = response.data[0];
                    }, function errorCallback(response) {
                        // 请求失败执行代码
                        console.log("nosuccess")
                    });
                $http.get(serverUrl+'actualcomb/a_firstcourse?ano='+$stateParams.ano)
                    .then(function successCallback(response) {
                        // 请求成功执行代码
                        $scope.getA_firstcourse = response.data;
                    }, function errorCallback(response) {
                        // 请求失败执行代码
                        console.log("nosuccess")
                    });
                $http.get(serverUrl+'actualcomb/a_chapter?ano='+$stateParams.ano)
                    .then(function successCallback(response) {
                        // 请求成功执行代码
                        $scope.getA_chapter = response.data;
                        // console.log($scope.getA_chapter)
                    }, function errorCallback(response) {
                        // 请求失败执行代码
                        console.log("nosuccess")
                    });
                $http.get(serverUrl+'actualcomb/a_comments?ano='+$stateParams.ano)
                    .then(function successCallback(response) {
                        // 请求成功执行代码
                        $scope.getA_comments = response.data;
                        // console.log($scope.getA_comments)
                    }, function errorCallback(response) {
                        // 请求失败执行代码
                        console.log("nosuccess")
                    });

                    $scope.buyNow=function (ano) {
                        console.log(ano,$rootScope.user_id);
                        $state.go('make-shopcar-confirm',{ano:ano,user_id:$rootScope.user_id})
                    }
            }]
        }
    })
