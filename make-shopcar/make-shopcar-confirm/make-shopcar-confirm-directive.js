/**
 * Created by kition on 2017/3/30.
 */
angular.module('makeShopcarConfirmModule')
.directive('makeShopcarConfirmDirective',function () {
    return {
        register:"ACE",
        replace:true,
        templateUrl:"make-shopcar/make-shopcar-confirm/make-shopcar-confirm-template.html",
        controller:['$scope',"$state",'$stateParams','serverUrl','$http','$rootScope',function ($scope,$state,$stateParams,serverUrl,$http,$rootScope) {
            $http.get(serverUrl+'actualcomb/a_details?ano='+$stateParams.ano)
                .then(function successCallback(response) {
                    // 请求成功执行代码
                    $scope.getActualcombDetail = response.data[0];
                }, function errorCallback(response) {
                    // 请求失败执行代码
                    console.log("nosuccess")
                });

            $scope.submitOrder=function () {
                $http.get(serverUrl+'person/getOrder?ano='+$stateParams.ano+'&user_id='+$rootScope.user_id)
                    .then(function successCallback(response) {
                        // 请求成功执行代码
                        if(response.data.result==1){
                            //存在
                            $('.setup-coverLayer').show();
                            $('.moco-modal-layer').show();
                        }else{
                            $http.get(serverUrl+'person/insertOrder?ano='+$stateParams.ano+'&user_id='+$rootScope.user_id)
                                .then(function successCallback(response) {
                                    // 请求成功执行代码
                                    if(response.data.result==1){
                                        console.log("提交订单成功")
                                        $state.go('make-shopcar-pay',{ano:$stateParams.ano})
                                    }else{
                                        console.log("提交订单失败")
                                    }
                                }, function errorCallback(response) {
                                    // 请求失败执行代码
                                    console.log("nosuccess")
                                });

                        }
                    }, function errorCallback(response) {
                        // 请求失败执行代码
                        console.log("nosuccess")
                    });




            }
        }]
    }
})