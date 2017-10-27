var recsApp=angular.module('recsApp',['docsController','ui.router','ngStorage','datatables'])

.config(function($stateProvider, $httpProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise('/');
    
    // $httpProvider.interceptors.push(['$q', '$location', '$localStorage', function($q, $location, $localStorage) {
    //     return {
    //         'request': function (config) {
    //             config.headers = config.headers || {};
    //             if ($localStorage.token) {
    //                 config.headers.Authorization = 'Bearer ' + $localStorage.token;
    //             }
    //             return config;
    //         },
    //         'responseError': function(response) {
    //             if(response.status === 401 || response.status === 403) {
    //                 $location.path('/signin');
    //             }
    //             return $q.reject(response);
    //         }
    //     };
    // }]);
    
    function _skipIfAuthenticated($q, $state, $localStorage) {
        var defer = $q.defer();
        if ($localStorage.token) {
            if($localStorage.type_user=="admin"){
                $timeout(function () {
                    $location.path('/admin');
                });    
            }else if($localStorage.type_user=="owner"){
                $timeout(function () {
                    $location.path('/owner');
                });
            }else if($localStorage.type_user=="member"){
                $timeout(function () {
                    $location.path('/member');
                });
            }else{
                $timeout(function () {
                    $location.path('/');
                });
            }

            defer.reject(); /* (1) */
        }else{
            defer.resolve(); /* (2) */
        }
        return defer.promise;
    }
    
    function _redirectIfNotAuthenticated($q, $state, $localStorage,$timeout,$location) {
        var defer = $q.defer();
        if ($localStorage.token) {
            defer.resolve(); /* (3) */
        }else{
            $timeout(function () {
                $location.path('/signin');
            });
            defer.reject();
        }
        return defer.promise;
    }
    
    $stateProvider
    .state('home',{
        url:'/',
        templateUrl:'page/home.html',
        controller:'homeController'
    })
    
    .state('signin',{
        url:'/signin',
        templateUrl:'page/signin.html',
        resolve: {
            skipIfAuthenticated: _skipIfAuthenticated
        },
        controller:'signinController'
    })
    
    .state('signup',{
        url:'/signup',
        templateUrl:'page/signup.html',
        resolve: {
            skipIfAuthenticated: _skipIfAuthenticated
        },
        controller:'signupController'
    })

    .state('signout',{
        url:'/signup',
        resolve: {
            redirectIfNotAuthenticated: _redirectIfNotAuthenticated
        },
        controller:'signoutController'
    })

    /*admin menu */
    .state('admin',{
        url:'/admin',
        templateUrl:'page/admin/index.html',
        resolve: {
            redirectIfNotAuthenticated: _redirectIfNotAuthenticated
        },
        controller:'adminController'
    })

    .state('admin/master-data',{
        url:'/admin/master-data',
        templateUrl:'page/admin/master.html',
        resolve: {
            redirectIfNotAuthenticated: _redirectIfNotAuthenticated
        },
        controller:'masterdataController'
    })

    .state('admin/account',{
        url:'/admin/account',
        templateUrl:'page/admin/account.html',
        resolve: {
            redirectIfNotAuthenticated: _redirectIfNotAuthenticated
        },
        controller:'adminaccountController'
    })

    .state('admin/account-detail',{
        url:'/admin/account-detail/:id',
        templateUrl:'/page/admin/detail_account.html',
        resolve: {
            redirectIfNotAuthenticated: _redirectIfNotAuthenticated
        },
        controller:'admindetailaccountController'
    })

    .state('admin/joblist',{
        url:'/admin/joblist',
        templateUrl:'page/admin/joblist.html',
        resolve: {
            redirectIfNotAuthenticated: _redirectIfNotAuthenticated
        },
        controller:'adminjoblistController'
    })

    .state('admin/category',{
        url:'/admin/category',
        templateUrl:'page/admin/category.html',
        resolve: {
            redirectIfNotAuthenticated: _redirectIfNotAuthenticated
        },
        controller:'admincategoryController'
    })

    .state('admin/bidang-studi',{
        url:'/admin/bidang-studi',
        templateUrl:'page/admin/bidang-studi.html',
        resolve: {
            redirectIfNotAuthenticated: _redirectIfNotAuthenticated
        },
        controller:'adminbidangstudiController'
    })

    .state('admin/industri',{
        url:'/admin/industri',
        templateUrl:'page/admin/industri.html',
        resolve: {
            redirectIfNotAuthenticated: _redirectIfNotAuthenticated
        },
        controller:'adminindustriController'
    })

    .state('admin/bidang-pekerjaan',{
        url:'/admin/bidangpekerjaan',
        templateUrl:'page/admin/bidangpekerjaan.html',
        resolve: {
            redirectIfNotAuthenticated: _redirectIfNotAuthenticated
        },
        controller:'adminbidangpekerjaanController'
    })
})