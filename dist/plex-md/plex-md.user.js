// ==UserScript==
// @name        PlexMD
// @version     1.0.0a
// @description Greasemonkey script to parse item descriptions via Markdown in Plex Media Server.
// @updateUrl   https://github.com/chimericdream/GreasemonkeyScripts/raw/master/dist/plex-md/plex-md.meta.js
// @downloadUrl https://github.com/chimericdream/GreasemonkeyScripts/raw/master/dist/plex-md/plex-md.user.js
// @include     https://app.plex.tv/*
// @require     https://cdn.rawgit.com/showdownjs/showdown/1.7.4/dist/showdown.min.js
// @require     https://raw.githubusercontent.com/chimericdream/JS-Debounce/master/debounce.js
// @require     http://code.jquery.com/jquery-3.2.1.min.js
// @grant       none
// ==/UserScript==
!function(e,a,n){"use strict";var r=debounce(function(){var a=e('[class*="PrePlaySummary-summary-"] > [class*="CollapsibleText-contentTransition-"] > [class*="Measure-container-"]');if(0===a.length&&(a=e('[class*="PrePlaySummary-summary-"] > .false > [class*="Measure-container-"]')),0!==a.length){var r=a.html();if(r=r.replace(/<\/p><p>/gi,"\n").replace(/<\/?p>/gi,"").replace(/<div.+><\/div>/gi,""),!a.hasClass("pmd-markdownified")){var s=new n.Converter,i=s.makeHtml(r);e("p",a).remove(),a.contents().filter(function(){return 3==this.nodeType}).remove(),a.prepend(i),a.addClass("pmd-markdownified")}}},2e3);a.addEventListener("DOMNodeInserted",r,!1)}(jQuery,window,window.showdown);