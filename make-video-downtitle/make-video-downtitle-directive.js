/**
 * Created by kition on 2017/3/30.
 */
angular.module('makeVideoDowntitleModule')
.directive('makeVideoDowntitleDirective',function () {
    return {
        register:"ACE",
        replace:true,
        templateUrl:"make-video-downtitle/make-video-downtitle-template.html",
        controller:['$scope','$http','serverUrl','$stateParams','$rootScope',function ($scope,$http,serverUrl,$stateParams,$rootScope) {
            // console.log($stateParams.cno,$rootScope.user_id)
            $scope.count=1;
            // $scope.submit = function (aaa) {
            //     // console.log(aaa)
            //     $http.get(serverUrl+'question/insertComment?ccdetail='+aaa+'&cno='+$stateParams.cno+'&user_id='+$rootScope.user_id)
            //         .then(function successCallback(response) {
            //             // 请求成功执行代码
            //             $scope.requestMan = response.data[0];
            //             $scope.questionDetail = response.data;
            //             for(var i = 0;i<$scope.questionDetail.length;i++){
            //                 $scope.date=new Date($scope.questionDetail[i].cctime);
            //                 $scope.questionDetail[i].cctime=$scope.date.toLocaleString();
            //                 // console.log($scope.comments[i].cctime)
            //             }
            //
            //         }, function errorCallback(response) {
            //             // 请求失败执行代码
            //             console.log("nosuccess")
            //         });
            // }


        }]
    }
})