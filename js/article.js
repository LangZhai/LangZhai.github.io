(function (xmlHttp) {
    xmlHttp.open('GET', (location.protocol !== 'file:' || typeof remoteUrl === 'undefined' ? '' : remoteUrl) + 'data.json', true);
    xmlHttp.send(null);
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
            (function (data) {
                data = JSON.parse(data);
                document.querySelector('body>article').innerHTML = ZLTemplate('#template_article').template(data);
                if (data.code instanceof Array) {
                    data.code.forEach(function (item) {
                        eval(item);
                    });
                } else {
                    eval(data.code);
                }
                Prism.highlightAll();
            }(xmlHttp.responseText));
        }
    };
}(XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP')));