/**
 * Created by kition on 2017/3/30.
 */
angular.module('makeVideoDownCommentModule')
.directive('makeVideoDownCommentDirective',function () {
    return {
        register:"ACE",
        replace:true,
        templateUrl:"make-video-downcomment/make-video-downcomment-template.html",
        controller:['$scope','$http','serverUrl','$stateParams','$rootScope',function ($scope,$http,serverUrl,$stateParams,$rootScope) {
           $scope.a=10;
            $http.get(serverUrl+'question/getcomment?cno='+$stateParams.cno+'&user_id='+$rootScope.user_id)
                .then(function successCallback(response) {
                    // 请求成功执行代码
                    $scope.comments = response.data;
                    for(var i = 0;i<$scope.comments.length;i++){
                        $scope.date=new Date($scope.comments[i].cctime);
                        $scope.comments[i].cctime=$scope.date.toLocaleString();
                    }
                        $scope.like=function($event,ccno){
                            $http.get(serverUrl+'question/getLike?ccno='+ccno+'&user_id='+$rootScope.user_id)
                                .then(function successCallback(response) {
                                    //是否点过赞？
                                    if(response.data.result==1){
                                        //如果存在
                                            //执行取消点赞
                                            $http.get(serverUrl + 'question/deleteLike?ccno=' + ccno + '&user_id=' + $rootScope.user_id+'&cno='+$stateParams.cno)
                                                .then(function successCallback(response) {
                                                    // 请求成功执行代码
                                                    $scope.newComment=response.data;
                                                    $scope.comments=$scope.newComment;
                                                    for(var i = 0;i<$scope.comments.length;i++){
                                                        $scope.date=new Date($scope.comments[i].cctime);
                                                        $scope.comments[i].cctime=$scope.date.toLocaleString();
                                                    }
                                                }, function errorCallback(response) {
                                                    // 请求失败执行代码
                                                });
                                    }else {
                                        //否则添加点赞
                                            $http.get(serverUrl+'question/insertLike?ccno='+ccno+'&user_id='+$rootScope.user_id+'&cno='+$stateParams.cno)
                                                .then(function successCallback(response) {
                                                    // 请求成功执行代码
                                                    $scope.newComment1=response.data;

                                                    $scope.comments=$scope.newComment1;
                                                    for(var i = 0;i<$scope.comments.length;i++){
                                                        $scope.date=new Date($scope.comments[i].cctime);
                                                        $scope.comments[i].cctime=$scope.date.toLocaleString();
                                                    }
                                                }, function errorCallback(response) {
                                                    // 请求失败执行代码
                                                });
                                    }
                                }, function errorCallback(response) {
                                    // 请求失败执行代码
                                });
                        }
                }, function errorCallback(response) {
                    // 请求失败执行代码
                    console.log("nosuccess")
                });
            $scope.submit = function (aaa) {
                if(aaa!=undefined){
                $http.get(serverUrl+'question/insertComment?ccdetail='+aaa+'&cno='+$stateParams.cno+'&user_id='+$rootScope.user_id)
                    .then(function successCallback(response) {
                        // 请求成功执行代码
                        $scope.newComment = response.data;
                        $scope.comments = $scope.newComment;
                        for(var i = 0;i<$scope.comments.length;i++){
                            $scope.date=new Date($scope.comments[i].cctime);
                            $scope.comments[i].cctime=$scope.date.toLocaleString();
                            // console.log($scope.comments[i].cctime)
                        }
                    }, function errorCallback(response) {
                        // 请求失败执行代码
                        console.log("nosuccess")
                    });
                }
            }
        }]
    }
})