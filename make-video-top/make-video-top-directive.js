/**
 * Created by kition on 2017/3/30.
 */
angular.module('makeVideoTopModule')
.directive('makeVideoTopDirective',function () {
    return {
        register:"ACE",
        replace:true,
        templateUrl:"make-video-top/make-video-top-template.html",
        controller:['$scope','$http','serverUrl','$stateParams','$state','$sce',function ($scope,$http,serverUrl,$stateParams,$state,$sce){
            $scope.videoUrl = function(url){
                return $sce.trustAsResourceUrl(url);
            }
              // console.log($stateParams.cno,$stateParams.chapterno,$stateParams.sectionno,$stateParams.c_sortname)
            $http.get(serverUrl+'course/getvideo?cno='+$stateParams.cno+ '&chapterno='+$stateParams.chapterno+' &sectionno='+$stateParams.sectionno)
                .then(function successCallback(response) {
                    // 请求成功执行代码
                    $scope.getVideo = response.data[0];
                    $scope.link=$scope.getVideo.sectionvideolink;
                    // console.log($scope.link )

                }, function errorCallback(response) {
                    // 请求失败执行代码
                    console.log("nosuccess")
                });
            $scope.video = function(e) {
                var videoElements = angular.element(e.srcElement);
                videoElements[0].pause();
            }
        }]
    }
})




