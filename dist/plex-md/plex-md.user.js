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
!function(e,n,a,r){"use strict";var s=a(function(){var n=e('[class*="PrePlaySummary-summary-"] > [class*="CollapsibleText-contentTransition-"] > [class*="Measure-container-"]');if(0===n.length&&(n=e('[class*="PrePlaySummary-summary-"] > .false > [class*="Measure-container-"]')),0!==n.length){var a=n.html();if(a=a.replace(/<\/p><p>/gi,"\n").replace(/<\/?p>/gi,"").replace(/<div.+><\/div>/gi,""),!n.hasClass("pmd-markdownified")){var s=new r.Converter,i=s.makeHtml(a);e("p",n).remove(),n.contents().filter(function(){return 3==this.nodeType}).remove(),n.prepend(i),n.addClass("pmd-markdownified")}}},2e3);n.addEventListener("DOMNodeInserted",s,!1)}(jQuery,window,window.fnDebounce,window.showdown);