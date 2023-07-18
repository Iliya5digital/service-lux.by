/* Source and licensing information for the line(s) below can be found at https://service-lux.by/modules/contrib/responsive_menu/js/responsive_menu.config.js. */
(function () {

  'use strict';

  /**
   * Provides the off-canvas menu.
   *
   * @type {Drupal~behavior}
   *
   * @prop {Drupal~behaviorAttach} attach
   *   Attaches the behavior for the off-canvas menu.
   */
  Drupal.behaviors.responsive_menu_mmenu = {
    attach: function (context) {

      const mmenuId = '#off-canvas';
      const offCanvas = document.querySelector(mmenuId)

      // The instatiation of the mmenu must only happen once.
      if (offCanvas && !offCanvas.hasOwnProperty('mmApi') && typeof (Mmenu) !== 'undefined') {
        const settings = drupalSettings.responsive_menu;
        const position = settings.position,
          theme = settings.theme,
          pagedim = settings.pagedim;

        const options = {
          extensions: [
            theme,
            'fx-menu-slide',
            position === 'left' ? 'position-left' : 'position-right'
          ],
          keyboardNavigation: {
            enable: true,
            enhance: true,
          },
          drag: {
            open: settings.drag
          }
        };

        if (pagedim !== 'none') {
          options.extensions.push(pagedim);
        }

        const config = {
          classNames: {
            selected: 'menu-item--active-trail'
          }
        };

        // Allow the settings and options to be extended or overridden.
        if (typeof settings.custom !== 'undefined') {
          if (typeof settings.custom.options !== 'undefined') {
            extend(options, drupalSettings.responsive_menu.custom.options);
          }
          if (typeof drupalSettings.responsive_menu.custom.config !== 'undefined') {
            extend(config, drupalSettings.responsive_menu.custom.config);
          }
        }

        // Set up the off canvas menu.
        const mmenu = new Mmenu(mmenuId, options, config);

        // Due to a rendering issue with Chrome the page needs the viewport
        // metatag to have a value including initial-scale=1.0 otherwise it
        // won't render properly.
        // @see issue #3153145
        const mmenuApi = mmenu.API;
        const viewports = document.getElementsByName('viewport');

        if (viewports.length !== 0 && settings.modifyViewport) {
          const viewportMeta = viewports[0]
          const defaultViewport = viewports[0].content
          const staticViewport = "width=device-width, initial-scale=1.0, minimum-scale=1.0";

          mmenuApi.bind('open:start', function() {
            viewportMeta.setAttribute('content', staticViewport);
          });
          mmenuApi.bind('close:start', function() {
            viewportMeta.setAttribute('content', defaultViewport);
          });
        }
      }
    }
  };
})();

/**
 * Similar to the jQuery extend but shallow.
 *
 * @param out
 * @returns {*|{}}
 */
const extend = function (out) {
  out = out || {};

  for (let i = 1; i < arguments.length; i++) {
    if (!arguments[i])
      continue;

    for (let key in arguments[i]) {
      if (arguments[i].hasOwnProperty(key))
        out[key] = arguments[i][key];
    }
  }

  return out;
};

/* Source and licensing information for the above line(s) can be found at https://service-lux.by/modules/contrib/responsive_menu/js/responsive_menu.config.js. */;
/* Source and licensing information for the line(s) below can be found at https://service-lux.by/libraries/colorbox/jquery.colorbox-min.js. */
/*!
	Colorbox 1.6.4
	license: MIT
	http://www.jacklmoore.com/colorbox
*/
(function(t,e,i){function n(i,n,o){var r=e.createElement(i);return n&&(r.id=Z+n),o&&(r.style.cssText=o),t(r)}function o(){return i.innerHeight?i.innerHeight:t(i).height()}function r(e,i){i!==Object(i)&&(i={}),this.cache={},this.el=e,this.value=function(e){var n;return void 0===this.cache[e]&&(n=t(this.el).attr("data-cbox-"+e),void 0!==n?this.cache[e]=n:void 0!==i[e]?this.cache[e]=i[e]:void 0!==X[e]&&(this.cache[e]=X[e])),this.cache[e]},this.get=function(e){var i=this.value(e);return t.isFunction(i)?i.call(this.el,this):i}}function h(t){var e=W.length,i=(A+t)%e;return 0>i?e+i:i}function a(t,e){return Math.round((/%/.test(t)?("x"===e?E.width():o())/100:1)*parseInt(t,10))}function s(t,e){return t.get("photo")||t.get("photoRegex").test(e)}function l(t,e){return t.get("retinaUrl")&&i.devicePixelRatio>1?e.replace(t.get("photoRegex"),t.get("retinaSuffix")):e}function d(t){"contains"in x[0]&&!x[0].contains(t.target)&&t.target!==v[0]&&(t.stopPropagation(),x.focus())}function c(t){c.str!==t&&(x.add(v).removeClass(c.str).addClass(t),c.str=t)}function g(e){A=0,e&&e!==!1&&"nofollow"!==e?(W=t("."+te).filter(function(){var i=t.data(this,Y),n=new r(this,i);return n.get("rel")===e}),A=W.index(_.el),-1===A&&(W=W.add(_.el),A=W.length-1)):W=t(_.el)}function u(i){t(e).trigger(i),ae.triggerHandler(i)}function f(i){var o;if(!G){if(o=t(i).data(Y),_=new r(i,o),g(_.get("rel")),!U){U=$=!0,c(_.get("className")),x.css({visibility:"hidden",display:"block",opacity:""}),I=n(se,"LoadedContent","width:0; height:0; overflow:hidden; visibility:hidden"),b.css({width:"",height:""}).append(I),j=T.height()+k.height()+b.outerHeight(!0)-b.height(),D=C.width()+H.width()+b.outerWidth(!0)-b.width(),N=I.outerHeight(!0),z=I.outerWidth(!0);var h=a(_.get("initialWidth"),"x"),s=a(_.get("initialHeight"),"y"),l=_.get("maxWidth"),f=_.get("maxHeight");_.w=Math.max((l!==!1?Math.min(h,a(l,"x")):h)-z-D,0),_.h=Math.max((f!==!1?Math.min(s,a(f,"y")):s)-N-j,0),I.css({width:"",height:_.h}),J.position(),u(ee),_.get("onOpen"),O.add(F).hide(),x.focus(),_.get("trapFocus")&&e.addEventListener&&(e.addEventListener("focus",d,!0),ae.one(re,function(){e.removeEventListener("focus",d,!0)})),_.get("returnFocus")&&ae.one(re,function(){t(_.el).focus()})}var p=parseFloat(_.get("opacity"));v.css({opacity:p===p?p:"",cursor:_.get("overlayClose")?"pointer":"",visibility:"visible"}).show(),_.get("closeButton")?B.html(_.get("close")).appendTo(b):B.appendTo("<div/>"),w()}}function p(){x||(V=!1,E=t(i),x=n(se).attr({id:Y,"class":t.support.opacity===!1?Z+"IE":"",role:"dialog",tabindex:"-1"}).hide(),v=n(se,"Overlay").hide(),L=t([n(se,"LoadingOverlay")[0],n(se,"LoadingGraphic")[0]]),y=n(se,"Wrapper"),b=n(se,"Content").append(F=n(se,"Title"),R=n(se,"Current"),P=t('<button type="button"/>').attr({id:Z+"Previous"}),K=t('<button type="button"/>').attr({id:Z+"Next"}),S=t('<button type="button"/>').attr({id:Z+"Slideshow"}),L),B=t('<button type="button"/>').attr({id:Z+"Close"}),y.append(n(se).append(n(se,"TopLeft"),T=n(se,"TopCenter"),n(se,"TopRight")),n(se,!1,"clear:left").append(C=n(se,"MiddleLeft"),b,H=n(se,"MiddleRight")),n(se,!1,"clear:left").append(n(se,"BottomLeft"),k=n(se,"BottomCenter"),n(se,"BottomRight"))).find("div div").css({"float":"left"}),M=n(se,!1,"position:absolute; width:9999px; visibility:hidden; display:none; max-width:none;"),O=K.add(P).add(R).add(S)),e.body&&!x.parent().length&&t(e.body).append(v,x.append(y,M))}function m(){function i(t){t.which>1||t.shiftKey||t.altKey||t.metaKey||t.ctrlKey||(t.preventDefault(),f(this))}return x?(V||(V=!0,K.click(function(){J.next()}),P.click(function(){J.prev()}),B.click(function(){J.close()}),v.click(function(){_.get("overlayClose")&&J.close()}),t(e).bind("keydown."+Z,function(t){var e=t.keyCode;U&&_.get("escKey")&&27===e&&(t.preventDefault(),J.close()),U&&_.get("arrowKey")&&W[1]&&!t.altKey&&(37===e?(t.preventDefault(),P.click()):39===e&&(t.preventDefault(),K.click()))}),t.isFunction(t.fn.on)?t(e).on("click."+Z,"."+te,i):t("."+te).live("click."+Z,i)),!0):!1}function w(){var e,o,r,h=J.prep,d=++le;if($=!0,q=!1,u(he),u(ie),_.get("onLoad"),_.h=_.get("height")?a(_.get("height"),"y")-N-j:_.get("innerHeight")&&a(_.get("innerHeight"),"y"),_.w=_.get("width")?a(_.get("width"),"x")-z-D:_.get("innerWidth")&&a(_.get("innerWidth"),"x"),_.mw=_.w,_.mh=_.h,_.get("maxWidth")&&(_.mw=a(_.get("maxWidth"),"x")-z-D,_.mw=_.w&&_.w<_.mw?_.w:_.mw),_.get("maxHeight")&&(_.mh=a(_.get("maxHeight"),"y")-N-j,_.mh=_.h&&_.h<_.mh?_.h:_.mh),e=_.get("href"),Q=setTimeout(function(){L.show()},100),_.get("inline")){var c=t(e).eq(0);r=t("<div>").hide().insertBefore(c),ae.one(he,function(){r.replaceWith(c)}),h(c)}else _.get("iframe")?h(" "):_.get("html")?h(_.get("html")):s(_,e)?(e=l(_,e),q=_.get("createImg"),t(q).addClass(Z+"Photo").bind("error."+Z,function(){h(n(se,"Error").html(_.get("imgError")))}).one("load",function(){d===le&&setTimeout(function(){var e;_.get("retinaImage")&&i.devicePixelRatio>1&&(q.height=q.height/i.devicePixelRatio,q.width=q.width/i.devicePixelRatio),_.get("scalePhotos")&&(o=function(){q.height-=q.height*e,q.width-=q.width*e},_.mw&&q.width>_.mw&&(e=(q.width-_.mw)/q.width,o()),_.mh&&q.height>_.mh&&(e=(q.height-_.mh)/q.height,o())),_.h&&(q.style.marginTop=Math.max(_.mh-q.height,0)/2+"px"),W[1]&&(_.get("loop")||W[A+1])&&(q.style.cursor="pointer",t(q).bind("click."+Z,function(){J.next()})),q.style.width=q.width+"px",q.style.height=q.height+"px",h(q)},1)}),q.src=e):e&&M.load(e,_.get("data"),function(e,i){d===le&&h("error"===i?n(se,"Error").html(_.get("xhrError")):t(this).contents())})}var v,x,y,b,T,C,H,k,W,E,I,M,L,F,R,S,K,P,B,O,_,j,D,N,z,A,q,U,$,G,Q,J,V,X={html:!1,photo:!1,iframe:!1,inline:!1,transition:"elastic",speed:300,fadeOut:300,width:!1,initialWidth:"600",innerWidth:!1,maxWidth:!1,height:!1,initialHeight:"450",innerHeight:!1,maxHeight:!1,scalePhotos:!0,scrolling:!0,opacity:.9,preloading:!0,className:!1,overlayClose:!0,escKey:!0,arrowKey:!0,top:!1,bottom:!1,left:!1,right:!1,fixed:!1,data:void 0,closeButton:!0,fastIframe:!0,open:!1,reposition:!0,loop:!0,slideshow:!1,slideshowAuto:!0,slideshowSpeed:2500,slideshowStart:"start slideshow",slideshowStop:"stop slideshow",photoRegex:/\.(gif|png|jp(e|g|eg)|bmp|ico|webp|jxr|svg)((#|\?).*)?$/i,retinaImage:!1,retinaUrl:!1,retinaSuffix:"@2x.$1",current:"image {current} of {total}",previous:"previous",next:"next",close:"close",xhrError:"This content failed to load.",imgError:"This image failed to load.",returnFocus:!0,trapFocus:!0,onOpen:!1,onLoad:!1,onComplete:!1,onCleanup:!1,onClosed:!1,rel:function(){return this.rel},href:function(){return t(this).attr("href")},title:function(){return this.title},createImg:function(){var e=new Image,i=t(this).data("cbox-img-attrs");return"object"==typeof i&&t.each(i,function(t,i){e[t]=i}),e},createIframe:function(){var i=e.createElement("iframe"),n=t(this).data("cbox-iframe-attrs");return"object"==typeof n&&t.each(n,function(t,e){i[t]=e}),"frameBorder"in i&&(i.frameBorder=0),"allowTransparency"in i&&(i.allowTransparency="true"),i.name=(new Date).getTime(),i.allowFullscreen=!0,i}},Y="colorbox",Z="cbox",te=Z+"Element",ee=Z+"_open",ie=Z+"_load",ne=Z+"_complete",oe=Z+"_cleanup",re=Z+"_closed",he=Z+"_purge",ae=t("<a/>"),se="div",le=0,de={},ce=function(){function t(){clearTimeout(h)}function e(){(_.get("loop")||W[A+1])&&(t(),h=setTimeout(J.next,_.get("slideshowSpeed")))}function i(){S.html(_.get("slideshowStop")).unbind(s).one(s,n),ae.bind(ne,e).bind(ie,t),x.removeClass(a+"off").addClass(a+"on")}function n(){t(),ae.unbind(ne,e).unbind(ie,t),S.html(_.get("slideshowStart")).unbind(s).one(s,function(){J.next(),i()}),x.removeClass(a+"on").addClass(a+"off")}function o(){r=!1,S.hide(),t(),ae.unbind(ne,e).unbind(ie,t),x.removeClass(a+"off "+a+"on")}var r,h,a=Z+"Slideshow_",s="click."+Z;return function(){r?_.get("slideshow")||(ae.unbind(oe,o),o()):_.get("slideshow")&&W[1]&&(r=!0,ae.one(oe,o),_.get("slideshowAuto")?i():n(),S.show())}}();t[Y]||(t(p),J=t.fn[Y]=t[Y]=function(e,i){var n,o=this;return e=e||{},t.isFunction(o)&&(o=t("<a/>"),e.open=!0),o[0]?(p(),m()&&(i&&(e.onComplete=i),o.each(function(){var i=t.data(this,Y)||{};t.data(this,Y,t.extend(i,e))}).addClass(te),n=new r(o[0],e),n.get("open")&&f(o[0])),o):o},J.position=function(e,i){function n(){T[0].style.width=k[0].style.width=b[0].style.width=parseInt(x[0].style.width,10)-D+"px",b[0].style.height=C[0].style.height=H[0].style.height=parseInt(x[0].style.height,10)-j+"px"}var r,h,s,l=0,d=0,c=x.offset();if(E.unbind("resize."+Z),x.css({top:-9e4,left:-9e4}),h=E.scrollTop(),s=E.scrollLeft(),_.get("fixed")?(c.top-=h,c.left-=s,x.css({position:"fixed"})):(l=h,d=s,x.css({position:"absolute"})),d+=_.get("right")!==!1?Math.max(E.width()-_.w-z-D-a(_.get("right"),"x"),0):_.get("left")!==!1?a(_.get("left"),"x"):Math.round(Math.max(E.width()-_.w-z-D,0)/2),l+=_.get("bottom")!==!1?Math.max(o()-_.h-N-j-a(_.get("bottom"),"y"),0):_.get("top")!==!1?a(_.get("top"),"y"):Math.round(Math.max(o()-_.h-N-j,0)/2),x.css({top:c.top,left:c.left,visibility:"visible"}),y[0].style.width=y[0].style.height="9999px",r={width:_.w+z+D,height:_.h+N+j,top:l,left:d},e){var g=0;t.each(r,function(t){return r[t]!==de[t]?(g=e,void 0):void 0}),e=g}de=r,e||x.css(r),x.dequeue().animate(r,{duration:e||0,complete:function(){n(),$=!1,y[0].style.width=_.w+z+D+"px",y[0].style.height=_.h+N+j+"px",_.get("reposition")&&setTimeout(function(){E.bind("resize."+Z,J.position)},1),t.isFunction(i)&&i()},step:n})},J.resize=function(t){var e;U&&(t=t||{},t.width&&(_.w=a(t.width,"x")-z-D),t.innerWidth&&(_.w=a(t.innerWidth,"x")),I.css({width:_.w}),t.height&&(_.h=a(t.height,"y")-N-j),t.innerHeight&&(_.h=a(t.innerHeight,"y")),t.innerHeight||t.height||(e=I.scrollTop(),I.css({height:"auto"}),_.h=I.height()),I.css({height:_.h}),e&&I.scrollTop(e),J.position("none"===_.get("transition")?0:_.get("speed")))},J.prep=function(i){function o(){return _.w=_.w||I.width(),_.w=_.mw&&_.mw<_.w?_.mw:_.w,_.w}function a(){return _.h=_.h||I.height(),_.h=_.mh&&_.mh<_.h?_.mh:_.h,_.h}if(U){var d,g="none"===_.get("transition")?0:_.get("speed");I.remove(),I=n(se,"LoadedContent").append(i),I.hide().appendTo(M.show()).css({width:o(),overflow:_.get("scrolling")?"auto":"hidden"}).css({height:a()}).prependTo(b),M.hide(),t(q).css({"float":"none"}),c(_.get("className")),d=function(){function i(){t.support.opacity===!1&&x[0].style.removeAttribute("filter")}var n,o,a=W.length;U&&(o=function(){clearTimeout(Q),L.hide(),u(ne),_.get("onComplete")},F.html(_.get("title")).show(),I.show(),a>1?("string"==typeof _.get("current")&&R.html(_.get("current").replace("{current}",A+1).replace("{total}",a)).show(),K[_.get("loop")||a-1>A?"show":"hide"]().html(_.get("next")),P[_.get("loop")||A?"show":"hide"]().html(_.get("previous")),ce(),_.get("preloading")&&t.each([h(-1),h(1)],function(){var i,n=W[this],o=new r(n,t.data(n,Y)),h=o.get("href");h&&s(o,h)&&(h=l(o,h),i=e.createElement("img"),i.src=h)})):O.hide(),_.get("iframe")?(n=_.get("createIframe"),_.get("scrolling")||(n.scrolling="no"),t(n).attr({src:_.get("href"),"class":Z+"Iframe"}).one("load",o).appendTo(I),ae.one(he,function(){n.src="//about:blank"}),_.get("fastIframe")&&t(n).trigger("load")):o(),"fade"===_.get("transition")?x.fadeTo(g,1,i):i())},"fade"===_.get("transition")?x.fadeTo(g,0,function(){J.position(0,d)}):J.position(g,d)}},J.next=function(){!$&&W[1]&&(_.get("loop")||W[A+1])&&(A=h(1),f(W[A]))},J.prev=function(){!$&&W[1]&&(_.get("loop")||A)&&(A=h(-1),f(W[A]))},J.close=function(){U&&!G&&(G=!0,U=!1,u(oe),_.get("onCleanup"),E.unbind("."+Z),v.fadeTo(_.get("fadeOut")||0,0),x.stop().fadeTo(_.get("fadeOut")||0,0,function(){x.hide(),v.hide(),u(he),I.remove(),setTimeout(function(){G=!1,u(re),_.get("onClosed")},1)}))},J.remove=function(){x&&(x.stop(),t[Y].close(),x.stop(!1,!0).remove(),v.remove(),G=!1,x=null,t("."+te).removeData(Y).removeClass(te),t(e).unbind("click."+Z).unbind("keydown."+Z))},J.element=function(){return t(_.el)},J.settings=X)})(jQuery,document,window);
/* Source and licensing information for the above line(s) can be found at https://service-lux.by/libraries/colorbox/jquery.colorbox-min.js. */;
/* Source and licensing information for the line(s) below can be found at https://service-lux.by/modules/contrib/colorbox/js/colorbox.js. */
(function($,Drupal,drupalSettings,once){'use strict';Drupal.behaviors.initColorbox={attach:function(context,settings){if(!$.isFunction($.colorbox)||typeof settings.colorbox==='undefined')return;if(settings.colorbox.mobiledetect&&window.matchMedia){var mq=window.matchMedia('(max-device-width: '+settings.colorbox.mobiledevicewidth+')');if(mq.matches){$.colorbox.remove();return}};settings.colorbox.rel=function(){return $(this).data('colorbox-gallery')};$(once('init-colorbox','.colorbox',context)).each(function(){var extendParams={photo:true},title=$(this).attr('title');if(title)extendParams.title=Drupal.colorbox.sanitizeMarkup(title);$(this).colorbox($.extend({},settings.colorbox,extendParams))});$('.colorbox',context).colorbox({onComplete:function(e){var focus=$('#cboxContent').find('#cboxPrevious').css('display')!=='none'?$('#cboxContent').find('#cboxPrevious'):$('#cboxContent').find('#cboxClose');focus.focus();$('#cboxContent').on('keydown',function(e){var keyCode=e.keyCode||e.which,firstElement=$('#cboxContent').find('#cboxPrevious').last().is(':focus'),lastElement=$('#cboxContent').find('#cboxClose').first().is(':focus');if(keyCode===9&&!e.shiftKey&&lastElement){e.preventDefault();$('#cboxContent').find('#cboxPrevious').first().focus()}else if(keyCode===9&&e.shiftKey&&firstElement){e.preventDefault();$('#cboxContent').find('#cboxClose').first().focus()}})}})}};if(!Drupal.hasOwnProperty('colorbox'))Drupal.colorbox={};Drupal.colorbox.sanitizeMarkup=function(markup){if(typeof DOMPurify!=='undefined'){var purifyConfig={ALLOWED_TAGS:['a','b','strong','i','em','u','cite','code','br'],ALLOWED_ATTR:['href','hreflang','title','target']};if(drupalSettings.hasOwnProperty('dompurify_custom_config'))purifyConfig=drupalSettings.dompurify_custom_config;return DOMPurify.sanitize(markup,purifyConfig)}else return Drupal.checkPlain(markup)}})(jQuery,Drupal,drupalSettings,once)
/* Source and licensing information for the above line(s) can be found at https://service-lux.by/modules/contrib/colorbox/js/colorbox.js. */;
/* Source and licensing information for the line(s) below can be found at https://service-lux.by/modules/contrib/colorbox_simple_load/js/colorbox-simple-load.js. */
(function($,Drupal){'use strict';Drupal.behaviors.initColorboxSimpleLoad={attach:function(context,settings){if(!$.isFunction($.colorbox)||typeof settings.colorbox==='undefined')return;if(settings.colorbox.mobiledetect&&window.matchMedia){var mq=window.matchMedia('(max-device-width: '+settings.colorbox.mobiledevicewidth+')');if(mq.matches)return};$.urlParams=function(url){var p={},e,a=/\+/g,r=/([^&=]+)=?([^&]*)/g,d=function(s){return decodeURIComponent(s.replace(a,' '))},q=url.split('?');while(e=r.exec(q[1])){e[1]=d(e[1]);e[2]=d(e[2]);switch(e[2].toLowerCase()){case'true':case'yes':e[2]=true;break;case'false':case'no':e[2]=false;break};if(e[1]=='width')e[1]='innerWidth';if(e[1]=='height')e[1]='innerHeight';p[e[1]]=e[2]};return p};once('init-colorbox-load','.colorbox-load',context).forEach(function(element){var params=$.urlParams($(element).attr('href'));$(element).colorbox($.extend({},settings.colorbox,params))})}}})(jQuery,Drupal)
/* Source and licensing information for the above line(s) can be found at https://service-lux.by/modules/contrib/colorbox_simple_load/js/colorbox-simple-load.js. */;
/* Source and licensing information for the line(s) below can be found at https://service-lux.by/libraries/fitvids/jquery.fitvids.js. */
(function($){'use strict';$.fn.fitVids=function(options){var settings={customSelector:null,ignore:null};if(!document.getElementById('fit-vids-style')){var head=document.head||document.getElementsByTagName('head')[0],css='.fluid-width-video-wrapper{width:100%;position:relative;padding:0;}.fluid-width-video-wrapper iframe,.fluid-width-video-wrapper object,.fluid-width-video-wrapper embed {position:absolute;top:0;left:0;width:100%;height:100%;}',div=document.createElement("div");div.innerHTML='<p>x</p><style id="fit-vids-style">'+css+'</style>';head.appendChild(div.childNodes[1])};if(options)$.extend(settings,options);return this.each(function(){var selectors=['iframe[src*="player.vimeo.com"]','iframe[src*="youtube.com"]','iframe[src*="youtube-nocookie.com"]','iframe[src*="kickstarter.com"][src*="video.html"]','object','embed'];if(settings.customSelector)selectors.push(settings.customSelector);var ignoreList='.fitvidsignore';if(settings.ignore)ignoreList=ignoreList+', '+settings.ignore;var $allVideos=$(this).find(selectors.join(','));$allVideos=$allVideos.not('object object');$allVideos=$allVideos.not(ignoreList);$allVideos.each(function(){var $this=$(this);if($this.parents(ignoreList).length>0)return;if(this.tagName.toLowerCase()==='embed'&&$this.parent('object').length||$this.parent('.fluid-width-video-wrapper').length)return;if((!$this.css('height')&&!$this.css('width'))&&(isNaN($this.attr('height'))||isNaN($this.attr('width')))){$this.attr('height',9);$this.attr('width',16)};var height=(this.tagName.toLowerCase()==='object'||($this.attr('height')&&!isNaN(parseInt($this.attr('height'),10))))?parseInt($this.attr('height'),10):$this.height(),width=!isNaN(parseInt($this.attr('width'),10))?parseInt($this.attr('width'),10):$this.width(),aspectRatio=height/width;if(!$this.attr('name')){var videoName='fitvid'+$.fn.fitVids._count;$this.attr('name',videoName);$.fn.fitVids._count++};$this.wrap('<div class="fluid-width-video-wrapper"></div>').parent('.fluid-width-video-wrapper').css('padding-top',(aspectRatio*100)+'%');$this.removeAttr('height').removeAttr('width')})})};$.fn.fitVids._count=0})(window.jQuery||window.Zepto)
/* Source and licensing information for the above line(s) can be found at https://service-lux.by/libraries/fitvids/jquery.fitvids.js. */;
/* Source and licensing information for the line(s) below can be found at https://service-lux.by/modules/contrib/fitvids/js/init-fitvids.js. */
(function($,Drupal,drupalSettings){try{$(drupalSettings.fitvids.selectors).fitVids({customSelector:drupalSettings.fitvids.custom_vendors,ignore:drupalSettings.fitvids.ignore_selectors})}catch(e){window.console&&console.warn('Fitvids stopped with the following exception');window.console&&console.error(e)}})(jQuery,Drupal,drupalSettings)
/* Source and licensing information for the above line(s) can be found at https://service-lux.by/modules/contrib/fitvids/js/init-fitvids.js. */;
/* Source and licensing information for the line(s) below can be found at https://service-lux.by/core/misc/jquery.tabbable.shim.js. */
(function($,Drupal,_ref){var isTabbable=_ref.isTabbable;$.extend($.expr[':'],{tabbable:function tabbable(element){Drupal.deprecationError({message:'The :tabbable selector is deprecated in Drupal 9.2.0 and will be removed in Drupal 11.0.0. Use the core/tabbable library instead. See https://www.drupal.org/node/3183730'});if(element.tagName==='SUMMARY'||element.tagName==='DETAILS'){var tabIndex=element.getAttribute('tabIndex');if(tabIndex===null||tabIndex<0)return false};return isTabbable(element)}})})(jQuery,Drupal,window.tabbable)
/* Source and licensing information for the above line(s) can be found at https://service-lux.by/core/misc/jquery.tabbable.shim.js. */;
