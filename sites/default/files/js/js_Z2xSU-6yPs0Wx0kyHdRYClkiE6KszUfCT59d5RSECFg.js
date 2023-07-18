/* Source and licensing information for the line(s) below can be found at https://service-lux.by/core/misc/collapse.js. */
(function($,Modernizr,Drupal){function CollapsibleDetails(node){this.$node=$(node);this.$node.data('details',this);var anchor=window.location.hash&&window.location.hash!=='#'?", ".concat(window.location.hash):'';if(this.$node.find(".error".concat(anchor)).length)this.$node.attr('open',true);this.setupSummaryPolyfill()};$.extend(CollapsibleDetails,{instances:[]});$.extend(CollapsibleDetails.prototype,{setupSummaryPolyfill:function setupSummaryPolyfill(){var $summary=this.$node.find('> summary');$summary.attr('tabindex','-1');$('<span class="details-summary-prefix visually-hidden"></span>').append(this.$node.attr('open')?Drupal.t('Hide'):Drupal.t('Show')).prependTo($summary).after(document.createTextNode(' '));$('<a class="details-title"></a>').attr('href',"#".concat(this.$node.attr('id'))).prepend($summary.contents()).appendTo($summary);$summary.append(this.$summary).on('click',$.proxy(this.onSummaryClick,this))},onSummaryClick:function onSummaryClick(e){this.toggle();e.preventDefault()},toggle:function toggle(){var _this=this,isOpen=!!this.$node.attr('open'),$summaryPrefix=this.$node.find('> summary span.details-summary-prefix');if(isOpen){$summaryPrefix.html(Drupal.t('Show'))}else $summaryPrefix.html(Drupal.t('Hide'));setTimeout(function(){_this.$node.attr('open',!isOpen)},0)}});Drupal.behaviors.collapse={attach:function attach(context){if(Modernizr.details)return;once('collapse','details',context).forEach(function(detail){detail.classList.add('collapse-processed');CollapsibleDetails.instances.push(new CollapsibleDetails(detail))})}};var handleFragmentLinkClickOrHashChange=function handleFragmentLinkClickOrHashChange(e,$target){$target.parents('details').not('[open]').find('> summary').trigger('click')};$('body').on('formFragmentLinkClickOrHashChange.details',handleFragmentLinkClickOrHashChange);Drupal.CollapsibleDetails=CollapsibleDetails})(jQuery,Modernizr,Drupal)
/* Source and licensing information for the above line(s) can be found at https://service-lux.by/core/misc/collapse.js. */;
/* Source and licensing information for the line(s) below can be found at https://service-lux.by/core/misc/entity-form.js. */
(function($,Drupal){Drupal.behaviors.entityContentDetailsSummaries={attach:function attach(context){var $context=$(context);$context.find('.entity-content-form-revision-information').drupalSetSummary(function(context){var $revisionContext=$(context),revisionCheckbox=$revisionContext.find('.js-form-item-revision input');if(revisionCheckbox.is(':checked')||!revisionCheckbox.length&&$revisionContext.find('.js-form-item-revision-log textarea').length)return Drupal.t('New revision');return Drupal.t('No revision')});$context.find('details.entity-translation-options').drupalSetSummary(function(context){var $translationContext=$(context),translate,$checkbox=$translationContext.find('.js-form-item-translation-translate input');if($checkbox.length){translate=$checkbox.is(':checked')?Drupal.t('Needs to be updated'):Drupal.t('Does not need to be updated')}else{$checkbox=$translationContext.find('.js-form-item-translation-retranslate input');translate=$checkbox.is(':checked')?Drupal.t('Flag other translations as outdated'):Drupal.t('Do not flag other translations as outdated')};return translate})}}})(jQuery,Drupal)
/* Source and licensing information for the above line(s) can be found at https://service-lux.by/core/misc/entity-form.js. */;
/* Source and licensing information for the line(s) below can be found at https://service-lux.by/core/modules/node/node.js. */
(function($,Drupal,drupalSettings){Drupal.behaviors.nodeDetailsSummaries={attach:function attach(context){var $context=$(context);$context.find('.node-form-author').drupalSetSummary(function(context){var nameElement=context.querySelector('.field--name-uid input'),name=nameElement&&nameElement.value,dateElement=context.querySelector('.field--name-created input'),date=dateElement&&dateElement.value;if(name&&date)return Drupal.t('By @name on @date',{'@name':name,'@date':date});if(name)return Drupal.t('By @name',{'@name':name});if(date)return Drupal.t('Authored on @date',{'@date':date})});$context.find('.node-form-options').drupalSetSummary(function(context){var $optionsContext=$(context),values=[];if($optionsContext.find('input').is(':checked')){$optionsContext.find('input:checked').next('label').each(function(){values.push(Drupal.checkPlain(this.textContent.trim()))});return values.join(', ')};return Drupal.t('Not promoted')})}}})(jQuery,Drupal,drupalSettings)
/* Source and licensing information for the above line(s) can be found at https://service-lux.by/core/modules/node/node.js. */;
/* Source and licensing information for the line(s) below can be found at https://service-lux.by/core/modules/filter/filter.js. */
(function($,Drupal){Drupal.behaviors.filterGuidelines={attach:function attach(context){function updateFilterGuidelines(event){var $this=$(event.target),value=event.target.value;$this.closest('.js-filter-wrapper').find('[data-drupal-format-id]').hide().filter("[data-drupal-format-id=\"".concat(value,"\"]")).show()};$(once('filter-guidelines','.js-filter-guidelines',context)).find(':header').hide().closest('.js-filter-wrapper').find('select.js-filter-list').on('change.filterGuidelines',updateFilterGuidelines).trigger('change.filterGuidelines')}}})(jQuery,Drupal)
/* Source and licensing information for the above line(s) can be found at https://service-lux.by/core/modules/filter/filter.js. */;
/* Source and licensing information for the line(s) below can be found at https://service-lux.by/core/modules/editor/js/editor.js. */
(function($,Drupal,drupalSettings){function findFieldForFormatSelector($formatSelector){var fieldId=$formatSelector.attr('data-editor-for');return $("#".concat(fieldId)).get(0)}
function filterXssWhenSwitching(field,format,originalFormatID,callback){if(format.editor.isXssSafe){callback(field,format)}else $.ajax({url:Drupal.url("editor/filter_xss/".concat(format.format)),type:'POST',data:{value:field.value,original_format_id:originalFormatID},dataType:'json',success:function success(xssFilteredValue){if(xssFilteredValue!==false)field.value=xssFilteredValue;callback(field,format)}})}
function changeTextEditor(field,newFormatID){var previousFormatID=field.getAttribute('data-editor-active-text-format');if(drupalSettings.editor.formats[previousFormatID]){Drupal.editorDetach(field,drupalSettings.editor.formats[previousFormatID])}else $(field).off('.editor');if(drupalSettings.editor.formats[newFormatID]){var format=drupalSettings.editor.formats[newFormatID];filterXssWhenSwitching(field,format,previousFormatID,Drupal.editorAttach)};field.setAttribute('data-editor-active-text-format',newFormatID)}
function onTextFormatChange(event){var select=event.target,field=event.data.field,activeFormatID=field.getAttribute('data-editor-active-text-format'),newFormatID=select.value;if(newFormatID===activeFormatID)return;var supportContentFiltering=drupalSettings.editor.formats[newFormatID]&&drupalSettings.editor.formats[newFormatID].editorSupportsContentFiltering,hasContent=field.value!=='';if(hasContent&&supportContentFiltering){var message=Drupal.t('Changing the text format to %text_format will permanently remove content that is not allowed in that text format.<br><br>Save your changes before switching the text format to avoid losing data.',{'%text_format':$(select).find('option:selected')[0].textContent}),confirmationDialog=Drupal.dialog("<div>".concat(message,"</div>"),{title:Drupal.t('Change text format?'),dialogClass:'editor-change-text-format-modal',resizable:false,buttons:[{text:Drupal.t('Continue'),class:'button button--primary',click:function click(){changeTextEditor(field,newFormatID);confirmationDialog.close()}},{text:Drupal.t('Cancel'),class:'button',click:function click(){select.value=activeFormatID;confirmationDialog.close()}}],closeOnEscape:false,create:function create(){$(this).parent().find('.ui-dialog-titlebar-close').remove()},beforeClose:false,close:function close(event){$(event.target).remove()}});confirmationDialog.showModal()}else changeTextEditor(field,newFormatID)};Drupal.editors={};Drupal.behaviors.editor={attach:function attach(context,settings){if(!settings.editor)return;once('editor','[data-editor-for]',context).forEach(function(editor){var $this=$(editor),field=findFieldForFormatSelector($this);if(!field)return;var activeFormatID=editor.value;field.setAttribute('data-editor-active-text-format',activeFormatID);if(settings.editor.formats[activeFormatID])Drupal.editorAttach(field,settings.editor.formats[activeFormatID]);$(field).on('change.editor keypress.editor',function(){field.setAttribute('data-editor-value-is-changed','true');$(field).off('.editor')});if($this.is('select'))$this.on('change.editorAttach',{field:field},onTextFormatChange);$this.parents('form').on('submit',function(event){if(event.isDefaultPrevented())return;if(settings.editor.formats[activeFormatID])Drupal.editorDetach(field,settings.editor.formats[activeFormatID],'serialize')})})},detach:function detach(context,settings,trigger){var editors;if(trigger==='serialize'){editors=once.filter('editor','[data-editor-for]',context)}else editors=once.remove('editor','[data-editor-for]',context);editors.forEach(function(editor){var $this=$(editor),activeFormatID=editor.value,field=findFieldForFormatSelector($this);if(field&&activeFormatID in settings.editor.formats)Drupal.editorDetach(field,settings.editor.formats[activeFormatID],trigger)})}};Drupal.editorAttach=function(field,format){if(format.editor){Drupal.editors[format.editor].attach(field,format);Drupal.editors[format.editor].onChange(field,function(){$(field).trigger('formUpdated');field.setAttribute('data-editor-value-is-changed','true')})}};Drupal.editorDetach=function(field,format,trigger){if(format.editor){Drupal.editors[format.editor].detach(field,format,trigger);if(field.getAttribute('data-editor-value-is-changed')==='false')field.value=field.getAttribute('data-editor-value-original')}}})(jQuery,Drupal,drupalSettings)
/* Source and licensing information for the above line(s) can be found at https://service-lux.by/core/modules/editor/js/editor.js. */;
