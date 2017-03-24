var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

import { each, mapValues } from 'lodash';

var defaultOptions = {
  localName: 'local'
};
var defaultFormatter = function defaultFormatter(value) {
  return value;
};

export default (function (props) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultOptions;

  var propsDefinitions = mapValues(props, function (_ref) {
    var prop = _objectWithoutProperties(_ref, []),
        formatter = _ref.formatter;

    return _extends({}, prop);
  });
  return {
    props: propsDefinitions,
    data: function data() {
      var _this = this;

      return _defineProperty({}, options.localName, _extends({}, mapValues(props, function (_ref2, propName) {
        var _ref2$formatter = _ref2.formatter,
            formatter = _ref2$formatter === undefined ? defaultFormatter : _ref2$formatter;
        return formatter(_this[propName]);
      })));
    },
    created: function created() {
      var _this2 = this;

      each(props, function (_ref4, propName) {
        var _ref4$formatter = _ref4.formatter,
            formatter = _ref4$formatter === undefined ? defaultFormatter : _ref4$formatter;

        _this2.$watch(propName, function (value) {
          _this2[options.localName][propName] = formatter(value);
        });
      });
    }
  };
});