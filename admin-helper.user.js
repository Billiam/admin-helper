// ==UserScript==
// @name          AdminHelper
// @namespace     http://github.com/Billiam
// @description   Admin entry timesheet helper for mainframe
// @include       https://mainframe.nerdery.com/timesheet.php*
// @version       0.1.0
// @run-at        document-end
// @icon          http://billiam.github.io/admin-helper/icon-128.png
// @updateUrl     http://billiam.github.io/admin-helper/admin-helper.user.js
// ==/UserScript==
GM_addStyle('.data_table tr.admin_helper_highlight td{background-color:#ceffcc}#admin_helper{border:1px solid #d8d8cf;border-radius:5px;margin-bottom:10px;background:#f0f0e7;padding:15px;line-height:1.5}#admin_helper span{font-weight:700}');
"use strict";var QueryResult=function(a){this.result=a,this.length=a.snapshotLength};QueryResult.prototype.forEach=function(a){for(var b=0,c=this.result.snapshotLength;c>b;b++)a(this.result.snapshotItem(b));return this},QueryResult.prototype.map=function(a){var b=[];return this.forEach(function(c){b.push(a(c))}),b},QueryResult.prototype.all=function(){return this.map(function(a){return a})};var Xpath={findAll:function(a,b){return this._evaluate(a,b,!0)},find:function(a,b){return this._evaluate(a,b,!1)},_evaluate:function(a,b,c){b=null===b||void 0===b?document.body:b;var d=c?XPathResult.ORDERED_NODE_SNAPSHOT_TYPE:XPathResult.FIRST_ORDERED_NODE_TYPE,e=document.evaluate(a,b,null,d);return c?new QueryResult(e):e.singleNodeValue}},Template={render:function(a,b,c){for(var d in b)if(b.hasOwnProperty(d)){var e=c?b[d]:this._escape(b[d]);a=a.replace(new RegExp("{"+d+"}","g"),e)}return a},renderObject:function(a,b,c){var d="";for(var e in b)b.hasOwnProperty(e)&&(d+=Template.render(a,{key:e,value:b[e]},c));return d},renderEach:function(a,b,c){return b.reduce(function(b,d){return b+Template.render(a,d,c)},"")},_escape:function(a){return String(a).replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/'/g,"&#39;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\//g,"&#x2F;")}},Highlight={HIGHLIGHT_CLASS:"admin_helper_highlight",run:function(a){var b=this;return a.forEach(function(a){a.classList.add(b.HIGHLIGHT_CLASS)}),this}},Summarize={HOUR_CELL:'td[contains(@class, "hours")]',NOTE_CELL:'td[contains(@class, "notes")]',TARGET_OUTPUT:"TSEntryInline",OUTPUT_ID:"admin_helper",run:function(a){var b,c,d,e,f={},g=0,h=this;return a.forEach(function(a){b=Xpath.find(h.NOTE_CELL,a),c=b.textContent.match(/(.+?): .+/),e=Xpath.find(h.HOUR_CELL,a),d=1*e.textContent,c?(void 0===f[c[1]]&&(f[c[1]]=0),f[c[1]]+=d):g+=d}),this._render(f,g),this},_formatTotals:function(a,b){var c={};for(var d in a)a.hasOwnProperty(d)&&(c[d]=this._formatHour(a[d],b));return c},_sortTotals:function(a){var b=[];for(var c in a)a.hasOwnProperty(c)&&b.push({name:c,total:a[c]});return b.sort(function(a,b){return a.name.toLowerCase().localeCompare(b.name.toLowerCase())}),b},_formatHour:function(a,b){return null==a&&(a=0),null==b&&(b=2),a.toFixed(b)},_shouldRender:function(a,b){if(b>0)return!0;for(var c in a)if(Object.prototype.hasOwnProperty.call(a,c))return!0;return!1},_render:function(a,b){var c,d,e,f=document.getElementById(this.TARGET_OUTPUT);return f&&this._shouldRender(a,b)&&(d=this._sortTotals(this._formatTotals(a)),e=this._formatHour(b),c=document.createElement("div"),c.setAttribute("id",this.OUTPUT_ID),c.innerHTML=Template.render('<h3 title="ADMIN entries without recognized prefixes">Unassigned: <span class="admin_helper_hours">{unlabeled}</span></h3><ul>{items}</ul>',{unlabeled:e,items:Template.renderEach('<li>{name}: <span class="admin_helper_hours">{total}</span>',d)},!0),f.parentNode.insertBefore(c,f)),this}},AdminHelper={ADMIN_ROWS:'//tr[td[contains(@class, "project")]/span[text()="ADMIN"]][td[contains(@class, "client")]//*[text()="SIERRA"]]',init:function(a){this._iterateRows(a)},_iterateRows:function(a){var b=Xpath.findAll(this.ADMIN_ROWS);a.forEach(function(a){"function"==typeof a.run&&a.run(b)})}};AdminHelper.init([Highlight,Summarize]);