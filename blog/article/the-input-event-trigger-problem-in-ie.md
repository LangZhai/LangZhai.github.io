# __IE中input事件的触发问题__

`前端` 2016-04-20

## 起因

做项目时用到了[ZLTools](https://github.com/LangZhai/ZLTools)里的$.fn.placeholder，并且在input上绑定了“input”事件，页面做完后在各浏览器中测试都OK。

然后，正当准备关闭IDE的时候，意外发现在IE10/11中刷新页面之后，这个“input”事件被自动触发了，而且每次刷新都会触发，其他浏览器则没有这个问题。

看了下代码，并没有主动去触发这个“input”事件，可为什么会有这样的问题呢？

为了避免受到其他代码的干扰，索性新写了一个页面测试，也是在input上使用$.fn.placeholder并绑定“input”事件，问题并没有重现。

回过头比较两个页面，发现第一个页面的input元素是通过[ZLTemplate](https://github.com/LangZhai/ZLTemplate)渲染出来的，而二个页面不是。

因此在第二个页面上也使用ZLTemplate渲染，但奇怪的是，问题依然没有重现。

再次比较页面发现，第一个页面的input元素上有placeholder属性，而第二个页面上没有，难道是这个原因？

抱着姑且试一试的心态，在第二个页面的input元素上添加placeholder属性后，问题终于重现了……

这难道跟placeholder属性有什么关系么？

## 原因

为了进一步排除干扰，第二个页面去掉了所有的JS引用，连jQuery也不引用了，直接使用JS的原生接口，改造后的代码如下：

```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title></title>
    </head>
    <body>
        <script>
            var input = document.createElement('input');
            input.placeholder = 'IE真棒！';
            input.addEventListener('input', function () {
                alert('IE真棒！');
            });
            document.body.appendChild(input);
        </script>
    </body>
</html>
```

页面初次打开没问题，刷新一下，问题重现了！！！

就这么短短几行代码，到底哪行才是引发问题的关键呢？

上面提到过placeholder，于是将input.placeholder = 'IE真棒！';这行删掉后，问题真的消失了……

于是接着又对代码进行了如下的改造：

```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title></title>
    </head>
    <body>
        <script>
            var input = document.createElement('input');
            input.addEventListener('input', function () {
                alert('IE真棒！');
            });
            document.body.appendChild(input);
            setTimeout(function () {
                input.placeholder = 'IE真棒！';
            }, 1000);
        </script>
    </body>
</html>
```

这次设置了一个1秒的timeout，而很诡异的是，页面刷新后的一瞬间没有问题，当setTimeout中的代码执行后，“input”事件就被触发了……

难道真的是设置placeholder属性触发了“input”事件么？

果然，即便是本来就存在于页面上的input，同样有这个问题：

```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title></title>
    </head>
    <body>
        <input id="fuckIE" type="text">
        <script>
            var input = document.getElementById('fuckIE');
            input.addEventListener('input', function () {
                alert('IE真棒！');
            });
            setTimeout(function () {
                input.placeholder = 'IE真棒！';
            }, 1000);
        </script>
    </body>
</html>
```

所以总结一下就是，在IE10/11中，设置placeholder属性的时候会触发“input”事件，然而这只是通过观察看到的现象，真正的原因仍然不得而知，不过好在知道了这一点，也就可以去避免这个问题了！

## 解决

其实很简单，在设置placeholder属性之后才绑定事件，如下：

```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title></title>
    </head>
    <body>
        <script>
            var input = document.createElement('input');
            input.placeholder = 'IE真棒！';
            document.body.appendChild(input);
            setTimeout(function () {
                input.addEventListener('input', function () {
                    alert('IE真棒！');
                });
            }, 0);
        </script>
    </body>
</html>
```

## 后记

今天突然翻出这篇文章，突发奇想用英文关键字Bing了一下，得到一些意外发现，如下：

* [[IE 11] Fires the input event when a input field with placeholder is focused \| Microsoft Connect](https://connect.microsoft.com/IE/feedback/details/885747/ie-11-fires-the-input-event-when-a-input-field-with-placeholder-is-focused)
* [Fires the input event when a input field with placeholder is focused - Microsoft Edge Development](https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/274987)