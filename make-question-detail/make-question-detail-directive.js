/**
 * Created by kition on 2017/3/30.
 */
angular.module('makeQuestionDetailModule')
.directive('makeQuestionDetailDirective',function () {
    return {
        register:"ACE",
        replace:true,
        templateUrl:"make-question-detail/make-question-detail-template.html",
        controller:['$scope','$http','serverUrl','$stateParams','textAngularManager','$rootScope','$state',
            function ($scope,$http,serverUrl,$stateParams,textAngularManager,$rootScope,$state) {
            // console.log($stateParams.qno)
            $http.get(serverUrl+'question/getYuanwenDetail?qno='+$stateParams.qno)
                .then(function successCallback(response) {
                    // 请求成功执行代码
                    $scope.requestMan = response.data[0];
                    $scope.date=new Date($scope.requestMan.qtime);
                    $scope.requestMan.qtime=$scope.date.toLocaleString();

                    $scope.questionDetail = response.data;
                    // console.log($scope.questionDetail[0].rno)
                    if($scope.questionDetail[0].rno==null){
                        $scope.respon=false;


                    }else{
                        $scope.respon=true;
                    }
                    for(var i = 0;i<$scope.questionDetail.length;i++){
                        $scope.date=new Date($scope.questionDetail[i].rtime);
                        $scope.questionDetail[i].rtime=$scope.date.toLocaleString();
                        // console.log($scope.comments[i].cctime)
                    }

                }, function errorCallback(response) {
                    // 请求失败执行代码
                    console.log("nosuccess")
                });
                $scope.version = textAngularManager.getVersion();
                $scope.versionNumber = $scope.version.substring(1);
                $scope.htmlcontent = $scope.orightml;
                $scope.disabled = false;

                $scope.res=function () {
                    // console.log($scope.htmlcontent,$stateParams.qno,$rootScope.user_id)
                    console.log($scope.htmlcontent)
                    if($scope.htmlcontent!=undefined ){
                        var data = {
                            qno:$stateParams.qno,
                            rdetail:$scope.htmlcontent,
                            user_id:$rootScope.user_id
                        }

                        // $http.get(serverUrl+'question/insertResponse?qno='+$stateParams.qno+'&user_id='+$rootScope.user_id+'&rdetail='+$scope.htmlcontent)
                        $http({
                            method: 'POST',
                            url: serverUrl+'question/insertResponse',
                            data:data,
                            headers:{'Content-Type':'application/x-www-form-urlencoded'},
                            transformRequest:function (obj) {
                                var str = [];
                                for(var p in obj){
                                    str.push(encodeURIComponent(p)+"="+encodeURIComponent(obj[p]));
                                }
                                return str.join("&");
                            },
                            responseType:'json'
                        })
                            .then(function successCallback(response) {
                                // 请求成功执行代码

                                $scope.newQuestion = response.data;
                                $scope.respon=true;
                                for(var i = 0;i<$scope.newQuestion.length;i++){
                                    $scope.date=new Date($scope.newQuestion[i].rtime);
                                    $scope.newQuestion[i].rtime=$scope.date.toLocaleString();
                                    // console.log($scope.comments[i].cctime)
                                }
                                $scope.questionDetail = $scope.newQuestion

                            }, function errorCallback(response) {
                                // 请求失败执行代码
                                console.log("nosuccess")
                            });
                    } else{
                        $('.scucess-layer').show();
                        $('.scucess').show();
                        $('.avator-wapper').html('请输入回答内容');
                    }

                }

        }]
    }
})
