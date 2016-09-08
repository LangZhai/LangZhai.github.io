$(function () {
    var url = location.href.toString().replace(/(.(?!\/))*((\.html).*|\/$)/g, '');

    $.support.cors = true;
    $.ajax({
        url: (url.match(/^http/) ? url.substring(0, url.indexOf('//') + 2) : 'https://') + 'langzhai.github.io' + url.substring(url.lastIndexOf('/')) + '/data.json',
        dataType: 'json'
    }).done(function (data) {
        $('body>article').html($('#template_article').template(data));
        if (data.code instanceof Array) {
            $.each(data.code, function (i, item) {
                eval(item);
            });
        } else {
            eval(data.code);
        }
        Prism.highlightAll();
    });
});