// ==UserScript==
// @name        Collapsible Lists in Trello
// @version     0.0.1a
// @description 
// @updateUrl   https://github.com/chimericdream/GreasemonkeyScripts/raw/master/dist/trello-collapsible-lists/trello-collapsible-lists.meta.js
// @downloadUrl https://github.com/chimericdream/GreasemonkeyScripts/raw/master/dist/trello-collapsible-lists/trello-collapsible-lists.user.js
// @include     https://trello.com/b/*
// @require     https://raw.githubusercontent.com/chimericdream/JS-Debounce/master/debounce.js
// @require     http://code.jquery.com/jquery-latest.js
// @grant       none
// ==/UserScript==
!function(e,n){"use strict";var s=e("board"),d=function(){s.children(".js-list.list-wrapper").addClass("gmjs-collapsible-list")};document.body.addEventListener("DOMNodeInserted",d)}(jQuery,window.fnDebounce);