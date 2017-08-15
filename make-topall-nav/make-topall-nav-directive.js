/**
 * Created by kition on 2017/3/30.
 */
angular.module('makeTopallNavModule')
.directive('makeTopallNavDirective',function () {
    return {
        register:"ACE",
        replace:true,
        templateUrl:"make-topall-nav/make-topall-nav-template.html",
        controller:['$scope','$http','$rootScope','logout','$state','serverUrl',function ($scope,$http,$rootScope,logout,$state,serverUrl) {
            $scope.exit  =function () {
                logout.logout();
                $rootScope.isLogin = 'flase';
                $state.go("index",{},{reload: true})

            }
            $scope.transValue=function(e){
                $rootScope.txtSearch=$scope.txtSearch;
            }
            $scope.trans=function(e){
                $rootScope.txtSearch=$scope.txtSearch;
                $rootScope.filterText=$rootScope.txtSearch
            }
        }]
    }
})
$(document).on('click','#cd-menu-trigger',function () {
    var $lateral_menu_trigger = $('#cd-menu-trigger'),
        $content_wrapper = $('.cd-main-content'),
        $navigation = $('header');
    //open-close lateral menu clicking on the menu icon
        event.preventDefault();
        $lateral_menu_trigger.toggleClass('is-clicked');
        $navigation.toggleClass('lateral-menu-is-open');
        $content_wrapper.toggleClass('lateral-menu-is-open').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
            // firefox transitions break when parent overflow is changed, so we need to wait for the end of the trasition to give the body an overflow hidden
            $('body').toggleClass('overflow-hidden');
        });
        $('#cd-lateral-nav').toggleClass('lateral-menu-is-open');

        //check if transitions are not supported - i.e. in IE9
        if($('html').hasClass('no-csstransitions')) {
            $('body').toggleClass('overflow-hidden');
        }
    //close lateral menu clicking outside the menu itself
    $content_wrapper.on('click', function(event){
        if( !$(event.target).is('#cd-menu-trigger, #cd-menu-trigger span') ) {
            $lateral_menu_trigger.removeClass('is-clicked');
            $navigation.removeClass('lateral-menu-is-open');
            $content_wrapper.removeClass('lateral-menu-is-open').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
                $('body').removeClass('overflow-hidden');
            });
            $('#cd-lateral-nav').removeClass('lateral-menu-is-open');
            //check if transitions are not supported
            if($('html').hasClass('no-csstransitions')) {
                $('body').removeClass('overflow-hidden');
            }

        }
    });

    //open (or close) submenu items in the lateral menu. Close all the other open submenu items.
    $('.item-has-children').children('a').on('click', function(event){
        event.preventDefault();
        $(this).toggleClass('submenu-open').next('.sub-menu').slideToggle(200).end().parent('.item-has-children').siblings('.item-has-children').children('a').removeClass('submenu-open').next('.sub-menu').slideUp(200);
    });
})
$(document).on('click','.nav-item li',function () {
    $(this).addClass('actives').siblings().removeClass('actives');
})
