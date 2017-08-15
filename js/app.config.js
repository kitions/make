/**
 * Created by kition on 2017/3/30.
 */
angular.module('index')
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        // $locationProvider.html5Mode(true);
        $urlRouterProvider.otherwise('/index');
        $stateProvider
            .state('index', {
                url: '/index',
                template: "<make-index-directive></make-index-directive>",
                controller:'rememberPwdCtrl'

            })
            .state('course', {
                url: '/course',
                template: '<make-course-directive></make-course-directive>',
                controller:'rememberPwdCtrl'
            })
            .state('shizhan', {
                url: '/shizhan',
                template: "<make-shizhan-directive></make-shizhan-directive>",
                controller:'rememberPwdCtrl'
            })
            .state('knowledge', {
                url: '/knowledge',
                template: "<make-zhishi-path-directive></make-zhishi-path-directive>",
                controller:'rememberPwdCtrl'
            })
            .state('monkeyasking', {
                url: '/monkeyasking',
                template: " <make-question-index-directive></make-question-index-directive>",
                controller:'rememberPwdCtrl'
            })
            .state('asking', {
                url: '/asking',
                template: "<make-question-tiwen-directive></make-question-tiwen-directive>",
                controller:'rememberPwdCtrl'
            })
            .state('courseinfo', {
                // params:{'cno':null},
                url: '/courseinfo/:cno/:c_sortname',
                template: '<make-course-detail-directive></make-course-detail-directive>',
                controller:'rememberPwdCtrl',

            })
            .state('video', {
                url: '/video/:cno/:chapterno/:sectionno/:c_sortname',
                template: '<make-video-top-directive></make-video-top-directive>',
                controller:'rememberPwdCtrl'
            })
            .state('personinfo', {
                url: '/personinfo',
                template: '<person-center-directive></person-center-directive>',

            })
            .state('shizhaninfo', {
                url: '/shizhaninfo/:ano',
                template: '<shizhan-info-directive></shizhan-info-directive>',
                controller:'rememberPwdCtrl'
            })
            .state('make-shopcar-mycart', {
                url: '/make-shopcar-mycart',
                template: "<div make-shopcar-mycart-directive></div> ",
                controller:'rememberPwdCtrl'
            })
            .state('make-shopcar-confirm', {
                url: '/make-shopcar-confirm/:ano/:user_id',
                template: "<div make-shopcar-confirm-directive></div> ",
                controller:'rememberPwdCtrl'
            })
            .state('make-shopcar-pay', {
                url: '/make-shopcar-pay/:ano',
                template: "<div make-shopcar-pay-directive></div> ",
                controller:'rememberPwdCtrl'
            })
            .state('make-question-detail', {
                url: '/make-question-detail/:qno',
                template: " <make-question-detail-directive></make-question-detail-directive>",
                controller:'rememberPwdCtrl'
            })
            .state('make-search', {
                url: '/make-search',
                template: " <make-search-directive></make-search-directive>",
                controller:'rememberPwdCtrl'
            })
            .state('make-edit', {
                url: '/make-edit',
                template: " <make-edit-directive></make-edit-directive>",
                controller:'rememberPwdCtrl'
            })

    }])

