angular.module('docsController',[])

.controller('loginController',function($scope){
    
})

.controller('homeController',function($scope,$http){
    $scope.data=[];
    function showData(){
        $http.get("http://localhost:5000/api/getjob")
            .then(function(result){
                $scope.data=result.data;
                console.log($scope.data);
            })
    }

    showData();
})

.controller('signinController',function($scope,$http){

})

.controller('signupController',function($scope,$http){
    
})

.controller('detailController',function($scope,$http,$stateParams){
    console.log($stateParams);
})

.controller('accountController',function($scope,$http){
    $scope.data=[];
    function showData(){
        $http.get("http://localhost:5000/api/getdata")
            .then(function(result){
                $scope.data=result.data;
                console.log($scope.data);
            })
    }

    showData();
})

.controller('joblistController',function($scope,$http){

})

.controller('searchController',function($scope,$http){

})

.controller('listController',function($scope,$http){
    $scope.ta=[
        {
            id:1,
            name:'Male'
        },
        {
            id:2,
            name:'Female'
        },
        {
            id:3,
            name:'Kids'
        }
    ]
})

.controller('layananController',function($scope,$stateParams){
    $scope.id=$stateParams.id;

    if($scope.id==1){
        $scope.showOjek=true;
        $scope.showMakan=false;
    }else if($scope.id==2){
        $scope.showOjek=false;
        $scope.showMakan=true;
    }
})