function runOn(){
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
    };

    var css = 'html {-webkit-filter: invert(100%);!important} img {-webkit-filter: invert(75%);!important} .gcff-night-mode-marked {-webkit-filter: invert(75%);!important}',
        head = document.getElementsByTagName('head')[0];

    style = document.getElementById('gcff-night-mode');

    if (!style) {
        style = document.createElement('style');
        style.type = 'text/css';
        style.appendChild(document.createTextNode(css));
        style.setAttribute('id', 'gcff-night-mode');
        head.appendChild(style);

    } else {
        style = document.createElement('style');
        style.type = 'text/css';
        style.appendChild(document.createTextNode(css));
        style.setAttribute('id', 'gcff-night-mode');
        head.replaceChild(style, document.getElementById('gcff-night-mode'));
    }

    MutationObserver = window.WebKitMutationObserver;

    observer = new MutationObserver(function (mutations) {
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
        if (isAdded) window.markBackgroundImages();
    });

    observer.observe(document, {
        subtree: true,
        childList: true
    });

    window.markBackgroundImages();
}