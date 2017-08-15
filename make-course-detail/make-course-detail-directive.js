/**
 * Created by kition on 2017/3/30.
 */
angular.module('makeCourseDetailModule')
.directive('makeCourseDetailDirective',function () {
    return {
        register:"ACE",
        replace:true,
        templateUrl:"make-course-detail/make-course-detail-template.html",
        controller:['$scope',"$state",'$stateParams','serverUrl','$http','$rootScope',function ($scope,$state,$stateParams,serverUrl,$http,$rootScope) {
            $scope.count =1;
            var data = {cno:$stateParams.cno}

            //请求页面详情
            $http.get(serverUrl+'course/getCourseDetail?cno='+$stateParams.cno)
                .then(function successCallback(response) {
                    // 请求成功执行代码
                    $scope.getCourseDetail = response.data[0];
                }, function errorCallback(response) {
                    // 请求失败执行代码
                    console.log("nosuccess")
                });
            $http.get(serverUrl+'course/getChapter?cno='+$stateParams.cno)
                .then(function successCallback(response) {
                    // 请求成功执行代码
                    $scope.getChapter = response.data;
                    // console.log($scope.getChapter )
                }, function errorCallback(response) {
                    // 请求失败执行代码
                    console.log("nosuccess")
                });
            $http.get(serverUrl+'course/getSection?cno='+$stateParams.cno)
                .then(function successCallback(response) {
                    // 请求成功执行代码
                    $scope.getSection = response.data;
                    // console.log($scope.getSection )
                }, function errorCallback(response) {
                    // 请求失败执行代码
                    console.log("nosuccess")
                });
            $scope.startStudy=function () {
                $http.get(serverUrl+'course/insertCourseStudy?user_id='+$rootScope.user_id+'&cno='+$stateParams.cno)
                    .then(function successCallback(response) {
                        // 请求成功执行代码
                        if(response.data.result==1){
                            console.log("您正要学习该课程")
                        }else{
                            console.log('您已经学过了该课程')
                        }
                    }, function errorCallback(response) {
                        // 请求失败执行代码
                        console.log("nosuccess")
                    });
            }

            $scope.video = function (cno) {
                // console.log(cno)
                $state.go('video',{cno:cno})
            }
            $scope.learn = function (cno,chapterno,sectionno,c_sortname) {
                console.log(cno,chapterno,sectionno,c_sortname)
                $state.go('video',{cno:cno,chapterno:chapterno,sectionno:sectionno,c_sortname:c_sortname})
            }
        }]
    }
})
$(document).on('click','.zhangjie',function () {
    //$(this).toggleClass("currentDt");
    $(this).find ('.bing').toggleClass("hide").siblings().removeClass('hide');
    $(this).find('.lili').toggleClass("show").siblings().removeClass('show');
    $(this).find('.menu').slideToggle(300);
})
$(document).on('click','.navs a',function () {
    $(this).addClass('reda').siblings().removeClass('reda');
})
