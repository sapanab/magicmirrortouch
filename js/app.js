// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js


angular.module('starter', ['ionic', 'starter.controllers', 'myservices'])

.run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });
})


.config(function ($stateProvider, $urlRouterProvider) {

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider

    // setup an abstract state for the tabs directive
    .state('tab', {
        url: "/tab",
        abstract: true,
        templateUrl: "templates/tabs.html",
        controller: 'TabCtrl'
    })

    // Each tab has its own nav history stack:

    .state('tab.dash', {
        url: '/dash',
        views: {
            'tab-dash': {
                templateUrl: 'templates/tab-dash.html',
                controller: 'DashCtrl'
            }
        }
    })

    .state('tab.home', {
        url: '/home',
        views: {
            'tab-home': {
                templateUrl: 'templates/tab-home.html',
                controller: 'HomeCtrl'
            }
        }
    })
    
    .state('tab.thankyou', {
        url: '/thankyou',
        views: {
            'tab-home': {
                templateUrl: 'templates/thankyou.html',
                controller: 'ThankyouCtrl'
            }
        }
    })
    
    .state('tab.items', {
        url: '/dash/categories/:cid',
        views: {
            'tab-dash': {
                templateUrl: 'templates/shop-items.html',
                controller: 'ItemCtrl'
            }
        }
    })

    .state('tab.product', {
        url: '/dash/categories/product/:pid',
        views: {
            'tab-dash': {
                templateUrl: 'templates/shop-product.html',
                controller: 'ProductCtrl'
            }
        }
    })

    .state('tab.productwish', {
        url: '/account/wishlist/product/:pid',
        views: {
            'tab-account': {
                templateUrl: 'templates/shop-product.html',
                controller: 'ProductCtrl'
            }
        }
    })
    .state('tab.producthome', {
        url: '/home/product/:pid',
        views: {
            'tab-home': {
                templateUrl: 'templates/shop-product.html',
                controller: 'ProductCtrl'
            }
        }
    })

    .state('tab.lookbook', {
        url: '/lookbook',
        views: {
            'tab-lookbook': {
                templateUrl: 'templates/tab-lookbook.html',
                controller: 'LookbookCtrl'
            }
        }
    })
        .state('tab.lookbookitem', {
            url: '/lookbook/items',
            views: {
                'tab-lookbook': {
                    templateUrl: 'templates/lookbook-items.html',
                    controller: 'LookbookitemCtrl'
                }
            }
        })
        .state('tab.account', {
            url: '/account',
            views: {
                'tab-account': {
                    templateUrl: 'templates/tab-account.html',
                    controller: 'AccountCtrl'
                }
            }
        })
        .state('tab.orders', {
            url: '/account/orders',
            views: {
                'tab-account': {
                    templateUrl: 'templates/account-orders.html',
                    controller: 'AccountCtrl'
                }
            }
        })
        .state('tab.login', {
            url: '/account/login',
            views: {
                'tab-account': {
                    templateUrl: 'templates/account-login.html',
                    controller: 'LoginCtrl'
                }
            }
        })
        .state('tab.signup', {
            url: '/account/signup',
            views: {
                'tab-account': {
                    templateUrl: 'templates/account-signup.html',
                    controller: 'LoginCtrl'
                }
            }
        })

        .state('tab.wishlist', {
            url: '/account/wishlist',
            views: {
                'tab-account': {
                    templateUrl: 'templates/account-wishlist.html',
                    controller: 'WishlistCtrl'
                }
            }
        })

    .state('tab.contact', {
        url: '/contact',
        views: {
            'tab-contact': {
                templateUrl: 'templates/tab-contact.html',
                controller: 'ContactCtrl'
            }
        }
    })

    .state('tab.cart', {
        url: '/cart',
        views: {
            'tab-cart': {
                templateUrl: 'templates/tab-cart.html',
                controller: 'CartCtrl'
            }
        }
    })

    .state('tab.checkout', {
        url: '/cart/checkout',
        views: {
            'tab-cart': {
                templateUrl: 'templates/cart-checkout.html',
                controller: 'CheckoutCtrl'
            }
        }
    })

    .state('tab.viewall', {
        url: '/viewall',
        views: {
            'tab-bag': {
                templateUrl: 'templates/viewall.html',
                controller: 'ViewallCtrl'
            }
        }
    })

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/tab/home');

})

.filter('convertprice', function () {
    return function (input) {
        var price=parseFloat(input);
        if(price<0)
        {
            return 0;
        }
        var currencyshow="£";
        for(var i=0;i<conversionrate.length;i++)
        {
            if(conversionrate[i].name==currency)
            {
                //console.log("currency: "+currency+" price ini: "+price+" price new: "+parseFloat(conversionrate[i].conversionrate)*price);
                if(currency=="USD")
                {
                    currencyshow="$";
                }
                else if(currency=="EURO")
                {
                    currencyshow="€";
                }
                return currencyshow+" "+(parseFloat(conversionrate[i].conversionrate)*price).toFixed(2);
            }
        }
    };
})


.filter('imagepath', function () {
    return function (input) {
        var prosubstr=input.substring(0, 5);
        //console.log(prosubstr);
        if (prosubstr == "gs://") {
            return "http://www.lylaloves.co.uk/showimage?size=300&image="+input;
        } else {
            return "http://www.lylaloves.co.uk/showimage?size=300&image=gs://lylaimages/images"+input;
        }
    };
})
.filter('imagepathbig', function () {
    return function (input) {
        var prosubstr=input.substring(0, 5);
        //console.log(prosubstr);
        if (prosubstr == "gs://") {
            return "http://www.lylaloves.co.uk/showimage?size=800&image="+input;
        } else {
            return "http://www.lylaloves.co.uk/showimage?size=800&image=gs://lylaimages/images"+input;
        }
    };
})
.filter('inSlicesOf', ['$rootScope',
         function ($rootScope) {
            makeSlices = function (items, count) {
                if (!count)
                    count = 3;

                if (!angular.isArray(items) && !angular.isString(items)) return items;

                var array = [];
                for (var i = 0; i < items.length; i++) {
                    var chunkIndex = parseInt(i / count, 10);
                    var isFirst = (i % count === 0);
                    if (isFirst)
                        array[chunkIndex] = [];
                    array[chunkIndex].push(items[i]);
                }

                if (angular.equals($rootScope.arrayinSliceOf, array))
                    return $rootScope.arrayinSliceOf;
                else
                    $rootScope.arrayinSliceOf = array;

                return array;
            };

            return makeSlices;
         }])
.filter('noFractionCurrency',
                [ '$filter', '$locale',
                 function(filter, locale) {
                     var currencyFilter = filter('currency');
                     var formats = locale.NUMBER_FORMATS;
                     return function(amount, currencySymbol) {
                         var value = currencyFilter(amount, currencySymbol);
                         var sep = value.indexOf(formats.DECIMAL_SEP);
                         if(amount >= 0) { 
                             return value.substring(0, sep);
                         }
                         return value.substring(0, sep) + ')';
                     };
                 } ]);

;