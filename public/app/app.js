var recsApp=angular.module('recsApp',['docsController','ui.router'])


.config(function($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise('/');
    
    $stateProvider
        .state('login',{
            url:'/login',
            templateUrl:'page/login.html',
            controller:'loginController'
        })

        .state('home',{
            url:'/',
            templateUrl:'page/home.html',
            controller:'homeController'
        })

        .state('signin',{
            url:'/signin',
            templateUrl:'page/signin.html',
            controller:'signinController'
        })

        .state('signup',{
            url:'/signup',
            templateUrl:'page/signup.html',
            controller:'signupController'
        })

        .state('account',{
            url:'/account',
            templateUrl:'page/account.html',
            controller:'accountController'
        })

        .state('joblist',{
            url:'/joblist',
            templateUrl:'page/joblist.html',
            controller:'joblistController'
        })

        .state('search',{
            url:'/search',
            templateUrl:'page/search.html',
            controller:'searchController'
        })

        .state('details',{
            url:'/details/{id}',
            templateUrl:'page/detail.html',
            controller:'detailController'
        })
})