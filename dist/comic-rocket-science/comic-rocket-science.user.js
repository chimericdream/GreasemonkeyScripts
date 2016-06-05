// ==UserScript==
// @name        Comic Rocket Science
// @description Greasemonkey script to add more comic management features to Comic Rocket.
// @version     0.3.2a
// @updateUrl   https://github.com/chimericdream/GreasemonkeyScripts/raw/master/dist/comic-rocket-science/comic-rocket-science.meta.js
// @downloadUrl https://github.com/chimericdream/GreasemonkeyScripts/raw/master/dist/comic-rocket-science/comic-rocket-science.user.js
// @include     http://comic-rocket.com/
// @include     http://www.comic-rocket.com/
// @include     https://comic-rocket.com/
// @include     https://www.comic-rocket.com/
// @grant       none
// ==/UserScript==
!function(t,a,e,r){"use strict";function n(){d.empty();for(var t=0;t<o.length;t++)d.append(o[t]);s()}function c(){for(var t=0;t<o.length;t++){var a=o[t],e=a.attr("data-title").toLowerCase(),r=a.attr("data-rating"),n=""===u.title||e.includes(u.title),c=4===u.rating.length||-1!==u.rating.indexOf(r);n&&c?a.show():a.hide()}s()}function s(){for(var t=0,a=0;a<o.length;a++)o[a].is(":visible")&&t++;p.text("Showing "+t+" of "+o.length+" comics.")}var i={PG:1,R:2,"NC-17":3,UR:4},o=[],l=null,d=t(e.createElement("div")),p=t(e.createElement("div")).attr("id","comic-status-text"),m=0,b=0,u={title:"",rating:["PG","R","NC-17","UR"]},g={title:function(t,a){var e=t.attr("data-title").toLowerCase(),r=a.attr("data-title").toLowerCase();return e=e.replace(/^((an?|the) )/,""),r=r.replace(/^((an?|the) )/,""),e===r?0:e>r?1:-1},rating:function(t,a){var e=i[t.attr("data-rating")],r=i[a.attr("data-rating")];return parseInt(e)-parseInt(r)},read:function(t,a){var e=t.attr("data-read"),r=a.attr("data-read");return parseInt(e)-parseInt(r)},total:function(t,a){var e=t.attr("data-total"),r=a.attr("data-total");return parseInt(e)-parseInt(r)},updated:function(t,a){var e=t.attr("data-date"),r=a.attr("data-date");return parseInt(e)-parseInt(r)},unread:function(t,a){var e=parseInt(t.attr("data-total"))-parseInt(t.attr("data-read")),r=parseInt(a.attr("data-total"))-parseInt(a.attr("data-read"));return parseInt(e)-parseInt(r)},"percent-read":function(t,a){var e=parseInt(t.attr("data-read"))/parseInt(t.attr("data-total"))*100,r=parseInt(a.attr("data-read"))/parseInt(a.attr("data-total"))*100;return e-r}};t(e).ready(function(){var a=["#comic-rocket-science-controls {background-color: #51493d; color: #FFF; margin: 0 auto 20px; width: 552px; padding: 10px;}","#comic-rocket-science-controls .comics-item-image span {height: auto; padding: 0 0 1ex 0;}","#comic-rocket-science-controls .form-search input {border-radius: 3px; padding-left: 10px; width: calc(100% - 14px);}","#comic-rocket-science-controls label {color: #FFF; display: inline-block;}","#comic-rocket-science-controls label + label {margin-left: 5px;}","#comic-rocket-science-controls label input {display: inline;}","#comic-rocket-science-controls .btn-primary {padding: 5px 10px; background-image: none;}","#comic-rocket-science-controls .btn-primary span {display: none;}","#comic-rocket-science-controls .btn-primary.sorted-asc {font-weight: bold;}","#comic-rocket-science-controls .btn-primary.sorted-desc {font-weight: bold;}","#comic-rocket-science-controls .btn-primary.sorted-asc .asc {display: inline;}","#comic-rocket-science-controls .btn-primary.sorted-desc .desc {display: inline;}","#comic-rocket-science-controls .btn-primary + .btn-primary {margin-left: 5px;}","#comic-status-text {margin: 0 auto 10px; width: 572px;}"],r="<style>"+a.join("")+"</style>";t("head").append(r),t(".comics-item").each(function(){var a=t(this),e=a.find(".comics-item-image span").text(),r=a.find(".comics-item-rating abbr").text(),n=a.find(".comics-item-date div").text().replace("Updated: ","").replace("-",""),c=a.find(".progress-label").text().split("/");m+=parseInt(c[0]),b+=parseInt(c[1]),a.attr("data-title",e),""===r?a.attr("data-rating","UR"):a.attr("data-rating",r),a.attr("data-date",n),a.attr("data-read",c[0]),a.attr("data-total",c[1]),null===l&&(l=a.parent()),o.push(a)}),l.attr("id","comics-wrapper");var c=t("#comic-rocket-sidebar").parent().children()[0],s=t(c).children()[0],i=m/b*100;t(s).append("<p>Overall progress: "+m+"/"+b+" ("+i.toFixed(2)+"%)</p>");var u=t(e.createElement("div"));u.attr("id","comic-rocket-science-controls");var h='<span class="comics-item-image"><span>Comic Rocket <strong>Science</strong></span></span>',f='<div class="form-search"><input id="crs-title-search" placeholder="Filter by title"/></div>',v=['<label><input type="checkbox" name="crs-rating-filter" value="PG" checked> PG</label>','<label><input type="checkbox" name="crs-rating-filter" value="R" checked> R</label>','<label><input type="checkbox" name="crs-rating-filter" value="NC-17" checked> NC-17</label>','<label><input type="checkbox" name="crs-rating-filter" value="UR" checked> Unrated</label>'],k='<span class="asc"> &uparrow;</span><span class="desc"> &downarrow;</span>',y=['<a class="btn btn-primary sort-btn sorted-asc" id="crs-sort-title" href="#">Title'+k+"</a>",'<a class="btn btn-primary sort-btn" id="crs-sort-rating" href="#">Rating'+k+"</a>",'<a class="btn btn-primary sort-btn" id="crs-sort-unread" href="#"># Unread'+k+"</a>",'<a class="btn btn-primary sort-btn" id="crs-sort-read" href="#"># Read'+k+"</a>",'<a class="btn btn-primary sort-btn" id="crs-sort-percent-read" href="#">% Read'+k+"</a>",'<a class="btn btn-primary sort-btn" id="crs-sort-total" href="#">Total'+k+"</a>",'<a class="btn btn-primary sort-btn" id="crs-sort-updated" href="#">Updated'+k+"</a>"],x=[h,f,"<strong>Filter by rating:</strong>",v.join(""),"<strong>Sort by:</strong>",y.join("")];l.empty().prepend(u).append(d),u.append(x.join("<br>")),u.after("<hr>"),d.before(p),o.sort(g.title),n()}),t(".span8").on("keyup","#crs-title-search",function(a){a.preventDefault(),a.stopPropagation(),u.title=t(this).val().toLowerCase(),c()}),t(".span8").on("click","#comic-rocket-science-controls .sort-btn",function(a){a.preventDefault(),a.stopPropagation();var e=t(this),r=1;e.hasClass("sorted-asc")?r=-1:e.hasClass("sorted-desc")&&(r=1),t("#comic-rocket-science-controls .sort-btn").removeClass("sorted-asc").removeClass("sorted-desc");var c=e.attr("id").replace("crs-sort-","");o.sort(g[c]),0>r?(o.reverse(),e.addClass("sorted-desc")):e.addClass("sorted-asc"),n()}),t(".span8").on("click","#comic-rocket-science-controls input",function(a){a.stopPropagation();var e=t(this);if(e.attr("checked"))u.rating.push(e.val());else{var r=u.rating.indexOf(e.val());u.rating.splice(r,1)}c()})}(window.jQuery,window,document);