angular.module('mojekService',[])

.service('Layanan',function($http){
	return{
		get:function(){
			return $http.get('api/history');
		},

		vm:function(){
			return $http.get('home/api/home-vm');
		}
	}
})