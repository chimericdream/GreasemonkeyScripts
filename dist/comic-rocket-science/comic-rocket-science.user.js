// ==UserScript==
// @name        Comic Rocket Science
// @description Greasemonkey script to add more comic management features to Comic Rocket.
// @version     0.2.0a
// @updateUrl   https://github.com/chimericdream/GreasemonkeyScripts/raw/master/dist/comic-rocket-science/comic-rocket-science.meta.js
// @downloadUrl https://github.com/chimericdream/GreasemonkeyScripts/raw/master/dist/comic-rocket-science/comic-rocket-science.user.js
// @include     http://comic-rocket.com/
// @include     http://www.comic-rocket.com/
// @include     https://comic-rocket.com/
// @include     https://www.comic-rocket.com/
// @grant       none
// ==/UserScript==
!function(t,a,e,r){"use strict";function c(){g.empty();for(var t=0;t<b.length;t++)g.append(b[t]);p()}function n(t,a){var e=t.attr("data-title").toLowerCase(),r=a.attr("data-title").toLowerCase();return e=e.replace(/^((an?|the) )/,""),r=r.replace(/^((an?|the) )/,""),e===r?0:e>r?1:-1}function i(t,a){var e=m[t.attr("data-rating")],r=m[a.attr("data-rating")];return parseInt(e)-parseInt(r)}function s(t,a){var e=t.attr("data-read"),r=a.attr("data-read");return parseInt(e)-parseInt(r)}function o(t,a){var e=t.attr("data-total"),r=a.attr("data-total");return parseInt(e)-parseInt(r)}function l(t,a){var e=t.attr("data-date"),r=a.attr("data-date");return parseInt(e)-parseInt(r)}function d(){for(var t=0;t<b.length;t++){var a=b[t],e=a.attr("data-title").toLowerCase(),r=a.attr("data-rating"),c=""===k.title||e.includes(k.title),n=""===k.rating||r===k.rating;c&&n?a.show():a.hide()}p()}function p(){for(var t=0,a=0;a<b.length;a++)b[a].is(":visible")&&t++;h.text("Showing "+t+" of "+b.length+" comics.")}var m={PG:1,R:2,"NC-17":3},b=[],u=null,g=t(e.createElement("div")),h=t(e.createElement("div")).attr("id","comic-status-text"),f=0,v=0,k={title:"",rating:""};t(e).ready(function(){var a=["#comic-rocket-science-controls {background-color: #51493d; color: #FFF; margin: 0 auto 20px; width: 552px; padding: 10px;}","#comic-rocket-science-controls .comics-item-image span {height: auto; padding: 0 0 1ex 0;}","#comic-rocket-science-controls .form-search input {border-radius: 3px; padding-left: 10px; width: calc(100% - 14px);}","#comic-rocket-science-controls label {color: #FFF; display: inline-block;}","#comic-rocket-science-controls label + label {margin-left: 5px;}","#comic-rocket-science-controls label input {display: inline;}","#comic-rocket-science-controls .btn-primary {padding: 5px 10px; background-image: none;}","#comic-rocket-science-controls .btn-primary span {display: none;}","#comic-rocket-science-controls .btn-primary.sorted-asc {font-weight: bold;}","#comic-rocket-science-controls .btn-primary.sorted-desc {font-weight: bold;}","#comic-rocket-science-controls .btn-primary.sorted-asc .asc {display: inline;}","#comic-rocket-science-controls .btn-primary.sorted-desc .desc {display: inline;}","#comic-rocket-science-controls .btn-primary + .btn-primary {margin-left: 5px;}","#comic-status-text {margin: 0 auto 10px; width: 572px;}"],r="<style>"+a.join("")+"</style>";t("head").append(r),t(".comics-item").each(function(){var a=t(this),e=a.find(".comics-item-image span").text(),r=a.find(".comics-item-rating abbr").text(),c=a.find(".comics-item-date div").text().replace("Updated: ","").replace("-",""),n=a.find(".progress-label").text().split("/");f+=parseInt(n[0]),v+=parseInt(n[1]),a.attr("data-title",e),a.attr("data-rating",r),a.attr("data-date",c),a.attr("data-read",n[0]),a.attr("data-total",n[1]),null===u&&(u=a.parent()),b.push(a)}),u.attr("id","comics-wrapper");var i=t("#comic-rocket-sidebar").parent().children()[0],s=t(i).children()[0],o=f/v*100;t(s).append("<p>Overall progress: "+f+"/"+v+" ("+o.toFixed(2)+"%)</p>");var l=t(e.createElement("div"));l.attr("id","comic-rocket-science-controls");var d='<span class="comics-item-image"><span>Comic Rocket <strong>Science</strong></span></span>',p='<div class="form-search"><input id="crs-title-search" placeholder="Filter by title"/></div>',m=['<label><input type="checkbox" name="crs-rating-filter-all" value="all" checked> All</label>','<label><input type="radio" name="crs-rating-filter" value="PG"> PG</label>','<label><input type="radio" name="crs-rating-filter" value="R"> R</label>','<label><input type="radio" name="crs-rating-filter" value="NC-17"> NC-17</label>'],k='<span class="asc"> &uparrow;</span><span class="desc"> &downarrow;</span>',y=['<a class="btn btn-primary sort-btn sorted-asc" id="crs-sort-title" href="#">Title'+k+"</a>",'<a class="btn btn-primary sort-btn" id="crs-sort-rating" href="#">Rating'+k+"</a>",'<a class="btn btn-primary sort-btn" id="crs-sort-read" href="#">Read'+k+"</a>",'<a class="btn btn-primary sort-btn" id="crs-sort-total" href="#">Total'+k+"</a>",'<a class="btn btn-primary sort-btn" id="crs-sort-updated" href="#">Updated'+k+"</a>"],x=[d,p,"<strong>Filter by rating:</strong>",m.join(""),"<strong>Sort by:</strong>",y.join("")];u.empty().prepend(l).append(g),l.append(x.join("<br>")),l.after("<hr>"),g.before(h),b.sort(n),c()}),t(".span8").on("keyup","#crs-title-search",function(a){a.preventDefault(),a.stopPropagation(),k.title=t(this).val().toLowerCase(),d()}),t(".span8").on("click","#comic-rocket-science-controls .sort-btn",function(a){a.preventDefault(),a.stopPropagation();var e=t(this),r=1;e.hasClass("sorted-asc")?r=-1:e.hasClass("sorted-desc")&&(r=1),t("#comic-rocket-science-controls .sort-btn").removeClass("sorted-asc").removeClass("sorted-desc");var d=e.attr("id").replace("crs-sort-","");switch(d){case"title":b.sort(n);break;case"rating":b.sort(i);break;case"read":b.sort(s);break;case"total":b.sort(o);break;case"updated":b.sort(l)}0>r?(b.reverse(),e.addClass("sorted-desc")):e.addClass("sorted-asc"),c()}),t(".span8").on("click","#comic-rocket-science-controls input",function(a){a.stopPropagation();var e=t(this);switch(e.attr("type")){case"checkbox":t('input[name="crs-rating-filter"]').attr("checked",!1),k.rating="";break;case"radio":t('input[name="crs-rating-filter-all"]').attr("checked",!1),k.rating=e.val()}d()})}(window.jQuery,window,document);