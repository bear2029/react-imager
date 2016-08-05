module.exports = {
  process: function(src, filename) {
    // Disable coverage for webpack import
    return require('babel-jest').process(src, filename)
      .replace(/(function _interop)/g, '/* istanbul ignore next */ $1')
      .replace(/(function _inherits)/g, '/* istanbul ignore next */ $1')
      .replace(/(function _classCallCheck)/g, '/* istanbul ignore next */ $1')
      .replace(/(function _possibleConstructorReturn)/g, '/* istanbul ignore next */ $1')
      .replace(/(var _createClass = function)/g, '/* istanbul ignore next */ $1')
      .replace(/(var _extends)/g, '/* istanbul ignore next */ $1')
  }
}
