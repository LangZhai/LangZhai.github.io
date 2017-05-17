$(function () {
    $.support.cors = true;
    $.ajax({
        url: (location.protocol !== 'file:' || typeof remoteUrl === 'undefined' ? '' : remoteUrl) + 'data.json',
        dataType: 'json'
    }).done(function (data) {
        document.querySelector('body>article').innerHTML = ZLTemplate('#template_article').template(data);
        if (data.code instanceof Array) {
            data.code.forEach(function (item) {
                eval(item);
            });
        } else {
            eval(data.code);
        }
        Prism.highlightAll();
    });
});