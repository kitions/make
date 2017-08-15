/**
 * Created by kition on 2017/4/26.
 */
angular.module('index')
    .controller('ModalDemoCtrl', function ($scope, $uibModal, $log) {
//然后就是主控制器,没什么,注意$uibModal这个东西,也是要在控制器中引入的
        $scope.items = ['item1', 'item2', 'item3'];

        $scope.animationsEnabled = true;

        $scope.open = function (size) {
            //这里很关键,是打开模态框的过程
            var modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,//打开时的动画开关
                templateUrl: 'myModalContent.html',//模态框的页面内容,这里的url是可以自己定义的,也就意味着什么都可以写
                controller: 'ModalInstanceCtrl',//这是模态框的控制器,是用来控制模态框的
                size: size,//模态框的大小尺寸
                resolve: {//这是一个入参,这个很重要,它可以把主控制器中的参数传到模态框控制器中
                    items: function () {//items是一个回调函数
                        return $scope.items;//这个值会被模态框的控制器获取到
                    }
                }
            });
            modalInstance.result.then(function (selectedItem) {//这是一个接收模态框返回值的函数
                $scope.selected = selectedItem;//模态框的返回值
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };

        $scope.toggleAnimation = function () {
            $scope.animationsEnabled = !$scope.animationsEnabled;//动画效果
        };

    })
    .controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, items) {
//这是模态框的控制器,记住$uibModalInstance这个是用来调用函数将模态框内的数据传到外层控制器中的,items则上面所说的入参函数,它可以获取到外层主控制器的参数
        $scope.items = items;//这里就可以去外层主控制器的数据了
        $scope.selected = {
            item: $scope.items[0]
        };

        $scope.ok = function () {
            //close函数是在模态框关闭后调用的函数,他会将这个参数传到主控制器的results函数中,作为回调值
            $uibModalInstance.close($scope.selected.item);
        };

        $scope.cancel = function () {
            //dismiss也是在模态框关闭的时候进行调用,而它返回的是一个reason
            $uibModalInstance.dismiss('cancel');
        };
    })
    .controller('TabsDemoCtrl', function ($scope, $window) {

    })

    .controller('loginCtrl', function ($scope, $http, $rootScope,serverUrl,$window,$state) {

        $scope.loginin = function () {
            if (checklog() && checkpwd() == true) {
                //get提交
                // $http.get('http://localhost:3001/users/login/?user_tel=' + $scope.user_tel + '&user_password=' + $scope.user_password)
                //     .then(function successCallback(response) {
                //         // 请求成功执行代码
                //
                //         // alert(response.data.result);
                //         if (response.data.result == 1) {
                //             $rootScope.isLogin = true;
                //             $rootScope.userId = $scope.user_tel;
                //             $scope.cancel();
                //         } else if (response.data.result == 2) {
                //             alert('密码错误');
                //         } else if (response.data.result == 3) {
                //             alert('服务器正在维护');
                //         } else if (response.data.result == 0) {
                //             alert('用户不存在');
                //         }
                //     }, function errorCallback(response) {
                //         // 请求失败执行代码
                //
                //     });
                //提交
                $http({
                    // url:'http://localhost:3001/users/login',
                    url:serverUrl+'users/login',
                    method:'POST',
                    data:{
                        user_tel:$scope.user_tel,
                        user_password:$scope.user_password
                    },
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
                        if (response.data.result == 1) {

                            $rootScope.isLogin = true;
                            $rootScope.user_tel = $scope.user_tel;
                            $rootScope.user_password = $scope.user_password;

                            $scope.cancel();
                            $window.location.reload();
                                localStorage.setItem('isLogin',$rootScope.isLogin);
                                localStorage.setItem('user_tel',$scope.user_tel);
                                localStorage.setItem('user_password',$scope.user_password);
                                localStorage.setItem('checkbox',true);


                        }
                        else if (response.data.result == 2) {
                            alert('密码错误');
                        } else if (response.data.result == 3) {
                            alert('服务器正在维护');
                        } else if (response.data.result == 0) {
                            alert('用户不存在');
                        }
                    }, function errorCallback(response) {
                        // 请求失败执行代码
                    })

                // loginService2.logins({user_tel:$scope.user_tel,user_password:$scope.user_password});
                // alert(ses.data.result);

                // console.log(loginService2.logins({user_tel:$scope.user_tel,user_password:$scope.user_password}))
                // if($rootScope.success===1){
                //     $scope.cancel()
                // }

            }
        }
    })
    .controller('registCtrl', function ($scope, $http,$rootScope,serverUrl,$window,$state) {
        $scope.regist = function () {
            if (checkregisttel() && checkregistPwd() == true) {
                //get提交
                /* $http.get('http://localhost:3001/users/regist/?user_tel=' + $scope.user_tel + '&user_password=' + $scope.user_password)
                 .then(function successCallback(response) {
                 // 请求成功执行代码
                 // alert(response.data.result);

                 if (response.data.result == 1) {
                 $scope.cancel();
                 alert('注册成功');
                 } else if (response.data.result == 2) {
                 alert('用户已存在');
                 } else if (response.data.result == 3 || response.data.result == 0) {
                 alert('服务器正在维护');
                 }
                 }, function errorCallback(response) {
                 // 请求失败执行代码
                 });*/

                $http({
                    url: serverUrl+"users/regist",
                    method:'POST',
                    data:{
                        user_tel:$scope.user_tel,
                        user_password:$scope.user_password,
                    },
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
                        // alert(response.data.result);
                        if (response.data.result == 1) {

                            // $rootScope.isLogin = true;
                            // $rootScope.user_tel = $scope.user_tel;
                            // $rootScope.user_password = $scope.user_password;
                            // localStorage.setItem('isLogin',$rootScope.isLogin);
                            // localStorage.setItem('user_tel',$rootScope.user_tel);
                            // localStorage.setItem('user_password',$rootScope.user_password);
                            // $scope.cancel();
                            // alert('注册成功');
                            $http({
                                url:serverUrl+'users/login',
                                method:'POST',
                                data:{
                                    user_tel:$scope.user_tel,
                                    user_password:$scope.user_password
                                },
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
                                        $rootScope.isLogin = true;
                                        $rootScope.user_tel = $scope.user_tel;
                                        $rootScope.user_password = $scope.user_password;

                                        $scope.cancel();

                                        alert("恭喜您已经成为码客家族的一员")
                                        localStorage.setItem('isLogin',$rootScope.isLogin);
                                        localStorage.setItem('user_tel',$scope.user_tel);
                                        localStorage.setItem('user_password',$scope.user_password);
                                        localStorage.setItem('checkbox',true);
                                    $state.go("index",{},{reload: true})
                                }, function errorCallback(response) {
                                    // 请求失败执行代码
                                })

                        } else if (response.data.result == 2) {
                            alert('用户已存在');
                        } else if (response.data.result == 3 || response.data.result == 0) {
                            alert('服务器正在维护');
                        }
                    }, function errorCallback(response) {
                        // 请求失败执行代码
                    })
            }
        }
    })
    //记住登录状态
    .controller('rememberPwdCtrl',function ($scope,loginService2,$http,serverUrl,$rootScope) {
    var s = localStorage.getItem('isLogin');
    var s1 = localStorage.getItem('user_tel');
    var s2 = localStorage.getItem('user_password');
    if(s!=null&&s1!=null&&s2!=null){
        $scope.user_tel = s1;
        $scope.user_password = s2;
        $scope.logins = loginService2.logins({user_tel:$scope.user_tel,user_password:$scope.user_password});
    }
    $http.get(serverUrl+'users/getall/?user_tel='+$scope.user_tel )
        .then(function successCallback(response) {
            // 请求成功执行代码
            // console.log(response.data[0]);
            $scope.userData=response.data[0];
            // console.log($scope.userData);
            $rootScope.user_id=$scope.userData.user_id;
// console.log($rootScope.user_id);
            $rootScope.user_icon=$scope.userData.user_icon;
            // console.log($rootScope.user_icon);
            $rootScope.user_name=$scope.userData.user_name;
            $rootScope.career_name=$scope.userData.career_name;
            localStorage.setItem('user_icon',$rootScope.user_icon);
        }, function errorCallback(response) {
            // 请求失败执行代码

        });
})





