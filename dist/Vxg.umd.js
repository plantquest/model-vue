(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("vuetify/lib/components/VForm"), require("vuetify/lib/components/VMain"), require("vuetify/lib/components/VCombobox"), require("vuetify/lib/components/VIcon"), require("vuetify/lib/components/VDialog"), require("vuetify/lib/components/VGrid"), require("vuetify/lib/components/VTextField"), require("vuetify/lib/components/VChip"), require("vuetify/lib/components/VApp"), require("vuetify/lib/components/VBtn"), require("vuetify/lib/components/VNavigationDrawer"), require("vuetify/lib/components/VSheet"), require("vuetify/lib/components/VDataTable"), require("vuetify/lib/components/VCard"), require("vuetify/lib/components/VSelect"), require("vuetify/lib/components/VAppBar"), require("vuetify/lib/components/VBtnToggle"), require("vuetify/lib/components/VToolbar"), require("vuetify/lib/components/VTooltip"), require("vuetify/lib/components/VProgressLinear"), require("vuetify/lib/components/VDivider"));
	else if(typeof define === 'function' && define.amd)
		define(["vuetify/lib/components/VForm", "vuetify/lib/components/VMain", "vuetify/lib/components/VCombobox", "vuetify/lib/components/VIcon", "vuetify/lib/components/VDialog", "vuetify/lib/components/VGrid", "vuetify/lib/components/VTextField", "vuetify/lib/components/VChip", "vuetify/lib/components/VApp", "vuetify/lib/components/VBtn", "vuetify/lib/components/VNavigationDrawer", "vuetify/lib/components/VSheet", "vuetify/lib/components/VDataTable", "vuetify/lib/components/VCard", "vuetify/lib/components/VSelect", "vuetify/lib/components/VAppBar", "vuetify/lib/components/VBtnToggle", "vuetify/lib/components/VToolbar", "vuetify/lib/components/VTooltip", "vuetify/lib/components/VProgressLinear", "vuetify/lib/components/VDivider"], factory);
	else if(typeof exports === 'object')
		exports["Vxg"] = factory(require("vuetify/lib/components/VForm"), require("vuetify/lib/components/VMain"), require("vuetify/lib/components/VCombobox"), require("vuetify/lib/components/VIcon"), require("vuetify/lib/components/VDialog"), require("vuetify/lib/components/VGrid"), require("vuetify/lib/components/VTextField"), require("vuetify/lib/components/VChip"), require("vuetify/lib/components/VApp"), require("vuetify/lib/components/VBtn"), require("vuetify/lib/components/VNavigationDrawer"), require("vuetify/lib/components/VSheet"), require("vuetify/lib/components/VDataTable"), require("vuetify/lib/components/VCard"), require("vuetify/lib/components/VSelect"), require("vuetify/lib/components/VAppBar"), require("vuetify/lib/components/VBtnToggle"), require("vuetify/lib/components/VToolbar"), require("vuetify/lib/components/VTooltip"), require("vuetify/lib/components/VProgressLinear"), require("vuetify/lib/components/VDivider"));
	else
		root["Vxg"] = factory(root["vuetify/lib/components/VForm"], root["vuetify/lib/components/VMain"], root["vuetify/lib/components/VCombobox"], root["vuetify/lib/components/VIcon"], root["vuetify/lib/components/VDialog"], root["vuetify/lib/components/VGrid"], root["vuetify/lib/components/VTextField"], root["vuetify/lib/components/VChip"], root["vuetify/lib/components/VApp"], root["vuetify/lib/components/VBtn"], root["vuetify/lib/components/VNavigationDrawer"], root["vuetify/lib/components/VSheet"], root["vuetify/lib/components/VDataTable"], root["vuetify/lib/components/VCard"], root["vuetify/lib/components/VSelect"], root["vuetify/lib/components/VAppBar"], root["vuetify/lib/components/VBtnToggle"], root["vuetify/lib/components/VToolbar"], root["vuetify/lib/components/VTooltip"], root["vuetify/lib/components/VProgressLinear"], root["vuetify/lib/components/VDivider"]);
})((typeof self !== 'undefined' ? self : this), function(__WEBPACK_EXTERNAL_MODULE__1b42__, __WEBPACK_EXTERNAL_MODULE__1faa__, __WEBPACK_EXTERNAL_MODULE__2757__, __WEBPACK_EXTERNAL_MODULE__354e__, __WEBPACK_EXTERNAL_MODULE__3699__, __WEBPACK_EXTERNAL_MODULE__5f3c__, __WEBPACK_EXTERNAL_MODULE__6881__, __WEBPACK_EXTERNAL_MODULE__6b38__, __WEBPACK_EXTERNAL_MODULE__7013__, __WEBPACK_EXTERNAL_MODULE__863d__, __WEBPACK_EXTERNAL_MODULE__8ece__, __WEBPACK_EXTERNAL_MODULE__8fd1__, __WEBPACK_EXTERNAL_MODULE_b1bf__, __WEBPACK_EXTERNAL_MODULE_b7cf__, __WEBPACK_EXTERNAL_MODULE_bfa4__, __WEBPACK_EXTERNAL_MODULE_d7c8__, __WEBPACK_EXTERNAL_MODULE_dbe5__, __WEBPACK_EXTERNAL_MODULE_e34a__, __WEBPACK_EXTERNAL_MODULE_e8e3__, __WEBPACK_EXTERNAL_MODULE_ef2d__, __WEBPACK_EXTERNAL_MODULE_ffda__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "fb15");
/******/ })
/************************************************************************/
/******/ ({

/***/ "1b42":
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__1b42__;

/***/ }),

/***/ "1faa":
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__1faa__;

/***/ }),

/***/ "2757":
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__2757__;

/***/ }),

/***/ "2771":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "354e":
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__354e__;

/***/ }),

/***/ "3699":
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__3699__;

/***/ }),

/***/ "53ab":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_BasicHead_vue_vue_type_style_index_0_id_0107774a_prod_lang_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("e855");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_BasicHead_vue_vue_type_style_index_0_id_0107774a_prod_lang_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_BasicHead_vue_vue_type_style_index_0_id_0107774a_prod_lang_scss__WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "5f3c":
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__5f3c__;

/***/ }),

/***/ "6544":
/***/ (function(module, exports) {

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

module.exports = function installComponents (component, components) {
  var options = typeof component.exports === 'function'
    ? component.exports.extendOptions
    : component.options

  if (typeof component.exports === 'function') {
    options.components = component.exports.options.components
  }

  options.components = options.components || {}

  for (var i in components) {
    options.components[i] = options.components[i] || components[i]
  }
}


/***/ }),

/***/ "66cb":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_BasicSide_vue_vue_type_style_index_0_id_91e318f0_prod_lang_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("a50b");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_BasicSide_vue_vue_type_style_index_0_id_91e318f0_prod_lang_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_BasicSide_vue_vue_type_style_index_0_id_91e318f0_prod_lang_scss__WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "6881":
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__6881__;

/***/ }),

/***/ "6b38":
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__6b38__;

/***/ }),

/***/ "7013":
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__7013__;

/***/ }),

/***/ "863d":
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__863d__;

/***/ }),

/***/ "8875":
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// addapted from the document.currentScript polyfill by Adam Miller
// MIT license
// source: https://github.com/amiller-gh/currentScript-polyfill

// added support for Firefox https://bugzilla.mozilla.org/show_bug.cgi?id=1620505

(function (root, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
}(typeof self !== 'undefined' ? self : this, function () {
  function getCurrentScript () {
    var descriptor = Object.getOwnPropertyDescriptor(document, 'currentScript')
    // for chrome
    if (!descriptor && 'currentScript' in document && document.currentScript) {
      return document.currentScript
    }

    // for other browsers with native support for currentScript
    if (descriptor && descriptor.get !== getCurrentScript && document.currentScript) {
      return document.currentScript
    }
  
    // IE 8-10 support script readyState
    // IE 11+ & Firefox support stack trace
    try {
      throw new Error();
    }
    catch (err) {
      // Find the second match for the "at" string to get file src url from stack.
      var ieStackRegExp = /.*at [^(]*\((.*):(.+):(.+)\)$/ig,
        ffStackRegExp = /@([^@]*):(\d+):(\d+)\s*$/ig,
        stackDetails = ieStackRegExp.exec(err.stack) || ffStackRegExp.exec(err.stack),
        scriptLocation = (stackDetails && stackDetails[1]) || false,
        line = (stackDetails && stackDetails[2]) || false,
        currentLocation = document.location.href.replace(document.location.hash, ''),
        pageSource,
        inlineScriptSourceRegExp,
        inlineScriptSource,
        scripts = document.getElementsByTagName('script'); // Live NodeList collection
  
      if (scriptLocation === currentLocation) {
        pageSource = document.documentElement.outerHTML;
        inlineScriptSourceRegExp = new RegExp('(?:[^\\n]+?\\n){0,' + (line - 2) + '}[^<]*<script>([\\d\\D]*?)<\\/script>[\\d\\D]*', 'i');
        inlineScriptSource = pageSource.replace(inlineScriptSourceRegExp, '$1').trim();
      }
  
      for (var i = 0; i < scripts.length; i++) {
        // If ready state is interactive, return the script tag
        if (scripts[i].readyState === 'interactive') {
          return scripts[i];
        }
  
        // If src matches, return the script tag
        if (scripts[i].src === scriptLocation) {
          return scripts[i];
        }
  
        // If inline source matches, return the script tag
        if (
          scriptLocation === currentLocation &&
          scripts[i].innerHTML &&
          scripts[i].innerHTML.trim() === inlineScriptSource
        ) {
          return scripts[i];
        }
      }
  
      // If no match, return null
      return null;
    }
  };

  return getCurrentScript
}));


/***/ }),

/***/ "8ece":
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__8ece__;

/***/ }),

/***/ "8fd1":
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__8fd1__;

/***/ }),

/***/ "9224":
/***/ (function(module) {

module.exports = JSON.parse("{\"name\":\"@plantquest/model-vue\",\"version\":\"0.16.1\",\"main\":\"./dist/Vxg.umd.js\",\"scripts\":{\"serve\":\"vue-cli-service serve\",\"vue-build\":\"vue-cli-service build --target lib --name Vxg --mode production ./src/vxg.js\",\"vue-watch\":\"vue-cli-service build --target lib --name Vxg ./src/vxg.js --watch --report\",\"lint\":\"vue-cli-service lint\",\"test-off\":\"npm run test-lab-lint && npm run test-mocha\",\"test\":\"npm run test-lab-lint\",\"test-mocha\":\"mocha-webpack --interactive false --webpack-config test/test.webpack.config.js --require test/setup.js test/**/*.spec.js\",\"test-lab\":\"lab -v -P test -t 0 -r console -o stdout -r html -o test/coverage.html\",\"test-lab-lint\":\"lab -v -P test -t 0 -L -r console -o stdout -r html -o test/coverage.html\",\"coveralls\":\"lab -s -P test -r lcov | coveralls\",\"coverage\":\"lab -v -P test -r html > coverage.html\",\"prettier\":\"prettier --write --no-semi --single-quote *.js src/**/*.js test/*.js\",\"clean\":\"rm -rf node_modules yarn.lock package-lock.json\",\"reset\":\"npm run clean && npm i && npm test\",\"repo-check\":\"REPO_VERSION=`node -e \\\"console.log(require('./package').version)\\\"` && echo TAG: v$REPO_VERSION && [[ '' == `git tag --list v${REPO_VERSION}` ]]\",\"repo-tag\":\"REPO_VERSION=`node -e \\\"console.log(require('./package').version)\\\"` && echo TAG: v$REPO_VERSION && git commit -a -m v$REPO_VERSION && git push && git tag v$REPO_VERSION && git push --tags;\",\"repo-publish\":\"npm run repo-check && npm run clean && npm i --registry https://registry.npmjs.org && npm run prettier && npm run vue-build && npm test && npm run repo-tag && npm publish --registry https://registry.npmjs.org\",\"repo-publish-quick\":\"npm run repo-check && npm run prettier && npm run vue-build && npm run repo-tag && npm publish --registry https://registry.npmjs.org --access=public\"},\"files\":[\"dist/*\",\"src/*\",\"public/*\",\"*.json\",\"*.js\"],\"devDependencies\":{\"@hapi/code\":\"8.0.3\",\"@hapi/eslint-plugin\":\"6.0.0\",\"@hapi/joi\":\"17.1.1\",\"@hapi/lab\":\"24.3.2\",\"@jsonic/jsonic-next\":\"2.4.3\",\"@seneca/search-mini\":\"0.1.2\",\"@vue/cli-plugin-babel\":\"4.5.13\",\"@vue/cli-plugin-eslint\":\"4.5.13\",\"@vue/cli-plugin-vuex\":\"4.5.13\",\"@vue/cli-service\":\"4.5.13\",\"@vue/eslint-config-prettier\":\"6.0.0\",\"@vue/test-utils\":\"1.2.2\",\"babel-eslint\":\"10.1.0\",\"core-js\":\"3\",\"deepmerge\":\"4.2.2\",\"eslint\":\"6\",\"eslint-plugin-prettier\":\"3\",\"eslint-plugin-vue\":\"7.18.0\",\"expect\":\"27.2.4\",\"gubu\":\"4.0.0\",\"jsdom\":\"17.0.0\",\"jsdom-global\":\"3.0.2\",\"mocha\":\"4\",\"mocha-webpack\":\"2.0.0-beta.0\",\"nua\":\"2.0.1\",\"patrun\":\"7.2.5\",\"prettier\":\"2.7.1\",\"sass\":\"1.34.0\",\"sass-loader\":\"10\",\"vue\":\"2.6.12\",\"vue-cli-plugin-vuetify\":\"2.4.0\",\"vue-router\":\"3.5.2\",\"vue-template-compiler\":\"2.6.12\",\"vuetify\":\"2.5.1\",\"vuetify-loader\":\"1.7.2\",\"vuex\":\"3.4.0\",\"webpack-node-externals\":\"3.0.0\"}}");

/***/ }),

/***/ "a50b":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "b1bf":
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_b1bf__;

/***/ }),

/***/ "b7cf":
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_b7cf__;

/***/ }),

/***/ "bce7":
/***/ (function(module, exports, __webpack_require__) {

!function(e){if(true)module.exports=e();else {}}((function(){var e={},t={};Object.defineProperty(t,"__esModule",{value:!0}),t.Gubu=void 0;const n=Symbol.for("gubu$"),l={gubu$:n,v$:"4.0.0"},r=Symbol.for("gubu$nil"),i=/^[A-Z]/,o="",u="gubu",s="name",a="nan",f="never",p="number",h="required",c="array",d="function",v="object",b="string",y="undefined",m="any",g="list",$="instance",I="null",x="type",k="Object",w="Array",G="Above",S="After",N="All",V="Any",R="Before",A="Below",O="Check",D="Child",j="Closed",C="Define",E="Default",B="Empty",M="Exact",L="Func",T="Key",q="Max",F="Min",P="Never",J="Len",K="One",W="Open",z="Optional",H="Refer",U="Rename",_="Required",Z="Skip",Q="Some",X="Value",Y=" for property ",ee='"$PATH"',te='"$VALUE"',ne=e=>Object.keys(e),le=(e,t,n)=>Object.defineProperty(e,t,n),re=e=>Array.isArray(e),ie=e=>JSON.parse(e),oe=(e,t)=>JSON.stringify(e,t);class ue{constructor(e,t,n,l){this.match=!1,this.dI=0,this.nI=2,this.cI=-1,this.pI=0,this.sI=-1,this.valType=f,this.isRoot=!1,this.key=o,this.type=f,this.stop=!0,this.nextSibling=!0,this.fromDefault=!1,this.ignoreVal=void 0,this.err=[],this.parents=[],this.keys=[],this.path=[],this.root=e,this.vals=[e,-1],this.node=t,this.nodes=[t,-1],this.ctx=n||{},this.match=!!l}next(){this.stop=!1,this.fromDefault=!1,this.ignoreVal=void 0,this.isRoot=0===this.pI;let e=this.nodes[this.pI];for(;+e;)this.pI=+e,e=this.nodes[this.pI],this.dI--;e?(this.node=e,this.updateVal(this.vals[this.pI]),this.key=this.keys[this.pI],this.cI=this.pI,this.sI=this.pI+1,this.parent=this.parents[this.pI],this.nextSibling=!0,this.type=this.node.t,this.path[this.dI]=this.key,this.oval=this.val):this.stop=!0}updateVal(e){this.val=e,this.valType=typeof this.val,p===this.valType&&isNaN(this.val)&&(this.valType=a),this.isRoot&&!this.match&&(this.root=this.val)}}class se extends TypeError{constructor(e,t,n){super(t.map(e=>e.t).join("\n")),this.gubu=!0,this.name="GubuError",this.code=e,this.desc=()=>({name:"GubuError",code:e,err:t,ctx:n})}toJSON(){return{...this,err:this.desc().err,name:this.name,message:this.message}}}const ae={String:!0,Number:!0,Boolean:!0,Object:!0,Array:!0,Function:!0,Symbol:!0,BigInt:!0},fe={string:o,number:0,boolean:!1,object:{},array:[],symbol:Symbol(o),bigint:BigInt(0),null:null};function pe(e,t){var u,s,f,h;if(he===e)e=void 0;else if(null!=e&&(null===(u=e.$)||void 0===u?void 0:u.gubu$)){if(n===e.$.gubu$)return e.d=null==t?e.d:t,e;if(!0===e.$.gubu$){let l={...e};return l.$={v$:"4.0.0",...l.$,gubu$:n},l.v=null!=l.v&&v===typeof l.v?{...l.v}:l.v,l.t=l.t||typeof l.v,d===l.t&&ae[l.v.name]&&(l.t=l.v.name.toLowerCase(),l.v=Ze(fe[l.t]),l.f=l.v),l.r=!!l.r,l.p=!!l.p,l.d=null==t?null==l.d?-1:l.d:t,l.b=l.b||[],l.a=l.a||[],l.u=l.u||{},l}}let g=null===e?I:typeof e;g=y===g?m:g;let x=e,w=x,G=r,S=!1,N={},V=[],R=[];if(v===g)w=void 0,re(x)?(g=c,1===x.length&&(G=x[0],x=[])):null!=x&&Function!==x.constructor&&Object!==x.constructor&&null!=x.constructor?(g=$,N.n=x.constructor.name,N.i=x.constructor,w=x):0===ne(x).length&&(G=Ie());else if(d===g)if(ae[e.name])g=e.name.toLowerCase(),S=!0,w=x=Ze(fe[g]),k===e.name&&(G=Ie());else if(x.gubu===l||!0===(null===(s=x.$)||void 0===s?void 0:s.gubu)){let e=x.node?x.node():x;g=e.t,w=x=e.v,S=e.r,N={...e.u},V=[...e.a],R=[...e.b]}else"Function"===x.constructor.name&&i.test(x.name)&&(g=$,S=!0,N.n=null===(h=null===(f=x.prototype)||void 0===f?void 0:f.constructor)||void 0===h?void 0:h.name,N.i=x);else p===g&&isNaN(x)?g=a:b===g&&o===x&&(N.empty=!0);let A=null==x||v!==g&&c!==g?x:{...x};return{$:l,t:g,v:A,f:w,n:null!=A&&v===typeof A?ne(A).length:0,c:G,r:S,p:!1,d:null==t?-1:t,u:N,a:V,b:R}}function he(t,i){const u=null==i?{}:i;u.name=null==u.name?"G"+(o+Math.random()).substring(2,8):o+u.name;let s=pe(t,0);function a(e,t,n){let l=new ue(e,s,t,n);for(;l.next(),!l.stop;){let e=l.node,t=!1;if(0<e.b.length)for(let r=0;r<e.b.length;r++){let n=ce(e.b[r],l);e=l.node,void 0!==n.done&&(t=n.done)}if(!t){let t=!0,n=void 0===l.val;if(f===l.type)l.err.push(He(f,l,1070));else if(v===l.type){let i;if(e.r&&n?(l.ignoreVal=!0,l.err.push(He(h,l,1010))):n||null!==l.val&&v===l.valType&&!re(l.val)?!e.p&&n&&void 0!==e.f?(l.updateVal(e.f),l.fromDefault=!0,i=l.val,t=!1):e.p&&n||(l.updateVal(l.val||(l.fromDefault=!0,{})),i=l.val):(l.err.push(He(x,l,1020)),i=re(l.val)?l.val:{}),t&&null!=(i=null==i&&!1===l.ctx.err?{}:i)){let t=!1,n=ne(e.v),o=l.nI;if(0<n.length){t=!0,l.pI=o;for(let t of n){let n=e.v[t]=pe(e.v[t],1+l.dI);l.nodes[l.nI]=n,l.vals[l.nI]=i[t],l.parents[l.nI]=i,l.keys[l.nI]=t,l.nI++}}let u=ne(i).filter(t=>void 0===e.v[t]);if(0<u.length)if(r===e.c)l.ignoreVal=!0,l.err.push(He("closed",l,1100,void 0,{k:u}));else{t=!0,l.pI=o;for(let t of u){let n=e.c=pe(e.c,1+l.dI);l.nodes[l.nI]=n,l.vals[l.nI]=i[t],l.parents[l.nI]=i,l.keys[l.nI]=t,l.nI++}}t&&(l.dI++,l.nodes[l.nI++]=l.sI,l.nextSibling=!1)}}else if(c===l.type)if(e.r&&n)l.ignoreVal=!0,l.err.push(He(h,l,1030));else if(n||re(l.val)){if(!e.p&&n&&void 0!==e.f)l.updateVal(e.f),l.fromDefault=!0;else if(!e.p||null!=l.val){l.updateVal(l.val||(l.fromDefault=!0,[]));let t=0<l.val.length,n=r!==e.c,i=ne(e.v).filter(e=>!isNaN(+e)),u=0<i.length;if(t||u){l.pI=l.nI;let r=0;if(u)if(i.length<l.val.length&&!n)l.ignoreVal=!0,l.err.push(He("closed",l,1090,void 0,{k:i.length}));else for(;r<i.length;r++){let t=e.v[r]=pe(e.v[r],1+l.dI);l.nodes[l.nI]=t,l.vals[l.nI]=l.val[r],l.parents[l.nI]=l.val,l.keys[l.nI]=o+r,l.nI++}if(n&&t){let t=e.c=pe(e.c,1+l.dI);for(;r<l.val.length;r++)l.nodes[l.nI]=t,l.vals[l.nI]=l.val[r],l.parents[l.nI]=l.val,l.keys[l.nI]=o+r,l.nI++}l.ignoreVal||(l.dI++,l.nodes[l.nI++]=l.sI,l.nextSibling=!1)}}}else l.err.push(He(x,l,1040));else if(m===l.type||g===l.type||void 0===l.val||l.type===l.valType||$===l.type&&e.u.i&&l.val instanceof e.u.i||I===l.type&&null===l.val)if(void 0===l.val){let t=l.path[l.dI];!e.r||y===l.type&&l.parent.hasOwnProperty(t)?void 0!==e.f&&!e.p||y===l.type?(l.updateVal(e.f),l.fromDefault=!0):m===l.type&&(l.ignoreVal=void 0===l.ignoreVal||l.ignoreVal):(l.ignoreVal=!0,l.err.push(He(h,l,1060)))}else b!==l.type||o!==l.val||e.u.empty||l.err.push(He(h,l,1080));else l.err.push(He(x,l,1050))}if(0<e.a.length)for(let r=0;r<e.a.length;r++){let n=ce(e.a[r],l);e=l.node,void 0!==n.done&&(t=n.done)}let n=l.node.p?!1!==l.ignoreVal:!!l.ignoreVal;!l.match&&null!=l.parent&&!t&&!n&&(l.parent[l.key]=l.val),l.nextSibling&&(l.pI=l.sI)}if(0<l.err.length)if(re(l.ctx.err))l.ctx.err.push(...l.err);else if(!l.match&&!1!==l.ctx.err)throw new se("shape",l.err,l.ctx);return l.match?0===l.err.length:l.root}function p(e,t){return a(e,t,!1)}p.valid=function(e,t){let n=t||{};return n.err=n.err||[],a(e,n,!1),0===n.err.length},p.match=(e,t)=>a(e,t=t||{},!0),p.error=(e,t)=>{let n=t||{};return n.err=n.err||[],a(e,n,!1),n.err},p.spec=()=>(p(void 0,{err:!1}),ie(_e(s,(e,t)=>n===t||t,!1,!0))),p.node=()=>(p.spec(),s);let d=o;return p.toString=()=>(d=Me(o===d?_e(s&&s.$&&(n===s.$.gubu$||!0===s.$.gubu$)?s.v:s):d),`[Gubu ${u.name} ${d}]`),e.inspect&&e.inspect.custom&&(p[e.inspect.custom]=p.toString),p.gubu=l,p}function ce(e,t){var n;let l,r={},i=!1;try{i=!(void 0!==t.val||null===(n=e.gubu$)||void 0===n||!n.Check)||e(t.val,r,t)}catch(s){l=s}let u=re(r.err)?0<r.err.length:null!=r.err;if(!i||u){if(void 0===t.val&&(t.node.p||!t.node.r)&&!0!==r.done)return delete r.err,r;let n=r.why||"check",i=de(t);if(b===typeof r.err)t.err.push(ze(t,r.err));else if(v===typeof r.err)t.err.push(...[r.err].flat().map(e=>(e.p=null==e.p?i:e.p,e.m=null==e.m?2010:e.m,e)));else{let r=e.name;null!=r&&o!=r||(r=Me(e.toString().replace(/[ \t\r\n]+/g," "))),t.err.push(He(n,t,1045,void 0,{thrown:l},r))}r.done=null==r.done||r.done}return r.hasOwnProperty("uval")?(t.updateVal(r.uval),t.ignoreVal=!1):void 0===r.val||Number.isNaN(r.val)||(t.updateVal(r.val),t.ignoreVal=!1),void 0!==r.node&&(t.node=r.node),void 0!==r.type&&(t.type=r.type),r}function de(e){return e.path.slice(1,e.dI+1).filter(e=>null!=e).join(".")}const ve=function(e){let t=We(this,e);return t.r=!0,t.p=!1,void 0===e&&1===arguments.length&&(t.t=y,t.v=void 0),t},be=function(e){let t=We(this,e);return t.r=!1,void 0===e&&1===arguments.length&&(t.t=y,t.v=void 0),t},ye=function(e){let t=We(this,e);return t.r=!1,t.p=!0,t},me=function(e){let t=We(this);return t.t=d,t.v=e,t.f=e,t},ge=function(e,t){let n=We(this,void 0===t?e:t);return n.r=!1,n.f=e,d===typeof e&&ae[e.name]&&(n.t=e.name.toLowerCase(),n.f=Ze(fe[n.t])),n.p=!1,n},$e=function(e){let t=We(this,e);return t.u.empty=!0,t},Ie=function(e){let t=We(this,e);return t.t=m,void 0!==e&&(t.v=e,t.f=e),t},xe=function(e){let t=We(this,e);return t.t=f,t},ke=function(e,t){let n=We(this),l="number"==typeof e;n.t=b,l&&null==t&&(n=pe([]));let r=null;return"function"==typeof e&&(r=e,n=Ie()),n.b.push((function(n,i,o){if(r)i.val=r(o.path,o);else if(l){let n=e;i.val=o.path.slice(o.path.length-1-(0<=n?n:0),o.path.length-1+(0<=n?0:1)),"string"==typeof t&&(i.val=i.val.join(t))}else null==e&&(i.val=o.path[o.path.length-2]);return!0})),n},we=function(...e){let t=We();t.t=g,t.r=!0;let n=e.map(e=>Xe(e));return t.u.list=e,t.b.push((function(t,l,r){let i=!0;for(let e of n){let n={...r.ctx,err:[]};e(t,n),0<n.err.length&&(i=!1)}return i||(l.why=N,l.err=[ze(r,X+" "+te+Y+ee+" does not satisfy all of: "+e.map(e=>_e(e,null,!0)).join(", "))]),i})),t},Ge=function(...e){let t=We();t.t=g,t.r=!0;let n=e.map(e=>Xe(e));return t.u.list=e,t.b.push((function(t,l,r){let i=!1;for(let e of n){let n={...r.ctx,err:[]},o=e.match(t,n);o&&(l.val=e(t,n)),i||(i=o)}return i||(l.why=Q,l.err=[ze(r,X+" "+te+Y+ee+" does not satisfy any of: "+e.map(e=>_e(e,null,!0)).join(", "))]),i})),t},Se=function(...e){let t=We();t.t=g,t.r=!0;let n=e.map(e=>Xe(e));return t.u.list=e,t.b.push((function(t,l,r){let i=0;for(let e of n){let n={...r.ctx,err:[]};if(e.match(t,n)){i++,l.val=e(t,n);break}}return 1!==i&&(l.why=K,l.err=[ze(r,X+" "+te+Y+ee+" does not satisfy one of: "+e.map(e=>_e(e,null,!0)).join(", "))]),!0})),t},Ne=function(...e){let t=We();return t.b.push((function(t,n,l){for(let r=0;r<e.length;r++)if(t===e[r])return!0;return n.err=ze(l,X+" "+te+Y+ee+" must be exactly one of: "+l.node.s+"."),n.done=!0,!1})),t.s=e.map(e=>_e(e,null,!0)).join(", "),t},Ve=function(e,t){let n=We(this,t);return n.b.push(e),n},Re=function(e,t){let n=We(this,t);return n.a.push(e),n},Ae=function(e,t){let n=We(this,t);if(d===typeof e){let t=e;t.gubu$=t.gubu$||{},t.gubu$.Check=!0,n.b.push(e),n.s=(null==n.s?o:n.s+";")+_e(e,null,!0),n.r=!0}else if(v===typeof e){if(Object.prototype.toString.call(e).includes("RegExp")){let t=t=>null!=t&&!Number.isNaN(t)&&!!String(t).match(e);le(t,s,{value:String(e)}),le(t,"gubu$",{value:{Check:!0}}),n.b.push(t),n.s=_e(e),n.r=!0}}else b===typeof e&&(n.t=e,n.r=!0);return n},Oe=function(e){let t=We(this,e);return t.c=Ie(),t},De=function(e){let t=We(this,e);return c===t.t&&r!==t.c&&0===t.n?(t.v=[t.c],t.c=r):t.c=r,t},je=function(e,t){let n=We(this,t),l=b===typeof e?e:(v===typeof e&&e||{}).name;return null!=l&&o!=l&&n.b.push((function(e,t,n){return(n.ctx.ref=n.ctx.ref||{})[l]=n.node,!0})),n},Ce=function(e,t){let n=We(this,t),l=v===typeof e&&e||{},r=b===typeof e?e:l.name,i=!!l.fill;return null!=r&&o!=r&&n.b.push((function(e,t,n){if(void 0!==e||i){let e=n.ctx.ref=n.ctx.ref||{};if(void 0!==e[r]){let n={...e[r]};n.t=n.t||f,t.node=n,t.type=n.t}}return!0})),n},Ee=function(e,t){let n=We(this,t),l=v===typeof e&&e||{},r=b===typeof e?e:l.name,i="boolean"==typeof l.keep?l.keep:void 0,u=re(l.claim)?l.claim:[];if(null!=r&&o!=r){let e=(e,t,n)=>{if(void 0===e&&0<u.length){n.ctx.Rename=n.ctx.Rename||{},n.ctx.Rename.fromDefault=n.ctx.Rename.fromDefault||{};for(let e of u){let l=n.ctx.Rename.fromDefault[e]||{};if(void 0!==n.parent[e]&&!l.yes){t.val=n.parent[e],n.match||(n.parent[r]=t.val),t.node=l.node;for(let e=0;e<n.err.length;e++)n.err[e].k===l.key&&(n.err.splice(e,1),e--);if(i){let t=n.cI+1;n.nodes.splice(t,0,pe(l.dval)),n.vals.splice(t,0,void 0),n.parents.splice(t,0,n.parent),n.keys.splice(t,0,e),n.nI++,n.pI++}else delete n.parent[e];break}}void 0===t.val&&(t.val=n.node.v)}return!0};le(e,s,{value:"Rename:"+r}),n.b.push(e);let t=(e,t,n)=>(n.parent[r]=e,n.match||i||n.key===r||re(n.parent)&&!1!==i||(delete n.parent[n.key],t.done=!0),n.ctx.Rename=n.ctx.Rename||{},n.ctx.Rename.fromDefault=n.ctx.Rename.fromDefault||{},n.ctx.Rename.fromDefault[r]={yes:n.fromDefault,key:n.key,dval:n.node.v,node:n.node},!0);le(t,s,{value:"Rename:"+r}),n.a.push(t)}return n};function Be(e){return p===typeof e?e:p===typeof(null==e?void 0:e.length)?e.length:null!=e&&v===typeof e?ne(e).length:NaN}function Me(e,t){let n=String(e),l=null==t||isNaN(t)?30:t<0?0:~~t,r=null==e?0:n.length,i=null==e?o:n.substring(0,r);return(i=l<r?i.substring(0,l-3)+"...":i).substring(0,l)}const Le=function(e,t){let n=We(this,t);return n.b.push((function(t,n,l){let r=Be(t);if(e<=r)return!0;let i=p===typeof t?o:"length ";return n.err=ze(l,X+" "+te+Y+ee+` must be a minimum ${i}of ${e} (was ${r}).`),!1})),n.s=F+"("+e+(null==t?o:","+_e(t))+")",n},Te=function(e,t){let n=We(this,t);return n.b.push((function(t,n,l){let r=Be(t);if(r<=e)return!0;let i=p===typeof t?o:"length ";return n.err=ze(l,X+" "+te+Y+ee+` must be a maximum ${i}of ${e} (was ${r}).`),!1})),n.s=q+"("+e+(null==t?o:","+_e(t))+")",n},qe=function(e,t){let n=We(this,t);return n.b.push((function(t,n,l){let r=Be(t);if(e<r)return!0;let i=p===typeof t?"be":"have length";return n.err=ze(l,X+" "+te+Y+ee+` must ${i} above ${e} (was ${r}).`),!1})),n.s=G+"("+e+(null==t?o:","+_e(t))+")",n},Fe=function(e,t){let n=We(this,t);return n.b.push((function(t,n,l){let r=Be(t);if(r<e)return!0;let i=p===typeof t?"be":"have length";return n.err=ze(l,X+" "+te+Y+ee+` must ${i} below ${e} (was ${r}).`),!1})),n.s=A+"("+e+(null==t?o:","+_e(t))+")",n},Pe=function(e,t){let n=We(this,t||Ie());return n.b.push((function(t,n,l){let r=Be(t);if(e===r)return!0;let i=p===typeof t?o:" in length";return n.err=ze(l,X+" "+te+Y+ee+` must be exactly ${e}${i} (was ${r}).`),!1})),n.s=J+"("+e+(null==t?o:","+_e(t))+")",n},Je=function(e,t){let n=We(null==t?this:t),l=pe(e);return n.c=l,n},Ke=function(e){let t=We(this,{});return t.c=pe(e),t};function We(e,t){let n=pe(null==e||e.window===e||e.global===e?t:e);return Object.assign(n,{Above:qe,After:Re,Any:Ie,Before:Ve,Below:Fe,Check:Ae,Child:Ke,Closed:De,Open:Oe,Define:je,Empty:$e,Exact:Ne,Max:Te,Min:Le,Never:xe,Len:Pe,Refer:Ce,Rename:Ee,Required:ve,Skip:ye,Value:Je})}function ze(e,t,n,l){return He(n||"check",e,4e3,t,l)}function He(e,t,n,l,r,i){let u={k:t.key,n:t.node,v:t.val,p:de(t),w:e,m:n,t:o,u:r||{}},s=Me((void 0===t.val?o:_e(t.val)).replace(/"/g,o));if(null==l||o===l){let n=s.startsWith("[")?c:s.startsWith("{")?v:"value",l=s.startsWith("[")||re(t.parents[t.pI])?"index":"property",a="is",p=null==r?void 0:r.k;p=re(p)?(l=1<p.length?(a="are","properties"):l,p.join(", ")):p,u.t="Validation failed for "+(0<u.p.length?`${l} "${u.p}" with `:o)+`${n} "${s}" because `+(x===e?$===t.node.t?`the ${n} is not an instance of ${t.node.u.n} `:`the ${n} is not of type ${t.node.t}`:h===e?o===t.val?"an empty string is not allowed":`the ${n} is required`:"closed"===e?`the ${l} "${p}" ${a} not allowed`:f===e?"no value is allowed":`check "${null==i?e:i}" failed`)+(u.u.thrown?" (threw: "+u.u.thrown.message+")":".")}else u.t=l.replace(/\$VALUE/g,s).replace(/\$PATH/g,u.p);return u}function Ue(e){return null!=e.s&&o!==e.s?e.s:e.r||void 0===e.v?e.t:e.v}function _e(e,t,l,r){let i;r||!e||!e.$||n!==e.$.gubu$&&!0!==e.$.gubu$||(e=Ue(e));try{i=oe(e,(e,l)=>{var i,u;if(t&&(l=t(e,l)),null!=l&&v===typeof l&&l.constructor&&k!==l.constructor.name&&w!==l.constructor.name)l=d===typeof l.toString?l.toString():l.constructor.name;else if(d===typeof l)l=d===typeof he[l.name]&&isNaN(+e)?void 0:null!=l.name&&o!==l.name?l.name:Me(l.toString().replace(/[ \t\r\n]+/g," "));else if("bigint"==typeof l)l=String(l.toString());else{if(Number.isNaN(l))return"NaN";!0===r||!0!==(null===(i=null==l?void 0:l.$)||void 0===i?void 0:i.gubu$)&&n!==(null===(u=null==l?void 0:l.$)||void 0===u?void 0:u.gubu$)||(l=Ue(l))}return l}),i=String(i)}catch(u){i=oe(String(e))}return!0===l&&(i=i.replace(/^"/,o).replace(/"$/,o)),i}function Ze(e){return null==e||v!==typeof e?e:ie(oe(e))}const Qe=e=>pe({...e,$:{gubu$:!0}});if(y!==typeof window){let e=[{b:qe,n:G},{b:Re,n:S},{b:we,n:N},{b:Ie,n:V},{b:Ve,n:R},{b:Fe,n:A},{b:Ae,n:O},{b:Ke,n:D},{b:De,n:j},{b:je,n:C},{b:ge,n:E},{b:$e,n:B},{b:Ne,n:M},{b:me,n:L},{b:ke,n:T},{b:Te,n:q},{b:Le,n:F},{b:xe,n:P},{b:Pe,n:J},{b:Se,n:K},{b:Oe,n:W},{b:be,n:z},{b:Ce,n:H},{b:Ee,n:U},{b:ve,n:_},{b:ye,n:Z},{b:Ge,n:Q},{b:Je,n:X}];for(let t of e)le(t.b,s,{value:t.n})}Object.assign(he,{Gubu:he,Above:qe,After:Re,All:we,Any:Ie,Before:Ve,Below:Fe,Check:Ae,Child:Ke,Closed:De,Define:je,Default:ge,Empty:$e,Exact:Ne,Func:me,Key:ke,Max:Te,Min:Le,Never:xe,Len:Pe,One:Se,Open:Oe,Optional:be,Refer:Ce,Rename:Ee,Required:ve,Skip:ye,Some:Ge,Value:Je,GAbove:qe,GAfter:Re,GAll:we,GAny:Ie,GBefore:Ve,GBelow:Fe,GCheck:Ae,GChild:Ke,GClosed:De,GDefine:je,GDefault:ge,GEmpty:$e,GExact:Ne,GFunc:me,GKey:ke,GMax:Te,GMin:Le,GNever:xe,GLen:Pe,GOne:Se,GOpen:Oe,GOptional:be,GRefer:Ce,GRename:Ee,GRequired:ve,GSkip:ye,GSome:Ge,GValue:Je,G$:Qe,buildize:We,makeErr:ze,stringify:_e,truncate:Me,nodize:pe,isShape:e=>e&&l===e.gubu}),le(he,s,{value:u});const Xe=he;t.Gubu=Xe;const{Gubu:Ye}=t;return Ye}));

/***/ }),

/***/ "bfa4":
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_bfa4__;

/***/ }),

/***/ "c8ba":
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "d7c8":
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_d7c8__;

/***/ }),

/***/ "dbe5":
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_dbe5__;

/***/ }),

/***/ "e34a":
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_e34a__;

/***/ }),

/***/ "e7fb":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_BasicLed_vue_vue_type_style_index_0_id_7167a536_prod_lang_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("2771");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_BasicLed_vue_vue_type_style_index_0_id_7167a536_prod_lang_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_BasicLed_vue_vue_type_style_index_0_id_7167a536_prod_lang_scss__WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "e855":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "e8e3":
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_e8e3__;

/***/ }),

/***/ "ec45":
/***/ (function(module, exports, __webpack_require__) {

!function(e){if(true)module.exports=e();else {}}((function(){return function(e,t,o){var n=(o=o||{}).depth||Number.MAX_VALUE,f=o.setter,l=!!o.preserve;"object"==typeof e&&"object"==typeof t&&function e(t,o,r){if(!(null==t||null==o||n<=r)){var i=r+1;if(Array.isArray(t)&&Array.isArray(o)){for(var u=0;u<t.length;u++)"object"==typeof t[u]?e(t[u],o[u],i):f?f(t,u,o[u]):t[u]=o[u];for(;u<o.length;u++)f?f(t,u,o[u]):t[u]=o[u];t.splice(o.length)}else{for(var d=Object.keys(t),y=0;y<d.length;y++){var p=t[d[y]],a=o[d[y]];"object"===(null===p?"null":typeof p)&&"object"===(null===a?"null":typeof a)?e(p,a,i):void 0===a?l||delete t[d[y]]:f?f(t,d[y],a):t[d[y]]=a}for(var s=Object.keys(o),c=0;c<s.length;c++)void 0===t[s[c]]&&(f?(f(t,s[c],o[s[c]]),null==o[s[c]]||!Array.isArray(o[s[c]])&&"object"!=typeof o[s[c]]||e(t[s[c]],o[s[c]],i)):t[s[c]]=o[s[c]])}}}(e,t,0)}}));

/***/ }),

/***/ "ef2d":
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_ef2d__;

/***/ }),

/***/ "f17e":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "f62b":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {!function(e){if(true)module.exports=e();else {}}((function(){var e={exports:{}};(function(t){(function(){!function(n){"object"==typeof e.exports?e.exports=n():("undefined"!=typeof window?window:void 0!==t?t:"undefined"!=typeof self?self:this).Gex=n()}((function(){var e={exports:{}};Object.defineProperty(e.exports,"__esModule",{value:!0}),e.exports.Gex=void 0;class t{constructor(e){this.desc="",this.gexmap={},null!=e&&(Array.isArray(e)?e:[e]).forEach(e=>{this.gexmap[e]=this.re(this.clean(e))})}dodgy(e){return null==e||Number.isNaN(e)}clean(e){let t=""+e;return this.dodgy(e)?"":t}match(e){e=""+e;let t=!1,n=Object.keys(this.gexmap);for(let r=0;r<n.length&&!t;r++)t=!!this.gexmap[n[r]].exec(e);return t}on(e){if(null==e)return null;let t=typeof e;if("string"===t||"number"===t||"boolean"===t||e instanceof Date||e instanceof RegExp)return this.match(e)?e:null;if(Array.isArray(e)){let t=[];for(let n=0;n<e.length;n++)!this.dodgy(e[n])&&this.match(e[n])&&t.push(e[n]);return t}{let t={};for(let n in e)Object.prototype.hasOwnProperty.call(e,n)&&this.match(n)&&(t[n]=e[n]);return t}}esc(e){let t=this.clean(e);return(t=t.replace(/\*/g,"**")).replace(/\?/g,"*?")}escregexp(e){return e?(""+e).replace(/[-[\]{}()*+?.,\\^$|#\s]/g,"\\$&"):""}re(e){if(""===e||e)return e="^"+(e=(e=(e=(e=(e=this.escregexp(e)).replace(/\\\*/g,"[\\s\\S]*")).replace(/\\\?/g,"[\\s\\S]")).replace(/\[\\s\\S\]\*\[\\s\\S\]\*/g,"\\*")).replace(/\[\\s\\S\]\*\[\\s\\S\]/g,"\\?"))+"$",new RegExp(e);{let e=Object.keys(this.gexmap);return 1==e.length?this.gexmap[e[0]]:{...this.gexmap}}}toString(){let e=this.desc;return""!=e?e:this.desc="Gex["+Object.keys(this.gexmap)+"]"}inspect(){return this.toString()}}function n(e){return new t(e)}return e.exports.Gex=n,e.exports=n,e.exports.Gex=n,e.exports.default=n,e.exports}))}).call(this)}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{}),e=e.exports;var t,n,r,s,i,o,l,u,a,f={},p=this&&this.__classPrivateFieldGet||function(e,t,n,r){if("a"===n&&!r)throw new TypeError("Private accessor was defined without a getter");if("function"==typeof t?e!==t||!r:!t.has(e))throw new TypeError("Cannot read private member from an object whose class did not declare it");return"m"===n?r:"a"===n?r.call(e):r?r.value:t.get(e)};Object.defineProperty(f,"__esModule",{value:!0}),f.IntervalMatcher=f.GexMatcher=void 0,f.GexMatcher=class{constructor(){}make(t,n){if("string"==typeof n&&n.match(/[*?]/)){let t=(0,e.Gex)(n);return{kind:"gex",match:e=>null!=t.on(e),fix:n,meta:{},same(e){return null!=e&&e.kind===this.kind&&e.fix===this.fix}}}}scan(e,t){let n=e.filter(e=>"*"===e.fix).length>0;return{complete:n,sound:n,gaps:[],overs:[],why:"no-star"}}};const h=new RegExp(["^/s*","(=*[<>/(/[]?=*)?/s*([-+0-9a-fA-FeEoOxX]+(/.([0-9a-fA-FeEoOxX]+))?)([/)/]]?)(/s*(,|&+|/|+|/./.)/s*(=*[<>]?=*)/s*([-+.0-9a-fA-FeEoOxX]+)/s*([/)/]]?))?/s*$"].join("").replace(/\//g,"\\"));class c{constructor(){this.kind="interval",t.set(this,(e,t)=>function(n){return e(n)&&t(n)}),n.set(this,(e,t)=>function(n){return e(n)||t(n)}),r.set(this,e=>function(e){return!1}),s.set(this,e=>function(e){return!1}),i.set(this,e=>function(t){return t>e}),o.set(this,e=>function(t){return t>=e}),l.set(this,e=>function(t){return t<e}),u.set(this,e=>function(t){return t<=e}),a.set(this,e=>function(t){return t===e})}make(e,f){if("string"==typeof f&&f.match(/[=<>.[()\]]/)){let e=f.match(h),d={jo:"and",o0:"err",n0:NaN,o1:"err",n1:NaN},g=e=>!1;if(null!=e){let h=c.normop(e[1])||c.normop(e[5]),m=c.normop(e[8])||c.normop(e[10]),v=p(this,"="===h?a:"<"===h||")"===h?l:"<="===h||"]"===h?u:">"===h||"("===h?i:">="===h||"["===h?o:s,"f"),x=Number(e[2]),k=null==e[9]?NaN:Number(e[9]),y=e[7],w=null==y?p(this,n,"f"):"&"===y.substring(0,1)||","===y.substring(0,1)?p(this,t,"f"):p(this,n,"f");".."===y&&(w=p(this,t,"f"),v=p(this,s,"f")===v?p(this,o,"f"):v,m=""===m?"<=":m);let N=p(this,null==m?r:"="===m?a:"<"===m||")"===m?l:"<="===m||"]"===m?u:">"===m?i:">="===m?o:s,"f");if(x===k&&("="===h&&null!=m?(k=NaN,N=p(this,r,"f"),v=m.includes("<")?p(this,u,"f"):m.includes(">")?p(this,o,"f"):m.includes("=")?p(this,a,"f"):p(this,s,"f")):"="===m&&null!=h&&(k=NaN,N=p(this,r,"f"),v=h.includes("<")?p(this,u,"f"):h.includes(">")?p(this,o,"f"):p(this,s,"f"))),p(this,s,"f")!==v&&p(this,r,"f")===N&&(p(this,l,"f")===v||p(this,u,"f")===v?(N=v,k=x,v=p(this,o,"f"),x=Number.NEGATIVE_INFINITY,w=p(this,t,"f")):p(this,i,"f")!==v&&p(this,o,"f")!==v||(N=p(this,u,"f"),k=Number.POSITIVE_INFINITY,w=p(this,t,"f"))),!isNaN(k)&&k<x){let e=N,t=k;k=x,x=t,".."!==y&&(N=v,v=e)}let b=v(x),O=N(k),j=w(b,O);return{kind:"interval",fix:f,meta:d={jo:j.name,o0:b.name,n0:x,o1:O.name,n1:k},match:g=e=>{let t=!1,n=parseFloat(e);return isNaN(n)||(t=j(n)),t},same(e){return null!=e&&e.kind===this.kind&&e.meta.jo===this.meta.jo&&e.meta.o0===this.meta.o0&&e.meta.n0===this.meta.n0&&e.meta.o1===this.meta.o1&&e.meta.n1===this.meta.n1}}}}}scan(e,t){let n={complete:!1,sound:!1,gaps:[],overs:[],lower:null,upper:null},r=Number.NEGATIVE_INFINITY,s=Number.POSITIVE_INFINITY,i=this.half_intervals(e);i.reduce((e,t)=>{let n="eq"===t.o,s="lt"===t.o,i="lte"===t.o,o="gt"===t.o,l="gte"===t.o,u=t.n;if(null==e.lower){let s={n:r,o:"gte"};e.lower=s,e.upper=t,r==u&&l||(o||l?e.gaps.push([s,{n:u,o:o?"lte":"lt",m:0}]):n&&e.gaps.push([s,{n:u,o:"lte",m:1}]))}else{let r="eq"===e.upper.o,a="lt"===e.upper.o,f="lte"===e.upper.o,p=(e.upper.o,e.upper.o,e.upper.n),h=e.upper;u===p?a&&(l||n)||(f||r)&&o||(r||a||f)&&e.gaps.push([{n:p,o:r||f?"gt":"gte",m:2,d:{u:h,h:t}},{n:u,o:n||l?"lt":"lte",m:3}]):p<u?s||i||(r||a||f)&&e.gaps.push([{n:p,o:r||f?"gt":"gte",m:4},{n:u,o:n||l?"lt":"lte",m:5}]):e.overs.push([{n:u,o:n||l?"gte":"gt",m:10},{n:p,o:r||f?"lte":"lt",m:11}]),e.upper=t}return e},n);let o=0<i.length&&i[i.length-1];return o&&s!==o.n&&"gt"!==o.o&&"gte"!==o.o&&n.gaps.push([{n:o.n,o:"eq"===o.o||"lte"===o.o?"gt":"gte",m:6},{n:s,o:"lte",m:7}]),n.complete=0===n.gaps.length,n.sound=0===n.overs.length,n}half_intervals(e){let t=[];for(let r of e)t.push([{n:r.meta.n0,o:r.meta.o0},{n:r.meta.n1,o:r.meta.o1}]);var n=["lt","lte","eq","gte","gt"];return t.map(e=>[isNaN(e[0].n)||null==e[0].n?null:e[0],isNaN(e[1].n)||null==e[1].n?null:e[1]].filter(e=>null!=e)).sort((e,t)=>{if(e[0].n<t[0].n)return-1;if(t[0].n<e[0].n)return 1;var r=n.indexOf(e[0].o),s=n.indexOf(t[0].o);if(r<s)return-1;if(s<r)return 1;if(e[1].n<t[1].n)return-1;if(t[1].n<e[1].n)return 1;var i=n.indexOf(e[1].o),o=n.indexOf(t[1].o);return i<o?-1:o<i?1:0}).reduce((e,t)=>e.concat(...t),[])}}f.IntervalMatcher=c,t=new WeakMap,n=new WeakMap,r=new WeakMap,s=new WeakMap,i=new WeakMap,o=new WeakMap,l=new WeakMap,u=new WeakMap,a=new WeakMap,c.normop=e=>null==e?null:((e.match(/([<>\(\)\[\]])/)||[])[1]||"")+((e.match(/(=)/)||[])[1]||"");var d={exports:{}};function g(t){var n={},r={};let s=[];return(t=t||{}).gex&&s.push(new f.GexMatcher),t.interval&&s.push(new f.IntervalMatcher),n.top=function(){return r},n.add=function(e,i){e={...e};var o="function"==typeof t?t.call(n,e,i):null,l=Object.keys(e).filter(t=>null!=e[t]).sort();l.forEach((function(t){e[t]=String(e[t])}));for(var u,a=r,f=0;f<l.length;f++){var p=l[f],h=e[p];let t=s.reduce((e,t)=>e||t.make(p,h),void 0);if((u=a.v)&&p==a.k)if(t){var c=(g=a.g=a.g||{})[p]=g[p]||[];a=(t=c.find(e=>e.same(t))||(c.push(t),t)).keymap||(t.keymap={})}else a=u[h]||(u[h]={});else if(a.k)if(p<a.k){var d=a.s;g=a.g,a.s={k:a.k,v:a.v},d&&(a.s.s=d),g&&(a.s.g=g),a.g&&(a.g={}),a.k=p,a.v={},t?(c=(g=a.g=a.g||{})[p]=g[p]||[],a=(t=c.find(e=>e.same(t))||(c.push(t),t)).keymap||(t.keymap={})):a=a.v[h]={}}else a=a.s||(a.s={}),f--;else if(a.k=p,a.v={},t){var g;c=(g=a.g=a.g||{})[p]=g[p]||[];a=(t=c.find(e=>e.same(t))||(c.push(t),t)).keymap||(t.keymap={})}else a=a.v[h]={}}return void 0!==i&&a&&(a.d=i,o&&(a.f="function"==typeof o?o:o.find,a.r="function"==typeof o.remove?o.remove:void 0)),n},n.findexact=function(e){return n.find(e,!0)},n.find=function(e,t,s){if(null==e)return null;var i=r,o=void 0===r.d?null:r.d,l=r.f,u=null,a=[],f={},p=Object.keys(e).length,h=[];void 0!==r.d&&h.push(r.d);do{if(u=i.k,i.v){var c=e[u],d=i.v[c];if(!d&&i.g&&i.g[u])for(var g=i.g[u],m=0;m<g.length;m++)if(g[m].match(c)){d=g[m].keymap;break}d?(f[u]=!0,i.s&&a.push(i.s),o=void 0===d.d?t?null:o:d.d,s&&void 0!==d.d&&h.push(d.d),l=d.f,i=d):i=i.s}else i=null;null==i&&0<a.length&&(null==o||s&&!t)&&(i=a.pop())}while(i);return t?Object.keys(f).length!==p&&(o=null):null==o&&void 0!==r.d&&(o=r.d),l&&(o=l.call(n,e,o)),s?h:o},n.remove=function(e){var t,n=r,s=null,i=[];do{if(t=n.k,n.v||n.g){if(n.v){var o=n.v[e[t]];o&&i.push({km:n,v:e[t]})}if(null==o&&n.g){let r=n.g[t]||[];for(let s=0;s<r.length;s++)if(r[s].fix===e[t]){i.push({km:n,v:e[t],mv:r[s]}),o=r[s].keymap;break}}o?(s=o.d,n=o):n=n.s}else n=null}while(n);if(void 0!==s){var l=i[i.length-1];if(l&&l.km&&l.km.v){var u=l.km.v[l.v]||l.mv&&l.mv.keymap;!u||u.r&&!u.r(e,u.d)||delete u.d}}},n.list=function(t,n){t=t||{};var s=[];return r.d&&s.push({match:{},data:r.d,find:r.f}),function r(s,i,o,l){if(s.v){var u,a=s.k,f=(0,e.Gex)(t?null==t[a]?n?null:"*":t[a]:"*"),p={...i},h={...o};for(var c in s.v)if(c===t[a]||!n&&null==t[a]||f.on(c)){var d={...p};d[a]=c;var g={...h};delete g[a],u=s.v[c],0===Object.keys(g).length&&u&&u.d&&l.push({match:d,data:u.d,find:u.f}),u&&null!=u.v&&r(u,{...d},{...g},l)}(u=s.s)&&r(u,{...p},{...h},l)}}(r,{},{...t},s),s},n.toString=function(e,t){var n=!0===e||!!t,s="function"==typeof e?e:function(e){return"function"==typeof e?"<"+e.name+">":"<"+e+">"};function i(e,t){for(var n=0;n<t;n++)e.push(" ")}var o=[],l=[];return function e(t,n,r,l){var u;if(void 0!==t.d&&(n.push(" "+s(t.d)),o.push(l.join(", ")+" -> "+s(t.d))),t.k&&(n.push("\n"),i(n,r),n.push(t.k+":")),(t.v||t.s||t.g)&&r++,t.v)for(var a=Object.keys(t.v).sort(),f=0;f<a.length;f++){var p=a[f];n.push("\n"),i(n,r),n.push(p+" ->"),(u=l.slice()).push(t.k+"="+p),e(t.v[p],n,r+1,u)}if(t.g)for(a=Object.keys(t.g).sort(),f=0;f<a.length;f++)for(var h=t.g[a[f]],c=0;c<h.length;c++){var d=h[c];n.push("\n"),i(n,r),n.push(d.fix+" ~>"),(u=l.slice()).push(t.k+"~"+d.fix),e(d.keymap,n,r+1,u)}t.s&&(n.push("\n"),i(n,r),n.push("|"),u=l.slice(),e(t.s,n,r+1,u))}(r,l,0,[]),n?l.join(""):o.join("\n")},n.inspect=n.toString,n.toJSON=function(e){return JSON.stringify(r,(function(e,t){return"function"==typeof t?"[Function]":t}),e)},n}function m(e){return new g(e)}return Object.defineProperty(d.exports,"__esModule",{value:!0}),d.exports.Gex=d.exports.Patrun=void 0,Object.defineProperty(d.exports,"Gex",{enumerable:!0,get:function(){return e.Gex}}),d.exports.Patrun=g,d.exports=m,d.exports.Patrun=g,d.exports.Gex=e.Gex,d.exports.default=m,d=d.exports}));
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("c8ba")))

/***/ }),

/***/ "fb15":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/setPublicPath.js
// This file is imported into lib/wc client bundles.

if (typeof window !== 'undefined') {
  var currentScript = window.document.currentScript
  if (true) {
    var getCurrentScript = __webpack_require__("8875")
    currentScript = getCurrentScript()

    // for backward compatibility, because previously we directly included the polyfill
    if (!('currentScript' in document)) {
      Object.defineProperty(document, 'currentScript', { get: getCurrentScript })
    }
  }

  var src = currentScript && currentScript.src.match(/(.+\/)[^/]+\.js(\?.*)?$/)
  if (src) {
    __webpack_require__.p = src[1] // eslint-disable-line
  }
}

// Indicate to webpack that this file can be concatenated
/* harmony default export */ var setPublicPath = (null);

// EXTERNAL MODULE: ./node_modules/patrun/dist/patrun.min.js
var patrun_min = __webpack_require__("f62b");
var patrun_min_default = /*#__PURE__*/__webpack_require__.n(patrun_min);

// EXTERNAL MODULE: ./node_modules/@jsonic/jsonic-next/jsonic.min.js
var jsonic_min = __webpack_require__("fe20");
var jsonic_min_default = /*#__PURE__*/__webpack_require__.n(jsonic_min);

// EXTERNAL MODULE: ./src/vxg.scss
var vxg = __webpack_require__("f17e");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"74b366d7-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/BasicAdmin.vue?vue&type=template&id=7ae7ff14
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('v-app',{attrs:{"id":"app"}},[_c('vxg-basic-head',{attrs:{"spec":_vm.spec.parts.head,"logo":_vm.logo},on:{"action":function($event){return _vm.action('BasicHead', $event)}}}),(_vm.showSide)?_c('vxg-basic-side',{attrs:{"spec":_vm.spec.parts.side,"logo":_vm.logo},on:{"action":function($event){return _vm.action('BasicSide', $event)}}}):_vm._e(),_c('vxg-basic-main',{attrs:{"spec":_vm.spec.parts.main}}),_c('vxg-basic-foot',{attrs:{"spec":_vm.spec.parts.foot}})],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/BasicAdmin.vue?vue&type=template&id=7ae7ff14

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/BasicAdmin.vue?vue&type=script&lang=js
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var BasicAdminvue_type_script_lang_js = ({
  props: ['logo'],
  data: function data() {
    return {
      spec: this.$model.main.app.web
    };
  },
  created: function created() {
    console.log('BasicAdmin side', this.spec.parts);
  },
  computed: {
    showSide: function showSide() {
      return this.$store.state.vxg.cmp.BasicSide.show;
    }
  },
  methods: {
    action: function action(part, ev) {
      this.$emit('action', {
        part: part,
        event: ev
      });
    }
  }
});
// CONCATENATED MODULE: ./src/components/BasicAdmin.vue?vue&type=script&lang=js
 /* harmony default export */ var components_BasicAdminvue_type_script_lang_js = (BasicAdminvue_type_script_lang_js); 
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent(
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */,
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options =
    typeof scriptExports === 'function' ? scriptExports.options : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) {
    // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () {
          injectStyles.call(
            this,
            (options.functional ? this.parent : this).$root.$options.shadowRoot
          )
        }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functional component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection(h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing ? [].concat(existing, hook) : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}

// EXTERNAL MODULE: ./node_modules/vuetify-loader/lib/runtime/installComponents.js
var installComponents = __webpack_require__("6544");
var installComponents_default = /*#__PURE__*/__webpack_require__.n(installComponents);

// EXTERNAL MODULE: external "vuetify/lib/components/VApp"
var VApp_ = __webpack_require__("7013");

// CONCATENATED MODULE: ./src/components/BasicAdmin.vue





/* normalize component */

var component = normalizeComponent(
  components_BasicAdminvue_type_script_lang_js,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var BasicAdmin = (component.exports);

/* vuetify-loader */


installComponents_default()(component, {VApp: VApp_["VApp"]})

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"74b366d7-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/BasicHead.vue?vue&type=template&id=0107774a
var BasicHeadvue_type_template_id_0107774a_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('v-app-bar',{staticClass:"vxg-app-bar",attrs:{"app":""}},[(!_vm.drawerOpen && _vm.tool.expandSide.active)?_c('v-icon',{staticStyle:{"display":"inline-block"},attrs:{"large":"","light":""},on:{"click":_vm.openDrawer}},[_vm._v("mdi-chevron-right")]):_vm._e(),(!_vm.drawerOpen && _vm.tool.expandSide.active)?_c('v-divider',{staticStyle:{"margin":"0px 16px"},attrs:{"vertical":""}}):_vm._e(),(_vm.show('clear') && _vm.tool.clear.active)?_c('v-btn',{staticStyle:{"max-width":"16%","display":"inline-block","margin-left":"2px"},attrs:{"outlined":""},on:{"click":_vm.clearFilter}},[_vm._v("Clear")]):_vm._e(),(_vm.show('go') && _vm.tool.go.active)?_c('v-btn',{staticStyle:{"max-width":"16%","display":"inline-block","margin-left":"6px"},attrs:{"outlined":"","disabled":_vm.filterDisabled},on:{"click":_vm.filterAssets}},[_vm._v("Go")]):_vm._e(),(_vm.show('select') && _vm.tool.select.active)?_c('v-select',{ref:"select",staticStyle:{"max-width":"20%","display":"inline-block","margin-left":"10px"},attrs:{"items":_vm.selectItems(),"label":_vm.tool.select.title,"tile":"","outlined":"","hide-details":"","dense":""},model:{value:(_vm.select),callback:function ($$v) {_vm.select=$$v},expression:"select"}}):_vm._e(),((_vm.show('select') && _vm.tool.select.active) || (_vm.show('go') && _vm.tool.go.active))?_c('v-divider',{staticStyle:{"margin":"0px 16px"},attrs:{"vertical":""}}):_vm._e(),(_vm.show('add') && _vm.tool.add.active)?_c('v-btn',{staticClass:"vxg-head-btn",attrs:{"tile":""},on:{"click":_vm.addItem}},[_c('v-icon',{attrs:{"left":"","medium":""}},[_vm._v(" mdi-map-marker-path ")]),_vm._v(" Add "+_vm._s(_vm.itemName == 'Asset' ? 'Fixed Asset' : _vm.itemName)+" ")],1):_vm._e(),(_vm.show('addmobile') && _vm.tool.add.active)?_c('v-btn',{staticClass:"vxg-head-btn",attrs:{"tile":""},on:{"click":_vm.addMobileAsset}},[_c('v-icon',{attrs:{"left":"","medium":""}},[_vm._v(" mdi-map-marker-path ")]),_vm._v(" Add Mobile Asset ")],1):_vm._e(),(_vm.show('add') && _vm.tool.add.active)?_c('v-divider',{staticStyle:{"margin":"0px 16px"},attrs:{"vertical":""}}):_vm._e(),(_vm.show('remove') && _vm.tool.remove.active)?_c('v-btn',{staticClass:"vxg-head-btn",attrs:{"tile":""},on:{"click":_vm.removeItem}},[_c('v-icon',{attrs:{"left":"","medium":""}},[_vm._v(" mdi-map-marker-path ")]),_vm._v(" Remove "+_vm._s(_vm.itemName)+" ")],1):_vm._e(),(_vm.show('remove') && _vm.tool.remove.active)?_c('v-divider',{staticStyle:{"margin":"0px 16px"},attrs:{"vertical":""}}):_vm._e(),(_vm.tool.search.active && _vm.show('search'))?_c('v-combobox',{ref:"search",attrs:{"items":_vm.tag_items,"flat":"","hide-details":"","outlined":"","dense":"","clearable":"","placeholder":"Search","append-icon":_vm.filterIcon?'mdi-tune':undefined,"filter":_vm.customFilter},on:{"keydown":function($event){return _vm.changeSearch($event)},"click:clear":function($event){return _vm.changeSearch($event)},"click:append":_vm.filter},model:{value:(_vm.search),callback:function ($$v) {_vm.search=$$v},expression:"search"}}):_vm._e(),(_vm.tool.avatar.active || _vm.tool.expandMain.active)?_c('v-spacer'):_vm._e(),(_vm.tool.avatar.active)?_c('v-icon',{staticStyle:{"display":"inline-block"},attrs:{"large":"","light":""},on:{"click":function($event){return _vm.action('avatar')}}},[_vm._v("mdi-account")]):_vm._e(),(!_vm.detailOpen && _vm.tool.expandMain.active)?_c('v-divider',{staticStyle:{"margin":"0px 16px"},attrs:{"vertical":""}}):_vm._e(),(!_vm.detailOpen && _vm.tool.expandMain.active)?_c('v-icon',{staticStyle:{"display":"inline-block"},attrs:{"large":"","light":""},on:{"click":_vm.closeDetail}},[_vm._v("mdi-chevron-left")]):_vm._e(),(_vm.show('print'))?_c('v-divider',{attrs:{"vertical":""}}):_vm._e(),(_vm.show('print'))?_c('v-tooltip',{attrs:{"bottom":""},scopedSlots:_vm._u([{key:"activator",fn:function(ref){
var on = ref.on;
var attrs = ref.attrs;
return [(_vm.tool.print.active && _vm.show('print'))?_c('v-btn',_vm._g(_vm._b({staticClass:"pa-1 ma-1",staticStyle:{"height":"55px"},attrs:{"large":"","elevation":"0","color":"white","disabled":_vm.tool.print.disabled},on:{"click":function($event){return _vm.print()}}},'v-btn',attrs,false),on),[_c('v-icon',{staticClass:"vxg-icon",attrs:{"large":""}},[_vm._v("mdi-printer")])],1):_vm._e()]}}],null,false,772587149)},[_c('span',[_vm._v(_vm._s('PRINT'))])]):_vm._e(),(_vm.show('print'))?_c('v-divider',{attrs:{"vertical":""}}):_vm._e(),(_vm.show('bookmark'))?_c('v-tooltip',{attrs:{"bottom":""},scopedSlots:_vm._u([{key:"activator",fn:function(ref){
var on = ref.on;
var attrs = ref.attrs;
return [(_vm.tool.bookmark.active && _vm.show('bookmark'))?_c('v-btn',_vm._g(_vm._b({staticClass:"pa-1 ma-1",staticStyle:{"height":"55px"},attrs:{"large":"","elevation":"0","color":"white","disabled":!_vm.bookmarkVisible},on:{"click":function($event){return _vm.showTags()}}},'v-btn',attrs,false),on),[_c('v-icon',{staticClass:"vxg-icon",attrs:{"large":""}},[_vm._v("mdi-bookmark-minus-outline")])],1):_vm._e()]}}],null,false,1062341858)},[_c('span',[_vm._v(_vm._s((_vm.bookmark ? 'HIDE' : 'SHOW') + ' TAGS'))])]):_vm._e(),(_vm.show('bookmark'))?_c('v-divider',{attrs:{"vertical":""}}):_vm._e(),(_vm.show('collect'))?_c('v-tooltip',{attrs:{"bottom":""},scopedSlots:_vm._u([{key:"activator",fn:function(ref){
var on = ref.on;
var attrs = ref.attrs;
return [(_vm.tool['collect'].active && _vm.show('collect'))?_c('v-btn',_vm._g(_vm._b({staticClass:"pa-1 ma-1",staticStyle:{"height":"55px"},attrs:{"large":"","elevation":"0","color":"white"},on:{"click":function($event){return _vm.collect()}}},'v-btn',attrs,false),on),[_c('v-icon',{staticClass:"vxg-icon",attrs:{"large":""}},[_vm._v("mdi-folder-open-outline")])],1):_vm._e()]}}],null,false,3197050641)},[_c('span',[_vm._v(_vm._s('ASSET COLLECTION'))])]):_vm._e(),(_vm.show('collect'))?_c('v-divider',{attrs:{"vertical":""}}):_vm._e()],1)}
var BasicHeadvue_type_template_id_0107774a_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/BasicHead.vue?vue&type=template&id=0107774a

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/BasicHead.vue?vue&type=script&lang=js
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t.return || t.return(); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator.return && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, catch: function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

function tag_alias(asset) {
  if (null != asset.custom12) {
    return asset.tag + '(' + asset.custom12 + ')';
  }
  return asset.tag;
}
/* harmony default export */ var BasicHeadvue_type_script_lang_js = ({
  props: ['logo'],
  data: function data() {
    return {
      search: '',
      select: '',
      view: {
        tool: {}
      },
      featuresMenu: [],
      items: [],
      tag_items: []
    };
  },
  created: function created() {
    var _this = this;
    return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
      var tool, tag_items, load_assets;
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            tool = {};
            tag_items = [];
            load_assets = setInterval(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
              return _regeneratorRuntime().wrap(function _callee$(_context) {
                while (1) switch (_context.prev = _context.next) {
                  case 0:
                    _context.next = 2;
                    return _this.$store.dispatch('vxg_get_assets', tool);
                  case 2:
                    _this.items = tool.assets;
                    if (_this.items.length != 0) {
                      // this.tag_items = this.items.map(v => v.tag+(''==v.custom12?'':' ('+v.custom12+')'))
                      _this.tag_items = _this.items.map(tag_alias);
                      _this.setupMiniSearch(_this.items);
                      clearInterval(load_assets);
                    }
                  case 4:
                  case "end":
                    return _context.stop();
                }
              }, _callee);
            })), 111);
          case 3:
          case "end":
            return _context2.stop();
        }
      }, _callee2);
    }))();
  },
  mounted: function mounted() {},
  watch: {
    '$store.state.trigger.search.term': function $storeStateTriggerSearchTerm(term) {
      if (term == '' && this.$refs.search) {
        this.$refs.search.reset();
        // this.tag_items = this.items.map(v => v.tag)
        this.tag_items = this.items.map(tag_alias);
      }
    },
    search: function search(val) {
      var term = val || '';
      term.trim();
      // Todo: Is it necessary?
      // let m = term.match(/^([^(]+)\s*\([^)]+\)$/)
      // if(m) {
      //   term = m[1].trim()
      // }
      // this.$store.dispatch('trigger_search', {term:this.search})
      this.$store.dispatch('trigger_search', {
        term: term
      });
    },
    select: function select() {
      this.$store.dispatch('trigger_select', {
        value: this.select
      });
    },
    '$store.state.trigger.select.value': function $storeStateTriggerSelectValue(val) {
      this.select = val;
    },
    '$store.vxg.cmp.BasicHead.allow.add': {
      handler: function handler() {
        this.$forceUpdate();
      }
    },
    '$store.vxg.cmp.BasicHead.allow.remove': {
      handler: function handler() {
        this.$forceUpdate();
      }
    },
    '$route.name': {
      immediate: true,
      handler: function handler(val) {
        var name = this.$route.name;
        var view = this.$model.main.app.web.view[name];
        if (view && view.head) {
          this.view.tool = view.head.tool;
        }
        this.defaults();
      }
    }
  },
  computed: {
    filterDisabled: function filterDisabled() {
      return this.$store.state.trigger.filter_disabled.value;
    },
    filterIcon: function filterIcon() {
      return this.$store.state.vxg.cmp.BasicHead.show.filter;
    },
    bookmarkVisible: function bookmarkVisible() {
      return this.$store.state.trigger.bookmark.visible;
    },
    bookmark: function bookmark() {
      return this.$store.state.trigger.bookmark.value;
    },
    drawerOpen: function drawerOpen() {
      return this.$store.state.vxg.cmp.BasicSide.show;
    },
    detailOpen: function detailOpen() {
      return !this.$store.state.vxg.cmp.BasicMain.show;
    },
    itemName: function itemName() {
      return this.$store.state.vxg.ent.meta.name;
    },
    tool: function tool() {
      // TODO: better if main.app.web.parts.head was provided directly
      var headtool = this.$model.main.app.web.parts.head.tool;
      var viewtool = this.view.tool;
      var tool = this.$main.seneca.util.deep(headtool, viewtool);
      return tool;
    },
    search_config: function search_config() {
      return this.$model.main.ux.custom.search_config;
    }
  },
  methods: {
    setupMiniSearch: function setupMiniSearch(items) {
      var _this2 = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
        var _iterator, _step, item;
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              _iterator = _createForOfIteratorHelper(items);
              try {
                for (_iterator.s(); !(_step = _iterator.n()).done;) {
                  item = _step.value;
                  // item = {...item}
                  _this2.$seneca.post('sys:search, cmd:add', {
                    doc: item
                  });
                }
              } catch (err) {
                _iterator.e(err);
              } finally {
                _iterator.f();
              }
            case 2:
            case "end":
              return _context3.stop();
          }
        }, _callee3);
      }))();
    },
    // bypass default combobox filter
    customFilter: function customFilter(item, queryText, itemText) {
      return 1;
    },
    // on-keydown and on-clear logic
    changeSearch: function changeSearch(event) {
      var _this3 = this;
      setTimeout(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
        var term, out;
        return _regeneratorRuntime().wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              // wait for input

              term = event.target ? event.target._value : null;
              if (!term) {
                _context4.next = 8;
                break;
              }
              _context4.next = 4;
              return _this3.$seneca.post('sys:search, cmd:search', {
                query: term,
                params: _this3.search_config
              });
            case 4:
              out = _context4.sent;
              // this.tag_items = out.data.hits.map(v => v.id)
              _this3.tag_items = out.data.hits.map(function (v) {
                return tag_alias(v.doc);
              });
              _context4.next = 9;
              break;
            case 8:
              // this.tag_items = this.items.map(v => v.tag)
              _this3.tag_items = _this3.items.map(tag_alias);
            case 9:
            case "end":
              return _context4.stop();
          }
        }, _callee4);
      })), 11);
    },
    filterAssets: function filterAssets() {
      this.$store.dispatch('vxg_trigger_go');
    },
    clearFilter: function clearFilter() {
      this.$store.dispatch('vxg_trigger_clear');
    },
    defaults: function defaults() {
      if (this.tool.select.active) {
        this.select = this.tool.select.initial;
      }
    },
    print: function print() {
      this.$store.dispatch('vxg_trigger_printMap');
    },
    collect: function collect() {
      this.$store.dispatch('vxg_trigger_collect');
    },
    showTags: function showTags() {
      this.$store.dispatch('adjust_trigger_bookmark');
    },
    getTags: function getTags() {
      var tool = {};
      this.$store.dispatch('vxg_get_assets', tool);
      return tool.assets.map(function (v) {
        return v.tag;
      });
    },
    addItem: function addItem() {
      this.$store.dispatch('trigger_led_add');
    },
    addMobileAsset: function addMobileAsset() {
      this.$store.dispatch('trigger_led_add_mobile');
    },
    removeItem: function removeItem() {
      this.$store.dispatch('trigger_led_remove');
    },
    selectItems: function selectItems() {
      var items = [];
      if (this.tool.select.items) {
        Object.entries(this.tool.select.items).reduce(function (items, entry) {
          items.push({
            value: entry[0],
            text: entry[1].title
          });
          return items;
        }, items);
      }
      return items;
    },
    filter: function filter() {
      this.$store.dispatch('trigger_toggle_filter');
    },
    show: function show(action) {
      return this.allow(action) && this.$store.state.vxg.cmp.BasicHead.show[action];
    },
    allow: function allow(action) {
      var allowed = this.$store.state.vxg.cmp.BasicHead.allow[action];
      return null == allowed ? true : allowed;
    },
    openDrawer: function openDrawer() {
      this.$store.dispatch('set_cmp_flags', {
        name: 'BasicSide',
        flags: {
          show: true
        }
      });
    },
    closeDetail: function closeDetail() {
      this.$store.dispatch('set_cmp_flags', {
        name: 'BasicMain',
        flags: {
          show: false
        }
      });
    },
    action: function action(name) {
      this.$emit('action', name);
    }
  }
});
// CONCATENATED MODULE: ./src/components/BasicHead.vue?vue&type=script&lang=js
 /* harmony default export */ var components_BasicHeadvue_type_script_lang_js = (BasicHeadvue_type_script_lang_js); 
// EXTERNAL MODULE: ./src/components/BasicHead.vue?vue&type=style&index=0&id=0107774a&prod&lang=scss
var BasicHeadvue_type_style_index_0_id_0107774a_prod_lang_scss = __webpack_require__("53ab");

// EXTERNAL MODULE: external "vuetify/lib/components/VAppBar"
var VAppBar_ = __webpack_require__("d7c8");

// EXTERNAL MODULE: external "vuetify/lib/components/VBtn"
var VBtn_ = __webpack_require__("863d");

// EXTERNAL MODULE: external "vuetify/lib/components/VCombobox"
var VCombobox_ = __webpack_require__("2757");

// EXTERNAL MODULE: external "vuetify/lib/components/VDivider"
var VDivider_ = __webpack_require__("ffda");

// EXTERNAL MODULE: external "vuetify/lib/components/VIcon"
var VIcon_ = __webpack_require__("354e");

// EXTERNAL MODULE: external "vuetify/lib/components/VSelect"
var VSelect_ = __webpack_require__("bfa4");

// EXTERNAL MODULE: external "vuetify/lib/components/VGrid"
var VGrid_ = __webpack_require__("5f3c");

// EXTERNAL MODULE: external "vuetify/lib/components/VTooltip"
var VTooltip_ = __webpack_require__("e8e3");

// CONCATENATED MODULE: ./src/components/BasicHead.vue






/* normalize component */

var BasicHead_component = normalizeComponent(
  components_BasicHeadvue_type_script_lang_js,
  BasicHeadvue_type_template_id_0107774a_render,
  BasicHeadvue_type_template_id_0107774a_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var BasicHead = (BasicHead_component.exports);

/* vuetify-loader */









installComponents_default()(BasicHead_component, {VAppBar: VAppBar_["VAppBar"],VBtn: VBtn_["VBtn"],VCombobox: VCombobox_["VCombobox"],VDivider: VDivider_["VDivider"],VIcon: VIcon_["VIcon"],VSelect: VSelect_["VSelect"],VSpacer: VGrid_["VSpacer"],VTooltip: VTooltip_["VTooltip"]})

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"74b366d7-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/BasicFoot.vue?vue&type=template&id=585b97d2
var BasicFootvue_type_template_id_585b97d2_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_vm._v("___")])}
var BasicFootvue_type_template_id_585b97d2_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/BasicFoot.vue?vue&type=template&id=585b97d2

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/BasicFoot.vue?vue&type=script&lang=js
//
//
//
//
//
//

/* harmony default export */ var BasicFootvue_type_script_lang_js = ({
  data: function data() {
    return {};
  },
  created: function created() {}
});
// CONCATENATED MODULE: ./src/components/BasicFoot.vue?vue&type=script&lang=js
 /* harmony default export */ var components_BasicFootvue_type_script_lang_js = (BasicFootvue_type_script_lang_js); 
// CONCATENATED MODULE: ./src/components/BasicFoot.vue





/* normalize component */

var BasicFoot_component = normalizeComponent(
  components_BasicFootvue_type_script_lang_js,
  BasicFootvue_type_template_id_585b97d2_render,
  BasicFootvue_type_template_id_585b97d2_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var BasicFoot = (BasicFoot_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"74b366d7-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/BasicMain.vue?vue&type=template&id=5e096dd0
var BasicMainvue_type_template_id_5e096dd0_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('v-main',{attrs:{"app":""}},[_c('v-container',{staticStyle:{"padding":"0px"},attrs:{"fluid":""}},[_c('router-view',{tag:"component",attrs:{"spec":_vm.view_spec}})],1)],1)}
var BasicMainvue_type_template_id_5e096dd0_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/BasicMain.vue?vue&type=template&id=5e096dd0

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/BasicMain.vue?vue&type=script&lang=js
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var BasicMainvue_type_script_lang_js = ({
  props: {
    /*
    spec: {
      type: Object,
      required: true,
      }
      */
  },
  data: function data() {
    return {};
  },
  computed: {
    view_spec: function view_spec() {
      var viewname = this.$route.meta.view || this.$model.main.app.web.defaults.view;
      var spec = this.$model.main.app.web.view[viewname].spec;
      return spec;
    }
  }
});
// CONCATENATED MODULE: ./src/components/BasicMain.vue?vue&type=script&lang=js
 /* harmony default export */ var components_BasicMainvue_type_script_lang_js = (BasicMainvue_type_script_lang_js); 
// EXTERNAL MODULE: external "vuetify/lib/components/VMain"
var VMain_ = __webpack_require__("1faa");

// CONCATENATED MODULE: ./src/components/BasicMain.vue





/* normalize component */

var BasicMain_component = normalizeComponent(
  components_BasicMainvue_type_script_lang_js,
  BasicMainvue_type_template_id_5e096dd0_render,
  BasicMainvue_type_template_id_5e096dd0_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var BasicMain = (BasicMain_component.exports);

/* vuetify-loader */



installComponents_default()(BasicMain_component, {VContainer: VGrid_["VContainer"],VMain: VMain_["VMain"]})

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"74b366d7-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/BasicSide.vue?vue&type=template&id=91e318f0
var BasicSidevue_type_template_id_91e318f0_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('v-navigation-drawer',{staticClass:"vxg-side",style:(_vm.drawerStyle),attrs:{"app":""}},[_c('v-sheet',{staticStyle:{"display":"flex","flex-direction":"column","height":"100%"}},[_c('div',{staticStyle:{"display":"flex","justify-content":"space-between"}},[_c('div',{domProps:{"innerHTML":_vm._s(_vm.logo)}}),_c('v-icon',{staticStyle:{"width":"48px"},attrs:{"large":"","dark":""},on:{"click":_vm.closeDrawer}},[_vm._v("mdi-chevron-left")])],1),_c('v-btn-toggle',{staticClass:"vxg-toggle",attrs:{"mandatory":""},model:{value:(_vm.menuViewIndex),callback:function ($$v) {_vm.menuViewIndex=$$v},expression:"menuViewIndex"}},_vm._l((_vm.menuViewList),function(menuView){return _c('v-btn',{key:menuView.name,ref:menuView.name,refInFor:true,staticClass:"pa-4 text-center secondary text-no-wrap rounded-sm btn-style text-capitalize",staticStyle:{"height":"70px"},attrs:{"outlined":"","color":"white"},on:{"click":function($event){return _vm.moveRoute(menuView)}}},[_c('div',[_c('v-icon',{staticStyle:{"color":"white"}},[_vm._v(" "+_vm._s(menuView.name == _vm.custom.special.view.name ? 'mdi-fit-to-screen-outline' : 'mdi-dots-square')+" ")]),_c('span',{staticStyle:{"display":"block","font-size":"13px","padding":"5px"}},[_vm._v(" "+_vm._s(menuView.btnTitle)+" ")])],1)])}),1),_vm._l((_vm.menu),function(item){return ('standard' === _vm.menuView.mode)?[(_vm.allow(item))?_c('router-link',{key:item.code,tag:"component",class:item.klass,staticStyle:{"flex-grow":"1"},attrs:{"to":'/'+item.code}},[_c('v-icon',[_vm._v("mdi-"+_vm._s(item.icon))]),_vm._v(" "+_vm._s(item.title)+" ")],1):_vm._e()]:_vm._e()}),('custom' === _vm.menuView.mode)?_c(_vm.menuView.cmp,{tag:"component",attrs:{"spec":_vm.menuView.view.spec}}):_vm._e(),_c('div',{staticStyle:{"flex-grow":"100"}}),_c('v-divider'),(_vm.spec.footer.active)?_c(_vm.spec.footer.cmp,{tag:"component",attrs:{"spec":_vm.spec.footer.spec}}):_vm._e()],2)],1)}
var BasicSidevue_type_template_id_91e318f0_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/BasicSide.vue?vue&type=template&id=91e318f0

// EXTERNAL MODULE: ./node_modules/nua/dist/nua.min.js
var nua_min = __webpack_require__("ec45");
var nua_min_default = /*#__PURE__*/__webpack_require__.n(nua_min);

// EXTERNAL MODULE: ./node_modules/gubu/gubu.min.js
var gubu_min = __webpack_require__("bce7");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/BasicSide.vue?vue&type=script&lang=js
function BasicSidevue_type_script_lang_js_createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = BasicSidevue_type_script_lang_js_unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t.return || t.return(); } finally { if (u) throw o; } } }; }
function BasicSidevue_type_script_lang_js_unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return BasicSidevue_type_script_lang_js_arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? BasicSidevue_type_script_lang_js_arrayLikeToArray(r, a) : void 0; } }
function BasicSidevue_type_script_lang_js_arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



var SpecShape = Object(gubu_min["Gubu"])({
  spec: Object(gubu_min["Required"])(Object(gubu_min["Open"])({
    footer: {
      active: false,
      cmp: Object(gubu_min["Skip"])(String),
      spec: Object(gubu_min["Open"])({})
    },
    view: Object(gubu_min["Value"])(Object(gubu_min["Open"])({
      mode: String
    }), Object(gubu_min["Open"])({}))
  })),
  logo: String
});
/* harmony default export */ var BasicSidevue_type_script_lang_js = ({
  props: {
    spec: {
      type: Object,
      required: true
    },
    logo: String
  },
  data: function data() {
    return {
      open: true,
      menuShowTitle: false,
      menuViewList: [],
      menuViewIndex: null,
      menuView: null,
      roomName: ''
    };
  },
  beforeCreate: function beforeCreate() {
    nua_min_default()(this.$options.propsData, SpecShape(this.$options.propsData));
  },
  created: function created() {
    var menuViewList = [];
    for (var name in this.spec.view) {
      var menuView = this.spec.view[name];
      menuView.name = name;
      menuViewList.push(menuView);
    }
    this.menuViewList = menuViewList;
    var route = this.findRouteName(this.$route.name);
    this.menuView = this.menuViewList[route.index];
    this.menuViewIndex = route.index;
  },
  watch: {
    menuViewIndex: function menuViewIndex(index) {
      var pathname = null;
      pathname = this.menuView.name;
      /*
      if('custom' === this.menuView.mode) {
        pathname = this.menuView.name
      }
      else {
        if(this.$route.path == this.portal.path) {
          pathname = this.menuView.menu.default
        }
        else {
          pathname = this.$route.name
        }
      }
       if(pathname && pathname !== this.$route.name ) {
        this.$router.push(pathname)
      }
      */
    },
    '$route.name': {
      immediate: true,
      handler: function handler(val) {
        if (!val && this.defaultFound()) {
          this.$router.push(this.menuView.menu.default);
        }
        var route = this.findRouteName(val);
        this.menuView = this.menuViewList[route.index];
      }
    }
  },
  computed: {
    menu: function menu() {
      var active_item_code = this.$route.meta.view;
      var ux_items = [];
      if ('standard' === this.menuView.mode) {
        var menu = this.menuView.menu;
        var spec_items = menu.items;
        var ordered_codes = menu.order.split(/\s*,\s*/);
        ux_items = ordered_codes.reduce(function (a, c) {
          return a.push(Object.assign({
            code: c
          }, spec_items[c])), a;
        }, []).map(function (item) {
          item.klass = Object.assign({
            'vxg-router-link': true
          });
          return item;
        });
      }
      return ux_items;
    },
    drawerStyle: function drawerStyle() {
      return {
        width: "282px"
      }; // 250 px
    },
    custom: function custom() {
      return this.$model.main.ux.custom;
    },
    view: function view() {
      return this.custom.special.view;
    },
    portal: function portal() {
      return this.custom.special.portal;
    }
  },
  methods: {
    moveRoute: function moveRoute(menuView) {
      var path = this.$route.name;
      if (menuView.mode == 'standard') {
        if (path != menuView.menu.default) {
          this.$router.push('/' + menuView.menu.default);
        }
      } else if (menuView.mode == 'custom') {
        if (path != menuView.name) {
          this.$router.push('/' + menuView.name);
        }
      }
    },
    defaultFound: function defaultFound() {
      return this.menuView && this.menuView.menu && this.menuView.menu.default;
    },
    findRouteName: function findRouteName(name) {
      var subroutes;
      for (var route in this.custom.special) {
        if (this.custom.special[route].name == name) {
          return this.custom.special[route];
        }
        if (subroutes = this.custom.special[route].sub) {
          var _iterator = BasicSidevue_type_script_lang_js_createForOfIteratorHelper(subroutes),
            _step;
          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              var sub = _step.value;
              if (sub == name) {
                return this.custom.special[route];
              }
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }
        }
      }
      return {
        index: 1
      }; // default index
    },
    allow: function allow(item) {
      var out = item && item.allow ? this.$vxg.allow(item.allow) : true;
      return out;
    },
    openDrawer: function openDrawer() {
      this.$store.dispatch('set_cmp_flags', {
        name: 'BasicSide',
        flags: {
          show: true
        }
      });
    },
    closeDrawer: function closeDrawer() {
      this.$store.dispatch('set_cmp_flags', {
        name: 'BasicSide',
        flags: {
          show: false
        }
      });
    },
    action: function action(name) {
      this.$emit('action', name);
    }
  }
});
// CONCATENATED MODULE: ./src/components/BasicSide.vue?vue&type=script&lang=js
 /* harmony default export */ var components_BasicSidevue_type_script_lang_js = (BasicSidevue_type_script_lang_js); 
// EXTERNAL MODULE: ./src/components/BasicSide.vue?vue&type=style&index=0&id=91e318f0&prod&lang=scss
var BasicSidevue_type_style_index_0_id_91e318f0_prod_lang_scss = __webpack_require__("66cb");

// EXTERNAL MODULE: external "vuetify/lib/components/VBtnToggle"
var VBtnToggle_ = __webpack_require__("dbe5");

// EXTERNAL MODULE: external "vuetify/lib/components/VNavigationDrawer"
var VNavigationDrawer_ = __webpack_require__("8ece");

// EXTERNAL MODULE: external "vuetify/lib/components/VSheet"
var VSheet_ = __webpack_require__("8fd1");

// CONCATENATED MODULE: ./src/components/BasicSide.vue






/* normalize component */

var BasicSide_component = normalizeComponent(
  components_BasicSidevue_type_script_lang_js,
  BasicSidevue_type_template_id_91e318f0_render,
  BasicSidevue_type_template_id_91e318f0_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var BasicSide = (BasicSide_component.exports);

/* vuetify-loader */







installComponents_default()(BasicSide_component, {VBtn: VBtn_["VBtn"],VBtnToggle: VBtnToggle_["VBtnToggle"],VDivider: VDivider_["VDivider"],VIcon: VIcon_["VIcon"],VNavigationDrawer: VNavigationDrawer_["VNavigationDrawer"],VSheet: VSheet_["VSheet"]})

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"74b366d7-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/BasicLed.vue?vue&type=template&id=7167a536
var BasicLedvue_type_template_id_7167a536_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.allow('list'))?_c('div',[(_vm.show.table)?_c('v-data-table',{attrs:{"dense":"","headers":_vm.headers,"items":_vm.items,"items-per-page":25,"x-custom-filter":"customFilter","footer-props":{
                   itemsPerPageOptions:[25,50,75,100,-1]
                   },"loading":_vm.loading,"sort-by":_vm.sortBy,"sort-desc":_vm.sortDesc,"search":_vm.search},on:{"click:row":_vm.openItem,"update:sortBy":function($event){_vm.sortBy=$event},"update:sort-by":function($event){_vm.sortBy=$event},"update:sortDesc":function($event){_vm.sortDesc=$event},"update:sort-desc":function($event){_vm.sortDesc=$event}},scopedSlots:_vm._u([{key:"loading",fn:function(){return [_c('div',{staticStyle:{"text-align":"left","padding":"5vh"}},[_c('v-progress-linear',{attrs:{"indeterminate":"","color":"blue darken-2"}})],1)]},proxy:true},_vm._l((_vm.headers),function(header){return {key:_vm.itemslot(header),fn:function(ref){
                   var item = ref.item;
return [_c('div',{key:header.value},[('status'===header.type)?_c('span',[_c('v-chip',{staticStyle:{"font-weight":"bold","color":"white"},attrs:{"small":"","xclass":"ma-2","color":'outofdate'===item[header.value]?'red':'suspended'===item[header.value]?'orange':'blue'}},[_vm._v(" "+_vm._s((header.kind[item[header.value]]||{}).title)+" ")])],1):('datetime'===header.type)?_c('span',[_vm._v(" "+_vm._s(new Date(item[header.value]))+" ")]):_c('span',[_vm._v(_vm._s(item[header.value]))])])]}}})],null,true)},[(_vm.loadState=='error')?_c('div',{staticStyle:{"text-align":"left","padding":"5vh"}},[_c('span',[_vm._v(" error - no results ")])]):_vm._e()]):_vm._e(),(_vm.show.item)?_c('div',[(_vm.showEditToolbar)?_c('v-toolbar',{attrs:{"flat":""}},[_c('v-spacer')],1):_vm._e(),_c('div',{staticStyle:{"box-sizing":"border-box","display":"flex","flex-flow":"row wrap"}},[_vm._l((_vm.fields),function(field,fI){return _c('div',{key:fI,staticClass:"vxg-form-field",style:(_vm.fieldstyle(field,fI))},[(field.popup)?_c('a',{staticStyle:{"text-decoration":"underline"},on:{"click":function($event){return _vm.activatePopup(field.popup)}}},[_vm._v(" "+_vm._s(field.popup.spec.title)+" ")]):_c('a',[_vm._v(" ‌ ")]),('string'===field.type)?_c('v-text-field',{attrs:{"label":field.title,"outlined":"","disabled":field.readonly || !_vm.allow('edit', field),"rules":field.rules},model:{value:(_vm.item[field.name]),callback:function ($$v) {_vm.$set(_vm.item, field.name, $$v)},expression:"item[field.name]"}}):_vm._e(),(field.popup)?_c('v-dialog',{attrs:{"height":field.popup.height,"width":field.popup.width},model:{value:(_vm.popup_dialogs[field.popup.name]),callback:function ($$v) {_vm.$set(_vm.popup_dialogs, field.popup.name, $$v)},expression:"popup_dialogs[field.popup.name]"}},[_c(field.popup.cmp,{tag:"component",attrs:{"v-if":field.popup.active,"spec":field.popup.spec}})],1):_vm._e(),('status'===field.type)?_c('vxg-basic-field-pick',{attrs:{"field":field,"param":{item:_vm.item}}}):_vm._e(),('datetime'===field.type)?_c('v-text-field',{attrs:{"label":field.title,"outlined":"","disabled":""},model:{value:(_vm.readitem[field.name]),callback:function ($$v) {_vm.$set(_vm.readitem, field.name, $$v)},expression:"readitem[field.name]"}}):_vm._e(),('basicled'===field.type)?_c('vxg-basic-led',{attrs:{"spec":field.spec,"param":{item:_vm.item}}}):_vm._e(),('changes'===field.type)?_c('div',{staticClass:"changes"},[_c('h3',[_vm._v("Changes")]),_c('table',{attrs:{"border":"0","cellpadding":"0","cellspacing":"0"}},[_vm._m(0,true),_vm._l((_vm.changes(_vm.item.changes)),function(change){return _c('tr',{key:change.title},[_c('td',[_vm._v(_vm._s(change.title))]),_c('td',[_vm._v(_vm._s(change.old))]),_c('td',[_vm._v(_vm._s(change.new))])])})],2)]):_vm._e()],1)}),_c('v-dialog',{attrs:{"width":"500"},on:{"keydown":function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"esc",27,$event.key,["Esc","Escape"])){ return null; }return _vm.removeItemCancel($event)}},model:{value:(_vm.remove.dialog),callback:function ($$v) {_vm.$set(_vm.remove, "dialog", $$v)},expression:"remove.dialog"}},[_c('v-card',[_c('v-toolbar',{attrs:{"dense":"","flat":""}},[_c('v-toolbar-title',[_vm._v(" "+_vm._s('Remove ' + this.spec.ent.primary.name||false)+" ")])],1),_c('v-card-text',{staticClass:"pa-4"},[_vm._v(" Confirm you would like to remove: "+_vm._s(_vm.getName(this.item))+" ")]),_c('v-card-actions',{staticClass:"pt-0"},[_c('v-spacer'),_c('v-btn',{attrs:{"outlined":""},on:{"click":_vm.removeItemCancel}},[_vm._v("Cancel")]),_c('v-btn',{attrs:{"outlined":""},on:{"click":_vm.removeItem}},[_vm._v("Remove")])],1)],1)],1)],2),_c('v-toolbar',{attrs:{"flat":""}},[_c('v-btn',{attrs:{"outlined":""},on:{"click":_vm.closeItem}},[_vm._v("Cancel")]),_c('v-spacer'),(_vm.allow('edit'))?_c('v-btn',{attrs:{"outlined":""},on:{"click":function($event){_vm.remove.dialog = true}}},[_vm._v("Remove")]):_vm._e(),_c('div',{staticStyle:{"padding":"5px"}}),(_vm.allow('edit'))?_c('v-btn',{attrs:{"outlined":""},on:{"click":_vm.saveItem}},[_vm._v("Save")]):_vm._e()],1)],1):_vm._e()],1):_vm._e()}
var BasicLedvue_type_template_id_7167a536_staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('tr',[_c('th',[_vm._v("Field")]),_c('th',[_vm._v("Old")]),_c('th',[_vm._v("New")])])}]


// CONCATENATED MODULE: ./src/components/BasicLed.vue?vue&type=template&id=7167a536

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/BasicLed.vue?vue&type=script&lang=js
function BasicLedvue_type_script_lang_js_typeof(o) { "@babel/helpers - typeof"; return BasicLedvue_type_script_lang_js_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, BasicLedvue_type_script_lang_js_typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == BasicLedvue_type_script_lang_js_typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != BasicLedvue_type_script_lang_js_typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != BasicLedvue_type_script_lang_js_typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function BasicLedvue_type_script_lang_js_createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = BasicLedvue_type_script_lang_js_unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t.return || t.return(); } finally { if (u) throw o; } } }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || BasicLedvue_type_script_lang_js_unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function BasicLedvue_type_script_lang_js_unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return BasicLedvue_type_script_lang_js_arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? BasicLedvue_type_script_lang_js_arrayLikeToArray(r, a) : void 0; } }
function BasicLedvue_type_script_lang_js_arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function BasicLedvue_type_script_lang_js_regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ BasicLedvue_type_script_lang_js_regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == BasicLedvue_type_script_lang_js_typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator.return && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(BasicLedvue_type_script_lang_js_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, catch: function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function BasicLedvue_type_script_lang_js_asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function BasicLedvue_type_script_lang_js_asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { BasicLedvue_type_script_lang_js_asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { BasicLedvue_type_script_lang_js_asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var BasicLedvue_type_script_lang_js = ({
  props: {
    spec: {
      type: Object,
      required: true
    },
    param: {
      type: Object,
      default: function _default() {}
    }
  },
  data: function data() {
    return {
      item: null,
      readitem: null,
      show: {
        table: true,
        item: false
      },
      sortBy: 'when',
      sortDesc: true,
      search: '',
      loadlen: 0,
      showprogress: true,
      loadingerror: false,
      // 'loading' | 'error' | 'done'
      loadState: 'loading',
      remove: {
        dialog: false
      },
      popup_dialogs: {}
    };
  },
  mounted: function mounted() {},
  created: function created() {
    var _this = this;
    return BasicLedvue_type_script_lang_js_asyncToGenerator(/*#__PURE__*/BasicLedvue_type_script_lang_js_regeneratorRuntime().mark(function _callee() {
      return BasicLedvue_type_script_lang_js_regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _this.popup_dialogs = _this.fields.reduce(function (acc, field) {
              return field.popup ? acc[field.popup.name] = false : null, acc;
            }, {});
            _context.prev = 1;
            _context.next = 4;
            return _this.$store.dispatch('list_' + _this.spec.ent.store_name);
          case 4:
            _this.loadState = 'done';
            _context.next = 11;
            break;
          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](1);
            _this.loadState = 'error';
            console.error(_context.t0);
          case 11:
          case "end":
            return _context.stop();
        }
      }, _callee, null, [[1, 7]]);
    }))();
  },
  watch: {
    '$store.state.trigger.led.add': function $storeStateTriggerLedAdd() {
      this.openItem({
        last: Date.now()
      });
    },
    '$store.state.trigger.search.term': function $storeStateTriggerSearchTerm(term) {
      this.search = term;
    },
    '$route': {
      immediate: true,
      handler: function handler() {
        this.$store.dispatch('set_cmp_flags', {
          name: 'BasicHead',
          flags: {
            show: {
              add: this.spec.edit.active,
              search: this.spec.search && this.spec.search.active
            },
            allow: {
              add: this.allow('edit')
            }
          }
        });
        this.$store.dispatch('set_ent_meta', {
          name: this.spec.ent.primary.name || 'Item'
        });
      }
    }
  },
  computed: {
    loading: function loading() {
      return this.loadState == 'loading';
    },
    headers: function headers() {
      var headermap = {};
      Object.entries(this.spec.ent.primary.field).forEach(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
          fn = _ref2[0],
          fd = _ref2[1];
        return headermap[fn] = {
          value: fn,
          text: fd.title,
          type: fd.type,
          kind: fd.kind || {}
        };
      });
      var headers = (this.spec.list.layout.order ? this.spec.list.layout.order.split(/\s*,\s*/) : Object.keys(this.spec.ent.primary.field)).map(function (fn) {
        return headermap[fn];
      }).filter(function (h) {
        return null != h;
      });
      return headers;
    },
    items: function items() {
      var _this2 = this;
      var items = this.$store.state[this.spec.ent.store_name];

      // TODO: generalize
      if ('user-by-role' === this.spec.name) {
        items = items.filter(function (item) {
          return _this2.param.item.role === item.profile;
        });
        //items = items.filter(item=>'op'===item.profile)
      }
      return items;
    },
    fields: function fields() {
      try {
        var fds = [];
        var fns = this.spec.edit.layout.order.split(/,/);
        var _iterator = BasicLedvue_type_script_lang_js_createForOfIteratorHelper(fns),
          _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var fn = _step.value;
            // TODO: remove when model fixed
            // TODO: handle virtual/derived fields cleanly
            var fd = _objectSpread({}, this.spec.ent.primary.field[fn]) || {};
            fd.name = fn;

            //fd.size = this.spec.edit.layout.field[fn].size 
            fd = _objectSpread(_objectSpread({}, fd), this.spec.edit.layout.field[fn] || {});
            fd.custom = fd.custom || {};
            fd.custom.allow = fd.custom.allow || this.allow.bind(this);
            fds.push(fd);
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
        return fds;
      } catch (e) {
        // console.error(e)
      }
      return [];
    },
    showEditToolbar: function showEditToolbar() {
      if (this.allow('edit')) {
        var active = this.spec.edit.layout.toolbar.active;
        if (true === active) {
          return active;
        } else if (active && active.field) {
          var show = true;
          for (var _i = 0, _Object$entries = Object.entries(active.field); _i < _Object$entries.length; _i++) {
            var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
              name = _Object$entries$_i[0],
              criteria = _Object$entries$_i[1];
            if ('not-empty' === criteria) {
              show = show && null != this.item[name];
            } else {
              show = false;
            }
          }
          return show;
        }
      }
      return false;
    },
    customInfoFields: function customInfoFields() {
      return this.$model.main.ux.custom.info_fields;
    }
  },
  methods: {
    itemslot: function itemslot(header) {
      return 'item.' + header.value;
    },
    selection: function selection(field) {
      var kinds = field.kind && Object.entries(field.kind);
      var selects = kinds ? kinds.map(function (_ref3) {
        var _ref4 = _slicedToArray(_ref3, 2),
          n = _ref4[0],
          d = _ref4[1];
        return {
          text: d.title,
          value: n
        };
      }) : [];
      return selects;
    },
    customAction: function customAction(action) {
      this.$store.dispatch(action, this.item);
    },
    openItem: function openItem(selitem) {
      if (false === this.spec.edit.active) {
        // || !this.allow('edit')) {
        return;
      }
      this.item = selitem;
      this.readitem = _objectSpread({}, this.item);

      // TODO: from spec!
      this.readitem.last = this.formatdate(this.item.last);
      this.readitem.when = this.formatdate(this.item.when);
      this.show.table = false;
      this.show.item = true;
    },
    saveItem: function saveItem() {
      this.$store.dispatch('save_' + this.spec.ent.store_name, this.item);
      this.show.table = true;
      this.show.item = false;
    },
    removeItem: function removeItem() {
      this.$store.dispatch('remove_' + this.spec.ent.store_name, this.item);
      this.show.table = true;
      this.show.item = false;
      this.remove.dialog = false;
    },
    removeItemCancel: function removeItemCancel() {
      this.remove.dialog = false;
    },
    closeItem: function closeItem() {
      this.show.table = true;
      this.show.item = false;
    },
    fieldstyle: function fieldstyle(field) {
      return {
        'flex-basis': 100 * field.size / 12 + '%'
      };
    },
    formatdate: function formatdate(time) {
      return new Date(time).toString();
    },
    customFilter: function customFilter(value, search, item) {
      return true;
    },
    allow: function allow(action, field) {
      var out = true;
      var match = this.spec[action] && this.spec[action].allow;
      if (match) {
        out = this.$vxg.allow(match);
      }
      if (action == 'edit' && field && field.edit === false) {
        if (this.item.created) {
          out = false;
        }
      }
      return out;
    },
    changes: function changes(cmjson) {
      var _this3 = this;
      var cm = null == cmjson ? {} : JSON.parse(cmjson);
      var chs = Object.keys(cm).filter(function (k) {
        return 'audit' != k;
      }).reduce(function (a, c) {
        return a.push({
          title: c,
          field: c,
          old: cm[c][0],
          new: cm[c][1]
        }), a;
      }, []);
      if (this.customInfoFields) {
        chs = chs.filter(function (v) {
          var field;
          // if there are no changes - don't show the field
          if (!v.old && !v.new) {
            return 0;
          }
          if (field = _this3.getInfoFieldByName(v.title)) {
            v.title = field.title;
          }
          return 1;
        });
      }
      return chs;
    },
    getInfoFieldByName: function getInfoFieldByName(name) {
      var _iterator2 = BasicLedvue_type_script_lang_js_createForOfIteratorHelper(this.customInfoFields),
        _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var field = _step2.value;
          if (field.name == name) {
            return field;
          }
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
      return null;
    },
    getName: function getName(item) {
      // use 'ordered' fields and get the first key
      var key = Object.keys(this.spec.edit.layout.field)[0];
      return item[key];
    },
    activatePopup: function activatePopup(popup) {
      this.popup_dialogs[popup.name] = true;
    }
  }
});
// CONCATENATED MODULE: ./src/components/BasicLed.vue?vue&type=script&lang=js
 /* harmony default export */ var components_BasicLedvue_type_script_lang_js = (BasicLedvue_type_script_lang_js); 
// EXTERNAL MODULE: ./src/components/BasicLed.vue?vue&type=style&index=0&id=7167a536&prod&lang=scss
var BasicLedvue_type_style_index_0_id_7167a536_prod_lang_scss = __webpack_require__("e7fb");

// EXTERNAL MODULE: external "vuetify/lib/components/VCard"
var VCard_ = __webpack_require__("b7cf");

// EXTERNAL MODULE: external "vuetify/lib/components/VChip"
var VChip_ = __webpack_require__("6b38");

// EXTERNAL MODULE: external "vuetify/lib/components/VDataTable"
var VDataTable_ = __webpack_require__("b1bf");

// EXTERNAL MODULE: external "vuetify/lib/components/VDialog"
var VDialog_ = __webpack_require__("3699");

// EXTERNAL MODULE: external "vuetify/lib/components/VProgressLinear"
var VProgressLinear_ = __webpack_require__("ef2d");

// EXTERNAL MODULE: external "vuetify/lib/components/VTextField"
var VTextField_ = __webpack_require__("6881");

// EXTERNAL MODULE: external "vuetify/lib/components/VToolbar"
var VToolbar_ = __webpack_require__("e34a");

// CONCATENATED MODULE: ./src/components/BasicLed.vue






/* normalize component */

var BasicLed_component = normalizeComponent(
  components_BasicLedvue_type_script_lang_js,
  BasicLedvue_type_template_id_7167a536_render,
  BasicLedvue_type_template_id_7167a536_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var BasicLed = (BasicLed_component.exports);

/* vuetify-loader */













installComponents_default()(BasicLed_component, {VBtn: VBtn_["VBtn"],VCard: VCard_["VCard"],VCardActions: VCard_["VCardActions"],VCardText: VCard_["VCardText"],VChip: VChip_["VChip"],VDataTable: VDataTable_["VDataTable"],VDialog: VDialog_["VDialog"],VProgressLinear: VProgressLinear_["VProgressLinear"],VSpacer: VGrid_["VSpacer"],VTextField: VTextField_["VTextField"],VToolbar: VToolbar_["VToolbar"],VToolbarTitle: VToolbar_["VToolbarTitle"]})

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"74b366d7-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/BasicFieldPick.vue?vue&type=template&id=f6dac43a
var BasicFieldPickvue_type_template_id_f6dac43a_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('v-select',{attrs:{"items":_vm.pick(_vm.field),"label":_vm.field.title,"outlined":"","disabled":_vm.field.readonly || !_vm.allow('edit')},model:{value:(_vm.item[_vm.field.name]),callback:function ($$v) {_vm.$set(_vm.item, _vm.field.name, $$v)},expression:"item[field.name]"}})}
var BasicFieldPickvue_type_template_id_f6dac43a_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/BasicFieldPick.vue?vue&type=template&id=f6dac43a

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/BasicFieldPick.vue?vue&type=script&lang=js
function BasicFieldPickvue_type_script_lang_js_slicedToArray(r, e) { return BasicFieldPickvue_type_script_lang_js_arrayWithHoles(r) || BasicFieldPickvue_type_script_lang_js_iterableToArrayLimit(r, e) || BasicFieldPickvue_type_script_lang_js_unsupportedIterableToArray(r, e) || BasicFieldPickvue_type_script_lang_js_nonIterableRest(); }
function BasicFieldPickvue_type_script_lang_js_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function BasicFieldPickvue_type_script_lang_js_unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return BasicFieldPickvue_type_script_lang_js_arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? BasicFieldPickvue_type_script_lang_js_arrayLikeToArray(r, a) : void 0; } }
function BasicFieldPickvue_type_script_lang_js_arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function BasicFieldPickvue_type_script_lang_js_iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function BasicFieldPickvue_type_script_lang_js_arrayWithHoles(r) { if (Array.isArray(r)) return r; }
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var BasicFieldPickvue_type_script_lang_js = ({
  props: {
    field: {
      type: Object,
      required: true
    },
    param: {
      type: Object,
      default: function _default() {
        return {};
      }
    }
  },
  data: function data() {
    return {};
  },
  created: function created() {
    var custom = this.custom = this.field.custom || {};
    custom.allow = custom.allow || function () {
      return true;
    };
  },
  computed: {
    item: function item() {
      return this.param.item;
    }
  },
  methods: {
    pick: function pick(field) {
      var kinds = field.kind && Object.entries(field.kind) || [];
      var picks = kinds.filter(this.makeFieldFilter(field)).map(function (_ref) {
        var _ref2 = BasicFieldPickvue_type_script_lang_js_slicedToArray(_ref, 2),
          n = _ref2[0],
          d = _ref2[1];
        return {
          text: d.title,
          value: n
        };
      });
      return picks;
    },
    makeFieldFilter: function makeFieldFilter(field) {
      var custom = this.custom;
      var filter = custom.field && custom.field[field.name] && custom.field[field.name].filter;
      return filter || function () {
        return true;
      };
    },
    allow: function allow() {
      var _this$custom;
      return (_this$custom = this.custom).allow.apply(_this$custom, arguments);
    }
  }
});
// CONCATENATED MODULE: ./src/components/BasicFieldPick.vue?vue&type=script&lang=js
 /* harmony default export */ var components_BasicFieldPickvue_type_script_lang_js = (BasicFieldPickvue_type_script_lang_js); 
// CONCATENATED MODULE: ./src/components/BasicFieldPick.vue





/* normalize component */

var BasicFieldPick_component = normalizeComponent(
  components_BasicFieldPickvue_type_script_lang_js,
  BasicFieldPickvue_type_template_id_f6dac43a_render,
  BasicFieldPickvue_type_template_id_f6dac43a_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var BasicFieldPick = (BasicFieldPick_component.exports);

/* vuetify-loader */


installComponents_default()(BasicFieldPick_component, {VSelect: VSelect_["VSelect"]})

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"74b366d7-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/BasicAuth.vue?vue&type=template&id=6154b0e6
var BasicAuthvue_type_template_id_6154b0e6_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[(_vm.user)?_vm._t("default"):_c('v-container',[_c('v-row',[_c('v-col'),_c('v-col',[_c('v-card',{attrs:{"xstyle":"max-width:40vw"}},[_c('v-card-title',[_vm._v("Sign In")]),_c('v-form',{ref:"form",attrs:{"lazy-validation":""},model:{value:(_vm.valid),callback:function ($$v) {_vm.valid=$$v},expression:"valid"}},[_c('v-card-text',[_c('v-text-field',{attrs:{"rules":_vm.emailRules,"label":"Email","required":"","outlined":""},model:{value:(_vm.email),callback:function ($$v) {_vm.email=$$v},expression:"email"}}),_c('v-text-field',{attrs:{"rules":_vm.passwordRules,"label":"Password","required":"","type":"password","outlined":""},model:{value:(_vm.password),callback:function ($$v) {_vm.password=$$v},expression:"password"}})],1),('empty'!=_vm.state)?_c('v-card-text',[_vm._v(" "+_vm._s(_vm.stateMessage[_vm.state])+" ")]):_vm._e(),_c('v-card-actions',[_c('v-spacer'),_c('v-btn',{attrs:{"disabled":!_vm.valid},on:{"click":_vm.signin}},[_vm._v(" Sign In ")])],1)],1)],1)],1),_c('v-col')],1)],1)],2)}
var BasicAuthvue_type_template_id_6154b0e6_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/BasicAuth.vue?vue&type=template&id=6154b0e6

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/BasicAuth.vue?vue&type=script&lang=js
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var BasicAuthvue_type_script_lang_js = ({
  props: {
    user: Object
  },
  data: function data() {
    return {
      state: 'empty',
      valid: false,
      email: '',
      password: '',
      emailRules: [function (v) {
        return !!v || 'E-mail is required';
      }, function (v) {
        return /.+@.+\..+/.test(v) || 'E-mail must be valid';
      }],
      passwordRules: [function (v) {
        return !!v || 'Password is required';
      }],
      stateMessage: {
        signin: 'Signing in...',
        fail: 'Signin details are incorrect. Please try again.'
      }
    };
  },
  created: function created() {},
  computed: {},
  methods: {
    signin: function signin() {
      var _this = this;
      this.state = 'signin';
      this.$store.dispatch('signin_user', {
        email: this.email,
        password: this.password
      }).then(function (_ref) {
        var ok = _ref.ok;
        if (!ok) {
          _this.state = 'fail';
        }
      });
    }
  }
});
// CONCATENATED MODULE: ./src/components/BasicAuth.vue?vue&type=script&lang=js
 /* harmony default export */ var components_BasicAuthvue_type_script_lang_js = (BasicAuthvue_type_script_lang_js); 
// EXTERNAL MODULE: external "vuetify/lib/components/VForm"
var VForm_ = __webpack_require__("1b42");

// CONCATENATED MODULE: ./src/components/BasicAuth.vue





/* normalize component */

var BasicAuth_component = normalizeComponent(
  components_BasicAuthvue_type_script_lang_js,
  BasicAuthvue_type_template_id_6154b0e6_render,
  BasicAuthvue_type_template_id_6154b0e6_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var BasicAuth = (BasicAuth_component.exports);

/* vuetify-loader */












installComponents_default()(BasicAuth_component, {VBtn: VBtn_["VBtn"],VCard: VCard_["VCard"],VCardActions: VCard_["VCardActions"],VCardText: VCard_["VCardText"],VCardTitle: VCard_["VCardTitle"],VCol: VGrid_["VCol"],VContainer: VGrid_["VContainer"],VForm: VForm_["VForm"],VRow: VGrid_["VRow"],VSpacer: VGrid_["VSpacer"],VTextField: VTextField_["VTextField"]})

// EXTERNAL MODULE: ./package.json
var package_0 = __webpack_require__("9224");

// CONCATENATED MODULE: ./src/vxg.js
function vxg_typeof(o) { "@babel/helpers - typeof"; return vxg_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, vxg_typeof(o); }
function vxg_ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function vxg_objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? vxg_ownKeys(Object(t), !0).forEach(function (r) { vxg_defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : vxg_ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function vxg_defineProperty(e, r, t) { return (r = vxg_toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function vxg_createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = vxg_unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t.return || t.return(); } finally { if (u) throw o; } } }; }
function vxg_unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return vxg_arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? vxg_arrayLikeToArray(r, a) : void 0; } }
function vxg_arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, vxg_toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function vxg_toPropertyKey(t) { var i = vxg_toPrimitive(t, "string"); return "symbol" == vxg_typeof(i) ? i : i + ""; }
function vxg_toPrimitive(t, r) { if ("object" != vxg_typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != vxg_typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }












var config_defaults = {};
var util = {};
console.log('VXG 01');
var vxg_Vxg = /*#__PURE__*/function () {
  function Vxg(config) {
    _classCallCheck(this, Vxg);
    this.match = {
      allow: new patrun_min_default.a({
        gex: true
      })
    };
    this.cmp = {};
    this.config(config);
    this.util = util;
  }
  return _createClass(Vxg, [{
    key: "config",
    value: function config(custom_config) {
      // TODO: deep, validation
      Object.assign(this.config, config_defaults, custom_config || {});
      this.config.allow = this.config.allow || {};
      this.config.allow.modify = this.config.allow.modify || function (x) {
        return x;
      };
      this.config.allow.match = this.config.allow.match || [];
      var _iterator = vxg_createForOfIteratorHelper(this.config.allow.match),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var entry = _step.value;
          this.match.allow.add(entry, {
            allow: true
          });
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  }, {
    key: "allow",
    value: function allow(match) {
      var mm = jsonic_min_default()(match);

      // TODO: handle Aontu array workaround
      var ms = Array.isArray(match) ? match : Object.keys(mm).map(function (x) {
        return mm[x];
      });
      var found = null;
      var _iterator2 = vxg_createForOfIteratorHelper(ms),
        _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var m = _step2.value;
          var pat = this.config.allow.modify(vxg_objectSpread({}, m || {}));
          found = this.match.allow.find(pat);
          if (found) {
            break;
          }
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
      return found ? !!found.allow : false;
    }
  }, {
    key: "install",
    value: function install(Vue, options) {
      var _this = this;
      var co = {
        VxgBasicAdmin: BasicAdmin,
        VxgBasicHead: BasicHead,
        VxgBasicFoot: BasicFoot,
        VxgBasicMain: BasicMain,
        VxgBasicSide: BasicSide,
        VxgBasicLed: BasicLed,
        VxgBasicFieldPick: BasicFieldPick,
        VxgBasicAuth: BasicAuth
      };
      Object.keys(co).forEach(function (name) {
        Vue.component(name, co[name]);
        _this.cmp[name] = co[name];
      });
      Vue.prototype.$vxg = this;
      window.vxg = this;
    }
  }]);
}();
vxg_Vxg.info = {
  version: package_0.version,
  note: 'aaa'
};
/* harmony default export */ var src_vxg = (vxg_Vxg);
// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/entry-lib.js


/* harmony default export */ var entry_lib = __webpack_exports__["default"] = (src_vxg);



/***/ }),

/***/ "fe20":
/***/ (function(module, exports, __webpack_require__) {

!function(e){if(true)module.exports=e();else {}}((function(){var e=function(e){var t;return function(n){return t||e(t={exports:{},parent:n},t.exports),t.exports}},t=e((function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.values=t.keys=t.omap=t.str=t.prop=t.normalt=t.parserwrap=t.trimstk=t.tokenize=t.srcfmt=t.snip=t.regexp=t.mesc=t.makelog=t.isarr=t.filterRules=t.extract=t.escre=t.errinject=t.errdesc=t.entries=t.defprop=t.deep=t.configure=t.clone=t.clean=t.charset=t.badlex=t.assign=t.S=t.JsonicError=void 0;const i=n({}),l=e=>null==e?[]:Object.keys(e);t.keys=l,t.values=e=>null==e?[]:Object.values(e);const s=e=>null==e?[]:Object.entries(e);t.entries=s;const o=(e,...t)=>Object.assign(null==e?{}:e,...t);t.assign=o,t.isarr=e=>Array.isArray(e);const a=Object.defineProperty;t.defprop=a;const u=(e,t)=>Object.entries(e||{}).reduce((e,n)=>{let r=t?t(n):n;void 0===r[0]?delete e[n[0]]:e[r[0]]=r[1];let i=2;for(;void 0!==r[i];)e[r[i]]=r[i+1],i+=2;return e},{});t.omap=u;const c={indent:"  ",space:" ",Object:"Object",Array:"Array",object:"object",string:"string",function:"function",unexpected:"unexpected",map:"map",list:"list",elem:"elem",pair:"pair",val:"val",node:"node",no_re_flags:r.EMPTY,unprintable:"unprintable",invalid_ascii:"invalid_ascii",invalid_unicode:"invalid_unicode",invalid_lex_state:"invalid_lex_state",unterminated_string:"unterminated_string",unterminated_comment:"unterminated_comment",lex:"lex",parse:"parse",error:"error",none:"none",imp_map:"imp,map",imp_list:"imp,list",imp_null:"imp,null",end:"end",open:"open",close:"close",rule:"rule",stack:"stack",nUll:"null",name:"name",make:"make"};t.S=c;class p extends SyntaxError{constructor(e,t,n,r,i){let l=x(e,t=f({},t),n,r,i);super(l.message),o(this,l),v(this)}toJSON(){return{...this,__error:!0,name:this.name,message:this.message,stack:this.stack}}}function d(e,t,n){let i=t.t,l=i[e];return null==l&&r.STRING===typeof e&&(i[l=t.tI++]=e,i[e]=l,i[e.substring(1)]=l,null!=n&&o(n.token,t.t)),l}function m(e,...t){return new RegExp(t.map(e=>e.esc?h(e.toString()):e).join(r.EMPTY),null==e?"":e)}function h(e){return null==e?"":e.replace(/[-\\|\]{}()[^$+*?.!=]/g,"\\$&").replace(/\t/g,"\\t").replace(/\r/g,"\\r").replace(/\n/g,"\\n")}function f(e,...t){let n=c.function===typeof e,r=null!=e&&(c.object===typeof e||n);for(let i of t){let t,l=c.function===typeof i,s=null!=i&&(c.object===typeof i||l);if(r&&s&&!l&&Array.isArray(e)===Array.isArray(i))for(let n in i)e[n]=f(e[n],i[n]);else e=void 0===i?e:l?i:s?c.function===typeof(t=i.constructor)&&c.Object!==t.name&&c.Array!==t.name?i:f(Array.isArray(i)?[]:{},i):i,n=c.function===typeof e,r=null!=e&&(c.object===typeof e||n)}return e}function g(e,t,n,r,i,l){let s={code:t,details:n,token:r,rule:i,ctx:l};return null==e?"":e.replace(/\$([\w_]+)/g,(e,t)=>{let o=JSON.stringify(null!=s[t]?s[t]:null!=n[t]?n[t]:l.meta&&null!=l.meta[t]?l.meta[t]:null!=r[t]?r[t]:null!=i[t]?i[t]:null!=l.opts[t]?l.opts[t]:null!=l.cfg[t]?l.cfg[t]:null!=l[t]?l[t]:"$"+t);return null==o?"":o})}function v(e){e.stack&&(e.stack=e.stack.split("\n").filter(e=>!e.includes("jsonic/jsonic")).map(e=>e.replace(/    at /,"at ")).join("\n"))}function k(e,t,n){let i=0<n.sI?n.sI:0,l=0<n.rI?n.rI:1,s=0<n.cI?n.cI:1,o=null==n.src?r.EMPTY:n.src,a=e.substring(Math.max(0,i-333),i).split("\n"),u=e.substring(i,i+333).split("\n"),c=2+(r.EMPTY+(l+2)).length,p=l<3?1:l-2,d=e=>"\x1b[34m"+(r.EMPTY+p++).padStart(c," ")+" | \x1b[0m"+(null==e?r.EMPTY:e),m=a.length;return[2<m?d(a[m-3]):null,1<m?d(a[m-2]):null,d(a[m-1]+u[0])," ".repeat(c)+"   "+" ".repeat(s-1)+"\x1b[31m"+"^".repeat(o.length||1)+" "+t+"\x1b[0m",d(u[1]),d(u[2])].filter(e=>null!=e).join("\n")}function x(e,t,n,r,i){try{let l=i.cfg,s=i.meta,o=g(l.error[e]||l.error.unknown,e,t,n,r,i);c.function===typeof l.hint&&(l.hint={...l.hint(),...l.hint});let a=["\x1b[31m[jsonic/"+e+"]:\x1b[0m "+o,"  \x1b[34m--\x3e\x1b[0m "+(s&&s.fileName||"<no-file>")+":"+n.rI+":"+n.cI,k(i.src(),o,n),"",g((l.hint[e]||l.hint.unknown||"").trim().split("\n").map(e=>"  "+e).join("\n"),e,t,n,r,i),"","  \x1b[2mhttps://jsonic.senecajs.org\x1b[0m","  \x1b[2m--internal: rule="+r.name+"~"+r.state+"; token="+d(n.tin,i.cfg)+(null==n.why?"":"~"+n.why)+"; plugins="+i.plgn().map(e=>e.name).join(",")+"--\x1b[0m\n"].join("\n"),u={internal:{token:n,ctx:i}};return u={...Object.create(u),message:a,code:e,details:t,meta:s,fileName:s?s.fileName:void 0,lineNumber:n.rI,columnNumber:n.cI}}catch(l){return console.log(l),{}}}function b(e){return"function"==typeof e.debug.print.src?e.debug.print.src:(t,n)=>null==t?r.EMPTY:(n=JSON.stringify(t)).substring(0,e.debug.maxlen)+(e.debug.maxlen<n.length?"...":r.EMPTY)}function y(e,t=44){let n;try{n="object"==typeof e?JSON.stringify(e):""+e}catch(r){n=""+e}return j(t<n.length?n.substring(0,t-3)+"...":n,t)}function j(e,t=5){return void 0===e?"":(""+e).substring(0,t).replace(/[\r\n\t]/g,".")}function S(...e){return null==e?{}:e.filter(e=>!1!==e).map(e=>"object"==typeof e?l(e).join(r.EMPTY):e).join(r.EMPTY).split(r.EMPTY).reduce((e,t)=>(e[t]=t.charCodeAt(0),e),{})}function E(e){for(let t in e)null==e[t]&&delete e[t];return e}t.JsonicError=p,t.configure=function(e,t,n){var r,i,a,c,p,f,g,v,k,x,b,y,j,O,I,M,T,P,C,N,w,_,R,A,L,F,Y,U,J,$,D,B,z,Z,K,V,G,H,W,X,q;const Q=t||{};Q.t=Q.t||{},Q.tI=Q.tI||1;const ee=e=>d(e,Q);!1!==n.standard$&&(ee("#BD"),ee("#ZZ"),ee("#UK"),ee("#AA"),ee("#SP"),ee("#LN"),ee("#CM"),ee("#NR"),ee("#ST"),ee("#TX"),ee("#VL")),Q.fixed={lex:!!(null===(r=n.fixed)||void 0===r?void 0:r.lex),token:n.fixed?u(E(n.fixed.token),([e,t])=>[t,d(e,Q)]):{},ref:void 0},Q.fixed.ref=u(Q.fixed.token,([e,t])=>[e,t]),Q.fixed.ref=Object.assign(Q.fixed.ref,u(Q.fixed.ref,([e,t])=>[t,e])),Q.tokenSet=n.tokenSet?Object.keys(n.tokenSet).reduce((e,t)=>(e[t]=n.tokenSet[t].filter(e=>null!=e).map(e=>ee(e)),e),{...Q.tokenSet}):{},Q.tokenSetDerived={ignore:Object.fromEntries(((null===(i=n.tokenSet)||void 0===i?void 0:i.ignore)||[]).map(e=>[ee(e),!0]))},Q.space={lex:!!(null===(a=n.space)||void 0===a?void 0:a.lex),chars:S(null===(c=n.space)||void 0===c?void 0:c.chars)},Q.line={lex:!!(null===(p=n.line)||void 0===p?void 0:p.lex),chars:S(null===(f=n.line)||void 0===f?void 0:f.chars),rowChars:S(null===(g=n.line)||void 0===g?void 0:g.rowChars),single:!!(null===(v=n.line)||void 0===v?void 0:v.single)},Q.text={lex:!!(null===(k=n.text)||void 0===k?void 0:k.lex),modify:((null===(x=Q.text)||void 0===x?void 0:x.modify)||[]).concat(([null===(b=n.text)||void 0===b?void 0:b.modify]||false).flat()).filter(e=>null!=e)},Q.number={lex:!!(null===(y=n.number)||void 0===y?void 0:y.lex),hex:!!(null===(j=n.number)||void 0===j?void 0:j.hex),oct:!!(null===(O=n.number)||void 0===O?void 0:O.oct),bin:!!(null===(I=n.number)||void 0===I?void 0:I.bin),sep:null!=(null===(M=n.number)||void 0===M?void 0:M.sep)&&""!==n.number.sep,exclude:null===(T=n.number)||void 0===T?void 0:T.exclude,sepChar:null===(P=n.number)||void 0===P?void 0:P.sep},Q.value={lex:!!(null===(C=n.value)||void 0===C?void 0:C.lex),map:s((null===(N=n.value)||void 0===N?void 0:N.map)||{}).reduce((e,t)=>(null==t[1]||(e[t[0]]=t[1]),e),{})},Q.rule={start:null==(null===(w=n.rule)||void 0===w?void 0:w.start)?"val":n.rule.start,maxmul:null==(null===(_=n.rule)||void 0===_?void 0:_.maxmul)?3:n.rule.maxmul,finish:!!(null===(R=n.rule)||void 0===R?void 0:R.finish),include:(null===(A=n.rule)||void 0===A?void 0:A.include)?n.rule.include.split(/\s*,+\s*/).filter(e=>""!==e):[],exclude:(null===(L=n.rule)||void 0===L?void 0:L.exclude)?n.rule.exclude.split(/\s*,+\s*/).filter(e=>""!==e):[]},Q.map={extend:!!(null===(F=n.map)||void 0===F?void 0:F.extend),merge:null===(Y=n.map)||void 0===Y?void 0:Y.merge},Q.list={property:!!(null===(U=n.list)||void 0===U?void 0:U.property)};let te=Object.keys(Q.fixed.token).sort((e,t)=>t.length-e.length).map(e=>h(e)).join("|"),ne=(null===(J=n.comment)||void 0===J?void 0:J.lex)?(n.comment.marker||[]).filter(e=>e.lex).map(e=>h(e.start)).join("|"):"",re=["([",h(l(S(Q.space.lex&&Q.space.chars,Q.line.lex&&Q.line.chars)).join("")),"]",("string"==typeof n.ender?n.ender.split(""):Array.isArray(n.ender)?n.ender:[]).map(e=>"|"+h(e)).join(""),""===te?"":"|",te,""===ne?"":"|",ne,"|$)"];return Q.rePart={fixed:te,ender:re,commentStart:ne},Q.re={ender:m(null,...re),rowChars:m(null,h(null===($=n.line)||void 0===$?void 0:$.rowChars)),columns:m(null,"["+h(null===(D=n.line)||void 0===D?void 0:D.chars)+"]","(.*)$")},Q.lex={empty:!!(null===(B=n.lex)||void 0===B?void 0:B.empty),emptyResult:null===(z=n.lex)||void 0===z?void 0:z.emptyResult,match:(null===(Z=n.lex)||void 0===Z?void 0:Z.match)?n.lex.match.map(e=>{let t=e(Q,n);return t.maker=e,t}):[]},Q.debug={get_console:(null===(K=n.debug)||void 0===K?void 0:K.get_console)||(()=>console),maxlen:null==(null===(V=n.debug)||void 0===V?void 0:V.maxlen)?99:n.debug.maxlen,print:{config:!!(null===(H=null===(G=n.debug)||void 0===G?void 0:G.print)||void 0===H?void 0:H.config),src:null===(X=null===(W=n.debug)||void 0===W?void 0:W.print)||void 0===X?void 0:X.src}},Q.error=n.error||{},Q.hint=n.hint||{},(null===(q=n.config)||void 0===q?void 0:q.modify)&&l(n.config.modify).forEach(e=>n.config.modify[e](Q,n)),Q.debug.print.config&&Q.debug.get_console().dir(Q,{depth:null}),Q.result={fail:[]},n.result&&(Q.result.fail=[...n.result.fail]),o(e.options,n),o(e.token,Q.t),o(e.fixed,Q.fixed.ref),Q},t.tokenize=d,t.mesc=function(e,t){return(t=new String(e)).esc=!0,t},t.regexp=m,t.escre=h,t.deep=f,t.errinject=g,t.trimstk=v,t.extract=k,t.errdesc=x,t.badlex=function(e,t,n){let r=r=>{let i=e.next(r);if(t===i.tin){let e={};throw null!=i.use&&(e.use=i.use),new p(i.why||c.unexpected,e,i,r,n)}return i};return r.src=e.src,r},t.makelog=function(e,t){var n,r,i;let l=null===(i=null===(r=null===(n=e.opts)||void 0===n?void 0:n.plugin)||void 0===r?void 0:r.debug)||void 0===i?void 0:i.trace;if(t||l)if("number"==typeof(null==t?void 0:t.log)||l){let n=!1,r=null==t?void 0:t.log;(-1===r||l)&&(r=1,n=!0),e.log=(...t)=>{if(n){let n=t.filter(e=>c.object!=typeof e).map(e=>c.function==typeof e?e.name:e).join(c.indent);e.cfg.debug.get_console().log(n)}else e.cfg.debug.get_console().dir(t,{depth:r})}}else"function"==typeof t.log&&(e.log=t.log);return e.log},t.srcfmt=b,t.str=y,t.snip=j,t.clone=function(e){return f(Object.create(Object.getPrototypeOf(e)),e)},t.charset=S,t.clean=E,t.filterRules=function(e,t){let n=["open","close"];for(let r of n)e.def[r]=e.def[r].map(e=>(e.g="string"==typeof e.g?(e.g||"").split(/\s*,+\s*/):e.g||[],e)).filter(e=>t.rule.include.reduce((t,n)=>t||null!=e.g&&-1!==e.g.indexOf(n),0===t.rule.include.length)).filter(e=>t.rule.exclude.reduce((t,n)=>t&&(null==e.g||-1===e.g.indexOf(n)),!0));return e},t.normalt=function(e){if(null!=e.c){let t=e.c.n,n=e.c.d;null==t&&null==n||(e.c=function(e){let r=!0;if(null!=t)for(let n in t)r=r&&(null==e.n[n]||e.n[n]<=(null==t[n]?0:t[n]));return null!=n&&(r=r&&e.d<=n),r},null!=t&&(e.c.n=t),null!=n&&(e.c.d=n))}if(r.STRING===typeof e.g&&(e.g=e.g.split(/\s*,\s*/)),e.s&&0!==e.s.length){const t=e=>e.flat().filter(e=>"number"==typeof e),n=(e,t)=>e.filter(e=>31*t<=e&&e<31*(t+1)),r=(e,t)=>e.reduce((e,n)=>1<<n-(31*t+1)|e,0),i=t([e.s[0]]),l=t([e.s[1]]),s=e;s.S0=0<i.length?new Array(Math.max(...i.map(e=>1+e/31|0))).fill(null).map((e,t)=>t).map(e=>r(n(i,e),e)):null,s.S1=0<l.length?new Array(Math.max(...l.map(e=>1+e/31|0))).fill(null).map((e,t)=>t).map(e=>r(n(l,e),e)):null}else e.s=null;return e},t.prop=function(e,t,n){let r=e;try{let r,i=t.split(".");for(let t=0;t<i.length;t++)r=i[t],t<i.length-1&&(e=e[r]=e[r]||{});return void 0!==n&&(e[r]=n),e[r]}catch(i){throw new Error("Cannot "+(void 0===n?"get":"set")+" path "+t+" on object: "+y(r)+(void 0===n?"":" to value: "+y(n,22)))}},t.parserwrap=function(e){return{start:function(t,n,l,s){try{return e.start(t,n,l,s)}catch(o){if("SyntaxError"===o.name){let e=0,s=0,a=0,u=r.EMPTY,c=o.message.match(/^Unexpected token (.) .*position\s+(\d+)/i);if(c){u=c[1],e=parseInt(c[2]),s=t.substring(0,e).replace(/[^\n]/g,r.EMPTY).length;let n=e-1;for(;-1<n&&"\n"!==t.charAt(n);)n--;a=Math.max(t.substring(n,e).length,0)}let m=o.token||(0,i.makeToken)("#UK",d("#UK",n.internal().config),void 0,u,(0,i.makePoint)(u.length,e,o.lineNumber||s,o.columnNumber||a));throw new p(o.code||"json",o.details||{msg:o.message},m,{},o.ctx||{uI:-1,opts:n.options,cfg:n.internal().config,token:m,meta:l,src:()=>t,root:()=>{},plgn:()=>n.internal().plugins,rule:{name:"no-rule"},sub:{},xs:-1,v2:m,v1:m,t0:m,t1:m,tC:-1,rs:[],rsI:0,next:()=>m,rsm:{},n:{},log:l?l.log:void 0,F:b(n.internal().config),use:{},NORULE:{name:"no-rule"},NOTOKEN:{name:"no-token"}})}throw o}}}}})),n=e((function(e,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.makeTextMatcher=n.makeNumberMatcher=n.makeCommentMatcher=n.makeStringMatcher=n.makeLineMatcher=n.makeSpaceMatcher=n.makeFixedMatcher=n.makeToken=n.makePoint=n.makeLex=n.makeNoToken=void 0;const i=t({});class l{constructor(e,t,n,r){this.len=-1,this.sI=0,this.rI=1,this.cI=1,this.token=[],this.len=e,null!=t&&(this.sI=t),null!=n&&(this.rI=n),null!=r&&(this.cI=r)}toString(){return"Point["+[this.sI+"/"+this.len,this.rI,this.cI]+(0<this.token.length?" "+this.token:"")+"]"}[r.INSPECT](){return this.toString()}}const s=(...e)=>new l(...e);n.makePoint=s;class o{constructor(e,t,n,i,l,s,o){this.isToken=!0,this.name=r.EMPTY,this.tin=-1,this.val=void 0,this.src=r.EMPTY,this.sI=-1,this.rI=-1,this.cI=-1,this.len=-1,this.name=e,this.tin=t,this.src=i,this.val=n,this.sI=l.sI,this.rI=l.rI,this.cI=l.cI,this.use=s,this.why=o,this.len=null==i?0:i.length}resolveVal(e,t){return"function"==typeof this.val?this.val(e,t):this.val}bad(e,t){return this.err=e,null!=t&&(this.use=(0,i.deep)(this.use||{},t)),this}toString(){return"Token["+this.name+"="+this.tin+" "+(0,i.snip)(this.src)+(void 0===this.val||"#ST"===this.name||"#TX"===this.name?"":"="+(0,i.snip)(this.val))+" "+[this.sI,this.rI,this.cI]+(null==this.use?"":" "+(0,i.snip)(""+JSON.stringify(this.use).replace(/"/g,""),22))+(null==this.err?"":" "+this.err)+(null==this.why?"":" "+(0,i.snip)(""+this.why,22))+"]"}[r.INSPECT](){return this.toString()}}const a=(...e)=>new o(...e);function u(e,t,n){let r=e.pnt,i=t;if(e.cfg.fixed.lex&&null!=n&&0<n.length){let l=void 0,s=e.cfg.fixed.token[n];null!=s&&(l=e.token(s,void 0,n,r)),null!=l&&(r.sI+=l.src.length,r.cI+=l.src.length,null==t?i=l:r.token.push(l))}return i}n.makeToken=a,n.makeNoToken=()=>a("",-1,void 0,r.EMPTY,s(-1)),n.makeFixedMatcher=(e,t)=>{let n=(0,i.regexp)(null,"^(",e.rePart.fixed,")");return function(t){let r=e.fixed;if(!r.lex)return;let i=t.pnt,l=t.src.substring(i.sI).match(n);if(l){let e=l[1],n=e.length;if(0<n){let l=void 0,s=r.token[e];return null!=s&&(l=t.token(s,void 0,e,i),i.sI+=n,i.cI+=n),l}}}},n.makeCommentMatcher=(e,t)=>{let n=t.comment;e.comment={lex:!!n&&!!n.lex,marker:((null==n?void 0:n.marker)||[]).map(t=>{let n={start:t.start,end:t.end,line:!!t.line,lex:!!t.lex,suffixMatch:void 0};return n.getSuffixMatch=t.suffix?()=>{if(t.suffix instanceof Function)return n.suffixMatch=t.suffix;let r=(Array.isArray(t.suffix)?t.suffix:[t.suffix]).map(t=>e.lex.match.find(e=>{var n;return(null===(n=e.maker)||void 0===n?void 0:n.name)==t})).filter(e=>null!=e),l=(...e)=>{r.map(t=>t(...e))};return(0,i.defprop)(l,"name",{value:""+t.suffix}),l}:void 0,n})};let r=e.comment.lex?e.comment.marker.filter(e=>e.lex&&e.line):[],l=e.comment.lex?e.comment.marker.filter(e=>e.lex&&!e.line):[];return function(t,n){if(!e.comment.lex)return;let s=t.pnt,o=t.src.substring(s.sI),a=s.rI,u=s.cI;for(let i of r)if(o.startsWith(i.start)){let r=o.length,l=i.start.length;for(u+=i.start.length;l<r&&!e.line.chars[o[l]];)u++,l++;let a=o.substring(0,l),c=t.token("#CM",void 0,a,s);return s.sI+=a.length,s.cI=u,i.suffixMatch?i.suffixMatch(t,n):i.getSuffixMatch&&(i.suffixMatch=i.getSuffixMatch(),i.suffixMatch&&i.suffixMatch(t,n)),c}for(let r of l)if(o.startsWith(r.start)){let n=o.length,l=r.start.length,c=r.end;for(u+=r.start.length;l<n&&!o.substring(l).startsWith(c);)e.line.rowChars[o[l]]&&(a++,u=0),u++,l++;if(o.substring(l).startsWith(c)){u+=c.length;let e=o.substring(0,l+c.length),n=t.token("#CM",void 0,e,s);return s.sI+=e.length,s.rI=a,s.cI=u,n}return t.bad(i.S.unterminated_comment,s.sI,s.sI+9*r.start.length)}}},n.makeTextMatcher=(e,t)=>{let n=(0,i.regexp)(e.line.lex?null:"s","^(.*?)",...e.rePart.ender);return function(r){let i=e.text,l=r.pnt,s=r.src.substring(l.sI),o=e.value.map,a=s.match(n);if(a){let n=a[1],s=a[2],c=void 0;if(null!=n){let t=n.length;if(0<t){let s=void 0;e.value.lex&&void 0!==(s=o[n])?(c=r.token("#VL",s.val,n,l),l.sI+=t,l.cI+=t):i.lex&&(c=r.token("#TX",n,n,l),l.sI+=t,l.cI+=t)}}if(c&&(c=u(r,c,s)),c&&0<e.text.modify.length){const n=e.text.modify;for(let i=0;i<n.length;i++)c.val=n[i](c.val,r,e,t)}return c}}},n.makeNumberMatcher=(e,t)=>{let n=e.number,r=(0,i.regexp)(null,["^([-+]?(0(",[n.hex?"x[0-9a-fA-F_]+":null,n.oct?"o[0-7_]+":null,n.bin?"b[01_]+":null].filter(e=>null!=e).join("|"),")|[.0-9]+([0-9_]*[0-9])?)","(\\.[0-9]?([0-9_]*[0-9])?)?","([eE][-+]?[0-9]+([0-9_]*[0-9])?)?"].join("").replace(/_/g,n.sep?(0,i.escre)(n.sepChar):""),")",...e.rePart.ender),l=n.sep?(0,i.regexp)("g",(0,i.escre)(n.sepChar)):void 0;return function(t){if(!(n=e.number).lex)return;let i=t.pnt,s=t.src.substring(i.sI),o=e.value.map,a=s.match(r);if(a){let n=a[1],r=a[9],s=void 0,c=!0;if(null!=n&&(c=!e.number.exclude||!n.match(e.number.exclude))){let r=n.length;if(0<r){let a=void 0;if(e.value.lex&&void 0!==(a=o[n]))s=t.token("#VL",a.val,n,i);else{let e=l?n.replace(l,""):n,o=+e;if(isNaN(o)){let t=e[0];"-"!==t&&"+"!==t||(o=("-"===t?-1:1)*+e.substring(1))}isNaN(o)||(s=t.token("#NR",o,n,i),i.sI+=r,i.cI+=r)}}}return c&&(s=u(t,s,r)),s}}},n.makeStringMatcher=(e,t)=>{let n=t.string||{};return e.string=e.string||{},e.string=(0,i.deep)(e.string,{lex:!!(null==n?void 0:n.lex),quoteMap:(0,i.charset)(n.chars),multiChars:(0,i.charset)(n.multiChars),escMap:(0,i.clean)({...n.escape}),escChar:n.escapeChar,escCharCode:null==n.escapeChar?void 0:n.escapeChar.charCodeAt(0),allowUnknown:!!n.allowUnknown,replaceCodeMap:(0,i.omap)((0,i.clean)({...n.replace}),([e,t])=>[e.charCodeAt(0),t]),hasReplace:!1}),e.string.hasReplace=0<(0,i.keys)(e.string.replaceCodeMap).length,function(t){let n=e.string;if(!n.lex)return;let{quoteMap:l,escMap:s,escChar:o,escCharCode:a,multiChars:u,allowUnknown:c,replaceCodeMap:p,hasReplace:d}=n,{pnt:m,src:h}=t,{sI:f,rI:g,cI:v}=m,k=h.length;if(l[h[f]]){const n=h[f],l=f,x=g,b=u[n];++f,++v;let y,j=[];for(;f<k;f++){v++;let r=h[f];if(y=void 0,n===r){f++;break}if(o===r){v++;let e=s[h[++f]];if(null!=e)j.push(e);else if("x"===h[f]){f++;let e=parseInt(h.substring(f,f+2),16);if(isNaN(e))return f-=2,v-=2,m.sI=f,m.cI=v,t.bad(i.S.invalid_ascii,f,f+4);let n=String.fromCharCode(e);j.push(n),f+=1,v+=2}else if("u"===h[f]){let e="{"===h[++f]?(f++,1):0,n=e?6:4,r=parseInt(h.substring(f,f+n),16);if(isNaN(r))return f=f-2-e,v-=2,m.sI=f,m.cI=v,t.bad(i.S.invalid_unicode,f,f+n+2+2*e);let l=String.fromCodePoint(r);j.push(l),f+=n-1+e,v+=n+e}else{if(!c)return m.sI=f,m.cI=v-1,t.bad(i.S.unexpected,f,f+1);j.push(h[f])}}else if(d&&void 0!==(y=p[h.charCodeAt(f)]))j.push(y),v++;else{let r=f,l=n.charCodeAt(0),s=h.charCodeAt(f);for(;(!d||void 0===(y=p[s]))&&f<k&&32<=s&&l!==s&&a!==s;)s=h.charCodeAt(++f),v++;if(v--,void 0===y&&s<32){if(!b||!e.line.chars[h[f]])return m.sI=f,m.cI=v,t.bad(i.S.unprintable,f,f+1);e.line.rowChars[h[f]]&&(m.rI=++g),v=1,j.push(h.substring(r,f+1))}else j.push(h.substring(r,f)),f--}}if(h[f-1]!==n||m.sI===f-1)return m.rI=x,t.bad(i.S.unterminated_string,l,f);const S=t.token("#ST",j.join(r.EMPTY),h.substring(m.sI,f),m);return m.sI=f,m.rI=g,m.cI=v,S}}},n.makeLineMatcher=(e,t)=>function(t){if(!e.line.lex)return;let{chars:n,rowChars:r}=e.line,{pnt:i,src:l}=t,{sI:s,rI:o}=i,a=e.line.single,u=void 0;for(a&&(u={});n[l[s]]&&!(u&&(u[l[s]]=(u[l[s]]||0)+1,a&&1<u[l[s]]));)o+=r[l[s]]?1:0,s++;if(i.sI<s){let e=l.substring(i.sI,s);const n=t.token("#LN",void 0,e,i);return i.sI+=e.length,i.rI=o,i.cI=1,n}},n.makeSpaceMatcher=(e,t)=>function(t){if(!e.space.lex)return;let{chars:n}=e.space,{pnt:r,src:i}=t,{sI:l,cI:s}=r;for(;n[i[l]];)l++,s++;if(r.sI<l){let e=i.substring(r.sI,l);const n=t.token("#SP",void 0,e,r);return r.sI+=e.length,r.cI=s,n}};class c{constructor(e){this.src=r.EMPTY,this.ctx={},this.cfg={},this.pnt=s(-1),this.ctx=e,this.src=e.src(),this.cfg=e.cfg,this.pnt=s(this.src.length)}token(e,t,n,r,l,s){let o,u;return"string"==typeof e?(u=e,o=(0,i.tokenize)(u,this.cfg)):(o=e,u=(0,i.tokenize)(e,this.cfg)),a(u,o,t,n,r||this.pnt,l,s)}next(e){let t,n,r=this.pnt,l=r.sI;if(r.end)t=r.end;else if(0<r.token.length)t=r.token.shift();else if(r.len<=r.sI)r.end=this.token("#ZZ",void 0,"",r),t=r.end;else{for(let r of this.cfg.lex.match)if(t=r(this,e)){n=r;break}t=t||this.token("#BD",void 0,this.src[r.sI],r,void 0,"unexpected")}return this.ctx.log&&this.ctx.log(i.S.indent.repeat(e.d)+i.S.lex,(0,i.tokenize)(t.tin,this.cfg),this.ctx.F(t.src),r.sI,r.rI+":"+r.cI,(null==n?void 0:n.name)||"none",this.ctx.F(this.src.substring(l,l+16))),this.ctx.sub.lex&&this.ctx.sub.lex.map(n=>n(t,e,this.ctx)),t}tokenize(e){return(0,i.tokenize)(e,this.cfg)}bad(e,t,n){return this.token("#BD",void 0,0<=t&&t<=n?this.src.substring(t,n):this.src[this.pnt.sI],void 0,void 0,e)}}n.makeLex=(...e)=>new c(...e)})),r={};Object.defineProperty(r,"__esModule",{value:!0}),r.STRING=r.INSPECT=r.EMPTY=r.AFTER=r.BEFORE=r.CLOSE=r.OPEN=void 0,r.OPEN="o",r.CLOSE="c",r.BEFORE="b",r.AFTER="a",r.EMPTY="",r.INSPECT=Symbol.for("nodejs.util.inspect.custom"),r.STRING="string";var i={};Object.defineProperty(i,"__esModule",{value:!0}),i.defaults=void 0;const l=n({}),s={tag:"-",fixed:{lex:!0,token:{"#OB":"{","#CB":"}","#OS":"[","#CS":"]","#CL":":","#CA":","}},tokenSet:{ignore:["#SP","#LN","#CM"],val:["#TX","#NR","#ST","#VL"],key:["#TX","#NR","#ST","#VL"]},space:{lex:!0,chars:" \t"},line:{lex:!0,chars:"\r\n",rowChars:"\n",single:!1},text:{lex:!0},number:{lex:!0,hex:!0,oct:!0,bin:!0,sep:"_",exclude:void 0},comment:{lex:!0,marker:[{line:!0,start:"#",lex:!0},{line:!0,start:"//",lex:!0},{line:!1,start:"/*",end:"*/",lex:!0}]},string:{lex:!0,chars:"'\"`",multiChars:"`",escapeChar:"\\",escape:{b:"\b",f:"\f",n:"\n",r:"\r",t:"\t",v:"\v",'"':'"',"'":"'","`":"`","\\":"\\","/":"/"},allowUnknown:!0},map:{extend:!0,merge:void 0},list:{property:!0},value:{lex:!0,map:{true:{val:!0},false:{val:!1},null:{val:null}}},ender:[],plugin:{},debug:{get_console:()=>console,maxlen:99,print:{config:!1,src:void 0}},error:{unknown:"unknown error: $code",unexpected:"unexpected character(s): $src",invalid_unicode:"invalid unicode escape: $src",invalid_ascii:"invalid ascii escape: $src",unprintable:"unprintable character: $src",unterminated_string:"unterminated string: $src",unterminated_comment:"unterminated comment: $src",unknown_rule:"unknown rule: $rulename"},hint:function(e=((e,t="replace")=>e[t](/[A-Z]/g,e=>" "+e.toLowerCase())[t](/[~%][a-z]/g,e=>("~"==e[0]?" ":"")+e[1].toUpperCase())),t="~sinceTheErrorIsUnknown,ThisIsProbablyABugInsideJsonic\nitself,OrAPlugin.~pleaseConsiderPostingAGithubIssue -Thanks!\n\n~code: $code,~details: \n$details|~theCharacter(s) $srcWereNotExpectedAtThisPointAsTheyDoNot\nmatchTheExpectedSyntax,EvenUnderTheRelaxedJsonicRules.~ifIt\nisNotObviouslyWrong,TheActualSyntaxErrorMayBeElsewhere.~try\ncommentingOutLargerAreasAroundThisPointUntilYouGetNoErrors,\nthenRemoveTheCommentsInSmallSectionsUntilYouFindThe\noffendingSyntax.~n%o%t%e:~alsoCheckIfAnyPluginsYouAreUsing\nexpectDifferentSyntaxInThisCase.|~theEscapeSequence $srcDoesNotEncodeAValidUnicodeCodePoint\nnumber.~youMayNeedToValidateYourStringDataManuallyUsingTest\ncodeToSeeHow~javaScriptWillInterpretIt.~alsoConsiderThatYour\ndataMayHaveBecomeCorrupted,OrTheEscapeSequenceHasNotBeen\ngeneratedCorrectly.|~theEscapeSequence $srcDoesNotEncodeAValid~a%s%c%i%iCharacter.~you\nmayNeedToValidateYourStringDataManuallyUsingTestCodeToSee\nhow~javaScriptWillInterpretIt.~alsoConsiderThatYourDataMay\nhaveBecomeCorrupted,OrTheEscapeSequenceHasNotBeenGenerated\ncorrectly.|~stringValuesCannotContainUnprintableCharacters (characterCodes\nbelow 32).~theCharacter $srcIsUnprintable.~youMayNeedToRemove\ntheseCharactersFromYourSourceData.~alsoCheckThatItHasNot\nbecomeCorrupted.|~thisStringHasNoEndQuote.|~thisCommentIsNeverClosed.|~noRuleNamed $rulenameIsDefined.~thisIsProbablyAnErrorInThe\ngrammarOfAPlugin.".split("|")){return"unknown|unexpected|invalid_unicode|invalid_ascii|unprintable|unterminated_string|unterminated_comment|unknown_rule".split("|").reduce((n,r,i)=>(n[r]=e(t[i]),n),{})},lex:{match:[l.makeFixedMatcher,l.makeSpaceMatcher,l.makeLineMatcher,l.makeStringMatcher,l.makeCommentMatcher,l.makeNumberMatcher,l.makeTextMatcher],empty:!0,emptyResult:void 0},rule:{start:"val",finish:!0,maxmul:3,include:"",exclude:""},result:{fail:[]},config:{modify:{}},parser:{start:void 0}};i.defaults=s;var o={};Object.defineProperty(o,"__esModule",{value:!0}),o.Parser=o.makeRuleSpec=o.makeRule=void 0;const a=t({}),u=n({});class c{constructor(e,t,n){this.id=-1,this.name=r.EMPTY,this.node=null,this.state=r.OPEN,this.n=Object.create(null),this.d=-1,this.use=Object.create(null),this.keep=Object.create(null),this.bo=!1,this.ao=!1,this.bc=!1,this.ac=!1,this.os=0,this.cs=0,this.id=t.uI++,this.name=e.name,this.spec=e,this.child=t.NORULE,this.parent=t.NORULE,this.prev=t.NORULE,this.o0=t.NOTOKEN,this.o1=t.NOTOKEN,this.c0=t.NOTOKEN,this.c1=t.NOTOKEN,this.node=n,this.d=t.rsI,this.bo=null!=e.def.bo,this.ao=null!=e.def.ao,this.bc=null!=e.def.bc,this.ac=null!=e.def.ac}process(e){return this.spec.process(this,e,this.state)}toString(){return"[Rule "+this.name+"~"+this.id+"]"}}const p=(...e)=>new c(...e);o.makeRule=p;class d{constructor(){this.p=r.EMPTY,this.r=r.EMPTY,this.b=0}}const m=(...e)=>new d(...e),h=m(),f=m();class g{constructor(e,t){this.name=r.EMPTY,this.def={open:[],close:[],bo:[],bc:[],ao:[],ac:[]},this.cfg=e,this.def=Object.assign(this.def,t),this.def.open=(this.def.open||[]).filter(e=>null!=e),this.def.close=(this.def.close||[]).filter(e=>null!=e);for(let n of[...this.def.open,...this.def.close])(0,a.normalt)(n)}tin(e){return(0,a.tokenize)(e,this.cfg)}add(e,t,n){let r=(null==n?void 0:n.append)?"push":"unshift",i=((0,a.isarr)(t)?t:[t]).filter(e=>null!=e&&"object"==typeof e).map(e=>(0,a.normalt)(e)),l="o"===e?"open":"close",s=this.def[l];if(s[r](...i),n){if(n.delete)for(let e=0;e<n.delete.length;e++)s[(s.length+n.delete[e])%s.length]=null;if(n.move)for(let e=0;e<n.move.length;e+=2){let t=(s.length+n.move[e])%s.length,r=(s.length+n.move[e+1])%s.length,i=s[t];s.splice(t,1),s.splice(r,0,i)}this.def[l]=s.filter(e=>null!=e)}return(0,a.filterRules)(this,this.cfg),this}open(e,t){return this.add("o",e,t)}close(e,t){return this.add("c",e,t)}action(e,t,n,r){let i=this.def[t+n];return e?i.push(r):i.unshift(r),this}bo(e,t){return this.action(!t||!!e,r.BEFORE,r.OPEN,t||e)}ao(e,t){return this.action(!t||!!e,r.AFTER,r.OPEN,t||e)}bc(e,t){return this.action(!t||!!e,r.BEFORE,r.CLOSE,t||e)}ac(e,t){return this.action(!t||!!e,r.AFTER,r.CLOSE,t||e)}clear(){return this.def.open.length=0,this.def.close.length=0,this.def.bo.length=0,this.def.ao.length=0,this.def.bc.length=0,this.def.ac.length=0,this}process(e,t,n){let i=r.EMPTY,l=t.F,s="o"===n,o=s?e:t.NORULE,u=this.def,c=s?u.open:u.close,d=s?e.bo?u.bo:null:e.bc?u.bc:null;if(d){let n=void 0;for(let r=0;r<d.length;r++)if((null==(n=d[r].call(this,e,t,o,n))?void 0:n.isToken)&&(null==n?void 0:n.err))return this.bad(n,e,t,{is_open:s})}let m=0<c.length?this.parse_alts(s,c,e,t):f;if(m.h&&(m=m.h(e,t,m,o)||m,i+="H"),m.e)return this.bad(m.e,e,t,{is_open:s});if(m.n)for(let r in m.n)e.n[r]=0===m.n[r]?0:(null==e.n[r]?0:e.n[r])+m.n[r];if(m.u&&(e.use=Object.assign(e.use,m.u)),m.k&&(e.keep=Object.assign(e.keep,m.k)),m.a){i+="A";let n=m.a.call(this,e,t,m);if(n&&n.isToken&&n.err)return this.bad(n,e,t,{is_open:s})}if(m.p){t.rs[t.rsI++]=e;let n=t.rsm[m.p];if(!n)return this.bad(this.unknownRule(t.t0,m.p),e,t,{is_open:s});(o=e.child=p(n,t,e.node)).parent=e,o.n={...e.n},0<Object.keys(e.keep).length&&(o.keep={...e.keep}),i+="@p:"+m.p}else if(m.r){let n=t.rsm[m.r];if(!n)return this.bad(this.unknownRule(t.t0,m.r),e,t,{is_open:s});(o=p(n,t,e.node)).parent=e.parent,o.prev=e,o.n={...e.n},0<Object.keys(e.keep).length&&(o.keep={...e.keep}),i+="@r:"+m.r}else s||(o=t.rs[--t.rsI]||t.NORULE),i+="Z";let h=s?e.ao?u.ao:null:e.ac?u.ac:null;if(h){let n=void 0;for(let r=0;r<h.length;r++)if((null==(n=h[r].call(this,e,t,o,n))?void 0:n.isToken)&&(null==n?void 0:n.err))return this.bad(n,e,t,{is_open:s})}o.why=i,t.log&&t.log(a.S.indent.repeat(e.d)+a.S.node+a.S.space,e.state.toUpperCase(),(e.prev.id+"/"+e.parent.id+"/"+e.child.id).padEnd(12),e.name+"~"+e.id,"w="+i,"n:"+(0,a.entries)(e.n).filter(e=>e[1]).map(e=>e[0]+"="+e[1]).join(";"),"u:"+(0,a.entries)(e.use).map(e=>e[0]+"="+e[1]).join(";"),"k:"+(0,a.entries)(e.keep).map(e=>e[0]+"="+e[1]).join(";"),"<"+l(e.node)+">");let g=0,v=e[s?"os":"cs"]-(m.b||0);for(;g++<v;)t.next();return r.OPEN===e.state&&(e.state=r.CLOSE),o}parse_alts(e,t,n,i){let l=h;l.b=0,l.p=r.EMPTY,l.r=r.EMPTY,l.n=void 0,l.h=void 0,l.a=void 0,l.u=void 0,l.k=void 0,l.e=void 0;let s,o=null,u=0,c=i.cfg.t,p=1<<c.AA-1,d=t.length;for(u=0;u<d;u++){o=t[u];let r=i.t0.tin,a=!1,c=!1;if(s=!0,o.S0&&(a=!0,(s=o.S0[r/31|0]&(1<<r%31-1|p))&&(c=null!=o.S1,o.S1))){c=!0;let e=i.t1.tin;s=o.S1[e/31|0]&(1<<e%31-1|p)}if(e?(n.o0=a?i.t0:i.NOTOKEN,n.o1=c?i.t1:i.NOTOKEN,n.os=(a?1:0)+(c?1:0)):(n.c0=a?i.t0:i.NOTOKEN,n.c1=c?i.t1:i.NOTOKEN,n.cs=(a?1:0)+(c?1:0)),s&&o.c&&(s=s&&o.c(n,i,l)),s)break;o=null}s||c.ZZ===i.t0.tin||(l.e=i.t0),o&&(l.n=null!=o.n?o.n:l.n,l.h=null!=o.h?o.h:l.h,l.a=null!=o.a?o.a:l.a,l.u=null!=o.u?o.u:l.u,l.k=null!=o.k?o.k:l.k,l.g=null!=o.g?o.g:l.g,l.e=o.e&&o.e(n,i,l)||void 0,l.p=null!=o.p?"string"==typeof o.p?o.p:o.p(n,i,l):l.p,l.r=null!=o.r?"string"==typeof o.r?o.r:o.r(n,i,l):l.r,l.b=null!=o.b?"number"==typeof o.b?o.b:o.b(n,i,l):l.b);let m=u<t.length;return i.log&&i.log(a.S.indent.repeat(n.d)+a.S.parse,n.state.toUpperCase(),(n.prev.id+"/"+n.parent.id+"/"+n.child.id).padEnd(12),n.name+"~"+n.id,m?"alt="+u:"no-alt",m&&l.g?"g:"+l.g+" ":"",(m&&l.p?"p:"+l.p+" ":"")+(m&&l.r?"r:"+l.r+" ":"")+(m&&l.b?"b:"+l.b+" ":""),(r.OPEN===n.state?[n.o0,n.o1].slice(0,n.os):[n.c0,n.c1].slice(0,n.cs)).map(e=>e.name+"="+i.F(e.src)).join(" "),"c:"+(o&&o.c?s:r.EMPTY),"n:"+(0,a.entries)(l.n).map(e=>e[0]+"="+e[1]).join(";"),"u:"+(0,a.entries)(l.u).map(e=>e[0]+"="+e[1]).join(";"),"k:"+(0,a.entries)(l.k).map(e=>e[0]+"="+e[1]).join(";"),u<t.length&&o.s?"["+o.s.map(e=>Array.isArray(e)?e.map(e=>c[e]).join("|"):c[e]).join(" ")+"]":"[]",l),l}bad(e,t,n,r){throw new a.JsonicError(e.err||a.S.unexpected,{...e.use,state:r.is_open?a.S.open:a.S.close},e,t,n)}unknownRule(e,t){return e.err="unknown_rule",e.use=e.use||{},e.use.rulename=t,e}}const v=(...e)=>new g(...e);o.makeRuleSpec=v;class k{constructor(e,t){this.rsm={},this.options=e,this.cfg=t}rule(e,t){if(null==e)return this.rsm;let n=this.rsm[e];if(null===t)delete this.rsm[e];else if(void 0!==t){n=this.rsm[e]=this.rsm[e]||v(this.cfg,{}),(n=this.rsm[e]=t(this.rsm[e],this.rsm)||this.rsm[e]).name=e;for(let e of[...n.def.open,...n.def.close])(0,a.normalt)(e);return}return n}start(e,t,n,i){let l,s=(0,u.makeToken)("#ZZ",(0,a.tokenize)("#ZZ",this.cfg),void 0,r.EMPTY,(0,u.makePoint)(-1)),o=(0,u.makeNoToken)(),c={uI:0,opts:this.options,cfg:this.cfg,meta:n||{},src:()=>e,root:()=>l.node,plgn:()=>t.internal().plugins,rule:{},sub:t.internal().sub,xs:-1,v2:s,v1:s,t0:s,t1:s,tC:-2,next:b,rs:[],rsI:0,rsm:this.rsm,log:void 0,F:(0,a.srcfmt)(this.cfg),use:{},NOTOKEN:o,NORULE:{}};c=(0,a.deep)(c,i);let d=(e=>p(v(e.cfg,{}),e))(c);if(c.NORULE=d,c.rule=d,(0,a.makelog)(c,n),""===e){if(this.cfg.lex.empty)return this.cfg.lex.emptyResult;throw new a.JsonicError(a.S.unexpected,{src:e},c.t0,d,c)}let m=e=>(0,a.tokenize)(e,this.cfg),h=(0,a.badlex)((0,u.makeLex)(c),(0,a.tokenize)("#BD",this.cfg),c),f=this.rsm[this.cfg.rule.start];if(null==f)return;let g=p(f,c);l=g;let k=2*(0,a.keys)(this.rsm).length*h.src.length*2*c.cfg.rule.maxmul,x=c.cfg.tokenSetDerived.ignore;function b(){let e,t;c.v2=c.v1,c.v1=c.t0,c.t0=c.t1;do{t=h(g),c.tC++}while(x[t.tin]&&(e=t));return t.ignored=e,c.t1=t,c.t0}b(),b();let y=0;for(;d!==g&&y<k;)c.sub.rule&&c.sub.rule.map(e=>e(g,c)),c.log&&c.log("\n"+a.S.indent.repeat(g.d)+a.S.stack,c.rs.slice(0,c.rsI).map(e=>e.name+"~"+e.id).join("/"),"<<"+c.F(l.node)+">>",c.rs.slice(0,c.rsI).map(e=>"<"+c.F(e.node)+">").join(" "),g,c),c.log&&c.log(a.S.indent.repeat(g.d)+a.S.rule+a.S.space,g.state.toUpperCase(),(g.prev.id+"/"+g.parent.id+"/"+g.child.id).padEnd(12),g.name+"~"+g.id,"["+c.F(c.t0.src)+" "+c.F(c.t1.src)+"]","n:"+(0,a.entries)(g.n).filter(e=>e[1]).map(e=>e[0]+"="+e[1]).join(";"),"u:"+(0,a.entries)(g.use).map(e=>e[0]+"="+e[1]).join(";"),"k:"+(0,a.entries)(g.keep).map(e=>e[0]+"="+e[1]).join(";"),"["+m(c.t0.tin)+" "+m(c.t1.tin)+"]",g,c),c.rule=g,g=g.process(c),y++;if((0,a.tokenize)("#ZZ",this.cfg)!==c.t0.tin)throw new a.JsonicError(a.S.unexpected,{},c.t0,d,c);const j=c.root();if(this.cfg.result.fail.includes(j))throw new a.JsonicError(a.S.unexpected,{},c.t0,d,c);return j}clone(e,t){let n=new k(e,t);return n.rsm=Object.keys(this.rsm).reduce((e,t)=>(e[t]=(0,a.filterRules)(this.rsm[t],this.cfg),e),{}),n}}o.Parser=k;var x={};function b(e){const t=e.token.OB,n=e.token.CB,r=e.token.OS,i=e.token.CS,l=e.token.CL,s=e.token.CA,o=e.token.TX,a=e.token.ST,u=e.token.ZZ,c=e.config(),p=c.tokenSet.val,d=c.tokenSet.key,m=e.util.deep,h=(e,t)=>{if(!t.cfg.rule.finish)return t.t0.src="END_OF_SOURCE",t.t0},f=e=>{const t=e.o0,n=a===t.tin||o===t.tin?t.val:t.src;e.use.key=n};e.rule("val",e=>{e.bo(e=>e.node=void 0).open([{s:[t],p:"map",b:1,g:"map,json"},{s:[r],p:"list",b:1,g:"list,json"},{s:[p],g:"val,json"}]).close([{s:[u],g:"end,json"},{b:1,g:"more,json"}]).bc((e,t)=>{e.node=void 0===e.node?void 0===e.child.node?0===e.os?void 0:e.o0.resolveVal(e,t):e.child.node:e.node})}),e.rule("map",e=>{e.bo(e=>{e.node={}}).open([{s:[t,n],g:"map,json"},{s:[t],p:"pair",n:{pk:0},g:"map,json,pair"}])}),e.rule("list",e=>{e.bo(e=>{e.node=[]}).open([{s:[r,i],g:"list,json"},{s:[r],p:"elem",g:"list,elem,json"}])}),e.rule("pair",e=>{e.open([{s:[d,l],p:"val",u:{pair:!0},a:f,g:"map,pair,key,json"}]).bc((e,t)=>{e.use.pair&&(e.use.prev=e.node[e.use.key],e.node[e.use.key]=e.child.node)}).close([{s:[n],g:"map,pair,json"},{s:[s],r:"pair",g:"map,pair,json"},{s:[u],e:h,g:"map,pair,json"}])}),e.rule("elem",e=>{e.open([{p:"val",u:{elem:!0},g:"list,elem,val,json"}]).bc(e=>{e.use.elem&&e.node.push(e.child.node)}).close([{s:[s],r:"elem",g:"list,elem,json"},{s:[i],g:"list,elem,json"},{s:[u],e:h,g:"list,elem,json"}])});const g=(e,t)=>{let n=e.use.key,r=e.child.node;const i=e.use.prev;r=void 0===r?null:r,e.node[n]=null==i?r:t.cfg.map.merge?t.cfg.map.merge(i,r):t.cfg.map.extend?m(i,r):r};e.rule("val",e=>{e.open([{s:[d,l],p:"map",b:2,n:{pk:1},g:"pair,jsonic"},{s:[p],g:"val,json"},{s:[[n,i]],b:1,g:"val,imp,null,jsonic"},{s:[s],c:{n:{il:0}},p:"list",b:1,g:"list,imp,jsonic"},{s:[s],b:1,g:"list,val,imp,null,jsonic"}],{append:!0,delete:[2]}).close([{s:[[n,i]],b:1,g:"val,json,close"},{s:[s],c:{n:{il:0,pk:0}},n:{il:1},r:"elem",a:e=>e.node=[e.node],g:"list,val,imp,comma,jsonic"},{c:{n:{il:0,pk:0}},n:{il:1},r:"elem",a:e=>e.node=[e.node],g:"list,val,imp,space,jsonic",b:1}],{append:!0,move:[1,-1]})}),e.rule("map",e=>{e.bo(e=>{e.n.il=1+(e.n.il?e.n.il:0),e.n.im=1+(e.n.im?e.n.im:0)}).open([{s:[d,l],p:"pair",b:2,g:"pair,list,val,imp"}],{append:!0})}),e.rule("list",e=>{e.bo(e=>{e.n.il=1+(e.n.il?e.n.il:0),e.n.pk=1+(e.n.pk?e.n.pk:0),e.n.im=1+(e.n.im?e.n.im:0)}).open([{s:[s],p:"elem",b:1,g:"list,elem,val,imp"},{p:"elem",g:"list,elem"}],{append:!0})}),e.rule("pair",e=>{e.open([{s:[s],g:"map,pair,comma"}],{append:!0}).bc((e,t)=>{e.use.pair&&g(e,t)}).close([{s:[n],c:{n:{pk:0}},g:"map,pair,json"},{s:[s,n],c:{n:{pk:0}},g:"map,pair,comma,jsonic"},{s:[s],c:{n:{pk:0}},r:"pair",g:"map,pair,json"},{s:[s],c:{n:{im:1}},r:"pair",g:"map,pair,jsonic"},{s:[p],c:{n:{pk:0}},r:"pair",b:1,g:"map,pair,imp,jsonic"},{s:[p],c:{n:{im:1}},r:"pair",b:1,g:"map,pair,imp,jsonic"},{s:[[n,s,...p]],b:1,g:"map,pair,imp,path,jsonic"},{s:[i],b:1,g:"list,pair,imp,jsonic"},{s:[u],e:h,g:"map,pair,json"}],{append:!0,delete:[0,1,2]})}),e.rule("elem",e=>{e.open([{s:[s,s],b:2,a:e=>e.node.push(null),g:"list,elem,imp,null,jsonic"},{s:[s],a:e=>e.node.push(null),g:"list,elem,imp,null,jsonic"},c.list.property&&{s:[d,l],p:"val",n:{pk:1},u:{elem:!1},a:f,g:"elem,pair,jsonic"}]).bc((e,t)=>{!1===e.use.elem&&(e.use.prev=e.node[e.use.key],g(e,t))}).close([{s:[s,i],g:"list,elem,comma.jsonic"},{s:[s],r:"elem",g:"list,elem,json"},{s:[[...p,t,r]],r:"elem",b:1,g:"list,elem,imp,jsonic"},{s:[i],g:"list,elem,json"},{s:[u],e:h,g:"list,elem,json"}],{delete:[-1,-2,-3]})})}Object.defineProperty(x,"__esModule",{value:!0}),x.makeJSON=x.grammar=void 0,x.grammar=b,x.makeJSON=function(e){let t=e.make({grammar$:!1,text:{lex:!1},number:{hex:!1,oct:!1,bin:!1,sep:null,exclude:/^00+/},string:{chars:'"',multiChars:"",allowUnknown:!1,escape:{v:null}},comment:{lex:!1},map:{extend:!1},lex:{empty:!1},rule:{finish:!1,include:"json"},result:{fail:[void 0,NaN]},tokenSet:{key:["#ST",null,null,null]}});return b(t),t};var y={};Object.defineProperty(y,"__esModule",{value:!0}),y.Debug=void 0;const j=(e,t)=>{const{keys:n,values:r,entries:i}=e.util;e.debug={describe:function(){var t;let l=null===(t=e.options.lex)||void 0===t?void 0:t.match,s=e.rule();return["========= RULES =========",E(e,n(s),s),"\n","========= ALTS =========",r(s).map(t=>"  "+t.name+":\n"+S(e,t,"open")+S(e,t,"close")).join("\n\n"),"\n","========= LEXER =========","  "+(l&&l.map(e=>e.name)||[]).join("\n  "),"\n","\n","========= PLUGIN =========","  "+e.internal().plugins.map(e=>e.name+(e.options?i(e.options).reduce((e,t)=>e+"\n    "+t[0]+": "+JSON.stringify(t[1]),""):"")).join("\n  "),"\n"].join("\n")}};const l=e.use.bind(e);e.use=(...e)=>{let n=l(...e);return t.print&&n.internal().config.debug.get_console().log(n.debug.describe()),n},t.trace};function S(e,t,n){const{entries:r}=e.util;return 0===t.def[n].length?"":"    "+n.toUpperCase()+":\n"+t.def[n].map((t,n)=>{var i,l;return"      "+(""+n).padStart(5," ")+" "+("["+(t.s||[]).map(t=>"number"==typeof t?e.token[t]:"["+t.map(t=>e.token[t])+"]").join(" ")+"] ").padEnd(32," ")+(t.r?" r="+("string"==typeof t.r?t.r:"<F>"):"")+(t.p?" p="+("string"==typeof t.p?t.p:"<F>"):"")+(t.r||t.p?"":"\t")+"\t"+(null==t.b?"":"b="+t.b)+"\t"+(null==t.n?"":"n="+r(t.n).map(([e,t])=>e+":"+t))+"\t"+(null==t.a?"":"A")+(null==t.c?"":"C")+(null==t.h?"":"H")+"\t"+(null==(null===(i=t.c)||void 0===i?void 0:i.n)?"\t":" CN="+r(t.c.n).map(([e,t])=>e+":"+t))+(null==(null===(l=t.c)||void 0===l?void 0:l.d)?"":" CD="+t.c.d)+(t.g?"\tg="+t.g:"")}).join("\n")+"\n"}function E(e,t,n){const{values:r,omap:i}=e.util;return t.reduce((e,t)=>e+="  "+t+":\n    "+r(i({op:O(n,t,"open","p"),or:O(n,t,"open","r"),cp:O(n,t,"close","p"),cr:O(n,t,"close","r")},([e,t])=>[1<t.length?e:void 0,e+": "+t])).join("\n    ")+"\n","")}function O(e,t,n,r){return[...new Set(e[t].def[n].filter(e=>e[r]).map(e=>e[r]).map(e=>"string"==typeof e?e:"<F>"))].join(" ")}y.Debug=j,j.defaults={print:!0,trace:!1};var I={exports:{}};Object.defineProperty(I.exports,"__esModule",{value:!0}),I.exports.EMPTY=I.exports.AFTER=I.exports.BEFORE=I.exports.CLOSE=I.exports.OPEN=I.exports.makeTextMatcher=I.exports.makeNumberMatcher=I.exports.makeCommentMatcher=I.exports.makeStringMatcher=I.exports.makeLineMatcher=I.exports.makeSpaceMatcher=I.exports.makeFixedMatcher=I.exports.makeLex=I.exports.makeRuleSpec=I.exports.makeRule=I.exports.makePoint=I.exports.makeToken=I.exports.make=I.exports.util=I.exports.Debug=I.exports.Parser=I.exports.JsonicError=I.exports.Jsonic=void 0,Object.defineProperty(I.exports,"OPEN",{enumerable:!0,get:function(){return r.OPEN}}),Object.defineProperty(I.exports,"CLOSE",{enumerable:!0,get:function(){return r.CLOSE}}),Object.defineProperty(I.exports,"BEFORE",{enumerable:!0,get:function(){return r.BEFORE}}),Object.defineProperty(I.exports,"AFTER",{enumerable:!0,get:function(){return r.AFTER}}),Object.defineProperty(I.exports,"EMPTY",{enumerable:!0,get:function(){return r.EMPTY}});const M=t({});Object.defineProperty(I.exports,"JsonicError",{enumerable:!0,get:function(){return M.JsonicError}});const T=n({});Object.defineProperty(I.exports,"makePoint",{enumerable:!0,get:function(){return T.makePoint}}),Object.defineProperty(I.exports,"makeToken",{enumerable:!0,get:function(){return T.makeToken}}),Object.defineProperty(I.exports,"makeLex",{enumerable:!0,get:function(){return T.makeLex}}),Object.defineProperty(I.exports,"makeFixedMatcher",{enumerable:!0,get:function(){return T.makeFixedMatcher}}),Object.defineProperty(I.exports,"makeSpaceMatcher",{enumerable:!0,get:function(){return T.makeSpaceMatcher}}),Object.defineProperty(I.exports,"makeLineMatcher",{enumerable:!0,get:function(){return T.makeLineMatcher}}),Object.defineProperty(I.exports,"makeStringMatcher",{enumerable:!0,get:function(){return T.makeStringMatcher}}),Object.defineProperty(I.exports,"makeCommentMatcher",{enumerable:!0,get:function(){return T.makeCommentMatcher}}),Object.defineProperty(I.exports,"makeNumberMatcher",{enumerable:!0,get:function(){return T.makeNumberMatcher}}),Object.defineProperty(I.exports,"makeTextMatcher",{enumerable:!0,get:function(){return T.makeTextMatcher}}),Object.defineProperty(I.exports,"makeRule",{enumerable:!0,get:function(){return o.makeRule}}),Object.defineProperty(I.exports,"makeRuleSpec",{enumerable:!0,get:function(){return o.makeRuleSpec}}),Object.defineProperty(I.exports,"Parser",{enumerable:!0,get:function(){return o.Parser}}),Object.defineProperty(I.exports,"Debug",{enumerable:!0,get:function(){return y.Debug}});const P={tokenize:M.tokenize,srcfmt:M.srcfmt,clone:M.clone,charset:M.charset,trimstk:M.trimstk,makelog:M.makelog,badlex:M.badlex,extract:M.extract,errinject:M.errinject,errdesc:M.errdesc,configure:M.configure,parserwrap:M.parserwrap,mesc:M.mesc,escre:M.escre,regexp:M.regexp,prop:M.prop,str:M.str,clean:M.clean,deep:M.deep,omap:M.omap,keys:M.keys,values:M.values,entries:M.entries};function C(e,t){if("json"===e)return(0,x.makeJSON)(N);let n={parser:{},config:{},plugins:[],sub:{lex:void 0,rule:void 0},mark:Math.random()},r=(0,M.deep)({},t?{...t.options}:!1===(null==e?void 0:e.defaults$)?{}:i.defaults,e||{}),l=function(e,t,n){var r;if(M.S.string===typeof e){let i=l.internal();return((null===(r=s.parser)||void 0===r?void 0:r.start)?(0,M.parserwrap)(s.parser):i.parser).start(e,l,t,n)}return e},s=e=>{if(null!=e&&M.S.object===typeof e){(0,M.deep)(r,e),(0,M.configure)(l,n.config,r);let t=l.internal().parser;n.parser=t.clone(r,n.config)}return{...l.options}},a={token:e=>(0,M.tokenize)(e,n.config,l),fixed:e=>n.config.fixed.ref[e],options:(0,M.deep)(s,r),config:()=>(0,M.deep)(n.config),parse:l,use:function(e,t){const n=e.name.toLowerCase(),r=(0,M.deep)({},e.defaults||{},t||{});l.options({plugin:{[n]:r}});let i=l.options.plugin[n];return l.internal().plugins.push(e),e.options=i,e(l,i)||l},rule:(e,t)=>l.internal().parser.rule(e,t)||l,lex:e=>{let t=r.lex.match;t.unshift(e),l.options({lex:{match:t}})},make:e=>C(e,l),empty:e=>C({defaults$:!1,standard$:!1,grammar$:!1,...e||{}}),id:"Jsonic/"+Date.now()+"/"+(""+Math.random()).substring(2,8).padEnd(6,"0")+(null==s.tag?"":"/"+s.tag),toString:()=>a.id,sub:e=>(e.lex&&(n.sub.lex=n.sub.lex||[],n.sub.lex.push(e.lex)),e.rule&&(n.sub.rule=n.sub.rule||[],n.sub.rule.push(e.rule)),l),util:P};if((0,M.defprop)(a.make,M.S.name,{value:M.S.make}),(0,M.assign)(l,a),(0,M.defprop)(l,"internal",{value:()=>n}),t){for(let n in t)void 0===l[n]&&(l[n]=t[n]);l.parent=t;let e=t.internal();n.config=(0,M.deep)({},e.config),(0,M.configure)(l,n.config,r),(0,M.assign)(l.token,n.config.t),n.plugins=[...e.plugins],n.parser=e.parser.clone(r,n.config)}else n.config=(0,M.configure)(l,void 0,r),n.plugins=[],n.parser=new o.Parser(r,n.config),!1!==r.grammar$&&(0,x.grammar)(l);return l}I.exports.util=P,I.exports.make=C;let N=void 0,w=N=C();return I.exports.Jsonic=w,delete N.options,delete N.use,delete N.rule,delete N.lex,delete N.token,delete N.fixed,N.Jsonic=N,N.JsonicError=M.JsonicError,N.Parser=o.Parser,N.Debug=y.Debug,N.makeLex=T.makeLex,N.makeToken=T.makeToken,N.makePoint=T.makePoint,N.makeRule=o.makeRule,N.makeRuleSpec=o.makeRuleSpec,N.makeFixedMatcher=T.makeFixedMatcher,N.makeSpaceMatcher=T.makeSpaceMatcher,N.makeLineMatcher=T.makeLineMatcher,N.makeStringMatcher=T.makeStringMatcher,N.makeCommentMatcher=T.makeCommentMatcher,N.makeNumberMatcher=T.makeNumberMatcher,N.makeTextMatcher=T.makeTextMatcher,N.OPEN=r.OPEN,N.CLOSE=r.CLOSE,N.BEFORE=r.BEFORE,N.AFTER=r.AFTER,N.EMPTY=r.EMPTY,N.util=P,N.make=C,I.exports.default=w,I.exports=I.exports.Jsonic,I=I.exports}));

/***/ }),

/***/ "ffda":
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_ffda__;

/***/ })

/******/ });
});
//# sourceMappingURL=Vxg.umd.js.map