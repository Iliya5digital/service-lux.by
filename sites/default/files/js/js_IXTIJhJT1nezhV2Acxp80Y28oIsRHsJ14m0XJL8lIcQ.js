/* Source and licensing information for the line(s) below can be found at https://service-lux.by/libraries/fitvids/jquery.fitvids.js. */
(function($){'use strict';$.fn.fitVids=function(options){var settings={customSelector:null,ignore:null};if(!document.getElementById('fit-vids-style')){var head=document.head||document.getElementsByTagName('head')[0],css='.fluid-width-video-wrapper{width:100%;position:relative;padding:0;}.fluid-width-video-wrapper iframe,.fluid-width-video-wrapper object,.fluid-width-video-wrapper embed {position:absolute;top:0;left:0;width:100%;height:100%;}',div=document.createElement("div");div.innerHTML='<p>x</p><style id="fit-vids-style">'+css+'</style>';head.appendChild(div.childNodes[1])};if(options)$.extend(settings,options);return this.each(function(){var selectors=['iframe[src*="player.vimeo.com"]','iframe[src*="youtube.com"]','iframe[src*="youtube-nocookie.com"]','iframe[src*="kickstarter.com"][src*="video.html"]','object','embed'];if(settings.customSelector)selectors.push(settings.customSelector);var ignoreList='.fitvidsignore';if(settings.ignore)ignoreList=ignoreList+', '+settings.ignore;var $allVideos=$(this).find(selectors.join(','));$allVideos=$allVideos.not('object object');$allVideos=$allVideos.not(ignoreList);$allVideos.each(function(){var $this=$(this);if($this.parents(ignoreList).length>0)return;if(this.tagName.toLowerCase()==='embed'&&$this.parent('object').length||$this.parent('.fluid-width-video-wrapper').length)return;if((!$this.css('height')&&!$this.css('width'))&&(isNaN($this.attr('height'))||isNaN($this.attr('width')))){$this.attr('height',9);$this.attr('width',16)};var height=(this.tagName.toLowerCase()==='object'||($this.attr('height')&&!isNaN(parseInt($this.attr('height'),10))))?parseInt($this.attr('height'),10):$this.height(),width=!isNaN(parseInt($this.attr('width'),10))?parseInt($this.attr('width'),10):$this.width(),aspectRatio=height/width;if(!$this.attr('name')){var videoName='fitvid'+$.fn.fitVids._count;$this.attr('name',videoName);$.fn.fitVids._count++};$this.wrap('<div class="fluid-width-video-wrapper"></div>').parent('.fluid-width-video-wrapper').css('padding-top',(aspectRatio*100)+'%');$this.removeAttr('height').removeAttr('width')})})};$.fn.fitVids._count=0})(window.jQuery||window.Zepto)
/* Source and licensing information for the above line(s) can be found at https://service-lux.by/libraries/fitvids/jquery.fitvids.js. */;
/* Source and licensing information for the line(s) below can be found at https://service-lux.by/modules/contrib/fitvids/js/init-fitvids.js. */
(function($,Drupal,drupalSettings){try{$(drupalSettings.fitvids.selectors).fitVids({customSelector:drupalSettings.fitvids.custom_vendors,ignore:drupalSettings.fitvids.ignore_selectors})}catch(e){window.console&&console.warn('Fitvids stopped with the following exception');window.console&&console.error(e)}})(jQuery,Drupal,drupalSettings)
/* Source and licensing information for the above line(s) can be found at https://service-lux.by/modules/contrib/fitvids/js/init-fitvids.js. */;
/* Source and licensing information for the line(s) below can be found at https://service-lux.by/core/misc/jquery.tabbable.shim.js. */
(function($,Drupal,_ref){var isTabbable=_ref.isTabbable;$.extend($.expr[':'],{tabbable:function tabbable(element){Drupal.deprecationError({message:'The :tabbable selector is deprecated in Drupal 9.2.0 and will be removed in Drupal 11.0.0. Use the core/tabbable library instead. See https://www.drupal.org/node/3183730'});if(element.tagName==='SUMMARY'||element.tagName==='DETAILS'){var tabIndex=element.getAttribute('tabIndex');if(tabIndex===null||tabIndex<0)return false};return isTabbable(element)}})})(jQuery,Drupal,window.tabbable)
/* Source and licensing information for the above line(s) can be found at https://service-lux.by/core/misc/jquery.tabbable.shim.js. */;
/* Source and licensing information for the line(s) below can be found at https://service-lux.by/core/misc/position.js. */
(function($){var cachedScrollbarWidth=null,max=Math.max,abs=Math.abs,regexHorizontal=/left|center|right/,regexVertical=/top|center|bottom/,regexOffset=/[+-]\d+(\.[\d]+)?%?/,regexPosition=/^\w+/,regexPercent=/%$/,_position=$.fn.position
function getOffsets(offsets,width,height){return[parseFloat(offsets[0])*(regexPercent.test(offsets[0])?width/100:1),parseFloat(offsets[1])*(regexPercent.test(offsets[1])?height/100:1)]}
function parseCss(element,property){return parseInt($.css(element,property),10)||0}
function getDimensions(elem){var raw=elem[0];if(raw.nodeType===9)return{width:elem.width(),height:elem.height(),offset:{top:0,left:0}};if($.isWindow(raw))return{width:elem.width(),height:elem.height(),offset:{top:elem.scrollTop(),left:elem.scrollLeft()}};if(raw.preventDefault)return{width:0,height:0,offset:{top:raw.pageY,left:raw.pageX}};return{width:elem.outerWidth(),height:elem.outerHeight(),offset:elem.offset()}};var collisions={fit:{left:function left(position,data){var within=data.within,withinOffset=within.isWindow?within.scrollLeft:within.offset.left,outerWidth=within.width,collisionPosLeft=position.left-data.collisionPosition.marginLeft,overLeft=withinOffset-collisionPosLeft,overRight=collisionPosLeft+data.collisionWidth-outerWidth-withinOffset,newOverRight;if(data.collisionWidth>outerWidth){if(overLeft>0&&overRight<=0){newOverRight=position.left+overLeft+data.collisionWidth-outerWidth-withinOffset;position.left+=overLeft-newOverRight}else if(overRight>0&&overLeft<=0){position.left=withinOffset}else if(overLeft>overRight){position.left=withinOffset+outerWidth-data.collisionWidth}else position.left=withinOffset}else if(overLeft>0){position.left+=overLeft}else if(overRight>0){position.left-=overRight}else position.left=max(position.left-collisionPosLeft,position.left)},top:function top(position,data){var within=data.within,withinOffset=within.isWindow?within.scrollTop:within.offset.top,outerHeight=data.within.height,collisionPosTop=position.top-data.collisionPosition.marginTop,overTop=withinOffset-collisionPosTop,overBottom=collisionPosTop+data.collisionHeight-outerHeight-withinOffset,newOverBottom;if(data.collisionHeight>outerHeight){if(overTop>0&&overBottom<=0){newOverBottom=position.top+overTop+data.collisionHeight-outerHeight-withinOffset;position.top+=overTop-newOverBottom}else if(overBottom>0&&overTop<=0){position.top=withinOffset}else if(overTop>overBottom){position.top=withinOffset+outerHeight-data.collisionHeight}else position.top=withinOffset}else if(overTop>0){position.top+=overTop}else if(overBottom>0){position.top-=overBottom}else position.top=max(position.top-collisionPosTop,position.top)}},flip:{left:function left(position,data){var within=data.within,withinOffset=within.offset.left+within.scrollLeft,outerWidth=within.width,offsetLeft=within.isWindow?within.scrollLeft:within.offset.left,collisionPosLeft=position.left-data.collisionPosition.marginLeft,overLeft=collisionPosLeft-offsetLeft,overRight=collisionPosLeft+data.collisionWidth-outerWidth-offsetLeft,myOffset=data.my[0]==='left'?-data.elemWidth:data.my[0]==='right'?data.elemWidth:0,atOffset=data.at[0]==='left'?data.targetWidth:data.at[0]==='right'?-data.targetWidth:0,offset=-2*data.offset[0],newOverRight,newOverLeft;if(overLeft<0){newOverRight=position.left+myOffset+atOffset+offset+data.collisionWidth-outerWidth-withinOffset;if(newOverRight<0||newOverRight<abs(overLeft))position.left+=myOffset+atOffset+offset}else if(overRight>0){newOverLeft=position.left-data.collisionPosition.marginLeft+myOffset+atOffset+offset-offsetLeft;if(newOverLeft>0||abs(newOverLeft)<overRight)position.left+=myOffset+atOffset+offset}},top:function top(position,data){var within=data.within,withinOffset=within.offset.top+within.scrollTop,outerHeight=within.height,offsetTop=within.isWindow?within.scrollTop:within.offset.top,collisionPosTop=position.top-data.collisionPosition.marginTop,overTop=collisionPosTop-offsetTop,overBottom=collisionPosTop+data.collisionHeight-outerHeight-offsetTop,top=data.my[1]==='top',myOffset=top?-data.elemHeight:data.my[1]==='bottom'?data.elemHeight:0,atOffset=data.at[1]==='top'?data.targetHeight:data.at[1]==='bottom'?-data.targetHeight:0,offset=-2*data.offset[1],newOverTop,newOverBottom;if(overTop<0){newOverBottom=position.top+myOffset+atOffset+offset+data.collisionHeight-outerHeight-withinOffset;if(newOverBottom<0||newOverBottom<abs(overTop))position.top+=myOffset+atOffset+offset}else if(overBottom>0){newOverTop=position.top-data.collisionPosition.marginTop+myOffset+atOffset+offset-offsetTop;if(newOverTop>0||abs(newOverTop)<overBottom)position.top+=myOffset+atOffset+offset}}},flipfit:{left:function left(){for(var _len=arguments.length,args=new Array(_len),_key=0;_key<_len;_key++)args[_key]=arguments[_key];collisions.flip.left.apply(this,args);collisions.fit.left.apply(this,args)},top:function top(){for(var _len2=arguments.length,args=new Array(_len2),_key2=0;_key2<_len2;_key2++)args[_key2]=arguments[_key2];collisions.flip.top.apply(this,args);collisions.fit.top.apply(this,args)}}};$.position={scrollbarWidth:function scrollbarWidth(){if(cachedScrollbarWidth!==undefined)return cachedScrollbarWidth;var div=$('<div '+"style='display:block;position:absolute;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>"),innerDiv=div.children()[0];$('body').append(div);var w1=innerDiv.offsetWidth;div.css('overflow','scroll');var w2=innerDiv.offsetWidth;if(w1===w2)w2=div[0].clientWidth;div.remove();cachedScrollbarWidth=w1-w2;return cachedScrollbarWidth},getScrollInfo:function getScrollInfo(within){var overflowX=within.isWindow||within.isDocument?'':within.element.css('overflow-x'),overflowY=within.isWindow||within.isDocument?'':within.element.css('overflow-y'),hasOverflowX=overflowX==='scroll'||overflowX==='auto'&&within.width<within.element[0].scrollWidth,hasOverflowY=overflowY==='scroll'||overflowY==='auto'&&within.height<within.element[0].scrollHeight;return{width:hasOverflowY?$.position.scrollbarWidth():0,height:hasOverflowX?$.position.scrollbarWidth():0}},getWithinInfo:function getWithinInfo(element){var withinElement=$(element||window),isWindow=$.isWindow(withinElement[0]),isDocument=!!withinElement[0]&&withinElement[0].nodeType===9,hasOffset=!isWindow&&!isDocument;return{element:withinElement,isWindow:isWindow,isDocument:isDocument,offset:hasOffset?$(element).offset():{left:0,top:0},scrollLeft:withinElement.scrollLeft(),scrollTop:withinElement.scrollTop(),width:withinElement.outerWidth(),height:withinElement.outerHeight()}}};$.fn.position=function(options){if(!options||!options.of)return _position.apply(this,arguments);options=$.extend({},options);var within=$.position.getWithinInfo(options.within),scrollInfo=$.position.getScrollInfo(within),collision=(options.collision||'flip').split(' '),offsets={},target=typeof options.of==='string'?$(document).find(options.of):$(options.of),dimensions=getDimensions(target),targetWidth=dimensions.width,targetHeight=dimensions.height,targetOffset=dimensions.offset;if(target[0].preventDefault)options.at='left top';var basePosition=$.extend({},targetOffset);$.each(['my','at'],function(){var pos=(options[this]||'').split(' ');if(pos.length===1)pos=regexHorizontal.test(pos[0])?pos.concat(['center']):regexVertical.test(pos[0])?['center'].concat(pos):['center','center'];pos[0]=regexHorizontal.test(pos[0])?pos[0]:'center';pos[1]=regexVertical.test(pos[1])?pos[1]:'center';var horizontalOffset=regexOffset.exec(pos[0]),verticalOffset=regexOffset.exec(pos[1]);offsets[this]=[horizontalOffset?horizontalOffset[0]:0,verticalOffset?verticalOffset[0]:0];options[this]=[regexPosition.exec(pos[0])[0],regexPosition.exec(pos[1])[0]]});if(collision.length===1)collision[1]=collision[0];if(options.at[0]==='right'){basePosition.left+=targetWidth}else if(options.at[0]==='center')basePosition.left+=targetWidth/2;if(options.at[1]==='bottom'){basePosition.top+=targetHeight}else if(options.at[1]==='center')basePosition.top+=targetHeight/2;var atOffset=getOffsets(offsets.at,targetWidth,targetHeight);basePosition.left+=atOffset[0];basePosition.top+=atOffset[1];return this.each(function(){var using,elem=$(this),elemWidth=elem.outerWidth(),elemHeight=elem.outerHeight(),marginLeft=parseCss(this,'marginLeft'),marginTop=parseCss(this,'marginTop'),collisionWidth=elemWidth+marginLeft+parseCss(this,'marginRight')+scrollInfo.width,collisionHeight=elemHeight+marginTop+parseCss(this,'marginBottom')+scrollInfo.height,position=$.extend({},basePosition),myOffset=getOffsets(offsets.my,elem.outerWidth(),elem.outerHeight());if(options.my[0]==='right'){position.left-=elemWidth}else if(options.my[0]==='center')position.left-=elemWidth/2;if(options.my[1]==='bottom'){position.top-=elemHeight}else if(options.my[1]==='center')position.top-=elemHeight/2;position.left+=myOffset[0];position.top+=myOffset[1];var collisionPosition={marginLeft:marginLeft,marginTop:marginTop};$.each(['left','top'],function(i,dir){if(collisions[collision[i]])collisions[collision[i]][dir](position,{targetWidth:targetWidth,targetHeight:targetHeight,elemWidth:elemWidth,elemHeight:elemHeight,collisionPosition:collisionPosition,collisionWidth:collisionWidth,collisionHeight:collisionHeight,offset:[atOffset[0]+myOffset[0],atOffset[1]+myOffset[1]],my:options.my,at:options.at,within:within,elem:elem})});if(options.using)using=function using(props){var left=targetOffset.left-position.left,right=left+targetWidth-elemWidth,top=targetOffset.top-position.top,bottom=top+targetHeight-elemHeight,feedback={target:{element:target,left:targetOffset.left,top:targetOffset.top,width:targetWidth,height:targetHeight},element:{element:elem,left:position.left,top:position.top,width:elemWidth,height:elemHeight},horizontal:right<0?'left':left>0?'right':'center',vertical:bottom<0?'top':top>0?'bottom':'middle'};if(targetWidth<elemWidth&&abs(left+right)<targetWidth)feedback.horizontal='center';if(targetHeight<elemHeight&&abs(top+bottom)<targetHeight)feedback.vertical='middle';if(max(abs(left),abs(right))>max(abs(top),abs(bottom))){feedback.important='horizontal'}else feedback.important='vertical';options.using.call(this,props,feedback)};elem.offset($.extend(position,{using:using}))})};if(!$.hasOwnProperty('ui'))$.ui={};$.ui.position=collisions})(jQuery)
/* Source and licensing information for the above line(s) can be found at https://service-lux.by/core/misc/position.js. */;
/* Source and licensing information for the line(s) below can be found at https://service-lux.by/core/misc/progress.js. */
(function($,Drupal){Drupal.theme.progressBar=function(id){return"<div id=\"".concat(id,"\" class=\"progress\" aria-live=\"polite\">")+'<div class="progress__label">&nbsp;</div><div class="progress__track"><div class="progress__bar"></div></div><div class="progress__percentage"></div><div class="progress__description">&nbsp;</div></div>'};Drupal.ProgressBar=function(id,updateCallback,method,errorCallback){this.id=id;this.method=method||'GET';this.updateCallback=updateCallback;this.errorCallback=errorCallback;this.element=$(Drupal.theme('progressBar',id))};$.extend(Drupal.ProgressBar.prototype,{setProgress:function setProgress(percentage,message,label){if(percentage>=0&&percentage<=100){$(this.element).find('div.progress__bar').css('width',"".concat(percentage,"%"));$(this.element).find('div.progress__percentage').html("".concat(percentage,"%"))};$('div.progress__description',this.element).html(message);$('div.progress__label',this.element).html(label);if(this.updateCallback)this.updateCallback(percentage,message,this)},startMonitoring:function startMonitoring(uri,delay){this.delay=delay;this.uri=uri;this.sendPing()},stopMonitoring:function stopMonitoring(){clearTimeout(this.timer);this.uri=null},sendPing:function sendPing(){if(this.timer)clearTimeout(this.timer);if(this.uri){var pb=this,uri=this.uri;if(uri.indexOf('?')===-1){uri+='?'}else uri+='&';uri+='_format=json';$.ajax({type:this.method,url:uri,data:'',dataType:'json',success:function success(progress){if(progress.status===0){pb.displayError(progress.data);return};pb.setProgress(progress.percentage,progress.message,progress.label);pb.timer=setTimeout(function(){pb.sendPing()},pb.delay)},error:function error(xmlhttp){var e=new Drupal.AjaxError(xmlhttp,pb.uri);pb.displayError("<pre>".concat(e.message,"</pre>"))}})}},displayError:function displayError(string){var error=$('<div class="messages messages--error"></div>').html(string);$(this.element).before(error).hide();if(this.errorCallback)this.errorCallback(this)}})})(jQuery,Drupal)
/* Source and licensing information for the above line(s) can be found at https://service-lux.by/core/misc/progress.js. */;
/* Source and licensing information for the line(s) below can be found at https://service-lux.by/core/misc/jquery.once.bc.js. */
(function($,once){var deprecatedMessageSuffix="is deprecated in Drupal 9.3.0 and will be removed in Drupal 10.0.0. Use the core/once library instead. See https://www.drupal.org/node/3158256",originalJQOnce=$.fn.once,originalJQRemoveOnce=$.fn.removeOnce;$.fn.once=function jQueryOnce(id){Drupal.deprecationError({message:"jQuery.once() ".concat(deprecatedMessageSuffix)});return originalJQOnce.apply(this,[id])};$.fn.removeOnce=function jQueryRemoveOnce(id){Drupal.deprecationError({message:"jQuery.removeOnce() ".concat(deprecatedMessageSuffix)});return originalJQRemoveOnce.apply(this,[id])};var drupalOnce=once
function augmentedOnce(id,selector,context){originalJQOnce.apply($(selector,context),[id]);return drupalOnce(id,selector,context)}
function remove(id,selector,context){originalJQRemoveOnce.apply($(selector,context),[id]);return drupalOnce.remove(id,selector,context)};window.once=Object.assign(augmentedOnce,drupalOnce,{remove:remove})})(jQuery,once)
/* Source and licensing information for the above line(s) can be found at https://service-lux.by/core/misc/jquery.once.bc.js. */;