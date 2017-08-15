/**
 * Created by kition on 2017/3/30.
 */
angular.module('makeIndexModule')
.directive('makeIndexDirective',function () {
    return {
        register:"ACE",
        replace:true,
        templateUrl:"make-index/make-index-template.html",
        controller:['$scope','$http','serverUrl','$state',function ($scope,$http,serverUrl,$state) {
            $scope.courseDetail = function (cno,c_sortname) {
                // alert(cno,c_sortname)
                $state.go('courseinfo',{cno:cno,c_sortname:c_sortname})
            }
            //请求主页实战的5个课程
            $http.get(serverUrl+'actualcomb/getIndexActualcomb')
                .then(function successCallback(response) {
                    // 请求成功执行代码
                    $scope.actualcombIndexData = response.data;
                }, function errorCallback(response) {
                    // 请求失败执行代码
                    console.log("nosuccess")
                });
            //请求主页免费课程的5个课程
            $http.get(serverUrl+'course/getIndexCourseCover')
                .then(function successCallback(response) {
                    // 请求成功执行代码
                    $scope.courseIndexData = response.data;
                    // console.log($scope.courseIndexData)
                }, function errorCallback(response) {
                    // 请求失败执行代码
                    console.log("nosuccess")
                });
            //请求主页前端工程师的4个课程，按时间最新排序
            $http.get(serverUrl+'actualcomb/getIndexMan')
                .then(function successCallback(response) {
                    // 请求成功执行代码
                    $scope.qianduanIndexData = response.data;
                }, function errorCallback(response) {
                    // 请求失败执行代码
                    console.log("nosuccess")
                });
            //请求主页猿问
            $http.get(serverUrl+'course/getIndexQuestion')
                .then(function successCallback(response) {
                    // 请求成功执行代码
                    $scope.questionIndexData = response.data;
                    // console.log($scope.questionIndexData)
                }, function errorCallback(response) {
                    // 请求失败执行代码
                    console.log("nosuccess")
                });

        }]
    }
})