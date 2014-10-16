function off(){
    var css = 'html {-webkit-filter: invert(0%);!important} img, object[type="application/x-shockwave-flash"], embed[type="application/x-shockwave-flash"] {-webkit-filter: invert(0%);!important}',
        head = document.getElementsByTagName('head')[0],
        style = document.createElement('style');

    window.observer.disconnect();
    style.type = 'text/css';
    style.appendChild(document.createTextNode(css));
    style.setAttribute('id', 'gcff-night-mode');
    head.replaceChild(style, document.getElementById('gcff-night-mode'));
    $('.gcff-night-mode-marked').removeClass('gcff-night-mode-marked');
    $('.gcff-night-mode-checked').removeClass('gcff-night-mode-checked');
}