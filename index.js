// Shopify ScriptTag module
(function(){
  // Load Script function we may need to load scripts, for example, jQuery from the Google's CDN
  var loadScript = function(url, callback){
    var script = document.createElement("script");
    script.type = "text/javascript";

    // If the browser is Internet Explorer.
    if (script.readyState){
      script.onreadystatechange = function(){
        if (script.readyState == "loaded" || script.readyState == "complete"){
          script.onreadystatechange = null;
          callback();
        }
      };
    // For any other browser.
    } else {
      script.onload = function(){
        callback();
      };
    }

    script.src = url;
    document.getElementsByTagName("head")[0].appendChild(script);
  };

  /* ScriptTag main function 
   * $ in this scope references the jQuery object
  */
  var main = function($){
    console.log('--- script tag main is running');
    var body = $('body');
    var shop = Shopify.shop;

    body.prepend('<h1>Add Script here:'+shop+'</h1>');
    body.css({
      'position': 'relative',
      'background-color': 'red'
    }) 
  };

  /* If jQuery has not yet been loaded or if it has but it's too old, we will load jQuery from the Google CDN.
   * When it's fully loaded, we will run our main JavaScript.
  */
  if ((typeof jQuery === 'undefined') || (parseInt(jQuery.fn.jquery) === 3 && parseFloat(jQuery.fn.jquery.replace(/^3\./,"")) < 4.1)) {
    loadScript('//ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js', function(){
      console.log('--- loaded jquery 3.4.1');
      jQueryObj = jQuery.noConflict(true);
      main(jQueryObj);
    });
  } else {
    main(jQuery);
  }
})();
