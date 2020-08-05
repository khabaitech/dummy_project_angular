(function(angular){
    'use strict';
    var app=angular.module('Vedmuni-user');
    app.service('ConfigService', ['localStorageService', '$location', '$http', '$window','$rootScope',
        function (localStorageService, $location, $http, $window,$rootScope)
        {
            var myService = this;
            
            var cdnList = {
                development:'d29jid569aqutu',
                staging:'d2v4l7y03xonwa',
                production:'d2cz5pbqz5uqiu',
            }
            
            var proto = location.protocol;
            var port = (location.port !== '') ? ':' + location.port : '';

            var config = {};
            myService.valid = false;

            initConfig(config);

            var surl = proto + '//' + location.host+port + '/payment/payu/success';
            var furl = proto + '//' + location.host+port + '/payment/payu/failure';
            var curl = proto + '//' + location.host+port + '/payment/payu/cancel';

            var prefix = proto + '//' + location.host+port;

            this.getPayuUrls = function() {
                return {
                    surl : surl,
                    furl : furl,
                    curl : curl
                }
            };

            this.getPayuCreds = function(server) {
                if( server === 'production' ) {
                    return {
                        key:'GJj8ml'
                    }
                }
                else {
                    return {
                        key:'rjQUPktU'
                    }
                }                
            };

            this.getCdnRootUrl = function( serverType ) {
                if( typeof cdnList[serverType] !== 'undefined' ) {
                    return proto+'//'+cdnList[serverType]+'.cloudfront.net';
                }
                return '';
            }

            this.loggedIn = function () {
                var token = localStorageService.get('token');
                if ((token === null) || (token === '')) {
                    return false;
                }
                return true;
            };  

            this.redirection=function(path,params){
                var paramsPath={};
                for(var key in params){
                    if (params.hasOwnProperty(key)) {
                        paramsPath[key] = params[key];
                    }
                }
                $rootScope.redirection={
                    uri:path,
                    params:paramsPath
                };
                //console.log($rootScope.redirection);
                $location.path('/');
            };         

            this.checkSignInStatus = function (redirect) {
                redirect = redirect || '/login';
                var token = localStorageService.get('token');
                if ((token === false) || (token === null) || (token === '')) {
                    $location.path(redirect);
                }
                else {
                    $location.path('/dashboard');
                }
            };

            this.getUserInfo = function () {
                var ui = localStorageService.get('user.info');
                if (ui !== null) {
                    return JSON.parse(ui);
                }
                return null;
            };

            this.getProtocol = function () {
                return proto;
            };

            this.getPort = function () {
                return port;
            };

            this.getConfig = function () {
                var conf = config[location.hostname];
                if (typeof conf === 'undefined') {
                    conf = null;
                }
                return conf;
            };
            
            this.getOrigApiUrl = function () {
                var conf = this.getConfig();
                if (conf !== null) {
                    return proto + '//' +
                            conf.apiOrigHost + '/' +
                            conf.apiVersion + '/';
                }
                return '';
            };

            this.urlBase64ToUint8Array=function() {
                //publicVapidKey
                var base64String='BCDGtxrqDvTHWIQFHJHw-FxiCDCQepi2R-My5H3KROPpyi-YjLzGNhvkpx3WG7ls6hX4caKraY8Lj6H7z-2GNms';
                const padding = '='.repeat((4 - base64String.length % 4) % 4);
                const base64 = (base64String + padding)
                    .replace(/-/g, '+')
                    .replace(/_/g, '/');

                const rawData = window.atob(base64);
                const outputArray = new Uint8Array(rawData.length);

                for (var i = 0; i < rawData.length; ++i) {
                    outputArray[i] = rawData.charCodeAt(i);
                }
                return outputArray;
            };
    }]);
}(window.angular));

var initConfig = function (config) {    
    config['enterprise.fandoro.com'] = {
        apiOrigHost: 'api.fandoro.com',
        apiVersion: 'v1'
    };
    config['vedmuni1.com'] = {
        apiOrigHost: 'api.vedmuni1.com:8080',
        apiVersion: 'v1'
    };
    config['staging.enterprise.fandoro.com'] = {
        apiOrigHost: 'stageapi.fandoro.com:8080',
        apiVersion: 'v1'
    };
};