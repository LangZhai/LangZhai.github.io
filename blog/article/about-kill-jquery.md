# 关于杀死jQuery

`前端` 2017-06-02

## 起因

最近在做Egret游戏开发，起始页需要用HTML页面实现一些效果，以前做传统前端项目的时候总是习惯引入jQuery，但在Egret项目中没有jQuery的用武之地，难道要为了一个很小的事情多引入一个第三方库？这事怎么想都不划算，于是还是决定用原生JS来做。

最初确实感觉不顺手，脱离了jQuery，很多理所当然的事情都变得陌生了起来，但在经过查阅文档，又经过一番摸索之后，顿时感觉柳暗花明又一村，原来使用原生JS是这么的畅爽！

## 回顾

进入正题之前，先让我们回顾一下，当初我们是因为什么接触到jQuery的，或者说，jQuery的出现，解决了哪些痛点？

### 兼容性

毫无疑问，这是大部分人使用jQuery的主要原因。

jQuery出现的年代，是一个相对蛮荒的年代，各大浏览器厂商对W3C建议标准的执行程度参差不齐，这导致了各种各样的兼容性问题，当时的开发人员不得不针对各大浏览器做兼容性处理，这严重降低了开发效率，并且产生了不少的代码冗余。

同时，那个年代也是前端还未崛起的年代，当时的人们普遍认为前端是一项没有什么技术含量的低端工作，前端开发人员的水平更是参差不齐，多数前端开发工作都是由对前端技术一知半解的后端人员兼任的，因此极少有人能对各大浏览器的特性了然于胸，就更别谈处理什么兼容性问题了。

最后，老旧浏览器的市占率也是很重要的一个因素，只要大多数人还在用这些老旧浏览器，我们就必须提供支持，这是很无奈的。

### 丰富的API

这也是我们依赖jQuery的一个重要原因。

jQuery提供了大量的API，这其中主要包括DOM操作、数组/对象操作、事件、Ajax、Promise等，这些API弥补了原生JS的不足，极大地提高了我们的开发效率。

### Animation

网页怎么能少了动画？

jQuery提供了最基本的动画效果，在它的帮助下，我们可以完成各种各样的需求，这让原本死气沉沉的文字和图片变得鲜活起来。

## 分析

废话终于唠完了，现在说正题，2017年的今天，我们真的还这么依赖jQuery吗？

### 兼容性？不存在的！

现在的主流浏览器都已经完整支持ES5特性了，大多数浏览器对ES6特性也提供了部分支持，另外据[caniuse.com](https://caniuse.com/#search=es5)显示，国内已经有89.63%的设备完整支持ES5，抛开严格模式以及parseInt()的一个小BUG，这一数字更是上升到了92.74%，因此只要我们编写规范的ES5代码，是不会在主流浏览器上出现兼容性问题的。

*`题外话`如果你在做一个面向主流用户的项目，但你的产品经理无论如何还是要求兼容IE8的话，那么恭喜你，你可以辞职了，去寻找另一番天地吧！*

### 丰富的API

__DOM操作__

* querySelector/querySelectorAll
* insertAdjacentElement/insertAdjacentText/insertAdjacentHTML
* children/firstElementChild/previousElementSibling/nextElementSibling
* getBoundingClientRect
* getComputedStyle
* ……

这里例举的只是冰山一角，实际上原生JS对DOM操作的方便程度足以媲美jQuery了。

__数组/对象操作__

ES5中新增了大量的Array/Object方法，我们已经不再需要使用jQuery来进行数组/对象操作了。

__事件__

所有主流浏览器都支持addEventListener/removeEventListener/dispatchEvent，部分浏览器甚至支持once选项，我们几乎已经不再需要使用jQuery来进行事件操作了。

*`为什么说“几乎”？`实际上在jQuery中，事件还有两个非常重要的特性，一个是delegate，另外一个就是namespace，delegate在原生JS中可以通过判断Event.target来实现，namespace也有[比较迂回的实现方法](https://github.com/LangZhai/ZLTools/blob/gh-pages/dist/zltools.js "请查阅ZLTools.prototype.boxCut")，但不得不承认，这都没有jQuery来得优雅。*

__Ajax__

除了IE9只能使用ActiveXObject('Microsoft.XMLHTTP')来代替之外，所有主流浏览器都支持XMLHttpRequest，但在IE10/11中不支持将responseType设置为'json'，不过这都不算事儿，JSON.parse(responseText)轻松搞定！

__Promise__

这是ES6中新增的特性，主流浏览器中除了IE之外都支持，所以如果想在脱离jQuery的情况下使用Promise，要么你的项目是不考虑IE的，要么使用shim/polyfill。

### Animation

所有主流浏览器都支持CSS3 Animation/Transition，据[caniuse.com](https://caniuse.com/#search=css3%20animation)显示，国内已经有超过90%的设备支持Animation和Transition特性了，因此在主流浏览器中完全可以在脱离jQuery的情况下实现动画，并且请注意，CSS3动画的效率是jQuery无法企及的。

## 总结

通过上面的分析我们不难发现，在主流浏览器中，我们已经没有理由非要使用jQuery，或者说，jQuery解决的这些痛点已经不再是痛点了，再说得直白一点，jQuery大抵的确已经过时了，一个时代就这样结束了。

不过我们不能因此而否定jQuery这些年在前端生态中做出的贡献，我们曾经熟悉的jQuery，已经逐步融入到了规范之中，并仍在持续完善。

## 延伸

[You Don't Need jQuery](https://github.com/oneuijs/You-Dont-Need-jQuery/blob/master/README.zh-CN.md)