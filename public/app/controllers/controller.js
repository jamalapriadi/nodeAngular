angular.module('docsController',[])

.controller('loginController',function($scope){
    
})

.controller('homeController',function($scope,$http,$localStorage){
    $scope.data=[];
    // function showData(){
    //     $http.get("http://localhost:3000/api/account?token="+$localStorage.token)
    //         .then(function(result){
    //             $scope.data=result.data;
    //             console.log($scope.data);
    //         })
    // }

    // showData();
})

.controller('signinController',function($scope,$rootScope,$http,$localStorage,$sessionStorage,$location,$timeout,Main){
    var api="http://localhost:3000/api";

    
    $scope.signin = function() {
        var formData = {
            email: $scope.email,
            password: $scope.password
        }

        Main.signin(formData, function(res) {
            if (res.success == false) {
                alert(res.message)    
            } else {
                $localStorage.token = res.token;
                $localStorage.type_user=res.type_user;

                if(res.type_user=="admin"){
                    $timeout(function () {
                        $location.path('/admin');
                    });
                }else if(res.type_user=="owner"){
                    $timeout(function () {
                        $location.path('/perusahaan');
                    });
                }else if(res.type_user=="member"){
                    $timeout(function () {
                        $location.path('/member');
                    });
                }else{
                    $timeout(function () {
                        $location.path('/signin');
                    });
                }
                
            }
        }, function() {
            $rootScope.error = 'Failed to signin';
        })
    };
})

.controller('signupController',function($scope,$http,$localStorage,$sessionStorage){
    // $scope.signup = function() {
    //     var formData = {
    //         email: $scope.email,
    //         password: $scope.password
    //     }

    //     Main.save(formData, function(res) {
    //         if (res.type == false) {
    //             alert(res.data)
    //         } else {
    //             $localStorage.token = res.data.token;
    //             window.location = "/"   
    //         }
    //     }, function() {
    //         $rootScope.error = 'Failed to signup';
    //     })
    // };
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

/*controller for admin */
.controller('adminController',function($scope,$http,$sessionStorage,$location,$localStorage){
    
})

.controller('masterdataController',function($scope,$http,$sessionStorage,$location,$localStorage){
    
})

.controller('adminaccountController',function($scope,$http,$sessionStorage,$location,$localStorage){
    
})

.controller('adminjoblistController',function($scope,$http,$sessionStorage,$location,$localStorage){
    
})

.controller('admincategoryController',function($scope,$timeout,$http,$sessionStorage,$location,$localStorage,Main){
    var baseUrl="http://localhost:3000/api";
    $scope.loading=false;
    $scope.hasils=[];
    $scope.pesan={};
    $scope.form={};

    function tampilPesan(){
        $scope.showMessage=true; 
        $timeout(function () { $scope.showMessage = false; }, 5000); 
    }

    function getData(){
        Main.category()
            .success(function(result){
                console.log(result)
                $scope.hasils=result;
            })
            .error(function(err){
                console.log(err);
            })
    }

    $scope.action=function(modalstate,id){
        $scope.modalstate=modalstate;
        $scope.id=id;
        $scope.form={};

        switch(modalstate){
            case "add":
                $scope.form_title="Add Category";
                $scope.form={category_name:''}
                break;
            case "edit":
                $scope.form_title="Update Category";
                $scope.form={category_name:''}
                Main.categoryById(id)
                    .success(function(data){
                        $scope.form.category_name=data.category_name;
                    })
                break;
            default:
                $scope.form={};
                break;
        }
        console.log(id);
        $("#myModal").modal('show');
    };

    $scope.save=function(modalstate,id){
        switch(modalstate){
            case "add":
                $scope.loading=true;
                Main.categorySave(this.form)
                    .success(function(result){
                        if(result.success==true){
                            $scope.loading=false;
                            $scope.form={};
                            getData();
                            $scope.pesan=result.pesan;
                            tampilPesan();
                            $("#myModal").modal("hide");
                        }
                    });
                break;
            case 'edit':
                console.log(id);
                $scope.loading=true;
                Main.categoryUpdate(id,this.newForm)
                    .success(function(data){
                        $scope.loading=false;
                        $("#myModal").modal("hide");
                        $scope.newForm={};
                        getData();
                        $scope.pesan=data;
                        tampilPesan();
                    })
                break;

            default:
                $scope.newForm={};
                break;
        }
    };

    getData();
})
/* end controller admin */

.controller('signoutController',function($scope,$http,$sessionStorage,$location,$localStorage,Main){
    //Main.logout();
    delete $localStorage.token;
    delete $localStorage.type_user;

    $location.path('/');
})