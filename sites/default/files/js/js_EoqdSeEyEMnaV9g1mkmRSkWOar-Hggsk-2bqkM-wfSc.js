/* Source and licensing information for the line(s) below can be found at https://service-lux.by/core/assets/vendor/jquery.ui/ui/widgets/dialog-min.js. */
/*!
 * jQuery UI Dialog 1.13.2
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
!function(i){"use strict";"function"==typeof define&&define.amd?define(["jquery","./button","./draggable","./mouse","./resizable","../focusable","../keycode","../position","../safe-active-element","../safe-blur","../tabbable","../unique-id","../version","../widget"],i):i(jQuery)}((function(i){"use strict";return i.widget("ui.dialog",{version:"1.13.2",options:{appendTo:"body",autoOpen:!0,buttons:[],classes:{"ui-dialog":"ui-corner-all","ui-dialog-titlebar":"ui-corner-all"},closeOnEscape:!0,closeText:"Close",draggable:!0,hide:null,height:"auto",maxHeight:null,maxWidth:null,minHeight:150,minWidth:150,modal:!1,position:{my:"center",at:"center",of:window,collision:"fit",using:function(t){var e=i(this).css(t).offset().top;e<0&&i(this).css("top",t.top-e)}},resizable:!0,show:null,title:null,width:300,beforeClose:null,close:null,drag:null,dragStart:null,dragStop:null,focus:null,open:null,resize:null,resizeStart:null,resizeStop:null},sizeRelatedOptions:{buttons:!0,height:!0,maxHeight:!0,maxWidth:!0,minHeight:!0,minWidth:!0,width:!0},resizableRelatedOptions:{maxHeight:!0,maxWidth:!0,minHeight:!0,minWidth:!0},_create:function(){this.originalCss={display:this.element[0].style.display,width:this.element[0].style.width,minHeight:this.element[0].style.minHeight,maxHeight:this.element[0].style.maxHeight,height:this.element[0].style.height},this.originalPosition={parent:this.element.parent(),index:this.element.parent().children().index(this.element)},this.originalTitle=this.element.attr("title"),null==this.options.title&&null!=this.originalTitle&&(this.options.title=this.originalTitle),this.options.disabled&&(this.options.disabled=!1),this._createWrapper(),this.element.show().removeAttr("title").appendTo(this.uiDialog),this._addClass("ui-dialog-content","ui-widget-content"),this._createTitlebar(),this._createButtonPane(),this.options.draggable&&i.fn.draggable&&this._makeDraggable(),this.options.resizable&&i.fn.resizable&&this._makeResizable(),this._isOpen=!1,this._trackFocus()},_init:function(){this.options.autoOpen&&this.open()},_appendTo:function(){var t=this.options.appendTo;return t&&(t.jquery||t.nodeType)?i(t):this.document.find(t||"body").eq(0)},_destroy:function(){var i,t=this.originalPosition;this._untrackInstance(),this._destroyOverlay(),this.element.removeUniqueId().css(this.originalCss).detach(),this.uiDialog.remove(),this.originalTitle&&this.element.attr("title",this.originalTitle),(i=t.parent.children().eq(t.index)).length&&i[0]!==this.element[0]?i.before(this.element):t.parent.append(this.element)},widget:function(){return this.uiDialog},disable:i.noop,enable:i.noop,close:function(t){var e=this;this._isOpen&&!1!==this._trigger("beforeClose",t)&&(this._isOpen=!1,this._focusedElement=null,this._destroyOverlay(),this._untrackInstance(),this.opener.filter(":focusable").trigger("focus").length||i.ui.safeBlur(i.ui.safeActiveElement(this.document[0])),this._hide(this.uiDialog,this.options.hide,(function(){e._trigger("close",t)})))},isOpen:function(){return this._isOpen},moveToTop:function(){this._moveToTop()},_moveToTop:function(t,e){var o=!1,s=this.uiDialog.siblings(".ui-front:visible").map((function(){return+i(this).css("z-index")})).get(),n=Math.max.apply(null,s);return n>=+this.uiDialog.css("z-index")&&(this.uiDialog.css("z-index",n+1),o=!0),o&&!e&&this._trigger("focus",t),o},open:function(){var t=this;this._isOpen?this._moveToTop()&&this._focusTabbable():(this._isOpen=!0,this.opener=i(i.ui.safeActiveElement(this.document[0])),this._size(),this._position(),this._createOverlay(),this._moveToTop(null,!0),this.overlay&&this.overlay.css("z-index",this.uiDialog.css("z-index")-1),this._show(this.uiDialog,this.options.show,(function(){t._focusTabbable(),t._trigger("focus")})),this._makeFocusTarget(),this._trigger("open"))},_focusTabbable:function(){var i=this._focusedElement;i||(i=this.element.find("[autofocus]")),i.length||(i=this.element.find(":tabbable")),i.length||(i=this.uiDialogButtonPane.find(":tabbable")),i.length||(i=this.uiDialogTitlebarClose.filter(":tabbable")),i.length||(i=this.uiDialog),i.eq(0).trigger("focus")},_restoreTabbableFocus:function(){var t=i.ui.safeActiveElement(this.document[0]);this.uiDialog[0]===t||i.contains(this.uiDialog[0],t)||this._focusTabbable()},_keepFocus:function(i){i.preventDefault(),this._restoreTabbableFocus(),this._delay(this._restoreTabbableFocus)},_createWrapper:function(){this.uiDialog=i("<div>").hide().attr({tabIndex:-1,role:"dialog"}).appendTo(this._appendTo()),this._addClass(this.uiDialog,"ui-dialog","ui-widget ui-widget-content ui-front"),this._on(this.uiDialog,{keydown:function(t){if(this.options.closeOnEscape&&!t.isDefaultPrevented()&&t.keyCode&&t.keyCode===i.ui.keyCode.ESCAPE)return t.preventDefault(),void this.close(t);if(t.keyCode===i.ui.keyCode.TAB&&!t.isDefaultPrevented()){var e=this.uiDialog.find(":tabbable"),o=e.first(),s=e.last();t.target!==s[0]&&t.target!==this.uiDialog[0]||t.shiftKey?t.target!==o[0]&&t.target!==this.uiDialog[0]||!t.shiftKey||(this._delay((function(){s.trigger("focus")})),t.preventDefault()):(this._delay((function(){o.trigger("focus")})),t.preventDefault())}},mousedown:function(i){this._moveToTop(i)&&this._focusTabbable()}}),this.element.find("[aria-describedby]").length||this.uiDialog.attr({"aria-describedby":this.element.uniqueId().attr("id")})},_createTitlebar:function(){var t;this.uiDialogTitlebar=i("<div>"),this._addClass(this.uiDialogTitlebar,"ui-dialog-titlebar","ui-widget-header ui-helper-clearfix"),this._on(this.uiDialogTitlebar,{mousedown:function(t){i(t.target).closest(".ui-dialog-titlebar-close")||this.uiDialog.trigger("focus")}}),this.uiDialogTitlebarClose=i("<button type='button'></button>").button({label:i("<a>").text(this.options.closeText).html(),icon:"ui-icon-closethick",showLabel:!1}).appendTo(this.uiDialogTitlebar),this._addClass(this.uiDialogTitlebarClose,"ui-dialog-titlebar-close"),this._on(this.uiDialogTitlebarClose,{click:function(i){i.preventDefault(),this.close(i)}}),t=i("<span>").uniqueId().prependTo(this.uiDialogTitlebar),this._addClass(t,"ui-dialog-title"),this._title(t),this.uiDialogTitlebar.prependTo(this.uiDialog),this.uiDialog.attr({"aria-labelledby":t.attr("id")})},_title:function(i){this.options.title?i.text(this.options.title):i.html("&#160;")},_createButtonPane:function(){this.uiDialogButtonPane=i("<div>"),this._addClass(this.uiDialogButtonPane,"ui-dialog-buttonpane","ui-widget-content ui-helper-clearfix"),this.uiButtonSet=i("<div>").appendTo(this.uiDialogButtonPane),this._addClass(this.uiButtonSet,"ui-dialog-buttonset"),this._createButtons()},_createButtons:function(){var t=this,e=this.options.buttons;this.uiDialogButtonPane.remove(),this.uiButtonSet.empty(),i.isEmptyObject(e)||Array.isArray(e)&&!e.length?this._removeClass(this.uiDialog,"ui-dialog-buttons"):(i.each(e,(function(e,o){var s,n;o="function"==typeof o?{click:o,text:e}:o,o=i.extend({type:"button"},o),s=o.click,n={icon:o.icon,iconPosition:o.iconPosition,showLabel:o.showLabel,icons:o.icons,text:o.text},delete o.click,delete o.icon,delete o.iconPosition,delete o.showLabel,delete o.icons,"boolean"==typeof o.text&&delete o.text,i("<button></button>",o).button(n).appendTo(t.uiButtonSet).on("click",(function(){s.apply(t.element[0],arguments)}))})),this._addClass(this.uiDialog,"ui-dialog-buttons"),this.uiDialogButtonPane.appendTo(this.uiDialog))},_makeDraggable:function(){var t=this,e=this.options;function o(i){return{position:i.position,offset:i.offset}}this.uiDialog.draggable({cancel:".ui-dialog-content, .ui-dialog-titlebar-close",handle:".ui-dialog-titlebar",containment:"document",start:function(e,s){t._addClass(i(this),"ui-dialog-dragging"),t._blockFrames(),t._trigger("dragStart",e,o(s))},drag:function(i,e){t._trigger("drag",i,o(e))},stop:function(s,n){var a=n.offset.left-t.document.scrollLeft(),l=n.offset.top-t.document.scrollTop();e.position={my:"left top",at:"left"+(a>=0?"+":"")+a+" top"+(l>=0?"+":"")+l,of:t.window},t._removeClass(i(this),"ui-dialog-dragging"),t._unblockFrames(),t._trigger("dragStop",s,o(n))}})},_makeResizable:function(){var t=this,e=this.options,o=e.resizable,s=this.uiDialog.css("position"),n="string"==typeof o?o:"n,e,s,w,se,sw,ne,nw";function a(i){return{originalPosition:i.originalPosition,originalSize:i.originalSize,position:i.position,size:i.size}}this.uiDialog.resizable({cancel:".ui-dialog-content",containment:"document",alsoResize:this.element,maxWidth:e.maxWidth,maxHeight:e.maxHeight,minWidth:e.minWidth,minHeight:this._minHeight(),handles:n,start:function(e,o){t._addClass(i(this),"ui-dialog-resizing"),t._blockFrames(),t._trigger("resizeStart",e,a(o))},resize:function(i,e){t._trigger("resize",i,a(e))},stop:function(o,s){var n=t.uiDialog.offset(),l=n.left-t.document.scrollLeft(),h=n.top-t.document.scrollTop();e.height=t.uiDialog.height(),e.width=t.uiDialog.width(),e.position={my:"left top",at:"left"+(l>=0?"+":"")+l+" top"+(h>=0?"+":"")+h,of:t.window},t._removeClass(i(this),"ui-dialog-resizing"),t._unblockFrames(),t._trigger("resizeStop",o,a(s))}}).css("position",s)},_trackFocus:function(){this._on(this.widget(),{focusin:function(t){this._makeFocusTarget(),this._focusedElement=i(t.target)}})},_makeFocusTarget:function(){this._untrackInstance(),this._trackingInstances().unshift(this)},_untrackInstance:function(){var t=this._trackingInstances(),e=i.inArray(this,t);-1!==e&&t.splice(e,1)},_trackingInstances:function(){var i=this.document.data("ui-dialog-instances");return i||(i=[],this.document.data("ui-dialog-instances",i)),i},_minHeight:function(){var i=this.options;return"auto"===i.height?i.minHeight:Math.min(i.minHeight,i.height)},_position:function(){var i=this.uiDialog.is(":visible");i||this.uiDialog.show(),this.uiDialog.position(this.options.position),i||this.uiDialog.hide()},_setOptions:function(t){var e=this,o=!1,s={};i.each(t,(function(i,t){e._setOption(i,t),i in e.sizeRelatedOptions&&(o=!0),i in e.resizableRelatedOptions&&(s[i]=t)})),o&&(this._size(),this._position()),this.uiDialog.is(":data(ui-resizable)")&&this.uiDialog.resizable("option",s)},_setOption:function(t,e){var o,s,n=this.uiDialog;"disabled"!==t&&(this._super(t,e),"appendTo"===t&&this.uiDialog.appendTo(this._appendTo()),"buttons"===t&&this._createButtons(),"closeText"===t&&this.uiDialogTitlebarClose.button({label:i("<a>").text(""+this.options.closeText).html()}),"draggable"===t&&((o=n.is(":data(ui-draggable)"))&&!e&&n.draggable("destroy"),!o&&e&&this._makeDraggable()),"position"===t&&this._position(),"resizable"===t&&((s=n.is(":data(ui-resizable)"))&&!e&&n.resizable("destroy"),s&&"string"==typeof e&&n.resizable("option","handles",e),s||!1===e||this._makeResizable()),"title"===t&&this._title(this.uiDialogTitlebar.find(".ui-dialog-title")))},_size:function(){var i,t,e,o=this.options;this.element.show().css({width:"auto",minHeight:0,maxHeight:"none",height:0}),o.minWidth>o.width&&(o.width=o.minWidth),i=this.uiDialog.css({height:"auto",width:o.width}).outerHeight(),t=Math.max(0,o.minHeight-i),e="number"==typeof o.maxHeight?Math.max(0,o.maxHeight-i):"none","auto"===o.height?this.element.css({minHeight:t,maxHeight:e,height:"auto"}):this.element.height(Math.max(0,o.height-i)),this.uiDialog.is(":data(ui-resizable)")&&this.uiDialog.resizable("option","minHeight",this._minHeight())},_blockFrames:function(){this.iframeBlocks=this.document.find("iframe").map((function(){var t=i(this);return i("<div>").css({position:"absolute",width:t.outerWidth(),height:t.outerHeight()}).appendTo(t.parent()).offset(t.offset())[0]}))},_unblockFrames:function(){this.iframeBlocks&&(this.iframeBlocks.remove(),delete this.iframeBlocks)},_allowInteraction:function(t){return!!i(t.target).closest(".ui-dialog").length||!!i(t.target).closest(".ui-datepicker").length},_createOverlay:function(){if(this.options.modal){var t=i.fn.jquery.substring(0,4),e=!0;this._delay((function(){e=!1})),this.document.data("ui-dialog-overlays")||this.document.on("focusin.ui-dialog",function(i){if(!e){var o=this._trackingInstances()[0];o._allowInteraction(i)||(i.preventDefault(),o._focusTabbable(),"3.4."!==t&&"3.5."!==t||o._delay(o._restoreTabbableFocus))}}.bind(this)),this.overlay=i("<div>").appendTo(this._appendTo()),this._addClass(this.overlay,null,"ui-widget-overlay ui-front"),this._on(this.overlay,{mousedown:"_keepFocus"}),this.document.data("ui-dialog-overlays",(this.document.data("ui-dialog-overlays")||0)+1)}},_destroyOverlay:function(){if(this.options.modal&&this.overlay){var i=this.document.data("ui-dialog-overlays")-1;i?this.document.data("ui-dialog-overlays",i):(this.document.off("focusin.ui-dialog"),this.document.removeData("ui-dialog-overlays")),this.overlay.remove(),this.overlay=null}}}),!1!==i.uiBackCompat&&i.widget("ui.dialog",i.ui.dialog,{options:{dialogClass:""},_createWrapper:function(){this._super(),this.uiDialog.addClass(this.options.dialogClass)},_setOption:function(i,t){"dialogClass"===i&&this.uiDialog.removeClass(this.options.dialogClass).addClass(t),this._superApply(arguments)}}),i.ui.dialog}));

/* Source and licensing information for the above line(s) can be found at https://service-lux.by/core/assets/vendor/jquery.ui/ui/widgets/dialog-min.js. */;
/* Source and licensing information for the line(s) below can be found at https://service-lux.by/modules/contrib/blazy/js/dblazy.min.js. */
!function(o,i){"use strict";var s=Object.assign,u=Array.prototype,e=Object.prototype,c=e.toString,n=u.splice,r=u.some,t="undefined"!=typeof Symbol&&Symbol,f="jQuery"in o,a="cash"in o,d="add",l="remove",p="has",h="get",m="set",v="width",y="clientWidth",g="scroll",b="iterator",E="Observer",w=/-([a-z])/g,C=/^--/,S=/[\11\12\14\15\40]+/,O="data-once",x=o.localStorage,j={},z=Math.pow(2,53)-1,L=(A.prototype.init=function(n,t){t=new A(n,t);return F(n)?(n.idblazy||(n.idblazy=t),n.idblazy):t},A);function A(n,t){if(this.name="dblazy",n){if(H(n))return n;var e=n;if(J(n)){if(!(e=vn(xn(t),n)).length)return}else if(Q(n))return this.ready(n);!e.nodeType&&e!==o||(e=[e]);for(var r=this.length=e.length,i=0;i<r;i++)this[i]=e[i]}}var I=L.prototype,N=I.init;function T(n){var t=this,e=(t=H(t)?t:N(t)).length;return Q(n)&&(e&&1!==e?t.each(n):n(t[0],0)),t}function M(n){var t="[object "+n+"]";return function(n){return c.call(n)===t}}(N.fn=N.prototype=I).length=0,I.splice=n,t&&(I[t[b]]=u[t[b]]);var P,W,R=(P="length",function(n){return U(n)?void 0:n[P]}),k=(W=R,function(n){n=W(n);return"number"==typeof n&&0<=n&&n<=z});function q(n){return _(n)?Object.keys(n):[]}function H(n){return n instanceof L}function B(n){return!J(n)&&(n&&(Array.isArray(n)||k(n)))}function D(n){return!0===n||!1===n||"[object Boolean]"===c.call(n)}function F(n){return n&&n instanceof Element}var Q=M("Function");function $(n){if(U(n)||G(n)||!1===n)return!0;var t=R(n);return"number"==typeof t&&(B(n)||J(n))?0===t:0===R(q(n))}function U(n){return null===n}function V(n){return!isNaN(parseFloat(n))&&isFinite(n)}function _(n){if(!n||"object"!=typeof n)return!1;n=Object.getPrototypeOf(n);return U(n)||n===e}function J(n){return n&&"string"==typeof n}function G(n){return void 0===n}function K(n){return!!n&&n===n.window}function X(n){return-1!==[9,11].indexOf(!!n&&n.nodeType)}function Y(n){return-1!==[1,9,11].indexOf(!!n&&n.nodeType)}function Z(n){return Y(n)||K(n)}function nn(n,t,e){if(Q(n)||J(n)||D(n)||V(n))return[];if(B(n)&&!G(n.length)){var r=n.length;if(!r||1===r&&" "===n[0])return[]}if(_(n)&&$(n))return[];if("[object Object]"===c.call(n)){for(var i in n)if(tn(n,i)&&"length"!==i&&"name"!==i&&!1===t.call(e,n[i],i,n))break}else n&&(n instanceof HTMLCollection&&(n=u.slice.call(n)),(r=n.length)&&1===r&&!G(n[0])?t.call(e,n[0],0,n):n.forEach(t,e));return n}function tn(n,t){return e.hasOwnProperty.call(n,t)}function en(n){return B(n)?n:[n]}function rn(n,t,e,r){return n[t+"Attribute"](e,r)}function on(n,t,r,e){var i=this,o=G(r),u=!_(t)&&(o||D(e)),c=J(e)?e:"";if(u){e=n&&n.length?n[0]:n;return o&&(r=""),un(e,t)?rn(e,h,t):r}return T.call(n,function(e){if(!Y(e))return u?"":i;_(t)?nn(t,function(n,t){rn(e,m,c+t,n)}):U(r)?nn(en(t),function(n){n=c+n;un(e,n)&&rn(e,l,n)}):"src"===t?e.src=r:rn(e,m,t,r)})}function un(n,t){return Y(n)&&rn(n,p,t)}function cn(n,r,i){return T.call(n,function(n,t){var e;Y(n)&&(e=n.classList,Q(r)&&(r=r(rn(n,h,"class"),t)),e&&J(r)&&(t=r.trim().split(" "),G(i)?t.map(function(n){e.toggle(n)}):e[i].apply(e,t)))})}function fn(t,n){var e=0;return F(t)&&F(n)?t!==n&&t.contains(n):B(t)?-1!==t.indexOf(n):(J(t)&&nn(en(n),function(n){-1!==t.indexOf(n)&&e++}),0<e)}function an(n){return n.replace(/[.*+\-?^${}()|[\]\\]/g,"\\$&")}function ln(t,n){var e=0;return J(t)&&nn(en(n),function(n){t.startsWith(n)&&e++}),0<e}function sn(n){return n.replace(/\\s+/g," ").trim()}function dn(n,t){return F(n)&&J(t)?n.closest(t):null}function pn(n,t){return!!F(n)&&(J(t)?n.matches(t):F(t)&&n===t)}function hn(t,n){return!(!t||!t.nodeName)&&r.call(en(n),function(n){return t.nodeName.toLowerCase()===n.toLowerCase()})}function mn(n,t,e){if(Y(n))return J(t)&&ln(t,">")&&(fn(t,":scope")||(t=":scope "+t)),G(e)&&J(t)?n.querySelector(t)||[]:function(n,t){var e=en(n);{var r;J(n)&&(r=(t=xn(t)).querySelector(n),e=U(r)?[]:t.querySelectorAll(n))}return u.slice.call(e)}(t,n);return[]}function vn(n,t){return mn(n,t,1)}function yn(n){return F(n)&&n.currentStyle||!G(i.documentMode)}function gn(){return o.devicePixelRatio||1}function bn(){return o.innerWidth||i.documentElement[y]||o.screen[v]}function En(n,t,e,r,i,o){return Sn(n,t,e,r,i,o,d)}function wn(n,t,e,r,i,o){return Sn(n,t,e,r,i,o,l)}function Cn(n){return n.decoded||n.complete}function Sn(n,t,e,c,r,f,a){var i,o=c,l=yn();c=J(e)?(i=fn(t,["touchstart",g,"wheel"]),G(r)&&(r=!l&&{capture:!i,passive:i}),function(n){var t=n.target;if(pn(t,e))o.call(t,n);else for(;t&&t!==this;){if(pn(t,e)){o.call(t,n);break}t=t.parentElement||t.parentNode}}):(f=r,r=o,e);return T.call(n,function(i){var o,u;Z(i)&&(o=!1,u=r||!1,_(r)&&(u=s({capture:!1,passive:!0},r),o=u.once||!1),nn(t.trim().split(" "),function(n){f=f||ln(n,["blazy.","bio."]);var t=a===d,e=(f?n:n.split(".")[0]).trim(),r=c=c||j[n];Q(c)&&(o&&t&&l&&(t=!(c=function n(){i.removeEventListener(e,n,u),r.apply(this,arguments)})),i[a+"EventListener"](e,c,u)),t?j[n]=c:delete j[n]}))})}function On(n){function t(){return setTimeout(n,0,N)}return"loading"!==i.readyState?t():i.addEventListener("DOMContentLoaded",t),this}function xn(n){return J(n=n||i)&&(n=pn(n,"html")?i:i.querySelector(n)),pn(n,"html")&&(n=i),Y(n=jn(n))&&n.children&&n.children.length||X(n)?n:i}function jn(n){var t=f&&n instanceof o.jQuery,e=a&&n instanceof o.cash;return n&&(H(n)||t||e)?n[0]:n}function zn(n){return C.test(n)}function Ln(n,t,e){if(F(n)){var r=n[e];if(G(t))return r;for(;r;){if(pn(r,t)||hn(r,t))return r;r=r[e]}}return null}function An(n,t){return Ln(n,t,"parentElement")}function In(n,t,e){return Ln(n,t,e+"ElementSibling")}function Nn(n,t){return In(n,t,"previous")}function Tn(e,n,r){return n.filter(function(n){var t=pn(n,e);return t&&r&&r(n),t})}function Mn(n,t){return vn(xn(t),n)}function Pn(n){return"["+O+'~="'+n+'"]'}function Wn(n,t){var e=t.add,r=t.remove,i=[];un(n,O)&&nn(on(n,O).trim().split(S),function(n){fn(i,n)||n===r||i.push(n)}),e&&!fn(i,e)&&i.push(e);e=i.join(" ");rn(n,""===e?l:m,O,e)}function Rn(n,t){return Mn(n?Pn(n):"["+O+"]",t)}N.isTag=M,N.isArr=B,N.isBool=D,N.isDoc=X,N.isElm=F,N.isFun=Q,N.isEmpty=$,N.isNull=U,N.isNum=V,N.isObj=_,N.isStr=J,N.isUnd=G,N.isEvt=Z,N.isQsa=Y,N.isIo="Intersection"+E in o,N.isMo="Mutation"+E in o,N.isRo="Resize"+E in o,N.isNativeLazy="loading"in HTMLImageElement.prototype,N.isAmd="function"==typeof define&&define.amd,N.isWin=K,N._er=-1,N._ok=1,N.chain=function(n,t){return T.call(n,t)},N.each=nn,N.extend=s,I.extend=function(n,t){return(t=t||!1)?s(n,I):s(I,n)},N.hasProp=tn,N.parse=function(n){try{return 0===n.length||"1"===n?{}:JSON.parse(n)}catch(n){return{}}},N.toArray=en,N.hasAttr=un,N.attr=on.bind(N),N.removeAttr=function(n,t,e){return on(n,t,null,e||"")}.bind(N),N.hasClass=function(e,n){var r,i=0;return Y(e)&&J(n)&&(n=n.trim(),r=e.classList,nn(n.trim().split(" "),function(n){var t;r&&r.contains(n)&&i++,0!==i||(t=on(e,"class"))&&t.match(n)&&i++})),0<i},N.toggleClass=cn,N.addClass=function(n,t){return cn(n,t,d)},N.removeClass=function(n,t){return cn(n,t,l)},N.contains=fn,N.escape=an,N.startsWith=ln,N.trimSpaces=sn,N.closest=dn,N.is=pn,N.equal=hn,N.find=mn,N.findAll=vn,N.remove=function(n){var t;!F(n)||(t=An(n))&&t.removeChild(n)},N.ie=yn,N.pixelRatio=gn,N.windowWidth=bn,N.windowSize=function(){return{width:bn(),height:o.innerHeight||i.documentElement.clientHeight}},N.activeWidth=function(t,n){var e=n.up||!1,r=q(t),i=r[0],o=r[r.length-1],u=n.ww||bn(),n=u*gn(),c=e?u:n;return G(r=r.filter(function(n){return e?parseInt(n,10)<=c:parseInt(n,10)>=c}).map(function(n){return t[n]})[e?"pop":"shift"]())?t[o<=c?o:i]:r},N.toEvent=Sn,N.on=En,N.off=wn,N.one=function(n,t,e,r){return En(n,t,e,{once:!0},r)},N.trigger=function(n,e,r,i){return T.call(n,function(n){var t;return Z(n)&&(t=G(r)?new Event(e):(t={bubbles:!0,cancelable:!0,detail:r||{}},_(i)&&(t=s(t,i)),new CustomEvent(e,t)),n.dispatchEvent(t)),t})},N.isDecoded=Cn,N.ready=On.bind(N),N.decode=function(e){return Cn(e)?Promise.resolve(e):"decode"in e?(e.decoding="async",e.decode()):new Promise(function(n,t){e.onload=function(){n(e)},e.onerror=t()})},N.once=function(n,t,e,r){var i,o=[];return J(n)?Rn(n,t):(G(e)||(o=Tn(":not("+Pn(i=t)+")",Mn(e,r),function(n){Wn(n,{add:i})})).length&&nn(o,n),o)},N.throttle=function(t,e,r){e=e||50;var i=0;return function(){var n=+new Date;n-i<e||(i=n,t.apply(r,arguments))}},N.resize=function(t,e){return o.onresize=function(n){clearTimeout(e),e=setTimeout(t.bind(n),200)},t},N.template=function(n,t){for(var e in t)tn(t,e)&&(n=n.replace(new RegExp(an("$"+e),"g"),t[e]));return sn(n)},N.context=xn,N.toElm=jn,N.camelCase=function(n){return n.replace(w,function(n,t){return t.toUpperCase()})},N.isVar=zn,N.computeStyle=function(n,t,e){if(F(n)){var r=getComputedStyle(n,null);return G(t)?r:e||zn(t)?r.getPropertyValue(t)||null:r[t]||n.style[t]}},N.rect=function(n){return F(n)?n.getBoundingClientRect():{}},N.empty=function(n){return T.call(n,function(n){if(F(n))for(;n.firstChild;)n.removeChild(n.firstChild)})},N.parent=An,N.next=function(n,t){return In(n,t,"next")},N.prev=Nn,N.index=function(t,n){var e=0;if(F(t))for(G(n)||nn(en(n),function(n){n=dn(t,n);if(F(n))return t=n,!1});!U(t=Nn(t));)e++;return e},N.keys=q,N.create=function(n,t,e){var r=i.createElement(n);return(J(t)||_(t))&&(J(t)?r.className=t:on(r,t)),e&&(e=e.trim(),r.innerHTML=e,"template"===n&&(r=r.content.firstChild||r)),r},N.storage=function(t,e,n,r){if(x){if(G(e))return x.getItem(t);if(U(e))x.removeItem(t);else try{x.setItem(t,e)}catch(n){x.removeItem(t),r&&x.setItem(t,e)}}return n||!1},E={chain:function(n){return T.call(this,n)},each:function(n){return nn(this,n)},ready:function(n){return On.call(this,n)}},I.extend(E),N.matches=pn,N.forEach=nn,N.bindEvent=En.bind(N),N.unbindEvent=wn.bind(N),N.filter=Tn,N.once.find||(N.once.find=Rn,N.once.filter=function(n,t,e){return Tn(Pn(n),Mn(t,e))},N.once.remove=function(t,n,e){return Tn(Pn(t),Mn(n,e),function(n){Wn(n,{remove:t})})},N.once.removeSafely=function(n,t,e){var r=o.jQuery;this.find(n,e).length&&this.remove(n,t,e),f&&r&&r.fn&&Q(r.fn.removeOnce)&&r(t,xn(e)).removeOnce(n)}),"undefined"!=typeof exports?module.exports=N:o.dBlazy=N}(this,this.document);

/* Source and licensing information for the above line(s) can be found at https://service-lux.by/modules/contrib/blazy/js/dblazy.min.js. */;
/* Source and licensing information for the line(s) below can be found at https://service-lux.by/modules/contrib/blazy/js/plugin/blazy.dataset.min.js. */
!function(i){"use strict";function r(t,n,a){return i.chain(t,function(e){i.isElm(e)&&i.each(i.toArray(n),function(t){var n,r="data-"+t;i.hasAttr(e,r)&&((n=i.attr(e,r))&&n.length&&i.attr(e,t,n),a&&i.removeAttr(e,r))})})}function e(t,a,u,c){i.isUnd(c)&&(c=!0);return i.chain(t,function(t){var n,r,e;i.isElm(t)&&(n=t.parentNode,r=i.equal(n,"picture"),e=null,c?e=r?n:t:r&&(e=n),i.isElm(e)&&(e=e.getElementsByTagName("source"),a=a||(r?"srcset":"src"),e.length&&i(e).mapAttr(a,u)))})}i.mapAttr=r,i.fn.mapAttr=function(t,n){return r(this,t,n)},i.mapSource=e,i.fn.mapSource=function(t,n,r){return e(this,t,n,r)}}(dBlazy);

/* Source and licensing information for the above line(s) can be found at https://service-lux.by/modules/contrib/blazy/js/plugin/blazy.dataset.min.js. */;
/* Source and licensing information for the line(s) below can be found at https://service-lux.by/modules/contrib/blazy/js/plugin/blazy.viewport.min.js. */
!function(n,o,r){"use strict";function i(t){t=t||0;var i=n.windowSize();return{top:0-t,left:0-t,bottom:i.height+t,right:i.width+t}}n.ww=0,n.vp={top:0,right:0,bottom:0,left:0},n.isVisible=function(t,i){var e=t.target||t;return n.isIo?t.isIntersecting||0<t.intersectionRatio:(e=e,i=i,(e=n.isElm(e)?n.rect(e):e).right>=i.left&&e.bottom>=i.top&&e.left<=i.right&&e.top<=i.bottom)},n.isResized=function(t,i){return!!i.contentRect||!!t.resizeTrigger||!1},n.viewport=i,n.windowData=function(t,i){var e=this,n=t.offset||100,o=t.mobileFirst||!1;return i&&e.initViewport(t),e.ww=e.vp.right-n,{vp:e.vp,ww:e.ww,up:o}},n.initViewport=function(t){return this.vp=i(t.offset),this.vp},n.updateViewport=function(t){var i=this,e=t.offset;return i.vp.bottom=(o.innerHeight||r.documentElement.clientHeight)+e,i.vp.right=(o.innerWidth||r.documentElement.clientWidth)+e,i.windowData(t)}}(dBlazy,this,this.document);

/* Source and licensing information for the above line(s) can be found at https://service-lux.by/modules/contrib/blazy/js/plugin/blazy.viewport.min.js. */;
/* Source and licensing information for the line(s) below can be found at https://service-lux.by/modules/contrib/blazy/js/plugin/blazy.dom.min.js. */
!function(c,n){"use strict";var t=Array.prototype.some,u="remove",h="width",l="height",e="after",r="before",i="begin",o="Top",s="Left",f="Height",a="scroll";function d(t,n,r){var i=this,e=c.isUnd(r),u=c.isObj(n),o=!u&&e;if(o&&c.isStr(n)){var s=t&&t.length?t[0]:t,f=[h,l,"top","right","bottom","left"],e=c.computeStyle(s,n),s=c.isNum(e)?parseInt(e,2):e;return-1===f.indexOf(n)?e:s}return c.chain(t,function(e){if(!c.isElm(e))return o?"":i;function t(t,n){c.isFun(t)&&(t=t()),(c.contains(n,"-")||c.isVar(n))&&(n=c.camelCase(n)),e.style[n]=c.isStr(t)?t:t+"px"}u?c.each(n,t):c.isNull(r)?c.each(c.toArray(n),function(t){e.style.removeProperty(t)}):c.isStr(n)&&t(r,n)})}function p(t){t=c.rect(t);return{top:(t.top||0)+n.body[a+o],left:(t.left||0)+n.body[a+s]}}function m(t,n){return d(t,h,n)}function g(t,n){return d(t,l,n)}function v(t,n,e){var r,i=0;return c.isElm(t)&&(i=t["offset"+e],n&&(r=c.computeStyle(t),t=function(t){return parseInt(r["margin"+t],2)},i+=e===f?t(o)+t("Bottom"):t(s)+t("Right"))),i}function y(t,n){return v(t,n,"Width")}function A(t,n){return v(t,n,f)}function C(t,n,e){c.isElm(t)&&t["insertAdjacent"+(c.isElm(n)?"Element":"HTML")](e,n)}function b(t,n){C(t,n,e+"end")}function x(t,n){C(t,n,r+i)}function S(t,n){C(t,n,r+"end")}function E(t,n){C(t,n,e+i)}function H(t,n){c.isUnd(n)&&(n=!0);return c.chain(t,function(t){return c.isElm(t)&&t.cloneNode(n)})}var N={css:function(t,n){return d(this,t,n)},hasAttr:function(n){return t.call(this,function(t){return c.hasAttr(t,n)})},attr:function(t,n,e){return c.isNull(n)?this.removeAttr(t,e):c.attr(this,t,n,e)},removeAttr:function(t,n){return c.removeAttr(this,t,n)},hasClass:function(n){return t.call(this,function(t){return c.hasClass(t,n)})},toggleClass:function(t,n){return c.toggleClass(this,t,n)},addClass:function(t){return this.toggleClass(t,"add")},removeClass:function(t){return arguments.length?this.toggleClass(t,u):this.attr("class","")},empty:function(){return c.empty(this)},first:function(t){return c.isUnd(t)?this[0]:t},after:function(t){return b(this[0],t)},before:function(t){return x(this[0],t)},append:function(t){return S(this[0],t)},prepend:function(t){return E(this[0],t)},remove:function(){this.each(c.remove)},closest:function(t){return c.closest(this[0],t)},equal:function(t){return c.equal(this[0],t)},find:function(t,n){return c.find(this[0],t,n)},findAll:function(t){return c.findAll(this[0],t)},clone:function(t){return H(this,t)},computeStyle:function(t){return c.computeStyle(this[0],t)},offset:function(){return p(this[0])},parent:function(t){return c.parent(this[0],t)},prev:function(t){return c.prev(this[0],t)},next:function(t){return c.next(this[0],t)},index:function(t){return c.index(this[0],t)},width:function(t){return m(this[0],t)},height:function(t){return g(this[0],t)},outerWidth:function(t){return y(this[0],t)},outerHeight:function(t){return A(this[0],t)},on:function(t,n,e,r,i){return c.on(this,t,n,e,r,i,"add")},off:function(t,n,e,r,i){return c.off(this,t,n,e,r,i,u)},one:function(t,n,e){return c.one(this,t,n,e)},trigger:function(t,n,e){return c.trigger(this,t,n,e)}};c.fn.extend(N),c.css=d,c.offset=p,c.clone=H,c.after=b,c.before=x,c.append=S,c.prepend=E,c.width=m,c.height=g,c.outerWidth=y,c.outerHeight=A}(dBlazy,this.document);

/* Source and licensing information for the above line(s) can be found at https://service-lux.by/modules/contrib/blazy/js/plugin/blazy.dom.min.js. */;
/* Source and licensing information for the line(s) below can be found at https://service-lux.by/modules/contrib/blazy/js/plugin/blazy.xlazy.min.js. */
!function(l,n,s){"use strict";var d="blazy",f=0,g="data-",r=g+"animation",m="src",b=["srcset",m],t="b-bg";function i(s,e){return s=s.target||s,l.hasClass(s,e)}l._defaults={error:!1,offset:100,root:s,success:!1,selector:".b-lazy",separator:"|",container:!1,containerClass:!1,errorClass:"b-error",loadInvisible:!1,successClass:"b-loaded",visibleClass:!1,validateDelay:25,saveViewportOffsetDelay:50,srcset:"data-srcset",src:"data-src",bgClass:t,isMedia:!1,parent:".media",disconnect:!1,intersecting:!1,observing:!1,resizing:!1,mobileFirst:!1,rootMargin:"0px",threshold:[0]},l.isCompleted=function(s){if(l.isElm(s)){if(l.equal(s,"img"))return l.isDecoded(s);if(l.equal(s,"iframe"))return"complete"===(s.contentDocument||s.contentWindow.document).readyState}return!1},l.isBg=function(s,e){return i(s,e&&e.bgClass||t)},l.isBlur=function(s){return i(s,"b-blur")},l.selector=function(s,e){var r=s.selector;return e&&l.isBool(e)&&(e=":not(."+s.successClass+")"),r+(e=e||"")},l.success=function(s,e,r,t){return l.isFun(t.success)&&t.success(s,e,r,t),0<f&&f--,f},l.error=function(s,e,r,t){return l.isFun(t.error)&&t.error(s,e,r,t),++f},l.status=function(s,e,r){return this.loaded(s,e,null,r)},l.loaded=function(s,e,r,t){var n=l.closest(s,t.parent)||s,i=e===l._ok||!0===e,a=t.successClass,o=t.errorClass,c="is-"+a,u="is-"+o;return r=r||n,l.addClass(s,i?a:o),l.addClass(n,i?c:u),l.removeClass(n,"is-b-visible"),f=this[i?"success":"error"](s,e,r,t),i&&l.hasAttr(s,g+m)&&l.removeAttr(s,b,g),l.trigger(s,d+".loaded",{status:e}),f},l.loadVideo=function(s,e,r){return l.mapSource(s,m,!0),s.load(),l.status(s,e,r)},l.onresizing=function(s,e){var r=s.elms,t=s.options;l.isFun(t.resizing)&&t.resizing(s,r,e),l.trigger(n,d+".resizing",{winData:e,entries:r})},l.aniElement=function(s){var e=l.closest(s,"["+r+"]");return l.hasAttr(s,r)&&!l.isElm(e)&&(e=s),e}}(dBlazy,this,this.document);

/* Source and licensing information for the above line(s) can be found at https://service-lux.by/modules/contrib/blazy/js/plugin/blazy.xlazy.min.js. */;
/* Source and licensing information for the line(s) below can be found at https://service-lux.by/modules/contrib/blazy/js/plugin/blazy.observer.min.js. */
!function(l,s){"use strict";l.enqueue=function(n,e,r){l.each(n,e.bind(r)),n.length=0},l.initObserver=function(r,n,e,i){var t,o=r.options||{},a=r._queue||[],s="windowData"in r?r.windowData():{},u={rootMargin:o.rootMargin||"0px",threshold:o.threshold||0};function c(n){var e;return a.length||(e=requestAnimationFrame(h),r._raf.push(e)),a.push(n),!1}function h(){l.enqueue(a,n,r)}e=l.toArray(e),i&&(r.ioObserver=l.isIo?new IntersectionObserver(c,u):n.call(r,e));return r.roObserver=function(){return t=this,s=l.isUnd(s.ww)?l.windowData(o,!0):r.windowData(),l.isRo?new ResizeObserver(c):n.call(r,e)}(),r.resizeTrigger=t,s},l.observe=function(n,r,e){function i(e){e&&r&&r.length&&l.each(r,function(n){e.observe(n)})}var t=n.options||{},o=n.ioObserver,a=n.roObserver;return l.isIo&&(o||a)?(e&&i(o),i(a)):"Blazy"in s&&(n.bLazy=new Blazy(t)),n},l.unload=function(n){n=n._raf;n&&n.length&&l.each(n,function(n){cancelAnimationFrame(n)})}}(dBlazy,this);

/* Source and licensing information for the above line(s) can be found at https://service-lux.by/modules/contrib/blazy/js/plugin/blazy.observer.min.js. */;