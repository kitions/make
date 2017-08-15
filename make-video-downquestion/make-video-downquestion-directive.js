/**
 * Created by kition on 2017/3/30.
 */
angular.module('makeVideoDownQuestionModule')
.directive('makeVideoDownQuestionDirective',function () {
    return {
        register:"ACE",
        replace:true,
        templateUrl:"make-video-downquestion/make-video-downquestion-template.html",
        controller:['$scope','$http','serverUrl','$stateParams',function ($scope,$http,serverUrl,$stateParams) {
          $scope.b=10;
            $http.get(serverUrl+'question/getCourseQuestion?c_sortname='+$stateParams.c_sortname)
                .then(function successCallback(response) {
                    // 请求成功执行代码
                    $scope.courseQuestion = response.data;
                    // console.log($scope.courseQuestion[0] )
                    for(var i = 0;i<$scope.courseQuestion.length;i++){
                        $scope.date=new Date($scope.courseQuestion[i].latest_time);
                        $scope.courseQuestion[i].latest_time=$scope.date.toLocaleString();
                        // console.log($scope.courseQuestion[i].latest_time)
                    }

                }, function errorCallback(response) {
                    // 请求失败执行代码
                    console.log("nosuccess")
                });
        }]
    }
})