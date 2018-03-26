var _AT = _AT || {};

(function() {
  _AT.config = extend({
    // Adobe Target server URL (for admin mode)
    atServer: '',

    //Relative location of libs
    atLocation: '/cdn',

    allowedDomainRegex: '',

    checkAllowedOrigin: true
  }, _AT.config);

  var globalEventActions = {
    AT_CONNECT: 'at-connect',
    TARGET_HANDSHAKE_ACK: 'targetjsHandShakeAck',
    TARGET_HANDSHAKE: 'targetjsHandShake'
  };

  function extend() {
    var target = {},
      index;

    for (index = 0; index < arguments.length; index++) {
      var obj = arguments[index];
      for (var prop in obj) {
        target[prop] = obj[prop];
      }
    }

    return target;
  }

  function addListener(el, type, handler) {
    var eventHandler = handler;

    if (el.attachEvent) {
      eventHandler = function() {
        handler.call(el, window.event);
      };
      el.attachEvent('on'+type, handler);
    } else if (el.addEventListener) {
      el.addEventListener(type, eventHandler, false);
    }

    return eventHandler;
  }

  function removeListener(el, type, fn) {
    if (el.detachEvent) {
      el.detachEvent('on' + type, fn);
    } else {
      el.removeEventListener(type, fn, false);
    }
  }

  function loadScript(scriptURL, callback) {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = scriptURL;

    if (typeof callback === 'function')
      script.onload = callback;

    addInclude(script);
  }

  function loadCSS(cssURL, callback) {
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = cssURL;

    if (typeof callback === 'function') {
      link.onload = callback;
    }

    addInclude(link);
  }

  function addInclude(el) {
    var parent = (document.getElementsByTagName('head') || document.getElementsByTagName('body'))[0];
    parent.appendChild(el);
  }

  function isAllowedOrigin(origin) {
    return _AT.config.allowedDomainRegex && new RegExp(_AT.config.allowedDomainRegex, 'i').test(origin);
  }

  function processHandShakeAcknowledgment(event, config) {
    if (config.updatePageURL && config.pageURL.indexOf('javascript:') === -1) {
      window.location.href = config.pageURL;
    } else if (shouldAutoConnect(config)) {
      handleATConnectEvent(event, config.connectConfig);
    }
  }

  function shouldAutoConnect(config) {
    return config.autoConnect && config.connectConfig && (window.document.readyState === 'complete');
  }

  function setupLogging() {
    window.cdq.host.enableLogger(_AT.cdqConfig.isLoggerEnabled);
  }

  function connectToCDQ() {
    var _AT = window._AT;

    setupLogging();
    window.cdq.host.log('debug', 'Dependencies loaded!');
    window.cdq.host.log('debug', 'trying to connect');

    window.cdq.host.connect(_AT.connectEvent);
  }

  function loadCDQLibs() {
    loadATCSS('/adobetarget/admin');
    loadATScript('/target-vec-helper', connectToCDQ);
  }

  function loadATCSS(url, callback) {
    loadCSS('//' + _AT.config.atServer +
      _AT.config.atLocation + url + '.css', callback);
  }

  function loadATScript(url, callback) {
    loadScript('//' + _AT.config.atServer +
      _AT.config.atLocation + url + '.js', callback);
  }

  function handleWindowMessageEvent(event) {
    var origin = event.origin || '',
      message,
      _AT = window._AT;

    if (_AT.config.checkAllowedOrigin && !isAllowedOrigin(origin)) {
      return;
    }

    if (typeof event.data !== 'string')  {
      return;
    }

    try {
      message = (_AT.JSON || JSON).parse(event.data);
    } catch (err) {
      console.error('Invalid JSON in message data, ignored', err);
      return;
    }

    if (message.action === globalEventActions.TARGET_HANDSHAKE_ACK) {
      processHandShakeAcknowledgment(event, message.config);
    } else if (message.action === globalEventActions.AT_CONNECT) {
      handleATConnectEvent(event, message.config);
    }
  }

  function handleATConnectEvent(event, config) {
    var _AT = window._AT,
      key;

    // Do not do anything if already connected to client.
    if (_AT.isConnectedToClient) {
      return;
    }

    _AT.connectEvent = {};
    _AT.cdqConfig = {};

    for (key in event) {
      if (event[key]) {
        _AT.connectEvent[key] = event[key];
      }
    }

    for (key in config) {
      if ({}.hasOwnProperty.call(config, key)) {
        _AT.cdqConfig[key] = config[key];
      }
    }

    // Maintain a flag that host is connected to client.
    _AT.isConnectedToClient = true;

    loadCDQLibs();
    removeListener(window, 'message', handleWindowMessageEvent);
  }

  var frame = document.createElement('iframe');
  addListener(frame, 'load', function() {
    if (!_AT.JSON)  {
      _AT.JSON = frame.contentWindow.JSON;
    }

    document.head.removeChild(frame);
  });
  frame.style.display = 'none';
  if (document.domain !== window.location.host) {
    frame.src= "javascript:'<script>window.onload=function(){document.write(\\'<script>document.domain=\\\""
      + document.domain+"\\\";<\\\\/script>\\');document.close();};<\/script>'";
  }
  document.head.appendChild(frame);

  if (typeof _AT.eventListenerAdded == 'undefined') {
    addListener(window, 'message', handleWindowMessageEvent);
    _AT.eventListenerAdded = true;
  }

  if (window != top) {
    var jsonParser = _AT.JSON || JSON;

    if (typeof jsonParser !== 'undefined') {
      window.parent.postMessage(jsonParser.stringify({
        action: globalEventActions.TARGET_HANDSHAKE,
        pageURL: window.location.toString(),
        isAdmin: window.location.toString().indexOf('mboxEdit=1') !== -1 // send if current page is not admin
      }), '*');
    }
  }
})();
