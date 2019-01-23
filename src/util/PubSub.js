/* eslint-disable */
/**
 * Created by yi.dai on 2018/8/31.
 */
(function() {
  // underscore 源码，获取root对象
  const root = typeof self === 'object' && self.self === self && self
        || typeof global === 'object' && global.global === global && global
        || this || {};

  // Save the previous value of the `event` variable.
  const previousEvent = root._event;

  const event = {};
  const eventMap = {};
  event.on = function() {
    const args = Array.prototype.slice.call(arguments);
    if (args[0] === void 0) {
      console.error('_event must have a eventName for first argument');
      return;
    }
    // 这里做个args[1] 是什么类型的校验
    // 假设我们拿到了第二个参数，且参数有效
    eventMap[args[0]] = args[1];
  };

  event.fire = function(eventName) {
    for (const key in eventMap) {
      if (key === eventName && eventMap[key]) {
        eventMap[key]();
      }
    }
  };

  // 原先的_event对象
  _event.noConflict = function() {
    root._event = previousEvent;
    return this;
  };

  // 暴露event对象
  if (typeof exports !== 'undefined' && !exports.nodeType) {
    if (typeof module !== 'undefined' && !module.nodeType && module.exports) {
      exports = module.exports = event;
    }
    exports._event = event;
  } else {
    root._event = event;
  }
}());

// sample
_event.on('you.click', () => { console.log('test click'); });
_event.fire('you.click');
