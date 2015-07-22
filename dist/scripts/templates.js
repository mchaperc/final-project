this["JST"] = this["JST"] || {};
this["JST"]["application"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "";
},"useData":true});
this["JST"]["elementary"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, alias1=this.escapeExpression, alias2=this.lambda;

  return alias1(helpers.log.call(depth0,depth0,{"name":"log","hash":{},"data":data}))
    + "\n\n<div class=\"elementary-data-basic\">\n	<h3 class=\"elementary-data-basic-heading\">"
    + alias1(alias2(((stack1 = ((stack1 = (depth0 != null ? depth0['0'] : depth0)) != null ? stack1.elementaryRating : stack1)) != null ? stack1.schoolname : stack1), depth0))
    + " - <img src=\""
    + alias1(alias2(((stack1 = ((stack1 = (depth0 != null ? depth0['0'] : depth0)) != null ? stack1.elementaryRating : stack1)) != null ? stack1.testrating_image_large : stack1), depth0))
    + "\" alt=\"\"></h3>\n</div>";
},"useData":true});
this["JST"]["elementaryTwo"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, alias1=this.lambda, alias2=this.escapeExpression;

  return "<div class=\"elementary-data-basic\">\n	<h3 class=\"elementary-data-basic-heading\">"
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0['0'] : depth0)) != null ? stack1.elementary : stack1)) != null ? stack1.name : stack1), depth0))
    + " - Total Enrollment: "
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0['0'] : depth0)) != null ? stack1.elementary : stack1)) != null ? stack1.enrollment : stack1), depth0))
    + "</h3>\n	<h4 class=\"elementary-data-basic-ratings\">- GreatSchools Rating: <span class=\"gs rating\">"
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0['0'] : depth0)) != null ? stack1.elementary : stack1)) != null ? stack1.gsRating : stack1), depth0))
    + "</span> - Parent Rating: <span class=\"parent rating\">"
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0['0'] : depth0)) != null ? stack1.elementary : stack1)) != null ? stack1.parentRating : stack1), depth0))
    + "</span></h4>\n</div>";
},"useData":true});
this["JST"]["high"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, alias1=this.escapeExpression, alias2=this.lambda;

  return alias1(helpers.log.call(depth0,depth0,{"name":"log","hash":{},"data":data}))
    + "\n\n<div class=\"high-data-basic\">\n	<h3 class=\"high-data-basic-heading\">"
    + alias1(alias2(((stack1 = ((stack1 = (depth0 != null ? depth0['0'] : depth0)) != null ? stack1.highRating : stack1)) != null ? stack1.schoolname : stack1), depth0))
    + " - <img src=\""
    + alias1(alias2(((stack1 = ((stack1 = (depth0 != null ? depth0['0'] : depth0)) != null ? stack1.highRating : stack1)) != null ? stack1.testrating_image_large : stack1), depth0))
    + "\" alt=\"\"></h3>\n</div>";
},"useData":true});
this["JST"]["highTwo"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, alias1=this.lambda, alias2=this.escapeExpression;

  return "<div class=\"high-data-basic\">\n	<h3 class=\"high-data-basic-heading\">"
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0['0'] : depth0)) != null ? stack1.high : stack1)) != null ? stack1.name : stack1), depth0))
    + " - Total Enrollment: "
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0['0'] : depth0)) != null ? stack1.high : stack1)) != null ? stack1.enrollment : stack1), depth0))
    + "</h3>\n	<h4 class=\"high-data-basic-ratings\">- GreatSchools Rating: <span class=\"gs rating\">"
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0['0'] : depth0)) != null ? stack1.high : stack1)) != null ? stack1.gsRating : stack1), depth0))
    + "</span> - Parent Rating: <span class=\"parent rating\">"
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0['0'] : depth0)) != null ? stack1.high : stack1)) != null ? stack1.parentRating : stack1), depth0))
    + "</span></h4>\n</div>";
},"useData":true});
this["JST"]["landing"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    return "      <a href=\"#users\" class=\"profile-link\">Profile</a>\n";
},"3":function(depth0,helpers,partials,data) {
    return "      <form class=\"login\">\n        <h3 class=\"login-heading\">Login:</h3>\n        <input type=\"email\" class=\"login-email\" required placeholder=\"Email\">\n        <input type=\"password\" class=\"login-password\" required placeholder=\"Password\">\n        <button class=\"login-submit\"><i class=\"fa fa-check\"></i></button>\n      </form>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return "<div id=\"map\"></div>\n\n<ul class=\"site-nav\">\n\n<li class=\"site-nav-item\">\n  <h3 class=\"site-nav-item-search-heading heading\"><i class=\"fa fa-search\"></i></h3>\n  <div class=\"site-nav-item-search\">\n    <h3 class=\"site-nav-item-search-text\">Search for homes near:</h3>\n    <form class=\"site-nav-item-search-form\">\n      <input type=\"text\" class=\"site-nav-item-search-area\" placeholder=\"Enter an address, city, or zip code\">\n      <button type=\"submit\" class=\"site-nav-item-search-submit\">Search</button>\n    </form>\n  </div>\n</li>\n<li class=\"site-nav-item\">\n  <i class=\"fa fa-close\"></i>\n  <div class=\"site-nav-item-branding\">\n    <i class=\"fa fa-graduation-cap fa-2x\"></i>\n    <h3 class=\"site-nav-item-branding-text\">The Educated Homebuyer</h3>\n  </div>\n  <div class=\"site-nav-item-description\">\n    <p class=\"site-nav-item-description-text1\">The homebuyer's tool</hp>\n    <p class=\"site-nav-item-description-text1\">for ensuring decisions</hp>\n    <p class=\"site-nav-item-description-text1\">are more informed.</hp>\n  </div>\n</li>\n<li class=\"site-nav-item\">\n  <h3 class=\"site-nav-item-sources-heading heading\"><i class=\"fa fa-book\"></i></h3>\n  <div class=\"site-nav-item-sources\">\n    <h3 class=\"site-nav-item-sources-text\">Sources used for this app:</h3>\n    <ul class=\"site-nav-item-sources-list\">\n      <li class=\"site-nav-item-sources-item\"><a href=\"http://simplyrets.com\"><img src=\"https://simplyrets.com/images/logo.png\" width=\"40\" height=\"40\"></a></li>\n      <li class=\"site-nav-item-sources-item\"><a href=\"http://google.com/maps\"><img src=\"../../img/Google-Map-Logo.jpg\" width=\"80\" height=\"40\"></a></li>\n      <li class=\"site-nav-item-sources-item\"><a href=\"http://geodataservice.net\"><img src=\"../../img/geodata.png\" width=\"40\" height=\"40\"></a></li>\n      <li class=\"site-nav-item-sources-item\"><a rel=\"nofollow\" href=\"http://education.com\"><img src=\"../../img/education.jpg\" width=\"100\" height=\"40\"></a></li>\n    </ul>\n  </div>\n</li>\n<li class=\"site-nav-item\">\n  <h3 class=\"site-nav-item-filter-heading heading\"><i class=\"fa fa-filter\"></i></h3>\n  <form class=\"site-nav-item-filter\">\n      <label class=\"filter-price-label\">Price:</label>\n      <input type=\"number\" class=\"filter-price-min-input\" placeholder=\"min\" min=\"0\"> to \n      <input type=\"number\" class=\"filter-price-max-input\" placeholder=\"max\" min=\"0\">\n      <label class=\"filter-bedrooms-label\">Bedrooms:</label>\n      <input type=\"number\" class=\"filter-bedrooms-input\" placeholder=\"0+\" min=\"0\">\n      <label for=\"\" class=\"filter-bathrooms-label\">Bathrooms:</label>\n      <input type=\"number\" class=\"filter-bathrooms-input\" placeholder=\"0+\" min=\"0\">\n      <label for=\"\" class=\"filter-sqft-label\">House Square Feet:</label>\n      <input type=\"number\" class=\"filter-sqft-min-input\" placeholder=\"min\" min=\"0\"> to \n      <input type=\"number\" class=\"filter-sqft-max-input\" placeholder=\"max\" min=\"0\"><br>\n      <button class=\"filter-cancel\"><i class=\"fa fa-ban\"></i> Cancel</button>\n      <button class=\"filter-submit\"><i class=\"fa fa-filter\"></i> Filter</button>\n    </form>\n</li>\n<li class=\"site-nav-item\">\n  <h3 class=\"site-nav-item-login-heading heading\"><i class=\"fa fa-user\"></i></h3>\n"
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.isUser : depth0),{"name":"if","hash":{},"fn":this.program(1, data, 0),"inverse":this.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + "</li>\n<li class=\"site-nav-item\">\n  <h3 class=\"site-nav-item-register-heading heading\"><i class=\"fa fa-user-plus\"></i></h3>\n  <form class=\"register\">\n    <h3 class=\"register-heading\">Register:</h3>\n    <input type=\"text\" class=\"register-name\" required placeholder=\"Name\">\n    <input type=\"email\" class=\"register-email\" required placeholder=\"Email\">\n    <input type=\"password\" class=\"register-password\" required placeholder=\"Password\">\n    <button class=\"register-submit\"><i class=\"fa fa-plus-circle\"></i></button>\n  </form>\n</li>\n\n</ul>";
},"useData":true});
this["JST"]["listing-data"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "";
},"useData":true});
this["JST"]["listing-schools"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "";
},"useData":true});
this["JST"]["listing"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var stack1;

  return "			<li class=\"listing-header-nav-links save\">"
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.isSaved : depth0),{"name":"if","hash":{},"fn":this.program(2, data, 0),"inverse":this.program(4, data, 0),"data":data})) != null ? stack1 : "")
    + "</li>\n			<a href=\"#users\"><li class=\"listing-header-nav-links user\"><i class=\"fa fa-user\"></i> <span>My Profile</span></li></a>\n";
},"2":function(depth0,helpers,partials,data) {
    return "<i class=\"fa fa-heart\"></i> <span>Saved</span>";
},"4":function(depth0,helpers,partials,data) {
    return "<i class=\"fa fa-heart-o\"></i> <span>Save</span>";
},"6":function(depth0,helpers,partials,data) {
    return "					<li class=\"listing-info-images-thumbnails-item\"><img src=\""
    + this.escapeExpression(this.lambda(depth0, depth0))
    + "\" alt=\"\"></li>\n";
},"8":function(depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.exteriorFeatures : depth0),{"name":"each","hash":{},"fn":this.program(9, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "");
},"9":function(depth0,helpers,partials,data) {
    return "						<li class=\"content-data\">"
    + this.escapeExpression(this.lambda(depth0, depth0))
    + "</li>\n";
},"11":function(depth0,helpers,partials,data) {
    return "					<li class=\"content-data\">No exterior features available for this listing.</li>\n";
},"13":function(depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.interiorFeatures : depth0),{"name":"each","hash":{},"fn":this.program(9, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "");
},"15":function(depth0,helpers,partials,data) {
    return "					<li class=\"content-data\">No interior features available for this listing.</li>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, alias1=this.lambda, alias2=this.escapeExpression;

  return "<div class=\"screen\">\n<header class=\"listing-header\">\n	<div class=\"listing-header-branding\">\n		<i class=\"fa fa-graduation-cap\"></i><h3 class=\"listing-header-branding-content\"> The Educated Homebuyer</h3>\n	</div>\n	<ul class=\"listing-header-nav\">\n		<a href=\"#\"><li class=\"listing-header-nav-links\"><i class=\"fa fa-home\"></i> <span>Home</span></li></a>\n"
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.isUser : depth0),{"name":"if","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "	</ul>\n</header>\n<section class=\"listing-content\">\n	<section class=\"listing-info\">\n		<div class=\"listing-info-images\">\n			<i class=\"fa fa-chevron-right\"></i>\n			<i class=\"fa fa-chevron-left\"></i>\n			<img class=\"listing-info-images-image\" src=\""
    + alias2(alias1((depth0 != null ? depth0.currentPhoto : depth0), depth0))
    + "\" alt=\"\">\n			<ul class=\"listing-info-images-thumbnails\">\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.photos : depth0),{"name":"each","hash":{},"fn":this.program(6, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "			</ul>\n		</div>\n		<div class=\"listing-info-content\">\n			<h3 class=\"listing-info-content-address\">Address: <span class=\"content-data\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.address : depth0)) != null ? stack1.full : stack1), depth0))
    + "<br>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.address : depth0)) != null ? stack1.city : stack1), depth0))
    + ", TX - "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.address : depth0)) != null ? stack1.postalCode : stack1), depth0))
    + "</span></h3>\n			<h3 class=\"listing-info-content-price\">Price: <span class=\"content-data\">$"
    + alias2(alias1((depth0 != null ? depth0.listPrice : depth0), depth0))
    + "</span></h3>\n			<ul class=\"listing-info-content-features\">\n				<h4 class=\"listing-info-content-features-heading\">Exterior Features:</h4>\n"
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.exteriorFeatures : depth0),{"name":"if","hash":{},"fn":this.program(8, data, 0),"inverse":this.program(11, data, 0),"data":data})) != null ? stack1 : "")
    + "			</ul>\n			<ul class=\"listing-info-content-features\">\n				<h4 class=\"listing-info-content-facts-heading\">Interior:</h4>\n"
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.interiorFeatures : depth0),{"name":"if","hash":{},"fn":this.program(13, data, 0),"inverse":this.program(15, data, 0),"data":data})) != null ? stack1 : "")
    + "			</ul>\n		</div>\n		<div class=\"listing-data-containers\">\n			<div class=\"listing-data-census data-item\">\n				<h3 class=\"listing-data-census-heading\"><i class=\"fa fa-chevron-down\"></i><i class=\"fa fa-chevron-up\"></i>Census and Crime Data</h3>\n			</div>\n			<div class=\"listing-data-census-data data-view\">\n				<div id=\"age\"></div>\n				<div id=\"income\"></div>\n				<div id=\"crime\"></div>\n			</div>\n			<div class=\"listing-data-schools data-item\">\n				<h3 class=\"listing-data-schools-heading\"><i class=\"fa fa-chevron-down\"></i><i class=\"fa fa-chevron-up\"></i>Schools Data</h3>\n			</div>\n			<div class=\"listing-data-schools-data data-view\">\n				<div class=\"elementary-data\">\n					<div id=\"elementary-data-tests\"></div>\n					<div id=\"elementary-data-teachers\"></div>\n				</div>\n				<div class=\"middle-data\">\n					<div id=\"middle-data-tests\"></div>\n					<div id=\"middle-data-teachers\"></div>\n				</div>\n				<div class=\"high-data\">\n\n					<div id=\"high-data-tests\"></div>\n					<div id=\"high-data-teachers\"></div>\n				</div>\n			</div>\n		</div>\n</section>\n</div>";
},"useData":true});
this["JST"]["loading"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<div class=\"sk-circle\">\n	<div class=\"sk-circle1 sk-child\"></div>\n	<div class=\"sk-circle2 sk-child\"></div>\n	<div class=\"sk-circle3 sk-child\"></div>\n	<div class=\"sk-circle4 sk-child\"></div>\n	<div class=\"sk-circle5 sk-child\"></div>\n	<div class=\"sk-circle6 sk-child\"></div>\n	<div class=\"sk-circle7 sk-child\"></div>\n	<div class=\"sk-circle8 sk-child\"></div>\n	<div class=\"sk-circle9 sk-child\"></div>\n	<div class=\"sk-circle10 sk-child\"></div>\n	<div class=\"sk-circle11 sk-child\"></div>\n	<div class=\"sk-circle12 sk-child\"></div>\n</div>";
},"useData":true});
this["JST"]["middle"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, alias1=this.escapeExpression, alias2=this.lambda;

  return alias1(helpers.log.call(depth0,depth0,{"name":"log","hash":{},"data":data}))
    + "\n\n<div class=\"middle-data-basic\">\n	<h3 class=\"middle-data-basic-heading\">"
    + alias1(alias2(((stack1 = ((stack1 = (depth0 != null ? depth0['0'] : depth0)) != null ? stack1.middleRating : stack1)) != null ? stack1.schoolname : stack1), depth0))
    + " - <img src=\""
    + alias1(alias2(((stack1 = ((stack1 = (depth0 != null ? depth0['0'] : depth0)) != null ? stack1.middleRating : stack1)) != null ? stack1.testrating_image_large : stack1), depth0))
    + "\" alt=\"\"></h3>\n</div>";
},"useData":true});
this["JST"]["middleTwo"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, alias1=this.lambda, alias2=this.escapeExpression;

  return "<div class=\"middle-data-basic\">\n	<h3 class=\"middle-data-basic-heading\">"
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0['0'] : depth0)) != null ? stack1.middle : stack1)) != null ? stack1.name : stack1), depth0))
    + " - Total Enrollment: "
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0['0'] : depth0)) != null ? stack1.middle : stack1)) != null ? stack1.enrollment : stack1), depth0))
    + "</h3>\n	<h4 class=\"middle-data-basic-ratings\">- GreatSchools Rating: <span class=\"gs rating\">"
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0['0'] : depth0)) != null ? stack1.middle : stack1)) != null ? stack1.gsRating : stack1), depth0))
    + "</span> - Parent Rating: <span class=\"parent rating\">"
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0['0'] : depth0)) != null ? stack1.middle : stack1)) != null ? stack1.parentRating : stack1), depth0))
    + "</span></h4>\n</div>";
},"useData":true});
this["JST"]["popup"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    return ".5";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, alias1=this.lambda, alias2=this.escapeExpression;

  return "<div class=\"popup\">\n    <i class=\"fa fa-close\"></i>\n    <h3 class=\"popup-address\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.address : depth0)) != null ? stack1.full : stack1), depth0))
    + "<br>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.address : depth0)) != null ? stack1.city : stack1), depth0))
    + ", TX</h3>\n    <h4 class=\"popup-price\">$ "
    + alias2(alias1((depth0 != null ? depth0.listPrice : depth0), depth0))
    + "</h4>\n    <p class=\"popup-bedrooms\">Bedrooms: "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.property : depth0)) != null ? stack1.bedrooms : stack1), depth0))
    + "</p>\n    <p class=\"popup-baths\">Bathrooms: "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.property : depth0)) != null ? stack1.bathsFull : stack1), depth0))
    + ((stack1 = helpers['if'].call(depth0,((stack1 = (depth0 != null ? depth0.property : depth0)) != null ? stack1.bathsHalf : stack1),{"name":"if","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "</p>\n    <p class=\"popup-sqft\">Square Footage: "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.property : depth0)) != null ? stack1.area : stack1), depth0))
    + "</p>\n    <img src=\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.photos : depth0)) != null ? stack1['0'] : stack1), depth0))
    + "\" alt=\"\" class=\"popup-image\">\n    <a href=\"#listing/"
    + alias2(alias1((depth0 != null ? depth0.mlsId : depth0), depth0))
    + "\"><button class=\"popup-more\"><i class=\"fa fa-plus-circle\"></i></button></a>\n</div>";
},"useData":true});
this["JST"]["user"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var alias1=this.lambda, alias2=this.escapeExpression;

  return "		<a href=\"#listing/"
    + alias2(alias1((depth0 != null ? depth0.mlsId : depth0), depth0))
    + "\"><li class=\"user-saved-homes-item\">\n			<img src=\""
    + alias2(alias1((depth0 != null ? depth0.image : depth0), depth0))
    + "\" alt=\"\">\n			<div class=\"user-saved-homes-item-text\">\n				<p><span>Address:</span> "
    + alias2(alias1((depth0 != null ? depth0.address : depth0), depth0))
    + "</p>\n				<p><span>Price:</span> $"
    + alias2(alias1((depth0 != null ? depth0.price : depth0), depth0))
    + "</p>\n			</div>\n		</li></a>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, alias1=this.lambda, alias2=this.escapeExpression;

  return "<div class=\"screen\">\n<header class=\"user-header\">\n	<div class=\"user-header-branding\">\n		<i class=\"fa fa-graduation-cap fa-2x\"></i>\n		<h3 class=\"user-header-branding-text\">The Educated Homebuyer</h3>\n	</div>\n	<h3 class=\"user-header-greeting\">Welcome, "
    + alias2(alias1((depth0 != null ? depth0.name : depth0), depth0))
    + "!</h3>\n	<ul class=\"user-header-nav\">\n		<li class=\"user-header-nav-link\"><a href=\"#\">Home</a></li> |<li class=\"user-header-nav-link\"><button class=\"user-header-logout\">Logout</button></li>\n	</ul>\n</header>\n\n<section class=\"user-saved-homes\">\n	<h3 class=\"user-saved-homes-heading\">Saved Homes:</h3>\n	<ul class=\"user-saved-homes-list\">\n		<a href=\"\">\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.homes : depth0),{"name":"each","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "	</ul>\n	<div class=\"user-saved-homes-footer\"></div>\n</section>\n\n<section class=\"user-saved-filters\">\n	<h3 class=\"user-saved-filters-heading\">Filters:</h3>\n	<div class=\"user-saved-filters-filters\">\n		<label class=\"user-saved-filters-price\">Min and Max Price:</label>\n		$<input class=\"user-saved-filters-price-min\" type=\"number\" placeholder=\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.filters : depth0)) != null ? stack1.minPrice : stack1), depth0))
    + "\"> to $<input class=\"user-saved-filters-price-max\" type=\"number\" placeholder=\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.filters : depth0)) != null ? stack1.maxPrice : stack1), depth0))
    + "\">\n		<label class=\"user-saved-filters-bedrooms\">Bedrooms:</label>\n		<input type=\"number\" class=\"user-saved-filters-bedrooms-beds\" placeholder=\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.filters : depth0)) != null ? stack1.bedrooms : stack1), depth0))
    + "\">\n		<label class=\"user-saved-filters-bathrooms\">Bathrooms:</label>\n		<input type=\"number\" class=\"user-saved-filters-bathrooms-baths\" placeholder=\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.filters : depth0)) != null ? stack1.baths : stack1), depth0))
    + "\">\n		<label class=\"user-saved-filters-sqft\">Square Feet:</label>\n		<input class=\"user-saved-filters-sqft-min\" type=\"number\" placeholder=\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.filters : depth0)) != null ? stack1.minSq : stack1), depth0))
    + "\"> to <input class=\"user-saved-filters-sqft-max\" type=\"number\" placeholder=\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.filters : depth0)) != null ? stack1.maxSq : stack1), depth0))
    + "\">\n		<button class=\"user-saved-filters-update\">Update</button>\n	</div>\n	<div class=\"user-saved-filters-footer\"></div>\n</section>\n</div>";
},"useData":true});