/**
 * Created by hp on 2017-4-23.
 */
angular.module('personCenterModule')
.directive('personCenterDirective',function () {
    return {
        register:"ACE",
        replace:true,
        templateUrl:"cperson-center/person-center.template.html",
        controller:[
            '$scope', '$http', '$state', '$rootScope', 'serverUrl', 'Upload', 'imgUrl','loginService2',
            function ($scope,$http,$state,$rootScope,serverUrl,Upload,imgUrl,loginService2) {

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


                        // 图片上传

                        $scope.data = {
                            defaultImage:"http://opdizmh0n.bkt.clouddn.com/"+$rootScope.user_icon
                        };
                        $scope.uploadUserIcon = function () {
                            if (!$scope.user_ico) {
                                return;
                            }


                            // var uid=localStorage.getItem('uid');
                            // console.log(uid)

                            var url = serverUrl+'users/upload';  //params是model传的参数，图片上传接口的url
                            var data = angular.copy({user_id:$rootScope.user_tel} || {}); // 接口需要的额外参数，比如指定所上传的图片属于哪个用户: { UserId: 78 }
                            data.file = $scope.user_ico;
                            console.log(data);
                            Upload.upload({
                                url: url,
                                data: data
                            }).success(function (data) {
                                console.log(data)
                                $scope.isCropShow=false;
                                $rootScope.user_icon=$rootScope.user_icon;
                                $state.go("personinfo",{}, {reload: true});

                            }).error(function () {
                                console.log('error');
                            });
                        };
                        var s1 = localStorage.getItem('user_tel');
                        $scope.user_tel = s1;
                        $http.get(serverUrl+'users/getall/?user_tel='+$scope.user_tel )
                            .then(function successCallback(response) {

                                $scope.userData=response.data[0];
                                // console.log($scope.userData)
                            }, function errorCallback(response) {
                                // 请求失败执行代码
                                console.log('person error')
                            });
                        // console.log($rootScope.user_id)
                        //lb
                        $scope.ques=1;
                        $scope.ac=1;
                        $http.get(serverUrl+'person/my_yuanwen/?user_id='+$rootScope.user_id )
                            .then(function successCallback(response) {

                                $scope.myYuanwen=response.data;
                                // console.log(1111111)
                                for(var i = 0;i<$scope.myYuanwen.length;i++){
                                    $scope.date=new Date($scope.myYuanwen[i].sendtime);
                                    $scope.myYuanwen[i].sendtime=$scope.date.toLocaleString();
                                }
                                // console.log($scope.userData)
                            }, function errorCallback(response) {
                                // 请求失败执行代码
                                console.log('person error')
                            });
                        $http.get(serverUrl+'person/my_course/?user_id='+$rootScope.user_id )
                            .then(function successCallback(response) {

                                $scope.myCourse=response.data;
                                // console.log($scope.userData)
                            }, function errorCallback(response) {
                                // 请求失败执行代码
                                console.log('person error')
                            });
                        $http.get(serverUrl+'person/my_ac/?user_id='+$rootScope.user_id )
                            .then(function successCallback(response) {

                                $scope.myAc=response.data;

                            }, function errorCallback(response) {
                                // 请求失败执行代码
                                console.log('person error')
                            });
                        $http.get(serverUrl+'person/my_res/?user_id='+$rootScope.user_id )
                            .then(function successCallback(response) {

                                $scope.myRes=response.data;
                                for(var i = 0;i<$scope.myRes.length;i++){
                                    $scope.date=new Date($scope.myRes[i].rtime);
                                    $scope.myRes[i].rtime=$scope.date.toLocaleString();
                                }
                                // console.log($scope.userData)
                            }, function errorCallback(response) {
                                // 请求失败执行代码
                                console.log('person error')
                            });
                        $http.get(serverUrl+'person/my_noorder/?user_id='+$rootScope.user_id )
                            .then(function successCallback(response) {

                                $scope.myNoorder=response.data;
                                // console.log($scope.userData)

                                for(var i = 0;i<$scope.myNoorder.length;i++){
                                    $scope.date=new Date($scope.myNoorder[i].otime);
                                    $scope.myNoorder[i].otime=$scope.date.toLocaleString();
                                }

                    }, function errorCallback(response) {
                                // 请求失败执行代码
                                console.log('person error')
                            });


                        $scope.deleteOrder=function (ono) {
                            $http.get(serverUrl+'person/deleteOrder/?ono='+ono+'&user_id='+$rootScope.user_id )
                                .then(function successCallback(response) {

                                    $scope.myNoorder=response.data;
                                    // console.log($scope.myNoorder)

                                    for(var i = 0;i<$scope.myNoorder.length;i++){
                                        $scope.date=new Date($scope.myNoorder[i].otime);
                                        $scope.myNoorder[i].otime=$scope.date.toLocaleString();
                                    }


                                    // console.log($scope.userData)
                                }, function errorCallback(response) {
                                    // 请求失败执行代码
                                    console.log('person error')
                                });
                        }
                        //new start
                        $http.get(serverUrl+'person/my_coursefirst/?user_id='+$rootScope.user_id )
                            .then(function successCallback(response) {

                                $scope.myCoursefirst=response.data;
                                // console.log($scope.myCoursefirst)
                                for(var i = 0;i<$scope.myCoursefirst.length;i++){
                                    $scope.date=new Date($scope.myCoursefirst[i].otime);
                                    $scope.myCoursefirst[i].otime=$scope.date.toLocaleString();
                                }
                                // console.log($scope.userData)
                            }, function errorCallback(response) {
                                // 请求失败执行代码
                                console.log('person error')
                            });
                        $http.get(serverUrl+'person/my_courselate/?user_id='+$rootScope.user_id )
                            .then(function successCallback(response) {

                                $scope.myCourselate=response.data;
                                // console.log( $scope.myCourselate)
                                if($scope.myCourselate.length>0){
                                    $scope.kecheng="true";
                                }else{
                                $scope.kecheng="false";

                                }
                                // console.log($scope.userData)
                            }, function errorCallback(response) {
                                // 请求失败执行代码
                                console.log('person error')
                            });
                        $http.get(serverUrl+'person/my_courseelse/?user_id='+$rootScope.user_id )
                            .then(function successCallback(response) {
                                $scope.myCourseelse=response.data;
                                // console.log($scope.userData)
                            }, function errorCallback(response) {
                                // 请求失败执行代码
                                console.log('person error')
                            });
                        $http.get(serverUrl+'person/my_maxtime/?user_id='+$rootScope.user_id )
                            .then(function successCallback(response) {
                                $scope.mymaxtime=response.data[0];
                                // console.log($scope.userData)
                            }, function errorCallback(response) {
                                // 请求失败执行代码
                                console.log('person error')
                            });
                        $http.get(serverUrl+'person/my_mintime/?user_id='+$rootScope.user_id )
                            .then(function successCallback(response) {
                                $scope.mymintime=response.data[0];
                                // console.log($scope.userData)
                            }, function errorCallback(response) {
                                // 请求失败执行代码
                                console.log('person error')
                            });
                        $http.get(serverUrl+'person/my_dongtai/?user_id='+$rootScope.user_id )
                            .then(function successCallback(response) {
                                $scope.myDongtai=response.data;
                                //判断数组是否有东西，没有的话就输出一句话：无动态
                                // console.log($scope.myDongtai)
                                if($scope.myDongtai.length>0){
                                    $scope.dongtai="true";
                                    // console.log($scope.dongtai)
                                }else{
                                    $scope.dongtai="false";
                                }

                                for(var i = 0;i<$scope.myDongtai.length;i++){
                                    // console.log(typeof($scope.myDongtai[i].sendtime ));
                                    $scope.date=new Date($scope.myDongtai[i].sendtime);
                                    $scope.myDongtai[i].sendtime=$scope.date.toLocaleString();
                                    //
                                    //$scope.column=$scope.myDongtai[i].sendtime;
                                }

                            }, function errorCallback(response) {
                                // 请求失败执行代码
                                console.log('person error')
                            });
                        $scope.buyNow=function (ano) {
                            // console.log(ano,$rootScope.user_id);
                            $state.go('make-shopcar-pay',{ano:ano,user_id:$rootScope.user_id})
                        }

                        //for(var i = 0;i<$scope.comments.length;i++){
                        //    $scope.date=new Date($scope.comments[i].cctime);
                        //    $scope.comments[i].cctime=$scope.date.toLocaleString();
                        //}

                        //for(var i = 0;i<$scope.questionDetail.length;i++){
                        //    $scope.date=new Date($scope.questionDetail[i].rtime).getTime();
                        //    $scope.questionDetail[i].rtime=$scope.date;
                        //    // console.log($scope.comments[i].cctime)
                        //}

                        //new end

                        //    lb end

                        //lk start
                        $scope.coun =1
                        $scope.userinfo = function (user_name,career_id,sex_id,email,sign) {
                            // console.log(user_name,career_id,sex_id,email,sign,$rootScope.user_id )
                            var data = {
                                user_name:user_name,
                                career_id:career_id==undefined?'':career_id,
                                sex_id:sex_id==undefined?'':sex_id,
                                email:email==undefined?'':email,
                                sign:sign==undefined?'':sign,
                                user_id:$rootScope.user_id
                            }
                            // $http.get(serverUrl+'person/updateUserInfo/?user_name='+user_name+'&career_id'+career_id+'&sex_id=0'+sex_id+'&email='+email+'&sign='+sign+'&user_id='+$rootScope.user_id )
                            //$http.get(serverUrl+'person/updateUserInfo'+jsondata)
                            $http({
                                method: 'POST',
                                url: serverUrl+'person/updateUserInfo',
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

                                    // $scope.userData=response.data[0];
                                    if(response.data.result==1){

                                        $state.go('personinfo',{},{reload:true})
                                    }
                                    console.log(response.data.result)
                                }, function errorCallback(response) {
                                    // 请求失败执行代码
                                    console.log('person error')
                                });
                        }
                        //lk end





                    }, function errorCallback(response) {
                        // 请求失败执行代码
                    });






                $scope.count=1;
                $(".nav-aside").hover(function (ev) {
                    $(ev.target).children().css("color","white");

                },function (ev) {
                    $(ev.target).children().css("color","black");
                })
                // 修改头像样式
                $('#change-user-icon-btn').click(function () {
                    $('#change-user-icon-btn').hide();
                    $('#true-icon-btn').show();
                })

                $('#true-icon-btn').click(function () {
                    $('#true-icon-btn').hide();
                    $('#change-user-icon-btn').show();
                })



            }]

    }
})
$(document).on('click','.tip-setting',function () {
    $('.page-home .setup-coverLayer').show(); $('#js-setup-popl').show();
})
$(document).on('click','.close,.page-home  .setup-coverLayer',function () {
    $('.page-home  .setup-coverLayer').hide(); $('#js-setup-popl').hide();
})
$(document).on('mouseover','.user-pict,.update-avator',function () {
    $('.update-avator').show();
    $('.update-avator').css('color','wihte');
})
$(document).on('mouseout','.user-pict,.update-avator',function () {
    $('.update-avator').hide();
})
$(document).on('click','.update-avator',function () {
    $('.mmmm').show(); $('.moco-modal-layer').show();
})
$(document).on('click','.moco-modal-close,.mmmm',function () {
    $('.mmmm').hide(); $('.moco-modal-layer').hide();
})
$(document).on('click','.cperson-nav li',function () {
    $(this).addClass('reda').siblings().removeClass('reda');
})

