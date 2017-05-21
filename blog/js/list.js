(function (xmlHttp) {
    xmlHttp.open('GET', 'blog.json', true);
    xmlHttp.send(null);
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
            document.querySelector('#list').innerHTML = ZLTemplate('#template_list').template(JSON.parse(xmlHttp.responseText));
        }
    };
}(XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP')));