$(function () {
    $.support.cors = true;
    $.ajax({
        url: (location.protocol === 'file:' ? remoteUrl + '/' : '') + 'data.json',
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