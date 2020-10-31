
function parseURLParams(url) {
    var queryStart = url.indexOf("?") + 1,
        queryEnd   = url.indexOf("#") + 1 || url.length + 1,
        query = url.slice(queryStart, queryEnd - 1),
        pairs = query.replace(/\+/g, " ").split("&"),
        parms = {}, i, n, v, nv;

    if (query === url || query === "") return;

    for (i = 0; i < pairs.length; i++) {
        nv = pairs[i].split("=", 2);
        n = decodeURIComponent(nv[0]);
        v = decodeURIComponent(nv[1]);

        if (!parms.hasOwnProperty(n)) parms[n] = [];
        parms[n].push(nv.length === 2 ? v : null);
    }
    return parms;
}
var urlParams = parseURLParams(window.location.href);
var reviewLookUp;
$(document).ready(function(){
  $.getJSON("./review_look_up.json", function(json) {
    console.log(json);
    reviewLookUp = json;
    loadPageContent();
  });

});

function loadPageContent(){
  if(urlParams == null){
    urlParams = {};
  }
  if(urlParams.page == null){
    urlParams.page = [];
    urlParams.page[0] = "default";
  }
  switch(urlParams.page[0]){
    default:
    case "home":
      $("#content").load("./Layouts/home.html");
      break;
  }
}
