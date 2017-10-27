'use strict';

angular.module('recsApp')
.factory('Main', ['$http', '$localStorage', function($http, $localStorage){
	var baseUrl = "http://localhost:3000/api";
	function changeUser(user) {
		angular.extend(currentUser, user);
	}
	
	function urlBase64Decode(str) {
		var output = str.replace('-', '+').replace('_', '/');
		switch (output.length % 4) {
			case 0:
			break;
			case 2:
			output += '==';
			break;
			case 3:
			output += '=';
			break;
			default:
			throw 'Illegal base64url string!';
		}
		return window.atob(output);
	}
	
	function getUserFromToken() {
		var token = $localStorage.token;
		var user = {};
		if (typeof token !== 'undefined') {
			var encoded = token.split('.')[1];
			user = JSON.parse(urlBase64Decode(encoded));
		}
		return user;
	}
	
	var currentUser = getUserFromToken();
	
	return {
		save: function(data, success, error) {
			$http.post(baseUrl + '/signin', data).success(success).error(error)
		},
		signin: function(data, success, error) {
			$http.post(baseUrl + '/authenticate', data).success(success).error(error)
		},
		me: function(success, error) {
			$http.get(baseUrl + '/me').success(success).error(error)
		},
		logout: function(success) {
			changeUser({});
			delete $localStorage.token;
			success();
		},

		category:function(){
			return $http.get(baseUrl+'/category?token='+$localStorage.token);
		},

		categorySave:function(form){
			return $http.post(baseUrl+'/category?token='+$localStorage.token,form);
		},

		categoryById:function(id){
			return $http.get(baseUrl+'/category/'+id+'?token='+$localStorage.token);
		},

		categoryUpdate:function(id,form){
			return $http.put(baseUrl+'/category/'+id+'?token='+$localStorage.token,form);
		},

		categoryDelete:function(id){
			return $http.delete(baseUrl+'/category/'+id+'?token='+$localStorage.token);
		},

		bidangstudi:function(){
			return $http.get(baseUrl+'/bidang-studi?token='+$localStorage.token);
		},

		bidangstudiSave:function(form){
			return $http.post(baseUrl+'/bidang-studi?token='+$localStorage.token,form);
		},

		bidangstudiById:function(id){
			return $http.get(baseUrl+'/bidang-studi/'+id+'?token='+$localStorage.token);
		},

		bidangstudiUpdate:function(id,form){
			return $http.put(baseUrl+'/bidang-studi/'+id+'?token='+$localStorage.token,form);
		},

		bidangstudiDelete:function(id){
			return $http.delete(baseUrl+'/bidang-studi/'+id+'?token='+$localStorage.token);
		},

		industri:function(){
			return $http.get(baseUrl+'/industri?token='+$localStorage.token);
		},

		industriSave:function(form){
			return $http.post(baseUrl+'/industri?token='+$localStorage.token,form);
		},

		industriById:function(id){
			return $http.get(baseUrl+'/industri/'+id+'?token='+$localStorage.token);
		},

		industriUpdate:function(id,form){
			return $http.put(baseUrl+'/industri/'+id+'?token='+$localStorage.token,form);
		},

		industriDelete:function(id){
			return $http.delete(baseUrl+'/industri/'+id+'?token='+$localStorage.token);
		},

		bidangpekerjaan:function(){
			return $http.get(baseUrl+'/bidang-pekerjaan?token='+$localStorage.token);
		},

		bidangpekerjaanSave:function(form){
			return $http.post(baseUrl+'/bidang-pekerjaan?token='+$localStorage.token,form);
		},

		bidangpekerjaanById:function(id){
			return $http.get(baseUrl+'/bidang-pekerjaan/'+id+'?token='+$localStorage.token);
		},

		bidangpekerjaanUpdate:function(id,form){
			return $http.put(baseUrl+'/bidang-pekerjaan/'+id+'?token='+$localStorage.token,form);
		},

		bidangpekerjaanDelete:function(id){
			return $http.delete(baseUrl+'/bidang-pekerjaan/'+id+'?token='+$localStorage.token);
		},

		account:function(){
			return $http.get(baseUrl+'/account?token='+$localStorage.token);
		},
	};
}
]);