/* Source and licensing information for the line(s) below can be found at https://service-lux.by/core/assets/vendor/jquery.ui/ui/jquery-patch-min.js. */
!function(e){"use strict";"function"==typeof define&&define.amd?define(["jquery","./version"],e):e(jQuery)}((function(e){"use strict";if(e.expr.pseudos||(e.expr.pseudos=e.expr[":"]),e.uniqueSort||(e.uniqueSort=e.unique),!e.escapeSelector){var n=/([\0-\x1f\x7f]|^-?\d)|^-$|[^\x80-\uFFFF\w-]/g,t=function(e,n){return n?"\0"===e?"�":e.slice(0,-1)+"\\"+e.charCodeAt(e.length-1).toString(16)+" ":"\\"+e};e.escapeSelector=function(e){return(e+"").replace(n,t)}};e.fn.even&&e.fn.odd||e.fn.extend({even:function(){return this.filter((function(e){return e%2==0}))},odd:function(){return this.filter((function(e){return e%2==1}))}})}))
/* Source and licensing information for the above line(s) can be found at https://service-lux.by/core/assets/vendor/jquery.ui/ui/jquery-patch-min.js. */;
/* Source and licensing information for the line(s) below can be found at https://service-lux.by/core/assets/vendor/jquery.ui/ui/keycode-min.js. */
!function(e){"use strict";"function"==typeof define&&define.amd?define(["jquery","./version"],e):e(jQuery)}((function(e){"use strict";return e.ui.keyCode={BACKSPACE:8,COMMA:188,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,LEFT:37,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SPACE:32,TAB:9,UP:38}}))
/* Source and licensing information for the above line(s) can be found at https://service-lux.by/core/assets/vendor/jquery.ui/ui/keycode-min.js. */;
/* Source and licensing information for the line(s) below can be found at https://service-lux.by/core/assets/vendor/jquery.ui/ui/plugin-min.js. */
!function(e){"use strict";"function"==typeof define&&define.amd?define(["jquery","./version"],e):e(jQuery)}((function(e){"use strict";return e.ui.plugin={add:function(n,i,t){var u,o=e.ui[n].prototype;for(u in t)o.plugins[u]=o.plugins[u]||[],o.plugins[u].push([i,t[u]])},call:function(e,n,i,t){var u,o=e.plugins[n];if(o&&(t||e.element[0].parentNode&&11!==e.element[0].parentNode.nodeType))for(u=0;u<o.length;u++)e.options[o[u][0]]&&o[u][1].apply(e.element,i)}}}));

/* Source and licensing information for the above line(s) can be found at https://service-lux.by/core/assets/vendor/jquery.ui/ui/plugin-min.js. */;
/* Source and licensing information for the line(s) below can be found at https://service-lux.by/core/assets/vendor/jquery.ui/ui/safe-active-element-min.js. */
!function(e){"use strict";"function"==typeof define&&define.amd?define(["jquery","./version"],e):e(jQuery)}((function(e){"use strict";return e.ui.safeActiveElement=function(e){var n;try{n=e.activeElement}catch(t){n=e.body};return n||(n=e.body),n.nodeName||(n=e.body),n}}))
/* Source and licensing information for the above line(s) can be found at https://service-lux.by/core/assets/vendor/jquery.ui/ui/safe-active-element-min.js. */;
/* Source and licensing information for the line(s) below can be found at https://service-lux.by/core/assets/vendor/jquery.ui/ui/safe-blur-min.js. */
!function(e){"use strict";"function"==typeof define&&define.amd?define(["jquery","./version"],e):e(jQuery)}((function(e){"use strict";return e.ui.safeBlur=function(n){n&&"body"!==n.nodeName.toLowerCase()&&e(n).trigger("blur")}}))
/* Source and licensing information for the above line(s) can be found at https://service-lux.by/core/assets/vendor/jquery.ui/ui/safe-blur-min.js. */;