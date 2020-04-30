(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global['vue-form-plugin'] = {}));
}(this, (function (exports) { 'use strict';

  var fails = function (exec) {
    try {
      return !!exec();
    } catch (error) {
      return true;
    }
  };

  // Thank's IE8 for his funny defineProperty
  var descriptors = !fails(function () {
    return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
  });

  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  function unwrapExports (x) {
  	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
  }

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  var check = function (it) {
    return it && it.Math == Math && it;
  };

  // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
  var global_1 =
    // eslint-disable-next-line no-undef
    check(typeof globalThis == 'object' && globalThis) ||
    check(typeof window == 'object' && window) ||
    check(typeof self == 'object' && self) ||
    check(typeof commonjsGlobal == 'object' && commonjsGlobal) ||
    // eslint-disable-next-line no-new-func
    Function('return this')();

  var isObject = function (it) {
    return typeof it === 'object' ? it !== null : typeof it === 'function';
  };

  var document$1 = global_1.document;
  // typeof document.createElement is 'object' in old IE
  var EXISTS = isObject(document$1) && isObject(document$1.createElement);

  var documentCreateElement = function (it) {
    return EXISTS ? document$1.createElement(it) : {};
  };

  // Thank's IE8 for his funny defineProperty
  var ie8DomDefine = !descriptors && !fails(function () {
    return Object.defineProperty(documentCreateElement('div'), 'a', {
      get: function () { return 7; }
    }).a != 7;
  });

  var anObject = function (it) {
    if (!isObject(it)) {
      throw TypeError(String(it) + ' is not an object');
    } return it;
  };

  // `ToPrimitive` abstract operation
  // https://tc39.github.io/ecma262/#sec-toprimitive
  // instead of the ES6 spec version, we didn't implement @@toPrimitive case
  // and the second argument - flag - preferred type is a string
  var toPrimitive = function (input, PREFERRED_STRING) {
    if (!isObject(input)) return input;
    var fn, val;
    if (PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
    if (typeof (fn = input.valueOf) == 'function' && !isObject(val = fn.call(input))) return val;
    if (!PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
    throw TypeError("Can't convert object to primitive value");
  };

  var nativeDefineProperty = Object.defineProperty;

  // `Object.defineProperty` method
  // https://tc39.github.io/ecma262/#sec-object.defineproperty
  var f = descriptors ? nativeDefineProperty : function defineProperty(O, P, Attributes) {
    anObject(O);
    P = toPrimitive(P, true);
    anObject(Attributes);
    if (ie8DomDefine) try {
      return nativeDefineProperty(O, P, Attributes);
    } catch (error) { /* empty */ }
    if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
    if ('value' in Attributes) O[P] = Attributes.value;
    return O;
  };

  var objectDefineProperty = {
  	f: f
  };

  var defineProperty = objectDefineProperty.f;

  var FunctionPrototype = Function.prototype;
  var FunctionPrototypeToString = FunctionPrototype.toString;
  var nameRE = /^\s*function ([^ (]*)/;
  var NAME = 'name';

  // Function instances `.name` property
  // https://tc39.github.io/ecma262/#sec-function-instances-name
  if (descriptors && !(NAME in FunctionPrototype)) {
    defineProperty(FunctionPrototype, NAME, {
      configurable: true,
      get: function () {
        try {
          return FunctionPrototypeToString.call(this).match(nameRE)[1];
        } catch (error) {
          return '';
        }
      }
    });
  }

  function styleInject(css, ref) {
    if ( ref === void 0 ) ref = {};
    var insertAt = ref.insertAt;

    if (!css || typeof document === 'undefined') { return; }

    var head = document.head || document.getElementsByTagName('head')[0];
    var style = document.createElement('style');
    style.type = 'text/css';

    if (insertAt === 'top') {
      if (head.firstChild) {
        head.insertBefore(style, head.firstChild);
      } else {
        head.appendChild(style);
      }
    } else {
      head.appendChild(style);
    }

    if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }
  }

  var css_248z = ".flatpickr-calendar {\n  background: transparent;\n  opacity: 0;\n  display: none;\n  text-align: center;\n  visibility: hidden;\n  padding: 0;\n  -webkit-animation: none;\n  animation: none;\n  direction: ltr;\n  border: 0;\n  font-size: 14px;\n  line-height: 24px;\n  border-radius: 5px;\n  position: absolute;\n  width: 307.875px;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  -ms-touch-action: manipulation;\n  touch-action: manipulation;\n  background: #fff;\n  -webkit-box-shadow: 1px 0 0 #e6e6e6, -1px 0 0 #e6e6e6, 0 1px 0 #e6e6e6, 0 -1px 0 #e6e6e6, 0 3px 13px rgba(0, 0, 0, 0.08);\n  box-shadow: 1px 0 0 #e6e6e6, -1px 0 0 #e6e6e6, 0 1px 0 #e6e6e6, 0 -1px 0 #e6e6e6, 0 3px 13px rgba(0, 0, 0, 0.08); }\n\n.flatpickr-calendar.open,\n.flatpickr-calendar.inline {\n  opacity: 1;\n  max-height: 640px;\n  visibility: visible; }\n\n.flatpickr-calendar.open {\n  display: inline-block;\n  z-index: 99999; }\n\n.flatpickr-calendar.animate.open {\n  -webkit-animation: fpFadeInDown 300ms cubic-bezier(0.23, 1, 0.32, 1);\n  animation: fpFadeInDown 300ms cubic-bezier(0.23, 1, 0.32, 1); }\n\n.flatpickr-calendar.inline {\n  display: block;\n  position: relative;\n  top: 2px; }\n\n.flatpickr-calendar.static {\n  position: absolute;\n  top: calc(100% + 2px); }\n\n.flatpickr-calendar.static.open {\n  z-index: 999;\n  display: block; }\n\n.flatpickr-calendar.multiMonth .flatpickr-days .dayContainer:nth-child(n+1) .flatpickr-day.inRange:nth-child(7n+7) {\n  -webkit-box-shadow: none !important;\n  box-shadow: none !important; }\n\n.flatpickr-calendar.multiMonth .flatpickr-days .dayContainer:nth-child(n+2) .flatpickr-day.inRange:nth-child(7n+1) {\n  -webkit-box-shadow: -2px 0 0 #e6e6e6, 5px 0 0 #e6e6e6;\n  box-shadow: -2px 0 0 #e6e6e6, 5px 0 0 #e6e6e6; }\n\n.flatpickr-calendar .hasWeeks .dayContainer,\n.flatpickr-calendar .hasTime .dayContainer {\n  border-bottom: 0;\n  border-bottom-right-radius: 0;\n  border-bottom-left-radius: 0; }\n\n.flatpickr-calendar .hasWeeks .dayContainer {\n  border-left: 0; }\n\n.flatpickr-calendar.showTimeInput.hasTime .flatpickr-time {\n  height: 40px;\n  border-top: 1px solid #e6e6e6; }\n\n.flatpickr-calendar.noCalendar.hasTime .flatpickr-time {\n  height: auto; }\n\n.flatpickr-calendar:before,\n.flatpickr-calendar:after {\n  position: absolute;\n  display: block;\n  pointer-events: none;\n  border: solid transparent;\n  content: '';\n  height: 0;\n  width: 0;\n  left: 22px; }\n\n.flatpickr-calendar.rightMost:before,\n.flatpickr-calendar.rightMost:after {\n  left: auto;\n  right: 22px; }\n\n.flatpickr-calendar:before {\n  border-width: 5px;\n  margin: 0 -5px; }\n\n.flatpickr-calendar:after {\n  border-width: 4px;\n  margin: 0 -4px; }\n\n.flatpickr-calendar.arrowTop:before,\n.flatpickr-calendar.arrowTop:after {\n  bottom: 100%; }\n\n.flatpickr-calendar.arrowTop:before {\n  border-bottom-color: #e6e6e6; }\n\n.flatpickr-calendar.arrowTop:after {\n  border-bottom-color: #fff; }\n\n.flatpickr-calendar.arrowBottom:before,\n.flatpickr-calendar.arrowBottom:after {\n  top: 100%; }\n\n.flatpickr-calendar.arrowBottom:before {\n  border-top-color: #e6e6e6; }\n\n.flatpickr-calendar.arrowBottom:after {\n  border-top-color: #fff; }\n\n.flatpickr-calendar:focus {\n  outline: 0; }\n\n.flatpickr-wrapper {\n  position: relative;\n  display: inline-block; }\n\n.flatpickr-months {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex; }\n\n.flatpickr-months .flatpickr-month {\n  background: transparent;\n  color: rgba(0, 0, 0, 0.9);\n  fill: rgba(0, 0, 0, 0.9);\n  height: 34px;\n  line-height: 1;\n  text-align: center;\n  position: relative;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n  overflow: hidden;\n  -webkit-box-flex: 1;\n  -webkit-flex: 1;\n  -ms-flex: 1;\n  flex: 1; }\n\n.flatpickr-months .flatpickr-prev-month,\n.flatpickr-months .flatpickr-next-month {\n  text-decoration: none;\n  cursor: pointer;\n  position: absolute;\n  top: 0;\n  height: 34px;\n  padding: 10px;\n  z-index: 3;\n  color: rgba(0, 0, 0, 0.9);\n  fill: rgba(0, 0, 0, 0.9); }\n\n.flatpickr-months .flatpickr-prev-month.flatpickr-disabled,\n.flatpickr-months .flatpickr-next-month.flatpickr-disabled {\n  display: none; }\n\n.flatpickr-months .flatpickr-prev-month i,\n.flatpickr-months .flatpickr-next-month i {\n  position: relative; }\n\n.flatpickr-months .flatpickr-prev-month.flatpickr-prev-month,\n.flatpickr-months .flatpickr-next-month.flatpickr-prev-month {\n  /*\n      /*rtl:begin:ignore*/\n  /*\n      */\n  left: 0;\n  /*\n      /*rtl:end:ignore*/\n  /*\n      */ }\n\n/*\n      /*rtl:begin:ignore*/\n/*\n      /*rtl:end:ignore*/\n.flatpickr-months .flatpickr-prev-month.flatpickr-next-month,\n.flatpickr-months .flatpickr-next-month.flatpickr-next-month {\n  /*\n      /*rtl:begin:ignore*/\n  /*\n      */\n  right: 0;\n  /*\n      /*rtl:end:ignore*/\n  /*\n      */ }\n\n/*\n      /*rtl:begin:ignore*/\n/*\n      /*rtl:end:ignore*/\n.flatpickr-months .flatpickr-prev-month:hover,\n.flatpickr-months .flatpickr-next-month:hover {\n  color: #959ea9; }\n\n.flatpickr-months .flatpickr-prev-month:hover svg,\n.flatpickr-months .flatpickr-next-month:hover svg {\n  fill: #f64747; }\n\n.flatpickr-months .flatpickr-prev-month svg,\n.flatpickr-months .flatpickr-next-month svg {\n  width: 14px;\n  height: 14px; }\n\n.flatpickr-months .flatpickr-prev-month svg path,\n.flatpickr-months .flatpickr-next-month svg path {\n  -webkit-transition: fill 0.1s;\n  transition: fill 0.1s;\n  fill: inherit; }\n\n.numInputWrapper {\n  position: relative;\n  height: auto; }\n\n.numInputWrapper input,\n.numInputWrapper span {\n  display: inline-block; }\n\n.numInputWrapper input {\n  width: 100%; }\n\n.numInputWrapper input::-ms-clear {\n  display: none; }\n\n.numInputWrapper input::-webkit-outer-spin-button,\n.numInputWrapper input::-webkit-inner-spin-button {\n  margin: 0;\n  -webkit-appearance: none; }\n\n.numInputWrapper span {\n  position: absolute;\n  right: 0;\n  width: 14px;\n  padding: 0 4px 0 2px;\n  height: 50%;\n  line-height: 50%;\n  opacity: 0;\n  cursor: pointer;\n  border: 1px solid rgba(57, 57, 57, 0.15);\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box; }\n\n.numInputWrapper span:hover {\n  background: rgba(0, 0, 0, 0.1); }\n\n.numInputWrapper span:active {\n  background: rgba(0, 0, 0, 0.2); }\n\n.numInputWrapper span:after {\n  display: block;\n  content: \"\";\n  position: absolute; }\n\n.numInputWrapper span.arrowUp {\n  top: 0;\n  border-bottom: 0; }\n\n.numInputWrapper span.arrowUp:after {\n  border-left: 4px solid transparent;\n  border-right: 4px solid transparent;\n  border-bottom: 4px solid rgba(57, 57, 57, 0.6);\n  top: 26%; }\n\n.numInputWrapper span.arrowDown {\n  top: 50%; }\n\n.numInputWrapper span.arrowDown:after {\n  border-left: 4px solid transparent;\n  border-right: 4px solid transparent;\n  border-top: 4px solid rgba(57, 57, 57, 0.6);\n  top: 40%; }\n\n.numInputWrapper span svg {\n  width: inherit;\n  height: auto; }\n\n.numInputWrapper span svg path {\n  fill: rgba(0, 0, 0, 0.5); }\n\n.numInputWrapper:hover {\n  background: rgba(0, 0, 0, 0.05); }\n\n.numInputWrapper:hover span {\n  opacity: 1; }\n\n.flatpickr-current-month {\n  font-size: 135%;\n  line-height: inherit;\n  font-weight: 300;\n  color: inherit;\n  position: absolute;\n  width: 75%;\n  left: 12.5%;\n  padding: 7.48px 0 0 0;\n  line-height: 1;\n  height: 34px;\n  display: inline-block;\n  text-align: center;\n  -webkit-transform: translate3d(0px, 0px, 0px);\n  transform: translate3d(0px, 0px, 0px); }\n\n.flatpickr-current-month span.cur-month {\n  font-family: inherit;\n  font-weight: 700;\n  color: inherit;\n  display: inline-block;\n  margin-left: 0.5ch;\n  padding: 0; }\n\n.flatpickr-current-month span.cur-month:hover {\n  background: rgba(0, 0, 0, 0.05); }\n\n.flatpickr-current-month .numInputWrapper {\n  width: 6ch;\n  width: 7ch\\0;\n  display: inline-block; }\n\n.flatpickr-current-month .numInputWrapper span.arrowUp:after {\n  border-bottom-color: rgba(0, 0, 0, 0.9); }\n\n.flatpickr-current-month .numInputWrapper span.arrowDown:after {\n  border-top-color: rgba(0, 0, 0, 0.9); }\n\n.flatpickr-current-month input.cur-year {\n  background: transparent;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  color: inherit;\n  cursor: text;\n  padding: 0 0 0 0.5ch;\n  margin: 0;\n  display: inline-block;\n  font-size: inherit;\n  font-family: inherit;\n  font-weight: 300;\n  line-height: inherit;\n  height: auto;\n  border: 0;\n  border-radius: 0;\n  vertical-align: initial;\n  -webkit-appearance: textfield;\n  -moz-appearance: textfield;\n  appearance: textfield; }\n\n.flatpickr-current-month input.cur-year:focus {\n  outline: 0; }\n\n.flatpickr-current-month input.cur-year[disabled],\n.flatpickr-current-month input.cur-year[disabled]:hover {\n  font-size: 100%;\n  color: rgba(0, 0, 0, 0.5);\n  background: transparent;\n  pointer-events: none; }\n\n.flatpickr-current-month .flatpickr-monthDropdown-months {\n  appearance: menulist;\n  background: transparent;\n  border: none;\n  border-radius: 0;\n  box-sizing: border-box;\n  color: inherit;\n  cursor: pointer;\n  font-size: inherit;\n  font-family: inherit;\n  font-weight: 300;\n  height: auto;\n  line-height: inherit;\n  margin: -1px 0 0 0;\n  outline: none;\n  padding: 0 0 0 0.5ch;\n  position: relative;\n  vertical-align: initial;\n  -webkit-box-sizing: border-box;\n  -webkit-appearance: menulist;\n  -moz-appearance: menulist;\n  width: auto; }\n\n.flatpickr-current-month .flatpickr-monthDropdown-months:focus,\n.flatpickr-current-month .flatpickr-monthDropdown-months:active {\n  outline: none; }\n\n.flatpickr-current-month .flatpickr-monthDropdown-months:hover {\n  background: rgba(0, 0, 0, 0.05); }\n\n.flatpickr-current-month .flatpickr-monthDropdown-months .flatpickr-monthDropdown-month {\n  background-color: transparent;\n  outline: none;\n  padding: 0; }\n\n.flatpickr-weekdays {\n  background: transparent;\n  text-align: center;\n  overflow: hidden;\n  width: 100%;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n  -ms-flex-align: center;\n  align-items: center;\n  height: 28px; }\n\n.flatpickr-weekdays .flatpickr-weekdaycontainer {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-flex: 1;\n  -webkit-flex: 1;\n  -ms-flex: 1;\n  flex: 1; }\n\nspan.flatpickr-weekday {\n  cursor: default;\n  font-size: 90%;\n  background: transparent;\n  color: rgba(0, 0, 0, 0.54);\n  line-height: 1;\n  margin: 0;\n  text-align: center;\n  display: block;\n  -webkit-box-flex: 1;\n  -webkit-flex: 1;\n  -ms-flex: 1;\n  flex: 1;\n  font-weight: bolder; }\n\n.dayContainer,\n.flatpickr-weeks {\n  padding: 1px 0 0 0; }\n\n.flatpickr-days {\n  position: relative;\n  overflow: hidden;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: start;\n  -webkit-align-items: flex-start;\n  -ms-flex-align: start;\n  align-items: flex-start;\n  width: 307.875px; }\n\n.flatpickr-days:focus {\n  outline: 0; }\n\n.dayContainer {\n  padding: 0;\n  outline: 0;\n  text-align: left;\n  width: 307.875px;\n  min-width: 307.875px;\n  max-width: 307.875px;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  display: inline-block;\n  display: -ms-flexbox;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: flex;\n  -webkit-flex-wrap: wrap;\n  flex-wrap: wrap;\n  -ms-flex-wrap: wrap;\n  -ms-flex-pack: justify;\n  -webkit-justify-content: space-around;\n  justify-content: space-around;\n  -webkit-transform: translate3d(0px, 0px, 0px);\n  transform: translate3d(0px, 0px, 0px);\n  opacity: 1; }\n\n.dayContainer + .dayContainer {\n  -webkit-box-shadow: -1px 0 0 #e6e6e6;\n  box-shadow: -1px 0 0 #e6e6e6; }\n\n.flatpickr-day {\n  background: none;\n  border: 1px solid transparent;\n  border-radius: 150px;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  color: #393939;\n  cursor: pointer;\n  font-weight: 400;\n  width: 14.2857143%;\n  -webkit-flex-basis: 14.2857143%;\n  -ms-flex-preferred-size: 14.2857143%;\n  flex-basis: 14.2857143%;\n  max-width: 39px;\n  height: 39px;\n  line-height: 39px;\n  margin: 0;\n  display: inline-block;\n  position: relative;\n  -webkit-box-pack: center;\n  -webkit-justify-content: center;\n  -ms-flex-pack: center;\n  justify-content: center;\n  text-align: center; }\n\n.flatpickr-day.inRange,\n.flatpickr-day.prevMonthDay.inRange,\n.flatpickr-day.nextMonthDay.inRange,\n.flatpickr-day.today.inRange,\n.flatpickr-day.prevMonthDay.today.inRange,\n.flatpickr-day.nextMonthDay.today.inRange,\n.flatpickr-day:hover,\n.flatpickr-day.prevMonthDay:hover,\n.flatpickr-day.nextMonthDay:hover,\n.flatpickr-day:focus,\n.flatpickr-day.prevMonthDay:focus,\n.flatpickr-day.nextMonthDay:focus {\n  cursor: pointer;\n  outline: 0;\n  background: #e6e6e6;\n  border-color: #e6e6e6; }\n\n.flatpickr-day.today {\n  border-color: #959ea9; }\n\n.flatpickr-day.today:hover,\n.flatpickr-day.today:focus {\n  border-color: #959ea9;\n  background: #959ea9;\n  color: #fff; }\n\n.flatpickr-day.selected,\n.flatpickr-day.startRange,\n.flatpickr-day.endRange,\n.flatpickr-day.selected.inRange,\n.flatpickr-day.startRange.inRange,\n.flatpickr-day.endRange.inRange,\n.flatpickr-day.selected:focus,\n.flatpickr-day.startRange:focus,\n.flatpickr-day.endRange:focus,\n.flatpickr-day.selected:hover,\n.flatpickr-day.startRange:hover,\n.flatpickr-day.endRange:hover,\n.flatpickr-day.selected.prevMonthDay,\n.flatpickr-day.startRange.prevMonthDay,\n.flatpickr-day.endRange.prevMonthDay,\n.flatpickr-day.selected.nextMonthDay,\n.flatpickr-day.startRange.nextMonthDay,\n.flatpickr-day.endRange.nextMonthDay {\n  background: #569ff7;\n  -webkit-box-shadow: none;\n  box-shadow: none;\n  color: #fff;\n  border-color: #569ff7; }\n\n.flatpickr-day.selected.startRange,\n.flatpickr-day.startRange.startRange,\n.flatpickr-day.endRange.startRange {\n  border-radius: 50px 0 0 50px; }\n\n.flatpickr-day.selected.endRange,\n.flatpickr-day.startRange.endRange,\n.flatpickr-day.endRange.endRange {\n  border-radius: 0 50px 50px 0; }\n\n.flatpickr-day.selected.startRange + .endRange:not(:nth-child(7n+1)),\n.flatpickr-day.startRange.startRange + .endRange:not(:nth-child(7n+1)),\n.flatpickr-day.endRange.startRange + .endRange:not(:nth-child(7n+1)) {\n  -webkit-box-shadow: -10px 0 0 #569ff7;\n  box-shadow: -10px 0 0 #569ff7; }\n\n.flatpickr-day.selected.startRange.endRange,\n.flatpickr-day.startRange.startRange.endRange,\n.flatpickr-day.endRange.startRange.endRange {\n  border-radius: 50px; }\n\n.flatpickr-day.inRange {\n  border-radius: 0;\n  -webkit-box-shadow: -5px 0 0 #e6e6e6, 5px 0 0 #e6e6e6;\n  box-shadow: -5px 0 0 #e6e6e6, 5px 0 0 #e6e6e6; }\n\n.flatpickr-day.flatpickr-disabled,\n.flatpickr-day.flatpickr-disabled:hover,\n.flatpickr-day.prevMonthDay,\n.flatpickr-day.nextMonthDay,\n.flatpickr-day.notAllowed,\n.flatpickr-day.notAllowed.prevMonthDay,\n.flatpickr-day.notAllowed.nextMonthDay {\n  color: rgba(57, 57, 57, 0.3);\n  background: transparent;\n  border-color: transparent;\n  cursor: default; }\n\n.flatpickr-day.flatpickr-disabled,\n.flatpickr-day.flatpickr-disabled:hover {\n  cursor: not-allowed;\n  color: rgba(57, 57, 57, 0.1); }\n\n.flatpickr-day.week.selected {\n  border-radius: 0;\n  -webkit-box-shadow: -5px 0 0 #569ff7, 5px 0 0 #569ff7;\n  box-shadow: -5px 0 0 #569ff7, 5px 0 0 #569ff7; }\n\n.flatpickr-day.hidden {\n  visibility: hidden; }\n\n.rangeMode .flatpickr-day {\n  margin-top: 1px; }\n\n.flatpickr-weekwrapper {\n  float: left; }\n\n.flatpickr-weekwrapper .flatpickr-weeks {\n  padding: 0 12px;\n  -webkit-box-shadow: 1px 0 0 #e6e6e6;\n  box-shadow: 1px 0 0 #e6e6e6; }\n\n.flatpickr-weekwrapper .flatpickr-weekday {\n  float: none;\n  width: 100%;\n  line-height: 28px; }\n\n.flatpickr-weekwrapper span.flatpickr-day,\n.flatpickr-weekwrapper span.flatpickr-day:hover {\n  display: block;\n  width: 100%;\n  max-width: none;\n  color: rgba(57, 57, 57, 0.3);\n  background: transparent;\n  cursor: default;\n  border: none; }\n\n.flatpickr-innerContainer {\n  display: block;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  overflow: hidden; }\n\n.flatpickr-rContainer {\n  display: inline-block;\n  padding: 0;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box; }\n\n.flatpickr-time {\n  text-align: center;\n  outline: 0;\n  display: block;\n  height: 0;\n  line-height: 40px;\n  max-height: 40px;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  overflow: hidden;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex; }\n\n.flatpickr-time:after {\n  content: \"\";\n  display: table;\n  clear: both; }\n\n.flatpickr-time .numInputWrapper {\n  -webkit-box-flex: 1;\n  -webkit-flex: 1;\n  -ms-flex: 1;\n  flex: 1;\n  width: 40%;\n  height: 40px;\n  float: left; }\n\n.flatpickr-time .numInputWrapper span.arrowUp:after {\n  border-bottom-color: #393939; }\n\n.flatpickr-time .numInputWrapper span.arrowDown:after {\n  border-top-color: #393939; }\n\n.flatpickr-time.hasSeconds .numInputWrapper {\n  width: 26%; }\n\n.flatpickr-time.time24hr .numInputWrapper {\n  width: 49%; }\n\n.flatpickr-time input {\n  background: transparent;\n  -webkit-box-shadow: none;\n  box-shadow: none;\n  border: 0;\n  border-radius: 0;\n  text-align: center;\n  margin: 0;\n  padding: 0;\n  height: inherit;\n  line-height: inherit;\n  color: #393939;\n  font-size: 14px;\n  position: relative;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  -webkit-appearance: textfield;\n  -moz-appearance: textfield;\n  appearance: textfield; }\n\n.flatpickr-time input.flatpickr-hour {\n  font-weight: bold; }\n\n.flatpickr-time input.flatpickr-minute,\n.flatpickr-time input.flatpickr-second {\n  font-weight: 400; }\n\n.flatpickr-time input:focus {\n  outline: 0;\n  border: 0; }\n\n.flatpickr-time .flatpickr-time-separator,\n.flatpickr-time .flatpickr-am-pm {\n  height: inherit;\n  float: left;\n  line-height: inherit;\n  color: #393939;\n  font-weight: bold;\n  width: 2%;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n  -webkit-align-self: center;\n  -ms-flex-item-align: center;\n  align-self: center; }\n\n.flatpickr-time .flatpickr-am-pm {\n  outline: 0;\n  width: 18%;\n  cursor: pointer;\n  text-align: center;\n  font-weight: 400; }\n\n.flatpickr-time input:hover,\n.flatpickr-time .flatpickr-am-pm:hover,\n.flatpickr-time input:focus,\n.flatpickr-time .flatpickr-am-pm:focus {\n  background: #eee; }\n\n.flatpickr-input[readonly] {\n  cursor: pointer; }\n\n@-webkit-keyframes fpFadeInDown {\n  from {\n    opacity: 0;\n    -webkit-transform: translate3d(0, -20px, 0);\n    transform: translate3d(0, -20px, 0); }\n  to {\n    opacity: 1;\n    -webkit-transform: translate3d(0, 0, 0);\n    transform: translate3d(0, 0, 0); } }\n\n@keyframes fpFadeInDown {\n  from {\n    opacity: 0;\n    -webkit-transform: translate3d(0, -20px, 0);\n    transform: translate3d(0, -20px, 0); }\n  to {\n    opacity: 1;\n    -webkit-transform: translate3d(0, 0, 0);\n    transform: translate3d(0, 0, 0); } }\n\nfieldset[disabled] .multiselect {\n  pointer-events: none; }\n\n.multiselect__spinner {\n  position: absolute;\n  right: 1px;\n  top: 1px;\n  width: 48px;\n  height: 35px;\n  background: #fff;\n  display: block; }\n\n.multiselect__spinner:after, .multiselect__spinner:before {\n  position: absolute;\n  content: \"\";\n  top: 50%;\n  left: 50%;\n  margin: -8px 0 0 -8px;\n  width: 16px;\n  height: 16px;\n  border-radius: 100%;\n  border: 2px solid transparent;\n  border-top-color: #41b883;\n  box-shadow: 0 0 0 1px transparent; }\n\n.multiselect__spinner:before {\n  animation: spinning 2.4s cubic-bezier(0.41, 0.26, 0.2, 0.62);\n  animation-iteration-count: infinite; }\n\n.multiselect__spinner:after {\n  animation: spinning 2.4s cubic-bezier(0.51, 0.09, 0.21, 0.8);\n  animation-iteration-count: infinite; }\n\n.multiselect__loading-enter-active, .multiselect__loading-leave-active {\n  transition: opacity .4s ease-in-out;\n  opacity: 1; }\n\n.multiselect__loading-enter, .multiselect__loading-leave-active {\n  opacity: 0; }\n\n.multiselect, .multiselect__input, .multiselect__single {\n  font-family: inherit;\n  font-size: 16px;\n  -ms-touch-action: manipulation;\n  touch-action: manipulation; }\n\n.multiselect {\n  box-sizing: content-box;\n  display: block;\n  position: relative;\n  width: 100%;\n  min-height: 40px;\n  text-align: left;\n  color: #35495e; }\n\n.multiselect * {\n  box-sizing: border-box; }\n\n.multiselect:focus {\n  outline: none; }\n\n.multiselect--disabled {\n  background: #ededed;\n  pointer-events: none;\n  opacity: .6; }\n\n.multiselect--active {\n  z-index: 50; }\n\n.multiselect--active:not(.multiselect--above) .multiselect__current, .multiselect--active:not(.multiselect--above) .multiselect__input, .multiselect--active:not(.multiselect--above) .multiselect__tags {\n  border-bottom-left-radius: 0;\n  border-bottom-right-radius: 0; }\n\n.multiselect--active .multiselect__select {\n  transform: rotate(180deg); }\n\n.multiselect--above.multiselect--active .multiselect__current, .multiselect--above.multiselect--active .multiselect__input, .multiselect--above.multiselect--active .multiselect__tags {\n  border-top-left-radius: 0;\n  border-top-right-radius: 0; }\n\n.multiselect__input, .multiselect__single {\n  position: relative;\n  display: inline-block;\n  min-height: 20px;\n  line-height: 20px;\n  border: none;\n  border-radius: 5px;\n  background: #fff;\n  padding: 0 0 0 5px;\n  width: 100%;\n  transition: border .1s ease;\n  box-sizing: border-box;\n  margin-bottom: 8px;\n  vertical-align: top; }\n\n.multiselect__input:-ms-input-placeholder {\n  color: #35495e; }\n\n.multiselect__input::placeholder {\n  color: #35495e; }\n\n.multiselect__tag ~ .multiselect__input, .multiselect__tag ~ .multiselect__single {\n  width: auto; }\n\n.multiselect__input:hover, .multiselect__single:hover {\n  border-color: #cfcfcf; }\n\n.multiselect__input:focus, .multiselect__single:focus {\n  border-color: #a8a8a8;\n  outline: none; }\n\n.multiselect__single {\n  padding-left: 5px;\n  margin-bottom: 8px; }\n\n.multiselect__tags-wrap {\n  display: inline; }\n\n.multiselect__tags {\n  min-height: 40px;\n  display: block;\n  padding: 8px 40px 0 8px;\n  border-radius: 5px;\n  border: 1px solid #e8e8e8;\n  background: #fff;\n  font-size: 14px; }\n\n.multiselect__tag {\n  position: relative;\n  display: inline-block;\n  padding: 4px 26px 4px 10px;\n  border-radius: 5px;\n  margin-right: 10px;\n  color: #fff;\n  line-height: 1;\n  background: #41b883;\n  margin-bottom: 5px;\n  white-space: nowrap;\n  overflow: hidden;\n  max-width: 100%;\n  text-overflow: ellipsis; }\n\n.multiselect__tag-icon {\n  cursor: pointer;\n  margin-left: 7px;\n  position: absolute;\n  right: 0;\n  top: 0;\n  bottom: 0;\n  font-weight: 700;\n  font-style: normal;\n  width: 22px;\n  text-align: center;\n  line-height: 22px;\n  transition: all .2s ease;\n  border-radius: 5px; }\n\n.multiselect__tag-icon:after {\n  content: \"\\D7\";\n  color: #266d4d;\n  font-size: 14px; }\n\n.multiselect__tag-icon:focus, .multiselect__tag-icon:hover {\n  background: #369a6e; }\n\n.multiselect__tag-icon:focus:after, .multiselect__tag-icon:hover:after {\n  color: #fff; }\n\n.multiselect__current {\n  min-height: 40px;\n  overflow: hidden;\n  padding: 8px 30px 0 12px;\n  white-space: nowrap;\n  border-radius: 5px;\n  border: 1px solid #e8e8e8; }\n\n.multiselect__current, .multiselect__select {\n  line-height: 16px;\n  box-sizing: border-box;\n  display: block;\n  margin: 0;\n  text-decoration: none;\n  cursor: pointer; }\n\n.multiselect__select {\n  position: absolute;\n  width: 40px;\n  height: 38px;\n  right: 1px;\n  top: 1px;\n  padding: 4px 8px;\n  text-align: center;\n  transition: transform .2s ease; }\n\n.multiselect__select:before {\n  position: relative;\n  right: 0;\n  top: 65%;\n  color: #999;\n  margin-top: 4px;\n  border-color: #999 transparent transparent;\n  border-style: solid;\n  border-width: 5px 5px 0;\n  content: \"\"; }\n\n.multiselect__placeholder {\n  color: #adadad;\n  display: inline-block;\n  margin-bottom: 10px;\n  padding-top: 2px; }\n\n.multiselect--active .multiselect__placeholder {\n  display: none; }\n\n.multiselect__content-wrapper {\n  position: absolute;\n  display: block;\n  background: #fff;\n  width: 100%;\n  max-height: 240px;\n  overflow: auto;\n  border: 1px solid #e8e8e8;\n  border-top: none;\n  border-bottom-left-radius: 5px;\n  border-bottom-right-radius: 5px;\n  z-index: 50;\n  -webkit-overflow-scrolling: touch; }\n\n.multiselect__content {\n  list-style: none;\n  display: inline-block;\n  padding: 0;\n  margin: 0;\n  min-width: 100%;\n  vertical-align: top; }\n\n.multiselect--above .multiselect__content-wrapper {\n  bottom: 100%;\n  border-bottom-left-radius: 0;\n  border-bottom-right-radius: 0;\n  border-top-left-radius: 5px;\n  border-top-right-radius: 5px;\n  border-bottom: none;\n  border-top: 1px solid #e8e8e8; }\n\n.multiselect__content::webkit-scrollbar {\n  display: none; }\n\n.multiselect__element {\n  display: block; }\n\n.multiselect__option {\n  display: block;\n  padding: 12px;\n  min-height: 40px;\n  line-height: 16px;\n  text-decoration: none;\n  text-transform: none;\n  vertical-align: middle;\n  position: relative;\n  cursor: pointer;\n  white-space: nowrap; }\n\n.multiselect__option:after {\n  top: 0;\n  right: 0;\n  position: absolute;\n  line-height: 40px;\n  padding-right: 12px;\n  padding-left: 20px;\n  font-size: 13px; }\n\n.multiselect__option--highlight {\n  background: #41b883;\n  outline: none;\n  color: #fff; }\n\n.multiselect__option--highlight:after {\n  content: attr(data-select);\n  background: #41b883;\n  color: #fff; }\n\n.multiselect__option--selected {\n  background: #f3f3f3;\n  color: #35495e;\n  font-weight: 700; }\n\n.multiselect__option--selected:after {\n  content: attr(data-selected);\n  color: silver; }\n\n.multiselect__option--selected.multiselect__option--highlight {\n  background: #ff6a6a;\n  color: #fff; }\n\n.multiselect__option--selected.multiselect__option--highlight:after {\n  background: #ff6a6a;\n  content: attr(data-deselect);\n  color: #fff; }\n\n.multiselect--disabled .multiselect__current, .multiselect--disabled .multiselect__select {\n  background: #ededed;\n  color: #a6a6a6; }\n\n.multiselect__option--disabled {\n  background: #ededed !important;\n  color: #a6a6a6 !important;\n  cursor: text;\n  pointer-events: none; }\n\n.multiselect__option--group {\n  background: #ededed;\n  color: #35495e; }\n\n.multiselect__option--group.multiselect__option--highlight {\n  background: #35495e;\n  color: #fff; }\n\n.multiselect__option--group.multiselect__option--highlight:after {\n  background: #35495e; }\n\n.multiselect__option--disabled.multiselect__option--highlight {\n  background: #dedede; }\n\n.multiselect__option--group-selected.multiselect__option--highlight {\n  background: #ff6a6a;\n  color: #fff; }\n\n.multiselect__option--group-selected.multiselect__option--highlight:after {\n  background: #ff6a6a;\n  content: attr(data-deselect);\n  color: #fff; }\n\n.multiselect-enter-active, .multiselect-leave-active {\n  transition: all .15s ease; }\n\n.multiselect-enter, .multiselect-leave-active {\n  opacity: 0; }\n\n.multiselect__strong {\n  margin-bottom: 8px;\n  line-height: 20px;\n  display: inline-block;\n  vertical-align: top; }\n\n[dir=rtl] .multiselect {\n  text-align: right; }\n\n[dir=rtl] .multiselect__select {\n  right: auto;\n  left: 1px; }\n\n[dir=rtl] .multiselect__tags {\n  padding: 8px 8px 0 40px; }\n\n[dir=rtl] .multiselect__content {\n  text-align: right; }\n\n[dir=rtl] .multiselect__option:after {\n  right: auto;\n  left: 0; }\n\n[dir=rtl] .multiselect__clear {\n  right: auto;\n  left: 12px; }\n\n[dir=rtl] .multiselect__spinner {\n  right: auto;\n  left: 1px; }\n\n@keyframes spinning {\n  0% {\n    transform: rotate(0); }\n  to {\n    transform: rotate(2turn); } }\n\ninput[type=\"text\"],\ninput[type=\"email\"],\ntextarea,\nselect,\ninput[type=\"password\"] {\n  -webkit-appearance: none;\n  -moz-appearance: none;\n  background-color: #fff;\n  box-sizing: border-box; }\n  input[type=\"text\"]::placeholder,\n  input[type=\"email\"]::placeholder,\n  textarea::placeholder,\n  select::placeholder,\n  input[type=\"password\"]::placeholder {\n    color: rgba(100, 100, 100, 0.5) !important; }\n\ninput[type=\"number\"] {\n  box-sizing: border-box; }\n  input[type=\"number\"]::-webkit-outer-spin-button, input[type=\"number\"]::-webkit-inner-spin-button {\n    -webkit-appearance: none;\n    margin: 0; }\n\n.form-group {\n  margin-bottom: 16px;\n  line-height: 19px;\n  position: relative;\n  box-sizing: content-box; }\n  .form-group label {\n    width: auto;\n    display: block;\n    color: rgba(100, 100, 100, 0.5);\n    font-size: 16px;\n    margin-bottom: 8px;\n    text-align: left; }\n  .form-group .allowclear {\n    float: right;\n    margin-top: -24px; }\n    .form-group .allowclear i {\n      font-size: 20px;\n      color: #f55753;\n      cursor: pointer; }\n  .form-group .form-control {\n    width: 100%;\n    border-radius: 5px;\n    background: #fff;\n    box-shadow: none;\n    height: 40px;\n    padding: 4px 12px;\n    font-size: 14px;\n    line-height: 1.42857143;\n    color: #555;\n    background-color: #fff;\n    background-image: none;\n    border: 1px solid #e0e7ff;\n    -webkit-appearance: none; }\n    .form-group .form-control:focus {\n      outline: none; }\n    .form-group .form-control::-webkit-input-placeholder {\n      /* Chrome/Opera/Safari */\n      text-transform: capitalize;\n      color: #858585;\n      font-weight: 400; }\n    .form-group .form-control::-moz-placeholder {\n      /* Firefox 19+ */\n      color: #858585;\n      text-transform: capitalize;\n      font-weight: 400; }\n    .form-group .form-control:-ms-input-placeholder {\n      /* IE 10+ */\n      color: #858585;\n      text-transform: capitalize;\n      font-weight: 400; }\n    .form-group .form-control:-moz-placeholder {\n      /* Firefox 18- */\n      color: #858585;\n      text-transform: capitalize;\n      font-weight: 400; }\n    .form-group .form-control.no-border {\n      border: none; }\n    .form-group .form-control.datepicker {\n      background-image: url(\"../assets/images/datepicker.svg\");\n      background-repeat: no-repeat;\n      background-size: 26px;\n      background-position: right 14px center; }\n    .form-group .form-control:disabled {\n      background-color: f5f5f5;\n      cursor: not-allowed; }\n    .form-group .form-control::-webkit-inner-spin-button, .form-group .form-control::-webkit-outer-spin-button {\n      -webkit-appearance: none;\n      margin: 0; }\n  .form-group .form-control-static {\n    font-weight: 600;\n    font-size: 16px;\n    min-height: 32px; }\n    .form-group .form-control-static.pre {\n      white-space: pre-wrap; }\n  .form-group textarea {\n    width: 100%;\n    height: auto !important;\n    resize: none; }\n  .form-group select {\n    padding-top: 8px !important;\n    padding-bottom: 8px !important;\n    width: 100%;\n    border-radius: 6px;\n    background-color: #fff;\n    border: none;\n    font-size: 16px;\n    cursor: pointer;\n    color: #858585;\n    font-weight: 400;\n    background-image: url(\"../assets/images/select.png\");\n    background-repeat: no-repeat;\n    background-size: 16px;\n    background-position: right 13px center;\n    box-shadow: none;\n    -webkit-appearance: none; }\n    .form-group select:focus {\n      outline: none; }\n  .form-group .validation-message {\n    margin-top: 8px;\n    color: rgba(100, 100, 100, 0.5);\n    text-align: left; }\n  .form-group .vue-tel-input {\n    width: 100%; }\n    .form-group .vue-tel-input:focus-within {\n      box-shadow: none;\n      border-color: #e0e7ff; }\n    .form-group .vue-tel-input .vti__dropdown-list:focus, .form-group .vue-tel-input .vti__dropdown:focus {\n      outline: 0 !important; }\n    .form-group .vue-tel-input .vti__input {\n      background-color: #fff !important; }\n  .form-group .intellisense {\n    display: none; }\n    .form-group .intellisense.visible {\n      z-index: 1;\n      position: absolute;\n      font-size: 1rem;\n      top: 11px;\n      left: 13px;\n      display: block;\n      background: transparent;\n      width: inherit;\n      padding-left: 0;\n      color: rgba(100, 100, 100, 0.5); }\n  .form-group .intellisense-help {\n    position: absolute;\n    right: 8px;\n    top: 11px;\n    color: #e21212;\n    z-index: 0;\n    display: flex;\n    align-items: center; }\n    .form-group .intellisense-help i {\n      font-size: 16px;\n      margin-right: 4px; }\n\ninput[type=\"file\"] {\n  width: 100%;\n  outline: 0 !important;\n  margin-top: 4px;\n  margin-bottom: 10px;\n  height: 36px; }\n  input[type=\"file\"]::-webkit-file-upload-button {\n    visibility: hidden !important;\n    -webkit-appearance: none; }\n  input[type=\"file\"]::before {\n    content: 'Choose File';\n    display: inline-block;\n    background-color: #e21212;\n    border-radius: 6px;\n    line-height: 36px;\n    height: 36px;\n    outline: none;\n    white-space: nowrap;\n    -webkit-user-select: none;\n    color: #fff;\n    cursor: pointer;\n    font-weight: 400;\n    font-size: 13px;\n    outline: 0 !important;\n    padding: 0 12px; }\n  input[type=\"file\"]:hover::before {\n    border-color: black; }\n\n.form-horizontal .left-border {\n  border-left: 4px solid rgba(244, 246, 251, 0.8);\n  border-radius: 2px; }\n  @media (max-width: 767px) {\n    .form-horizontal .left-border {\n      border-left: none; } }\n\n.form-horizontal .form-group-view .form-group {\n  margin-bottom: 0 !important;\n  margin-right: 8px;\n  margin-left: -8px; }\n  .form-horizontal .form-group-view .form-group:nth-child(2n) {\n    background-color: rgba(205, 205, 205, 0.19); }\n  .form-horizontal .form-group-view .form-group > div {\n    padding: 4px 4px 4px 8px; }\n  .form-horizontal .form-group-view .form-group .form-control-static {\n    padding-right: 8px; }\n\n.form-horizontal .form-group {\n  margin-bottom: 16px; }\n  .form-horizontal .form-group.material label {\n    display: inline-block; }\n  .form-horizontal .form-group > div {\n    width: 100%;\n    display: flex;\n    align-items: center; }\n    .form-horizontal .form-group > div:after {\n      content: \"\";\n      clear: both;\n      display: table; }\n  .form-horizontal .form-group label {\n    float: left;\n    width: 30%;\n    margin-bottom: 0; }\n  .form-horizontal .form-group .form-element {\n    float: left;\n    position: relative;\n    width: 70%; }\n    .form-horizontal .form-group .form-element:after {\n      clear: both; }\n    .form-horizontal .form-group .form-element .form-control {\n      text-align: left; }\n  .form-horizontal .form-group .validation-message {\n    margin-left: 30%;\n    width: 70%;\n    top: 4px; }\n  .form-horizontal .form-group .form-control-static {\n    float: left;\n    width: 70%;\n    min-height: 40px;\n    margin-bottom: 0;\n    text-align: right;\n    line-height: 40px; }\n  .form-horizontal .form-group input[type=\"number\"] {\n    text-align: right !important; }\n  .form-horizontal .form-group .multiselect__single, .form-horizontal .form-group .multiselect__option {\n    text-align: left; }\n\n.form-horizontal .checkbox .form-element .check-label {\n  float: right; }\n\n.form-horizontal .clearfix {\n  display: none; }\n\n@media print {\n  body * {\n    visibility: hidden; }\n    body * .content-wrapper {\n      overflow-x: visible !important;\n      overflow-y: visible !important;\n      margin-left: 0 !important;\n      margin-top: 0 !important; }\n  #app {\n    overflow: visible !important; }\n  #pdf-report,\n  #pdf-report * {\n    visibility: visible;\n    -webkit-print-color-adjust: exact; }\n  #pdf-report {\n    position: absolute;\n    left: 0;\n    top: 0;\n    width: 100%;\n    height: 100%; }\n    #pdf-report .print-info {\n      display: block !important;\n      margin-bottom: 16px; }\n    #pdf-report i {\n      display: none; }\n    #pdf-report .category {\n      margin-bottom: 16px; } }\n\n.multiple .multiselect__select:before {\n  top: 70%; }\n\n.multiple .multiselect__tags {\n  min-height: auto;\n  max-height: 100px;\n  padding-top: 6px;\n  overflow: scroll;\n  border-color: #e0e7ff; }\n\n.multiple .multiselect__tag {\n  background: #e21212; }\n  .multiple .multiselect__tag-icon:hover {\n    background: #cb1010; }\n  .multiple .multiselect__tag-icon:after {\n    color: #ddd; }\n\n.single .multiselect--disabled .multiselect__select {\n  background: transparent !important; }\n\n.single .multiselect__input {\n  width: auto !important;\n  min-height: 22px;\n  line-height: 22px; }\n\n.single .multiselect__tags {\n  border-color: #e0e7ff; }\n\n.multiselect__content-wrapper {\n  min-height: auto; }\n\n.multiselect__option {\n  background: none;\n  color: rgba(100, 100, 100, 0.5);\n  display: flex;\n  align-items: center; }\n  .multiselect__option:hover {\n    background-color: rgba(100, 100, 100, 0.1); }\n  .multiselect__option .image {\n    width: 30px;\n    height: 30px;\n    border-radius: 50%;\n    display: inline-block;\n    background-size: cover;\n    margin-right: 16px;\n    background-position: center center; }\n  .multiselect__option .description {\n    display: inline-block; }\n    .multiselect__option .description .title {\n      font-size: 14px;\n      color: rgba(100, 100, 100, 0.5); }\n    .multiselect__option .description small {\n      font-size: 12px; }\n  .multiselect__option--selected.multiselect__option--highlight {\n    height: 100%;\n    color: #e21212;\n    background: none; }\n\n.flatpickr-calendar {\n  width: 330px;\n  padding: 8px;\n  margin-top: 16px;\n  border-radius: 10px; }\n  .flatpickr-calendar .flatpickr-months .flatpickr-prev-month {\n    right: 56px !important;\n    left: auto; }\n  .flatpickr-calendar .flatpickr-months .flatpickr-next-month {\n    right: 8px; }\n  .flatpickr-calendar .flatpickr-months .flatpickr-next-month,\n  .flatpickr-calendar .flatpickr-months .flatpickr-prev-month {\n    border-radius: 50%;\n    box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.3);\n    top: 8px;\n    height: auto; }\n    .flatpickr-calendar .flatpickr-months .flatpickr-next-month svg,\n    .flatpickr-calendar .flatpickr-months .flatpickr-prev-month svg {\n      display: block;\n      margin: 0 auto; }\n  .flatpickr-calendar .flatpickr-months .numInputWrapper {\n    margin-left: 8px; }\n  .flatpickr-calendar .flatpickr-months .flatpickr-current-month {\n    left: 3.5%; }\n    .flatpickr-calendar .flatpickr-months .flatpickr-current-month .cur-month {\n      color: #e21212; }\n  .flatpickr-calendar .flatpickr-rContainer {\n    padding: 4px; }\n    .flatpickr-calendar .flatpickr-rContainer .flatpickr-weekdays {\n      margin-top: 8px; }\n    .flatpickr-calendar .flatpickr-rContainer .flatpickr-day {\n      line-height: 34px;\n      height: 36px;\n      border-radius: 6px;\n      background-color: rgba(100, 100, 100, 0.5);\n      margin: 2px 2px 16px;\n      color: f5f5f5; }\n      .flatpickr-calendar .flatpickr-rContainer .flatpickr-day.selected {\n        background-color: #e21212;\n        color: f5f5f5;\n        border: none; }\n      .flatpickr-calendar .flatpickr-rContainer .flatpickr-day.today {\n        border: none; }\n      .flatpickr-calendar .flatpickr-rContainer .flatpickr-day:hover {\n        background-color: #e21212 !important;\n        color: f5f5f5 !important; }\n      .flatpickr-calendar .flatpickr-rContainer .flatpickr-day.flatpickr-disabled {\n        background: none !important;\n        color: rgba(100, 100, 100, 0.5); }\n      .flatpickr-calendar .flatpickr-rContainer .flatpickr-day.nextMonthDay, .flatpickr-calendar .flatpickr-rContainer .flatpickr-day.prevMonthDay {\n        visibility: hidden !important;\n        width: 0;\n        height: 0;\n        margin-bottom: 0; }\n\n@keyframes placeHolderShimmer {\n  0% {\n    background-position: -468px 0; }\n  100% {\n    background-position: 468px 0; } }\n\n.check {\n  display: none;\n  box-sizing: border-box; }\n  .check:after, .check:before {\n    box-sizing: border-box; }\n  .check * {\n    box-sizing: border-box; }\n    .check *:after, .check *:before {\n      box-sizing: border-box; }\n  .check + label.check-label {\n    box-sizing: border-box; }\n  .check::selection, .check:after::selection, .check:before::selection {\n    background: none; }\n  .check *::selection, .check *:after::selection, .check *:before::selection {\n    background: none; }\n  .check + label.check-label {\n    outline: 0;\n    display: block;\n    margin-top: 5px;\n    width: 4em;\n    height: 2em;\n    position: relative;\n    cursor: pointer;\n    user-select: none;\n    text-align: left; }\n    .check + label.check-label::selection {\n      background: none; }\n    .check + label.check-label:after, .check + label.check-label:before {\n      position: relative;\n      display: block;\n      content: '';\n      width: 50%;\n      height: 100%; }\n    .check + label.check-label:after {\n      left: 0; }\n    .check + label.check-label:before {\n      display: none; }\n  .check:checked + label.check-label:after {\n    left: 50%; }\n  .check:checked + label.check-label {\n    background: #e21212; }\n  .check + label.check-label {\n    background: rgba(100, 100, 100, 0.5);\n    border-radius: 2em;\n    padding: 2px;\n    transition: all 0.4s ease; }\n    .check + label.check-label:after {\n      border-radius: 50%;\n      background: #fff;\n      transition: all 0.2s ease; }\n  .check:disabled + label {\n    opacity: 0.6 !important; }\n\n.vue-tel-input {\n  padding: 0 !important; }\n  .vue-tel-input .vti__dropdown:hover {\n    background-color: transparent !important; }\n  .vue-tel-input .vti__input {\n    background-color: rgba(100, 100, 100, 0.1); }\n";
  styleInject(css_248z);

  var nativePropertyIsEnumerable = {}.propertyIsEnumerable;
  var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

  // Nashorn ~ JDK8 bug
  var NASHORN_BUG = getOwnPropertyDescriptor && !nativePropertyIsEnumerable.call({ 1: 2 }, 1);

  // `Object.prototype.propertyIsEnumerable` method implementation
  // https://tc39.github.io/ecma262/#sec-object.prototype.propertyisenumerable
  var f$1 = NASHORN_BUG ? function propertyIsEnumerable(V) {
    var descriptor = getOwnPropertyDescriptor(this, V);
    return !!descriptor && descriptor.enumerable;
  } : nativePropertyIsEnumerable;

  var objectPropertyIsEnumerable = {
  	f: f$1
  };

  var createPropertyDescriptor = function (bitmap, value) {
    return {
      enumerable: !(bitmap & 1),
      configurable: !(bitmap & 2),
      writable: !(bitmap & 4),
      value: value
    };
  };

  var toString = {}.toString;

  var classofRaw = function (it) {
    return toString.call(it).slice(8, -1);
  };

  var split = ''.split;

  // fallback for non-array-like ES3 and non-enumerable old V8 strings
  var indexedObject = fails(function () {
    // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
    // eslint-disable-next-line no-prototype-builtins
    return !Object('z').propertyIsEnumerable(0);
  }) ? function (it) {
    return classofRaw(it) == 'String' ? split.call(it, '') : Object(it);
  } : Object;

  // `RequireObjectCoercible` abstract operation
  // https://tc39.github.io/ecma262/#sec-requireobjectcoercible
  var requireObjectCoercible = function (it) {
    if (it == undefined) throw TypeError("Can't call method on " + it);
    return it;
  };

  // toObject with fallback for non-array-like ES3 strings



  var toIndexedObject = function (it) {
    return indexedObject(requireObjectCoercible(it));
  };

  var hasOwnProperty = {}.hasOwnProperty;

  var has = function (it, key) {
    return hasOwnProperty.call(it, key);
  };

  var nativeGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

  // `Object.getOwnPropertyDescriptor` method
  // https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptor
  var f$2 = descriptors ? nativeGetOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
    O = toIndexedObject(O);
    P = toPrimitive(P, true);
    if (ie8DomDefine) try {
      return nativeGetOwnPropertyDescriptor(O, P);
    } catch (error) { /* empty */ }
    if (has(O, P)) return createPropertyDescriptor(!objectPropertyIsEnumerable.f.call(O, P), O[P]);
  };

  var objectGetOwnPropertyDescriptor = {
  	f: f$2
  };

  var createNonEnumerableProperty = descriptors ? function (object, key, value) {
    return objectDefineProperty.f(object, key, createPropertyDescriptor(1, value));
  } : function (object, key, value) {
    object[key] = value;
    return object;
  };

  var setGlobal = function (key, value) {
    try {
      createNonEnumerableProperty(global_1, key, value);
    } catch (error) {
      global_1[key] = value;
    } return value;
  };

  var SHARED = '__core-js_shared__';
  var store = global_1[SHARED] || setGlobal(SHARED, {});

  var sharedStore = store;

  var functionToString = Function.toString;

  // this helper broken in `3.4.1-3.4.4`, so we can't use `shared` helper
  if (typeof sharedStore.inspectSource != 'function') {
    sharedStore.inspectSource = function (it) {
      return functionToString.call(it);
    };
  }

  var inspectSource = sharedStore.inspectSource;

  var WeakMap = global_1.WeakMap;

  var nativeWeakMap = typeof WeakMap === 'function' && /native code/.test(inspectSource(WeakMap));

  var shared = createCommonjsModule(function (module) {
  (module.exports = function (key, value) {
    return sharedStore[key] || (sharedStore[key] = value !== undefined ? value : {});
  })('versions', []).push({
    version: '3.6.5',
    mode:  'global',
    copyright: '© 2020 Denis Pushkarev (zloirock.ru)'
  });
  });

  var id = 0;
  var postfix = Math.random();

  var uid = function (key) {
    return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id + postfix).toString(36);
  };

  var keys = shared('keys');

  var sharedKey = function (key) {
    return keys[key] || (keys[key] = uid(key));
  };

  var hiddenKeys = {};

  var WeakMap$1 = global_1.WeakMap;
  var set, get, has$1;

  var enforce = function (it) {
    return has$1(it) ? get(it) : set(it, {});
  };

  var getterFor = function (TYPE) {
    return function (it) {
      var state;
      if (!isObject(it) || (state = get(it)).type !== TYPE) {
        throw TypeError('Incompatible receiver, ' + TYPE + ' required');
      } return state;
    };
  };

  if (nativeWeakMap) {
    var store$1 = new WeakMap$1();
    var wmget = store$1.get;
    var wmhas = store$1.has;
    var wmset = store$1.set;
    set = function (it, metadata) {
      wmset.call(store$1, it, metadata);
      return metadata;
    };
    get = function (it) {
      return wmget.call(store$1, it) || {};
    };
    has$1 = function (it) {
      return wmhas.call(store$1, it);
    };
  } else {
    var STATE = sharedKey('state');
    hiddenKeys[STATE] = true;
    set = function (it, metadata) {
      createNonEnumerableProperty(it, STATE, metadata);
      return metadata;
    };
    get = function (it) {
      return has(it, STATE) ? it[STATE] : {};
    };
    has$1 = function (it) {
      return has(it, STATE);
    };
  }

  var internalState = {
    set: set,
    get: get,
    has: has$1,
    enforce: enforce,
    getterFor: getterFor
  };

  var redefine = createCommonjsModule(function (module) {
  var getInternalState = internalState.get;
  var enforceInternalState = internalState.enforce;
  var TEMPLATE = String(String).split('String');

  (module.exports = function (O, key, value, options) {
    var unsafe = options ? !!options.unsafe : false;
    var simple = options ? !!options.enumerable : false;
    var noTargetGet = options ? !!options.noTargetGet : false;
    if (typeof value == 'function') {
      if (typeof key == 'string' && !has(value, 'name')) createNonEnumerableProperty(value, 'name', key);
      enforceInternalState(value).source = TEMPLATE.join(typeof key == 'string' ? key : '');
    }
    if (O === global_1) {
      if (simple) O[key] = value;
      else setGlobal(key, value);
      return;
    } else if (!unsafe) {
      delete O[key];
    } else if (!noTargetGet && O[key]) {
      simple = true;
    }
    if (simple) O[key] = value;
    else createNonEnumerableProperty(O, key, value);
  // add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
  })(Function.prototype, 'toString', function toString() {
    return typeof this == 'function' && getInternalState(this).source || inspectSource(this);
  });
  });

  var path = global_1;

  var aFunction = function (variable) {
    return typeof variable == 'function' ? variable : undefined;
  };

  var getBuiltIn = function (namespace, method) {
    return arguments.length < 2 ? aFunction(path[namespace]) || aFunction(global_1[namespace])
      : path[namespace] && path[namespace][method] || global_1[namespace] && global_1[namespace][method];
  };

  var ceil = Math.ceil;
  var floor = Math.floor;

  // `ToInteger` abstract operation
  // https://tc39.github.io/ecma262/#sec-tointeger
  var toInteger = function (argument) {
    return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor : ceil)(argument);
  };

  var min = Math.min;

  // `ToLength` abstract operation
  // https://tc39.github.io/ecma262/#sec-tolength
  var toLength = function (argument) {
    return argument > 0 ? min(toInteger(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
  };

  var max = Math.max;
  var min$1 = Math.min;

  // Helper for a popular repeating case of the spec:
  // Let integer be ? ToInteger(index).
  // If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
  var toAbsoluteIndex = function (index, length) {
    var integer = toInteger(index);
    return integer < 0 ? max(integer + length, 0) : min$1(integer, length);
  };

  // `Array.prototype.{ indexOf, includes }` methods implementation
  var createMethod = function (IS_INCLUDES) {
    return function ($this, el, fromIndex) {
      var O = toIndexedObject($this);
      var length = toLength(O.length);
      var index = toAbsoluteIndex(fromIndex, length);
      var value;
      // Array#includes uses SameValueZero equality algorithm
      // eslint-disable-next-line no-self-compare
      if (IS_INCLUDES && el != el) while (length > index) {
        value = O[index++];
        // eslint-disable-next-line no-self-compare
        if (value != value) return true;
      // Array#indexOf ignores holes, Array#includes - not
      } else for (;length > index; index++) {
        if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
      } return !IS_INCLUDES && -1;
    };
  };

  var arrayIncludes = {
    // `Array.prototype.includes` method
    // https://tc39.github.io/ecma262/#sec-array.prototype.includes
    includes: createMethod(true),
    // `Array.prototype.indexOf` method
    // https://tc39.github.io/ecma262/#sec-array.prototype.indexof
    indexOf: createMethod(false)
  };

  var indexOf = arrayIncludes.indexOf;


  var objectKeysInternal = function (object, names) {
    var O = toIndexedObject(object);
    var i = 0;
    var result = [];
    var key;
    for (key in O) !has(hiddenKeys, key) && has(O, key) && result.push(key);
    // Don't enum bug & hidden keys
    while (names.length > i) if (has(O, key = names[i++])) {
      ~indexOf(result, key) || result.push(key);
    }
    return result;
  };

  // IE8- don't enum bug keys
  var enumBugKeys = [
    'constructor',
    'hasOwnProperty',
    'isPrototypeOf',
    'propertyIsEnumerable',
    'toLocaleString',
    'toString',
    'valueOf'
  ];

  var hiddenKeys$1 = enumBugKeys.concat('length', 'prototype');

  // `Object.getOwnPropertyNames` method
  // https://tc39.github.io/ecma262/#sec-object.getownpropertynames
  var f$3 = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
    return objectKeysInternal(O, hiddenKeys$1);
  };

  var objectGetOwnPropertyNames = {
  	f: f$3
  };

  var f$4 = Object.getOwnPropertySymbols;

  var objectGetOwnPropertySymbols = {
  	f: f$4
  };

  // all object keys, includes non-enumerable and symbols
  var ownKeys = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
    var keys = objectGetOwnPropertyNames.f(anObject(it));
    var getOwnPropertySymbols = objectGetOwnPropertySymbols.f;
    return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys;
  };

  var copyConstructorProperties = function (target, source) {
    var keys = ownKeys(source);
    var defineProperty = objectDefineProperty.f;
    var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      if (!has(target, key)) defineProperty(target, key, getOwnPropertyDescriptor(source, key));
    }
  };

  var replacement = /#|\.prototype\./;

  var isForced = function (feature, detection) {
    var value = data[normalize(feature)];
    return value == POLYFILL ? true
      : value == NATIVE ? false
      : typeof detection == 'function' ? fails(detection)
      : !!detection;
  };

  var normalize = isForced.normalize = function (string) {
    return String(string).replace(replacement, '.').toLowerCase();
  };

  var data = isForced.data = {};
  var NATIVE = isForced.NATIVE = 'N';
  var POLYFILL = isForced.POLYFILL = 'P';

  var isForced_1 = isForced;

  var getOwnPropertyDescriptor$1 = objectGetOwnPropertyDescriptor.f;






  /*
    options.target      - name of the target object
    options.global      - target is the global object
    options.stat        - export as static methods of target
    options.proto       - export as prototype methods of target
    options.real        - real prototype method for the `pure` version
    options.forced      - export even if the native feature is available
    options.bind        - bind methods to the target, required for the `pure` version
    options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
    options.unsafe      - use the simple assignment of property instead of delete + defineProperty
    options.sham        - add a flag to not completely full polyfills
    options.enumerable  - export as enumerable property
    options.noTargetGet - prevent calling a getter on target
  */
  var _export = function (options, source) {
    var TARGET = options.target;
    var GLOBAL = options.global;
    var STATIC = options.stat;
    var FORCED, target, key, targetProperty, sourceProperty, descriptor;
    if (GLOBAL) {
      target = global_1;
    } else if (STATIC) {
      target = global_1[TARGET] || setGlobal(TARGET, {});
    } else {
      target = (global_1[TARGET] || {}).prototype;
    }
    if (target) for (key in source) {
      sourceProperty = source[key];
      if (options.noTargetGet) {
        descriptor = getOwnPropertyDescriptor$1(target, key);
        targetProperty = descriptor && descriptor.value;
      } else targetProperty = target[key];
      FORCED = isForced_1(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
      // contained in target
      if (!FORCED && targetProperty !== undefined) {
        if (typeof sourceProperty === typeof targetProperty) continue;
        copyConstructorProperties(sourceProperty, targetProperty);
      }
      // add a flag to not completely full polyfills
      if (options.sham || (targetProperty && targetProperty.sham)) {
        createNonEnumerableProperty(sourceProperty, 'sham', true);
      }
      // extend global
      redefine(target, key, sourceProperty, options);
    }
  };

  var aFunction$1 = function (it) {
    if (typeof it != 'function') {
      throw TypeError(String(it) + ' is not a function');
    } return it;
  };

  // optional / simple context binding
  var functionBindContext = function (fn, that, length) {
    aFunction$1(fn);
    if (that === undefined) return fn;
    switch (length) {
      case 0: return function () {
        return fn.call(that);
      };
      case 1: return function (a) {
        return fn.call(that, a);
      };
      case 2: return function (a, b) {
        return fn.call(that, a, b);
      };
      case 3: return function (a, b, c) {
        return fn.call(that, a, b, c);
      };
    }
    return function (/* ...args */) {
      return fn.apply(that, arguments);
    };
  };

  // `ToObject` abstract operation
  // https://tc39.github.io/ecma262/#sec-toobject
  var toObject = function (argument) {
    return Object(requireObjectCoercible(argument));
  };

  // `IsArray` abstract operation
  // https://tc39.github.io/ecma262/#sec-isarray
  var isArray = Array.isArray || function isArray(arg) {
    return classofRaw(arg) == 'Array';
  };

  var nativeSymbol = !!Object.getOwnPropertySymbols && !fails(function () {
    // Chrome 38 Symbol has incorrect toString conversion
    // eslint-disable-next-line no-undef
    return !String(Symbol());
  });

  var useSymbolAsUid = nativeSymbol
    // eslint-disable-next-line no-undef
    && !Symbol.sham
    // eslint-disable-next-line no-undef
    && typeof Symbol.iterator == 'symbol';

  var WellKnownSymbolsStore = shared('wks');
  var Symbol$1 = global_1.Symbol;
  var createWellKnownSymbol = useSymbolAsUid ? Symbol$1 : Symbol$1 && Symbol$1.withoutSetter || uid;

  var wellKnownSymbol = function (name) {
    if (!has(WellKnownSymbolsStore, name)) {
      if (nativeSymbol && has(Symbol$1, name)) WellKnownSymbolsStore[name] = Symbol$1[name];
      else WellKnownSymbolsStore[name] = createWellKnownSymbol('Symbol.' + name);
    } return WellKnownSymbolsStore[name];
  };

  var SPECIES = wellKnownSymbol('species');

  // `ArraySpeciesCreate` abstract operation
  // https://tc39.github.io/ecma262/#sec-arrayspeciescreate
  var arraySpeciesCreate = function (originalArray, length) {
    var C;
    if (isArray(originalArray)) {
      C = originalArray.constructor;
      // cross-realm fallback
      if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
      else if (isObject(C)) {
        C = C[SPECIES];
        if (C === null) C = undefined;
      }
    } return new (C === undefined ? Array : C)(length === 0 ? 0 : length);
  };

  var push = [].push;

  // `Array.prototype.{ forEach, map, filter, some, every, find, findIndex }` methods implementation
  var createMethod$1 = function (TYPE) {
    var IS_MAP = TYPE == 1;
    var IS_FILTER = TYPE == 2;
    var IS_SOME = TYPE == 3;
    var IS_EVERY = TYPE == 4;
    var IS_FIND_INDEX = TYPE == 6;
    var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
    return function ($this, callbackfn, that, specificCreate) {
      var O = toObject($this);
      var self = indexedObject(O);
      var boundFunction = functionBindContext(callbackfn, that, 3);
      var length = toLength(self.length);
      var index = 0;
      var create = specificCreate || arraySpeciesCreate;
      var target = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
      var value, result;
      for (;length > index; index++) if (NO_HOLES || index in self) {
        value = self[index];
        result = boundFunction(value, index, O);
        if (TYPE) {
          if (IS_MAP) target[index] = result; // map
          else if (result) switch (TYPE) {
            case 3: return true;              // some
            case 5: return value;             // find
            case 6: return index;             // findIndex
            case 2: push.call(target, value); // filter
          } else if (IS_EVERY) return false;  // every
        }
      }
      return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
    };
  };

  var arrayIteration = {
    // `Array.prototype.forEach` method
    // https://tc39.github.io/ecma262/#sec-array.prototype.foreach
    forEach: createMethod$1(0),
    // `Array.prototype.map` method
    // https://tc39.github.io/ecma262/#sec-array.prototype.map
    map: createMethod$1(1),
    // `Array.prototype.filter` method
    // https://tc39.github.io/ecma262/#sec-array.prototype.filter
    filter: createMethod$1(2),
    // `Array.prototype.some` method
    // https://tc39.github.io/ecma262/#sec-array.prototype.some
    some: createMethod$1(3),
    // `Array.prototype.every` method
    // https://tc39.github.io/ecma262/#sec-array.prototype.every
    every: createMethod$1(4),
    // `Array.prototype.find` method
    // https://tc39.github.io/ecma262/#sec-array.prototype.find
    find: createMethod$1(5),
    // `Array.prototype.findIndex` method
    // https://tc39.github.io/ecma262/#sec-array.prototype.findIndex
    findIndex: createMethod$1(6)
  };

  // `Object.keys` method
  // https://tc39.github.io/ecma262/#sec-object.keys
  var objectKeys = Object.keys || function keys(O) {
    return objectKeysInternal(O, enumBugKeys);
  };

  // `Object.defineProperties` method
  // https://tc39.github.io/ecma262/#sec-object.defineproperties
  var objectDefineProperties = descriptors ? Object.defineProperties : function defineProperties(O, Properties) {
    anObject(O);
    var keys = objectKeys(Properties);
    var length = keys.length;
    var index = 0;
    var key;
    while (length > index) objectDefineProperty.f(O, key = keys[index++], Properties[key]);
    return O;
  };

  var html = getBuiltIn('document', 'documentElement');

  var GT = '>';
  var LT = '<';
  var PROTOTYPE = 'prototype';
  var SCRIPT = 'script';
  var IE_PROTO = sharedKey('IE_PROTO');

  var EmptyConstructor = function () { /* empty */ };

  var scriptTag = function (content) {
    return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
  };

  // Create object with fake `null` prototype: use ActiveX Object with cleared prototype
  var NullProtoObjectViaActiveX = function (activeXDocument) {
    activeXDocument.write(scriptTag(''));
    activeXDocument.close();
    var temp = activeXDocument.parentWindow.Object;
    activeXDocument = null; // avoid memory leak
    return temp;
  };

  // Create object with fake `null` prototype: use iframe Object with cleared prototype
  var NullProtoObjectViaIFrame = function () {
    // Thrash, waste and sodomy: IE GC bug
    var iframe = documentCreateElement('iframe');
    var JS = 'java' + SCRIPT + ':';
    var iframeDocument;
    iframe.style.display = 'none';
    html.appendChild(iframe);
    // https://github.com/zloirock/core-js/issues/475
    iframe.src = String(JS);
    iframeDocument = iframe.contentWindow.document;
    iframeDocument.open();
    iframeDocument.write(scriptTag('document.F=Object'));
    iframeDocument.close();
    return iframeDocument.F;
  };

  // Check for document.domain and active x support
  // No need to use active x approach when document.domain is not set
  // see https://github.com/es-shims/es5-shim/issues/150
  // variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
  // avoid IE GC bug
  var activeXDocument;
  var NullProtoObject = function () {
    try {
      /* global ActiveXObject */
      activeXDocument = document.domain && new ActiveXObject('htmlfile');
    } catch (error) { /* ignore */ }
    NullProtoObject = activeXDocument ? NullProtoObjectViaActiveX(activeXDocument) : NullProtoObjectViaIFrame();
    var length = enumBugKeys.length;
    while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];
    return NullProtoObject();
  };

  hiddenKeys[IE_PROTO] = true;

  // `Object.create` method
  // https://tc39.github.io/ecma262/#sec-object.create
  var objectCreate = Object.create || function create(O, Properties) {
    var result;
    if (O !== null) {
      EmptyConstructor[PROTOTYPE] = anObject(O);
      result = new EmptyConstructor();
      EmptyConstructor[PROTOTYPE] = null;
      // add "__proto__" for Object.getPrototypeOf polyfill
      result[IE_PROTO] = O;
    } else result = NullProtoObject();
    return Properties === undefined ? result : objectDefineProperties(result, Properties);
  };

  var UNSCOPABLES = wellKnownSymbol('unscopables');
  var ArrayPrototype = Array.prototype;

  // Array.prototype[@@unscopables]
  // https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
  if (ArrayPrototype[UNSCOPABLES] == undefined) {
    objectDefineProperty.f(ArrayPrototype, UNSCOPABLES, {
      configurable: true,
      value: objectCreate(null)
    });
  }

  // add a key to Array.prototype[@@unscopables]
  var addToUnscopables = function (key) {
    ArrayPrototype[UNSCOPABLES][key] = true;
  };

  var defineProperty$1 = Object.defineProperty;
  var cache = {};

  var thrower = function (it) { throw it; };

  var arrayMethodUsesToLength = function (METHOD_NAME, options) {
    if (has(cache, METHOD_NAME)) return cache[METHOD_NAME];
    if (!options) options = {};
    var method = [][METHOD_NAME];
    var ACCESSORS = has(options, 'ACCESSORS') ? options.ACCESSORS : false;
    var argument0 = has(options, 0) ? options[0] : thrower;
    var argument1 = has(options, 1) ? options[1] : undefined;

    return cache[METHOD_NAME] = !!method && !fails(function () {
      if (ACCESSORS && !descriptors) return true;
      var O = { length: -1 };

      if (ACCESSORS) defineProperty$1(O, 1, { enumerable: true, get: thrower });
      else O[1] = 1;

      method.call(O, argument0, argument1);
    });
  };

  var $findIndex = arrayIteration.findIndex;



  var FIND_INDEX = 'findIndex';
  var SKIPS_HOLES = true;

  var USES_TO_LENGTH = arrayMethodUsesToLength(FIND_INDEX);

  // Shouldn't skip holes
  if (FIND_INDEX in []) Array(1)[FIND_INDEX](function () { SKIPS_HOLES = false; });

  // `Array.prototype.findIndex` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.findindex
  _export({ target: 'Array', proto: true, forced: SKIPS_HOLES || !USES_TO_LENGTH }, {
    findIndex: function findIndex(callbackfn /* , that = undefined */) {
      return $findIndex(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    }
  });

  // https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
  addToUnscopables(FIND_INDEX);

  var createProperty = function (object, key, value) {
    var propertyKey = toPrimitive(key);
    if (propertyKey in object) objectDefineProperty.f(object, propertyKey, createPropertyDescriptor(0, value));
    else object[propertyKey] = value;
  };

  var engineUserAgent = getBuiltIn('navigator', 'userAgent') || '';

  var process = global_1.process;
  var versions = process && process.versions;
  var v8 = versions && versions.v8;
  var match, version;

  if (v8) {
    match = v8.split('.');
    version = match[0] + match[1];
  } else if (engineUserAgent) {
    match = engineUserAgent.match(/Edge\/(\d+)/);
    if (!match || match[1] >= 74) {
      match = engineUserAgent.match(/Chrome\/(\d+)/);
      if (match) version = match[1];
    }
  }

  var engineV8Version = version && +version;

  var SPECIES$1 = wellKnownSymbol('species');

  var arrayMethodHasSpeciesSupport = function (METHOD_NAME) {
    // We can't use this feature detection in V8 since it causes
    // deoptimization and serious performance degradation
    // https://github.com/zloirock/core-js/issues/677
    return engineV8Version >= 51 || !fails(function () {
      var array = [];
      var constructor = array.constructor = {};
      constructor[SPECIES$1] = function () {
        return { foo: 1 };
      };
      return array[METHOD_NAME](Boolean).foo !== 1;
    });
  };

  var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('splice');
  var USES_TO_LENGTH$1 = arrayMethodUsesToLength('splice', { ACCESSORS: true, 0: 0, 1: 2 });

  var max$1 = Math.max;
  var min$2 = Math.min;
  var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF;
  var MAXIMUM_ALLOWED_LENGTH_EXCEEDED = 'Maximum allowed length exceeded';

  // `Array.prototype.splice` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.splice
  // with adding support of @@species
  _export({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT || !USES_TO_LENGTH$1 }, {
    splice: function splice(start, deleteCount /* , ...items */) {
      var O = toObject(this);
      var len = toLength(O.length);
      var actualStart = toAbsoluteIndex(start, len);
      var argumentsLength = arguments.length;
      var insertCount, actualDeleteCount, A, k, from, to;
      if (argumentsLength === 0) {
        insertCount = actualDeleteCount = 0;
      } else if (argumentsLength === 1) {
        insertCount = 0;
        actualDeleteCount = len - actualStart;
      } else {
        insertCount = argumentsLength - 2;
        actualDeleteCount = min$2(max$1(toInteger(deleteCount), 0), len - actualStart);
      }
      if (len + insertCount - actualDeleteCount > MAX_SAFE_INTEGER) {
        throw TypeError(MAXIMUM_ALLOWED_LENGTH_EXCEEDED);
      }
      A = arraySpeciesCreate(O, actualDeleteCount);
      for (k = 0; k < actualDeleteCount; k++) {
        from = actualStart + k;
        if (from in O) createProperty(A, k, O[from]);
      }
      A.length = actualDeleteCount;
      if (insertCount < actualDeleteCount) {
        for (k = actualStart; k < len - actualDeleteCount; k++) {
          from = k + actualDeleteCount;
          to = k + insertCount;
          if (from in O) O[to] = O[from];
          else delete O[to];
        }
        for (k = len; k > len - actualDeleteCount + insertCount; k--) delete O[k - 1];
      } else if (insertCount > actualDeleteCount) {
        for (k = len - actualDeleteCount; k > actualStart; k--) {
          from = k + actualDeleteCount - 1;
          to = k + insertCount - 1;
          if (from in O) O[to] = O[from];
          else delete O[to];
        }
      }
      for (k = 0; k < insertCount; k++) {
        O[k + actualStart] = arguments[k + 2];
      }
      O.length = len - actualDeleteCount + insertCount;
      return A;
    }
  });

  var aPossiblePrototype = function (it) {
    if (!isObject(it) && it !== null) {
      throw TypeError("Can't set " + String(it) + ' as a prototype');
    } return it;
  };

  // `Object.setPrototypeOf` method
  // https://tc39.github.io/ecma262/#sec-object.setprototypeof
  // Works with __proto__ only. Old v8 can't work with null proto objects.
  /* eslint-disable no-proto */
  var objectSetPrototypeOf = Object.setPrototypeOf || ('__proto__' in {} ? function () {
    var CORRECT_SETTER = false;
    var test = {};
    var setter;
    try {
      setter = Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set;
      setter.call(test, []);
      CORRECT_SETTER = test instanceof Array;
    } catch (error) { /* empty */ }
    return function setPrototypeOf(O, proto) {
      anObject(O);
      aPossiblePrototype(proto);
      if (CORRECT_SETTER) setter.call(O, proto);
      else O.__proto__ = proto;
      return O;
    };
  }() : undefined);

  // makes subclassing work correct for wrapped built-ins
  var inheritIfRequired = function ($this, dummy, Wrapper) {
    var NewTarget, NewTargetPrototype;
    if (
      // it can work only with native `setPrototypeOf`
      objectSetPrototypeOf &&
      // we haven't completely correct pre-ES6 way for getting `new.target`, so use this
      typeof (NewTarget = dummy.constructor) == 'function' &&
      NewTarget !== Wrapper &&
      isObject(NewTargetPrototype = NewTarget.prototype) &&
      NewTargetPrototype !== Wrapper.prototype
    ) objectSetPrototypeOf($this, NewTargetPrototype);
    return $this;
  };

  // a string of all valid unicode whitespaces
  // eslint-disable-next-line max-len
  var whitespaces = '\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';

  var whitespace = '[' + whitespaces + ']';
  var ltrim = RegExp('^' + whitespace + whitespace + '*');
  var rtrim = RegExp(whitespace + whitespace + '*$');

  // `String.prototype.{ trim, trimStart, trimEnd, trimLeft, trimRight }` methods implementation
  var createMethod$2 = function (TYPE) {
    return function ($this) {
      var string = String(requireObjectCoercible($this));
      if (TYPE & 1) string = string.replace(ltrim, '');
      if (TYPE & 2) string = string.replace(rtrim, '');
      return string;
    };
  };

  var stringTrim = {
    // `String.prototype.{ trimLeft, trimStart }` methods
    // https://tc39.github.io/ecma262/#sec-string.prototype.trimstart
    start: createMethod$2(1),
    // `String.prototype.{ trimRight, trimEnd }` methods
    // https://tc39.github.io/ecma262/#sec-string.prototype.trimend
    end: createMethod$2(2),
    // `String.prototype.trim` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.trim
    trim: createMethod$2(3)
  };

  var getOwnPropertyNames = objectGetOwnPropertyNames.f;
  var getOwnPropertyDescriptor$2 = objectGetOwnPropertyDescriptor.f;
  var defineProperty$2 = objectDefineProperty.f;
  var trim = stringTrim.trim;

  var NUMBER = 'Number';
  var NativeNumber = global_1[NUMBER];
  var NumberPrototype = NativeNumber.prototype;

  // Opera ~12 has broken Object#toString
  var BROKEN_CLASSOF = classofRaw(objectCreate(NumberPrototype)) == NUMBER;

  // `ToNumber` abstract operation
  // https://tc39.github.io/ecma262/#sec-tonumber
  var toNumber = function (argument) {
    var it = toPrimitive(argument, false);
    var first, third, radix, maxCode, digits, length, index, code;
    if (typeof it == 'string' && it.length > 2) {
      it = trim(it);
      first = it.charCodeAt(0);
      if (first === 43 || first === 45) {
        third = it.charCodeAt(2);
        if (third === 88 || third === 120) return NaN; // Number('+0x1') should be NaN, old V8 fix
      } else if (first === 48) {
        switch (it.charCodeAt(1)) {
          case 66: case 98: radix = 2; maxCode = 49; break; // fast equal of /^0b[01]+$/i
          case 79: case 111: radix = 8; maxCode = 55; break; // fast equal of /^0o[0-7]+$/i
          default: return +it;
        }
        digits = it.slice(2);
        length = digits.length;
        for (index = 0; index < length; index++) {
          code = digits.charCodeAt(index);
          // parseInt parses a string to a first unavailable symbol
          // but ToNumber should return NaN if a string contains unavailable symbols
          if (code < 48 || code > maxCode) return NaN;
        } return parseInt(digits, radix);
      }
    } return +it;
  };

  // `Number` constructor
  // https://tc39.github.io/ecma262/#sec-number-constructor
  if (isForced_1(NUMBER, !NativeNumber(' 0o1') || !NativeNumber('0b1') || NativeNumber('+0x1'))) {
    var NumberWrapper = function Number(value) {
      var it = arguments.length < 1 ? 0 : value;
      var dummy = this;
      return dummy instanceof NumberWrapper
        // check on 1..constructor(foo) case
        && (BROKEN_CLASSOF ? fails(function () { NumberPrototype.valueOf.call(dummy); }) : classofRaw(dummy) != NUMBER)
          ? inheritIfRequired(new NativeNumber(toNumber(it)), dummy, NumberWrapper) : toNumber(it);
    };
    for (var keys$1 = descriptors ? getOwnPropertyNames(NativeNumber) : (
      // ES3:
      'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
      // ES2015 (in case, if modules with ES2015 Number statics required before):
      'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' +
      'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger'
    ).split(','), j = 0, key; keys$1.length > j; j++) {
      if (has(NativeNumber, key = keys$1[j]) && !has(NumberWrapper, key)) {
        defineProperty$2(NumberWrapper, key, getOwnPropertyDescriptor$2(NativeNumber, key));
      }
    }
    NumberWrapper.prototype = NumberPrototype;
    NumberPrototype.constructor = NumberWrapper;
    redefine(global_1, NUMBER, NumberWrapper);
  }

  var IS_CONCAT_SPREADABLE = wellKnownSymbol('isConcatSpreadable');
  var MAX_SAFE_INTEGER$1 = 0x1FFFFFFFFFFFFF;
  var MAXIMUM_ALLOWED_INDEX_EXCEEDED = 'Maximum allowed index exceeded';

  // We can't use this feature detection in V8 since it causes
  // deoptimization and serious performance degradation
  // https://github.com/zloirock/core-js/issues/679
  var IS_CONCAT_SPREADABLE_SUPPORT = engineV8Version >= 51 || !fails(function () {
    var array = [];
    array[IS_CONCAT_SPREADABLE] = false;
    return array.concat()[0] !== array;
  });

  var SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('concat');

  var isConcatSpreadable = function (O) {
    if (!isObject(O)) return false;
    var spreadable = O[IS_CONCAT_SPREADABLE];
    return spreadable !== undefined ? !!spreadable : isArray(O);
  };

  var FORCED = !IS_CONCAT_SPREADABLE_SUPPORT || !SPECIES_SUPPORT;

  // `Array.prototype.concat` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.concat
  // with adding support of @@isConcatSpreadable and @@species
  _export({ target: 'Array', proto: true, forced: FORCED }, {
    concat: function concat(arg) { // eslint-disable-line no-unused-vars
      var O = toObject(this);
      var A = arraySpeciesCreate(O, 0);
      var n = 0;
      var i, k, length, len, E;
      for (i = -1, length = arguments.length; i < length; i++) {
        E = i === -1 ? O : arguments[i];
        if (isConcatSpreadable(E)) {
          len = toLength(E.length);
          if (n + len > MAX_SAFE_INTEGER$1) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
          for (k = 0; k < len; k++, n++) if (k in E) createProperty(A, n, E[k]);
        } else {
          if (n >= MAX_SAFE_INTEGER$1) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
          createProperty(A, n++, E);
        }
      }
      A.length = n;
      return A;
    }
  });

  var HAS_SPECIES_SUPPORT$1 = arrayMethodHasSpeciesSupport('slice');
  var USES_TO_LENGTH$2 = arrayMethodUsesToLength('slice', { ACCESSORS: true, 0: 0, 1: 2 });

  var SPECIES$2 = wellKnownSymbol('species');
  var nativeSlice = [].slice;
  var max$2 = Math.max;

  // `Array.prototype.slice` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.slice
  // fallback for not array-like ES3 strings and DOM objects
  _export({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT$1 || !USES_TO_LENGTH$2 }, {
    slice: function slice(start, end) {
      var O = toIndexedObject(this);
      var length = toLength(O.length);
      var k = toAbsoluteIndex(start, length);
      var fin = toAbsoluteIndex(end === undefined ? length : end, length);
      // inline `ArraySpeciesCreate` for usage native `Array#slice` where it's possible
      var Constructor, result, n;
      if (isArray(O)) {
        Constructor = O.constructor;
        // cross-realm fallback
        if (typeof Constructor == 'function' && (Constructor === Array || isArray(Constructor.prototype))) {
          Constructor = undefined;
        } else if (isObject(Constructor)) {
          Constructor = Constructor[SPECIES$2];
          if (Constructor === null) Constructor = undefined;
        }
        if (Constructor === Array || Constructor === undefined) {
          return nativeSlice.call(O, k, fin);
        }
      }
      result = new (Constructor === undefined ? Array : Constructor)(max$2(fin - k, 0));
      for (n = 0; k < fin; k++, n++) if (k in O) createProperty(result, n, O[k]);
      result.length = n;
      return result;
    }
  });

  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  var script = {
    name: 'BooleanField',
    props: {
      value: {},
      label: {
        type: String
      },
      required: {
        type: [String, Boolean]
      },
      customClass: {
        type: String
      },
      disabled: {
        type: Boolean
      },
      displayMode: {
        type: String
      },
      hideLabel: {
        type: Boolean
      },
      property: {
        type: Object
      },
      attrs: {
        type: Object
      }
    },
    data: function data() {
      return {
        clonedValue: {
          value: this.value !== undefined ? this.value : this.property.value !== undefined ? this.property.value : false
        },
        randomId: Math.random()
      };
    },
    methods: {
      handler: function handler() {
        this.$emit('updateValue', this.clonedValue);
      }
    },
    watch: {
      value: function value(newVal) {
        this.clonedValue.value = newVal;
      }
    }
  };

  function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
      if (typeof shadowMode !== 'boolean') {
          createInjectorSSR = createInjector;
          createInjector = shadowMode;
          shadowMode = false;
      }
      // Vue.extend constructor export interop.
      const options = typeof script === 'function' ? script.options : script;
      // render functions
      if (template && template.render) {
          options.render = template.render;
          options.staticRenderFns = template.staticRenderFns;
          options._compiled = true;
          // functional template
          if (isFunctionalTemplate) {
              options.functional = true;
          }
      }
      // scopedId
      if (scopeId) {
          options._scopeId = scopeId;
      }
      let hook;
      if (moduleIdentifier) {
          // server build
          hook = function (context) {
              // 2.3 injection
              context =
                  context || // cached call
                      (this.$vnode && this.$vnode.ssrContext) || // stateful
                      (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
              // 2.2 with runInNewContext: true
              if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                  context = __VUE_SSR_CONTEXT__;
              }
              // inject component styles
              if (style) {
                  style.call(this, createInjectorSSR(context));
              }
              // register component module identifier for async chunk inference
              if (context && context._registeredComponents) {
                  context._registeredComponents.add(moduleIdentifier);
              }
          };
          // used by ssr in case component is cached and beforeCreate
          // never gets called
          options._ssrRegister = hook;
      }
      else if (style) {
          hook = shadowMode
              ? function (context) {
                  style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
              }
              : function (context) {
                  style.call(this, createInjector(context));
              };
      }
      if (hook) {
          if (options.functional) {
              // register for functional component in vue file
              const originalRender = options.render;
              options.render = function renderWithStyleInjection(h, context) {
                  hook.call(context);
                  return originalRender(h, context);
              };
          }
          else {
              // inject component registration as beforeCreate hook
              const existing = options.beforeCreate;
              options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
          }
      }
      return script;
  }

  var __vue_script__ = script;
  /* template */

  var __vue_render__ = function __vue_render__() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('div', {
      staticClass: "checkbox"
    }, [_c('label', {
      directives: [{
        name: "show",
        rawName: "v-show",
        value: !_vm.hideLabel,
        expression: "!hideLabel"
      }],
      staticClass: "control-label",
      domProps: {
        "textContent": _vm._s(_vm.attrs.id || _vm.label || _vm.property.name)
      }
    }), _vm._v(" "), _c('div', {
      staticClass: "form-element"
    }, [_c('input', _vm._b({
      directives: [{
        name: "model",
        rawName: "v-model",
        value: _vm.clonedValue.value,
        expression: "clonedValue.value"
      }],
      staticClass: "check",
      class: _vm.customClass,
      attrs: {
        "type": "checkbox",
        "id": _vm.attrs.id || _vm.randomId,
        "disabled": _vm.disabled || _vm.displayMode === 'VIEW'
      },
      domProps: {
        "checked": Array.isArray(_vm.clonedValue.value) ? _vm._i(_vm.clonedValue.value, null) > -1 : _vm.clonedValue.value
      },
      on: {
        "change": [function ($event) {
          var $$a = _vm.clonedValue.value,
              $$el = $event.target,
              $$c = $$el.checked ? true : false;

          if (Array.isArray($$a)) {
            var $$v = null,
                $$i = _vm._i($$a, $$v);

            if ($$el.checked) {
              $$i < 0 && _vm.$set(_vm.clonedValue, "value", $$a.concat([$$v]));
            } else {
              $$i > -1 && _vm.$set(_vm.clonedValue, "value", $$a.slice(0, $$i).concat($$a.slice($$i + 1)));
            }
          } else {
            _vm.$set(_vm.clonedValue, "value", $$c);
          }
        }, _vm.handler]
      }
    }, 'input', _vm.attrs, false)), _vm._v(" "), _c('label', {
      staticClass: "check-label",
      attrs: {
        "for": _vm.randomId
      }
    })])]);
  };

  var __vue_staticRenderFns__ = [];
  /* style */

  var __vue_inject_styles__ = undefined;
  /* scoped */

  var __vue_scope_id__ = undefined;
  /* module identifier */

  var __vue_module_identifier__ = undefined;
  /* functional template */

  var __vue_is_functional_template__ = false;
  /* style inject */

  /* style inject SSR */

  /* style inject shadow dom */

  var __vue_component__ = normalizeComponent({
    render: __vue_render__,
    staticRenderFns: __vue_staticRenderFns__
  }, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, undefined, undefined, undefined);

  var $filter = arrayIteration.filter;



  var HAS_SPECIES_SUPPORT$2 = arrayMethodHasSpeciesSupport('filter');
  // Edge 14- issue
  var USES_TO_LENGTH$3 = arrayMethodUsesToLength('filter');

  // `Array.prototype.filter` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.filter
  // with adding support of @@species
  _export({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT$2 || !USES_TO_LENGTH$3 }, {
    filter: function filter(callbackfn /* , thisArg */) {
      return $filter(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    }
  });

  var flatpickr = createCommonjsModule(function (module, exports) {
  /* flatpickr v4.6.3, @license MIT */
  (function (global, factory) {
       module.exports = factory() ;
  }(commonjsGlobal, function () {
      /*! *****************************************************************************
      Copyright (c) Microsoft Corporation. All rights reserved.
      Licensed under the Apache License, Version 2.0 (the "License"); you may not use
      this file except in compliance with the License. You may obtain a copy of the
      License at http://www.apache.org/licenses/LICENSE-2.0

      THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
      KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
      WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
      MERCHANTABLITY OR NON-INFRINGEMENT.

      See the Apache Version 2.0 License for specific language governing permissions
      and limitations under the License.
      ***************************************************************************** */

      var __assign = function() {
          __assign = Object.assign || function __assign(t) {
              for (var s, i = 1, n = arguments.length; i < n; i++) {
                  s = arguments[i];
                  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
              }
              return t;
          };
          return __assign.apply(this, arguments);
      };

      var HOOKS = [
          "onChange",
          "onClose",
          "onDayCreate",
          "onDestroy",
          "onKeyDown",
          "onMonthChange",
          "onOpen",
          "onParseConfig",
          "onReady",
          "onValueUpdate",
          "onYearChange",
          "onPreCalendarPosition",
      ];
      var defaults = {
          _disable: [],
          _enable: [],
          allowInput: false,
          altFormat: "F j, Y",
          altInput: false,
          altInputClass: "form-control input",
          animate: typeof window === "object" &&
              window.navigator.userAgent.indexOf("MSIE") === -1,
          ariaDateFormat: "F j, Y",
          clickOpens: true,
          closeOnSelect: true,
          conjunction: ", ",
          dateFormat: "Y-m-d",
          defaultHour: 12,
          defaultMinute: 0,
          defaultSeconds: 0,
          disable: [],
          disableMobile: false,
          enable: [],
          enableSeconds: false,
          enableTime: false,
          errorHandler: function (err) {
              return typeof console !== "undefined" && console.warn(err);
          },
          getWeek: function (givenDate) {
              var date = new Date(givenDate.getTime());
              date.setHours(0, 0, 0, 0);
              // Thursday in current week decides the year.
              date.setDate(date.getDate() + 3 - ((date.getDay() + 6) % 7));
              // January 4 is always in week 1.
              var week1 = new Date(date.getFullYear(), 0, 4);
              // Adjust to Thursday in week 1 and count number of weeks from date to week1.
              return (1 +
                  Math.round(((date.getTime() - week1.getTime()) / 86400000 -
                      3 +
                      ((week1.getDay() + 6) % 7)) /
                      7));
          },
          hourIncrement: 1,
          ignoredFocusElements: [],
          inline: false,
          locale: "default",
          minuteIncrement: 5,
          mode: "single",
          monthSelectorType: "dropdown",
          nextArrow: "<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 17 17'><g></g><path d='M13.207 8.472l-7.854 7.854-0.707-0.707 7.146-7.146-7.146-7.148 0.707-0.707 7.854 7.854z' /></svg>",
          noCalendar: false,
          now: new Date(),
          onChange: [],
          onClose: [],
          onDayCreate: [],
          onDestroy: [],
          onKeyDown: [],
          onMonthChange: [],
          onOpen: [],
          onParseConfig: [],
          onReady: [],
          onValueUpdate: [],
          onYearChange: [],
          onPreCalendarPosition: [],
          plugins: [],
          position: "auto",
          positionElement: undefined,
          prevArrow: "<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 17 17'><g></g><path d='M5.207 8.471l7.146 7.147-0.707 0.707-7.853-7.854 7.854-7.853 0.707 0.707-7.147 7.146z' /></svg>",
          shorthandCurrentMonth: false,
          showMonths: 1,
          static: false,
          time_24hr: false,
          weekNumbers: false,
          wrap: false
      };

      var english = {
          weekdays: {
              shorthand: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
              longhand: [
                  "Sunday",
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
              ]
          },
          months: {
              shorthand: [
                  "Jan",
                  "Feb",
                  "Mar",
                  "Apr",
                  "May",
                  "Jun",
                  "Jul",
                  "Aug",
                  "Sep",
                  "Oct",
                  "Nov",
                  "Dec",
              ],
              longhand: [
                  "January",
                  "February",
                  "March",
                  "April",
                  "May",
                  "June",
                  "July",
                  "August",
                  "September",
                  "October",
                  "November",
                  "December",
              ]
          },
          daysInMonth: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
          firstDayOfWeek: 0,
          ordinal: function (nth) {
              var s = nth % 100;
              if (s > 3 && s < 21)
                  return "th";
              switch (s % 10) {
                  case 1:
                      return "st";
                  case 2:
                      return "nd";
                  case 3:
                      return "rd";
                  default:
                      return "th";
              }
          },
          rangeSeparator: " to ",
          weekAbbreviation: "Wk",
          scrollTitle: "Scroll to increment",
          toggleTitle: "Click to toggle",
          amPM: ["AM", "PM"],
          yearAriaLabel: "Year",
          hourAriaLabel: "Hour",
          minuteAriaLabel: "Minute",
          time_24hr: false
      };

      var pad = function (number) { return ("0" + number).slice(-2); };
      var int = function (bool) { return (bool === true ? 1 : 0); };
      /* istanbul ignore next */
      function debounce(func, wait, immediate) {
          if (immediate === void 0) { immediate = false; }
          var timeout;
          return function () {
              var context = this, args = arguments;
              timeout !== null && clearTimeout(timeout);
              timeout = window.setTimeout(function () {
                  timeout = null;
                  if (!immediate)
                      func.apply(context, args);
              }, wait);
              if (immediate && !timeout)
                  func.apply(context, args);
          };
      }
      var arrayify = function (obj) {
          return obj instanceof Array ? obj : [obj];
      };

      function toggleClass(elem, className, bool) {
          if (bool === true)
              return elem.classList.add(className);
          elem.classList.remove(className);
      }
      function createElement(tag, className, content) {
          var e = window.document.createElement(tag);
          className = className || "";
          content = content || "";
          e.className = className;
          if (content !== undefined)
              e.textContent = content;
          return e;
      }
      function clearNode(node) {
          while (node.firstChild)
              node.removeChild(node.firstChild);
      }
      function findParent(node, condition) {
          if (condition(node))
              return node;
          else if (node.parentNode)
              return findParent(node.parentNode, condition);
          return undefined; // nothing found
      }
      function createNumberInput(inputClassName, opts) {
          var wrapper = createElement("div", "numInputWrapper"), numInput = createElement("input", "numInput " + inputClassName), arrowUp = createElement("span", "arrowUp"), arrowDown = createElement("span", "arrowDown");
          if (navigator.userAgent.indexOf("MSIE 9.0") === -1) {
              numInput.type = "number";
          }
          else {
              numInput.type = "text";
              numInput.pattern = "\\d*";
          }
          if (opts !== undefined)
              for (var key in opts)
                  numInput.setAttribute(key, opts[key]);
          wrapper.appendChild(numInput);
          wrapper.appendChild(arrowUp);
          wrapper.appendChild(arrowDown);
          return wrapper;
      }
      function getEventTarget(event) {
          if (typeof event.composedPath === "function") {
              var path = event.composedPath();
              return path[0];
          }
          return event.target;
      }

      var doNothing = function () { return undefined; };
      var monthToStr = function (monthNumber, shorthand, locale) { return locale.months[shorthand ? "shorthand" : "longhand"][monthNumber]; };
      var revFormat = {
          D: doNothing,
          F: function (dateObj, monthName, locale) {
              dateObj.setMonth(locale.months.longhand.indexOf(monthName));
          },
          G: function (dateObj, hour) {
              dateObj.setHours(parseFloat(hour));
          },
          H: function (dateObj, hour) {
              dateObj.setHours(parseFloat(hour));
          },
          J: function (dateObj, day) {
              dateObj.setDate(parseFloat(day));
          },
          K: function (dateObj, amPM, locale) {
              dateObj.setHours((dateObj.getHours() % 12) +
                  12 * int(new RegExp(locale.amPM[1], "i").test(amPM)));
          },
          M: function (dateObj, shortMonth, locale) {
              dateObj.setMonth(locale.months.shorthand.indexOf(shortMonth));
          },
          S: function (dateObj, seconds) {
              dateObj.setSeconds(parseFloat(seconds));
          },
          U: function (_, unixSeconds) { return new Date(parseFloat(unixSeconds) * 1000); },
          W: function (dateObj, weekNum, locale) {
              var weekNumber = parseInt(weekNum);
              var date = new Date(dateObj.getFullYear(), 0, 2 + (weekNumber - 1) * 7, 0, 0, 0, 0);
              date.setDate(date.getDate() - date.getDay() + locale.firstDayOfWeek);
              return date;
          },
          Y: function (dateObj, year) {
              dateObj.setFullYear(parseFloat(year));
          },
          Z: function (_, ISODate) { return new Date(ISODate); },
          d: function (dateObj, day) {
              dateObj.setDate(parseFloat(day));
          },
          h: function (dateObj, hour) {
              dateObj.setHours(parseFloat(hour));
          },
          i: function (dateObj, minutes) {
              dateObj.setMinutes(parseFloat(minutes));
          },
          j: function (dateObj, day) {
              dateObj.setDate(parseFloat(day));
          },
          l: doNothing,
          m: function (dateObj, month) {
              dateObj.setMonth(parseFloat(month) - 1);
          },
          n: function (dateObj, month) {
              dateObj.setMonth(parseFloat(month) - 1);
          },
          s: function (dateObj, seconds) {
              dateObj.setSeconds(parseFloat(seconds));
          },
          u: function (_, unixMillSeconds) {
              return new Date(parseFloat(unixMillSeconds));
          },
          w: doNothing,
          y: function (dateObj, year) {
              dateObj.setFullYear(2000 + parseFloat(year));
          }
      };
      var tokenRegex = {
          D: "(\\w+)",
          F: "(\\w+)",
          G: "(\\d\\d|\\d)",
          H: "(\\d\\d|\\d)",
          J: "(\\d\\d|\\d)\\w+",
          K: "",
          M: "(\\w+)",
          S: "(\\d\\d|\\d)",
          U: "(.+)",
          W: "(\\d\\d|\\d)",
          Y: "(\\d{4})",
          Z: "(.+)",
          d: "(\\d\\d|\\d)",
          h: "(\\d\\d|\\d)",
          i: "(\\d\\d|\\d)",
          j: "(\\d\\d|\\d)",
          l: "(\\w+)",
          m: "(\\d\\d|\\d)",
          n: "(\\d\\d|\\d)",
          s: "(\\d\\d|\\d)",
          u: "(.+)",
          w: "(\\d\\d|\\d)",
          y: "(\\d{2})"
      };
      var formats = {
          // get the date in UTC
          Z: function (date) { return date.toISOString(); },
          // weekday name, short, e.g. Thu
          D: function (date, locale, options) {
              return locale.weekdays.shorthand[formats.w(date, locale, options)];
          },
          // full month name e.g. January
          F: function (date, locale, options) {
              return monthToStr(formats.n(date, locale, options) - 1, false, locale);
          },
          // padded hour 1-12
          G: function (date, locale, options) {
              return pad(formats.h(date, locale, options));
          },
          // hours with leading zero e.g. 03
          H: function (date) { return pad(date.getHours()); },
          // day (1-30) with ordinal suffix e.g. 1st, 2nd
          J: function (date, locale) {
              return locale.ordinal !== undefined
                  ? date.getDate() + locale.ordinal(date.getDate())
                  : date.getDate();
          },
          // AM/PM
          K: function (date, locale) { return locale.amPM[int(date.getHours() > 11)]; },
          // shorthand month e.g. Jan, Sep, Oct, etc
          M: function (date, locale) {
              return monthToStr(date.getMonth(), true, locale);
          },
          // seconds 00-59
          S: function (date) { return pad(date.getSeconds()); },
          // unix timestamp
          U: function (date) { return date.getTime() / 1000; },
          W: function (date, _, options) {
              return options.getWeek(date);
          },
          // full year e.g. 2016
          Y: function (date) { return date.getFullYear(); },
          // day in month, padded (01-30)
          d: function (date) { return pad(date.getDate()); },
          // hour from 1-12 (am/pm)
          h: function (date) { return (date.getHours() % 12 ? date.getHours() % 12 : 12); },
          // minutes, padded with leading zero e.g. 09
          i: function (date) { return pad(date.getMinutes()); },
          // day in month (1-30)
          j: function (date) { return date.getDate(); },
          // weekday name, full, e.g. Thursday
          l: function (date, locale) {
              return locale.weekdays.longhand[date.getDay()];
          },
          // padded month number (01-12)
          m: function (date) { return pad(date.getMonth() + 1); },
          // the month number (1-12)
          n: function (date) { return date.getMonth() + 1; },
          // seconds 0-59
          s: function (date) { return date.getSeconds(); },
          // Unix Milliseconds
          u: function (date) { return date.getTime(); },
          // number of the day of the week
          w: function (date) { return date.getDay(); },
          // last two digits of year e.g. 16 for 2016
          y: function (date) { return String(date.getFullYear()).substring(2); }
      };

      var createDateFormatter = function (_a) {
          var _b = _a.config, config = _b === void 0 ? defaults : _b, _c = _a.l10n, l10n = _c === void 0 ? english : _c;
          return function (dateObj, frmt, overrideLocale) {
              var locale = overrideLocale || l10n;
              if (config.formatDate !== undefined) {
                  return config.formatDate(dateObj, frmt, locale);
              }
              return frmt
                  .split("")
                  .map(function (c, i, arr) {
                  return formats[c] && arr[i - 1] !== "\\"
                      ? formats[c](dateObj, locale, config)
                      : c !== "\\"
                          ? c
                          : "";
              })
                  .join("");
          };
      };
      var createDateParser = function (_a) {
          var _b = _a.config, config = _b === void 0 ? defaults : _b, _c = _a.l10n, l10n = _c === void 0 ? english : _c;
          return function (date, givenFormat, timeless, customLocale) {
              if (date !== 0 && !date)
                  return undefined;
              var locale = customLocale || l10n;
              var parsedDate;
              var dateOrig = date;
              if (date instanceof Date)
                  parsedDate = new Date(date.getTime());
              else if (typeof date !== "string" &&
                  date.toFixed !== undefined // timestamp
              )
                  // create a copy
                  parsedDate = new Date(date);
              else if (typeof date === "string") {
                  // date string
                  var format = givenFormat || (config || defaults).dateFormat;
                  var datestr = String(date).trim();
                  if (datestr === "today") {
                      parsedDate = new Date();
                      timeless = true;
                  }
                  else if (/Z$/.test(datestr) ||
                      /GMT$/.test(datestr) // datestrings w/ timezone
                  )
                      parsedDate = new Date(date);
                  else if (config && config.parseDate)
                      parsedDate = config.parseDate(date, format);
                  else {
                      parsedDate =
                          !config || !config.noCalendar
                              ? new Date(new Date().getFullYear(), 0, 1, 0, 0, 0, 0)
                              : new Date(new Date().setHours(0, 0, 0, 0));
                      var matched = void 0, ops = [];
                      for (var i = 0, matchIndex = 0, regexStr = ""; i < format.length; i++) {
                          var token_1 = format[i];
                          var isBackSlash = token_1 === "\\";
                          var escaped = format[i - 1] === "\\" || isBackSlash;
                          if (tokenRegex[token_1] && !escaped) {
                              regexStr += tokenRegex[token_1];
                              var match = new RegExp(regexStr).exec(date);
                              if (match && (matched = true)) {
                                  ops[token_1 !== "Y" ? "push" : "unshift"]({
                                      fn: revFormat[token_1],
                                      val: match[++matchIndex]
                                  });
                              }
                          }
                          else if (!isBackSlash)
                              regexStr += "."; // don't really care
                          ops.forEach(function (_a) {
                              var fn = _a.fn, val = _a.val;
                              return (parsedDate = fn(parsedDate, val, locale) || parsedDate);
                          });
                      }
                      parsedDate = matched ? parsedDate : undefined;
                  }
              }
              /* istanbul ignore next */
              if (!(parsedDate instanceof Date && !isNaN(parsedDate.getTime()))) {
                  config.errorHandler(new Error("Invalid date provided: " + dateOrig));
                  return undefined;
              }
              if (timeless === true)
                  parsedDate.setHours(0, 0, 0, 0);
              return parsedDate;
          };
      };
      /**
       * Compute the difference in dates, measured in ms
       */
      function compareDates(date1, date2, timeless) {
          if (timeless === void 0) { timeless = true; }
          if (timeless !== false) {
              return (new Date(date1.getTime()).setHours(0, 0, 0, 0) -
                  new Date(date2.getTime()).setHours(0, 0, 0, 0));
          }
          return date1.getTime() - date2.getTime();
      }
      var isBetween = function (ts, ts1, ts2) {
          return ts > Math.min(ts1, ts2) && ts < Math.max(ts1, ts2);
      };
      var duration = {
          DAY: 86400000
      };

      if (typeof Object.assign !== "function") {
          Object.assign = function (target) {
              var args = [];
              for (var _i = 1; _i < arguments.length; _i++) {
                  args[_i - 1] = arguments[_i];
              }
              if (!target) {
                  throw TypeError("Cannot convert undefined or null to object");
              }
              var _loop_1 = function (source) {
                  if (source) {
                      Object.keys(source).forEach(function (key) { return (target[key] = source[key]); });
                  }
              };
              for (var _a = 0, args_1 = args; _a < args_1.length; _a++) {
                  var source = args_1[_a];
                  _loop_1(source);
              }
              return target;
          };
      }

      var DEBOUNCED_CHANGE_MS = 300;
      function FlatpickrInstance(element, instanceConfig) {
          var self = {
              config: __assign({}, defaults, flatpickr.defaultConfig),
              l10n: english
          };
          self.parseDate = createDateParser({ config: self.config, l10n: self.l10n });
          self._handlers = [];
          self.pluginElements = [];
          self.loadedPlugins = [];
          self._bind = bind;
          self._setHoursFromDate = setHoursFromDate;
          self._positionCalendar = positionCalendar;
          self.changeMonth = changeMonth;
          self.changeYear = changeYear;
          self.clear = clear;
          self.close = close;
          self._createElement = createElement;
          self.destroy = destroy;
          self.isEnabled = isEnabled;
          self.jumpToDate = jumpToDate;
          self.open = open;
          self.redraw = redraw;
          self.set = set;
          self.setDate = setDate;
          self.toggle = toggle;
          function setupHelperFunctions() {
              self.utils = {
                  getDaysInMonth: function (month, yr) {
                      if (month === void 0) { month = self.currentMonth; }
                      if (yr === void 0) { yr = self.currentYear; }
                      if (month === 1 && ((yr % 4 === 0 && yr % 100 !== 0) || yr % 400 === 0))
                          return 29;
                      return self.l10n.daysInMonth[month];
                  }
              };
          }
          function init() {
              self.element = self.input = element;
              self.isOpen = false;
              parseConfig();
              setupLocale();
              setupInputs();
              setupDates();
              setupHelperFunctions();
              if (!self.isMobile)
                  build();
              bindEvents();
              if (self.selectedDates.length || self.config.noCalendar) {
                  if (self.config.enableTime) {
                      setHoursFromDate(self.config.noCalendar
                          ? self.latestSelectedDateObj || self.config.minDate
                          : undefined);
                  }
                  updateValue(false);
              }
              setCalendarWidth();
              self.showTimeInput =
                  self.selectedDates.length > 0 || self.config.noCalendar;
              var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
              /* TODO: investigate this further
          
                Currently, there is weird positioning behavior in safari causing pages
                to scroll up. https://github.com/chmln/flatpickr/issues/563
          
                However, most browsers are not Safari and positioning is expensive when used
                in scale. https://github.com/chmln/flatpickr/issues/1096
              */
              if (!self.isMobile && isSafari) {
                  positionCalendar();
              }
              triggerEvent("onReady");
          }
          function bindToInstance(fn) {
              return fn.bind(self);
          }
          function setCalendarWidth() {
              var config = self.config;
              if (config.weekNumbers === false && config.showMonths === 1)
                  return;
              else if (config.noCalendar !== true) {
                  window.requestAnimationFrame(function () {
                      if (self.calendarContainer !== undefined) {
                          self.calendarContainer.style.visibility = "hidden";
                          self.calendarContainer.style.display = "block";
                      }
                      if (self.daysContainer !== undefined) {
                          var daysWidth = (self.days.offsetWidth + 1) * config.showMonths;
                          self.daysContainer.style.width = daysWidth + "px";
                          self.calendarContainer.style.width =
                              daysWidth +
                                  (self.weekWrapper !== undefined
                                      ? self.weekWrapper.offsetWidth
                                      : 0) +
                                  "px";
                          self.calendarContainer.style.removeProperty("visibility");
                          self.calendarContainer.style.removeProperty("display");
                      }
                  });
              }
          }
          /**
           * The handler for all events targeting the time inputs
           */
          function updateTime(e) {
              if (self.selectedDates.length === 0) {
                  setDefaultTime();
              }
              if (e !== undefined && e.type !== "blur") {
                  timeWrapper(e);
              }
              var prevValue = self._input.value;
              setHoursFromInputs();
              updateValue();
              if (self._input.value !== prevValue) {
                  self._debouncedChange();
              }
          }
          function ampm2military(hour, amPM) {
              return (hour % 12) + 12 * int(amPM === self.l10n.amPM[1]);
          }
          function military2ampm(hour) {
              switch (hour % 24) {
                  case 0:
                  case 12:
                      return 12;
                  default:
                      return hour % 12;
              }
          }
          /**
           * Syncs the selected date object time with user's time input
           */
          function setHoursFromInputs() {
              if (self.hourElement === undefined || self.minuteElement === undefined)
                  return;
              var hours = (parseInt(self.hourElement.value.slice(-2), 10) || 0) % 24, minutes = (parseInt(self.minuteElement.value, 10) || 0) % 60, seconds = self.secondElement !== undefined
                  ? (parseInt(self.secondElement.value, 10) || 0) % 60
                  : 0;
              if (self.amPM !== undefined) {
                  hours = ampm2military(hours, self.amPM.textContent);
              }
              var limitMinHours = self.config.minTime !== undefined ||
                  (self.config.minDate &&
                      self.minDateHasTime &&
                      self.latestSelectedDateObj &&
                      compareDates(self.latestSelectedDateObj, self.config.minDate, true) ===
                          0);
              var limitMaxHours = self.config.maxTime !== undefined ||
                  (self.config.maxDate &&
                      self.maxDateHasTime &&
                      self.latestSelectedDateObj &&
                      compareDates(self.latestSelectedDateObj, self.config.maxDate, true) ===
                          0);
              if (limitMaxHours) {
                  var maxTime = self.config.maxTime !== undefined
                      ? self.config.maxTime
                      : self.config.maxDate;
                  hours = Math.min(hours, maxTime.getHours());
                  if (hours === maxTime.getHours())
                      minutes = Math.min(minutes, maxTime.getMinutes());
                  if (minutes === maxTime.getMinutes())
                      seconds = Math.min(seconds, maxTime.getSeconds());
              }
              if (limitMinHours) {
                  var minTime = self.config.minTime !== undefined
                      ? self.config.minTime
                      : self.config.minDate;
                  hours = Math.max(hours, minTime.getHours());
                  if (hours === minTime.getHours())
                      minutes = Math.max(minutes, minTime.getMinutes());
                  if (minutes === minTime.getMinutes())
                      seconds = Math.max(seconds, minTime.getSeconds());
              }
              setHours(hours, minutes, seconds);
          }
          /**
           * Syncs time input values with a date
           */
          function setHoursFromDate(dateObj) {
              var date = dateObj || self.latestSelectedDateObj;
              if (date)
                  setHours(date.getHours(), date.getMinutes(), date.getSeconds());
          }
          function setDefaultHours() {
              var hours = self.config.defaultHour;
              var minutes = self.config.defaultMinute;
              var seconds = self.config.defaultSeconds;
              if (self.config.minDate !== undefined) {
                  var minHr = self.config.minDate.getHours();
                  var minMinutes = self.config.minDate.getMinutes();
                  hours = Math.max(hours, minHr);
                  if (hours === minHr)
                      minutes = Math.max(minMinutes, minutes);
                  if (hours === minHr && minutes === minMinutes)
                      seconds = self.config.minDate.getSeconds();
              }
              if (self.config.maxDate !== undefined) {
                  var maxHr = self.config.maxDate.getHours();
                  var maxMinutes = self.config.maxDate.getMinutes();
                  hours = Math.min(hours, maxHr);
                  if (hours === maxHr)
                      minutes = Math.min(maxMinutes, minutes);
                  if (hours === maxHr && minutes === maxMinutes)
                      seconds = self.config.maxDate.getSeconds();
              }
              setHours(hours, minutes, seconds);
          }
          /**
           * Sets the hours, minutes, and optionally seconds
           * of the latest selected date object and the
           * corresponding time inputs
           * @param {Number} hours the hour. whether its military
           *                 or am-pm gets inferred from config
           * @param {Number} minutes the minutes
           * @param {Number} seconds the seconds (optional)
           */
          function setHours(hours, minutes, seconds) {
              if (self.latestSelectedDateObj !== undefined) {
                  self.latestSelectedDateObj.setHours(hours % 24, minutes, seconds || 0, 0);
              }
              if (!self.hourElement || !self.minuteElement || self.isMobile)
                  return;
              self.hourElement.value = pad(!self.config.time_24hr
                  ? ((12 + hours) % 12) + 12 * int(hours % 12 === 0)
                  : hours);
              self.minuteElement.value = pad(minutes);
              if (self.amPM !== undefined)
                  self.amPM.textContent = self.l10n.amPM[int(hours >= 12)];
              if (self.secondElement !== undefined)
                  self.secondElement.value = pad(seconds);
          }
          /**
           * Handles the year input and incrementing events
           * @param {Event} event the keyup or increment event
           */
          function onYearInput(event) {
              var year = parseInt(event.target.value) + (event.delta || 0);
              if (year / 1000 > 1 ||
                  (event.key === "Enter" && !/[^\d]/.test(year.toString()))) {
                  changeYear(year);
              }
          }
          /**
           * Essentially addEventListener + tracking
           * @param {Element} element the element to addEventListener to
           * @param {String} event the event name
           * @param {Function} handler the event handler
           */
          function bind(element, event, handler, options) {
              if (event instanceof Array)
                  return event.forEach(function (ev) { return bind(element, ev, handler, options); });
              if (element instanceof Array)
                  return element.forEach(function (el) { return bind(el, event, handler, options); });
              element.addEventListener(event, handler, options);
              self._handlers.push({
                  element: element,
                  event: event,
                  handler: handler,
                  options: options
              });
          }
          /**
           * A mousedown handler which mimics click.
           * Minimizes latency, since we don't need to wait for mouseup in most cases.
           * Also, avoids handling right clicks.
           *
           * @param {Function} handler the event handler
           */
          function onClick(handler) {
              return function (evt) {
                  evt.which === 1 && handler(evt);
              };
          }
          function triggerChange() {
              triggerEvent("onChange");
          }
          /**
           * Adds all the necessary event listeners
           */
          function bindEvents() {
              if (self.config.wrap) {
                  ["open", "close", "toggle", "clear"].forEach(function (evt) {
                      Array.prototype.forEach.call(self.element.querySelectorAll("[data-" + evt + "]"), function (el) {
                          return bind(el, "click", self[evt]);
                      });
                  });
              }
              if (self.isMobile) {
                  setupMobile();
                  return;
              }
              var debouncedResize = debounce(onResize, 50);
              self._debouncedChange = debounce(triggerChange, DEBOUNCED_CHANGE_MS);
              if (self.daysContainer && !/iPhone|iPad|iPod/i.test(navigator.userAgent))
                  bind(self.daysContainer, "mouseover", function (e) {
                      if (self.config.mode === "range")
                          onMouseOver(e.target);
                  });
              bind(window.document.body, "keydown", onKeyDown);
              if (!self.config.inline && !self.config.static)
                  bind(window, "resize", debouncedResize);
              if (window.ontouchstart !== undefined)
                  bind(window.document, "touchstart", documentClick);
              else
                  bind(window.document, "mousedown", onClick(documentClick));
              bind(window.document, "focus", documentClick, { capture: true });
              if (self.config.clickOpens === true) {
                  bind(self._input, "focus", self.open);
                  bind(self._input, "mousedown", onClick(self.open));
              }
              if (self.daysContainer !== undefined) {
                  bind(self.monthNav, "mousedown", onClick(onMonthNavClick));
                  bind(self.monthNav, ["keyup", "increment"], onYearInput);
                  bind(self.daysContainer, "mousedown", onClick(selectDate));
              }
              if (self.timeContainer !== undefined &&
                  self.minuteElement !== undefined &&
                  self.hourElement !== undefined) {
                  var selText = function (e) {
                      return e.target.select();
                  };
                  bind(self.timeContainer, ["increment"], updateTime);
                  bind(self.timeContainer, "blur", updateTime, { capture: true });
                  bind(self.timeContainer, "mousedown", onClick(timeIncrement));
                  bind([self.hourElement, self.minuteElement], ["focus", "click"], selText);
                  if (self.secondElement !== undefined)
                      bind(self.secondElement, "focus", function () { return self.secondElement && self.secondElement.select(); });
                  if (self.amPM !== undefined) {
                      bind(self.amPM, "mousedown", onClick(function (e) {
                          updateTime(e);
                          triggerChange();
                      }));
                  }
              }
          }
          /**
           * Set the calendar view to a particular date.
           * @param {Date} jumpDate the date to set the view to
           * @param {boolean} triggerChange if change events should be triggered
           */
          function jumpToDate(jumpDate, triggerChange) {
              var jumpTo = jumpDate !== undefined
                  ? self.parseDate(jumpDate)
                  : self.latestSelectedDateObj ||
                      (self.config.minDate && self.config.minDate > self.now
                          ? self.config.minDate
                          : self.config.maxDate && self.config.maxDate < self.now
                              ? self.config.maxDate
                              : self.now);
              var oldYear = self.currentYear;
              var oldMonth = self.currentMonth;
              try {
                  if (jumpTo !== undefined) {
                      self.currentYear = jumpTo.getFullYear();
                      self.currentMonth = jumpTo.getMonth();
                  }
              }
              catch (e) {
                  /* istanbul ignore next */
                  e.message = "Invalid date supplied: " + jumpTo;
                  self.config.errorHandler(e);
              }
              if (triggerChange && self.currentYear !== oldYear) {
                  triggerEvent("onYearChange");
                  buildMonthSwitch();
              }
              if (triggerChange &&
                  (self.currentYear !== oldYear || self.currentMonth !== oldMonth)) {
                  triggerEvent("onMonthChange");
              }
              self.redraw();
          }
          /**
           * The up/down arrow handler for time inputs
           * @param {Event} e the click event
           */
          function timeIncrement(e) {
              if (~e.target.className.indexOf("arrow"))
                  incrementNumInput(e, e.target.classList.contains("arrowUp") ? 1 : -1);
          }
          /**
           * Increments/decrements the value of input associ-
           * ated with the up/down arrow by dispatching an
           * "increment" event on the input.
           *
           * @param {Event} e the click event
           * @param {Number} delta the diff (usually 1 or -1)
           * @param {Element} inputElem the input element
           */
          function incrementNumInput(e, delta, inputElem) {
              var target = e && e.target;
              var input = inputElem ||
                  (target && target.parentNode && target.parentNode.firstChild);
              var event = createEvent("increment");
              event.delta = delta;
              input && input.dispatchEvent(event);
          }
          function build() {
              var fragment = window.document.createDocumentFragment();
              self.calendarContainer = createElement("div", "flatpickr-calendar");
              self.calendarContainer.tabIndex = -1;
              if (!self.config.noCalendar) {
                  fragment.appendChild(buildMonthNav());
                  self.innerContainer = createElement("div", "flatpickr-innerContainer");
                  if (self.config.weekNumbers) {
                      var _a = buildWeeks(), weekWrapper = _a.weekWrapper, weekNumbers = _a.weekNumbers;
                      self.innerContainer.appendChild(weekWrapper);
                      self.weekNumbers = weekNumbers;
                      self.weekWrapper = weekWrapper;
                  }
                  self.rContainer = createElement("div", "flatpickr-rContainer");
                  self.rContainer.appendChild(buildWeekdays());
                  if (!self.daysContainer) {
                      self.daysContainer = createElement("div", "flatpickr-days");
                      self.daysContainer.tabIndex = -1;
                  }
                  buildDays();
                  self.rContainer.appendChild(self.daysContainer);
                  self.innerContainer.appendChild(self.rContainer);
                  fragment.appendChild(self.innerContainer);
              }
              if (self.config.enableTime) {
                  fragment.appendChild(buildTime());
              }
              toggleClass(self.calendarContainer, "rangeMode", self.config.mode === "range");
              toggleClass(self.calendarContainer, "animate", self.config.animate === true);
              toggleClass(self.calendarContainer, "multiMonth", self.config.showMonths > 1);
              self.calendarContainer.appendChild(fragment);
              var customAppend = self.config.appendTo !== undefined &&
                  self.config.appendTo.nodeType !== undefined;
              if (self.config.inline || self.config.static) {
                  self.calendarContainer.classList.add(self.config.inline ? "inline" : "static");
                  if (self.config.inline) {
                      if (!customAppend && self.element.parentNode)
                          self.element.parentNode.insertBefore(self.calendarContainer, self._input.nextSibling);
                      else if (self.config.appendTo !== undefined)
                          self.config.appendTo.appendChild(self.calendarContainer);
                  }
                  if (self.config.static) {
                      var wrapper = createElement("div", "flatpickr-wrapper");
                      if (self.element.parentNode)
                          self.element.parentNode.insertBefore(wrapper, self.element);
                      wrapper.appendChild(self.element);
                      if (self.altInput)
                          wrapper.appendChild(self.altInput);
                      wrapper.appendChild(self.calendarContainer);
                  }
              }
              if (!self.config.static && !self.config.inline)
                  (self.config.appendTo !== undefined
                      ? self.config.appendTo
                      : window.document.body).appendChild(self.calendarContainer);
          }
          function createDay(className, date, dayNumber, i) {
              var dateIsEnabled = isEnabled(date, true), dayElement = createElement("span", "flatpickr-day " + className, date.getDate().toString());
              dayElement.dateObj = date;
              dayElement.$i = i;
              dayElement.setAttribute("aria-label", self.formatDate(date, self.config.ariaDateFormat));
              if (className.indexOf("hidden") === -1 &&
                  compareDates(date, self.now) === 0) {
                  self.todayDateElem = dayElement;
                  dayElement.classList.add("today");
                  dayElement.setAttribute("aria-current", "date");
              }
              if (dateIsEnabled) {
                  dayElement.tabIndex = -1;
                  if (isDateSelected(date)) {
                      dayElement.classList.add("selected");
                      self.selectedDateElem = dayElement;
                      if (self.config.mode === "range") {
                          toggleClass(dayElement, "startRange", self.selectedDates[0] &&
                              compareDates(date, self.selectedDates[0], true) === 0);
                          toggleClass(dayElement, "endRange", self.selectedDates[1] &&
                              compareDates(date, self.selectedDates[1], true) === 0);
                          if (className === "nextMonthDay")
                              dayElement.classList.add("inRange");
                      }
                  }
              }
              else {
                  dayElement.classList.add("flatpickr-disabled");
              }
              if (self.config.mode === "range") {
                  if (isDateInRange(date) && !isDateSelected(date))
                      dayElement.classList.add("inRange");
              }
              if (self.weekNumbers &&
                  self.config.showMonths === 1 &&
                  className !== "prevMonthDay" &&
                  dayNumber % 7 === 1) {
                  self.weekNumbers.insertAdjacentHTML("beforeend", "<span class='flatpickr-day'>" + self.config.getWeek(date) + "</span>");
              }
              triggerEvent("onDayCreate", dayElement);
              return dayElement;
          }
          function focusOnDayElem(targetNode) {
              targetNode.focus();
              if (self.config.mode === "range")
                  onMouseOver(targetNode);
          }
          function getFirstAvailableDay(delta) {
              var startMonth = delta > 0 ? 0 : self.config.showMonths - 1;
              var endMonth = delta > 0 ? self.config.showMonths : -1;
              for (var m = startMonth; m != endMonth; m += delta) {
                  var month = self.daysContainer.children[m];
                  var startIndex = delta > 0 ? 0 : month.children.length - 1;
                  var endIndex = delta > 0 ? month.children.length : -1;
                  for (var i = startIndex; i != endIndex; i += delta) {
                      var c = month.children[i];
                      if (c.className.indexOf("hidden") === -1 && isEnabled(c.dateObj))
                          return c;
                  }
              }
              return undefined;
          }
          function getNextAvailableDay(current, delta) {
              var givenMonth = current.className.indexOf("Month") === -1
                  ? current.dateObj.getMonth()
                  : self.currentMonth;
              var endMonth = delta > 0 ? self.config.showMonths : -1;
              var loopDelta = delta > 0 ? 1 : -1;
              for (var m = givenMonth - self.currentMonth; m != endMonth; m += loopDelta) {
                  var month = self.daysContainer.children[m];
                  var startIndex = givenMonth - self.currentMonth === m
                      ? current.$i + delta
                      : delta < 0
                          ? month.children.length - 1
                          : 0;
                  var numMonthDays = month.children.length;
                  for (var i = startIndex; i >= 0 && i < numMonthDays && i != (delta > 0 ? numMonthDays : -1); i += loopDelta) {
                      var c = month.children[i];
                      if (c.className.indexOf("hidden") === -1 &&
                          isEnabled(c.dateObj) &&
                          Math.abs(current.$i - i) >= Math.abs(delta))
                          return focusOnDayElem(c);
                  }
              }
              self.changeMonth(loopDelta);
              focusOnDay(getFirstAvailableDay(loopDelta), 0);
              return undefined;
          }
          function focusOnDay(current, offset) {
              var dayFocused = isInView(document.activeElement || document.body);
              var startElem = current !== undefined
                  ? current
                  : dayFocused
                      ? document.activeElement
                      : self.selectedDateElem !== undefined && isInView(self.selectedDateElem)
                          ? self.selectedDateElem
                          : self.todayDateElem !== undefined && isInView(self.todayDateElem)
                              ? self.todayDateElem
                              : getFirstAvailableDay(offset > 0 ? 1 : -1);
              if (startElem === undefined)
                  return self._input.focus();
              if (!dayFocused)
                  return focusOnDayElem(startElem);
              getNextAvailableDay(startElem, offset);
          }
          function buildMonthDays(year, month) {
              var firstOfMonth = (new Date(year, month, 1).getDay() - self.l10n.firstDayOfWeek + 7) % 7;
              var prevMonthDays = self.utils.getDaysInMonth((month - 1 + 12) % 12);
              var daysInMonth = self.utils.getDaysInMonth(month), days = window.document.createDocumentFragment(), isMultiMonth = self.config.showMonths > 1, prevMonthDayClass = isMultiMonth ? "prevMonthDay hidden" : "prevMonthDay", nextMonthDayClass = isMultiMonth ? "nextMonthDay hidden" : "nextMonthDay";
              var dayNumber = prevMonthDays + 1 - firstOfMonth, dayIndex = 0;
              // prepend days from the ending of previous month
              for (; dayNumber <= prevMonthDays; dayNumber++, dayIndex++) {
                  days.appendChild(createDay(prevMonthDayClass, new Date(year, month - 1, dayNumber), dayNumber, dayIndex));
              }
              // Start at 1 since there is no 0th day
              for (dayNumber = 1; dayNumber <= daysInMonth; dayNumber++, dayIndex++) {
                  days.appendChild(createDay("", new Date(year, month, dayNumber), dayNumber, dayIndex));
              }
              // append days from the next month
              for (var dayNum = daysInMonth + 1; dayNum <= 42 - firstOfMonth &&
                  (self.config.showMonths === 1 || dayIndex % 7 !== 0); dayNum++, dayIndex++) {
                  days.appendChild(createDay(nextMonthDayClass, new Date(year, month + 1, dayNum % daysInMonth), dayNum, dayIndex));
              }
              //updateNavigationCurrentMonth();
              var dayContainer = createElement("div", "dayContainer");
              dayContainer.appendChild(days);
              return dayContainer;
          }
          function buildDays() {
              if (self.daysContainer === undefined) {
                  return;
              }
              clearNode(self.daysContainer);
              // TODO: week numbers for each month
              if (self.weekNumbers)
                  clearNode(self.weekNumbers);
              var frag = document.createDocumentFragment();
              for (var i = 0; i < self.config.showMonths; i++) {
                  var d = new Date(self.currentYear, self.currentMonth, 1);
                  d.setMonth(self.currentMonth + i);
                  frag.appendChild(buildMonthDays(d.getFullYear(), d.getMonth()));
              }
              self.daysContainer.appendChild(frag);
              self.days = self.daysContainer.firstChild;
              if (self.config.mode === "range" && self.selectedDates.length === 1) {
                  onMouseOver();
              }
          }
          function buildMonthSwitch() {
              if (self.config.showMonths > 1 ||
                  self.config.monthSelectorType !== "dropdown")
                  return;
              var shouldBuildMonth = function (month) {
                  if (self.config.minDate !== undefined &&
                      self.currentYear === self.config.minDate.getFullYear() &&
                      month < self.config.minDate.getMonth()) {
                      return false;
                  }
                  return !(self.config.maxDate !== undefined &&
                      self.currentYear === self.config.maxDate.getFullYear() &&
                      month > self.config.maxDate.getMonth());
              };
              self.monthsDropdownContainer.tabIndex = -1;
              self.monthsDropdownContainer.innerHTML = "";
              for (var i = 0; i < 12; i++) {
                  if (!shouldBuildMonth(i))
                      continue;
                  var month = createElement("option", "flatpickr-monthDropdown-month");
                  month.value = new Date(self.currentYear, i).getMonth().toString();
                  month.textContent = monthToStr(i, self.config.shorthandCurrentMonth, self.l10n);
                  month.tabIndex = -1;
                  if (self.currentMonth === i) {
                      month.selected = true;
                  }
                  self.monthsDropdownContainer.appendChild(month);
              }
          }
          function buildMonth() {
              var container = createElement("div", "flatpickr-month");
              var monthNavFragment = window.document.createDocumentFragment();
              var monthElement;
              if (self.config.showMonths > 1 ||
                  self.config.monthSelectorType === "static") {
                  monthElement = createElement("span", "cur-month");
              }
              else {
                  self.monthsDropdownContainer = createElement("select", "flatpickr-monthDropdown-months");
                  bind(self.monthsDropdownContainer, "change", function (e) {
                      var target = e.target;
                      var selectedMonth = parseInt(target.value, 10);
                      self.changeMonth(selectedMonth - self.currentMonth);
                      triggerEvent("onMonthChange");
                  });
                  buildMonthSwitch();
                  monthElement = self.monthsDropdownContainer;
              }
              var yearInput = createNumberInput("cur-year", { tabindex: "-1" });
              var yearElement = yearInput.getElementsByTagName("input")[0];
              yearElement.setAttribute("aria-label", self.l10n.yearAriaLabel);
              if (self.config.minDate) {
                  yearElement.setAttribute("min", self.config.minDate.getFullYear().toString());
              }
              if (self.config.maxDate) {
                  yearElement.setAttribute("max", self.config.maxDate.getFullYear().toString());
                  yearElement.disabled =
                      !!self.config.minDate &&
                          self.config.minDate.getFullYear() === self.config.maxDate.getFullYear();
              }
              var currentMonth = createElement("div", "flatpickr-current-month");
              currentMonth.appendChild(monthElement);
              currentMonth.appendChild(yearInput);
              monthNavFragment.appendChild(currentMonth);
              container.appendChild(monthNavFragment);
              return {
                  container: container,
                  yearElement: yearElement,
                  monthElement: monthElement
              };
          }
          function buildMonths() {
              clearNode(self.monthNav);
              self.monthNav.appendChild(self.prevMonthNav);
              if (self.config.showMonths) {
                  self.yearElements = [];
                  self.monthElements = [];
              }
              for (var m = self.config.showMonths; m--;) {
                  var month = buildMonth();
                  self.yearElements.push(month.yearElement);
                  self.monthElements.push(month.monthElement);
                  self.monthNav.appendChild(month.container);
              }
              self.monthNav.appendChild(self.nextMonthNav);
          }
          function buildMonthNav() {
              self.monthNav = createElement("div", "flatpickr-months");
              self.yearElements = [];
              self.monthElements = [];
              self.prevMonthNav = createElement("span", "flatpickr-prev-month");
              self.prevMonthNav.innerHTML = self.config.prevArrow;
              self.nextMonthNav = createElement("span", "flatpickr-next-month");
              self.nextMonthNav.innerHTML = self.config.nextArrow;
              buildMonths();
              Object.defineProperty(self, "_hidePrevMonthArrow", {
                  get: function () { return self.__hidePrevMonthArrow; },
                  set: function (bool) {
                      if (self.__hidePrevMonthArrow !== bool) {
                          toggleClass(self.prevMonthNav, "flatpickr-disabled", bool);
                          self.__hidePrevMonthArrow = bool;
                      }
                  }
              });
              Object.defineProperty(self, "_hideNextMonthArrow", {
                  get: function () { return self.__hideNextMonthArrow; },
                  set: function (bool) {
                      if (self.__hideNextMonthArrow !== bool) {
                          toggleClass(self.nextMonthNav, "flatpickr-disabled", bool);
                          self.__hideNextMonthArrow = bool;
                      }
                  }
              });
              self.currentYearElement = self.yearElements[0];
              updateNavigationCurrentMonth();
              return self.monthNav;
          }
          function buildTime() {
              self.calendarContainer.classList.add("hasTime");
              if (self.config.noCalendar)
                  self.calendarContainer.classList.add("noCalendar");
              self.timeContainer = createElement("div", "flatpickr-time");
              self.timeContainer.tabIndex = -1;
              var separator = createElement("span", "flatpickr-time-separator", ":");
              var hourInput = createNumberInput("flatpickr-hour", {
                  "aria-label": self.l10n.hourAriaLabel
              });
              self.hourElement = hourInput.getElementsByTagName("input")[0];
              var minuteInput = createNumberInput("flatpickr-minute", {
                  "aria-label": self.l10n.minuteAriaLabel
              });
              self.minuteElement = minuteInput.getElementsByTagName("input")[0];
              self.hourElement.tabIndex = self.minuteElement.tabIndex = -1;
              self.hourElement.value = pad(self.latestSelectedDateObj
                  ? self.latestSelectedDateObj.getHours()
                  : self.config.time_24hr
                      ? self.config.defaultHour
                      : military2ampm(self.config.defaultHour));
              self.minuteElement.value = pad(self.latestSelectedDateObj
                  ? self.latestSelectedDateObj.getMinutes()
                  : self.config.defaultMinute);
              self.hourElement.setAttribute("step", self.config.hourIncrement.toString());
              self.minuteElement.setAttribute("step", self.config.minuteIncrement.toString());
              self.hourElement.setAttribute("min", self.config.time_24hr ? "0" : "1");
              self.hourElement.setAttribute("max", self.config.time_24hr ? "23" : "12");
              self.minuteElement.setAttribute("min", "0");
              self.minuteElement.setAttribute("max", "59");
              self.timeContainer.appendChild(hourInput);
              self.timeContainer.appendChild(separator);
              self.timeContainer.appendChild(minuteInput);
              if (self.config.time_24hr)
                  self.timeContainer.classList.add("time24hr");
              if (self.config.enableSeconds) {
                  self.timeContainer.classList.add("hasSeconds");
                  var secondInput = createNumberInput("flatpickr-second");
                  self.secondElement = secondInput.getElementsByTagName("input")[0];
                  self.secondElement.value = pad(self.latestSelectedDateObj
                      ? self.latestSelectedDateObj.getSeconds()
                      : self.config.defaultSeconds);
                  self.secondElement.setAttribute("step", self.minuteElement.getAttribute("step"));
                  self.secondElement.setAttribute("min", "0");
                  self.secondElement.setAttribute("max", "59");
                  self.timeContainer.appendChild(createElement("span", "flatpickr-time-separator", ":"));
                  self.timeContainer.appendChild(secondInput);
              }
              if (!self.config.time_24hr) {
                  // add self.amPM if appropriate
                  self.amPM = createElement("span", "flatpickr-am-pm", self.l10n.amPM[int((self.latestSelectedDateObj
                      ? self.hourElement.value
                      : self.config.defaultHour) > 11)]);
                  self.amPM.title = self.l10n.toggleTitle;
                  self.amPM.tabIndex = -1;
                  self.timeContainer.appendChild(self.amPM);
              }
              return self.timeContainer;
          }
          function buildWeekdays() {
              if (!self.weekdayContainer)
                  self.weekdayContainer = createElement("div", "flatpickr-weekdays");
              else
                  clearNode(self.weekdayContainer);
              for (var i = self.config.showMonths; i--;) {
                  var container = createElement("div", "flatpickr-weekdaycontainer");
                  self.weekdayContainer.appendChild(container);
              }
              updateWeekdays();
              return self.weekdayContainer;
          }
          function updateWeekdays() {
              if (!self.weekdayContainer) {
                  return;
              }
              var firstDayOfWeek = self.l10n.firstDayOfWeek;
              var weekdays = self.l10n.weekdays.shorthand.slice();
              if (firstDayOfWeek > 0 && firstDayOfWeek < weekdays.length) {
                  weekdays = weekdays.splice(firstDayOfWeek, weekdays.length).concat(weekdays.splice(0, firstDayOfWeek));
              }
              for (var i = self.config.showMonths; i--;) {
                  self.weekdayContainer.children[i].innerHTML = "\n      <span class='flatpickr-weekday'>\n        " + weekdays.join("</span><span class='flatpickr-weekday'>") + "\n      </span>\n      ";
              }
          }
          /* istanbul ignore next */
          function buildWeeks() {
              self.calendarContainer.classList.add("hasWeeks");
              var weekWrapper = createElement("div", "flatpickr-weekwrapper");
              weekWrapper.appendChild(createElement("span", "flatpickr-weekday", self.l10n.weekAbbreviation));
              var weekNumbers = createElement("div", "flatpickr-weeks");
              weekWrapper.appendChild(weekNumbers);
              return {
                  weekWrapper: weekWrapper,
                  weekNumbers: weekNumbers
              };
          }
          function changeMonth(value, isOffset) {
              if (isOffset === void 0) { isOffset = true; }
              var delta = isOffset ? value : value - self.currentMonth;
              if ((delta < 0 && self._hidePrevMonthArrow === true) ||
                  (delta > 0 && self._hideNextMonthArrow === true))
                  return;
              self.currentMonth += delta;
              if (self.currentMonth < 0 || self.currentMonth > 11) {
                  self.currentYear += self.currentMonth > 11 ? 1 : -1;
                  self.currentMonth = (self.currentMonth + 12) % 12;
                  triggerEvent("onYearChange");
                  buildMonthSwitch();
              }
              buildDays();
              triggerEvent("onMonthChange");
              updateNavigationCurrentMonth();
          }
          function clear(triggerChangeEvent, toInitial) {
              if (triggerChangeEvent === void 0) { triggerChangeEvent = true; }
              if (toInitial === void 0) { toInitial = true; }
              self.input.value = "";
              if (self.altInput !== undefined)
                  self.altInput.value = "";
              if (self.mobileInput !== undefined)
                  self.mobileInput.value = "";
              self.selectedDates = [];
              self.latestSelectedDateObj = undefined;
              if (toInitial === true) {
                  self.currentYear = self._initialDate.getFullYear();
                  self.currentMonth = self._initialDate.getMonth();
              }
              self.showTimeInput = false;
              if (self.config.enableTime === true) {
                  setDefaultHours();
              }
              self.redraw();
              if (triggerChangeEvent)
                  // triggerChangeEvent is true (default) or an Event
                  triggerEvent("onChange");
          }
          function close() {
              self.isOpen = false;
              if (!self.isMobile) {
                  if (self.calendarContainer !== undefined) {
                      self.calendarContainer.classList.remove("open");
                  }
                  if (self._input !== undefined) {
                      self._input.classList.remove("active");
                  }
              }
              triggerEvent("onClose");
          }
          function destroy() {
              if (self.config !== undefined)
                  triggerEvent("onDestroy");
              for (var i = self._handlers.length; i--;) {
                  var h = self._handlers[i];
                  h.element.removeEventListener(h.event, h.handler, h.options);
              }
              self._handlers = [];
              if (self.mobileInput) {
                  if (self.mobileInput.parentNode)
                      self.mobileInput.parentNode.removeChild(self.mobileInput);
                  self.mobileInput = undefined;
              }
              else if (self.calendarContainer && self.calendarContainer.parentNode) {
                  if (self.config.static && self.calendarContainer.parentNode) {
                      var wrapper = self.calendarContainer.parentNode;
                      wrapper.lastChild && wrapper.removeChild(wrapper.lastChild);
                      if (wrapper.parentNode) {
                          while (wrapper.firstChild)
                              wrapper.parentNode.insertBefore(wrapper.firstChild, wrapper);
                          wrapper.parentNode.removeChild(wrapper);
                      }
                  }
                  else
                      self.calendarContainer.parentNode.removeChild(self.calendarContainer);
              }
              if (self.altInput) {
                  self.input.type = "text";
                  if (self.altInput.parentNode)
                      self.altInput.parentNode.removeChild(self.altInput);
                  delete self.altInput;
              }
              if (self.input) {
                  self.input.type = self.input._type;
                  self.input.classList.remove("flatpickr-input");
                  self.input.removeAttribute("readonly");
                  self.input.value = "";
              }
              [
                  "_showTimeInput",
                  "latestSelectedDateObj",
                  "_hideNextMonthArrow",
                  "_hidePrevMonthArrow",
                  "__hideNextMonthArrow",
                  "__hidePrevMonthArrow",
                  "isMobile",
                  "isOpen",
                  "selectedDateElem",
                  "minDateHasTime",
                  "maxDateHasTime",
                  "days",
                  "daysContainer",
                  "_input",
                  "_positionElement",
                  "innerContainer",
                  "rContainer",
                  "monthNav",
                  "todayDateElem",
                  "calendarContainer",
                  "weekdayContainer",
                  "prevMonthNav",
                  "nextMonthNav",
                  "monthsDropdownContainer",
                  "currentMonthElement",
                  "currentYearElement",
                  "navigationCurrentMonth",
                  "selectedDateElem",
                  "config",
              ].forEach(function (k) {
                  try {
                      delete self[k];
                  }
                  catch (_) { }
              });
          }
          function isCalendarElem(elem) {
              if (self.config.appendTo && self.config.appendTo.contains(elem))
                  return true;
              return self.calendarContainer.contains(elem);
          }
          function documentClick(e) {
              if (self.isOpen && !self.config.inline) {
                  var eventTarget_1 = getEventTarget(e);
                  var isCalendarElement = isCalendarElem(eventTarget_1);
                  var isInput = eventTarget_1 === self.input ||
                      eventTarget_1 === self.altInput ||
                      self.element.contains(eventTarget_1) ||
                      // web components
                      // e.path is not present in all browsers. circumventing typechecks
                      (e.path &&
                          e.path.indexOf &&
                          (~e.path.indexOf(self.input) ||
                              ~e.path.indexOf(self.altInput)));
                  var lostFocus = e.type === "blur"
                      ? isInput &&
                          e.relatedTarget &&
                          !isCalendarElem(e.relatedTarget)
                      : !isInput &&
                          !isCalendarElement &&
                          !isCalendarElem(e.relatedTarget);
                  var isIgnored = !self.config.ignoredFocusElements.some(function (elem) {
                      return elem.contains(eventTarget_1);
                  });
                  if (lostFocus && isIgnored) {
                      if (self.timeContainer !== undefined &&
                          self.minuteElement !== undefined &&
                          self.hourElement !== undefined) {
                          updateTime();
                      }
                      self.close();
                      if (self.config.mode === "range" && self.selectedDates.length === 1) {
                          self.clear(false);
                          self.redraw();
                      }
                  }
              }
          }
          function changeYear(newYear) {
              if (!newYear ||
                  (self.config.minDate && newYear < self.config.minDate.getFullYear()) ||
                  (self.config.maxDate && newYear > self.config.maxDate.getFullYear()))
                  return;
              var newYearNum = newYear, isNewYear = self.currentYear !== newYearNum;
              self.currentYear = newYearNum || self.currentYear;
              if (self.config.maxDate &&
                  self.currentYear === self.config.maxDate.getFullYear()) {
                  self.currentMonth = Math.min(self.config.maxDate.getMonth(), self.currentMonth);
              }
              else if (self.config.minDate &&
                  self.currentYear === self.config.minDate.getFullYear()) {
                  self.currentMonth = Math.max(self.config.minDate.getMonth(), self.currentMonth);
              }
              if (isNewYear) {
                  self.redraw();
                  triggerEvent("onYearChange");
                  buildMonthSwitch();
              }
          }
          function isEnabled(date, timeless) {
              if (timeless === void 0) { timeless = true; }
              var dateToCheck = self.parseDate(date, undefined, timeless); // timeless
              if ((self.config.minDate &&
                  dateToCheck &&
                  compareDates(dateToCheck, self.config.minDate, timeless !== undefined ? timeless : !self.minDateHasTime) < 0) ||
                  (self.config.maxDate &&
                      dateToCheck &&
                      compareDates(dateToCheck, self.config.maxDate, timeless !== undefined ? timeless : !self.maxDateHasTime) > 0))
                  return false;
              if (self.config.enable.length === 0 && self.config.disable.length === 0)
                  return true;
              if (dateToCheck === undefined)
                  return false;
              var bool = self.config.enable.length > 0, array = bool ? self.config.enable : self.config.disable;
              for (var i = 0, d = void 0; i < array.length; i++) {
                  d = array[i];
                  if (typeof d === "function" &&
                      d(dateToCheck) // disabled by function
                  )
                      return bool;
                  else if (d instanceof Date &&
                      dateToCheck !== undefined &&
                      d.getTime() === dateToCheck.getTime())
                      // disabled by date
                      return bool;
                  else if (typeof d === "string" && dateToCheck !== undefined) {
                      // disabled by date string
                      var parsed = self.parseDate(d, undefined, true);
                      return parsed && parsed.getTime() === dateToCheck.getTime()
                          ? bool
                          : !bool;
                  }
                  else if (
                  // disabled by range
                  typeof d === "object" &&
                      dateToCheck !== undefined &&
                      d.from &&
                      d.to &&
                      dateToCheck.getTime() >= d.from.getTime() &&
                      dateToCheck.getTime() <= d.to.getTime())
                      return bool;
              }
              return !bool;
          }
          function isInView(elem) {
              if (self.daysContainer !== undefined)
                  return (elem.className.indexOf("hidden") === -1 &&
                      self.daysContainer.contains(elem));
              return false;
          }
          function onKeyDown(e) {
              // e.key                      e.keyCode
              // "Backspace"                        8
              // "Tab"                              9
              // "Enter"                           13
              // "Escape"     (IE "Esc")           27
              // "ArrowLeft"  (IE "Left")          37
              // "ArrowUp"    (IE "Up")            38
              // "ArrowRight" (IE "Right")         39
              // "ArrowDown"  (IE "Down")          40
              // "Delete"     (IE "Del")           46
              var isInput = e.target === self._input;
              var allowInput = self.config.allowInput;
              var allowKeydown = self.isOpen && (!allowInput || !isInput);
              var allowInlineKeydown = self.config.inline && isInput && !allowInput;
              if (e.keyCode === 13 && isInput) {
                  if (allowInput) {
                      self.setDate(self._input.value, true, e.target === self.altInput
                          ? self.config.altFormat
                          : self.config.dateFormat);
                      return e.target.blur();
                  }
                  else {
                      self.open();
                  }
              }
              else if (isCalendarElem(e.target) ||
                  allowKeydown ||
                  allowInlineKeydown) {
                  var isTimeObj = !!self.timeContainer &&
                      self.timeContainer.contains(e.target);
                  switch (e.keyCode) {
                      case 13:
                          if (isTimeObj) {
                              e.preventDefault();
                              updateTime();
                              focusAndClose();
                          }
                          else
                              selectDate(e);
                          break;
                      case 27: // escape
                          e.preventDefault();
                          focusAndClose();
                          break;
                      case 8:
                      case 46:
                          if (isInput && !self.config.allowInput) {
                              e.preventDefault();
                              self.clear();
                          }
                          break;
                      case 37:
                      case 39:
                          if (!isTimeObj && !isInput) {
                              e.preventDefault();
                              if (self.daysContainer !== undefined &&
                                  (allowInput === false ||
                                      (document.activeElement && isInView(document.activeElement)))) {
                                  var delta_1 = e.keyCode === 39 ? 1 : -1;
                                  if (!e.ctrlKey)
                                      focusOnDay(undefined, delta_1);
                                  else {
                                      e.stopPropagation();
                                      changeMonth(delta_1);
                                      focusOnDay(getFirstAvailableDay(1), 0);
                                  }
                              }
                          }
                          else if (self.hourElement)
                              self.hourElement.focus();
                          break;
                      case 38:
                      case 40:
                          e.preventDefault();
                          var delta = e.keyCode === 40 ? 1 : -1;
                          if ((self.daysContainer && e.target.$i !== undefined) ||
                              e.target === self.input ||
                              e.target === self.altInput) {
                              if (e.ctrlKey) {
                                  e.stopPropagation();
                                  changeYear(self.currentYear - delta);
                                  focusOnDay(getFirstAvailableDay(1), 0);
                              }
                              else if (!isTimeObj)
                                  focusOnDay(undefined, delta * 7);
                          }
                          else if (e.target === self.currentYearElement) {
                              changeYear(self.currentYear - delta);
                          }
                          else if (self.config.enableTime) {
                              if (!isTimeObj && self.hourElement)
                                  self.hourElement.focus();
                              updateTime(e);
                              self._debouncedChange();
                          }
                          break;
                      case 9:
                          if (isTimeObj) {
                              var elems = [
                                  self.hourElement,
                                  self.minuteElement,
                                  self.secondElement,
                                  self.amPM,
                              ]
                                  .concat(self.pluginElements)
                                  .filter(function (x) { return x; });
                              var i = elems.indexOf(e.target);
                              if (i !== -1) {
                                  var target = elems[i + (e.shiftKey ? -1 : 1)];
                                  e.preventDefault();
                                  (target || self._input).focus();
                              }
                          }
                          else if (!self.config.noCalendar &&
                              self.daysContainer &&
                              self.daysContainer.contains(e.target) &&
                              e.shiftKey) {
                              e.preventDefault();
                              self._input.focus();
                          }
                          break;
                  }
              }
              if (self.amPM !== undefined && e.target === self.amPM) {
                  switch (e.key) {
                      case self.l10n.amPM[0].charAt(0):
                      case self.l10n.amPM[0].charAt(0).toLowerCase():
                          self.amPM.textContent = self.l10n.amPM[0];
                          setHoursFromInputs();
                          updateValue();
                          break;
                      case self.l10n.amPM[1].charAt(0):
                      case self.l10n.amPM[1].charAt(0).toLowerCase():
                          self.amPM.textContent = self.l10n.amPM[1];
                          setHoursFromInputs();
                          updateValue();
                          break;
                  }
              }
              if (isInput || isCalendarElem(e.target)) {
                  triggerEvent("onKeyDown", e);
              }
          }
          function onMouseOver(elem) {
              if (self.selectedDates.length !== 1 ||
                  (elem &&
                      (!elem.classList.contains("flatpickr-day") ||
                          elem.classList.contains("flatpickr-disabled"))))
                  return;
              var hoverDate = elem
                  ? elem.dateObj.getTime()
                  : self.days.firstElementChild.dateObj.getTime(), initialDate = self.parseDate(self.selectedDates[0], undefined, true).getTime(), rangeStartDate = Math.min(hoverDate, self.selectedDates[0].getTime()), rangeEndDate = Math.max(hoverDate, self.selectedDates[0].getTime());
              var containsDisabled = false;
              var minRange = 0, maxRange = 0;
              for (var t = rangeStartDate; t < rangeEndDate; t += duration.DAY) {
                  if (!isEnabled(new Date(t), true)) {
                      containsDisabled =
                          containsDisabled || (t > rangeStartDate && t < rangeEndDate);
                      if (t < initialDate && (!minRange || t > minRange))
                          minRange = t;
                      else if (t > initialDate && (!maxRange || t < maxRange))
                          maxRange = t;
                  }
              }
              for (var m = 0; m < self.config.showMonths; m++) {
                  var month = self.daysContainer.children[m];
                  var _loop_1 = function (i, l) {
                      var dayElem = month.children[i], date = dayElem.dateObj;
                      var timestamp = date.getTime();
                      var outOfRange = (minRange > 0 && timestamp < minRange) ||
                          (maxRange > 0 && timestamp > maxRange);
                      if (outOfRange) {
                          dayElem.classList.add("notAllowed");
                          ["inRange", "startRange", "endRange"].forEach(function (c) {
                              dayElem.classList.remove(c);
                          });
                          return "continue";
                      }
                      else if (containsDisabled && !outOfRange)
                          return "continue";
                      ["startRange", "inRange", "endRange", "notAllowed"].forEach(function (c) {
                          dayElem.classList.remove(c);
                      });
                      if (elem !== undefined) {
                          elem.classList.add(hoverDate <= self.selectedDates[0].getTime()
                              ? "startRange"
                              : "endRange");
                          if (initialDate < hoverDate && timestamp === initialDate)
                              dayElem.classList.add("startRange");
                          else if (initialDate > hoverDate && timestamp === initialDate)
                              dayElem.classList.add("endRange");
                          if (timestamp >= minRange &&
                              (maxRange === 0 || timestamp <= maxRange) &&
                              isBetween(timestamp, initialDate, hoverDate))
                              dayElem.classList.add("inRange");
                      }
                  };
                  for (var i = 0, l = month.children.length; i < l; i++) {
                      _loop_1(i, l);
                  }
              }
          }
          function onResize() {
              if (self.isOpen && !self.config.static && !self.config.inline)
                  positionCalendar();
          }
          function setDefaultTime() {
              self.setDate(self.config.minDate !== undefined
                  ? new Date(self.config.minDate.getTime())
                  : new Date(), true);
              setDefaultHours();
              updateValue();
          }
          function open(e, positionElement) {
              if (positionElement === void 0) { positionElement = self._positionElement; }
              if (self.isMobile === true) {
                  if (e) {
                      e.preventDefault();
                      e.target && e.target.blur();
                  }
                  if (self.mobileInput !== undefined) {
                      self.mobileInput.focus();
                      self.mobileInput.click();
                  }
                  triggerEvent("onOpen");
                  return;
              }
              if (self._input.disabled || self.config.inline)
                  return;
              var wasOpen = self.isOpen;
              self.isOpen = true;
              if (!wasOpen) {
                  self.calendarContainer.classList.add("open");
                  self._input.classList.add("active");
                  triggerEvent("onOpen");
                  positionCalendar(positionElement);
              }
              if (self.config.enableTime === true && self.config.noCalendar === true) {
                  if (self.selectedDates.length === 0) {
                      setDefaultTime();
                  }
                  if (self.config.allowInput === false &&
                      (e === undefined ||
                          !self.timeContainer.contains(e.relatedTarget))) {
                      setTimeout(function () { return self.hourElement.select(); }, 50);
                  }
              }
          }
          function minMaxDateSetter(type) {
              return function (date) {
                  var dateObj = (self.config["_" + type + "Date"] = self.parseDate(date, self.config.dateFormat));
                  var inverseDateObj = self.config["_" + (type === "min" ? "max" : "min") + "Date"];
                  if (dateObj !== undefined) {
                      self[type === "min" ? "minDateHasTime" : "maxDateHasTime"] =
                          dateObj.getHours() > 0 ||
                              dateObj.getMinutes() > 0 ||
                              dateObj.getSeconds() > 0;
                  }
                  if (self.selectedDates) {
                      self.selectedDates = self.selectedDates.filter(function (d) { return isEnabled(d); });
                      if (!self.selectedDates.length && type === "min")
                          setHoursFromDate(dateObj);
                      updateValue();
                  }
                  if (self.daysContainer) {
                      redraw();
                      if (dateObj !== undefined)
                          self.currentYearElement[type] = dateObj.getFullYear().toString();
                      else
                          self.currentYearElement.removeAttribute(type);
                      self.currentYearElement.disabled =
                          !!inverseDateObj &&
                              dateObj !== undefined &&
                              inverseDateObj.getFullYear() === dateObj.getFullYear();
                  }
              };
          }
          function parseConfig() {
              var boolOpts = [
                  "wrap",
                  "weekNumbers",
                  "allowInput",
                  "clickOpens",
                  "time_24hr",
                  "enableTime",
                  "noCalendar",
                  "altInput",
                  "shorthandCurrentMonth",
                  "inline",
                  "static",
                  "enableSeconds",
                  "disableMobile",
              ];
              var userConfig = __assign({}, instanceConfig, JSON.parse(JSON.stringify(element.dataset || {})));
              var formats = {};
              self.config.parseDate = userConfig.parseDate;
              self.config.formatDate = userConfig.formatDate;
              Object.defineProperty(self.config, "enable", {
                  get: function () { return self.config._enable; },
                  set: function (dates) {
                      self.config._enable = parseDateRules(dates);
                  }
              });
              Object.defineProperty(self.config, "disable", {
                  get: function () { return self.config._disable; },
                  set: function (dates) {
                      self.config._disable = parseDateRules(dates);
                  }
              });
              var timeMode = userConfig.mode === "time";
              if (!userConfig.dateFormat && (userConfig.enableTime || timeMode)) {
                  var defaultDateFormat = flatpickr.defaultConfig.dateFormat || defaults.dateFormat;
                  formats.dateFormat =
                      userConfig.noCalendar || timeMode
                          ? "H:i" + (userConfig.enableSeconds ? ":S" : "")
                          : defaultDateFormat + " H:i" + (userConfig.enableSeconds ? ":S" : "");
              }
              if (userConfig.altInput &&
                  (userConfig.enableTime || timeMode) &&
                  !userConfig.altFormat) {
                  var defaultAltFormat = flatpickr.defaultConfig.altFormat || defaults.altFormat;
                  formats.altFormat =
                      userConfig.noCalendar || timeMode
                          ? "h:i" + (userConfig.enableSeconds ? ":S K" : " K")
                          : defaultAltFormat + (" h:i" + (userConfig.enableSeconds ? ":S" : "") + " K");
              }
              if (!userConfig.altInputClass) {
                  self.config.altInputClass =
                      self.input.className + " " + self.config.altInputClass;
              }
              Object.defineProperty(self.config, "minDate", {
                  get: function () { return self.config._minDate; },
                  set: minMaxDateSetter("min")
              });
              Object.defineProperty(self.config, "maxDate", {
                  get: function () { return self.config._maxDate; },
                  set: minMaxDateSetter("max")
              });
              var minMaxTimeSetter = function (type) { return function (val) {
                  self.config[type === "min" ? "_minTime" : "_maxTime"] = self.parseDate(val, "H:i:S");
              }; };
              Object.defineProperty(self.config, "minTime", {
                  get: function () { return self.config._minTime; },
                  set: minMaxTimeSetter("min")
              });
              Object.defineProperty(self.config, "maxTime", {
                  get: function () { return self.config._maxTime; },
                  set: minMaxTimeSetter("max")
              });
              if (userConfig.mode === "time") {
                  self.config.noCalendar = true;
                  self.config.enableTime = true;
              }
              Object.assign(self.config, formats, userConfig);
              for (var i = 0; i < boolOpts.length; i++)
                  self.config[boolOpts[i]] =
                      self.config[boolOpts[i]] === true ||
                          self.config[boolOpts[i]] === "true";
              HOOKS.filter(function (hook) { return self.config[hook] !== undefined; }).forEach(function (hook) {
                  self.config[hook] = arrayify(self.config[hook] || []).map(bindToInstance);
              });
              self.isMobile =
                  !self.config.disableMobile &&
                      !self.config.inline &&
                      self.config.mode === "single" &&
                      !self.config.disable.length &&
                      !self.config.enable.length &&
                      !self.config.weekNumbers &&
                      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
              for (var i = 0; i < self.config.plugins.length; i++) {
                  var pluginConf = self.config.plugins[i](self) || {};
                  for (var key in pluginConf) {
                      if (HOOKS.indexOf(key) > -1) {
                          self.config[key] = arrayify(pluginConf[key])
                              .map(bindToInstance)
                              .concat(self.config[key]);
                      }
                      else if (typeof userConfig[key] === "undefined")
                          self.config[key] = pluginConf[key];
                  }
              }
              triggerEvent("onParseConfig");
          }
          function setupLocale() {
              if (typeof self.config.locale !== "object" &&
                  typeof flatpickr.l10ns[self.config.locale] === "undefined")
                  self.config.errorHandler(new Error("flatpickr: invalid locale " + self.config.locale));
              self.l10n = __assign({}, flatpickr.l10ns["default"], (typeof self.config.locale === "object"
                  ? self.config.locale
                  : self.config.locale !== "default"
                      ? flatpickr.l10ns[self.config.locale]
                      : undefined));
              tokenRegex.K = "(" + self.l10n.amPM[0] + "|" + self.l10n.amPM[1] + "|" + self.l10n.amPM[0].toLowerCase() + "|" + self.l10n.amPM[1].toLowerCase() + ")";
              var userConfig = __assign({}, instanceConfig, JSON.parse(JSON.stringify(element.dataset || {})));
              if (userConfig.time_24hr === undefined &&
                  flatpickr.defaultConfig.time_24hr === undefined) {
                  self.config.time_24hr = self.l10n.time_24hr;
              }
              self.formatDate = createDateFormatter(self);
              self.parseDate = createDateParser({ config: self.config, l10n: self.l10n });
          }
          function positionCalendar(customPositionElement) {
              if (self.calendarContainer === undefined)
                  return;
              triggerEvent("onPreCalendarPosition");
              var positionElement = customPositionElement || self._positionElement;
              var calendarHeight = Array.prototype.reduce.call(self.calendarContainer.children, (function (acc, child) { return acc + child.offsetHeight; }), 0), calendarWidth = self.calendarContainer.offsetWidth, configPos = self.config.position.split(" "), configPosVertical = configPos[0], configPosHorizontal = configPos.length > 1 ? configPos[1] : null, inputBounds = positionElement.getBoundingClientRect(), distanceFromBottom = window.innerHeight - inputBounds.bottom, showOnTop = configPosVertical === "above" ||
                  (configPosVertical !== "below" &&
                      distanceFromBottom < calendarHeight &&
                      inputBounds.top > calendarHeight);
              var top = window.pageYOffset +
                  inputBounds.top +
                  (!showOnTop ? positionElement.offsetHeight + 2 : -calendarHeight - 2);
              toggleClass(self.calendarContainer, "arrowTop", !showOnTop);
              toggleClass(self.calendarContainer, "arrowBottom", showOnTop);
              if (self.config.inline)
                  return;
              var left = window.pageXOffset +
                  inputBounds.left -
                  (configPosHorizontal != null && configPosHorizontal === "center"
                      ? (calendarWidth - inputBounds.width) / 2
                      : 0);
              var right = window.document.body.offsetWidth - (window.pageXOffset + inputBounds.right);
              var rightMost = left + calendarWidth > window.document.body.offsetWidth;
              var centerMost = right + calendarWidth > window.document.body.offsetWidth;
              toggleClass(self.calendarContainer, "rightMost", rightMost);
              if (self.config.static)
                  return;
              self.calendarContainer.style.top = top + "px";
              if (!rightMost) {
                  self.calendarContainer.style.left = left + "px";
                  self.calendarContainer.style.right = "auto";
              }
              else if (!centerMost) {
                  self.calendarContainer.style.left = "auto";
                  self.calendarContainer.style.right = right + "px";
              }
              else {
                  var doc = document.styleSheets[0];
                  // some testing environments don't have css support
                  if (doc === undefined)
                      return;
                  var bodyWidth = window.document.body.offsetWidth;
                  var centerLeft = Math.max(0, bodyWidth / 2 - calendarWidth / 2);
                  var centerBefore = ".flatpickr-calendar.centerMost:before";
                  var centerAfter = ".flatpickr-calendar.centerMost:after";
                  var centerIndex = doc.cssRules.length;
                  var centerStyle = "{left:" + inputBounds.left + "px;right:auto;}";
                  toggleClass(self.calendarContainer, "rightMost", false);
                  toggleClass(self.calendarContainer, "centerMost", true);
                  doc.insertRule(centerBefore + "," + centerAfter + centerStyle, centerIndex);
                  self.calendarContainer.style.left = centerLeft + "px";
                  self.calendarContainer.style.right = "auto";
              }
          }
          function redraw() {
              if (self.config.noCalendar || self.isMobile)
                  return;
              updateNavigationCurrentMonth();
              buildDays();
          }
          function focusAndClose() {
              self._input.focus();
              if (window.navigator.userAgent.indexOf("MSIE") !== -1 ||
                  navigator.msMaxTouchPoints !== undefined) {
                  // hack - bugs in the way IE handles focus keeps the calendar open
                  setTimeout(self.close, 0);
              }
              else {
                  self.close();
              }
          }
          function selectDate(e) {
              e.preventDefault();
              e.stopPropagation();
              var isSelectable = function (day) {
                  return day.classList &&
                      day.classList.contains("flatpickr-day") &&
                      !day.classList.contains("flatpickr-disabled") &&
                      !day.classList.contains("notAllowed");
              };
              var t = findParent(e.target, isSelectable);
              if (t === undefined)
                  return;
              var target = t;
              var selectedDate = (self.latestSelectedDateObj = new Date(target.dateObj.getTime()));
              var shouldChangeMonth = (selectedDate.getMonth() < self.currentMonth ||
                  selectedDate.getMonth() >
                      self.currentMonth + self.config.showMonths - 1) &&
                  self.config.mode !== "range";
              self.selectedDateElem = target;
              if (self.config.mode === "single")
                  self.selectedDates = [selectedDate];
              else if (self.config.mode === "multiple") {
                  var selectedIndex = isDateSelected(selectedDate);
                  if (selectedIndex)
                      self.selectedDates.splice(parseInt(selectedIndex), 1);
                  else
                      self.selectedDates.push(selectedDate);
              }
              else if (self.config.mode === "range") {
                  if (self.selectedDates.length === 2) {
                      self.clear(false, false);
                  }
                  self.latestSelectedDateObj = selectedDate;
                  self.selectedDates.push(selectedDate);
                  // unless selecting same date twice, sort ascendingly
                  if (compareDates(selectedDate, self.selectedDates[0], true) !== 0)
                      self.selectedDates.sort(function (a, b) { return a.getTime() - b.getTime(); });
              }
              setHoursFromInputs();
              if (shouldChangeMonth) {
                  var isNewYear = self.currentYear !== selectedDate.getFullYear();
                  self.currentYear = selectedDate.getFullYear();
                  self.currentMonth = selectedDate.getMonth();
                  if (isNewYear) {
                      triggerEvent("onYearChange");
                      buildMonthSwitch();
                  }
                  triggerEvent("onMonthChange");
              }
              updateNavigationCurrentMonth();
              buildDays();
              updateValue();
              if (self.config.enableTime)
                  setTimeout(function () { return (self.showTimeInput = true); }, 50);
              // maintain focus
              if (!shouldChangeMonth &&
                  self.config.mode !== "range" &&
                  self.config.showMonths === 1)
                  focusOnDayElem(target);
              else if (self.selectedDateElem !== undefined &&
                  self.hourElement === undefined) {
                  self.selectedDateElem && self.selectedDateElem.focus();
              }
              if (self.hourElement !== undefined)
                  self.hourElement !== undefined && self.hourElement.focus();
              if (self.config.closeOnSelect) {
                  var single = self.config.mode === "single" && !self.config.enableTime;
                  var range = self.config.mode === "range" &&
                      self.selectedDates.length === 2 &&
                      !self.config.enableTime;
                  if (single || range) {
                      focusAndClose();
                  }
              }
              triggerChange();
          }
          var CALLBACKS = {
              locale: [setupLocale, updateWeekdays],
              showMonths: [buildMonths, setCalendarWidth, buildWeekdays],
              minDate: [jumpToDate],
              maxDate: [jumpToDate]
          };
          function set(option, value) {
              if (option !== null && typeof option === "object") {
                  Object.assign(self.config, option);
                  for (var key in option) {
                      if (CALLBACKS[key] !== undefined)
                          CALLBACKS[key].forEach(function (x) { return x(); });
                  }
              }
              else {
                  self.config[option] = value;
                  if (CALLBACKS[option] !== undefined)
                      CALLBACKS[option].forEach(function (x) { return x(); });
                  else if (HOOKS.indexOf(option) > -1)
                      self.config[option] = arrayify(value);
              }
              self.redraw();
              updateValue(false);
          }
          function setSelectedDate(inputDate, format) {
              var dates = [];
              if (inputDate instanceof Array)
                  dates = inputDate.map(function (d) { return self.parseDate(d, format); });
              else if (inputDate instanceof Date || typeof inputDate === "number")
                  dates = [self.parseDate(inputDate, format)];
              else if (typeof inputDate === "string") {
                  switch (self.config.mode) {
                      case "single":
                      case "time":
                          dates = [self.parseDate(inputDate, format)];
                          break;
                      case "multiple":
                          dates = inputDate
                              .split(self.config.conjunction)
                              .map(function (date) { return self.parseDate(date, format); });
                          break;
                      case "range":
                          dates = inputDate
                              .split(self.l10n.rangeSeparator)
                              .map(function (date) { return self.parseDate(date, format); });
                          break;
                  }
              }
              else
                  self.config.errorHandler(new Error("Invalid date supplied: " + JSON.stringify(inputDate)));
              self.selectedDates = dates.filter(function (d) { return d instanceof Date && isEnabled(d, false); });
              if (self.config.mode === "range")
                  self.selectedDates.sort(function (a, b) { return a.getTime() - b.getTime(); });
          }
          function setDate(date, triggerChange, format) {
              if (triggerChange === void 0) { triggerChange = false; }
              if (format === void 0) { format = self.config.dateFormat; }
              if ((date !== 0 && !date) || (date instanceof Array && date.length === 0))
                  return self.clear(triggerChange);
              setSelectedDate(date, format);
              self.showTimeInput = self.selectedDates.length > 0;
              self.latestSelectedDateObj =
                  self.selectedDates[self.selectedDates.length - 1];
              self.redraw();
              jumpToDate();
              setHoursFromDate();
              if (self.selectedDates.length === 0) {
                  self.clear(false);
              }
              updateValue(triggerChange);
              if (triggerChange)
                  triggerEvent("onChange");
          }
          function parseDateRules(arr) {
              return arr
                  .slice()
                  .map(function (rule) {
                  if (typeof rule === "string" ||
                      typeof rule === "number" ||
                      rule instanceof Date) {
                      return self.parseDate(rule, undefined, true);
                  }
                  else if (rule &&
                      typeof rule === "object" &&
                      rule.from &&
                      rule.to)
                      return {
                          from: self.parseDate(rule.from, undefined),
                          to: self.parseDate(rule.to, undefined)
                      };
                  return rule;
              })
                  .filter(function (x) { return x; }); // remove falsy values
          }
          function setupDates() {
              self.selectedDates = [];
              self.now = self.parseDate(self.config.now) || new Date();
              // Workaround IE11 setting placeholder as the input's value
              var preloadedDate = self.config.defaultDate ||
                  ((self.input.nodeName === "INPUT" ||
                      self.input.nodeName === "TEXTAREA") &&
                      self.input.placeholder &&
                      self.input.value === self.input.placeholder
                      ? null
                      : self.input.value);
              if (preloadedDate)
                  setSelectedDate(preloadedDate, self.config.dateFormat);
              self._initialDate =
                  self.selectedDates.length > 0
                      ? self.selectedDates[0]
                      : self.config.minDate &&
                          self.config.minDate.getTime() > self.now.getTime()
                          ? self.config.minDate
                          : self.config.maxDate &&
                              self.config.maxDate.getTime() < self.now.getTime()
                              ? self.config.maxDate
                              : self.now;
              self.currentYear = self._initialDate.getFullYear();
              self.currentMonth = self._initialDate.getMonth();
              if (self.selectedDates.length > 0)
                  self.latestSelectedDateObj = self.selectedDates[0];
              if (self.config.minTime !== undefined)
                  self.config.minTime = self.parseDate(self.config.minTime, "H:i");
              if (self.config.maxTime !== undefined)
                  self.config.maxTime = self.parseDate(self.config.maxTime, "H:i");
              self.minDateHasTime =
                  !!self.config.minDate &&
                      (self.config.minDate.getHours() > 0 ||
                          self.config.minDate.getMinutes() > 0 ||
                          self.config.minDate.getSeconds() > 0);
              self.maxDateHasTime =
                  !!self.config.maxDate &&
                      (self.config.maxDate.getHours() > 0 ||
                          self.config.maxDate.getMinutes() > 0 ||
                          self.config.maxDate.getSeconds() > 0);
              Object.defineProperty(self, "showTimeInput", {
                  get: function () { return self._showTimeInput; },
                  set: function (bool) {
                      self._showTimeInput = bool;
                      if (self.calendarContainer)
                          toggleClass(self.calendarContainer, "showTimeInput", bool);
                      self.isOpen && positionCalendar();
                  }
              });
          }
          function setupInputs() {
              self.input = self.config.wrap
                  ? element.querySelector("[data-input]")
                  : element;
              /* istanbul ignore next */
              if (!self.input) {
                  self.config.errorHandler(new Error("Invalid input element specified"));
                  return;
              }
              // hack: store previous type to restore it after destroy()
              self.input._type = self.input.type;
              self.input.type = "text";
              self.input.classList.add("flatpickr-input");
              self._input = self.input;
              if (self.config.altInput) {
                  // replicate self.element
                  self.altInput = createElement(self.input.nodeName, self.config.altInputClass);
                  self._input = self.altInput;
                  self.altInput.placeholder = self.input.placeholder;
                  self.altInput.disabled = self.input.disabled;
                  self.altInput.required = self.input.required;
                  self.altInput.tabIndex = self.input.tabIndex;
                  self.altInput.type = "text";
                  self.input.setAttribute("type", "hidden");
                  if (!self.config.static && self.input.parentNode)
                      self.input.parentNode.insertBefore(self.altInput, self.input.nextSibling);
              }
              if (!self.config.allowInput)
                  self._input.setAttribute("readonly", "readonly");
              self._positionElement = self.config.positionElement || self._input;
          }
          function setupMobile() {
              var inputType = self.config.enableTime
                  ? self.config.noCalendar
                      ? "time"
                      : "datetime-local"
                  : "date";
              self.mobileInput = createElement("input", self.input.className + " flatpickr-mobile");
              self.mobileInput.step = self.input.getAttribute("step") || "any";
              self.mobileInput.tabIndex = 1;
              self.mobileInput.type = inputType;
              self.mobileInput.disabled = self.input.disabled;
              self.mobileInput.required = self.input.required;
              self.mobileInput.placeholder = self.input.placeholder;
              self.mobileFormatStr =
                  inputType === "datetime-local"
                      ? "Y-m-d\\TH:i:S"
                      : inputType === "date"
                          ? "Y-m-d"
                          : "H:i:S";
              if (self.selectedDates.length > 0) {
                  self.mobileInput.defaultValue = self.mobileInput.value = self.formatDate(self.selectedDates[0], self.mobileFormatStr);
              }
              if (self.config.minDate)
                  self.mobileInput.min = self.formatDate(self.config.minDate, "Y-m-d");
              if (self.config.maxDate)
                  self.mobileInput.max = self.formatDate(self.config.maxDate, "Y-m-d");
              self.input.type = "hidden";
              if (self.altInput !== undefined)
                  self.altInput.type = "hidden";
              try {
                  if (self.input.parentNode)
                      self.input.parentNode.insertBefore(self.mobileInput, self.input.nextSibling);
              }
              catch (_a) { }
              bind(self.mobileInput, "change", function (e) {
                  self.setDate(e.target.value, false, self.mobileFormatStr);
                  triggerEvent("onChange");
                  triggerEvent("onClose");
              });
          }
          function toggle(e) {
              if (self.isOpen === true)
                  return self.close();
              self.open(e);
          }
          function triggerEvent(event, data) {
              // If the instance has been destroyed already, all hooks have been removed
              if (self.config === undefined)
                  return;
              var hooks = self.config[event];
              if (hooks !== undefined && hooks.length > 0) {
                  for (var i = 0; hooks[i] && i < hooks.length; i++)
                      hooks[i](self.selectedDates, self.input.value, self, data);
              }
              if (event === "onChange") {
                  self.input.dispatchEvent(createEvent("change"));
                  // many front-end frameworks bind to the input event
                  self.input.dispatchEvent(createEvent("input"));
              }
          }
          function createEvent(name) {
              var e = document.createEvent("Event");
              e.initEvent(name, true, true);
              return e;
          }
          function isDateSelected(date) {
              for (var i = 0; i < self.selectedDates.length; i++) {
                  if (compareDates(self.selectedDates[i], date) === 0)
                      return "" + i;
              }
              return false;
          }
          function isDateInRange(date) {
              if (self.config.mode !== "range" || self.selectedDates.length < 2)
                  return false;
              return (compareDates(date, self.selectedDates[0]) >= 0 &&
                  compareDates(date, self.selectedDates[1]) <= 0);
          }
          function updateNavigationCurrentMonth() {
              if (self.config.noCalendar || self.isMobile || !self.monthNav)
                  return;
              self.yearElements.forEach(function (yearElement, i) {
                  var d = new Date(self.currentYear, self.currentMonth, 1);
                  d.setMonth(self.currentMonth + i);
                  if (self.config.showMonths > 1 ||
                      self.config.monthSelectorType === "static") {
                      self.monthElements[i].textContent =
                          monthToStr(d.getMonth(), self.config.shorthandCurrentMonth, self.l10n) + " ";
                  }
                  else {
                      self.monthsDropdownContainer.value = d.getMonth().toString();
                  }
                  yearElement.value = d.getFullYear().toString();
              });
              self._hidePrevMonthArrow =
                  self.config.minDate !== undefined &&
                      (self.currentYear === self.config.minDate.getFullYear()
                          ? self.currentMonth <= self.config.minDate.getMonth()
                          : self.currentYear < self.config.minDate.getFullYear());
              self._hideNextMonthArrow =
                  self.config.maxDate !== undefined &&
                      (self.currentYear === self.config.maxDate.getFullYear()
                          ? self.currentMonth + 1 > self.config.maxDate.getMonth()
                          : self.currentYear > self.config.maxDate.getFullYear());
          }
          function getDateStr(format) {
              return self.selectedDates
                  .map(function (dObj) { return self.formatDate(dObj, format); })
                  .filter(function (d, i, arr) {
                  return self.config.mode !== "range" ||
                      self.config.enableTime ||
                      arr.indexOf(d) === i;
              })
                  .join(self.config.mode !== "range"
                  ? self.config.conjunction
                  : self.l10n.rangeSeparator);
          }
          /**
           * Updates the values of inputs associated with the calendar
           */
          function updateValue(triggerChange) {
              if (triggerChange === void 0) { triggerChange = true; }
              if (self.mobileInput !== undefined && self.mobileFormatStr) {
                  self.mobileInput.value =
                      self.latestSelectedDateObj !== undefined
                          ? self.formatDate(self.latestSelectedDateObj, self.mobileFormatStr)
                          : "";
              }
              self.input.value = getDateStr(self.config.dateFormat);
              if (self.altInput !== undefined) {
                  self.altInput.value = getDateStr(self.config.altFormat);
              }
              if (triggerChange !== false)
                  triggerEvent("onValueUpdate");
          }
          function onMonthNavClick(e) {
              var isPrevMonth = self.prevMonthNav.contains(e.target);
              var isNextMonth = self.nextMonthNav.contains(e.target);
              if (isPrevMonth || isNextMonth) {
                  changeMonth(isPrevMonth ? -1 : 1);
              }
              else if (self.yearElements.indexOf(e.target) >= 0) {
                  e.target.select();
              }
              else if (e.target.classList.contains("arrowUp")) {
                  self.changeYear(self.currentYear + 1);
              }
              else if (e.target.classList.contains("arrowDown")) {
                  self.changeYear(self.currentYear - 1);
              }
          }
          function timeWrapper(e) {
              e.preventDefault();
              var isKeyDown = e.type === "keydown", input = e.target;
              if (self.amPM !== undefined && e.target === self.amPM) {
                  self.amPM.textContent =
                      self.l10n.amPM[int(self.amPM.textContent === self.l10n.amPM[0])];
              }
              var min = parseFloat(input.getAttribute("min")), max = parseFloat(input.getAttribute("max")), step = parseFloat(input.getAttribute("step")), curValue = parseInt(input.value, 10), delta = e.delta ||
                  (isKeyDown ? (e.which === 38 ? 1 : -1) : 0);
              var newValue = curValue + step * delta;
              if (typeof input.value !== "undefined" && input.value.length === 2) {
                  var isHourElem = input === self.hourElement, isMinuteElem = input === self.minuteElement;
                  if (newValue < min) {
                      newValue =
                          max +
                              newValue +
                              int(!isHourElem) +
                              (int(isHourElem) && int(!self.amPM));
                      if (isMinuteElem)
                          incrementNumInput(undefined, -1, self.hourElement);
                  }
                  else if (newValue > max) {
                      newValue =
                          input === self.hourElement ? newValue - max - int(!self.amPM) : min;
                      if (isMinuteElem)
                          incrementNumInput(undefined, 1, self.hourElement);
                  }
                  if (self.amPM &&
                      isHourElem &&
                      (step === 1
                          ? newValue + curValue === 23
                          : Math.abs(newValue - curValue) > step)) {
                      self.amPM.textContent =
                          self.l10n.amPM[int(self.amPM.textContent === self.l10n.amPM[0])];
                  }
                  input.value = pad(newValue);
              }
          }
          init();
          return self;
      }
      /* istanbul ignore next */
      function _flatpickr(nodeList, config) {
          // static list
          var nodes = Array.prototype.slice
              .call(nodeList)
              .filter(function (x) { return x instanceof HTMLElement; });
          var instances = [];
          for (var i = 0; i < nodes.length; i++) {
              var node = nodes[i];
              try {
                  if (node.getAttribute("data-fp-omit") !== null)
                      continue;
                  if (node._flatpickr !== undefined) {
                      node._flatpickr.destroy();
                      node._flatpickr = undefined;
                  }
                  node._flatpickr = FlatpickrInstance(node, config || {});
                  instances.push(node._flatpickr);
              }
              catch (e) {
                  console.error(e);
              }
          }
          return instances.length === 1 ? instances[0] : instances;
      }
      /* istanbul ignore next */
      if (typeof HTMLElement !== "undefined" &&
          typeof HTMLCollection !== "undefined" &&
          typeof NodeList !== "undefined") {
          // browser env
          HTMLCollection.prototype.flatpickr = NodeList.prototype.flatpickr = function (config) {
              return _flatpickr(this, config);
          };
          HTMLElement.prototype.flatpickr = function (config) {
              return _flatpickr([this], config);
          };
      }
      /* istanbul ignore next */
      var flatpickr = function (selector, config) {
          if (typeof selector === "string") {
              return _flatpickr(window.document.querySelectorAll(selector), config);
          }
          else if (selector instanceof Node) {
              return _flatpickr([selector], config);
          }
          else {
              return _flatpickr(selector, config);
          }
      };
      /* istanbul ignore next */
      flatpickr.defaultConfig = {};
      flatpickr.l10ns = {
          en: __assign({}, english),
          "default": __assign({}, english)
      };
      flatpickr.localize = function (l10n) {
          flatpickr.l10ns["default"] = __assign({}, flatpickr.l10ns["default"], l10n);
      };
      flatpickr.setDefaults = function (config) {
          flatpickr.defaultConfig = __assign({}, flatpickr.defaultConfig, config);
      };
      flatpickr.parseDate = createDateParser({});
      flatpickr.formatDate = createDateFormatter({});
      flatpickr.compareDates = compareDates;
      /* istanbul ignore next */
      if (typeof jQuery !== "undefined" && typeof jQuery.fn !== "undefined") {
          jQuery.fn.flatpickr = function (config) {
              return _flatpickr(this, config);
          };
      }
      // eslint-disable-next-line @typescript-eslint/camelcase
      Date.prototype.fp_incr = function (days) {
          return new Date(this.getFullYear(), this.getMonth(), this.getDate() + (typeof days === "string" ? parseInt(days, 10) : days));
      };
      if (typeof window !== "undefined") {
          window.flatpickr = flatpickr;
      }

      return flatpickr;

  }));
  });

  var vueFlatpickr = createCommonjsModule(function (module, exports) {
  (function webpackUniversalModuleDefinition(root, factory) {
  	module.exports = factory(flatpickr);
  })(typeof self !== 'undefined' ? self : commonjsGlobal, function(__WEBPACK_EXTERNAL_MODULE__0__) {
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
  /******/ 	return __webpack_require__(__webpack_require__.s = 1);
  /******/ })
  /************************************************************************/
  /******/ ([
  /* 0 */
  /***/ (function(module, exports) {

  module.exports = __WEBPACK_EXTERNAL_MODULE__0__;

  /***/ }),
  /* 1 */
  /***/ (function(module, __webpack_exports__, __webpack_require__) {
  __webpack_require__.r(__webpack_exports__);

  // EXTERNAL MODULE: external "flatpickr"
  var external_flatpickr_ = __webpack_require__(0);
  var external_flatpickr_default = /*#__PURE__*/__webpack_require__.n(external_flatpickr_);

  // CONCATENATED MODULE: ./src/events.js
  // Events to emit, copied from flatpickr source
  var includedEvents = ['onChange', 'onClose', 'onDestroy', 'onMonthChange', 'onOpen', 'onYearChange']; // Let's not emit these events by default

  var excludedEvents = ['onValueUpdate', 'onDayCreate', 'onParseConfig', 'onReady', 'onPreCalendarPosition', 'onKeyDown'];

  // CONCATENATED MODULE: ./src/util.js
  function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

  var camelToKebab = function camelToKebab(string) {
    return string.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
  };

  var arrayify = function arrayify(obj) {
    return obj instanceof Array ? obj : [obj];
  };

  var cloneObject = function cloneObject(obj) {
    return _extends({}, obj);
  };


  // CONCATENATED MODULE: ./src/component.js


   // You have to import css yourself
  // Keep a copy of all events for later use

  var allEvents = includedEvents.concat(excludedEvents); // Passing these properties in `set()` method will cause flatpickr to trigger some callbacks

  var configCallbacks = ['locale', 'showMonths'];
  /* harmony default export */ var component = ({
    name: 'flat-pickr',
    render: function render(el) {
      return el('input', {
        attrs: {
          type: 'text',
          'data-input': true
        },
        props: {
          disabled: this.disabled
        },
        on: {
          input: this.onInput
        }
      });
    },
    props: {
      value: {
        default: null,
        required: true,
        validator: function validator(value) {
          return value === null || value instanceof Date || typeof value === 'string' || value instanceof String || value instanceof Array || typeof value === 'number';
        }
      },
      // https://chmln.github.io/flatpickr/options/
      config: {
        type: Object,
        default: function _default() {
          return {
            wrap: false,
            defaultDate: null
          };
        }
      },
      events: {
        type: Array,
        default: function _default() {
          return includedEvents;
        }
      },
      disabled: {
        type: Boolean,
        default: false
      }
    },
    data: function data() {
      return {
        /**
         * The flatpickr instance
         */
        fp: null
      };
    },
    mounted: function mounted() {
      var _this = this;

      // Return early if flatpickr is already loaded

      /* istanbul ignore if */
      if (this.fp) return; // Don't mutate original object on parent component

      var safeConfig = cloneObject(this.config);
      this.events.forEach(function (hook) {
        // Respect global callbacks registered via setDefault() method
        var globalCallbacks = external_flatpickr_default.a.defaultConfig[hook] || []; // Inject our own method along with user callback

        var localCallback = function localCallback() {
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this.$emit.apply(_this, [camelToKebab(hook)].concat(args));
        }; // Overwrite with merged array


        safeConfig[hook] = arrayify(safeConfig[hook] || []).concat(globalCallbacks, localCallback);
      }); // Set initial date without emitting any event

      safeConfig.defaultDate = this.value || safeConfig.defaultDate; // Init flatpickr

      this.fp = new external_flatpickr_default.a(this.getElem(), safeConfig); // Attach blur event

      this.fpInput().addEventListener('blur', this.onBlur); // Immediate watch will fail before fp is set,
      // so need to start watching after mount

      this.$watch('disabled', this.watchDisabled, {
        immediate: true
      });
    },
    methods: {
      /**
       * Get the HTML node where flatpickr to be attached
       * Bind on parent element if wrap is true
       */
      getElem: function getElem() {
        return this.config.wrap ? this.$el.parentNode : this.$el;
      },

      /**
       * Watch for value changed by date-picker itself and notify parent component
       *
       * @param event
       */
      onInput: function onInput(event) {
        var _this2 = this;

        var input = event.target; // Lets wait for DOM to be updated

        this.$nextTick(function () {
          _this2.$emit('input', input.value);
        });
      },

      /**
       * @return HTMLElement
       */
      fpInput: function fpInput() {
        return this.fp.altInput || this.fp.input;
      },

      /**
       * Blur event is required by many validation libraries
       *
       * @param event
       */
      onBlur: function onBlur(event) {
        this.$emit('blur', event.target.value);
      },

      /**
       * Watch for the disabled property and sets the value to the real input.
       *
       * @param newState
       */
      watchDisabled: function watchDisabled(newState) {
        if (newState) {
          this.fpInput().setAttribute('disabled', newState);
        } else {
          this.fpInput().removeAttribute('disabled');
        }
      }
    },
    watch: {
      /**
       * Watch for any config changes and redraw date-picker
       *
       * @param newConfig Object
       */
      config: {
        deep: true,
        handler: function handler(newConfig) {
          var _this3 = this;

          var safeConfig = cloneObject(newConfig); // Workaround: Don't pass hooks to configs again otherwise
          // previously registered hooks will stop working
          // Notice: we are looping through all events
          // This also means that new callbacks can not passed once component has been initialized

          allEvents.forEach(function (hook) {
            delete safeConfig[hook];
          });
          this.fp.set(safeConfig); // Workaround: Allow to change locale dynamically

          configCallbacks.forEach(function (name) {
            if (typeof safeConfig[name] !== 'undefined') {
              _this3.fp.set(name, safeConfig[name]);
            }
          });
        }
      },

      /**
       * Watch for changes from parent component and update DOM
       *
       * @param newValue
       */
      value: function value(newValue) {
        // Prevent updates if v-model value is same as input's current value
        if (newValue === this.$el.value) return; // Make sure we have a flatpickr instance

        this.fp && // Notify flatpickr instance that there is a change in value
        this.fp.setDate(newValue, true);
      }
    },

    /**
     * Free up memory
     */
    beforeDestroy: function beforeDestroy() {
      /* istanbul ignore else */
      if (this.fp) {
        this.fpInput().removeEventListener('blur', this.onBlur);
        this.fp.destroy();
        this.fp = null;
      }
    }
  });
  // CONCATENATED MODULE: ./src/index.js
  /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Plugin", function() { return src_Plugin; });
  /* concated harmony reexport Component */__webpack_require__.d(__webpack_exports__, "Component", function() { return component; });


  var src_Plugin = function Plugin(Vue, params) {
    var name = 'flat-pickr';
    /* istanbul ignore else */

    if (typeof params === 'string') name = params;
    Vue.component(name, component);
  };

  component.install = src_Plugin;
  /* harmony default export */ var src = __webpack_exports__["default"] = (component);


  /***/ })
  /******/ ])["default"];
  });
  });

  var flatPickr = unwrapExports(vueFlatpickr);

  var hookCallback;

  function hooks () {
      return hookCallback.apply(null, arguments);
  }

  // This is done to register the method called with moment()
  // without creating circular dependencies.
  function setHookCallback (callback) {
      hookCallback = callback;
  }

  function isArray$1(input) {
      return input instanceof Array || Object.prototype.toString.call(input) === '[object Array]';
  }

  function isObject$1(input) {
      // IE8 will treat undefined and null as object if it wasn't for
      // input != null
      return input != null && Object.prototype.toString.call(input) === '[object Object]';
  }

  function isObjectEmpty(obj) {
      if (Object.getOwnPropertyNames) {
          return (Object.getOwnPropertyNames(obj).length === 0);
      } else {
          var k;
          for (k in obj) {
              if (obj.hasOwnProperty(k)) {
                  return false;
              }
          }
          return true;
      }
  }

  function isUndefined(input) {
      return input === void 0;
  }

  function isNumber(input) {
      return typeof input === 'number' || Object.prototype.toString.call(input) === '[object Number]';
  }

  function isDate(input) {
      return input instanceof Date || Object.prototype.toString.call(input) === '[object Date]';
  }

  function map(arr, fn) {
      var res = [], i;
      for (i = 0; i < arr.length; ++i) {
          res.push(fn(arr[i], i));
      }
      return res;
  }

  function hasOwnProp(a, b) {
      return Object.prototype.hasOwnProperty.call(a, b);
  }

  function extend(a, b) {
      for (var i in b) {
          if (hasOwnProp(b, i)) {
              a[i] = b[i];
          }
      }

      if (hasOwnProp(b, 'toString')) {
          a.toString = b.toString;
      }

      if (hasOwnProp(b, 'valueOf')) {
          a.valueOf = b.valueOf;
      }

      return a;
  }

  function createUTC (input, format, locale, strict) {
      return createLocalOrUTC(input, format, locale, strict, true).utc();
  }

  function defaultParsingFlags() {
      // We need to deep clone this object.
      return {
          empty           : false,
          unusedTokens    : [],
          unusedInput     : [],
          overflow        : -2,
          charsLeftOver   : 0,
          nullInput       : false,
          invalidMonth    : null,
          invalidFormat   : false,
          userInvalidated : false,
          iso             : false,
          parsedDateParts : [],
          meridiem        : null,
          rfc2822         : false,
          weekdayMismatch : false
      };
  }

  function getParsingFlags(m) {
      if (m._pf == null) {
          m._pf = defaultParsingFlags();
      }
      return m._pf;
  }

  var some;
  if (Array.prototype.some) {
      some = Array.prototype.some;
  } else {
      some = function (fun) {
          var t = Object(this);
          var len = t.length >>> 0;

          for (var i = 0; i < len; i++) {
              if (i in t && fun.call(this, t[i], i, t)) {
                  return true;
              }
          }

          return false;
      };
  }

  function isValid(m) {
      if (m._isValid == null) {
          var flags = getParsingFlags(m);
          var parsedParts = some.call(flags.parsedDateParts, function (i) {
              return i != null;
          });
          var isNowValid = !isNaN(m._d.getTime()) &&
              flags.overflow < 0 &&
              !flags.empty &&
              !flags.invalidMonth &&
              !flags.invalidWeekday &&
              !flags.weekdayMismatch &&
              !flags.nullInput &&
              !flags.invalidFormat &&
              !flags.userInvalidated &&
              (!flags.meridiem || (flags.meridiem && parsedParts));

          if (m._strict) {
              isNowValid = isNowValid &&
                  flags.charsLeftOver === 0 &&
                  flags.unusedTokens.length === 0 &&
                  flags.bigHour === undefined;
          }

          if (Object.isFrozen == null || !Object.isFrozen(m)) {
              m._isValid = isNowValid;
          }
          else {
              return isNowValid;
          }
      }
      return m._isValid;
  }

  function createInvalid (flags) {
      var m = createUTC(NaN);
      if (flags != null) {
          extend(getParsingFlags(m), flags);
      }
      else {
          getParsingFlags(m).userInvalidated = true;
      }

      return m;
  }

  // Plugins that add properties should also add the key here (null value),
  // so we can properly clone ourselves.
  var momentProperties = hooks.momentProperties = [];

  function copyConfig(to, from) {
      var i, prop, val;

      if (!isUndefined(from._isAMomentObject)) {
          to._isAMomentObject = from._isAMomentObject;
      }
      if (!isUndefined(from._i)) {
          to._i = from._i;
      }
      if (!isUndefined(from._f)) {
          to._f = from._f;
      }
      if (!isUndefined(from._l)) {
          to._l = from._l;
      }
      if (!isUndefined(from._strict)) {
          to._strict = from._strict;
      }
      if (!isUndefined(from._tzm)) {
          to._tzm = from._tzm;
      }
      if (!isUndefined(from._isUTC)) {
          to._isUTC = from._isUTC;
      }
      if (!isUndefined(from._offset)) {
          to._offset = from._offset;
      }
      if (!isUndefined(from._pf)) {
          to._pf = getParsingFlags(from);
      }
      if (!isUndefined(from._locale)) {
          to._locale = from._locale;
      }

      if (momentProperties.length > 0) {
          for (i = 0; i < momentProperties.length; i++) {
              prop = momentProperties[i];
              val = from[prop];
              if (!isUndefined(val)) {
                  to[prop] = val;
              }
          }
      }

      return to;
  }

  var updateInProgress = false;

  // Moment prototype object
  function Moment(config) {
      copyConfig(this, config);
      this._d = new Date(config._d != null ? config._d.getTime() : NaN);
      if (!this.isValid()) {
          this._d = new Date(NaN);
      }
      // Prevent infinite loop in case updateOffset creates new moment
      // objects.
      if (updateInProgress === false) {
          updateInProgress = true;
          hooks.updateOffset(this);
          updateInProgress = false;
      }
  }

  function isMoment (obj) {
      return obj instanceof Moment || (obj != null && obj._isAMomentObject != null);
  }

  function absFloor (number) {
      if (number < 0) {
          // -0 -> 0
          return Math.ceil(number) || 0;
      } else {
          return Math.floor(number);
      }
  }

  function toInt(argumentForCoercion) {
      var coercedNumber = +argumentForCoercion,
          value = 0;

      if (coercedNumber !== 0 && isFinite(coercedNumber)) {
          value = absFloor(coercedNumber);
      }

      return value;
  }

  // compare two arrays, return the number of differences
  function compareArrays(array1, array2, dontConvert) {
      var len = Math.min(array1.length, array2.length),
          lengthDiff = Math.abs(array1.length - array2.length),
          diffs = 0,
          i;
      for (i = 0; i < len; i++) {
          if ((dontConvert && array1[i] !== array2[i]) ||
              (!dontConvert && toInt(array1[i]) !== toInt(array2[i]))) {
              diffs++;
          }
      }
      return diffs + lengthDiff;
  }

  function warn(msg) {
      if (hooks.suppressDeprecationWarnings === false &&
              (typeof console !==  'undefined') && console.warn) {
          console.warn('Deprecation warning: ' + msg);
      }
  }

  function deprecate(msg, fn) {
      var firstTime = true;

      return extend(function () {
          if (hooks.deprecationHandler != null) {
              hooks.deprecationHandler(null, msg);
          }
          if (firstTime) {
              var args = [];
              var arg;
              for (var i = 0; i < arguments.length; i++) {
                  arg = '';
                  if (typeof arguments[i] === 'object') {
                      arg += '\n[' + i + '] ';
                      for (var key in arguments[0]) {
                          arg += key + ': ' + arguments[0][key] + ', ';
                      }
                      arg = arg.slice(0, -2); // Remove trailing comma and space
                  } else {
                      arg = arguments[i];
                  }
                  args.push(arg);
              }
              warn(msg + '\nArguments: ' + Array.prototype.slice.call(args).join('') + '\n' + (new Error()).stack);
              firstTime = false;
          }
          return fn.apply(this, arguments);
      }, fn);
  }

  var deprecations = {};

  function deprecateSimple(name, msg) {
      if (hooks.deprecationHandler != null) {
          hooks.deprecationHandler(name, msg);
      }
      if (!deprecations[name]) {
          warn(msg);
          deprecations[name] = true;
      }
  }

  hooks.suppressDeprecationWarnings = false;
  hooks.deprecationHandler = null;

  function isFunction(input) {
      return input instanceof Function || Object.prototype.toString.call(input) === '[object Function]';
  }

  function set$1 (config) {
      var prop, i;
      for (i in config) {
          prop = config[i];
          if (isFunction(prop)) {
              this[i] = prop;
          } else {
              this['_' + i] = prop;
          }
      }
      this._config = config;
      // Lenient ordinal parsing accepts just a number in addition to
      // number + (possibly) stuff coming from _dayOfMonthOrdinalParse.
      // TODO: Remove "ordinalParse" fallback in next major release.
      this._dayOfMonthOrdinalParseLenient = new RegExp(
          (this._dayOfMonthOrdinalParse.source || this._ordinalParse.source) +
              '|' + (/\d{1,2}/).source);
  }

  function mergeConfigs(parentConfig, childConfig) {
      var res = extend({}, parentConfig), prop;
      for (prop in childConfig) {
          if (hasOwnProp(childConfig, prop)) {
              if (isObject$1(parentConfig[prop]) && isObject$1(childConfig[prop])) {
                  res[prop] = {};
                  extend(res[prop], parentConfig[prop]);
                  extend(res[prop], childConfig[prop]);
              } else if (childConfig[prop] != null) {
                  res[prop] = childConfig[prop];
              } else {
                  delete res[prop];
              }
          }
      }
      for (prop in parentConfig) {
          if (hasOwnProp(parentConfig, prop) &&
                  !hasOwnProp(childConfig, prop) &&
                  isObject$1(parentConfig[prop])) {
              // make sure changes to properties don't modify parent config
              res[prop] = extend({}, res[prop]);
          }
      }
      return res;
  }

  function Locale(config) {
      if (config != null) {
          this.set(config);
      }
  }

  var keys$2;

  if (Object.keys) {
      keys$2 = Object.keys;
  } else {
      keys$2 = function (obj) {
          var i, res = [];
          for (i in obj) {
              if (hasOwnProp(obj, i)) {
                  res.push(i);
              }
          }
          return res;
      };
  }

  var defaultCalendar = {
      sameDay : '[Today at] LT',
      nextDay : '[Tomorrow at] LT',
      nextWeek : 'dddd [at] LT',
      lastDay : '[Yesterday at] LT',
      lastWeek : '[Last] dddd [at] LT',
      sameElse : 'L'
  };

  function calendar (key, mom, now) {
      var output = this._calendar[key] || this._calendar['sameElse'];
      return isFunction(output) ? output.call(mom, now) : output;
  }

  var defaultLongDateFormat = {
      LTS  : 'h:mm:ss A',
      LT   : 'h:mm A',
      L    : 'MM/DD/YYYY',
      LL   : 'MMMM D, YYYY',
      LLL  : 'MMMM D, YYYY h:mm A',
      LLLL : 'dddd, MMMM D, YYYY h:mm A'
  };

  function longDateFormat (key) {
      var format = this._longDateFormat[key],
          formatUpper = this._longDateFormat[key.toUpperCase()];

      if (format || !formatUpper) {
          return format;
      }

      this._longDateFormat[key] = formatUpper.replace(/MMMM|MM|DD|dddd/g, function (val) {
          return val.slice(1);
      });

      return this._longDateFormat[key];
  }

  var defaultInvalidDate = 'Invalid date';

  function invalidDate () {
      return this._invalidDate;
  }

  var defaultOrdinal = '%d';
  var defaultDayOfMonthOrdinalParse = /\d{1,2}/;

  function ordinal (number) {
      return this._ordinal.replace('%d', number);
  }

  var defaultRelativeTime = {
      future : 'in %s',
      past   : '%s ago',
      s  : 'a few seconds',
      ss : '%d seconds',
      m  : 'a minute',
      mm : '%d minutes',
      h  : 'an hour',
      hh : '%d hours',
      d  : 'a day',
      dd : '%d days',
      M  : 'a month',
      MM : '%d months',
      y  : 'a year',
      yy : '%d years'
  };

  function relativeTime (number, withoutSuffix, string, isFuture) {
      var output = this._relativeTime[string];
      return (isFunction(output)) ?
          output(number, withoutSuffix, string, isFuture) :
          output.replace(/%d/i, number);
  }

  function pastFuture (diff, output) {
      var format = this._relativeTime[diff > 0 ? 'future' : 'past'];
      return isFunction(format) ? format(output) : format.replace(/%s/i, output);
  }

  var aliases = {};

  function addUnitAlias (unit, shorthand) {
      var lowerCase = unit.toLowerCase();
      aliases[lowerCase] = aliases[lowerCase + 's'] = aliases[shorthand] = unit;
  }

  function normalizeUnits(units) {
      return typeof units === 'string' ? aliases[units] || aliases[units.toLowerCase()] : undefined;
  }

  function normalizeObjectUnits(inputObject) {
      var normalizedInput = {},
          normalizedProp,
          prop;

      for (prop in inputObject) {
          if (hasOwnProp(inputObject, prop)) {
              normalizedProp = normalizeUnits(prop);
              if (normalizedProp) {
                  normalizedInput[normalizedProp] = inputObject[prop];
              }
          }
      }

      return normalizedInput;
  }

  var priorities = {};

  function addUnitPriority(unit, priority) {
      priorities[unit] = priority;
  }

  function getPrioritizedUnits(unitsObj) {
      var units = [];
      for (var u in unitsObj) {
          units.push({unit: u, priority: priorities[u]});
      }
      units.sort(function (a, b) {
          return a.priority - b.priority;
      });
      return units;
  }

  function zeroFill(number, targetLength, forceSign) {
      var absNumber = '' + Math.abs(number),
          zerosToFill = targetLength - absNumber.length,
          sign = number >= 0;
      return (sign ? (forceSign ? '+' : '') : '-') +
          Math.pow(10, Math.max(0, zerosToFill)).toString().substr(1) + absNumber;
  }

  var formattingTokens = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g;

  var localFormattingTokens = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g;

  var formatFunctions = {};

  var formatTokenFunctions = {};

  // token:    'M'
  // padded:   ['MM', 2]
  // ordinal:  'Mo'
  // callback: function () { this.month() + 1 }
  function addFormatToken (token, padded, ordinal, callback) {
      var func = callback;
      if (typeof callback === 'string') {
          func = function () {
              return this[callback]();
          };
      }
      if (token) {
          formatTokenFunctions[token] = func;
      }
      if (padded) {
          formatTokenFunctions[padded[0]] = function () {
              return zeroFill(func.apply(this, arguments), padded[1], padded[2]);
          };
      }
      if (ordinal) {
          formatTokenFunctions[ordinal] = function () {
              return this.localeData().ordinal(func.apply(this, arguments), token);
          };
      }
  }

  function removeFormattingTokens(input) {
      if (input.match(/\[[\s\S]/)) {
          return input.replace(/^\[|\]$/g, '');
      }
      return input.replace(/\\/g, '');
  }

  function makeFormatFunction(format) {
      var array = format.match(formattingTokens), i, length;

      for (i = 0, length = array.length; i < length; i++) {
          if (formatTokenFunctions[array[i]]) {
              array[i] = formatTokenFunctions[array[i]];
          } else {
              array[i] = removeFormattingTokens(array[i]);
          }
      }

      return function (mom) {
          var output = '', i;
          for (i = 0; i < length; i++) {
              output += isFunction(array[i]) ? array[i].call(mom, format) : array[i];
          }
          return output;
      };
  }

  // format date using native date object
  function formatMoment(m, format) {
      if (!m.isValid()) {
          return m.localeData().invalidDate();
      }

      format = expandFormat(format, m.localeData());
      formatFunctions[format] = formatFunctions[format] || makeFormatFunction(format);

      return formatFunctions[format](m);
  }

  function expandFormat(format, locale) {
      var i = 5;

      function replaceLongDateFormatTokens(input) {
          return locale.longDateFormat(input) || input;
      }

      localFormattingTokens.lastIndex = 0;
      while (i >= 0 && localFormattingTokens.test(format)) {
          format = format.replace(localFormattingTokens, replaceLongDateFormatTokens);
          localFormattingTokens.lastIndex = 0;
          i -= 1;
      }

      return format;
  }

  var match1         = /\d/;            //       0 - 9
  var match2         = /\d\d/;          //      00 - 99
  var match3         = /\d{3}/;         //     000 - 999
  var match4         = /\d{4}/;         //    0000 - 9999
  var match6         = /[+-]?\d{6}/;    // -999999 - 999999
  var match1to2      = /\d\d?/;         //       0 - 99
  var match3to4      = /\d\d\d\d?/;     //     999 - 9999
  var match5to6      = /\d\d\d\d\d\d?/; //   99999 - 999999
  var match1to3      = /\d{1,3}/;       //       0 - 999
  var match1to4      = /\d{1,4}/;       //       0 - 9999
  var match1to6      = /[+-]?\d{1,6}/;  // -999999 - 999999

  var matchUnsigned  = /\d+/;           //       0 - inf
  var matchSigned    = /[+-]?\d+/;      //    -inf - inf

  var matchOffset    = /Z|[+-]\d\d:?\d\d/gi; // +00:00 -00:00 +0000 -0000 or Z
  var matchShortOffset = /Z|[+-]\d\d(?::?\d\d)?/gi; // +00 -00 +00:00 -00:00 +0000 -0000 or Z

  var matchTimestamp = /[+-]?\d+(\.\d{1,3})?/; // 123456789 123456789.123

  // any word (or two) characters or numbers including two/three word month in arabic.
  // includes scottish gaelic two word and hyphenated months
  var matchWord = /[0-9]{0,256}['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFF07\uFF10-\uFFEF]{1,256}|[\u0600-\u06FF\/]{1,256}(\s*?[\u0600-\u06FF]{1,256}){1,2}/i;

  var regexes = {};

  function addRegexToken (token, regex, strictRegex) {
      regexes[token] = isFunction(regex) ? regex : function (isStrict, localeData) {
          return (isStrict && strictRegex) ? strictRegex : regex;
      };
  }

  function getParseRegexForToken (token, config) {
      if (!hasOwnProp(regexes, token)) {
          return new RegExp(unescapeFormat(token));
      }

      return regexes[token](config._strict, config._locale);
  }

  // Code from http://stackoverflow.com/questions/3561493/is-there-a-regexp-escape-function-in-javascript
  function unescapeFormat(s) {
      return regexEscape(s.replace('\\', '').replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function (matched, p1, p2, p3, p4) {
          return p1 || p2 || p3 || p4;
      }));
  }

  function regexEscape(s) {
      return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
  }

  var tokens = {};

  function addParseToken (token, callback) {
      var i, func = callback;
      if (typeof token === 'string') {
          token = [token];
      }
      if (isNumber(callback)) {
          func = function (input, array) {
              array[callback] = toInt(input);
          };
      }
      for (i = 0; i < token.length; i++) {
          tokens[token[i]] = func;
      }
  }

  function addWeekParseToken (token, callback) {
      addParseToken(token, function (input, array, config, token) {
          config._w = config._w || {};
          callback(input, config._w, config, token);
      });
  }

  function addTimeToArrayFromToken(token, input, config) {
      if (input != null && hasOwnProp(tokens, token)) {
          tokens[token](input, config._a, config, token);
      }
  }

  var YEAR = 0;
  var MONTH = 1;
  var DATE = 2;
  var HOUR = 3;
  var MINUTE = 4;
  var SECOND = 5;
  var MILLISECOND = 6;
  var WEEK = 7;
  var WEEKDAY = 8;

  // FORMATTING

  addFormatToken('Y', 0, 0, function () {
      var y = this.year();
      return y <= 9999 ? '' + y : '+' + y;
  });

  addFormatToken(0, ['YY', 2], 0, function () {
      return this.year() % 100;
  });

  addFormatToken(0, ['YYYY',   4],       0, 'year');
  addFormatToken(0, ['YYYYY',  5],       0, 'year');
  addFormatToken(0, ['YYYYYY', 6, true], 0, 'year');

  // ALIASES

  addUnitAlias('year', 'y');

  // PRIORITIES

  addUnitPriority('year', 1);

  // PARSING

  addRegexToken('Y',      matchSigned);
  addRegexToken('YY',     match1to2, match2);
  addRegexToken('YYYY',   match1to4, match4);
  addRegexToken('YYYYY',  match1to6, match6);
  addRegexToken('YYYYYY', match1to6, match6);

  addParseToken(['YYYYY', 'YYYYYY'], YEAR);
  addParseToken('YYYY', function (input, array) {
      array[YEAR] = input.length === 2 ? hooks.parseTwoDigitYear(input) : toInt(input);
  });
  addParseToken('YY', function (input, array) {
      array[YEAR] = hooks.parseTwoDigitYear(input);
  });
  addParseToken('Y', function (input, array) {
      array[YEAR] = parseInt(input, 10);
  });

  // HELPERS

  function daysInYear(year) {
      return isLeapYear(year) ? 366 : 365;
  }

  function isLeapYear(year) {
      return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  }

  // HOOKS

  hooks.parseTwoDigitYear = function (input) {
      return toInt(input) + (toInt(input) > 68 ? 1900 : 2000);
  };

  // MOMENTS

  var getSetYear = makeGetSet('FullYear', true);

  function getIsLeapYear () {
      return isLeapYear(this.year());
  }

  function makeGetSet (unit, keepTime) {
      return function (value) {
          if (value != null) {
              set$2(this, unit, value);
              hooks.updateOffset(this, keepTime);
              return this;
          } else {
              return get$1(this, unit);
          }
      };
  }

  function get$1 (mom, unit) {
      return mom.isValid() ?
          mom._d['get' + (mom._isUTC ? 'UTC' : '') + unit]() : NaN;
  }

  function set$2 (mom, unit, value) {
      if (mom.isValid() && !isNaN(value)) {
          if (unit === 'FullYear' && isLeapYear(mom.year()) && mom.month() === 1 && mom.date() === 29) {
              mom._d['set' + (mom._isUTC ? 'UTC' : '') + unit](value, mom.month(), daysInMonth(value, mom.month()));
          }
          else {
              mom._d['set' + (mom._isUTC ? 'UTC' : '') + unit](value);
          }
      }
  }

  // MOMENTS

  function stringGet (units) {
      units = normalizeUnits(units);
      if (isFunction(this[units])) {
          return this[units]();
      }
      return this;
  }


  function stringSet (units, value) {
      if (typeof units === 'object') {
          units = normalizeObjectUnits(units);
          var prioritized = getPrioritizedUnits(units);
          for (var i = 0; i < prioritized.length; i++) {
              this[prioritized[i].unit](units[prioritized[i].unit]);
          }
      } else {
          units = normalizeUnits(units);
          if (isFunction(this[units])) {
              return this[units](value);
          }
      }
      return this;
  }

  function mod(n, x) {
      return ((n % x) + x) % x;
  }

  var indexOf$1;

  if (Array.prototype.indexOf) {
      indexOf$1 = Array.prototype.indexOf;
  } else {
      indexOf$1 = function (o) {
          // I know
          var i;
          for (i = 0; i < this.length; ++i) {
              if (this[i] === o) {
                  return i;
              }
          }
          return -1;
      };
  }

  function daysInMonth(year, month) {
      if (isNaN(year) || isNaN(month)) {
          return NaN;
      }
      var modMonth = mod(month, 12);
      year += (month - modMonth) / 12;
      return modMonth === 1 ? (isLeapYear(year) ? 29 : 28) : (31 - modMonth % 7 % 2);
  }

  // FORMATTING

  addFormatToken('M', ['MM', 2], 'Mo', function () {
      return this.month() + 1;
  });

  addFormatToken('MMM', 0, 0, function (format) {
      return this.localeData().monthsShort(this, format);
  });

  addFormatToken('MMMM', 0, 0, function (format) {
      return this.localeData().months(this, format);
  });

  // ALIASES

  addUnitAlias('month', 'M');

  // PRIORITY

  addUnitPriority('month', 8);

  // PARSING

  addRegexToken('M',    match1to2);
  addRegexToken('MM',   match1to2, match2);
  addRegexToken('MMM',  function (isStrict, locale) {
      return locale.monthsShortRegex(isStrict);
  });
  addRegexToken('MMMM', function (isStrict, locale) {
      return locale.monthsRegex(isStrict);
  });

  addParseToken(['M', 'MM'], function (input, array) {
      array[MONTH] = toInt(input) - 1;
  });

  addParseToken(['MMM', 'MMMM'], function (input, array, config, token) {
      var month = config._locale.monthsParse(input, token, config._strict);
      // if we didn't find a month name, mark the date as invalid.
      if (month != null) {
          array[MONTH] = month;
      } else {
          getParsingFlags(config).invalidMonth = input;
      }
  });

  // LOCALES

  var MONTHS_IN_FORMAT = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/;
  var defaultLocaleMonths = 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_');
  function localeMonths (m, format) {
      if (!m) {
          return isArray$1(this._months) ? this._months :
              this._months['standalone'];
      }
      return isArray$1(this._months) ? this._months[m.month()] :
          this._months[(this._months.isFormat || MONTHS_IN_FORMAT).test(format) ? 'format' : 'standalone'][m.month()];
  }

  var defaultLocaleMonthsShort = 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_');
  function localeMonthsShort (m, format) {
      if (!m) {
          return isArray$1(this._monthsShort) ? this._monthsShort :
              this._monthsShort['standalone'];
      }
      return isArray$1(this._monthsShort) ? this._monthsShort[m.month()] :
          this._monthsShort[MONTHS_IN_FORMAT.test(format) ? 'format' : 'standalone'][m.month()];
  }

  function handleStrictParse(monthName, format, strict) {
      var i, ii, mom, llc = monthName.toLocaleLowerCase();
      if (!this._monthsParse) {
          // this is not used
          this._monthsParse = [];
          this._longMonthsParse = [];
          this._shortMonthsParse = [];
          for (i = 0; i < 12; ++i) {
              mom = createUTC([2000, i]);
              this._shortMonthsParse[i] = this.monthsShort(mom, '').toLocaleLowerCase();
              this._longMonthsParse[i] = this.months(mom, '').toLocaleLowerCase();
          }
      }

      if (strict) {
          if (format === 'MMM') {
              ii = indexOf$1.call(this._shortMonthsParse, llc);
              return ii !== -1 ? ii : null;
          } else {
              ii = indexOf$1.call(this._longMonthsParse, llc);
              return ii !== -1 ? ii : null;
          }
      } else {
          if (format === 'MMM') {
              ii = indexOf$1.call(this._shortMonthsParse, llc);
              if (ii !== -1) {
                  return ii;
              }
              ii = indexOf$1.call(this._longMonthsParse, llc);
              return ii !== -1 ? ii : null;
          } else {
              ii = indexOf$1.call(this._longMonthsParse, llc);
              if (ii !== -1) {
                  return ii;
              }
              ii = indexOf$1.call(this._shortMonthsParse, llc);
              return ii !== -1 ? ii : null;
          }
      }
  }

  function localeMonthsParse (monthName, format, strict) {
      var i, mom, regex;

      if (this._monthsParseExact) {
          return handleStrictParse.call(this, monthName, format, strict);
      }

      if (!this._monthsParse) {
          this._monthsParse = [];
          this._longMonthsParse = [];
          this._shortMonthsParse = [];
      }

      // TODO: add sorting
      // Sorting makes sure if one month (or abbr) is a prefix of another
      // see sorting in computeMonthsParse
      for (i = 0; i < 12; i++) {
          // make the regex if we don't have it already
          mom = createUTC([2000, i]);
          if (strict && !this._longMonthsParse[i]) {
              this._longMonthsParse[i] = new RegExp('^' + this.months(mom, '').replace('.', '') + '$', 'i');
              this._shortMonthsParse[i] = new RegExp('^' + this.monthsShort(mom, '').replace('.', '') + '$', 'i');
          }
          if (!strict && !this._monthsParse[i]) {
              regex = '^' + this.months(mom, '') + '|^' + this.monthsShort(mom, '');
              this._monthsParse[i] = new RegExp(regex.replace('.', ''), 'i');
          }
          // test the regex
          if (strict && format === 'MMMM' && this._longMonthsParse[i].test(monthName)) {
              return i;
          } else if (strict && format === 'MMM' && this._shortMonthsParse[i].test(monthName)) {
              return i;
          } else if (!strict && this._monthsParse[i].test(monthName)) {
              return i;
          }
      }
  }

  // MOMENTS

  function setMonth (mom, value) {
      var dayOfMonth;

      if (!mom.isValid()) {
          // No op
          return mom;
      }

      if (typeof value === 'string') {
          if (/^\d+$/.test(value)) {
              value = toInt(value);
          } else {
              value = mom.localeData().monthsParse(value);
              // TODO: Another silent failure?
              if (!isNumber(value)) {
                  return mom;
              }
          }
      }

      dayOfMonth = Math.min(mom.date(), daysInMonth(mom.year(), value));
      mom._d['set' + (mom._isUTC ? 'UTC' : '') + 'Month'](value, dayOfMonth);
      return mom;
  }

  function getSetMonth (value) {
      if (value != null) {
          setMonth(this, value);
          hooks.updateOffset(this, true);
          return this;
      } else {
          return get$1(this, 'Month');
      }
  }

  function getDaysInMonth () {
      return daysInMonth(this.year(), this.month());
  }

  var defaultMonthsShortRegex = matchWord;
  function monthsShortRegex (isStrict) {
      if (this._monthsParseExact) {
          if (!hasOwnProp(this, '_monthsRegex')) {
              computeMonthsParse.call(this);
          }
          if (isStrict) {
              return this._monthsShortStrictRegex;
          } else {
              return this._monthsShortRegex;
          }
      } else {
          if (!hasOwnProp(this, '_monthsShortRegex')) {
              this._monthsShortRegex = defaultMonthsShortRegex;
          }
          return this._monthsShortStrictRegex && isStrict ?
              this._monthsShortStrictRegex : this._monthsShortRegex;
      }
  }

  var defaultMonthsRegex = matchWord;
  function monthsRegex (isStrict) {
      if (this._monthsParseExact) {
          if (!hasOwnProp(this, '_monthsRegex')) {
              computeMonthsParse.call(this);
          }
          if (isStrict) {
              return this._monthsStrictRegex;
          } else {
              return this._monthsRegex;
          }
      } else {
          if (!hasOwnProp(this, '_monthsRegex')) {
              this._monthsRegex = defaultMonthsRegex;
          }
          return this._monthsStrictRegex && isStrict ?
              this._monthsStrictRegex : this._monthsRegex;
      }
  }

  function computeMonthsParse () {
      function cmpLenRev(a, b) {
          return b.length - a.length;
      }

      var shortPieces = [], longPieces = [], mixedPieces = [],
          i, mom;
      for (i = 0; i < 12; i++) {
          // make the regex if we don't have it already
          mom = createUTC([2000, i]);
          shortPieces.push(this.monthsShort(mom, ''));
          longPieces.push(this.months(mom, ''));
          mixedPieces.push(this.months(mom, ''));
          mixedPieces.push(this.monthsShort(mom, ''));
      }
      // Sorting makes sure if one month (or abbr) is a prefix of another it
      // will match the longer piece.
      shortPieces.sort(cmpLenRev);
      longPieces.sort(cmpLenRev);
      mixedPieces.sort(cmpLenRev);
      for (i = 0; i < 12; i++) {
          shortPieces[i] = regexEscape(shortPieces[i]);
          longPieces[i] = regexEscape(longPieces[i]);
      }
      for (i = 0; i < 24; i++) {
          mixedPieces[i] = regexEscape(mixedPieces[i]);
      }

      this._monthsRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');
      this._monthsShortRegex = this._monthsRegex;
      this._monthsStrictRegex = new RegExp('^(' + longPieces.join('|') + ')', 'i');
      this._monthsShortStrictRegex = new RegExp('^(' + shortPieces.join('|') + ')', 'i');
  }

  function createDate (y, m, d, h, M, s, ms) {
      // can't just apply() to create a date:
      // https://stackoverflow.com/q/181348
      var date;
      // the date constructor remaps years 0-99 to 1900-1999
      if (y < 100 && y >= 0) {
          // preserve leap years using a full 400 year cycle, then reset
          date = new Date(y + 400, m, d, h, M, s, ms);
          if (isFinite(date.getFullYear())) {
              date.setFullYear(y);
          }
      } else {
          date = new Date(y, m, d, h, M, s, ms);
      }

      return date;
  }

  function createUTCDate (y) {
      var date;
      // the Date.UTC function remaps years 0-99 to 1900-1999
      if (y < 100 && y >= 0) {
          var args = Array.prototype.slice.call(arguments);
          // preserve leap years using a full 400 year cycle, then reset
          args[0] = y + 400;
          date = new Date(Date.UTC.apply(null, args));
          if (isFinite(date.getUTCFullYear())) {
              date.setUTCFullYear(y);
          }
      } else {
          date = new Date(Date.UTC.apply(null, arguments));
      }

      return date;
  }

  // start-of-first-week - start-of-year
  function firstWeekOffset(year, dow, doy) {
      var // first-week day -- which january is always in the first week (4 for iso, 1 for other)
          fwd = 7 + dow - doy,
          // first-week day local weekday -- which local weekday is fwd
          fwdlw = (7 + createUTCDate(year, 0, fwd).getUTCDay() - dow) % 7;

      return -fwdlw + fwd - 1;
  }

  // https://en.wikipedia.org/wiki/ISO_week_date#Calculating_a_date_given_the_year.2C_week_number_and_weekday
  function dayOfYearFromWeeks(year, week, weekday, dow, doy) {
      var localWeekday = (7 + weekday - dow) % 7,
          weekOffset = firstWeekOffset(year, dow, doy),
          dayOfYear = 1 + 7 * (week - 1) + localWeekday + weekOffset,
          resYear, resDayOfYear;

      if (dayOfYear <= 0) {
          resYear = year - 1;
          resDayOfYear = daysInYear(resYear) + dayOfYear;
      } else if (dayOfYear > daysInYear(year)) {
          resYear = year + 1;
          resDayOfYear = dayOfYear - daysInYear(year);
      } else {
          resYear = year;
          resDayOfYear = dayOfYear;
      }

      return {
          year: resYear,
          dayOfYear: resDayOfYear
      };
  }

  function weekOfYear(mom, dow, doy) {
      var weekOffset = firstWeekOffset(mom.year(), dow, doy),
          week = Math.floor((mom.dayOfYear() - weekOffset - 1) / 7) + 1,
          resWeek, resYear;

      if (week < 1) {
          resYear = mom.year() - 1;
          resWeek = week + weeksInYear(resYear, dow, doy);
      } else if (week > weeksInYear(mom.year(), dow, doy)) {
          resWeek = week - weeksInYear(mom.year(), dow, doy);
          resYear = mom.year() + 1;
      } else {
          resYear = mom.year();
          resWeek = week;
      }

      return {
          week: resWeek,
          year: resYear
      };
  }

  function weeksInYear(year, dow, doy) {
      var weekOffset = firstWeekOffset(year, dow, doy),
          weekOffsetNext = firstWeekOffset(year + 1, dow, doy);
      return (daysInYear(year) - weekOffset + weekOffsetNext) / 7;
  }

  // FORMATTING

  addFormatToken('w', ['ww', 2], 'wo', 'week');
  addFormatToken('W', ['WW', 2], 'Wo', 'isoWeek');

  // ALIASES

  addUnitAlias('week', 'w');
  addUnitAlias('isoWeek', 'W');

  // PRIORITIES

  addUnitPriority('week', 5);
  addUnitPriority('isoWeek', 5);

  // PARSING

  addRegexToken('w',  match1to2);
  addRegexToken('ww', match1to2, match2);
  addRegexToken('W',  match1to2);
  addRegexToken('WW', match1to2, match2);

  addWeekParseToken(['w', 'ww', 'W', 'WW'], function (input, week, config, token) {
      week[token.substr(0, 1)] = toInt(input);
  });

  // HELPERS

  // LOCALES

  function localeWeek (mom) {
      return weekOfYear(mom, this._week.dow, this._week.doy).week;
  }

  var defaultLocaleWeek = {
      dow : 0, // Sunday is the first day of the week.
      doy : 6  // The week that contains Jan 6th is the first week of the year.
  };

  function localeFirstDayOfWeek () {
      return this._week.dow;
  }

  function localeFirstDayOfYear () {
      return this._week.doy;
  }

  // MOMENTS

  function getSetWeek (input) {
      var week = this.localeData().week(this);
      return input == null ? week : this.add((input - week) * 7, 'd');
  }

  function getSetISOWeek (input) {
      var week = weekOfYear(this, 1, 4).week;
      return input == null ? week : this.add((input - week) * 7, 'd');
  }

  // FORMATTING

  addFormatToken('d', 0, 'do', 'day');

  addFormatToken('dd', 0, 0, function (format) {
      return this.localeData().weekdaysMin(this, format);
  });

  addFormatToken('ddd', 0, 0, function (format) {
      return this.localeData().weekdaysShort(this, format);
  });

  addFormatToken('dddd', 0, 0, function (format) {
      return this.localeData().weekdays(this, format);
  });

  addFormatToken('e', 0, 0, 'weekday');
  addFormatToken('E', 0, 0, 'isoWeekday');

  // ALIASES

  addUnitAlias('day', 'd');
  addUnitAlias('weekday', 'e');
  addUnitAlias('isoWeekday', 'E');

  // PRIORITY
  addUnitPriority('day', 11);
  addUnitPriority('weekday', 11);
  addUnitPriority('isoWeekday', 11);

  // PARSING

  addRegexToken('d',    match1to2);
  addRegexToken('e',    match1to2);
  addRegexToken('E',    match1to2);
  addRegexToken('dd',   function (isStrict, locale) {
      return locale.weekdaysMinRegex(isStrict);
  });
  addRegexToken('ddd',   function (isStrict, locale) {
      return locale.weekdaysShortRegex(isStrict);
  });
  addRegexToken('dddd',   function (isStrict, locale) {
      return locale.weekdaysRegex(isStrict);
  });

  addWeekParseToken(['dd', 'ddd', 'dddd'], function (input, week, config, token) {
      var weekday = config._locale.weekdaysParse(input, token, config._strict);
      // if we didn't get a weekday name, mark the date as invalid
      if (weekday != null) {
          week.d = weekday;
      } else {
          getParsingFlags(config).invalidWeekday = input;
      }
  });

  addWeekParseToken(['d', 'e', 'E'], function (input, week, config, token) {
      week[token] = toInt(input);
  });

  // HELPERS

  function parseWeekday(input, locale) {
      if (typeof input !== 'string') {
          return input;
      }

      if (!isNaN(input)) {
          return parseInt(input, 10);
      }

      input = locale.weekdaysParse(input);
      if (typeof input === 'number') {
          return input;
      }

      return null;
  }

  function parseIsoWeekday(input, locale) {
      if (typeof input === 'string') {
          return locale.weekdaysParse(input) % 7 || 7;
      }
      return isNaN(input) ? null : input;
  }

  // LOCALES
  function shiftWeekdays (ws, n) {
      return ws.slice(n, 7).concat(ws.slice(0, n));
  }

  var defaultLocaleWeekdays = 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_');
  function localeWeekdays (m, format) {
      var weekdays = isArray$1(this._weekdays) ? this._weekdays :
          this._weekdays[(m && m !== true && this._weekdays.isFormat.test(format)) ? 'format' : 'standalone'];
      return (m === true) ? shiftWeekdays(weekdays, this._week.dow)
          : (m) ? weekdays[m.day()] : weekdays;
  }

  var defaultLocaleWeekdaysShort = 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_');
  function localeWeekdaysShort (m) {
      return (m === true) ? shiftWeekdays(this._weekdaysShort, this._week.dow)
          : (m) ? this._weekdaysShort[m.day()] : this._weekdaysShort;
  }

  var defaultLocaleWeekdaysMin = 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_');
  function localeWeekdaysMin (m) {
      return (m === true) ? shiftWeekdays(this._weekdaysMin, this._week.dow)
          : (m) ? this._weekdaysMin[m.day()] : this._weekdaysMin;
  }

  function handleStrictParse$1(weekdayName, format, strict) {
      var i, ii, mom, llc = weekdayName.toLocaleLowerCase();
      if (!this._weekdaysParse) {
          this._weekdaysParse = [];
          this._shortWeekdaysParse = [];
          this._minWeekdaysParse = [];

          for (i = 0; i < 7; ++i) {
              mom = createUTC([2000, 1]).day(i);
              this._minWeekdaysParse[i] = this.weekdaysMin(mom, '').toLocaleLowerCase();
              this._shortWeekdaysParse[i] = this.weekdaysShort(mom, '').toLocaleLowerCase();
              this._weekdaysParse[i] = this.weekdays(mom, '').toLocaleLowerCase();
          }
      }

      if (strict) {
          if (format === 'dddd') {
              ii = indexOf$1.call(this._weekdaysParse, llc);
              return ii !== -1 ? ii : null;
          } else if (format === 'ddd') {
              ii = indexOf$1.call(this._shortWeekdaysParse, llc);
              return ii !== -1 ? ii : null;
          } else {
              ii = indexOf$1.call(this._minWeekdaysParse, llc);
              return ii !== -1 ? ii : null;
          }
      } else {
          if (format === 'dddd') {
              ii = indexOf$1.call(this._weekdaysParse, llc);
              if (ii !== -1) {
                  return ii;
              }
              ii = indexOf$1.call(this._shortWeekdaysParse, llc);
              if (ii !== -1) {
                  return ii;
              }
              ii = indexOf$1.call(this._minWeekdaysParse, llc);
              return ii !== -1 ? ii : null;
          } else if (format === 'ddd') {
              ii = indexOf$1.call(this._shortWeekdaysParse, llc);
              if (ii !== -1) {
                  return ii;
              }
              ii = indexOf$1.call(this._weekdaysParse, llc);
              if (ii !== -1) {
                  return ii;
              }
              ii = indexOf$1.call(this._minWeekdaysParse, llc);
              return ii !== -1 ? ii : null;
          } else {
              ii = indexOf$1.call(this._minWeekdaysParse, llc);
              if (ii !== -1) {
                  return ii;
              }
              ii = indexOf$1.call(this._weekdaysParse, llc);
              if (ii !== -1) {
                  return ii;
              }
              ii = indexOf$1.call(this._shortWeekdaysParse, llc);
              return ii !== -1 ? ii : null;
          }
      }
  }

  function localeWeekdaysParse (weekdayName, format, strict) {
      var i, mom, regex;

      if (this._weekdaysParseExact) {
          return handleStrictParse$1.call(this, weekdayName, format, strict);
      }

      if (!this._weekdaysParse) {
          this._weekdaysParse = [];
          this._minWeekdaysParse = [];
          this._shortWeekdaysParse = [];
          this._fullWeekdaysParse = [];
      }

      for (i = 0; i < 7; i++) {
          // make the regex if we don't have it already

          mom = createUTC([2000, 1]).day(i);
          if (strict && !this._fullWeekdaysParse[i]) {
              this._fullWeekdaysParse[i] = new RegExp('^' + this.weekdays(mom, '').replace('.', '\\.?') + '$', 'i');
              this._shortWeekdaysParse[i] = new RegExp('^' + this.weekdaysShort(mom, '').replace('.', '\\.?') + '$', 'i');
              this._minWeekdaysParse[i] = new RegExp('^' + this.weekdaysMin(mom, '').replace('.', '\\.?') + '$', 'i');
          }
          if (!this._weekdaysParse[i]) {
              regex = '^' + this.weekdays(mom, '') + '|^' + this.weekdaysShort(mom, '') + '|^' + this.weekdaysMin(mom, '');
              this._weekdaysParse[i] = new RegExp(regex.replace('.', ''), 'i');
          }
          // test the regex
          if (strict && format === 'dddd' && this._fullWeekdaysParse[i].test(weekdayName)) {
              return i;
          } else if (strict && format === 'ddd' && this._shortWeekdaysParse[i].test(weekdayName)) {
              return i;
          } else if (strict && format === 'dd' && this._minWeekdaysParse[i].test(weekdayName)) {
              return i;
          } else if (!strict && this._weekdaysParse[i].test(weekdayName)) {
              return i;
          }
      }
  }

  // MOMENTS

  function getSetDayOfWeek (input) {
      if (!this.isValid()) {
          return input != null ? this : NaN;
      }
      var day = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
      if (input != null) {
          input = parseWeekday(input, this.localeData());
          return this.add(input - day, 'd');
      } else {
          return day;
      }
  }

  function getSetLocaleDayOfWeek (input) {
      if (!this.isValid()) {
          return input != null ? this : NaN;
      }
      var weekday = (this.day() + 7 - this.localeData()._week.dow) % 7;
      return input == null ? weekday : this.add(input - weekday, 'd');
  }

  function getSetISODayOfWeek (input) {
      if (!this.isValid()) {
          return input != null ? this : NaN;
      }

      // behaves the same as moment#day except
      // as a getter, returns 7 instead of 0 (1-7 range instead of 0-6)
      // as a setter, sunday should belong to the previous week.

      if (input != null) {
          var weekday = parseIsoWeekday(input, this.localeData());
          return this.day(this.day() % 7 ? weekday : weekday - 7);
      } else {
          return this.day() || 7;
      }
  }

  var defaultWeekdaysRegex = matchWord;
  function weekdaysRegex (isStrict) {
      if (this._weekdaysParseExact) {
          if (!hasOwnProp(this, '_weekdaysRegex')) {
              computeWeekdaysParse.call(this);
          }
          if (isStrict) {
              return this._weekdaysStrictRegex;
          } else {
              return this._weekdaysRegex;
          }
      } else {
          if (!hasOwnProp(this, '_weekdaysRegex')) {
              this._weekdaysRegex = defaultWeekdaysRegex;
          }
          return this._weekdaysStrictRegex && isStrict ?
              this._weekdaysStrictRegex : this._weekdaysRegex;
      }
  }

  var defaultWeekdaysShortRegex = matchWord;
  function weekdaysShortRegex (isStrict) {
      if (this._weekdaysParseExact) {
          if (!hasOwnProp(this, '_weekdaysRegex')) {
              computeWeekdaysParse.call(this);
          }
          if (isStrict) {
              return this._weekdaysShortStrictRegex;
          } else {
              return this._weekdaysShortRegex;
          }
      } else {
          if (!hasOwnProp(this, '_weekdaysShortRegex')) {
              this._weekdaysShortRegex = defaultWeekdaysShortRegex;
          }
          return this._weekdaysShortStrictRegex && isStrict ?
              this._weekdaysShortStrictRegex : this._weekdaysShortRegex;
      }
  }

  var defaultWeekdaysMinRegex = matchWord;
  function weekdaysMinRegex (isStrict) {
      if (this._weekdaysParseExact) {
          if (!hasOwnProp(this, '_weekdaysRegex')) {
              computeWeekdaysParse.call(this);
          }
          if (isStrict) {
              return this._weekdaysMinStrictRegex;
          } else {
              return this._weekdaysMinRegex;
          }
      } else {
          if (!hasOwnProp(this, '_weekdaysMinRegex')) {
              this._weekdaysMinRegex = defaultWeekdaysMinRegex;
          }
          return this._weekdaysMinStrictRegex && isStrict ?
              this._weekdaysMinStrictRegex : this._weekdaysMinRegex;
      }
  }


  function computeWeekdaysParse () {
      function cmpLenRev(a, b) {
          return b.length - a.length;
      }

      var minPieces = [], shortPieces = [], longPieces = [], mixedPieces = [],
          i, mom, minp, shortp, longp;
      for (i = 0; i < 7; i++) {
          // make the regex if we don't have it already
          mom = createUTC([2000, 1]).day(i);
          minp = this.weekdaysMin(mom, '');
          shortp = this.weekdaysShort(mom, '');
          longp = this.weekdays(mom, '');
          minPieces.push(minp);
          shortPieces.push(shortp);
          longPieces.push(longp);
          mixedPieces.push(minp);
          mixedPieces.push(shortp);
          mixedPieces.push(longp);
      }
      // Sorting makes sure if one weekday (or abbr) is a prefix of another it
      // will match the longer piece.
      minPieces.sort(cmpLenRev);
      shortPieces.sort(cmpLenRev);
      longPieces.sort(cmpLenRev);
      mixedPieces.sort(cmpLenRev);
      for (i = 0; i < 7; i++) {
          shortPieces[i] = regexEscape(shortPieces[i]);
          longPieces[i] = regexEscape(longPieces[i]);
          mixedPieces[i] = regexEscape(mixedPieces[i]);
      }

      this._weekdaysRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');
      this._weekdaysShortRegex = this._weekdaysRegex;
      this._weekdaysMinRegex = this._weekdaysRegex;

      this._weekdaysStrictRegex = new RegExp('^(' + longPieces.join('|') + ')', 'i');
      this._weekdaysShortStrictRegex = new RegExp('^(' + shortPieces.join('|') + ')', 'i');
      this._weekdaysMinStrictRegex = new RegExp('^(' + minPieces.join('|') + ')', 'i');
  }

  // FORMATTING

  function hFormat() {
      return this.hours() % 12 || 12;
  }

  function kFormat() {
      return this.hours() || 24;
  }

  addFormatToken('H', ['HH', 2], 0, 'hour');
  addFormatToken('h', ['hh', 2], 0, hFormat);
  addFormatToken('k', ['kk', 2], 0, kFormat);

  addFormatToken('hmm', 0, 0, function () {
      return '' + hFormat.apply(this) + zeroFill(this.minutes(), 2);
  });

  addFormatToken('hmmss', 0, 0, function () {
      return '' + hFormat.apply(this) + zeroFill(this.minutes(), 2) +
          zeroFill(this.seconds(), 2);
  });

  addFormatToken('Hmm', 0, 0, function () {
      return '' + this.hours() + zeroFill(this.minutes(), 2);
  });

  addFormatToken('Hmmss', 0, 0, function () {
      return '' + this.hours() + zeroFill(this.minutes(), 2) +
          zeroFill(this.seconds(), 2);
  });

  function meridiem (token, lowercase) {
      addFormatToken(token, 0, 0, function () {
          return this.localeData().meridiem(this.hours(), this.minutes(), lowercase);
      });
  }

  meridiem('a', true);
  meridiem('A', false);

  // ALIASES

  addUnitAlias('hour', 'h');

  // PRIORITY
  addUnitPriority('hour', 13);

  // PARSING

  function matchMeridiem (isStrict, locale) {
      return locale._meridiemParse;
  }

  addRegexToken('a',  matchMeridiem);
  addRegexToken('A',  matchMeridiem);
  addRegexToken('H',  match1to2);
  addRegexToken('h',  match1to2);
  addRegexToken('k',  match1to2);
  addRegexToken('HH', match1to2, match2);
  addRegexToken('hh', match1to2, match2);
  addRegexToken('kk', match1to2, match2);

  addRegexToken('hmm', match3to4);
  addRegexToken('hmmss', match5to6);
  addRegexToken('Hmm', match3to4);
  addRegexToken('Hmmss', match5to6);

  addParseToken(['H', 'HH'], HOUR);
  addParseToken(['k', 'kk'], function (input, array, config) {
      var kInput = toInt(input);
      array[HOUR] = kInput === 24 ? 0 : kInput;
  });
  addParseToken(['a', 'A'], function (input, array, config) {
      config._isPm = config._locale.isPM(input);
      config._meridiem = input;
  });
  addParseToken(['h', 'hh'], function (input, array, config) {
      array[HOUR] = toInt(input);
      getParsingFlags(config).bigHour = true;
  });
  addParseToken('hmm', function (input, array, config) {
      var pos = input.length - 2;
      array[HOUR] = toInt(input.substr(0, pos));
      array[MINUTE] = toInt(input.substr(pos));
      getParsingFlags(config).bigHour = true;
  });
  addParseToken('hmmss', function (input, array, config) {
      var pos1 = input.length - 4;
      var pos2 = input.length - 2;
      array[HOUR] = toInt(input.substr(0, pos1));
      array[MINUTE] = toInt(input.substr(pos1, 2));
      array[SECOND] = toInt(input.substr(pos2));
      getParsingFlags(config).bigHour = true;
  });
  addParseToken('Hmm', function (input, array, config) {
      var pos = input.length - 2;
      array[HOUR] = toInt(input.substr(0, pos));
      array[MINUTE] = toInt(input.substr(pos));
  });
  addParseToken('Hmmss', function (input, array, config) {
      var pos1 = input.length - 4;
      var pos2 = input.length - 2;
      array[HOUR] = toInt(input.substr(0, pos1));
      array[MINUTE] = toInt(input.substr(pos1, 2));
      array[SECOND] = toInt(input.substr(pos2));
  });

  // LOCALES

  function localeIsPM (input) {
      // IE8 Quirks Mode & IE7 Standards Mode do not allow accessing strings like arrays
      // Using charAt should be more compatible.
      return ((input + '').toLowerCase().charAt(0) === 'p');
  }

  var defaultLocaleMeridiemParse = /[ap]\.?m?\.?/i;
  function localeMeridiem (hours, minutes, isLower) {
      if (hours > 11) {
          return isLower ? 'pm' : 'PM';
      } else {
          return isLower ? 'am' : 'AM';
      }
  }


  // MOMENTS

  // Setting the hour should keep the time, because the user explicitly
  // specified which hour they want. So trying to maintain the same hour (in
  // a new timezone) makes sense. Adding/subtracting hours does not follow
  // this rule.
  var getSetHour = makeGetSet('Hours', true);

  var baseConfig = {
      calendar: defaultCalendar,
      longDateFormat: defaultLongDateFormat,
      invalidDate: defaultInvalidDate,
      ordinal: defaultOrdinal,
      dayOfMonthOrdinalParse: defaultDayOfMonthOrdinalParse,
      relativeTime: defaultRelativeTime,

      months: defaultLocaleMonths,
      monthsShort: defaultLocaleMonthsShort,

      week: defaultLocaleWeek,

      weekdays: defaultLocaleWeekdays,
      weekdaysMin: defaultLocaleWeekdaysMin,
      weekdaysShort: defaultLocaleWeekdaysShort,

      meridiemParse: defaultLocaleMeridiemParse
  };

  // internal storage for locale config files
  var locales = {};
  var localeFamilies = {};
  var globalLocale;

  function normalizeLocale(key) {
      return key ? key.toLowerCase().replace('_', '-') : key;
  }

  // pick the locale from the array
  // try ['en-au', 'en-gb'] as 'en-au', 'en-gb', 'en', as in move through the list trying each
  // substring from most specific to least, but move to the next array item if it's a more specific variant than the current root
  function chooseLocale(names) {
      var i = 0, j, next, locale, split;

      while (i < names.length) {
          split = normalizeLocale(names[i]).split('-');
          j = split.length;
          next = normalizeLocale(names[i + 1]);
          next = next ? next.split('-') : null;
          while (j > 0) {
              locale = loadLocale(split.slice(0, j).join('-'));
              if (locale) {
                  return locale;
              }
              if (next && next.length >= j && compareArrays(split, next, true) >= j - 1) {
                  //the next array item is better than a shallower substring of this one
                  break;
              }
              j--;
          }
          i++;
      }
      return globalLocale;
  }

  function loadLocale(name) {
      var oldLocale = null;
      // TODO: Find a better way to register and load all the locales in Node
      if (!locales[name] && (typeof module !== 'undefined') &&
              module && module.exports) {
          try {
              oldLocale = globalLocale._abbr;
              var aliasedRequire = require;
              aliasedRequire('./locale/' + name);
              getSetGlobalLocale(oldLocale);
          } catch (e) {}
      }
      return locales[name];
  }

  // This function will load locale and then set the global locale.  If
  // no arguments are passed in, it will simply return the current global
  // locale key.
  function getSetGlobalLocale (key, values) {
      var data;
      if (key) {
          if (isUndefined(values)) {
              data = getLocale(key);
          }
          else {
              data = defineLocale(key, values);
          }

          if (data) {
              // moment.duration._locale = moment._locale = data;
              globalLocale = data;
          }
          else {
              if ((typeof console !==  'undefined') && console.warn) {
                  //warn user if arguments are passed but the locale could not be set
                  console.warn('Locale ' + key +  ' not found. Did you forget to load it?');
              }
          }
      }

      return globalLocale._abbr;
  }

  function defineLocale (name, config) {
      if (config !== null) {
          var locale, parentConfig = baseConfig;
          config.abbr = name;
          if (locales[name] != null) {
              deprecateSimple('defineLocaleOverride',
                      'use moment.updateLocale(localeName, config) to change ' +
                      'an existing locale. moment.defineLocale(localeName, ' +
                      'config) should only be used for creating a new locale ' +
                      'See http://momentjs.com/guides/#/warnings/define-locale/ for more info.');
              parentConfig = locales[name]._config;
          } else if (config.parentLocale != null) {
              if (locales[config.parentLocale] != null) {
                  parentConfig = locales[config.parentLocale]._config;
              } else {
                  locale = loadLocale(config.parentLocale);
                  if (locale != null) {
                      parentConfig = locale._config;
                  } else {
                      if (!localeFamilies[config.parentLocale]) {
                          localeFamilies[config.parentLocale] = [];
                      }
                      localeFamilies[config.parentLocale].push({
                          name: name,
                          config: config
                      });
                      return null;
                  }
              }
          }
          locales[name] = new Locale(mergeConfigs(parentConfig, config));

          if (localeFamilies[name]) {
              localeFamilies[name].forEach(function (x) {
                  defineLocale(x.name, x.config);
              });
          }

          // backwards compat for now: also set the locale
          // make sure we set the locale AFTER all child locales have been
          // created, so we won't end up with the child locale set.
          getSetGlobalLocale(name);


          return locales[name];
      } else {
          // useful for testing
          delete locales[name];
          return null;
      }
  }

  function updateLocale(name, config) {
      if (config != null) {
          var locale, tmpLocale, parentConfig = baseConfig;
          // MERGE
          tmpLocale = loadLocale(name);
          if (tmpLocale != null) {
              parentConfig = tmpLocale._config;
          }
          config = mergeConfigs(parentConfig, config);
          locale = new Locale(config);
          locale.parentLocale = locales[name];
          locales[name] = locale;

          // backwards compat for now: also set the locale
          getSetGlobalLocale(name);
      } else {
          // pass null for config to unupdate, useful for tests
          if (locales[name] != null) {
              if (locales[name].parentLocale != null) {
                  locales[name] = locales[name].parentLocale;
              } else if (locales[name] != null) {
                  delete locales[name];
              }
          }
      }
      return locales[name];
  }

  // returns locale data
  function getLocale (key) {
      var locale;

      if (key && key._locale && key._locale._abbr) {
          key = key._locale._abbr;
      }

      if (!key) {
          return globalLocale;
      }

      if (!isArray$1(key)) {
          //short-circuit everything else
          locale = loadLocale(key);
          if (locale) {
              return locale;
          }
          key = [key];
      }

      return chooseLocale(key);
  }

  function listLocales() {
      return keys$2(locales);
  }

  function checkOverflow (m) {
      var overflow;
      var a = m._a;

      if (a && getParsingFlags(m).overflow === -2) {
          overflow =
              a[MONTH]       < 0 || a[MONTH]       > 11  ? MONTH :
              a[DATE]        < 1 || a[DATE]        > daysInMonth(a[YEAR], a[MONTH]) ? DATE :
              a[HOUR]        < 0 || a[HOUR]        > 24 || (a[HOUR] === 24 && (a[MINUTE] !== 0 || a[SECOND] !== 0 || a[MILLISECOND] !== 0)) ? HOUR :
              a[MINUTE]      < 0 || a[MINUTE]      > 59  ? MINUTE :
              a[SECOND]      < 0 || a[SECOND]      > 59  ? SECOND :
              a[MILLISECOND] < 0 || a[MILLISECOND] > 999 ? MILLISECOND :
              -1;

          if (getParsingFlags(m)._overflowDayOfYear && (overflow < YEAR || overflow > DATE)) {
              overflow = DATE;
          }
          if (getParsingFlags(m)._overflowWeeks && overflow === -1) {
              overflow = WEEK;
          }
          if (getParsingFlags(m)._overflowWeekday && overflow === -1) {
              overflow = WEEKDAY;
          }

          getParsingFlags(m).overflow = overflow;
      }

      return m;
  }

  // Pick the first defined of two or three arguments.
  function defaults(a, b, c) {
      if (a != null) {
          return a;
      }
      if (b != null) {
          return b;
      }
      return c;
  }

  function currentDateArray(config) {
      // hooks is actually the exported moment object
      var nowValue = new Date(hooks.now());
      if (config._useUTC) {
          return [nowValue.getUTCFullYear(), nowValue.getUTCMonth(), nowValue.getUTCDate()];
      }
      return [nowValue.getFullYear(), nowValue.getMonth(), nowValue.getDate()];
  }

  // convert an array to a date.
  // the array should mirror the parameters below
  // note: all values past the year are optional and will default to the lowest possible value.
  // [year, month, day , hour, minute, second, millisecond]
  function configFromArray (config) {
      var i, date, input = [], currentDate, expectedWeekday, yearToUse;

      if (config._d) {
          return;
      }

      currentDate = currentDateArray(config);

      //compute day of the year from weeks and weekdays
      if (config._w && config._a[DATE] == null && config._a[MONTH] == null) {
          dayOfYearFromWeekInfo(config);
      }

      //if the day of the year is set, figure out what it is
      if (config._dayOfYear != null) {
          yearToUse = defaults(config._a[YEAR], currentDate[YEAR]);

          if (config._dayOfYear > daysInYear(yearToUse) || config._dayOfYear === 0) {
              getParsingFlags(config)._overflowDayOfYear = true;
          }

          date = createUTCDate(yearToUse, 0, config._dayOfYear);
          config._a[MONTH] = date.getUTCMonth();
          config._a[DATE] = date.getUTCDate();
      }

      // Default to current date.
      // * if no year, month, day of month are given, default to today
      // * if day of month is given, default month and year
      // * if month is given, default only year
      // * if year is given, don't default anything
      for (i = 0; i < 3 && config._a[i] == null; ++i) {
          config._a[i] = input[i] = currentDate[i];
      }

      // Zero out whatever was not defaulted, including time
      for (; i < 7; i++) {
          config._a[i] = input[i] = (config._a[i] == null) ? (i === 2 ? 1 : 0) : config._a[i];
      }

      // Check for 24:00:00.000
      if (config._a[HOUR] === 24 &&
              config._a[MINUTE] === 0 &&
              config._a[SECOND] === 0 &&
              config._a[MILLISECOND] === 0) {
          config._nextDay = true;
          config._a[HOUR] = 0;
      }

      config._d = (config._useUTC ? createUTCDate : createDate).apply(null, input);
      expectedWeekday = config._useUTC ? config._d.getUTCDay() : config._d.getDay();

      // Apply timezone offset from input. The actual utcOffset can be changed
      // with parseZone.
      if (config._tzm != null) {
          config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);
      }

      if (config._nextDay) {
          config._a[HOUR] = 24;
      }

      // check for mismatching day of week
      if (config._w && typeof config._w.d !== 'undefined' && config._w.d !== expectedWeekday) {
          getParsingFlags(config).weekdayMismatch = true;
      }
  }

  function dayOfYearFromWeekInfo(config) {
      var w, weekYear, week, weekday, dow, doy, temp, weekdayOverflow;

      w = config._w;
      if (w.GG != null || w.W != null || w.E != null) {
          dow = 1;
          doy = 4;

          // TODO: We need to take the current isoWeekYear, but that depends on
          // how we interpret now (local, utc, fixed offset). So create
          // a now version of current config (take local/utc/offset flags, and
          // create now).
          weekYear = defaults(w.GG, config._a[YEAR], weekOfYear(createLocal(), 1, 4).year);
          week = defaults(w.W, 1);
          weekday = defaults(w.E, 1);
          if (weekday < 1 || weekday > 7) {
              weekdayOverflow = true;
          }
      } else {
          dow = config._locale._week.dow;
          doy = config._locale._week.doy;

          var curWeek = weekOfYear(createLocal(), dow, doy);

          weekYear = defaults(w.gg, config._a[YEAR], curWeek.year);

          // Default to current week.
          week = defaults(w.w, curWeek.week);

          if (w.d != null) {
              // weekday -- low day numbers are considered next week
              weekday = w.d;
              if (weekday < 0 || weekday > 6) {
                  weekdayOverflow = true;
              }
          } else if (w.e != null) {
              // local weekday -- counting starts from beginning of week
              weekday = w.e + dow;
              if (w.e < 0 || w.e > 6) {
                  weekdayOverflow = true;
              }
          } else {
              // default to beginning of week
              weekday = dow;
          }
      }
      if (week < 1 || week > weeksInYear(weekYear, dow, doy)) {
          getParsingFlags(config)._overflowWeeks = true;
      } else if (weekdayOverflow != null) {
          getParsingFlags(config)._overflowWeekday = true;
      } else {
          temp = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy);
          config._a[YEAR] = temp.year;
          config._dayOfYear = temp.dayOfYear;
      }
  }

  // iso 8601 regex
  // 0000-00-00 0000-W00 or 0000-W00-0 + T + 00 or 00:00 or 00:00:00 or 00:00:00.000 + +00:00 or +0000 or +00)
  var extendedIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/;
  var basicIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/;

  var tzRegex = /Z|[+-]\d\d(?::?\d\d)?/;

  var isoDates = [
      ['YYYYYY-MM-DD', /[+-]\d{6}-\d\d-\d\d/],
      ['YYYY-MM-DD', /\d{4}-\d\d-\d\d/],
      ['GGGG-[W]WW-E', /\d{4}-W\d\d-\d/],
      ['GGGG-[W]WW', /\d{4}-W\d\d/, false],
      ['YYYY-DDD', /\d{4}-\d{3}/],
      ['YYYY-MM', /\d{4}-\d\d/, false],
      ['YYYYYYMMDD', /[+-]\d{10}/],
      ['YYYYMMDD', /\d{8}/],
      // YYYYMM is NOT allowed by the standard
      ['GGGG[W]WWE', /\d{4}W\d{3}/],
      ['GGGG[W]WW', /\d{4}W\d{2}/, false],
      ['YYYYDDD', /\d{7}/]
  ];

  // iso time formats and regexes
  var isoTimes = [
      ['HH:mm:ss.SSSS', /\d\d:\d\d:\d\d\.\d+/],
      ['HH:mm:ss,SSSS', /\d\d:\d\d:\d\d,\d+/],
      ['HH:mm:ss', /\d\d:\d\d:\d\d/],
      ['HH:mm', /\d\d:\d\d/],
      ['HHmmss.SSSS', /\d\d\d\d\d\d\.\d+/],
      ['HHmmss,SSSS', /\d\d\d\d\d\d,\d+/],
      ['HHmmss', /\d\d\d\d\d\d/],
      ['HHmm', /\d\d\d\d/],
      ['HH', /\d\d/]
  ];

  var aspNetJsonRegex = /^\/?Date\((\-?\d+)/i;

  // date from iso format
  function configFromISO(config) {
      var i, l,
          string = config._i,
          match = extendedIsoRegex.exec(string) || basicIsoRegex.exec(string),
          allowTime, dateFormat, timeFormat, tzFormat;

      if (match) {
          getParsingFlags(config).iso = true;

          for (i = 0, l = isoDates.length; i < l; i++) {
              if (isoDates[i][1].exec(match[1])) {
                  dateFormat = isoDates[i][0];
                  allowTime = isoDates[i][2] !== false;
                  break;
              }
          }
          if (dateFormat == null) {
              config._isValid = false;
              return;
          }
          if (match[3]) {
              for (i = 0, l = isoTimes.length; i < l; i++) {
                  if (isoTimes[i][1].exec(match[3])) {
                      // match[2] should be 'T' or space
                      timeFormat = (match[2] || ' ') + isoTimes[i][0];
                      break;
                  }
              }
              if (timeFormat == null) {
                  config._isValid = false;
                  return;
              }
          }
          if (!allowTime && timeFormat != null) {
              config._isValid = false;
              return;
          }
          if (match[4]) {
              if (tzRegex.exec(match[4])) {
                  tzFormat = 'Z';
              } else {
                  config._isValid = false;
                  return;
              }
          }
          config._f = dateFormat + (timeFormat || '') + (tzFormat || '');
          configFromStringAndFormat(config);
      } else {
          config._isValid = false;
      }
  }

  // RFC 2822 regex: For details see https://tools.ietf.org/html/rfc2822#section-3.3
  var rfc2822 = /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|([+-]\d{4}))$/;

  function extractFromRFC2822Strings(yearStr, monthStr, dayStr, hourStr, minuteStr, secondStr) {
      var result = [
          untruncateYear(yearStr),
          defaultLocaleMonthsShort.indexOf(monthStr),
          parseInt(dayStr, 10),
          parseInt(hourStr, 10),
          parseInt(minuteStr, 10)
      ];

      if (secondStr) {
          result.push(parseInt(secondStr, 10));
      }

      return result;
  }

  function untruncateYear(yearStr) {
      var year = parseInt(yearStr, 10);
      if (year <= 49) {
          return 2000 + year;
      } else if (year <= 999) {
          return 1900 + year;
      }
      return year;
  }

  function preprocessRFC2822(s) {
      // Remove comments and folding whitespace and replace multiple-spaces with a single space
      return s.replace(/\([^)]*\)|[\n\t]/g, ' ').replace(/(\s\s+)/g, ' ').replace(/^\s\s*/, '').replace(/\s\s*$/, '');
  }

  function checkWeekday(weekdayStr, parsedInput, config) {
      if (weekdayStr) {
          // TODO: Replace the vanilla JS Date object with an indepentent day-of-week check.
          var weekdayProvided = defaultLocaleWeekdaysShort.indexOf(weekdayStr),
              weekdayActual = new Date(parsedInput[0], parsedInput[1], parsedInput[2]).getDay();
          if (weekdayProvided !== weekdayActual) {
              getParsingFlags(config).weekdayMismatch = true;
              config._isValid = false;
              return false;
          }
      }
      return true;
  }

  var obsOffsets = {
      UT: 0,
      GMT: 0,
      EDT: -4 * 60,
      EST: -5 * 60,
      CDT: -5 * 60,
      CST: -6 * 60,
      MDT: -6 * 60,
      MST: -7 * 60,
      PDT: -7 * 60,
      PST: -8 * 60
  };

  function calculateOffset(obsOffset, militaryOffset, numOffset) {
      if (obsOffset) {
          return obsOffsets[obsOffset];
      } else if (militaryOffset) {
          // the only allowed military tz is Z
          return 0;
      } else {
          var hm = parseInt(numOffset, 10);
          var m = hm % 100, h = (hm - m) / 100;
          return h * 60 + m;
      }
  }

  // date and time from ref 2822 format
  function configFromRFC2822(config) {
      var match = rfc2822.exec(preprocessRFC2822(config._i));
      if (match) {
          var parsedArray = extractFromRFC2822Strings(match[4], match[3], match[2], match[5], match[6], match[7]);
          if (!checkWeekday(match[1], parsedArray, config)) {
              return;
          }

          config._a = parsedArray;
          config._tzm = calculateOffset(match[8], match[9], match[10]);

          config._d = createUTCDate.apply(null, config._a);
          config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);

          getParsingFlags(config).rfc2822 = true;
      } else {
          config._isValid = false;
      }
  }

  // date from iso format or fallback
  function configFromString(config) {
      var matched = aspNetJsonRegex.exec(config._i);

      if (matched !== null) {
          config._d = new Date(+matched[1]);
          return;
      }

      configFromISO(config);
      if (config._isValid === false) {
          delete config._isValid;
      } else {
          return;
      }

      configFromRFC2822(config);
      if (config._isValid === false) {
          delete config._isValid;
      } else {
          return;
      }

      // Final attempt, use Input Fallback
      hooks.createFromInputFallback(config);
  }

  hooks.createFromInputFallback = deprecate(
      'value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), ' +
      'which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are ' +
      'discouraged and will be removed in an upcoming major release. Please refer to ' +
      'http://momentjs.com/guides/#/warnings/js-date/ for more info.',
      function (config) {
          config._d = new Date(config._i + (config._useUTC ? ' UTC' : ''));
      }
  );

  // constant that refers to the ISO standard
  hooks.ISO_8601 = function () {};

  // constant that refers to the RFC 2822 form
  hooks.RFC_2822 = function () {};

  // date from string and format string
  function configFromStringAndFormat(config) {
      // TODO: Move this to another part of the creation flow to prevent circular deps
      if (config._f === hooks.ISO_8601) {
          configFromISO(config);
          return;
      }
      if (config._f === hooks.RFC_2822) {
          configFromRFC2822(config);
          return;
      }
      config._a = [];
      getParsingFlags(config).empty = true;

      // This array is used to make a Date, either with `new Date` or `Date.UTC`
      var string = '' + config._i,
          i, parsedInput, tokens, token, skipped,
          stringLength = string.length,
          totalParsedInputLength = 0;

      tokens = expandFormat(config._f, config._locale).match(formattingTokens) || [];

      for (i = 0; i < tokens.length; i++) {
          token = tokens[i];
          parsedInput = (string.match(getParseRegexForToken(token, config)) || [])[0];
          // console.log('token', token, 'parsedInput', parsedInput,
          //         'regex', getParseRegexForToken(token, config));
          if (parsedInput) {
              skipped = string.substr(0, string.indexOf(parsedInput));
              if (skipped.length > 0) {
                  getParsingFlags(config).unusedInput.push(skipped);
              }
              string = string.slice(string.indexOf(parsedInput) + parsedInput.length);
              totalParsedInputLength += parsedInput.length;
          }
          // don't parse if it's not a known token
          if (formatTokenFunctions[token]) {
              if (parsedInput) {
                  getParsingFlags(config).empty = false;
              }
              else {
                  getParsingFlags(config).unusedTokens.push(token);
              }
              addTimeToArrayFromToken(token, parsedInput, config);
          }
          else if (config._strict && !parsedInput) {
              getParsingFlags(config).unusedTokens.push(token);
          }
      }

      // add remaining unparsed input length to the string
      getParsingFlags(config).charsLeftOver = stringLength - totalParsedInputLength;
      if (string.length > 0) {
          getParsingFlags(config).unusedInput.push(string);
      }

      // clear _12h flag if hour is <= 12
      if (config._a[HOUR] <= 12 &&
          getParsingFlags(config).bigHour === true &&
          config._a[HOUR] > 0) {
          getParsingFlags(config).bigHour = undefined;
      }

      getParsingFlags(config).parsedDateParts = config._a.slice(0);
      getParsingFlags(config).meridiem = config._meridiem;
      // handle meridiem
      config._a[HOUR] = meridiemFixWrap(config._locale, config._a[HOUR], config._meridiem);

      configFromArray(config);
      checkOverflow(config);
  }


  function meridiemFixWrap (locale, hour, meridiem) {
      var isPm;

      if (meridiem == null) {
          // nothing to do
          return hour;
      }
      if (locale.meridiemHour != null) {
          return locale.meridiemHour(hour, meridiem);
      } else if (locale.isPM != null) {
          // Fallback
          isPm = locale.isPM(meridiem);
          if (isPm && hour < 12) {
              hour += 12;
          }
          if (!isPm && hour === 12) {
              hour = 0;
          }
          return hour;
      } else {
          // this is not supposed to happen
          return hour;
      }
  }

  // date from string and array of format strings
  function configFromStringAndArray(config) {
      var tempConfig,
          bestMoment,

          scoreToBeat,
          i,
          currentScore;

      if (config._f.length === 0) {
          getParsingFlags(config).invalidFormat = true;
          config._d = new Date(NaN);
          return;
      }

      for (i = 0; i < config._f.length; i++) {
          currentScore = 0;
          tempConfig = copyConfig({}, config);
          if (config._useUTC != null) {
              tempConfig._useUTC = config._useUTC;
          }
          tempConfig._f = config._f[i];
          configFromStringAndFormat(tempConfig);

          if (!isValid(tempConfig)) {
              continue;
          }

          // if there is any input that was not parsed add a penalty for that format
          currentScore += getParsingFlags(tempConfig).charsLeftOver;

          //or tokens
          currentScore += getParsingFlags(tempConfig).unusedTokens.length * 10;

          getParsingFlags(tempConfig).score = currentScore;

          if (scoreToBeat == null || currentScore < scoreToBeat) {
              scoreToBeat = currentScore;
              bestMoment = tempConfig;
          }
      }

      extend(config, bestMoment || tempConfig);
  }

  function configFromObject(config) {
      if (config._d) {
          return;
      }

      var i = normalizeObjectUnits(config._i);
      config._a = map([i.year, i.month, i.day || i.date, i.hour, i.minute, i.second, i.millisecond], function (obj) {
          return obj && parseInt(obj, 10);
      });

      configFromArray(config);
  }

  function createFromConfig (config) {
      var res = new Moment(checkOverflow(prepareConfig(config)));
      if (res._nextDay) {
          // Adding is smart enough around DST
          res.add(1, 'd');
          res._nextDay = undefined;
      }

      return res;
  }

  function prepareConfig (config) {
      var input = config._i,
          format = config._f;

      config._locale = config._locale || getLocale(config._l);

      if (input === null || (format === undefined && input === '')) {
          return createInvalid({nullInput: true});
      }

      if (typeof input === 'string') {
          config._i = input = config._locale.preparse(input);
      }

      if (isMoment(input)) {
          return new Moment(checkOverflow(input));
      } else if (isDate(input)) {
          config._d = input;
      } else if (isArray$1(format)) {
          configFromStringAndArray(config);
      } else if (format) {
          configFromStringAndFormat(config);
      }  else {
          configFromInput(config);
      }

      if (!isValid(config)) {
          config._d = null;
      }

      return config;
  }

  function configFromInput(config) {
      var input = config._i;
      if (isUndefined(input)) {
          config._d = new Date(hooks.now());
      } else if (isDate(input)) {
          config._d = new Date(input.valueOf());
      } else if (typeof input === 'string') {
          configFromString(config);
      } else if (isArray$1(input)) {
          config._a = map(input.slice(0), function (obj) {
              return parseInt(obj, 10);
          });
          configFromArray(config);
      } else if (isObject$1(input)) {
          configFromObject(config);
      } else if (isNumber(input)) {
          // from milliseconds
          config._d = new Date(input);
      } else {
          hooks.createFromInputFallback(config);
      }
  }

  function createLocalOrUTC (input, format, locale, strict, isUTC) {
      var c = {};

      if (locale === true || locale === false) {
          strict = locale;
          locale = undefined;
      }

      if ((isObject$1(input) && isObjectEmpty(input)) ||
              (isArray$1(input) && input.length === 0)) {
          input = undefined;
      }
      // object construction must be done this way.
      // https://github.com/moment/moment/issues/1423
      c._isAMomentObject = true;
      c._useUTC = c._isUTC = isUTC;
      c._l = locale;
      c._i = input;
      c._f = format;
      c._strict = strict;

      return createFromConfig(c);
  }

  function createLocal (input, format, locale, strict) {
      return createLocalOrUTC(input, format, locale, strict, false);
  }

  var prototypeMin = deprecate(
      'moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/',
      function () {
          var other = createLocal.apply(null, arguments);
          if (this.isValid() && other.isValid()) {
              return other < this ? this : other;
          } else {
              return createInvalid();
          }
      }
  );

  var prototypeMax = deprecate(
      'moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/',
      function () {
          var other = createLocal.apply(null, arguments);
          if (this.isValid() && other.isValid()) {
              return other > this ? this : other;
          } else {
              return createInvalid();
          }
      }
  );

  // Pick a moment m from moments so that m[fn](other) is true for all
  // other. This relies on the function fn to be transitive.
  //
  // moments should either be an array of moment objects or an array, whose
  // first element is an array of moment objects.
  function pickBy(fn, moments) {
      var res, i;
      if (moments.length === 1 && isArray$1(moments[0])) {
          moments = moments[0];
      }
      if (!moments.length) {
          return createLocal();
      }
      res = moments[0];
      for (i = 1; i < moments.length; ++i) {
          if (!moments[i].isValid() || moments[i][fn](res)) {
              res = moments[i];
          }
      }
      return res;
  }

  // TODO: Use [].sort instead?
  function min$3 () {
      var args = [].slice.call(arguments, 0);

      return pickBy('isBefore', args);
  }

  function max$3 () {
      var args = [].slice.call(arguments, 0);

      return pickBy('isAfter', args);
  }

  var now = function () {
      return Date.now ? Date.now() : +(new Date());
  };

  var ordering = ['year', 'quarter', 'month', 'week', 'day', 'hour', 'minute', 'second', 'millisecond'];

  function isDurationValid(m) {
      for (var key in m) {
          if (!(indexOf$1.call(ordering, key) !== -1 && (m[key] == null || !isNaN(m[key])))) {
              return false;
          }
      }

      var unitHasDecimal = false;
      for (var i = 0; i < ordering.length; ++i) {
          if (m[ordering[i]]) {
              if (unitHasDecimal) {
                  return false; // only allow non-integers for smallest unit
              }
              if (parseFloat(m[ordering[i]]) !== toInt(m[ordering[i]])) {
                  unitHasDecimal = true;
              }
          }
      }

      return true;
  }

  function isValid$1() {
      return this._isValid;
  }

  function createInvalid$1() {
      return createDuration(NaN);
  }

  function Duration (duration) {
      var normalizedInput = normalizeObjectUnits(duration),
          years = normalizedInput.year || 0,
          quarters = normalizedInput.quarter || 0,
          months = normalizedInput.month || 0,
          weeks = normalizedInput.week || normalizedInput.isoWeek || 0,
          days = normalizedInput.day || 0,
          hours = normalizedInput.hour || 0,
          minutes = normalizedInput.minute || 0,
          seconds = normalizedInput.second || 0,
          milliseconds = normalizedInput.millisecond || 0;

      this._isValid = isDurationValid(normalizedInput);

      // representation for dateAddRemove
      this._milliseconds = +milliseconds +
          seconds * 1e3 + // 1000
          minutes * 6e4 + // 1000 * 60
          hours * 1000 * 60 * 60; //using 1000 * 60 * 60 instead of 36e5 to avoid floating point rounding errors https://github.com/moment/moment/issues/2978
      // Because of dateAddRemove treats 24 hours as different from a
      // day when working around DST, we need to store them separately
      this._days = +days +
          weeks * 7;
      // It is impossible to translate months into days without knowing
      // which months you are are talking about, so we have to store
      // it separately.
      this._months = +months +
          quarters * 3 +
          years * 12;

      this._data = {};

      this._locale = getLocale();

      this._bubble();
  }

  function isDuration (obj) {
      return obj instanceof Duration;
  }

  function absRound (number) {
      if (number < 0) {
          return Math.round(-1 * number) * -1;
      } else {
          return Math.round(number);
      }
  }

  // FORMATTING

  function offset (token, separator) {
      addFormatToken(token, 0, 0, function () {
          var offset = this.utcOffset();
          var sign = '+';
          if (offset < 0) {
              offset = -offset;
              sign = '-';
          }
          return sign + zeroFill(~~(offset / 60), 2) + separator + zeroFill(~~(offset) % 60, 2);
      });
  }

  offset('Z', ':');
  offset('ZZ', '');

  // PARSING

  addRegexToken('Z',  matchShortOffset);
  addRegexToken('ZZ', matchShortOffset);
  addParseToken(['Z', 'ZZ'], function (input, array, config) {
      config._useUTC = true;
      config._tzm = offsetFromString(matchShortOffset, input);
  });

  // HELPERS

  // timezone chunker
  // '+10:00' > ['10',  '00']
  // '-1530'  > ['-15', '30']
  var chunkOffset = /([\+\-]|\d\d)/gi;

  function offsetFromString(matcher, string) {
      var matches = (string || '').match(matcher);

      if (matches === null) {
          return null;
      }

      var chunk   = matches[matches.length - 1] || [];
      var parts   = (chunk + '').match(chunkOffset) || ['-', 0, 0];
      var minutes = +(parts[1] * 60) + toInt(parts[2]);

      return minutes === 0 ?
        0 :
        parts[0] === '+' ? minutes : -minutes;
  }

  // Return a moment from input, that is local/utc/zone equivalent to model.
  function cloneWithOffset(input, model) {
      var res, diff;
      if (model._isUTC) {
          res = model.clone();
          diff = (isMoment(input) || isDate(input) ? input.valueOf() : createLocal(input).valueOf()) - res.valueOf();
          // Use low-level api, because this fn is low-level api.
          res._d.setTime(res._d.valueOf() + diff);
          hooks.updateOffset(res, false);
          return res;
      } else {
          return createLocal(input).local();
      }
  }

  function getDateOffset (m) {
      // On Firefox.24 Date#getTimezoneOffset returns a floating point.
      // https://github.com/moment/moment/pull/1871
      return -Math.round(m._d.getTimezoneOffset() / 15) * 15;
  }

  // HOOKS

  // This function will be called whenever a moment is mutated.
  // It is intended to keep the offset in sync with the timezone.
  hooks.updateOffset = function () {};

  // MOMENTS

  // keepLocalTime = true means only change the timezone, without
  // affecting the local hour. So 5:31:26 +0300 --[utcOffset(2, true)]-->
  // 5:31:26 +0200 It is possible that 5:31:26 doesn't exist with offset
  // +0200, so we adjust the time as needed, to be valid.
  //
  // Keeping the time actually adds/subtracts (one hour)
  // from the actual represented time. That is why we call updateOffset
  // a second time. In case it wants us to change the offset again
  // _changeInProgress == true case, then we have to adjust, because
  // there is no such time in the given timezone.
  function getSetOffset (input, keepLocalTime, keepMinutes) {
      var offset = this._offset || 0,
          localAdjust;
      if (!this.isValid()) {
          return input != null ? this : NaN;
      }
      if (input != null) {
          if (typeof input === 'string') {
              input = offsetFromString(matchShortOffset, input);
              if (input === null) {
                  return this;
              }
          } else if (Math.abs(input) < 16 && !keepMinutes) {
              input = input * 60;
          }
          if (!this._isUTC && keepLocalTime) {
              localAdjust = getDateOffset(this);
          }
          this._offset = input;
          this._isUTC = true;
          if (localAdjust != null) {
              this.add(localAdjust, 'm');
          }
          if (offset !== input) {
              if (!keepLocalTime || this._changeInProgress) {
                  addSubtract(this, createDuration(input - offset, 'm'), 1, false);
              } else if (!this._changeInProgress) {
                  this._changeInProgress = true;
                  hooks.updateOffset(this, true);
                  this._changeInProgress = null;
              }
          }
          return this;
      } else {
          return this._isUTC ? offset : getDateOffset(this);
      }
  }

  function getSetZone (input, keepLocalTime) {
      if (input != null) {
          if (typeof input !== 'string') {
              input = -input;
          }

          this.utcOffset(input, keepLocalTime);

          return this;
      } else {
          return -this.utcOffset();
      }
  }

  function setOffsetToUTC (keepLocalTime) {
      return this.utcOffset(0, keepLocalTime);
  }

  function setOffsetToLocal (keepLocalTime) {
      if (this._isUTC) {
          this.utcOffset(0, keepLocalTime);
          this._isUTC = false;

          if (keepLocalTime) {
              this.subtract(getDateOffset(this), 'm');
          }
      }
      return this;
  }

  function setOffsetToParsedOffset () {
      if (this._tzm != null) {
          this.utcOffset(this._tzm, false, true);
      } else if (typeof this._i === 'string') {
          var tZone = offsetFromString(matchOffset, this._i);
          if (tZone != null) {
              this.utcOffset(tZone);
          }
          else {
              this.utcOffset(0, true);
          }
      }
      return this;
  }

  function hasAlignedHourOffset (input) {
      if (!this.isValid()) {
          return false;
      }
      input = input ? createLocal(input).utcOffset() : 0;

      return (this.utcOffset() - input) % 60 === 0;
  }

  function isDaylightSavingTime () {
      return (
          this.utcOffset() > this.clone().month(0).utcOffset() ||
          this.utcOffset() > this.clone().month(5).utcOffset()
      );
  }

  function isDaylightSavingTimeShifted () {
      if (!isUndefined(this._isDSTShifted)) {
          return this._isDSTShifted;
      }

      var c = {};

      copyConfig(c, this);
      c = prepareConfig(c);

      if (c._a) {
          var other = c._isUTC ? createUTC(c._a) : createLocal(c._a);
          this._isDSTShifted = this.isValid() &&
              compareArrays(c._a, other.toArray()) > 0;
      } else {
          this._isDSTShifted = false;
      }

      return this._isDSTShifted;
  }

  function isLocal () {
      return this.isValid() ? !this._isUTC : false;
  }

  function isUtcOffset () {
      return this.isValid() ? this._isUTC : false;
  }

  function isUtc () {
      return this.isValid() ? this._isUTC && this._offset === 0 : false;
  }

  // ASP.NET json date format regex
  var aspNetRegex = /^(\-|\+)?(?:(\d*)[. ])?(\d+)\:(\d+)(?:\:(\d+)(\.\d*)?)?$/;

  // from http://docs.closure-library.googlecode.com/git/closure_goog_date_date.js.source.html
  // somewhat more in line with 4.4.3.2 2004 spec, but allows decimal anywhere
  // and further modified to allow for strings containing both week and day
  var isoRegex = /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/;

  function createDuration (input, key) {
      var duration = input,
          // matching against regexp is expensive, do it on demand
          match = null,
          sign,
          ret,
          diffRes;

      if (isDuration(input)) {
          duration = {
              ms : input._milliseconds,
              d  : input._days,
              M  : input._months
          };
      } else if (isNumber(input)) {
          duration = {};
          if (key) {
              duration[key] = input;
          } else {
              duration.milliseconds = input;
          }
      } else if (!!(match = aspNetRegex.exec(input))) {
          sign = (match[1] === '-') ? -1 : 1;
          duration = {
              y  : 0,
              d  : toInt(match[DATE])                         * sign,
              h  : toInt(match[HOUR])                         * sign,
              m  : toInt(match[MINUTE])                       * sign,
              s  : toInt(match[SECOND])                       * sign,
              ms : toInt(absRound(match[MILLISECOND] * 1000)) * sign // the millisecond decimal point is included in the match
          };
      } else if (!!(match = isoRegex.exec(input))) {
          sign = (match[1] === '-') ? -1 : 1;
          duration = {
              y : parseIso(match[2], sign),
              M : parseIso(match[3], sign),
              w : parseIso(match[4], sign),
              d : parseIso(match[5], sign),
              h : parseIso(match[6], sign),
              m : parseIso(match[7], sign),
              s : parseIso(match[8], sign)
          };
      } else if (duration == null) {// checks for null or undefined
          duration = {};
      } else if (typeof duration === 'object' && ('from' in duration || 'to' in duration)) {
          diffRes = momentsDifference(createLocal(duration.from), createLocal(duration.to));

          duration = {};
          duration.ms = diffRes.milliseconds;
          duration.M = diffRes.months;
      }

      ret = new Duration(duration);

      if (isDuration(input) && hasOwnProp(input, '_locale')) {
          ret._locale = input._locale;
      }

      return ret;
  }

  createDuration.fn = Duration.prototype;
  createDuration.invalid = createInvalid$1;

  function parseIso (inp, sign) {
      // We'd normally use ~~inp for this, but unfortunately it also
      // converts floats to ints.
      // inp may be undefined, so careful calling replace on it.
      var res = inp && parseFloat(inp.replace(',', '.'));
      // apply sign while we're at it
      return (isNaN(res) ? 0 : res) * sign;
  }

  function positiveMomentsDifference(base, other) {
      var res = {};

      res.months = other.month() - base.month() +
          (other.year() - base.year()) * 12;
      if (base.clone().add(res.months, 'M').isAfter(other)) {
          --res.months;
      }

      res.milliseconds = +other - +(base.clone().add(res.months, 'M'));

      return res;
  }

  function momentsDifference(base, other) {
      var res;
      if (!(base.isValid() && other.isValid())) {
          return {milliseconds: 0, months: 0};
      }

      other = cloneWithOffset(other, base);
      if (base.isBefore(other)) {
          res = positiveMomentsDifference(base, other);
      } else {
          res = positiveMomentsDifference(other, base);
          res.milliseconds = -res.milliseconds;
          res.months = -res.months;
      }

      return res;
  }

  // TODO: remove 'name' arg after deprecation is removed
  function createAdder(direction, name) {
      return function (val, period) {
          var dur, tmp;
          //invert the arguments, but complain about it
          if (period !== null && !isNaN(+period)) {
              deprecateSimple(name, 'moment().' + name  + '(period, number) is deprecated. Please use moment().' + name + '(number, period). ' +
              'See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info.');
              tmp = val; val = period; period = tmp;
          }

          val = typeof val === 'string' ? +val : val;
          dur = createDuration(val, period);
          addSubtract(this, dur, direction);
          return this;
      };
  }

  function addSubtract (mom, duration, isAdding, updateOffset) {
      var milliseconds = duration._milliseconds,
          days = absRound(duration._days),
          months = absRound(duration._months);

      if (!mom.isValid()) {
          // No op
          return;
      }

      updateOffset = updateOffset == null ? true : updateOffset;

      if (months) {
          setMonth(mom, get$1(mom, 'Month') + months * isAdding);
      }
      if (days) {
          set$2(mom, 'Date', get$1(mom, 'Date') + days * isAdding);
      }
      if (milliseconds) {
          mom._d.setTime(mom._d.valueOf() + milliseconds * isAdding);
      }
      if (updateOffset) {
          hooks.updateOffset(mom, days || months);
      }
  }

  var add      = createAdder(1, 'add');
  var subtract = createAdder(-1, 'subtract');

  function getCalendarFormat(myMoment, now) {
      var diff = myMoment.diff(now, 'days', true);
      return diff < -6 ? 'sameElse' :
              diff < -1 ? 'lastWeek' :
              diff < 0 ? 'lastDay' :
              diff < 1 ? 'sameDay' :
              diff < 2 ? 'nextDay' :
              diff < 7 ? 'nextWeek' : 'sameElse';
  }

  function calendar$1 (time, formats) {
      // We want to compare the start of today, vs this.
      // Getting start-of-today depends on whether we're local/utc/offset or not.
      var now = time || createLocal(),
          sod = cloneWithOffset(now, this).startOf('day'),
          format = hooks.calendarFormat(this, sod) || 'sameElse';

      var output = formats && (isFunction(formats[format]) ? formats[format].call(this, now) : formats[format]);

      return this.format(output || this.localeData().calendar(format, this, createLocal(now)));
  }

  function clone () {
      return new Moment(this);
  }

  function isAfter (input, units) {
      var localInput = isMoment(input) ? input : createLocal(input);
      if (!(this.isValid() && localInput.isValid())) {
          return false;
      }
      units = normalizeUnits(units) || 'millisecond';
      if (units === 'millisecond') {
          return this.valueOf() > localInput.valueOf();
      } else {
          return localInput.valueOf() < this.clone().startOf(units).valueOf();
      }
  }

  function isBefore (input, units) {
      var localInput = isMoment(input) ? input : createLocal(input);
      if (!(this.isValid() && localInput.isValid())) {
          return false;
      }
      units = normalizeUnits(units) || 'millisecond';
      if (units === 'millisecond') {
          return this.valueOf() < localInput.valueOf();
      } else {
          return this.clone().endOf(units).valueOf() < localInput.valueOf();
      }
  }

  function isBetween (from, to, units, inclusivity) {
      var localFrom = isMoment(from) ? from : createLocal(from),
          localTo = isMoment(to) ? to : createLocal(to);
      if (!(this.isValid() && localFrom.isValid() && localTo.isValid())) {
          return false;
      }
      inclusivity = inclusivity || '()';
      return (inclusivity[0] === '(' ? this.isAfter(localFrom, units) : !this.isBefore(localFrom, units)) &&
          (inclusivity[1] === ')' ? this.isBefore(localTo, units) : !this.isAfter(localTo, units));
  }

  function isSame (input, units) {
      var localInput = isMoment(input) ? input : createLocal(input),
          inputMs;
      if (!(this.isValid() && localInput.isValid())) {
          return false;
      }
      units = normalizeUnits(units) || 'millisecond';
      if (units === 'millisecond') {
          return this.valueOf() === localInput.valueOf();
      } else {
          inputMs = localInput.valueOf();
          return this.clone().startOf(units).valueOf() <= inputMs && inputMs <= this.clone().endOf(units).valueOf();
      }
  }

  function isSameOrAfter (input, units) {
      return this.isSame(input, units) || this.isAfter(input, units);
  }

  function isSameOrBefore (input, units) {
      return this.isSame(input, units) || this.isBefore(input, units);
  }

  function diff (input, units, asFloat) {
      var that,
          zoneDelta,
          output;

      if (!this.isValid()) {
          return NaN;
      }

      that = cloneWithOffset(input, this);

      if (!that.isValid()) {
          return NaN;
      }

      zoneDelta = (that.utcOffset() - this.utcOffset()) * 6e4;

      units = normalizeUnits(units);

      switch (units) {
          case 'year': output = monthDiff(this, that) / 12; break;
          case 'month': output = monthDiff(this, that); break;
          case 'quarter': output = monthDiff(this, that) / 3; break;
          case 'second': output = (this - that) / 1e3; break; // 1000
          case 'minute': output = (this - that) / 6e4; break; // 1000 * 60
          case 'hour': output = (this - that) / 36e5; break; // 1000 * 60 * 60
          case 'day': output = (this - that - zoneDelta) / 864e5; break; // 1000 * 60 * 60 * 24, negate dst
          case 'week': output = (this - that - zoneDelta) / 6048e5; break; // 1000 * 60 * 60 * 24 * 7, negate dst
          default: output = this - that;
      }

      return asFloat ? output : absFloor(output);
  }

  function monthDiff (a, b) {
      // difference in months
      var wholeMonthDiff = ((b.year() - a.year()) * 12) + (b.month() - a.month()),
          // b is in (anchor - 1 month, anchor + 1 month)
          anchor = a.clone().add(wholeMonthDiff, 'months'),
          anchor2, adjust;

      if (b - anchor < 0) {
          anchor2 = a.clone().add(wholeMonthDiff - 1, 'months');
          // linear across the month
          adjust = (b - anchor) / (anchor - anchor2);
      } else {
          anchor2 = a.clone().add(wholeMonthDiff + 1, 'months');
          // linear across the month
          adjust = (b - anchor) / (anchor2 - anchor);
      }

      //check for negative zero, return zero if negative zero
      return -(wholeMonthDiff + adjust) || 0;
  }

  hooks.defaultFormat = 'YYYY-MM-DDTHH:mm:ssZ';
  hooks.defaultFormatUtc = 'YYYY-MM-DDTHH:mm:ss[Z]';

  function toString$1 () {
      return this.clone().locale('en').format('ddd MMM DD YYYY HH:mm:ss [GMT]ZZ');
  }

  function toISOString(keepOffset) {
      if (!this.isValid()) {
          return null;
      }
      var utc = keepOffset !== true;
      var m = utc ? this.clone().utc() : this;
      if (m.year() < 0 || m.year() > 9999) {
          return formatMoment(m, utc ? 'YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]' : 'YYYYYY-MM-DD[T]HH:mm:ss.SSSZ');
      }
      if (isFunction(Date.prototype.toISOString)) {
          // native implementation is ~50x faster, use it when we can
          if (utc) {
              return this.toDate().toISOString();
          } else {
              return new Date(this.valueOf() + this.utcOffset() * 60 * 1000).toISOString().replace('Z', formatMoment(m, 'Z'));
          }
      }
      return formatMoment(m, utc ? 'YYYY-MM-DD[T]HH:mm:ss.SSS[Z]' : 'YYYY-MM-DD[T]HH:mm:ss.SSSZ');
  }

  /**
   * Return a human readable representation of a moment that can
   * also be evaluated to get a new moment which is the same
   *
   * @link https://nodejs.org/dist/latest/docs/api/util.html#util_custom_inspect_function_on_objects
   */
  function inspect () {
      if (!this.isValid()) {
          return 'moment.invalid(/* ' + this._i + ' */)';
      }
      var func = 'moment';
      var zone = '';
      if (!this.isLocal()) {
          func = this.utcOffset() === 0 ? 'moment.utc' : 'moment.parseZone';
          zone = 'Z';
      }
      var prefix = '[' + func + '("]';
      var year = (0 <= this.year() && this.year() <= 9999) ? 'YYYY' : 'YYYYYY';
      var datetime = '-MM-DD[T]HH:mm:ss.SSS';
      var suffix = zone + '[")]';

      return this.format(prefix + year + datetime + suffix);
  }

  function format (inputString) {
      if (!inputString) {
          inputString = this.isUtc() ? hooks.defaultFormatUtc : hooks.defaultFormat;
      }
      var output = formatMoment(this, inputString);
      return this.localeData().postformat(output);
  }

  function from (time, withoutSuffix) {
      if (this.isValid() &&
              ((isMoment(time) && time.isValid()) ||
               createLocal(time).isValid())) {
          return createDuration({to: this, from: time}).locale(this.locale()).humanize(!withoutSuffix);
      } else {
          return this.localeData().invalidDate();
      }
  }

  function fromNow (withoutSuffix) {
      return this.from(createLocal(), withoutSuffix);
  }

  function to (time, withoutSuffix) {
      if (this.isValid() &&
              ((isMoment(time) && time.isValid()) ||
               createLocal(time).isValid())) {
          return createDuration({from: this, to: time}).locale(this.locale()).humanize(!withoutSuffix);
      } else {
          return this.localeData().invalidDate();
      }
  }

  function toNow (withoutSuffix) {
      return this.to(createLocal(), withoutSuffix);
  }

  // If passed a locale key, it will set the locale for this
  // instance.  Otherwise, it will return the locale configuration
  // variables for this instance.
  function locale (key) {
      var newLocaleData;

      if (key === undefined) {
          return this._locale._abbr;
      } else {
          newLocaleData = getLocale(key);
          if (newLocaleData != null) {
              this._locale = newLocaleData;
          }
          return this;
      }
  }

  var lang = deprecate(
      'moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.',
      function (key) {
          if (key === undefined) {
              return this.localeData();
          } else {
              return this.locale(key);
          }
      }
  );

  function localeData () {
      return this._locale;
  }

  var MS_PER_SECOND = 1000;
  var MS_PER_MINUTE = 60 * MS_PER_SECOND;
  var MS_PER_HOUR = 60 * MS_PER_MINUTE;
  var MS_PER_400_YEARS = (365 * 400 + 97) * 24 * MS_PER_HOUR;

  // actual modulo - handles negative numbers (for dates before 1970):
  function mod$1(dividend, divisor) {
      return (dividend % divisor + divisor) % divisor;
  }

  function localStartOfDate(y, m, d) {
      // the date constructor remaps years 0-99 to 1900-1999
      if (y < 100 && y >= 0) {
          // preserve leap years using a full 400 year cycle, then reset
          return new Date(y + 400, m, d) - MS_PER_400_YEARS;
      } else {
          return new Date(y, m, d).valueOf();
      }
  }

  function utcStartOfDate(y, m, d) {
      // Date.UTC remaps years 0-99 to 1900-1999
      if (y < 100 && y >= 0) {
          // preserve leap years using a full 400 year cycle, then reset
          return Date.UTC(y + 400, m, d) - MS_PER_400_YEARS;
      } else {
          return Date.UTC(y, m, d);
      }
  }

  function startOf (units) {
      var time;
      units = normalizeUnits(units);
      if (units === undefined || units === 'millisecond' || !this.isValid()) {
          return this;
      }

      var startOfDate = this._isUTC ? utcStartOfDate : localStartOfDate;

      switch (units) {
          case 'year':
              time = startOfDate(this.year(), 0, 1);
              break;
          case 'quarter':
              time = startOfDate(this.year(), this.month() - this.month() % 3, 1);
              break;
          case 'month':
              time = startOfDate(this.year(), this.month(), 1);
              break;
          case 'week':
              time = startOfDate(this.year(), this.month(), this.date() - this.weekday());
              break;
          case 'isoWeek':
              time = startOfDate(this.year(), this.month(), this.date() - (this.isoWeekday() - 1));
              break;
          case 'day':
          case 'date':
              time = startOfDate(this.year(), this.month(), this.date());
              break;
          case 'hour':
              time = this._d.valueOf();
              time -= mod$1(time + (this._isUTC ? 0 : this.utcOffset() * MS_PER_MINUTE), MS_PER_HOUR);
              break;
          case 'minute':
              time = this._d.valueOf();
              time -= mod$1(time, MS_PER_MINUTE);
              break;
          case 'second':
              time = this._d.valueOf();
              time -= mod$1(time, MS_PER_SECOND);
              break;
      }

      this._d.setTime(time);
      hooks.updateOffset(this, true);
      return this;
  }

  function endOf (units) {
      var time;
      units = normalizeUnits(units);
      if (units === undefined || units === 'millisecond' || !this.isValid()) {
          return this;
      }

      var startOfDate = this._isUTC ? utcStartOfDate : localStartOfDate;

      switch (units) {
          case 'year':
              time = startOfDate(this.year() + 1, 0, 1) - 1;
              break;
          case 'quarter':
              time = startOfDate(this.year(), this.month() - this.month() % 3 + 3, 1) - 1;
              break;
          case 'month':
              time = startOfDate(this.year(), this.month() + 1, 1) - 1;
              break;
          case 'week':
              time = startOfDate(this.year(), this.month(), this.date() - this.weekday() + 7) - 1;
              break;
          case 'isoWeek':
              time = startOfDate(this.year(), this.month(), this.date() - (this.isoWeekday() - 1) + 7) - 1;
              break;
          case 'day':
          case 'date':
              time = startOfDate(this.year(), this.month(), this.date() + 1) - 1;
              break;
          case 'hour':
              time = this._d.valueOf();
              time += MS_PER_HOUR - mod$1(time + (this._isUTC ? 0 : this.utcOffset() * MS_PER_MINUTE), MS_PER_HOUR) - 1;
              break;
          case 'minute':
              time = this._d.valueOf();
              time += MS_PER_MINUTE - mod$1(time, MS_PER_MINUTE) - 1;
              break;
          case 'second':
              time = this._d.valueOf();
              time += MS_PER_SECOND - mod$1(time, MS_PER_SECOND) - 1;
              break;
      }

      this._d.setTime(time);
      hooks.updateOffset(this, true);
      return this;
  }

  function valueOf () {
      return this._d.valueOf() - ((this._offset || 0) * 60000);
  }

  function unix () {
      return Math.floor(this.valueOf() / 1000);
  }

  function toDate () {
      return new Date(this.valueOf());
  }

  function toArray () {
      var m = this;
      return [m.year(), m.month(), m.date(), m.hour(), m.minute(), m.second(), m.millisecond()];
  }

  function toObject$1 () {
      var m = this;
      return {
          years: m.year(),
          months: m.month(),
          date: m.date(),
          hours: m.hours(),
          minutes: m.minutes(),
          seconds: m.seconds(),
          milliseconds: m.milliseconds()
      };
  }

  function toJSON () {
      // new Date(NaN).toJSON() === null
      return this.isValid() ? this.toISOString() : null;
  }

  function isValid$2 () {
      return isValid(this);
  }

  function parsingFlags () {
      return extend({}, getParsingFlags(this));
  }

  function invalidAt () {
      return getParsingFlags(this).overflow;
  }

  function creationData() {
      return {
          input: this._i,
          format: this._f,
          locale: this._locale,
          isUTC: this._isUTC,
          strict: this._strict
      };
  }

  // FORMATTING

  addFormatToken(0, ['gg', 2], 0, function () {
      return this.weekYear() % 100;
  });

  addFormatToken(0, ['GG', 2], 0, function () {
      return this.isoWeekYear() % 100;
  });

  function addWeekYearFormatToken (token, getter) {
      addFormatToken(0, [token, token.length], 0, getter);
  }

  addWeekYearFormatToken('gggg',     'weekYear');
  addWeekYearFormatToken('ggggg',    'weekYear');
  addWeekYearFormatToken('GGGG',  'isoWeekYear');
  addWeekYearFormatToken('GGGGG', 'isoWeekYear');

  // ALIASES

  addUnitAlias('weekYear', 'gg');
  addUnitAlias('isoWeekYear', 'GG');

  // PRIORITY

  addUnitPriority('weekYear', 1);
  addUnitPriority('isoWeekYear', 1);


  // PARSING

  addRegexToken('G',      matchSigned);
  addRegexToken('g',      matchSigned);
  addRegexToken('GG',     match1to2, match2);
  addRegexToken('gg',     match1to2, match2);
  addRegexToken('GGGG',   match1to4, match4);
  addRegexToken('gggg',   match1to4, match4);
  addRegexToken('GGGGG',  match1to6, match6);
  addRegexToken('ggggg',  match1to6, match6);

  addWeekParseToken(['gggg', 'ggggg', 'GGGG', 'GGGGG'], function (input, week, config, token) {
      week[token.substr(0, 2)] = toInt(input);
  });

  addWeekParseToken(['gg', 'GG'], function (input, week, config, token) {
      week[token] = hooks.parseTwoDigitYear(input);
  });

  // MOMENTS

  function getSetWeekYear (input) {
      return getSetWeekYearHelper.call(this,
              input,
              this.week(),
              this.weekday(),
              this.localeData()._week.dow,
              this.localeData()._week.doy);
  }

  function getSetISOWeekYear (input) {
      return getSetWeekYearHelper.call(this,
              input, this.isoWeek(), this.isoWeekday(), 1, 4);
  }

  function getISOWeeksInYear () {
      return weeksInYear(this.year(), 1, 4);
  }

  function getWeeksInYear () {
      var weekInfo = this.localeData()._week;
      return weeksInYear(this.year(), weekInfo.dow, weekInfo.doy);
  }

  function getSetWeekYearHelper(input, week, weekday, dow, doy) {
      var weeksTarget;
      if (input == null) {
          return weekOfYear(this, dow, doy).year;
      } else {
          weeksTarget = weeksInYear(input, dow, doy);
          if (week > weeksTarget) {
              week = weeksTarget;
          }
          return setWeekAll.call(this, input, week, weekday, dow, doy);
      }
  }

  function setWeekAll(weekYear, week, weekday, dow, doy) {
      var dayOfYearData = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy),
          date = createUTCDate(dayOfYearData.year, 0, dayOfYearData.dayOfYear);

      this.year(date.getUTCFullYear());
      this.month(date.getUTCMonth());
      this.date(date.getUTCDate());
      return this;
  }

  // FORMATTING

  addFormatToken('Q', 0, 'Qo', 'quarter');

  // ALIASES

  addUnitAlias('quarter', 'Q');

  // PRIORITY

  addUnitPriority('quarter', 7);

  // PARSING

  addRegexToken('Q', match1);
  addParseToken('Q', function (input, array) {
      array[MONTH] = (toInt(input) - 1) * 3;
  });

  // MOMENTS

  function getSetQuarter (input) {
      return input == null ? Math.ceil((this.month() + 1) / 3) : this.month((input - 1) * 3 + this.month() % 3);
  }

  // FORMATTING

  addFormatToken('D', ['DD', 2], 'Do', 'date');

  // ALIASES

  addUnitAlias('date', 'D');

  // PRIORITY
  addUnitPriority('date', 9);

  // PARSING

  addRegexToken('D',  match1to2);
  addRegexToken('DD', match1to2, match2);
  addRegexToken('Do', function (isStrict, locale) {
      // TODO: Remove "ordinalParse" fallback in next major release.
      return isStrict ?
        (locale._dayOfMonthOrdinalParse || locale._ordinalParse) :
        locale._dayOfMonthOrdinalParseLenient;
  });

  addParseToken(['D', 'DD'], DATE);
  addParseToken('Do', function (input, array) {
      array[DATE] = toInt(input.match(match1to2)[0]);
  });

  // MOMENTS

  var getSetDayOfMonth = makeGetSet('Date', true);

  // FORMATTING

  addFormatToken('DDD', ['DDDD', 3], 'DDDo', 'dayOfYear');

  // ALIASES

  addUnitAlias('dayOfYear', 'DDD');

  // PRIORITY
  addUnitPriority('dayOfYear', 4);

  // PARSING

  addRegexToken('DDD',  match1to3);
  addRegexToken('DDDD', match3);
  addParseToken(['DDD', 'DDDD'], function (input, array, config) {
      config._dayOfYear = toInt(input);
  });

  // HELPERS

  // MOMENTS

  function getSetDayOfYear (input) {
      var dayOfYear = Math.round((this.clone().startOf('day') - this.clone().startOf('year')) / 864e5) + 1;
      return input == null ? dayOfYear : this.add((input - dayOfYear), 'd');
  }

  // FORMATTING

  addFormatToken('m', ['mm', 2], 0, 'minute');

  // ALIASES

  addUnitAlias('minute', 'm');

  // PRIORITY

  addUnitPriority('minute', 14);

  // PARSING

  addRegexToken('m',  match1to2);
  addRegexToken('mm', match1to2, match2);
  addParseToken(['m', 'mm'], MINUTE);

  // MOMENTS

  var getSetMinute = makeGetSet('Minutes', false);

  // FORMATTING

  addFormatToken('s', ['ss', 2], 0, 'second');

  // ALIASES

  addUnitAlias('second', 's');

  // PRIORITY

  addUnitPriority('second', 15);

  // PARSING

  addRegexToken('s',  match1to2);
  addRegexToken('ss', match1to2, match2);
  addParseToken(['s', 'ss'], SECOND);

  // MOMENTS

  var getSetSecond = makeGetSet('Seconds', false);

  // FORMATTING

  addFormatToken('S', 0, 0, function () {
      return ~~(this.millisecond() / 100);
  });

  addFormatToken(0, ['SS', 2], 0, function () {
      return ~~(this.millisecond() / 10);
  });

  addFormatToken(0, ['SSS', 3], 0, 'millisecond');
  addFormatToken(0, ['SSSS', 4], 0, function () {
      return this.millisecond() * 10;
  });
  addFormatToken(0, ['SSSSS', 5], 0, function () {
      return this.millisecond() * 100;
  });
  addFormatToken(0, ['SSSSSS', 6], 0, function () {
      return this.millisecond() * 1000;
  });
  addFormatToken(0, ['SSSSSSS', 7], 0, function () {
      return this.millisecond() * 10000;
  });
  addFormatToken(0, ['SSSSSSSS', 8], 0, function () {
      return this.millisecond() * 100000;
  });
  addFormatToken(0, ['SSSSSSSSS', 9], 0, function () {
      return this.millisecond() * 1000000;
  });


  // ALIASES

  addUnitAlias('millisecond', 'ms');

  // PRIORITY

  addUnitPriority('millisecond', 16);

  // PARSING

  addRegexToken('S',    match1to3, match1);
  addRegexToken('SS',   match1to3, match2);
  addRegexToken('SSS',  match1to3, match3);

  var token;
  for (token = 'SSSS'; token.length <= 9; token += 'S') {
      addRegexToken(token, matchUnsigned);
  }

  function parseMs(input, array) {
      array[MILLISECOND] = toInt(('0.' + input) * 1000);
  }

  for (token = 'S'; token.length <= 9; token += 'S') {
      addParseToken(token, parseMs);
  }
  // MOMENTS

  var getSetMillisecond = makeGetSet('Milliseconds', false);

  // FORMATTING

  addFormatToken('z',  0, 0, 'zoneAbbr');
  addFormatToken('zz', 0, 0, 'zoneName');

  // MOMENTS

  function getZoneAbbr () {
      return this._isUTC ? 'UTC' : '';
  }

  function getZoneName () {
      return this._isUTC ? 'Coordinated Universal Time' : '';
  }

  var proto = Moment.prototype;

  proto.add               = add;
  proto.calendar          = calendar$1;
  proto.clone             = clone;
  proto.diff              = diff;
  proto.endOf             = endOf;
  proto.format            = format;
  proto.from              = from;
  proto.fromNow           = fromNow;
  proto.to                = to;
  proto.toNow             = toNow;
  proto.get               = stringGet;
  proto.invalidAt         = invalidAt;
  proto.isAfter           = isAfter;
  proto.isBefore          = isBefore;
  proto.isBetween         = isBetween;
  proto.isSame            = isSame;
  proto.isSameOrAfter     = isSameOrAfter;
  proto.isSameOrBefore    = isSameOrBefore;
  proto.isValid           = isValid$2;
  proto.lang              = lang;
  proto.locale            = locale;
  proto.localeData        = localeData;
  proto.max               = prototypeMax;
  proto.min               = prototypeMin;
  proto.parsingFlags      = parsingFlags;
  proto.set               = stringSet;
  proto.startOf           = startOf;
  proto.subtract          = subtract;
  proto.toArray           = toArray;
  proto.toObject          = toObject$1;
  proto.toDate            = toDate;
  proto.toISOString       = toISOString;
  proto.inspect           = inspect;
  proto.toJSON            = toJSON;
  proto.toString          = toString$1;
  proto.unix              = unix;
  proto.valueOf           = valueOf;
  proto.creationData      = creationData;
  proto.year       = getSetYear;
  proto.isLeapYear = getIsLeapYear;
  proto.weekYear    = getSetWeekYear;
  proto.isoWeekYear = getSetISOWeekYear;
  proto.quarter = proto.quarters = getSetQuarter;
  proto.month       = getSetMonth;
  proto.daysInMonth = getDaysInMonth;
  proto.week           = proto.weeks        = getSetWeek;
  proto.isoWeek        = proto.isoWeeks     = getSetISOWeek;
  proto.weeksInYear    = getWeeksInYear;
  proto.isoWeeksInYear = getISOWeeksInYear;
  proto.date       = getSetDayOfMonth;
  proto.day        = proto.days             = getSetDayOfWeek;
  proto.weekday    = getSetLocaleDayOfWeek;
  proto.isoWeekday = getSetISODayOfWeek;
  proto.dayOfYear  = getSetDayOfYear;
  proto.hour = proto.hours = getSetHour;
  proto.minute = proto.minutes = getSetMinute;
  proto.second = proto.seconds = getSetSecond;
  proto.millisecond = proto.milliseconds = getSetMillisecond;
  proto.utcOffset            = getSetOffset;
  proto.utc                  = setOffsetToUTC;
  proto.local                = setOffsetToLocal;
  proto.parseZone            = setOffsetToParsedOffset;
  proto.hasAlignedHourOffset = hasAlignedHourOffset;
  proto.isDST                = isDaylightSavingTime;
  proto.isLocal              = isLocal;
  proto.isUtcOffset          = isUtcOffset;
  proto.isUtc                = isUtc;
  proto.isUTC                = isUtc;
  proto.zoneAbbr = getZoneAbbr;
  proto.zoneName = getZoneName;
  proto.dates  = deprecate('dates accessor is deprecated. Use date instead.', getSetDayOfMonth);
  proto.months = deprecate('months accessor is deprecated. Use month instead', getSetMonth);
  proto.years  = deprecate('years accessor is deprecated. Use year instead', getSetYear);
  proto.zone   = deprecate('moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/', getSetZone);
  proto.isDSTShifted = deprecate('isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information', isDaylightSavingTimeShifted);

  function createUnix (input) {
      return createLocal(input * 1000);
  }

  function createInZone () {
      return createLocal.apply(null, arguments).parseZone();
  }

  function preParsePostFormat (string) {
      return string;
  }

  var proto$1 = Locale.prototype;

  proto$1.calendar        = calendar;
  proto$1.longDateFormat  = longDateFormat;
  proto$1.invalidDate     = invalidDate;
  proto$1.ordinal         = ordinal;
  proto$1.preparse        = preParsePostFormat;
  proto$1.postformat      = preParsePostFormat;
  proto$1.relativeTime    = relativeTime;
  proto$1.pastFuture      = pastFuture;
  proto$1.set             = set$1;

  proto$1.months            =        localeMonths;
  proto$1.monthsShort       =        localeMonthsShort;
  proto$1.monthsParse       =        localeMonthsParse;
  proto$1.monthsRegex       = monthsRegex;
  proto$1.monthsShortRegex  = monthsShortRegex;
  proto$1.week = localeWeek;
  proto$1.firstDayOfYear = localeFirstDayOfYear;
  proto$1.firstDayOfWeek = localeFirstDayOfWeek;

  proto$1.weekdays       =        localeWeekdays;
  proto$1.weekdaysMin    =        localeWeekdaysMin;
  proto$1.weekdaysShort  =        localeWeekdaysShort;
  proto$1.weekdaysParse  =        localeWeekdaysParse;

  proto$1.weekdaysRegex       =        weekdaysRegex;
  proto$1.weekdaysShortRegex  =        weekdaysShortRegex;
  proto$1.weekdaysMinRegex    =        weekdaysMinRegex;

  proto$1.isPM = localeIsPM;
  proto$1.meridiem = localeMeridiem;

  function get$2 (format, index, field, setter) {
      var locale = getLocale();
      var utc = createUTC().set(setter, index);
      return locale[field](utc, format);
  }

  function listMonthsImpl (format, index, field) {
      if (isNumber(format)) {
          index = format;
          format = undefined;
      }

      format = format || '';

      if (index != null) {
          return get$2(format, index, field, 'month');
      }

      var i;
      var out = [];
      for (i = 0; i < 12; i++) {
          out[i] = get$2(format, i, field, 'month');
      }
      return out;
  }

  // ()
  // (5)
  // (fmt, 5)
  // (fmt)
  // (true)
  // (true, 5)
  // (true, fmt, 5)
  // (true, fmt)
  function listWeekdaysImpl (localeSorted, format, index, field) {
      if (typeof localeSorted === 'boolean') {
          if (isNumber(format)) {
              index = format;
              format = undefined;
          }

          format = format || '';
      } else {
          format = localeSorted;
          index = format;
          localeSorted = false;

          if (isNumber(format)) {
              index = format;
              format = undefined;
          }

          format = format || '';
      }

      var locale = getLocale(),
          shift = localeSorted ? locale._week.dow : 0;

      if (index != null) {
          return get$2(format, (index + shift) % 7, field, 'day');
      }

      var i;
      var out = [];
      for (i = 0; i < 7; i++) {
          out[i] = get$2(format, (i + shift) % 7, field, 'day');
      }
      return out;
  }

  function listMonths (format, index) {
      return listMonthsImpl(format, index, 'months');
  }

  function listMonthsShort (format, index) {
      return listMonthsImpl(format, index, 'monthsShort');
  }

  function listWeekdays (localeSorted, format, index) {
      return listWeekdaysImpl(localeSorted, format, index, 'weekdays');
  }

  function listWeekdaysShort (localeSorted, format, index) {
      return listWeekdaysImpl(localeSorted, format, index, 'weekdaysShort');
  }

  function listWeekdaysMin (localeSorted, format, index) {
      return listWeekdaysImpl(localeSorted, format, index, 'weekdaysMin');
  }

  getSetGlobalLocale('en', {
      dayOfMonthOrdinalParse: /\d{1,2}(th|st|nd|rd)/,
      ordinal : function (number) {
          var b = number % 10,
              output = (toInt(number % 100 / 10) === 1) ? 'th' :
              (b === 1) ? 'st' :
              (b === 2) ? 'nd' :
              (b === 3) ? 'rd' : 'th';
          return number + output;
      }
  });

  // Side effect imports

  hooks.lang = deprecate('moment.lang is deprecated. Use moment.locale instead.', getSetGlobalLocale);
  hooks.langData = deprecate('moment.langData is deprecated. Use moment.localeData instead.', getLocale);

  var mathAbs = Math.abs;

  function abs () {
      var data           = this._data;

      this._milliseconds = mathAbs(this._milliseconds);
      this._days         = mathAbs(this._days);
      this._months       = mathAbs(this._months);

      data.milliseconds  = mathAbs(data.milliseconds);
      data.seconds       = mathAbs(data.seconds);
      data.minutes       = mathAbs(data.minutes);
      data.hours         = mathAbs(data.hours);
      data.months        = mathAbs(data.months);
      data.years         = mathAbs(data.years);

      return this;
  }

  function addSubtract$1 (duration, input, value, direction) {
      var other = createDuration(input, value);

      duration._milliseconds += direction * other._milliseconds;
      duration._days         += direction * other._days;
      duration._months       += direction * other._months;

      return duration._bubble();
  }

  // supports only 2.0-style add(1, 's') or add(duration)
  function add$1 (input, value) {
      return addSubtract$1(this, input, value, 1);
  }

  // supports only 2.0-style subtract(1, 's') or subtract(duration)
  function subtract$1 (input, value) {
      return addSubtract$1(this, input, value, -1);
  }

  function absCeil (number) {
      if (number < 0) {
          return Math.floor(number);
      } else {
          return Math.ceil(number);
      }
  }

  function bubble () {
      var milliseconds = this._milliseconds;
      var days         = this._days;
      var months       = this._months;
      var data         = this._data;
      var seconds, minutes, hours, years, monthsFromDays;

      // if we have a mix of positive and negative values, bubble down first
      // check: https://github.com/moment/moment/issues/2166
      if (!((milliseconds >= 0 && days >= 0 && months >= 0) ||
              (milliseconds <= 0 && days <= 0 && months <= 0))) {
          milliseconds += absCeil(monthsToDays(months) + days) * 864e5;
          days = 0;
          months = 0;
      }

      // The following code bubbles up values, see the tests for
      // examples of what that means.
      data.milliseconds = milliseconds % 1000;

      seconds           = absFloor(milliseconds / 1000);
      data.seconds      = seconds % 60;

      minutes           = absFloor(seconds / 60);
      data.minutes      = minutes % 60;

      hours             = absFloor(minutes / 60);
      data.hours        = hours % 24;

      days += absFloor(hours / 24);

      // convert days to months
      monthsFromDays = absFloor(daysToMonths(days));
      months += monthsFromDays;
      days -= absCeil(monthsToDays(monthsFromDays));

      // 12 months -> 1 year
      years = absFloor(months / 12);
      months %= 12;

      data.days   = days;
      data.months = months;
      data.years  = years;

      return this;
  }

  function daysToMonths (days) {
      // 400 years have 146097 days (taking into account leap year rules)
      // 400 years have 12 months === 4800
      return days * 4800 / 146097;
  }

  function monthsToDays (months) {
      // the reverse of daysToMonths
      return months * 146097 / 4800;
  }

  function as (units) {
      if (!this.isValid()) {
          return NaN;
      }
      var days;
      var months;
      var milliseconds = this._milliseconds;

      units = normalizeUnits(units);

      if (units === 'month' || units === 'quarter' || units === 'year') {
          days = this._days + milliseconds / 864e5;
          months = this._months + daysToMonths(days);
          switch (units) {
              case 'month':   return months;
              case 'quarter': return months / 3;
              case 'year':    return months / 12;
          }
      } else {
          // handle milliseconds separately because of floating point math errors (issue #1867)
          days = this._days + Math.round(monthsToDays(this._months));
          switch (units) {
              case 'week'   : return days / 7     + milliseconds / 6048e5;
              case 'day'    : return days         + milliseconds / 864e5;
              case 'hour'   : return days * 24    + milliseconds / 36e5;
              case 'minute' : return days * 1440  + milliseconds / 6e4;
              case 'second' : return days * 86400 + milliseconds / 1000;
              // Math.floor prevents floating point math errors here
              case 'millisecond': return Math.floor(days * 864e5) + milliseconds;
              default: throw new Error('Unknown unit ' + units);
          }
      }
  }

  // TODO: Use this.as('ms')?
  function valueOf$1 () {
      if (!this.isValid()) {
          return NaN;
      }
      return (
          this._milliseconds +
          this._days * 864e5 +
          (this._months % 12) * 2592e6 +
          toInt(this._months / 12) * 31536e6
      );
  }

  function makeAs (alias) {
      return function () {
          return this.as(alias);
      };
  }

  var asMilliseconds = makeAs('ms');
  var asSeconds      = makeAs('s');
  var asMinutes      = makeAs('m');
  var asHours        = makeAs('h');
  var asDays         = makeAs('d');
  var asWeeks        = makeAs('w');
  var asMonths       = makeAs('M');
  var asQuarters     = makeAs('Q');
  var asYears        = makeAs('y');

  function clone$1 () {
      return createDuration(this);
  }

  function get$3 (units) {
      units = normalizeUnits(units);
      return this.isValid() ? this[units + 's']() : NaN;
  }

  function makeGetter(name) {
      return function () {
          return this.isValid() ? this._data[name] : NaN;
      };
  }

  var milliseconds = makeGetter('milliseconds');
  var seconds      = makeGetter('seconds');
  var minutes      = makeGetter('minutes');
  var hours        = makeGetter('hours');
  var days         = makeGetter('days');
  var months       = makeGetter('months');
  var years        = makeGetter('years');

  function weeks () {
      return absFloor(this.days() / 7);
  }

  var round = Math.round;
  var thresholds = {
      ss: 44,         // a few seconds to seconds
      s : 45,         // seconds to minute
      m : 45,         // minutes to hour
      h : 22,         // hours to day
      d : 26,         // days to month
      M : 11          // months to year
  };

  // helper function for moment.fn.from, moment.fn.fromNow, and moment.duration.fn.humanize
  function substituteTimeAgo(string, number, withoutSuffix, isFuture, locale) {
      return locale.relativeTime(number || 1, !!withoutSuffix, string, isFuture);
  }

  function relativeTime$1 (posNegDuration, withoutSuffix, locale) {
      var duration = createDuration(posNegDuration).abs();
      var seconds  = round(duration.as('s'));
      var minutes  = round(duration.as('m'));
      var hours    = round(duration.as('h'));
      var days     = round(duration.as('d'));
      var months   = round(duration.as('M'));
      var years    = round(duration.as('y'));

      var a = seconds <= thresholds.ss && ['s', seconds]  ||
              seconds < thresholds.s   && ['ss', seconds] ||
              minutes <= 1             && ['m']           ||
              minutes < thresholds.m   && ['mm', minutes] ||
              hours   <= 1             && ['h']           ||
              hours   < thresholds.h   && ['hh', hours]   ||
              days    <= 1             && ['d']           ||
              days    < thresholds.d   && ['dd', days]    ||
              months  <= 1             && ['M']           ||
              months  < thresholds.M   && ['MM', months]  ||
              years   <= 1             && ['y']           || ['yy', years];

      a[2] = withoutSuffix;
      a[3] = +posNegDuration > 0;
      a[4] = locale;
      return substituteTimeAgo.apply(null, a);
  }

  // This function allows you to set the rounding function for relative time strings
  function getSetRelativeTimeRounding (roundingFunction) {
      if (roundingFunction === undefined) {
          return round;
      }
      if (typeof(roundingFunction) === 'function') {
          round = roundingFunction;
          return true;
      }
      return false;
  }

  // This function allows you to set a threshold for relative time strings
  function getSetRelativeTimeThreshold (threshold, limit) {
      if (thresholds[threshold] === undefined) {
          return false;
      }
      if (limit === undefined) {
          return thresholds[threshold];
      }
      thresholds[threshold] = limit;
      if (threshold === 's') {
          thresholds.ss = limit - 1;
      }
      return true;
  }

  function humanize (withSuffix) {
      if (!this.isValid()) {
          return this.localeData().invalidDate();
      }

      var locale = this.localeData();
      var output = relativeTime$1(this, !withSuffix, locale);

      if (withSuffix) {
          output = locale.pastFuture(+this, output);
      }

      return locale.postformat(output);
  }

  var abs$1 = Math.abs;

  function sign(x) {
      return ((x > 0) - (x < 0)) || +x;
  }

  function toISOString$1() {
      // for ISO strings we do not use the normal bubbling rules:
      //  * milliseconds bubble up until they become hours
      //  * days do not bubble at all
      //  * months bubble up until they become years
      // This is because there is no context-free conversion between hours and days
      // (think of clock changes)
      // and also not between days and months (28-31 days per month)
      if (!this.isValid()) {
          return this.localeData().invalidDate();
      }

      var seconds = abs$1(this._milliseconds) / 1000;
      var days         = abs$1(this._days);
      var months       = abs$1(this._months);
      var minutes, hours, years;

      // 3600 seconds -> 60 minutes -> 1 hour
      minutes           = absFloor(seconds / 60);
      hours             = absFloor(minutes / 60);
      seconds %= 60;
      minutes %= 60;

      // 12 months -> 1 year
      years  = absFloor(months / 12);
      months %= 12;


      // inspired by https://github.com/dordille/moment-isoduration/blob/master/moment.isoduration.js
      var Y = years;
      var M = months;
      var D = days;
      var h = hours;
      var m = minutes;
      var s = seconds ? seconds.toFixed(3).replace(/\.?0+$/, '') : '';
      var total = this.asSeconds();

      if (!total) {
          // this is the same as C#'s (Noda) and python (isodate)...
          // but not other JS (goog.date)
          return 'P0D';
      }

      var totalSign = total < 0 ? '-' : '';
      var ymSign = sign(this._months) !== sign(total) ? '-' : '';
      var daysSign = sign(this._days) !== sign(total) ? '-' : '';
      var hmsSign = sign(this._milliseconds) !== sign(total) ? '-' : '';

      return totalSign + 'P' +
          (Y ? ymSign + Y + 'Y' : '') +
          (M ? ymSign + M + 'M' : '') +
          (D ? daysSign + D + 'D' : '') +
          ((h || m || s) ? 'T' : '') +
          (h ? hmsSign + h + 'H' : '') +
          (m ? hmsSign + m + 'M' : '') +
          (s ? hmsSign + s + 'S' : '');
  }

  var proto$2 = Duration.prototype;

  proto$2.isValid        = isValid$1;
  proto$2.abs            = abs;
  proto$2.add            = add$1;
  proto$2.subtract       = subtract$1;
  proto$2.as             = as;
  proto$2.asMilliseconds = asMilliseconds;
  proto$2.asSeconds      = asSeconds;
  proto$2.asMinutes      = asMinutes;
  proto$2.asHours        = asHours;
  proto$2.asDays         = asDays;
  proto$2.asWeeks        = asWeeks;
  proto$2.asMonths       = asMonths;
  proto$2.asQuarters     = asQuarters;
  proto$2.asYears        = asYears;
  proto$2.valueOf        = valueOf$1;
  proto$2._bubble        = bubble;
  proto$2.clone          = clone$1;
  proto$2.get            = get$3;
  proto$2.milliseconds   = milliseconds;
  proto$2.seconds        = seconds;
  proto$2.minutes        = minutes;
  proto$2.hours          = hours;
  proto$2.days           = days;
  proto$2.weeks          = weeks;
  proto$2.months         = months;
  proto$2.years          = years;
  proto$2.humanize       = humanize;
  proto$2.toISOString    = toISOString$1;
  proto$2.toString       = toISOString$1;
  proto$2.toJSON         = toISOString$1;
  proto$2.locale         = locale;
  proto$2.localeData     = localeData;

  proto$2.toIsoString = deprecate('toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)', toISOString$1);
  proto$2.lang = lang;

  // FORMATTING

  addFormatToken('X', 0, 0, 'unix');
  addFormatToken('x', 0, 0, 'valueOf');

  // PARSING

  addRegexToken('x', matchSigned);
  addRegexToken('X', matchTimestamp);
  addParseToken('X', function (input, array, config) {
      config._d = new Date(parseFloat(input, 10) * 1000);
  });
  addParseToken('x', function (input, array, config) {
      config._d = new Date(toInt(input));
  });

  //! moment.js

  hooks.version = '2.24.0';

  setHookCallback(createLocal);

  hooks.fn                    = proto;
  hooks.min                   = min$3;
  hooks.max                   = max$3;
  hooks.now                   = now;
  hooks.utc                   = createUTC;
  hooks.unix                  = createUnix;
  hooks.months                = listMonths;
  hooks.isDate                = isDate;
  hooks.locale                = getSetGlobalLocale;
  hooks.invalid               = createInvalid;
  hooks.duration              = createDuration;
  hooks.isMoment              = isMoment;
  hooks.weekdays              = listWeekdays;
  hooks.parseZone             = createInZone;
  hooks.localeData            = getLocale;
  hooks.isDuration            = isDuration;
  hooks.monthsShort           = listMonthsShort;
  hooks.weekdaysMin           = listWeekdaysMin;
  hooks.defineLocale          = defineLocale;
  hooks.updateLocale          = updateLocale;
  hooks.locales               = listLocales;
  hooks.weekdaysShort         = listWeekdaysShort;
  hooks.normalizeUnits        = normalizeUnits;
  hooks.relativeTimeRounding  = getSetRelativeTimeRounding;
  hooks.relativeTimeThreshold = getSetRelativeTimeThreshold;
  hooks.calendarFormat        = getCalendarFormat;
  hooks.prototype             = proto;

  // currently HTML5 input type only supports 24-hour formats
  hooks.HTML5_FMT = {
      DATETIME_LOCAL: 'YYYY-MM-DDTHH:mm',             // <input type="datetime-local" />
      DATETIME_LOCAL_SECONDS: 'YYYY-MM-DDTHH:mm:ss',  // <input type="datetime-local" step="1" />
      DATETIME_LOCAL_MS: 'YYYY-MM-DDTHH:mm:ss.SSS',   // <input type="datetime-local" step="0.001" />
      DATE: 'YYYY-MM-DD',                             // <input type="date" />
      TIME: 'HH:mm',                                  // <input type="time" />
      TIME_SECONDS: 'HH:mm:ss',                       // <input type="time" step="1" />
      TIME_MS: 'HH:mm:ss.SSS',                        // <input type="time" step="0.001" />
      WEEK: 'GGGG-[W]WW',                             // <input type="week" />
      MONTH: 'YYYY-MM'                                // <input type="month" />
  };

  //
  var script$1 = {
    name: 'DateField',
    props: {
      value: {
        type: [String, Date]
      },
      label: {
        type: String
      },
      required: {
        type: [String, Boolean]
      },
      placeholder: {
        type: String
      },
      customClass: {
        type: String
      },
      disabled: {
        type: Boolean
      },
      displayMode: {
        type: String
      },
      hideLabel: {
        type: Boolean
      },
      filter: {
        type: String
      },
      filterArgs: {
        type: Array,
        default: function _default() {
          return [];
        }
      },
      calendarConfig: {
        type: Object
      },
      property: {
        type: Object
      },
      attrs: {
        type: Object
      }
    },
    components: {
      flatPickr: flatPickr
    },
    filters: {
      formatDate: function formatDate(date, format) {
        if (!format) {
          format = 'DD/MM/YYYY HH:mm';
        }

        return date ? hooks(date).format(format) : '';
      }
    },
    data: function data() {
      var vm = this;
      return {
        clonedValue: {},
        formattedValue: null,
        config: {
          dateFormat: 'd/m/Y',
          showNonCurrentDates: false,
          onChange: function onChange() {
            vm.clonedValue.value = vm.$refs.calendar.fp.selectedDates[0];
            vm.handler();
          }
        }
      };
    },
    methods: {
      handler: function handler() {
        this.validate();
        this.$emit('updateValue', this.clonedValue);
      },
      validate: function validate() {
        if (this.property) {
          if ((this.required || this.property.required) && !this.clonedValue.value) {
            this.clonedValue.$invalid = true;
            this.clonedValue.$error = 'required';
          } else {
            this.clonedValue.$invalid = false;
            this.clonedValue.$error = null;
          }
        }
      }
    },
    created: function created() {
      this.clonedValue.value = this.value || (this.property ? this.property.value : undefined);
      this.formattedValue = this.clonedValue.value;
      this.handler();
    }
  };

  var __vue_script__$1 = script$1;
  /* template */

  var __vue_render__$1 = function __vue_render__() {
    var ref;

    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('div', [_c('label', {
      directives: [{
        name: "show",
        rawName: "v-show",
        value: !_vm.hideLabel,
        expression: "!hideLabel"
      }],
      staticClass: "control-label",
      attrs: {
        "for": _vm.attrs.id || _vm.label || _vm.property.name
      },
      domProps: {
        "textContent": _vm._s(_vm.label || _vm.property.name)
      }
    }), _vm._v(" "), _vm.displayMode === 'EDIT' || _vm.displayMode === 'CREATE' ? _c('div', {
      staticClass: "form-element"
    }, [_c('flat-pickr', {
      ref: "calendar",
      staticClass: "form-control datepicker",
      attrs: {
        "config": Object.assign({}, _vm.config, _vm.calendarConfig, _vm.property.calendarConfig),
        "placeholder": _vm.placeholder || 'DD/MM/YYY'
      },
      model: {
        value: _vm.formattedValue,
        callback: function callback($$v) {
          _vm.formattedValue = $$v;
        },
        expression: "formattedValue"
      }
    })], 1) : _vm.displayMode === 'VIEW' && _vm.clonedValue.value && !_vm.filter ? _c('p', {
      staticClass: "form-control-static"
    }, [_vm._v(_vm._s(_vm._f("formatDate")(_vm.clonedValue.value, 'DD/MM/YYYY')))]) : _vm.displayMode === 'VIEW' && _vm.clonedValue.value && _vm.filter ? _c('p', {
      staticClass: "form-control-static"
    }, [_vm._v(_vm._s((ref = _vm.$options.filters)[_vm.filter || _vm.property.filter].apply(ref, [_vm.clonedValue.value].concat(_vm.filterArgs || _vm.property.filterArgs))))]) : _c('p', {
      staticClass: "form-control-static"
    }, [_vm._v("-")])]);
  };

  var __vue_staticRenderFns__$1 = [];
  /* style */

  var __vue_inject_styles__$1 = undefined;
  /* scoped */

  var __vue_scope_id__$1 = undefined;
  /* module identifier */

  var __vue_module_identifier__$1 = undefined;
  /* functional template */

  var __vue_is_functional_template__$1 = false;
  /* style inject */

  /* style inject SSR */

  /* style inject shadow dom */

  var __vue_component__$1 = normalizeComponent({
    render: __vue_render__$1,
    staticRenderFns: __vue_staticRenderFns__$1
  }, __vue_inject_styles__$1, __vue_script__$1, __vue_scope_id__$1, __vue_is_functional_template__$1, __vue_module_identifier__$1, false, undefined, undefined, undefined);

  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function _typeof(obj) {
        return typeof obj;
      };
    } else {
      _typeof = function _typeof(obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  var $find = arrayIteration.find;



  var FIND = 'find';
  var SKIPS_HOLES$1 = true;

  var USES_TO_LENGTH$4 = arrayMethodUsesToLength(FIND);

  // Shouldn't skip holes
  if (FIND in []) Array(1)[FIND](function () { SKIPS_HOLES$1 = false; });

  // `Array.prototype.find` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.find
  _export({ target: 'Array', proto: true, forced: SKIPS_HOLES$1 || !USES_TO_LENGTH$4 }, {
    find: function find(callbackfn /* , that = undefined */) {
      return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    }
  });

  // https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
  addToUnscopables(FIND);

  var arrayMethodIsStrict = function (METHOD_NAME, argument) {
    var method = [][METHOD_NAME];
    return !!method && fails(function () {
      // eslint-disable-next-line no-useless-call,no-throw-literal
      method.call(null, argument || function () { throw 1; }, 1);
    });
  };

  var $indexOf = arrayIncludes.indexOf;



  var nativeIndexOf = [].indexOf;

  var NEGATIVE_ZERO = !!nativeIndexOf && 1 / [1].indexOf(1, -0) < 0;
  var STRICT_METHOD = arrayMethodIsStrict('indexOf');
  var USES_TO_LENGTH$5 = arrayMethodUsesToLength('indexOf', { ACCESSORS: true, 1: 0 });

  // `Array.prototype.indexOf` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.indexof
  _export({ target: 'Array', proto: true, forced: NEGATIVE_ZERO || !STRICT_METHOD || !USES_TO_LENGTH$5 }, {
    indexOf: function indexOf(searchElement /* , fromIndex = 0 */) {
      return NEGATIVE_ZERO
        // convert -0 to +0
        ? nativeIndexOf.apply(this, arguments) || 0
        : $indexOf(this, searchElement, arguments.length > 1 ? arguments[1] : undefined);
    }
  });

  var nativeJoin = [].join;

  var ES3_STRINGS = indexedObject != Object;
  var STRICT_METHOD$1 = arrayMethodIsStrict('join', ',');

  // `Array.prototype.join` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.join
  _export({ target: 'Array', proto: true, forced: ES3_STRINGS || !STRICT_METHOD$1 }, {
    join: function join(separator) {
      return nativeJoin.call(toIndexedObject(this), separator === undefined ? ',' : separator);
    }
  });

  var $map = arrayIteration.map;



  var HAS_SPECIES_SUPPORT$3 = arrayMethodHasSpeciesSupport('map');
  // FF49- issue
  var USES_TO_LENGTH$6 = arrayMethodUsesToLength('map');

  // `Array.prototype.map` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.map
  // with adding support of @@species
  _export({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT$3 || !USES_TO_LENGTH$6 }, {
    map: function map(callbackfn /* , thisArg */) {
      return $map(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    }
  });

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function ownKeys$1(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      if (enumerableOnly) symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
      keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};

      if (i % 2) {
        ownKeys$1(Object(source), true).forEach(function (key) {
          _defineProperty(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys$1(Object(source)).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }

    return target;
  }

  var vueMultiselect_min = createCommonjsModule(function (module, exports) {
  !function(t,e){module.exports=e();}(commonjsGlobal,function(){return function(t){function e(i){if(n[i])return n[i].exports;var r=n[i]={i:i,l:!1,exports:{}};return t[i].call(r.exports,r,r.exports,e),r.l=!0,r.exports}var n={};return e.m=t,e.c=n,e.i=function(t){return t},e.d=function(t,n,i){e.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:i});},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="/",e(e.s=60)}([function(t,e){var n=t.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=n);},function(t,e,n){var i=n(49)("wks"),r=n(30),o=n(0).Symbol,s="function"==typeof o;(t.exports=function(t){return i[t]||(i[t]=s&&o[t]||(s?o:r)("Symbol."+t))}).store=i;},function(t,e,n){var i=n(5);t.exports=function(t){if(!i(t))throw TypeError(t+" is not an object!");return t};},function(t,e,n){var i=n(0),r=n(10),o=n(8),s=n(6),u=n(11),a=function(t,e,n){var l,c,f,p,h=t&a.F,d=t&a.G,v=t&a.S,g=t&a.P,y=t&a.B,m=d?i:v?i[e]||(i[e]={}):(i[e]||{}).prototype,b=d?r:r[e]||(r[e]={}),_=b.prototype||(b.prototype={});d&&(n=e);for(l in n)c=!h&&m&&void 0!==m[l],f=(c?m:n)[l],p=y&&c?u(f,i):g&&"function"==typeof f?u(Function.call,f):f,m&&s(m,l,f,t&a.U),b[l]!=f&&o(b,l,p),g&&_[l]!=f&&(_[l]=f);};i.core=r,a.F=1,a.G=2,a.S=4,a.P=8,a.B=16,a.W=32,a.U=64,a.R=128,t.exports=a;},function(t,e,n){t.exports=!n(7)(function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a});},function(t,e){t.exports=function(t){return "object"==typeof t?null!==t:"function"==typeof t};},function(t,e,n){var i=n(0),r=n(8),o=n(12),s=n(30)("src"),u=Function.toString,a=(""+u).split("toString");n(10).inspectSource=function(t){return u.call(t)},(t.exports=function(t,e,n,u){var l="function"==typeof n;l&&(o(n,"name")||r(n,"name",e)),t[e]!==n&&(l&&(o(n,s)||r(n,s,t[e]?""+t[e]:a.join(String(e)))),t===i?t[e]=n:u?t[e]?t[e]=n:r(t,e,n):(delete t[e],r(t,e,n)));})(Function.prototype,"toString",function(){return "function"==typeof this&&this[s]||u.call(this)});},function(t,e){t.exports=function(t){try{return !!t()}catch(t){return !0}};},function(t,e,n){var i=n(13),r=n(25);t.exports=n(4)?function(t,e,n){return i.f(t,e,r(1,n))}:function(t,e,n){return t[e]=n,t};},function(t,e){var n={}.toString;t.exports=function(t){return n.call(t).slice(8,-1)};},function(t,e){var n=t.exports={version:"2.5.7"};"number"==typeof __e&&(__e=n);},function(t,e,n){var i=n(14);t.exports=function(t,e,n){if(i(t),void 0===e)return t;switch(n){case 1:return function(n){return t.call(e,n)};case 2:return function(n,i){return t.call(e,n,i)};case 3:return function(n,i,r){return t.call(e,n,i,r)}}return function(){return t.apply(e,arguments)}};},function(t,e){var n={}.hasOwnProperty;t.exports=function(t,e){return n.call(t,e)};},function(t,e,n){var i=n(2),r=n(41),o=n(29),s=Object.defineProperty;e.f=n(4)?Object.defineProperty:function(t,e,n){if(i(t),e=o(e,!0),i(n),r)try{return s(t,e,n)}catch(t){}if("get"in n||"set"in n)throw TypeError("Accessors not supported!");return "value"in n&&(t[e]=n.value),t};},function(t,e){t.exports=function(t){if("function"!=typeof t)throw TypeError(t+" is not a function!");return t};},function(t,e){t.exports={};},function(t,e){t.exports=function(t){if(void 0==t)throw TypeError("Can't call method on  "+t);return t};},function(t,e,n){var i=n(7);t.exports=function(t,e){return !!t&&i(function(){e?t.call(null,function(){},1):t.call(null);})};},function(t,e,n){var i=n(23),r=n(16);t.exports=function(t){return i(r(t))};},function(t,e,n){var i=n(53),r=Math.min;t.exports=function(t){return t>0?r(i(t),9007199254740991):0};},function(t,e,n){var i=n(11),r=n(23),o=n(28),s=n(19),u=n(64);t.exports=function(t,e){var n=1==t,a=2==t,l=3==t,c=4==t,f=6==t,p=5==t||f,h=e||u;return function(e,u,d){for(var v,g,y=o(e),m=r(y),b=i(u,d,3),_=s(m.length),x=0,w=n?h(e,_):a?h(e,0):void 0;_>x;x++)if((p||x in m)&&(v=m[x],g=b(v,x,y),t))if(n)w[x]=g;else if(g)switch(t){case 3:return !0;case 5:return v;case 6:return x;case 2:w.push(v);}else if(c)return !1;return f?-1:l||c?c:w}};},function(t,e,n){var i=n(5),r=n(0).document,o=i(r)&&i(r.createElement);t.exports=function(t){return o?r.createElement(t):{}};},function(t,e){t.exports="constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",");},function(t,e,n){var i=n(9);t.exports=Object("z").propertyIsEnumerable(0)?Object:function(t){return "String"==i(t)?t.split(""):Object(t)};},function(t,e){t.exports=!1;},function(t,e){t.exports=function(t,e){return {enumerable:!(1&t),configurable:!(2&t),writable:!(4&t),value:e}};},function(t,e,n){var i=n(13).f,r=n(12),o=n(1)("toStringTag");t.exports=function(t,e,n){t&&!r(t=n?t:t.prototype,o)&&i(t,o,{configurable:!0,value:e});};},function(t,e,n){var i=n(49)("keys"),r=n(30);t.exports=function(t){return i[t]||(i[t]=r(t))};},function(t,e,n){var i=n(16);t.exports=function(t){return Object(i(t))};},function(t,e,n){var i=n(5);t.exports=function(t,e){if(!i(t))return t;var n,r;if(e&&"function"==typeof(n=t.toString)&&!i(r=n.call(t)))return r;if("function"==typeof(n=t.valueOf)&&!i(r=n.call(t)))return r;if(!e&&"function"==typeof(n=t.toString)&&!i(r=n.call(t)))return r;throw TypeError("Can't convert object to primitive value")};},function(t,e){var n=0,i=Math.random();t.exports=function(t){return "Symbol(".concat(void 0===t?"":t,")_",(++n+i).toString(36))};},function(t,e,n){var i=n(0),r=n(12),o=n(9),s=n(67),u=n(29),a=n(7),l=n(77).f,c=n(45).f,f=n(13).f,p=n(51).trim,h=i.Number,d=h,v=h.prototype,g="Number"==o(n(44)(v)),y="trim"in String.prototype,m=function(t){var e=u(t,!1);if("string"==typeof e&&e.length>2){e=y?e.trim():p(e,3);var n,i,r,o=e.charCodeAt(0);if(43===o||45===o){if(88===(n=e.charCodeAt(2))||120===n)return NaN}else if(48===o){switch(e.charCodeAt(1)){case 66:case 98:i=2,r=49;break;case 79:case 111:i=8,r=55;break;default:return +e}for(var s,a=e.slice(2),l=0,c=a.length;l<c;l++)if((s=a.charCodeAt(l))<48||s>r)return NaN;return parseInt(a,i)}}return +e};if(!h(" 0o1")||!h("0b1")||h("+0x1")){h=function(t){var e=arguments.length<1?0:t,n=this;return n instanceof h&&(g?a(function(){v.valueOf.call(n);}):"Number"!=o(n))?s(new d(m(e)),n,h):m(e)};for(var b,_=n(4)?l(d):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger".split(","),x=0;_.length>x;x++)r(d,b=_[x])&&!r(h,b)&&f(h,b,c(d,b));h.prototype=v,v.constructor=h,n(6)(i,"Number",h);}},function(t,e,n){function i(t){return 0!==t&&(!(!Array.isArray(t)||0!==t.length)||!t)}function r(t){return function(){return !t.apply(void 0,arguments)}}function o(t,e){return void 0===t&&(t="undefined"),null===t&&(t="null"),!1===t&&(t="false"),-1!==t.toString().toLowerCase().indexOf(e.trim())}function s(t,e,n,i){return t.filter(function(t){return o(i(t,n),e)})}function u(t){return t.filter(function(t){return !t.$isLabel})}function a(t,e){return function(n){return n.reduce(function(n,i){return i[t]&&i[t].length?(n.push({$groupLabel:i[e],$isLabel:!0}),n.concat(i[t])):n},[])}}function l(t,e,i,r,o){return function(u){return u.map(function(u){var a;if(!u[i])return console.warn("Options passed to vue-multiselect do not contain groups, despite the config."),[];var l=s(u[i],t,e,o);return l.length?(a={},n.i(d.a)(a,r,u[r]),n.i(d.a)(a,i,l),a):[]})}}var c=n(59),f=n(54),p=(n.n(f),n(95)),h=(n.n(p),n(31)),d=(n.n(h),n(58)),v=n(91),g=(n.n(v),n(98)),y=(n.n(g),n(92)),m=(n.n(y),n(88)),b=(n.n(m),n(97)),_=(n.n(b),n(89)),x=(n.n(_),n(96)),w=(n.n(x),n(93)),S=(n.n(w),n(90)),O=(n.n(S),function(){for(var t=arguments.length,e=new Array(t),n=0;n<t;n++)e[n]=arguments[n];return function(t){return e.reduce(function(t,e){return e(t)},t)}});e.a={data:function(){return {search:"",isOpen:!1,preferredOpenDirection:"below",optimizedHeight:this.maxHeight}},props:{internalSearch:{type:Boolean,default:!0},options:{type:Array,required:!0},multiple:{type:Boolean,default:!1},value:{type:null,default:function(){return []}},trackBy:{type:String},label:{type:String},searchable:{type:Boolean,default:!0},clearOnSelect:{type:Boolean,default:!0},hideSelected:{type:Boolean,default:!1},placeholder:{type:String,default:"Select option"},allowEmpty:{type:Boolean,default:!0},resetAfter:{type:Boolean,default:!1},closeOnSelect:{type:Boolean,default:!0},customLabel:{type:Function,default:function(t,e){return i(t)?"":e?t[e]:t}},taggable:{type:Boolean,default:!1},tagPlaceholder:{type:String,default:"Press enter to create a tag"},tagPosition:{type:String,default:"top"},max:{type:[Number,Boolean],default:!1},id:{default:null},optionsLimit:{type:Number,default:1e3},groupValues:{type:String},groupLabel:{type:String},groupSelect:{type:Boolean,default:!1},blockKeys:{type:Array,default:function(){return []}},preserveSearch:{type:Boolean,default:!1},preselectFirst:{type:Boolean,default:!1}},mounted:function(){!this.multiple&&this.max&&console.warn("[Vue-Multiselect warn]: Max prop should not be used when prop Multiple equals false."),this.preselectFirst&&!this.internalValue.length&&this.options.length&&this.select(this.filteredOptions[0]);},computed:{internalValue:function(){return this.value||0===this.value?Array.isArray(this.value)?this.value:[this.value]:[]},filteredOptions:function(){var t=this.search||"",e=t.toLowerCase().trim(),n=this.options.concat();return n=this.internalSearch?this.groupValues?this.filterAndFlat(n,e,this.label):s(n,e,this.label,this.customLabel):this.groupValues?a(this.groupValues,this.groupLabel)(n):n,n=this.hideSelected?n.filter(r(this.isSelected)):n,this.taggable&&e.length&&!this.isExistingOption(e)&&("bottom"===this.tagPosition?n.push({isTag:!0,label:t}):n.unshift({isTag:!0,label:t})),n.slice(0,this.optionsLimit)},valueKeys:function(){var t=this;return this.trackBy?this.internalValue.map(function(e){return e[t.trackBy]}):this.internalValue},optionKeys:function(){var t=this;return (this.groupValues?this.flatAndStrip(this.options):this.options).map(function(e){return t.customLabel(e,t.label).toString().toLowerCase()})},currentOptionLabel:function(){return this.multiple?this.searchable?"":this.placeholder:this.internalValue.length?this.getOptionLabel(this.internalValue[0]):this.searchable?"":this.placeholder}},watch:{internalValue:function(){this.resetAfter&&this.internalValue.length&&(this.search="",this.$emit("input",this.multiple?[]:null));},search:function(){this.$emit("search-change",this.search,this.id);}},methods:{getValue:function(){return this.multiple?this.internalValue:0===this.internalValue.length?null:this.internalValue[0]},filterAndFlat:function(t,e,n){return O(l(e,n,this.groupValues,this.groupLabel,this.customLabel),a(this.groupValues,this.groupLabel))(t)},flatAndStrip:function(t){return O(a(this.groupValues,this.groupLabel),u)(t)},updateSearch:function(t){this.search=t;},isExistingOption:function(t){return !!this.options&&this.optionKeys.indexOf(t)>-1},isSelected:function(t){var e=this.trackBy?t[this.trackBy]:t;return this.valueKeys.indexOf(e)>-1},isOptionDisabled:function(t){return !!t.$isDisabled},getOptionLabel:function(t){if(i(t))return "";if(t.isTag)return t.label;if(t.$isLabel)return t.$groupLabel;var e=this.customLabel(t,this.label);return i(e)?"":e},select:function(t,e){if(t.$isLabel&&this.groupSelect)return void this.selectGroup(t);if(!(-1!==this.blockKeys.indexOf(e)||this.disabled||t.$isDisabled||t.$isLabel)&&(!this.max||!this.multiple||this.internalValue.length!==this.max)&&("Tab"!==e||this.pointerDirty)){if(t.isTag)this.$emit("tag",t.label,this.id),this.search="",this.closeOnSelect&&!this.multiple&&this.deactivate();else {if(this.isSelected(t))return void("Tab"!==e&&this.removeElement(t));this.$emit("select",t,this.id),this.multiple?this.$emit("input",this.internalValue.concat([t]),this.id):this.$emit("input",t,this.id),this.clearOnSelect&&(this.search="");}this.closeOnSelect&&this.deactivate();}},selectGroup:function(t){var e=this,n=this.options.find(function(n){return n[e.groupLabel]===t.$groupLabel});if(n)if(this.wholeGroupSelected(n)){this.$emit("remove",n[this.groupValues],this.id);var i=this.internalValue.filter(function(t){return -1===n[e.groupValues].indexOf(t)});this.$emit("input",i,this.id);}else {var r=n[this.groupValues].filter(function(t){return !(e.isOptionDisabled(t)||e.isSelected(t))});this.$emit("select",r,this.id),this.$emit("input",this.internalValue.concat(r),this.id);}},wholeGroupSelected:function(t){var e=this;return t[this.groupValues].every(function(t){return e.isSelected(t)||e.isOptionDisabled(t)})},wholeGroupDisabled:function(t){return t[this.groupValues].every(this.isOptionDisabled)},removeElement:function(t){var e=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];if(!this.disabled&&!t.$isDisabled){if(!this.allowEmpty&&this.internalValue.length<=1)return void this.deactivate();var i="object"===n.i(c.a)(t)?this.valueKeys.indexOf(t[this.trackBy]):this.valueKeys.indexOf(t);if(this.$emit("remove",t,this.id),this.multiple){var r=this.internalValue.slice(0,i).concat(this.internalValue.slice(i+1));this.$emit("input",r,this.id);}else this.$emit("input",null,this.id);this.closeOnSelect&&e&&this.deactivate();}},removeLastElement:function(){-1===this.blockKeys.indexOf("Delete")&&0===this.search.length&&Array.isArray(this.internalValue)&&this.internalValue.length&&this.removeElement(this.internalValue[this.internalValue.length-1],!1);},activate:function(){var t=this;this.isOpen||this.disabled||(this.adjustPosition(),this.groupValues&&0===this.pointer&&this.filteredOptions.length&&(this.pointer=1),this.isOpen=!0,this.searchable?(this.preserveSearch||(this.search=""),this.$nextTick(function(){return t.$refs.search.focus()})):this.$el.focus(),this.$emit("open",this.id));},deactivate:function(){this.isOpen&&(this.isOpen=!1,this.searchable?this.$refs.search.blur():this.$el.blur(),this.preserveSearch||(this.search=""),this.$emit("close",this.getValue(),this.id));},toggle:function(){this.isOpen?this.deactivate():this.activate();},adjustPosition:function(){if("undefined"!=typeof window){var t=this.$el.getBoundingClientRect().top,e=window.innerHeight-this.$el.getBoundingClientRect().bottom;e>this.maxHeight||e>t||"below"===this.openDirection||"bottom"===this.openDirection?(this.preferredOpenDirection="below",this.optimizedHeight=Math.min(e-40,this.maxHeight)):(this.preferredOpenDirection="above",this.optimizedHeight=Math.min(t-40,this.maxHeight));}}}};},function(t,e,n){var i=n(54),r=(n.n(i),n(31));n.n(r);e.a={data:function(){return {pointer:0,pointerDirty:!1}},props:{showPointer:{type:Boolean,default:!0},optionHeight:{type:Number,default:40}},computed:{pointerPosition:function(){return this.pointer*this.optionHeight},visibleElements:function(){return this.optimizedHeight/this.optionHeight}},watch:{filteredOptions:function(){this.pointerAdjust();},isOpen:function(){this.pointerDirty=!1;}},methods:{optionHighlight:function(t,e){return {"multiselect__option--highlight":t===this.pointer&&this.showPointer,"multiselect__option--selected":this.isSelected(e)}},groupHighlight:function(t,e){var n=this;if(!this.groupSelect)return ["multiselect__option--group","multiselect__option--disabled"];var i=this.options.find(function(t){return t[n.groupLabel]===e.$groupLabel});return i&&!this.wholeGroupDisabled(i)?["multiselect__option--group",{"multiselect__option--highlight":t===this.pointer&&this.showPointer},{"multiselect__option--group-selected":this.wholeGroupSelected(i)}]:"multiselect__option--disabled"},addPointerElement:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"Enter",e=t.key;this.filteredOptions.length>0&&this.select(this.filteredOptions[this.pointer],e),this.pointerReset();},pointerForward:function(){this.pointer<this.filteredOptions.length-1&&(this.pointer++,this.$refs.list.scrollTop<=this.pointerPosition-(this.visibleElements-1)*this.optionHeight&&(this.$refs.list.scrollTop=this.pointerPosition-(this.visibleElements-1)*this.optionHeight),this.filteredOptions[this.pointer]&&this.filteredOptions[this.pointer].$isLabel&&!this.groupSelect&&this.pointerForward()),this.pointerDirty=!0;},pointerBackward:function(){this.pointer>0?(this.pointer--,this.$refs.list.scrollTop>=this.pointerPosition&&(this.$refs.list.scrollTop=this.pointerPosition),this.filteredOptions[this.pointer]&&this.filteredOptions[this.pointer].$isLabel&&!this.groupSelect&&this.pointerBackward()):this.filteredOptions[this.pointer]&&this.filteredOptions[0].$isLabel&&!this.groupSelect&&this.pointerForward(),this.pointerDirty=!0;},pointerReset:function(){this.closeOnSelect&&(this.pointer=0,this.$refs.list&&(this.$refs.list.scrollTop=0));},pointerAdjust:function(){this.pointer>=this.filteredOptions.length-1&&(this.pointer=this.filteredOptions.length?this.filteredOptions.length-1:0),this.filteredOptions.length>0&&this.filteredOptions[this.pointer].$isLabel&&!this.groupSelect&&this.pointerForward();},pointerSet:function(t){this.pointer=t,this.pointerDirty=!0;}}};},function(t,e,n){var i=n(36),r=n(74),o=n(15),s=n(18);t.exports=n(72)(Array,"Array",function(t,e){this._t=s(t),this._i=0,this._k=e;},function(){var t=this._t,e=this._k,n=this._i++;return !t||n>=t.length?(this._t=void 0,r(1)):"keys"==e?r(0,n):"values"==e?r(0,t[n]):r(0,[n,t[n]])},"values"),o.Arguments=o.Array,i("keys"),i("values"),i("entries");},function(t,e,n){var i=n(31),r=(n.n(i),n(32)),o=n(33);e.a={name:"vue-multiselect",mixins:[r.a,o.a],props:{name:{type:String,default:""},selectLabel:{type:String,default:"Press enter to select"},selectGroupLabel:{type:String,default:"Press enter to select group"},selectedLabel:{type:String,default:"Selected"},deselectLabel:{type:String,default:"Press enter to remove"},deselectGroupLabel:{type:String,default:"Press enter to deselect group"},showLabels:{type:Boolean,default:!0},limit:{type:Number,default:99999},maxHeight:{type:Number,default:300},limitText:{type:Function,default:function(t){return "and ".concat(t," more")}},loading:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1},openDirection:{type:String,default:""},showNoOptions:{type:Boolean,default:!0},showNoResults:{type:Boolean,default:!0},tabindex:{type:Number,default:0}},computed:{isSingleLabelVisible:function(){return (this.singleValue||0===this.singleValue)&&(!this.isOpen||!this.searchable)&&!this.visibleValues.length},isPlaceholderVisible:function(){return !(this.internalValue.length||this.searchable&&this.isOpen)},visibleValues:function(){return this.multiple?this.internalValue.slice(0,this.limit):[]},singleValue:function(){return this.internalValue[0]},deselectLabelText:function(){return this.showLabels?this.deselectLabel:""},deselectGroupLabelText:function(){return this.showLabels?this.deselectGroupLabel:""},selectLabelText:function(){return this.showLabels?this.selectLabel:""},selectGroupLabelText:function(){return this.showLabels?this.selectGroupLabel:""},selectedLabelText:function(){return this.showLabels?this.selectedLabel:""},inputStyle:function(){if(this.searchable||this.multiple&&this.value&&this.value.length)return this.isOpen?{width:"100%"}:{width:"0",position:"absolute",padding:"0"}},contentStyle:function(){return this.options.length?{display:"inline-block"}:{display:"block"}},isAbove:function(){return "above"===this.openDirection||"top"===this.openDirection||"below"!==this.openDirection&&"bottom"!==this.openDirection&&"above"===this.preferredOpenDirection},showSearchInput:function(){return this.searchable&&(!this.hasSingleSelectedSlot||!this.visibleSingleValue&&0!==this.visibleSingleValue||this.isOpen)}}};},function(t,e,n){var i=n(1)("unscopables"),r=Array.prototype;void 0==r[i]&&n(8)(r,i,{}),t.exports=function(t){r[i][t]=!0;};},function(t,e,n){var i=n(18),r=n(19),o=n(85);t.exports=function(t){return function(e,n,s){var u,a=i(e),l=r(a.length),c=o(s,l);if(t&&n!=n){for(;l>c;)if((u=a[c++])!=u)return !0}else for(;l>c;c++)if((t||c in a)&&a[c]===n)return t||c||0;return !t&&-1}};},function(t,e,n){var i=n(9),r=n(1)("toStringTag"),o="Arguments"==i(function(){return arguments}()),s=function(t,e){try{return t[e]}catch(t){}};t.exports=function(t){var e,n,u;return void 0===t?"Undefined":null===t?"Null":"string"==typeof(n=s(e=Object(t),r))?n:o?i(e):"Object"==(u=i(e))&&"function"==typeof e.callee?"Arguments":u};},function(t,e,n){var i=n(2);t.exports=function(){var t=i(this),e="";return t.global&&(e+="g"),t.ignoreCase&&(e+="i"),t.multiline&&(e+="m"),t.unicode&&(e+="u"),t.sticky&&(e+="y"),e};},function(t,e,n){var i=n(0).document;t.exports=i&&i.documentElement;},function(t,e,n){t.exports=!n(4)&&!n(7)(function(){return 7!=Object.defineProperty(n(21)("div"),"a",{get:function(){return 7}}).a});},function(t,e,n){var i=n(9);t.exports=Array.isArray||function(t){return "Array"==i(t)};},function(t,e,n){function i(t){var e,n;this.promise=new t(function(t,i){if(void 0!==e||void 0!==n)throw TypeError("Bad Promise constructor");e=t,n=i;}),this.resolve=r(e),this.reject=r(n);}var r=n(14);t.exports.f=function(t){return new i(t)};},function(t,e,n){var i=n(2),r=n(76),o=n(22),s=n(27)("IE_PROTO"),u=function(){},a=function(){var t,e=n(21)("iframe"),i=o.length;for(e.style.display="none",n(40).appendChild(e),e.src="javascript:",t=e.contentWindow.document,t.open(),t.write("<script>document.F=Object<\/script>"),t.close(),a=t.F;i--;)delete a.prototype[o[i]];return a()};t.exports=Object.create||function(t,e){var n;return null!==t?(u.prototype=i(t),n=new u,u.prototype=null,n[s]=t):n=a(),void 0===e?n:r(n,e)};},function(t,e,n){var i=n(79),r=n(25),o=n(18),s=n(29),u=n(12),a=n(41),l=Object.getOwnPropertyDescriptor;e.f=n(4)?l:function(t,e){if(t=o(t),e=s(e,!0),a)try{return l(t,e)}catch(t){}if(u(t,e))return r(!i.f.call(t,e),t[e])};},function(t,e,n){var i=n(12),r=n(18),o=n(37)(!1),s=n(27)("IE_PROTO");t.exports=function(t,e){var n,u=r(t),a=0,l=[];for(n in u)n!=s&&i(u,n)&&l.push(n);for(;e.length>a;)i(u,n=e[a++])&&(~o(l,n)||l.push(n));return l};},function(t,e,n){var i=n(46),r=n(22);t.exports=Object.keys||function(t){return i(t,r)};},function(t,e,n){var i=n(2),r=n(5),o=n(43);t.exports=function(t,e){if(i(t),r(e)&&e.constructor===t)return e;var n=o.f(t);return (0, n.resolve)(e),n.promise};},function(t,e,n){var i=n(10),r=n(0),o=r["__core-js_shared__"]||(r["__core-js_shared__"]={});(t.exports=function(t,e){return o[t]||(o[t]=void 0!==e?e:{})})("versions",[]).push({version:i.version,mode:n(24)?"pure":"global",copyright:"© 2018 Denis Pushkarev (zloirock.ru)"});},function(t,e,n){var i=n(2),r=n(14),o=n(1)("species");t.exports=function(t,e){var n,s=i(t).constructor;return void 0===s||void 0==(n=i(s)[o])?e:r(n)};},function(t,e,n){var i=n(3),r=n(16),o=n(7),s=n(84),u="["+s+"]",a="​",l=RegExp("^"+u+u+"*"),c=RegExp(u+u+"*$"),f=function(t,e,n){var r={},u=o(function(){return !!s[t]()||a[t]()!=a}),l=r[t]=u?e(p):s[t];n&&(r[n]=l),i(i.P+i.F*u,"String",r);},p=f.trim=function(t,e){return t=String(r(t)),1&e&&(t=t.replace(l,"")),2&e&&(t=t.replace(c,"")),t};t.exports=f;},function(t,e,n){var i,r,o,s=n(11),u=n(68),a=n(40),l=n(21),c=n(0),f=c.process,p=c.setImmediate,h=c.clearImmediate,d=c.MessageChannel,v=c.Dispatch,g=0,y={},m=function(){var t=+this;if(y.hasOwnProperty(t)){var e=y[t];delete y[t],e();}},b=function(t){m.call(t.data);};p&&h||(p=function(t){for(var e=[],n=1;arguments.length>n;)e.push(arguments[n++]);return y[++g]=function(){u("function"==typeof t?t:Function(t),e);},i(g),g},h=function(t){delete y[t];},"process"==n(9)(f)?i=function(t){f.nextTick(s(m,t,1));}:v&&v.now?i=function(t){v.now(s(m,t,1));}:d?(r=new d,o=r.port2,r.port1.onmessage=b,i=s(o.postMessage,o,1)):c.addEventListener&&"function"==typeof postMessage&&!c.importScripts?(i=function(t){c.postMessage(t+"","*");},c.addEventListener("message",b,!1)):i="onreadystatechange"in l("script")?function(t){a.appendChild(l("script")).onreadystatechange=function(){a.removeChild(this),m.call(t);};}:function(t){setTimeout(s(m,t,1),0);}),t.exports={set:p,clear:h};},function(t,e){var n=Math.ceil,i=Math.floor;t.exports=function(t){return isNaN(t=+t)?0:(t>0?i:n)(t)};},function(t,e,n){var i=n(3),r=n(20)(5),o=!0;"find"in[]&&Array(1).find(function(){o=!1;}),i(i.P+i.F*o,"Array",{find:function(t){return r(this,t,arguments.length>1?arguments[1]:void 0)}}),n(36)("find");},function(t,e,n){var i,r,o,s,u=n(24),a=n(0),l=n(11),c=n(38),f=n(3),p=n(5),h=n(14),d=n(61),v=n(66),g=n(50),y=n(52).set,m=n(75)(),b=n(43),_=n(80),x=n(86),w=n(48),S=a.TypeError,O=a.process,L=O&&O.versions,k=L&&L.v8||"",P=a.Promise,T="process"==c(O),V=function(){},E=r=b.f,A=!!function(){try{var t=P.resolve(1),e=(t.constructor={})[n(1)("species")]=function(t){t(V,V);};return (T||"function"==typeof PromiseRejectionEvent)&&t.then(V)instanceof e&&0!==k.indexOf("6.6")&&-1===x.indexOf("Chrome/66")}catch(t){}}(),C=function(t){var e;return !(!p(t)||"function"!=typeof(e=t.then))&&e},D=function(t,e){if(!t._n){t._n=!0;var n=t._c;m(function(){for(var i=t._v,r=1==t._s,o=0;n.length>o;)!function(e){var n,o,s,u=r?e.ok:e.fail,a=e.resolve,l=e.reject,c=e.domain;try{u?(r||(2==t._h&&$(t),t._h=1),!0===u?n=i:(c&&c.enter(),n=u(i),c&&(c.exit(),s=!0)),n===e.promise?l(S("Promise-chain cycle")):(o=C(n))?o.call(n,a,l):a(n)):l(i);}catch(t){c&&!s&&c.exit(),l(t);}}(n[o++]);t._c=[],t._n=!1,e&&!t._h&&j(t);});}},j=function(t){y.call(a,function(){var e,n,i,r=t._v,o=N(t);if(o&&(e=_(function(){T?O.emit("unhandledRejection",r,t):(n=a.onunhandledrejection)?n({promise:t,reason:r}):(i=a.console)&&i.error&&i.error("Unhandled promise rejection",r);}),t._h=T||N(t)?2:1),t._a=void 0,o&&e.e)throw e.v});},N=function(t){return 1!==t._h&&0===(t._a||t._c).length},$=function(t){y.call(a,function(){var e;T?O.emit("rejectionHandled",t):(e=a.onrejectionhandled)&&e({promise:t,reason:t._v});});},F=function(t){var e=this;e._d||(e._d=!0,e=e._w||e,e._v=t,e._s=2,e._a||(e._a=e._c.slice()),D(e,!0));},M=function(t){var e,n=this;if(!n._d){n._d=!0,n=n._w||n;try{if(n===t)throw S("Promise can't be resolved itself");(e=C(t))?m(function(){var i={_w:n,_d:!1};try{e.call(t,l(M,i,1),l(F,i,1));}catch(t){F.call(i,t);}}):(n._v=t,n._s=1,D(n,!1));}catch(t){F.call({_w:n,_d:!1},t);}}};A||(P=function(t){d(this,P,"Promise","_h"),h(t),i.call(this);try{t(l(M,this,1),l(F,this,1));}catch(t){F.call(this,t);}},i=function(t){this._c=[],this._a=void 0,this._s=0,this._d=!1,this._v=void 0,this._h=0,this._n=!1;},i.prototype=n(81)(P.prototype,{then:function(t,e){var n=E(g(this,P));return n.ok="function"!=typeof t||t,n.fail="function"==typeof e&&e,n.domain=T?O.domain:void 0,this._c.push(n),this._a&&this._a.push(n),this._s&&D(this,!1),n.promise},catch:function(t){return this.then(void 0,t)}}),o=function(){var t=new i;this.promise=t,this.resolve=l(M,t,1),this.reject=l(F,t,1);},b.f=E=function(t){return t===P||t===s?new o(t):r(t)}),f(f.G+f.W+f.F*!A,{Promise:P}),n(26)(P,"Promise"),n(83)("Promise"),s=n(10).Promise,f(f.S+f.F*!A,"Promise",{reject:function(t){var e=E(this);return (0, e.reject)(t),e.promise}}),f(f.S+f.F*(u||!A),"Promise",{resolve:function(t){return w(u&&this===s?P:this,t)}}),f(f.S+f.F*!(A&&n(73)(function(t){P.all(t).catch(V);})),"Promise",{all:function(t){var e=this,n=E(e),i=n.resolve,r=n.reject,o=_(function(){var n=[],o=0,s=1;v(t,!1,function(t){var u=o++,a=!1;n.push(void 0),s++,e.resolve(t).then(function(t){a||(a=!0,n[u]=t,--s||i(n));},r);}),--s||i(n);});return o.e&&r(o.v),n.promise},race:function(t){var e=this,n=E(e),i=n.reject,r=_(function(){v(t,!1,function(t){e.resolve(t).then(n.resolve,i);});});return r.e&&i(r.v),n.promise}});},function(t,e,n){var i=n(3),r=n(10),o=n(0),s=n(50),u=n(48);i(i.P+i.R,"Promise",{finally:function(t){var e=s(this,r.Promise||o.Promise),n="function"==typeof t;return this.then(n?function(n){return u(e,t()).then(function(){return n})}:t,n?function(n){return u(e,t()).then(function(){throw n})}:t)}});},function(t,e,n){function i(t){n(99);}var r=n(35),o=n(101),s=n(100),u=i,a=s(r.a,o.a,!1,u,null,null);e.a=a.exports;},function(t,e,n){function i(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}e.a=i;},function(t,e,n){function i(t){return (i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function r(t){return (r="function"==typeof Symbol&&"symbol"===i(Symbol.iterator)?function(t){return i(t)}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":i(t)})(t)}e.a=r;},function(t,e,n){Object.defineProperty(e,"__esModule",{value:!0});var i=n(34),r=(n.n(i),n(55)),o=(n.n(r),n(56)),s=(n.n(o),n(57)),u=n(32),a=n(33);n.d(e,"Multiselect",function(){return s.a}),n.d(e,"multiselectMixin",function(){return u.a}),n.d(e,"pointerMixin",function(){return a.a}),e.default=s.a;},function(t,e){t.exports=function(t,e,n,i){if(!(t instanceof e)||void 0!==i&&i in t)throw TypeError(n+": incorrect invocation!");return t};},function(t,e,n){var i=n(14),r=n(28),o=n(23),s=n(19);t.exports=function(t,e,n,u,a){i(e);var l=r(t),c=o(l),f=s(l.length),p=a?f-1:0,h=a?-1:1;if(n<2)for(;;){if(p in c){u=c[p],p+=h;break}if(p+=h,a?p<0:f<=p)throw TypeError("Reduce of empty array with no initial value")}for(;a?p>=0:f>p;p+=h)p in c&&(u=e(u,c[p],p,l));return u};},function(t,e,n){var i=n(5),r=n(42),o=n(1)("species");t.exports=function(t){var e;return r(t)&&(e=t.constructor,"function"!=typeof e||e!==Array&&!r(e.prototype)||(e=void 0),i(e)&&null===(e=e[o])&&(e=void 0)),void 0===e?Array:e};},function(t,e,n){var i=n(63);t.exports=function(t,e){return new(i(t))(e)};},function(t,e,n){var i=n(8),r=n(6),o=n(7),s=n(16),u=n(1);t.exports=function(t,e,n){var a=u(t),l=n(s,a,""[t]),c=l[0],f=l[1];o(function(){var e={};return e[a]=function(){return 7},7!=""[t](e)})&&(r(String.prototype,t,c),i(RegExp.prototype,a,2==e?function(t,e){return f.call(t,this,e)}:function(t){return f.call(t,this)}));};},function(t,e,n){var i=n(11),r=n(70),o=n(69),s=n(2),u=n(19),a=n(87),l={},c={},e=t.exports=function(t,e,n,f,p){var h,d,v,g,y=p?function(){return t}:a(t),m=i(n,f,e?2:1),b=0;if("function"!=typeof y)throw TypeError(t+" is not iterable!");if(o(y)){for(h=u(t.length);h>b;b++)if((g=e?m(s(d=t[b])[0],d[1]):m(t[b]))===l||g===c)return g}else for(v=y.call(t);!(d=v.next()).done;)if((g=r(v,m,d.value,e))===l||g===c)return g};e.BREAK=l,e.RETURN=c;},function(t,e,n){var i=n(5),r=n(82).set;t.exports=function(t,e,n){var o,s=e.constructor;return s!==n&&"function"==typeof s&&(o=s.prototype)!==n.prototype&&i(o)&&r&&r(t,o),t};},function(t,e){t.exports=function(t,e,n){var i=void 0===n;switch(e.length){case 0:return i?t():t.call(n);case 1:return i?t(e[0]):t.call(n,e[0]);case 2:return i?t(e[0],e[1]):t.call(n,e[0],e[1]);case 3:return i?t(e[0],e[1],e[2]):t.call(n,e[0],e[1],e[2]);case 4:return i?t(e[0],e[1],e[2],e[3]):t.call(n,e[0],e[1],e[2],e[3])}return t.apply(n,e)};},function(t,e,n){var i=n(15),r=n(1)("iterator"),o=Array.prototype;t.exports=function(t){return void 0!==t&&(i.Array===t||o[r]===t)};},function(t,e,n){var i=n(2);t.exports=function(t,e,n,r){try{return r?e(i(n)[0],n[1]):e(n)}catch(e){var o=t.return;throw void 0!==o&&i(o.call(t)),e}};},function(t,e,n){var i=n(44),r=n(25),o=n(26),s={};n(8)(s,n(1)("iterator"),function(){return this}),t.exports=function(t,e,n){t.prototype=i(s,{next:r(1,n)}),o(t,e+" Iterator");};},function(t,e,n){var i=n(24),r=n(3),o=n(6),s=n(8),u=n(15),a=n(71),l=n(26),c=n(78),f=n(1)("iterator"),p=!([].keys&&"next"in[].keys()),h=function(){return this};t.exports=function(t,e,n,d,v,g,y){a(n,e,d);var m,b,_,x=function(t){if(!p&&t in L)return L[t];switch(t){case"keys":case"values":return function(){return new n(this,t)}}return function(){return new n(this,t)}},w=e+" Iterator",S="values"==v,O=!1,L=t.prototype,k=L[f]||L["@@iterator"]||v&&L[v],P=k||x(v),T=v?S?x("entries"):P:void 0,V="Array"==e?L.entries||k:k;if(V&&(_=c(V.call(new t)))!==Object.prototype&&_.next&&(l(_,w,!0),i||"function"==typeof _[f]||s(_,f,h)),S&&k&&"values"!==k.name&&(O=!0,P=function(){return k.call(this)}),i&&!y||!p&&!O&&L[f]||s(L,f,P),u[e]=P,u[w]=h,v)if(m={values:S?P:x("values"),keys:g?P:x("keys"),entries:T},y)for(b in m)b in L||o(L,b,m[b]);else r(r.P+r.F*(p||O),e,m);return m};},function(t,e,n){var i=n(1)("iterator"),r=!1;try{var o=[7][i]();o.return=function(){r=!0;},Array.from(o,function(){throw 2});}catch(t){}t.exports=function(t,e){if(!e&&!r)return !1;var n=!1;try{var o=[7],s=o[i]();s.next=function(){return {done:n=!0}},o[i]=function(){return s},t(o);}catch(t){}return n};},function(t,e){t.exports=function(t,e){return {value:e,done:!!t}};},function(t,e,n){var i=n(0),r=n(52).set,o=i.MutationObserver||i.WebKitMutationObserver,s=i.process,u=i.Promise,a="process"==n(9)(s);t.exports=function(){var t,e,n,l=function(){var i,r;for(a&&(i=s.domain)&&i.exit();t;){r=t.fn,t=t.next;try{r();}catch(i){throw t?n():e=void 0,i}}e=void 0,i&&i.enter();};if(a)n=function(){s.nextTick(l);};else if(!o||i.navigator&&i.navigator.standalone)if(u&&u.resolve){var c=u.resolve(void 0);n=function(){c.then(l);};}else n=function(){r.call(i,l);};else {var f=!0,p=document.createTextNode("");new o(l).observe(p,{characterData:!0}),n=function(){p.data=f=!f;};}return function(i){var r={fn:i,next:void 0};e&&(e.next=r),t||(t=r,n()),e=r;}};},function(t,e,n){var i=n(13),r=n(2),o=n(47);t.exports=n(4)?Object.defineProperties:function(t,e){r(t);for(var n,s=o(e),u=s.length,a=0;u>a;)i.f(t,n=s[a++],e[n]);return t};},function(t,e,n){var i=n(46),r=n(22).concat("length","prototype");e.f=Object.getOwnPropertyNames||function(t){return i(t,r)};},function(t,e,n){var i=n(12),r=n(28),o=n(27)("IE_PROTO"),s=Object.prototype;t.exports=Object.getPrototypeOf||function(t){return t=r(t),i(t,o)?t[o]:"function"==typeof t.constructor&&t instanceof t.constructor?t.constructor.prototype:t instanceof Object?s:null};},function(t,e){e.f={}.propertyIsEnumerable;},function(t,e){t.exports=function(t){try{return {e:!1,v:t()}}catch(t){return {e:!0,v:t}}};},function(t,e,n){var i=n(6);t.exports=function(t,e,n){for(var r in e)i(t,r,e[r],n);return t};},function(t,e,n){var i=n(5),r=n(2),o=function(t,e){if(r(t),!i(e)&&null!==e)throw TypeError(e+": can't set as prototype!")};t.exports={set:Object.setPrototypeOf||("__proto__"in{}?function(t,e,i){try{i=n(11)(Function.call,n(45).f(Object.prototype,"__proto__").set,2),i(t,[]),e=!(t instanceof Array);}catch(t){e=!0;}return function(t,n){return o(t,n),e?t.__proto__=n:i(t,n),t}}({},!1):void 0),check:o};},function(t,e,n){var i=n(0),r=n(13),o=n(4),s=n(1)("species");t.exports=function(t){var e=i[t];o&&e&&!e[s]&&r.f(e,s,{configurable:!0,get:function(){return this}});};},function(t,e){t.exports="\t\n\v\f\r   ᠎             　\u2028\u2029\ufeff";},function(t,e,n){var i=n(53),r=Math.max,o=Math.min;t.exports=function(t,e){return t=i(t),t<0?r(t+e,0):o(t,e)};},function(t,e,n){var i=n(0),r=i.navigator;t.exports=r&&r.userAgent||"";},function(t,e,n){var i=n(38),r=n(1)("iterator"),o=n(15);t.exports=n(10).getIteratorMethod=function(t){if(void 0!=t)return t[r]||t["@@iterator"]||o[i(t)]};},function(t,e,n){var i=n(3),r=n(20)(2);i(i.P+i.F*!n(17)([].filter,!0),"Array",{filter:function(t){return r(this,t,arguments[1])}});},function(t,e,n){var i=n(3),r=n(37)(!1),o=[].indexOf,s=!!o&&1/[1].indexOf(1,-0)<0;i(i.P+i.F*(s||!n(17)(o)),"Array",{indexOf:function(t){return s?o.apply(this,arguments)||0:r(this,t,arguments[1])}});},function(t,e,n){var i=n(3);i(i.S,"Array",{isArray:n(42)});},function(t,e,n){var i=n(3),r=n(20)(1);i(i.P+i.F*!n(17)([].map,!0),"Array",{map:function(t){return r(this,t,arguments[1])}});},function(t,e,n){var i=n(3),r=n(62);i(i.P+i.F*!n(17)([].reduce,!0),"Array",{reduce:function(t){return r(this,t,arguments.length,arguments[1],!1)}});},function(t,e,n){var i=Date.prototype,r=i.toString,o=i.getTime;new Date(NaN)+""!="Invalid Date"&&n(6)(i,"toString",function(){var t=o.call(this);return t===t?r.call(this):"Invalid Date"});},function(t,e,n){n(4)&&"g"!=/./g.flags&&n(13).f(RegExp.prototype,"flags",{configurable:!0,get:n(39)});},function(t,e,n){n(65)("search",1,function(t,e,n){return [function(n){var i=t(this),r=void 0==n?void 0:n[e];return void 0!==r?r.call(n,i):new RegExp(n)[e](String(i))},n]});},function(t,e,n){n(94);var i=n(2),r=n(39),o=n(4),s=/./.toString,u=function(t){n(6)(RegExp.prototype,"toString",t,!0);};n(7)(function(){return "/a/b"!=s.call({source:"a",flags:"b"})})?u(function(){var t=i(this);return "/".concat(t.source,"/","flags"in t?t.flags:!o&&t instanceof RegExp?r.call(t):void 0)}):"toString"!=s.name&&u(function(){return s.call(this)});},function(t,e,n){n(51)("trim",function(t){return function(){return t(this,3)}});},function(t,e,n){for(var i=n(34),r=n(47),o=n(6),s=n(0),u=n(8),a=n(15),l=n(1),c=l("iterator"),f=l("toStringTag"),p=a.Array,h={CSSRuleList:!0,CSSStyleDeclaration:!1,CSSValueList:!1,ClientRectList:!1,DOMRectList:!1,DOMStringList:!1,DOMTokenList:!0,DataTransferItemList:!1,FileList:!1,HTMLAllCollection:!1,HTMLCollection:!1,HTMLFormElement:!1,HTMLSelectElement:!1,MediaList:!0,MimeTypeArray:!1,NamedNodeMap:!1,NodeList:!0,PaintRequestList:!1,Plugin:!1,PluginArray:!1,SVGLengthList:!1,SVGNumberList:!1,SVGPathSegList:!1,SVGPointList:!1,SVGStringList:!1,SVGTransformList:!1,SourceBufferList:!1,StyleSheetList:!0,TextTrackCueList:!1,TextTrackList:!1,TouchList:!1},d=r(h),v=0;v<d.length;v++){var g,y=d[v],m=h[y],b=s[y],_=b&&b.prototype;if(_&&(_[c]||u(_,c,p),_[f]||u(_,f,y),a[y]=p,m))for(g in i)_[g]||o(_,g,i[g],!0);}},function(t,e){},function(t,e){t.exports=function(t,e,n,i,r,o){var s,u=t=t||{},a=typeof t.default;"object"!==a&&"function"!==a||(s=t,u=t.default);var l="function"==typeof u?u.options:u;e&&(l.render=e.render,l.staticRenderFns=e.staticRenderFns,l._compiled=!0),n&&(l.functional=!0),r&&(l._scopeId=r);var c;if(o?(c=function(t){t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext,t||"undefined"==typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),i&&i.call(this,t),t&&t._registeredComponents&&t._registeredComponents.add(o);},l._ssrRegister=c):i&&(c=i),c){var f=l.functional,p=f?l.render:l.beforeCreate;f?(l._injectStyles=c,l.render=function(t,e){return c.call(e),p(t,e)}):l.beforeCreate=p?[].concat(p,c):[c];}return {esModule:s,exports:u,options:l}};},function(t,e,n){var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"multiselect",class:{"multiselect--active":t.isOpen,"multiselect--disabled":t.disabled,"multiselect--above":t.isAbove},attrs:{tabindex:t.searchable?-1:t.tabindex},on:{focus:function(e){t.activate();},blur:function(e){!t.searchable&&t.deactivate();},keydown:[function(e){return "button"in e||!t._k(e.keyCode,"down",40,e.key,["Down","ArrowDown"])?e.target!==e.currentTarget?null:(e.preventDefault(),void t.pointerForward()):null},function(e){return "button"in e||!t._k(e.keyCode,"up",38,e.key,["Up","ArrowUp"])?e.target!==e.currentTarget?null:(e.preventDefault(),void t.pointerBackward()):null}],keypress:function(e){return "button"in e||!t._k(e.keyCode,"enter",13,e.key,"Enter")||!t._k(e.keyCode,"tab",9,e.key,"Tab")?(e.stopPropagation(),e.target!==e.currentTarget?null:void t.addPointerElement(e)):null},keyup:function(e){if(!("button"in e)&&t._k(e.keyCode,"esc",27,e.key,"Escape"))return null;t.deactivate();}}},[t._t("caret",[n("div",{staticClass:"multiselect__select",on:{mousedown:function(e){e.preventDefault(),e.stopPropagation(),t.toggle();}}})],{toggle:t.toggle}),t._v(" "),t._t("clear",null,{search:t.search}),t._v(" "),n("div",{ref:"tags",staticClass:"multiselect__tags"},[t._t("selection",[n("div",{directives:[{name:"show",rawName:"v-show",value:t.visibleValues.length>0,expression:"visibleValues.length > 0"}],staticClass:"multiselect__tags-wrap"},[t._l(t.visibleValues,function(e,i){return [t._t("tag",[n("span",{key:i,staticClass:"multiselect__tag"},[n("span",{domProps:{textContent:t._s(t.getOptionLabel(e))}}),t._v(" "),n("i",{staticClass:"multiselect__tag-icon",attrs:{"aria-hidden":"true",tabindex:"1"},on:{keypress:function(n){if(!("button"in n)&&t._k(n.keyCode,"enter",13,n.key,"Enter"))return null;n.preventDefault(),t.removeElement(e);},mousedown:function(n){n.preventDefault(),t.removeElement(e);}}})])],{option:e,search:t.search,remove:t.removeElement})]})],2),t._v(" "),t.internalValue&&t.internalValue.length>t.limit?[t._t("limit",[n("strong",{staticClass:"multiselect__strong",domProps:{textContent:t._s(t.limitText(t.internalValue.length-t.limit))}})])]:t._e()],{search:t.search,remove:t.removeElement,values:t.visibleValues,isOpen:t.isOpen}),t._v(" "),n("transition",{attrs:{name:"multiselect__loading"}},[t._t("loading",[n("div",{directives:[{name:"show",rawName:"v-show",value:t.loading,expression:"loading"}],staticClass:"multiselect__spinner"})])],2),t._v(" "),t.searchable?n("input",{ref:"search",staticClass:"multiselect__input",style:t.inputStyle,attrs:{name:t.name,id:t.id,type:"text",autocomplete:"nope",placeholder:t.placeholder,disabled:t.disabled,tabindex:t.tabindex},domProps:{value:t.search},on:{input:function(e){t.updateSearch(e.target.value);},focus:function(e){e.preventDefault(),t.activate();},blur:function(e){e.preventDefault(),t.deactivate();},keyup:function(e){if(!("button"in e)&&t._k(e.keyCode,"esc",27,e.key,"Escape"))return null;t.deactivate();},keydown:[function(e){if(!("button"in e)&&t._k(e.keyCode,"down",40,e.key,["Down","ArrowDown"]))return null;e.preventDefault(),t.pointerForward();},function(e){if(!("button"in e)&&t._k(e.keyCode,"up",38,e.key,["Up","ArrowUp"]))return null;e.preventDefault(),t.pointerBackward();},function(e){if(!("button"in e)&&t._k(e.keyCode,"delete",[8,46],e.key,["Backspace","Delete"]))return null;e.stopPropagation(),t.removeLastElement();}],keypress:function(e){return "button"in e||!t._k(e.keyCode,"enter",13,e.key,"Enter")?(e.preventDefault(),e.stopPropagation(),e.target!==e.currentTarget?null:void t.addPointerElement(e)):null}}}):t._e(),t._v(" "),t.isSingleLabelVisible?n("span",{staticClass:"multiselect__single",on:{mousedown:function(e){return e.preventDefault(),t.toggle(e)}}},[t._t("singleLabel",[[t._v(t._s(t.currentOptionLabel))]],{option:t.singleValue})],2):t._e(),t._v(" "),t.isPlaceholderVisible?n("span",{staticClass:"multiselect__placeholder",on:{mousedown:function(e){return e.preventDefault(),t.toggle(e)}}},[t._t("placeholder",[t._v("\n          "+t._s(t.placeholder)+"\n        ")])],2):t._e()],2),t._v(" "),n("transition",{attrs:{name:"multiselect"}},[n("div",{directives:[{name:"show",rawName:"v-show",value:t.isOpen,expression:"isOpen"}],ref:"list",staticClass:"multiselect__content-wrapper",style:{maxHeight:t.optimizedHeight+"px"},attrs:{tabindex:"-1"},on:{focus:t.activate,mousedown:function(t){t.preventDefault();}}},[n("ul",{staticClass:"multiselect__content",style:t.contentStyle},[t._t("beforeList"),t._v(" "),t.multiple&&t.max===t.internalValue.length?n("li",[n("span",{staticClass:"multiselect__option"},[t._t("maxElements",[t._v("Maximum of "+t._s(t.max)+" options selected. First remove a selected option to select another.")])],2)]):t._e(),t._v(" "),!t.max||t.internalValue.length<t.max?t._l(t.filteredOptions,function(e,i){return n("li",{key:i,staticClass:"multiselect__element"},[e&&(e.$isLabel||e.$isDisabled)?t._e():n("span",{staticClass:"multiselect__option",class:t.optionHighlight(i,e),attrs:{"data-select":e&&e.isTag?t.tagPlaceholder:t.selectLabelText,"data-selected":t.selectedLabelText,"data-deselect":t.deselectLabelText},on:{click:function(n){n.stopPropagation(),t.select(e);},mouseenter:function(e){if(e.target!==e.currentTarget)return null;t.pointerSet(i);}}},[t._t("option",[n("span",[t._v(t._s(t.getOptionLabel(e)))])],{option:e,search:t.search})],2),t._v(" "),e&&(e.$isLabel||e.$isDisabled)?n("span",{staticClass:"multiselect__option",class:t.groupHighlight(i,e),attrs:{"data-select":t.groupSelect&&t.selectGroupLabelText,"data-deselect":t.groupSelect&&t.deselectGroupLabelText},on:{mouseenter:function(e){if(e.target!==e.currentTarget)return null;t.groupSelect&&t.pointerSet(i);},mousedown:function(n){n.preventDefault(),t.selectGroup(e);}}},[t._t("option",[n("span",[t._v(t._s(t.getOptionLabel(e)))])],{option:e,search:t.search})],2):t._e()])}):t._e(),t._v(" "),n("li",{directives:[{name:"show",rawName:"v-show",value:t.showNoResults&&0===t.filteredOptions.length&&t.search&&!t.loading,expression:"showNoResults && (filteredOptions.length === 0 && search && !loading)"}]},[n("span",{staticClass:"multiselect__option"},[t._t("noResult",[t._v("No elements found. Consider changing the search query.")],{search:t.search})],2)]),t._v(" "),n("li",{directives:[{name:"show",rawName:"v-show",value:t.showNoOptions&&0===t.options.length&&!t.search&&!t.loading,expression:"showNoOptions && (options.length === 0 && !search && !loading)"}]},[n("span",{staticClass:"multiselect__option"},[t._t("noOptions",[t._v("List is empty.")])],2)]),t._v(" "),t._t("afterList")],2)])])],2)},r=[],o={render:i,staticRenderFns:r};e.a=o;}])});
  });

  var Multiselect = unwrapExports(vueMultiselect_min);
  var vueMultiselect_min_1 = vueMultiselect_min.VueMultiselect;

  var script$2 = {
    name: 'MultiSelectField',
    props: {
      value: {
        type: [String, Array, Object]
      },
      label: {
        type: String
      },
      required: {
        type: [String, Boolean]
      },
      placeholder: {
        type: String
      },
      customClass: {
        type: String
      },
      disabled: {
        type: Boolean
      },
      displayMode: {
        type: String
      },
      hideLabel: {
        type: Boolean
      },
      filter: {
        type: String
      },
      filterArgs: {
        type: Array,
        default: function _default() {
          return [];
        }
      },
      displayField: {
        type: String
      },
      valueField: {
        type: String
      },
      fullObject: {
        type: Boolean
      },
      searchable: {
        type: [Boolean, String]
      },
      multiple: {
        type: [Boolean, String]
      },
      allowClear: {
        type: Boolean
      },
      showAvatar: {
        type: Boolean
      },
      avatarProp: {
        type: String
      },
      optionTemplate: {
        type: String
      },
      selectFrom: {
        type: [Object, Array]
      },
      property: {
        type: Object
      },
      attrs: {
        type: Object
      }
    },
    components: {
      Multiselect: Multiselect
    },
    data: function data() {
      return {
        clonedValue: {},
        selected: []
      };
    },
    methods: {
      remove: function remove() {
        var _this = this;

        this.$nextTick(function () {
          _this.handler();
        });
      },
      handler: function handler() {
        var _this2 = this;

        var clonedValue = _objectSpread2({}, this.clonedValue);

        if (this.fullObject) {
          clonedValue.value = this.selected;
        } else {
          clonedValue.value = this.selected.map(function (item) {
            return item[_this2.valueField || '_id'];
          });
        }

        this.clonedValue = clonedValue;
        this.validate();
        this.$emit('updateValue', this.clonedValue);
      },
      validate: function validate() {
        if (this.property) {
          if (this.property.required && !this.clonedValue.value && !this.multiple) {
            this.clonedValue.$invalid = true;
            this.clonedValue.$error = 'required';
          } else if (this.property.required && !this.clonedValue.value.length && this.multiple) {
            this.clonedValue.$invalid = true;
            this.clonedValue.$error = 'required';
          } else {
            this.clonedValue.$invalid = false;
            this.clonedValue.$error = null;
          }
        }
      }
    },
    computed: {
      items: function items() {
        return this.selectFrom || (this.property ? this.property.enum : []);
      },
      displayFromObject: function displayFromObject() {
        var _this3 = this;

        var result;

        if (this.selectFrom.length && !this.fullObject) {
          result = this.selectFrom.filter(function (item) {
            return item[_this3.valueField || '_id'] === _this3.clonedValue.value;
          });
          return result.map(function (item) {
            return item[_this3.displayField || 'Name'];
          }).join(',');
        }

        return '';
      }
    },
    watch: {
      selectFrom: {
        handler: function handler(newVal) {
          var _this4 = this;

          if (newVal.length > 0 && _typeof(newVal[0]) === 'object') {
            this.selected = newVal.find(function (item) {
              return item._id === _this4.selected;
            });
          }
        },
        deep: true
      }
    },
    created: function created() {
      var _this5 = this;

      if (this.selectFrom && this.selectFrom.length && _typeof(this.selectFrom[0]) === 'object') {
        // check if any external objects exist in the list  via select from
        if (this.value) {
          this.selected = this.selectFrom.filter(function (item) {
            return item[_this5.valueField || '_id'] === _this5.value;
          });
        } else if (this.property && this.property.value) {
          this.selected = this.selectFrom.filter(function (item) {
            return _this5.property.value.indexOf(item[_this5.valueField || '_id']) > -1;
          });
        } else {
          this.selected = [];
        }
      } else {
        if (this.value) {
          this.selected = Array.isArray(this.value) ? this.value : [this.value];
        } else if (this.property && this.property.value) {
          this.selected = Array.isArray(this.value) ? this.property.value : [this.property.value];
        } else {
          this.selected = [];
        }
      }

      this.handler();
    }
  };

  var __vue_script__$2 = script$2;
  /* template */

  var __vue_render__$2 = function __vue_render__() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('div', [_c('label', {
      directives: [{
        name: "show",
        rawName: "v-show",
        value: !_vm.hideLabel,
        expression: "!hideLabel"
      }],
      staticClass: "control-label",
      attrs: {
        "for": _vm.label || _vm.property.name
      },
      domProps: {
        "textContent": _vm._s(_vm.label || _vm.property.name)
      }
    }), _vm._v(" "), _c('br', {
      staticClass: "clearfix"
    }), _vm._v(" "), _vm.displayMode === 'EDIT' || _vm.displayMode === 'CREATE' ? _c('div', {
      staticClass: "form-element"
    }, [_vm.multiple && _typeof(_vm.items[0]) === 'object' ? _c('div', {
      staticClass: "multiple"
    }, [_c('multiselect', {
      attrs: {
        "options": _vm.items,
        "multiple": true,
        "track-by": "_id",
        "label": _vm.displayField || 'Name',
        "close-on-select": true,
        "clear-on-select": true,
        "preserve-search": false,
        "select-label": "",
        "deselect-label": "",
        "hide-selected": true
      },
      on: {
        "close": _vm.handler,
        "remove": _vm.remove
      },
      scopedSlots: _vm._u([{
        key: "option",
        fn: function fn(props) {
          return [_c('div', {
            staticClass: "description"
          }, [_c('div', {
            staticClass: "title"
          }, [_vm._v("\n                            " + _vm._s(props.option.Name) + "\n                        ")]), _vm._v(" "), props.option.Description ? _c('small', {
            staticClass: "text-muted"
          }, [_vm._v("\n                            " + _vm._s(props.option.Description) + "\n                        ")]) : _vm._e()])];
        }
      }], null, false, 658030140),
      model: {
        value: _vm.selected,
        callback: function callback($$v) {
          _vm.selected = $$v;
        },
        expression: "selected"
      }
    })], 1) : typeof _vm.items[0] === 'string' ? _c('div', {
      staticClass: "multiple"
    }, [_c('multiselect', {
      attrs: {
        "options": _vm.items,
        "multiple": true,
        "track-by": "_id",
        "label": _vm.displayField || 'Name',
        "close-on-select": true,
        "clear-on-select": true,
        "preserve-search": false,
        "select-label": "",
        "deselect-label": "",
        "hide-selected": true
      },
      on: {
        "close": _vm.handler,
        "remove": _vm.remove
      },
      model: {
        value: _vm.selected,
        callback: function callback($$v) {
          _vm.selected = $$v;
        },
        expression: "selected"
      }
    })], 1) : _vm._e()]) : _vm.selectFrom && _vm.displayMode === 'VIEW' && _typeof(_vm.selectFrom[0]) === 'object' ? _c('p', {
      staticClass: "form-control-static",
      domProps: {
        "textContent": _vm._s(_vm.displayFromObject)
      }
    }) : _vm._e()]);
  };

  var __vue_staticRenderFns__$2 = [];
  /* style */

  var __vue_inject_styles__$2 = undefined;
  /* scoped */

  var __vue_scope_id__$2 = "data-v-39884eec";
  /* module identifier */

  var __vue_module_identifier__$2 = undefined;
  /* functional template */

  var __vue_is_functional_template__$2 = false;
  /* style inject */

  /* style inject SSR */

  /* style inject shadow dom */

  var __vue_component__$2 = normalizeComponent({
    render: __vue_render__$2,
    staticRenderFns: __vue_staticRenderFns__$2
  }, __vue_inject_styles__$2, __vue_script__$2, __vue_scope_id__$2, __vue_is_functional_template__$2, __vue_module_identifier__$2, false, undefined, undefined, undefined);

  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  var script$3 = {
    name: 'NumberField',
    props: {
      value: {},
      label: {
        type: String
      },
      required: {
        type: [String, Boolean]
      },
      placeholder: {
        type: String
      },
      customClass: {
        type: String
      },
      disabled: {
        type: Boolean
      },
      displayMode: {
        type: String
      },
      hideLabel: {
        type: Boolean
      },
      filter: {
        type: String
      },
      filterArgs: {
        type: Array,
        default: function _default() {
          return [];
        }
      },
      min: {
        type: Number
      },
      max: {
        type: Number
      },
      prepend: {
        type: String
      },
      property: {
        type: Object
      },
      attrs: {
        type: Object
      }
    },
    data: function data() {
      return {
        clonedValue: {
          value: this.value !== undefined ? this.value : this.property ? this.property.value : undefined
        }
      };
    },
    methods: {
      handler: function handler() {
        if (this.clonedValue.value && typeof this.clonedValue.value !== 'number') {
          this.clonedValue.value = Number(this.clonedValue.value);
        }

        this.validate();
        this.$emit('updateValue', this.clonedValue);
      },
      validate: function validate() {
        if (this.property) {
          if ((this.required || this.property.required) && !this.clonedValue.value && this.clonedValue.value !== 0) {
            this.clonedValue.$invalid = true;
            this.clonedValue.$error = 'required';
          } else if (this.min !== undefined && this.clonedValue.value < this.min) {
            this.clonedValue.$invalid = true;
            this.clonedValue.$error = 'min';
          } else if (this.max !== undefined && this.clonedValue.value > this.max) {
            this.clonedValue.$invalid = true;
            this.clonedValue.$error = 'max';
          } else if (this.property.min !== undefined && this.clonedValue.value < this.property.min) {
            this.clonedValue.$invalid = true;
            this.clonedValue.$error = 'min';
          } else if (this.property.max !== undefined && this.clonedValue.value > this.property.max) {
            this.clonedValue.$invalid = true;
            this.clonedValue.$error = 'max';
          } else if (this.clonedValue.value && typeof this.clonedValue.value !== 'number') {
            this.clonedValue.$invalid = true;
            this.clonedValue.$error = 'regex';
          } else {
            this.clonedValue.$invalid = false;
            this.clonedValue.$error = null;
          }
        }
      }
    },
    created: function created() {
      this.handler();
    }
  };

  var __vue_script__$3 = script$3;
  /* template */

  var __vue_render__$3 = function __vue_render__() {
    var ref;

    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('div', [_c('label', {
      directives: [{
        name: "show",
        rawName: "v-show",
        value: !_vm.hideLabel,
        expression: "!hideLabel"
      }],
      staticClass: "control-label",
      attrs: {
        "for": _vm.attrs.id || _vm.label || _vm.property.name
      },
      domProps: {
        "textContent": _vm._s(_vm.label || _vm.property.name)
      }
    }), _vm._v(" "), _vm.displayMode === 'CREATE' || _vm.displayMode === 'EDIT' ? _c('div', {
      staticClass: "form-element"
    }, [_c('div', {
      staticClass: "input-group"
    }, [_vm.prepend ? _c('div', {
      staticClass: "input-group-prepend"
    }, [_c('span', {
      staticClass: "input-group-text"
    }, [_vm._v(_vm._s(_vm.prepend))])]) : _vm._e(), _vm._v(" "), _c('input', _vm._b({
      directives: [{
        name: "model",
        rawName: "v-model",
        value: _vm.clonedValue.value,
        expression: "clonedValue.value"
      }],
      staticClass: "form-control",
      class: [_vm.customClass, {
        'w-auto': _vm.prepend
      }],
      attrs: {
        "type": "number",
        "name": _vm.attrs.name || _vm.label,
        "id": _vm.attrs.id || _vm.label || _vm.property.name,
        "required": _vm.required,
        "placeholder": _vm.placeholder,
        "min": _vm.min,
        "max": _vm.max,
        "disabled": _vm.disabled
      },
      domProps: {
        "value": _vm.clonedValue.value
      },
      on: {
        "input": [function ($event) {
          if ($event.target.composing) {
            return;
          }

          _vm.$set(_vm.clonedValue, "value", $event.target.value);
        }, _vm.handler]
      }
    }, 'input', _vm.attrs, false))])]) : _vm.displayMode === 'VIEW' && _vm.clonedValue.value === undefined ? _c('p', {
      staticClass: "form-control-static"
    }, [_vm._v("-")]) : _vm.displayMode === 'VIEW' && (_vm.property.filter || _vm.filter) ? _c('p', {
      staticClass: "form-control-static"
    }, [_vm._v("\n        " + _vm._s((ref = _vm.$options.filters)[_vm.filter || _vm.property.filter].apply(ref, [_vm.clonedValue.value].concat(_vm.filterArgs || _vm.property.filterArgs))) + "\n    ")]) : _vm.displayMode === 'VIEW' ? _c('p', {
      staticClass: "form-control-static",
      domProps: {
        "textContent": _vm._s(_vm.clonedValue.value)
      }
    }) : _vm._e()]);
  };

  var __vue_staticRenderFns__$3 = [];
  /* style */

  var __vue_inject_styles__$3 = undefined;
  /* scoped */

  var __vue_scope_id__$3 = undefined;
  /* module identifier */

  var __vue_module_identifier__$3 = undefined;
  /* functional template */

  var __vue_is_functional_template__$3 = false;
  /* style inject */

  /* style inject SSR */

  /* style inject shadow dom */

  var __vue_component__$3 = normalizeComponent({
    render: __vue_render__$3,
    staticRenderFns: __vue_staticRenderFns__$3
  }, __vue_inject_styles__$3, __vue_script__$3, __vue_scope_id__$3, __vue_is_functional_template__$3, __vue_module_identifier__$3, false, undefined, undefined, undefined);

  var TO_STRING_TAG = wellKnownSymbol('toStringTag');
  var test = {};

  test[TO_STRING_TAG] = 'z';

  var toStringTagSupport = String(test) === '[object z]';

  var TO_STRING_TAG$1 = wellKnownSymbol('toStringTag');
  // ES3 wrong here
  var CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) == 'Arguments';

  // fallback for IE11 Script Access Denied error
  var tryGet = function (it, key) {
    try {
      return it[key];
    } catch (error) { /* empty */ }
  };

  // getting tag from ES6+ `Object.prototype.toString`
  var classof = toStringTagSupport ? classofRaw : function (it) {
    var O, tag, result;
    return it === undefined ? 'Undefined' : it === null ? 'Null'
      // @@toStringTag case
      : typeof (tag = tryGet(O = Object(it), TO_STRING_TAG$1)) == 'string' ? tag
      // builtinTag case
      : CORRECT_ARGUMENTS ? classofRaw(O)
      // ES3 arguments fallback
      : (result = classofRaw(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : result;
  };

  // `Object.prototype.toString` method implementation
  // https://tc39.github.io/ecma262/#sec-object.prototype.tostring
  var objectToString = toStringTagSupport ? {}.toString : function toString() {
    return '[object ' + classof(this) + ']';
  };

  // `Object.prototype.toString` method
  // https://tc39.github.io/ecma262/#sec-object.prototype.tostring
  if (!toStringTagSupport) {
    redefine(Object.prototype, 'toString', objectToString, { unsafe: true });
  }

  // `RegExp.prototype.flags` getter implementation
  // https://tc39.github.io/ecma262/#sec-get-regexp.prototype.flags
  var regexpFlags = function () {
    var that = anObject(this);
    var result = '';
    if (that.global) result += 'g';
    if (that.ignoreCase) result += 'i';
    if (that.multiline) result += 'm';
    if (that.dotAll) result += 's';
    if (that.unicode) result += 'u';
    if (that.sticky) result += 'y';
    return result;
  };

  var TO_STRING = 'toString';
  var RegExpPrototype = RegExp.prototype;
  var nativeToString = RegExpPrototype[TO_STRING];

  var NOT_GENERIC = fails(function () { return nativeToString.call({ source: 'a', flags: 'b' }) != '/a/b'; });
  // FF44- RegExp#toString has a wrong name
  var INCORRECT_NAME = nativeToString.name != TO_STRING;

  // `RegExp.prototype.toString` method
  // https://tc39.github.io/ecma262/#sec-regexp.prototype.tostring
  if (NOT_GENERIC || INCORRECT_NAME) {
    redefine(RegExp.prototype, TO_STRING, function toString() {
      var R = anObject(this);
      var p = String(R.source);
      var rf = R.flags;
      var f = String(rf === undefined && R instanceof RegExp && !('flags' in RegExpPrototype) ? regexpFlags.call(R) : rf);
      return '/' + p + '/' + f;
    }, { unsafe: true });
  }

  var $includes = arrayIncludes.includes;



  var USES_TO_LENGTH$7 = arrayMethodUsesToLength('indexOf', { ACCESSORS: true, 1: 0 });

  // `Array.prototype.includes` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.includes
  _export({ target: 'Array', proto: true, forced: !USES_TO_LENGTH$7 }, {
    includes: function includes(el /* , fromIndex = 0 */) {
      return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
    }
  });

  // https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
  addToUnscopables('includes');

  var $some = arrayIteration.some;



  var STRICT_METHOD$2 = arrayMethodIsStrict('some');
  var USES_TO_LENGTH$8 = arrayMethodUsesToLength('some');

  // `Array.prototype.some` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.some
  _export({ target: 'Array', proto: true, forced: !STRICT_METHOD$2 || !USES_TO_LENGTH$8 }, {
    some: function some(callbackfn /* , thisArg */) {
      return $some(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    }
  });

  var MATCH = wellKnownSymbol('match');

  // `IsRegExp` abstract operation
  // https://tc39.github.io/ecma262/#sec-isregexp
  var isRegexp = function (it) {
    var isRegExp;
    return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : classofRaw(it) == 'RegExp');
  };

  // babel-minify transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError,
  // so we use an intermediate function.
  function RE(s, f) {
    return RegExp(s, f);
  }

  var UNSUPPORTED_Y = fails(function () {
    // babel-minify transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError
    var re = RE('a', 'y');
    re.lastIndex = 2;
    return re.exec('abcd') != null;
  });

  var BROKEN_CARET = fails(function () {
    // https://bugzilla.mozilla.org/show_bug.cgi?id=773687
    var re = RE('^r', 'gy');
    re.lastIndex = 2;
    return re.exec('str') != null;
  });

  var regexpStickyHelpers = {
  	UNSUPPORTED_Y: UNSUPPORTED_Y,
  	BROKEN_CARET: BROKEN_CARET
  };

  var SPECIES$3 = wellKnownSymbol('species');

  var setSpecies = function (CONSTRUCTOR_NAME) {
    var Constructor = getBuiltIn(CONSTRUCTOR_NAME);
    var defineProperty = objectDefineProperty.f;

    if (descriptors && Constructor && !Constructor[SPECIES$3]) {
      defineProperty(Constructor, SPECIES$3, {
        configurable: true,
        get: function () { return this; }
      });
    }
  };

  var defineProperty$3 = objectDefineProperty.f;
  var getOwnPropertyNames$1 = objectGetOwnPropertyNames.f;





  var setInternalState = internalState.set;



  var MATCH$1 = wellKnownSymbol('match');
  var NativeRegExp = global_1.RegExp;
  var RegExpPrototype$1 = NativeRegExp.prototype;
  var re1 = /a/g;
  var re2 = /a/g;

  // "new" should create a new object, old webkit bug
  var CORRECT_NEW = new NativeRegExp(re1) !== re1;

  var UNSUPPORTED_Y$1 = regexpStickyHelpers.UNSUPPORTED_Y;

  var FORCED$1 = descriptors && isForced_1('RegExp', (!CORRECT_NEW || UNSUPPORTED_Y$1 || fails(function () {
    re2[MATCH$1] = false;
    // RegExp constructor can alter flags and IsRegExp works correct with @@match
    return NativeRegExp(re1) != re1 || NativeRegExp(re2) == re2 || NativeRegExp(re1, 'i') != '/a/i';
  })));

  // `RegExp` constructor
  // https://tc39.github.io/ecma262/#sec-regexp-constructor
  if (FORCED$1) {
    var RegExpWrapper = function RegExp(pattern, flags) {
      var thisIsRegExp = this instanceof RegExpWrapper;
      var patternIsRegExp = isRegexp(pattern);
      var flagsAreUndefined = flags === undefined;
      var sticky;

      if (!thisIsRegExp && patternIsRegExp && pattern.constructor === RegExpWrapper && flagsAreUndefined) {
        return pattern;
      }

      if (CORRECT_NEW) {
        if (patternIsRegExp && !flagsAreUndefined) pattern = pattern.source;
      } else if (pattern instanceof RegExpWrapper) {
        if (flagsAreUndefined) flags = regexpFlags.call(pattern);
        pattern = pattern.source;
      }

      if (UNSUPPORTED_Y$1) {
        sticky = !!flags && flags.indexOf('y') > -1;
        if (sticky) flags = flags.replace(/y/g, '');
      }

      var result = inheritIfRequired(
        CORRECT_NEW ? new NativeRegExp(pattern, flags) : NativeRegExp(pattern, flags),
        thisIsRegExp ? this : RegExpPrototype$1,
        RegExpWrapper
      );

      if (UNSUPPORTED_Y$1 && sticky) setInternalState(result, { sticky: sticky });

      return result;
    };
    var proxy = function (key) {
      key in RegExpWrapper || defineProperty$3(RegExpWrapper, key, {
        configurable: true,
        get: function () { return NativeRegExp[key]; },
        set: function (it) { NativeRegExp[key] = it; }
      });
    };
    var keys$3 = getOwnPropertyNames$1(NativeRegExp);
    var index = 0;
    while (keys$3.length > index) proxy(keys$3[index++]);
    RegExpPrototype$1.constructor = RegExpWrapper;
    RegExpWrapper.prototype = RegExpPrototype$1;
    redefine(global_1, 'RegExp', RegExpWrapper);
  }

  // https://tc39.github.io/ecma262/#sec-get-regexp-@@species
  setSpecies('RegExp');

  var nativeExec = RegExp.prototype.exec;
  // This always refers to the native implementation, because the
  // String#replace polyfill uses ./fix-regexp-well-known-symbol-logic.js,
  // which loads this file before patching the method.
  var nativeReplace = String.prototype.replace;

  var patchedExec = nativeExec;

  var UPDATES_LAST_INDEX_WRONG = (function () {
    var re1 = /a/;
    var re2 = /b*/g;
    nativeExec.call(re1, 'a');
    nativeExec.call(re2, 'a');
    return re1.lastIndex !== 0 || re2.lastIndex !== 0;
  })();

  var UNSUPPORTED_Y$2 = regexpStickyHelpers.UNSUPPORTED_Y || regexpStickyHelpers.BROKEN_CARET;

  // nonparticipating capturing group, copied from es5-shim's String#split patch.
  var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

  var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED || UNSUPPORTED_Y$2;

  if (PATCH) {
    patchedExec = function exec(str) {
      var re = this;
      var lastIndex, reCopy, match, i;
      var sticky = UNSUPPORTED_Y$2 && re.sticky;
      var flags = regexpFlags.call(re);
      var source = re.source;
      var charsAdded = 0;
      var strCopy = str;

      if (sticky) {
        flags = flags.replace('y', '');
        if (flags.indexOf('g') === -1) {
          flags += 'g';
        }

        strCopy = String(str).slice(re.lastIndex);
        // Support anchored sticky behavior.
        if (re.lastIndex > 0 && (!re.multiline || re.multiline && str[re.lastIndex - 1] !== '\n')) {
          source = '(?: ' + source + ')';
          strCopy = ' ' + strCopy;
          charsAdded++;
        }
        // ^(? + rx + ) is needed, in combination with some str slicing, to
        // simulate the 'y' flag.
        reCopy = new RegExp('^(?:' + source + ')', flags);
      }

      if (NPCG_INCLUDED) {
        reCopy = new RegExp('^' + source + '$(?!\\s)', flags);
      }
      if (UPDATES_LAST_INDEX_WRONG) lastIndex = re.lastIndex;

      match = nativeExec.call(sticky ? reCopy : re, strCopy);

      if (sticky) {
        if (match) {
          match.input = match.input.slice(charsAdded);
          match[0] = match[0].slice(charsAdded);
          match.index = re.lastIndex;
          re.lastIndex += match[0].length;
        } else re.lastIndex = 0;
      } else if (UPDATES_LAST_INDEX_WRONG && match) {
        re.lastIndex = re.global ? match.index + match[0].length : lastIndex;
      }
      if (NPCG_INCLUDED && match && match.length > 1) {
        // Fix browsers whose `exec` methods don't consistently return `undefined`
        // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
        nativeReplace.call(match[0], reCopy, function () {
          for (i = 1; i < arguments.length - 2; i++) {
            if (arguments[i] === undefined) match[i] = undefined;
          }
        });
      }

      return match;
    };
  }

  var regexpExec = patchedExec;

  _export({ target: 'RegExp', proto: true, forced: /./.exec !== regexpExec }, {
    exec: regexpExec
  });

  var notARegexp = function (it) {
    if (isRegexp(it)) {
      throw TypeError("The method doesn't accept regular expressions");
    } return it;
  };

  var MATCH$2 = wellKnownSymbol('match');

  var correctIsRegexpLogic = function (METHOD_NAME) {
    var regexp = /./;
    try {
      '/./'[METHOD_NAME](regexp);
    } catch (e) {
      try {
        regexp[MATCH$2] = false;
        return '/./'[METHOD_NAME](regexp);
      } catch (f) { /* empty */ }
    } return false;
  };

  // `String.prototype.includes` method
  // https://tc39.github.io/ecma262/#sec-string.prototype.includes
  _export({ target: 'String', proto: true, forced: !correctIsRegexpLogic('includes') }, {
    includes: function includes(searchString /* , position = 0 */) {
      return !!~String(requireObjectCoercible(this))
        .indexOf(notARegexp(searchString), arguments.length > 1 ? arguments[1] : undefined);
    }
  });

  var getOwnPropertyDescriptor$3 = objectGetOwnPropertyDescriptor.f;






  var nativeStartsWith = ''.startsWith;
  var min$4 = Math.min;

  var CORRECT_IS_REGEXP_LOGIC = correctIsRegexpLogic('startsWith');
  // https://github.com/zloirock/core-js/pull/702
  var MDN_POLYFILL_BUG =  !CORRECT_IS_REGEXP_LOGIC && !!function () {
    var descriptor = getOwnPropertyDescriptor$3(String.prototype, 'startsWith');
    return descriptor && !descriptor.writable;
  }();

  // `String.prototype.startsWith` method
  // https://tc39.github.io/ecma262/#sec-string.prototype.startswith
  _export({ target: 'String', proto: true, forced: !MDN_POLYFILL_BUG && !CORRECT_IS_REGEXP_LOGIC }, {
    startsWith: function startsWith(searchString /* , position = 0 */) {
      var that = String(requireObjectCoercible(this));
      notARegexp(searchString);
      var index = toLength(min$4(arguments.length > 1 ? arguments[1] : undefined, that.length));
      var search = String(searchString);
      return nativeStartsWith
        ? nativeStartsWith.call(that, search, index)
        : that.slice(index, index + search.length) === search;
    }
  });

  var non = '\u200B\u0085\u180E';

  // check that a method works with the correct list
  // of whitespaces and has a correct name
  var stringTrimForced = function (METHOD_NAME) {
    return fails(function () {
      return !!whitespaces[METHOD_NAME]() || non[METHOD_NAME]() != non || whitespaces[METHOD_NAME].name !== METHOD_NAME;
    });
  };

  var $trim = stringTrim.trim;


  // `String.prototype.trim` method
  // https://tc39.github.io/ecma262/#sec-string.prototype.trim
  _export({ target: 'String', proto: true, forced: stringTrimForced('trim') }, {
    trim: function trim() {
      return $trim(this);
    }
  });

  // `URL.prototype.toJSON` method
  // https://url.spec.whatwg.org/#dom-url-tojson
  _export({ target: 'URL', proto: true, enumerable: true }, {
    toJSON: function toJSON() {
      return URL.prototype.toString.call(this);
    }
  });

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }

  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }

  var lib = createCommonjsModule(function (module, exports) {
  (function(){var h,aa=this;function l(a){return "string"==typeof a}function m(a,b){a=a.split(".");var c=aa;a[0]in c||!c.execScript||c.execScript("var "+a[0]);for(var d;a.length&&(d=a.shift());)a.length||void 0===b?c[d]&&c[d]!==Object.prototype[d]?c=c[d]:c=c[d]={}:c[d]=b;}
  function n(a,b){function c(){}c.prototype=b.prototype;a.ya=b.prototype;a.prototype=new c;a.prototype.constructor=a;a.Ea=function(a,c,f){for(var d=Array(arguments.length-2),e=2;e<arguments.length;e++)d[e-2]=arguments[e];return b.prototype[c].apply(a,d)};}function q(a,b){null!=a&&this.a.apply(this,arguments);}q.prototype.b="";q.prototype.set=function(a){this.b=""+a;};q.prototype.a=function(a,b,c){this.b+=String(a);if(null!=b)for(var d=1;d<arguments.length;d++)this.b+=arguments[d];return this};function r(a){a.b="";}q.prototype.toString=function(){return this.b};var t=Array.prototype.indexOf?function(a,b,c){return Array.prototype.indexOf.call(a,b,c)}:function(a,b,c){c=null==c?0:0>c?Math.max(0,a.length+c):c;if(l(a))return l(b)&&1==b.length?a.indexOf(b,c):-1;for(;c<a.length;c++)if(c in a&&a[c]===b)return c;return -1},ba=Array.prototype.filter?function(a,b,c){return Array.prototype.filter.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=[],f=0,g=l(a)?a.split(""):a,k=0;k<d;k++)if(k in g){var p=g[k];b.call(c,p,k,a)&&(e[f++]=p);}return e},ca=Array.prototype.map?
  function(a,b,c){return Array.prototype.map.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=Array(d),f=l(a)?a.split(""):a,g=0;g<d;g++)g in f&&(e[g]=b.call(c,f[g],g,a));return e};function da(a){return Array.prototype.concat.apply([],arguments)}function ea(a,b){a.sort(b||fa);}function fa(a,b){return a>b?1:a<b?-1:0}function ha(a){var b=[],c=0,d;for(d in a)b[c++]=a[d];return b}function ia(a,b){this.b=a;this.a={};for(a=0;a<b.length;a++){var c=b[a];this.a[c.a]=c;}}function ja(a){a=ha(a.a);ea(a,function(a,c){return a.a-c.a});return a}function ka(a,b){this.a=a;this.g=!!b.w;this.b=b.c;this.j=b.type;this.i=!1;switch(this.b){case la:case ma:case na:case oa:case pa:case qa:case ra:this.i=!0;}this.f=b.defaultValue;}var ra=1,qa=2,la=3,ma=4,na=6,oa=16,pa=18;function u(){this.b={};this.f=this.h().a;this.a=this.g=null;}h=u.prototype;h.has=function(a){return v(this,a.a)};h.get=function(a,b){return w(this,a.a,b)};h.set=function(a,b){x(this,a.a,b);};h.add=function(a,b){sa(this,a.a,b);};function ta(a,b){for(var c=ja(a.h()),d=0;d<c.length;d++){var e=c[d],f=e.a;if(v(b,f)){a.a&&delete a.a[e.a];var g=11==e.b||10==e.b;if(e.g){e=y(b,f);for(var k=0;k<e.length;k++)sa(a,f,g?e[k].clone():e[k]);}else e=z(b,f),g?(g=z(a,f))?ta(g,e):x(a,f,e.clone()):x(a,f,e);}}}
  h.clone=function(){var a=new this.constructor;a!=this&&(a.b={},a.a&&(a.a={}),ta(a,this));return a};function v(a,b){return null!=a.b[b]}function z(a,b){var c=a.b[b];if(null==c)return null;if(a.g){if(!(b in a.a)){var d=a.g,e=a.f[b];if(null!=c)if(e.g){for(var f=[],g=0;g<c.length;g++)f[g]=d.b(e,c[g]);c=f;}else c=d.b(e,c);return a.a[b]=c}return a.a[b]}return c}function w(a,b,c){var d=z(a,b);return a.f[b].g?d[c||0]:d}
  function A(a,b){if(v(a,b))a=w(a,b,void 0);else a:{a=a.f[b];if(void 0===a.f)if(b=a.j,b===Boolean)a.f=!1;else if(b===Number)a.f=0;else if(b===String)a.f=a.i?"0":"";else {a=new b;break a}a=a.f;}return a}function y(a,b){return z(a,b)||[]}function B(a,b){return a.f[b].g?v(a,b)?a.b[b].length:0:v(a,b)?1:0}function x(a,b,c){a.b[b]=c;a.a&&(a.a[b]=c);}function sa(a,b,c){a.b[b]||(a.b[b]=[]);a.b[b].push(c);a.a&&delete a.a[b];}function C(a,b){var c=[],d;for(d in b)0!=d&&c.push(new ka(d,b[d]));return new ia(a,c)}function D(){u.call(this);}n(D,u);var ua=null;function E(){u.call(this);}n(E,u);var va=null;function F(){u.call(this);}n(F,u);var wa=null;
  D.prototype.h=function(){var a=ua;a||(ua=a=C(D,{0:{name:"NumberFormat",ga:"i18n.phonenumbers.NumberFormat"},1:{name:"pattern",required:!0,c:9,type:String},2:{name:"format",required:!0,c:9,type:String},3:{name:"leading_digits_pattern",w:!0,c:9,type:String},4:{name:"national_prefix_formatting_rule",c:9,type:String},6:{name:"national_prefix_optional_when_formatting",c:8,defaultValue:!1,type:Boolean},5:{name:"domestic_carrier_code_formatting_rule",c:9,type:String}}));return a};D.h=D.prototype.h;
  E.prototype.h=function(){var a=va;a||(va=a=C(E,{0:{name:"PhoneNumberDesc",ga:"i18n.phonenumbers.PhoneNumberDesc"},2:{name:"national_number_pattern",c:9,type:String},9:{name:"possible_length",w:!0,c:5,type:Number},10:{name:"possible_length_local_only",w:!0,c:5,type:Number},6:{name:"example_number",c:9,type:String}}));return a};E.h=E.prototype.h;
  F.prototype.h=function(){var a=wa;a||(wa=a=C(F,{0:{name:"PhoneMetadata",ga:"i18n.phonenumbers.PhoneMetadata"},1:{name:"general_desc",c:11,type:E},2:{name:"fixed_line",c:11,type:E},3:{name:"mobile",c:11,type:E},4:{name:"toll_free",c:11,type:E},5:{name:"premium_rate",c:11,type:E},6:{name:"shared_cost",c:11,type:E},7:{name:"personal_number",c:11,type:E},8:{name:"voip",c:11,type:E},21:{name:"pager",c:11,type:E},25:{name:"uan",c:11,type:E},27:{name:"emergency",c:11,type:E},28:{name:"voicemail",c:11,type:E},
  29:{name:"short_code",c:11,type:E},30:{name:"standard_rate",c:11,type:E},31:{name:"carrier_specific",c:11,type:E},33:{name:"sms_services",c:11,type:E},24:{name:"no_international_dialling",c:11,type:E},9:{name:"id",required:!0,c:9,type:String},10:{name:"country_code",c:5,type:Number},11:{name:"international_prefix",c:9,type:String},17:{name:"preferred_international_prefix",c:9,type:String},12:{name:"national_prefix",c:9,type:String},13:{name:"preferred_extn_prefix",c:9,type:String},15:{name:"national_prefix_for_parsing",
  c:9,type:String},16:{name:"national_prefix_transform_rule",c:9,type:String},18:{name:"same_mobile_and_fixed_line_pattern",c:8,defaultValue:!1,type:Boolean},19:{name:"number_format",w:!0,c:11,type:D},20:{name:"intl_number_format",w:!0,c:11,type:D},22:{name:"main_country_for_code",c:8,defaultValue:!1,type:Boolean},23:{name:"leading_digits",c:9,type:String},26:{name:"leading_zero_possible",c:8,defaultValue:!1,type:Boolean}}));return a};F.h=F.prototype.h;function G(){}G.prototype.a=function(a){new a.b;throw Error("Unimplemented");};G.prototype.b=function(a,b){if(11==a.b||10==a.b)return b instanceof u?b:this.a(a.j.prototype.h(),b);if(14==a.b)return l(b)&&xa.test(b)&&(a=Number(b),0<a)?a:b;if(!a.i)return b;a=a.j;if(a===String){if("number"==typeof b)return String(b)}else if(a===Number&&l(b)&&("Infinity"===b||"-Infinity"===b||"NaN"===b||xa.test(b)))return Number(b);return b};var xa=/^-?[0-9]+$/;function ya(){}n(ya,G);ya.prototype.a=function(a,b){a=new a.b;a.g=this;a.b=b;a.a={};return a};function H(){}n(H,ya);H.prototype.b=function(a,b){return 8==a.b?!!b:G.prototype.b.apply(this,arguments)};H.prototype.a=function(a,b){return H.ya.a.call(this,a,b)};function I(){u.call(this);}n(I,u);var za=null,Aa={Da:0,Ca:1,Ba:5,Aa:10,za:20};
  I.prototype.h=function(){var a=za;a||(za=a=C(I,{0:{name:"PhoneNumber",ga:"i18n.phonenumbers.PhoneNumber"},1:{name:"country_code",required:!0,c:5,type:Number},2:{name:"national_number",required:!0,c:4,type:Number},3:{name:"extension",c:9,type:String},4:{name:"italian_leading_zero",c:8,type:Boolean},8:{name:"number_of_leading_zeros",c:5,defaultValue:1,type:Number},5:{name:"raw_input",c:9,type:String},6:{name:"country_code_source",c:14,defaultValue:0,type:Aa},7:{name:"preferred_domestic_carrier_code",
  c:9,type:String}}));return a};I.ctor=I;I.ctor.h=I.prototype.h;/*

   Copyright (C) 2010 The Libphonenumber Authors

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
  */
  var J={1:"US AG AI AS BB BM BS CA DM DO GD GU JM KN KY LC MP MS PR SX TC TT VC VG VI".split(" "),7:["RU","KZ"],20:["EG"],27:["ZA"],30:["GR"],31:["NL"],32:["BE"],33:["FR"],34:["ES"],36:["HU"],39:["IT","VA"],40:["RO"],41:["CH"],43:["AT"],44:["GB","GG","IM","JE"],45:["DK"],46:["SE"],47:["NO","SJ"],48:["PL"],49:["DE"],51:["PE"],52:["MX"],53:["CU"],54:["AR"],55:["BR"],56:["CL"],57:["CO"],58:["VE"],60:["MY"],61:["AU","CC","CX"],62:["ID"],63:["PH"],64:["NZ"],65:["SG"],66:["TH"],81:["JP"],82:["KR"],84:["VN"],
  86:["CN"],90:["TR"],91:["IN"],92:["PK"],93:["AF"],94:["LK"],95:["MM"],98:["IR"],211:["SS"],212:["MA","EH"],213:["DZ"],216:["TN"],218:["LY"],220:["GM"],221:["SN"],222:["MR"],223:["ML"],224:["GN"],225:["CI"],226:["BF"],227:["NE"],228:["TG"],229:["BJ"],230:["MU"],231:["LR"],232:["SL"],233:["GH"],234:["NG"],235:["TD"],236:["CF"],237:["CM"],238:["CV"],239:["ST"],240:["GQ"],241:["GA"],242:["CG"],243:["CD"],244:["AO"],245:["GW"],246:["IO"],247:["AC"],248:["SC"],249:["SD"],250:["RW"],251:["ET"],252:["SO"],
  253:["DJ"],254:["KE"],255:["TZ"],256:["UG"],257:["BI"],258:["MZ"],260:["ZM"],261:["MG"],262:["RE","YT"],263:["ZW"],264:["NA"],265:["MW"],266:["LS"],267:["BW"],268:["SZ"],269:["KM"],290:["SH","TA"],291:["ER"],297:["AW"],298:["FO"],299:["GL"],350:["GI"],351:["PT"],352:["LU"],353:["IE"],354:["IS"],355:["AL"],356:["MT"],357:["CY"],358:["FI","AX"],359:["BG"],370:["LT"],371:["LV"],372:["EE"],373:["MD"],374:["AM"],375:["BY"],376:["AD"],377:["MC"],378:["SM"],380:["UA"],381:["RS"],382:["ME"],383:["XK"],385:["HR"],
  386:["SI"],387:["BA"],389:["MK"],420:["CZ"],421:["SK"],423:["LI"],500:["FK"],501:["BZ"],502:["GT"],503:["SV"],504:["HN"],505:["NI"],506:["CR"],507:["PA"],508:["PM"],509:["HT"],590:["GP","BL","MF"],591:["BO"],592:["GY"],593:["EC"],594:["GF"],595:["PY"],596:["MQ"],597:["SR"],598:["UY"],599:["CW","BQ"],670:["TL"],672:["NF"],673:["BN"],674:["NR"],675:["PG"],676:["TO"],677:["SB"],678:["VU"],679:["FJ"],680:["PW"],681:["WF"],682:["CK"],683:["NU"],685:["WS"],686:["KI"],687:["NC"],688:["TV"],689:["PF"],690:["TK"],
  691:["FM"],692:["MH"],800:["001"],808:["001"],850:["KP"],852:["HK"],853:["MO"],855:["KH"],856:["LA"],870:["001"],878:["001"],880:["BD"],881:["001"],882:["001"],883:["001"],886:["TW"],888:["001"],960:["MV"],961:["LB"],962:["JO"],963:["SY"],964:["IQ"],965:["KW"],966:["SA"],967:["YE"],968:["OM"],970:["PS"],971:["AE"],972:["IL"],973:["BH"],974:["QA"],975:["BT"],976:["MN"],977:["NP"],979:["001"],992:["TJ"],993:["TM"],994:["AZ"],995:["GE"],996:["KG"],998:["UZ"]},K={AC:[,[,,"(?:[01589]\\d|[46])\\d{4}",,
  ,,,,,[5,6]],[,,"6[2-467]\\d{3}",,,,"62889",,,[5]],[,,"4\\d{4}",,,,"40123",,,[5]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"AC",247,"00",,,,,,,,,,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"(?:0[1-9]|[1589]\\d)\\d{4}",,,,"542011",,,[6]],,,[,,,,,,,,,[-1]]],AD:[,[,,"(?:1|6\\d)\\d{7}|[135-9]\\d{5}",,,,,,,[6,8,9]],[,,"[78]\\d{5}",,,,"712345",,,[6]],[,,"690\\d{6}|[356]\\d{5}",,,,"312345",,,[6,9]],[,,"180[02]\\d{4}",,,,"18001234",,,[8]],[,,"[19]\\d{5}",,,,"912345",,,[6]],
  [,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"AD",376,"00",,,,,,,,[[,"(\\d{3})(\\d{3})","$1 $2",["[135-9]"]],[,"(\\d{4})(\\d{4})","$1 $2",["1"]],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["6"]]],,[,,,,,,,,,[-1]],,,[,,"1800\\d{4}",,,,,,,[8]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],AE:[,[,,"(?:[4-7]\\d|9[0-689])\\d{7}|800\\d{2,9}|[2-4679]\\d{7}",,,,,,,[5,6,7,8,9,10,11,12]],[,,"[2-4679][2-8]\\d{6}",,,,"22345678",,,[8],[7]],[,,"5[024-68]\\d{7}",,,,"501234567",,,[9]],[,,"400\\d{6}|800\\d{2,9}",,,,"800123456"],
  [,,"900[02]\\d{5}",,,,"900234567",,,[9]],[,,"700[05]\\d{5}",,,,"700012345",,,[9]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"AE",971,"00","0",,,"0",,,,[[,"(\\d{3})(\\d{2,9})","$1 $2",["60|8"]],[,"(\\d)(\\d{3})(\\d{4})","$1 $2 $3",["[236]|[479][2-8]"],"0$1"],[,"(\\d{3})(\\d)(\\d{5})","$1 $2 $3",["[479]"]],[,"(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["5"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"600[25]\\d{5}",,,,"600212345",,,[9]],,,[,,,,,,,,,[-1]]],AF:[,[,,"[2-7]\\d{8}",,,,,,,[9],[7]],[,,"(?:[25][0-8]|[34][0-4]|6[0-5])[2-9]\\d{6}",
  ,,,"234567890",,,,[7]],[,,"7\\d{8}",,,,"701234567",,,,[7]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"AF",93,"00","0",,,"0",,,,[[,"(\\d{3})(\\d{4})","$1 $2",["[1-9]"]],[,"(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["[2-7]"],"0$1"]],[[,"(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["[2-7]"],"0$1"]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],AG:[,[,,"(?:268|[58]\\d\\d|900)\\d{7}",,,,,,,[10],[7]],[,,"268(?:4(?:6[0-38]|84)|56[0-2])\\d{4}",,,,"2684601234",
  ,,,[7]],[,,"268(?:464|7(?:1[3-9]|[28]\\d|3[0246]|64|7[0-689]))\\d{4}",,,,"2684641234",,,,[7]],[,,"8(?:00|33|44|55|66|77|88)[2-9]\\d{6}",,,,"8002123456"],[,,"900[2-9]\\d{6}",,,,"9002123456"],[,,,,,,,,,[-1]],[,,"52(?:35(?:[02-46-9]\\d|1[02-9]|5[0-46-9])|45(?:[034]\\d|1[02-9]|2[024-9]|5[0-46-9]))\\d{4}|52(?:3[2-46-9]|4[2-4])(?:[02-9]\\d|1[02-9])\\d{4}|5(?:00|2[12]|33|44|66|77|88)[2-9]\\d{6}",,,,"5002345678"],[,,"26848[01]\\d{4}",,,,"2684801234",,,,[7]],"AG",1,"011","1",,,"1|([457]\\d{6})$","268$1",,
  ,,,[,,"26840[69]\\d{4}",,,,"2684061234",,,,[7]],,"268",[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],AI:[,[,,"(?:264|[58]\\d\\d|900)\\d{7}",,,,,,,[10],[7]],[,,"264(?:292|4(?:6[12]|9[78]))\\d{4}",,,,"2644612345",,,,[7]],[,,"264(?:235|4(?:69|76)|5(?:3[6-9]|8[1-4])|7(?:29|72))\\d{4}",,,,"2642351234",,,,[7]],[,,"8(?:00|33|44|55|66|77|88)[2-9]\\d{6}",,,,"8002123456"],[,,"900[2-9]\\d{6}",,,,"9002123456"],[,,,,,,,,,[-1]],[,,"52(?:35(?:[02-46-9]\\d|1[02-9]|5[0-46-9])|45(?:[034]\\d|1[02-9]|2[024-9]|5[0-46-9]))\\d{4}|52(?:3[2-46-9]|4[2-4])(?:[02-9]\\d|1[02-9])\\d{4}|5(?:00|2[12]|33|44|66|77|88)[2-9]\\d{6}",
  ,,,"5002345678"],[,,,,,,,,,[-1]],"AI",1,"011","1",,,"1|([2457]\\d{6})$","264$1",,,,,[,,"264724\\d{4}",,,,"2647241234",,,,[7]],,"264",[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],AL:[,[,,"(?:700\\d\\d|900)\\d{3}|8\\d{5,7}|(?:[2-5]|6\\d)\\d{7}",,,,,,,[6,7,8,9],[5]],[,,"(?:[2358][16-9]\\d[2-9]|4410)\\d{4}|(?:[2358][2-5][2-9]|4(?:[2-57-9][2-9]|6\\d))\\d{5}",,,,"22345678",,,[8],[5,6,7]],[,,"6(?:[78][2-9]|9\\d)\\d{6}",,,,"672123456",,,[9]],[,,"800\\d{4}",,,,"8001234",,,[7]],[,,"900[1-9]\\d\\d",,,
  ,"900123",,,[6]],[,,"808[1-9]\\d\\d",,,,"808123",,,[6]],[,,"700[2-9]\\d{4}",,,,"70021234",,,[8]],[,,,,,,,,,[-1]],"AL",355,"00","0",,,"0",,,,[[,"(\\d{3})(\\d{3,4})","$1 $2",["80|9"],"0$1"],[,"(\\d)(\\d{3})(\\d{4})","$1 $2 $3",["4[2-6]"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["[2358][2-5]|4"],"0$1"],[,"(\\d{3})(\\d{5})","$1 $2",["[23578]"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["6"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],AM:[,[,,"(?:[1-489]\\d|55|60|77)\\d{6}",
  ,,,,,,[8],[5,6]],[,,"(?:(?:1[0-25]|47)\\d|2(?:2[2-46]|3[1-8]|4[2-69]|5[2-7]|6[1-9]|8[1-7])|3[12]2)\\d{5}",,,,"10123456",,,,[5,6]],[,,"(?:33|4[1349]|55|77|88|9[13-9])\\d{6}",,,,"77123456"],[,,"800\\d{5}",,,,"80012345"],[,,"90[016]\\d{5}",,,,"90012345"],[,,"80[1-4]\\d{5}",,,,"80112345"],[,,,,,,,,,[-1]],[,,"60(?:2[78]|3[5-9]|4[02-9]|5[0-46-9]|[6-8]\\d|90)\\d{4}",,,,"60271234"],"AM",374,"00","0",,,"0",,,,[[,"(\\d{3})(\\d{2})(\\d{3})","$1 $2 $3",["[89]0"],"0 $1"],[,"(\\d{3})(\\d{5})","$1 $2",["2|3[12]"],
  "(0$1)"],[,"(\\d{2})(\\d{6})","$1 $2",["1|47"],"(0$1)"],[,"(\\d{2})(\\d{6})","$1 $2",["[3-9]"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],AO:[,[,,"[29]\\d{8}",,,,,,,[9]],[,,"2\\d(?:[0134][25-9]|[25-9]\\d)\\d{5}",,,,"222123456"],[,,"9[1-49]\\d{7}",,,,"923123456"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"AO",244,"00",,,,,,,,[[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[29]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],
  ,,[,,,,,,,,,[-1]]],AR:[,[,,"11\\d{8}|(?:[2368]|9\\d)\\d{9}",,,,,,,[10,11],[6,7,8]],[,,"3888[013-9]\\d{5}|(?:29(?:54|66)|3(?:777|865))[2-8]\\d{5}|3(?:7(?:1[15]|81)|8(?:21|4[16]|69|9[12]))[46]\\d{5}|(?:2(?:2(?:2[59]|44|52)|3(?:26|44)|473|9(?:[07]2|2[26]|34|46))|3327)[45]\\d{5}|(?:2(?:284|302|657|920)|3(?:4(?:8[27]|92)|541|755|878))[2-7]\\d{5}|(?:2(?:(?:26|62)2|32[03]|477|9(?:42|83))|3(?:329|4(?:[47]6|62|89)|564))[2-6]\\d{5}|(?:(?:11[1-8]|670)\\d|2(?:2(?:0[45]|1[2-6]|3[3-6])|3(?:[06]4|7[45])|494|6(?:04|1[2-7]|[36][45]|4[3-6])|80[45]|9(?:[17][4-6]|[48][45]|9[3-6]))|3(?:364|4(?:1[2-7]|[235][4-6]|84)|5(?:1[2-8]|[38][4-6])|6(?:2[45]|44)|7[069][45]|8(?:[03][45]|[17][2-6]|[58][3-6])))\\d{6}|2(?:2(?:21|4[23]|6[145]|7[1-4]|8[356]|9[267])|3(?:16|3[13-8]|43|5[346-8]|9[3-5])|475|6(?:2[46]|4[78]|5[1568])|9(?:03|2[1457-9]|3[1356]|4[08]|[56][23]|82))4\\d{5}|(?:2(?:2(?:57|81)|3(?:24|46|92)|9(?:01|23|64))|3(?:4(?:42|71)|5(?:25|37|4[347]|71)|7(?:18|5[17])))[3-6]\\d{5}|(?:2(?:2(?:02|2[3467]|4[156]|5[45]|6[6-8]|91)|3(?:1[47]|25|[45][25]|96)|47[48]|625|932)|3(?:38[2578]|4(?:0[0-24-9]|3[78]|4[457]|58|6[03-9]|72|83|9[136-8])|5(?:2[124]|[368][23]|4[2689]|7[2-6])|7(?:16|2[15]|3[145]|4[13]|5[468]|7[2-5]|8[26])|8(?:2[5-7]|3[278]|4[3-5]|5[78]|6[1-378]|[78]7|94)))[4-6]\\d{5}",
  ,,,"1123456789",,,[10],[6,7,8]],[,,"93888[013-9]\\d{5}|9(?:29(?:54|66)|3(?:777|865))[2-8]\\d{5}|93(?:7(?:1[15]|81)|8(?:21|4[16]|69|9[12]))[46]\\d{5}|9(?:2(?:2(?:2[59]|44|52)|3(?:26|44)|473|9(?:[07]2|2[26]|34|46))|3327)[45]\\d{5}|9(?:2(?:284|302|657|920)|3(?:4(?:8[27]|92)|541|755|878))[2-7]\\d{5}|9(?:2(?:(?:26|62)2|32[03]|477|9(?:42|83))|3(?:329|4(?:[47]6|62|89)|564))[2-6]\\d{5}|(?:675\\d|9(?:11[1-8]\\d|2(?:2(?:0[45]|1[2-6]|3[3-6])|3(?:[06]4|7[45])|494|6(?:04|1[2-7]|[36][45]|4[3-6])|80[45]|9(?:[17][4-6]|[48][45]|9[3-6]))|3(?:364|4(?:1[2-7]|[235][4-6]|84)|5(?:1[2-8]|[38][4-6])|6(?:2[45]|44)|7[069][45]|8(?:[03][45]|[17][2-6]|[58][3-6]))))\\d{6}|92(?:2(?:21|4[23]|6[145]|7[1-4]|8[356]|9[267])|3(?:16|3[13-8]|43|5[346-8]|9[3-5])|475|6(?:2[46]|4[78]|5[1568])|9(?:03|2[1457-9]|3[1356]|4[08]|[56][23]|82))4\\d{5}|9(?:2(?:2(?:57|81)|3(?:24|46|92)|9(?:01|23|64))|3(?:4(?:42|71)|5(?:25|37|4[347]|71)|7(?:18|5[17])))[3-6]\\d{5}|9(?:2(?:2(?:02|2[3467]|4[156]|5[45]|6[6-8]|91)|3(?:1[47]|25|[45][25]|96)|47[48]|625|932)|3(?:38[2578]|4(?:0[0-24-9]|3[78]|4[457]|58|6[03-9]|72|83|9[136-8])|5(?:2[124]|[368][23]|4[2689]|7[2-6])|7(?:16|2[15]|3[145]|4[13]|5[468]|7[2-5]|8[26])|8(?:2[5-7]|3[278]|4[3-5]|5[78]|6[1-378]|[78]7|94)))[4-6]\\d{5}",
  ,,,"91123456789",,,,[6,7,8]],[,,"800\\d{7}",,,,"8001234567",,,[10]],[,,"60[04579]\\d{7}",,,,"6001234567",,,[10]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"AR",54,"00","0",,,"0?(?:(11|2(?:2(?:02?|[13]|2[13-79]|4[1-6]|5[2457]|6[124-8]|7[1-4]|8[13-6]|9[1267])|3(?:02?|1[467]|2[03-6]|3[13-8]|[49][2-6]|5[2-8]|[67])|4(?:7[3-578]|9)|6(?:[0136]|2[24-6]|4[6-8]?|5[15-8])|80|9(?:0[1-3]|[19]|2\\d|3[1-6]|4[02568]?|5[2-4]|6[2-46]|72?|8[23]?))|3(?:3(?:2[79]|6|8[2578])|4(?:0[0-24-9]|[12]|3[5-8]?|4[24-7]|5[4-68]?|6[02-9]|7[126]|8[2379]?|9[1-36-8])|5(?:1|2[1245]|3[237]?|4[1-46-9]|6[2-4]|7[1-6]|8[2-5]?)|6[24]|7(?:[069]|1[1568]|2[15]|3[145]|4[13]|5[14-8]|7[2-57]|8[126])|8(?:[01]|2[15-7]|3[2578]?|4[13-6]|5[4-8]?|6[1-357-9]|7[36-8]?|8[5-8]?|9[124])))15)?",
  "9$1",,,[[,"(\\d{3})","$1",["0|1(?:0[0-35-7]|1[02-5]|2[015]|34|4[78])|911"]],[,"(\\d{2})(\\d{4})","$1-$2",["[1-9]"]],[,"(\\d{3})(\\d{4})","$1-$2",["[2-8]"]],[,"(\\d{4})(\\d{4})","$1-$2",["[1-8]"]],[,"(\\d{4})(\\d{2})(\\d{4})","$1 $2-$3",["2(?:2[024-9]|3[0-59]|47|6[245]|9[02-8])|3(?:3[28]|4[03-9]|5[2-46-8]|7[1-578]|8[2-9])","2(?:[23]02|6(?:[25]|4[6-8])|9(?:[02356]|4[02568]|72|8[23]))|3(?:3[28]|4(?:[04679]|3[5-8]|5[4-68]|8[2379])|5(?:[2467]|3[237]|8[2-5])|7[1-578]|8(?:[2469]|3[2578]|5[4-8]|7[36-8]|8[5-8]))|2(?:2[24-9]|3[1-59]|47)",
  "2(?:[23]02|6(?:[25]|4(?:64|[78]))|9(?:[02356]|4(?:[0268]|5[2-6])|72|8[23]))|3(?:3[28]|4(?:[04679]|3[78]|5(?:4[46]|8)|8[2379])|5(?:[2467]|3[237]|8[23])|7[1-578]|8(?:[2469]|3[278]|5[56][46]|86[3-6]))|2(?:2[24-9]|3[1-59]|47)|38(?:[58][78]|7[378])|3(?:4[35][56]|58[45]|8(?:[38]5|54|76))[4-6]","2(?:[23]02|6(?:[25]|4(?:64|[78]))|9(?:[02356]|4(?:[0268]|5[2-6])|72|8[23]))|3(?:3[28]|4(?:[04679]|3(?:5(?:4[0-25689]|[56])|[78])|58|8[2379])|5(?:[2467]|3[237]|8(?:[23]|4(?:[45]|60)|5(?:4[0-39]|5|64)))|7[1-578]|8(?:[2469]|3[278]|54(?:4|5[13-7]|6[89])|86[3-6]))|2(?:2[24-9]|3[1-59]|47)|38(?:[58][78]|7[378])|3(?:454|85[56])[46]|3(?:4(?:36|5[56])|8(?:[38]5|76))[4-6]"],
  "0$1",,1],[,"(\\d{2})(\\d{4})(\\d{4})","$1 $2-$3",["1"],"0$1",,1],[,"(\\d{3})(\\d{3})(\\d{4})","$1-$2-$3",["[68]"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{4})","$1 $2-$3",["[23]"],"0$1",,1],[,"(\\d)(\\d{4})(\\d{2})(\\d{4})","$2 15-$3-$4",["9(?:2[2-469]|3[3-578])","9(?:2(?:2[024-9]|3[0-59]|47|6[245]|9[02-8])|3(?:3[28]|4[03-9]|5[2-46-8]|7[1-578]|8[2-9]))","9(?:2(?:[23]02|6(?:[25]|4[6-8])|9(?:[02356]|4[02568]|72|8[23]))|3(?:3[28]|4(?:[04679]|3[5-8]|5[4-68]|8[2379])|5(?:[2467]|3[237]|8[2-5])|7[1-578]|8(?:[2469]|3[2578]|5[4-8]|7[36-8]|8[5-8])))|92(?:2[24-9]|3[1-59]|47)",
  "9(?:2(?:[23]02|6(?:[25]|4(?:64|[78]))|9(?:[02356]|4(?:[0268]|5[2-6])|72|8[23]))|3(?:3[28]|4(?:[04679]|3[78]|5(?:4[46]|8)|8[2379])|5(?:[2467]|3[237]|8[23])|7[1-578]|8(?:[2469]|3[278]|5(?:[56][46]|[78])|7[378]|8(?:6[3-6]|[78]))))|92(?:2[24-9]|3[1-59]|47)|93(?:4[35][56]|58[45]|8(?:[38]5|54|76))[4-6]","9(?:2(?:[23]02|6(?:[25]|4(?:64|[78]))|9(?:[02356]|4(?:[0268]|5[2-6])|72|8[23]))|3(?:3[28]|4(?:[04679]|3(?:5(?:4[0-25689]|[56])|[78])|5(?:4[46]|8)|8[2379])|5(?:[2467]|3[237]|8(?:[23]|4(?:[45]|60)|5(?:4[0-39]|5|64)))|7[1-578]|8(?:[2469]|3[278]|5(?:4(?:4|5[13-7]|6[89])|[56][46]|[78])|7[378]|8(?:6[3-6]|[78]))))|92(?:2[24-9]|3[1-59]|47)|93(?:4(?:36|5[56])|8(?:[38]5|76))[4-6]"],
  "0$1"],[,"(\\d)(\\d{2})(\\d{4})(\\d{4})","$2 15-$3-$4",["91"],"0$1"],[,"(\\d)(\\d{3})(\\d{3})(\\d{4})","$2 15-$3-$4",["9"],"0$1"]],[[,"(\\d{4})(\\d{2})(\\d{4})","$1 $2-$3",["2(?:2[024-9]|3[0-59]|47|6[245]|9[02-8])|3(?:3[28]|4[03-9]|5[2-46-8]|7[1-578]|8[2-9])","2(?:[23]02|6(?:[25]|4[6-8])|9(?:[02356]|4[02568]|72|8[23]))|3(?:3[28]|4(?:[04679]|3[5-8]|5[4-68]|8[2379])|5(?:[2467]|3[237]|8[2-5])|7[1-578]|8(?:[2469]|3[2578]|5[4-8]|7[36-8]|8[5-8]))|2(?:2[24-9]|3[1-59]|47)","2(?:[23]02|6(?:[25]|4(?:64|[78]))|9(?:[02356]|4(?:[0268]|5[2-6])|72|8[23]))|3(?:3[28]|4(?:[04679]|3[78]|5(?:4[46]|8)|8[2379])|5(?:[2467]|3[237]|8[23])|7[1-578]|8(?:[2469]|3[278]|5[56][46]|86[3-6]))|2(?:2[24-9]|3[1-59]|47)|38(?:[58][78]|7[378])|3(?:4[35][56]|58[45]|8(?:[38]5|54|76))[4-6]",
  "2(?:[23]02|6(?:[25]|4(?:64|[78]))|9(?:[02356]|4(?:[0268]|5[2-6])|72|8[23]))|3(?:3[28]|4(?:[04679]|3(?:5(?:4[0-25689]|[56])|[78])|58|8[2379])|5(?:[2467]|3[237]|8(?:[23]|4(?:[45]|60)|5(?:4[0-39]|5|64)))|7[1-578]|8(?:[2469]|3[278]|54(?:4|5[13-7]|6[89])|86[3-6]))|2(?:2[24-9]|3[1-59]|47)|38(?:[58][78]|7[378])|3(?:454|85[56])[46]|3(?:4(?:36|5[56])|8(?:[38]5|76))[4-6]"],"0$1",,1],[,"(\\d{2})(\\d{4})(\\d{4})","$1 $2-$3",["1"],"0$1",,1],[,"(\\d{3})(\\d{3})(\\d{4})","$1-$2-$3",["[68]"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{4})",
  "$1 $2-$3",["[23]"],"0$1",,1],[,"(\\d)(\\d{4})(\\d{2})(\\d{4})","$1 $2 $3-$4",["9(?:2[2-469]|3[3-578])","9(?:2(?:2[024-9]|3[0-59]|47|6[245]|9[02-8])|3(?:3[28]|4[03-9]|5[2-46-8]|7[1-578]|8[2-9]))","9(?:2(?:[23]02|6(?:[25]|4[6-8])|9(?:[02356]|4[02568]|72|8[23]))|3(?:3[28]|4(?:[04679]|3[5-8]|5[4-68]|8[2379])|5(?:[2467]|3[237]|8[2-5])|7[1-578]|8(?:[2469]|3[2578]|5[4-8]|7[36-8]|8[5-8])))|92(?:2[24-9]|3[1-59]|47)","9(?:2(?:[23]02|6(?:[25]|4(?:64|[78]))|9(?:[02356]|4(?:[0268]|5[2-6])|72|8[23]))|3(?:3[28]|4(?:[04679]|3[78]|5(?:4[46]|8)|8[2379])|5(?:[2467]|3[237]|8[23])|7[1-578]|8(?:[2469]|3[278]|5(?:[56][46]|[78])|7[378]|8(?:6[3-6]|[78]))))|92(?:2[24-9]|3[1-59]|47)|93(?:4[35][56]|58[45]|8(?:[38]5|54|76))[4-6]",
  "9(?:2(?:[23]02|6(?:[25]|4(?:64|[78]))|9(?:[02356]|4(?:[0268]|5[2-6])|72|8[23]))|3(?:3[28]|4(?:[04679]|3(?:5(?:4[0-25689]|[56])|[78])|5(?:4[46]|8)|8[2379])|5(?:[2467]|3[237]|8(?:[23]|4(?:[45]|60)|5(?:4[0-39]|5|64)))|7[1-578]|8(?:[2469]|3[278]|5(?:4(?:4|5[13-7]|6[89])|[56][46]|[78])|7[378]|8(?:6[3-6]|[78]))))|92(?:2[24-9]|3[1-59]|47)|93(?:4(?:36|5[56])|8(?:[38]5|76))[4-6]"]],[,"(\\d)(\\d{2})(\\d{4})(\\d{4})","$1 $2 $3-$4",["91"]],[,"(\\d)(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3-$4",["9"]]],[,,,,,,,,,[-1]],
  ,,[,,"810\\d{7}",,,,,,,[10]],[,,"810\\d{7}",,,,"8101234567",,,[10]],,,[,,,,,,,,,[-1]]],AS:[,[,,"(?:[58]\\d\\d|684|900)\\d{7}",,,,,,,[10],[7]],[,,"6846(?:22|33|44|55|77|88|9[19])\\d{4}",,,,"6846221234",,,,[7]],[,,"684(?:2(?:48|5[2468]|72)|7(?:3[13]|70|82))\\d{4}",,,,"6847331234",,,,[7]],[,,"8(?:00|33|44|55|66|77|88)[2-9]\\d{6}",,,,"8002123456"],[,,"900[2-9]\\d{6}",,,,"9002123456"],[,,,,,,,,,[-1]],[,,"52(?:35(?:[02-46-9]\\d|1[02-9]|5[0-46-9])|45(?:[034]\\d|1[02-9]|2[024-9]|5[0-46-9]))\\d{4}|52(?:3[2-46-9]|4[2-4])(?:[02-9]\\d|1[02-9])\\d{4}|5(?:00|2[12]|33|44|66|77|88)[2-9]\\d{6}",
  ,,,"5002345678"],[,,,,,,,,,[-1]],"AS",1,"011","1",,,"1|([267]\\d{6})$","684$1",,,,,[,,,,,,,,,[-1]],,"684",[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],AT:[,[,,"1\\d{3,12}|2\\d{6,12}|43(?:(?:0\\d|5[02-9])\\d{3,9}|2\\d{4,5}|[3467]\\d{4}|8\\d{4,6}|9\\d{4,7})|5\\d{4,12}|8\\d{7,12}|9\\d{8,12}|(?:[367]\\d|4[0-24-9])\\d{4,11}",,,,,,,[4,5,6,7,8,9,10,11,12,13],[3]],[,,"1(?:11\\d|[2-9]\\d{3,11})|(?:316|463|(?:51|66|73)2)\\d{3,10}|(?:2(?:1[467]|2[13-8]|5[2357]|6[1-46-8]|7[1-8]|8[124-7]|9[1458])|3(?:1[1-578]|3[23568]|4[5-7]|5[1378]|6[1-38]|8[3-68])|4(?:2[1-8]|35|7[1368]|8[2457])|5(?:2[1-8]|3[357]|4[147]|5[12578]|6[37])|6(?:13|2[1-47]|4[135-8]|5[468])|7(?:2[1-8]|35|4[13478]|5[68]|6[16-8]|7[1-6]|9[45]))\\d{4,10}",
  ,,,"1234567890",,,,[3]],[,,"6(?:5[0-3579]|6[013-9]|[7-9]\\d)\\d{4,10}",,,,"664123456",,,[7,8,9,10,11,12,13]],[,,"800\\d{6,10}",,,,"800123456",,,[9,10,11,12,13]],[,,"9(?:0[01]|3[019])\\d{6,10}",,,,"900123456",,,[9,10,11,12,13]],[,,"8(?:10|2[018])\\d{6,10}|828\\d{5}",,,,"810123456",,,[8,9,10,11,12,13]],[,,,,,,,,,[-1]],[,,"5(?:0[1-9]|17|[79]\\d)\\d{2,10}|7[28]0\\d{6,10}",,,,"780123456",,,[5,6,7,8,9,10,11,12,13]],"AT",43,"00","0",,,"0",,,,[[,"(\\d)(\\d{3,12})","$1 $2",["1(?:11|[2-9])"],"0$1"],[,"(\\d{3})(\\d{2})",
  "$1 $2",["517"],"0$1"],[,"(\\d{2})(\\d{3,5})","$1 $2",["5[079]"],"0$1"],[,"(\\d{6})","$1",["1"]],[,"(\\d{3})(\\d{3,10})","$1 $2",["(?:31|4)6|51|6(?:5[0-3579]|[6-9])|7(?:20|32|8)|[89]"],"0$1"],[,"(\\d{4})(\\d{3,9})","$1 $2",["[2-467]|5[2-6]"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{3,4})","$1 $2 $3",["5"],"0$1"],[,"(\\d{2})(\\d{4})(\\d{4,7})","$1 $2 $3",["5"],"0$1"]],[[,"(\\d)(\\d{3,12})","$1 $2",["1(?:11|[2-9])"],"0$1"],[,"(\\d{3})(\\d{2})","$1 $2",["517"],"0$1"],[,"(\\d{2})(\\d{3,5})","$1 $2",["5[079]"],
  "0$1"],[,"(\\d{3})(\\d{3,10})","$1 $2",["(?:31|4)6|51|6(?:5[0-3579]|[6-9])|7(?:20|32|8)|[89]"],"0$1"],[,"(\\d{4})(\\d{3,9})","$1 $2",["[2-467]|5[2-6]"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{3,4})","$1 $2 $3",["5"],"0$1"],[,"(\\d{2})(\\d{4})(\\d{4,7})","$1 $2 $3",["5"],"0$1"]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],AU:[,[,,"1(?:[0-79]\\d{7,8}|8[0-24-9]\\d{7})|(?:[2-478]\\d\\d|550)\\d{6}|1\\d{4,7}",,,,,,,[5,6,7,8,9,10]],[,,"(?:[237]\\d{5}|8(?:51(?:0(?:0[03-9]|[1247]\\d|3[2-9]|5[0-8]|6[1-9]|8[0-6])|1(?:1[69]|[23]\\d|4[0-4]))|(?:[6-8]\\d{3}|9(?:[02-9]\\d\\d|1(?:[0-57-9]\\d|6[0135-9])))\\d))\\d{3}",
  ,,,"212345678",,,[9],[8]],[,,"4(?:83[0-38]|93[01])\\d{5}|4(?:[0-3]\\d|4[047-9]|5[0-25-9]|6[06-9]|7[02-9]|8[0-2457-9]|9[0-27-9])\\d{6}",,,,"412345678",,,[9]],[,,"180(?:0\\d{3}|2)\\d{3}",,,,"1800123456",,,[7,10]],[,,"190[0-26]\\d{6}",,,,"1900123456",,,[10]],[,,"13(?:00\\d{3}|45[0-4])\\d{3}|13\\d{4}",,,,"1300123456",,,[6,8,10]],[,,,,,,,,,[-1]],[,,"(?:14(?:5(?:1[0458]|[23][458])|71\\d)|550\\d\\d)\\d{4}",,,,"550123456",,,[9]],"AU",61,"001[14-689]|14(?:1[14]|34|4[17]|[56]6|7[47]|88)0011","0",,,"0|(183[12])",
  ,"0011",,[[,"(\\d{2})(\\d{3,4})","$1 $2",["16"],"0$1"],[,"(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3",["13"]],[,"(\\d{3})(\\d{3})","$1 $2",["19"]],[,"(\\d{3})(\\d{4})","$1 $2",["180","1802"]],[,"(\\d{4})(\\d{3,4})","$1 $2",["19"]],[,"(\\d{2})(\\d{3})(\\d{2,4})","$1 $2 $3",["16"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["14|[45]"],"0$1"],[,"(\\d)(\\d{4})(\\d{4})","$1 $2 $3",["[2378]"],"(0$1)","$CC ($1)"],[,"(\\d{4})(\\d{3})(\\d{3})","$1 $2 $3",["1(?:30|[89])"]]],[[,"(\\d{2})(\\d{3,4})","$1 $2",["16"],
  "0$1"],[,"(\\d{2})(\\d{3})(\\d{2,4})","$1 $2 $3",["16"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["14|[45]"],"0$1"],[,"(\\d)(\\d{4})(\\d{4})","$1 $2 $3",["[2378]"],"(0$1)","$CC ($1)"],[,"(\\d{4})(\\d{3})(\\d{3})","$1 $2 $3",["1(?:30|[89])"]]],[,,"16\\d{3,7}",,,,"1612345",,,[5,6,7,8,9]],1,,[,,"1[38]00\\d{6}|1(?:345[0-4]|802)\\d{3}|13\\d{4}",,,,,,,[6,7,8,10]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],AW:[,[,,"(?:[25-79]\\d\\d|800)\\d{4}",,,,,,,[7]],[,,"5(?:2\\d|8[1-9])\\d{4}",,,,"5212345"],[,,"(?:290|5[69]\\d|6(?:[03]0|22|4[0-2]|[69]\\d)|7(?:[34]\\d|7[07])|9(?:6[45]|9[4-8]))\\d{4}",
  ,,,"5601234"],[,,"800\\d{4}",,,,"8001234"],[,,"900\\d{4}",,,,"9001234"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"(?:28\\d|501)\\d{4}",,,,"5011234"],"AW",297,"00",,,,,,,,[[,"(\\d{3})(\\d{4})","$1 $2",["[25-9]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],AX:[,[,,"2\\d{4,9}|35\\d{4,5}|(?:60\\d\\d|800)\\d{4,6}|7\\d{5,11}|(?:[14]\\d|3[0-46-9]|50)\\d{4,8}",,,,,,,[5,6,7,8,9,10,11,12]],[,,"18[1-8]\\d{3,6}",,,,"181234567",,,[6,7,8,9]],[,,"(?:4[0-8]|50)\\d{4,8}",,,,"412345678",,,[6,
  7,8,9,10]],[,,"800\\d{4,6}",,,,"800123456",,,[7,8,9]],[,,"[67]00\\d{5,6}",,,,"600123456",,,[8,9]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"AX",358,"00|99(?:[01469]|5(?:[14]1|3[23]|5[59]|77|88|9[09]))","0",,,"0",,"00",,,,[,,,,,,,,,[-1]],,"18",[,,,,,,,,,[-1]],[,,"20\\d{4,8}|60[12]\\d{5,6}|7(?:099\\d{4,5}|5[03-9]\\d{3,7})|20[2-59]\\d\\d|(?:606|7(?:0[78]|1|3\\d))\\d{7}|(?:10|29|3[09]|70[1-5]\\d)\\d{4,8}",,,,"10112345"],,,[,,,,,,,,,[-1]]],AZ:[,[,,"365\\d{6}|(?:[124579]\\d|60|88)\\d{7}",,,,,,,[9],
  [7]],[,,"(?:222[0-79]\\d|365(?:[0-46-9]\\d|5[0-35-9]))\\d{4}|(?:(?:1[28]|46)\\d|2(?:[045]2|1[24]|2[34]|33|6[23]))\\d{6}",,,,"123123456",,,,[7]],[,,"(?:36554|99[2-9]\\d\\d)\\d{4}|(?:[16]0|4[04]|5[015]|7[07])\\d{7}",,,,"401234567"],[,,"88\\d{7}",,,,"881234567"],[,,"900200\\d{3}",,,,"900200123"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"AZ",994,"00","0",,,"0",,,,[[,"(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3",["[1-9]"]],[,"(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["90"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{2})(\\d{2})",
  "$1 $2 $3 $4",["1[28]|2|365|46","1[28]|2|365|46","1[28]|2|365(?:[0-46-9]|5[0-35-9])|46"],"(0$1)"],[,"(\\d{2})(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[13-9]"],"0$1"]],[[,"(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["90"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3 $4",["1[28]|2|365|46","1[28]|2|365|46","1[28]|2|365(?:[0-46-9]|5[0-35-9])|46"],"(0$1)"],[,"(\\d{2})(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[13-9]"],"0$1"]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,
  [-1]]],BA:[,[,,"6\\d{8}|(?:[35689]\\d|49|70)\\d{6}",,,,,,,[8,9],[6]],[,,"(?:3(?:[05-79][2-9]|1[4579]|[23][24-9]|4[2-4689]|8[2457-9])|49[2-579]|5(?:0[2-49]|[13][2-9]|[268][2-4679]|4[4689]|5[2-79]|7[2-69]|9[2-4689]))\\d{5}",,,,"30212345",,,[8],[6]],[,,"6040[0-4]\\d{4}|6(?:03|[1-356]|44|7\\d)\\d{6}",,,,"61123456"],[,,"8[08]\\d{6}",,,,"80123456",,,[8]],[,,"9[0246]\\d{6}",,,,"90123456",,,[8]],[,,"8[12]\\d{6}",,,,"82123456",,,[8]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"BA",387,"00","0",,,"0",,,,[[,"(\\d{3})(\\d{3})",
  "$1-$2",["[2-9]"]],[,"(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["6[1-3]|[7-9]"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{3})","$1 $2-$3",["[3-5]|6[56]"],"0$1"],[,"(\\d{2})(\\d{2})(\\d{2})(\\d{3})","$1 $2 $3 $4",["6"],"0$1"]],[[,"(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["6[1-3]|[7-9]"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{3})","$1 $2-$3",["[3-5]|6[56]"],"0$1"],[,"(\\d{2})(\\d{2})(\\d{2})(\\d{3})","$1 $2 $3 $4",["6"],"0$1"]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"70(?:3[0146]|[56]0)\\d{4}",,,,"70341234",,,[8]],,,[,,,,,,,,
  ,[-1]]],BB:[,[,,"(?:246|[58]\\d\\d|900)\\d{7}",,,,,,,[10],[7]],[,,"246(?:2(?:2[78]|7[0-4])|4(?:1[024-6]|2\\d|3[2-9])|5(?:20|[34]\\d|54|7[1-3])|6(?:2\\d|38)|7[35]7|9(?:1[89]|63))\\d{4}",,,,"2464123456",,,,[7]],[,,"246(?:2(?:[3568]\\d|4[0-57-9])|45\\d|69[5-7]|8(?:[2-5]\\d|83))\\d{4}",,,,"2462501234",,,,[7]],[,,"8(?:00|33|44|55|66|77|88)[2-9]\\d{6}",,,,"8002123456"],[,,"(?:246976|900[2-9]\\d\\d)\\d{4}",,,,"9002123456",,,,[7]],[,,,,,,,,,[-1]],[,,"52(?:35(?:[02-46-9]\\d|1[02-9]|5[0-46-9])|45(?:[034]\\d|1[02-9]|2[024-9]|5[0-46-9]))\\d{4}|52(?:3[2-46-9]|4[2-4])(?:[02-9]\\d|1[02-9])\\d{4}|5(?:00|2[12]|33|44|66|77|88)[2-9]\\d{6}",
  ,,,"5002345678"],[,,"24631\\d{5}",,,,"2463101234",,,,[7]],"BB",1,"011","1",,,"1|([2-9]\\d{6})$","246$1",,,,,[,,,,,,,,,[-1]],,"246",[,,,,,,,,,[-1]],[,,"246(?:292|367|4(?:1[7-9]|3[01]|44|67)|7(?:36|53))\\d{4}",,,,"2464301234",,,,[7]],,,[,,,,,,,,,[-1]]],BD:[,[,,"1\\d{9}|2\\d{7,8}|88\\d{4,6}|(?:8[0-79]|9\\d)\\d{4,8}|(?:[346]\\d|[57])\\d{5,8}",,,,,,,[6,7,8,9,10]],[,,"(?:4(?:31\\d\\d|423)|5222)\\d{3}(?:\\d{2})?|8332[6-9]\\d\\d|(?:3(?:03[56]|224)|4(?:22[25]|653))\\d{3,4}|(?:3(?:42[47]|529|823)|4(?:027|525|65(?:28|8))|562|6257|7(?:1(?:5[3-5]|6[12]|7[156]|89)|22[589]56|32|42675|52(?:[25689](?:56|8)|[347]8)|71(?:6[1267]|75|89)|92374)|82(?:2[59]|32)56|9(?:03[23]56|23(?:256|373)|31|5(?:1|2[4589]56)))\\d{3}|(?:3(?:02[348]|22[35]|324|422)|4(?:22[67]|32[236-9]|6(?:2[46]|5[57])|953)|5526|6(?:024|6655)|81)\\d{4,5}|(?:2(?:7(?:1[0-267]|2[0-289]|3[0-29]|4[01]|5[1-3]|6[013]|7[0178]|91)|8(?:0[125]|1[1-6]|2[0157-9]|3[1-69]|41|6[1-35]|7[1-5]|8[1-8]|9[0-6])|9(?:0[0-2]|1[0-4]|2[568]|3[3-6]|5[5-7]|6[0136-9]|7[0-7]|8[014-9]))|3(?:0(?:2[025-79]|3[2-4])|181|22[12]|32[2356]|824)|4(?:02[09]|22[348]|32[045]|523|6(?:27|54))|666(?:22|53)|7(?:22[57-9]|42[56]|82[35])8|8(?:0[124-9]|2(?:181|2[02-4679]8)|4[12]|[5-7]2)|9(?:[04]2|2(?:2|328)|81))\\d{4}|(?:2[45]\\d\\d|3(?:1(?:2[5-7]|[5-7])|425|822)|4(?:033|1\\d|[257]1|332|4(?:2[246]|5[25])|6(?:2[35]|56|62)|8(?:23|54)|92[2-5])|5(?:02[03489]|22[457]|32[35-79]|42[46]|6(?:[18]|53)|724|826)|6(?:023|2(?:2[2-5]|5[3-5]|8)|32[3478]|42[34]|52[47]|6(?:[18]|6(?:2[34]|5[24]))|[78]2[2-5]|92[2-6])|7(?:02|21\\d|[3-589]1|6[12]|72[24])|8(?:217|3[12]|[5-7]1)|9[24]1)\\d{5}|(?:(?:3[2-8]|5[2-57-9]|6[03-589])1|4[4689][18])\\d{5}|[59]1\\d{5}",
  ,,,"27111234"],[,,"(?:1[13-9]\\d|644)\\d{7}|(?:3[78]|44|66)[02-9]\\d{7}",,,,"1812345678",,,[10]],[,,"80[03]\\d{7}",,,,"8001234567",,,[10]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"96(?:0[469]|1[0-47]|3[389]|6[69]|7[78])\\d{6}",,,,"9604123456",,,[10]],"BD",880,"00","0",,,"0",,,,[[,"(\\d{2})(\\d{4,6})","$1-$2",["31[5-8]|[459]1"],"0$1"],[,"(\\d{3})(\\d{3,7})","$1-$2",["3(?:[67]|8[013-9])|4(?:6[168]|7|[89][18])|5(?:6[128]|9)|6(?:28|4[14]|5)|7[2-589]|8(?:0[014-9]|[12])|9[358]|(?:3[2-5]|4[235]|5[2-578]|6[0389]|76|8[3-7]|9[24])1|(?:44|66)[01346-9]"],
  "0$1"],[,"(\\d{4})(\\d{3,6})","$1-$2",["[13-9]"],"0$1"],[,"(\\d)(\\d{7,8})","$1-$2",["2"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],BE:[,[,,"4\\d{8}|[1-9]\\d{7}",,,,,,,[8,9]],[,,"80[2-8]\\d{5}|(?:1[0-69]|[23][2-8]|4[23]|5\\d|6[013-57-9]|71|8[1-79]|9[2-4])\\d{6}",,,,"12345678",,,[8]],[,,"4[5-9]\\d{7}",,,,"470123456",,,[9]],[,,"800[1-9]\\d{4}",,,,"80012345",,,[8]],[,,"(?:70(?:2[0-57]|3[0457]|44|69|7[0579])|90(?:0[0-35-8]|1[36]|2[0-3568]|3[0135689]|4[2-68]|5[1-68]|6[0-378]|7[23568]|9[34679]))\\d{4}",
  ,,,"90012345",,,[8]],[,,"7879\\d{4}",,,,"78791234",,,[8]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"BE",32,"00","0",,,"0",,,,[[,"(\\d{3})(\\d{2})(\\d{3})","$1 $2 $3",["(?:80|9)0"],"0$1"],[,"(\\d)(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[239]|4[23]"],"0$1"],[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[15-8]"],"0$1"],[,"(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["4"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"78(?:0[57]|1[0458]|2[25]|3[15-8]|48|[56]0|7[078])\\d{4}",,,,"78102345",,,[8]],,
  ,[,,,,,,,,,[-1]]],BF:[,[,,"[025-7]\\d{7}",,,,,,,[8]],[,,"2(?:0(?:49|5[23]|6[56]|9[016-9])|4(?:4[569]|5[4-6]|6[56]|7[0179])|5(?:[34]\\d|50|6[5-7]))\\d{4}",,,,"20491234"],[,,"(?:0[127]|5[1-8]|[67]\\d)\\d{6}",,,,"70123456"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"BF",226,"00",,,,,,,,[[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[025-7]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],BG:[,[,,"[2-7]\\d{6,7}|[89]\\d{6,8}|2\\d{5}",
  ,,,,,,[6,7,8,9],[4,5]],[,,"2\\d{5,7}|(?:43[1-6]|70[1-9])\\d{4,5}|(?:[36]\\d|4[124-7]|[57][1-9]|8[1-6]|9[1-7])\\d{5,6}",,,,"2123456",,,[6,7,8],[4,5]],[,,"43[07-9]\\d{5}|(?:48|8[7-9]\\d|9(?:8\\d|9[69]))\\d{6}",,,,"48123456",,,[8,9]],[,,"800\\d{5}",,,,"80012345",,,[8]],[,,"90\\d{6}",,,,"90123456",,,[8]],[,,"700\\d{5}",,,,"70012345",,,[8]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"BG",359,"00","0",,,"0",,,,[[,"(\\d{6})","$1",["1"]],[,"(\\d)(\\d)(\\d{2})(\\d{2})","$1 $2 $3 $4",["2"],"0$1"],[,"(\\d{3})(\\d{4})",
  "$1 $2",["43[1-6]|70[1-9]"],"0$1"],[,"(\\d)(\\d{3})(\\d{3,4})","$1 $2 $3",["2"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{2,3})","$1 $2 $3",["[356]|4[124-7]|7[1-9]|8[1-6]|9[1-7]"],"0$1"],[,"(\\d{3})(\\d{2})(\\d{3})","$1 $2 $3",["(?:70|8)0"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{2})","$1 $2 $3",["43[1-7]|7"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{3,4})","$1 $2 $3",["[48]|9[08]"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["9"],"0$1"]],[[,"(\\d)(\\d)(\\d{2})(\\d{2})","$1 $2 $3 $4",["2"],"0$1"],[,"(\\d{3})(\\d{4})","$1 $2",
  ["43[1-6]|70[1-9]"],"0$1"],[,"(\\d)(\\d{3})(\\d{3,4})","$1 $2 $3",["2"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{2,3})","$1 $2 $3",["[356]|4[124-7]|7[1-9]|8[1-6]|9[1-7]"],"0$1"],[,"(\\d{3})(\\d{2})(\\d{3})","$1 $2 $3",["(?:70|8)0"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{2})","$1 $2 $3",["43[1-7]|7"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{3,4})","$1 $2 $3",["[48]|9[08]"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["9"],"0$1"]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],BH:[,[,,"[136-9]\\d{7}",
  ,,,,,,[8]],[,,"(?:1(?:3[1356]|6[0156]|7\\d)\\d|6(?:1[16]\\d|500|6(?:0\\d|3[12]|44|7[7-9]|88)|9[69][69])|7(?:1(?:11|78)|7\\d\\d))\\d{4}",,,,"17001234"],[,,"(?:3(?:[1-79]\\d|8[0-47-9])\\d|6(?:3(?:00|33|6[16])|6(?:3[03-9]|[69]\\d|7[0-6])))\\d{4}",,,,"36001234"],[,,"80\\d{6}",,,,"80123456"],[,,"(?:87|9[014578])\\d{6}",,,,"90123456"],[,,"84\\d{6}",,,,"84123456"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"BH",973,"00",,,,,,,,[[,"(\\d{4})(\\d{4})","$1 $2",["[13679]|8[047]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,
  ,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],BI:[,[,,"(?:[267]\\d|31)\\d{6}",,,,,,,[8]],[,,"22\\d{6}",,,,"22201234"],[,,"(?:29|31|6[1289]|7[125-9])\\d{6}",,,,"79561234"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"BI",257,"00",,,,,,,,[[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[2367]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],BJ:[,[,,"(?:[2689]\\d|51)\\d{6}",,,,,,,[8]],[,,"2(?:02|1[037]|2[45]|3[68])\\d{5}",,,,"20211234"],[,,"(?:51|6\\d|9[013-9])\\d{6}",
  ,,,"90011234"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"857[58]\\d{4}",,,,"85751234"],"BJ",229,"00",,,,,,,,[[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[25689]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"81\\d{6}",,,,"81123456"],,,[,,,,,,,,,[-1]]],BL:[,[,,"(?:590|69\\d|976)\\d{6}",,,,,,,[9]],[,,"590(?:2[7-9]|5[12]|87)\\d{4}",,,,"590271234"],[,,"69(?:0\\d\\d|1(?:2[29]|3[0-5]))\\d{4}",,,,"690001234"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],
  [,,"976[01]\\d{5}",,,,"976012345"],"BL",590,"00","0",,,"0",,,,,,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],BM:[,[,,"(?:441|[58]\\d\\d|900)\\d{7}",,,,,,,[10],[7]],[,,"441(?:[46]\\d\\d|5(?:4\\d|60|89))\\d{4}",,,,"4414123456",,,,[7]],[,,"441(?:[2378]\\d|5[0-39])\\d{5}",,,,"4413701234",,,,[7]],[,,"8(?:00|33|44|55|66|77|88)[2-9]\\d{6}",,,,"8002123456"],[,,"900[2-9]\\d{6}",,,,"9002123456"],[,,,,,,,,,[-1]],[,,"52(?:35(?:[02-46-9]\\d|1[02-9]|5[0-46-9])|45(?:[034]\\d|1[02-9]|2[024-9]|5[0-46-9]))\\d{4}|52(?:3[2-46-9]|4[2-4])(?:[02-9]\\d|1[02-9])\\d{4}|5(?:00|2[12]|33|44|66|77|88)[2-9]\\d{6}",
  ,,,"5002345678"],[,,,,,,,,,[-1]],"BM",1,"011","1",,,"1|([2-8]\\d{6})$","441$1",,,,,[,,,,,,,,,[-1]],,"441",[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],BN:[,[,,"[2-578]\\d{6}",,,,,,,[7]],[,,"22[0-7]\\d{4}|(?:2[013-9]|[34]\\d|5[0-25-9])\\d{5}",,,,"2345678"],[,,"(?:22[89]|[78]\\d\\d)\\d{4}",,,,"7123456"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"5[34]\\d{5}",,,,"5345678"],"BN",673,"00",,,,,,,,[[,"(\\d{3})(\\d{4})","$1 $2",["[2-578]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],
  [,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],BO:[,[,,"(?:[2-467]\\d\\d|8001)\\d{5}",,,,,,,[8,9],[7]],[,,"(?:2(?:2\\d\\d|5(?:11|[258]\\d|9[67])|6(?:12|2\\d|9[34])|8(?:2[34]|39|62))|3(?:3\\d\\d|4(?:6\\d|8[24])|8(?:25|42|5[257]|86|9[25])|9(?:[27]\\d|3[2-4]|4[248]|5[24]|6[2-6]))|4(?:4\\d\\d|6(?:11|[24689]\\d|72)))\\d{4}",,,,"22123456",,,[8],[7]],[,,"[67]\\d{7}",,,,"71234567",,,[8]],[,,"8001[07]\\d{4}",,,,"800171234",,,[9]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"BO",591,"00(?:1\\d)?","0",
  ,,"0(1\\d)?",,,,[[,"(\\d)(\\d{7})","$1 $2",["[23]|4[46]"],,"0$CC $1"],[,"(\\d{8})","$1",["[67]"],,"0$CC $1"],[,"(\\d{3})(\\d{2})(\\d{4})","$1 $2 $3",["8"],,"0$CC $1"]],,[,,,,,,,,,[-1]],,,[,,"8001[07]\\d{4}",,,,,,,[9]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],BQ:[,[,,"(?:[34]1|7\\d)\\d{5}",,,,,,,[7]],[,,"(?:318[023]|41(?:6[023]|70)|7(?:1[578]|2[05]|50)\\d)\\d{3}",,,,"7151234"],[,,"(?:31(?:8[14-8]|9[14578])|416[14-9]|7(?:0[01]|7[07]|8\\d|9[056])\\d)\\d{3}",,,,"3181234"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,
  ,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"BQ",599,"00",,,,,,,,,,[,,,,,,,,,[-1]],,"[347]",[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],BR:[,[,,"(?:[1-46-9]\\d\\d|5(?:[0-46-9]\\d|5[0-24679]))\\d{8}|[1-9]\\d{9}|[3589]\\d{8}|[34]\\d{7}",,,,,,,[8,9,10,11]],[,,"(?:[14689][1-9]|2[12478]|3[1-578]|5[13-5]|7[13-579])[2-5]\\d{7}",,,,"1123456789",,,[10],[8]],[,,"(?:[14689][1-9]|2[12478]|3[1-578]|5[13-5]|7[13-579])(?:7|9\\d)\\d{7}",,,,"11961234567",,,[10,11],[8,9]],[,,"800\\d{6,7}",,,,"800123456",,
  ,[9,10]],[,,"300\\d{6}|[59]00\\d{6,7}",,,,"300123456",,,[9,10]],[,,"300\\d{7}|[34]00\\d{5}|4(?:02|37)0\\d{4}",,,,"40041234",,,[8,10]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"BR",55,"00(?:1[245]|2[1-35]|31|4[13]|[56]5|99)","0",,,"0(?:(1[245]|2[1-35]|31|4[13]|[56]5|99)(\\d{10,11}))?","$2",,,[[,"(\\d{3,6})","$1",["1(?:1[25-8]|2[357-9]|3[02-68]|4[12568]|5|6[0-8]|8[015]|9[0-47-9])|321|610"]],[,"(\\d{4})(\\d{4})","$1-$2",["300|4(?:0[02]|37)","4(?:02|37)0|[34]00"]],[,"(\\d{4})(\\d{4})","$1-$2",["[2-57]","[2357]|4(?:[0-24-9]|3(?:[0-689]|7[1-9]))"]],
  [,"(\\d{3})(\\d{2,3})(\\d{4})","$1 $2 $3",["(?:[358]|90)0"],"0$1"],[,"(\\d{5})(\\d{4})","$1-$2",["9"]],[,"(\\d{2})(\\d{4})(\\d{4})","$1 $2-$3",["(?:[14689][1-9]|2[12478]|3[1-578]|5[13-5]|7[13-579])[2-57]"],"($1)","0 $CC ($1)"],[,"(\\d{2})(\\d{5})(\\d{4})","$1 $2-$3",["[16][1-9]|[2-57-9]"],"($1)","0 $CC ($1)"]],[[,"(\\d{4})(\\d{4})","$1-$2",["300|4(?:0[02]|37)","4(?:02|37)0|[34]00"]],[,"(\\d{3})(\\d{2,3})(\\d{4})","$1 $2 $3",["(?:[358]|90)0"],"0$1"],[,"(\\d{2})(\\d{4})(\\d{4})","$1 $2-$3",["(?:[14689][1-9]|2[12478]|3[1-578]|5[13-5]|7[13-579])[2-57]"],
  "($1)","0 $CC ($1)"],[,"(\\d{2})(\\d{5})(\\d{4})","$1 $2-$3",["[16][1-9]|[2-57-9]"],"($1)","0 $CC ($1)"]],[,,,,,,,,,[-1]],,,[,,"4020\\d{4}|[34]00\\d{5}",,,,,,,[8]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],BS:[,[,,"(?:242|[58]\\d\\d|900)\\d{7}",,,,,,,[10],[7]],[,,"242(?:3(?:02|[236][1-9]|4[0-24-9]|5[0-68]|7[347]|8[0-4]|9[2-467])|461|502|6(?:0[1-4]|12|2[013]|[45]0|7[67]|8[78]|9[89])|7(?:02|88))\\d{4}",,,,"2423456789",,,,[7]],[,,"242(?:3(?:5[79]|7[56]|95)|4(?:[23][1-9]|4[1-35-9]|5[1-8]|6[2-8]|7\\d|81)|5(?:2[45]|3[35]|44|5[1-46-9]|65|77)|6[34]6|7(?:27|38)|8(?:0[1-9]|1[02-9]|2\\d|[89]9))\\d{4}",
  ,,,"2423591234",,,,[7]],[,,"242300\\d{4}|8(?:00|33|44|55|66|77|88)[2-9]\\d{6}",,,,"8002123456",,,,[7]],[,,"900[2-9]\\d{6}",,,,"9002123456"],[,,,,,,,,,[-1]],[,,"52(?:35(?:[02-46-9]\\d|1[02-9]|5[0-46-9])|45(?:[034]\\d|1[02-9]|2[024-9]|5[0-46-9]))\\d{4}|52(?:3[2-46-9]|4[2-4])(?:[02-9]\\d|1[02-9])\\d{4}|5(?:00|2[12]|33|44|66|77|88)[2-9]\\d{6}",,,,"5002345678"],[,,,,,,,,,[-1]],"BS",1,"011","1",,,"1|([3-8]\\d{6})$","242$1",,,,,[,,,,,,,,,[-1]],,"242",[,,,,,,,,,[-1]],[,,"242225\\d{4}",,,,"2422250123"],,,
  [,,,,,,,,,[-1]]],BT:[,[,,"[17]\\d{7}|[2-8]\\d{6}",,,,,,,[7,8],[6]],[,,"(?:2[3-6]|[34][5-7]|5[236]|6[2-46]|7[246]|8[2-4])\\d{5}",,,,"2345678",,,[7],[6]],[,,"(?:1[67]|77)\\d{6}",,,,"17123456",,,[8]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"BT",975,"00",,,,,,,,[[,"(\\d{3})(\\d{3})","$1 $2",["[2-7]"]],[,"(\\d)(\\d{3})(\\d{3})","$1 $2 $3",["[2-68]|7[246]"]],[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["1[67]|7"]]],[[,"(\\d)(\\d{3})(\\d{3})","$1 $2 $3",["[2-68]|7[246]"]],
  [,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["1[67]|7"]]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],BW:[,[,,"90\\d{5}|(?:[2-6]|7\\d)\\d{6}",,,,,,,[7,8]],[,,"(?:2(?:4[0-48]|6[0-24]|9[0578])|3(?:1[0-35-9]|55|[69]\\d|7[013])|4(?:6[03]|7[1267]|9[0-5])|5(?:3[0389]|4[0489]|7[1-47]|88|9[0-49])|6(?:2[1-35]|5[149]|8[067]))\\d{4}",,,,"2401234",,,[7]],[,,"77200\\d{3}|7(?:[1-6]\\d|7[013-9])\\d{5}",,,,"71123456",,,[8]],[,,,,,,,,,[-1]],[,,"90\\d{5}",,,,"9012345",,,[7]],[,,,,,,
  ,,,[-1]],[,,,,,,,,,[-1]],[,,"79(?:1(?:[01]\\d|20)|2[0-2]\\d)\\d{3}",,,,"79101234",,,[8]],"BW",267,"00",,,,,,,,[[,"(\\d{2})(\\d{5})","$1 $2",["90"]],[,"(\\d{3})(\\d{4})","$1 $2",["[2-6]"]],[,"(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["7"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],BY:[,[,,"(?:[12]\\d|33|44|902)\\d{7}|8(?:0[0-79]\\d{5,7}|[1-7]\\d{9})|8(?:1[0-489]|[5-79]\\d)\\d{7}|8[1-79]\\d{6,7}|8[0-79]\\d{5}|8\\d{5}",,,,,,,[6,7,8,9,10,11],[5]],[,,"(?:1(?:5(?:1[1-5]|[24]\\d|6[2-4]|9[1-7])|6(?:[235]\\d|4[1-7])|7\\d\\d)|2(?:1(?:[246]\\d|3[0-35-9]|5[1-9])|2(?:[235]\\d|4[0-8])|3(?:[26]\\d|3[02-79]|4[024-7]|5[03-7])))\\d{5}",
  ,,,"152450911",,,[9],[5,6,7]],[,,"(?:2(?:5[5-79]|9[1-9])|(?:33|44)\\d)\\d{6}",,,,"294911911",,,[9]],[,,"800\\d{3,7}|8(?:0[13]|20\\d)\\d{7}",,,,"8011234567"],[,,"(?:810|902)\\d{7}",,,,"9021234567",,,[10]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"249\\d{6}",,,,"249123456",,,[9]],"BY",375,"810","8",,,"0|80?",,"8~10",,[[,"(\\d{3})(\\d{3})","$1 $2",["800"],"8 $1"],[,"(\\d{3})(\\d{2})(\\d{2,4})","$1 $2 $3",["800"],"8 $1"],[,"(\\d{4})(\\d{2})(\\d{3})","$1 $2-$3",["1(?:5[169]|6[3-5]|7[179])|2(?:1[35]|2[34]|3[3-5])",
  "1(?:5[169]|6(?:3[1-3]|4|5[125])|7(?:1[3-9]|7[0-24-6]|9[2-7]))|2(?:1[35]|2[34]|3[3-5])"],"8 0$1"],[,"(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2-$3-$4",["1(?:[56]|7[467])|2[1-3]"],"8 0$1"],[,"(\\d{2})(\\d{3})(\\d{2})(\\d{2})","$1 $2-$3-$4",["[1-4]"],"8 0$1"],[,"(\\d{3})(\\d{3,4})(\\d{4})","$1 $2 $3",["[89]"],"8 $1"]],,[,,,,,,,,,[-1]],,,[,,"800\\d{3,7}|(?:8(?:0[13]|10|20\\d)|902)\\d{7}"],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],BZ:[,[,,"(?:0800\\d|[2-8])\\d{6}",,,,,,,[7,11]],[,,"(?:236|732)\\d{4}|[2-578][02]\\d{5}",
  ,,,"2221234",,,[7]],[,,"6[0-35-7]\\d{5}",,,,"6221234",,,[7]],[,,"0800\\d{7}",,,,"08001234123",,,[11]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"BZ",501,"00",,,,,,,,[[,"(\\d{3})(\\d{4})","$1-$2",["[2-8]"]],[,"(\\d)(\\d{3})(\\d{4})(\\d{3})","$1-$2-$3-$4",["0"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],CA:[,[,,"(?:[2-8]\\d|90)\\d{8}",,,,,,,[10],[7]],[,,"(?:2(?:04|[23]6|[48]9|50)|3(?:06|43|6[57])|4(?:03|1[68]|3[178]|50)|5(?:06|1[49]|48|79|8[17])|6(?:04|13|39|47|72)|7(?:0[59]|78|8[02])|8(?:[06]7|19|25|73)|90[25])[2-9]\\d{6}",
  ,,,"5062345678",,,,[7]],[,,"(?:2(?:04|[23]6|[48]9|50)|3(?:06|43|6[57])|4(?:03|1[68]|3[178]|50)|5(?:06|1[49]|48|79|8[17])|6(?:04|13|39|47|72)|7(?:0[59]|78|8[02])|8(?:[06]7|19|25|73)|90[25])[2-9]\\d{6}",,,,"5062345678",,,,[7]],[,,"8(?:00|33|44|55|66|77|88)[2-9]\\d{6}",,,,"8002123456"],[,,"900[2-9]\\d{6}",,,,"9002123456"],[,,,,,,,,,[-1]],[,,"52(?:35(?:[02-46-9]\\d|1[02-9]|5[0-46-9])|45(?:[034]\\d|1[02-9]|2[024-9]|5[0-46-9]))\\d{4}|52(?:3[2-46-9]|4[2-4])(?:[02-9]\\d|1[02-9])\\d{4}|(?:5(?:00|2[12]|33|44|66|77|88)|622)[2-9]\\d{6}",
  ,,,"5002345678"],[,,"600[2-9]\\d{6}",,,,"6002012345"],"CA",1,"011","1",,,"1",,,1,,,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],CC:[,[,,"1(?:[0-79]\\d|8[0-24-9])\\d{7}|(?:[148]\\d\\d|550)\\d{6}|1\\d{5,7}",,,,,,,[6,7,8,9,10]],[,,"8(?:51(?:0(?:02|31|60)|118)|91(?:0(?:1[0-2]|29)|1(?:[28]2|50|79)|2(?:10|64)|3(?:[06]8|22)|4[29]8|62\\d|70[23]|959))\\d{3}",,,,"891621234",,,[9],[8]],[,,"4(?:83[0-38]|93[01])\\d{5}|4(?:[0-3]\\d|4[047-9]|5[0-25-9]|6[06-9]|7[02-9]|8[0-2457-9]|9[0-27-9])\\d{6}",
  ,,,"412345678",,,[9]],[,,"180(?:0\\d{3}|2)\\d{3}",,,,"1800123456",,,[7,10]],[,,"190[0-26]\\d{6}",,,,"1900123456",,,[10]],[,,"13(?:00\\d{3}|45[0-4])\\d{3}|13\\d{4}",,,,"1300123456",,,[6,8,10]],[,,,,,,,,,[-1]],[,,"(?:14(?:5(?:1[0458]|[23][458])|71\\d)|550\\d\\d)\\d{4}",,,,"550123456",,,[9]],"CC",61,"001[14-689]|14(?:1[14]|34|4[17]|[56]6|7[47]|88)0011","0",,,"0|([59]\\d{7})$","8$1","0011",,,,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],CD:[,[,,"[189]\\d{8}|[1-68]\\d{6}",,,,,,
  ,[7,9]],[,,"12\\d{7}|[1-6]\\d{6}",,,,"1234567"],[,,"88\\d{5}|(?:8[0-2459]|9[017-9])\\d{7}",,,,"991234567"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"CD",243,"00","0",,,"0",,,,[[,"(\\d{2})(\\d{2})(\\d{3})","$1 $2 $3",["88"],"0$1"],[,"(\\d{2})(\\d{5})","$1 $2",["[1-6]"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["1"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[89]"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],CF:[,[,
  ,"(?:[27]\\d{3}|8776)\\d{4}",,,,,,,[8]],[,,"2[12]\\d{6}",,,,"21612345"],[,,"7[0257]\\d{6}",,,,"70012345"],[,,,,,,,,,[-1]],[,,"8776\\d{4}",,,,"87761234"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"CF",236,"00",,,,,,,,[[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[278]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],CG:[,[,,"222\\d{6}|(?:0\\d|80)\\d{7}",,,,,,,[9]],[,,"222[1-589]\\d{5}",,,,"222123456"],[,,"0[14-6]\\d{7}",,,,"061234567"],[,,,,,,,,,[-1]],[,,"80(?:0\\d\\d|11[0-4])\\d{4}",
  ,,,"800123456"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"CG",242,"00",,,,,,,,[[,"(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["801"]],[,"(\\d)(\\d{4})(\\d{4})","$1 $2 $3",["8"]],[,"(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["[02]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],CH:[,[,,"8\\d{11}|[2-9]\\d{8}",,,,,,,[9,12]],[,,"(?:2[12467]|3[1-4]|4[134]|5[256]|6[12]|[7-9]1)\\d{7}",,,,"212345678",,,[9]],[,,"7[35-9]\\d{7}",,,,"781234567",,,[9]],[,,"800\\d{6}",,,,"800123456",
  ,,[9]],[,,"90[016]\\d{6}",,,,"900123456",,,[9]],[,,"84[0248]\\d{6}",,,,"840123456",,,[9]],[,,"878\\d{6}",,,,"878123456",,,[9]],[,,,,,,,,,[-1]],"CH",41,"00","0",,,"0",,,,[[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["8[047]|90"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[2-79]|81"],"0$1"],[,"(\\d{3})(\\d{2})(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3 $4 $5",["8"],"0$1"]],,[,,"74[0248]\\d{6}",,,,"740123456",,,[9]],,,[,,,,,,,,,[-1]],[,,"5[18]\\d{7}",,,,"581234567",,,[9]],,,[,,"860\\d{9}",,,,"860123456789",
  ,,[12]]],CI:[,[,,"[02-9]\\d{7}",,,,,,,[8]],[,,"(?:2(?:0[023]|1[02357]|[23][045]|4[03-5])|3(?:0[06]|1[069]|[2-4][07]|5[09]|6[08]))\\d{5}",,,,"21234567"],[,,"(?:2[0-3]80|97[0-3]\\d)\\d{4}|(?:0[1-9]|[457]\\d|6[014-9]|8[4-9]|95)\\d{6}",,,,"01234567"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"CI",225,"00",,,,,,,,[[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[02-9]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],CK:[,[,,"[2-578]\\d{4}",
  ,,,,,,[5]],[,,"(?:2\\d|3[13-7]|4[1-5])\\d{3}",,,,"21234"],[,,"[578]\\d{4}",,,,"71234"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"CK",682,"00",,,,,,,,[[,"(\\d{2})(\\d{3})","$1 $2",["[2-578]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],CL:[,[,,"12300\\d{6}|6\\d{9,10}|[2-9]\\d{8}",,,,,,,[9,10,11]],[,,"2(?:1982[0-6]|3314[05-9])\\d{3}|(?:2(?:1(?:160|962)|3(?:2\\d\\d|3(?:0\\d|1[0-35-9]|2[1-9]|3[0-2]|40)))|80[1-9]\\d\\d|9(?:3(?:[0-57-9]\\d\\d|6(?:0[02-9]|[1-9]\\d))|6(?:[0-8]\\d\\d|9(?:[02-79]\\d|1[05-9]))|7[1-9]\\d\\d|9(?:[03-9]\\d\\d|1(?:[0235-9]\\d|4[0-24-9])|2(?:[0-79]\\d|8[0-46-9]))))\\d{4}|(?:22|3[2-5]|[47][1-35]|5[1-3578]|6[13-57]|8[1-9]|9[2458])\\d{7}",
  ,,,"221234567",,,[9]],[,,"2(?:1982[0-6]|3314[05-9])\\d{3}|(?:2(?:1(?:160|962)|3(?:2\\d\\d|3(?:0\\d|1[0-35-9]|2[1-9]|3[0-2]|40)))|80[1-9]\\d\\d|9(?:3(?:[0-57-9]\\d\\d|6(?:0[02-9]|[1-9]\\d))|6(?:[0-8]\\d\\d|9(?:[02-79]\\d|1[05-9]))|7[1-9]\\d\\d|9(?:[03-9]\\d\\d|1(?:[0235-9]\\d|4[0-24-9])|2(?:[0-79]\\d|8[0-46-9]))))\\d{4}|(?:22|3[2-5]|[47][1-35]|5[1-3578]|6[13-57]|8[1-9]|9[2458])\\d{7}",,,,"221234567",,,[9]],[,,"(?:123|8)00\\d{6}",,,,"800123456",,,[9,11]],[,,,,,,,,,[-1]],[,,"600\\d{7,8}",,,,"6001234567",
  ,,[10,11]],[,,,,,,,,,[-1]],[,,"44\\d{7}",,,,"441234567",,,[9]],"CL",56,"(?:0|1(?:1[0-69]|2[02-5]|5[13-58]|69|7[0167]|8[018]))0",,,,,,,1,[[,"(\\d{4})","$1",["1(?:[03-589]|21)|[29]0|78"]],[,"(\\d{5})(\\d{4})","$1 $2",["219","2196"],"($1)"],[,"(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["44"]],[,"(\\d)(\\d{4})(\\d{4})","$1 $2 $3",["2[1-3]"],"($1)"],[,"(\\d)(\\d{4})(\\d{4})","$1 $2 $3",["9[2-9]"]],[,"(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["3[2-5]|[47]|5[1-3578]|6[13-57]|8(?:0[1-9]|[1-9])"],"($1)"],[,"(\\d{3})(\\d{3})(\\d{3,4})",
  "$1 $2 $3",["60|8"]],[,"(\\d{4})(\\d{3})(\\d{4})","$1 $2 $3",["1"]],[,"(\\d{3})(\\d{3})(\\d{2})(\\d{3})","$1 $2 $3 $4",["60"]]],[[,"(\\d{5})(\\d{4})","$1 $2",["219","2196"],"($1)"],[,"(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["44"]],[,"(\\d)(\\d{4})(\\d{4})","$1 $2 $3",["2[1-3]"],"($1)"],[,"(\\d)(\\d{4})(\\d{4})","$1 $2 $3",["9[2-9]"]],[,"(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["3[2-5]|[47]|5[1-3578]|6[13-57]|8(?:0[1-9]|[1-9])"],"($1)"],[,"(\\d{3})(\\d{3})(\\d{3,4})","$1 $2 $3",["60|8"]],[,"(\\d{4})(\\d{3})(\\d{4})",
  "$1 $2 $3",["1"]],[,"(\\d{3})(\\d{3})(\\d{2})(\\d{3})","$1 $2 $3 $4",["60"]]],[,,,,,,,,,[-1]],,,[,,"600\\d{7,8}",,,,,,,[10,11]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],CM:[,[,,"(?:[26]\\d\\d|88)\\d{6}",,,,,,,[8,9]],[,,"2(?:22|33)\\d{6}",,,,"222123456",,,[9]],[,,"(?:24[23]|6[5-9]\\d)\\d{6}",,,,"671234567",,,[9]],[,,"88\\d{6}",,,,"88012345",,,[8]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"CM",237,"00",,,,,,,,[[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["88"]],[,"(\\d)(\\d{2})(\\d{2})(\\d{2})(\\d{2})",
  "$1 $2 $3 $4 $5",["[26]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],CN:[,[,,"1[127]\\d{8,9}|2\\d{9}(?:\\d{2})?|[12]\\d{6,7}|86\\d{6}|(?:1[03-689]\\d|6)\\d{7,9}|(?:[3-579]\\d|8[0-57-9])\\d{6,9}",,,,,,,[7,8,9,10,11,12],[5,6]],[,,"(?:10(?:[02-79]\\d\\d|[18](?:0[1-9]|[1-9]\\d))|21(?:[18](?:0[1-9]|[1-9]\\d)|[2-79]\\d\\d))\\d{5}|(?:43[35]|754)\\d{7,8}|8(?:078\\d{7}|51\\d{7,8})|(?:10|(?:2|85)1|43[35]|754)(?:100\\d\\d|95\\d{3,4})|(?:2[02-57-9]|3(?:11|7[179])|4(?:[15]1|3[12])|5(?:1\\d|2[37]|3[12]|51|7[13-79]|9[15])|7(?:[39]1|5[57]|6[09])|8(?:71|98))(?:[02-8]\\d{7}|1(?:0(?:0\\d\\d(?:\\d{3})?|[1-9]\\d{5})|[1-9]\\d{6})|9(?:[0-46-9]\\d{6}|5\\d{3}(?:\\d(?:\\d{2})?)?))|(?:3(?:1[02-9]|35|49|5\\d|7[02-68]|9[1-68])|4(?:1[02-9]|2[179]|3[46-9]|5[2-9]|6[47-9]|7\\d|8[23])|5(?:3[03-9]|4[36]|5[02-9]|6[1-46]|7[028]|80|9[2-46-9])|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[17]\\d|2[248]|3[04-9]|4[3-6]|5[0-3689]|6[2368]|9[02-9])|8(?:1[236-8]|2[5-7]|3\\d|5[2-9]|7[02-9]|8[36-8]|9[1-7])|9(?:0[1-3689]|1[1-79]|[379]\\d|4[13]|5[1-5]))(?:[02-8]\\d{6}|1(?:0(?:0\\d\\d(?:\\d{2})?|[1-9]\\d{4})|[1-9]\\d{5})|9(?:[0-46-9]\\d{5}|5\\d{3,5}))",
  ,,,"1012345678",,,[7,8,9,10,11],[5,6]],[,,"1740[0-5]\\d{6}|1(?:[38]\\d|4[57]|5[0-35-9]|6[25-7]|7[0-35-8]|9[0135-9])\\d{8}",,,,"13123456789",,,[11]],[,,"(?:(?:10|21)8|8)00\\d{7}",,,,"8001234567",,,[10,12]],[,,"16[08]\\d{5}",,,,"16812345",,,[8]],[,,"400\\d{7}|950\\d{7,8}|(?:10|2[0-57-9]|3(?:[157]\\d|35|49|9[1-68])|4(?:[17]\\d|2[179]|[35][1-9]|6[47-9]|8[23])|5(?:[1357]\\d|2[37]|4[36]|6[1-46]|80|9[1-9])|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[1579]\\d|2[248]|3[014-9]|4[3-6]|6[023689])|8(?:1[236-8]|2[5-7]|[37]\\d|5[14-9]|8[36-8]|9[1-8])|9(?:0[1-3689]|1[1-79]|[379]\\d|4[13]|5[1-5]))96\\d{3,4}",
  ,,,"4001234567",,,[7,8,9,10,11],[5,6]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"CN",86,"00|1(?:[12]\\d|79)\\d\\d00","0",,,"0|(1(?:[12]\\d|79)\\d\\d)",,"00",,[[,"(\\d{5,6})","$1",["96"]],[,"(\\d{2})(\\d{5,6})","$1 $2",["(?:10|2[0-57-9])[19]","(?:10|2[0-57-9])(?:10|9[56])","(?:10|2[0-57-9])(?:100|9[56])"],"0$1","$CC $1"],[,"(\\d{3})(\\d{4})","$1 $2",["[1-9]","1[1-9]|26|[3-9]|(?:10|2[0-57-9])(?:[0-8]|9[0-47-9])","1[1-9]|26|[3-9]|(?:10|2[0-57-9])(?:[02-8]|1(?:0[1-9]|[1-9])|9[0-47-9])"]],[,"(\\d{4})(\\d{4})",
  "$1 $2",["16[08]"]],[,"(\\d{3})(\\d{5,6})","$1 $2",["3(?:[157]|35|49|9[1-68])|4(?:[17]|2[179]|6[47-9]|8[23])|5(?:[1357]|2[37]|4[36]|6[1-46]|80)|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[1579]|2[248]|3[014-9]|4[3-6]|6[023689])|8(?:1[236-8]|2[5-7]|[37]|8[36-8]|9[1-8])|9(?:0[1-3689]|1[1-79]|[379]|4[13]|5[1-5])|(?:4[35]|59|85)[1-9]","(?:3(?:[157]\\d|35|49|9[1-68])|4(?:[17]\\d|2[179]|[35][1-9]|6[47-9]|8[23])|5(?:[1357]\\d|2[37]|4[36]|6[1-46]|80|9[1-9])|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[1579]\\d|2[248]|3[014-9]|4[3-6]|6[023689])|8(?:1[236-8]|2[5-7]|[37]\\d|5[1-9]|8[36-8]|9[1-8])|9(?:0[1-3689]|1[1-79]|[379]\\d|4[13]|5[1-5]))[19]",
  "85[23](?:10|95)|(?:3(?:[157]\\d|35|49|9[1-68])|4(?:[17]\\d|2[179]|[35][1-9]|6[47-9]|8[23])|5(?:[1357]\\d|2[37]|4[36]|6[1-46]|80|9[1-9])|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[1579]\\d|2[248]|3[014-9]|4[3-6]|6[023689])|8(?:1[236-8]|2[5-7]|[37]\\d|5[14-9]|8[36-8]|9[1-8])|9(?:0[1-3689]|1[1-79]|[379]\\d|4[13]|5[1-5]))(?:10|9[56])","85[23](?:100|95)|(?:3(?:[157]\\d|35|49|9[1-68])|4(?:[17]\\d|2[179]|[35][1-9]|6[47-9]|8[23])|5(?:[1357]\\d|2[37]|4[36]|6[1-46]|80|9[1-9])|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[1579]\\d|2[248]|3[014-9]|4[3-6]|6[023689])|8(?:1[236-8]|2[5-7]|[37]\\d|5[14-9]|8[36-8]|9[1-8])|9(?:0[1-3689]|1[1-79]|[379]\\d|4[13]|5[1-5]))(?:100|9[56])"],
  "0$1","$CC $1"],[,"(\\d{4})(\\d{4})","$1 $2",["[1-9]","1[1-9]|26|[3-9]|(?:10|2[0-57-9])(?:[0-8]|9[0-47-9])","26|3(?:[0268]|9[079])|4(?:[049]|2[02-68]|[35]0|6[0-356]|8[014-9])|5(?:0|2[0-24-689]|4[0-2457-9]|6[057-9]|90)|6(?:[0-24578]|6[14-79]|9[03-9])|7(?:0[02-9]|2[0135-79]|3[23]|4[0-27-9]|6[1457]|8)|8(?:[046]|1[01459]|2[0-489]|50|8[0-2459]|9[09])|9(?:0[0457]|1[08]|[268]|4[024-9])|(?:34|85[23])[0-8]|(?:1|58)[1-9]|(?:63|95)[06-9]|(?:33|85[23]9)[0-46-9]|(?:10|2[0-57-9]|3(?:[157]\\d|35|49|9[1-68])|4(?:[17]\\d|2[179]|[35][1-9]|6[47-9]|8[23])|5(?:[1357]\\d|2[37]|4[36]|6[1-46]|80|9[1-9])|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[1579]\\d|2[248]|3[014-9]|4[3-6]|6[023689])|8(?:1[236-8]|2[5-7]|[37]\\d|5[14-9]|8[36-8]|9[1-8])|9(?:0[1-3689]|1[1-79]|[379]\\d|4[13]|5[1-5]))(?:[0-8]|9[0-47-9])",
  "26|3(?:[0268]|3[0-46-9]|4[0-8]|9[079])|4(?:[049]|2[02-68]|[35]0|6[0-356]|8[014-9])|5(?:0|2[0-24-689]|4[0-2457-9]|6[057-9]|90)|6(?:[0-24578]|3[06-9]|6[14-79]|9[03-9])|7(?:0[02-9]|2[0135-79]|3[23]|4[0-27-9]|6[1457]|8)|8(?:[046]|1[01459]|2[0-489]|5(?:0|[23](?:[02-8]|1[1-9]|9[0-46-9]))|8[0-2459]|9[09])|9(?:0[0457]|1[08]|[268]|4[024-9]|5[06-9])|(?:1|58|85[23]10)[1-9]|(?:10|2[0-57-9])(?:[0-8]|9[0-47-9])|(?:3(?:[157]\\d|35|49|9[1-68])|4(?:[17]\\d|2[179]|[35][1-9]|6[47-9]|8[23])|5(?:[1357]\\d|2[37]|4[36]|6[1-46]|80|9[1-9])|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[1579]\\d|2[248]|3[014-9]|4[3-6]|6[023689])|8(?:1[236-8]|2[5-7]|[37]\\d|5[14-9]|8[36-8]|9[1-8])|9(?:0[1-3689]|1[1-79]|[379]\\d|4[13]|5[1-5]))(?:[02-8]|1(?:0[1-9]|[1-9])|9[0-47-9])"]],
  [,"(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["(?:4|80)0"]],[,"(\\d{2})(\\d{4})(\\d{4})","$1 $2 $3",["10|2(?:[02-57-9]|1[1-9])","10|2(?:[02-57-9]|1[1-9])","10[0-79]|2(?:[02-57-9]|1[1-79])|(?:10|21)8(?:0[1-9]|[1-9])"],"0$1","$CC $1",1],[,"(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["3(?:[3-59]|7[02-68])|4(?:[26-8]|3[3-9]|5[2-9])|5(?:3[03-9]|[468]|7[028]|9[2-46-9])|6|7(?:[0-247]|3[04-9]|5[0-4689]|6[2368])|8(?:[1-358]|9[1-7])|9(?:[013479]|5[1-5])|(?:[34]1|55|79|87)[02-9]"],"0$1","$CC $1",1],[,"(\\d{3})(\\d{7,8})",
  "$1 $2",["9"]],[,"(\\d{4})(\\d{3})(\\d{4})","$1 $2 $3",["80"],"0$1","$CC $1",1],[,"(\\d{3})(\\d{4})(\\d{4})","$1 $2 $3",["[3-578]"],"0$1","$CC $1",1],[,"(\\d{3})(\\d{4})(\\d{4})","$1 $2 $3",["1[3-9]"],,"$CC $1"],[,"(\\d{2})(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3 $4",["[12]"],"0$1",,1]],[[,"(\\d{2})(\\d{5,6})","$1 $2",["(?:10|2[0-57-9])[19]","(?:10|2[0-57-9])(?:10|9[56])","(?:10|2[0-57-9])(?:100|9[56])"],"0$1","$CC $1"],[,"(\\d{3})(\\d{5,6})","$1 $2",["3(?:[157]|35|49|9[1-68])|4(?:[17]|2[179]|6[47-9]|8[23])|5(?:[1357]|2[37]|4[36]|6[1-46]|80)|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[1579]|2[248]|3[014-9]|4[3-6]|6[023689])|8(?:1[236-8]|2[5-7]|[37]|8[36-8]|9[1-8])|9(?:0[1-3689]|1[1-79]|[379]|4[13]|5[1-5])|(?:4[35]|59|85)[1-9]",
  "(?:3(?:[157]\\d|35|49|9[1-68])|4(?:[17]\\d|2[179]|[35][1-9]|6[47-9]|8[23])|5(?:[1357]\\d|2[37]|4[36]|6[1-46]|80|9[1-9])|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[1579]\\d|2[248]|3[014-9]|4[3-6]|6[023689])|8(?:1[236-8]|2[5-7]|[37]\\d|5[1-9]|8[36-8]|9[1-8])|9(?:0[1-3689]|1[1-79]|[379]\\d|4[13]|5[1-5]))[19]","85[23](?:10|95)|(?:3(?:[157]\\d|35|49|9[1-68])|4(?:[17]\\d|2[179]|[35][1-9]|6[47-9]|8[23])|5(?:[1357]\\d|2[37]|4[36]|6[1-46]|80|9[1-9])|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[1579]\\d|2[248]|3[014-9]|4[3-6]|6[023689])|8(?:1[236-8]|2[5-7]|[37]\\d|5[14-9]|8[36-8]|9[1-8])|9(?:0[1-3689]|1[1-79]|[379]\\d|4[13]|5[1-5]))(?:10|9[56])",
  "85[23](?:100|95)|(?:3(?:[157]\\d|35|49|9[1-68])|4(?:[17]\\d|2[179]|[35][1-9]|6[47-9]|8[23])|5(?:[1357]\\d|2[37]|4[36]|6[1-46]|80|9[1-9])|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[1579]\\d|2[248]|3[014-9]|4[3-6]|6[023689])|8(?:1[236-8]|2[5-7]|[37]\\d|5[14-9]|8[36-8]|9[1-8])|9(?:0[1-3689]|1[1-79]|[379]\\d|4[13]|5[1-5]))(?:100|9[56])"],"0$1","$CC $1"],[,"(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["(?:4|80)0"]],[,"(\\d{2})(\\d{4})(\\d{4})","$1 $2 $3",["10|2(?:[02-57-9]|1[1-9])","10|2(?:[02-57-9]|1[1-9])","10[0-79]|2(?:[02-57-9]|1[1-79])|(?:10|21)8(?:0[1-9]|[1-9])"],
  "0$1","$CC $1",1],[,"(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["3(?:[3-59]|7[02-68])|4(?:[26-8]|3[3-9]|5[2-9])|5(?:3[03-9]|[468]|7[028]|9[2-46-9])|6|7(?:[0-247]|3[04-9]|5[0-4689]|6[2368])|8(?:[1-358]|9[1-7])|9(?:[013479]|5[1-5])|(?:[34]1|55|79|87)[02-9]"],"0$1","$CC $1",1],[,"(\\d{3})(\\d{7,8})","$1 $2",["9"]],[,"(\\d{4})(\\d{3})(\\d{4})","$1 $2 $3",["80"],"0$1","$CC $1",1],[,"(\\d{3})(\\d{4})(\\d{4})","$1 $2 $3",["[3-578]"],"0$1","$CC $1",1],[,"(\\d{3})(\\d{4})(\\d{4})","$1 $2 $3",["1[3-9]"],,"$CC $1"],
  [,"(\\d{2})(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3 $4",["[12]"],"0$1",,1]],[,,,,,,,,,[-1]],,,[,,"(?:(?:10|21)8|[48])00\\d{7}|950\\d{7,8}",,,,,,,[10,11,12]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],CO:[,[,,"(?:1\\d|3)\\d{9}|[124-8]\\d{7}",,,,,,,[8,10,11],[7]],[,,"[124-8][2-9]\\d{6}",,,,"12345678",,,[8],[7]],[,,"3333(?:0(?:0\\d|1[0-5])|[4-9]\\d\\d)\\d{3}|33(?:00|3[0-24-9])\\d{6}|3(?:0[0-5]|1\\d|2[0-3]|5[01]|70)\\d{7}",,,,"3211234567",,,[10]],[,,"1800\\d{7}",,,,"18001234567",,,[11]],[,,"19(?:0[01]|4[78])\\d{7}",
  ,,,"19001234567",,,[11]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"CO",57,"00(?:4(?:[14]4|56)|[579])","0",,,"0([3579]|4(?:[14]4|56))?",,,,[[,"(\\d)(\\d{7})","$1 $2",["[14][2-9]|[25-8]"],"($1)","0$CC $1"],[,"(\\d{3})(\\d{7})","$1 $2",["3"],,"0$CC $1"],[,"(\\d)(\\d{3})(\\d{7})","$1-$2-$3",["1"],"0$1"]],[[,"(\\d)(\\d{7})","$1 $2",["[14][2-9]|[25-8]"],"($1)","0$CC $1"],[,"(\\d{3})(\\d{7})","$1 $2",["3"],,"0$CC $1"],[,"(\\d)(\\d{3})(\\d{7})","$1 $2 $3",["1"]]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],
  [,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],CR:[,[,,"(?:8\\d|90)\\d{8}|(?:[24-8]\\d{3}|3005)\\d{4}",,,,,,,[8,10]],[,,"210[7-9]\\d{4}|2(?:[024-7]\\d|1[1-9])\\d{5}",,,,"22123456",,,[8]],[,,"(?:3005\\d|6500[01])\\d{3}|(?:5[07]|6[0-4]|7[0-3]|8[3-9])\\d{6}",,,,"83123456",,,[8]],[,,"800\\d{7}",,,,"8001234567",,,[10]],[,,"90[059]\\d{7}",,,,"9001234567",,,[10]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"(?:210[0-6]|4\\d{3}|5100)\\d{4}",,,,"40001234",,,[8]],"CR",506,"00",,,,"(19(?:0[0-2468]|1[09]|20|66|77|99))",,,,[[,"(\\d{4})(\\d{4})",
  "$1 $2",["[2-7]|8[3-9]"],,"$CC $1"],[,"(\\d{3})(\\d{3})(\\d{4})","$1-$2-$3",["[89]"],,"$CC $1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],CU:[,[,,"[27]\\d{6,7}|[34]\\d{5,7}|(?:5|8\\d\\d)\\d{7}",,,,,,,[6,7,8,10],[4,5]],[,,"(?:3[23]|48)\\d{4,6}|(?:31|4[36]|8(?:0[25]|78)\\d)\\d{6}|(?:2[1-4]|4[1257]|7\\d)\\d{5,6}",,,,"71234567",,,,[4,5]],[,,"5\\d{7}",,,,"51234567",,,[8]],[,,"800\\d{7}",,,,"8001234567",,,[10]],[,,,,,,,,,[-1]],[,,"807\\d{7}",,,,"8071234567",,,[10]],[,,,,,,,
  ,,[-1]],[,,,,,,,,,[-1]],"CU",53,"119","0",,,"0",,,,[[,"(\\d{2})(\\d{4,6})","$1 $2",["2[1-4]|[34]"],"(0$1)"],[,"(\\d)(\\d{6,7})","$1 $2",["7"],"(0$1)"],[,"(\\d)(\\d{7})","$1 $2",["5"],"0$1"],[,"(\\d{3})(\\d{7})","$1 $2",["8"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],CV:[,[,,"(?:[2-59]\\d\\d|800)\\d{4}",,,,,,,[7]],[,,"2(?:2[1-7]|3[0-8]|4[12]|5[1256]|6\\d|7[1-3]|8[1-5])\\d{4}",,,,"2211234"],[,,"(?:[34][36]|5[1-389]|9\\d)\\d{5}",,,,"9911234"],[,,"800\\d{4}",,,,"8001234"],
  [,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"CV",238,"0",,,,,,,,[[,"(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3",["[2-589]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],CW:[,[,,"(?:[34]1|60|(?:7|9\\d)\\d)\\d{5}",,,,,,,[7,8]],[,,"9(?:4(?:3[0-5]|4[14]|6\\d)|50\\d|7(?:2[014]|3[02-9]|4[4-9]|6[357]|77|8[7-9])|8(?:3[39]|[46]\\d|7[01]|8[57-9]))\\d{4}",,,,"94351234"],[,,"953[01]\\d{4}|9(?:5[12467]|6[5-9])\\d{5}",,,,"95181234"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"60[0-2]\\d{4}",
  ,,,"6001234",,,[7]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"CW",599,"00",,,,,,,,[[,"(\\d{3})(\\d{4})","$1 $2",["[3467]"]],[,"(\\d)(\\d{3})(\\d{4})","$1 $2 $3",["9[4-8]"]]],,[,,"955\\d{5}",,,,"95581234",,,[8]],1,"[69]",[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],CX:[,[,,"1(?:[0-79]\\d|8[0-24-9])\\d{7}|(?:[148]\\d\\d|550)\\d{6}|1\\d{5,7}",,,,,,,[6,7,8,9,10]],[,,"8(?:51(?:0(?:01|30|59)|117)|91(?:00[6-9]|1(?:[28]1|49|78)|2(?:09|63)|3(?:12|26|75)|4(?:56|97)|64\\d|7(?:0[01]|1[0-2])|958))\\d{3}",,,,"891641234",
  ,,[9],[8]],[,,"4(?:83[0-38]|93[01])\\d{5}|4(?:[0-3]\\d|4[047-9]|5[0-25-9]|6[06-9]|7[02-9]|8[0-2457-9]|9[0-27-9])\\d{6}",,,,"412345678",,,[9]],[,,"180(?:0\\d{3}|2)\\d{3}",,,,"1800123456",,,[7,10]],[,,"190[0-26]\\d{6}",,,,"1900123456",,,[10]],[,,"13(?:00\\d{3}|45[0-4])\\d{3}|13\\d{4}",,,,"1300123456",,,[6,8,10]],[,,,,,,,,,[-1]],[,,"(?:14(?:5(?:1[0458]|[23][458])|71\\d)|550\\d\\d)\\d{4}",,,,"550123456",,,[9]],"CX",61,"001[14-689]|14(?:1[14]|34|4[17]|[56]6|7[47]|88)0011","0",,,"0|([59]\\d{7})$","8$1",
  "0011",,,,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],CY:[,[,,"(?:[279]\\d|[58]0)\\d{6}",,,,,,,[8]],[,,"2[2-6]\\d{6}",,,,"22345678"],[,,"9[4-79]\\d{6}",,,,"96123456"],[,,"800\\d{5}",,,,"80001234"],[,,"90[09]\\d{5}",,,,"90012345"],[,,"80[1-9]\\d{5}",,,,"80112345"],[,,"700\\d{5}",,,,"70012345"],[,,,,,,,,,[-1]],"CY",357,"00",,,,,,,,[[,"(\\d{2})(\\d{6})","$1 $2",["[257-9]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"(?:50|77)\\d{6}",,,,"77123456"],,,[,,,,,,,,,[-1]]],CZ:[,[,,"(?:[2-578]\\d|60)\\d{7}|9\\d{8,11}",
  ,,,,,,[9,10,11,12]],[,,"(?:2\\d|3[1257-9]|4[16-9]|5[13-9])\\d{7}",,,,"212345678",,,[9]],[,,"(?:60[1-8]|7(?:0[2-5]|[2379]\\d))\\d{6}",,,,"601123456",,,[9]],[,,"800\\d{6}",,,,"800123456",,,[9]],[,,"9(?:0[05689]|76)\\d{6}",,,,"900123456",,,[9]],[,,"8[134]\\d{7}",,,,"811234567",,,[9]],[,,"70[01]\\d{6}",,,,"700123456",,,[9]],[,,"9[17]0\\d{6}",,,,"910123456",,,[9]],"CZ",420,"00",,,,,,,,[[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[2-8]|9[015-7]"]],[,"(\\d{2})(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3 $4",["9"]],
  [,"(\\d{3})(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3 $4",["9"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"9(?:5\\d|7[2-4])\\d{6}",,,,"972123456",,,[9]],,,[,,"9(?:3\\d{9}|6\\d{7,10})",,,,"93123456789"]],DE:[,[,,"[2579]\\d{5,14}|49(?:[05]\\d{10}|[46][1-8]\\d{4,9})|49(?:[0-25]\\d|3[1-689]|7[1-7])\\d{4,8}|49(?:[0-2579]\\d|[34][1-9]|6[0-8])\\d{3}|49\\d{3,4}|(?:1|[368]\\d|4[0-8])\\d{3,13}",,,,,,,[4,5,6,7,8,9,10,11,12,13,14,15],[2,3]],[,,"(?:32|49[4-6]\\d)\\d{9}|49[0-7]\\d{3,9}|(?:[34]0|[68]9)\\d{3,13}|(?:2(?:0[1-689]|[1-3569]\\d|4[0-8]|7[1-7]|8[0-7])|3(?:[3569]\\d|4[0-79]|7[1-7]|8[1-8])|4(?:1[02-9]|[2-48]\\d|5[0-6]|6[0-8]|7[0-79])|5(?:0[2-8]|[124-6]\\d|[38][0-8]|[79][0-7])|6(?:0[02-9]|[1-358]\\d|[47][0-8]|6[1-9])|7(?:0[2-8]|1[1-9]|[27][0-7]|3\\d|[4-6][0-8]|8[0-5]|9[013-7])|8(?:0[2-9]|1[0-79]|2\\d|3[0-46-9]|4[0-6]|5[013-9]|6[1-8]|7[0-8]|8[0-24-6])|9(?:0[6-9]|[1-4]\\d|[589][0-7]|6[0-8]|7[0-467]))\\d{3,12}",
  ,,,"30123456",,,[5,6,7,8,9,10,11,12,13,14,15],[2,3,4]],[,,"15[0-25-9]\\d{8}|1(?:6[023]|7\\d)\\d{7,8}",,,,"15123456789",,,[10,11]],[,,"800\\d{7,12}",,,,"8001234567890",,,[10,11,12,13,14,15]],[,,"(?:137[7-9]|900(?:[135]|9\\d))\\d{6}",,,,"9001234567",,,[10,11]],[,,"180\\d{5,11}|13(?:7[1-6]\\d\\d|8)\\d{4}",,,,"18012345",,,[7,8,9,10,11,12,13,14]],[,,"700\\d{8}",,,,"70012345678",,,[11]],[,,,,,,,,,[-1]],"DE",49,"00","0",,,"0",,,,[[,"(\\d{2})(\\d{3,13})","$1 $2",["3[02]|40|[68]9"],"0$1"],[,"(\\d{3})(\\d{3,12})",
  "$1 $2",["2(?:0[1-389]|1[124]|2[18]|3[14])|3(?:[35-9][15]|4[015])|906|(?:2[4-9]|4[2-9]|[579][1-9]|[68][1-8])1","2(?:0[1-389]|12[0-8])|3(?:[35-9][15]|4[015])|906|2(?:[13][14]|2[18])|(?:2[4-9]|4[2-9]|[579][1-9]|[68][1-8])1"],"0$1"],[,"(\\d{4})(\\d{2,11})","$1 $2",["[24-6]|3(?:[3569][02-46-9]|4[2-4679]|7[2-467]|8[2-46-8])|70[2-8]|8(?:0[2-9]|[1-8])|90[7-9]|[79][1-9]","[24-6]|3(?:3(?:0[1-467]|2[127-9]|3[124578]|7[1257-9]|8[1256]|9[145])|4(?:2[135]|4[13578]|9[1346])|5(?:0[14]|2[1-3589]|6[1-4]|7[13468]|8[13568])|6(?:2[1-489]|3[124-6]|6[13]|7[12579]|8[1-356]|9[135])|7(?:2[1-7]|4[145]|6[1-5]|7[1-4])|8(?:21|3[1468]|6|7[1467]|8[136])|9(?:0[12479]|2[1358]|4[134679]|6[1-9]|7[136]|8[147]|9[1468]))|70[2-8]|8(?:0[2-9]|[1-8])|90[7-9]|[79][1-9]|3[68]4[1347]|3(?:47|60)[1356]|3(?:3[46]|46|5[49])[1246]|3[4579]3[1357]"],
  "0$1"],[,"(\\d{3})(\\d{4})","$1 $2",["138"],"0$1"],[,"(\\d{5})(\\d{2,10})","$1 $2",["3"],"0$1"],[,"(\\d{3})(\\d{5,11})","$1 $2",["181"],"0$1"],[,"(\\d{3})(\\d)(\\d{4,10})","$1 $2 $3",["1(?:3|80)|9"],"0$1"],[,"(\\d{3})(\\d{7,8})","$1 $2",["1[67]"],"0$1"],[,"(\\d{3})(\\d{7,12})","$1 $2",["8"],"0$1"],[,"(\\d{5})(\\d{6})","$1 $2",["185","1850","18500"],"0$1"],[,"(\\d{3})(\\d{4})(\\d{4})","$1 $2 $3",["7"],"0$1"],[,"(\\d{4})(\\d{7})","$1 $2",["18[68]"],"0$1"],[,"(\\d{5})(\\d{6})","$1 $2",["15[0568]"],"0$1"],
  [,"(\\d{4})(\\d{7})","$1 $2",["15[1279]"],"0$1"],[,"(\\d{3})(\\d{8})","$1 $2",["18"],"0$1"],[,"(\\d{3})(\\d{2})(\\d{7,8})","$1 $2 $3",["1(?:6[023]|7)"],"0$1"],[,"(\\d{4})(\\d{2})(\\d{7})","$1 $2 $3",["15[279]"],"0$1"],[,"(\\d{3})(\\d{2})(\\d{8})","$1 $2 $3",["15"],"0$1"]],,[,,"16(?:4\\d{1,10}|[89]\\d{1,11})",,,,"16412345",,,[4,5,6,7,8,9,10,11,12,13,14]],,,[,,,,,,,,,[-1]],[,,"18(?:1\\d{5,11}|[2-9]\\d{8})",,,,"18500123456",,,[8,9,10,11,12,13,14]],,,[,,"1(?:6(?:013|255|399)|7(?:(?:[015]1|[69]3)3|[2-4]55|[78]99))\\d{7,8}|15(?:(?:[03-68]00|113)\\d|2\\d55|7\\d99|9\\d33)\\d{7}",
  ,,,"177991234567",,,[12,13]]],DJ:[,[,,"(?:2\\d|77)\\d{6}",,,,,,,[8]],[,,"2(?:1[2-5]|7[45])\\d{5}",,,,"21360003"],[,,"77\\d{6}",,,,"77831001"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"DJ",253,"00",,,,,,,,[[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[27]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],DK:[,[,,"[2-9]\\d{7}",,,,,,,[8]],[,,"(?:[2-7]\\d|8[126-9]|9[1-46-9])\\d{6}",,,,"32123456"],[,,"(?:[2-7]\\d|8[126-9]|9[1-46-9])\\d{6}",
  ,,,"32123456"],[,,"80\\d{6}",,,,"80123456"],[,,"90\\d{6}",,,,"90123456"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"DK",45,"00",,,,,,,1,[[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[2-9]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],DM:[,[,,"(?:[58]\\d\\d|767|900)\\d{7}",,,,,,,[10],[7]],[,,"767(?:2(?:55|66)|4(?:2[01]|4[0-25-9])|50[0-4])\\d{4}",,,,"7674201234",,,,[7]],[,,"767(?:2(?:[2-4689]5|7[5-7])|31[5-7]|61[1-7]|70[1-6])\\d{4}",,,,"7672251234",,,,[7]],
  [,,"8(?:00|33|44|55|66|77|88)[2-9]\\d{6}",,,,"8002123456"],[,,"900[2-9]\\d{6}",,,,"9002123456"],[,,,,,,,,,[-1]],[,,"52(?:35(?:[02-46-9]\\d|1[02-9]|5[0-46-9])|45(?:[034]\\d|1[02-9]|2[024-9]|5[0-46-9]))\\d{4}|52(?:3[2-46-9]|4[2-4])(?:[02-9]\\d|1[02-9])\\d{4}|5(?:00|2[12]|33|44|66|77|88)[2-9]\\d{6}",,,,"5002345678"],[,,,,,,,,,[-1]],"DM",1,"011","1",,,"1|([2-7]\\d{6})$","767$1",,,,,[,,,,,,,,,[-1]],,"767",[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],DO:[,[,,"(?:[58]\\d\\d|900)\\d{7}",,,,,,,[10],
  [7]],[,,"8(?:[04]9[2-9]\\d\\d|29(?:2(?:[0-59]\\d|6[04-9]|7[0-27]|8[0237-9])|3(?:[0-35-9]\\d|4[7-9])|[45]\\d\\d|6(?:[0-27-9]\\d|[3-5][1-9]|6[0135-8])|7(?:0[013-9]|[1-37]\\d|4[1-35689]|5[1-4689]|6[1-57-9]|8[1-79]|9[1-8])|8(?:0[146-9]|1[0-48]|[248]\\d|3[1-79]|5[01589]|6[013-68]|7[124-8]|9[0-8])|9(?:[0-24]\\d|3[02-46-9]|5[0-79]|60|7[0169]|8[57-9]|9[02-9])))\\d{4}",,,,"8092345678",,,,[7]],[,,"8[024]9[2-9]\\d{6}",,,,"8092345678",,,,[7]],[,,"8(?:00|33|44|55|66|77|88)[2-9]\\d{6}",,,,"8002123456"],[,,"900[2-9]\\d{6}",
  ,,,"9002123456"],[,,,,,,,,,[-1]],[,,"52(?:35(?:[02-46-9]\\d|1[02-9]|5[0-46-9])|45(?:[034]\\d|1[02-9]|2[024-9]|5[0-46-9]))\\d{4}|52(?:3[2-46-9]|4[2-4])(?:[02-9]\\d|1[02-9])\\d{4}|5(?:00|2[12]|33|44|66|77|88)[2-9]\\d{6}",,,,"5002345678"],[,,,,,,,,,[-1]],"DO",1,"011","1",,,"1",,,,,,[,,,,,,,,,[-1]],,"8[024]9",[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],DZ:[,[,,"(?:[1-4]|[5-79]\\d|80)\\d{7}",,,,,,,[8,9]],[,,"9619\\d{5}|(?:1\\d|2[013-79]|3[0-8]|4[0135689])\\d{6}",,,,"12345678"],[,,"(?:5(?:4[0-29]|5\\d|6[01])|6(?:[569]\\d|7[0-6])|7[7-9]\\d)\\d{6}",
  ,,,"551234567",,,[9]],[,,"800\\d{6}",,,,"800123456",,,[9]],[,,"80[3-689]1\\d{5}",,,,"808123456",,,[9]],[,,"80[12]1\\d{5}",,,,"801123456",,,[9]],[,,,,,,,,,[-1]],[,,"98[23]\\d{6}",,,,"983123456",,,[9]],"DZ",213,"00","0",,,"0",,,,[[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[1-4]"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3 $4",["9"],"0$1"],[,"(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[5-8]"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],EC:[,
  [,,"1\\d{9,10}|(?:[2-7]|9\\d)\\d{7}",,,,,,,[8,9,10,11],[7]],[,,"[2-7][2-7]\\d{6}",,,,"22123456",,,[8],[7]],[,,"964[0-2]\\d{5}|9(?:39|[57][89]|6[0-36-9]|[89]\\d)\\d{6}",,,,"991234567",,,[9]],[,,"1800\\d{7}|1[78]00\\d{6}",,,,"18001234567",,,[10,11]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"[2-7]890\\d{4}",,,,"28901234",,,[8]],"EC",593,"00","0",,,"0",,,,[[,"(\\d{3})(\\d{4})","$1-$2",["[2-7]"]],[,"(\\d)(\\d{3})(\\d{4})","$1 $2-$3",["[2-7]"],"(0$1)"],[,"(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",
  ["9"],"0$1"],[,"(\\d{4})(\\d{3})(\\d{3,4})","$1 $2 $3",["1"]]],[[,"(\\d)(\\d{3})(\\d{4})","$1-$2-$3",["[2-7]"]],[,"(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["9"],"0$1"],[,"(\\d{4})(\\d{3})(\\d{3,4})","$1 $2 $3",["1"]]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],EE:[,[,,"8\\d{9}|[4578]\\d{7}|(?:[3-8]\\d|90)\\d{5}",,,,,,,[7,8,10]],[,,"(?:3[23589]|4[3-8]|6\\d|7[1-9]|88)\\d{5}",,,,"3212345",,,[7]],[,,"5(?:[0-35-9]\\d{6}|4(?:[0-57-9]\\d{5}|6(?:[0-24-9]\\d{4}|3(?:[0-35-9]\\d{3}|4000))))|8(?:1(?:0(?:000|[3-9]\\d\\d)|(?:1(?:0[236]|1\\d)|(?:23|[3-79]\\d)\\d)\\d)|2(?:0(?:000|(?:19|[24-7]\\d)\\d)|(?:(?:[124-6]\\d|3[5-9]|8[2-4])\\d|7(?:[679]\\d|8[13-9]))\\d)|[349]\\d{4})\\d\\d|5(?:(?:[02]\\d|5[0-478])\\d|1(?:[0-8]\\d|95)|6(?:4[0-4]|5[1-589]))\\d{3}",
  ,,,"51234567",,,[7,8]],[,,"800(?:(?:0\\d\\d|1)\\d|[2-9])\\d{3}",,,,"80012345"],[,,"(?:40\\d\\d|900)\\d{4}",,,,"9001234",,,[7,8]],[,,,,,,,,,[-1]],[,,"70[0-2]\\d{5}",,,,"70012345",,,[8]],[,,,,,,,,,[-1]],"EE",372,"00",,,,,,,,[[,"(\\d{3})(\\d{4})","$1 $2",["[369]|4[3-8]|5(?:[0-2]|5[0-478]|6[45])|7[1-9]|88","[369]|4[3-8]|5(?:[02]|1(?:[0-8]|95)|5[0-478]|6(?:4[0-4]|5[1-589]))|7[1-9]|88"]],[,"(\\d{4})(\\d{3,4})","$1 $2",["[45]|8(?:00|[1-49])","[45]|8(?:00[1-9]|[1-49])"]],[,"(\\d{2})(\\d{2})(\\d{4})","$1 $2 $3",
  ["7"]],[,"(\\d{4})(\\d{3})(\\d{3})","$1 $2 $3",["8"]]],,[,,,,,,,,,[-1]],,,[,,"800[2-9]\\d{3}",,,,,,,[7]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],EG:[,[,,"[189]\\d{8,9}|[24-6]\\d{8}|[135]\\d{7}",,,,,,,[8,9,10],[6,7]],[,,"13[23]\\d{6}|(?:15|57)\\d{6,7}|(?:2[2-4]|3|4[05-8]|5[05]|6[24-689]|8[2468]|9[235-7])\\d{7}",,,,"234567890",,,[8,9],[6,7]],[,,"1[0-25]\\d{8}",,,,"1001234567",,,[10]],[,,"800\\d{7}",,,,"8001234567",,,[10]],[,,"900\\d{7}",,,,"9001234567",,,[10]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],
  "EG",20,"00","0",,,"0",,,,[[,"(\\d)(\\d{7,8})","$1 $2",["[23]"],"0$1"],[,"(\\d{2})(\\d{6,7})","$1 $2",["1[35]|[4-6]|8[2468]|9[235-7]"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["[189]"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],EH:[,[,,"[5-8]\\d{8}",,,,,,,[9]],[,,"528[89]\\d{5}",,,,"528812345"],[,,"(?:6(?:[0-79]\\d|8[0-247-9])|7(?:0[016-8]|6[1267]|7[0-27]))\\d{6}",,,,"650123456"],[,,"80\\d{7}",,,,"801234567"],[,,"89\\d{7}",,,,"891234567"],[,,,,,,,,,[-1]],
  [,,,,,,,,,[-1]],[,,"592(?:4[0-2]|93)\\d{4}",,,,"592401234"],"EH",212,"00","0",,,"0",,,,,,[,,,,,,,,,[-1]],,"528[89]",[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],ER:[,[,,"[178]\\d{6}",,,,,,,[7],[6]],[,,"(?:1(?:1[12568]|[24]0|55|6[146])|8\\d\\d)\\d{4}",,,,"8370362",,,,[6]],[,,"(?:17[1-3]|7\\d\\d)\\d{4}",,,,"7123456"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"ER",291,"00","0",,,"0",,,,[[,"(\\d)(\\d{3})(\\d{3})","$1 $2 $3",["[178]"],"0$1"]],,[,,,,,,,,,[-1]],
  ,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],ES:[,[,,"(?:51|[6-9]\\d)\\d{7}",,,,,,,[9]],[,,"96906(?:0[0-8]|1[1-9]|[2-9]\\d)\\d\\d|9(?:69(?:0[0-57-9]|[1-9]\\d)|73(?:[0-8]\\d|9[1-9]))\\d{4}|(?:8(?:[1356]\\d|[28][0-8]|[47][1-9])|9(?:[135]\\d|[268][0-8]|4[1-9]|7[124-9]))\\d{6}",,,,"810123456"],[,,"9(?:6906(?:09|10)|7390\\d\\d)\\d\\d|(?:6\\d|7[1-48])\\d{7}",,,,"612345678"],[,,"[89]00\\d{6}",,,,"800123456"],[,,"80[367]\\d{6}",,,,"803123456"],[,,"90[12]\\d{6}",,,,"901123456"],[,,"70\\d{7}",,,,"701234567"],
  [,,,,,,,,,[-1]],"ES",34,"00",,,,,,,,[[,"(\\d{4})","$1",["905"]],[,"(\\d{6})","$1",["[79]9"]],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[89]00"]],[,"(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[5-9]"]]],[[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[89]00"]],[,"(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[5-9]"]]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"51\\d{7}",,,,"511234567"],,,[,,,,,,,,,[-1]]],ET:[,[,,"(?:11|[2-59]\\d)\\d{7}",,,,,,,[9],[7]],[,,"116671\\d{3}|(?:11(?:1(?:1[124]|2[2-7]|3[1-5]|5[5-8]|8[6-8])|2(?:13|3[6-8]|5[89]|7[05-9]|8[2-6])|3(?:2[01]|3[0-289]|4[1289]|7[1-4]|87)|4(?:1[69]|3[2-49]|4[0-3]|6[5-8])|5(?:1[578]|44|5[0-4])|6(?:1[78]|2[69]|39|4[5-7]|5[1-5]|6[0-59]|8[015-8]))|2(?:2(?:11[1-9]|22[0-7]|33\\d|44[1467]|66[1-68])|5(?:11[124-6]|33[2-8]|44[1467]|55[14]|66[1-3679]|77[124-79]|880))|3(?:3(?:11[0-46-8]|(?:22|55)[0-6]|33[0134689]|44[04]|66[01467])|4(?:44[0-8]|55[0-69]|66[0-3]|77[1-5]))|4(?:6(?:119|22[0-24-7]|33[1-5]|44[13-69]|55[14-689]|660|88[1-4])|7(?:(?:11|22)[1-9]|33[13-7]|44[13-6]|55[1-689]))|5(?:7(?:227|55[05]|(?:66|77)[14-8])|8(?:11[149]|22[013-79]|33[0-68]|44[013-8]|550|66[1-5]|77\\d)))\\d{4}",
  ,,,"111112345",,,,[7]],[,,"9\\d{8}",,,,"911234567"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"ET",251,"00","0",,,"0",,,,[[,"(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["[1-59]"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],FI:[,[,,"[1-35689]\\d{4}|7\\d{10,11}|(?:[124-7]\\d|3[0-46-9])\\d{8}|[1-9]\\d{5,8}",,,,,,,[5,6,7,8,9,10,11,12]],[,,"(?:1[3-79][1-8]|[235689][1-8]\\d)\\d{2,6}",,,,"131234567",,,[5,6,7,8,9]],[,,"(?:4[0-8]|50)\\d{4,8}",
  ,,,"412345678",,,[6,7,8,9,10]],[,,"800\\d{4,6}",,,,"800123456",,,[7,8,9]],[,,"[67]00\\d{5,6}",,,,"600123456",,,[8,9]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"FI",358,"00|99(?:[01469]|5(?:[14]1|3[23]|5[59]|77|88|9[09]))","0",,,"0",,"00",,[[,"(\\d{5})","$1",["75[12]"],"0$1"],[,"(\\d)(\\d{4,9})","$1 $2",["[2568][1-8]|3(?:0[1-9]|[1-9])|9"],"0$1"],[,"(\\d{6})","$1",["11"]],[,"(\\d{3})(\\d{3,7})","$1 $2",["[12]00|[368]|70[07-9]"],"0$1"],[,"(\\d{2})(\\d{4,8})","$1 $2",["[1245]|7[135]"],"0$1"],[,
  "(\\d{2})(\\d{6,10})","$1 $2",["7"],"0$1"]],[[,"(\\d)(\\d{4,9})","$1 $2",["[2568][1-8]|3(?:0[1-9]|[1-9])|9"],"0$1"],[,"(\\d{3})(\\d{3,7})","$1 $2",["[12]00|[368]|70[07-9]"],"0$1"],[,"(\\d{2})(\\d{4,8})","$1 $2",["[1245]|7[135]"],"0$1"],[,"(\\d{2})(\\d{6,10})","$1 $2",["7"],"0$1"]],[,,,,,,,,,[-1]],1,"1[03-79]|[2-9]",[,,"20(?:2[023]|9[89])\\d{1,6}|(?:60[12]\\d|7099)\\d{4,5}|(?:606|7(?:0[78]|1|3\\d))\\d{7}|(?:[1-3]00|7(?:0[1-5]\\d\\d|5[03-9]))\\d{3,7}"],[,,"20\\d{4,8}|60[12]\\d{5,6}|7(?:099\\d{4,5}|5[03-9]\\d{3,7})|20[2-59]\\d\\d|(?:606|7(?:0[78]|1|3\\d))\\d{7}|(?:10|29|3[09]|70[1-5]\\d)\\d{4,8}",
  ,,,"10112345"],,,[,,,,,,,,,[-1]]],FJ:[,[,,"45\\d{5}|(?:0800\\d|[235-9])\\d{6}",,,,,,,[7,11]],[,,"603\\d{4}|(?:3[0-5]|6[25-7]|8[58])\\d{5}",,,,"3212345",,,[7]],[,,"(?:[279]\\d|45|5[01568]|8[034679])\\d{5}",,,,"7012345",,,[7]],[,,"0800\\d{7}",,,,"08001234567",,,[11]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"FJ",679,"0(?:0|52)",,,,,,"00",,[[,"(\\d{3})(\\d{4})","$1 $2",["[235-9]|45"]],[,"(\\d{4})(\\d{3})(\\d{4})","$1 $2 $3",["0"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,
  [-1]],,,[,,,,,,,,,[-1]]],FK:[,[,,"[2-7]\\d{4}",,,,,,,[5]],[,,"[2-47]\\d{4}",,,,"31234"],[,,"[56]\\d{4}",,,,"51234"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"FK",500,"00",,,,,,,,,,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],FM:[,[,,"(?:[39]\\d\\d|820)\\d{4}",,,,,,,[7]],[,,"31(?:00[67]|208|309)\\d\\d|(?:3(?:[2357]0[1-9]|602|804|905)|(?:820|9[2-6]\\d)\\d)\\d{3}",,,,"3201234"],[,,"31(?:00[67]|208|309)\\d\\d|(?:3(?:[2357]0[1-9]|602|804|905)|(?:820|9[2-7]\\d)\\d)\\d{3}",
  ,,,"3501234"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"FM",691,"00",,,,,,,,[[,"(\\d{3})(\\d{4})","$1 $2",["[389]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],FO:[,[,,"(?:[2-8]\\d|90)\\d{4}",,,,,,,[6]],[,,"(?:20|[34]\\d|8[19])\\d{4}",,,,"201234"],[,,"(?:[27][1-9]|5\\d)\\d{4}",,,,"211234"],[,,"80[257-9]\\d{3}",,,,"802123"],[,,"90(?:[13-5][15-7]|2[125-7]|9\\d)\\d\\d",,,,"901123"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"(?:6[0-36]|88)\\d{4}",
  ,,,"601234"],"FO",298,"00",,,,"(10(?:01|[12]0|88))",,,,[[,"(\\d{6})","$1",["[2-9]"],,"$CC $1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],FR:[,[,,"[1-9]\\d{8}",,,,,,,[9]],[,,"(?:[1-35]\\d|4[1-9])\\d{7}",,,,"123456789"],[,,"700\\d{6}|(?:6\\d|7[3-9])\\d{7}",,,,"612345678"],[,,"80[0-5]\\d{6}",,,,"801234567"],[,,"836(?:0[0-36-9]|[1-9]\\d)\\d{4}|8(?:1[2-9]|2[2-47-9]|3[0-57-9]|[569]\\d|8[0-35-9])\\d{6}",,,,"891123456"],[,,"8(?:1[01]|2[0156]|84)\\d{6}",,,,"884012345"],[,,,,,,
  ,,,[-1]],[,,"9\\d{8}",,,,"912345678"],"FR",33,"00","0",,,"0",,,,[[,"(\\d{4})","$1",["10"]],[,"(\\d{3})(\\d{3})","$1 $2",["1"]],[,"(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["8"],"0 $1"],[,"(\\d)(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4 $5",["[1-79]"],"0$1"]],[[,"(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["8"],"0 $1"],[,"(\\d)(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4 $5",["[1-79]"],"0$1"]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"80[6-9]\\d{6}",,,,"806123456"],,,[,,,,,,,,,[-1]]],
  GA:[,[,,"(?:[067]\\d|11)\\d{6}|[2-7]\\d{6}",,,,,,,[7,8]],[,,"[01]1\\d{6}",,,,"01441234",,,[8]],[,,"(?:0[2-7]|6[256]|7[47])\\d{6}|[2-7]\\d{6}",,,,"06031234"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"GA",241,"00",,,,"0(11\\d{6}|6[256]\\d{6}|7[47]\\d{6})","$1",,,[[,"(\\d)(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[2-7]"],"0$1"],[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["11|[67]"],"0$1"],[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["0"]]],,[,,,,
  ,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],GB:[,[,,"[1-357-9]\\d{9}|[18]\\d{8}|8\\d{6}",,,,,,,[7,9,10],[4,5,6,8]],[,,"(?:1(?:1(?:3(?:[0-58]\\d\\d|73[03])|(?:4[0-5]|5[0-26-9]|6[0-4]|[78][0-49])\\d\\d)|2(?:(?:0[024-9]|2[3-9]|3[3-79]|4[1-689]|[58][02-9]|6[0-47-9]|7[013-9]|9\\d)\\d\\d|1(?:[0-7]\\d\\d|8(?:0\\d|20)))|(?:3(?:0\\d|1[0-8]|[25][02-9]|3[02-579]|[468][0-46-9]|7[1-35-79]|9[2-578])|4(?:0[03-9]|[137]\\d|[28][02-57-9]|4[02-69]|5[0-8]|[69][0-79])|5(?:0[1-35-9]|[16]\\d|2[024-9]|3[015689]|4[02-9]|5[03-9]|7[0-35-9]|8[0-468]|9[0-57-9])|6(?:0[034689]|1\\d|2[0-35689]|[38][013-9]|4[1-467]|5[0-69]|6[13-9]|7[0-8]|9[0-24578])|7(?:0[0246-9]|2\\d|3[0236-8]|4[03-9]|5[0-46-9]|6[013-9]|7[0-35-9]|8[024-9]|9[02-9])|8(?:0[35-9]|2[1-57-9]|3[02-578]|4[0-578]|5[124-9]|6[2-69]|7\\d|8[02-9]|9[02569])|9(?:0[02-589]|[18]\\d|2[02-689]|3[1-57-9]|4[2-9]|5[0-579]|6[2-47-9]|7[0-24578]|9[2-57]))\\d\\d)|2(?:0[013478]|3[0189]|4[017]|8[0-46-9]|9[0-2])\\d{3})\\d{4}|1(?:2(?:0(?:46[1-4]|87[2-9])|545[1-79]|76(?:2\\d|3[1-8]|6[1-6])|9(?:7(?:2[0-4]|3[2-5])|8(?:2[2-8]|7[0-47-9]|8[3-5])))|3(?:6(?:38[2-5]|47[23])|8(?:47[04-9]|64[0157-9]))|4(?:044[1-7]|20(?:2[23]|8\\d)|6(?:0(?:30|5[2-57]|6[1-8]|7[2-8])|140)|8(?:052|87[1-3]))|5(?:2(?:4(?:3[2-79]|6\\d)|76\\d)|6(?:26[06-9]|686))|6(?:06(?:4\\d|7[4-79])|295[5-7]|35[34]\\d|47(?:24|61)|59(?:5[08]|6[67]|74)|9(?:55[0-4]|77[23]))|7(?:26(?:6[13-9]|7[0-7])|(?:442|688)\\d|50(?:2[0-3]|[3-68]2|76))|8(?:27[56]\\d|37(?:5[2-5]|8[239])|843[2-58])|9(?:0(?:0(?:6[1-8]|85)|52\\d)|3583|4(?:66[1-8]|9(?:2[01]|81))|63(?:23|3[1-4])|9561))\\d{3}",
  ,,,"1212345678",,,[9,10],[4,5,6,7,8]],[,,"7(?:457[0-57-9]|700[01]|911[028])\\d{5}|7(?:[1-3]\\d\\d|4(?:[0-46-9]\\d|5[0-689])|5(?:0[0-8]|[13-9]\\d|2[0-35-9])|7(?:0[1-9]|[1-7]\\d|8[02-9]|9[0-689])|8(?:[014-9]\\d|[23][0-8])|9(?:[024-9]\\d|1[02-9]|3[0-689]))\\d{6}",,,,"7400123456",,,[10]],[,,"80[08]\\d{7}|800\\d{6}|8001111",,,,"8001234567"],[,,"(?:8(?:4[2-5]|7[0-3])|9(?:[01]\\d|8[2-49]))\\d{7}|845464\\d",,,,"9012345678",,,[7,10]],[,,,,,,,,,[-1]],[,,"70\\d{8}",,,,"7012345678",,,[10]],[,,"56\\d{8}",,,,"5612345678",
  ,,[10]],"GB",44,"00","0"," x",,"0",,,,[[,"(\\d{3})(\\d{4})","$1 $2",["800","8001","80011","800111","8001111"],"0$1"],[,"(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3",["845","8454","84546","845464"],"0$1"],[,"(\\d{3})(\\d{6})","$1 $2",["800"],"0$1"],[,"(\\d{5})(\\d{4,5})","$1 $2",["1(?:38|5[23]|69|76|94)","1(?:(?:38|69)7|5(?:24|39)|768|946)","1(?:3873|5(?:242|39[4-6])|(?:697|768)[347]|9467)"],"0$1"],[,"(\\d{4})(\\d{5,6})","$1 $2",["1(?:[2-69][02-9]|[78])"],"0$1"],[,"(\\d{2})(\\d{4})(\\d{4})","$1 $2 $3",["[25]|7(?:0|6[02-9])",
  "[25]|7(?:0|6(?:[03-9]|2[356]))"],"0$1"],[,"(\\d{4})(\\d{6})","$1 $2",["7"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["[1389]"],"0$1"]],,[,,"76(?:0[0-2]|2[356]|34|4[0134]|5[49]|6[0-369]|77|81|9[39])\\d{6}",,,,"7640123456",,,[10]],1,,[,,,,,,,,,[-1]],[,,"(?:3[0347]|55)\\d{8}",,,,"5512345678",,,[10]],,,[,,,,,,,,,[-1]]],GD:[,[,,"(?:473|[58]\\d\\d|900)\\d{7}",,,,,,,[10],[7]],[,,"473(?:2(?:3[0-2]|69)|3(?:2[89]|86)|4(?:[06]8|3[5-9]|4[0-49]|5[5-79]|73|90)|63[68]|7(?:58|84)|800|938)\\d{4}",,,,"4732691234",
  ,,,[7]],[,,"473(?:4(?:0[2-79]|1[04-9]|2[0-5]|58)|5(?:2[01]|3[3-8])|901)\\d{4}",,,,"4734031234",,,,[7]],[,,"8(?:00|33|44|55|66|77|88)[2-9]\\d{6}",,,,"8002123456"],[,,"900[2-9]\\d{6}",,,,"9002123456"],[,,,,,,,,,[-1]],[,,"52(?:35(?:[02-46-9]\\d|1[02-9]|5[0-46-9])|45(?:[034]\\d|1[02-9]|2[024-9]|5[0-46-9]))\\d{4}|52(?:3[2-46-9]|4[2-4])(?:[02-9]\\d|1[02-9])\\d{4}|5(?:00|2[12]|33|44|66|77|88)[2-9]\\d{6}",,,,"5002345678"],[,,,,,,,,,[-1]],"GD",1,"011","1",,,"1|([2-9]\\d{6})$","473$1",,,,,[,,,,,,,,,[-1]],,
  "473",[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],GE:[,[,,"(?:[3-57]\\d\\d|800)\\d{6}",,,,,,,[9],[6,7]],[,,"(?:3(?:[256]\\d|4[124-9]|7[0-4])|4(?:1\\d|2[2-7]|3[1-79]|4[2-8]|7[239]|9[1-7]))\\d{6}",,,,"322123456",,,,[6,7]],[,,"5(?:0(?:0(?:0\\d|50)\\d|555[5-9])|(?:111\\d|8(?:58[89]|888))\\d|(?:2222|3333)[0-4]|52(?:00\\d|22[0-4])|75(?:00\\d|7(?:7[7-9]|8[01])))\\d{3}|(?:5(?:[14]4|5[0157-9]|68|7[0147-9]|9[1-35-9])|790)\\d{6}",,,,"555123456"],[,,"800\\d{6}",,,,"800123456"],[,,,,,,,,,[-1]],[,,,,,,,
  ,,[-1]],[,,,,,,,,,[-1]],[,,"70[67]\\d{6}",,,,"706123456"],"GE",995,"00","0",,,"0",,,,[[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["70"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3 $4",["32"],"0$1"],[,"(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[57]"]],[,"(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[348]"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,"70[67]\\d{6}"],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],GF:[,[,,"(?:[56]94|976)\\d{6}",,,,,,,[9]],[,,"594(?:[023]\\d|1[01]|4[03-9]|5[6-9]|6[0-3]|80|9[014])\\d{4}",
  ,,,"594101234"],[,,"694(?:[0-249]\\d|3[0-48])\\d{4}",,,,"694201234"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"976\\d{6}",,,,"976012345"],"GF",594,"00","0",,,"0",,,,[[,"(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[569]"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],GG:[,[,,"(?:1481|[357-9]\\d{3})\\d{6}|8\\d{6}(?:\\d{2})?",,,,,,,[7,9,10],[6]],[,,"1481[25-9]\\d{5}",,,,"1481256789",,,[10],[6]],[,,"7(?:(?:781|839)\\d|911[17])\\d{5}",,,,
  "7781123456",,,[10]],[,,"80[08]\\d{7}|800\\d{6}|8001111",,,,"8001234567"],[,,"(?:8(?:4[2-5]|7[0-3])|9(?:[01]\\d|8[0-3]))\\d{7}|845464\\d",,,,"9012345678",,,[7,10]],[,,,,,,,,,[-1]],[,,"70\\d{8}",,,,"7012345678",,,[10]],[,,"56\\d{8}",,,,"5612345678",,,[10]],"GG",44,"00","0",,,"0|([25-9]\\d{5})$","1481$1",,,,,[,,"76(?:0[0-2]|2[356]|34|4[0134]|5[49]|6[0-369]|77|81|9[39])\\d{6}",,,,"7640123456",,,[10]],,,[,,,,,,,,,[-1]],[,,"(?:3[0347]|55)\\d{8}",,,,"5512345678",,,[10]],,,[,,,,,,,,,[-1]]],GH:[,[,,"(?:[235]\\d{3}|800)\\d{5}",
  ,,,,,,[8,9],[7]],[,,"3082[0-5]\\d{4}|3(?:0(?:[237]\\d|8[01])|[167](?:2[0-6]|7\\d|80)|2(?:2[0-5]|7\\d|80)|3(?:2[0-3]|7\\d|80)|4(?:2[013-9]|3[01]|7\\d|80)|5(?:2[0-7]|7\\d|80)|8(?:2[0-2]|7\\d|80)|9(?:[28]0|7\\d))\\d{5}",,,,"302345678",,,[9],[7]],[,,"(?:2[0346-8]\\d|5(?:[0457]\\d|6[01]|9[1-6]))\\d{6}",,,,"231234567",,,[9]],[,,"800\\d{5}",,,,"80012345",,,[8]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"GH",233,"00","0",,,"0",,,,[[,"(\\d{3})(\\d{4})","$1 $2",["[237]|8[0-2]"]],[,"(\\d{3})(\\d{5})",
  "$1 $2",["8"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["[235]"],"0$1"]],[[,"(\\d{3})(\\d{5})","$1 $2",["8"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["[235]"],"0$1"]],[,,,,,,,,,[-1]],,,[,,"800\\d{5}",,,,,,,[8]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],GI:[,[,,"[256]\\d{7}",,,,,,,[8]],[,,"21(?:6[24-7]\\d|90[0-2])\\d{3}|2(?:00|2[25])\\d{5}",,,,"20012345"],[,,"(?:5[146-8]\\d|6(?:06|29))\\d{5}",,,,"57123456"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"GI",
  350,"00",,,,,,,,[[,"(\\d{3})(\\d{5})","$1 $2",["2"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],GL:[,[,,"(?:19|[2-689]\\d)\\d{4}",,,,,,,[6]],[,,"(?:19|3[1-7]|6[14689]|8[14-79]|9\\d)\\d{4}",,,,"321000"],[,,"[245]\\d{5}",,,,"221234"],[,,"80\\d{4}",,,,"801234"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"3[89]\\d{4}",,,,"381234"],"GL",299,"00",,,,,,,,[[,"(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3",["19|[2-689]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,
  ,,,,,,[-1]]],GM:[,[,,"[2-9]\\d{6}",,,,,,,[7]],[,,"(?:4(?:[23]\\d\\d|4(?:1[024679]|[6-9]\\d))|5(?:5(?:3\\d|4[0-7])|6[67]\\d|7(?:1[04]|2[035]|3[58]|48))|8\\d{3})\\d{3}",,,,"5661234"],[,,"(?:[23679]\\d|5[0-389])\\d{5}",,,,"3012345"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"GM",220,"00",,,,,,,,[[,"(\\d{3})(\\d{4})","$1 $2",["[2-9]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],GN:[,[,,"722\\d{6}|(?:3|6\\d)\\d{7}",,,,,,,[8,9]],[,,"3(?:0(?:24|3[12]|4[1-35-7]|5[13]|6[189]|[78]1|9[1478])|1\\d\\d)\\d{4}",
  ,,,"30241234",,,[8]],[,,"6[02356]\\d{7}",,,,"601123456",,,[9]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"722\\d{6}",,,,"722123456",,,[9]],"GN",224,"00",,,,,,,,[[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["3"]],[,"(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[67]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],GP:[,[,,"(?:590|69\\d|976)\\d{6}",,,,,,,[9]],[,,"590(?:0[1-68]|1[0-2]|2[0-68]|3[1289]|4[0-24-9]|5[3-579]|6[0189]|7[08]|8[0-689]|9\\d)\\d{4}",
  ,,,"590201234"],[,,"69(?:0\\d\\d|1(?:2[29]|3[0-5]))\\d{4}",,,,"690001234"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"976[01]\\d{5}",,,,"976012345"],"GP",590,"00","0",,,"0",,,,[[,"(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[569]"],"0$1"]],,[,,,,,,,,,[-1]],1,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],GQ:[,[,,"222\\d{6}|(?:3\\d|55|[89]0)\\d{7}",,,,,,,[9]],[,,"33[0-24-9]\\d[46]\\d{4}|3(?:33|5\\d)\\d[7-9]\\d{4}",,,,"333091234"],[,,"(?:222|55[015])\\d{6}",,,,"222123456"],
  [,,"80\\d[1-9]\\d{5}",,,,"800123456"],[,,"90\\d[1-9]\\d{5}",,,,"900123456"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"GQ",240,"00",,,,,,,,[[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[235]"]],[,"(\\d{3})(\\d{6})","$1 $2",["[89]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],GR:[,[,,"5005000\\d{3}|(?:[2689]\\d|70)\\d{8}",,,,,,,[10]],[,,"2(?:1\\d\\d|2(?:2[1-46-9]|[36][1-8]|4[1-7]|5[1-4]|7[1-5]|[89][1-9])|3(?:1\\d|2[1-57]|[35][1-3]|4[13]|7[1-7]|8[124-6]|9[1-79])|4(?:1\\d|2[1-8]|3[1-4]|4[13-5]|6[1-578]|9[1-5])|5(?:1\\d|[29][1-4]|3[1-5]|4[124]|5[1-6])|6(?:1\\d|[269][1-6]|3[1245]|4[1-7]|5[13-9]|7[14]|8[1-5])|7(?:1\\d|2[1-5]|3[1-6]|4[1-7]|5[1-57]|6[135]|9[125-7])|8(?:1\\d|2[1-5]|[34][1-4]|9[1-57]))\\d{6}",
  ,,,"2123456789"],[,,"68[57-9]\\d{7}|(?:69|94)\\d{8}",,,,"6912345678"],[,,"800\\d{7}",,,,"8001234567"],[,,"90[19]\\d{7}",,,,"9091234567"],[,,"8(?:0[16]|12|25)\\d{7}",,,,"8011234567"],[,,"70\\d{8}",,,,"7012345678"],[,,,,,,,,,[-1]],"GR",30,"00",,,,,,,,[[,"(\\d{2})(\\d{4})(\\d{4})","$1 $2 $3",["21|7"]],[,"(\\d{4})(\\d{6})","$1 $2",["2(?:2|3[2-57-9]|4[2-469]|5[2-59]|6[2-9]|7[2-69]|8[2-49])|5"]],[,"(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["[2689]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"5005000\\d{3}",,
  ,,"5005000123"],,,[,,,,,,,,,[-1]]],GT:[,[,,"(?:1\\d{3}|[2-7])\\d{7}",,,,,,,[8,11]],[,,"[267][2-9]\\d{6}",,,,"22456789",,,[8]],[,,"[3-5]\\d{7}",,,,"51234567",,,[8]],[,,"18[01]\\d{8}",,,,"18001112222",,,[11]],[,,"19\\d{9}",,,,"19001112222",,,[11]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"GT",502,"00",,,,,,,,[[,"(\\d{4})(\\d{4})","$1 $2",["[2-7]"]],[,"(\\d{4})(\\d{3})(\\d{4})","$1 $2 $3",["1"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],GU:[,[,,"(?:[58]\\d\\d|671|900)\\d{7}",
  ,,,,,,[10],[7]],[,,"671(?:3(?:00|3[39]|4[349]|55|6[26])|4(?:00|56|7[1-9]|8[0236-9])|5(?:55|6[2-5]|88)|6(?:3[2-578]|4[24-9]|5[34]|78|8[235-9])|7(?:[0479]7|2[0167]|3[45]|8[7-9])|8(?:[2-57-9]8|6[48])|9(?:2[29]|6[79]|7[1279]|8[7-9]|9[78]))\\d{4}",,,,"6713001234",,,,[7]],[,,"671(?:3(?:00|3[39]|4[349]|55|6[26])|4(?:00|56|7[1-9]|8[0236-9])|5(?:55|6[2-5]|88)|6(?:3[2-578]|4[24-9]|5[34]|78|8[235-9])|7(?:[0479]7|2[0167]|3[45]|8[7-9])|8(?:[2-57-9]8|6[48])|9(?:2[29]|6[79]|7[1279]|8[7-9]|9[78]))\\d{4}",,,,"6713001234",
  ,,,[7]],[,,"8(?:00|33|44|55|66|77|88)[2-9]\\d{6}",,,,"8002123456"],[,,"900[2-9]\\d{6}",,,,"9002123456"],[,,,,,,,,,[-1]],[,,"52(?:35(?:[02-46-9]\\d|1[02-9]|5[0-46-9])|45(?:[034]\\d|1[02-9]|2[024-9]|5[0-46-9]))\\d{4}|52(?:3[2-46-9]|4[2-4])(?:[02-9]\\d|1[02-9])\\d{4}|5(?:00|2[12]|33|44|66|77|88)[2-9]\\d{6}",,,,"5002345678"],[,,,,,,,,,[-1]],"GU",1,"011","1",,,"1|([3-9]\\d{6})$","671$1",,1,,,[,,,,,,,,,[-1]],,"671",[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],GW:[,[,,"[49]\\d{8}|4\\d{6}",,,,,,,[7,
  9]],[,,"443\\d{6}",,,,"443201234",,,[9]],[,,"9(?:5\\d|6[569]|77)\\d{6}",,,,"955012345",,,[9]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"40\\d{5}",,,,"4012345",,,[7]],"GW",245,"00",,,,,,,,[[,"(\\d{3})(\\d{4})","$1 $2",["40"]],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[49]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],GY:[,[,,"(?:862\\d|9008)\\d{3}|(?:[2-46]\\d|77)\\d{5}",,,,,,,[7]],[,,"(?:2(?:1[6-9]|2[0-35-9]|3[1-4]|5[3-9]|6\\d|7[0-24-79])|3(?:2[25-9]|3\\d)|4(?:4[0-24]|5[56])|77[1-57])\\d{4}",
  ,,,"2201234"],[,,"6\\d{6}",,,,"6091234"],[,,"(?:289|862)\\d{4}",,,,"2891234"],[,,"9008\\d{3}",,,,"9008123"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"GY",592,"001",,,,,,,,[[,"(\\d{3})(\\d{4})","$1 $2",["[2-46-9]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],HK:[,[,,"8[0-46-9]\\d{6,7}|9\\d{4}(?:\\d(?:\\d(?:\\d{4})?)?)?|(?:[235-79]\\d|46)\\d{6}",,,,,,,[5,6,7,8,9,11]],[,,"(?:384[0-5]|58(?:0[1-8]|1[2-9]))\\d{4}|(?:2(?:[13-9]\\d|2[013-9])|3(?:[1569][0-24-9]|4[0-246-9]|7[0-24-69]|89))\\d{5}",
  ,,,"21234567",,,[8]],[,,"(?:46(?:[01][0-6]|4[0-57-9])|5730|(?:626|848)[01]|707[1-5]|929[03-9])\\d{4}|(?:5(?:[1-59][0-46-9]|6[0-4689]|7[0-2469])|6(?:0[1-9]|[13-59]\\d|[268][0-57-9]|7[0-79])|9(?:0[1-9]|1[02-9]|[2358][0-8]|[467]\\d))\\d{5}",,,,"51234567",,,[8]],[,,"800\\d{6}",,,,"800123456",,,[9]],[,,"900(?:[0-24-9]\\d{7}|3\\d{1,4})",,,,"90012345678",,,[5,6,7,8,11]],[,,,,,,,,,[-1]],[,,"8(?:1[0-4679]\\d|2(?:[0-36]\\d|7[0-4])|3(?:[034]\\d|2[09]|70))\\d{4}",,,,"81123456",,,[8]],[,,,,,,,,,[-1]],"HK",852,
  "00(?:30|5[09]|[126-9]?)",,,,,,"00",,[[,"(\\d{3})(\\d{2,5})","$1 $2",["900","9003"]],[,"(\\d{4})(\\d{4})","$1 $2",["[2-7]|8[1-4]|9(?:0[1-9]|[1-8])"]],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["8"]],[,"(\\d{3})(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3 $4",["9"]]],,[,,"7(?:1(?:0[0-38]|1[0-3679]|3[013]|69|9[0136])|2(?:[02389]\\d|1[18]|7[27-9])|3(?:[0-38]\\d|7[0-369]|9[2357-9])|47\\d|5(?:[178]\\d|5[0-5])|6(?:0[0-7]|2[236-9]|[35]\\d)|7(?:[27]\\d|8[7-9])|8(?:[23689]\\d|7[1-9])|9(?:[025]\\d|6[0-246-8]|7[0-36-9]|8[238]))\\d{4}",
  ,,,"71123456",,,[8]],,,[,,,,,,,,,[-1]],[,,"30(?:0[1-9]|[15-7]\\d|2[047]|89)\\d{4}",,,,"30161234",,,[8]],,,[,,,,,,,,,[-1]]],HN:[,[,,"8\\d{10}|[237-9]\\d{7}",,,,,,,[8,11]],[,,"2(?:2(?:0[0139]|1[1-36]|[23]\\d|4[04-6]|5[57]|6[24]|7[0135689]|8[01346-9]|9[0-2])|4(?:07|2[3-59]|3[13-689]|4[0-68]|5[1-35])|5(?:0[78]|16|4[03-5]|5\\d|6[014-6]|74|80)|6(?:[056]\\d|17|2[07]|3[04]|4[0-378]|[78][0-8]|9[01])|7(?:6[46-9]|7[02-9]|8[034]|91)|8(?:79|8[0-357-9]|9[1-57-9]))\\d{4}",,,,"22123456",,,[8]],[,,"[37-9]\\d{7}",
  ,,,"91234567",,,[8]],[,,"8002\\d{7}",,,,"80021234567",,,[11]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"HN",504,"00",,,,,,,,[[,"(\\d{4})(\\d{4})","$1-$2",["[237-9]"]],[,"(\\d{3})(\\d{4})(\\d{4})","$1 $2 $3",["8"]]],[[,"(\\d{4})(\\d{4})","$1-$2",["[237-9]"]]],[,,,,,,,,,[-1]],,,[,,"8002\\d{7}",,,,,,,[11]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],HR:[,[,,"(?:[24-69]\\d|3[0-79])\\d{7}|80\\d{5,7}|[1-79]\\d{7}|6\\d{5,6}",,,,,,,[6,7,8,9]],[,,"1\\d{7}|(?:2[0-3]|3[1-5]|4[02-47-9]|5[1-3])\\d{6,7}",
  ,,,"12345678",,,[8,9],[6,7]],[,,"9(?:751\\d{5}|8\\d{6,7})|9(?:0[1-9]|[1259]\\d|7[0679])\\d{6}",,,,"921234567",,,[8,9]],[,,"80[01]\\d{4,6}",,,,"800123456",,,[7,8,9]],[,,"6[01459]\\d{6}|6[01]\\d{4,5}",,,,"611234",,,[6,7,8]],[,,,,,,,,,[-1]],[,,"7[45]\\d{6}",,,,"74123456",,,[8]],[,,,,,,,,,[-1]],"HR",385,"00","0",,,"0",,,,[[,"(\\d{2})(\\d{2})(\\d{2,3})","$1 $2 $3",["6[01]"],"0$1"],[,"(\\d{3})(\\d{2})(\\d{2,3})","$1 $2 $3",["8"],"0$1"],[,"(\\d)(\\d{4})(\\d{3})","$1 $2 $3",["1"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{3,4})",
  "$1 $2 $3",["[67]"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{3,4})","$1 $2 $3",["9"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{3,4})","$1 $2 $3",["[2-5]"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["8"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"62\\d{6,7}|72\\d{6}",,,,"62123456",,,[8,9]],,,[,,,,,,,,,[-1]]],HT:[,[,,"[2-489]\\d{7}",,,,,,,[8]],[,,"2(?:2\\d|5[1-5]|81|9[149])\\d{5}",,,,"22453300"],[,,"[34]\\d{7}",,,,"34101234"],[,,"8\\d{7}",,,,"80012345"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"9(?:[67][0-4]|8[0-3589]|9\\d)\\d{5}",
  ,,,"98901234"],"HT",509,"00",,,,,,,,[[,"(\\d{2})(\\d{2})(\\d{4})","$1 $2 $3",["[2-489]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],HU:[,[,,"[2357]\\d{8}|[1-9]\\d{7}",,,,,,,[8,9],[6,7]],[,,"(?:1\\d|[27][2-9]|3[2-7]|4[24-9]|5[2-79]|6[23689]|8[2-57-9]|9[2-69])\\d{6}",,,,"12345678",,,[8],[6,7]],[,,"(?:[257]0|3[01])\\d{7}",,,,"201234567",,,[9]],[,,"[48]0\\d{6}",,,,"80123456",,,[8]],[,,"9[01]\\d{6}",,,,"90123456",,,[8]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"21\\d{7}",,,,"211234567",
  ,,[9]],"HU",36,"00","06",,,"06",,,,[[,"(\\d)(\\d{3})(\\d{4})","$1 $2 $3",["1"],"(06 $1)"],[,"(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["[27][2-9]|3[2-7]|4[24-9]|5[2-79]|6|8[2-57-9]|9[2-69]"],"(06 $1)"],[,"(\\d{2})(\\d{3})(\\d{3,4})","$1 $2 $3",["[2-57-9]"],"06 $1"]],,[,,,,,,,,,[-1]],,,[,,"[48]0\\d{6}",,,,,,,[8]],[,,"38\\d{7}",,,,"381234567",,,[9]],,,[,,,,,,,,,[-1]]],ID:[,[,,"(?:(?:007803|8\\d{4})\\d|[1-36])\\d{6}|[1-9]\\d{8,10}|[2-9]\\d{7}",,,,,,,[7,8,9,10,11,12,13],[5,6]],[,,"2[124]\\d{7,8}|619\\d{8}|2(?:1(?:14|500)|2\\d{3})\\d{3}|61\\d{5,8}|(?:2(?:[35][1-4]|6[0-8]|7[1-6]|8\\d|9[1-8])|3(?:1|[25][1-8]|3[1-68]|4[1-3]|6[1-3568]|7[0-469]|8\\d)|4(?:0[1-589]|1[01347-9]|2[0-36-8]|3[0-24-68]|43|5[1-378]|6[1-5]|7[134]|8[1245])|5(?:1[1-35-9]|2[25-8]|3[124-9]|4[1-3589]|5[1-46]|6[1-8])|6(?:[25]\\d|3[1-69]|4[1-6])|7(?:02|[125][1-9]|[36]\\d|4[1-8]|7[0-36-9])|9(?:0[12]|1[013-8]|2[0-479]|5[125-8]|6[23679]|7[159]|8[01346]))\\d{5,8}",
  ,,,"218350123",,,[7,8,9,10,11],[5,6]],[,,"8[1-35-9]\\d{7,10}",,,,"812345678",,,[9,10,11,12]],[,,"007803\\d{7}|(?:177\\d|800)\\d{5,7}",,,,"8001234567",,,[8,9,10,11,13]],[,,"809\\d{7}",,,,"8091234567",,,[10]],[,,"804\\d{7}",,,,"8041234567",,,[10]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"ID",62,"00[189]","0",,,"0",,,,[[,"(\\d)(\\d{3})(\\d{3})","$1 $2 $3",["15"]],[,"(\\d{2})(\\d{5,9})","$1 $2",["2[124]|[36]1"],"(0$1)"],[,"(\\d{3})(\\d{5,7})","$1 $2",["800"],"0$1"],[,"(\\d{3})(\\d{5,8})","$1 $2",["[2-79]"],"(0$1)"],
  [,"(\\d{3})(\\d{3,4})(\\d{3})","$1-$2-$3",["8[1-35-9]"],"0$1"],[,"(\\d{3})(\\d{6,8})","$1 $2",["1"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["804"],"0$1"],[,"(\\d{3})(\\d)(\\d{3})(\\d{3})","$1 $2 $3 $4",["80"],"0$1"],[,"(\\d{3})(\\d{4})(\\d{4,5})","$1-$2-$3",["8"],"0$1"],[,"(\\d{2})(\\d{4})(\\d{3})(\\d{4})","$1 $2 $3 $4",["0"]]],[[,"(\\d)(\\d{3})(\\d{3})","$1 $2 $3",["15"]],[,"(\\d{2})(\\d{5,9})","$1 $2",["2[124]|[36]1"],"(0$1)"],[,"(\\d{3})(\\d{5,7})","$1 $2",["800"],"0$1"],[,"(\\d{3})(\\d{5,8})",
  "$1 $2",["[2-79]"],"(0$1)"],[,"(\\d{3})(\\d{3,4})(\\d{3})","$1-$2-$3",["8[1-35-9]"],"0$1"],[,"(\\d{3})(\\d{6,8})","$1 $2",["1"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["804"],"0$1"],[,"(\\d{3})(\\d)(\\d{3})(\\d{3})","$1 $2 $3 $4",["80"],"0$1"],[,"(\\d{3})(\\d{4})(\\d{4,5})","$1-$2-$3",["8"],"0$1"]],[,,,,,,,,,[-1]],,,[,,"(?:007803\\d|8071)\\d{6}",,,,,,,[10,13]],[,,"(?:1500|8071\\d{3})\\d{3}",,,,"8071123456",,,[7,10]],,,[,,,,,,,,,[-1]]],IE:[,[,,"(?:1\\d|[2569])\\d{6,8}|4\\d{6,9}|7\\d{8}|8\\d{8,9}",
  ,,,,,,[7,8,9,10],[5,6]],[,,"(?:1\\d|21)\\d{6,7}|(?:2[24-9]|4(?:0[24]|5\\d|7)|5(?:0[45]|1\\d|8)|6(?:1\\d|[237-9])|9(?:1\\d|[35-9]))\\d{5}|(?:23|4(?:[1-469]|8\\d)|5[23679]|6[4-6]|7[14]|9[04])\\d{7}",,,,"2212345",,,,[5,6]],[,,"8(?:22|[35-9]\\d)\\d{6}",,,,"850123456",,,[9]],[,,"1800\\d{6}",,,,"1800123456",,,[10]],[,,"15(?:1[2-8]|[2-8]0|9[089])\\d{6}",,,,"1520123456",,,[10]],[,,"18[59]0\\d{6}",,,,"1850123456",,,[10]],[,,"700\\d{6}",,,,"700123456",,,[9]],[,,"76\\d{7}",,,,"761234567",,,[9]],"IE",353,"00",
  "0",,,"0",,,,[[,"(\\d{2})(\\d{5})","$1 $2",["2[24-9]|47|58|6[237-9]|9[35-9]"],"(0$1)"],[,"(\\d{3})(\\d{5})","$1 $2",["[45]0"],"(0$1)"],[,"(\\d)(\\d{3,4})(\\d{4})","$1 $2 $3",["1"],"(0$1)"],[,"(\\d{2})(\\d{3})(\\d{3,4})","$1 $2 $3",["[2569]|4[1-69]|7[14]"],"(0$1)"],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["70"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["81"],"(0$1)"],[,"(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["[78]"],"0$1"],[,"(\\d{4})(\\d{3})(\\d{3})","$1 $2 $3",["1"]],[,"(\\d{2})(\\d{4})(\\d{4})",
  "$1 $2 $3",["4"],"(0$1)"],[,"(\\d{2})(\\d)(\\d{3})(\\d{4})","$1 $2 $3 $4",["8"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,"18[59]0\\d{6}",,,,,,,[10]],[,,"818\\d{6}",,,,"818123456",,,[9]],,,[,,"88210[1-9]\\d{4}|8(?:[35-79]5\\d\\d|8(?:[013-9]\\d\\d|2(?:[01][1-9]|[2-9]\\d)))\\d{5}",,,,"8551234567",,,[10]]],IL:[,[,,"1\\d{6}(?:\\d{3,5})?|[57]\\d{8}|[1-489]\\d{7}",,,,,,,[7,8,9,10,11,12]],[,,"153\\d{8,9}|29[1-9]\\d{5}|(?:2[0-8]|[3489]\\d)\\d{6}",,,,"21234567",,,[8,11,12],[7]],[,,"5(?:(?:[02368]\\d|[19][2-9]|4[1-9])\\d|5(?:01|1[79]|2[2-8]|3[23]|44|5[05689]|6[6-8]|7[0-267]|8[7-9]|9[1-9]))\\d{5}",
  ,,,"502345678",,,[9]],[,,"1(?:255|80[019]\\d{3})\\d{3}",,,,"1800123456",,,[7,10]],[,,"1212\\d{4}|1(?:200|9(?:0[01]|19))\\d{6}",,,,"1919123456",,,[8,10]],[,,"1700\\d{6}",,,,"1700123456",,,[10]],[,,,,,,,,,[-1]],[,,"78(?:33|55|77|81)\\d{5}|7(?:18|2[23]|3[237]|47|6[58]|7\\d|82|9[235-9])\\d{6}",,,,"771234567",,,[9]],"IL",972,"0(?:0|1[2-9])","0",,,"0",,,,[[,"(\\d{4})(\\d{3})","$1-$2",["125"]],[,"(\\d{4})(\\d{2})(\\d{2})","$1-$2-$3",["121"]],[,"(\\d)(\\d{3})(\\d{4})","$1-$2-$3",["[2-489]"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{4})",
  "$1-$2-$3",["[57]"],"0$1"],[,"(\\d{4})(\\d{3})(\\d{3})","$1-$2-$3",["12"]],[,"(\\d{4})(\\d{6})","$1-$2",["159"]],[,"(\\d)(\\d{3})(\\d{3})(\\d{3})","$1-$2-$3-$4",["1[7-9]"]],[,"(\\d{3})(\\d{1,2})(\\d{3})(\\d{4})","$1-$2 $3-$4",["15"]]],,[,,,,,,,,,[-1]],,,[,,"1700\\d{6}",,,,,,,[10]],[,,"1599\\d{6}",,,,"1599123456",,,[10]],,,[,,"151\\d{8,9}",,,,"15112340000",,,[11,12]]],IM:[,[,,"1624\\d{6}|(?:[3578]\\d|90)\\d{8}",,,,,,,[10],[6]],[,,"1624[5-8]\\d{5}",,,,"1624756789",,,,[6]],[,,"76245[06]\\d{4}|7(?:4576|[59]24\\d|624[0-4689])\\d{5}",
  ,,,"7924123456"],[,,"808162\\d{4}",,,,"8081624567"],[,,"8(?:440[49]06|72299\\d)\\d{3}|(?:8(?:45|70)|90[0167])624\\d{4}",,,,"9016247890"],[,,,,,,,,,[-1]],[,,"70\\d{8}",,,,"7012345678"],[,,"56\\d{8}",,,,"5612345678"],"IM",44,"00","0",,,"0|([5-8]\\d{5})$","1624$1",,,,,[,,,,,,,,,[-1]],,"74576|(?:16|7[56])24",[,,,,,,,,,[-1]],[,,"3440[49]06\\d{3}|(?:3(?:08162|3\\d{4}|45624|7(?:0624|2299))|55\\d{4})\\d{4}",,,,"5512345678"],,,[,,,,,,,,,[-1]]],IN:[,[,,"(?:000800|[2-9]\\d\\d)\\d{7}|1\\d{7,12}",,,,,,,[8,9,10,
  11,12,13],[6,7]],[,,"2717(?:[2-7]\\d|95)\\d{4}|(?:271[0-689]|782[0-6])[2-7]\\d{5}|(?:170[24]|2(?:(?:[02][2-79]|90)\\d|80[13468])|(?:3(?:23|80)|683|79[1-7])\\d|4(?:20[24]|72[2-8])|552[1-7])\\d{6}|(?:11|33|4[04]|80)[2-7]\\d{7}|(?:342|674|788)(?:[0189][2-7]|[2-7]\\d)\\d{5}|(?:1(?:2[0-249]|3[0-25]|4[145]|[59][14]|6[014]|7[1257]|8[01346])|2(?:1[257]|3[013]|4[01]|5[0137]|6[0158]|78|8[1568]|9[14])|3(?:26|4[13]|5[34]|6[01489]|7[02-46]|8[159])|4(?:1[36]|2[1-47]|3[15]|5[12]|6[0-26-9]|7[014-9]|8[013-57]|9[014-7])|5(?:1[025]|22|[36][25]|4[28]|[578]1|9[15])|6(?:12|[2-47]1|5[17]|6[13]|80)|7(?:12|2[14]|3[134]|4[47]|5[15]|[67]1)|8(?:16|2[014]|3[126]|6[136]|7[078]|8[34]|91))[2-7]\\d{6}|(?:1(?:2[35-8]|3[346-9]|4[236-9]|[59][0235-9]|6[235-9]|7[34689]|8[257-9])|2(?:1[134689]|3[24-8]|4[2-8]|5[25689]|6[2-4679]|7[3-79]|8[2-479]|9[235-9])|3(?:01|1[79]|2[1245]|4[5-8]|5[125689]|6[235-7]|7[157-9]|8[2-46-8])|4(?:1[14578]|2[5689]|3[2-467]|5[4-7]|6[35]|73|8[2689]|9[2389])|5(?:[16][146-9]|2[14-8]|3[1346]|4[14-69]|5[46]|7[2-4]|8[2-8]|9[246])|6(?:1[1358]|2[2457]|3[2-4]|4[235-7]|5[2-689]|6[24578]|7[235689]|8[124-6])|7(?:1[013-9]|2[0235-9]|3[2679]|4[1-35689]|5[2-46-9]|[67][02-9]|8[013-7]|9[089])|8(?:1[1357-9]|2[235-8]|3[03-57-9]|4[0-24-9]|5\\d|6[2457-9]|7[1-6]|8[1256]|9[2-4]))\\d[2-7]\\d{5}",
  ,,,"7410410123",,,[10],[6,7,8]],[,,"(?:61279|7(?:887[02-9]|9(?:313|79[07-9]))|8(?:079[04-9]|(?:84|91)7[02-8]))\\d{5}|(?:6(?:12|[2-47]1|5[17]|6[13]|80)[0189]|7(?:1(?:2[0189]|9[0-5])|2(?:[14][017-9]|8[0-59])|3(?:2[5-8]|[34][017-9]|9[016-9])|4(?:1[015-9]|[29][89]|39|8[389])|5(?:[15][017-9]|2[04-9]|9[7-9])|6(?:0[0-47]|1[0-257-9]|2[0-4]|3[19]|5[4589])|70[0289]|88[089]|97[02-8])|8(?:0(?:6[67]|7[02-8])|70[017-9]|84[01489]|91[0-289]))\\d{6}|(?:7(?:31|4[47])|8(?:16|2[014]|3[126]|6[136]|7[78]|83))(?:[0189]\\d|7[02-8])\\d{5}|(?:6(?:[09]\\d|1[04679]|2[03689]|3[05-9]|4[0489]|50|6[069]|7[07]|8[7-9])|7(?:0\\d|2[0235-79]|3[05-8]|40|5[0346-8]|6[6-9]|7[1-9]|8[0-79]|9[089])|8(?:0[01589]|1[0-57-9]|2[235-9]|3[03-57-9]|[45]\\d|6[02457-9]|7[1-69]|8[0-25-9]|9[02-9])|9\\d\\d)\\d{7}|(?:6(?:(?:1[1358]|2[2457]|3[2-4]|4[235-7]|5[2-689]|6[24578]|8[124-6])\\d|7(?:[235689]\\d|4[0189]))|7(?:1(?:[013-8]\\d|9[6-9])|28[6-8]|3(?:2[0-49]|9[2-5])|4(?:1[2-4]|[29][0-7]|3[0-8]|[56]\\d|8[0-24-7])|5(?:2[1-3]|9[0-6])|6(?:0[5689]|2[5-9]|3[02-8]|4\\d|5[0-367])|70[13-7]|881))[0189]\\d{5}",
  ,,,"8123456789",,,[10]],[,,"000800\\d{7}|1(?:600\\d{6}|80(?:0\\d{4,9}|3\\d{9}))",,,,"1800123456"],[,,"186[12]\\d{9}",,,,"1861123456789",,,[13]],[,,"1860\\d{7}",,,,"18603451234",,,[11]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"IN",91,"00","0",,,"0",,,,[[,"(\\d{7})","$1",["575"]],[,"(\\d{8})","$1",["5(?:0|2[23]|3[03]|[67]1|88)","5(?:0|2(?:21|3)|3(?:0|3[23])|616|717|888)","5(?:0|2(?:21|3)|3(?:0|3[23])|616|717|8888)"],,,1],[,"(\\d{4})(\\d{4,5})","$1 $2",["180","1800"],,,1],[,"(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",
  ["140"],,,1],[,"(\\d{2})(\\d{4})(\\d{4})","$1 $2 $3",["11|2[02]|33|4[04]|79[1-7]|80[2-46]","11|2[02]|33|4[04]|79(?:[1-6]|7[19])|80(?:[2-4]|6[0-589])","11|2[02]|33|4[04]|79(?:[124-6]|3(?:[02-9]|1[0-24-9])|7(?:1|9[1-6]))|80(?:[2-4]|6[0-589])"],"0$1",,1],[,"(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["1(?:2[0-249]|3[0-25]|4[145]|[68]|7[1257])|2(?:1[257]|3[013]|4[01]|5[0137]|6[0158]|78|8[1568])|3(?:26|4[1-3]|5[34]|6[01489]|7[02-46]|8[159])|4(?:1[36]|2[1-47]|5[12]|6[0-26-9]|7[0-24-9]|8[013-57]|9[014-7])|5(?:1[025]|22|[36][25]|4[28]|5[12]|[78]1)|6(?:12|[2-4]1|5[17]|6[13]|80)|7(?:12|3[134]|4[47]|61|88)|8(?:16|2[014]|3[126]|6[136]|7[078]|8[34]|91)|(?:43|59|75)[15]|(?:1[59]|29|67|72)[14]",
  "1(?:2[0-24]|3[0-25]|4[145]|[59][14]|6[1-9]|7[1257]|8[1-57-9])|2(?:1[257]|3[013]|4[01]|5[0137]|6[058]|78|8[1568]|9[14])|3(?:26|4[1-3]|5[34]|6[01489]|7[02-46]|8[159])|4(?:1[36]|2[1-47]|3[15]|5[12]|6[0-26-9]|7[0-24-9]|8[013-57]|9[014-7])|5(?:1[025]|22|[36][25]|4[28]|[578]1|9[15])|674|7(?:(?:2[14]|3[34]|5[15])[2-6]|61[346]|88[0-8])|8(?:70[2-6]|84[235-7]|91[3-7])|(?:1(?:29|60|8[06])|261|552|6(?:12|[2-47]1|5[17]|6[13]|80)|7(?:12|31|4[47])|8(?:16|2[014]|3[126]|6[136]|7[78]|83))[2-7]","1(?:2[0-24]|3[0-25]|4[145]|[59][14]|6[1-9]|7[1257]|8[1-57-9])|2(?:1[257]|3[013]|4[01]|5[0137]|6[058]|78|8[1568]|9[14])|3(?:26|4[1-3]|5[34]|6[01489]|7[02-46]|8[159])|4(?:1[36]|2[1-47]|3[15]|5[12]|6[0-26-9]|7[0-24-9]|8[013-57]|9[014-7])|5(?:1[025]|22|[36][25]|4[28]|[578]1|9[15])|6(?:12(?:[2-6]|7[0-8])|74[2-7])|7(?:(?:2[14]|5[15])[2-6]|3171|61[346]|88(?:[2-7]|82))|8(?:70[2-6]|84(?:[2356]|7[19])|91(?:[3-6]|7[19]))|73[134][2-6]|(?:74[47]|8(?:16|2[014]|3[126]|6[136]|7[78]|83))(?:[2-6]|7[19])|(?:1(?:29|60|8[06])|261|552|6(?:[2-4]1|5[17]|6[13]|7(?:1|4[0189])|80)|7(?:12|88[01]))[2-7]"],
  "0$1",,1],[,"(\\d{4})(\\d{3})(\\d{3})","$1 $2 $3",["1(?:[2-479]|5[0235-9])|[2-5]|6(?:1[1358]|2[2457-9]|3[2-5]|4[235-7]|5[2-689]|6[24578]|7[235689]|8[1-6])|7(?:1[013-9]|28|3[129]|4[1-35689]|5[29]|6[02-5]|70)|807","1(?:[2-479]|5[0235-9])|[2-5]|6(?:1[1358]|2(?:[2457]|84|95)|3(?:[2-4]|55)|4[235-7]|5[2-689]|6[24578]|7[235689]|8[1-6])|7(?:1(?:[013-8]|9[6-9])|28[6-8]|3(?:17|2[0-49]|9[2-57])|4(?:1[2-4]|[29][0-7]|3[0-8]|[56]|8[0-24-7])|5(?:2[1-3]|9[0-6])|6(?:0[5689]|2[5-9]|3[02-8]|4|5[0-367])|70[13-7])|807[19]",
  "1(?:[2-479]|5(?:[0236-9]|5[013-9]))|[2-5]|6(?:2(?:84|95)|355|83)|73179|807(?:1|9[1-3])|(?:1552|6(?:1[1358]|2[2457]|3[2-4]|4[235-7]|5[2-689]|6[24578]|7[235689]|8[124-6])\\d|7(?:1(?:[013-8]\\d|9[6-9])|28[6-8]|3(?:2[0-49]|9[2-57])|4(?:1[2-4]|[29][0-7]|3[0-8]|[56]\\d|8[0-24-7])|5(?:2[1-3]|9[0-6])|6(?:0[5689]|2[5-9]|3[02-8]|4\\d|5[0-367])|70[13-7]))[2-7]"],"0$1",,1],[,"(\\d{5})(\\d{5})","$1 $2",["[6-9]"],"0$1",,1],[,"(\\d{4})(\\d{2,4})(\\d{4})","$1 $2 $3",["1(?:6|8[06])","1(?:6|8[06]0)"],,,1],[,"(\\d{3})(\\d{3})(\\d{3})(\\d{4})",
  "$1 $2 $3 $4",["0"]],[,"(\\d{4})(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3 $4",["18"],,,1]],[[,"(\\d{8})","$1",["5(?:0|2[23]|3[03]|[67]1|88)","5(?:0|2(?:21|3)|3(?:0|3[23])|616|717|888)","5(?:0|2(?:21|3)|3(?:0|3[23])|616|717|8888)"],,,1],[,"(\\d{4})(\\d{4,5})","$1 $2",["180","1800"],,,1],[,"(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["140"],,,1],[,"(\\d{2})(\\d{4})(\\d{4})","$1 $2 $3",["11|2[02]|33|4[04]|79[1-7]|80[2-46]","11|2[02]|33|4[04]|79(?:[1-6]|7[19])|80(?:[2-4]|6[0-589])","11|2[02]|33|4[04]|79(?:[124-6]|3(?:[02-9]|1[0-24-9])|7(?:1|9[1-6]))|80(?:[2-4]|6[0-589])"],
  "0$1",,1],[,"(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["1(?:2[0-249]|3[0-25]|4[145]|[68]|7[1257])|2(?:1[257]|3[013]|4[01]|5[0137]|6[0158]|78|8[1568])|3(?:26|4[1-3]|5[34]|6[01489]|7[02-46]|8[159])|4(?:1[36]|2[1-47]|5[12]|6[0-26-9]|7[0-24-9]|8[013-57]|9[014-7])|5(?:1[025]|22|[36][25]|4[28]|5[12]|[78]1)|6(?:12|[2-4]1|5[17]|6[13]|80)|7(?:12|3[134]|4[47]|61|88)|8(?:16|2[014]|3[126]|6[136]|7[078]|8[34]|91)|(?:43|59|75)[15]|(?:1[59]|29|67|72)[14]","1(?:2[0-24]|3[0-25]|4[145]|[59][14]|6[1-9]|7[1257]|8[1-57-9])|2(?:1[257]|3[013]|4[01]|5[0137]|6[058]|78|8[1568]|9[14])|3(?:26|4[1-3]|5[34]|6[01489]|7[02-46]|8[159])|4(?:1[36]|2[1-47]|3[15]|5[12]|6[0-26-9]|7[0-24-9]|8[013-57]|9[014-7])|5(?:1[025]|22|[36][25]|4[28]|[578]1|9[15])|674|7(?:(?:2[14]|3[34]|5[15])[2-6]|61[346]|88[0-8])|8(?:70[2-6]|84[235-7]|91[3-7])|(?:1(?:29|60|8[06])|261|552|6(?:12|[2-47]1|5[17]|6[13]|80)|7(?:12|31|4[47])|8(?:16|2[014]|3[126]|6[136]|7[78]|83))[2-7]",
  "1(?:2[0-24]|3[0-25]|4[145]|[59][14]|6[1-9]|7[1257]|8[1-57-9])|2(?:1[257]|3[013]|4[01]|5[0137]|6[058]|78|8[1568]|9[14])|3(?:26|4[1-3]|5[34]|6[01489]|7[02-46]|8[159])|4(?:1[36]|2[1-47]|3[15]|5[12]|6[0-26-9]|7[0-24-9]|8[013-57]|9[014-7])|5(?:1[025]|22|[36][25]|4[28]|[578]1|9[15])|6(?:12(?:[2-6]|7[0-8])|74[2-7])|7(?:(?:2[14]|5[15])[2-6]|3171|61[346]|88(?:[2-7]|82))|8(?:70[2-6]|84(?:[2356]|7[19])|91(?:[3-6]|7[19]))|73[134][2-6]|(?:74[47]|8(?:16|2[014]|3[126]|6[136]|7[78]|83))(?:[2-6]|7[19])|(?:1(?:29|60|8[06])|261|552|6(?:[2-4]1|5[17]|6[13]|7(?:1|4[0189])|80)|7(?:12|88[01]))[2-7]"],
  "0$1",,1],[,"(\\d{4})(\\d{3})(\\d{3})","$1 $2 $3",["1(?:[2-479]|5[0235-9])|[2-5]|6(?:1[1358]|2[2457-9]|3[2-5]|4[235-7]|5[2-689]|6[24578]|7[235689]|8[1-6])|7(?:1[013-9]|28|3[129]|4[1-35689]|5[29]|6[02-5]|70)|807","1(?:[2-479]|5[0235-9])|[2-5]|6(?:1[1358]|2(?:[2457]|84|95)|3(?:[2-4]|55)|4[235-7]|5[2-689]|6[24578]|7[235689]|8[1-6])|7(?:1(?:[013-8]|9[6-9])|28[6-8]|3(?:17|2[0-49]|9[2-57])|4(?:1[2-4]|[29][0-7]|3[0-8]|[56]|8[0-24-7])|5(?:2[1-3]|9[0-6])|6(?:0[5689]|2[5-9]|3[02-8]|4|5[0-367])|70[13-7])|807[19]",
  "1(?:[2-479]|5(?:[0236-9]|5[013-9]))|[2-5]|6(?:2(?:84|95)|355|83)|73179|807(?:1|9[1-3])|(?:1552|6(?:1[1358]|2[2457]|3[2-4]|4[235-7]|5[2-689]|6[24578]|7[235689]|8[124-6])\\d|7(?:1(?:[013-8]\\d|9[6-9])|28[6-8]|3(?:2[0-49]|9[2-57])|4(?:1[2-4]|[29][0-7]|3[0-8]|[56]\\d|8[0-24-7])|5(?:2[1-3]|9[0-6])|6(?:0[5689]|2[5-9]|3[02-8]|4\\d|5[0-367])|70[13-7]))[2-7]"],"0$1",,1],[,"(\\d{5})(\\d{5})","$1 $2",["[6-9]"],"0$1",,1],[,"(\\d{4})(\\d{2,4})(\\d{4})","$1 $2 $3",["1(?:6|8[06])","1(?:6|8[06]0)"],,,1],[,"(\\d{4})(\\d{3})(\\d{3})(\\d{3})",
  "$1 $2 $3 $4",["18"],,,1]],[,,,,,,,,,[-1]],,,[,,"1(?:600\\d{6}|800\\d{4,9})|(?:000800|18(?:03\\d\\d|6(?:0|[12]\\d\\d)))\\d{7}"],[,,"140\\d{7}",,,,"1409305260",,,[10]],,,[,,,,,,,,,[-1]]],IO:[,[,,"3\\d{6}",,,,,,,[7]],[,,"37\\d{5}",,,,"3709100"],[,,"38\\d{5}",,,,"3801234"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"IO",246,"00",,,,,,,,[[,"(\\d{3})(\\d{4})","$1 $2",["3"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],IQ:[,[,,"(?:1|7\\d\\d)\\d{7}|[2-6]\\d{7,8}",
  ,,,,,,[8,9,10],[6,7]],[,,"1\\d{7}|(?:2[13-5]|3[02367]|4[023]|5[03]|6[026])\\d{6,7}",,,,"12345678",,,[8,9],[6,7]],[,,"7[3-9]\\d{8}",,,,"7912345678",,,[10]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"IQ",964,"00","0",,,"0",,,,[[,"(\\d)(\\d{3})(\\d{4})","$1 $2 $3",["1"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{3,4})","$1 $2 $3",["[2-6]"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["7"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],IR:[,
  [,,"[1-9]\\d{9}|(?:[1-8]\\d\\d|9)\\d{3,4}",,,,,,,[4,5,6,7,10],[8]],[,,"(?:1[137]|2[13-68]|3[1458]|4[145]|5[1468]|6[16]|7[1467]|8[13467])(?:[03-57]\\d{7}|[16]\\d{3}(?:\\d{4})?|[289]\\d{3}(?:\\d(?:\\d{3})?)?)|94(?:000[09]|2(?:121|[2689]0\\d)|30[0-2]\\d|4(?:111|40\\d))\\d{4}",,,,"2123456789",,,[6,7,10],[4,5,8]],[,,"9(?:(?:0(?:[1-35]\\d|44)|(?:[13]\\d|2[0-2])\\d)\\d|9(?:(?:[0-2]\\d|4[45])\\d|5[15]0|8(?:1\\d|88)|9(?:0[013]|1[0134]|21|77|9[6-9])))\\d{5}",,,,"9123456789",,,[10]],[,,,,,,,,,[-1]],[,,,,,,,
  ,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"993\\d{7}",,,,"9932123456",,,[10]],"IR",98,"00","0",,,"0",,,,[[,"(\\d{4,5})","$1",["96"],"0$1"],[,"(\\d{2})(\\d{4,5})","$1 $2",["(?:1[137]|2[13-68]|3[1458]|4[145]|5[1468]|6[16]|7[1467]|8[13467])[12689]"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{3,4})","$1 $2 $3",["9"],"0$1"],[,"(\\d{2})(\\d{4})(\\d{4})","$1 $2 $3",["[1-8]"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,"9(?:4440\\d{5}|6(?:0[12]|2[16-8]|3(?:08|[14]5|[23]|66)|4(?:0|80)|5[01]|6[89]|86|9[19]))",,,,,,,[4,5,10]],[,,"96(?:0[12]|2[16-8]|3(?:08|[14]5|[23]|66)|4(?:0|80)|5[01]|6[89]|86|9[19])",
  ,,,"9601",,,[4,5]],,,[,,,,,,,,,[-1]]],IS:[,[,,"(?:38\\d|[4-9])\\d{6}",,,,,,,[7,9]],[,,"(?:4(?:1[0-24-69]|2[0-7]|[37][0-8]|4[0-245]|5[0-68]|6\\d|8[0-36-8])|5(?:05|[156]\\d|2[02578]|3[0-579]|4[03-7]|7[0-2578]|8[0-35-9]|9[013-689])|872)\\d{4}",,,,"4101234",,,[7]],[,,"(?:38[589]\\d\\d|6(?:1[1-8]|2[0-6]|3[027-9]|4[014679]|5[0159]|6[0-69]|70|8[06-8]|9\\d)|7(?:5[057]|[6-9]\\d)|8(?:2[0-59]|[3-69]\\d|8[28]))\\d{4}",,,,"6111234"],[,,"80[08]\\d{4}",,,,"8001234",,,[7]],[,,"90(?:0\\d|1[5-79]|2[015-79]|3[135-79]|4[125-7]|5[25-79]|7[1-37]|8[0-35-7])\\d{3}",
  ,,,"9001234",,,[7]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"49[0-24-79]\\d{4}",,,,"4921234",,,[7]],"IS",354,"00|1(?:0(?:01|[12]0)|100)",,,,,,"00",,[[,"(\\d{3})(\\d{4})","$1 $2",["[4-9]"]],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["3"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"809\\d{4}",,,,"8091234",,,[7]],,,[,,"(?:689|8(?:7[18]|80)|95[48])\\d{4}",,,,"6891234",,,[7]]],IT:[,[,,"0\\d{5,10}|3[0-8]\\d{7,10}|55\\d{8}|8\\d{5}(?:\\d{2,4})?|(?:1\\d|39)\\d{7,8}",,,,,,,[6,7,8,9,10,11,12]],[,,"0669[0-79]\\d{1,6}|0(?:1(?:[0159]\\d|[27][1-5]|31|4[1-4]|6[1356]|8[2-57])|2\\d\\d|3(?:[0159]\\d|2[1-4]|3[12]|[48][1-6]|6[2-59]|7[1-7])|4(?:[0159]\\d|[23][1-9]|4[245]|6[1-5]|7[1-4]|81)|5(?:[0159]\\d|2[1-5]|3[2-6]|4[1-79]|6[4-6]|7[1-578]|8[3-8])|6(?:[0-57-9]\\d|6[0-8])|7(?:[0159]\\d|2[12]|3[1-7]|4[2-46]|6[13569]|7[13-6]|8[1-59])|8(?:[0159]\\d|2[3-578]|3[1-356]|[6-8][1-5])|9(?:[0159]\\d|[238][1-5]|4[12]|6[1-8]|7[1-6]))\\d{2,7}",
  ,,,"0212345678",,,[6,7,8,9,10,11]],[,,"3[1-9]\\d{8}|3[2-9]\\d{7}",,,,"3123456789",,,[9,10]],[,,"80(?:0\\d{3}|3)\\d{3}",,,,"800123456",,,[6,9]],[,,"(?:0878\\d\\d|89(?:2|4[5-9]\\d))\\d{3}|89[45][0-4]\\d\\d|(?:1(?:44|6[346])|89(?:5[5-9]|9))\\d{6}",,,,"899123456",,,[6,8,9,10]],[,,"84(?:[08]\\d{3}|[17])\\d{3}",,,,"848123456",,,[6,9]],[,,"1(?:78\\d|99)\\d{6}",,,,"1781234567",,,[9,10]],[,,"55\\d{8}",,,,"5512345678",,,[10]],"IT",39,"00",,,,,,,,[[,"(\\d{4,5})","$1",["1(?:0|9[246])","1(?:0|9(?:2[2-9]|[46]))"]],
  [,"(\\d{6})","$1",["1(?:1|92)"]],[,"(\\d{2})(\\d{4,6})","$1 $2",["0[26]"]],[,"(\\d{3})(\\d{3,6})","$1 $2",["0[13-57-9][0159]|8(?:03|4[17]|9[245])","0[13-57-9][0159]|8(?:03|4[17]|9(?:2|[45][0-4]))"]],[,"(\\d{4})(\\d{2,6})","$1 $2",["0(?:[13-579][2-46-8]|8[236-8])"]],[,"(\\d{4})(\\d{4})","$1 $2",["894"]],[,"(\\d{2})(\\d{3,4})(\\d{4})","$1 $2 $3",["0[26]|5"]],[,"(\\d{3})(\\d{3})(\\d{3,4})","$1 $2 $3",["1[4679]|[38]"]],[,"(\\d{3})(\\d{3,4})(\\d{4})","$1 $2 $3",["0[13-57-9][0159]"]],[,"(\\d{2})(\\d{4})(\\d{5})",
  "$1 $2 $3",["0[26]"]],[,"(\\d{4})(\\d{3})(\\d{4})","$1 $2 $3",["0"]],[,"(\\d{3})(\\d{4})(\\d{4,5})","$1 $2 $3",["3"]]],[[,"(\\d{2})(\\d{4,6})","$1 $2",["0[26]"]],[,"(\\d{3})(\\d{3,6})","$1 $2",["0[13-57-9][0159]|8(?:03|4[17]|9[245])","0[13-57-9][0159]|8(?:03|4[17]|9(?:2|[45][0-4]))"]],[,"(\\d{4})(\\d{2,6})","$1 $2",["0(?:[13-579][2-46-8]|8[236-8])"]],[,"(\\d{4})(\\d{4})","$1 $2",["894"]],[,"(\\d{2})(\\d{3,4})(\\d{4})","$1 $2 $3",["0[26]|5"]],[,"(\\d{3})(\\d{3})(\\d{3,4})","$1 $2 $3",["1[4679]|[38]"]],
  [,"(\\d{3})(\\d{3,4})(\\d{4})","$1 $2 $3",["0[13-57-9][0159]"]],[,"(\\d{2})(\\d{4})(\\d{5})","$1 $2 $3",["0[26]"]],[,"(\\d{4})(\\d{3})(\\d{4})","$1 $2 $3",["0"]],[,"(\\d{3})(\\d{4})(\\d{4,5})","$1 $2 $3",["3"]]],[,,,,,,,,,[-1]],1,,[,,"848\\d{6}",,,,,,,[9]],[,,,,,,,,,[-1]],,,[,,"3[2-8]\\d{9,10}",,,,"33101234501",,,[11,12]]],JE:[,[,,"1534\\d{6}|(?:[3578]\\d|90)\\d{8}",,,,,,,[10],[6]],[,,"1534[0-24-8]\\d{5}",,,,"1534456789",,,,[6]],[,,"7(?:(?:(?:50|82)9|937)\\d|7(?:00[378]|97[7-9]))\\d{5}",,,,"7797712345"],
  [,,"80(?:07(?:35|81)|8901)\\d{4}",,,,"8007354567"],[,,"(?:8(?:4(?:4(?:4(?:05|42|69)|703)|5(?:041|800))|7(?:0002|1206))|90(?:066[59]|1810|71(?:07|55)))\\d{4}",,,,"9018105678"],[,,,,,,,,,[-1]],[,,"701511\\d{4}",,,,"7015115678"],[,,"56\\d{8}",,,,"5612345678"],"JE",44,"00","0",,,"0|([0-24-8]\\d{5})$","1534$1",,,,,[,,"76(?:0[0-2]|2[356]|34|4[0134]|5[49]|6[0-369]|77|81|9[39])\\d{6}",,,,"7640123456"],,,[,,,,,,,,,[-1]],[,,"(?:3(?:0(?:07(?:35|81)|8901)|3\\d{4}|4(?:4(?:4(?:05|42|69)|703)|5(?:041|800))|7(?:0002|1206))|55\\d{4})\\d{4}",
  ,,,"5512345678"],,,[,,,,,,,,,[-1]]],JM:[,[,,"(?:[58]\\d\\d|658|900)\\d{7}",,,,,,,[10],[7]],[,,"(?:658(?:2(?:[0-8]\\d|9[0-46-9])|[3-9]\\d\\d)|876(?:5(?:02|1[0-468]|2[35]|63)|6(?:0[1-3579]|1[0237-9]|[23]\\d|40|5[06]|6[2-589]|7[05]|8[04]|9[4-9])|7(?:0[2-689]|[1-6]\\d|8[056]|9[45])|9(?:0[1-8]|1[02378]|[2-8]\\d|9[2-468])))\\d{4}",,,,"8765230123",,,,[7]],[,,"(?:658295|876(?:2(?:[14-9]\\d|2[013-9]|3[7-9])|[348]\\d\\d|5(?:0[13-9]|1[579]|[2-57-9]\\d|6[0-24-9])|6(?:4[89]|6[67])|7(?:0[07]|7\\d|8[1-47-9]|9[0-36-9])|9(?:[01]9|9[0579])))\\d{4}",
  ,,,"8762101234",,,,[7]],[,,"8(?:00|33|44|55|66|77|88)[2-9]\\d{6}",,,,"8002123456"],[,,"900[2-9]\\d{6}",,,,"9002123456"],[,,,,,,,,,[-1]],[,,"52(?:35(?:[02-46-9]\\d|1[02-9]|5[0-46-9])|45(?:[034]\\d|1[02-9]|2[024-9]|5[0-46-9]))\\d{4}|52(?:3[2-46-9]|4[2-4])(?:[02-9]\\d|1[02-9])\\d{4}|5(?:00|2[12]|33|44|66|77|88)[2-9]\\d{6}",,,,"5002345678"],[,,,,,,,,,[-1]],"JM",1,"011","1",,,"1",,,,,,[,,,,,,,,,[-1]],,"658|876",[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],JO:[,[,,"(?:(?:[2689]|7\\d)\\d|32|53)\\d{6}",
  ,,,,,,[8,9]],[,,"87(?:000|90[01])\\d{3}|(?:2(?:6(?:2[0-35-9]|3[0-578]|4[24-7]|5[0-24-8]|[6-8][023]|9[0-3])|7(?:0[1-79]|10|2[014-7]|3[0-689]|4[019]|5[0-3578]))|32(?:0[1-69]|1[1-35-7]|2[024-7]|3\\d|4[0-3]|[5-7][023])|53(?:0[0-3]|[13][023]|2[0-59]|49|5[0-35-9]|6[15]|7[45]|8[1-6]|9[0-36-9])|6(?:2(?:[05]0|22)|3(?:00|33)|4(?:0[0-25]|1[2-467]|2[0569]|[38][07-9]|4[025689]|6[0-589]|7\\d|9[0-2])|5(?:[01][056]|2[034]|3[0-57-9]|4[178]|5[0-69]|6[0-35-9]|7[1-379]|8[0-68]|9[0239]))|87(?:20|7[078]|99))\\d{4}",,,
  ,"62001234",,,[8]],[,,"7(?:[78][0-25-9]|9\\d)\\d{6}",,,,"790123456",,,[9]],[,,"80\\d{6}",,,,"80012345",,,[8]],[,,"9\\d{7}",,,,"90012345",,,[8]],[,,"85\\d{6}",,,,"85012345",,,[8]],[,,"70\\d{7}",,,,"700123456",,,[9]],[,,,,,,,,,[-1]],"JO",962,"00","0",,,"0",,,,[[,"(\\d)(\\d{3})(\\d{4})","$1 $2 $3",["[2356]|87"],"(0$1)"],[,"(\\d{3})(\\d{5,6})","$1 $2",["[89]"],"0$1"],[,"(\\d{2})(\\d{7})","$1 $2",["70"],"0$1"],[,"(\\d)(\\d{4})(\\d{4})","$1 $2 $3",["7"],"0$1"]],,[,,"74(?:66|77)\\d{5}",,,,"746612345",,,
  [9]],,,[,,,,,,,,,[-1]],[,,"8(?:10|8\\d)\\d{5}",,,,"88101234",,,[8]],,,[,,,,,,,,,[-1]]],JP:[,[,,"00[1-9]\\d{6,14}|[257-9]\\d{9}|(?:00|[1-9]\\d\\d)\\d{6}",,,,,,,[8,9,10,11,12,13,14,15,16,17]],[,,"(?:1(?:1[235-8]|2[3-6]|3[3-9]|4[2-6]|[58][2-8]|6[2-7]|7[2-9]|9[1-9])|(?:2[2-9]|[36][1-9])\\d|4(?:[2-578]\\d|6[02-8]|9[2-59])|5(?:[2-589]\\d|6[1-9]|7[2-8])|7(?:[25-9]\\d|3[4-9]|4[02-9])|8(?:[2679]\\d|3[2-9]|4[5-9]|5[1-9]|8[03-9])|9(?:[2-58]\\d|[679][1-9]))\\d{6}",,,,"312345678",,,[9]],[,,"[7-9]0[1-9]\\d{7}",
  ,,,"9012345678",,,[10]],[,,"00(?:(?:37|66)\\d{6,13}|(?:777(?:[01]|(?:5|8\\d)\\d)|882[1245]\\d\\d)\\d\\d)|(?:120|800\\d)\\d{6}",,,,"120123456"],[,,"990\\d{6}",,,,"990123456",,,[9]],[,,,,,,,,,[-1]],[,,"60\\d{7}",,,,"601234567",,,[9]],[,,"50[1-9]\\d{7}",,,,"5012345678",,,[10]],"JP",81,"010","0",,,"0",,,,[[,"(\\d{4})(\\d{4})","$1-$2",["007","0077","00777","00777[01]"]],[,"(\\d{3})(\\d{3})(\\d{3})","$1-$2-$3",["(?:12|57|99)0"],"0$1"],[,"(\\d{4})(\\d)(\\d{4})","$1-$2-$3",["1(?:26|3[79]|4[56]|5[4-68]|6[3-5])|499|5(?:76|97)|746|8(?:3[89]|47|51|63)|9(?:49|80|9[16])",
  "1(?:267|3(?:7[247]|9[278])|466|5(?:47|58|64)|6(?:3[245]|48|5[4-68]))|499[2468]|5(?:76|97)9|7468|8(?:3(?:8[78]|96)|477|51[24]|636)|9(?:496|802|9(?:1[23]|69))|1(?:45|58)[67]","1(?:267|3(?:7[247]|9[278])|466|5(?:47|58|64)|6(?:3[245]|48|5[4-68]))|499[2468]|5(?:769|979[2-69])|7468|8(?:3(?:8[78]|96[2457-9])|477|51[24]|636[457-9])|9(?:496|802|9(?:1[23]|69))|1(?:45|58)[67]"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{4})","$1-$2-$3",["60"],"0$1"],[,"(\\d)(\\d{4})(\\d{4})","$1-$2-$3",["[36]|4(?:2[09]|7[01])","[36]|4(?:2(?:0|9[02-69])|7(?:0[019]|1))"],
  "0$1"],[,"(\\d{2})(\\d{3})(\\d{4})","$1-$2-$3",["1(?:1|5[45]|77|88|9[69])|2(?:2[1-37]|3[0-269]|4[59]|5|6[24]|7[1-358]|8[1369]|9[0-38])|4(?:[28][1-9]|3[0-57]|[45]|6[248]|7[2-579]|9[29])|5(?:2|3[045]|4[0-369]|5[29]|8[02389]|9[0-389])|7(?:2[02-46-9]|34|[58]|6[0249]|7[57]|9[2-6])|8(?:2[124589]|3[279]|49|6|7[0-468]|8[68]|9[019])|9(?:[23][1-9]|4[15]|5[138]|6[1-3]|7[156]|8[189]|9[1-489])","1(?:1|5(?:4[018]|5[017])|77|88|9[69])|2(?:2(?:[127]|3[014-9])|3[0-269]|4[59]|5(?:[0468][01]|[1-3]|5[0-69]|9[19])|62|7(?:[1-35]|8[0189])|8(?:[16]|3[0134]|9[0-5])|9(?:[028]|17))|4(?:2(?:[13-79]|2[01]|8[014-6])|3[0-57]|[45]|6[248]|7[2-47]|8[1-9])|5(?:2|3[045]|4[0-369]|8[02389]|9[0-3])|7(?:2[02-46-9]|34|[58]|6[0249]|7[57]|9(?:[23]|4[0-59]|5[01569]|6[0167]))|8(?:2(?:[1258]|4[0-39]|9[0-2469])|49|6(?:[0-24]|36|5[0-3589]|72|9[01459])|7[0-468]|8[68])|9(?:[23][1-9]|4[15]|5[138]|6[1-3]|7[156]|8[189]|9(?:[1289]|3[34]|4[0178]))|(?:49|55|83)[29]|(?:264|837)[016-9]|2(?:57|93)[015-9]|(?:47[59]|59[89]|8(?:6[68]|9))[019]",
  "1(?:1|5(?:4[018]|5[017])|77|88|9[69])|2(?:2[127]|3[0-269]|4[59]|5(?:[0468][01]|[1-3]|5[0-69]|9(?:17|99))|6(?:2|4[016-9])|7(?:[1-35]|8[0189])|8(?:[16]|3[0134]|9[0-5])|9(?:[028]|17))|4(?:2(?:[13-79]|2[01]|8[014-6])|3[0-57]|[45]|6[248]|7[2-47]|9[29])|5(?:2|3[045]|4[0-369]|5[29]|8[02389]|9[0-3])|7(?:2[02-46-9]|34|[58]|6[0249]|7[57]|9(?:[23]|4[0-59]|5[01569]|6[0167]))|8(?:2(?:[1258]|4[0-39]|9[0169])|3(?:[29]|7(?:[017-9]|6[6-8]))|49|6(?:[0-24]|36[23]|5(?:[0-389]|5[23])|6(?:[01]|9[178])|72|9[0145])|7[0-468]|8[68])|9(?:4[15]|5[138]|7[156]|8[189]|9(?:[1289]|3(?:31|4[357])|4[0178]))|(?:8294|96)[1-3]|2(?:57|93)[015-9]|(?:223|8699)[014-9]|(?:48|8292|9[23])[1-9]|(?:47[59]|59[89]|8(?:68|9))[019]",
  "1(?:1|5(?:4[018]|5[017])|77|88|9[69])|2(?:2[127]|3[0-269]|4[59]|5(?:[0468][01]|[1-3]|5[0-69]|7[015-9]|9(?:17|99))|6(?:2|4[016-9])|7(?:[1-35]|8[0189])|8(?:[16]|3[0134]|9[0-5])|9(?:[028]|17|3[015-9]))|4(?:2(?:[13-79]|2[01]|8[014-6])|3[0-57]|[45]|6[248]|7[2-47]|9[29])|5(?:2|3[045]|4[0-369]|5[29]|8[02389]|9[0-3])|7(?:2[02-46-9]|34|[58]|6[0249]|7[57]|9(?:[23]|4[0-59]|5[01569]|6[0167]))|8(?:2(?:[1258]|4[0-39]|9(?:[019]|4[1-3]|6(?:[0-47-9]|5[01346-9])))|3(?:[29]|7(?:[017-9]|6[6-8]))|49|6(?:[0-24]|36[23]|5(?:[0-389]|5[23])|6(?:[01]|9[178])|72|9[0145])|7[0-468]|8[68])|9(?:4[15]|5[138]|6[1-3]|7[156]|8[189]|9(?:[1289]|3(?:31|4[357])|4[0178]))|(?:223|8699)[014-9]|(?:48|829(?:2|66)|9[23])[1-9]|(?:47[59]|59[89]|8(?:68|9))[019]"],
  "0$1"],[,"(\\d{3})(\\d{2})(\\d{4})","$1-$2-$3",["[14]|[29][2-9]|5[3-9]|7[2-4679]|8(?:[246-9]|3[3-8]|5[2-9])","[14]|[29][2-9]|5[3-9]|7[2-4679]|8(?:[246-9]|3(?:[3-6][2-9]|7|8[2-5])|5[2-9])"],"0$1"],[,"(\\d{4})(\\d{2})(\\d{3,4})","$1-$2-$3",["007"]],[,"(\\d{4})(\\d{2})(\\d{4})","$1-$2-$3",["008"]],[,"(\\d{3})(\\d{3})(\\d{4})","$1-$2-$3",["800"],"0$1"],[,"(\\d{2})(\\d{4})(\\d{4})","$1-$2-$3",["[2579]|80"],"0$1"],[,"(\\d{4})(\\d{3})(\\d{3,4})","$1-$2-$3",["0"]],[,"(\\d{4})(\\d{4})(\\d{4,5})","$1-$2-$3",
  ["0"]],[,"(\\d{4})(\\d{5})(\\d{5,6})","$1-$2-$3",["0"]],[,"(\\d{4})(\\d{6})(\\d{6,7})","$1-$2-$3",["0"]]],[[,"(\\d{3})(\\d{3})(\\d{3})","$1-$2-$3",["(?:12|57|99)0"],"0$1"],[,"(\\d{4})(\\d)(\\d{4})","$1-$2-$3",["1(?:26|3[79]|4[56]|5[4-68]|6[3-5])|499|5(?:76|97)|746|8(?:3[89]|47|51|63)|9(?:49|80|9[16])","1(?:267|3(?:7[247]|9[278])|466|5(?:47|58|64)|6(?:3[245]|48|5[4-68]))|499[2468]|5(?:76|97)9|7468|8(?:3(?:8[78]|96)|477|51[24]|636)|9(?:496|802|9(?:1[23]|69))|1(?:45|58)[67]","1(?:267|3(?:7[247]|9[278])|466|5(?:47|58|64)|6(?:3[245]|48|5[4-68]))|499[2468]|5(?:769|979[2-69])|7468|8(?:3(?:8[78]|96[2457-9])|477|51[24]|636[457-9])|9(?:496|802|9(?:1[23]|69))|1(?:45|58)[67]"],
  "0$1"],[,"(\\d{2})(\\d{3})(\\d{4})","$1-$2-$3",["60"],"0$1"],[,"(\\d)(\\d{4})(\\d{4})","$1-$2-$3",["[36]|4(?:2[09]|7[01])","[36]|4(?:2(?:0|9[02-69])|7(?:0[019]|1))"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{4})","$1-$2-$3",["1(?:1|5[45]|77|88|9[69])|2(?:2[1-37]|3[0-269]|4[59]|5|6[24]|7[1-358]|8[1369]|9[0-38])|4(?:[28][1-9]|3[0-57]|[45]|6[248]|7[2-579]|9[29])|5(?:2|3[045]|4[0-369]|5[29]|8[02389]|9[0-389])|7(?:2[02-46-9]|34|[58]|6[0249]|7[57]|9[2-6])|8(?:2[124589]|3[279]|49|6|7[0-468]|8[68]|9[019])|9(?:[23][1-9]|4[15]|5[138]|6[1-3]|7[156]|8[189]|9[1-489])",
  "1(?:1|5(?:4[018]|5[017])|77|88|9[69])|2(?:2(?:[127]|3[014-9])|3[0-269]|4[59]|5(?:[0468][01]|[1-3]|5[0-69]|9[19])|62|7(?:[1-35]|8[0189])|8(?:[16]|3[0134]|9[0-5])|9(?:[028]|17))|4(?:2(?:[13-79]|2[01]|8[014-6])|3[0-57]|[45]|6[248]|7[2-47]|8[1-9])|5(?:2|3[045]|4[0-369]|8[02389]|9[0-3])|7(?:2[02-46-9]|34|[58]|6[0249]|7[57]|9(?:[23]|4[0-59]|5[01569]|6[0167]))|8(?:2(?:[1258]|4[0-39]|9[0-2469])|49|6(?:[0-24]|36|5[0-3589]|72|9[01459])|7[0-468]|8[68])|9(?:[23][1-9]|4[15]|5[138]|6[1-3]|7[156]|8[189]|9(?:[1289]|3[34]|4[0178]))|(?:49|55|83)[29]|(?:264|837)[016-9]|2(?:57|93)[015-9]|(?:47[59]|59[89]|8(?:6[68]|9))[019]",
  "1(?:1|5(?:4[018]|5[017])|77|88|9[69])|2(?:2[127]|3[0-269]|4[59]|5(?:[0468][01]|[1-3]|5[0-69]|9(?:17|99))|6(?:2|4[016-9])|7(?:[1-35]|8[0189])|8(?:[16]|3[0134]|9[0-5])|9(?:[028]|17))|4(?:2(?:[13-79]|2[01]|8[014-6])|3[0-57]|[45]|6[248]|7[2-47]|9[29])|5(?:2|3[045]|4[0-369]|5[29]|8[02389]|9[0-3])|7(?:2[02-46-9]|34|[58]|6[0249]|7[57]|9(?:[23]|4[0-59]|5[01569]|6[0167]))|8(?:2(?:[1258]|4[0-39]|9[0169])|3(?:[29]|7(?:[017-9]|6[6-8]))|49|6(?:[0-24]|36[23]|5(?:[0-389]|5[23])|6(?:[01]|9[178])|72|9[0145])|7[0-468]|8[68])|9(?:4[15]|5[138]|7[156]|8[189]|9(?:[1289]|3(?:31|4[357])|4[0178]))|(?:8294|96)[1-3]|2(?:57|93)[015-9]|(?:223|8699)[014-9]|(?:48|8292|9[23])[1-9]|(?:47[59]|59[89]|8(?:68|9))[019]",
  "1(?:1|5(?:4[018]|5[017])|77|88|9[69])|2(?:2[127]|3[0-269]|4[59]|5(?:[0468][01]|[1-3]|5[0-69]|7[015-9]|9(?:17|99))|6(?:2|4[016-9])|7(?:[1-35]|8[0189])|8(?:[16]|3[0134]|9[0-5])|9(?:[028]|17|3[015-9]))|4(?:2(?:[13-79]|2[01]|8[014-6])|3[0-57]|[45]|6[248]|7[2-47]|9[29])|5(?:2|3[045]|4[0-369]|5[29]|8[02389]|9[0-3])|7(?:2[02-46-9]|34|[58]|6[0249]|7[57]|9(?:[23]|4[0-59]|5[01569]|6[0167]))|8(?:2(?:[1258]|4[0-39]|9(?:[019]|4[1-3]|6(?:[0-47-9]|5[01346-9])))|3(?:[29]|7(?:[017-9]|6[6-8]))|49|6(?:[0-24]|36[23]|5(?:[0-389]|5[23])|6(?:[01]|9[178])|72|9[0145])|7[0-468]|8[68])|9(?:4[15]|5[138]|6[1-3]|7[156]|8[189]|9(?:[1289]|3(?:31|4[357])|4[0178]))|(?:223|8699)[014-9]|(?:48|829(?:2|66)|9[23])[1-9]|(?:47[59]|59[89]|8(?:68|9))[019]"],
  "0$1"],[,"(\\d{3})(\\d{2})(\\d{4})","$1-$2-$3",["[14]|[29][2-9]|5[3-9]|7[2-4679]|8(?:[246-9]|3[3-8]|5[2-9])","[14]|[29][2-9]|5[3-9]|7[2-4679]|8(?:[246-9]|3(?:[3-6][2-9]|7|8[2-5])|5[2-9])"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{4})","$1-$2-$3",["800"],"0$1"],[,"(\\d{2})(\\d{4})(\\d{4})","$1-$2-$3",["[2579]|80"],"0$1"]],[,,"20\\d{8}",,,,"2012345678",,,[10]],,,[,,"00(?:777(?:[01]|(?:5|8\\d)\\d)|882[1245]\\d\\d)\\d\\d|00(?:37|66)\\d{6,13}"],[,,"570\\d{6}",,,,"570123456",,,[9]],,,[,,,,,,,,,[-1]]],KE:[,[,,"(?:[17]\\d\\d|900)\\d{6}|(?:2|80)0\\d{6,7}|[4-6]\\d{6,8}",
  ,,,,,,[7,8,9,10]],[,,"(?:4[245]|5[1-79]|6[01457-9])\\d{5,7}|(?:4[136]|5[08]|62)\\d{7}|(?:[24]0|66)\\d{6,7}",,,,"202012345",,,[7,8,9]],[,,"(?:1(?:0[0-2]|1[01])|7\\d\\d)\\d{6}",,,,"712123456",,,[9]],[,,"800[24-8]\\d{5,6}",,,,"800223456",,,[9,10]],[,,"900[02-9]\\d{5}",,,,"900223456",,,[9]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"KE",254,"000","0",,,"0",,,,[[,"(\\d{2})(\\d{5,7})","$1 $2",["[24-6]"],"0$1"],[,"(\\d{3})(\\d{6})","$1 $2",["[17]"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{3,4})","$1 $2 $3",
  ["[89]"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],KG:[,[,,"8\\d{9}|(?:[235-8]\\d|99)\\d{7}",,,,,,,[9,10],[5,6]],[,,"312(?:5[0-79]\\d|9(?:[0-689]\\d|7[0-24-9]))\\d{3}|(?:3(?:1(?:2[0-46-8]|3[1-9]|47|[56]\\d)|2(?:22|3[0-479]|6[0-7])|4(?:22|5[6-9]|6\\d)|5(?:22|3[4-7]|59|6\\d)|6(?:22|5[35-7]|6\\d)|7(?:22|3[468]|4[1-9]|59|[67]\\d)|9(?:22|4[1-8]|6\\d))|6(?:09|12|2[2-4])\\d)\\d{5}",,,,"312123456",,,[9],[5,6]],[,,"(?:312(?:58\\d|973)|8801\\d\\d)\\d{3}|(?:2(?:0[0-35]|2\\d)|5[0-24-7]\\d|7(?:[07]\\d|55)|99[05-9])\\d{6}",
  ,,,"700123456",,,[9]],[,,"800\\d{6,7}",,,,"800123456"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"KG",996,"00","0",,,"0",,,,[[,"(\\d{4})(\\d{5})","$1 $2",["3(?:1[346]|[24-79])"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[235-79]|88"],"0$1"],[,"(\\d{3})(\\d{3})(\\d)(\\d{2,3})","$1 $2 $3 $4",["8"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],KH:[,[,,"1\\d{9}|[1-9]\\d{7,8}",,,,,,,[8,9,10],[6,7]],[,,"23(?:4(?:[2-4]|[56]\\d)|[568]\\d\\d)\\d{4}|23[236-9]\\d{5}|(?:2[4-6]|3[2-6]|4[2-4]|[5-7][2-5])(?:(?:[237-9]|4[56]|5\\d)\\d{5}|6\\d{5,6})",
  ,,,"23756789",,,[8,9],[6,7]],[,,"(?:(?:1[28]|3[18]|9[67])\\d|6[016-9]|7(?:[07-9]|[16]\\d)|8(?:[013-79]|8\\d))\\d{6}|(?:1\\d|9[0-57-9])\\d{6}|(?:2[3-6]|3[2-6]|4[2-4]|[5-7][2-5])48\\d{5}",,,,"91234567",,,[8,9]],[,,"1800(?:1\\d|2[019])\\d{4}",,,,"1800123456",,,[10]],[,,"1900(?:1\\d|2[09])\\d{4}",,,,"1900123456",,,[10]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"KH",855,"00[14-9]","0",,,"0",,,,[[,"(\\d{2})(\\d{3})(\\d{3,4})","$1 $2 $3",["[1-9]"],"0$1"],[,"(\\d{4})(\\d{3})(\\d{3})","$1 $2 $3",["1"]]],
  ,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],KI:[,[,,"(?:[37]\\d|6[0-79])\\d{6}|(?:[2-48]\\d|50)\\d{3}",,,,,,,[5,8]],[,,"(?:[24]\\d|3[1-9]|50|65(?:02[12]|12[56]|22[89]|[3-5]00)|7(?:27\\d\\d|3100|5(?:02[12]|12[56]|22[89]|[34](?:00|81)|500))|8[0-5])\\d{3}",,,,"31234"],[,,"(?:63\\d{3}|73(?:0[0-5]\\d|140))\\d{3}|[67]200[01]\\d{3}",,,,"72001234",,,[8]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"30(?:0[01]\\d\\d|12(?:11|20))\\d\\d",,,,"30010000",,,[8]],
  "KI",686,"00","0",,,"0",,,,,,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],KM:[,[,,"[3478]\\d{6}",,,,,,,[7],[4]],[,,"7[4-7]\\d{5}",,,,"7712345",,,,[4]],[,,"[34]\\d{6}",,,,"3212345"],[,,,,,,,,,[-1]],[,,"8\\d{6}",,,,"8001234"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"KM",269,"00",,,,,,,,[[,"(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3",["[3478]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],KN:[,[,,"(?:[58]\\d\\d|900)\\d{7}",,,,,,,[10],[7]],[,,"869(?:2(?:29|36)|302|4(?:6[015-9]|70))\\d{4}",
  ,,,"8692361234",,,,[7]],[,,"869(?:48[89]|5(?:5[6-8]|6[5-7])|66\\d|76[02-7])\\d{4}",,,,"8697652917",,,,[7]],[,,"8(?:00|33|44|55|66|77|88)[2-9]\\d{6}",,,,"8002123456"],[,,"900[2-9]\\d{6}",,,,"9002123456"],[,,,,,,,,,[-1]],[,,"52(?:35(?:[02-46-9]\\d|1[02-9]|5[0-46-9])|45(?:[034]\\d|1[02-9]|2[024-9]|5[0-46-9]))\\d{4}|52(?:3[2-46-9]|4[2-4])(?:[02-9]\\d|1[02-9])\\d{4}|5(?:00|2[12]|33|44|66|77|88)[2-9]\\d{6}",,,,"5002345678"],[,,,,,,,,,[-1]],"KN",1,"011","1",,,"1|([2-7]\\d{6})$","869$1",,,,,[,,,,,,,,,[-1]],
  ,"869",[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],KP:[,[,,"85\\d{6}|(?:19\\d|[2-7])\\d{7}",,,,,,,[8,10],[6,7]],[,,"(?:(?:195|2)\\d|3[19]|4[159]|5[37]|6[17]|7[39]|85)\\d{6}",,,,"21234567",,,,[6,7]],[,,"19[1-3]\\d{7}",,,,"1921234567",,,[10]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"KP",850,"00|99","0",,,"0",,,,[[,"(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["8"],"0$1"],[,"(\\d)(\\d{3})(\\d{4})","$1 $2 $3",["[2-7]"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",
  ["1"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,"238[02-9]\\d{4}|2(?:[0-24-9]\\d|3[0-79])\\d{5}",,,,,,,[8]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],KR:[,[,,"00[1-9]\\d{8,11}|(?:[12]|5\\d{3})\\d{7}|[13-6]\\d{9}|(?:[1-6]\\d|80)\\d{7}|[3-6]\\d{4,5}|(?:00|7)0\\d{8}",,,,,,,[5,6,8,9,10,11,12,13,14],[3,4,7]],[,,"(?:2|3[1-3]|[46][1-4]|5[1-5])[1-9]\\d{6,7}|(?:3[1-3]|[46][1-4]|5[1-5])1\\d{2,3}",,,,"22123456",,,[5,6,8,9,10],[3,4,7]],[,,"1(?:05(?:[0-8]\\d|9[0-5])|22[13]\\d)\\d{4,5}|1(?:0[1-46-9]|[16-9]\\d|2[013-9])\\d{6,7}",
  ,,,"1020000000",,,[9,10]],[,,"00(?:308\\d{6,7}|798\\d{7,9})|(?:00368|80)\\d{7}",,,,"801234567",,,[9,11,12,13,14]],[,,"60[2-9]\\d{6}",,,,"602345678",,,[9]],[,,,,,,,,,[-1]],[,,"50\\d{8,9}",,,,"5012345678",,,[10,11]],[,,"70\\d{8}",,,,"7012345678",,,[10]],"KR",82,"00(?:[125689]|3(?:[46]5|91)|7(?:00|27|3|55|6[126]))","0",,,"0(8(?:[1-46-8]|5\\d\\d))?",,,,[[,"(\\d{5})","$1",["1[016-9]1","1[016-9]11","1[016-9]114"],"0$1"],[,"(\\d{2})(\\d{3,4})","$1-$2",["(?:3[1-3]|[46][1-4]|5[1-5])1"],"0$1","0$CC-$1"],[,
  "(\\d{4})(\\d{4})","$1-$2",["1"]],[,"(\\d)(\\d{3,4})(\\d{4})","$1-$2-$3",["2"],"0$1","0$CC-$1"],[,"(\\d{2})(\\d{3})(\\d{4})","$1-$2-$3",["60|8"],"0$1","0$CC-$1"],[,"(\\d{2})(\\d{3,4})(\\d{4})","$1-$2-$3",["[1346]|5[1-5]"],"0$1","0$CC-$1"],[,"(\\d{2})(\\d{4})(\\d{4})","$1-$2-$3",["[57]"],"0$1","0$CC-$1"],[,"(\\d{5})(\\d{3})(\\d{3})","$1 $2 $3",["003","0030"]],[,"(\\d{2})(\\d{5})(\\d{4})","$1-$2-$3",["5"],"0$1","0$CC-$1"],[,"(\\d{5})(\\d{3,4})(\\d{4})","$1 $2 $3",["0"]],[,"(\\d{5})(\\d{2})(\\d{3})(\\d{4})",
  "$1 $2 $3 $4",["0"]]],[[,"(\\d{2})(\\d{3,4})","$1-$2",["(?:3[1-3]|[46][1-4]|5[1-5])1"],"0$1","0$CC-$1"],[,"(\\d{4})(\\d{4})","$1-$2",["1"]],[,"(\\d)(\\d{3,4})(\\d{4})","$1-$2-$3",["2"],"0$1","0$CC-$1"],[,"(\\d{2})(\\d{3})(\\d{4})","$1-$2-$3",["60|8"],"0$1","0$CC-$1"],[,"(\\d{2})(\\d{3,4})(\\d{4})","$1-$2-$3",["[1346]|5[1-5]"],"0$1","0$CC-$1"],[,"(\\d{2})(\\d{4})(\\d{4})","$1-$2-$3",["[57]"],"0$1","0$CC-$1"],[,"(\\d{2})(\\d{5})(\\d{4})","$1-$2-$3",["5"],"0$1","0$CC-$1"]],[,,"15\\d{7,8}",,,,"1523456789",
  ,,[9,10]],,,[,,"00(?:3(?:08\\d{6,7}|68\\d{7})|798\\d{7,9})",,,,,,,[11,12,13,14]],[,,"1(?:5(?:22|44|66|77|88|99)|6(?:[07]0|44|6[16]|88)|8(?:00|33|55|77|99))\\d{4}",,,,"15441234",,,[8]],,,[,,,,,,,,,[-1]]],KW:[,[,,"(?:18|[2569]\\d\\d)\\d{5}",,,,,,,[7,8]],[,,"2(?:[23]\\d\\d|4(?:[1-35-9]\\d|44)|5(?:0[034]|[2-46]\\d|5[1-3]|7[1-7]))\\d{4}",,,,"22345678",,,[8]],[,,"(?:5(?:2(?:22|5[25])|88[58])|6(?:222|444|70[013-9]|888|93[039])|9(?:11[01]|333|500))\\d{4}|(?:5(?:[05]\\d|1[0-7]|6[56])|6(?:0[034679]|5[015-9]|6\\d|7[67]|9[069])|9(?:0[09]|22|[4679]\\d|55|8[057-9]))\\d{5}",
  ,,,"50012345",,,[8]],[,,"18\\d{5}",,,,"1801234",,,[7]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"KW",965,"00",,,,,,,,[[,"(\\d{4})(\\d{3,4})","$1 $2",["[169]|2(?:[235]|4[1-35-9])|52"]],[,"(\\d{3})(\\d{5})","$1 $2",["[25]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],KY:[,[,,"(?:345|[58]\\d\\d|900)\\d{7}",,,,,,,[10],[7]],[,,"345(?:2(?:22|3[23]|44|66)|333|444|6(?:23|38|40)|7(?:30|4[35-79]|6[6-9]|77)|8(?:00|1[45]|25|[48]8)|9(?:14|4[035-9]))\\d{4}",,,
  ,"3452221234",,,,[7]],[,,"345(?:32[1-9]|42[0-4]|5(?:1[67]|2[5-79]|4[6-9]|50|76)|649|9(?:1[679]|2[2-9]|3[06-9]|90))\\d{4}",,,,"3453231234",,,,[7]],[,,"8(?:00|33|44|55|66|77|88)[2-9]\\d{6}",,,,"8002345678"],[,,"(?:345976|900[2-9]\\d\\d)\\d{4}",,,,"9002345678"],[,,,,,,,,,[-1]],[,,"52(?:35(?:[02-46-9]\\d|1[02-9]|5[0-46-9])|45(?:[034]\\d|1[02-9]|2[024-9]|5[0-46-9]))\\d{4}|52(?:3[2-46-9]|4[2-4])(?:[02-9]\\d|1[02-9])\\d{4}|5(?:00|2[12]|33|44|66|77|88)[2-9]\\d{6}",,,,"5002345678"],[,,,,,,,,,[-1]],"KY",1,
  "011","1",,,"1|([2-9]\\d{6})$","345$1",,,,,[,,"345849\\d{4}",,,,"3458491234"],,"345",[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],KZ:[,[,,"33622\\d{5}|(?:7\\d|80)\\d{8}",,,,,,,[10],[5,6,7]],[,,"(?:33622|7(?:1(?:0(?:[23]\\d|4[0-3]|59|63)|1(?:[23]\\d|4[0-79]|59)|2(?:[23]\\d|59)|3(?:2\\d|3[0-79]|4[0-35-9]|59)|4(?:[24]\\d|3[013-9]|5[1-9])|5(?:2\\d|3[1-9]|4[0-7]|59)|6(?:[2-4]\\d|5[19]|61)|72\\d|8(?:[27]\\d|3[1-46-9]|4[0-5]))|2(?:1(?:[23]\\d|4[46-9]|5[3469])|2(?:2\\d|3[0679]|46|5[12679])|3(?:[2-4]\\d|5[139])|4(?:2\\d|3[1-35-9]|59)|5(?:[23]\\d|4[0-246-8]|59|61)|6(?:2\\d|3[1-9]|4[0-4]|59)|7(?:[2379]\\d|40|5[279])|8(?:[23]\\d|4[0-3]|59)|9(?:2\\d|3[124578]|59))))\\d{5}",
  ,,,"7123456789",,,,[5,6,7]],[,,"7(?:0[0-25-8]|47|6[02-4]|7[15-8]|85)\\d{7}",,,,"7710009998"],[,,"800\\d{7}",,,,"8001234567"],[,,"809\\d{7}",,,,"8091234567"],[,,,,,,,,,[-1]],[,,"808\\d{7}",,,,"8081234567"],[,,"751\\d{7}",,,,"7511234567"],"KZ",7,"810","8",,,"8",,"8~10",,,,[,,,,,,,,,[-1]],,"33|7",[,,"751\\d{7}"],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],LA:[,[,,"[23]\\d{9}|3\\d{8}|(?:[235-8]\\d|41)\\d{6}",,,,,,,[8,9,10],[6]],[,,"(?:2[13]|[35-7][14]|41|8[1468])\\d{6}",,,,"21212862",,,[8],[6]],[,,"(?:20(?:[239]\\d|5[24-9]|7[6-8])|302\\d)\\d{6}",
  ,,,"2023123456",,,[10]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"LA",856,"00","0",,,"0",,,,[[,"(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["2[13]|3[14]|[4-8]"],"0$1"],[,"(\\d{2})(\\d{2})(\\d{2})(\\d{3})","$1 $2 $3 $4",["30[013-9]"],"0$1"],[,"(\\d{2})(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3 $4",["[23]"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"30[013-9]\\d{6}",,,,"301234567",,,[9]],,,[,,,,,,,,,[-1]]],LB:[,[,,"[7-9]\\d{7}|[13-9]\\d{6}",,,,,,,[7,8]],[,,"(?:(?:[14-69]\\d|8[02-9])\\d|7(?:[2-57]\\d|62|8[0-7]|9[04-9]))\\d{4}",
  ,,,"1123456",,,[7]],[,,"793(?:[01]\\d|2[0-4])\\d{3}|(?:(?:3|81)\\d|7(?:[01]\\d|6[013-9]|8[89]|9[12]))\\d{5}",,,,"71123456"],[,,,,,,,,,[-1]],[,,"9[01]\\d{6}",,,,"90123456",,,[8]],[,,"80\\d{6}",,,,"80123456",,,[8]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"LB",961,"00","0",,,"0",,,,[[,"(\\d)(\\d{3})(\\d{3})","$1 $2 $3",["[13-69]|7(?:[2-57]|62|8[0-7]|9[04-9])|8[02-9]"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["[7-9]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],LC:[,[,,"(?:[58]\\d\\d|758|900)\\d{7}",
  ,,,,,,[10],[7]],[,,"758(?:234|4(?:30|5\\d|6[2-9]|8[0-2])|57[0-2]|(?:63|75)8)\\d{4}",,,,"7584305678",,,,[7]],[,,"758(?:28[4-7]|384|4(?:6[01]|8[4-9])|5(?:1[89]|20|84)|7(?:1[2-9]|2\\d|3[0-3])|812)\\d{4}",,,,"7582845678",,,,[7]],[,,"8(?:00|33|44|55|66|77|88)[2-9]\\d{6}",,,,"8002123456"],[,,"900[2-9]\\d{6}",,,,"9002123456"],[,,,,,,,,,[-1]],[,,"52(?:35(?:[02-46-9]\\d|1[02-9]|5[0-46-9])|45(?:[034]\\d|1[02-9]|2[024-9]|5[0-46-9]))\\d{4}|52(?:3[2-46-9]|4[2-4])(?:[02-9]\\d|1[02-9])\\d{4}|5(?:00|2[12]|33|44|66|77|88)[2-9]\\d{6}",
  ,,,"5002345678"],[,,,,,,,,,[-1]],"LC",1,"011","1",,,"1|([2-8]\\d{6})$","758$1",,,,,[,,,,,,,,,[-1]],,"758",[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],LI:[,[,,"90\\d{5}|(?:[2378]|6\\d\\d)\\d{6}",,,,,,,[7,9]],[,,"(?:2(?:01|1[27]|22|3\\d|6[02-578]|96)|3(?:33|40|7[0135-7]|8[048]|9[0269]))\\d{4}",,,,"2345678",,,[7]],[,,"(?:6(?:4(?:89|9\\d)|5[0-3]\\d|6(?:0[0-7]|10|2[06-9]|39))\\d|7(?:[37-9]\\d|42|56))\\d{4}",,,,"660234567"],[,,"80(?:02[28]|9\\d\\d)\\d\\d",,,,"8002222",,,[7]],[,,"90(?:02[258]|1(?:23|3[14])|66[136])\\d\\d",
  ,,,"9002222",,,[7]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"LI",423,"00","0",,,"0|(1001)",,,,[[,"(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3",["[237-9]"],,"$CC $1"],[,"(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["69"],,"$CC $1"],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["6"],,"$CC $1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"870(?:28|87)\\d\\d",,,,"8702812",,,[7]],,,[,,"697(?:42|56|[78]\\d)\\d{4}",,,,"697861234",,,[9]]],LK:[,[,,"[1-9]\\d{8}",,,,,,,[9],[7]],[,,"(?:12[2-9]|602|8[12]\\d|9(?:1\\d|22|9[245]))\\d{6}|(?:11|2[13-7]|3[1-8]|4[157]|5[12457]|6[35-7])[2-57]\\d{6}",
  ,,,"112345678",,,,[7]],[,,"7[0-25-8]\\d{7}",,,,"712345678"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"LK",94,"00","0",,,"0",,,,[[,"(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["7"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[1-689]"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"1973\\d{5}",,,,"197312345"],,,[,,,,,,,,,[-1]]],LR:[,[,,"(?:2|33|5\\d|77|88)\\d{7}|[4-6]\\d{6}",,,,,,,[7,8,9]],[,,"(?:2\\d{3}|33333)\\d{4}",,,,"21234567",,,[8,9]],[,,"(?:(?:330|555|(?:77|88)\\d)\\d|4[67])\\d{5}|[56]\\d{6}",
  ,,,"770123456",,,[7,9]],[,,,,,,,,,[-1]],[,,"332(?:02|[34]\\d)\\d{4}",,,,"332021234",,,[9]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"LR",231,"00","0",,,"0",,,,[[,"(\\d)(\\d{3})(\\d{3})","$1 $2 $3",["[4-6]"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["2"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["[3578]"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],LS:[,[,,"(?:[256]\\d\\d|800)\\d{5}",,,,,,,[8]],[,,"2\\d{7}",,,,"22123456"],[,,"[56]\\d{7}",,,,"50123456"],
  [,,"800[256]\\d{4}",,,,"80021234"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"LS",266,"00",,,,,,,,[[,"(\\d{4})(\\d{4})","$1 $2",["[2568]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],LT:[,[,,"(?:[3469]\\d|52|[78]0)\\d{6}",,,,,,,[8]],[,,"(?:3[1478]|4[124-6]|52)\\d{6}",,,,"31234567"],[,,"6\\d{7}",,,,"61234567"],[,,"80[02]\\d{5}",,,,"80012345"],[,,"9(?:0[0239]|10)\\d{5}",,,,"90012345"],[,,"808\\d{5}",,,,"80812345"],[,,"70[05]\\d{5}",,,,"70012345"],[,
  ,"[89]01\\d{5}",,,,"80123456"],"LT",370,"00","8",,,"[08]",,,,[[,"(\\d)(\\d{3})(\\d{4})","$1 $2 $3",["52[0-7]"],"(8-$1)",,1],[,"(\\d{3})(\\d{2})(\\d{3})","$1 $2 $3",["[7-9]"],"8 $1",,1],[,"(\\d{2})(\\d{6})","$1 $2",["37|4(?:[15]|6[1-8])"],"(8-$1)",,1],[,"(\\d{3})(\\d{5})","$1 $2",["[3-6]"],"(8-$1)",,1]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"70[67]\\d{5}",,,,"70712345"],,,[,,,,,,,,,[-1]]],LU:[,[,,"35[013-9]\\d{4,8}|6\\d{8}|35\\d{2,4}|(?:[2457-9]\\d|3[0-46-9])\\d{2,9}",,,,,,,[4,5,6,7,8,9,10,11]],[,
  ,"(?:35[013-9]|80[2-9]|90[89])\\d{1,8}|(?:2[2-9]|3[0-46-9]|[457]\\d|8[13-9]|9[2-579])\\d{2,9}",,,,"27123456"],[,,"6(?:[269][18]|5[158]|7[189]|81)\\d{6}",,,,"628123456",,,[9]],[,,"800\\d{5}",,,,"80012345",,,[8]],[,,"90[015]\\d{5}",,,,"90012345",,,[8]],[,,"801\\d{5}",,,,"80112345",,,[8]],[,,,,,,,,,[-1]],[,,"20(?:1\\d{5}|[2-689]\\d{1,7})",,,,"20201234",,,[4,5,6,7,8,9,10]],"LU",352,"00",,,,"(15(?:0[06]|1[12]|[35]5|4[04]|6[26]|77|88|99)\\d)",,,,[[,"(\\d{2})(\\d{3})","$1 $2",["2(?:0[2-689]|[2-9])|[3-57]|8(?:0[2-9]|[13-9])|9(?:0[89]|[2-579])"],
  ,"$CC $1"],[,"(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3",["2(?:0[2-689]|[2-9])|[3-57]|8(?:0[2-9]|[13-9])|9(?:0[89]|[2-579])"],,"$CC $1"],[,"(\\d{2})(\\d{2})(\\d{3})","$1 $2 $3",["20[2-689]"],,"$CC $1"],[,"(\\d{2})(\\d{2})(\\d{2})(\\d{1,2})","$1 $2 $3 $4",["2(?:[0367]|4[3-8])"],,"$CC $1"],[,"(\\d{3})(\\d{2})(\\d{3})","$1 $2 $3",["80[01]|90[015]"],,"$CC $1"],[,"(\\d{2})(\\d{2})(\\d{2})(\\d{3})","$1 $2 $3 $4",["20"],,"$CC $1"],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["6"],,"$CC $1"],[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})(\\d{1,2})",
  "$1 $2 $3 $4 $5",["2(?:[0367]|4[3-8])"],,"$CC $1"],[,"(\\d{2})(\\d{2})(\\d{2})(\\d{1,5})","$1 $2 $3 $4",["[3-57]|8[13-9]|9(?:0[89]|[2-579])|(?:2|80)[2-9]"],,"$CC $1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],LV:[,[,,"(?:[268]\\d|90)\\d{6}",,,,,,,[8]],[,,"6\\d{7}",,,,"63123456"],[,,"2\\d{7}",,,,"21234567"],[,,"80\\d{6}",,,,"80123456"],[,,"90\\d{6}",,,,"90123456"],[,,"81\\d{6}",,,,"81123456"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"LV",371,"00",,,,,,,,[[,"(\\d{2})(\\d{3})(\\d{3})",
  "$1 $2 $3",["[269]|8[01]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],LY:[,[,,"[2-9]\\d{8}",,,,,,,[9],[7]],[,,"(?:2(?:0[56]|[1-6]\\d|7[124579]|8[124])|3(?:1\\d|2[2356])|4(?:[17]\\d|2[1-357]|5[2-4]|8[124])|5(?:[1347]\\d|2[1-469]|5[13-5]|8[1-4])|6(?:[1-479]\\d|5[2-57]|8[1-5])|7(?:[13]\\d|2[13-79])|8(?:[124]\\d|5[124]|84))\\d{6}",,,,"212345678",,,,[7]],[,,"9[1-6]\\d{7}",,,,"912345678"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"LY",218,
  "00","0",,,"0",,,,[[,"(\\d{2})(\\d{7})","$1-$2",["[2-9]"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],MA:[,[,,"[5-8]\\d{8}",,,,,,,[9]],[,,"5(?:29(?:[189][05]|2[29]|3[01])|38[89][05])\\d{4}|5(?:2(?:[015-7]\\d|2[02-9]|3[0-578]|4[02-46-8]|8[0235-7]|90)|3(?:[0-47]\\d|5[02-9]|6[02-8]|80|9[3-9])|(?:4[067]|5[03])\\d)\\d{5}",,,,"520123456"],[,,"(?:6(?:[0-79]\\d|8[0-247-9])|7(?:0[016-8]|6[1267]|7[0-27]))\\d{6}",,,,"650123456"],[,,"80\\d{7}",,,,"801234567"],[,,"89\\d{7}",,
  ,,"891234567"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"592(?:4[0-2]|93)\\d{4}",,,,"592401234"],"MA",212,"00","0",,,"0",,,,[[,"(\\d{5})(\\d{4})","$1-$2",["5(?:29|38)","5(?:29|38)[89]","5(?:29|38)[89]0"],"0$1"],[,"(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["5[45]"],"0$1"],[,"(\\d{4})(\\d{5})","$1-$2",["5(?:2[2-489]|3[5-9]|9)|892","5(?:2(?:[2-49]|8[235-9])|3[5-9]|9)|892"],"0$1"],[,"(\\d{2})(\\d{7})","$1-$2",["8"],"0$1"],[,"(\\d{3})(\\d{6})","$1-$2",["[5-7]"],"0$1"]],,[,,,,,,,,,[-1]],1,,[,,,,,,,,,[-1]],
  [,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],MC:[,[,,"870\\d{5}|(?:[349]|6\\d)\\d{7}",,,,,,,[8,9]],[,,"(?:870|9[2-47-9]\\d)\\d{5}",,,,"99123456",,,[8]],[,,"4(?:[46]\\d|5[1-9])\\d{5}|(?:3|6\\d)\\d{7}",,,,"612345678"],[,,"90\\d{6}",,,,"90123456",,,[8]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"MC",377,"00","0",,,"0",,,,[[,"(\\d{3})(\\d{3})(\\d{2})","$1 $2 $3",["8"]],[,"(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["4"],"0$1"],[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[39]"]],[,"(\\d)(\\d{2})(\\d{2})(\\d{2})(\\d{2})",
  "$1 $2 $3 $4 $5",["6"],"0$1"]],[[,"(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["4"],"0$1"],[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[39]"]],[,"(\\d)(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4 $5",["6"],"0$1"]],[,,,,,,,,,[-1]],,,[,,"870\\d{5}",,,,,,,[8]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],MD:[,[,,"(?:[235-7]\\d|[89]0)\\d{6}",,,,,,,[8]],[,,"(?:(?:2[1-9]|3[1-79])\\d|5(?:33|5[257]))\\d{5}",,,,"22212345"],[,,"562\\d{5}|(?:6\\d|7[16-9])\\d{6}",,,,"62112345"],[,,"800\\d{5}",,,,"80012345"],[,,"90[056]\\d{5}",
  ,,,"90012345"],[,,"808\\d{5}",,,,"80812345"],[,,,,,,,,,[-1]],[,,"3[08]\\d{6}",,,,"30123456"],"MD",373,"00","0",,,"0",,,,[[,"(\\d{3})(\\d{5})","$1 $2",["[89]"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["22|3"],"0$1"],[,"(\\d{3})(\\d{2})(\\d{3})","$1 $2 $3",["[25-7]"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"803\\d{5}",,,,"80312345"],,,[,,,,,,,,,[-1]]],ME:[,[,,"(?:20|[3-79]\\d)\\d{6}|80\\d{6,7}",,,,,,,[8,9],[6]],[,,"(?:20[2-8]|3(?:[0-2][2-7]|3[24-7])|4(?:0[2-467]|1[2467])|5(?:0[2467]|1[24-7]|2[2-467]))\\d{5}",
  ,,,"30234567",,,[8],[6]],[,,"6(?:[07-9]\\d|3[024]|6[0-25])\\d{5}",,,,"67622901",,,[8]],[,,"80(?:[0-2578]|9\\d)\\d{5}",,,,"80080002"],[,,"9(?:4[1568]|5[178])\\d{5}",,,,"94515151",,,[8]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"78[1-49]\\d{5}",,,,"78108780",,,[8]],"ME",382,"00","0",,,"0",,,,[[,"(\\d{2})(\\d{3})(\\d{3,4})","$1 $2 $3",["[2-9]"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"77[1-9]\\d{5}",,,,"77273012",,,[8]],,,[,,,,,,,,,[-1]]],MF:[,[,,"(?:590|69\\d|976)\\d{6}",,,,,,,[9]],[,,"590(?:0[079]|[14]3|[27][79]|30|5[0-268]|87)\\d{4}",
  ,,,"590271234"],[,,"69(?:0\\d\\d|1(?:2[29]|3[0-5]))\\d{4}",,,,"690001234"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"976[01]\\d{5}",,,,"976012345"],"MF",590,"00","0",,,"0",,,,,,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],MG:[,[,,"[23]\\d{8}",,,,,,,[9],[7]],[,,"2072[29]\\d{4}|20(?:2\\d|4[47]|5[3467]|6[279]|7[35]|8[268]|9[245])\\d{5}",,,,"202123456",,,,[7]],[,,"3[2-49]\\d{7}",,,,"321234567"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,
  ,[-1]],[,,"22\\d{7}",,,,"221234567"],"MG",261,"00","0",,,"0|([24-9]\\d{6})$","20$1",,,[[,"(\\d{2})(\\d{2})(\\d{3})(\\d{2})","$1 $2 $3 $4",["[23]"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],MH:[,[,,"329\\d{4}|(?:[256]\\d|45)\\d{5}",,,,,,,[7]],[,,"(?:247|528|625)\\d{4}",,,,"2471234"],[,,"(?:(?:23|54)5|329|45[56])\\d{4}",,,,"2351234"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"635\\d{4}",,,,"6351234"],"MH",692,"011","1",,,"1",,,,[[,"(\\d{3})(\\d{4})",
  "$1-$2",["[2-6]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],MK:[,[,,"[2-578]\\d{7}",,,,,,,[8],[6,7]],[,,"(?:2(?:[23]\\d|5[0-24578]|6[01]|82)|3(?:1[3-68]|[23][2-68]|4[23568])|4(?:[23][2-68]|4[3-68]|5[2568]|6[25-8]|7[24-68]|8[4-68]))\\d{5}",,,,"22012345",,,,[6,7]],[,,"7(?:4(?:60\\d|747)|94(?:[01]\\d|2[0-4]))\\d{3}|7(?:[0-25-8]\\d|3[2-4]|42|9[23])\\d{5}",,,,"72345678"],[,,"800\\d{5}",,,,"80012345"],[,,"5[02-9]\\d{6}",,,,"50012345"],[,,"8(?:0[1-9]|[1-9]\\d)\\d{5}",,,,"80123456"],
  [,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"MK",389,"00","0",,,"0",,,,[[,"(\\d)(\\d{3})(\\d{4})","$1 $2 $3",["2"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["[347]"],"0$1"],[,"(\\d{3})(\\d)(\\d{2})(\\d{2})","$1 $2 $3 $4",["[58]"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],ML:[,[,,"[24-9]\\d{7}",,,,,,,[8]],[,,"2(?:07[0-8]|12[67])\\d{4}|(?:2(?:02|1[4-689])|4(?:0[0-4]|4[1-39]))\\d{5}",,,,"20212345"],[,,"2(?:0(?:01|79)|17\\d)\\d{4}|(?:5[01]|[679]\\d|8[239])\\d{6}",,,,"65012345"],
  [,,"80\\d{6}",,,,"80012345"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"ML",223,"00",,,,,,,,[[,"(\\d{4})","$1",["67[057-9]|74[045]","67(?:0[09]|[59]9|77|8[89])|74(?:0[02]|44|55)"]],[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[24-9]"]]],[[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[24-9]"]]],[,,,,,,,,,[-1]],,,[,,"80\\d{6}"],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],MM:[,[,,"1\\d{5,7}|95\\d{6}|(?:[4-7]|9[0-46-9])\\d{6,8}|(?:2|8\\d)\\d{5,8}",,,,,,,[6,7,8,9,10],[5]],[,
  ,"(?:1(?:(?:2\\d|3[56]|[89][0-6])\\d|4(?:2[2-469]|39|46|6[25]|7[0-3]|83)|6)|2(?:2(?:00|8[34])|4(?:0\\d|2[246]|39|46|62|7[0-3]|83)|51\\d\\d)|4(?:2(?:2\\d\\d|48[0-3])|3(?:20\\d|4(?:70|83)|56)|420\\d|5470)|6(?:0(?:[23]|88\\d)|(?:124|[56]2\\d)\\d|247[23]|3(?:20\\d|470)|4(?:2[04]\\d|47[23])|7(?:(?:3\\d|8[01459])\\d|4(?:39|60|7[013]))))\\d{4}|5(?:2(?:2\\d{5,6}|47[023]\\d{4})|(?:347[23]|4(?:2(?:1|86)|470)|522\\d|6(?:20\\d|483)|7(?:20\\d|48[0-2])|8(?:20\\d|47[02])|9(?:20\\d|47[01]))\\d{4})|7(?:(?:0470|4(?:25\\d|470)|5(?:202|470|96\\d))\\d{4}|1(?:20\\d{4,5}|4(?:70|83)\\d{4}))|8(?:1(?:2\\d{5,6}|4(?:10|7[01]\\d)\\d{3})|2(?:2\\d{5,6}|(?:320|490\\d)\\d{3})|(?:3(?:2\\d\\d|470)|4[24-7]|5(?:2\\d|4[1-9]|51)\\d|6[23])\\d{4})|(?:1[2-6]\\d|4(?:2[24-8]|3[2-7]|[46][2-6]|5[3-5])|5(?:[27][2-8]|3[2-68]|4[24-8]|5[23]|6[2-4]|8[24-7]|9[2-7])|6(?:[19]20|42[03-6]|(?:52|7[45])\\d)|7(?:[04][24-8]|[15][2-7]|22|3[2-4])|8(?:1[2-689]|2[2-8]|[35]2\\d))\\d{4}|25\\d{5,6}|(?:2[2-9]|6(?:1[2356]|[24][2-6]|3[24-6]|5[2-4]|6[2-8]|7[235-7]|8[245]|9[24])|8(?:3[24]|5[245]))\\d{4}",
  ,,,"1234567",,,[6,7,8,9],[5]],[,,"(?:17[01]|9(?:2[0-4]|(?:3[0-36]|(?:6\\d|8[89]|98)\\d)\\d|4(?:[1379]\\d|88)|5[0-6])\\d)\\d{4}|9(?:[69]1|73)\\d{6}|9(?:[68]\\d|9[089])\\d{5}|9(?:2[56]|34|4[0245]|7[5-9]|9[4-7])\\d{7}",,,,"92123456",,,[7,8,9,10]],[,,"80080(?:[01][1-9]|2\\d)\\d{3}",,,,"8008001234",,,[10]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"1333\\d{4}|[12]468\\d{4}",,,,"13331234",,,[8]],"MM",95,"00","0",,,"0",,,,[[,"(\\d)(\\d{2})(\\d{3})","$1 $2 $3",["16|2"],"0$1"],[,"(\\d{2})(\\d{2})(\\d{3})",
  "$1 $2 $3",["[45]|6(?:0[23]|[1-689]|7[235-7])|7(?:[0-4]|5[2-7])|8[1-6]"],"0$1"],[,"(\\d)(\\d{3})(\\d{3,4})","$1 $2 $3",["[12]"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{3,4})","$1 $2 $3",["[4-7]|8[1-35]"],"0$1"],[,"(\\d)(\\d{3})(\\d{4,6})","$1 $2 $3",["9(?:2[0-4]|[35-9]|4[137-9])"],"0$1"],[,"(\\d)(\\d{4})(\\d{4})","$1 $2 $3",["2"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["8"],"0$1"],[,"(\\d)(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3 $4",["92"],"0$1"],[,"(\\d)(\\d{5})(\\d{4})","$1 $2 $3",["9"],"0$1"]],,[,,,
  ,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],MN:[,[,,"[12]\\d{7,9}|[57-9]\\d{7}",,,,,,,[8,9,10],[4,5,6]],[,,"[12]2[1-3]\\d{5,6}|7(?:0[0-5]\\d|128)\\d{4}|(?:[12](?:1|27)|5[368])\\d{6}|[12](?:3[2-8]|4[2-68]|5[1-4689])\\d{6,7}",,,,"53123456",,,,[4,5,6]],[,,"(?:83[01]|920)\\d{5}|(?:5[05]|8[05689]|9[013-9])\\d{6}",,,,"88123456",,,[8]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"712[0-79]\\d{4}|7(?:1[013-9]|[5-8]\\d)\\d{5}",,,,"75123456",,,[8]],"MN",976,"001",
  "0",,,"0",,,,[[,"(\\d{2})(\\d{2})(\\d{4})","$1 $2 $3",["[12]1"],"0$1"],[,"(\\d{4})(\\d{4})","$1 $2",["[57-9]"]],[,"(\\d{3})(\\d{5,6})","$1 $2",["[12]2[1-3]"],"0$1"],[,"(\\d{4})(\\d{5,6})","$1 $2",["[12](?:27|3[2-8]|4[2-68]|5[1-4689])","[12](?:27|3[2-8]|4[2-68]|5[1-4689])[0-3]"],"0$1"],[,"(\\d{5})(\\d{4,5})","$1 $2",["[12]"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],MO:[,[,,"(?:28|[68]\\d)\\d{6}",,,,,,,[8]],[,,"(?:28[2-9]|8(?:11|[2-57-9]\\d))\\d{5}",,,,"28212345"],
  [,,"6(?:[235]\\d\\d|6(?:0[0-5]|[1-9]\\d)|8(?:[02][5-9]|[146-8]\\d|[35][0-4]))\\d{4}",,,,"66123456"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"MO",853,"00",,,,,,,,[[,"(\\d{4})(\\d{4})","$1 $2",["[268]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],MP:[,[,,"[58]\\d{9}|(?:67|90)0\\d{7}",,,,,,,[10],[7]],[,,"670(?:2(?:3[3-7]|56|8[4-8])|32[1-38]|4(?:33|8[348])|5(?:32|55|88)|6(?:64|70|82)|78[3589]|8[3-9]8|989)\\d{4}",,,,"6702345678",,,,[7]],
  [,,"670(?:2(?:3[3-7]|56|8[4-8])|32[1-38]|4(?:33|8[348])|5(?:32|55|88)|6(?:64|70|82)|78[3589]|8[3-9]8|989)\\d{4}",,,,"6702345678",,,,[7]],[,,"8(?:00|33|44|55|66|77|88)[2-9]\\d{6}",,,,"8002123456"],[,,"900[2-9]\\d{6}",,,,"9002123456"],[,,,,,,,,,[-1]],[,,"52(?:35(?:[02-46-9]\\d|1[02-9]|5[0-46-9])|45(?:[034]\\d|1[02-9]|2[024-9]|5[0-46-9]))\\d{4}|52(?:3[2-46-9]|4[2-4])(?:[02-9]\\d|1[02-9])\\d{4}|5(?:00|2[12]|33|44|66|77|88)[2-9]\\d{6}",,,,"5002345678"],[,,,,,,,,,[-1]],"MP",1,"011","1",,,"1|([2-9]\\d{6})$",
  "670$1",,1,,,[,,,,,,,,,[-1]],,"670",[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],MQ:[,[,,"69\\d{7}|(?:59|97)6\\d{6}",,,,,,,[9]],[,,"596(?:0[0-7]|10|2[7-9]|3[05-9]|4[0-46-8]|[5-7]\\d|8[09]|9[4-8])\\d{4}",,,,"596301234"],[,,"69(?:6(?:[0-47-9]\\d|5[0-6]|6[0-4])|727)\\d{4}",,,,"696201234"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"976(?:6[1-9]|7[0-367])\\d{4}",,,,"976612345"],"MQ",596,"00","0",,,"0",,,,[[,"(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[569]"],"0$1"]],
  ,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],MR:[,[,,"(?:[2-4]\\d\\d|800)\\d{5}",,,,,,,[8]],[,,"(?:25[08]|35\\d|45[1-7])\\d{5}",,,,"35123456"],[,,"[2-4][0-46-9]\\d{6}",,,,"22123456"],[,,"800\\d{5}",,,,"80012345"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"MR",222,"00",,,,,,,,[[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[2-48]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],MS:[,[,,"(?:[58]\\d\\d|664|900)\\d{7}",,,,,
  ,,[10],[7]],[,,"6644(?:1[0-3]|91)\\d{4}",,,,"6644912345",,,,[7]],[,,"664(?:3(?:49|9[1-6])|49[2-6])\\d{4}",,,,"6644923456",,,,[7]],[,,"8(?:00|33|44|55|66|77|88)[2-9]\\d{6}",,,,"8002123456"],[,,"900[2-9]\\d{6}",,,,"9002123456"],[,,,,,,,,,[-1]],[,,"52(?:35(?:[02-46-9]\\d|1[02-9]|5[0-46-9])|45(?:[034]\\d|1[02-9]|2[024-9]|5[0-46-9]))\\d{4}|52(?:3[2-46-9]|4[2-4])(?:[02-9]\\d|1[02-9])\\d{4}|5(?:00|2[12]|33|44|66|77|88)[2-9]\\d{6}",,,,"5002345678"],[,,,,,,,,,[-1]],"MS",1,"011","1",,,"1|([34]\\d{6})$","664$1",
  ,,,,[,,,,,,,,,[-1]],,"664",[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],MT:[,[,,"3550\\d{4}|(?:[2579]\\d\\d|800)\\d{5}",,,,,,,[8]],[,,"2(?:0(?:[19]\\d|3[1-4]|6[059])|[1-357]\\d\\d)\\d{4}",,,,"21001234"],[,,"(?:7(?:210|[79]\\d\\d)|9(?:[29]\\d\\d|69[67]|8(?:1[1-3]|89|97)))\\d{4}",,,,"96961234"],[,,"800[3467]\\d{4}",,,,"80071234"],[,,"5(?:0(?:0(?:37|43)|(?:6\\d|70|9[0168])\\d)|[12]\\d0[1-5])\\d{3}",,,,"50037123"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"3550\\d{4}",,,,"35501234"],"MT",356,"00",,,,,
  ,,,[[,"(\\d{4})(\\d{4})","$1 $2",["[2357-9]"]]],,[,,"7117\\d{4}",,,,"71171234"],,,[,,,,,,,,,[-1]],[,,"501\\d{5}",,,,"50112345"],,,[,,,,,,,,,[-1]]],MU:[,[,,"(?:[2-468]|5\\d)\\d{6}",,,,,,,[7,8]],[,,"(?:2(?:[0346-8]\\d|1[0-7])|4(?:[013568]\\d|2[4-7])|54(?:[34]\\d|71)|6\\d\\d|8(?:14|3[129]))\\d{4}",,,,"54480123"],[,,"5(?:4(?:2[1-389]|7[1-9])|87[15-8])\\d{4}|5(?:2[589]|4[3489]|7\\d|8[0-689]|9[0-8])\\d{5}",,,,"52512345",,,[8]],[,,"80[0-2]\\d{4}",,,,"8001234",,,[7]],[,,"30\\d{5}",,,,"3012345",,,[7]],[,,
  ,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"3(?:20|9\\d)\\d{4}",,,,"3201234",,,[7]],"MU",230,"0(?:0|[24-7]0|3[03])",,,,,,"020",,[[,"(\\d{3})(\\d{4})","$1 $2",["[2-46]|8[013]"]],[,"(\\d{4})(\\d{4})","$1 $2",["5"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],MV:[,[,,"(?:800|9[0-57-9]\\d)\\d{7}|[34679]\\d{6}",,,,,,,[7,10]],[,,"(?:3(?:0[0-3]|3[0-59])|6(?:[57][02468]|6[024-68]|8[024689]))\\d{4}",,,,"6701234",,,[7]],[,,"46[46]\\d{4}|(?:7\\d|9[13-9])\\d{5}",,,,"7712345",,,[7]],[,,"800\\d{7}",
  ,,,"8001234567",,,[10]],[,,"900\\d{7}",,,,"9001234567",,,[10]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"MV",960,"0(?:0|19)",,,,,,"00",,[[,"(\\d{3})(\\d{4})","$1-$2",["[3467]|9[13-9]"]],[,"(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["[89]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"4[05]0\\d{4}",,,,"4001234",,,[7]],,,[,,,,,,,,,[-1]]],MW:[,[,,"1\\d{6}(?:\\d{2})?|(?:[23]1|77|88|99)\\d{7}",,,,,,,[7,9]],[,,"(?:1[2-9]|21\\d\\d)\\d{5}",,,,"1234567"],[,,"111\\d{6}|(?:31|77|88|99)\\d{7}",,,,"991234567",,
  ,[9]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"MW",265,"00","0",,,"0",,,,[[,"(\\d)(\\d{3})(\\d{3})","$1 $2 $3",["1[2-9]"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["2"],"0$1"],[,"(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[137-9]"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],MX:[,[,,"(?:1(?:[01467]\\d|[2359][1-9]|8[1-79])|[2-9]\\d)\\d{8}",,,,,,,[10,11],[7,8]],[,,"(?:2(?:0[01]|2[1-9]|3[1-35-8]|4[13-9]|7[1-689]|8[1-578]|9[467])|3(?:1[1-79]|[2458][1-9]|3\\d|7[1-8]|9[1-5])|4(?:1[1-57-9]|[24-7][1-9]|3[1-8]|8[1-35-9]|9[2-689])|5(?:[56]\\d|88|9[1-79])|6(?:1[2-68]|[2-4][1-9]|5[1-3689]|6[1-57-9]|7[1-7]|8[67]|9[4-8])|7(?:[1-467][1-9]|5[13-9]|8[1-69]|9[17])|8(?:1\\d|2[13-689]|3[1-6]|4[124-6]|6[1246-9]|7[1-378]|9[12479])|9(?:1[346-9]|2[1-4]|3[2-46-8]|5[1348]|[69][1-9]|7[12]|8[1-8]))\\d{7}",
  ,,,"2001234567",,,[10],[7,8]],[,,"(?:1(?:2(?:2[1-9]|3[1-35-8]|4[13-9]|7[1-689]|8[1-578]|9[467])|3(?:1[1-79]|[2458][1-9]|3\\d|7[1-8]|9[1-5])|4(?:1[1-57-9]|[24-7][1-9]|3[1-8]|8[1-35-9]|9[2-689])|5(?:[56]\\d|88|9[1-79])|6(?:1[2-68]|[2-4][1-9]|5[1-3689]|6[1-57-9]|7[1-7]|8[67]|9[4-8])|7(?:[1-467][1-9]|5[13-9]|8[1-69]|9[17])|8(?:1\\d|2[13-689]|3[1-6]|4[124-6]|6[1246-9]|7[1-378]|9[12479])|9(?:1[346-9]|2[1-4]|3[2-46-8]|5[1348]|[69][1-9]|7[12]|8[1-8]))|2(?:2[1-9]|3[1-35-8]|4[13-9]|7[1-689]|8[1-578]|9[467])|3(?:1[1-79]|[2458][1-9]|3\\d|7[1-8]|9[1-5])|4(?:1[1-57-9]|[24-7][1-9]|3[1-8]|8[1-35-9]|9[2-689])|5(?:[56]\\d|88|9[1-79])|6(?:1[2-68]|[2-4][1-9]|5[1-3689]|6[1-57-9]|7[1-7]|8[67]|9[4-8])|7(?:[1-467][1-9]|5[13-9]|8[1-69]|9[17])|8(?:1\\d|2[13-689]|3[1-6]|4[124-6]|6[1246-9]|7[1-378]|9[12479])|9(?:1[346-9]|2[1-4]|3[2-46-8]|5[1348]|[69][1-9]|7[12]|8[1-8]))\\d{7}",
  ,,,"12221234567",,,,[7,8]],[,,"8(?:00|88)\\d{7}",,,,"8001234567",,,[10]],[,,"900\\d{7}",,,,"9001234567",,,[10]],[,,"300\\d{7}",,,,"3001234567",,,[10]],[,,"500\\d{7}",,,,"5001234567",,,[10]],[,,,,,,,,,[-1]],"MX",52,"0[09]","01",,,"0(?:[12]|4[45])|1",,"00",,[[,"(\\d{5})","$1",["53"]],[,"(\\d{2})(\\d{4})(\\d{4})","$1 $2 $3",["33|5[56]|81"],,,1],[,"(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["[2-9]"],,,1],[,"(\\d)(\\d{2})(\\d{4})(\\d{4})","$2 $3 $4",["1(?:33|5[56]|81)"],,,1],[,"(\\d)(\\d{3})(\\d{3})(\\d{4})",
  "$2 $3 $4",["1"],,,1]],[[,"(\\d{2})(\\d{4})(\\d{4})","$1 $2 $3",["33|5[56]|81"],,,1],[,"(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["[2-9]"],,,1],[,"(\\d)(\\d{2})(\\d{4})(\\d{4})","$2 $3 $4",["1(?:33|5[56]|81)"],,,1],[,"(\\d)(\\d{3})(\\d{3})(\\d{4})","$2 $3 $4",["1"],,,1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],MY:[,[,,"1\\d{8,9}|(?:3\\d|[4-9])\\d{7}",,,,,,,[8,9,10],[6,7]],[,,"(?:3(?:2[0-36-9]|3[0-368]|4[0-278]|5[0-24-8]|6[0-467]|7[1246-9]|8\\d|9[0-57])\\d|4(?:2[0-689]|[3-79]\\d|8[1-35689])|5(?:2[0-589]|[3468]\\d|5[0-489]|7[1-9]|9[23])|6(?:2[2-9]|3[1357-9]|[46]\\d|5[0-6]|7[0-35-9]|85|9[015-8])|7(?:[2579]\\d|3[03-68]|4[0-8]|6[5-9]|8[0-35-9])|8(?:[24][2-8]|3[2-5]|5[2-7]|6[2-589]|7[2-578]|[89][2-9])|9(?:0[57]|13|[25-7]\\d|[3489][0-8]))\\d{5}",
  ,,,"323856789",,,[8,9],[6,7]],[,,"1(?:4400|8(?:47|8[27])[0-4])\\d{4}|1(?:0(?:[23568]\\d|4[0-6]|7[016-9]|9[0-8])|1(?:[1-5]\\d\\d|6(?:0[5-9]|[1-9]\\d)|7(?:0\\d|1[01]))|(?:(?:[269]|59)\\d|[37][1-9]|4[235-9])\\d|8(?:1[23]|[236]\\d|4[06]|5[7-9]|7[016-9]|8[01]|9[0-8]))\\d{5}",,,,"123456789",,,[9,10]],[,,"1[378]00\\d{6}",,,,"1300123456",,,[10]],[,,"1600\\d{6}",,,,"1600123456",,,[10]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"15(?:4(?:6[0-4]\\d|8(?:0[125]|[17]\\d|21|3[01]|4[01589]|5[014]|6[02]))|6(?:32[0-6]|78\\d))\\d{4}",
  ,,,"1546012345",,,[10]],"MY",60,"00","0",,,"0",,,,[[,"(\\d)(\\d{3})(\\d{4})","$1-$2 $3",["[4-79]"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{3,4})","$1-$2 $3",["1(?:[02469]|[378][1-9])|8"],"0$1"],[,"(\\d)(\\d{4})(\\d{4})","$1-$2 $3",["3"],"0$1"],[,"(\\d)(\\d{3})(\\d{2})(\\d{4})","$1-$2-$3-$4",["1[36-8]"]],[,"(\\d{3})(\\d{3})(\\d{4})","$1-$2 $3",["15"],"0$1"],[,"(\\d{2})(\\d{4})(\\d{4})","$1-$2 $3",["1"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],MZ:[,[,,"(?:2|8\\d)\\d{7}",
  ,,,,,,[8,9]],[,,"2(?:[1346]\\d|5[0-2]|[78][12]|93)\\d{5}",,,,"21123456",,,[8]],[,,"8[2-79]\\d{7}",,,,"821234567",,,[9]],[,,"800\\d{6}",,,,"800123456",,,[9]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"MZ",258,"00",,,,,,,,[[,"(\\d{2})(\\d{3})(\\d{3,4})","$1 $2 $3",["2|8[2-79]"]],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["8"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],NA:[,[,,"[68]\\d{7,8}",,,,,,,[8,9]],[,,"6(?:1(?:[02-4]\\d\\d|17)|2(?:17|54\\d|69|70)|3(?:17|2[0237]\\d|34|6[289]|7[01]|81)|4(?:17|(?:27|41|5[25])\\d|69|7[01])|5(?:17|2[236-8]\\d|69|7[01])|6(?:17|26\\d|38|42|69|7[01])|7(?:17|(?:2[2-4]|30)\\d|6[89]|7[01]))\\d{4}|6(?:1(?:2[2-7]|3[01378]|4[0-4]|69|7[014])|25[0-46-8]|32\\d|4(?:2[0-27]|4[016]|5[0-357])|52[02-9]|62[56]|7(?:2[2-69]|3[013]))\\d{4}",
  ,,,"61221234"],[,,"(?:60|8[1245])\\d{7}",,,,"811234567",,,[9]],[,,"80\\d{7}",,,,"800123456",,,[9]],[,,"8701\\d{5}",,,,"870123456",,,[9]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"8(?:3\\d\\d|86)\\d{5}",,,,"88612345"],"NA",264,"00","0",,,"0",,,,[[,"(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["88"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{3,4})","$1 $2 $3",["6"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["87"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["8"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,
  [-1]],,,[,,,,,,,,,[-1]]],NC:[,[,,"[2-57-9]\\d{5}",,,,,,,[6]],[,,"(?:2[03-9]|3[0-5]|4[1-7]|88)\\d{4}",,,,"201234"],[,,"(?:5[0-4]|[79]\\d|8[0-79])\\d{4}",,,,"751234"],[,,,,,,,,,[-1]],[,,"36\\d{4}",,,,"366711"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"NC",687,"00",,,,,,,,[[,"(\\d{3})","$1",["5[6-8]"]],[,"(\\d{2})(\\d{2})(\\d{2})","$1.$2.$3",["[2-57-9]"]]],[[,"(\\d{2})(\\d{2})(\\d{2})","$1.$2.$3",["[2-57-9]"]]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],NE:[,[,,"[0289]\\d{7}",
  ,,,,,,[8]],[,,"2(?:0(?:20|3[1-8]|4[13-5]|5[14]|6[14578]|7[1-578])|1(?:4[145]|5[14]|6[14-68]|7[169]|88))\\d{4}",,,,"20201234"],[,,"(?:23|8[014589]|9\\d)\\d{6}",,,,"93123456"],[,,"08\\d{6}",,,,"08123456"],[,,"09\\d{6}",,,,"09123456"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"NE",227,"00",,,,,,,,[[,"(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["08"]],[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[089]|2[013]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],NF:[,[,,"[13]\\d{5}",
  ,,,,,,[6],[5]],[,,"(?:1(?:06|17|28|39)|3[0-2]\\d)\\d{3}",,,,"106609",,,,[5]],[,,"(?:14|3[58])\\d{4}",,,,"381234",,,,[5]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"NF",672,"00",,,,"([0-258]\\d{4})$","3$1",,,[[,"(\\d{2})(\\d{4})","$1 $2",["1[0-3]"]],[,"(\\d)(\\d{5})","$1 $2",["[13]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],NG:[,[,,"(?:[124-7]|9\\d{3})\\d{6}|[1-9]\\d{7}|[78]\\d{9,13}",,,,,,,[7,8,10,11,12,13,14],[5,6]],[,,"(?:(?:[1-356]\\d|4[02-8]|8[2-9])\\d|9(?:0[3-9]|[1-9]\\d))\\d{5}|7(?:0(?:[013-689]\\d|2[0-24-9])\\d{3,4}|[1-79]\\d{6})|(?:[12]\\d|4[147]|5[14579]|6[1578]|7[1-3578])\\d{5}",
  ,,,"18040123",,,[7,8],[5,6]],[,,"(?:702[0-24-9]|8(?:01|19)[01])\\d{6}|(?:70[13-689]|8(?:0[2-9]|1[0-8])|90[1-9])\\d{7}",,,,"8021234567",,,[10]],[,,"800\\d{7,11}",,,,"80017591759",,,[10,11,12,13,14]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"NG",234,"009","0",,,"0",,,,[[,"(\\d{2})(\\d{2})(\\d{3})","$1 $2 $3",["78"],"0$1"],[,"(\\d)(\\d{3})(\\d{3,4})","$1 $2 $3",["[12]|9(?:0[3-9]|[1-9])"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{2,3})","$1 $2 $3",["[3-7]|8[2-9]"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{3,4})",
  "$1 $2 $3",["[7-9]"],"0$1"],[,"(\\d{3})(\\d{4})(\\d{4,5})","$1 $2 $3",["[78]"],"0$1"],[,"(\\d{3})(\\d{5})(\\d{5,6})","$1 $2 $3",["[78]"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"700\\d{7,11}",,,,"7001234567",,,[10,11,12,13,14]],,,[,,,,,,,,,[-1]]],NI:[,[,,"(?:1800|[25-8]\\d{3})\\d{4}",,,,,,,[8]],[,,"2\\d{7}",,,,"21234567"],[,,"(?:5(?:5[0-7]|[78]\\d)|6(?:20|3[035]|4[045]|5[05]|77|8[1-9]|9[059])|(?:7[5-8]|8\\d)\\d)\\d{5}",,,,"81234567"],[,,"1800\\d{4}",,,,"18001234"],[,,,,,,,,,[-1]],[,,,,,,,,,
  [-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"NI",505,"00",,,,,,,,[[,"(\\d{4})(\\d{4})","$1 $2",["[125-8]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],NL:[,[,,"(?:[124-7]\\d\\d|3(?:[02-9]\\d|1[0-8]))\\d{6}|[89]\\d{6,9}|1\\d{4,5}",,,,,,,[5,6,7,8,9,10]],[,,"(?:1(?:[035]\\d|1[13-578]|6[124-8]|7[24]|8[0-467])|2(?:[0346]\\d|2[2-46-9]|5[125]|9[479])|3(?:[03568]\\d|1[3-8]|2[01]|4[1-8])|4(?:[0356]\\d|1[1-368]|7[58]|8[15-8]|9[23579])|5(?:[0358]\\d|[19][1-9]|2[1-57-9]|4[13-8]|6[126]|7[0-3578])|7\\d\\d)\\d{6}",
  ,,,"101234567",,,[9]],[,,"6[1-58]\\d{7}",,,,"612345678",,,[9]],[,,"800\\d{4,7}",,,,"8001234",,,[7,8,9,10]],[,,"90[069]\\d{4,7}",,,,"9061234",,,[7,8,9,10]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"(?:85|91)\\d{7}",,,,"851234567",,,[9]],"NL",31,"00","0",,,"0",,,,[[,"(\\d{4})","$1",["1[238]|[34]"]],[,"(\\d{2})(\\d{3,4})","$1 $2",["14"]],[,"(\\d{6})","$1",["1"]],[,"(\\d{3})(\\d{4,7})","$1 $2",["[89]0"],"0$1"],[,"(\\d{2})(\\d{7})","$1 $2",["66"],"0$1"],[,"(\\d)(\\d{8})","$1 $2",["6"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{3})",
  "$1 $2 $3",["1[16-8]|2[259]|3[124]|4[17-9]|5[124679]"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["[1-57-9]"],"0$1"]],[[,"(\\d{3})(\\d{4,7})","$1 $2",["[89]0"],"0$1"],[,"(\\d{2})(\\d{7})","$1 $2",["66"],"0$1"],[,"(\\d)(\\d{8})","$1 $2",["6"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["1[16-8]|2[259]|3[124]|4[17-9]|5[124679]"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["[1-57-9]"],"0$1"]],[,,"66\\d{7}",,,,"662345678",,,[9]],,,[,,"140(?:1[035]|2[0346]|3[03568]|4[0356]|5[0358]|8[458])|140(?:1[16-8]|2[259]|3[124]|4[17-9]|5[124679]|7)\\d",
  ,,,,,,[5,6]],[,,"140(?:1[035]|2[0346]|3[03568]|4[0356]|5[0358]|8[458])|(?:140(?:1[16-8]|2[259]|3[124]|4[17-9]|5[124679]|7)|8[478]\\d{6})\\d",,,,"14020",,,[5,6,9]],,,[,,,,,,,,,[-1]]],NO:[,[,,"(?:0|[2-9]\\d{3})\\d{4}",,,,,,,[5,8]],[,,"(?:2[1-4]|3[1-3578]|5[1-35-7]|6[1-4679]|7[0-8])\\d{6}",,,,"21234567",,,[8]],[,,"(?:4[015-8]|5[89]|9\\d)\\d{6}",,,,"40612345",,,[8]],[,,"80[01]\\d{5}",,,,"80012345",,,[8]],[,,"82[09]\\d{5}",,,,"82012345",,,[8]],[,,"810(?:0[0-6]|[2-8]\\d)\\d{3}",,,,"81021234",,,[8]],[,,
  "880\\d{5}",,,,"88012345",,,[8]],[,,"85[0-5]\\d{5}",,,,"85012345",,,[8]],"NO",47,"00",,,,,,,,[[,"(\\d{3})(\\d{2})(\\d{3})","$1 $2 $3",["[489]|5[89]"]],[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[235-7]"]]],,[,,,,,,,,,[-1]],1,"[02-689]|7[0-8]",[,,,,,,,,,[-1]],[,,"(?:0[2-9]|81(?:0(?:0[7-9]|1\\d)|5\\d\\d))\\d{3}",,,,"02000"],,,[,,"81[23]\\d{5}",,,,"81212345",,,[8]]],NP:[,[,,"9\\d{9}|[1-9]\\d{7}",,,,,,,[8,10],[6,7]],[,,"(?:1[0-6]\\d|99[02-6])\\d{5}|(?:2[13-79]|3[135-8]|4[146-9]|5[135-7]|6[13-9]|7[15-9]|8[1-46-9]|9[1-7])[2-6]\\d{5}",
  ,,,"14567890",,,[8],[6,7]],[,,"9(?:6[0-3]|7[245]|8[0-24-68])\\d{7}",,,,"9841234567",,,[10]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"NP",977,"00","0",,,"0",,,,[[,"(\\d)(\\d{7})","$1-$2",["1[2-6]"],"0$1"],[,"(\\d{2})(\\d{6})","$1-$2",["[1-8]|9(?:[1-579]|6[2-6])"],"0$1"],[,"(\\d{3})(\\d{7})","$1-$2",["9"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],NR:[,[,,"(?:444|(?:55|8\\d)\\d|666)\\d{4}",,,,,,,[7]],[,,"444\\d{4}",,,,"4441234"],[,
  ,"(?:55[3-9]|666|8\\d\\d)\\d{4}",,,,"5551234"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"NR",674,"00",,,,,,,,[[,"(\\d{3})(\\d{4})","$1 $2",["[4-68]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],NU:[,[,,"(?:[47]|888\\d)\\d{3}",,,,,,,[4,7]],[,,"[47]\\d{3}",,,,"7012",,,[4]],[,,"888[4-9]\\d{3}",,,,"8884012",,,[7]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"NU",683,"00",,,,,,,,[[,"(\\d{3})(\\d{4})",
  "$1 $2",["8"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],NZ:[,[,,"[29]\\d{7,9}|50\\d{5}(?:\\d{2,3})?|6[0-35-9]\\d{6}|7\\d{7,8}|8\\d{4,9}|(?:11\\d|[34])\\d{7}",,,,,,,[5,6,7,8,9,10]],[,,"24099\\d{3}|(?:3[2-79]|[49][2-9]|6[235-9]|7[2-57-9])\\d{6}",,,,"32345678",,,[8],[7]],[,,"2[0-27-9]\\d{7,8}|21\\d{6}",,,,"211234567",,,[8,9,10]],[,,"508\\d{6,7}|80\\d{6,8}",,,,"800123456",,,[8,9,10]],[,,"(?:11\\d{5}|50(?:0[08]|30|66|77))\\d{3}|90\\d{6,8}",,,,"900123456",,,[7,8,9,10]],[,,
  ,,,,,,,[-1]],[,,"70\\d{7}",,,,"701234567",,,[9]],[,,,,,,,,,[-1]],"NZ",64,"0(?:0|161)","0",,,"0",,"00",,[[,"(\\d{2})(\\d{3,8})","$1 $2",["83"],"0$1"],[,"(\\d{3})(\\d{2})(\\d{2,3})","$1 $2 $3",["50[0367]|[89]0"],"0$1"],[,"(\\d)(\\d{3})(\\d{4})","$1-$2 $3",["24|[346]|7[2-57-9]|9[2-9]"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{3,4})","$1 $2 $3",["2(?:10|74)|[59]|80"],"0$1"],[,"(\\d{2})(\\d{3,4})(\\d{4})","$1 $2 $3",["1|2[028]"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{3,5})","$1 $2 $3",["2(?:[169]|7[0-35-9])|7|86"],"0$1"]],
  ,[,,"[28]6\\d{6,7}",,,,"26123456",,,[8,9]],,,[,,,,,,,,,[-1]],[,,"83\\d{3,8}",,,,"83012378"],,,[,,,,,,,,,[-1]]],OM:[,[,,"(?:1505|[279]\\d{3}|500)\\d{4}|8007\\d{4,5}",,,,,,,[7,8,9]],[,,"2[2-6]\\d{6}",,,,"23123456",,,[8]],[,,"(?:1505|90[1-9]\\d)\\d{4}|(?:7[1289]|9[1-9])\\d{6}",,,,"92123456",,,[8]],[,,"500\\d{4}|8007\\d{4,5}",,,,"80071234"],[,,"900\\d{5}",,,,"90012345",,,[8]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"OM",968,"00",,,,,,,,[[,"(\\d{3})(\\d{4,6})","$1 $2",["[58]"]],[,"(\\d{2})(\\d{6})",
  "$1 $2",["2"]],[,"(\\d{4})(\\d{4})","$1 $2",["[179]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],PA:[,[,,"(?:[1-57-9]|6\\d)\\d{6}",,,,,,,[7,8]],[,,"(?:1(?:0\\d|1[479]|2[37]|3[0137]|4[17]|5[05]|6[58]|7[0167]|8[258]|9[139])|2(?:[0235-79]\\d|1[0-7]|4[013-9]|8[026-9])|3(?:[089]\\d|1[014-7]|2[0-5]|33|4[0-79]|55|6[068]|7[03-8])|4(?:00|3[0-579]|4\\d|7[0-57-9])|5(?:[01]\\d|2[0-7]|[56]0|79)|7(?:0[09]|2[0-26-8]|3[03]|4[04]|5[05-9]|6[056]|7[0-24-9]|8[6-9]|90)|8(?:09|2[89]|3\\d|4[0-24-689]|5[014]|8[02])|9(?:0[5-9]|1[0135-8]|2[036-9]|3[35-79]|40|5[0457-9]|6[05-9]|7[04-9]|8[35-8]|9\\d))\\d{4}",
  ,,,"2001234",,,[7]],[,,"(?:1[16]1|21[89]|6(?:[02-9]\\d|1[0-6])\\d|8(?:1[01]|7[23]))\\d{4}",,,,"61234567"],[,,"800\\d{4}",,,,"8001234",,,[7]],[,,"(?:8(?:22|55|60|7[78]|86)|9(?:00|81))\\d{4}",,,,"8601234",,,[7]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"PA",507,"00",,,,,,,,[[,"(\\d{3})(\\d{4})","$1-$2",["[1-57-9]"]],[,"(\\d{4})(\\d{4})","$1-$2",["6"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],PE:[,[,,"(?:[14-8]|9\\d)\\d{7}",,,,,,,[8,9],[6,7]],[,,"(?:(?:4[34]|5[14])[0-8]\\d|7(?:173|3[0-8]\\d)|8(?:10[05689]|6(?:0[06-9]|1[6-9]|29)|7(?:0[569]|[56]0)))\\d{4}|(?:1[0-8]|4[12]|5[236]|6[1-7]|7[246]|8[2-4])\\d{6}",
  ,,,"11234567",,,[8],[6,7]],[,,"9\\d{8}",,,,"912345678",,,[9]],[,,"800\\d{5}",,,,"80012345",,,[8]],[,,"805\\d{5}",,,,"80512345",,,[8]],[,,"801\\d{5}",,,,"80112345",,,[8]],[,,"80[24]\\d{5}",,,,"80212345",,,[8]],[,,,,,,,,,[-1]],"PE",51,"19(?:1[124]|77|90)00","0"," Anexo ",,"0",,,,[[,"(\\d{3})(\\d{5})","$1 $2",["80"],"(0$1)"],[,"(\\d)(\\d{7})","$1 $2",["1"],"(0$1)"],[,"(\\d{2})(\\d{6})","$1 $2",["[4-8]"],"(0$1)"],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["9"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,
  ,,,,,[-1]],,,[,,,,,,,,,[-1]]],PF:[,[,,"[48]\\d{7}|4\\d{5}",,,,,,,[6,8]],[,,"4(?:0[4-689]|9[4-68])\\d{5}",,,,"40412345",,,[8]],[,,"8[7-9]\\d{6}",,,,"87123456",,,[8]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"499\\d{5}",,,,"49901234",,,[8]],"PF",689,"00",,,,,,,,[[,"(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3",["44"]],[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[48]"]]],,[,,,,,,,,,[-1]],,,[,,"44\\d{4}",,,,,,,[6]],[,,"44\\d{4}",,,,"440123",,,[6]],,,[,,,,,,,,,[-1]]],PG:[,[,,
  "(?:180|[78]\\d{3})\\d{4}|(?:[2-589]\\d|64)\\d{5}",,,,,,,[7,8]],[,,"(?:64[1-9]|7730|85[02-46-9])\\d{4}|(?:3[0-2]|4[257]|5[34]|77[0-24]|9[78])\\d{5}",,,,"3123456"],[,,"77(?:3[1-9]|[5-9]\\d)\\d{4}|(?:7[0-689]|81)\\d{6}",,,,"70123456",,,[8]],[,,"180\\d{4}",,,,"1801234",,,[7]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"2(?:0[0-47]|7[568])\\d{4}",,,,"2751234",,,[7]],"PG",675,"00|140[1-3]",,,,,,"00",,[[,"(\\d{3})(\\d{4})","$1 $2",["18|[2-69]|85"]],[,"(\\d{4})(\\d{4})","$1 $2",["[78]"]]],,[,,"27[01]\\d{4}",
  ,,,"2700123",,,[7]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],PH:[,[,,"1800\\d{7,9}|(?:2|[89]\\d{4})\\d{5}|[2-8]\\d{8}|[28]\\d{7}",,,,,,,[6,8,9,10,11,12,13],[4,5,7]],[,,"(?:(?:2[3-8]|3[2-68]|4[2-9]|5[2-6]|6[2-58]|7[24578])\\d{3}|88(?:22\\d\\d|42))\\d{4}|2\\d{5}(?:\\d{2})?|8[2-8]\\d{7}",,,,"21234567",,,[6,8,9,10],[4,5,7]],[,,"(?:81[37]|9(?:0[5-9]|1[0-24-9]|2[0-35-9]|[35]\\d|4[235-9]|6[0-25-8]|7[1-9]|8[189]|9[4-9]))\\d{7}",,,,"9051234567",,,[10]],[,,"1800\\d{7,9}",,,,"180012345678",,,[11,
  12,13]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"PH",63,"00","0",,,"0",,,,[[,"(\\d)(\\d{5})","$1 $2",["2"],"(0$1)"],[,"(\\d)(\\d{3})(\\d{4})","$1 $2 $3",["2"],"(0$1)"],[,"(\\d{4})(\\d{4,6})","$1 $2",["3(?:23|39|46)|4(?:2[3-6]|[35]9|4[26]|76)|544|88[245]|(?:52|64|86)2","3(?:230|397|461)|4(?:2(?:35|[46]4|51)|396|4(?:22|63)|59[347]|76[15])|5(?:221|446)|642[23]|8(?:622|8(?:[24]2|5[13]))"],"(0$1)"],[,"(\\d{5})(\\d{4})","$1 $2",["346|4(?:27|9[35])|883","3469|4(?:279|9(?:30|56))|8834"],
  "(0$1)"],[,"(\\d)(\\d{4})(\\d{4})","$1 $2 $3",["2"],"(0$1)"],[,"(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["[3-7]|8[2-8]"],"(0$1)"],[,"(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["[89]"],"0$1"],[,"(\\d{4})(\\d{3})(\\d{4})","$1 $2 $3",["1"]],[,"(\\d{4})(\\d{1,2})(\\d{3})(\\d{4})","$1 $2 $3 $4",["1"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],PK:[,[,,"122\\d{6}|[24-8]\\d{10,11}|9(?:[013-9]\\d{8,10}|2(?:[01]\\d\\d|2(?:[06-8]\\d|1[01]))\\d{7})|(?:[2-8]\\d{3}|92(?:[0-7]\\d|8[1-9]))\\d{6}|[24-9]\\d{8}|[89]\\d{7}",
  ,,,,,,[8,9,10,11,12],[5,6,7]],[,,"(?:(?:21|42)[2-9]|58[126])\\d{7}|(?:2[25]|4[0146-9]|5[1-35-7]|6[1-8]|7[14]|8[16]|91)[2-9]\\d{6,7}|(?:2(?:3[2358]|4[2-4]|9[2-8])|45[3479]|54[2-467]|60[468]|72[236]|8(?:2[2-689]|3[23578]|4[3478]|5[2356])|9(?:2[2-8]|3[27-9]|4[2-6]|6[3569]|9[25-8]))[2-9]\\d{5,6}",,,,"2123456789",,,[9,10],[5,6,7,8]],[,,"3(?:[014]\\d|2[0-5]|3[0-7]|55|64)\\d{7}",,,,"3012345678",,,[10]],[,,"800\\d{5}",,,,"80012345",,,[8]],[,,"900\\d{5}",,,,"90012345",,,[8]],[,,,,,,,,,[-1]],[,,"122\\d{6}",
  ,,,"122044444",,,[9]],[,,,,,,,,,[-1]],"PK",92,"00","0",,,"0",,,,[[,"(\\d{3})(\\d{3})(\\d{2})","$1 $2 $3",["[89]0"],"0$1"],[,"(\\d{4})(\\d{5})","$1 $2",["1"]],[,"(\\d{3})(\\d{6,7})","$1 $2",["2(?:3[2358]|4[2-4]|9[2-8])|45[3479]|54[2-467]|60[468]|72[236]|8(?:2[2-689]|3[23578]|4[3478]|5[2356])|9(?:2[2-8]|3[27-9]|4[2-6]|6[3569]|9[25-8])","9(?:2[3-8]|98)|(?:2(?:3[2358]|4[2-4]|9[2-8])|45[3479]|54[2-467]|60[468]|72[236]|8(?:2[2-689]|3[23578]|4[3478]|5[2356])|9(?:22|3[27-9]|4[2-6]|6[3569]|9[25-7]))[2-9]"],
  "(0$1)"],[,"(\\d{2})(\\d{7,8})","$1 $2",["(?:2[125]|4[0-246-9]|5[1-35-7]|6[1-8]|7[14]|8[16]|91)[2-9]"],"(0$1)"],[,"(\\d{5})(\\d{5})","$1 $2",["58"],"(0$1)"],[,"(\\d{3})(\\d{7})","$1 $2",["3"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3 $4",["2[125]|4[0-246-9]|5[1-35-7]|6[1-8]|7[14]|8[16]|91"],"(0$1)"],[,"(\\d{3})(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3 $4",["[24-9]"],"(0$1)"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"(?:2(?:[125]|3[2358]|4[2-4]|9[2-8])|4(?:[0-246-9]|5[3479])|5(?:[1-35-7]|4[2-467])|6(?:0[468]|[1-8])|7(?:[14]|2[236])|8(?:[16]|2[2-689]|3[23578]|4[3478]|5[2356])|9(?:1|22|3[27-9]|4[2-6]|6[3569]|9[2-7]))111\\d{6}",
  ,,,"21111825888",,,[11,12]],,,[,,,,,,,,,[-1]]],PL:[,[,,"[1-57-9]\\d{6}(?:\\d{2})?|6\\d{5,8}",,,,,,,[6,7,8,9]],[,,"(?:1[2-8]|2[2-69]|3[2-4]|4[1-468]|5[24-689]|6[1-3578]|7[14-7]|8[1-79]|9[145])(?:[02-9]\\d{6}|1(?:[0-8]\\d{5}|9\\d{3}(?:\\d{2})?))",,,,"123456789",,,[7,9]],[,,"(?:45|5[0137]|6[069]|7[2389]|88)\\d{7}",,,,"512345678",,,[9]],[,,"800\\d{6}",,,,"800123456",,,[9]],[,,"70[01346-8]\\d{6}",,,,"701234567",,,[9]],[,,"801\\d{6}",,,,"801234567",,,[9]],[,,,,,,,,,[-1]],[,,"39\\d{7}",,,,"391234567",,,
  [9]],"PL",48,"00",,,,,,,,[[,"(\\d{5})","$1",["19"]],[,"(\\d{3})(\\d{3})","$1 $2",["11|64"]],[,"(\\d{2})(\\d{2})(\\d{3})","$1 $2 $3",["(?:1[2-8]|2[2-69]|3[2-4]|4[1-468]|5[24-689]|6[1-3578]|7[14-7]|8[1-79]|9[145])1","(?:1[2-8]|2[2-69]|3[2-4]|4[1-468]|5[24-689]|6[1-3578]|7[14-7]|8[1-79]|9[145])19"]],[,"(\\d{3})(\\d{2})(\\d{2,3})","$1 $2 $3",["64"]],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["39|45|5[0137]|6[0469]|7[02389]|8[08]"]],[,"(\\d{2})(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3 $4",["1[2-8]|[2-8]|9[145]"]]],
  ,[,,"64\\d{4,7}",,,,"641234567"],,,[,,,,,,,,,[-1]],[,,"804\\d{6}",,,,"804123456",,,[9]],,,[,,,,,,,,,[-1]]],PM:[,[,,"[45]\\d{5}",,,,,,,[6]],[,,"(?:4[1-3]|50)\\d{4}",,,,"430123"],[,,"(?:4[02-4]|5[05])\\d{4}",,,,"551234"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"PM",508,"00","0",,,"0",,,,[[,"(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3",["[45]"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],PR:[,[,,"(?:[589]\\d\\d|787)\\d{7}",,,,,,,[10],
  [7]],[,,"(?:787|939)[2-9]\\d{6}",,,,"7872345678",,,,[7]],[,,"(?:787|939)[2-9]\\d{6}",,,,"7872345678",,,,[7]],[,,"8(?:00|33|44|55|66|77|88)[2-9]\\d{6}",,,,"8002345678"],[,,"900[2-9]\\d{6}",,,,"9002345678"],[,,,,,,,,,[-1]],[,,"52(?:35(?:[02-46-9]\\d|1[02-9]|5[0-46-9])|45(?:[034]\\d|1[02-9]|2[024-9]|5[0-46-9]))\\d{4}|52(?:3[2-46-9]|4[2-4])(?:[02-9]\\d|1[02-9])\\d{4}|5(?:00|2[12]|33|44|66|77|88)[2-9]\\d{6}",,,,"5002345678"],[,,,,,,,,,[-1]],"PR",1,"011","1",,,"1",,,1,,,[,,,,,,,,,[-1]],,"787|939",[,,,,
  ,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],PS:[,[,,"[2489]2\\d{6}|(?:1\\d|5)\\d{8}",,,,,,,[8,9,10],[7]],[,,"(?:22[2-47-9]|42[45]|82[014-68]|92[3569])\\d{5}",,,,"22234567",,,[8],[7]],[,,"5[69]\\d{7}",,,,"599123456",,,[9]],[,,"1800\\d{6}",,,,"1800123456",,,[10]],[,,,,,,,,,[-1]],[,,"1700\\d{6}",,,,"1700123456",,,[10]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"PS",970,"00","0",,,"0",,,,[[,"(\\d)(\\d{3})(\\d{4})","$1 $2 $3",["[2489]"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["5"],"0$1"],[,"(\\d{4})(\\d{3})(\\d{3})",
  "$1 $2 $3",["1"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],PT:[,[,,"(?:[26-9]\\d|30)\\d{7}",,,,,,,[9]],[,,"2(?:[12]\\d|[35][1-689]|4[1-59]|6[1-35689]|7[1-9]|8[1-69]|9[1256])\\d{6}",,,,"212345678"],[,,"6[356]9230\\d{3}|(?:6[036]93|9(?:[1-36]\\d\\d|480))\\d{5}",,,,"912345678"],[,,"80[02]\\d{6}",,,,"800123456"],[,,"(?:6(?:0[178]|4[68])\\d|76(?:0[1-57]|1[2-47]|2[237]))\\d{5}",,,,"760123456"],[,,"80(?:8\\d|9[1579])\\d{5}",,,,"808123456"],[,,"884[0-4689]\\d{5}",,,,"884123456"],
  [,,"30\\d{7}",,,,"301234567"],"PT",351,"00",,,,,,,,[[,"(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["2[12]"]],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[236-9]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"70(?:7\\d|8[17])\\d{5}",,,,"707123456"],,,[,,"600\\d{6}",,,,"600110000"]],PW:[,[,,"(?:[24-8]\\d\\d|345|900)\\d{4}",,,,,,,[7]],[,,"(?:2(?:55|77)|345|488|5(?:35|44|87)|6(?:22|54|79)|7(?:33|47)|8(?:24|55|76)|900)\\d{4}",,,,"2771234"],[,,"(?:45[0-5]|6[2-4689]0|(?:77|88)\\d)\\d{4}",,,,"6201234"],[,,,,,,,,,[-1]],
  [,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"PW",680,"01[12]",,,,,,,,[[,"(\\d{3})(\\d{4})","$1 $2",["[2-9]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],PY:[,[,,"59\\d{4,6}|(?:[2-46-9]\\d|5[0-8])\\d{4,7}",,,,,,,[6,7,8,9],[5]],[,,"(?:[26]1|3[289]|4[1246-8]|7[1-3]|8[1-36])\\d{5,7}|(?:2(?:2[4-68]|[4-68]\\d|7[15]|9[1-5])|3(?:18|3[167]|4[2357]|51|[67]\\d)|4(?:3[12]|5[13]|9[1-47])|5(?:[1-4]\\d|5[02-4])|6(?:3[1-3]|44|7[1-8])|7(?:4[0-4]|5\\d|6[1-578]|75|8[0-8])|858)\\d{5,6}",
  ,,,"212345678",,,[7,8,9],[5,6]],[,,"9(?:51|6[129]|[78][1-6]|9[1-5])\\d{6}",,,,"961456789",,,[9]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"8700[0-4]\\d{4}",,,,"870012345",,,[9]],"PY",595,"00","0",,,"0",,,,[[,"(\\d{3})(\\d{3,6})","$1 $2",["[2-9]0"],"0$1"],[,"(\\d{2})(\\d{5})","$1 $2",["[26]1|3[289]|4[1246-8]|7[1-3]|8[1-36]"],"(0$1)"],[,"(\\d{3})(\\d{4,5})","$1 $2",["2[279]|3[13-5]|4[359]|5|6(?:[34]|7[1-46-8])|7[46-8]|85"],"(0$1)"],[,"(\\d{2})(\\d{3})(\\d{3,4})","$1 $2 $3",
  ["2[14-68]|3[26-9]|4[1246-8]|6(?:1|75)|7[1-35]|8[1-36]"],"(0$1)"],[,"(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["87"]],[,"(\\d{3})(\\d{6})","$1 $2",["9"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[2-8]"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"[2-9]0\\d{4,7}",,,,"201234567"],,,[,,,,,,,,,[-1]]],QA:[,[,,"[2-7]\\d{7}|(?:2\\d\\d|800)\\d{4}",,,,,,,[7,8]],[,,"(?:23|4[04])\\d{6}",,,,"44123456",,,[8]],[,,"(?:28|[35-7]\\d)\\d{6}",,,,"33123456",,,[8]],[,,"800\\d{4}",,,,"8001234",,,[7]],[,,,,,,,,,[-1]],
  [,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"QA",974,"00",,,,,,,,[[,"(\\d{3})(\\d{4})","$1 $2",["2[126]|8"]],[,"(\\d{4})(\\d{4})","$1 $2",["[2-7]"]]],,[,,"2(?:[12]\\d|61)\\d{4}",,,,"2123456",,,[7]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],RE:[,[,,"9769\\d{5}|(?:26|[68]\\d)\\d{7}",,,,,,,[9]],[,,"26(?:2\\d\\d|30[01])\\d{4}",,,,"262161234"],[,,"(?:69(?:2\\d\\d|3(?:0[0-46]|1[013]|2[0-2]|3[0-39]|4\\d|5[05]|6[0-26]|7[0-27]|8[0-8]|9[0-479]))|9769\\d)\\d{4}",,,,"692123456"],[,,"80\\d{7}",
  ,,,"801234567"],[,,"89[1-37-9]\\d{6}",,,,"891123456"],[,,"8(?:1[019]|2[0156]|84|90)\\d{6}",,,,"810123456"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"RE",262,"00","0",,,"0",,,,[[,"(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[2689]"],"0$1"]],,[,,,,,,,,,[-1]],1,"26[23]|69|[89]",[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],RO:[,[,,"(?:[237]\\d|[89]0)\\d{7}|[23]\\d{5}",,,,,,,[6,9]],[,,"[23][13-6]\\d{7}|(?:2(?:19\\d|[3-6]\\d9)|31\\d\\d)\\d\\d",,,,"211234567"],[,,"7[01]20\\d{5}|7(?:0[013-9]|1[01]|[2-7]\\d|8[03-8]|9[09])\\d{6}",
  ,,,"712034567",,,[9]],[,,"800\\d{6}",,,,"800123456",,,[9]],[,,"90[0136]\\d{6}",,,,"900123456",,,[9]],[,,"801\\d{6}",,,,"801123456",,,[9]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"RO",40,"00","0"," int ",,"0",,,,[[,"(\\d{3})(\\d{3})","$1 $2",["2[3-6]","2[3-6]\\d9"],"0$1"],[,"(\\d{2})(\\d{4})","$1 $2",["219|31"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["[23]1"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[237-9]"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"(?:37\\d|80[578])\\d{6}",,,,"372123456",
  ,,[9]],,,[,,,,,,,,,[-1]]],RS:[,[,,"38[02-9]\\d{6,9}|6\\d{7,9}|90\\d{4,8}|38\\d{5,6}|(?:7\\d\\d|800)\\d{3,9}|(?:[12]\\d|3[0-79])\\d{5,10}",,,,,,,[6,7,8,9,10,11,12],[4,5]],[,,"(?:11[1-9]\\d|(?:2[389]|39)(?:0[2-9]|[2-9]\\d))\\d{3,8}|(?:1[02-9]|2[0-24-7]|3[0-8])[2-9]\\d{4,9}",,,,"10234567",,,[7,8,9,10,11,12],[4,5,6]],[,,"6(?:[0-689]|7\\d)\\d{6,7}",,,,"601234567",,,[8,9,10]],[,,"800\\d{3,9}",,,,"80012345"],[,,"(?:78\\d|90[0169])\\d{3,7}",,,,"90012345",,,[6,7,8,9,10]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,
  ,,,,,,,,[-1]],"RS",381,"00","0",,,"0",,,,[[,"(\\d{3})(\\d{3,9})","$1 $2",["(?:2[389]|39)0|[7-9]"],"0$1"],[,"(\\d{2})(\\d{5,10})","$1 $2",["[1-36]"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"7[06]\\d{4,10}",,,,"700123456"],,,[,,,,,,,,,[-1]]],RU:[,[,,"[347-9]\\d{9}",,,,,,,[10],[7]],[,,"(?:3(?:0[12]|4[1-35-79]|5[1-3]|65|8[1-58]|9[0145])|4(?:01|1[1356]|2[13467]|7[1-5]|8[1-7]|9[1-689])|8(?:1[1-8]|2[01]|3[13-6]|4[0-8]|5[15]|6[1-35-79]|7[1-37-9]))\\d{7}",,,,"3011234567",,,,[7]],[,,"9\\d{9}",,,,"9123456789"],
  [,,"80[04]\\d{7}",,,,"8001234567"],[,,"80[39]\\d{7}",,,,"8091234567"],[,,,,,,,,,[-1]],[,,"808\\d{7}",,,,"8081234567"],[,,,,,,,,,[-1]],"RU",7,"810","8",,,"8",,"8~10",,[[,"(\\d{3})(\\d{2})(\\d{2})","$1-$2-$3",["[0-79]"]],[,"(\\d{4})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["7(?:1[0-8]|2[1-9])","7(?:1(?:[0-6]2|7|8[27])|2(?:1[23]|[2-9]2))","7(?:1(?:[0-6]2|7|8[27])|2(?:13[03-69]|62[013-9]))|72[1-57-9]2"],"8 ($1)",,1],[,"(\\d{5})(\\d)(\\d{2})(\\d{2})","$1 $2 $3 $4",["7(?:1[0-68]|2[1-9])","7(?:1(?:[06][3-6]|[18]|2[35]|[3-5][3-5])|2(?:[13][3-5]|[24-689]|7[457]))",
  "7(?:1(?:0(?:[356]|4[023])|[18]|2(?:3[013-9]|5)|3[45]|43[013-79]|5(?:3[1-8]|4[1-7]|5)|6(?:3[0-35-9]|[4-6]))|2(?:1(?:3[178]|[45])|[24-689]|3[35]|7[457]))|7(?:14|23)4[0-8]|71(?:33|45)[1-79]"],"8 ($1)",,1],[,"(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["7"],"8 ($1)",,1],[,"(\\d{3})(\\d{3})(\\d{2})(\\d{2})","$1 $2-$3-$4",["[3489]"],"8 ($1)",,1]],[[,"(\\d{4})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["7(?:1[0-8]|2[1-9])","7(?:1(?:[0-6]2|7|8[27])|2(?:1[23]|[2-9]2))","7(?:1(?:[0-6]2|7|8[27])|2(?:13[03-69]|62[013-9]))|72[1-57-9]2"],
  "8 ($1)",,1],[,"(\\d{5})(\\d)(\\d{2})(\\d{2})","$1 $2 $3 $4",["7(?:1[0-68]|2[1-9])","7(?:1(?:[06][3-6]|[18]|2[35]|[3-5][3-5])|2(?:[13][3-5]|[24-689]|7[457]))","7(?:1(?:0(?:[356]|4[023])|[18]|2(?:3[013-9]|5)|3[45]|43[013-79]|5(?:3[1-8]|4[1-7]|5)|6(?:3[0-35-9]|[4-6]))|2(?:1(?:3[178]|[45])|[24-689]|3[35]|7[457]))|7(?:14|23)4[0-8]|71(?:33|45)[1-79]"],"8 ($1)",,1],[,"(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["7"],"8 ($1)",,1],[,"(\\d{3})(\\d{3})(\\d{2})(\\d{2})","$1 $2-$3-$4",["[3489]"],"8 ($1)",,1]],[,,,
  ,,,,,,[-1]],1,"3[04-689]|[489]",[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],RW:[,[,,"(?:06|[27]\\d\\d|[89]00)\\d{6}",,,,,,,[8,9]],[,,"(?:06|2[23568]\\d)\\d{6}",,,,"250123456"],[,,"7[238]\\d{7}",,,,"720123456",,,[9]],[,,"800\\d{6}",,,,"800123456",,,[9]],[,,"900\\d{6}",,,,"900123456",,,[9]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"RW",250,"00","0",,,"0",,,,[[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["0"]],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[7-9]"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{3})",
  "$1 $2 $3",["2"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],SA:[,[,,"92\\d{7}|(?:[15]|8\\d)\\d{8}",,,,,,,[9,10],[7]],[,,"1(?:1\\d|2[24-8]|3[35-8]|4[3-68]|6[2-5]|7[235-7])\\d{6}",,,,"112345678",,,[9],[7]],[,,"5(?:[013-689]\\d|7[0-36-8])\\d{6}",,,,"512345678",,,[9]],[,,"800\\d{7}",,,,"8001234567",,,[10]],[,,"925\\d{6}",,,,"925012345",,,[9]],[,,"920\\d{6}",,,,"920012345",,,[9]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"SA",966,"00","0",,,"0",,,,[[,"(\\d{4})(\\d{5})","$1 $2",["9"]],
  [,"(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["1"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["5"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{3,4})","$1 $2 $3",["81"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["8"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"811\\d{7}",,,,"8110123456",,,[10]],,,[,,,,,,,,,[-1]]],SB:[,[,,"(?:[1-6]|[7-9]\\d\\d)\\d{4}",,,,,,,[5,7]],[,,"(?:1[4-79]|[23]\\d|4[0-2]|5[03]|6[0-37])\\d{3}",,,,"40123",,,[5]],[,,"48\\d{3}|(?:(?:7[1-9]|8[4-9])\\d|9(?:1[2-9]|2[013-9]|3[0-2]|[46]\\d|5[0-46-9]|7[0-689]|8[0-79]|9[0-8]))\\d{4}",
  ,,,"7421234"],[,,"1[38]\\d{3}",,,,"18123",,,[5]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"5[12]\\d{3}",,,,"51123",,,[5]],"SB",677,"0[01]",,,,,,,,[[,"(\\d{2})(\\d{5})","$1 $2",["7|8[4-9]|9(?:[1-8]|9[0-8])"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],SC:[,[,,"8000\\d{3}|(?:[249]\\d|64)\\d{5}",,,,,,,[7]],[,,"4[2-46]\\d{5}",,,,"4217123"],[,,"2[5-8]\\d{5}",,,,"2510123"],[,,"8000\\d{3}",,,,"8000000"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"971\\d{4}|(?:64|95)\\d{5}",
  ,,,"6412345"],"SC",248,"010|0[0-2]",,,,,,"00",,[[,"(\\d)(\\d{3})(\\d{3})","$1 $2 $3",["[246]|9[57]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],SD:[,[,,"[19]\\d{8}",,,,,,,[9]],[,,"1(?:5\\d|8[35-7])\\d{6}",,,,"153123456"],[,,"(?:1[0-2]|9[0-3569])\\d{7}",,,,"911231234"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"SD",249,"00","0",,,"0",,,,[[,"(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["[19]"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,
  ,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],SE:[,[,,"(?:[26]\\d\\d|9)\\d{9}|[1-9]\\d{8}|[1-689]\\d{7}|[1-4689]\\d{6}|2\\d{5}",,,,,,,[6,7,8,9,10,12]],[,,"(?:(?:[12][136]|3[356]|4[0246]|6[03]|8\\d)\\d|90[1-9])\\d{4,6}|(?:1(?:2[0-35]|4[0-4]|5[0-25-9]|7[13-6]|[89]\\d)|2(?:2[0-7]|4[0136-8]|5[0138]|7[018]|8[01]|9[0-57])|3(?:0[0-4]|1\\d|2[0-25]|4[056]|7[0-2]|8[0-3]|9[023])|4(?:1[013-8]|3[0135]|5[14-79]|7[0-246-9]|8[0156]|9[0-689])|5(?:0[0-6]|[15][0-5]|2[0-68]|3[0-4]|4\\d|6[03-5]|7[013]|8[0-79]|9[01])|6(?:1[1-3]|2[0-4]|4[02-57]|5[0-37]|6[0-3]|7[0-2]|8[0247]|9[0-356])|9(?:1[0-68]|2\\d|3[02-5]|4[0-3]|5[0-4]|[68][01]|7[0135-8]))\\d{5,6}",
  ,,,"8123456",,,[7,8,9]],[,,"7[02369]\\d{7}",,,,"701234567",,,[9]],[,,"20\\d{4,7}",,,,"20123456",,,[6,7,8,9]],[,,"649\\d{6}|9(?:00|39|44)[1-8]\\d{3,6}",,,,"9001234567",,,[7,8,9,10]],[,,"77[0-7]\\d{6}",,,,"771234567",,,[9]],[,,"75[1-8]\\d{6}",,,,"751234567",,,[9]],[,,,,,,,,,[-1]],"SE",46,"00","0",,,"0",,,,[[,"(\\d{2})(\\d{2,3})(\\d{2})","$1-$2 $3",["20"],"0$1"],[,"(\\d{3})(\\d{4})","$1-$2",["9(?:00|39|44)"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{2})","$1-$2 $3",["[12][136]|3[356]|4[0246]|6[03]|90[1-9]"],"0$1"],
  [,"(\\d)(\\d{2,3})(\\d{2})(\\d{2})","$1-$2 $3 $4",["8"],"0$1"],[,"(\\d{3})(\\d{2,3})(\\d{2})","$1-$2 $3",["1[2457]|2(?:[247-9]|5[0138])|3[0247-9]|4[1357-9]|5[0-35-9]|6(?:[125689]|4[02-57]|7[0-2])|9(?:[125-8]|3[02-5]|4[0-3])"],"0$1"],[,"(\\d{3})(\\d{2,3})(\\d{3})","$1-$2 $3",["9(?:00|39|44)"],"0$1"],[,"(\\d{2})(\\d{2,3})(\\d{2})(\\d{2})","$1-$2 $3 $4",["1[13689]|2[0136]|3[1356]|4[0246]|54|6[03]|90[1-9]"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{2})(\\d{2})","$1-$2 $3 $4",["10|7"],"0$1"],[,"(\\d)(\\d{3})(\\d{3})(\\d{2})",
  "$1-$2 $3 $4",["8"],"0$1"],[,"(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1-$2 $3 $4",["[13-5]|2(?:[247-9]|5[0138])|6(?:[124-689]|7[0-2])|9(?:[125-8]|3[02-5]|4[0-3])"],"0$1"],[,"(\\d{3})(\\d{2})(\\d{2})(\\d{3})","$1-$2 $3 $4",["9"],"0$1"],[,"(\\d{3})(\\d{2})(\\d{3})(\\d{2})(\\d{2})","$1-$2 $3 $4 $5",["[26]"],"0$1"]],[[,"(\\d{2})(\\d{2,3})(\\d{2})","$1 $2 $3",["20"]],[,"(\\d{3})(\\d{4})","$1 $2",["9(?:00|39|44)"]],[,"(\\d{2})(\\d{3})(\\d{2})","$1 $2 $3",["[12][136]|3[356]|4[0246]|6[03]|90[1-9]"]],[,"(\\d)(\\d{2,3})(\\d{2})(\\d{2})",
  "$1 $2 $3 $4",["8"]],[,"(\\d{3})(\\d{2,3})(\\d{2})","$1 $2 $3",["1[2457]|2(?:[247-9]|5[0138])|3[0247-9]|4[1357-9]|5[0-35-9]|6(?:[125689]|4[02-57]|7[0-2])|9(?:[125-8]|3[02-5]|4[0-3])"]],[,"(\\d{3})(\\d{2,3})(\\d{3})","$1 $2 $3",["9(?:00|39|44)"]],[,"(\\d{2})(\\d{2,3})(\\d{2})(\\d{2})","$1 $2 $3 $4",["1[13689]|2[0136]|3[1356]|4[0246]|54|6[03]|90[1-9]"]],[,"(\\d{2})(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3 $4",["10|7"]],[,"(\\d)(\\d{3})(\\d{3})(\\d{2})","$1 $2 $3 $4",["8"]],[,"(\\d{3})(\\d{2})(\\d{2})(\\d{2})",
  "$1 $2 $3 $4",["[13-5]|2(?:[247-9]|5[0138])|6(?:[124-689]|7[0-2])|9(?:[125-8]|3[02-5]|4[0-3])"]],[,"(\\d{3})(\\d{2})(\\d{2})(\\d{3})","$1 $2 $3 $4",["9"]],[,"(\\d{3})(\\d{2})(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3 $4 $5",["[26]"]]],[,,"74[02-9]\\d{6}",,,,"740123456",,,[9]],,,[,,,,,,,,,[-1]],[,,"10[1-8]\\d{6}",,,,"102345678",,,[9]],,,[,,"(?:25[245]|67[3-68])\\d{9}",,,,"254123456789",,,[12]]],SG:[,[,,"(?:(?:1\\d|8)\\d\\d|7000)\\d{7}|[3689]\\d{7}",,,,,,,[8,10,11]],[,,"662[0-24-9]\\d{4}|6(?:[1-578]\\d|6[013-57-9]|9[0-35-9])\\d{5}",
  ,,,"61234567",,,[8]],[,,"(?:8(?:01[0-7]|[1-8]\\d\\d|9(?:[014]\\d|2[1-9]|3[0-489]))|9[0-8]\\d\\d)\\d{4}",,,,"81234567",,,[8]],[,,"(?:18|8)00\\d{7}",,,,"18001234567",,,[10,11]],[,,"1900\\d{7}",,,,"19001234567",,,[11]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"(?:3[12]\\d|666)\\d{5}",,,,"31234567",,,[8]],"SG",65,"0[0-3]\\d",,,,,,,,[[,"(\\d{4,5})","$1",["1[013-9]|77","1(?:[013-8]|9(?:0[1-9]|[1-9]))|77"]],[,"(\\d{4})(\\d{4})","$1 $2",["[369]|8(?:01|[1-9])"]],[,"(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["8"]],[,
  "(\\d{4})(\\d{4})(\\d{3})","$1 $2 $3",["7"]],[,"(\\d{4})(\\d{3})(\\d{4})","$1 $2 $3",["1"]]],[[,"(\\d{4})(\\d{4})","$1 $2",["[369]|8(?:01|[1-9])"]],[,"(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["8"]],[,"(\\d{4})(\\d{4})(\\d{3})","$1 $2 $3",["7"]],[,"(\\d{4})(\\d{3})(\\d{4})","$1 $2 $3",["1"]]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"7000\\d{7}",,,,"70001234567",,,[11]],,,[,,,,,,,,,[-1]]],SH:[,[,,"(?:[256]\\d|8)\\d{3}",,,,,,,[4,5]],[,,"2(?:[0-57-9]\\d|6[4-9])\\d\\d",,,,"22158"],[,,"[56]\\d{4}",,,,"51234",
  ,,[5]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"262\\d\\d",,,,"26212",,,[5]],"SH",290,"00",,,,,,,,,,[,,,,,,,,,[-1]],1,"[256]",[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],SI:[,[,,"[1-7]\\d{7}|8\\d{4,7}|90\\d{4,6}",,,,,,,[5,6,7,8]],[,,"(?:[1-357][2-8]|4[24-8])\\d{6}",,,,"12345678",,,[8],[7]],[,,"65(?:1\\d|55|[67]0)\\d{4}|(?:[37][01]|4[0139]|51|6[489])\\d{6}",,,,"31234567",,,[8]],[,,"80\\d{4,6}",,,,"80123456",,,[6,7,8]],[,,"89[1-3]\\d{2,5}|90\\d{4,6}",,,,"90123456"],
  [,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"(?:59\\d\\d|8(?:1(?:[67]\\d|8[01389])|2(?:0\\d|2[0378]|8[0-2489])|3[389]\\d))\\d{4}",,,,"59012345",,,[8]],"SI",386,"00|10(?:22|66|88|99)","0",,,"0",,"00",,[[,"(\\d{2})(\\d{3,6})","$1 $2",["8[09]|9"],"0$1"],[,"(\\d{3})(\\d{5})","$1 $2",["59|8"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["[37][01]|4[0139]|51|6"],"0$1"],[,"(\\d)(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[1-57]"],"(0$1)"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],SJ:[,
  [,,"0\\d{4}|(?:[4589]\\d|79)\\d{6}",,,,,,,[5,8]],[,,"79\\d{6}",,,,"79123456",,,[8]],[,,"(?:4[015-8]|5[89]|9\\d)\\d{6}",,,,"41234567",,,[8]],[,,"80[01]\\d{5}",,,,"80012345",,,[8]],[,,"82[09]\\d{5}",,,,"82012345",,,[8]],[,,"810(?:0[0-6]|[2-8]\\d)\\d{3}",,,,"81021234",,,[8]],[,,"880\\d{5}",,,,"88012345",,,[8]],[,,"85[0-5]\\d{5}",,,,"85012345",,,[8]],"SJ",47,"00",,,,,,,,,,[,,,,,,,,,[-1]],,"79",[,,,,,,,,,[-1]],[,,"(?:0[2-9]|81(?:0(?:0[7-9]|1\\d)|5\\d\\d))\\d{3}",,,,"02000"],,,[,,"81[23]\\d{5}",,,,"81212345",
  ,,[8]]],SK:[,[,,"[2-689]\\d{8}|[2-59]\\d{6}|[2-5]\\d{5}",,,,,,,[6,7,9]],[,,"(?:2(?:16|[2-9]\\d{3})|(?:(?:[3-5][1-8]\\d|819)\\d|601[1-5])\\d)\\d{4}|(?:2|[3-5][1-8])1[67]\\d{3}|[3-5][1-8]16\\d\\d",,,,"221234567"],[,,"909[1-9]\\d{5}|9(?:0[1-8]|1[0-24-9]|4[03-57-9]|5\\d)\\d{6}",,,,"912123456",,,[9]],[,,"800\\d{6}",,,,"800123456",,,[9]],[,,"9(?:00|[78]\\d)\\d{6}",,,,"900123456",,,[9]],[,,"8[5-9]\\d{7}",,,,"850123456",,,[9]],[,,,,,,,,,[-1]],[,,"6(?:02|5[0-4]|9[0-6])\\d{6}",,,,"690123456",,,[9]],"SK",421,
  "00","0",,,"0",,,,[[,"(\\d)(\\d{2})(\\d{3,4})","$1 $2 $3",["21"],"0$1"],[,"(\\d{2})(\\d{2})(\\d{2,3})","$1 $2 $3",["[3-5][1-8]1","[3-5][1-8]1[67]"],"0$1"],[,"(\\d{4})(\\d{3})","$1 $2",["909","9090"],"0$1"],[,"(\\d)(\\d{3})(\\d{3})(\\d{2})","$1/$2 $3 $4",["2"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[689]"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{2})(\\d{2})","$1/$2 $3 $4",["[3-5]"],"0$1"]],[[,"(\\d)(\\d{2})(\\d{3,4})","$1 $2 $3",["21"],"0$1"],[,"(\\d{2})(\\d{2})(\\d{2,3})","$1 $2 $3",["[3-5][1-8]1",
  "[3-5][1-8]1[67]"],"0$1"],[,"(\\d)(\\d{3})(\\d{3})(\\d{2})","$1/$2 $3 $4",["2"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[689]"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{2})(\\d{2})","$1/$2 $3 $4",["[3-5]"],"0$1"]],[,,"9090\\d{3}",,,,"9090123",,,[7]],,,[,,"9090\\d{3}|(?:602|8(?:00|[5-9]\\d)|9(?:00|[78]\\d))\\d{6}",,,,,,,[7,9]],[,,"96\\d{7}",,,,"961234567",,,[9]],,,[,,,,,,,,,[-1]]],SL:[,[,,"(?:[2378]\\d|66|99)\\d{6}",,,,,,,[8],[6]],[,,"22[2-4][2-9]\\d{4}",,,,"22221234",,,,[6]],[,,"(?:25|3[013-5]|66|7[5-9]|8[08]|99)\\d{6}",
  ,,,"25123456"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"SL",232,"00","0",,,"0",,,,[[,"(\\d{2})(\\d{6})","$1 $2",["[236-9]"],"(0$1)"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],SM:[,[,,"(?:0549|[5-7]\\d)\\d{6}",,,,,,,[8,10],[6]],[,,"0549(?:8[0157-9]|9\\d)\\d{4}",,,,"0549886377",,,[10],[6]],[,,"6[16]\\d{6}",,,,"66661212",,,[8]],[,,,,,,,,,[-1]],[,,"7[178]\\d{6}",,,,"71123456",,,[8]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"5[158]\\d{6}",
  ,,,"58001110",,,[8]],"SM",378,"00",,,,"([89]\\d{5})$","0549$1",,,[[,"(\\d{6})","$1",["[89]"]],[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[5-7]"]],[,"(\\d{4})(\\d{6})","$1 $2",["0"]]],[[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[5-7]"]],[,"(\\d{4})(\\d{6})","$1 $2",["0"]]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],SN:[,[,,"(?:[378]\\d{4}|93330)\\d{4}",,,,,,,[9]],[,,"3(?:0(?:1[0-2]|80)|282|3(?:8[1-9]|9[3-9])|611)\\d{5}",,,,"301012345"],[,,"7(?:[06-8]\\d|21|90)\\d{6}",
  ,,,"701234567"],[,,"800\\d{6}",,,,"800123456"],[,,"88[4689]\\d{6}",,,,"884123456"],[,,"81[02468]\\d{6}",,,,"810123456"],[,,,,,,,,,[-1]],[,,"93330\\d{4}|3(?:392|9[01]\\d)\\d{5}",,,,"933301234"],"SN",221,"00",,,,,,,,[[,"(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["8"]],[,"(\\d{2})(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[379]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],SO:[,[,,"[346-9]\\d{8}|[12679]\\d{7}|[1-5]\\d{6}|[1348]\\d{5}",,,,,,,[6,7,8,9]],[,,"(?:1\\d|2[0-79]|3[0-46-8]|4[0-7]|5[57-9])\\d{5}|(?:[134]\\d|8[125])\\d{4}",
  ,,,"4012345",,,[6,7]],[,,"28\\d{5}|(?:6[1-9]|79)\\d{6,7}|(?:15|24|(?:3[59]|4[89]|8[08])\\d|60|7[1-8]|9(?:0\\d|[2-9]))\\d{6}",,,,"71123456",,,[7,8,9]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"SO",252,"00","0",,,"0",,,,[[,"(\\d{2})(\\d{4})","$1 $2",["8[125]"]],[,"(\\d{6})","$1",["[134]"]],[,"(\\d)(\\d{6})","$1 $2",["[15]|2[0-79]|3[0-46-8]|4[0-7]"]],[,"(\\d)(\\d{7})","$1 $2",["24|[67]"]],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[3478]|64|90"]],[,"(\\d{2})(\\d{5,7})",
  "$1 $2",["1|28|6[1-35-9]|9[2-9]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],SR:[,[,,"(?:[2-5]|68|[78]\\d)\\d{5}",,,,,,,[6,7]],[,,"(?:2[1-3]|3[0-7]|(?:4|68)\\d|5[2-58])\\d{4}",,,,"211234"],[,,"(?:7[124-7]|8[125-9])\\d{5}",,,,"7412345",,,[7]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"56\\d{4}",,,,"561234",,,[6]],"SR",597,"00",,,,,,,,[[,"(\\d{2})(\\d{2})(\\d{2})","$1-$2-$3",["56"]],[,"(\\d{3})(\\d{3})","$1-$2",["[2-5]"]],[,"(\\d{3})(\\d{4})","$1-$2",
  ["[6-8]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],SS:[,[,,"[19]\\d{8}",,,,,,,[9]],[,,"1[89]\\d{7}",,,,"181234567"],[,,"(?:12|9[12579])\\d{7}",,,,"977123456"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"SS",211,"00","0",,,"0",,,,[[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[19]"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],ST:[,[,,"(?:22|9\\d)\\d{5}",,,,,,,[7]],[,,"22\\d{5}",,,,"2221234"],[,,"900[5-9]\\d{3}|9(?:0[1-9]|[89]\\d)\\d{4}",
  ,,,"9812345"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"ST",239,"00",,,,,,,,[[,"(\\d{3})(\\d{4})","$1 $2",["[29]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],SV:[,[,,"[267]\\d{7}|[89]00\\d{4}(?:\\d{4})?",,,,,,,[7,8,11]],[,,"2(?:[1-6]\\d{3}|[79]90[034]|890[0245])\\d{3}",,,,"21234567",,,[8]],[,,"66(?:[02-9]\\d\\d|1(?:[02-9]\\d|16))\\d{3}|(?:6[0-57-9]|7\\d)\\d{6}",,,,"70123456",,,[8]],[,,"800\\d{4}(?:\\d{4})?",,,,"8001234",,,[7,11]],
  [,,"900\\d{4}(?:\\d{4})?",,,,"9001234",,,[7,11]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"SV",503,"00",,,,,,,,[[,"(\\d{3})(\\d{4})","$1 $2",["[89]"]],[,"(\\d{4})(\\d{4})","$1 $2",["[267]"]],[,"(\\d{3})(\\d{4})(\\d{4})","$1 $2 $3",["[89]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],SX:[,[,,"7215\\d{6}|(?:[58]\\d\\d|900)\\d{7}",,,,,,,[10],[7]],[,,"7215(?:4[2-8]|8[239]|9[056])\\d{4}",,,,"7215425678",,,,[7]],[,,"7215(?:1[02]|2\\d|5[034679]|8[014-8])\\d{4}",,,,"7215205678",
  ,,,[7]],[,,"8(?:00|33|44|55|66|77|88)[2-9]\\d{6}",,,,"8002123456"],[,,"900[2-9]\\d{6}",,,,"9002123456"],[,,,,,,,,,[-1]],[,,"52(?:35(?:[02-46-9]\\d|1[02-9]|5[0-46-9])|45(?:[034]\\d|1[02-9]|2[024-9]|5[0-46-9]))\\d{4}|52(?:3[2-46-9]|4[2-4])(?:[02-9]\\d|1[02-9])\\d{4}|5(?:00|2[12]|33|44|66|77|88)[2-9]\\d{6}",,,,"5002345678"],[,,,,,,,,,[-1]],"SX",1,"011","1",,,"1|(5\\d{6})$","721$1",,,,,[,,,,,,,,,[-1]],,"721",[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],SY:[,[,,"[1-39]\\d{8}|[1-5]\\d{7}",,,,,,,[8,
  9],[6,7]],[,,"21\\d{6,7}|(?:1(?:[14]\\d|[2356])|2[235]|3(?:[13]\\d|4)|4[134]|5[1-3])\\d{6}",,,,"112345678",,,,[6,7]],[,,"9(?:22|[3-589]\\d|6[02-9])\\d{6}",,,,"944567890",,,[9]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"SY",963,"00","0",,,"0",,,,[[,"(\\d{2})(\\d{3})(\\d{3,4})","$1 $2 $3",["[1-5]"],"0$1",,1],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["9"],"0$1",,1]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],SZ:[,[,,"0800\\d{4}|(?:[237]\\d|900)\\d{6}",
  ,,,,,,[8,9]],[,,"[23][2-5]\\d{6}",,,,"22171234",,,[8]],[,,"7[6-9]\\d{6}",,,,"76123456",,,[8]],[,,"0800\\d{4}",,,,"08001234",,,[8]],[,,"900\\d{6}",,,,"900012345",,,[9]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"70\\d{6}",,,,"70012345",,,[8]],"SZ",268,"00",,,,,,,,[[,"(\\d{4})(\\d{4})","$1 $2",["[0237]"]],[,"(\\d{5})(\\d{4})","$1 $2",["9"]]],,[,,,,,,,,,[-1]],,,[,,"0800\\d{4}",,,,,,,[8]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],TA:[,[,,"8\\d{3}",,,,,,,[4]],[,,"8\\d{3}",,,,"8999"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],
  [,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"TA",290,"00",,,,,,,,,,[,,,,,,,,,[-1]],,"8",[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],TC:[,[,,"(?:[58]\\d\\d|649|900)\\d{7}",,,,,,,[10],[7]],[,,"649(?:266|712|9(?:4\\d|50))\\d{4}",,,,"6497121234",,,,[7]],[,,"649(?:2(?:3[129]|4[1-79])|3\\d\\d|4[34][1-3])\\d{4}",,,,"6492311234",,,,[7]],[,,"8(?:00|33|44|55|66|77|88)[2-9]\\d{6}",,,,"8002345678"],[,,"900[2-9]\\d{6}",,,,"9002345678"],[,,,,,,,,,[-1]],[,,"52(?:35(?:[02-46-9]\\d|1[02-9]|5[0-46-9])|45(?:[034]\\d|1[02-9]|2[024-9]|5[0-46-9]))\\d{4}|52(?:3[2-46-9]|4[2-4])(?:[02-9]\\d|1[02-9])\\d{4}|5(?:00|2[12]|33|44|66|77|88)[2-9]\\d{6}",
  ,,,"5002345678"],[,,"649(?:71[01]|966)\\d{4}",,,,"6497101234",,,,[7]],"TC",1,"011","1",,,"1|([2-479]\\d{6})$","649$1",,,,,[,,,,,,,,,[-1]],,"649",[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],TD:[,[,,"(?:22|[69]\\d|77)\\d{6}",,,,,,,[8]],[,,"22(?:[37-9]0|5[0-5]|6[89])\\d{4}",,,,"22501234"],[,,"(?:6[023568]|77|9\\d)\\d{6}",,,,"63012345"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"TD",235,"00|16",,,,,,"00",,[[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",
  ["[2679]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],TG:[,[,,"[279]\\d{7}",,,,,,,[8]],[,,"2(?:2[2-7]|3[23]|4[45]|55|6[67]|77)\\d{5}",,,,"22212345"],[,,"(?:7[09]|9[0-36-9])\\d{6}",,,,"90112345"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"TG",228,"00",,,,,,,,[[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[279]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],TH:[,[,,"1\\d{8,9}|(?:[2-57]|[689]\\d)\\d{7}",
  ,,,,,,[8,9,10]],[,,"(?:2\\d|3[2-9]|4[2-5]|5[2-6]|7[3-7])\\d{6}",,,,"21234567",,,[8]],[,,"(?:14|6[1-6]|[89]\\d)\\d{7}",,,,"812345678",,,[9]],[,,"1800\\d{6}",,,,"1800123456",,,[10]],[,,"1900\\d{6}",,,,"1900123456",,,[10]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"6[08]\\d{7}",,,,"601234567",,,[9]],"TH",66,"00[1-9]","0",,,"0",,,,[[,"(\\d)(\\d{3})(\\d{4})","$1 $2 $3",["2"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{3,4})","$1 $2 $3",["14|[3-9]"],"0$1"],[,"(\\d{4})(\\d{3})(\\d{3})","$1 $2 $3",["1"]]],,[,,,,,,,,,[-1]],,
  ,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],TJ:[,[,,"(?:00|11|[3-579]\\d|88)\\d{7}",,,,,,,[9],[3,5,6,7]],[,,"(?:3(?:1[3-5]|2[245]|3[12]|4[24-7]|5[25]|72)|4(?:46|74|87))\\d{6}",,,,"372123456",,,,[3,5,6,7]],[,,"41[18]\\d{6}|(?:00|11|5[05]|7[07]|88|9\\d)\\d{7}",,,,"917123456"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"TJ",992,"810","8",,,"8",,"8~10",,[[,"(\\d{6})(\\d)(\\d{2})","$1 $2 $3",["331","3317"],,,1],[,"(\\d{3})(\\d{2})(\\d{4})","$1 $2 $3",["[34]7|91[78]"],
  ,,1],[,"(\\d{4})(\\d)(\\d{4})","$1 $2 $3",["3"],,,1],[,"(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["[0457-9]|11"],,,1]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],TK:[,[,,"[2-47]\\d{3,6}",,,,,,,[4,5,6,7]],[,,"(?:2[2-4]|[34]\\d)\\d{2,5}",,,,"3101"],[,,"7[2-4]\\d{2,5}",,,,"7290"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"TK",690,"00",,,,,,,,,,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],TL:[,[,,"7\\d{7}|(?:[2-47]\\d|[89]0)\\d{5}",
  ,,,,,,[7,8]],[,,"(?:2[1-5]|3[1-9]|4[1-4])\\d{5}",,,,"2112345",,,[7]],[,,"7[2-8]\\d{6}",,,,"77212345",,,[8]],[,,"80\\d{5}",,,,"8012345",,,[7]],[,,"90\\d{5}",,,,"9012345",,,[7]],[,,,,,,,,,[-1]],[,,"70\\d{5}",,,,"7012345",,,[7]],[,,,,,,,,,[-1]],"TL",670,"00",,,,,,,,[[,"(\\d{3})(\\d{4})","$1 $2",["[2-489]|70"]],[,"(\\d{4})(\\d{4})","$1 $2",["7"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],TM:[,[,,"[1-6]\\d{7}",,,,,,,[8]],[,,"(?:1(?:2\\d|3[1-9])|2(?:22|4[0-35-8])|3(?:22|4[03-9])|4(?:22|3[128]|4\\d|6[15])|5(?:22|5[7-9]|6[014-689]))\\d{5}",
  ,,,"12345678"],[,,"6\\d{7}",,,,"66123456"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"TM",993,"810","8",,,"8",,"8~10",,[[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2-$3-$4",["12"],"(8 $1)"],[,"(\\d{3})(\\d)(\\d{2})(\\d{2})","$1 $2-$3-$4",["[1-5]"],"(8 $1)"],[,"(\\d{2})(\\d{6})","$1 $2",["6"],"8 $1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],TN:[,[,,"[2-57-9]\\d{7}",,,,,,,[8]],[,,"81200\\d{3}|(?:3[0-2]|7\\d)\\d{6}",,,,"30010123"],[,,
  "3(?:001|[12]40)\\d{4}|(?:(?:[259]\\d|4[0-6])\\d|3(?:1[1-35]|6[0-4]|91))\\d{5}",,,,"20123456"],[,,"8010\\d{4}",,,,"80101234"],[,,"88\\d{6}",,,,"88123456"],[,,"8[12]10\\d{4}",,,,"81101234"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"TN",216,"00",,,,,,,,[[,"(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["[2-57-9]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],TO:[,[,,"(?:0800|[5-8]\\d{3})\\d{3}|[2-8]\\d{4}",,,,,,,[5,7]],[,,"(?:2\\d|3[0-8]|4[0-4]|50|6[09]|7[0-24-69]|8[05])\\d{3}",,,,"20123",
  ,,[5]],[,,"6(?:3[02]|8[5-9])\\d{4}|(?:6[09]|7\\d|8[46-9])\\d{5}",,,,"7715123",,,[7]],[,,"0800\\d{3}",,,,"0800222",,,[7]],[,,"55[04]\\d{4}",,,,"5501234",,,[7]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"TO",676,"00",,,,,,,,[[,"(\\d{2})(\\d{3})","$1-$2",["[2-4]|50|6[09]|7[0-24-69]|8[05]"]],[,"(\\d{4})(\\d{3})","$1 $2",["0"]],[,"(\\d{3})(\\d{4})","$1 $2",["[5-8]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],TR:[,[,,"(?:4|8\\d{5})\\d{6}|(?:[2-58]\\d\\d|900)\\d{7}",,,
  ,,,,[7,10,12]],[,,"(?:2(?:[13][26]|[28][2468]|[45][268]|[67][246])|3(?:[13][28]|[24-6][2468]|[78][02468]|92)|4(?:[16][246]|[23578][2468]|4[26]))\\d{7}",,,,"2123456789",,,[10]],[,,"56161\\d{5}|5(?:0[15-7]|1[06]|24|[34]\\d|5[1-59]|9[46])\\d{7}",,,,"5012345678",,,[10]],[,,"800\\d{7}(?:\\d{2})?",,,,"8001234567",,,[10,12]],[,,"(?:8[89]8|900)\\d{7}",,,,"9001234567",,,[10]],[,,,,,,,,,[-1]],[,,"592(?:21[12]|461)\\d{4}",,,,"5922121234",,,[10]],[,,,,,,,,,[-1]],"TR",90,"00","0",,,"0",,,,[[,"(\\d{3})(\\d)(\\d{3})",
  "$1 $2 $3",["444"],,,1],[,"(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["512|8[0589]|90"],"0$1",,1],[,"(\\d{3})(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3 $4",["5(?:[0-59]|61)","5(?:[0-59]|616)","5(?:[0-59]|6161)"],"0$1",,1],[,"(\\d{3})(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[24][1-8]|3[1-9]"],"(0$1)",,1],[,"(\\d{3})(\\d{3})(\\d{6})","$1 $2 $3",["80"],"0$1",,1]],[[,"(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["512|8[0589]|90"],"0$1",,1],[,"(\\d{3})(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3 $4",["5(?:[0-59]|61)","5(?:[0-59]|616)",
  "5(?:[0-59]|6161)"],"0$1",,1],[,"(\\d{3})(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[24][1-8]|3[1-9]"],"(0$1)",,1],[,"(\\d{3})(\\d{3})(\\d{6})","$1 $2 $3",["80"],"0$1",,1]],[,,"512\\d{7}",,,,"5123456789",,,[10]],,,[,,"444\\d{4}",,,,,,,[7]],[,,"(?:444|850\\d{3})\\d{4}",,,,"4441444",,,[7,10]],,,[,,,,,,,,,[-1]]],TT:[,[,,"(?:[58]\\d\\d|900)\\d{7}",,,,,,,[10],[7]],[,,"868(?:2(?:0[13]|1[89]|[23]\\d|4[0-2])|6(?:0[7-9]|1[02-8]|2[1-9]|[3-69]\\d|7[0-79])|82[124])\\d{4}",,,,"8682211234",,,,[7]],[,,"868(?:2(?:6[3-9]|[7-9]\\d)|(?:3\\d|4[6-9])\\d|6(?:20|78|8\\d)|7(?:0[1-9]|1[02-9]|[2-9]\\d))\\d{4}",
  ,,,"8682911234",,,,[7]],[,,"8(?:00|33|44|55|66|77|88)[2-9]\\d{6}",,,,"8002345678"],[,,"900[2-9]\\d{6}",,,,"9002345678"],[,,,,,,,,,[-1]],[,,"52(?:35(?:[02-46-9]\\d|1[02-9]|5[0-46-9])|45(?:[034]\\d|1[02-9]|2[024-9]|5[0-46-9]))\\d{4}|52(?:3[2-46-9]|4[2-4])(?:[02-9]\\d|1[02-9])\\d{4}|5(?:00|2[12]|33|44|66|77|88)[2-9]\\d{6}",,,,"5002345678"],[,,,,,,,,,[-1]],"TT",1,"011","1",,,"1|([2-46-8]\\d{6})$","868$1",,,,,[,,,,,,,,,[-1]],,"868",[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,"868619\\d{4}",,,,"8686191234",,,
  ,[7]]],TV:[,[,,"(?:2|7\\d\\d|90)\\d{4}",,,,,,,[5,6,7]],[,,"2[02-9]\\d{3}",,,,"20123",,,[5]],[,,"(?:7[01]\\d|90)\\d{4}",,,,"901234",,,[6,7]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"TV",688,"00",,,,,,,,[[,"(\\d{2})(\\d{3})","$1 $2",["2"]],[,"(\\d{2})(\\d{4})","$1 $2",["90"]],[,"(\\d{2})(\\d{5})","$1 $2",["7"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],TW:[,[,,"[2-689]\\d{8}|7\\d{9,10}|[2-8]\\d{7}|2\\d{6}",,,,,,,[7,8,9,10,11]],[,,
  "(?:2[2-8]\\d|370|55[01]|7[1-9])\\d{6}|4(?:(?:0(?:0[1-9]|[2-48]\\d)|1[023]\\d)\\d{4,5}|(?:[239]\\d\\d|4(?:0[56]|12|49))\\d{5})|6(?:[01]\\d{7}|4(?:0[56]|12|24|4[09])\\d{4,5})|8(?:(?:2(?:3\\d|4[0-269]|[578]0|66)|36[24-9]|90\\d\\d)\\d{4}|4(?:0[56]|12|24|4[09])\\d{4,5})|(?:2(?:2(?:0\\d\\d|4(?:0[68]|[249]0|3[0-467]|5[0-25-9]|6[0235689]))|(?:3(?:[09]\\d|1[0-4])|(?:4\\d|5[0-49]|6[0-29]|7[0-5])\\d)\\d)|(?:(?:3[2-9]|5[2-8]|6[0-35-79]|8[7-9])\\d\\d|4(?:2(?:[089]\\d|7[1-9])|(?:3[0-4]|[78]\\d|9[01])\\d))\\d)\\d{3}",
  ,,,"221234567",,,[8,9]],[,,"(?:40001[0-2]|9[0-8]\\d{4})\\d{3}",,,,"912345678",,,[9]],[,,"80[0-79]\\d{6}|800\\d{5}",,,,"800123456",,,[8,9]],[,,"20(?:[013-9]\\d\\d|2)\\d{4}",,,,"203123456",,,[7,9]],[,,,,,,,,,[-1]],[,,"99\\d{7}",,,,"990123456",,,[9]],[,,"7010(?:[0-2679]\\d|3[0-7]|8[0-5])\\d{5}|70\\d{8}",,,,"7012345678",,,[10,11]],"TW",886,"0(?:0[25-79]|19)","0","#",,"0",,,,[[,"(\\d{2})(\\d)(\\d{4})","$1 $2 $3",["202"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{3,4})","$1 $2 $3",["[258]0"],"0$1"],[,"(\\d)(\\d{3,4})(\\d{4})",
  "$1 $2 $3",["[23568]|4(?:0[02-48]|[1-47-9])|7[1-9]","[23568]|4(?:0[2-48]|[1-47-9])|(?:400|7)[1-9]"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[49]"],"0$1"],[,"(\\d{2})(\\d{4})(\\d{4,5})","$1 $2 $3",["7"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"50[0-46-9]\\d{6}",,,,"500123456",,,[9]],,,[,,,,,,,,,[-1]]],TZ:[,[,,"(?:[26-8]\\d|41|90)\\d{7}",,,,,,,[9]],[,,"2[2-8]\\d{7}",,,,"222345678"],[,,"77[2-9]\\d{6}|(?:6[2-9]|7[13-689])\\d{7}",,,,"621234567"],[,,"80[08]\\d{6}",,,,"800123456"],[,,"90\\d{7}",
  ,,,"900123456"],[,,"8(?:40|6[01])\\d{6}",,,,"840123456"],[,,,,,,,,,[-1]],[,,"41\\d{7}",,,,"412345678"],"TZ",255,"00[056]","0",,,"0",,,,[[,"(\\d{3})(\\d{2})(\\d{4})","$1 $2 $3",["[89]"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["[24]"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[67]"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,"(?:8(?:[04]0|6[01])|90\\d)\\d{6}"],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],UA:[,[,,"[89]\\d{9}|[3-9]\\d{8}",,,,,,,[9,10],[5,6,7]],[,,"(?:3[1-8]|4[13-8]|5[1-7]|6[12459])\\d{7}",,,
  ,"311234567",,,[9],[5,6,7]],[,,"(?:50|6[36-8]|7[1-3]|9[1-9])\\d{7}",,,,"501234567",,,[9]],[,,"800[1-8]\\d{5,6}",,,,"800123456"],[,,"900[239]\\d{5,6}",,,,"900212345"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"89[1-579]\\d{6}",,,,"891234567",,,[9]],"UA",380,"00","0",,,"0",,"0~0",,[[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["6[12][29]|(?:3[1-8]|4[136-8]|5[12457]|6[49])2|(?:56|65)[24]","6[12][29]|(?:35|4[1378]|5[12457]|6[49])2|(?:56|65)[24]|(?:3[1-46-8]|46)2[013-9]"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",
  ["4[45][0-5]|5(?:0|6[37])|6(?:[12][018]|[36-8])|7|89|9[1-9]|(?:48|57)[0137-9]","4[45][0-5]|5(?:0|6(?:3[14-7]|7))|6(?:[12][018]|[36-8])|7|89|9[1-9]|(?:48|57)[0137-9]"],"0$1"],[,"(\\d{4})(\\d{5})","$1 $2",["[3-6]"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{3,4})","$1 $2 $3",["[89]"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],UG:[,[,,"800\\d{6}|(?:[29]0|[347]\\d)\\d{7}",,,,,,,[9],[5,6,7]],[,,"20(?:(?:(?:24|81)0|30[67])\\d|6(?:00[0-2]|30[0-4]))\\d{3}|(?:20(?:[0147]\\d|2[5-9]|32|5[0-4]|6[15-9])|[34]\\d{3})\\d{5}",
  ,,,"312345678",,,,[5,6,7]],[,,"7260\\d{5}|7(?:[0157-9]\\d|20|36|4[0-4])\\d{6}",,,,"712345678"],[,,"800[1-3]\\d{5}",,,,"800123456"],[,,"90[1-3]\\d{6}",,,,"901123456"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"UG",256,"00[057]","0",,,"0",,,,[[,"(\\d{4})(\\d{5})","$1 $2",["202","2024"],"0$1"],[,"(\\d{3})(\\d{6})","$1 $2",["[27-9]|4(?:6[45]|[7-9])"],"0$1"],[,"(\\d{2})(\\d{7})","$1 $2",["[34]"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],US:[,[,,"[2-9]\\d{9}",,
  ,,,,,[10],[7]],[,,"(?:2(?:0[1-35-9]|1[02-9]|2[03-589]|3[149]|4[08]|5[1-46]|6[0279]|7[0269]|8[13])|3(?:0[1-57-9]|1[02-9]|2[0135]|3[0-24679]|4[167]|5[12]|6[014]|8[056])|4(?:0[124-9]|1[02-579]|2[3-5]|3[0245]|4[0235]|58|6[39]|7[0589]|8[04])|5(?:0[1-57-9]|1[0235-8]|20|3[0149]|4[01]|5[19]|6[1-47]|7[013-5]|8[056])|6(?:0[1-35-9]|1[024-9]|2[03689]|[34][016]|5[0179]|6[0-279]|78|8[0-29])|7(?:0[1-46-8]|1[2-9]|2[04-7]|3[1247]|4[037]|5[47]|6[02359]|7[02-59]|8[156])|8(?:0[1-68]|1[02-8]|2[08]|3[0-28]|4[3578]|5[046-9]|6[02-5]|7[028])|9(?:0[1346-9]|1[02-9]|2[0589]|3[0146-8]|4[0179]|5[12469]|7[0-389]|8[04-69]))[2-9]\\d{6}",
  ,,,"2015550123",,,,[7]],[,,"(?:2(?:0[1-35-9]|1[02-9]|2[03-589]|3[149]|4[08]|5[1-46]|6[0279]|7[0269]|8[13])|3(?:0[1-57-9]|1[02-9]|2[0135]|3[0-24679]|4[167]|5[12]|6[014]|8[056])|4(?:0[124-9]|1[02-579]|2[3-5]|3[0245]|4[0235]|58|6[39]|7[0589]|8[04])|5(?:0[1-57-9]|1[0235-8]|20|3[0149]|4[01]|5[19]|6[1-47]|7[013-5]|8[056])|6(?:0[1-35-9]|1[024-9]|2[03689]|[34][016]|5[0179]|6[0-279]|78|8[0-29])|7(?:0[1-46-8]|1[2-9]|2[04-7]|3[1247]|4[037]|5[47]|6[02359]|7[02-59]|8[156])|8(?:0[1-68]|1[02-8]|2[08]|3[0-28]|4[3578]|5[046-9]|6[02-5]|7[028])|9(?:0[1346-9]|1[02-9]|2[0589]|3[0146-8]|4[0179]|5[12469]|7[0-389]|8[04-69]))[2-9]\\d{6}",
  ,,,"2015550123",,,,[7]],[,,"8(?:00|33|44|55|66|77|88)[2-9]\\d{6}",,,,"8002345678"],[,,"900[2-9]\\d{6}",,,,"9002345678"],[,,,,,,,,,[-1]],[,,"52(?:35(?:[02-46-9]\\d|1[02-9]|5[0-46-9])|45(?:[034]\\d|1[02-9]|2[024-9]|5[0-46-9]))\\d{4}|52(?:3[2-46-9]|4[2-4])(?:[02-9]\\d|1[02-9])\\d{4}|5(?:00|2[12]|33|44|66|77|88)[2-9]\\d{6}",,,,"5002345678"],[,,,,,,,,,[-1]],"US",1,"011","1",,,"1",,,1,[[,"(\\d{3})(\\d{4})","$1-$2",["[2-9]"]],[,"(\\d{3})(\\d{3})(\\d{4})","($1) $2-$3",["[2-9]"],,,1]],[[,"(\\d{3})(\\d{3})(\\d{4})",
  "$1-$2-$3",["[2-9]"]]],[,,,,,,,,,[-1]],1,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],UY:[,[,,"(?:[249]\\d\\d|80)\\d{5}|9\\d{6}",,,,,,,[7,8]],[,,"(?:2\\d|4[2-7])\\d{6}",,,,"21231234",,,[8],[7]],[,,"9[1-9]\\d{6}",,,,"94231234",,,[8]],[,,"80[05]\\d{4}",,,,"8001234",,,[7]],[,,"90[0-8]\\d{4}",,,,"9001234",,,[7]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"UY",598,"0(?:0|1[3-9]\\d)","0"," int. ",,"0",,"00",,[[,"(\\d{3})(\\d{4})","$1 $2",["8|90"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",
  ["9"],"0$1"],[,"(\\d{4})(\\d{4})","$1 $2",["[24]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],UZ:[,[,,"(?:[679]\\d|88)\\d{7}",,,,,,,[9]],[,,"(?:6(?:1(?:22|3[124]|4[1-4]|5[1-3578]|64)|2(?:22|3[0-57-9]|41)|5(?:22|3[3-7]|5[024-8])|6\\d\\d|7(?:[23]\\d|7[69])|9(?:22|4[1-8]|6[135]))|7(?:0(?:5[4-9]|6[0146]|7[124-6]|9[135-8])|(?:1[12]|8\\d)\\d|2(?:22|3[13-57-9]|4[1-3579]|5[14])|3(?:2\\d|3[1578]|4[1-35-7]|5[1-57]|61)|4(?:2\\d|3[1-579]|7[1-79])|5(?:22|5[1-9]|6[1457])|6(?:22|3[12457]|4[13-8])|9(?:22|5[1-9])))\\d{5}",
  ,,,"669050123"],[,,"(?:6(?:1(?:2(?:2[01]|98)|35[0-4]|50\\d|61[23]|7(?:[01][017]|4\\d|55|9[5-9]))|2(?:(?:11|7\\d)\\d|2(?:[12]1|9[01379])|5(?:[126]\\d|3[0-4]))|5(?:19[01]|2(?:27|9[26])|(?:30|59|7\\d)\\d)|6(?:2(?:1[5-9]|2[0367]|38|41|52|60)|(?:3[79]|9[0-3])\\d|4(?:56|83)|7(?:[07]\\d|1[017]|3[07]|4[047]|5[057]|67|8[0178]|9[79]))|7(?:2(?:24|3[237]|4[5-9]|7[15-8])|5(?:7[12]|8[0589])|7(?:0\\d|[39][07])|9(?:0\\d|7[079]))|9(?:2(?:1[1267]|3[01]|5\\d|7[0-4])|(?:5[67]|7\\d)\\d|6(?:2[0-26]|8\\d)))|7(?:[07]\\d{3}|1(?:13[01]|6(?:0[47]|1[67]|66)|71[3-69]|98\\d)|2(?:2(?:2[79]|95)|3(?:2[5-9]|6[0-6])|57\\d|7(?:0\\d|1[17]|2[27]|3[37]|44|5[057]|66|88))|3(?:2(?:1[0-6]|21|3[469]|7[159])|(?:33|9[4-6])\\d|5(?:0[0-4]|5[579]|9\\d)|7(?:[0-3579]\\d|4[0467]|6[67]|8[078]))|4(?:2(?:29|5[0257]|6[0-7]|7[1-57])|5(?:1[0-4]|8\\d|9[5-9])|7(?:0\\d|1[024589]|2[0-27]|3[0137]|[46][07]|5[01]|7[5-9]|9[079])|9(?:7[015-9]|[89]\\d))|5(?:112|2(?:0\\d|2[29]|[49]4)|3[1568]\\d|52[6-9]|7(?:0[01578]|1[017]|[23]7|4[047]|[5-7]\\d|8[78]|9[079]))|6(?:2(?:2[1245]|4[2-4])|39\\d|41[179]|5(?:[349]\\d|5[0-2])|7(?:0[017]|[13]\\d|22|44|55|67|88))|9(?:22[128]|3(?:2[0-4]|7\\d)|57[02569]|7(?:2[05-9]|3[37]|4\\d|60|7[2579]|87|9[07])))|(?:88|9[0-57-9])\\d{3})\\d{4}",
  ,,,"912345678"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"UZ",998,"810","8",,,"8",,"8~10",,[[,"(\\d{2})(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[6-9]"],"8 $1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],VA:[,[,,"0\\d{5,10}|3[0-8]\\d{7,10}|55\\d{8}|8\\d{5}(?:\\d{2,4})?|(?:1\\d|39)\\d{7,8}",,,,,,,[6,7,8,9,10,11,12]],[,,"06698\\d{1,6}",,,,"0669812345",,,[6,7,8,9,10,11]],[,,"3[1-9]\\d{8}|3[2-9]\\d{7}",,,,"3123456789",,,[9,10]],[,,"80(?:0\\d{3}|3)\\d{3}",
  ,,,"800123456",,,[6,9]],[,,"(?:0878\\d\\d|89(?:2|4[5-9]\\d))\\d{3}|89[45][0-4]\\d\\d|(?:1(?:44|6[346])|89(?:5[5-9]|9))\\d{6}",,,,"899123456",,,[6,8,9,10]],[,,"84(?:[08]\\d{3}|[17])\\d{3}",,,,"848123456",,,[6,9]],[,,"1(?:78\\d|99)\\d{6}",,,,"1781234567",,,[9,10]],[,,"55\\d{8}",,,,"5512345678",,,[10]],"VA",39,"00",,,,,,,,,,[,,,,,,,,,[-1]],,"06698",[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,"3[2-8]\\d{9,10}",,,,"33101234501",,,[11,12]]],VC:[,[,,"(?:[58]\\d\\d|784|900)\\d{7}",,,,,,,[10],[7]],[,,"784(?:266|3(?:6[6-9]|7\\d|8[0-6])|4(?:38|5[0-36-8]|8[0-8])|5(?:55|7[0-2]|93)|638|784)\\d{4}",
  ,,,"7842661234",,,,[7]],[,,"784(?:4(?:3[0-5]|5[45]|89|9[0-8])|5(?:2[6-9]|3[0-4])|720)\\d{4}",,,,"7844301234",,,,[7]],[,,"8(?:00|33|44|55|66|77|88)[2-9]\\d{6}",,,,"8002345678"],[,,"900[2-9]\\d{6}",,,,"9002345678"],[,,,,,,,,,[-1]],[,,"52(?:35(?:[02-46-9]\\d|1[02-9]|5[0-46-9])|45(?:[034]\\d|1[02-9]|2[024-9]|5[0-46-9]))\\d{4}|52(?:3[2-46-9]|4[2-4])(?:[02-9]\\d|1[02-9])\\d{4}|5(?:00|2[12]|33|44|66|77|88)[2-9]\\d{6}",,,,"5002345678"],[,,,,,,,,,[-1]],"VC",1,"011","1",,,"1|([2-7]\\d{6})$","784$1",,,,,[,,
  ,,,,,,,[-1]],,"784",[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],VE:[,[,,"[68]00\\d{7}|(?:[24]\\d|[59]0)\\d{8}",,,,,,,[10],[7]],[,,"(?:2(?:12|3[457-9]|[467]\\d|[58][1-9]|9[1-6])|[4-6]00)\\d{7}",,,,"2121234567",,,,[7]],[,,"4(?:1[24-8]|2[46])\\d{7}",,,,"4121234567"],[,,"800\\d{7}",,,,"8001234567"],[,,"90[01]\\d{7}",,,,"9001234567"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"VE",58,"00","0",,,"0",,,,[[,"(\\d{3})(\\d{7})","$1-$2",["[24-689]"],"0$1","$CC $1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,
  [-1]],[,,"501\\d{7}",,,,"5010123456",,,,[7]],,,[,,,,,,,,,[-1]]],VG:[,[,,"(?:284|[58]\\d\\d|900)\\d{7}",,,,,,,[10],[7]],[,,"284496[0-5]\\d{3}|284(?:229|4(?:22|9[45])|774|8(?:52|6[459]))\\d{4}",,,,"2842291234",,,,[7]],[,,"284496[6-9]\\d{3}|284(?:245|3(?:0[0-3]|4[0-7]|68|9[34])|4(?:4[0-6]|68|99)|5(?:4[0-7]|68|9[69]))\\d{4}",,,,"2843001234",,,,[7]],[,,"8(?:00|33|44|55|66|77|88)[2-9]\\d{6}",,,,"8002345678"],[,,"900[2-9]\\d{6}",,,,"9002345678"],[,,,,,,,,,[-1]],[,,"52(?:35(?:[02-46-9]\\d|1[02-9]|5[0-46-9])|45(?:[034]\\d|1[02-9]|2[024-9]|5[0-46-9]))\\d{4}|52(?:3[2-46-9]|4[2-4])(?:[02-9]\\d|1[02-9])\\d{4}|5(?:00|2[12]|33|44|66|77|88)[2-9]\\d{6}",
  ,,,"5002345678"],[,,,,,,,,,[-1]],"VG",1,"011","1",,,"1|([2-578]\\d{6})$","284$1",,,,,[,,,,,,,,,[-1]],,"284",[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],VI:[,[,,"[58]\\d{9}|(?:34|90)0\\d{7}",,,,,,,[10],[7]],[,,"340(?:2(?:0[12]|2[06-8]|4[49]|77)|3(?:32|44)|4(?:2[23]|44|7[34]|89)|5(?:1[34]|55)|6(?:2[56]|4[23]|77|9[023])|7(?:1[2-57-9]|2[57]|7\\d)|884|998)\\d{4}",,,,"3406421234",,,,[7]],[,,"340(?:2(?:0[12]|2[06-8]|4[49]|77)|3(?:32|44)|4(?:2[23]|44|7[34]|89)|5(?:1[34]|55)|6(?:2[56]|4[23]|77|9[023])|7(?:1[2-57-9]|2[57]|7\\d)|884|998)\\d{4}",
  ,,,"3406421234",,,,[7]],[,,"8(?:00|33|44|55|66|77|88)[2-9]\\d{6}",,,,"8002345678"],[,,"900[2-9]\\d{6}",,,,"9002345678"],[,,,,,,,,,[-1]],[,,"52(?:35(?:[02-46-9]\\d|1[02-9]|5[0-46-9])|45(?:[034]\\d|1[02-9]|2[024-9]|5[0-46-9]))\\d{4}|52(?:3[2-46-9]|4[2-4])(?:[02-9]\\d|1[02-9])\\d{4}|5(?:00|2[12]|33|44|66|77|88)[2-9]\\d{6}",,,,"5002345678"],[,,,,,,,,,[-1]],"VI",1,"011","1",,,"1|([2-9]\\d{6})$","340$1",,1,,,[,,,,,,,,,[-1]],,"340",[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],VN:[,[,,"[12]\\d{9}|[135-9]\\d{8}|[16]\\d{7}|[16-8]\\d{6}",
  ,,,,,,[7,8,9,10]],[,,"2(?:0[3-9]|1[0-689]|2[0-25-9]|3[2-9]|4[2-8]|5[124-9]|6[0-39]|7[0-7]|8[2-79]|9[0-4679])\\d{7}",,,,"2101234567",,,[10]],[,,"(?:52[238]|89[689]|99[013-9])\\d{6}|(?:3\\d|5[689]|7[06-9]|8[1-8]|9[0-8])\\d{7}",,,,"912345678",,,[9]],[,,"1800\\d{4,6}|12(?:03|28)\\d{4}",,,,"1800123456",,,[8,9,10]],[,,"1900\\d{4,6}",,,,"1900123456",,,[8,9,10]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"672\\d{6}",,,,"672012345",,,[9]],"VN",84,"00","0",,,"0",,,,[[,"(\\d{3})(\\d{4})","$1 $2",["[17]99"],"0$1",,1],
  [,"(\\d{2})(\\d{5})","$1 $2",["80"],"0$1",,1],[,"(\\d{3})(\\d{4,5})","$1 $2",["69"],"0$1",,1],[,"(\\d{4})(\\d{4,6})","$1 $2",["1"],,,1],[,"(\\d{2})(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[69]"],"0$1",,1],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[3578]"],"0$1",,1],[,"(\\d{2})(\\d{4})(\\d{4})","$1 $2 $3",["2[48]"],"0$1",,1],[,"(\\d{3})(\\d{4})(\\d{3})","$1 $2 $3",["2"],"0$1",,1]],[[,"(\\d{2})(\\d{5})","$1 $2",["80"],"0$1",,1],[,"(\\d{4})(\\d{4,6})","$1 $2",["1"],,,1],[,"(\\d{2})(\\d{3})(\\d{2})(\\d{2})",
  "$1 $2 $3 $4",["[69]"],"0$1",,1],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[3578]"],"0$1",,1],[,"(\\d{2})(\\d{4})(\\d{4})","$1 $2 $3",["2[48]"],"0$1",,1],[,"(\\d{3})(\\d{4})(\\d{3})","$1 $2 $3",["2"],"0$1",,1]],[,,,,,,,,,[-1]],,,[,,"[17]99\\d{4}|69\\d{5,6}",,,,,,,[7,8]],[,,"(?:[17]99|80\\d)\\d{4}|69\\d{5,6}",,,,"1992000",,,[7,8]],,,[,,,,,,,,,[-1]]],VU:[,[,,"(?:[23]\\d|[48]8)\\d{3}|(?:[57]\\d|90)\\d{5}",,,,,,,[5,7]],[,,"(?:38[0-8]|48[4-9])\\d\\d|(?:2[02-9]|3[4-7]|88)\\d{3}",,,,"22123",,,[5]],[,,"(?:5\\d|7[013-7])\\d{5}",
  ,,,"5912345",,,[7]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"90[1-9]\\d{4}",,,,"9010123",,,[7]],"VU",678,"00",,,,,,,,[[,"(\\d{3})(\\d{4})","$1 $2",["[579]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"(?:3[03]|900\\d)\\d{3}",,,,"30123"],,,[,,,,,,,,,[-1]]],WF:[,[,,"(?:[45]0|68|72|8\\d)\\d{4}",,,,,,,[6]],[,,"(?:50|68|72)\\d{4}",,,,"501234"],[,,"(?:50|68|72|8[23])\\d{4}",,,,"501234"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"WF",681,"00",
  ,,,,,,,[[,"(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3",["[4-8]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,"[48]0\\d{4}",,,,"401234"]],WS:[,[,,"(?:[2-6]|8\\d{5})\\d{4}|[78]\\d{6}|[68]\\d{5}",,,,,,,[5,6,7,10]],[,,"6[1-9]\\d{3}|(?:[2-5]|60)\\d{4}",,,,"22123",,,[5,6]],[,,"(?:7[235-7]|8(?:[3-7]|9\\d{3}))\\d{5}",,,,"7212345",,,[7,10]],[,,"800\\d{3}",,,,"800123",,,[6]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"WS",685,"0",,,,,,,,[[,"(\\d{5})","$1",["[2-5]|6[1-9]"]],[,"(\\d{3})(\\d{3,7})",
  "$1 $2",["[68]"]],[,"(\\d{2})(\\d{5})","$1 $2",["7"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],XK:[,[,,"[23]\\d{7,8}|(?:4\\d\\d|[89]00)\\d{5}",,,,,,,[8,9]],[,,"(?:2[89]|39)0\\d{6}|[23][89]\\d{6}",,,,"28012345"],[,,"4[3-9]\\d{6}",,,,"43201234",,,[8]],[,,"800\\d{5}",,,,"80001234",,,[8]],[,,"900\\d{5}",,,,"90001234",,,[8]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"XK",383,"00","0",,,"0",,,,[[,"(\\d{3})(\\d{5})","$1 $2",["[89]"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{3})",
  "$1 $2 $3",["[2-4]"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[23]"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],YE:[,[,,"(?:1|7\\d)\\d{7}|[1-7]\\d{6}",,,,,,,[7,8,9],[6]],[,,"78[0-7]\\d{4}|17\\d{6}|(?:[12][2-68]|3[2358]|4[2-58]|5[2-6]|6[3-58]|7[24-6])\\d{5}",,,,"1234567",,,[7,8],[6]],[,,"7[0137]\\d{7}",,,,"712345678",,,[9]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"YE",967,"00","0",,,"0",,,,[[,"(\\d)(\\d{3})(\\d{3,4})",
  "$1 $2 $3",["[1-6]|7[24-68]"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["7"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],YT:[,[,,"80\\d{7}|(?:26|63)9\\d{6}",,,,,,,[9]],[,,"269(?:0[67]|5[0-2]|6\\d|[78]0)\\d{4}",,,,"269601234"],[,,"639(?:0[0-79]|1[019]|[267]\\d|3[09]|[45]0|9[04-79])\\d{4}",,,,"639012345"],[,,"80\\d{7}",,,,"801234567"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"YT",262,"00","0",,,"0",,,,,,[,,,,,,,,,[-1]],,"269|63",[,,,,,,
  ,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],ZA:[,[,,"[1-9]\\d{8}|8\\d{4,7}",,,,,,,[5,6,7,8,9]],[,,"(?:2(?:0330|4302)|52087)0\\d{3}|(?:1[0-8]|2[1-378]|3[1-69]|4\\d|5[1346-8])\\d{7}",,,,"101234567",,,[9]],[,,"(?:1(?:3492[0-25]|4495[0235]|549(?:20|5[01]))|4[34]492[01])\\d{3}|8[1-4]\\d{3,7}|(?:2[27]|47|54)4950\\d{3}|(?:1(?:049[2-4]|9[12]\\d\\d)|(?:6\\d|7[0-46-9])\\d{3}|8(?:5\\d{3}|7(?:08[67]|158|28[5-9]|310)))\\d{4}|(?:1[6-8]|28|3[2-69]|4[025689]|5[36-8])4920\\d{3}|(?:12|[2-5]1)492\\d{4}",,,,"711234567"],
  [,,"80\\d{7}",,,,"801234567",,,[9]],[,,"(?:86[2-9]|9[0-2]\\d)\\d{6}",,,,"862345678",,,[9]],[,,"860\\d{6}",,,,"860123456",,,[9]],[,,,,,,,,,[-1]],[,,"87(?:08[0-589]|15[0-79]|28[0-4]|31[1-9])\\d{4}|87(?:[02][0-79]|1[0-46-9]|3[02-9]|[4-9]\\d)\\d{5}",,,,"871234567",,,[9]],"ZA",27,"00","0",,,"0",,,,[[,"(\\d{2})(\\d{3,4})","$1 $2",["8[1-4]"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{2,3})","$1 $2 $3",["8[1-4]"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["860"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["[1-9]"],
  "0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"861\\d{6}",,,,"861123456",,,[9]],,,[,,,,,,,,,[-1]]],ZM:[,[,,"(?:63|80)0\\d{6}|(?:21|[79]\\d)\\d{7}",,,,,,,[9],[6]],[,,"21[1-8]\\d{6}",,,,"211234567",,,,[6]],[,,"(?:7[679]|9[5-8])\\d{7}",,,,"955123456"],[,,"800\\d{6}",,,,"800123456"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"630\\d{6}",,,,"630012345"],"ZM",260,"00","0",,,"0",,,,[[,"(\\d{3})(\\d{3})","$1 $2",["[1-9]"]],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[28]"],"0$1"],[,"(\\d{2})(\\d{7})",
  "$1 $2",["[79]"],"0$1"]],[[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[28]"],"0$1"],[,"(\\d{2})(\\d{7})","$1 $2",["[79]"],"0$1"]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],ZW:[,[,,"2(?:[0-57-9]\\d{6,8}|6[0-24-9]\\d{6,7})|[38]\\d{9}|[35-8]\\d{8}|[3-6]\\d{7}|[1-689]\\d{6}|[1-3569]\\d{5}|[1356]\\d{4}",,,,,,,[5,6,7,8,9,10],[3,4]],[,,"(?:1(?:(?:3\\d|9)\\d|[4-8])|2(?:(?:(?:0(?:2[014]|5)|(?:2[0157]|31|84|9)\\d\\d|[56](?:[14]\\d\\d|20)|7(?:[089]|2[03]|[35]\\d\\d))\\d|4(?:2\\d\\d|8))\\d|1(?:2|[39]\\d{4}))|3(?:(?:123|(?:29\\d|92)\\d)\\d\\d|7(?:[19]|[56]\\d))|5(?:0|1[2-478]|26|[37]2|4(?:2\\d{3}|83)|5(?:25\\d\\d|[78])|[689]\\d)|6(?:(?:[16-8]21|28|52[013])\\d\\d|[39])|8(?:[1349]28|523)\\d\\d)\\d{3}|(?:4\\d\\d|9[2-9])\\d{4,5}|(?:(?:2(?:(?:(?:0|8[146])\\d|7[1-7])\\d|2(?:[278]\\d|92)|58(?:2\\d|3))|3(?:[26]|9\\d{3})|5(?:4\\d|5)\\d\\d)\\d|6(?:(?:(?:[0-246]|[78]\\d)\\d|37)\\d|5[2-8]))\\d\\d|(?:2(?:[569]\\d|8[2-57-9])|3(?:[013-59]\\d|8[37])|6[89]8)\\d{3}",
  ,,,"1312345",,,,[3,4]],[,,"7(?:[17]\\d|[38][1-9])\\d{6}",,,,"712345678",,,[9]],[,,"80(?:[01]\\d|20|8[0-8])\\d{3}",,,,"8001234",,,[7]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"86(?:1[12]|22|30|44|55|77|8[368])\\d{6}",,,,"8686123456",,,[10]],"ZW",263,"00","0",,,"0",,,,[[,"(\\d{3})(\\d{3,5})","$1 $2",["2(?:0[45]|2[278]|[49]8)|3(?:[09]8|17)|6(?:[29]8|37|75)|[23][78]|(?:33|5[15]|6[68])[78]"],"0$1"],[,"(\\d)(\\d{3})(\\d{2,4})","$1 $2 $3",["[49]"],"0$1"],[,"(\\d{3})(\\d{4})","$1 $2",["80"],"0$1"],
  [,"(\\d{2})(\\d{7})","$1 $2",["24|8[13-59]|(?:2[05-79]|39|5[45]|6[15-8])2","2(?:02[014]|4|[56]20|[79]2)|392|5(?:42|525)|6(?:[16-8]21|52[013])|8[13-59]"],"(0$1)"],[,"(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["7"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{3,4})","$1 $2 $3",["2(?:1[39]|2[0157]|[378]|[56][14])|3(?:12|29)","2(?:1[39]|2[0157]|[378]|[56][14])|3(?:123|29)"],"0$1"],[,"(\\d{4})(\\d{6})","$1 $2",["8"],"0$1"],[,"(\\d{2})(\\d{3,5})","$1 $2",["1|2(?:0[0-36-9]|12|29|[56])|3(?:1[0-689]|[24-6])|5(?:[0236-9]|1[2-4])|6(?:[013-59]|7[0-46-9])|(?:33|55|6[68])[0-69]|(?:29|3[09]|62)[0-79]"],
  "0$1"],[,"(\\d{2})(\\d{3})(\\d{3,4})","$1 $2 $3",["29[013-9]|39|54"],"0$1"],[,"(\\d{4})(\\d{3,5})","$1 $2",["(?:25|54)8","258|5483"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],800:[,[,,"[1-9]\\d{7}",,,,,,,[8]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"[1-9]\\d{7}",,,,"12345678"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"001",800,,,,,,,,1,[[,"(\\d{4})(\\d{4})","$1 $2",["[1-9]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],
  808:[,[,,"[1-9]\\d{7}",,,,,,,[8]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"[1-9]\\d{7}",,,,"12345678"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"001",808,,,,,,,,1,[[,"(\\d{4})(\\d{4})","$1 $2",["[1-9]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],870:[,[,,"[35-7]\\d{8}",,,,,,,[9]],[,,,,,,,,,[-1]],[,,"(?:[356]\\d|7[6-8])\\d{7}",,,,"301234567"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"001",870,,,,,,,,,[[,"(\\d{3})(\\d{3})(\\d{3})",
  "$1 $2 $3",["[35-7]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],878:[,[,,"10\\d{10}",,,,,,,[12]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"10\\d{10}",,,,"101234567890"],"001",878,,,,,,,,1,[[,"(\\d{2})(\\d{5})(\\d{5})","$1 $2 $3",["1"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],881:[,[,,"[0-36-9]\\d{8}",,,,,,,[9]],[,,,,,,,,,[-1]],[,,"[0-36-9]\\d{8}",,,,"612345678"],[,,,,,,,,,[-1]],[,
  ,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"001",881,,,,,,,,,[[,"(\\d)(\\d{3})(\\d{5})","$1 $2 $3",["[0-36-9]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],882:[,[,,"[13]\\d{6}(?:\\d{2,5})?|285\\d{9}|[19]\\d{7}",,,,,,,[7,8,9,10,11,12]],[,,,,,,,,,[-1]],[,,"3(?:37\\d\\d|42)\\d{4}|3(?:2|47|7\\d{3})\\d{7}",,,,"3421234",,,[7,9,10,12]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"1(?:3(?:0[0347]|[13][0139]|2[035]|4[013568]|6[0459]|7[06]|8[15-8]|9[0689])\\d{4}|6\\d{5,10})|(?:(?:285\\d\\d|3(?:45|[69]\\d{3}))\\d|9[89])\\d{6}",
  ,,,"390123456789"],"001",882,,,,,,,,,[[,"(\\d{2})(\\d{5})","$1 $2",["16|342"]],[,"(\\d{2})(\\d{2})(\\d{4})","$1 $2 $3",["[19]"]],[,"(\\d{2})(\\d{4})(\\d{3})","$1 $2 $3",["3[23]"]],[,"(\\d{2})(\\d{3,4})(\\d{4})","$1 $2 $3",["1"]],[,"(\\d{2})(\\d{4})(\\d{4})","$1 $2 $3",["34[57]"]],[,"(\\d{3})(\\d{4})(\\d{4})","$1 $2 $3",["34"]],[,"(\\d{2})(\\d{4,5})(\\d{5})","$1 $2 $3",["[1-3]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,"348[57]\\d{7}",,,,"34851234567",,,[11]]],883:[,[,,"51\\d{7}(?:\\d{3})?",
  ,,,,,,[9,12]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"51[013]0\\d{8}|5100\\d{5}",,,,"510012345"],"001",883,,,,,,,,1,[[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["510"]],[,"(\\d{3})(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3 $4",["510"]],[,"(\\d{4})(\\d{4})(\\d{4})","$1 $2 $3",["5"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],888:[,[,,"\\d{11}",,,,,,,[11]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,
  ,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"001",888,,,,,,,,1,[[,"(\\d{3})(\\d{3})(\\d{5})","$1 $2 $3"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"\\d{11}",,,,"12345678901"],,,[,,,,,,,,,[-1]]],979:[,[,,"[1359]\\d{8}",,,,,,,[9],[8]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"[1359]\\d{8}",,,,"123456789",,,,[8]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"001",979,,,,,,,,1,[[,"(\\d)(\\d{4})(\\d{4})","$1 $2 $3",["[1359]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,
  ,[-1]]]};/*

   Copyright (C) 2010 The Libphonenumber Authors.

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
  */
  function L(){this.a={};}L.a=void 0;L.b=function(){return L.a?L.a:L.a=new L};
  var Ba={0:"0",1:"1",2:"2",3:"3",4:"4",5:"5",6:"6",7:"7",8:"8",9:"9","\uff10":"0","\uff11":"1","\uff12":"2","\uff13":"3","\uff14":"4","\uff15":"5","\uff16":"6","\uff17":"7","\uff18":"8","\uff19":"9","\u0660":"0","\u0661":"1","\u0662":"2","\u0663":"3","\u0664":"4","\u0665":"5","\u0666":"6","\u0667":"7","\u0668":"8","\u0669":"9","\u06f0":"0","\u06f1":"1","\u06f2":"2","\u06f3":"3","\u06f4":"4","\u06f5":"5","\u06f6":"6","\u06f7":"7","\u06f8":"8","\u06f9":"9"},Ca={0:"0",1:"1",2:"2",3:"3",4:"4",5:"5",6:"6",
  7:"7",8:"8",9:"9","+":"+","*":"*","#":"#"},Da={0:"0",1:"1",2:"2",3:"3",4:"4",5:"5",6:"6",7:"7",8:"8",9:"9","\uff10":"0","\uff11":"1","\uff12":"2","\uff13":"3","\uff14":"4","\uff15":"5","\uff16":"6","\uff17":"7","\uff18":"8","\uff19":"9","\u0660":"0","\u0661":"1","\u0662":"2","\u0663":"3","\u0664":"4","\u0665":"5","\u0666":"6","\u0667":"7","\u0668":"8","\u0669":"9","\u06f0":"0","\u06f1":"1","\u06f2":"2","\u06f3":"3","\u06f4":"4","\u06f5":"5","\u06f6":"6","\u06f7":"7","\u06f8":"8","\u06f9":"9",A:"2",
  B:"2",C:"2",D:"3",E:"3",F:"3",G:"4",H:"4",I:"4",J:"5",K:"5",L:"5",M:"6",N:"6",O:"6",P:"7",Q:"7",R:"7",S:"7",T:"8",U:"8",V:"8",W:"9",X:"9",Y:"9",Z:"9"},Ea=/[\d]+(?:[~\u2053\u223C\uFF5E][\d]+)?/,Fa=/[+\uff0b]+/,M=/^[+\uff0b]+/,Ga=/([0-9\uff10-\uff19\u0660-\u0669\u06f0-\u06f9])/,Ha=/[+\uff0b0-9\uff10-\uff19\u0660-\u0669\u06f0-\u06f9]/,Ia=/[\\\/] *x/,Ja=/[^0-9\uff10-\uff19\u0660-\u0669\u06f0-\u06f9A-Za-z#]+$/,Ka=/(?:.*?[A-Za-z]){3}.*/,La=/(?:;ext=([0-9\uff10-\uff19\u0660-\u0669\u06f0-\u06f9]{1,7})|[ \u00a0\t,]*(?:e?xt(?:ensi(?:o\u0301?|\u00f3))?n?|\uff45?\uff58\uff54\uff4e?|\u0434\u043e\u0431|[;,x\uff58#\uff03~\uff5e]|int|anexo|\uff49\uff4e\uff54)[:\.\uff0e]?[ \u00a0\t,-]*([0-9\uff10-\uff19\u0660-\u0669\u06f0-\u06f9]{1,7})#?|[- ]+([0-9\uff10-\uff19\u0660-\u0669\u06f0-\u06f9]{1,5})#)$/i,
  Ma=/^[0-9\uff10-\uff19\u0660-\u0669\u06f0-\u06f9]{2}$|^[+\uff0b]*(?:[-x\u2010-\u2015\u2212\u30fc\uff0d-\uff0f \u00a0\u00ad\u200b\u2060\u3000()\uff08\uff09\uff3b\uff3d.\[\]/~\u2053\u223c\uff5e*]*[0-9\uff10-\uff19\u0660-\u0669\u06f0-\u06f9]){3,}[-x\u2010-\u2015\u2212\u30fc\uff0d-\uff0f \u00a0\u00ad\u200b\u2060\u3000()\uff08\uff09\uff3b\uff3d.\[\]/~\u2053\u223c\uff5e*A-Za-z0-9\uff10-\uff19\u0660-\u0669\u06f0-\u06f9]*(?:;ext=([0-9\uff10-\uff19\u0660-\u0669\u06f0-\u06f9]{1,7})|[ \u00a0\t,]*(?:e?xt(?:ensi(?:o\u0301?|\u00f3))?n?|\uff45?\uff58\uff54\uff4e?|\u0434\u043e\u0431|[;,x\uff58#\uff03~\uff5e]|int|anexo|\uff49\uff4e\uff54)[:\.\uff0e]?[ \u00a0\t,-]*([0-9\uff10-\uff19\u0660-\u0669\u06f0-\u06f9]{1,7})#?|[- ]+([0-9\uff10-\uff19\u0660-\u0669\u06f0-\u06f9]{1,5})#)?$/i,
  Na=/(\$\d)/,Oa=/^\(?\$1\)?$/;function Pa(a){var b=a.search(Ha);0<=b?(a=a.substring(b),a=a.replace(Ja,""),b=a.search(Ia),0<=b&&(a=a.substring(0,b))):a="";return a}function Qa(a){return 2>a.length?!1:N(Ma,a)}function Ra(a){return N(Ka,a)?O(a,Da):O(a,Ba)}function Sa(a){var b=Ra(a.toString());r(a);a.a(b);}function Ta(){return ba(Object.keys(K),function(a){return isNaN(a)})}function Ua(){var a=ba(Object.keys(K),function(a){return !isNaN(a)});return ca(a,function(a){return parseInt(a,10)})}
  function Va(){var a=Object.keys(J);return da(Ua(),ca(a,function(a){return parseInt(a,10)}))}function Wa(a){return null!=a&&(1!=B(a,9)||-1!=y(a,9)[0])}function O(a,b){for(var c=new q,d,e=a.length,f=0;f<e;++f)d=a.charAt(f),d=b[d.toUpperCase()],null!=d&&c.a(d);return c.toString()}function Xa(a){return 0==a.length||Oa.test(a)}function P(a){return null!=a&&isNaN(a)&&a.toUpperCase()in K}
  function R(a,b,c){if(0==w(b,2)&&v(b,5)){var d=A(b,5);if(0<d.length)return d}d=A(b,1);var e=S(b);if(0==c)return Ya(d,0,e,"");if(!(d in J))return e;a=T(a,d,U(d));b=Za(b,a,c);e=$a(e,a,c);return Ya(d,c,e,b)}function T(a,b,c){return "001"==c?V(a,""+b):V(a,c)}
  function ab(a,b){var c=W;if(!P(b))return R(c,a,1);var d=A(a,1),e=S(a);if(!(d in J))return e;if(1==d){if(null!=b&&0<=t(J[1],b.toUpperCase()))return d+" "+R(c,a,2)}else if(d==bb(c,b))return R(c,a,2);var f=V(c,b),g=A(f,11);b="";N(Ea,g)?b=g:v(f,17)&&(b=A(f,17));c=T(c,d,U(d));e=$a(e,c,1);a=Za(a,c,1);return 0<b.length?b+" "+d+" "+e+a:Ya(d,1,e,a)}function S(a){if(!v(a,2))return "";var b=""+w(a,2);return v(a,4)&&w(a,4)&&0<A(a,8)?Array(A(a,8)+1).join("0")+b:b}
  function Ya(a,b,c,d){switch(b){case 0:return "+"+a+c+d;case 1:return "+"+a+" "+c+d;case 3:return "tel:+"+a+"-"+c+d;default:return c+d}}
  function $a(a,b,c){a:{b=0==y(b,20).length||2==c?y(b,19):y(b,20);for(var d,e=b.length,f=0;f<e;++f){d=b[f];var g=B(d,3);if(0==g||0==a.search(w(d,3,g-1)))if(g=new RegExp(w(d,1)),N(g,a)){b=d;break a}}b=null;}null!=b&&(e=b,b=A(e,2),d=new RegExp(w(e,1)),A(e,5),e=A(e,4),a=2==c&&null!=e&&0<e.length?a.replace(d,b.replace(Na,e)):a.replace(d,b),3==c&&(a=a.replace(/^[-x\u2010-\u2015\u2212\u30fc\uff0d-\uff0f \u00a0\u00ad\u200b\u2060\u3000()\uff08\uff09\uff3b\uff3d.\[\]/~\u2053\u223c\uff5e]+/,""),a=a.replace(/[-x\u2010-\u2015\u2212\u30fc\uff0d-\uff0f \u00a0\u00ad\u200b\u2060\u3000()\uff08\uff09\uff3b\uff3d.\[\]/~\u2053\u223c\uff5e]+/g,
  "-")));return c=a}function cb(a,b){var c=W;if(!P(a))return null;b=db(V(c,a),b);try{if(v(b,6)){var d=w(b,6);return eb(c,d,a)}}catch(e){}return null}function Za(a,b,c){return v(a,3)&&0!=w(a,3).length?3==c?";ext="+w(a,3):v(b,13)?w(b,13)+A(a,3):" ext. "+A(a,3):""}
  function db(a,b){switch(b){case 4:return w(a,5);case 3:return w(a,4);case 1:return w(a,3);case 0:case 2:return w(a,2);case 5:return w(a,6);case 6:return w(a,8);case 7:return w(a,7);case 8:return w(a,21);case 9:return w(a,25);case 10:return w(a,28);default:return w(a,1)}}function fb(a,b){return X(a,w(b,1))?X(a,w(b,5))?4:X(a,w(b,4))?3:X(a,w(b,6))?5:X(a,w(b,8))?6:X(a,w(b,7))?7:X(a,w(b,21))?8:X(a,w(b,25))?9:X(a,w(b,28))?10:X(a,w(b,2))?w(b,18)||X(a,w(b,3))?2:0:!w(b,18)&&X(a,w(b,3))?1:-1:-1}
  function V(a,b){if(null==b)return null;b=b.toUpperCase();var c=a.a[b];if(null==c){c=K[b];if(null==c)return null;c=(new H).a(F.h(),c);a.a[b]=c;}return c}function X(a,b){var c=a.length;return 0<B(b,9)&&-1==t(y(b,9),c)?!1:N(A(b,2),a)}function gb(a){var b=W,c=hb(b,a);var d=A(a,1);var e=T(b,d,c);null==e||"001"!=c&&d!=bb(b,c)?e=!1:(a=S(a),e=-1!=fb(a,e));return e}
  function hb(a,b){if(null==b)return null;var c=A(b,1);c=J[c];if(null==c)a=null;else if(1==c.length)a=c[0];else a:{b=S(b);for(var d,e=c.length,f=0;f<e;f++){d=c[f];var g=V(a,d);if(v(g,23)){if(0==b.search(w(g,23))){a=d;break a}}else if(-1!=fb(b,g)){a=d;break a}}a=null;}return a}function U(a){a=J[a];return null==a?"ZZ":a[0]}function bb(a,b){a=V(a,b);if(null==a)throw Error("Invalid region code: "+b);return A(a,10)}function ib(a){a=jb(a);return 0==a||4==a}
  function kb(a,b,c,d){var e=db(c,d),f=0==B(e,9)?y(w(c,1),9):y(e,9);e=y(e,10);if(2==d)if(Wa(db(c,0)))a=db(c,1),Wa(a)&&(f=f.concat(0==B(a,9)?y(w(c,1),9):y(a,9)),ea(f),0==e.length?e=y(a,10):(e=e.concat(y(a,10)),ea(e)));else return kb(a,b,c,1);if(-1==f[0])return 5;b=b.length;if(-1<t(e,b))return 4;c=f[0];return c==b?0:c>b?2:f[f.length-1]<b?3:-1<t(f,b,1)?0:5}function jb(a){var b=W,c=S(a);a=A(a,1);if(!(a in J))return 1;a=T(b,a,U(a));return kb(b,c,a,-1)}
  function lb(a,b){a=a.toString();if(0==a.length||"0"==a.charAt(0))return 0;for(var c,d=a.length,e=1;3>=e&&e<=d;++e)if(c=parseInt(a.substring(0,e),10),c in J)return b.a(a.substring(e)),c;return 0}
  function mb(a,b,c,d,e){if(0==b.length)return 0;b=new q(b);var f;null!=c&&(f=w(c,11));null==f&&(f="NonMatch");var g=b.toString();if(0==g.length)f=20;else if(M.test(g))g=g.replace(M,""),r(b),b.a(Ra(g)),f=1;else {g=new RegExp(f);Sa(b);f=b.toString();if(0==f.search(g)){g=f.match(g)[0].length;var k=f.substring(g).match(Ga);k&&null!=k[1]&&0<k[1].length&&"0"==O(k[1],Ba)?f=!1:(r(b),b.a(f.substring(g)),f=!0);}else f=!1;f=f?5:20;}if(20!=f){if(2>=b.b.length)throw Error("Phone number too short after IDD");a=lb(b,
  d);if(0!=a)return x(e,1,a),a;throw Error("Invalid country calling code");}if(null!=c&&(f=A(c,10),g=""+f,k=b.toString(),0==k.lastIndexOf(g,0)&&(g=new q(k.substring(g.length)),k=w(c,1),k=new RegExp(A(k,2)),nb(g,c,null),g=g.toString(),!N(k,b.toString())&&N(k,g)||3==kb(a,b.toString(),c,-1))))return d.a(g),x(e,1,f),f;x(e,1,0);return 0}
  function nb(a,b,c){var d=a.toString(),e=d.length,f=w(b,15);if(0!=e&&null!=f&&0!=f.length){var g=new RegExp("^(?:"+f+")");if(e=g.exec(d)){f=new RegExp(A(w(b,1),2));var k=N(f,d),p=e.length-1;b=w(b,16);if(null==b||0==b.length||null==e[p]||0==e[p].length){if(!k||N(f,d.substring(e[0].length)))null!=c&&0<p&&null!=e[p]&&c.a(e[1]),a.set(d.substring(e[0].length));}else if(d=d.replace(g,b),!k||N(f,d))null!=c&&0<p&&c.a(e[1]),a.set(d);}}}
  function eb(a,b,c){if(null==b)throw Error("The string supplied did not seem to be a phone number");if(250<b.length)throw Error("The string supplied is too long to be a phone number");var d=new q,e=b.indexOf(";phone-context=");if(0<=e){var f=e+15;if("+"==b.charAt(f)){var g=b.indexOf(";",f);0<g?d.a(b.substring(f,g)):d.a(b.substring(f));}f=b.indexOf("tel:");d.a(b.substring(0<=f?f+4:0,e));}else d.a(Pa(b));b=d.toString();e=b.indexOf(";isub=");0<e&&(r(d),d.a(b.substring(0,e)));if(!Qa(d.toString()))throw Error("The string supplied did not seem to be a phone number");
  b=d.toString();if(!(P(c)||null!=b&&0<b.length&&M.test(b)))throw Error("Invalid country calling code");b=new I;a:{e=d.toString();f=e.search(La);if(0<=f&&Qa(e.substring(0,f))){g=e.match(La);for(var k=g.length,p=1;p<k;++p)if(null!=g[p]&&0<g[p].length){r(d);d.a(e.substring(0,f));e=g[p];break a}}e="";}0<e.length&&x(b,3,e);f=V(a,c);e=new q;g=0;k=d.toString();try{g=mb(a,k,f,e,b);}catch(Q){if("Invalid country calling code"==Q.message&&M.test(k)){if(k=k.replace(M,""),g=mb(a,k,f,e,b),0==g)throw Q;}else throw Q;
  }0!=g?(d=U(g),d!=c&&(f=T(a,g,d))):(Sa(d),e.a(d.toString()),null!=c&&(g=A(f,10),x(b,1,g)));if(2>e.b.length)throw Error("The string supplied is too short to be a phone number");null!=f&&(c=new q(e.toString()),nb(c,f,new q),a=kb(a,c.toString(),f,-1),2!=a&&4!=a&&5!=a&&(e=c));a=e.toString();c=a.length;if(2>c)throw Error("The string supplied is too short to be a phone number");if(17<c)throw Error("The string supplied is too long to be a phone number");if(1<a.length&&"0"==a.charAt(0)){x(b,4,!0);for(c=1;c<
  a.length-1&&"0"==a.charAt(c);)c++;1!=c&&x(b,8,c);}x(b,2,parseInt(a,10));return b}function N(a,b){return (a="string"==typeof a?b.match("^(?:"+a+")$"):b.match(a))&&a[0].length==b.length?!0:!1}function ob(a){this.ha=/\u2008/;this.ca="";this.m=new q;this.$="";this.j=new q;this.o=new q;this.l=!0;this.aa=this.s=this.ea=!1;this.fa=L.b();this.u=0;this.b=new q;this.ba=!1;this.i="";this.a=new q;this.f=[];this.da=a;this.ma=this.g=pb(this,this.da);}var qb=new F;x(qb,11,"NA");
  var rb=/^[-x\u2010-\u2015\u2212\u30fc\uff0d-\uff0f \u00a0\u00ad\u200b\u2060\u3000()\uff08\uff09\uff3b\uff3d.\[\]/~\u2053\u223c\uff5e]*(\$\d[-x\u2010-\u2015\u2212\u30fc\uff0d-\uff0f \u00a0\u00ad\u200b\u2060\u3000()\uff08\uff09\uff3b\uff3d.\[\]/~\u2053\u223c\uff5e]*)+$/,sb=/[- ]/;function pb(a,b){b=P(b)?bb(a.fa,b):0;a=V(a.fa,U(b));return null!=a?a:qb}
  function tb(a){for(var b=a.f.length,c=0;c<b;++c){var d=a.f[c],e=A(d,1);if(a.$==e)return !1;var f=a;var g=d,k=A(g,1);r(f.m);var p=f;g=A(g,2);var Q="999999999999999".match(k)[0];Q.length<p.a.b.length?p="":(p=Q.replace(new RegExp(k,"g"),g),p=p.replace(/9/g,"\u2008"));0<p.length?(f.m.a(p),f=!0):f=!1;if(f)return a.$=e,a.ba=sb.test(w(d,4)),a.u=0,!0}return a.l=!1}
  function ub(a,b){for(var c=[],d=b.length-3,e=a.f.length,f=0;f<e;++f){var g=a.f[f];0==B(g,3)?c.push(a.f[f]):(g=w(g,3,Math.min(d,B(g,3)-1)),0==b.search(g)&&c.push(a.f[f]));}a.f=c;}
  function vb(a,b){a.j.a(b);var c=b;Ga.test(c)||1==a.j.b.length&&Fa.test(c)?("+"==b?(c=b,a.o.a(b)):(c=Ba[b],a.o.a(c),a.a.a(c)),b=c):(a.l=!1,a.ea=!0);if(!a.l){if(!a.ea)if(wb(a)){if(xb(a))return yb(a)}else if(0<a.i.length&&(b=a.a.toString(),r(a.a),a.a.a(a.i),a.a.a(b),b=a.b.toString(),c=b.lastIndexOf(a.i),r(a.b),a.b.a(b.substring(0,c))),a.i!=zb(a))return a.b.a(" "),yb(a);return a.j.toString()}switch(a.o.b.length){case 0:case 1:case 2:return a.j.toString();case 3:if(wb(a))a.aa=!0;else return a.i=zb(a),
  Ab(a);default:if(a.aa)return xb(a)&&(a.aa=!1),a.b.toString()+a.a.toString();if(0<a.f.length){b=Bb(a,b);c=Cb(a);if(0<c.length)return c;ub(a,a.a.toString());return tb(a)?Db(a):a.l?Eb(a,b):a.j.toString()}return Ab(a)}}function yb(a){a.l=!0;a.aa=!1;a.f=[];a.u=0;r(a.m);a.$="";return Ab(a)}
  function Cb(a){for(var b=a.a.toString(),c=a.f.length,d=0;d<c;++d){var e=a.f[d],f=A(e,1);if((new RegExp("^(?:"+f+")$")).test(b)&&(a.ba=sb.test(w(e,4)),e=b.replace(new RegExp(f,"g"),w(e,2)),e=Eb(a,e),O(e,Ca)==a.o))return e}return ""}function Eb(a,b){var c=a.b.b.length;return a.ba&&0<c&&" "!=a.b.toString().charAt(c-1)?a.b+" "+b:a.b+b}
  function Ab(a){var b=a.a.toString();if(3<=b.length){for(var c=a.s&&0==a.i.length&&0<B(a.g,20)?y(a.g,20):y(a.g,19),d=c.length,e=0;e<d;++e){var f=c[e];0<a.i.length&&Xa(A(f,4))&&!w(f,6)&&!v(f,5)||(0!=a.i.length||a.s||Xa(A(f,4))||w(f,6))&&rb.test(A(f,2))&&a.f.push(f);}ub(a,b);b=Cb(a);return 0<b.length?b:tb(a)?Db(a):a.j.toString()}return Eb(a,b)}function Db(a){var b=a.a.toString(),c=b.length;if(0<c){for(var d="",e=0;e<c;e++)d=Bb(a,b.charAt(e));return a.l?Eb(a,d):a.j.toString()}return a.b.toString()}
  function zb(a){var b=a.a.toString(),c=0;if(1!=w(a.g,10))var d=!1;else d=a.a.toString(),d="1"==d.charAt(0)&&"0"!=d.charAt(1)&&"1"!=d.charAt(1);d?(c=1,a.b.a("1").a(" "),a.s=!0):v(a.g,15)&&(d=new RegExp("^(?:"+w(a.g,15)+")"),d=b.match(d),null!=d&&null!=d[0]&&0<d[0].length&&(a.s=!0,c=d[0].length,a.b.a(b.substring(0,c))));r(a.a);a.a.a(b.substring(c));return b.substring(0,c)}
  function wb(a){var b=a.o.toString(),c=new RegExp("^(?:\\+|"+w(a.g,11)+")");c=b.match(c);return null!=c&&null!=c[0]&&0<c[0].length?(a.s=!0,c=c[0].length,r(a.a),a.a.a(b.substring(c)),r(a.b),a.b.a(b.substring(0,c)),"+"!=b.charAt(0)&&a.b.a(" "),!0):!1}function xb(a){if(0==a.a.b.length)return !1;var b=new q,c=lb(a.a,b);if(0==c)return !1;r(a.a);a.a.a(b.toString());b=U(c);"001"==b?a.g=V(a.fa,""+c):b!=a.da&&(a.g=pb(a,b));a.b.a(""+c).a(" ");a.i="";return !0}
  function Bb(a,b){var c=a.m.toString();if(0<=c.substring(a.u).search(a.ha)){var d=c.search(a.ha);b=c.replace(a.ha,b);r(a.m);a.m.a(b);a.u=d;return b.substring(0,a.u+1)}1==a.f.length&&(a.l=!1);a.$="";return a.j.toString()}var W=L.b();function Fb(a){var b=W,c=hb(b,a);b=T(b,A(a,1),c);null==b?a=-1:(a=S(a),a=fb(a,b));switch(a){case 0:return "fixed-line";case 2:return "fixed-line-or-mobile";case 1:return "mobile";case 8:return "pager";case 7:return "personal-number";case 4:return "premium-rate";case 5:return "shared-cost";case 3:return "toll-free";case 9:return "uan";case 6:return "voip";default:case -1:return "unknown"}}
  function Gb(a){switch(a){case "fixed-line":return 0;case "fixed-line-or-mobile":return 2;case "mobile":return 1;case "pager":return 8;case "personal-number":return 7;case "premium-rate":return 4;case "shared-cost":return 5;case "toll-free":return 3;case "uan":return 9;case "voip":return 6;default:case "unknown":return -1}}
  function Hb(a){try{switch(jb(a)){case 0:return "is-possible";case 1:return "invalid-country-code";case 3:return "too-long";case 2:return "too-short"}if(ib(a))return "is-possible"}catch(b){}return "unknown"}function Ib(a){if("+"!==a.charAt(0))return {parsed:b,v:c};try{var b=eb(W,a,void 0);}catch(e){}if(b){var c=hb(W,b);if(null!=c&&"ZZ"!==c)return {parsed:b,v:c}}for(var d=1;4>d;++d){c=void 0;if(a.length<d+1)return {parsed:b,v:c};c=U(a.substring(1,d+1));if("ZZ"!==c)return {v:c}}return {parsed:b,v:void 0}}
  function Y(a,b){if(!(this instanceof Y))return new Y(a,b);if("string"===typeof a)var c=!1;else try{gb(a),c=!0;}catch(f){c=!1;}if(!c&&"string"!==typeof a)throw Error("Invalid phone number, expected a string");if(!c&&null!=b&&"string"!==typeof b)throw Error("Invalid region code, expected a string");if(!c){if(b&&"+"===a.charAt(0)){var d=Jb(b);a.substr(1,(""+d).length)!==""+d&&(b=null);}if(!b){var e=Ib(a);b=void 0===e.v?null:e.v;e=e.parsed;}}this.a={number:{},regionCode:b,valid:!1,possible:!1};if(c)this.b=
  a;else {this.b=null;this.a.number.input=a;if(b){if(d=Jb(b),0===d){this.a.possibility="invalid-country-code";return}}else {this.a.possibility="invalid-country-code";return}try{e?this.b=e:this.b=eb(W,a,b);}catch(f){this.a.possibility=Hb(a);return}}this.a.number.international=R(W,this.b,1);this.a.number.national=R(W,this.b,2);this.a.number.e164=R(W,this.b,0);this.a.number.rfc3966=R(W,this.b,3);this.a.number.significant=S(this.b);a=this.a;b=this.b;c=W;c=V(c,hb(c,b));null==c?b=!0:(b=S(b),b=!X(b,w(c,24)));
  a.canBeInternationallyDialled=b;this.a.possible=ib(this.b);this.a.valid=gb(this.b);this.a.type=Fb(this.b);this.a.possibility=Hb(this.b);}function Jb(a){return P(a)?bb(W,a):0}h=Y.prototype;h.toJSON=function(){return this.a};h.ka=function(){return this.a.canBeInternationallyDialled};h.va=function(){return this.a.valid};h.ua=function(){return this.a.possible};h.ra=function(){return this.a.type};h.ta=function(){return "mobile"===this.a.type||"fixed-line-or-mobile"===this.a.type};
  h.sa=function(){return "fixed-line"===this.a.type||"fixed-line-or-mobile"===this.a.type};h.na=function(a){return this.a.number[null==a?"e164":a]};h.oa=function(a){return ab(this.b,a)};h.qa=function(){return this.a.regionCode};h.la=function(){return Jb(this.a.regionCode)};function Z(a){this.f=a;this.b=new ob(a);this.a="";}h=Z.prototype;h.ja=function(a){var b=this.b;b.ca=vb(b,a);return this.a=b.ca};h.wa=function(){return this.a};
  h.xa=function(){var a=this.a;0<a.length&&this.ia(a.substr(0,a.length-1));return this.a};h.ia=function(a){var b=this.b;b.ca="";r(b.j);r(b.o);r(b.m);b.u=0;b.$="";r(b.b);b.i="";r(b.a);b.l=!0;b.ea=!1;b.s=!1;b.aa=!1;b.f=[];b.ba=!1;b.g!=b.ma&&(b.g=pb(b,b.da));if(a){b=0;for(var c=a.length;b<c;++b)this.ja(a.charAt(b));}return this.a};h.pa=function(){return new Y(this.a,this.f)};aa=exports;m("PhoneNumber",Y);
  m("PhoneNumber.getCountryCodeForRegionCode",Jb);m("PhoneNumber.getRegionCodeForCountryCode",function(a){return U(a)});m("PhoneNumber.getSupportedRegionCodes",function(){return Ta()});m("PhoneNumber.getSupportedCallingCodes",function(){return Va()});m("PhoneNumber.getExample",function(a,b){b=b?cb(a,Gb(b)):cb(a,0);return new Y(b,a)});m("PhoneNumber.getAsYouType",function(a){return new Z(a)});m("PhoneNumber.prototype.toJSON",Y.prototype.toJSON);m("PhoneNumber.prototype.canBeInternationallyDialled",Y.prototype.ka);
  m("PhoneNumber.prototype.isValid",Y.prototype.va);m("PhoneNumber.prototype.isPossible",Y.prototype.ua);m("PhoneNumber.prototype.getType",Y.prototype.ra);m("PhoneNumber.prototype.isMobile",Y.prototype.ta);m("PhoneNumber.prototype.isFixedLine",Y.prototype.sa);m("PhoneNumber.prototype.getNumber",Y.prototype.na);m("PhoneNumber.prototype.getNumberFrom",Y.prototype.oa);m("PhoneNumber.prototype.getRegionCode",Y.prototype.qa);m("PhoneNumber.prototype.getCountryCode",Y.prototype.la);m("AsYouType",Z);
  m("AsYouType.prototype.addChar",Z.prototype.ja);m("AsYouType.prototype.number",Z.prototype.wa);m("AsYouType.prototype.removeChar",Z.prototype.xa);m("AsYouType.prototype.reset",Z.prototype.ia);m("AsYouType.prototype.getPhoneNumber",Z.prototype.pa);})();
  });

  var awesomePhonenumber = createCommonjsModule(function (module) {

  module.exports = lib.PhoneNumber;

  Object.defineProperty(
  	module.exports,
  	"__esModule",
  	{
  		value: true
  	}
  );

  module.exports.default = module.exports;
  });

  var PhoneNumber = unwrapExports(awesomePhonenumber);

  // Array of country objects for the flag dropdown.
  // Here is the criteria for the plugin to support a given country/territory
  // - It has an iso2 code: https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2
  // - It has it's own country calling code (it is not a sub-region of another country): https://en.wikipedia.org/wiki/List_of_country_calling_codes
  // - It has a flag in the region-flags project: https://github.com/behdad/region-flags/tree/gh-pages/png
  // - It is supported by libphonenumber (it must be listed on this page): https://github.com/googlei18n/libphonenumber/blob/master/resources/ShortNumberMetadata.xml
  // Each country array has the following information:
  // [
  //    Country name,
  //    iso2 code,
  //    International dial code,
  //    Order (if >1 country with same dial code),
  //    Area codes
  // ]
  var allCountries = [['Afghanistan (‫افغانستان‬‎)', 'af', '93'], ['Albania (Shqipëri)', 'al', '355'], ['Algeria (‫الجزائر‬‎)', 'dz', '213'], ['American Samoa', 'as', '1684'], ['Andorra', 'ad', '376'], ['Angola', 'ao', '244'], ['Anguilla', 'ai', '1264'], ['Antigua and Barbuda', 'ag', '1268'], ['Argentina', 'ar', '54'], ['Armenia (Հայաստան)', 'am', '374'], ['Aruba', 'aw', '297'], ['Australia', 'au', '61', 0], ['Austria (Österreich)', 'at', '43'], ['Azerbaijan (Azərbaycan)', 'az', '994'], ['Bahamas', 'bs', '1242'], ['Bahrain (‫البحرين‬‎)', 'bh', '973'], ['Bangladesh (বাংলাদেশ)', 'bd', '880'], ['Barbados', 'bb', '1246'], ['Belarus (Беларусь)', 'by', '375'], ['Belgium (België)', 'be', '32'], ['Belize', 'bz', '501'], ['Benin (Bénin)', 'bj', '229'], ['Bermuda', 'bm', '1441'], ['Bhutan (འབྲུག)', 'bt', '975'], ['Bolivia', 'bo', '591'], ['Bosnia and Herzegovina (Босна и Херцеговина)', 'ba', '387'], ['Botswana', 'bw', '267'], ['Brazil (Brasil)', 'br', '55'], ['British Indian Ocean Territory', 'io', '246'], ['British Virgin Islands', 'vg', '1284'], ['Brunei', 'bn', '673'], ['Bulgaria (България)', 'bg', '359'], ['Burkina Faso', 'bf', '226'], ['Burundi (Uburundi)', 'bi', '257'], ['Cambodia (កម្ពុជា)', 'kh', '855'], ['Cameroon (Cameroun)', 'cm', '237'], ['Canada', 'ca', '1', 1, ['204', '226', '236', '249', '250', '289', '306', '343', '365', '387', '403', '416', '418', '431', '437', '438', '450', '506', '514', '519', '548', '579', '581', '587', '604', '613', '639', '647', '672', '705', '709', '742', '778', '780', '782', '807', '819', '825', '867', '873', '902', '905']], ['Cape Verde (Kabu Verdi)', 'cv', '238'], ['Caribbean Netherlands', 'bq', '599', 1], ['Cayman Islands', 'ky', '1345'], ['Central African Republic (République centrafricaine)', 'cf', '236'], ['Chad (Tchad)', 'td', '235'], ['Chile', 'cl', '56'], ['China (中国)', 'cn', '86'], ['Christmas Island', 'cx', '61', 2], ['Cocos (Keeling) Islands', 'cc', '61', 1], ['Colombia', 'co', '57'], ['Comoros (‫جزر القمر‬‎)', 'km', '269'], ['Congo (DRC) (Jamhuri ya Kidemokrasia ya Kongo)', 'cd', '243'], ['Congo (Republic) (Congo-Brazzaville)', 'cg', '242'], ['Cook Islands', 'ck', '682'], ['Costa Rica', 'cr', '506'], ['Côte d’Ivoire', 'ci', '225'], ['Croatia (Hrvatska)', 'hr', '385'], ['Cuba', 'cu', '53'], ['Curaçao', 'cw', '599', 0], ['Cyprus (Κύπρος)', 'cy', '357'], ['Czech Republic (Česká republika)', 'cz', '420'], ['Denmark (Danmark)', 'dk', '45'], ['Djibouti', 'dj', '253'], ['Dominica', 'dm', '1767'], ['Dominican Republic (República Dominicana)', 'do', '1', 2, ['809', '829', '849']], ['Ecuador', 'ec', '593'], ['Egypt (‫مصر‬‎)', 'eg', '20'], ['El Salvador', 'sv', '503'], ['Equatorial Guinea (Guinea Ecuatorial)', 'gq', '240'], ['Eritrea', 'er', '291'], ['Estonia (Eesti)', 'ee', '372'], ['Ethiopia', 'et', '251'], ['Falkland Islands (Islas Malvinas)', 'fk', '500'], ['Faroe Islands (Føroyar)', 'fo', '298'], ['Fiji', 'fj', '679'], ['Finland (Suomi)', 'fi', '358', 0], ['France', 'fr', '33'], ['French Guiana (Guyane française)', 'gf', '594'], ['French Polynesia (Polynésie française)', 'pf', '689'], ['Gabon', 'ga', '241'], ['Gambia', 'gm', '220'], ['Georgia (საქართველო)', 'ge', '995'], ['Germany (Deutschland)', 'de', '49'], ['Ghana (Gaana)', 'gh', '233'], ['Gibraltar', 'gi', '350'], ['Greece (Ελλάδα)', 'gr', '30'], ['Greenland (Kalaallit Nunaat)', 'gl', '299'], ['Grenada', 'gd', '1473'], ['Guadeloupe', 'gp', '590', 0], ['Guam', 'gu', '1671'], ['Guatemala', 'gt', '502'], ['Guernsey', 'gg', '44', 1], ['Guinea (Guinée)', 'gn', '224'], ['Guinea-Bissau (Guiné Bissau)', 'gw', '245'], ['Guyana', 'gy', '592'], ['Haiti', 'ht', '509'], ['Honduras', 'hn', '504'], ['Hong Kong (香港)', 'hk', '852'], ['Hungary (Magyarország)', 'hu', '36'], ['Iceland (Ísland)', 'is', '354'], ['India (भारत)', 'in', '91'], ['Indonesia', 'id', '62'], ['Iran (‫ایران‬‎)', 'ir', '98'], ['Iraq (‫العراق‬‎)', 'iq', '964'], ['Ireland', 'ie', '353'], ['Isle of Man', 'im', '44', 2], ['Israel (‫ישראל‬‎)', 'il', '972'], ['Italy (Italia)', 'it', '39', 0], ['Jamaica', 'jm', '1876'], ['Japan (日本)', 'jp', '81'], ['Jersey', 'je', '44', 3], ['Jordan (‫الأردن‬‎)', 'jo', '962'], ['Kazakhstan (Казахстан)', 'kz', '7', 1], ['Kenya', 'ke', '254'], ['Kiribati', 'ki', '686'], ['Kosovo', 'xk', '383'], ['Kuwait (‫الكويت‬‎)', 'kw', '965'], ['Kyrgyzstan (Кыргызстан)', 'kg', '996'], ['Laos (ລາວ)', 'la', '856'], ['Latvia (Latvija)', 'lv', '371'], ['Lebanon (‫لبنان‬‎)', 'lb', '961'], ['Lesotho', 'ls', '266'], ['Liberia', 'lr', '231'], ['Libya (‫ليبيا‬‎)', 'ly', '218'], ['Liechtenstein', 'li', '423'], ['Lithuania (Lietuva)', 'lt', '370'], ['Luxembourg', 'lu', '352'], ['Macau (澳門)', 'mo', '853'], ['Macedonia (FYROM) (Македонија)', 'mk', '389'], ['Madagascar (Madagasikara)', 'mg', '261'], ['Malawi', 'mw', '265'], ['Malaysia', 'my', '60'], ['Maldives', 'mv', '960'], ['Mali', 'ml', '223'], ['Malta', 'mt', '356'], ['Marshall Islands', 'mh', '692'], ['Martinique', 'mq', '596'], ['Mauritania (‫موريتانيا‬‎)', 'mr', '222'], ['Mauritius (Moris)', 'mu', '230'], ['Mayotte', 'yt', '262', 1], ['Mexico (México)', 'mx', '52'], ['Micronesia', 'fm', '691'], ['Moldova (Republica Moldova)', 'md', '373'], ['Monaco', 'mc', '377'], ['Mongolia (Монгол)', 'mn', '976'], ['Montenegro (Crna Gora)', 'me', '382'], ['Montserrat', 'ms', '1664'], ['Morocco (‫المغرب‬‎)', 'ma', '212', 0], ['Mozambique (Moçambique)', 'mz', '258'], ['Myanmar (Burma) (မြန်မာ)', 'mm', '95'], ['Namibia (Namibië)', 'na', '264'], ['Nauru', 'nr', '674'], ['Nepal (नेपाल)', 'np', '977'], ['Netherlands (Nederland)', 'nl', '31'], ['New Caledonia (Nouvelle-Calédonie)', 'nc', '687'], ['New Zealand', 'nz', '64'], ['Nicaragua', 'ni', '505'], ['Niger (Nijar)', 'ne', '227'], ['Nigeria', 'ng', '234'], ['Niue', 'nu', '683'], ['Norfolk Island', 'nf', '672'], ['North Korea (조선 민주주의 인민 공화국)', 'kp', '850'], ['Northern Mariana Islands', 'mp', '1670'], ['Norway (Norge)', 'no', '47', 0], ['Oman (‫عُمان‬‎)', 'om', '968'], ['Pakistan (‫پاکستان‬‎)', 'pk', '92'], ['Palau', 'pw', '680'], ['Palestine (‫فلسطين‬‎)', 'ps', '970'], ['Panama (Panamá)', 'pa', '507'], ['Papua New Guinea', 'pg', '675'], ['Paraguay', 'py', '595'], ['Peru (Perú)', 'pe', '51'], ['Philippines', 'ph', '63'], ['Poland (Polska)', 'pl', '48'], ['Portugal', 'pt', '351'], ['Puerto Rico', 'pr', '1', 3, ['787', '939']], ['Qatar (‫قطر‬‎)', 'qa', '974'], ['Réunion (La Réunion)', 're', '262', 0], ['Romania (România)', 'ro', '40'], ['Russia (Россия)', 'ru', '7', 0], ['Rwanda', 'rw', '250'], ['Saint Barthélemy', 'bl', '590', 1], ['Saint Helena', 'sh', '290'], ['Saint Kitts and Nevis', 'kn', '1869'], ['Saint Lucia', 'lc', '1758'], ['Saint Martin (Saint-Martin (partie française))', 'mf', '590', 2], ['Saint Pierre and Miquelon (Saint-Pierre-et-Miquelon)', 'pm', '508'], ['Saint Vincent and the Grenadines', 'vc', '1784'], ['Samoa', 'ws', '685'], ['San Marino', 'sm', '378'], ['São Tomé and Príncipe (São Tomé e Príncipe)', 'st', '239'], ['Saudi Arabia (‫المملكة العربية السعودية‬‎)', 'sa', '966'], ['Senegal (Sénégal)', 'sn', '221'], ['Serbia (Србија)', 'rs', '381'], ['Seychelles', 'sc', '248'], ['Sierra Leone', 'sl', '232'], ['Singapore', 'sg', '65'], ['Sint Maarten', 'sx', '1721'], ['Slovakia (Slovensko)', 'sk', '421'], ['Slovenia (Slovenija)', 'si', '386'], ['Solomon Islands', 'sb', '677'], ['Somalia (Soomaaliya)', 'so', '252'], ['South Africa', 'za', '27'], ['South Korea (대한민국)', 'kr', '82'], ['South Sudan (‫جنوب السودان‬‎)', 'ss', '211'], ['Spain (España)', 'es', '34'], ['Sri Lanka (ශ්‍රී ලංකාව)', 'lk', '94'], ['Sudan (‫السودان‬‎)', 'sd', '249'], ['Suriname', 'sr', '597'], ['Svalbard and Jan Mayen', 'sj', '47', 1], ['Swaziland', 'sz', '268'], ['Sweden (Sverige)', 'se', '46'], ['Switzerland (Schweiz)', 'ch', '41'], ['Syria (‫سوريا‬‎)', 'sy', '963'], ['Taiwan (台灣)', 'tw', '886'], ['Tajikistan', 'tj', '992'], ['Tanzania', 'tz', '255'], ['Thailand (ไทย)', 'th', '66'], ['Timor-Leste', 'tl', '670'], ['Togo', 'tg', '228'], ['Tokelau', 'tk', '690'], ['Tonga', 'to', '676'], ['Trinidad and Tobago', 'tt', '1868'], ['Tunisia (‫تونس‬‎)', 'tn', '216'], ['Turkey (Türkiye)', 'tr', '90'], ['Turkmenistan', 'tm', '993'], ['Turks and Caicos Islands', 'tc', '1649'], ['Tuvalu', 'tv', '688'], ['U.S. Virgin Islands', 'vi', '1340'], ['Uganda', 'ug', '256'], ['Ukraine (Україна)', 'ua', '380'], ['United Arab Emirates (‫الإمارات العربية المتحدة‬‎)', 'ae', '971'], ['United Kingdom', 'gb', '44', 0], ['United States', 'us', '1', 0], ['Uruguay', 'uy', '598'], ['Uzbekistan (Oʻzbekiston)', 'uz', '998'], ['Vanuatu', 'vu', '678'], ['Vatican City (Città del Vaticano)', 'va', '39', 1], ['Venezuela', 've', '58'], ['Vietnam (Việt Nam)', 'vn', '84'], ['Wallis and Futuna (Wallis-et-Futuna)', 'wf', '681'], ['Western Sahara (‫الصحراء الغربية‬‎)', 'eh', '212', 1], ['Yemen (‫اليمن‬‎)', 'ye', '967'], ['Zambia', 'zm', '260'], ['Zimbabwe', 'zw', '263'], ['Åland Islands', 'ax', '358', 1]];
  var allCountries$1 = allCountries.map(function (country) {
    return {
      name: country[0],
      iso2: country[1].toUpperCase(),
      dialCode: country[2],
      priority: country[3] || 0,
      areaCodes: country[4] || null
    };
  });

  function getCountry() {
    return fetch('https://ip2c.org/s').then(function (response) {
      return response.text();
    }).then(function (response) {
      var result = (response || '').toString();

      if (!result || result[0] !== '1') {
        throw new Error('unable to fetch the country');
      }

      return result.substr(2, 2);
    });
  } // Credits: http://blog.vishalon.net/index.php/javascript-getting-and-setting-caret-position-in-textarea/

  function setCaretPosition(ctrl, pos) {
    // Modern browsers
    if (ctrl.setSelectionRange) {
      ctrl.focus();
      ctrl.setSelectionRange(pos, pos); // IE8 and below
    } else if (ctrl.createTextRange) {
      var range = ctrl.createTextRange();
      range.collapse(true);
      range.moveEnd('character', pos);
      range.moveStart('character', pos);
      range.select();
    }
  }
  var defaultOptions = {
    allCountries: allCountries$1,
    autocomplete: 'on',
    autofocus: false,
    customValidate: false,
    defaultCountry: '',
    disabled: false,
    disabledFetchingCountry: false,
    dropdownOptions: {},
    dynamicPlaceholder: false,
    enabledCountryCode: false,
    enabledFlags: true,
    ignoredCountries: [],
    inputClasses: '',
    inputId: '',
    inputOptions: {},
    invalidMsg: '',
    maxLen: 25,
    mode: '',
    name: 'telephone',
    onlyCountries: [],
    placeholder: 'Enter a phone number',
    preferredCountries: [],
    readonly: false,
    required: false,
    validCharactersOnly: false,
    wrapperClasses: ''
  };
  var utils = {
    options: _objectSpread2({}, defaultOptions)
  };

  // Polyfill for Event.path in IE 11: https://stackoverflow.com/a/46093727
  function getParents(node, memo) {
    var parsedMemo = memo || [];
    var parentNode = node.parentNode;

    if (!parentNode) {
      return parsedMemo;
    }

    return getParents(parentNode, parsedMemo.concat(parentNode));
  } // Click-outside by BosNaufal: https://github.com/BosNaufal/vue-click-outside


  var clickOutside = {
    bind: function bind(el, binding, vNode) {
      // Provided expression must evaluate to a function.
      if (typeof binding.value !== 'function') {
        var compName = vNode.context.name;
        var warn = "[Vue-click-outside:] provided expression ".concat(binding.expression, " is not a function, but has to be");

        if (compName) {
          warn += "Found in component ".concat(compName);
        }

        console.warn(warn);
      } // Define Handler and cache it on the element


      var bubble = binding.modifiers.bubble;

      var handler = function handler(e) {
        // Fall back to composedPath if e.path is undefined
        var path = e.path || (e.composedPath ? e.composedPath() : false) || getParents(e.target);

        if (bubble || path.length && !el.contains(path[0]) && el !== path[0]) {
          binding.value(e);
        }
      };

      el.__vueClickOutside__ = handler; // add Event Listeners

      document.addEventListener('click', handler);
    },
    unbind: function unbind(el) {
      // Remove Event Listeners
      document.removeEventListener('click', el.__vueClickOutside__);
      el.__vueClickOutside__ = null;
    }
  };

  function getDefault(key) {
    var value = utils.options[key];

    if (typeof value === 'undefined') {
      return utils.options[key];
    }

    return value;
  }

  var script$4 = {
    name: 'VueTelInput',
    directives: {
      clickOutside: clickOutside
    },
    props: {
      value: {
        type: String,
        default: ''
      },
      allCountries: {
        type: Array,
        default: function _default() {
          return getDefault('allCountries');
        }
      },
      autocomplete: {
        type: String,
        default: function _default() {
          return getDefault('autocomplete');
        }
      },
      autofocus: {
        type: Boolean,
        default: function _default() {
          return getDefault('autofocus');
        }
      },
      customValidate: {
        type: [Boolean, RegExp],
        default: function _default() {
          return getDefault('customValidate');
        }
      },
      defaultCountry: {
        // Default country code, ie: 'AU'
        // Will override the current country of user
        type: String,
        default: function _default() {
          return getDefault('defaultCountry');
        }
      },
      disabled: {
        type: Boolean,
        default: function _default() {
          return getDefault('disabled');
        }
      },
      disabledFetchingCountry: {
        type: Boolean,
        default: function _default() {
          return getDefault('disabledFetchingCountry');
        }
      },
      dropdownOptions: {
        type: Object,
        default: function _default() {
          return getDefault('dropdownOptions');
        }
      },
      dynamicPlaceholder: {
        type: Boolean,
        default: function _default() {
          return getDefault('dynamicPlaceholder');
        }
      },
      enabledCountryCode: {
        type: Boolean,
        default: function _default() {
          return getDefault('enabledCountryCode');
        }
      },
      enabledFlags: {
        type: Boolean,
        default: function _default() {
          return getDefault('enabledFlags');
        }
      },
      ignoredCountries: {
        type: Array,
        default: function _default() {
          return getDefault('ignoredCountries');
        }
      },
      inputClasses: {
        type: [String, Array, Object],
        default: function _default() {
          return getDefault('inputClasses');
        }
      },
      inputId: {
        type: String,
        default: function _default() {
          return getDefault('inputId');
        }
      },
      inputOptions: {
        type: Object,
        default: function _default() {
          return getDefault('inputOptions');
        }
      },
      invalidMsg: {
        type: String,
        default: function _default() {
          return getDefault('invalidMsg');
        }
      },
      maxLen: {
        type: Number,
        default: function _default() {
          return getDefault('maxLen');
        }
      },
      name: {
        type: String,
        default: function _default() {
          return getDefault('name');
        }
      },
      mode: {
        type: String,
        default: function _default() {
          return getDefault('mode');
        }
      },
      onlyCountries: {
        type: Array,
        default: function _default() {
          return getDefault('onlyCountries');
        }
      },
      placeholder: {
        type: String,
        default: function _default() {
          return getDefault('placeholder');
        }
      },
      preferredCountries: {
        type: Array,
        default: function _default() {
          return getDefault('preferredCountries');
        }
      },
      readonly: {
        type: Boolean,
        default: function _default() {
          return getDefault('readonly');
        }
      },
      required: {
        type: Boolean,
        default: function _default() {
          return getDefault('required');
        }
      },
      validCharactersOnly: {
        type: Boolean,
        default: function _default() {
          return getDefault('validCharactersOnly');
        }
      },
      wrapperClasses: {
        type: [String, Array, Object],
        default: function _default() {
          return getDefault('wrapperClasses');
        }
      }
    },
    data: function data() {
      return {
        phone: '',
        activeCountry: {
          iso2: ''
        },
        open: false,
        finishMounted: false,
        selectedIndex: null,
        typeToFindInput: '',
        typeToFindTimer: null,
        cursorPosition: 0,
        dropdownOpenDirection: 'below'
      };
    },
    computed: {
      parsedPlaceholder: function parsedPlaceholder() {
        if (!this.finishMounted) {
          return '';
        }

        if (this.dynamicPlaceholder) {
          var mode = this.mode || 'international';
          return PhoneNumber.getExample(this.activeCountry.iso2, 'mobile').getNumber(mode);
        }

        return this.placeholder;
      },
      parsedMode: function parsedMode() {
        if (this.customValidate) {
          return 'input';
        }

        if (this.mode) {
          if (!['international', 'national'].includes(this.mode)) {
            console.error('Invalid value of prop "mode"');
          } else {
            return this.mode;
          }
        }

        if (!this.phone || this.phone[0] !== '+') {
          return 'national';
        }

        return 'international';
      },
      filteredCountries: function filteredCountries() {
        var _this = this;

        // List countries after filtered
        if (this.onlyCountries.length) {
          return this.onlyCountries.map(function (iso) {
            return _this.allCountries.find(function (c) {
              return c.iso2 === iso.toUpperCase();
            });
          }).filter(Boolean);
        }

        if (this.ignoredCountries.length) {
          return this.allCountries.filter(function (_ref) {
            var iso2 = _ref.iso2;
            return !_this.ignoredCountries.includes(iso2.toUpperCase()) && !_this.ignoredCountries.includes(iso2.toLowerCase());
          });
        }

        return this.allCountries;
      },
      sortedCountries: function sortedCountries() {
        // Sort the list countries: from preferred countries to all countries
        var preferredCountries = this.getCountries(this.preferredCountries).map(function (country) {
          return _objectSpread2({}, country, {
            preferred: true
          });
        });
        return [].concat(_toConsumableArray(preferredCountries), _toConsumableArray(this.filteredCountries));
      },
      phoneObject: function phoneObject() {
        var result = PhoneNumber(this.phone, this.activeCountry.iso2).toJSON();
        Object.assign(result, {
          isValid: result.valid,
          country: this.activeCountry
        });
        return result;
      },
      phoneText: function phoneText() {
        var key = 'input';

        if (this.phoneObject.valid) {
          key = this.parsedMode;
        }

        return this.phoneObject.number[key] || '';
      }
    },
    watch: {
      // eslint-disable-next-line func-names
      'phoneObject.valid': function phoneObjectValid(value) {
        if (value) {
          this.phone = this.phoneText;
        }

        this.$emit('validate', this.phoneObject);
        this.$emit('onValidate', this.phoneObject); // Deprecated
      },
      value: function value() {
        this.phone = this.value;
      },
      open: function open(isDropdownOpened) {
        // Emit open and close events
        if (isDropdownOpened) {
          this.setDropdownPosition();
          this.$emit('open');
        } else {
          this.$emit('close');
        }
      },
      phone: function phone(newValue, oldValue) {
        var _this2 = this;

        var isValidCharactersOnly = this.validCharactersOnly && !this.testCharacters();
        var isCustomValidate = this.customValidate && !this.testCustomValidate();

        if (isValidCharactersOnly || isCustomValidate) {
          this.$nextTick(function () {
            _this2.phone = oldValue;
          });
        } else if (newValue) {
          if (newValue[0] === '+') {
            var code = PhoneNumber(newValue).getRegionCode();

            if (code) {
              this.activeCountry = this.findCountry(code) || this.activeCountry;
            }
          }
        } // Reset the cursor to current position if it's not the last character.


        if (this.cursorPosition < oldValue.length) {
          this.$nextTick(function () {
            setCaretPosition(_this2.$refs.input, _this2.cursorPosition);
          });
        }
      },
      activeCountry: function activeCountry(value) {
        if (value && value.iso2) {
          this.$emit('country-changed', value);
        }
      }
    },
    mounted: function mounted() {
      var _this3 = this;

      this.initializeCountry().then(function () {
        if (!_this3.phone && _this3.inputOptions && _this3.inputOptions.showDialCode && _this3.activeCountry.dialCode) {
          _this3.phone = "+".concat(_this3.activeCountry.dialCode);
        }

        _this3.$emit('validate', _this3.phoneObject);

        _this3.$emit('onValidate', _this3.phoneObject); // Deprecated

      }).catch(console.error).finally(function () {
        _this3.finishMounted = true;
      });
    },
    created: function created() {
      if (this.value) {
        this.phone = this.value.trim();
      }
    },
    methods: {
      initializeCountry: function initializeCountry() {
        var _this4 = this;

        return new Promise(function (resolve) {
          /**
           * 1. If the phone included prefix (+12), try to get the country and set it
           */
          if (_this4.phone && _this4.phone[0] === '+') {
            var activeCountry = PhoneNumber(_this4.phone).getRegionCode();

            if (activeCountry) {
              _this4.choose(activeCountry);

              resolve();
              return;
            }
          }
          /**
           * 2. Use default country if passed from parent
           */


          if (_this4.defaultCountry) {
            var defaultCountry = _this4.findCountry(_this4.defaultCountry);

            if (defaultCountry) {
              _this4.choose(defaultCountry);

              resolve();
              return;
            }
          }

          var fallbackCountry = _this4.findCountry(_this4.preferredCountries[0]) || _this4.filteredCountries[0];
          /**
           * 3. Check if fetching country based on user's IP is allowed, set it as the default country
           */


          if (!_this4.disabledFetchingCountry) {
            getCountry().then(function (res) {
              _this4.activeCountry = _this4.findCountry(res) || _this4.activeCountry;
            }).catch(function (error) {
              console.warn(error);
              /**
               * 4. Use the first country from preferred list (if available) or all countries list
               */

              _this4.choose(fallbackCountry);
            }).finally(function () {
              resolve();
            });
          } else {
            /**
             * 4. Use the first country from preferred list (if available) or all countries list
             */
            _this4.choose(fallbackCountry);

            resolve();
          }
        });
      },

      /**
       * Get the list of countries from the list of iso2 code
       */
      getCountries: function getCountries() {
        var _this5 = this;

        var list = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
        return list.map(function (countryCode) {
          return _this5.findCountry(countryCode);
        }).filter(Boolean);
      },
      findCountry: function findCountry() {
        var iso = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
        return this.filteredCountries.find(function (country) {
          return country.iso2 === iso.toUpperCase();
        });
      },
      getItemClass: function getItemClass(index, iso2) {
        var highlighted = this.selectedIndex === index;
        var lastPreferred = index === this.preferredCountries.length - 1;
        var preferred = this.preferredCountries.some(function (c) {
          return c.toUpperCase() === iso2;
        });
        return {
          highlighted: highlighted,
          'last-preferred': lastPreferred,
          preferred: preferred
        };
      },
      choose: function choose(country) {
        var toEmitInputEvent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        var parsedCountry = country;

        if (typeof parsedCountry === 'string') {
          parsedCountry = this.findCountry(parsedCountry);
        }

        if (!parsedCountry) {
          return;
        }

        this.activeCountry = parsedCountry || this.activeCountry || {};

        if (this.phone && this.phone[0] === '+' && this.activeCountry.iso2 && this.phoneObject.number.national) {
          // Attach the current phone number with the newly selected country
          this.phone = PhoneNumber(this.phoneObject.number.national, this.activeCountry.iso2).getNumber('international');
        } else if (this.inputOptions && this.inputOptions.showDialCode && parsedCountry) {
          // Reset phone if the showDialCode is set
          this.phone = "+".concat(parsedCountry.dialCode);
        }

        if (toEmitInputEvent) {
          this.$emit('input', this.phoneText, this.phoneObject);
          this.$emit('onInput', this.phoneObject); // Deprecated
        }
      },
      testCharacters: function testCharacters() {
        var re = /^[()\-+0-9\s]*$/;
        return re.test(this.phone);
      },
      testCustomValidate: function testCustomValidate() {
        return this.customValidate instanceof RegExp ? this.customValidate.test(this.phone) : false;
      },
      onInput: function onInput(e) {
        if (this.validCharactersOnly && !this.testCharacters()) {
          return;
        }

        if (this.customValidate && !this.testCustomValidate()) {
          return;
        }

        this.$refs.input.setCustomValidity(this.phoneObject.valid ? '' : this.invalidMsg); // Returns response.number to assign it to v-model (if being used)
        // Returns full response for cases @input is used
        // and parent wants to return the whole response.

        this.$emit('input', this.phoneText, this.phoneObject);
        this.$emit('onInput', this.phoneObject); // Deprecated
        // Keep the current cursor position just in case the input reformatted
        // and it gets moved to the last character.

        if (e && e.target) {
          this.cursorPosition = e.target.selectionStart;
        }
      },
      onBlur: function onBlur() {
        this.$emit('blur');
        this.$emit('onBlur'); // Deprecated
      },
      onFocus: function onFocus() {
        this.$emit('focus');
      },
      onEnter: function onEnter() {
        this.$emit('enter');
        this.$emit('onEnter'); // Deprecated
      },
      onSpace: function onSpace() {
        this.$emit('space');
        this.$emit('onSpace'); // Deprecated
      },
      focus: function focus() {
        this.$refs.input.focus();
      },
      toggleDropdown: function toggleDropdown() {
        if (this.disabled) {
          return;
        }

        this.open = !this.open;
      },
      clickedOutside: function clickedOutside() {
        this.open = false;
      },
      keyboardNav: function keyboardNav(e) {
        var _this6 = this;

        if (e.keyCode === 40) {
          // down arrow
          e.preventDefault();
          this.open = true;

          if (this.selectedIndex === null) {
            this.selectedIndex = 0;
          } else {
            this.selectedIndex = Math.min(this.sortedCountries.length - 1, this.selectedIndex + 1);
          }

          var selEle = this.$refs.list.children[this.selectedIndex];

          if (selEle.offsetTop + selEle.clientHeight > this.$refs.list.scrollTop + this.$refs.list.clientHeight) {
            this.$refs.list.scrollTop = selEle.offsetTop - this.$refs.list.clientHeight + selEle.clientHeight;
          }
        } else if (e.keyCode === 38) {
          // up arrow
          e.preventDefault();
          this.open = true;

          if (this.selectedIndex === null) {
            this.selectedIndex = this.sortedCountries.length - 1;
          } else {
            this.selectedIndex = Math.max(0, this.selectedIndex - 1);
          }

          var _selEle = this.$refs.list.children[this.selectedIndex];

          if (_selEle.offsetTop < this.$refs.list.scrollTop) {
            this.$refs.list.scrollTop = _selEle.offsetTop;
          }
        } else if (e.keyCode === 13) {
          // enter key
          if (this.selectedIndex !== null) {
            this.choose(this.sortedCountries[this.selectedIndex]);
          }

          this.open = !this.open;
        } else {
          // typing a country's name
          this.typeToFindInput += e.key;
          clearTimeout(this.typeToFindTimer);
          this.typeToFindTimer = setTimeout(function () {
            _this6.typeToFindInput = '';
          }, 700); // don't include preferred countries so we jump to the right place in the alphabet

          var typedCountryI = this.sortedCountries.slice(this.preferredCountries.length).findIndex(function (c) {
            return c.name.toLowerCase().startsWith(_this6.typeToFindInput);
          });

          if (typedCountryI >= 0) {
            this.selectedIndex = this.preferredCountries.length + typedCountryI;
            var _selEle2 = this.$refs.list.children[this.selectedIndex];
            var needToScrollTop = _selEle2.offsetTop < this.$refs.list.scrollTop;
            var needToScrollBottom = _selEle2.offsetTop + _selEle2.clientHeight > this.$refs.list.scrollTop + this.$refs.list.clientHeight;

            if (needToScrollTop || needToScrollBottom) {
              this.$refs.list.scrollTop = _selEle2.offsetTop - this.$refs.list.clientHeight / 2;
            }
          }
        }
      },
      reset: function reset() {
        this.selectedIndex = this.sortedCountries.map(function (c) {
          return c.iso2;
        }).indexOf(this.activeCountry.iso2);
        this.open = false;
      },
      setDropdownPosition: function setDropdownPosition() {
        var spaceBelow = window.innerHeight - this.$el.getBoundingClientRect().bottom;
        var hasEnoughSpaceBelow = spaceBelow > 200;

        if (hasEnoughSpaceBelow) {
          this.dropdownOpenDirection = 'below';
        } else {
          this.dropdownOpenDirection = 'above';
        }
      }
    }
  };

  function normalizeComponent$1(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier
  /* server only */
  , shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
      createInjectorSSR = createInjector;
      createInjector = shadowMode;
      shadowMode = false;
    } // Vue.extend constructor export interop.


    var options = typeof script === 'function' ? script.options : script; // render functions

    if (template && template.render) {
      options.render = template.render;
      options.staticRenderFns = template.staticRenderFns;
      options._compiled = true; // functional template

      if (isFunctionalTemplate) {
        options.functional = true;
      }
    } // scopedId


    if (scopeId) {
      options._scopeId = scopeId;
    }

    var hook;

    if (moduleIdentifier) {
      // server build
      hook = function hook(context) {
        // 2.3 injection
        context = context || // cached call
        this.$vnode && this.$vnode.ssrContext || // stateful
        this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext; // functional
        // 2.2 with runInNewContext: true

        if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
          context = __VUE_SSR_CONTEXT__;
        } // inject component styles


        if (style) {
          style.call(this, createInjectorSSR(context));
        } // register component module identifier for async chunk inference


        if (context && context._registeredComponents) {
          context._registeredComponents.add(moduleIdentifier);
        }
      }; // used by ssr in case component is cached and beforeCreate
      // never gets called


      options._ssrRegister = hook;
    } else if (style) {
      hook = shadowMode ? function () {
        style.call(this, createInjectorShadow(this.$root.$options.shadowRoot));
      } : function (context) {
        style.call(this, createInjector(context));
      };
    }

    if (hook) {
      if (options.functional) {
        // register for functional component in vue file
        var originalRender = options.render;

        options.render = function renderWithStyleInjection(h, context) {
          hook.call(context);
          return originalRender(h, context);
        };
      } else {
        // inject component registration as beforeCreate hook
        var existing = options.beforeCreate;
        options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
      }
    }

    return script;
  }

  var normalizeComponent_1 = normalizeComponent$1;

  var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
  function createInjector(context) {
    return function (id, style) {
      return addStyle(id, style);
    };
  }
  var HEAD;
  var styles = {};

  function addStyle(id, css) {
    var group = isOldIE ? css.media || 'default' : id;
    var style = styles[group] || (styles[group] = {
      ids: new Set(),
      styles: []
    });

    if (!style.ids.has(id)) {
      style.ids.add(id);
      var code = css.source;

      if (css.map) {
        // https://developer.chrome.com/devtools/docs/javascript-debugging
        // this makes source maps inside style tags work properly in Chrome
        code += '\n/*# sourceURL=' + css.map.sources[0] + ' */'; // http://stackoverflow.com/a/26603875

        code += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) + ' */';
      }

      if (!style.element) {
        style.element = document.createElement('style');
        style.element.type = 'text/css';
        if (css.media) style.element.setAttribute('media', css.media);

        if (HEAD === undefined) {
          HEAD = document.head || document.getElementsByTagName('head')[0];
        }

        HEAD.appendChild(style.element);
      }

      if ('styleSheet' in style.element) {
        style.styles.push(code);
        style.element.styleSheet.cssText = style.styles.filter(Boolean).join('\n');
      } else {
        var index = style.ids.size - 1;
        var textNode = document.createTextNode(code);
        var nodes = style.element.childNodes;
        if (nodes[index]) style.element.removeChild(nodes[index]);
        if (nodes.length) style.element.insertBefore(textNode, nodes[index]);else style.element.appendChild(textNode);
      }
    }
  }

  var browser = createInjector;

  var __vue_script__$4 = script$4;
  /* template */

  var __vue_render__$4 = function __vue_render__() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('div', {
      class: ['vue-tel-input', _vm.wrapperClasses, {
        disabled: _vm.disabled
      }]
    }, [_c('div', {
      directives: [{
        name: "click-outside",
        rawName: "v-click-outside",
        value: _vm.clickedOutside,
        expression: "clickedOutside"
      }],
      class: ['vti__dropdown', {
        open: _vm.open
      }],
      attrs: {
        "tabindex": _vm.dropdownOptions && _vm.dropdownOptions.tabindex ? _vm.dropdownOptions.tabindex : 0
      },
      on: {
        "keydown": [_vm.keyboardNav, function ($event) {
          if (!$event.type.indexOf('key') && _vm._k($event.keyCode, "esc", 27, $event.key, ["Esc", "Escape"])) {
            return null;
          }

          return _vm.reset($event);
        }],
        "click": _vm.toggleDropdown
      }
    }, [_c('span', {
      staticClass: "vti__selection"
    }, [_vm.enabledFlags ? _c('div', {
      class: ['vti__flag', _vm.activeCountry.iso2.toLowerCase()]
    }) : _vm._e(), _vm._v(" "), _vm.enabledCountryCode ? _c('span', {
      staticClass: "vti__country-code"
    }, [_vm._v("\n        +" + _vm._s(_vm.activeCountry.dialCode) + "\n      ")]) : _vm._e(), _vm._v(" "), _vm._t("arrow-icon", [_c('span', {
      staticClass: "vti__dropdown-arrow"
    }, [_vm._v(_vm._s(_vm.open ? "▲" : "▼"))])], {
      "open": _vm.open
    })], 2), _vm._v(" "), _c('ul', {
      directives: [{
        name: "show",
        rawName: "v-show",
        value: _vm.open,
        expression: "open"
      }],
      ref: "list",
      staticClass: "vti__dropdown-list",
      class: _vm.dropdownOpenDirection
    }, _vm._l(_vm.sortedCountries, function (pb, index) {
      return _c('li', {
        key: pb.iso2 + (pb.preferred ? '-preferred' : ''),
        class: ['vti__dropdown-item', _vm.getItemClass(index, pb.iso2)],
        on: {
          "click": function click($event) {
            return _vm.choose(pb, true);
          },
          "mousemove": function mousemove($event) {
            _vm.selectedIndex = index;
          }
        }
      }, [_vm.enabledFlags ? _c('div', {
        class: ['vti__flag', pb.iso2.toLowerCase()]
      }) : _vm._e(), _vm._v(" "), _c('strong', [_vm._v(_vm._s(pb.name))]), _vm._v(" "), _vm.dropdownOptions && !_vm.dropdownOptions.disabledDialCode ? _c('span', [_vm._v("\n          +" + _vm._s(pb.dialCode) + "\n        ")]) : _vm._e()]);
    }), 0)]), _vm._v(" "), _c('input', {
      directives: [{
        name: "model",
        rawName: "v-model",
        value: _vm.phone,
        expression: "phone"
      }],
      ref: "input",
      class: ['vti__input', _vm.inputClasses],
      attrs: {
        "type": "tel",
        "autocomplete": _vm.autocomplete,
        "autofocus": _vm.autofocus,
        "disabled": _vm.disabled,
        "id": _vm.inputId,
        "maxlength": _vm.maxLen,
        "name": _vm.name,
        "placeholder": _vm.parsedPlaceholder,
        "readonly": _vm.readonly,
        "required": _vm.required,
        "tabindex": _vm.inputOptions && _vm.inputOptions.tabindex ? _vm.inputOptions.tabindex : 0
      },
      domProps: {
        "value": _vm.phone
      },
      on: {
        "blur": _vm.onBlur,
        "focus": _vm.onFocus,
        "input": [function ($event) {
          if ($event.target.composing) {
            return;
          }

          _vm.phone = $event.target.value;
        }, _vm.onInput],
        "keyup": [function ($event) {
          if (!$event.type.indexOf('key') && _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")) {
            return null;
          }

          return _vm.onEnter($event);
        }, function ($event) {
          if (!$event.type.indexOf('key') && _vm._k($event.keyCode, "space", 32, $event.key, [" ", "Spacebar"])) {
            return null;
          }

          return _vm.onSpace($event);
        }]
      }
    })]);
  };

  var __vue_staticRenderFns__$4 = [];
  /* style */

  var __vue_inject_styles__$4 = function __vue_inject_styles__(inject) {
    if (!inject) return;
    inject("data-v-05f33b94_0", {
      source: ".vti__flag{width:20px}.vti__flag.be{width:18px}.vti__flag.ch{width:15px}.vti__flag.mc{width:19px}.vti__flag.ne{width:18px}.vti__flag.np{width:13px}.vti__flag.va{width:15px}@media only screen and (-webkit-min-device-pixel-ratio:2),only screen and (min--moz-device-pixel-ratio:2),only screen and (-o-min-device-pixel-ratio:2),only screen and (min-device-pixel-ratio:2),only screen and (min-resolution:192dpi),only screen and (min-resolution:2dppx){.vti__flag{background-size:5630px 15px}}.vti__flag.ac{height:10px;background-position:0 0}.vti__flag.ad{height:14px;background-position:-22px 0}.vti__flag.ae{height:10px;background-position:-44px 0}.vti__flag.af{height:14px;background-position:-66px 0}.vti__flag.ag{height:14px;background-position:-88px 0}.vti__flag.ai{height:10px;background-position:-110px 0}.vti__flag.al{height:15px;background-position:-132px 0}.vti__flag.am{height:10px;background-position:-154px 0}.vti__flag.ao{height:14px;background-position:-176px 0}.vti__flag.aq{height:14px;background-position:-198px 0}.vti__flag.ar{height:13px;background-position:-220px 0}.vti__flag.as{height:10px;background-position:-242px 0}.vti__flag.at{height:14px;background-position:-264px 0}.vti__flag.au{height:10px;background-position:-286px 0}.vti__flag.aw{height:14px;background-position:-308px 0}.vti__flag.ax{height:13px;background-position:-330px 0}.vti__flag.az{height:10px;background-position:-352px 0}.vti__flag.ba{height:10px;background-position:-374px 0}.vti__flag.bb{height:14px;background-position:-396px 0}.vti__flag.bd{height:12px;background-position:-418px 0}.vti__flag.be{height:15px;background-position:-440px 0}.vti__flag.bf{height:14px;background-position:-460px 0}.vti__flag.bg{height:12px;background-position:-482px 0}.vti__flag.bh{height:12px;background-position:-504px 0}.vti__flag.bi{height:12px;background-position:-526px 0}.vti__flag.bj{height:14px;background-position:-548px 0}.vti__flag.bl{height:14px;background-position:-570px 0}.vti__flag.bm{height:10px;background-position:-592px 0}.vti__flag.bn{height:10px;background-position:-614px 0}.vti__flag.bo{height:14px;background-position:-636px 0}.vti__flag.bq{height:14px;background-position:-658px 0}.vti__flag.br{height:14px;background-position:-680px 0}.vti__flag.bs{height:10px;background-position:-702px 0}.vti__flag.bt{height:14px;background-position:-724px 0}.vti__flag.bv{height:15px;background-position:-746px 0}.vti__flag.bw{height:14px;background-position:-768px 0}.vti__flag.by{height:10px;background-position:-790px 0}.vti__flag.bz{height:14px;background-position:-812px 0}.vti__flag.ca{height:10px;background-position:-834px 0}.vti__flag.cc{height:10px;background-position:-856px 0}.vti__flag.cd{height:15px;background-position:-878px 0}.vti__flag.cf{height:14px;background-position:-900px 0}.vti__flag.cg{height:14px;background-position:-922px 0}.vti__flag.ch{height:15px;background-position:-944px 0}.vti__flag.ci{height:14px;background-position:-961px 0}.vti__flag.ck{height:10px;background-position:-983px 0}.vti__flag.cl{height:14px;background-position:-1005px 0}.vti__flag.cm{height:14px;background-position:-1027px 0}.vti__flag.cn{height:14px;background-position:-1049px 0}.vti__flag.co{height:14px;background-position:-1071px 0}.vti__flag.cp{height:14px;background-position:-1093px 0}.vti__flag.cr{height:12px;background-position:-1115px 0}.vti__flag.cu{height:10px;background-position:-1137px 0}.vti__flag.cv{height:12px;background-position:-1159px 0}.vti__flag.cw{height:14px;background-position:-1181px 0}.vti__flag.cx{height:10px;background-position:-1203px 0}.vti__flag.cy{height:14px;background-position:-1225px 0}.vti__flag.cz{height:14px;background-position:-1247px 0}.vti__flag.de{height:12px;background-position:-1269px 0}.vti__flag.dg{height:10px;background-position:-1291px 0}.vti__flag.dj{height:14px;background-position:-1313px 0}.vti__flag.dk{height:15px;background-position:-1335px 0}.vti__flag.dm{height:10px;background-position:-1357px 0}.vti__flag.do{height:13px;background-position:-1379px 0}.vti__flag.dz{height:14px;background-position:-1401px 0}.vti__flag.ea{height:14px;background-position:-1423px 0}.vti__flag.ec{height:14px;background-position:-1445px 0}.vti__flag.ee{height:13px;background-position:-1467px 0}.vti__flag.eg{height:14px;background-position:-1489px 0}.vti__flag.eh{height:10px;background-position:-1511px 0}.vti__flag.er{height:10px;background-position:-1533px 0}.vti__flag.es{height:14px;background-position:-1555px 0}.vti__flag.et{height:10px;background-position:-1577px 0}.vti__flag.eu{height:14px;background-position:-1599px 0}.vti__flag.fi{height:12px;background-position:-1621px 0}.vti__flag.fj{height:10px;background-position:-1643px 0}.vti__flag.fk{height:10px;background-position:-1665px 0}.vti__flag.fm{height:11px;background-position:-1687px 0}.vti__flag.fo{height:15px;background-position:-1709px 0}.vti__flag.fr{height:14px;background-position:-1731px 0}.vti__flag.ga{height:15px;background-position:-1753px 0}.vti__flag.gb{height:10px;background-position:-1775px 0}.vti__flag.gd{height:12px;background-position:-1797px 0}.vti__flag.ge{height:14px;background-position:-1819px 0}.vti__flag.gf{height:14px;background-position:-1841px 0}.vti__flag.gg{height:14px;background-position:-1863px 0}.vti__flag.gh{height:14px;background-position:-1885px 0}.vti__flag.gi{height:10px;background-position:-1907px 0}.vti__flag.gl{height:14px;background-position:-1929px 0}.vti__flag.gm{height:14px;background-position:-1951px 0}.vti__flag.gn{height:14px;background-position:-1973px 0}.vti__flag.gp{height:14px;background-position:-1995px 0}.vti__flag.gq{height:14px;background-position:-2017px 0}.vti__flag.gr{height:14px;background-position:-2039px 0}.vti__flag.gs{height:10px;background-position:-2061px 0}.vti__flag.gt{height:13px;background-position:-2083px 0}.vti__flag.gu{height:11px;background-position:-2105px 0}.vti__flag.gw{height:10px;background-position:-2127px 0}.vti__flag.gy{height:12px;background-position:-2149px 0}.vti__flag.hk{height:14px;background-position:-2171px 0}.vti__flag.hm{height:10px;background-position:-2193px 0}.vti__flag.hn{height:10px;background-position:-2215px 0}.vti__flag.hr{height:10px;background-position:-2237px 0}.vti__flag.ht{height:12px;background-position:-2259px 0}.vti__flag.hu{height:10px;background-position:-2281px 0}.vti__flag.ic{height:14px;background-position:-2303px 0}.vti__flag.id{height:14px;background-position:-2325px 0}.vti__flag.ie{height:10px;background-position:-2347px 0}.vti__flag.il{height:15px;background-position:-2369px 0}.vti__flag.im{height:10px;background-position:-2391px 0}.vti__flag.in{height:14px;background-position:-2413px 0}.vti__flag.io{height:10px;background-position:-2435px 0}.vti__flag.iq{height:14px;background-position:-2457px 0}.vti__flag.ir{height:12px;background-position:-2479px 0}.vti__flag.is{height:15px;background-position:-2501px 0}.vti__flag.it{height:14px;background-position:-2523px 0}.vti__flag.je{height:12px;background-position:-2545px 0}.vti__flag.jm{height:10px;background-position:-2567px 0}.vti__flag.jo{height:10px;background-position:-2589px 0}.vti__flag.jp{height:14px;background-position:-2611px 0}.vti__flag.ke{height:14px;background-position:-2633px 0}.vti__flag.kg{height:12px;background-position:-2655px 0}.vti__flag.kh{height:13px;background-position:-2677px 0}.vti__flag.ki{height:10px;background-position:-2699px 0}.vti__flag.km{height:12px;background-position:-2721px 0}.vti__flag.kn{height:14px;background-position:-2743px 0}.vti__flag.kp{height:10px;background-position:-2765px 0}.vti__flag.kr{height:14px;background-position:-2787px 0}.vti__flag.kw{height:10px;background-position:-2809px 0}.vti__flag.ky{height:10px;background-position:-2831px 0}.vti__flag.kz{height:10px;background-position:-2853px 0}.vti__flag.la{height:14px;background-position:-2875px 0}.vti__flag.lb{height:14px;background-position:-2897px 0}.vti__flag.lc{height:10px;background-position:-2919px 0}.vti__flag.li{height:12px;background-position:-2941px 0}.vti__flag.lk{height:10px;background-position:-2963px 0}.vti__flag.lr{height:11px;background-position:-2985px 0}.vti__flag.ls{height:14px;background-position:-3007px 0}.vti__flag.lt{height:12px;background-position:-3029px 0}.vti__flag.lu{height:12px;background-position:-3051px 0}.vti__flag.lv{height:10px;background-position:-3073px 0}.vti__flag.ly{height:10px;background-position:-3095px 0}.vti__flag.ma{height:14px;background-position:-3117px 0}.vti__flag.mc{height:15px;background-position:-3139px 0}.vti__flag.md{height:10px;background-position:-3160px 0}.vti__flag.me{height:10px;background-position:-3182px 0}.vti__flag.mf{height:14px;background-position:-3204px 0}.vti__flag.mg{height:14px;background-position:-3226px 0}.vti__flag.mh{height:11px;background-position:-3248px 0}.vti__flag.mk{height:10px;background-position:-3270px 0}.vti__flag.ml{height:14px;background-position:-3292px 0}.vti__flag.mm{height:14px;background-position:-3314px 0}.vti__flag.mn{height:10px;background-position:-3336px 0}.vti__flag.mo{height:14px;background-position:-3358px 0}.vti__flag.mp{height:10px;background-position:-3380px 0}.vti__flag.mq{height:14px;background-position:-3402px 0}.vti__flag.mr{height:14px;background-position:-3424px 0}.vti__flag.ms{height:10px;background-position:-3446px 0}.vti__flag.mt{height:14px;background-position:-3468px 0}.vti__flag.mu{height:14px;background-position:-3490px 0}.vti__flag.mv{height:14px;background-position:-3512px 0}.vti__flag.mw{height:14px;background-position:-3534px 0}.vti__flag.mx{height:12px;background-position:-3556px 0}.vti__flag.my{height:10px;background-position:-3578px 0}.vti__flag.mz{height:14px;background-position:-3600px 0}.vti__flag.na{height:14px;background-position:-3622px 0}.vti__flag.nc{height:10px;background-position:-3644px 0}.vti__flag.ne{height:15px;background-position:-3666px 0}.vti__flag.nf{height:10px;background-position:-3686px 0}.vti__flag.ng{height:10px;background-position:-3708px 0}.vti__flag.ni{height:12px;background-position:-3730px 0}.vti__flag.nl{height:14px;background-position:-3752px 0}.vti__flag.no{height:15px;background-position:-3774px 0}.vti__flag.np{height:15px;background-position:-3796px 0}.vti__flag.nr{height:10px;background-position:-3811px 0}.vti__flag.nu{height:10px;background-position:-3833px 0}.vti__flag.nz{height:10px;background-position:-3855px 0}.vti__flag.om{height:10px;background-position:-3877px 0}.vti__flag.pa{height:14px;background-position:-3899px 0}.vti__flag.pe{height:14px;background-position:-3921px 0}.vti__flag.pf{height:14px;background-position:-3943px 0}.vti__flag.pg{height:15px;background-position:-3965px 0}.vti__flag.ph{height:10px;background-position:-3987px 0}.vti__flag.pk{height:14px;background-position:-4009px 0}.vti__flag.pl{height:13px;background-position:-4031px 0}.vti__flag.pm{height:14px;background-position:-4053px 0}.vti__flag.pn{height:10px;background-position:-4075px 0}.vti__flag.pr{height:14px;background-position:-4097px 0}.vti__flag.ps{height:10px;background-position:-4119px 0}.vti__flag.pt{height:14px;background-position:-4141px 0}.vti__flag.pw{height:13px;background-position:-4163px 0}.vti__flag.py{height:11px;background-position:-4185px 0}.vti__flag.qa{height:8px;background-position:-4207px 0}.vti__flag.re{height:14px;background-position:-4229px 0}.vti__flag.ro{height:14px;background-position:-4251px 0}.vti__flag.rs{height:14px;background-position:-4273px 0}.vti__flag.ru{height:14px;background-position:-4295px 0}.vti__flag.rw{height:14px;background-position:-4317px 0}.vti__flag.sa{height:14px;background-position:-4339px 0}.vti__flag.sb{height:10px;background-position:-4361px 0}.vti__flag.sc{height:10px;background-position:-4383px 0}.vti__flag.sd{height:10px;background-position:-4405px 0}.vti__flag.se{height:13px;background-position:-4427px 0}.vti__flag.sg{height:14px;background-position:-4449px 0}.vti__flag.sh{height:10px;background-position:-4471px 0}.vti__flag.si{height:10px;background-position:-4493px 0}.vti__flag.sj{height:15px;background-position:-4515px 0}.vti__flag.sk{height:14px;background-position:-4537px 0}.vti__flag.sl{height:14px;background-position:-4559px 0}.vti__flag.sm{height:15px;background-position:-4581px 0}.vti__flag.sn{height:14px;background-position:-4603px 0}.vti__flag.so{height:14px;background-position:-4625px 0}.vti__flag.sr{height:14px;background-position:-4647px 0}.vti__flag.ss{height:10px;background-position:-4669px 0}.vti__flag.st{height:10px;background-position:-4691px 0}.vti__flag.sv{height:12px;background-position:-4713px 0}.vti__flag.sx{height:14px;background-position:-4735px 0}.vti__flag.sy{height:14px;background-position:-4757px 0}.vti__flag.sz{height:14px;background-position:-4779px 0}.vti__flag.ta{height:10px;background-position:-4801px 0}.vti__flag.tc{height:10px;background-position:-4823px 0}.vti__flag.td{height:14px;background-position:-4845px 0}.vti__flag.tf{height:14px;background-position:-4867px 0}.vti__flag.tg{height:13px;background-position:-4889px 0}.vti__flag.th{height:14px;background-position:-4911px 0}.vti__flag.tj{height:10px;background-position:-4933px 0}.vti__flag.tk{height:10px;background-position:-4955px 0}.vti__flag.tl{height:10px;background-position:-4977px 0}.vti__flag.tm{height:14px;background-position:-4999px 0}.vti__flag.tn{height:14px;background-position:-5021px 0}.vti__flag.to{height:10px;background-position:-5043px 0}.vti__flag.tr{height:14px;background-position:-5065px 0}.vti__flag.tt{height:12px;background-position:-5087px 0}.vti__flag.tv{height:10px;background-position:-5109px 0}.vti__flag.tw{height:14px;background-position:-5131px 0}.vti__flag.tz{height:14px;background-position:-5153px 0}.vti__flag.ua{height:14px;background-position:-5175px 0}.vti__flag.ug{height:14px;background-position:-5197px 0}.vti__flag.um{height:11px;background-position:-5219px 0}.vti__flag.us{height:11px;background-position:-5241px 0}.vti__flag.uy{height:14px;background-position:-5263px 0}.vti__flag.uz{height:10px;background-position:-5285px 0}.vti__flag.va{height:15px;background-position:-5307px 0}.vti__flag.vc{height:14px;background-position:-5324px 0}.vti__flag.ve{height:14px;background-position:-5346px 0}.vti__flag.vg{height:10px;background-position:-5368px 0}.vti__flag.vi{height:14px;background-position:-5390px 0}.vti__flag.vn{height:14px;background-position:-5412px 0}.vti__flag.vu{height:12px;background-position:-5434px 0}.vti__flag.wf{height:14px;background-position:-5456px 0}.vti__flag.ws{height:10px;background-position:-5478px 0}.vti__flag.xk{height:15px;background-position:-5500px 0}.vti__flag.ye{height:14px;background-position:-5522px 0}.vti__flag.yt{height:14px;background-position:-5544px 0}.vti__flag.za{height:14px;background-position:-5566px 0}.vti__flag.zm{height:14px;background-position:-5588px 0}.vti__flag.zw{height:10px;background-position:-5610px 0}.vti__flag{width:20px;height:15px;box-shadow:0 0 1px 0 #888;background-image:url(data:image/png;base64,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);background-repeat:no-repeat;background-color:#dbdbdb;background-position:20px 0}@media only screen and (-webkit-min-device-pixel-ratio:2),only screen and (min--moz-device-pixel-ratio:2),only screen and (-o-min-device-pixel-ratio:2),only screen and (min-device-pixel-ratio:2),only screen and (min-resolution:192dpi),only screen and (min-resolution:2dppx){.vti__flag{background-image:url(data:image/png;base64,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)}}.vti__flag.np{background-color:transparent}",
      map: undefined,
      media: undefined
    }), inject("data-v-05f33b94_1", {
      source: ".vue-tel-input{border-radius:3px;display:flex;border:1px solid #bbb;text-align:left}.vue-tel-input.disabled .dropdown,.vue-tel-input.disabled .selection,.vue-tel-input.disabled input{cursor:no-drop}.vue-tel-input:focus-within{box-shadow:inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(102,175,233,.6);border-color:#66afe9}.vti__dropdown{display:flex;flex-direction:column;align-content:center;justify-content:center;position:relative;padding:7px;cursor:pointer}.vti__dropdown.show{max-height:300px;overflow:scroll}.vti__dropdown.open{background-color:#f3f3f3}.vti__dropdown:hover{background-color:#f3f3f3}.vti__selection{font-size:.8em;display:flex;align-items:center}.vti__selection .vti__country-code{color:#666}.vti__flag{margin-right:5px;margin-left:5px}.vti__dropdown-list{z-index:1;padding:0;margin:0;text-align:left;list-style:none;max-height:200px;overflow-y:scroll;position:absolute;left:-1px;background-color:#fff;border:1px solid #ccc;width:390px}.vti__dropdown-list.below{top:33px}.vti__dropdown-list.above{top:auto;bottom:100%}.vti__dropdown-arrow{transform:scaleY(.5);display:inline-block;color:#666}.vti__dropdown-item{cursor:pointer;padding:4px 15px}.vti__dropdown-item.highlighted{background-color:#f3f3f3}.vti__dropdown-item.last-preferred{border-bottom:1px solid #cacaca}.vti__dropdown-item .vti__flag{display:inline-block;margin-right:5px}.vti__input{border:none;border-radius:0 2px 2px 0;width:100%;outline:0;padding-left:7px}",
      map: undefined,
      media: undefined
    });
  };
  /* scoped */


  var __vue_scope_id__$4 = undefined;
  /* module identifier */

  var __vue_module_identifier__$4 = undefined;
  /* functional template */

  var __vue_is_functional_template__$4 = false;
  /* style inject SSR */

  var VueTelInput = normalizeComponent_1({
    render: __vue_render__$4,
    staticRenderFns: __vue_staticRenderFns__$4
  }, __vue_inject_styles__$4, __vue_script__$4, __vue_scope_id__$4, __vue_is_functional_template__$4, __vue_module_identifier__$4, browser, undefined);

  function install(Vue) {
    var customOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    if (install.installed) return;
    install.installed = true;
    utils.options = _objectSpread2({}, defaultOptions, {}, customOptions);
    Vue.component('vue-tel-input', VueTelInput);
  }
  var plugin = {
    install: install
  }; // Auto-install

  var GlobalVue = null;

  if (typeof window !== 'undefined') {
    GlobalVue = window.Vue;
  } else if (typeof global !== 'undefined') {
    GlobalVue = global.Vue;
  }

  if (GlobalVue) {
    GlobalVue.use(plugin);
  }

  //
  var script$5 = {
    name: 'Phonefield',
    props: {
      value: {},
      label: {
        type: String
      },
      required: {
        type: [String, Boolean]
      },
      placeholder: {
        type: String
      },
      customClass: {
        type: String
      },
      disabled: {
        type: Boolean
      },
      displayMode: {
        type: String
      },
      hideLabel: {
        type: Boolean
      },
      showFlags: {
        type: Boolean,
        default: true
      },
      property: {
        type: Object
      },
      attrs: {
        type: Object
      }
    },
    components: {
      VueTelInput: VueTelInput
    },
    data: function data() {
      return {
        clonedValue: {
          value: this.value || (this.property ? this.property.value : undefined)
        }
      };
    },
    methods: {
      handler: function handler(val, obj) {
        this.validate(val, obj);
        this.$emit('updateValue', this.clonedValue);
      },
      validate: function validate(val, obj) {
        if (this.property) {
          if (this.property.required && !this.clonedValue.value) {
            this.clonedValue.$invalid = true;
            this.clonedValue.$error = 'required';
          } else if (!this.property.required && !this.clonedValue.value) {
            this.clonedValue.$invalid = false;
            this.clonedValue.$error = null;
          } else if (obj && !obj.isValid) {
            this.clonedValue.$invalid = true;
            this.clonedValue.$error = 'phone';
          } else {
            this.clonedValue.$invalid = false;
            this.clonedValue.$error = null;
          }
        }
      }
    },
    created: function created() {
      this.handler();
    }
  };

  var __vue_script__$5 = script$5;
  /* template */

  var __vue_render__$5 = function __vue_render__() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('div', {
      staticClass: "form-group"
    }, [_vm.label || _vm.property.name ? _c('label', {
      directives: [{
        name: "show",
        rawName: "v-show",
        value: !_vm.hideLabel,
        expression: "!hideLabel"
      }],
      staticClass: "control-label",
      attrs: {
        "for": _vm.$attrs.id || _vm.label || _vm.property.name
      },
      domProps: {
        "textContent": _vm._s(_vm.label || _vm.property.name)
      }
    }) : _vm._e(), _vm._v(" "), _vm.displayMode === 'EDIT' || _vm.displayMode === 'CREATE' ? _c('div', {
      staticClass: "form-element"
    }, [_c('vue-tel-input', {
      staticClass: "form-control",
      class: _vm.customClass,
      attrs: {
        "enabled-flags": _vm.showFlags,
        "dynamic-placeholder": true,
        "default-country": "GB",
        "disabled-fetching-country": true,
        "country-changed": _vm.handler
      },
      on: {
        "input": _vm.handler
      },
      model: {
        value: _vm.clonedValue.value,
        callback: function callback($$v) {
          _vm.$set(_vm.clonedValue, "value", $$v);
        },
        expression: "clonedValue.value"
      }
    })], 1) : _vm.displayMode === 'VIEW' ? _c('p', {
      staticClass: "form-control-static"
    }, [_vm._v(_vm._s(_vm.clonedValue.value ? _vm.clonedValue.value : '-'))]) : _vm._e()]);
  };

  var __vue_staticRenderFns__$5 = [];
  /* style */

  var __vue_inject_styles__$5 = undefined;
  /* scoped */

  var __vue_scope_id__$5 = undefined;
  /* module identifier */

  var __vue_module_identifier__$5 = undefined;
  /* functional template */

  var __vue_is_functional_template__$5 = false;
  /* style inject */

  /* style inject SSR */

  /* style inject shadow dom */

  var __vue_component__$4 = normalizeComponent({
    render: __vue_render__$5,
    staticRenderFns: __vue_staticRenderFns__$5
  }, __vue_inject_styles__$5, __vue_script__$5, __vue_scope_id__$5, __vue_is_functional_template__$5, __vue_module_identifier__$5, false, undefined, undefined, undefined);

  var t=function(t,o,e){if(!o.hasOwnProperty(e)){var r=Object.getOwnPropertyDescriptor(t,e);Object.defineProperty(o,e,r);}};var VRuntimeTemplate = {props:{template:String,parent:Object,templateProps:{type:Object,default:function(){return {}}}},render:function(o){if(this.template){var e=this.parent||this.$parent,r=e.$data;void 0===r&&(r={});var n=e.$props;void 0===n&&(n={});var a=e.$options;void 0===a&&(a={});var p=a.components;void 0===p&&(p={});var c=a.computed;void 0===c&&(c={});var i=a.methods;void 0===i&&(i={});var s=this.$data;void 0===s&&(s={});var d=this.$props;void 0===d&&(d={});var v=this.$options;void 0===v&&(v={});var f=v.methods;void 0===f&&(f={});var m=v.computed;void 0===m&&(m={});var u=v.components;void 0===u&&(u={});var h={$data:{},$props:{},$options:{},components:{},computed:{},methods:{}};Object.keys(r).forEach(function(t){void 0===s[t]&&(h.$data[t]=r[t]);}),Object.keys(n).forEach(function(t){void 0===d[t]&&(h.$props[t]=n[t]);}),Object.keys(i).forEach(function(t){void 0===f[t]&&(h.methods[t]=i[t]);}),Object.keys(c).forEach(function(t){void 0===m[t]&&(h.computed[t]=c[t]);}),Object.keys(p).forEach(function(t){void 0===u[t]&&(h.components[t]=p[t]);});var O=Object.keys(h.methods||{}),$=Object.keys(h.$data||{}),b=Object.keys(h.$props||{}),j=Object.keys(this.templateProps),y=$.concat(b).concat(O).concat(j),k=(E=e,P={},O.forEach(function(o){return t(E,P,o)}),P),l=function(o){var e={};return o.forEach(function(o){o&&Object.getOwnPropertyNames(o).forEach(function(r){return t(o,e,r)});}),e}([h.$data,h.$props,k,this.templateProps]);return o({template:this.template||"<div></div>",props:y,computed:h.computed,components:h.components,provide:this.$parent._provided},{props:l})}var E,P;}};

  var script$6 = {
    name: 'SelectField',
    props: {
      value: {
        type: [String, Array, Object]
      },
      label: {
        type: String
      },
      required: {
        type: [String, Boolean]
      },
      placeholder: {
        type: String
      },
      customClass: {
        type: String
      },
      disabled: {
        type: Boolean
      },
      displayMode: {
        type: String
      },
      hideLabel: {
        type: Boolean
      },
      filter: {
        type: String
      },
      filterArgs: {
        type: Array,
        default: function _default() {
          return [];
        }
      },
      displayField: {
        type: String
      },
      valueField: {
        type: String
      },
      fullObject: {
        type: Boolean
      },
      searchable: {
        type: [Boolean, String]
      },
      multiple: {
        type: [Boolean, String]
      },
      allowClear: {
        type: Boolean
      },
      showAvatar: {
        type: Boolean
      },
      avatarProp: {
        type: String
      },
      optionTemplate: {
        type: String
      },
      selectFrom: {
        type: [Object, Array]
      },
      property: {
        type: Object
      },
      attrs: {
        type: Object
      }
    },
    components: {
      Multiselect: Multiselect,
      VRuntimeTemplate: VRuntimeTemplate
    },
    data: function data() {
      return {
        clonedValue: {},
        selected: []
      };
    },
    methods: {
      clearSelected: function clearSelected() {
        this.selected = undefined;
        this.handler();
      },
      handler: function handler() {
        var clonedValue = _objectSpread2({}, this.clonedValue);

        if (this.fullObject) {
          clonedValue.value = this.selected;
        } else {
          clonedValue.value = _typeof(this.selected) === 'object' ? this.selected[this.valueField || '_id'] : this.selected;
        }

        this.clonedValue = clonedValue;
        this.validate();
        this.$emit('updateValue', this.clonedValue);
      },
      validate: function validate() {
        if (this.property) {
          if ((this.required || this.property.required) && !this.clonedValue.value) {
            this.clonedValue.$invalid = true;
            this.clonedValue.$error = 'required';
          } else {
            this.clonedValue.$invalid = false;
            this.clonedValue.$error = null;
          }
        }
      }
    },
    computed: {
      items: function items() {
        return this.selectFrom || (this.property ? this.property.enum : []);
      },
      displayFromObject: function displayFromObject() {
        var _this = this;

        var result;

        if (this.selectFrom.length) {
          result = this.selectFrom.find(function (item) {
            return item[_this.valueField || '_id'] === _this.clonedValue.value;
          });
          return result ? result[this.displayField || 'Name'] : undefined;
        }

        return '';
      }
    },
    watch: {
      selectFrom: {
        handler: function handler(newVal) {
          var _this2 = this;

          if (newVal.length > 0 && _typeof(newVal[0]) === 'object') {
            this.selected = newVal.find(function (item) {
              return item[_this2.valueField || '_id'] === (_typeof(_this2.selected) === 'object' ? _this2.selected[_this2.valueField || '_id'] : _this2.selected);
            });
          } else if (newVal.length === 0) {
            this.selected = undefined;
          }
        },
        deep: true
      }
    },
    created: function created() {
      var _this3 = this;

      if (this.selectFrom && this.selectFrom.length && _typeof(this.selectFrom[0]) === 'object') {
        // check if any external objects exist in the list  via select from
        if (this.value) {
          this.selected = this.selectFrom.find(function (item) {
            return item[_this3.valueField || '_id'] === _this3.value;
          });
        } else if (this.property && this.property.value) {
          this.selected = this.selectFrom.find(function (item) {
            return item[_this3.valueField || '_id'] === _this3.property.value;
          });
        } else {
          this.selected = undefined;
        }
      } else {
        // else treat the value as string
        if (this.value) {
          this.selected = this.value;
        } else if (this.property && this.property.value) {
          this.selected = this.property.value;
        } else {
          this.selected = undefined;
        }
      }

      this.handler();
    }
  };

  const isOldIE$1 = typeof navigator !== 'undefined' &&
      /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
  function createInjector$1(context) {
      return (id, style) => addStyle$1(id, style);
  }
  let HEAD$1;
  const styles$1 = {};
  function addStyle$1(id, css) {
      const group = isOldIE$1 ? css.media || 'default' : id;
      const style = styles$1[group] || (styles$1[group] = { ids: new Set(), styles: [] });
      if (!style.ids.has(id)) {
          style.ids.add(id);
          let code = css.source;
          if (css.map) {
              // https://developer.chrome.com/devtools/docs/javascript-debugging
              // this makes source maps inside style tags work properly in Chrome
              code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
              // http://stackoverflow.com/a/26603875
              code +=
                  '\n/*# sourceMappingURL=data:application/json;base64,' +
                      btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
                      ' */';
          }
          if (!style.element) {
              style.element = document.createElement('style');
              style.element.type = 'text/css';
              if (css.media)
                  style.element.setAttribute('media', css.media);
              if (HEAD$1 === undefined) {
                  HEAD$1 = document.head || document.getElementsByTagName('head')[0];
              }
              HEAD$1.appendChild(style.element);
          }
          if ('styleSheet' in style.element) {
              style.styles.push(code);
              style.element.styleSheet.cssText = style.styles
                  .filter(Boolean)
                  .join('\n');
          }
          else {
              const index = style.ids.size - 1;
              const textNode = document.createTextNode(code);
              const nodes = style.element.childNodes;
              if (nodes[index])
                  style.element.removeChild(nodes[index]);
              if (nodes.length)
                  style.element.insertBefore(textNode, nodes[index]);
              else
                  style.element.appendChild(textNode);
          }
      }
  }

  var __vue_script__$6 = script$6;
  /* template */

  var __vue_render__$6 = function __vue_render__() {
    var ref, ref$1;

    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('div', [_c('label', {
      directives: [{
        name: "show",
        rawName: "v-show",
        value: !_vm.hideLabel,
        expression: "!hideLabel"
      }],
      staticClass: "control-label",
      attrs: {
        "for": _vm.attrs.id || _vm.label || _vm.property.name
      },
      domProps: {
        "textContent": _vm._s(_vm.label || _vm.property.name)
      }
    }), _vm._v(" "), _vm.displayMode === 'EDIT' || _vm.displayMode === 'CREATE' ? _c('div', {
      staticClass: "form-element"
    }, [_typeof(_vm.items[0]) === 'object' ? _c('div', {
      staticClass: "single"
    }, [_vm.allowClear && _vm.displayMode !== 'VIEW' && _vm.clonedValue.value ? _c('span', {
      staticClass: "allowclear",
      on: {
        "click": _vm.clearSelected
      }
    }, [_c('i', {
      staticClass: "material-icons"
    }, [_vm._v("close")])]) : _vm._e(), _vm._v(" "), _c('multiselect', {
      attrs: {
        "options": _vm.items,
        "open-direction": "bottom",
        "track-by": _vm.valueField || '_id',
        "label": _vm.displayField || 'Name',
        "searchable": !!_vm.searchable,
        "close-on-select": true,
        "select-label": "",
        "deselect-label": "",
        "hide-selected": true,
        "disabled": _vm.disabled,
        "placeholder": _vm.placeholder,
        "allow-empty": _vm.allowClear
      },
      on: {
        "close": _vm.handler
      },
      scopedSlots: _vm._u([{
        key: "option",
        fn: function fn(props) {
          return [_vm.optionTemplate && _vm.optionTemplate.length > 0 && props && props.option ? _c('div', [_c('v-runtime-template', {
            attrs: {
              "template": _vm.optionTemplate,
              "template-props": {
                props: props
              }
            }
          })], 1) : _c('div', {
            staticClass: "d-flex align-items-center"
          }, [_vm.showAvatar ? _c('img', {
            staticClass: "profile",
            attrs: {
              "src": props.option[_vm.avatarProp],
              "alt": props.option.Name,
              "loading": "lazy"
            }
          }) : _vm._e(), _vm._v(" "), _c('div', {
            staticClass: "description"
          }, [_c('div', {
            staticClass: "title"
          }, [_vm._v("\n                                " + _vm._s(props.option.Name) + "\n                            ")]), _vm._v(" "), props.option.Description ? _c('small', {
            staticClass: "text-muted"
          }, [_vm._v("\n                                " + _vm._s(props.option.Description) + "\n                            ")]) : _vm._e()])])];
        }
      }], null, false, 3254205381),
      model: {
        value: _vm.selected,
        callback: function callback($$v) {
          _vm.selected = $$v;
        },
        expression: "selected"
      }
    })], 1) : _c('div', {
      staticClass: "single"
    }, [_vm.allowClear && _vm.displayMode !== 'VIEW' && _vm.clonedValue.value ? _c('span', {
      staticClass: "allowclear",
      on: {
        "click": _vm.clearSelected
      }
    }, [_c('i', {
      staticClass: "material-icons"
    }, [_vm._v("close")])]) : _vm._e(), _vm._v(" "), _c('multiselect', {
      attrs: {
        "options": _vm.items,
        "open-direction": "bottom",
        "searchable": !!_vm.searchable,
        "close-on-select": true,
        "select-label": "",
        "deselect-label": "",
        "disabled": _vm.disabled,
        "hide-selected": true,
        "placeholder": _vm.placeholder
      },
      on: {
        "close": _vm.handler
      },
      model: {
        value: _vm.selected,
        callback: function callback($$v) {
          _vm.selected = $$v;
        },
        expression: "selected"
      }
    })], 1)]) : _vm.items && _vm.displayMode === 'VIEW' && typeof _vm.items[0] === 'string' && (_vm.property.filter || _vm.filter) ? _c('p', {
      staticClass: "form-control-static"
    }, [_vm._v("\n        " + _vm._s((ref = _vm.$options.filters)[_vm.filter || _vm.property.filter].apply(ref, [_vm.clonedValue.value].concat(_vm.filterArgs || _vm.property.filterArgs)) || '-') + "\n    ")]) : _vm.items && _vm.displayMode === 'VIEW' && _typeof(_vm.items[0]) === 'object' && (_vm.property.filter || _vm.filter) ? _c('p', {
      staticClass: "form-control-static"
    }, [_vm._v("\n        " + _vm._s((ref$1 = _vm.$options.filters)[_vm.filter || _vm.property.filter].apply(ref$1, [_vm.displayFromObject].concat(_vm.filterArgs || _vm.property.filterArgs)) || '-') + "\n    ")]) : _vm.items && _vm.displayMode === 'VIEW' && _typeof(_vm.items[0]) === 'object' ? _c('p', {
      staticClass: "form-control-static"
    }, [_vm._v("\n        " + _vm._s(_vm.displayFromObject || '-') + "\n    ")]) : _vm.items && _vm.displayMode === 'VIEW' && typeof _vm.items[0] === 'string' ? _c('p', {
      staticClass: "form-control-static"
    }, [_vm._v("\n        " + _vm._s(_vm.clonedValue.value || '-') + "\n    ")]) : _vm._e()]);
  };

  var __vue_staticRenderFns__$6 = [];
  /* style */

  var __vue_inject_styles__$6 = function __vue_inject_styles__(inject) {
    if (!inject) return;
    inject("data-v-973706a8_0", {
      source: ".profile[data-v-973706a8]{display:inline-block;margin-right:8px;border-radius:50%;height:30px;width:30px}",
      map: undefined,
      media: undefined
    });
  };
  /* scoped */


  var __vue_scope_id__$6 = "data-v-973706a8";
  /* module identifier */

  var __vue_module_identifier__$6 = undefined;
  /* functional template */

  var __vue_is_functional_template__$6 = false;
  /* style inject SSR */

  /* style inject shadow dom */

  var __vue_component__$5 = normalizeComponent({
    render: __vue_render__$6,
    staticRenderFns: __vue_staticRenderFns__$6
  }, __vue_inject_styles__$6, __vue_script__$6, __vue_scope_id__$6, __vue_is_functional_template__$6, __vue_module_identifier__$6, false, createInjector$1, undefined, undefined);

  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  var script$7 = {
    name: 'Textareafield',
    props: {
      value: {},
      label: {
        type: String
      },
      required: {
        type: [String, Boolean]
      },
      placeholder: {
        type: String
      },
      customClass: {
        type: String
      },
      disabled: {
        type: Boolean
      },
      displayMode: {
        type: String
      },
      hideLabel: {
        type: Boolean
      },
      filter: {
        type: String
      },
      filterArgs: {
        type: Array,
        default: function _default() {
          return [];
        }
      },
      rows: {
        type: Number
      },
      property: {
        type: Object
      },
      attrs: {
        type: Object
      }
    },
    data: function data() {
      return {
        clonedValue: {
          value: this.value || this.property.value
        }
      };
    },
    methods: {
      handler: function handler() {
        this.validate();
        this.$emit('updateValue', this.clonedValue);
      },
      validate: function validate() {
        if (this.property) {
          if ((this.required || this.property.required) && !this.clonedValue.value) {
            this.clonedValue.$invalid = true;
            this.clonedValue.$error = 'required';
          } else if (this.property.regex && this.property.regex.test(this.clonedValue.value)) {
            this.clonedValue.$invalid = true;
            this.clonedValue.$error = 'regex';
          } else if (this.property.maxlength && (!this.clonedValue.value || this.clonedValue.value.length > this.property.maxlength)) {
            this.clonedValue.$invalid = true;
            this.clonedValue.$error = 'length';
          } else {
            this.clonedValue.$invalid = false;
            this.clonedValue.$error = null;
          }
        }
      }
    },
    created: function created() {
      this.handler();
    }
  };

  var __vue_script__$7 = script$7;
  /* template */

  var __vue_render__$7 = function __vue_render__() {
    var ref;

    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('div', [_c('label', {
      directives: [{
        name: "show",
        rawName: "v-show",
        value: !_vm.hideLabel,
        expression: "!hideLabel"
      }],
      staticClass: "control-label",
      attrs: {
        "for": _vm.attrs.id || _vm.label || _vm.property.name
      },
      domProps: {
        "textContent": _vm._s(_vm.label || _vm.property.name)
      }
    }), _vm._v(" "), _vm.displayMode === 'CREATE' || _vm.displayMode === 'EDIT' ? _c('div', {
      staticClass: "form-element"
    }, [_c('textarea', _vm._b({
      directives: [{
        name: "model",
        rawName: "v-model",
        value: _vm.clonedValue.value,
        expression: "clonedValue.value"
      }],
      staticClass: "form-control",
      class: _vm.customClass,
      attrs: {
        "name": _vm.attrs.name || _vm.label,
        "id": _vm.attrs.id || _vm.label || _vm.property.name,
        "required": _vm.required,
        "placeholder": _vm.placeholder,
        "disabled": _vm.disabled,
        "rows": _vm.rows || _vm.property && _vm.property.textarea || 3
      },
      domProps: {
        "value": _vm.clonedValue.value
      },
      on: {
        "input": [function ($event) {
          if ($event.target.composing) {
            return;
          }

          _vm.$set(_vm.clonedValue, "value", $event.target.value);
        }, _vm.handler]
      }
    }, 'textarea', _vm.attrs, false))]) : _vm.displayMode === 'VIEW' && (_vm.property.filter || _vm.filter) ? _c('p', {
      staticClass: "form-control-static"
    }, [_vm._v(_vm._s((ref = _vm.$options.filters)[_vm.filter || _vm.property.filter].apply(ref, [_vm.clonedValue.value].concat(_vm.filterArgs || _vm.property.filterArgs))))]) : _vm.displayMode === 'VIEW' ? _c('p', {
      staticClass: "form-control-static pre",
      domProps: {
        "textContent": _vm._s(_vm.clonedValue.value || '-')
      }
    }) : _vm._e()]);
  };

  var __vue_staticRenderFns__$7 = [];
  /* style */

  var __vue_inject_styles__$7 = function __vue_inject_styles__(inject) {
    if (!inject) return;
    inject("data-v-616d0cea_0", {
      source: ".pre[data-v-616d0cea]{white-space:pre}",
      map: undefined,
      media: undefined
    });
  };
  /* scoped */


  var __vue_scope_id__$7 = "data-v-616d0cea";
  /* module identifier */

  var __vue_module_identifier__$7 = undefined;
  /* functional template */

  var __vue_is_functional_template__$7 = false;
  /* style inject SSR */

  /* style inject shadow dom */

  var __vue_component__$6 = normalizeComponent({
    render: __vue_render__$7,
    staticRenderFns: __vue_staticRenderFns__$7
  }, __vue_inject_styles__$7, __vue_script__$7, __vue_scope_id__$7, __vue_is_functional_template__$7, __vue_module_identifier__$7, false, createInjector$1, undefined, undefined);

  // TODO: Remove from `core-js@4` since it's moved to entry points







  var SPECIES$4 = wellKnownSymbol('species');

  var REPLACE_SUPPORTS_NAMED_GROUPS = !fails(function () {
    // #replace needs built-in support for named groups.
    // #match works fine because it just return the exec results, even if it has
    // a "grops" property.
    var re = /./;
    re.exec = function () {
      var result = [];
      result.groups = { a: '7' };
      return result;
    };
    return ''.replace(re, '$<a>') !== '7';
  });

  // IE <= 11 replaces $0 with the whole match, as if it was $&
  // https://stackoverflow.com/questions/6024666/getting-ie-to-replace-a-regex-with-the-literal-string-0
  var REPLACE_KEEPS_$0 = (function () {
    return 'a'.replace(/./, '$0') === '$0';
  })();

  var REPLACE = wellKnownSymbol('replace');
  // Safari <= 13.0.3(?) substitutes nth capture where n>m with an empty string
  var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE = (function () {
    if (/./[REPLACE]) {
      return /./[REPLACE]('a', '$0') === '';
    }
    return false;
  })();

  // Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
  // Weex JS has frozen built-in prototypes, so use try / catch wrapper
  var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = !fails(function () {
    var re = /(?:)/;
    var originalExec = re.exec;
    re.exec = function () { return originalExec.apply(this, arguments); };
    var result = 'ab'.split(re);
    return result.length !== 2 || result[0] !== 'a' || result[1] !== 'b';
  });

  var fixRegexpWellKnownSymbolLogic = function (KEY, length, exec, sham) {
    var SYMBOL = wellKnownSymbol(KEY);

    var DELEGATES_TO_SYMBOL = !fails(function () {
      // String methods call symbol-named RegEp methods
      var O = {};
      O[SYMBOL] = function () { return 7; };
      return ''[KEY](O) != 7;
    });

    var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL && !fails(function () {
      // Symbol-named RegExp methods call .exec
      var execCalled = false;
      var re = /a/;

      if (KEY === 'split') {
        // We can't use real regex here since it causes deoptimization
        // and serious performance degradation in V8
        // https://github.com/zloirock/core-js/issues/306
        re = {};
        // RegExp[@@split] doesn't call the regex's exec method, but first creates
        // a new one. We need to return the patched regex when creating the new one.
        re.constructor = {};
        re.constructor[SPECIES$4] = function () { return re; };
        re.flags = '';
        re[SYMBOL] = /./[SYMBOL];
      }

      re.exec = function () { execCalled = true; return null; };

      re[SYMBOL]('');
      return !execCalled;
    });

    if (
      !DELEGATES_TO_SYMBOL ||
      !DELEGATES_TO_EXEC ||
      (KEY === 'replace' && !(
        REPLACE_SUPPORTS_NAMED_GROUPS &&
        REPLACE_KEEPS_$0 &&
        !REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE
      )) ||
      (KEY === 'split' && !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC)
    ) {
      var nativeRegExpMethod = /./[SYMBOL];
      var methods = exec(SYMBOL, ''[KEY], function (nativeMethod, regexp, str, arg2, forceStringMethod) {
        if (regexp.exec === regexpExec) {
          if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
            // The native String method already delegates to @@method (this
            // polyfilled function), leasing to infinite recursion.
            // We avoid it by directly calling the native @@method method.
            return { done: true, value: nativeRegExpMethod.call(regexp, str, arg2) };
          }
          return { done: true, value: nativeMethod.call(str, regexp, arg2) };
        }
        return { done: false };
      }, {
        REPLACE_KEEPS_$0: REPLACE_KEEPS_$0,
        REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE: REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE
      });
      var stringMethod = methods[0];
      var regexMethod = methods[1];

      redefine(String.prototype, KEY, stringMethod);
      redefine(RegExp.prototype, SYMBOL, length == 2
        // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
        // 21.2.5.11 RegExp.prototype[@@split](string, limit)
        ? function (string, arg) { return regexMethod.call(string, this, arg); }
        // 21.2.5.6 RegExp.prototype[@@match](string)
        // 21.2.5.9 RegExp.prototype[@@search](string)
        : function (string) { return regexMethod.call(string, this); }
      );
    }

    if (sham) createNonEnumerableProperty(RegExp.prototype[SYMBOL], 'sham', true);
  };

  // `String.prototype.{ codePointAt, at }` methods implementation
  var createMethod$3 = function (CONVERT_TO_STRING) {
    return function ($this, pos) {
      var S = String(requireObjectCoercible($this));
      var position = toInteger(pos);
      var size = S.length;
      var first, second;
      if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
      first = S.charCodeAt(position);
      return first < 0xD800 || first > 0xDBFF || position + 1 === size
        || (second = S.charCodeAt(position + 1)) < 0xDC00 || second > 0xDFFF
          ? CONVERT_TO_STRING ? S.charAt(position) : first
          : CONVERT_TO_STRING ? S.slice(position, position + 2) : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
    };
  };

  var stringMultibyte = {
    // `String.prototype.codePointAt` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.codepointat
    codeAt: createMethod$3(false),
    // `String.prototype.at` method
    // https://github.com/mathiasbynens/String.prototype.at
    charAt: createMethod$3(true)
  };

  var charAt = stringMultibyte.charAt;

  // `AdvanceStringIndex` abstract operation
  // https://tc39.github.io/ecma262/#sec-advancestringindex
  var advanceStringIndex = function (S, index, unicode) {
    return index + (unicode ? charAt(S, index).length : 1);
  };

  // `RegExpExec` abstract operation
  // https://tc39.github.io/ecma262/#sec-regexpexec
  var regexpExecAbstract = function (R, S) {
    var exec = R.exec;
    if (typeof exec === 'function') {
      var result = exec.call(R, S);
      if (typeof result !== 'object') {
        throw TypeError('RegExp exec method returned something other than an Object or null');
      }
      return result;
    }

    if (classofRaw(R) !== 'RegExp') {
      throw TypeError('RegExp#exec called on incompatible receiver');
    }

    return regexpExec.call(R, S);
  };

  // @@match logic
  fixRegexpWellKnownSymbolLogic('match', 1, function (MATCH, nativeMatch, maybeCallNative) {
    return [
      // `String.prototype.match` method
      // https://tc39.github.io/ecma262/#sec-string.prototype.match
      function match(regexp) {
        var O = requireObjectCoercible(this);
        var matcher = regexp == undefined ? undefined : regexp[MATCH];
        return matcher !== undefined ? matcher.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
      },
      // `RegExp.prototype[@@match]` method
      // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@match
      function (regexp) {
        var res = maybeCallNative(nativeMatch, regexp, this);
        if (res.done) return res.value;

        var rx = anObject(regexp);
        var S = String(this);

        if (!rx.global) return regexpExecAbstract(rx, S);

        var fullUnicode = rx.unicode;
        rx.lastIndex = 0;
        var A = [];
        var n = 0;
        var result;
        while ((result = regexpExecAbstract(rx, S)) !== null) {
          var matchStr = String(result[0]);
          A[n] = matchStr;
          if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
          n++;
        }
        return n === 0 ? null : A;
      }
    ];
  });

  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  var script$8 = {
    name: 'Textfield',
    props: {
      value: {},
      label: {
        type: String
      },
      required: {
        type: [String, Boolean]
      },
      placeholder: {
        type: String
      },
      customClass: {
        type: String
      },
      disabled: {
        type: Boolean
      },
      displayMode: {
        type: String
      },
      hideLabel: {
        type: Boolean
      },
      filter: {
        type: String
      },
      filterArgs: {
        type: Array,
        default: function _default() {
          return [];
        }
      },
      showSuggestion: {
        type: Boolean,
        default: false
      },
      suggestions: {
        type: Array
      },
      regex: {
        type: String
      },
      property: {
        type: Object
      },
      attrs: {
        type: Object
      }
    },
    data: function data() {
      return {
        clonedValue: {
          value: this.value || (this.property ? this.property.value : undefined)
        },
        filteredSuggestion: null,
        isOpen: false
      };
    },
    methods: {
      handler: function handler() {
        var _this = this;

        this.validate();
        this.$emit('updateValue', this.clonedValue);

        if (this.showSuggestion) {
          var found = this.suggestions.find(function (item) {
            return _this.clonedValue.value && item.match(_this.clonedValue.value) && _this.clonedValue.value.length >= 2;
          });
          this.filteredSuggestion = found ? found : '';
        }
      },
      toggleSuggestion: function toggleSuggestion(val) {
        this.isOpen = val;

        if (!val) {
          this.filteredSuggestion = null;
        }
      },
      setValue: function setValue() {
        if (this.suggestions && this.filteredSuggestion) {
          this.clonedValue.value = this.filteredSuggestion;
          this.handler();
          this.isOpen = false;
        }
      },
      validate: function validate() {
        if (this.property) {
          if ((this.required || this.property.required) && !this.clonedValue.value) {
            this.clonedValue.$invalid = true;
            this.clonedValue.$error = 'required'; // eslint-disable-next-line
          } else if (this.property.email && !/^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i.test(this.clonedValue.value)) {
            this.clonedValue.$invalid = true;
            this.clonedValue.$error = 'email';
          } else if (this.property.regex && !this.clonedValue.value.test(this.property.regex)) {
            this.clonedValue.$invalid = true;
            this.clonedValue.$error = 'regex';
          } else if (this.regex && !this.clonedValue.value.test(this.regex)) {
            this.clonedValue.$invalid = true;
            this.clonedValue.$error = 'regex';
          } else if (this.property.maxlength && (!this.clonedValue.value || this.clonedValue.value > this.property.maxlength)) {
            this.clonedValue.$invalid = true;
            this.clonedValue.$error = 'length';
          } else {
            this.clonedValue.$invalid = false;
            this.clonedValue.$error = null;
          }
        }
      }
    },
    created: function created() {
      this.handler();
    }
  };

  var __vue_script__$8 = script$8;
  /* template */

  var __vue_render__$8 = function __vue_render__() {
    var ref;

    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('div', [_c('label', {
      directives: [{
        name: "show",
        rawName: "v-show",
        value: !_vm.hideLabel,
        expression: "!hideLabel"
      }],
      staticClass: "control-label",
      attrs: {
        "for": _vm.attrs.id || _vm.label || _vm.property.name
      },
      domProps: {
        "textContent": _vm._s(_vm.label || _vm.property.name)
      }
    }), _vm._v(" "), _vm.displayMode === 'EDIT' || _vm.displayMode === 'CREATE' ? _c('div', {
      staticClass: "form-element"
    }, [_c('input', _vm._b({
      directives: [{
        name: "model",
        rawName: "v-model",
        value: _vm.clonedValue.value,
        expression: "clonedValue.value"
      }],
      staticClass: "form-control",
      class: _vm.customClass,
      attrs: {
        "type": "text",
        "name": _vm.attrs.name || _vm.label,
        "id": _vm.attrs.id || _vm.label || _vm.property.name,
        "required": _vm.required,
        "autocomplete": "off",
        "placeholder": _vm.placeholder,
        "disabled": _vm.disabled
      },
      domProps: {
        "value": _vm.clonedValue.value
      },
      on: {
        "input": [function ($event) {
          if ($event.target.composing) {
            return;
          }

          _vm.$set(_vm.clonedValue, "value", $event.target.value);
        }, _vm.handler],
        "focusin": function focusin($event) {
          return _vm.toggleSuggestion(true);
        },
        "focusout": function focusout($event) {
          return _vm.toggleSuggestion(false);
        },
        "keydown": function keydown($event) {
          if (!$event.type.indexOf('key') && _vm._k($event.keyCode, "tab", 9, $event.key, "Tab")) {
            return null;
          }

          return _vm.setValue($event);
        }
      }
    }, 'input', _vm.attrs, false)), _vm._v(" "), _vm.showSuggestion ? _c('div', {
      staticClass: "intellisense",
      class: {
        visible: _vm.filteredSuggestion && _vm.clonedValue.value && _vm.isOpen
      },
      on: {
        "click": _vm.setValue
      }
    }, [_vm._v("\n            " + _vm._s(_vm.filteredSuggestion) + "\n        ")]) : _vm._e(), _vm._v(" "), _vm.showSuggestion && _vm.filteredSuggestion ? _c('div', {
      staticClass: "intellisense-help"
    }, [_c('i', {
      staticClass: "material-icons"
    }, [_vm._v("keyboard_tab")]), _vm._v(_vm._s(_vm.filteredSuggestion ? 'Press Tab to Select' : ''))]) : _vm._e()]) : _vm.displayMode === 'VIEW' && _vm.property.filter || _vm.filter ? _c('p', {
      staticClass: "form-control-static"
    }, [_vm._v(_vm._s((ref = _vm.$options.filters)[_vm.filter || _vm.property.filter].apply(ref, [_vm.clonedValue.value].concat(_vm.filterArgs || _vm.property.filterArgs))))]) : _vm.displayMode === 'VIEW' ? _c('p', {
      staticClass: "form-control-static",
      domProps: {
        "textContent": _vm._s(_vm.clonedValue.value || '-')
      }
    }) : _vm._e()]);
  };

  var __vue_staticRenderFns__$8 = [];
  /* style */

  var __vue_inject_styles__$8 = undefined;
  /* scoped */

  var __vue_scope_id__$8 = undefined;
  /* module identifier */

  var __vue_module_identifier__$8 = undefined;
  /* functional template */

  var __vue_is_functional_template__$8 = false;
  /* style inject */

  /* style inject SSR */

  /* style inject shadow dom */

  var __vue_component__$7 = normalizeComponent({
    render: __vue_render__$8,
    staticRenderFns: __vue_staticRenderFns__$8
  }, __vue_inject_styles__$8, __vue_script__$8, __vue_scope_id__$8, __vue_is_functional_template__$8, __vue_module_identifier__$8, false, undefined, undefined, undefined);

  var mapping = {
    Boolean: __vue_component__,
    Date: __vue_component__$1,
    MultiSelect: __vue_component__$2,
    Number: __vue_component__$3,
    Phone: __vue_component__$4,
    Select: __vue_component__$5,
    Textarea: __vue_component__$6,
    Text: __vue_component__$7
  };
  var script$9 = {
    name: 'FieldFor',
    props: {
      // standard props
      field: {
        type: String
      },
      type: {
        type: String
      },
      value: {},
      label: {
        type: String
      },
      required: {
        type: [String, Boolean]
      },
      placeholder: {
        type: String
      },
      customClass: {
        type: String
      },
      disabled: {
        type: Boolean
      },
      displayMode: {
        type: String
      },
      hideLabel: {
        type: Boolean
      },
      filter: {
        type: String
      },
      filterArgs: {
        type: Array,
        default: function _default() {
          return [];
        }
      },
      regex: {
        type: String
      },
      showSuggestion: {
        type: Boolean,
        default: false
      },
      suggestions: {
        type: Array
      },
      // input[type=number]
      min: {
        type: Number
      },
      max: {
        type: Number
      },
      prepend: {
        type: String
      },
      // textarea
      rows: {
        type: Number
      },
      // dropdown
      selectFrom: {
        type: Array
      },
      displayField: {
        type: String
      },
      valueField: {
        type: String
      },
      fullObject: {
        type: Boolean
      },
      searchable: {
        type: [Boolean, String]
      },
      multiple: {
        type: [Boolean, String]
      },
      allowClear: {
        type: Boolean
      },
      showAvatar: {
        type: Boolean
      },
      avatarProp: {
        type: String
      },
      optionTemplate: {
        type: String
      },
      // custom
      phone: {
        type: Boolean
      },
      showFlags: {
        type: Boolean
      },
      // date
      calendarConfig: {
        type: Object
      }
    },
    data: function data() {
      return {
        component: null,
        property: {},
        error: '',
        invalid: false
      };
    },
    methods: {
      sendValue: function sendValue(valueObj) {
        var _this = this;

        // Model service way
        if (this.property.name) {
          this.property.value = valueObj.value;
          this.$set(this.$parent.data, this.property.name, valueObj.value);
          this.invalid = valueObj.$invalid;
          this.error = valueObj.$error;
          var found = this.$parent.errors.findIndex(function (err) {
            return err.name === _this.property.name;
          });

          if (found > -1) {
            this.$parent.errors.splice(found, 1);
          }

          if (this.invalid) {
            this.$parent.errors.push({
              name: this.property.name,
              error: valueObj.$error
            });
          }

          this.$parent.invalid = this.$parent.errors.length !== 0; // emit the changes

          this.$emit('changed', this.property.value);
        } else {
          // if done through custom way
          this.$emit('update:value', valueObj.value);
          this.$emit('changed', valueObj.value);
        }
      },
      // Model service way
      loadFieldComponentFromModel: function loadFieldComponentFromModel() {
        if (this.property.type.name === 'String') {
          if (this.property.textarea || this.rows) {
            this.component = __vue_component__$6;
          } else if (this.selectFrom && this.multiple) {
            this.component = __vue_component__$2;
          } else if (this.property.enum || this.selectFrom) {
            this.component = __vue_component__$5;
          } else if (this.property.phone || this.phone) {
            this.component = __vue_component__$4;
          } else {
            this.component = __vue_component__$7;
          }
        } else if (this.property.type.name === 'Number') {
          this.component = __vue_component__$3;
        } else if (this.property.type.name === 'Boolean') {
          this.component = __vue_component__;
        } else if (this.property.type.name === 'Date' || this.property.type.name === 'moment') {
          this.component = __vue_component__$1;
        } else if (this.property.type.name === 'Array') {
          this.component = __vue_component__$2;
        }
      }
    },
    computed: {
      validationMessage: function validationMessage() {
        var errMsg = '';
        if (!this.error) return '';

        switch (this.error) {
          case 'email':
            {
              errMsg = 'Provided email is incorrect';
              break;
            }

          case 'length':
            {
              errMsg = 'Length of characters exceeds the allowed limit of ' + this.property.maxlength;
              break;
            }

          case 'required':
            {
              errMsg = (this.label || this.property.name) + ' field is a required field';
              break;
            }

          case 'regex':
            {
              errMsg = (this.label || this.property.name) + ' is not in the correct format';
              break;
            }

          case 'min':
            {
              errMsg = (this.label || this.property.name) + ' must be above ' + (this.min !== undefined ? this.min : this.property.min);
              break;
            }

          case 'max':
            {
              errMsg = (this.label || this.property.name) + ' must be below ' + (this.max !== undefined ? this.max : this.property.max);
              break;
            }

          default:
            {
              errMsg = (this.label || this.property.name) + ' is incorrect';
            }
        }

        return errMsg;
      }
    },
    created: function created() {
      // Custom way
      if (this.type) {
        this.component = mapping[this.type];
      } else if (this.$parent.schema) {
        // Model service way
        var prop = this.$parent.schema[this.field];

        if (prop === undefined) {
          console.error("".concat(this.field, " is not available in the schema. Please add it to your model.js in order to show a field."));
          return;
        }

        prop.name = this.field;
        prop.value = this.$parent.$props.data ? this.$parent.$props.data[this.field] : '-';
        this.property = JSON.parse(JSON.stringify(prop));
        this.property.type = prop.type;
        this.loadFieldComponentFromModel();
      }
    }
  };

  /* script */
  var __vue_script__$9 = script$9;
  /* template */

  var __vue_render__$9 = function __vue_render__() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('div', {
      staticClass: "form-group"
    }, [_c(_vm.component, _vm._b({
      tag: "component",
      attrs: {
        "attrs": _vm.$attrs,
        "value": _vm.value,
        "display-mode": _vm.displayMode ? _vm.displayMode : _vm.$parent.displayMode,
        "property": _vm.property
      },
      on: {
        "updateValue": _vm.sendValue
      }
    }, 'component', _vm.$props, false)), _vm._v(" "), _vm.property && _vm.invalid && _vm.$parent.displayMode !== 'VIEW' ? _c('p', {
      staticClass: "validation-message"
    }, [_vm._v("\n        " + _vm._s(_vm.validationMessage) + "\n    ")]) : _vm._e()], 1);
  };

  var __vue_staticRenderFns__$9 = [];
  /* style */

  var __vue_inject_styles__$9 = undefined;
  /* scoped */

  var __vue_scope_id__$9 = undefined;
  /* module identifier */

  var __vue_module_identifier__$9 = undefined;
  /* functional template */

  var __vue_is_functional_template__$9 = false;
  /* style inject */

  /* style inject SSR */

  /* style inject shadow dom */

  var __vue_component__$8 = normalizeComponent({
    render: __vue_render__$9,
    staticRenderFns: __vue_staticRenderFns__$9
  }, __vue_inject_styles__$9, __vue_script__$9, __vue_scope_id__$9, __vue_is_functional_template__$9, __vue_module_identifier__$9, false, undefined, undefined, undefined);

  var runtime_1 = createCommonjsModule(function (module) {
  /**
   * Copyright (c) 2014-present, Facebook, Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */

  var runtime = (function (exports) {

    var Op = Object.prototype;
    var hasOwn = Op.hasOwnProperty;
    var undefined$1; // More compressible than void 0.
    var $Symbol = typeof Symbol === "function" ? Symbol : {};
    var iteratorSymbol = $Symbol.iterator || "@@iterator";
    var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
    var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

    function wrap(innerFn, outerFn, self, tryLocsList) {
      // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
      var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
      var generator = Object.create(protoGenerator.prototype);
      var context = new Context(tryLocsList || []);

      // The ._invoke method unifies the implementations of the .next,
      // .throw, and .return methods.
      generator._invoke = makeInvokeMethod(innerFn, self, context);

      return generator;
    }
    exports.wrap = wrap;

    // Try/catch helper to minimize deoptimizations. Returns a completion
    // record like context.tryEntries[i].completion. This interface could
    // have been (and was previously) designed to take a closure to be
    // invoked without arguments, but in all the cases we care about we
    // already have an existing method we want to call, so there's no need
    // to create a new function object. We can even get away with assuming
    // the method takes exactly one argument, since that happens to be true
    // in every case, so we don't have to touch the arguments object. The
    // only additional allocation required is the completion record, which
    // has a stable shape and so hopefully should be cheap to allocate.
    function tryCatch(fn, obj, arg) {
      try {
        return { type: "normal", arg: fn.call(obj, arg) };
      } catch (err) {
        return { type: "throw", arg: err };
      }
    }

    var GenStateSuspendedStart = "suspendedStart";
    var GenStateSuspendedYield = "suspendedYield";
    var GenStateExecuting = "executing";
    var GenStateCompleted = "completed";

    // Returning this object from the innerFn has the same effect as
    // breaking out of the dispatch switch statement.
    var ContinueSentinel = {};

    // Dummy constructor functions that we use as the .constructor and
    // .constructor.prototype properties for functions that return Generator
    // objects. For full spec compliance, you may wish to configure your
    // minifier not to mangle the names of these two functions.
    function Generator() {}
    function GeneratorFunction() {}
    function GeneratorFunctionPrototype() {}

    // This is a polyfill for %IteratorPrototype% for environments that
    // don't natively support it.
    var IteratorPrototype = {};
    IteratorPrototype[iteratorSymbol] = function () {
      return this;
    };

    var getProto = Object.getPrototypeOf;
    var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
    if (NativeIteratorPrototype &&
        NativeIteratorPrototype !== Op &&
        hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
      // This environment has a native %IteratorPrototype%; use it instead
      // of the polyfill.
      IteratorPrototype = NativeIteratorPrototype;
    }

    var Gp = GeneratorFunctionPrototype.prototype =
      Generator.prototype = Object.create(IteratorPrototype);
    GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
    GeneratorFunctionPrototype.constructor = GeneratorFunction;
    GeneratorFunctionPrototype[toStringTagSymbol] =
      GeneratorFunction.displayName = "GeneratorFunction";

    // Helper for defining the .next, .throw, and .return methods of the
    // Iterator interface in terms of a single ._invoke method.
    function defineIteratorMethods(prototype) {
      ["next", "throw", "return"].forEach(function(method) {
        prototype[method] = function(arg) {
          return this._invoke(method, arg);
        };
      });
    }

    exports.isGeneratorFunction = function(genFun) {
      var ctor = typeof genFun === "function" && genFun.constructor;
      return ctor
        ? ctor === GeneratorFunction ||
          // For the native GeneratorFunction constructor, the best we can
          // do is to check its .name property.
          (ctor.displayName || ctor.name) === "GeneratorFunction"
        : false;
    };

    exports.mark = function(genFun) {
      if (Object.setPrototypeOf) {
        Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
      } else {
        genFun.__proto__ = GeneratorFunctionPrototype;
        if (!(toStringTagSymbol in genFun)) {
          genFun[toStringTagSymbol] = "GeneratorFunction";
        }
      }
      genFun.prototype = Object.create(Gp);
      return genFun;
    };

    // Within the body of any async function, `await x` is transformed to
    // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
    // `hasOwn.call(value, "__await")` to determine if the yielded value is
    // meant to be awaited.
    exports.awrap = function(arg) {
      return { __await: arg };
    };

    function AsyncIterator(generator, PromiseImpl) {
      function invoke(method, arg, resolve, reject) {
        var record = tryCatch(generator[method], generator, arg);
        if (record.type === "throw") {
          reject(record.arg);
        } else {
          var result = record.arg;
          var value = result.value;
          if (value &&
              typeof value === "object" &&
              hasOwn.call(value, "__await")) {
            return PromiseImpl.resolve(value.__await).then(function(value) {
              invoke("next", value, resolve, reject);
            }, function(err) {
              invoke("throw", err, resolve, reject);
            });
          }

          return PromiseImpl.resolve(value).then(function(unwrapped) {
            // When a yielded Promise is resolved, its final value becomes
            // the .value of the Promise<{value,done}> result for the
            // current iteration.
            result.value = unwrapped;
            resolve(result);
          }, function(error) {
            // If a rejected Promise was yielded, throw the rejection back
            // into the async generator function so it can be handled there.
            return invoke("throw", error, resolve, reject);
          });
        }
      }

      var previousPromise;

      function enqueue(method, arg) {
        function callInvokeWithMethodAndArg() {
          return new PromiseImpl(function(resolve, reject) {
            invoke(method, arg, resolve, reject);
          });
        }

        return previousPromise =
          // If enqueue has been called before, then we want to wait until
          // all previous Promises have been resolved before calling invoke,
          // so that results are always delivered in the correct order. If
          // enqueue has not been called before, then it is important to
          // call invoke immediately, without waiting on a callback to fire,
          // so that the async generator function has the opportunity to do
          // any necessary setup in a predictable way. This predictability
          // is why the Promise constructor synchronously invokes its
          // executor callback, and why async functions synchronously
          // execute code before the first await. Since we implement simple
          // async functions in terms of async generators, it is especially
          // important to get this right, even though it requires care.
          previousPromise ? previousPromise.then(
            callInvokeWithMethodAndArg,
            // Avoid propagating failures to Promises returned by later
            // invocations of the iterator.
            callInvokeWithMethodAndArg
          ) : callInvokeWithMethodAndArg();
      }

      // Define the unified helper method that is used to implement .next,
      // .throw, and .return (see defineIteratorMethods).
      this._invoke = enqueue;
    }

    defineIteratorMethods(AsyncIterator.prototype);
    AsyncIterator.prototype[asyncIteratorSymbol] = function () {
      return this;
    };
    exports.AsyncIterator = AsyncIterator;

    // Note that simple async functions are implemented on top of
    // AsyncIterator objects; they just return a Promise for the value of
    // the final result produced by the iterator.
    exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
      if (PromiseImpl === void 0) PromiseImpl = Promise;

      var iter = new AsyncIterator(
        wrap(innerFn, outerFn, self, tryLocsList),
        PromiseImpl
      );

      return exports.isGeneratorFunction(outerFn)
        ? iter // If outerFn is a generator, return the full iterator.
        : iter.next().then(function(result) {
            return result.done ? result.value : iter.next();
          });
    };

    function makeInvokeMethod(innerFn, self, context) {
      var state = GenStateSuspendedStart;

      return function invoke(method, arg) {
        if (state === GenStateExecuting) {
          throw new Error("Generator is already running");
        }

        if (state === GenStateCompleted) {
          if (method === "throw") {
            throw arg;
          }

          // Be forgiving, per 25.3.3.3.3 of the spec:
          // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
          return doneResult();
        }

        context.method = method;
        context.arg = arg;

        while (true) {
          var delegate = context.delegate;
          if (delegate) {
            var delegateResult = maybeInvokeDelegate(delegate, context);
            if (delegateResult) {
              if (delegateResult === ContinueSentinel) continue;
              return delegateResult;
            }
          }

          if (context.method === "next") {
            // Setting context._sent for legacy support of Babel's
            // function.sent implementation.
            context.sent = context._sent = context.arg;

          } else if (context.method === "throw") {
            if (state === GenStateSuspendedStart) {
              state = GenStateCompleted;
              throw context.arg;
            }

            context.dispatchException(context.arg);

          } else if (context.method === "return") {
            context.abrupt("return", context.arg);
          }

          state = GenStateExecuting;

          var record = tryCatch(innerFn, self, context);
          if (record.type === "normal") {
            // If an exception is thrown from innerFn, we leave state ===
            // GenStateExecuting and loop back for another invocation.
            state = context.done
              ? GenStateCompleted
              : GenStateSuspendedYield;

            if (record.arg === ContinueSentinel) {
              continue;
            }

            return {
              value: record.arg,
              done: context.done
            };

          } else if (record.type === "throw") {
            state = GenStateCompleted;
            // Dispatch the exception by looping back around to the
            // context.dispatchException(context.arg) call above.
            context.method = "throw";
            context.arg = record.arg;
          }
        }
      };
    }

    // Call delegate.iterator[context.method](context.arg) and handle the
    // result, either by returning a { value, done } result from the
    // delegate iterator, or by modifying context.method and context.arg,
    // setting context.delegate to null, and returning the ContinueSentinel.
    function maybeInvokeDelegate(delegate, context) {
      var method = delegate.iterator[context.method];
      if (method === undefined$1) {
        // A .throw or .return when the delegate iterator has no .throw
        // method always terminates the yield* loop.
        context.delegate = null;

        if (context.method === "throw") {
          // Note: ["return"] must be used for ES3 parsing compatibility.
          if (delegate.iterator["return"]) {
            // If the delegate iterator has a return method, give it a
            // chance to clean up.
            context.method = "return";
            context.arg = undefined$1;
            maybeInvokeDelegate(delegate, context);

            if (context.method === "throw") {
              // If maybeInvokeDelegate(context) changed context.method from
              // "return" to "throw", let that override the TypeError below.
              return ContinueSentinel;
            }
          }

          context.method = "throw";
          context.arg = new TypeError(
            "The iterator does not provide a 'throw' method");
        }

        return ContinueSentinel;
      }

      var record = tryCatch(method, delegate.iterator, context.arg);

      if (record.type === "throw") {
        context.method = "throw";
        context.arg = record.arg;
        context.delegate = null;
        return ContinueSentinel;
      }

      var info = record.arg;

      if (! info) {
        context.method = "throw";
        context.arg = new TypeError("iterator result is not an object");
        context.delegate = null;
        return ContinueSentinel;
      }

      if (info.done) {
        // Assign the result of the finished delegate to the temporary
        // variable specified by delegate.resultName (see delegateYield).
        context[delegate.resultName] = info.value;

        // Resume execution at the desired location (see delegateYield).
        context.next = delegate.nextLoc;

        // If context.method was "throw" but the delegate handled the
        // exception, let the outer generator proceed normally. If
        // context.method was "next", forget context.arg since it has been
        // "consumed" by the delegate iterator. If context.method was
        // "return", allow the original .return call to continue in the
        // outer generator.
        if (context.method !== "return") {
          context.method = "next";
          context.arg = undefined$1;
        }

      } else {
        // Re-yield the result returned by the delegate method.
        return info;
      }

      // The delegate iterator is finished, so forget it and continue with
      // the outer generator.
      context.delegate = null;
      return ContinueSentinel;
    }

    // Define Generator.prototype.{next,throw,return} in terms of the
    // unified ._invoke helper method.
    defineIteratorMethods(Gp);

    Gp[toStringTagSymbol] = "Generator";

    // A Generator should always return itself as the iterator object when the
    // @@iterator function is called on it. Some browsers' implementations of the
    // iterator prototype chain incorrectly implement this, causing the Generator
    // object to not be returned from this call. This ensures that doesn't happen.
    // See https://github.com/facebook/regenerator/issues/274 for more details.
    Gp[iteratorSymbol] = function() {
      return this;
    };

    Gp.toString = function() {
      return "[object Generator]";
    };

    function pushTryEntry(locs) {
      var entry = { tryLoc: locs[0] };

      if (1 in locs) {
        entry.catchLoc = locs[1];
      }

      if (2 in locs) {
        entry.finallyLoc = locs[2];
        entry.afterLoc = locs[3];
      }

      this.tryEntries.push(entry);
    }

    function resetTryEntry(entry) {
      var record = entry.completion || {};
      record.type = "normal";
      delete record.arg;
      entry.completion = record;
    }

    function Context(tryLocsList) {
      // The root entry object (effectively a try statement without a catch
      // or a finally block) gives us a place to store values thrown from
      // locations where there is no enclosing try statement.
      this.tryEntries = [{ tryLoc: "root" }];
      tryLocsList.forEach(pushTryEntry, this);
      this.reset(true);
    }

    exports.keys = function(object) {
      var keys = [];
      for (var key in object) {
        keys.push(key);
      }
      keys.reverse();

      // Rather than returning an object with a next method, we keep
      // things simple and return the next function itself.
      return function next() {
        while (keys.length) {
          var key = keys.pop();
          if (key in object) {
            next.value = key;
            next.done = false;
            return next;
          }
        }

        // To avoid creating an additional object, we just hang the .value
        // and .done properties off the next function object itself. This
        // also ensures that the minifier will not anonymize the function.
        next.done = true;
        return next;
      };
    };

    function values(iterable) {
      if (iterable) {
        var iteratorMethod = iterable[iteratorSymbol];
        if (iteratorMethod) {
          return iteratorMethod.call(iterable);
        }

        if (typeof iterable.next === "function") {
          return iterable;
        }

        if (!isNaN(iterable.length)) {
          var i = -1, next = function next() {
            while (++i < iterable.length) {
              if (hasOwn.call(iterable, i)) {
                next.value = iterable[i];
                next.done = false;
                return next;
              }
            }

            next.value = undefined$1;
            next.done = true;

            return next;
          };

          return next.next = next;
        }
      }

      // Return an iterator with no values.
      return { next: doneResult };
    }
    exports.values = values;

    function doneResult() {
      return { value: undefined$1, done: true };
    }

    Context.prototype = {
      constructor: Context,

      reset: function(skipTempReset) {
        this.prev = 0;
        this.next = 0;
        // Resetting context._sent for legacy support of Babel's
        // function.sent implementation.
        this.sent = this._sent = undefined$1;
        this.done = false;
        this.delegate = null;

        this.method = "next";
        this.arg = undefined$1;

        this.tryEntries.forEach(resetTryEntry);

        if (!skipTempReset) {
          for (var name in this) {
            // Not sure about the optimal order of these conditions:
            if (name.charAt(0) === "t" &&
                hasOwn.call(this, name) &&
                !isNaN(+name.slice(1))) {
              this[name] = undefined$1;
            }
          }
        }
      },

      stop: function() {
        this.done = true;

        var rootEntry = this.tryEntries[0];
        var rootRecord = rootEntry.completion;
        if (rootRecord.type === "throw") {
          throw rootRecord.arg;
        }

        return this.rval;
      },

      dispatchException: function(exception) {
        if (this.done) {
          throw exception;
        }

        var context = this;
        function handle(loc, caught) {
          record.type = "throw";
          record.arg = exception;
          context.next = loc;

          if (caught) {
            // If the dispatched exception was caught by a catch block,
            // then let that catch block handle the exception normally.
            context.method = "next";
            context.arg = undefined$1;
          }

          return !! caught;
        }

        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          var record = entry.completion;

          if (entry.tryLoc === "root") {
            // Exception thrown outside of any try block that could handle
            // it, so set the completion value of the entire function to
            // throw the exception.
            return handle("end");
          }

          if (entry.tryLoc <= this.prev) {
            var hasCatch = hasOwn.call(entry, "catchLoc");
            var hasFinally = hasOwn.call(entry, "finallyLoc");

            if (hasCatch && hasFinally) {
              if (this.prev < entry.catchLoc) {
                return handle(entry.catchLoc, true);
              } else if (this.prev < entry.finallyLoc) {
                return handle(entry.finallyLoc);
              }

            } else if (hasCatch) {
              if (this.prev < entry.catchLoc) {
                return handle(entry.catchLoc, true);
              }

            } else if (hasFinally) {
              if (this.prev < entry.finallyLoc) {
                return handle(entry.finallyLoc);
              }

            } else {
              throw new Error("try statement without catch or finally");
            }
          }
        }
      },

      abrupt: function(type, arg) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.tryLoc <= this.prev &&
              hasOwn.call(entry, "finallyLoc") &&
              this.prev < entry.finallyLoc) {
            var finallyEntry = entry;
            break;
          }
        }

        if (finallyEntry &&
            (type === "break" ||
             type === "continue") &&
            finallyEntry.tryLoc <= arg &&
            arg <= finallyEntry.finallyLoc) {
          // Ignore the finally entry if control is not jumping to a
          // location outside the try/catch block.
          finallyEntry = null;
        }

        var record = finallyEntry ? finallyEntry.completion : {};
        record.type = type;
        record.arg = arg;

        if (finallyEntry) {
          this.method = "next";
          this.next = finallyEntry.finallyLoc;
          return ContinueSentinel;
        }

        return this.complete(record);
      },

      complete: function(record, afterLoc) {
        if (record.type === "throw") {
          throw record.arg;
        }

        if (record.type === "break" ||
            record.type === "continue") {
          this.next = record.arg;
        } else if (record.type === "return") {
          this.rval = this.arg = record.arg;
          this.method = "return";
          this.next = "end";
        } else if (record.type === "normal" && afterLoc) {
          this.next = afterLoc;
        }

        return ContinueSentinel;
      },

      finish: function(finallyLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.finallyLoc === finallyLoc) {
            this.complete(entry.completion, entry.afterLoc);
            resetTryEntry(entry);
            return ContinueSentinel;
          }
        }
      },

      "catch": function(tryLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.tryLoc === tryLoc) {
            var record = entry.completion;
            if (record.type === "throw") {
              var thrown = record.arg;
              resetTryEntry(entry);
            }
            return thrown;
          }
        }

        // The context.catch method must only be called with a location
        // argument that corresponds to a known catch block.
        throw new Error("illegal catch attempt");
      },

      delegateYield: function(iterable, resultName, nextLoc) {
        this.delegate = {
          iterator: values(iterable),
          resultName: resultName,
          nextLoc: nextLoc
        };

        if (this.method === "next") {
          // Deliberately forget the last sent value so that we don't
          // accidentally pass it on to the delegate.
          this.arg = undefined$1;
        }

        return ContinueSentinel;
      }
    };

    // Regardless of whether this script is executing as a CommonJS module
    // or not, return the runtime object so that we can declare the variable
    // regeneratorRuntime in the outer scope, which allows this module to be
    // injected easily by `bin/regenerator --include-runtime script.js`.
    return exports;

  }(
    // If this script is executing as a CommonJS module, use module.exports
    // as the regeneratorRuntime namespace. Otherwise create a new empty
    // object. Either way, the resulting object will be used to initialize
    // the regeneratorRuntime variable at the top of this file.
     module.exports 
  ));

  try {
    regeneratorRuntime = runtime;
  } catch (accidentalStrictMode) {
    // This module should not be running in strict mode, so the above
    // assignment should always work unless something is misconfigured. Just
    // in case runtime.js accidentally runs in strict mode, we can escape
    // strict mode using a global Function call. This could conceivably fail
    // if a Content Security Policy forbids using Function, but in that case
    // the proper solution is to fix the accidental strict mode problem. If
    // you've misconfigured your bundler to force strict mode and applied a
    // CSP to forbid Function, and you're not willing to fix either of those
    // problems, please detail your unique predicament in a GitHub issue.
    Function("r", "regeneratorRuntime = r")(runtime);
  }
  });

  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
      var info = gen[key](arg);
      var value = info.value;
    } catch (error) {
      reject(error);
      return;
    }

    if (info.done) {
      resolve(value);
    } else {
      Promise.resolve(value).then(_next, _throw);
    }
  }

  function _asyncToGenerator(fn) {
    return function () {
      var self = this,
          args = arguments;
      return new Promise(function (resolve, reject) {
        var gen = fn.apply(self, args);

        function _next(value) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
        }

        function _throw(err) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
        }

        _next(undefined);
      });
    };
  }

  //
  //
  //
  //
  //
  //
  var script$a = {
    name: 'FormFor',
    props: {
      displayMode: {
        type: String
      },
      data: {}
    },
    data: function data() {
      return {
        schema: null,
        errors: [],
        invalid: false
      };
    },
    created: function created() {
      var _this = this;

      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!_this.data.schema) {
                  console.error('Constructor of Model is not initialised. Make sure it is in `new Model()` format');
                }

                _this.schema = _this.data.schema();

              case 2:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    }
  };

  /* script */
  var __vue_script__$a = script$a;
  /* template */

  var __vue_render__$a = function __vue_render__() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _vm.data && _vm.data.schema ? _c('div', {
      attrs: {
        "autocomplete": "off"
      }
    }, [_vm._t("default", null, {
      "invalid": _vm.invalid,
      "errors": _vm.errors
    })], 2) : _vm._e();
  };

  var __vue_staticRenderFns__$a = [];
  /* style */

  var __vue_inject_styles__$a = undefined;
  /* scoped */

  var __vue_scope_id__$a = "data-v-0549c70c";
  /* module identifier */

  var __vue_module_identifier__$a = undefined;
  /* functional template */

  var __vue_is_functional_template__$a = false;
  /* style inject */

  /* style inject SSR */

  /* style inject shadow dom */

  var __vue_component__$9 = normalizeComponent({
    render: __vue_render__$a,
    staticRenderFns: __vue_staticRenderFns__$a
  }, __vue_inject_styles__$a, __vue_script__$a, __vue_scope_id__$a, __vue_is_functional_template__$a, __vue_module_identifier__$a, false, undefined, undefined, undefined);

  function install$1(Vue) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
      formFor: true
    };
    if (install$1.installed) return;
    install$1.installed = true;
    Vue.component(__vue_component__$8.name, __vue_component__$8);

    if (options.formFor) {
      Vue.component(__vue_component__$9.name, __vue_component__$9);
    }
  }
  var plugin$1 = {
    install: install$1
  };
  var GlobalVue$1 = null;

  if (typeof window !== 'undefined') {
    GlobalVue$1 = window.Vue;
  } else if (typeof global !== 'undefined') {
    GlobalVue$1 = global.vue;
  }

  if (GlobalVue$1) {
    GlobalVue$1.use(plugin$1);
  }

  exports.FieldFor = __vue_component__$8;
  exports.FormFor = __vue_component__$9;
  exports.default = plugin$1;
  exports.install = install$1;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
