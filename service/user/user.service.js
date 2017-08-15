/**
 * Created by lcx on 2017/4/25.
 */
angular.module('serviceUser')
    .service('loginService',['$scope','$http','$state','$rootScope','serverUrl',
        function ($scope,$http,$state,$rootScope,serverUrl) {


        this.logins = function ($scope,$http,$state,$rootScope,serverUrl) {
            $http({
                url: serverUrl + 'users/login',
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
                    // 请求成功执行代码

                    if (response.data.result.status == 1) {
                        alert('成功');
                        console.log(111);
                        $rootScope.isLogin = true;
                        $rootScope.user_tel = $scope.user_tel;
                        $rootScope.user_password = $scope.user_password;
                        console.log($rootScope.isLogin);

                        localStorage.setItem('isLogin',$rootScope.isLogin);
                        localStorage.setItem('user_tel',$rootScope.user_tel);
                        localStorage.setItem('user_password',$rootScope.user_password);
                        localStorage.setItem('checkbox',true);


                        $state.go('index');
                    }else if(response.data.result == 2){   //密码错误
                        alert('密码错误');
                    }else if(response.data.result == 0){   //用户名不存在
                        alert('用户不存在');
                    }else if (response.data.result == 3) {
                        alert('服务器正在维护');
                    }
                }, function errorCallback(response) {
                    // 请求失败执行代码
                })
        }


    }])


    .factory('loginService2',['$http','$state','$rootScope','serverUrl',function ($http,$state,$rootScope,serverUrl) {

        return{
            logins:function (data) {
                // console.log(data);
            $http({
                url:serverUrl+"users/login",
                method:'POST',
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

                    if (response.data.result == 1) {

                        $rootScope.isLogin = true;
                        $rootScope.user_tel = data.user_tel;
                        $rootScope.user_password = data.user_password;
                        // $rootScope.user_icon = data.user_icon;
                        //
                        // localStorage.setItem('user_icon',$rootScope.user_icon);
                        localStorage.setItem('isLogin',$rootScope.isLogin);
                        localStorage.setItem('user_tel',$rootScope.user_tel);
                        localStorage.setItem('user_password',$rootScope.user_password);
                        localStorage.setItem('checkbox',true);


                    }else if(response.data.result == 2){   //密码错误
                        alert('密码错误');
                    }else if(response.data.result == 0){   //用户名不存在
                        alert('用户不存在');
                    }else if (response.data.result == 3) {
                        alert('服务器正在维护');
                    }
                }, function errorCallback(response) {
                    // 请求失败执行代码
                });

        }
        }


    }])
    .factory('logout',function () {
       return{
           logout:function () {
               localStorage.removeItem('isLogin');
               localStorage.removeItem('user_tel');
               localStorage.removeItem('user_password');
               localStorage.removeItem('checkbox');
           }
       }
    })
