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

.controller('signupController',function($scope,$rootScope,$http,$localStorage,$sessionStorage,Main){
    $scope.form={};
    
    $scope.signup = function() {
        var formData = {
            email: $scope.form.email,
            password: $scope.form.password,
            first_name:$scope.form.first_name,
            last_name:$scope.form.last_name
        }

        Main.register(this.form)
            .success(function(result){
                console.log(result);
            })
    };
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

.controller('adminaccountController',function($scope,$timeout,$http,$sessionStorage,$location,$localStorage,Main){
    $scope.hasils=[];

    $scope.loading=false;
    $scope.hasils=[];
    $scope.pesan={};
    $scope.form={};

    function tampilPesan(){
        $scope.showMessage=true; 
        $timeout(function () { $scope.showMessage = false; }, 5000); 
    }

    function getData(){
        Main.account()
            .success(function(result){
                console.log(result)
                $scope.hasils=result;
            })
            .error(function(err){
                console.log(err);
            })
    }

    $scope.hapus=function(id){
        swal({   
            title: "Are you sure?",   
            text: "Do you want to delete it?",   
            type: "warning",   
            showCancelButton: true,   
            confirmButtonColor: "#DD6B55",   
            confirmButtonText: "Yes, delete it!",   
            cancelButtonText: "No",   
            closeOnConfirm: false,   
            closeOnCancel: false 
        }, function(isConfirm){   
            if (isConfirm) {     
                Main.accountDelete(id)
                    .success(function(data){
                        getData();
                        $scope.pesan=data;
                        swal("Deleted!", data.pesan, "success");   
                        tampilPesan();
                    })
            } else {     
                swal("Cancelled", "Your data is safe :)", "error");   
            } 
        });
    };

    getData();
})

.controller('admindetailaccountController',function($scope,$timeout,$http,$sessionStorage,$location,$localStorage,$stateParams,Main){
    $scope.id=$stateParams.id;
    $scope.hasils={};

    $scope.loading=false;
    $scope.hasils=[];
    $scope.pesan={};
    $scope.form={};

    function tampilPesan(){
        $scope.showMessage=true; 
        $timeout(function () { $scope.showMessage = false; }, 5000); 
    }

    function getData(){
        Main.profile($scope.id)
            .success(function(result){
                console.log(result)
                $scope.hasils=result;
            })
            .error(function(err){
                console.log(err);
            })
    }

    getData();
})

.controller('adminjoblistController',function($scope,$http,$sessionStorage,$location,$localStorage,Main,$timeout){
    $scope.hasils=[];
    
    $scope.loading=false;
    $scope.hasils=[];
    $scope.pesan={};
    $scope.form={};

    function tampilPesan(){
        $scope.showMessage=true; 
        $timeout(function () { $scope.showMessage = false; }, 5000); 
    }

    function getData(){
        Main.joblist()
            .success(function(result){
                console.log(result)
                $scope.hasils=result;
            })
            .error(function(err){
                console.log(err);
            })
    }

    getData();
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
                        }else{
                            $scope.pesan=result.pesan;
                        }
                    });
                break;
            case 'edit':
                console.log(id);
                $scope.loading=true;
                Main.categoryUpdate(id,this.form)
                    .success(function(data){
                        $scope.loading=false;
                        $("#myModal").modal("hide");
                        $scope.form={};
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

    $scope.hapus=function(id){
        swal({   
            title: "Are you sure?",   
            text: "Do you want to delete it?",   
            type: "warning",   
            showCancelButton: true,   
            confirmButtonColor: "#DD6B55",   
            confirmButtonText: "Yes, delete it!",   
            cancelButtonText: "No",   
            closeOnConfirm: false,   
            closeOnCancel: false 
        }, function(isConfirm){   
            if (isConfirm) {     
                Main.categoryDelete(id)
                    .success(function(data){
                        getData();
                        $scope.pesan=data;
                        swal("Deleted!", data.pesan, "success");   
                        tampilPesan();
                    })
            } else {     
                swal("Cancelled", "Your data is safe :)", "error");   
            } 
        });
    };

    getData();
})

.controller('adminbidangstudiController',function($scope,$timeout,$http,$sessionStorage,$location,$localStorage,Main){
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
        Main.bidangstudi()
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
                $scope.form_title="Add Bidang Studi";
                $scope.form={bidang_studi_name:''}
                break;
            case "edit":
                $scope.form_title="Update Bidang Studi";
                $scope.form={bidang_studi_name:''}
                Main.bidangstudiById(id)
                    .success(function(data){
                        $scope.form.bidang_studi_name=data.bidang_studi_name;
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
                Main.bidangstudiSave(this.form)
                    .success(function(result){
                        if(result.success==true){
                            $scope.loading=false;
                            $scope.form={};
                            getData();
                            $scope.pesan=result.pesan;
                            tampilPesan();
                            $("#myModal").modal("hide");
                        }else{
                            $scope.pesan=result.pesan;
                        }
                    });
                break;
            case 'edit':
                console.log(id);
                $scope.loading=true;
                Main.bidangstudiUpdate(id,this.form)
                    .success(function(data){
                        $scope.loading=false;
                        $("#myModal").modal("hide");
                        $scope.form={};
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

    $scope.hapus=function(id){
        swal({   
            title: "Are you sure?",   
            text: "Do you want to delete it?",   
            type: "warning",   
            showCancelButton: true,   
            confirmButtonColor: "#DD6B55",   
            confirmButtonText: "Yes, delete it!",   
            cancelButtonText: "No",   
            closeOnConfirm: false,   
            closeOnCancel: false 
        }, function(isConfirm){   
            if (isConfirm) {     
                Main.bidangstudiDelete(id)
                    .success(function(data){
                        getData();
                        $scope.pesan=data;
                        swal("Deleted!", data.pesan, "success");   
                        tampilPesan();
                    })
            } else {     
                swal("Cancelled", "Your data is safe :)", "error");   
            } 
        });
    };

    getData();
})

.controller('adminindustriController',function($scope,$timeout,$http,$sessionStorage,$location,$localStorage,Main){
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
        Main.industri()
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
                $scope.form_title="Add Industri";
                $scope.form={industri_name:''}
                break;
            case "edit":
                $scope.form_title="Update Industri";
                $scope.form={industri_name:''}
                Main.industriById(id)
                    .success(function(data){
                        $scope.form.industri_name=data.industri_name;
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
                Main.industriSave(this.form)
                    .success(function(result){
                        if(result.success==true){
                            $scope.loading=false;
                            $scope.form={};
                            getData();
                            $scope.pesan=result.pesan;
                            tampilPesan();
                            $("#myModal").modal("hide");
                        }else{
                            $scope.pesan=result.pesan;
                        }
                    });
                break;
            case 'edit':
                console.log(id);
                $scope.loading=true;
                Main.industriUpdate(id,this.form)
                    .success(function(data){
                        $scope.loading=false;
                        $("#myModal").modal("hide");
                        $scope.form={};
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

    $scope.hapus=function(id){
        swal({   
            title: "Are you sure?",   
            text: "Do you want to delete it?",   
            type: "warning",   
            showCancelButton: true,   
            confirmButtonColor: "#DD6B55",   
            confirmButtonText: "Yes, delete it!",   
            cancelButtonText: "No",   
            closeOnConfirm: false,   
            closeOnCancel: false 
        }, function(isConfirm){   
            if (isConfirm) {     
                Main.industriDelete(id)
                    .success(function(data){
                        getData();
                        $scope.pesan=data;
                        swal("Deleted!", data.pesan, "success");   
                        tampilPesan();
                    })
            } else {     
                swal("Cancelled", "Your data is safe :)", "error");   
            } 
        });
    };

    getData();
})

.controller('adminbidangpekerjaanController',function($scope,$timeout,$http,$sessionStorage,$location,$localStorage,Main){
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
        Main.bidangpekerjaan()
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
                $scope.form_title="Add Bidang Pekerjaan";
                $scope.form={bidang_pekerjaan_name:''}
                break;
            case "edit":
                $scope.form_title="Update Bidang Pekerjaan";
                $scope.form={bidang_pekerjaan_name:''}
                Main.bidangpekerjaanById(id)
                    .success(function(data){
                        $scope.form.bidang_pekerjaan_name=data.bidang_pekerjaan_name;
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
                Main.bidangpekerjaanSave(this.form)
                    .success(function(result){
                        if(result.success==true){
                            $scope.loading=false;
                            $scope.form={};
                            getData();
                            $scope.pesan=result.pesan;
                            tampilPesan();
                            $("#myModal").modal("hide");
                        }else{
                            $scope.pesan=result.pesan;
                        }
                    });
                break;
            case 'edit':
                console.log(id);
                $scope.loading=true;
                Main.bidangpekerjaanUpdate(id,this.form)
                    .success(function(data){
                        $scope.loading=false;
                        $("#myModal").modal("hide");
                        $scope.form={};
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

    $scope.hapus=function(id){
        swal({   
            title: "Are you sure?",   
            text: "Do you want to delete it?",   
            type: "warning",   
            showCancelButton: true,   
            confirmButtonColor: "#DD6B55",   
            confirmButtonText: "Yes, delete it!",   
            cancelButtonText: "No",   
            closeOnConfirm: false,   
            closeOnCancel: false 
        }, function(isConfirm){   
            if (isConfirm) {     
                Main.bidangpekerjaanDelete(id)
                    .success(function(data){
                        getData();
                        $scope.pesan=data;
                        swal("Deleted!", data.pesan, "success");   
                        tampilPesan();
                    })
            } else {     
                swal("Cancelled", "Your data is safe :)", "error");   
            } 
        });
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