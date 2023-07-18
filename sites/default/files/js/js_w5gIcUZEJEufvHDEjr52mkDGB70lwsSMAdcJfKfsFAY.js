/* Source and licensing information for the line(s) below can be found at https://service-lux.by/core/modules/views/js/base.js. */
(function($,Drupal,drupalSettings){Drupal.Views={};Drupal.Views.parseQueryString=function(query){var args={},pos=query.indexOf('?');if(pos!==-1)query=query.substring(pos+1);var pair,pairs=query.split('&');for(var i=0;i<pairs.length;i++){pair=pairs[i].split('=');if(pair[0]!=='q'&&pair[1])args[decodeURIComponent(pair[0].replace(/\+/g,' '))]=decodeURIComponent(pair[1].replace(/\+/g,' '))};return args};Drupal.Views.parseViewArgs=function(href,viewPath){var returnObj={},path=Drupal.Views.getPath(href),viewHref=Drupal.url(viewPath).substring(drupalSettings.path.baseUrl.length);if(viewHref&&path.substring(0,viewHref.length+1)==="".concat(viewHref,"/")){returnObj.view_args=decodeURIComponent(path.substring(viewHref.length+1,path.length));returnObj.view_path=path};return returnObj};Drupal.Views.pathPortion=function(href){var protocol=window.location.protocol;if(href.substring(0,protocol.length)===protocol)href=href.substring(href.indexOf('/',protocol.length+2));return href};Drupal.Views.getPath=function(href){href=Drupal.Views.pathPortion(href);href=href.substring(drupalSettings.path.baseUrl.length,href.length);if(href.substring(0,3)==='?q=')href=href.substring(3,href.length);var chars=['#','?','&'];for(var i=0;i<chars.length;i++)if(href.indexOf(chars[i])>-1)href=href.substr(0,href.indexOf(chars[i]));return href}})(jQuery,Drupal,drupalSettings)
/* Source and licensing information for the above line(s) can be found at https://service-lux.by/core/modules/views/js/base.js. */;
/* Source and licensing information for the line(s) below can be found at https://service-lux.by/core/modules/views/js/ajax_view.js. */
(function($,Drupal,drupalSettings){Drupal.behaviors.ViewsAjaxView={};Drupal.behaviors.ViewsAjaxView.attach=function(context,settings){if(settings&&settings.views&&settings.views.ajaxViews){var ajaxViews=settings.views.ajaxViews;Object.keys(ajaxViews||{}).forEach(function(i){Drupal.views.instances[i]=new Drupal.views.ajaxView(ajaxViews[i])})}};Drupal.behaviors.ViewsAjaxView.detach=function(context,settings,trigger){if(trigger==='unload')if(settings&&settings.views&&settings.views.ajaxViews){var ajaxViews=settings.views.ajaxViews;Object.keys(ajaxViews||{}).forEach(function(i){var selector=".js-view-dom-id-".concat(ajaxViews[i].view_dom_id);if($(selector,context).length){delete Drupal.views.instances[i];delete settings.views.ajaxViews[i]}})}};Drupal.views={};Drupal.views.instances={};Drupal.views.ajaxView=function(settings){var selector=".js-view-dom-id-".concat(settings.view_dom_id);this.$view=$(selector);var ajaxPath=drupalSettings.views.ajax_path;if(ajaxPath.constructor.toString().indexOf('Array')!==-1)ajaxPath=ajaxPath[0];var queryString=window.location.search||'';if(queryString!==''){queryString=queryString.slice(1).replace(/q=[^&]+&?|&?render=[^&]+/,'');if(queryString!=='')queryString=(/\?/.test(ajaxPath)?'&':'?')+queryString};this.element_settings={url:ajaxPath+queryString,submit:settings,setClick:true,event:'click',selector:selector,progress:{type:'fullscreen'}};this.settings=settings;this.$exposed_form=$("form#views-exposed-form-".concat(settings.view_name.replace(/_/g,'-'),"-").concat(settings.view_display_id.replace(/_/g,'-')));once('exposed-form',this.$exposed_form).forEach($.proxy(this.attachExposedFormAjax,this));once('ajax-pager',this.$view.filter($.proxy(this.filterNestedViews,this))).forEach($.proxy(this.attachPagerAjax,this));var selfSettings=$.extend({},this.element_settings,{event:'RefreshView',base:this.selector,element:this.$view.get(0)});this.refreshViewAjax=Drupal.ajax(selfSettings)};Drupal.views.ajaxView.prototype.attachExposedFormAjax=function(){var that=this;this.exposedFormAjax=[];$('input[type=submit], button[type=submit], input[type=image]',this.$exposed_form).not('[data-drupal-selector=edit-reset]').each(function(index){var selfSettings=$.extend({},that.element_settings,{base:$(this).attr('id'),element:this});that.exposedFormAjax[index]=Drupal.ajax(selfSettings)})};Drupal.views.ajaxView.prototype.filterNestedViews=function(){return!this.$view.parents('.view').length};Drupal.views.ajaxView.prototype.attachPagerAjax=function(){this.$view.find('ul.js-pager__items > li > a, th.views-field a, .attachment .views-summary a').each($.proxy(this.attachPagerLinkAjax,this))};Drupal.views.ajaxView.prototype.attachPagerLinkAjax=function(id,link){var $link=$(link),viewData={},href=$link.attr('href');$.extend(viewData,this.settings,Drupal.Views.parseQueryString(href),Drupal.Views.parseViewArgs(href,this.settings.view_base_path));var selfSettings=$.extend({},this.element_settings,{submit:viewData,base:false,element:link});this.pagerAjax=Drupal.ajax(selfSettings)};Drupal.AjaxCommands.prototype.viewsScrollTop=function(ajax,response){var offset=$(response.selector).offset(),scrollTarget=response.selector;while($(scrollTarget).scrollTop()===0&&$(scrollTarget).parent())scrollTarget=$(scrollTarget).parent();if(offset.top-10<$(scrollTarget).scrollTop())$(scrollTarget).animate({scrollTop:offset.top-10},500)}})(jQuery,Drupal,drupalSettings)
/* Source and licensing information for the above line(s) can be found at https://service-lux.by/core/modules/views/js/ajax_view.js. */;
/* Source and licensing information for the line(s) below can be found at https://service-lux.by/modules/contrib/better_exposed_filters/js/better_exposed_filters.js. */
(function($,Drupal,drupalSettings){Drupal.behaviors.betterExposedFilters={attach:function(context,settings){$('.bef-tree input[type=checkbox], .bef-checkboxes input[type=checkbox]').change(function(){_bef_highlight(this,context)}).filter(':checked').closest('.form-item',context).addClass('highlight')}}
function _bef_highlight(elem,context){$elem=$(elem,context);$elem.attr('checked')?$elem.closest('.form-item',context).addClass('highlight'):$elem.closest('.form-item',context).removeClass('highlight')}})(jQuery,Drupal,drupalSettings)
/* Source and licensing information for the above line(s) can be found at https://service-lux.by/modules/contrib/better_exposed_filters/js/better_exposed_filters.js. */;
/* Source and licensing information for the line(s) below can be found at https://service-lux.by/modules/contrib/better_exposed_filters/js/auto_submit.js. */
(function($,Drupal,once){Drupal.behaviors.betterExposedFiltersAutoSubmit={attach:function(context){var selectors='form[data-bef-auto-submit-full-form], [data-bef-auto-submit-full-form] form, [data-bef-auto-submit]';$(selectors,context).addBack(selectors).each(function(i,e){var $form=$(e),autoSubmitDelay=$form.data('bef-auto-submit-delay')||500;$(once('bef-auto-submit',$form)).on('change',triggerSubmit).on('keyup',Drupal.debounce(triggerSubmit,autoSubmitDelay))})
function triggerSubmit(e){var ignoredKeyCodes=[16,17,18,20,33,34,35,36,37,38,39,40,9,13,27],$target=$(e.target),$submit=$target.closest('form').find('[data-bef-auto-submit-click]');if($target.is('[data-bef-auto-submit-exclude], :submit')||($target.attr('autocomplete')=='off'&&!$target.hasClass('bef-datepicker')))return true;if($target.is(':text:not(.hasDatepicker), textarea')&&$.inArray(e.keyCode,ignoredKeyCodes)===-1){$submit.click()}else if(e.type==='change')$submit.click()}}}}(jQuery,Drupal,once))
/* Source and licensing information for the above line(s) can be found at https://service-lux.by/modules/contrib/better_exposed_filters/js/auto_submit.js. */;
/* Source and licensing information for the line(s) below can be found at https://service-lux.by/modules/contrib/better_exposed_filters/js/bef_links_use_ajax.js. */
/**
 * @file
 * bef_links_use_ajax.js
 *
 * Allows to use ajax with Bef links.
 */

(function ($, once) {

  // This is only needed to provide ajax functionality
  Drupal.behaviors.better_exposed_filters_select_as_links = {
    attach: function (context, settings) {
      $(once('bef-links-use-ajax', '.bef-links.bef-links-use-ajax', context)).each(function () {
        let $links = $(this);
        let links_name = $(this).attr('name');
        let links_multiple = $(this).attr('multiple');
        let $form = $(this).closest('form');
        let $filters = $form.find('input[name^="' + links_name + '"]');

        $(this).find('a').click(function (event) {
          // Prevent following the link URL.
          event.preventDefault();

          let link_name = links_multiple ? $(this).attr('name') : links_name;
          let link_value = $(this).attr('name').substring(links_name.length).replace(/^\[|\]$/g, '');
          let $filter = $form.find('input[name="' + link_name + '"]');

          if ($(this).hasClass('bef-link--selected')) {
            // The previously selected link is selected again. Deselect it.
            $(this).removeClass('bef-link--selected');
            let all = $links.find('a[name="' + links_name + '[All]"]').addClass('bef-link--selected');
            if (!links_multiple || link_value == 'All') {
              $filters.remove();
            }
            else {
              $filter.remove();
            }
          }
          else {
            if (!links_multiple || link_value == 'All') {
              $links.find('.bef-link--selected').removeClass('bef-link--selected');
            }
            $(this).addClass('bef-link--selected');

            if (!$filter.length) {
              $filter = $('<input type="hidden" name="' + link_name + '" />')
                .prependTo($links);
            }
            $filter.val(link_value);
          }

          // Submit the form.
          $form.find('.form-submit').click();
        });
      });
    }
  };
})(jQuery, once);

/* Source and licensing information for the above line(s) can be found at https://service-lux.by/modules/contrib/better_exposed_filters/js/bef_links_use_ajax.js. */;
