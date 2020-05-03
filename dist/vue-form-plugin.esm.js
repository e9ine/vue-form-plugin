import 'core-js/modules/es.function.name';
import 'core-js/modules/es.array.find-index';
import 'core-js/modules/es.array.splice';
import 'core-js/modules/es.number.constructor';
import 'core-js/modules/es.array.concat';
import 'core-js/modules/es.array.slice';
import 'core-js/modules/es.array.filter';
import flatPickr from 'vue-flatpickr-component';
import moment from 'moment/moment';
import 'core-js/modules/es.array.find';
import 'core-js/modules/es.array.index-of';
import 'core-js/modules/es.array.join';
import 'core-js/modules/es.array.map';
import Multiselect from 'vue-multiselect';
import { VueTelInput } from 'vue-tel-input';
import VRuntimeTemplate from 'v-runtime-template';
import 'core-js/modules/es.regexp.exec';
import 'core-js/modules/es.string.match';
import 'regenerator-runtime/runtime';

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

var FieldMixin = {
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
      type: Boolean,
      default: undefined
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
  }
};

//
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
      type: Boolean
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
    var _ref, _this$value;

    return {
      clonedValue: {
        value: (_ref = (_this$value = this.value) !== null && _this$value !== void 0 ? _this$value : this.property.value) !== null && _ref !== void 0 ? _ref : false
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
      type: Boolean
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

      return date ? moment(date).format(format) : '';
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
        var _this$required;

        if (((_this$required = this.required) !== null && _this$required !== void 0 ? _this$required : this.property.required) && !this.clonedValue.value) {
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
    var _ref, _this$value, _this$property;

    this.clonedValue.value = (_ref = (_this$value = this.value) !== null && _this$value !== void 0 ? _this$value : (_this$property = this.property) === null || _this$property === void 0 ? void 0 : _this$property.value) !== null && _ref !== void 0 ? _ref : undefined;
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

function ownKeys(object, enumerableOnly) {
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
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

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
      type: Boolean
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

var __vue_scope_id__$2 = "data-v-596c3a99";
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
      type: Boolean
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
    var _ref, _this$value, _this$property;

    return {
      clonedValue: {
        value: (_ref = (_this$value = this.value) !== null && _this$value !== void 0 ? _this$value : (_this$property = this.property) === null || _this$property === void 0 ? void 0 : _this$property.value) !== null && _ref !== void 0 ? _ref : undefined
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
        var _this$required;

        if (((_this$required = this.required) !== null && _this$required !== void 0 ? _this$required : this.property.required) && !this.clonedValue.value && this.clonedValue.value !== 0) {
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

//
var script$4 = {
  name: 'Phonefield',
  props: {
    value: {},
    label: {
      type: String
    },
    required: {
      type: Boolean
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
    var _ref, _this$value, _this$property;

    return {
      clonedValue: {
        value: (_ref = (_this$value = this.value) !== null && _this$value !== void 0 ? _this$value : (_this$property = this.property) === null || _this$property === void 0 ? void 0 : _this$property.value) !== null && _ref !== void 0 ? _ref : undefined
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

var __vue_script__$4 = script$4;
/* template */

var __vue_render__$4 = function __vue_render__() {
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

var __vue_staticRenderFns__$4 = [];
/* style */

var __vue_inject_styles__$4 = undefined;
/* scoped */

var __vue_scope_id__$4 = undefined;
/* module identifier */

var __vue_module_identifier__$4 = undefined;
/* functional template */

var __vue_is_functional_template__$4 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$4 = normalizeComponent({
  render: __vue_render__$4,
  staticRenderFns: __vue_staticRenderFns__$4
}, __vue_inject_styles__$4, __vue_script__$4, __vue_scope_id__$4, __vue_is_functional_template__$4, __vue_module_identifier__$4, false, undefined, undefined, undefined);

var script$5 = {
  name: 'SelectField',
  props: {
    value: {
      type: [String, Array, Object]
    },
    label: {
      type: String
    },
    required: {
      type: Boolean
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
      var _ref, _this$selectFrom, _this$property;

      return (_ref = (_this$selectFrom = this.selectFrom) !== null && _this$selectFrom !== void 0 ? _this$selectFrom : (_this$property = this.property) === null || _this$property === void 0 ? void 0 : _this$property.enum) !== null && _ref !== void 0 ? _ref : [];
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
      var _this$property2;

      // else treat the value as string
      if (this.value) {
        this.selected = this.value;
      } else if ((_this$property2 = this.property) === null || _this$property2 === void 0 ? void 0 : _this$property2.value) {
        this.selected = this.property.value;
      } else {
        this.selected = undefined;
      }
    }

    this.handler();
  }
};

const isOldIE = typeof navigator !== 'undefined' &&
    /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
function createInjector(context) {
    return (id, style) => addStyle(id, style);
}
let HEAD;
const styles = {};
function addStyle(id, css) {
    const group = isOldIE ? css.media || 'default' : id;
    const style = styles[group] || (styles[group] = { ids: new Set(), styles: [] });
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
            if (HEAD === undefined) {
                HEAD = document.head || document.getElementsByTagName('head')[0];
            }
            HEAD.appendChild(style.element);
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

var __vue_script__$5 = script$5;
/* template */

var __vue_render__$5 = function __vue_render__() {
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

var __vue_staticRenderFns__$5 = [];
/* style */

var __vue_inject_styles__$5 = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-02a8fcd1_0", {
    source: ".profile[data-v-02a8fcd1]{display:inline-block;margin-right:8px;border-radius:50%;height:30px;width:30px}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__$5 = "data-v-02a8fcd1";
/* module identifier */

var __vue_module_identifier__$5 = undefined;
/* functional template */

var __vue_is_functional_template__$5 = false;
/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$5 = normalizeComponent({
  render: __vue_render__$5,
  staticRenderFns: __vue_staticRenderFns__$5
}, __vue_inject_styles__$5, __vue_script__$5, __vue_scope_id__$5, __vue_is_functional_template__$5, __vue_module_identifier__$5, false, createInjector, undefined, undefined);

//
//
//
//
//
//
//
//
//
//
//
var script$6 = {
  name: 'Textareafield',
  props: {
    value: {},
    label: {
      type: String
    },
    required: {
      type: Boolean
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
    var _this$value;

    return {
      clonedValue: {
        value: (_this$value = this.value) !== null && _this$value !== void 0 ? _this$value : this.property.value
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
        var _this$required;

        if (((_this$required = this.required) !== null && _this$required !== void 0 ? _this$required : this.property.required) && !this.clonedValue.value) {
          this.clonedValue.$invalid = true;
          this.clonedValue.$error = 'required';
        } else if (this.regex && !this.clonedValue.value.test(this.regex)) {
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

var __vue_script__$6 = script$6;
/* template */

var __vue_render__$6 = function __vue_render__() {
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

var __vue_staticRenderFns__$6 = [];
/* style */

var __vue_inject_styles__$6 = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-2cd59686_0", {
    source: ".pre[data-v-2cd59686]{white-space:pre}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__$6 = "data-v-2cd59686";
/* module identifier */

var __vue_module_identifier__$6 = undefined;
/* functional template */

var __vue_is_functional_template__$6 = false;
/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$6 = normalizeComponent({
  render: __vue_render__$6,
  staticRenderFns: __vue_staticRenderFns__$6
}, __vue_inject_styles__$6, __vue_script__$6, __vue_scope_id__$6, __vue_is_functional_template__$6, __vue_module_identifier__$6, false, createInjector, undefined, undefined);

//
//
//
//
//
//
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
  name: 'Textfield',
  props: {
    value: {},
    label: {
      type: String
    },
    required: {
      type: Boolean
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
    var _ref, _this$value, _this$property;

    return {
      clonedValue: {
        value: (_ref = (_this$value = this.value) !== null && _this$value !== void 0 ? _this$value : (_this$property = this.property) === null || _this$property === void 0 ? void 0 : _this$property.value) !== null && _ref !== void 0 ? _ref : undefined
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
        var _this$required;

        if (((_this$required = this.required) !== null && _this$required !== void 0 ? _this$required : this.property.required) && !this.clonedValue.value) {
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

var __vue_staticRenderFns__$7 = [];
/* style */

var __vue_inject_styles__$7 = undefined;
/* scoped */

var __vue_scope_id__$7 = undefined;
/* module identifier */

var __vue_module_identifier__$7 = undefined;
/* functional template */

var __vue_is_functional_template__$7 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$7 = normalizeComponent({
  render: __vue_render__$7,
  staticRenderFns: __vue_staticRenderFns__$7
}, __vue_inject_styles__$7, __vue_script__$7, __vue_scope_id__$7, __vue_is_functional_template__$7, __vue_module_identifier__$7, false, undefined, undefined, undefined);

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
var script$8 = {
  name: 'FieldFor',
  mixins: [FieldMixin],
  methods: {
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
var __vue_script__$8 = script$8;
/* template */

var __vue_render__$8 = function __vue_render__() {
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

var __vue_component__$8 = normalizeComponent({
  render: __vue_render__$8,
  staticRenderFns: __vue_staticRenderFns__$8
}, __vue_inject_styles__$8, __vue_script__$8, __vue_scope_id__$8, __vue_is_functional_template__$8, __vue_module_identifier__$8, false, undefined, undefined, undefined);

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
var script$9 = {
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
var __vue_script__$9 = script$9;
/* template */

var __vue_render__$9 = function __vue_render__() {
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

var __vue_staticRenderFns__$9 = [];
/* style */

var __vue_inject_styles__$9 = undefined;
/* scoped */

var __vue_scope_id__$9 = "data-v-0549c70c";
/* module identifier */

var __vue_module_identifier__$9 = undefined;
/* functional template */

var __vue_is_functional_template__$9 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$9 = normalizeComponent({
  render: __vue_render__$9,
  staticRenderFns: __vue_staticRenderFns__$9
}, __vue_inject_styles__$9, __vue_script__$9, __vue_scope_id__$9, __vue_is_functional_template__$9, __vue_module_identifier__$9, false, undefined, undefined, undefined);

function install(Vue) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
    formFor: true
  };
  if (install.installed) return;
  install.installed = true;
  Vue.component(__vue_component__$8.name, __vue_component__$8);

  if (options.formFor) {
    Vue.component(__vue_component__$9.name, __vue_component__$9);
  }
}
var plugin = {
  install: install
};
var GlobalVue = null;

if (typeof window !== 'undefined') {
  GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
  GlobalVue = global.vue;
}

if (GlobalVue) {
  GlobalVue.use(plugin);
}

export default plugin;
export { __vue_component__$8 as FieldFor, __vue_component__$9 as FormFor, install };
