
'use strict';

angular.module('adf.widget.dash').service('dashService', ['$http', function($http){

    var urlCPUMain = dashApiUrl+"/processinfodata";

    this.getCPUBusy=function(systemserial){
      return $http.post(urlCPUMain, systemserial)
        .then(function(response){
          return response.data;
        },
        function(data) {
          console.log('CPU Busy data retrieval failed.');
        });
    }

    this.getIPUBusy=function(systemserial){
      return $http.post(urlCPUMain, systemserial)
        .then(function(response){
          return response.data;
        },
        function(data) {
          console.log('CPU Busy data retrieval failed.');
        });
    }

    this.getDiskInfo=function(systemserial){
      return $http.post(urlCPUMain, systemserial)
        .then(function(response){
          return response.data;
        },
        function(data) {
          console.log('CPU Busy data retrieval failed.');
        });
    }
  }]);
