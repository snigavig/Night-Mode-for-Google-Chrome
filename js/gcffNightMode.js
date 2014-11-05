gcffNightMode = function(){

    this.observer = null;

    this.turnoff = function(){
        var css = 'html {-webkit-filter: invert(0%);!important} img, object[type="application/x-shockwave-flash"], embed[type="application/x-shockwave-flash"] {-webkit-filter: invert(0%);!important}',
            head = document.getElementsByTagName('head')[0],
            style = document.createElement('style');

        if(this.observer){
            observer.disconnect();
            style.type = 'text/css';
            style.appendChild(document.createTextNode(css));
            style.setAttribute('id', 'gcff-night-mode');
            head.replaceChild(style, document.getElementById('gcff-night-mode'));
            $('.gcff-night-mode-marked').removeClass('gcff-night-mode-marked');
            $('.gcff-night-mode-checked').removeClass('gcff-night-mode-checked');
        }
    };

    this.turnon = function(){
        window.markBackgroundImages = function() {
            $('*').not('.gcff-night-mode-checked')
                .not('.gcff-night-mode-marked')
                .addClass('gcff-night-mode-checked')
                .filter(function() {
                    if (this.currentStyle)
                        return this.currentStyle['backgroundImage'] !== 'none';
                    else if (window.getComputedStyle)
                        return document.defaultView.getComputedStyle(this,null).getPropertyValue('background-image') !== 'none';
                })
                .addClass('gcff-night-mode-marked');
            $('iframe').addClass('gcff-night-mode-marked');
        };

        var css = 'html {-webkit-filter: invert(100%);!important} img, object[type="application/x-shockwave-flash"], embed[type="application/x-shockwave-flash"], .gcff-night-mode-marked {-webkit-filter: invert(75%);!important}',
            head = document.getElementsByTagName('head')[0];


        style = document.createElement('style');
        style.type = 'text/css';
        style.appendChild(document.createTextNode(css));
        style.setAttribute('id', 'gcff-night-mode');

        if (!document.getElementById('gcff-night-mode')) {
            head.appendChild(style);
        } else {
            head.replaceChild(style, document.getElementById('gcff-night-mode'));
        }

        MutationObserver = window.WebKitMutationObserver;

        this.observer = new MutationObserver(function (mutations) {
            var len = mutations.length;
            var i = 0;
            var isAdded = false;
            while (len--) {
                if ( mutations[i] && mutations[i].addedNodes.length >= 1 ) {
                    isAdded = true;
                    len = 0;
                }
                i++;
            }
            if (isAdded) setTimeout(window.markBackgroundImages, 300);
        });

        this.observer.observe(document, {
            subtree: true,
            childList: true
        });

        window.markBackgroundImages();
    };

    return this;
}();