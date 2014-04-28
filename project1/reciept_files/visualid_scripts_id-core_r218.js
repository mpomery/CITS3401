/* uwaCore defines a namespace for The University of Western Australia */

(function(){

var readyBound          = false,
    domIsReady          = false,
    readyQueue          = [],
    scriptQueue         = [],
    loadedScripts       = [],
    scriptQueueQueued   = false,    // (i.e. when jQuery is present)
    scriptCallback      = null,

    uwaCore = window.uwaCore = {

        SRC_JQUERY:     window.location.protocol == 'https:' ? 'https://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.js' : 'http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.js',

        SRC_COLORBOX:   window.location.protocol == 'https:' ? 'https://static.weboffice.uwa.edu.au/visualid/apps/colorbox/1.3.3/jquery.colorbox.js' : 'http://static.weboffice.uwa.edu.au/visualid/apps/colorbox/1.3.3/jquery.colorbox.js',

        //SRC_COLORBOX:   window.location.protocol == 'https:' ? 'https://static.weboffice.uwa.edu.au/visualid/apps/colorbox/1.2.6/jquery.colorbox.js' : 'http://static.weboffice.uwa.edu.au/visualid/apps/colorbox/1.2.6/jquery.colorbox.js',
        //SRC_JQUERY:     'https://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.js',
        //SRC_COLORBOX:   'https://static.weboffice.uwa.edu.au/visualid/apps/colorbox/1.2.6/jquery.colorbox.js',
        //SRC_COLORBOX_CSS:   'http://130.95.225.200/~zeno/colorbox/example1/colorbox.css',

        // Equivalent to jQuery's ready function, this will call aCallable
        // When the DOM is loaded - usually a while before body.onload.
        ready: function(aCallable) {

            // Use jQuery's ready processing if jQuery is loaded 
            if ( typeof window.jQuery != 'undefined' ) $(document).ready(aCallable);
            else {

                // Attach ready listeners if they haven't been attached
                bindReady();

                // If the dom's already loaded, just call our argument
                if ( domIsReady ) aCallable.call(document, uwaCore);

                // Otherwise, add the callable to the readyQueue
                else readyQueue.push(aCallable);

                return this;
            }
            
        }, // end ready

        // Loads a javascript file after the readyQueue's been processed
        // and calls aCallback function if it's provided
        jsLazyLoad: function(urls, aCallback) {

            var head = document.getElementsByTagName("head")[0], i, script;

            // Cast urls to an Array
            urls = urls.constructor === Array ? urls : [urls];

            // Create a request object for each URL. If multiple URLs are specified,
            // the callback will only be executed after the last URL is loaded.
            for ( var i = 0; i < urls.length; ++i) {
                scriptQueue.push({
                    'url'     : urls[i],
                    'callback': i === urls.length - 1 ? aCallback : null
                    });
            }

            if ( domIsReady ) {
                processScriptQueue();
            }
            else if ( typeof window.jQuery != 'undefined' && !scriptQueueQueued ) {
                scriptQueueQueued = true;
                $(document).ready(processScriptQueue);
            }

        }, // end jsLazyLoad

        withJQuery: function(aCallable) {

            if ( typeof window.jQuery != 'undefined' ) aCallable.call(document, window.jQuery);
            else uwaCore.jsLazyLoad(this.SRC_JQUERY, aCallable);
        }

    };

    // Called when the DOM is ready. Calls anything in the readyQueue
    // array and queues the first lazily loaded script
    function processReadyQueue() {

        // This function must only be run the first time a "DOM is ready" type event is called
        if ( !domIsReady ) domIsReady = true;
        else return true;

        // Process ready queue
        if ( readyQueue.length > 0 ) {

            // Call everything in the readyQueue
            for ( var fn = readyQueue[0], i = 0;
                  i < readyQueue.length;
                  fn = readyQueue[++i] ) fn.call(this)
            readyQueue = null;
        }

        // Process lazy script queue
        if ( scriptQueue.length > 0 ) processScriptQueue();

    } // end processReadyQueue()

    // If there's anything in the script queue, load it and set up the callback
    function processScriptQueue() {

        if ( !scriptQueue.length ) return;

        var nextJS = scriptQueue.shift();

        // Just run the callback and move on if this script's already loaded
        for ( var i=0; i < loadedScripts.length; i++ ) {
            if ( loadedScripts[i] == nextJS.url ) {
                if ( nextJS.callback ) nextJS.callback.call(this);
                processScriptQueue();
                return;
            }
        }

        // Script isn't already loaded - so load it
        var head = document.getElementsByTagName("head")[0];
        var script = document.createElement('script');
        script.type = 'text/JavaScript';
        script.src = nextJS.url;

        var done = false;
        // Attach handlers for all browsers
        script.onload = script.onreadystatechange = function() {

            if ( !done && ( !this.readyState ||
                 this.readyState == "loaded" || this.readyState == "complete") ) {

                done = true;
                if ( nextJS.callback ) nextJS.callback.call(this);

                // Add to the list of 'already loaded' scripts
                loadedScripts.push(nextJS.url);

                // Handle memory leak in IE
                script.onload = script.onreadystatechange = null;
                head.removeChild( script );

                processScriptQueue();
            }
        };
        head.appendChild(script);

    } // end processScriptQueue()

    // Sets the readyQueue up to get processed when the DOM is loaded
    function bindReady() {

        // Only bind ready functions once
        if ( !readyBound ) readyBound = true;
        else return;

        // Mozilla, Opera and webkit nightlies currently support this event
        if ( document.addEventListener ) {
            // Use the handy event callback
            document.addEventListener("DOMContentLoaded", function(){
                document.removeEventListener("DOMContentLoaded", arguments.callee, false);
                processReadyQueue();
            }, false);
        }

        // If IE event model is used
        else if ( document.attachEvent ) {

            // ensure firing before onload, maybe late but safe also for iframes
            document.attachEvent("onreadystatechange", function() {
                if ( document.readyState === "complete" ) {
                    document.detachEvent("onreadystatechange", arguments.callee);
                    processReadyQueue();
                }
            });

            // If IE and not an iframe continually check to see if the document is ready
            if ( document.documentElement.doScroll && window == window.top ) (function(){
                if ( uwaCore.isReady ) return;

                try {
                    // If IE is used, use the trick by Diego Perini
                    // http://javascript.nwbox.com/IEContentLoaded/
                    document.documentElement.doScroll("left");
                } catch( error ) {
                    setTimeout( arguments.callee, 0 );
                    return;
                }

                // and execute any waiting functions
                processReadyQueue();
            })();
        }

        // A fallback to window.onload, that will always work
        if ( typeof window.onload != 'function' )
            window.onload = processReadyQueue;

        else {
            var oldFn = window.onload;
            window.onload = function() {
                if (oldFn) oldFn();
                processReadyQueue();
            }
        }

    } // end bindReady()
    
 
})(); /* end uwaCore's private space */



/****
 * Functionality used by elements of the UWA Visual Identity gets attached here
 *
 * QuickLinks - and the code to hide & reveal them */
uwaCore.ready(function() {

    var qlButton = document.getElementById('ql_button');
    if ( qlButton )
        qlButton.onclick = qlButton.ondblclick = function () {

            var qlList = document.getElementById('ql_list');
            if (qlList.style.display != 'inline') qlList.style.display = 'inline';
            else qlList.style.display = 'none';
        };

});

/* UWA Search bar - clear defaults on focus, process input on submit */
uwaCore.ready(function() {

    var searchBox = document.getElementById('words');   // Terrible id name is vestigial
    if ( searchBox ) {

        searchBox.onfocus = function() {
            if (searchBox.defaultValue == searchBox.value) searchBox.value='';
        };
    }

    // Stops submission of a search form if empty or at its default value
    // Also fires off some useful analytics events!
    var searchForm = document.getElementById('uwasearch');
    if ( searchForm ) {

        searchForm.onsubmit = function() {

            var searchWords = document.getElementById('words');
            var uwaSearch = document.uwasearch;
            if ( uwaSearch ) {
                var keyword = uwaSearch.words.value;
                var type = uwaSearch.query.value;
            }

            if ( (/^\s*$/.test(searchWords.value)) || (/^\s*Site Search\s*$/.test(searchWords.value)) ) {
                alert('Please enter search keywords.');
                return false;
            }

            if ( typeof dcsMultiTrack == 'function' )
                dcsMultiTrack('DCSext.uwa_se', type, 'DCSext.uwa_skp', keyword);

            if ( typeof pageTracker == 'object' && typeof pageTracker._trackPageview == 'function' ) {
                pageTracker._trackPageview('/Search/search.html?search_term=' + keyword + '&category=' + type);
            }
        };
    }
});



/* Attach colorbox (our lightboxing solution) to anything that needs it */
uwaCore.ready(function() {

    // Sanity check
    var pageContainer = document.getElementById('pagecontainer');
    if ( !pageContainer ) return;

    // If any .uwa-lightboxes classes exist
    var lightboxContainers;
    if ( (lightboxContainers = getElementsByClassName('uwa-lightboxes', null, pageContainer)) && lightboxContainers.length ) {

        uwaCore.withJQuery(function() {

            //$('<link rel="stylesheet" type="text/css" href="'+SRC_COLORBOX_CSS+'" >').appendTo("head");

            uwaCore.jsLazyLoad(uwaCore.SRC_COLORBOX, function() {

                $.fn.colorbox.init();
                //$("a[rel='river']").colorbox({transition:"none", opacity:0.8, close:"close!!!"});
                $(".lightboxes a").colorbox({transition:"none", opacity:0.8});
                $(".iframeboxes a").colorbox({iframe:true, width:650, height:550, transition:"none", opacity:0.8});
            });

        });

    }

});



/* Add emergency hailstorm information stamp to /staff pages only */
/*uwaCore.ready(function() {

    var pathname = window.location.pathname;
    var staffEndRe = new RegExp('/staff$');
    var studentsEndRe = new RegExp('/students$');
    if ( staffEndRe.test(pathname) || studentsEndRe.test(pathname) ) {
        var pContent = document.getElementById('pagecontent');
        var rightcol = getElementsByClassName('rightcol', null, pContent);
        if ( rightcol ) {
            rightcol = rightcol[0];

            var anchor = document.createElement('a');
            anchor.setAttribute('href', 'http://www.news.uwa.edu.au/storm');

            var stamp = document.createElement('img');
            stamp.setAttribute('src', 'http://static.weboffice.uwa.edu.au/visualid/graphics/stamps/stamp-right-hailstorm-165.jpg');

            anchor.appendChild(stamp);
            rightcol.insertBefore(anchor, rightcol.firstChild);
        }
    }
});*/



/****
 * Utility functions
 */

/*  getElementsByClassName()
    Developed by Robert Nyman, http://www.robertnyman.com
    Code/licensing: http://code.google.com/p/getelementsbyclassname/
*/
var getElementsByClassName = function (className, tag, elm) {
    if (document.getElementsByClassName) {
        getElementsByClassName = function (className, tag, elm) {
            elm = elm || document;
            var elements = elm.getElementsByClassName(className),
                nodeName = (tag)? new RegExp("\\b" + tag + "\\b", "i") : null,
                returnElements = [],
                current;
            for(var i=0, il=elements.length; i<il; i+=1){
                current = elements[i];
                if(!nodeName || nodeName.test(current.nodeName)) {
                    returnElements.push(current);
                }
            }
            return returnElements;
        };
    }
    else if (document.evaluate) {
        getElementsByClassName = function (className, tag, elm) {
            tag = tag || "*";
            elm = elm || document;
            var classes = className.split(" "),
                classesToCheck = "",
                xhtmlNamespace = "http://www.w3.org/1999/xhtml",
                namespaceResolver = (document.documentElement.namespaceURI === xhtmlNamespace)? xhtmlNamespace : null,
                returnElements = [],
                elements,
                node;
            for(var j=0, jl=classes.length; j<jl; j+=1){
                classesToCheck += "[contains(concat(' ', @class, ' '), ' " + classes[j] + " ')]";
            }
            try {
                elements = document.evaluate(".//" + tag + classesToCheck, elm, namespaceResolver, 0, null);
            }
            catch (e) {
                elements = document.evaluate(".//" + tag + classesToCheck, elm, null, 0, null);
            }
            while ((node = elements.iterateNext())) {
                returnElements.push(node);
            }
            return returnElements;
        };
    }
    else {
        getElementsByClassName = function (className, tag, elm) {
            tag = tag || "*";
            elm = elm || document;
            var classes = className.split(" "),
                classesToCheck = [],
                elements = (tag === "*" && elm.all)? elm.all : elm.getElementsByTagName(tag),
                current,
                returnElements = [],
                match;
            for(var k=0, kl=classes.length; k<kl; k+=1){
                classesToCheck.push(new RegExp("(^|\\s)" + classes[k] + "(\\s|$)"));
            }
            for(var l=0, ll=elements.length; l<ll; l+=1){
                current = elements[l];
                match = false;
                for(var m=0, ml=classesToCheck.length; m<ml; m+=1){
                    match = classesToCheck[m].test(current.className);
                    if (!match) {
                        break;
                    }
                }
                if (match) {
                    returnElements.push(current);
                }
            }
            return returnElements;
        };
    }
    return getElementsByClassName(className, tag, elm);
};




/****
 * Deprecated; will be removed when we're sure there are no dependencies left in the wild
 *
 * Add a function to an event handler e.g. addEventFn('window.onload', myOnloadFn); */
function addEventFn(event, fn) {
    var oldfn;
    eval('oldfn='+event);
    if (typeof oldfn != 'function') eval(event+'=fn');
    else eval(event+'=function() { if (oldfn) oldfn(); fn(); }');
}

