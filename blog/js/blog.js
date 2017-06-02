(function (xmlHttp) {
    var path = location.pathname.split('/').reverse(),
        data;
    xmlHttp.open('GET', path[1] === 'article' ? '../blog.json' : 'blog.json', true);
    xmlHttp.send(null);
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
            data = JSON.parse(xmlHttp.responseText);
            if (path[1] === 'article') {
                data = Object.extend(data[path[0].split('.')[0]], {copyright: '2016-2017'});
                document.title = data.title + '-' + document.title;
                document.querySelector('article').innerHTML = ZLTemplate('#template_article').template(data);
                Prism.highlightAll();
            } else {
                document.querySelector('#list').innerHTML = ZLTemplate('#template_list').template(Object.keys(data).map(function (item) {return Object.extend(data[item], {name: item});}).sort(function (a, b) {return a.time < b.time;}));
            }
        }
    };
}(XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP')));