$(function () {
    var url = location.href.toString().replace(/(.(?!\/))*((\.html).*|\/$)/g, '');

    $.support.cors = true;
    $.ajax({
        url: 'http://langzhai.github.io' + url.substring(url.lastIndexOf('/')) + '/data.json',
        dataType: 'json'
    }).done(function (data) {
        $('body>article').html($('#template_article').template($.extend({
            escape: function (html) {
                return html.replaceAll('<', '&lt;').replaceAll('>', '&gt;');
            }
        }, data)));
        eval(data.code);
        Prism.highlightAll();
    });
});