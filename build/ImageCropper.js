"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactNativeImagePanZoom = _interopRequireDefault(require("react-native-image-pan-zoom"));

var _imageEditor = _interopRequireDefault(require("@react-native-community/image-editor"));

var _percentCalculator = require("./helpers/percentCalculator");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var window = _reactNative.Dimensions.get('window');

var w = window.width;

var ImageCropper = /*#__PURE__*/function (_PureComponent) {
  _inherits(ImageCropper, _PureComponent);

  var _super = _createSuper(ImageCropper);

  function ImageCropper() {
    var _this;

    _classCallCheck(this, ImageCropper);

    _this = _super.call(this);
    _this.state = {
      positionX: 0,
      positionY: 0,
      width: 0,
      height: 0,
      minScale: 1,
      adjustedHeight: 0,
      loading: true,
      allowNegativeScale: false,
      ratio: 1
    };

    _this.init = function () {
      var _this$props = _this.props,
          imageUri = _this$props.imageUri,
          allowNegativeScale = _this$props.allowNegativeScale;

      _this.setState({
        allowNegativeScale: allowNegativeScale
      });

      _reactNative.Image.getSize(imageUri, function (width, height) {
        var _this$props2 = _this.props,
            setCropperParams = _this$props2.setCropperParams,
            cropAreaWidth = _this$props2.cropAreaWidth,
            cropAreaHeight = _this$props2.cropAreaHeight,
            widthRatio = _this$props2.widthRatio,
            heightRatio = _this$props2.heightRatio,
            lockedCropperRatio = _this$props2.lockedCropperRatio,
            isCropping = _this$props2.isCropping;
        var actualWidth = 0;
        var actualHeight = 0;

        if (_this.props.imageWidth && _this.props.imageHeight) {
          actualWidth = _this.props.imageWidth;
          actualHeight = _this.props.imageHeight;
        } else {
          actualWidth = width;
          actualHeight = height;
        }

        var srcSize = {
          w: width,
          h: height
        };
        var fittedSize = {
          w: 0,
          h: 0
        };
        var scale = 1;

        if (actualWidth > actualHeight) {
          var _ratio = w / actualHeight;

          fittedSize.w = actualWidth * _ratio;
          fittedSize.h = w;
        } else if (actualWidth < actualHeight) {
          var _ratio2 = w / actualWidth;

          fittedSize.w = w;
          fittedSize.h = actualHeight * _ratio2;
        } else if (actualWidth === actualHeight) {
          fittedSize.w = w;
          fittedSize.h = w;
        }

        var ratio = actualWidth / actualHeight; //1 landscape, 2 portrait 0 square

        var orientation = ratio > 1 ? 1 : ratio < 1 ? 2 : 0;

        _this.setState({
          orientation: orientation
        });

        var calculatedScale = ratio;

        if (!allowNegativeScale || orientation === 0) {
          _this.setState({
            orientation: 1
          });

          if (cropAreaWidth < cropAreaHeight || cropAreaWidth === cropAreaHeight) {
            if (width < height) {
              if (fittedSize.h < cropAreaHeight) {
                scale = Math.ceil(cropAreaHeight / fittedSize.h * 10) / 10 + 0.0001;
              } else {
                scale = Math.ceil(cropAreaWidth / fittedSize.w * 10) / 10 + 0.0001;
              }
            } else {
              scale = Math.ceil(cropAreaHeight / fittedSize.h * 10) / 10 + 0.0001;
            }
          }

          calculatedScale = scale < 1 ? 1.001 : scale;
        } else if (lockedCropperRatio) {
          var croppedRatio = cropAreaWidth / cropAreaHeight;

          if (orientation === lockedCropperRatio.orientation) {
            if (croppedRatio < ratio && orientation === 1) {
              calculatedScale = 1;
            } else if (orientation === 1) {
              calculatedScale = cropAreaHeight / fittedSize.h;
            } else if (orientation === 2) {
              calculatedScale = cropAreaWidth / fittedSize.w;
            } else {
              calculatedScale = 1;
            }
          } else {
            calculatedScale = 1;
          }
        } else {
          //Portrait image
          if (ratio < 1.0) {
            var maximumHeight = heightRatio / widthRatio * actualWidth;

            if (ratio < 0.8) {
              calculatedScale = actualWidth / maximumHeight;
            }
          } //Lanscape image
          else {
              var maximumWidth = widthRatio / heightRatio * actualHeight;

              if (ratio > 1.25) {
                calculatedScale = maximumWidth / actualHeight;
              }
            }
        }

        _this.setState(function (prevState) {
          return _objectSpread({}, prevState, {
            srcSize: srcSize,
            fittedSize: fittedSize,
            minScale: calculatedScale,
            loading: false
          });
        }, function () {
          _this.imageZoom.current.centerOn({
            x: 0,
            y: 0,
            scale: isCropping ? 1 : calculatedScale,
            duration: 1
          });

          setCropperParams(_this.state);
        });
      });
    };

    _this.smartZoom = function () {
      var setCropperParams = _this.props.setCropperParams;
      var scale = 1; // If image is zoomed out -> zoom to square = 1

      if (_this.state.scale < 1) {
        scale = 1;
      } // If image is squared = 1 -> zoom out to minScale - calculated
      else if (_this.state.scale === 1) {
          scale = _this.state.minScale;
        } // If image is zoomed in > 1 -> zoom to square = 1
        else {
            scale = 1;
          }

      _this.imageZoom.current.centerOn({
        x: 0,
        y: 0,
        scale: scale
      });

      _this.setState({
        scale: scale
      }, function () {
        setCropperParams(_this.state);
      });
    };

    _this.handleMove = function (_ref) {
      var positionX = _ref.positionX,
          positionY = _ref.positionY,
          scale = _ref.scale;
      var _this$props3 = _this.props,
          setCropperParams = _this$props3.setCropperParams,
          setIsCropping = _this$props3.setIsCropping;
      setIsCropping(!!(scale === 1));

      _this.setState(function (prevState) {
        return _objectSpread({}, prevState, {
          positionX: positionX,
          positionY: positionY,
          scale: scale
        });
      }, function () {
        return setCropperParams(_this.state);
      });
    };

    _this.imageZoom = _react["default"].createRef();
    return _this;
  }

  _createClass(ImageCropper, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.init();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var imageUri = this.props.imageUri;

      if (imageUri && prevProps.imageUri !== imageUri) {
        this.init();
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$state = this.state,
          loading = _this$state.loading,
          fittedSize = _this$state.fittedSize,
          minScale = _this$state.minScale,
          allowNegativeScale = _this$state.allowNegativeScale;

      var _this$props4 = this.props,
          imageUri = _this$props4.imageUri,
          cropAreaWidth = _this$props4.cropAreaWidth,
          cropAreaHeight = _this$props4.cropAreaHeight,
          isDisabled = _this$props4.isDisabled,
          restProps = _objectWithoutProperties(_this$props4, ["imageUri", "cropAreaWidth", "cropAreaHeight", "isDisabled"]);

      var imageSrc = {
        uri: imageUri
      };
      return !loading ? /*#__PURE__*/_react["default"].createElement(_reactNativeImagePanZoom["default"], _extends({
        ref: this.imageZoom
      }, restProps, {
        cropWidth: cropAreaWidth,
        cropHeight: cropAreaHeight,
        imageWidth: fittedSize.w,
        imageHeight: fittedSize.h,
        minScale: minScale,
        enableCenterFocus: !allowNegativeScale,
        panToMove: !isDisabled,
        pinchToZoom: !isDisabled,
        onMove: isDisabled ? null : this.handleMove
      }), /*#__PURE__*/_react["default"].createElement(_reactNative.Image, {
        style: {
          width: fittedSize.w,
          height: fittedSize.h
        },
        source: imageSrc
      })) : null;
    }
  }]);

  return ImageCropper;
}(_react.PureComponent);

ImageCropper.propTypes = {
  imageUri: _propTypes["default"].string.isRequired,
  setCropperParams: _propTypes["default"].func.isRequired,
  setIsCropping: _propTypes["default"].func,
  cropAreaWidth: _propTypes["default"].number,
  cropAreaHeight: _propTypes["default"].number,
  widthRatio: _propTypes["default"].number,
  heightRatio: _propTypes["default"].number,
  allowNegativeScale: _propTypes["default"].bool,
  lockedCropperRatio: _propTypes["default"].object,
  isDisabled: _propTypes["default"].bool,
  isCropping: _propTypes["default"].bool
};
ImageCropper.defaultProps = {
  setIsCropping: function setIsCropping() {},
  cropAreaWidth: w,
  cropAreaHeight: w,
  widthRatio: 1,
  heightRatio: 1,
  allowNegativeScale: false,
  loading: false,
  isDisabled: false,
  isCropping: false
};

ImageCropper.crop = function (params) {
  var imageUri = params.imageUri,
      cropSize = params.cropSize,
      positionX = params.positionX,
      positionY = params.positionY,
      cropAreaSize = params.cropAreaSize,
      srcSize = params.srcSize,
      fittedSize = params.fittedSize,
      scale = params.scale;
  var offset = {
    x: 0,
    y: 0
  };
  var cropAreaW = cropAreaSize ? cropAreaSize.width : w;
  var cropAreaH = cropAreaSize ? cropAreaSize.height : w;
  var wScale = cropAreaW / scale;
  var hScale = cropAreaH / scale;
  var percentCropperAreaW = (0, _percentCalculator.getPercentDiffNumberFromNumber)(wScale, fittedSize.w);
  percentCropperAreaW = percentCropperAreaW > 100 ? 100 : percentCropperAreaW;
  var percentRestW = 100 - percentCropperAreaW;
  var hiddenAreaW = (0, _percentCalculator.getPercentFromNumber)(percentRestW, fittedSize.w);
  var percentCropperAreaH = (0, _percentCalculator.getPercentDiffNumberFromNumber)(hScale, fittedSize.h);
  percentCropperAreaH = percentCropperAreaH > 100 ? 100 : percentCropperAreaH;
  var percentRestH = 100 - percentCropperAreaH;
  var hiddenAreaH = (0, _percentCalculator.getPercentFromNumber)(percentRestH, fittedSize.h);
  var x = hiddenAreaW / 2 - positionX;
  var y = hiddenAreaH / 2 - positionY;
  offset.x = x <= 0 ? 0 : x;
  offset.y = y <= 0 ? 0 : y;
  var srcPercentCropperAreaW = (0, _percentCalculator.getPercentDiffNumberFromNumber)(offset.x, fittedSize.w);
  var srcPercentCropperAreaH = (0, _percentCalculator.getPercentDiffNumberFromNumber)(offset.y, fittedSize.h);
  var offsetW = (0, _percentCalculator.getPercentFromNumber)(srcPercentCropperAreaW, srcSize.w);
  var offsetH = (0, _percentCalculator.getPercentFromNumber)(srcPercentCropperAreaH, srcSize.h);
  var sizeW = (0, _percentCalculator.getPercentFromNumber)(percentCropperAreaW, srcSize.w);
  var sizeH = (0, _percentCalculator.getPercentFromNumber)(percentCropperAreaH, srcSize.h);
  offset.x = offsetW;
  offset.y = offsetH; //1 landscape, 2 portrait 0 square

  var orientation = sizeW > sizeH ? 1 : sizeH > sizeW ? 2 : 0;

  var displaySize = function displaySize() {
    var maxSize = 1000;

    if (orientation === 1 && sizeW > maxSize) {
      return {
        width: maxSize,
        height: sizeH / (sizeW / maxSize)
      };
    }

    if (orientation === 2 && sizeH > maxSize) {
      return {
        width: sizeW / (sizeH / maxSize),
        height: maxSize
      };
    }

    return {
      width: sizeW > maxSize ? maxSize : sizeW,
      height: sizeH > maxSize ? maxSize : sizeH
    };
  };

  var cropData = {
    offset: offset,
    size: {
      width: sizeW,
      height: sizeH
    },
    displaySize: displaySize()
  };
  return new Promise(function (res, rej) {
    _imageEditor["default"].cropImage(imageUri, cropData).then(function (uri) {
      return res(_objectSpread({}, cropData, {
        uri: uri
      }));
    })["catch"](rej);
  });
};

var _default = ImageCropper;
exports["default"] = _default;