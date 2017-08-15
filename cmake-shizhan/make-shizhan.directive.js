/**
 * Created by hp on 2017-4-22.
 */
angular.module('makeShiZhanModule')
    .directive('makeShizhanDirective',function () {
        return {
            register:"ACE",
            replace:true,
            templateUrl:"cmake-shizhan/make-shizhan.template.html",
            controller:['$scope','$http','serverUrl','$state',function ($scope,$http,serverUrl,$state) {
               $scope.x='';
                $scope.isSelected = true;
                // console.log('cccccccccccccccccccccccccccccccccccccc');
                $scope.shizhaninfo = function (ano) {
                    // console.log(cno)
                    $state.go('shizhaninfo',{ano:ano})
                }
                $http.get(serverUrl+'actualcomb/a_type')
                    .then(function successCallback(response) {
                        // 请求成功执行代码
                        $scope.shizhans = response.data;
                        // console.log($scope.shizhans)
                    }, function errorCallback(response) {
                        // 请求失败执行代码
                    });

                $http.get(serverUrl+'actualcomb/')
                    .then(function successCallback(response) {
                        // 请求成功执行代码
                        $scope.actualcombData = response.data;
                        $scope.newcourse_direction=$scope.actualcombData;
                    }, function errorCallback(response) {
                        // 请求失败执行代码
                    });
                $scope.conditions={
                    _direction:''
                };
                $scope.Direction=function (d) {
                    $scope.conditions._direction=d;
                    $scope.filtercourse($scope.conditions);
                };
                $scope.filtercourse=function (conditions) {
                     // console.log($scope.conditions);
                    $scope.newcourse_direction=[];
                    if($scope.conditions._direction!=0){
                        for(var i=0;i<$scope.actualcombData.length;i++){
                            if($scope.actualcombData[i].atypeno===$scope.conditions._direction){
                                $scope.newcourse_direction.push($scope.actualcombData[i])
                            }
                        }

                    }else {
                        $scope.newcourse_direction=$scope.actualcombData;
                    }
                }
            }]
        }
    })
$(document).on('click','.cato-nav-item',function () {
    $(this).addClass('focus').siblings().removeClass('focus');
})