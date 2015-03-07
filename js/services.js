var adminurl = 'http://wohlig.co.in/admin/index.php/json/';

var conversionrate = [{
    id: "1",
    name: "GBP",
    conversionrate: "1",
    isdefault: "1"
}];
//$.holdReady(true);
$.getJSON(adminurl + "getconversionrates", {}, function (data) {

    conversionrate = data;
    //console.log("Conversion Rate");
});


var lat = 0;
var long = 0;
var currency = "GBP";
var country = false;
var showError = function (data) {
    console.log(data);
    $.holdReady(false);
};
var showlocationdata = function (data, status) {
    console.log("in location success");
    console.log(data);
    var address = data.results[0].address_components;
    for (var i = 0; i < address.length; i++) {
        if (address[i].types.indexOf("country") >= 0) {
            country = address[i].short_name;



            var countries = ['AL', 'AD', 'AM', 'AT', 'BY', 'BE', 'BA', 'BG', 'CH', 'CY', 'CZ', 'DE',
                             'DK', 'EE', 'ES', 'FO', 'FI', 'FR', 'GE', 'GI', 'GR', 'HU', 'HR',
                             'IE', 'IS', 'IT', 'LT', 'LU', 'LV', 'MC', 'MK', 'MT', 'NO', 'NL', 'PL',
                             'PT', 'RO', 'RU', 'SE', 'SI', 'SK', 'SM', 'TR', 'UA', 'VA'];

            if (countries.indexOf(country) >= 0) {
                country = "EUROPE";
            }
            console.log("Country ////////////////////////");
            //case1 : short name: GB
            console.log(country);
            if (country == "GB") {
                currency = "GBP";
            } else if (country == "EUROPE") {
                currency = "EURO";
            } else {
                currency = "USD";
            }
            console.log("Currency: " + currency);
            break;
        }
    }
    //$.holdReady(false);
};

var ongettingdata = function (data) {
    console.log("in location success");
    console.log(data);
    country = data.country_code;

    if (data) {
        country = data.country_code;



        var countries = ['AL', 'AD', 'AM', 'AT', 'BY', 'BE', 'BA', 'BG', 'CH', 'CY', 'CZ', 'DE',
                         'DK', 'EE', 'ES', 'FO', 'FI', 'FR', 'GE', 'GI', 'GR', 'HU', 'HR',
                         'IE', 'IS', 'IT', 'LT', 'LU', 'LV', 'MC', 'MK', 'MT', 'NO', 'NL', 'PL',
                         'PT', 'RO', 'RU', 'SE', 'SI', 'SK', 'SM', 'TR', 'UA', 'VA'];

        if (countries.indexOf(country) >= 0) {
            country = "EUROPE";
        }
        console.log("Country ////////////////////////");
        //case1 : short name: GB
        console.log(country);
        if (country == "GB") {
            currency = "GBP";
        } else if (country == "EUROPE") {
            currency = "EURO";
        } else {
            currency = "USD";
        }
        console.log("Currency: " + currency);

    }
}
$.holdReady(false);



//start get country from geo location
function CommonCode() {



    function showPosition2(position) {
        var latlon = position.coords.latitude + "," + position.coords.longitude;
        console.log("Positions:.........");
        console.log(position);
        coords = position.coords;
        lat = position.coords.latitude;
        long = position.coords.longitude;
        locationdata = lat + "," + long;

        $.get("https://maps.googleapis.com/maps/api/geocode/json?address=" + locationdata + "&key=AIzaSyAj0OXepKIgjTlZiPe_ZVYTDjL8rYpobgQ").success(showlocationdata);
    }

    console.log("common code");
    $.getJSON("http://www.telize.com/geoip").success(ongettingdata);
    /*if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition2, showError);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }*/

}
CommonCode();

var myservices = angular.module('myservices', [])

.factory('MyServices', function ($http, $location) {
    var obj={};
    obj.badge=0;
    var retailer = 0;
    var category = 0;
    var useremail ="";
    var coupondetails=$.jStorage.get("coupon");
    var discount=$.jStorage.get("coupon");
    return {
        getobj : function() 
        {
            return obj;
        },
        setobj : function(val) {
            obj.badge=val;
        },
        getuseremail: function() {
            return useremail;
        },
        setuseremail: function(user) {
            useremail = user;
        },
        getcoupondetails: function () {
            return coupondetails;
        },
        setcoupondetails: function (coupon) {
            $.jStorage.set("coupon",coupon);
            coupondetails=coupon;
        },
        getdiscountcoupon: function (couponcode) {
            return $http.post(adminurl + 'getdiscountcoupon?couponcode=' + couponcode, {}, {
                withCredentials: true
            });
        },
        getproductdetails: function (product, category) {
            return $http.get(adminurl + 'getproductdetails', {
                params: {
                    product: product
                }
            }, {
                withCredentials: true
            });
        },
        getproductbycategory: function (category) {
            return $http.get(adminurl + 'getproductbycategory', {
                params: {
                    category: category
                }
            }, {
                withCredentials: true
            });
        },
        addtocart: function (id, name, price, quantity) {
            return $http.post(adminurl + 'addtocart?product=' + id + '&productname=' + name + "&quantity=" + quantity + "&price=" + price, {}, {
                withCredentials: true
            });
        },
        getcart: function () {
            return $http.post(adminurl + 'showcart', {}, {
                withCredentials: true
            });
            //return cart;
        },
        gettotalcart: function () {
            return $http.post(adminurl + 'totalitemcart', {}, {
                withCredentials: true
            });
            //return cart;
        },
        totalcart: function () {
            return $http.post(adminurl + 'totalcart', {}, {
                withCredentials: true
            });
            //return cart;
        },
        deletecart: function (id) {

            subtotal = this.calcsubtotal();
            return subtotal;
        },
        deletecartfromsession: function (id) {
            return $http.post(adminurl + 'deletecart?id=' + id, {}, {
                withCredentials: true
            });
        },
        savecart: function (uid, id, quantity) {
            console.log(cart);
            for (var i = 0; i < cart.length; i++) {
                if (cart[i].id == id) {
                    cart[i].quantity = quantity;
                    console.log(cart[i].name);
                    returntwo.state = $http.post(adminurl + 'addtocart?user=' + uid + '&product=' + id + "&quantity=" + cart[i].quantity, {}, {
                        withCredentials: true
                    });
                }

            }
            console.log(cart);
            returntwo.subtotal = this.calcsubtotal();
            return returntwo;
        },
        calcsubtotal: function () {
            subtotal = 0;
            for (var i = 0; i < cart.length; i++) {
                subtotal += cart[i].price * cart[i].quantity;
            }
            console.log(subtotal);
            return subtotal;

        },
        gettotalproductsincart: function (data, status) {
            console.log(data);
            TemplateService.totalproducts = data;
            return 0;
        },
        usercontact: function (id, name, email, phone, comment) {
            return $http.post(adminurl + 'usercontact?id=' + id + '&name=' + name + '&email=' + email + '&phone=' + phone + '&comment=' + comment, {}, {
                withCredentials: true
            });
        },

        placeorder: function (form) {
            return $http({
                url: adminurl + 'placeorder',
                method: "POST",
                withCredentials: true,
                data: {
                    'form': form
                }
            });
        },
        seach: function (search) {
            return $http.post(adminurl + 'searchbyname?search=' + search, {}, {
                withCredentials: true
            });
        },
        newsletter: function (id, email, status) {
            return $http.post(adminurl + 'newsletter?id=' + id + '&email=' + email + "&status=" + status, {}, {
                withCredentials: true
            });
        },
        showwishlist: function (user) {
            return $http.post(adminurl + 'showwishlist?user=' + user, {}, {
                withCredentials: true
            });
        },
        logout: function () {
            return $http.post(adminurl + 'logout', {}, {
                withCredentials: true
            });
        },
        addtowishlist: function (user, product) {
            return $http.post(adminurl + 'addtowishlist?user=' + user + '&product=' + product, {}, {
                withCredentials: true
            });
        },
        authenticate: function () {
            return $http.post(adminurl + 'authenticate', {}, {
                withCredentials: true
            });
        },
        registeruser: function (firstname, lastname, email, password) {
            return $http.post(adminurl + 'registeruser?firstname=' + firstname + '&lastname=' + lastname + '&email=' + email + '&password=' + password, {}, {
                withCredentials: true
            });
        },
        loginuser: function (email, password) {
            return $http.post(adminurl + 'loginuser?email=' + email + '&password=' + password, {}, {
                withCredentials: true
            });
        },
        signupemail: function (email) {
            return $http.post(adminurl + 'signupemail?email=' + email, {}, {
                withCredentials: true
            });
        },
        orderemail: function (email, orderid) {
            return $http.post(adminurl + 'orderemail?email=' + email + '&orderid=' + orderid, {}, {
                withCredentials: true
            });
        },
        getusercart: function (user) {
            return $http.get(adminurl + 'getusercart?user=' + user, {}, {
                withCredentials: true
            });
        },
        getallslider: function (user) {
            return $http.get(adminurl + 'getallslider');
        },
        chargestripe: function (token, email,amount,name) {
            return $http.get('http://wohlig.com/stripe/index.php/welcome/chargestripe', {
                params: {
                    token: token,
                    email: email,
                    amount: amount*100,
                    name: name,

                }
            }, {
                withCredentials: true
            });
        },
        nextproduct: function(product,next)
        {
            return $http.get(adminurl + 'nextproduct',{params:{id:product,next:next}});
        },
    }
});