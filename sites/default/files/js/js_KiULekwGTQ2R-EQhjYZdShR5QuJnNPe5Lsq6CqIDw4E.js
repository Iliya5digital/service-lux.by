/* Source and licensing information for the line(s) below can be found at https://service-lux.by/modules/contrib/webform/js/webform.element.message.js. */
(function($,Drupal){'use strict';var hasLocalStorage=(function(){try{localStorage.setItem('webform','webform');localStorage.removeItem('webform');return true}catch(e){return false}}()),hasSessionStorage=(function(){try{sessionStorage.setItem('webform','webform');sessionStorage.removeItem('webform');return true}catch(e){return false}}());Drupal.behaviors.webformMessageClose={attach:function(context){$(context).find('.js-webform-message--close').once('webform-message--close').each(function(){var $element=$(this),id=$element.attr('data-message-id'),storage=$element.attr('data-message-storage'),effect=$element.attr('data-message-close-effect')||'hide';switch(effect){case'slide':effect='slideUp';break;case'fade':effect='fadeOut';break};if(isClosed($element,storage,id))return;if($element.attr('style')!=='display: none;'&&!$element.hasClass('js-webform-states-hidden'))$element.show();$element.find('.js-webform-message__link').on('click',function(event){$element[effect]();setClosed($element,storage,id);$element.trigger('close');event.preventDefault()})})}}
function isClosed($element,storage,id){if(!id||!storage)return false;switch(storage){case'local':if(hasLocalStorage)return localStorage.getItem('Drupal.webform.message.'+id)||false;return false;case'session':if(hasSessionStorage)return sessionStorage.getItem('Drupal.webform.message.'+id)||false;return false;default:return false}}
function setClosed($element,storage,id){if(!id||!storage)return;switch(storage){case'local':if(hasLocalStorage)localStorage.setItem('Drupal.webform.message.'+id,true);break;case'session':if(hasSessionStorage)sessionStorage.setItem('Drupal.webform.message.'+id,true);break;case'user':case'state':case'custom':$.get($element.find('.js-webform-message__link').attr('href'));return true}}})(jQuery,Drupal)
/* Source and licensing information for the above line(s) can be found at https://service-lux.by/modules/contrib/webform/js/webform.element.message.js. */;
/* Source and licensing information for the line(s) below can be found at https://service-lux.by/modules/contrib/webform/js/webform.drupal.dialog.js. */
(function($,Drupal){'use strict';if($.ui&&$.ui.dialog&&$.ui.dialog.prototype._allowInteraction){var _allowInteraction=$.ui.dialog.prototype._allowInteraction;$.ui.dialog.prototype._allowInteraction=function(event){if($(event.target).closest('.cke_dialog').length)return true;return _allowInteraction.apply(this,arguments)}};Drupal.behaviors.webformDialogEvents={attach:function(){$(window).once('webform-dialog').on({'dialog:aftercreate':function(event,dialog,$element,settings){setTimeout(function(){var hasFocus=$element.find('[autofocus]:tabbable');if(!hasFocus.length)hasFocus=$element.find(':input:tabbable:not(:button)');if(!hasFocus.length)hasFocus=$element.parent().find('.ui-dialog-titlebar-close');hasFocus.eq(0).trigger('focus')})}})}}})(jQuery,Drupal)
/* Source and licensing information for the above line(s) can be found at https://service-lux.by/modules/contrib/webform/js/webform.drupal.dialog.js. */;
/* Source and licensing information for the line(s) below can be found at https://service-lux.by/modules/contrib/webform/js/webform.dialog.js. */
(function($,Drupal,drupalSettings){'use strict';Drupal.webform=Drupal.webform||{};Drupal.webform.dialog=Drupal.webform.dialog||{};Drupal.webform.dialog.options=Drupal.webform.dialog.options||{};Drupal.webformOpenDialog=function(url,type){var $div=$('<div><a href="'+url+'" class="webform-dialog '+type+'"></a></div>');Drupal.behaviors.webformDialog.attach($div);$div.find('a').trigger('click')};Drupal.behaviors.webformDialog={attach:function(context){$('a.webform-dialog',context).once('webform-dialog').each(function(){var $a=$(this),options=$.extend({},Drupal.webform.dialog.options);if($a.attr('class').match(/webform-dialog-([a-z0-9_]+)/)){var dialogOptionsName=RegExp.$1;if(drupalSettings.webform.dialog.options[dialogOptionsName]){options=drupalSettings.webform.dialog.options[dialogOptionsName];delete options.title}};if($(this).data('dialog-options'))$.extend(options,$(this).data('dialog-options'));var href=$a.attr('href');if(href.indexOf('?source_entity_type=ENTITY_TYPE&source_entity_id=ENTITY_ID')!==-1){if(drupalSettings.webform.dialog.entity_type&&drupalSettings.webform.dialog.entity_id){href=href.replace('ENTITY_TYPE',encodeURIComponent(drupalSettings.webform.dialog.entity_type));href=href.replace('ENTITY_ID',encodeURIComponent(drupalSettings.webform.dialog.entity_id))}else href=href.replace('?source_entity_type=ENTITY_TYPE&source_entity_id=ENTITY_ID','');$a.attr('href',href)};href+=(href.indexOf('?')===-1?'?':'&')+'_webform_dialog=1';var element_settings={};element_settings.progress={type:'fullscreen'};element_settings.url=href;element_settings.event='click';element_settings.dialogType=$a.data('dialog-type')||'modal';element_settings.dialog=options;element_settings.element=this;element_settings.error=function error(xmlhttp,uri){if(xmlhttp.status===403)window.location.replace(href.split('?')[0])};Drupal.ajax(element_settings)})}}})(jQuery,Drupal,drupalSettings)
/* Source and licensing information for the above line(s) can be found at https://service-lux.by/modules/contrib/webform/js/webform.dialog.js. */;
/* Source and licensing information for the line(s) below can be found at https://service-lux.by/core/misc/form.js. */
(function($,Drupal,debounce){$.fn.drupalGetSummary=function(){var callback=this.data('summaryCallback');return this[0]&&callback?callback(this[0]).trim():''};$.fn.drupalSetSummary=function(callback){var self=this;if(typeof callback!=='function'){var val=callback;callback=function callback(){return val}};return this.data('summaryCallback',callback).off('formUpdated.summary').on('formUpdated.summary',function(){self.trigger('summaryUpdated')}).trigger('summaryUpdated')};Drupal.behaviors.formSingleSubmit={attach:function attach(){function onFormSubmit(e){var $form=$(e.currentTarget),formValues=$form.serialize(),previousValues=$form.attr('data-drupal-form-submit-last');if(previousValues===formValues){e.preventDefault()}else $form.attr('data-drupal-form-submit-last',formValues)};$(once('form-single-submit','body')).on('submit.singleSubmit','form:not([method~="GET"])',onFormSubmit)}}
function triggerFormUpdated(element){$(element).trigger('formUpdated')}
function fieldsList(form){return[].map.call(form.querySelectorAll('[name][id]'),function(el){return el.id})};Drupal.behaviors.formUpdated={attach:function attach(context){var $context=$(context),contextIsForm=$context.is('form'),$forms=$(once('form-updated',contextIsForm?$context:$context.find('form'))),formFields;if($forms.length)$.makeArray($forms).forEach(function(form){var events='change.formUpdated input.formUpdated ',eventHandler=debounce(function(event){triggerFormUpdated(event.target)},300);formFields=fieldsList(form).join(',');form.setAttribute('data-drupal-form-fields',formFields);$(form).on(events,eventHandler)});if(contextIsForm){formFields=fieldsList(context).join(',');var currentFields=$(context).attr('data-drupal-form-fields');if(formFields!==currentFields)triggerFormUpdated(context)}},detach:function detach(context,settings,trigger){var $context=$(context),contextIsForm=$context.is('form');if(trigger==='unload')once.remove('form-updated',contextIsForm?$context:$context.find('form')).forEach(function(form){form.removeAttribute('data-drupal-form-fields');$(form).off('.formUpdated')})}};Drupal.behaviors.fillUserInfoFromBrowser={attach:function attach(context,settings){var userInfo=['name','mail','homepage'],$forms=$(once('user-info-from-browser','[data-user-info-from-browser]'));if($forms.length)userInfo.forEach(function(info){var $element=$forms.find("[name=".concat(info,"]")),browserData=localStorage.getItem("Drupal.visitor.".concat(info));if(!$element.length)return;var emptyValue=$element[0].value==='',defaultValue=$element.attr('data-drupal-default-value')===$element[0].value;if(browserData&&(emptyValue||defaultValue))$element.each(function(index,item){item.value=browserData})});$forms.on('submit',function(){userInfo.forEach(function(info){var $element=$forms.find("[name=".concat(info,"]"));if($element.length)localStorage.setItem("Drupal.visitor.".concat(info),$element[0].value)})})}};var handleFragmentLinkClickOrHashChange=function handleFragmentLinkClickOrHashChange(e){var url;if(e.type==='click'){url=e.currentTarget.location?e.currentTarget.location:e.currentTarget}else url=window.location;var hash=url.hash.substr(1);if(hash){var $target=$("#".concat(hash));$('body').trigger('formFragmentLinkClickOrHashChange',[$target]);setTimeout(function(){return $target.trigger('focus')},300)}},debouncedHandleFragmentLinkClickOrHashChange=debounce(handleFragmentLinkClickOrHashChange,300,true);$(window).on('hashchange.form-fragment',debouncedHandleFragmentLinkClickOrHashChange);$(document).on('click.form-fragment','a[href*="#"]',debouncedHandleFragmentLinkClickOrHashChange)})(jQuery,Drupal,Drupal.debounce)
/* Source and licensing information for the above line(s) can be found at https://service-lux.by/core/misc/form.js. */;
/* Source and licensing information for the line(s) below can be found at https://service-lux.by/modules/contrib/webform/js/webform.behaviors.js. */
(function($,Drupal){'use strict';var isChrome=(/chrom(e|ium)/.test(window.navigator.userAgent.toLowerCase()));if(isChrome){var backButton=false;if(window.performance){var navEntries=window.performance.getEntriesByType('navigation');if(navEntries.length>0&&navEntries[0].type==='back_forward'){backButton=true}else if(window.performance.navigation&&window.performance.navigation.type===window.performance.navigation.TYPE_BACK_FORWARD)backButton=true};if(backButton){var attachBehaviors=Drupal.attachBehaviors;Drupal.attachBehaviors=function(context,settings){setTimeout(function(context,settings){attachBehaviors(context,settings)},300)}}}})(jQuery,Drupal)
/* Source and licensing information for the above line(s) can be found at https://service-lux.by/modules/contrib/webform/js/webform.behaviors.js. */;
