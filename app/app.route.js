(function(angular){
    var app=angular.module('Vedmuni-user',['ngRoute', 'ngMaterial', 'LocalStorageModule','ngAnimate', 'ngSanitize', 'ngMessages']);
    app.run(function ($window, $rootScope,ConfigService,$http) {
        $rootScope.online = navigator.onLine;
        $window.addEventListener("offline", function () {
            $rootScope.$apply(function () {
                $rootScope.online = false;
                document.body.style.overflowX = "hidden";
                document.body.style.overflowY = "hidden";
            });
        }, false);
        $window.addEventListener("online", function () {
            $rootScope.$apply(function () {
                $rootScope.online = true;
                document.body.style.overflowY = "auto";
            });
        }, false);


        $window.addEventListener("load", function () {
            if ('serviceWorker' in navigator) {
                navigator.serviceWorker.register('/sw.js').then(function(registration) {
                  // Registration was successful
                    //console.log('ServiceWorker registration successful with scope: ', registration.scope);
                    registration.pushManager.getSubscription().then(function(sub) {
                      if (sub === null) {
                        //If user not subscribed.Subscribe the user and create document in db
                        registration.pushManager.subscribe(
                            {
                                userVisibleOnly:true,
                                applicationServerKey:ConfigService.urlBase64ToUint8Array()
                            }
                        ).then(function(subscription){
                            /*$http.post(ConfigService.getOrigApiUrl()+'subscribe.add',subscription)
                            .success(function(response){
                                if(response.status){
                                    $window.sessionStorage.setItem('subId',response.data);
                                    return;
                                }
                            })*/
                        },function(err){
                            console.log('Push Manager subscribe failed :'+err);
                        })
                      } else {
                        /*$http.post(ConfigService.getOrigApiUrl()+'subscribe.add',sub)
                        .success(function(response){
                            if(response.status){
                                $window.sessionStorage.setItem('subId',response.data);
                                return;
                            }
                        })*/
                      }
                    });
                }, function(err) {
                  // registration failed :(
                  console.log('ServiceWorker registration failed: ', err);
                });
            }
        });
    });
    app.config(function ($routeProvider, $locationProvider, $mdThemingProvider, localStorageServiceProvider) {
        localStorageServiceProvider.setPrefix('fd').setStorageType('localStorage');
        $mdThemingProvider.theme('poolBasic')
                .primaryPalette('grey', {
                    'default': '500',
                    'hue-1': '400',
                    'hue-2': '300',
                    'hue-3': '200'
                })
                .accentPalette('red', {
                    'default': 'A400',
                    'hue-1': 'A200',
                    'hue-2': 'A100',
                    'hue-3': 'A100'
                })
                .warnPalette('orange', {
                    'default': '800',
                    'hue-1': '400',
                    'hue-2': '500',
                    'hue-3': 'A100'
                });
        $mdThemingProvider.setDefaultTheme('poolBasic');

        $routeProvider
                .when('/', {
                    controller: 'HomeController',
                    templateUrl: 'app/components/user/home.html?' 
                })
                .otherwise({redirectTo: '/'});
        $locationProvider.html5Mode(true);
    });
}(window.angular));
