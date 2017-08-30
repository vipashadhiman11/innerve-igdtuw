// Thanks for checking out Linkstant. We've kept this Javascript completely unminimized and full of comments, so that you can see exactly what you're adding to your site!
// To find out more, or to discover new links to your own content, visit www.linkstant.com

var http, uid, dest;
// This outer 'IF' statement ensures that we immediately quit if there's no referer, or if the referring URL is on the same site.
// This massively reduces the number of times the code has to call Linkstant
if (document.referrer && (document.referrer.split('/')[2] != window.location.host)){
	
	// This loop finds the user's ID from the 'linkstant' meta tag
	  var m = document.getElementsByTagName('meta');
	  for(var i in m){
		if(m[i].name == 'linkstant'){var uid = m[i].content;}
		if(m[i].name == 'linkstant_tag'){var tag = m[i].content;}
	  }
	
	// We only continue if the user ID was specified
	if (uid && typeof uid == "string") {
		// We trim the urls down, to avoid sending around huge URLs
		ref = document.referrer.substring(0, 499)
		url = window.location.href.replace(window.location.hash,'').substring(0, 499)
		
		// This section loops through a blacklist, to avoid alerting you about 'links that aren't really links', and EXITs if there's a match
		// Contact us via http://www.linkstant.com/support/ to suggest other search engines that should immediately be filtered out at this point.
		var blacklist = ['https?://[^/]+\.google\.', 'https?://[^/]+\.yahoo\.com', 'https?://[^/]+\.bing\.com/search',
							'https?://[^/]+\.ask\.com', 'baidu\.com', 'yandex\.com', 'yandex\.ru',
							'wow\.com', 'webcrawler\.com', 'mywebsearch\.com', 'duckduckgo\.com', 'blekko\.com', 
							'stumbleupon\.com', 'https?://[^/]+\.facebook\.com', 'https?://t\.co',
							'g\.doubleclick\.net', 
							'mail\.live\.com',
							'https?://[^/]+\.mywebsearch\.com', 'https?://[^/]+\.search-results\.com', 'isearch\.avg\.com', 'search\.aol\.com', 'search\.conduit\.com', 'search\.sweetim\.com', 'search\.babylon\.com', 'search\.comcast\.net', 'speedbit\.com', 'zapmeta\.com']
				
		for(i=0; i<blacklist.length; i++) {
			if (ref.match(blacklist[i])){
				exit;
			}
		}
		
			
		// We're setting up to do an AJAX call here. It's being done 'manually', without jQuery or similar
		if (window.XMLHttpRequest) { // code for IE7+, FF, Chrome, Opera, Safari
			http=new XMLHttpRequest();
		}
		
		else { // code for IE6, IE5
			http=new ActiveXObject("Microsoft.XMLHTTP");
		}
		
		http.onreadystatechange=function() {
			if (http.readyState==4 && http.status==200) {
				response = http.responseText;
			}
		}
		
		// These lines make the AJAX call to Linkstant; server-side processing then checks to see if this is a new link
		dest="http://www.linkstant.com/x12/?encoded=y&uid="+uid+"&tag="+tag+"&url=" + encodeURIComponent(url) + "&referer=" + encodeURIComponent(ref)
		http.open("GET", dest);
		http.send();
		
	}
}
// v12 - 24/12/2014 - 2236PST