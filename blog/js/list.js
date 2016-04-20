$(function () {
    var $template_list = $('#template_list'),
        $list = $('#list');

    $.ajax({
        url: 'blog.json',
        dataType: 'json'
    }).done(function (data) {
        $list.html($template_list.template(data));
    });
});