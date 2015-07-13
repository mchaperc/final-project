/*
  If the url is to Parse, add the Parse headers
  Else If the url is to Simplyrets, add the Simplyrets headers
*/
$.ajaxPrefilter(function(options, originalOptions, jqXHR){
  if(options.url.match(/api.parse.com/)){
    options.headers = options.headers || {};
    options.headers['X-Parse-Application-Id'] = 'VdIzGCJLC4lY90r79Yvj6n9rn0pChj7OemI2Ibdw';
    options.headers['X-Parse-REST-API-Key'] = 'KGq62htoH5zj0Hv6WZsWG0IQoaA04ufqKD0f73JZ';
  } else if(options.url.match(/api.simplyrets.com/)) {
  	options.headers = options.headers || {};
  	options.headers['username'] = 'simplyrets';
  	options.headers['password'] = 'simplyrets';
  } else if(options.url.match(/azure.geodataservice.net/)) {
    options.headers = options.headers || {};
    options.headers['username'] = '6f310754-d613-4d9d-a14b-52ab156ee7c0';
    options.headers['password'] = 'sw0IrV5wzv6ooZtTVj6g38+N2aI1JihNPRYUaGqqUEM';
  }
});

