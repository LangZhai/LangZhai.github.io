(function (xmlHttp) {
    var template_list = document.querySelector('#template_list'),
        list = document.querySelector('#list');

    xmlHttp.open('GET', 'blog.json', true);
    xmlHttp.send(null);
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
            list.innerHTML = template_list.template(JSON.parse(xmlHttp.responseText));
        }
    };
}(XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP')));