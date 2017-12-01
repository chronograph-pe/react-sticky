'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _raf = require('raf');

var _raf2 = _interopRequireDefault(_raf);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Container = function (_PureComponent) {
  _inherits(Container, _PureComponent);

  function Container() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Container);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Container.__proto__ || Object.getPrototypeOf(Container)).call.apply(_ref, [this].concat(args))), _this), _this.events = ['resize', 'scroll', 'touchstart', 'touchmove', 'touchend', 'pageshow', 'load'], _this.subscribers = [], _this.subscribe = function () {
      var _this2;

      return (_this2 = _this).__subscribe__REACT_HOT_LOADER__.apply(_this2, arguments);
    }, _this.unsubscribe = function () {
      var _this3;

      return (_this3 = _this).__unsubscribe__REACT_HOT_LOADER__.apply(_this3, arguments);
    }, _this.notifySubscribers = function () {
      var _this4;

      return (_this4 = _this).__notifySubscribers__REACT_HOT_LOADER__.apply(_this4, arguments);
    }, _this.getParent = function () {
      var _this5;

      return (_this5 = _this).__getParent__REACT_HOT_LOADER__.apply(_this5, arguments);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Container, [{
    key: '__getParent__REACT_HOT_LOADER__',
    value: function __getParent__REACT_HOT_LOADER__() {
      return this.__getParent__REACT_HOT_LOADER__.apply(this, arguments);
    }
  }, {
    key: '__notifySubscribers__REACT_HOT_LOADER__',
    value: function __notifySubscribers__REACT_HOT_LOADER__() {
      return this.__notifySubscribers__REACT_HOT_LOADER__.apply(this, arguments);
    }
  }, {
    key: '__unsubscribe__REACT_HOT_LOADER__',
    value: function __unsubscribe__REACT_HOT_LOADER__() {
      return this.__unsubscribe__REACT_HOT_LOADER__.apply(this, arguments);
    }
  }, {
    key: '__subscribe__REACT_HOT_LOADER__',
    value: function __subscribe__REACT_HOT_LOADER__() {
      return this.__subscribe__REACT_HOT_LOADER__.apply(this, arguments);
    }
  }, {
    key: 'getChildContext',
    value: function getChildContext() {
      return {
        subscribe: this.subscribe,
        unsubscribe: this.unsubscribe,
        getParent: this.getParent
      };
    }
  }, {
    key: '__subscribe__REACT_HOT_LOADER__',
    value: function __subscribe__REACT_HOT_LOADER__(handler) {
      this.subscribers = this.subscribers.concat(handler);
    }
  }, {
    key: '__unsubscribe__REACT_HOT_LOADER__',
    value: function __unsubscribe__REACT_HOT_LOADER__(handler) {
      this.subscribers = this.subscribers.filter(function (current) {
        return current !== handler;
      });
    }
  }, {
    key: '__notifySubscribers__REACT_HOT_LOADER__',
    value: function __notifySubscribers__REACT_HOT_LOADER__(evt) {
      var _this6 = this;

      if (!this.framePending) {
        var currentTarget = evt.currentTarget;


        (0, _raf2.default)(function () {
          _this6.framePending = false;

          var _node$getBoundingClie = _this6.node.getBoundingClientRect(),
              top = _node$getBoundingClie.top,
              bottom = _node$getBoundingClie.bottom;

          _this6.subscribers.forEach(function (handler) {
            return handler({
              distanceFromTop: top,
              distanceFromBottom: bottom,
              eventSource: currentTarget === window ? document.body : _this6.node
            });
          });
        });
        this.framePending = true;
      }
    }
  }, {
    key: '__getParent__REACT_HOT_LOADER__',
    value: function __getParent__REACT_HOT_LOADER__() {
      return this.node;
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this7 = this;

      this.events.forEach(function (event) {
        return window.addEventListener(event, _this7.notifySubscribers);
      });
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      var _this8 = this;

      this.events.forEach(function (event) {
        return window.removeEventListener(event, _this8.notifySubscribers);
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this9 = this;

      return _react2.default.createElement('div', _extends({}, this.props, {
        ref: function ref(node) {
          return _this9.node = node;
        },
        onScroll: this.notifySubscribers,
        onTouchStart: this.notifySubscribers,
        onTouchMove: this.notifySubscribers,
        onTouchEnd: this.notifySubscribers
      }));
    }
  }]);

  return Container;
}(_react.PureComponent);

Container.childContextTypes = {
  subscribe: _propTypes2.default.func,
  unsubscribe: _propTypes2.default.func,
  getParent: _propTypes2.default.func
};
var _default = Container;
exports.default = _default;
;

var _temp2 = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(Container, 'Container', 'src/Container.js');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/Container.js');
}();

;