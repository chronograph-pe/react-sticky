'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Sticky = function (_Component) {
  _inherits(Sticky, _Component);

  function Sticky() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Sticky);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Sticky.__proto__ || Object.getPrototypeOf(Sticky)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      isSticky: false,
      wasSticky: false,
      style: {}
    }, _this.handleContainerEvent = function () {
      var _this2;

      return (_this2 = _this).__handleContainerEvent__REACT_HOT_LOADER__.apply(_this2, arguments);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Sticky, [{
    key: '__handleContainerEvent__REACT_HOT_LOADER__',
    value: function __handleContainerEvent__REACT_HOT_LOADER__() {
      return this.__handleContainerEvent__REACT_HOT_LOADER__.apply(this, arguments);
    }
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      if (!this.context.subscribe) throw new TypeError("Expected Sticky to be mounted within StickyContainer");

      this.context.subscribe(this.handleContainerEvent);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.context.unsubscribe(this.handleContainerEvent);
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this.placeholder.style.paddingBottom = this.props.disableCompensation ? 0 : (this.state.isSticky ? this.state.calculatedHeight : 0) + 'px';
    }
  }, {
    key: '__handleContainerEvent__REACT_HOT_LOADER__',
    value: function __handleContainerEvent__REACT_HOT_LOADER__(_ref2) {
      var distanceFromTop = _ref2.distanceFromTop,
          distanceFromBottom = _ref2.distanceFromBottom,
          eventSource = _ref2.eventSource;

      var parent = this.context.getParent();

      var preventingStickyStateChanges = false;
      if (this.props.relative) {
        preventingStickyStateChanges = eventSource !== parent;
        distanceFromTop = -(eventSource.scrollTop + eventSource.offsetTop) + this.placeholder.offsetTop;
      }

      var placeholderClientRect = this.placeholder.getBoundingClientRect();
      var contentClientRect = this.content.getBoundingClientRect();
      var calculatedHeight = contentClientRect.height;

      var bottomDifference = distanceFromBottom - this.props.bottomOffset - calculatedHeight;

      var wasSticky = !!this.state.isSticky;
      var isSticky = preventingStickyStateChanges ? wasSticky : distanceFromTop <= -this.props.topOffset && distanceFromBottom > -this.props.bottomOffset;

      distanceFromBottom = (this.props.relative ? parent.scrollHeight - parent.scrollTop : distanceFromBottom) - calculatedHeight;

      var style = !isSticky ? {} : {
        position: 'fixed',
        top: bottomDifference > 0 ? this.props.relative ? parent.offsetTop - parent.offsetParent.scrollTop : 0 : bottomDifference,
        left: placeholderClientRect.left,
        width: placeholderClientRect.width
      };

      if (!this.props.disableHardwareAcceleration) {
        style.transform = 'translateZ(0)';
      }

      this.setState({
        isSticky: isSticky,
        wasSticky: wasSticky,
        distanceFromTop: distanceFromTop,
        distanceFromBottom: distanceFromBottom,
        calculatedHeight: calculatedHeight,
        style: style
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var element = _react2.default.cloneElement(this.props.children({
        isSticky: this.state.isSticky,
        wasSticky: this.state.wasSticky,
        distanceFromTop: this.state.distanceFromTop,
        distanceFromBottom: this.state.distanceFromBottom,
        calculatedHeight: this.state.calculatedHeight,
        style: this.state.style
      }), { ref: function ref(content) {
          _this3.content = _reactDom2.default.findDOMNode(content);
        } });

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement('div', { ref: function ref(placeholder) {
            return _this3.placeholder = placeholder;
          } }),
        element
      );
    }
  }]);

  return Sticky;
}(_react.Component);

Sticky.propTypes = {
  topOffset: _propTypes2.default.number,
  bottomOffset: _propTypes2.default.number,
  relative: _propTypes2.default.bool,
  children: _propTypes2.default.func.isRequired
};
Sticky.defaultProps = {
  relative: false,
  topOffset: 0,
  bottomOffset: 0,
  disableCompensation: false,
  disableHardwareAcceleration: false
};
Sticky.contextTypes = {
  subscribe: _propTypes2.default.func,
  unsubscribe: _propTypes2.default.func,
  getParent: _propTypes2.default.func
};
var _default = Sticky;
exports.default = _default;
;

var _temp2 = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(Sticky, 'Sticky', 'src/Sticky.js');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/Sticky.js');
}();

;