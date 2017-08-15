/**
 * Created by kition on 2017/3/30.
 */
angular.module('makeShopcarPayModule')
.directive('makeShopcarPayDirective',function () {
    return {
        register:"ACE",
        replace:true,
        templateUrl:"make-shopcar/make-shopcar-pay/make-shopcar-pay-template.html",
        controller:['$scope',"$state",'$stateParams','serverUrl','$http','$rootScope','$timeout',
            function ($scope,$state,$stateParams,serverUrl,$http,$rootScope,$timeout) {
            $http.get(serverUrl+'actualcomb/a_details?ano='+$stateParams.ano)
                .then(function successCallback(response) {
                    // 请求成功执行代码
                    $scope.getActualcombDetail = response.data[0];
                    console.log($scope.getActualcombDetail)
                }, function errorCallback(response) {
                    // 请求失败执行代码
                    console.log("nosuccess")
                });

            $scope.payNow=function () {
                $http.get(serverUrl+'person/updateOrder?ano='+$stateParams.ano+'&user_id='+$rootScope.user_id)
                    .then(function successCallback(response) {
                        // 请求成功执行代码
                       if(response.data.result==1){
                           $('.scucess-layer').show();
                           $('.scucess').show();
                        $scope.open=function ()
                           {
                               $state.go('personinfo')
                           }
                       }else{
                           $('.fail').show();
                           $('.fail-layer').show();
                       }
                    }, function errorCallback(response) {
                        // 请求失败执行代码
                        console.log("nosuccess")
                    });
            }
        }]
    }
})