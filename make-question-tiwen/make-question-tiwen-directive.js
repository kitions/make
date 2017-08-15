/**
 * Created by kition on 2017/3/30.
 */
angular.module('makeQuestionTiwenModule')
    .directive('makeQuestionTiwenDirective', function () {
        return {
            register: "ACE",
            replace: true,
            templateUrl: "make-question-tiwen/make-question-tiwen-template.html",
            controller: ['$scope', '$http', 'serverUrl', '$stateParams', '$rootScope', 'textAngularManager', '$state',
                function ($scope, $http, serverUrl, $stateParams, $rootScope, textAngularManager, $state) {
                    var verifyCode = new GVerify("v_container");  // 类型是字母
                    document.getElementById("my_button").onclick = function () {
                        //verifyCode.validate(code);验证图形验证码，参数code为用户输入的验证码，返回值：正确：true,错误：false
                        var res = verifyCode.validate(document.getElementById("code_input").value);
                        if (res) {

                        } else {
                            $('.scucess-layer').show();
                            $('.scucess').show();
                            $('.avator-wapper').html('验证码错误');
                            //alert("验证码错误");
                        }
                    }
                    $http.get(serverUrl + 'course/c_sort')
                        .then(function successCallback(response) {
                            // 请求成功执行代码
                            $scope.sortData = response.data;
                            // console.log($scope.sortData)
                        }, function errorCallback(response) {
                            // 请求失败执行代码
                        });

                    //编辑器
                    $scope.version = textAngularManager.getVersion();
                    $scope.versionNumber = $scope.version.substring(1);
                    $scope.htmlcontent = $scope.orightml;
                    $scope.all = '';

                    $scope.asd = function (a) {
                        $scope.all = a;
                    }


                    $scope.subaa = function (qtitle) {
                        // console.log($scope.htmlcontent,qtitle,$scope.all,$rootScope.user_id)
                        var data = {
                            c_sortno:$scope.all,
                            user_id:$rootScope.user_id,
                            qtitle:qtitle,
                            qdetail:$scope.htmlcontent,
                        }

                            if (qtitle != undefined && $scope.all != '') {
                                // $http.get(serverUrl + 'question/insertQuestion?c_sortno=' + $scope.all + '&user_id=' + $rootScope.user_id + '&qtitle=' + qtitle + '&qdetail=' + $scope.htmlcontent)
                                $http({
                                    method: 'POST',
                                    url: serverUrl+'question/insertQuestion',
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
                                        if (response.data.result = 1) {
                                            $('.scucess-layer').show();
                                            $('.scucess').show();
                                            $('.avator-wapper').html('问题发布成功');
                                            $scope.open=function ()
                                            {
                                                $state.go('monkeyasking')
                                            }
                                            //alert('问题发布成功');

                                        } else {
                                            $('.scucess-layer').show();
                                            $('.scucess').show();
                                            $('.avator-wapper').html('问题发布失败');
                                            //alert('问题发布失败');
                                        }

                                    }, function errorCallback(response) {
                                        // 请求失败执行代码
                                        console.log("nosuccess")
                                    });
                            } else {
                                $('.scucess-layer').show();
                                $('.scucess').show();
                                $('.avator-wapper').html('请输入标题或选择问题类型');
                                //alert('请输入标题或选择问题类型')
                            }
                        }

                }]
        }
    })
$(document).on('click','.save-list-tag',function () {
    $(this).addClass('abcd').siblings().removeClass('abcd');
})




