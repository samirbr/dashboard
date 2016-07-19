/* */ 
"format cjs";
(function(window, factory) {
  'use strict';
  if (typeof define == 'function' && define.amd) {
    define(['ev-emitter/ev-emitter', 'get-size/get-size', 'fizzy-ui-utils/utils', './item'], function(EvEmitter, getSize, utils, Item) {
      return factory(window, EvEmitter, getSize, utils, Item);
    });
  } else if (typeof module == 'object' && module.exports) {
    module.exports = factory(window, require('ev-emitter'), require('get-size'), require('fizzy-ui-utils'), require('./item'));
  } else {
    window.Outlayer = factory(window, window.EvEmitter, window.getSize, window.fizzyUIUtils, window.Outlayer.Item);
  }
}(window, function factory(window, EvEmitter, getSize, utils, Item) {
  'use strict';
  var console = window.console;
  var jQuery = window.jQuery;
  var noop = function() {};
  var GUID = 0;
  var instances = {};
  function Outlayer(element, options) {
    var queryElement = utils.getQueryElement(element);
    if (!queryElement) {
      if (console) {
        console.error('Bad element for ' + this.constructor.namespace + ': ' + (queryElement || element));
      }
      return;
    }
    this.element = queryElement;
    if (jQuery) {
      this.$element = jQuery(this.element);
    }
    this.options = utils.extend({}, this.constructor.defaults);
    this.option(options);
    var id = ++GUID;
    this.element.outlayerGUID = id;
    instances[id] = this;
    this._create();
    var isInitLayout = this._getOption('initLayout');
    if (isInitLayout) {
      this.layout();
    }
  }
  Outlayer.namespace = 'outlayer';
  Outlayer.Item = Item;
  Outlayer.defaults = {
    containerStyle: {position: 'relative'},
    initLayout: true,
    originLeft: true,
    originTop: true,
    resize: true,
    resizeContainer: true,
    transitionDuration: '0.4s',
    hiddenStyle: {
      opacity: 0,
      transform: 'scale(0.001)'
    },
    visibleStyle: {
      opacity: 1,
      transform: 'scale(1)'
    }
  };
  var proto = Outlayer.prototype;
  utils.extend(proto, EvEmitter.prototype);
  proto.option = function(opts) {
    utils.extend(this.options, opts);
  };
  proto._getOption = function(option) {
    var oldOption = this.constructor.compatOptions[option];
    return oldOption && this.options[oldOption] !== undefined ? this.options[oldOption] : this.options[option];
  };
  Outlayer.compatOptions = {
    initLayout: 'isInitLayout',
    horizontal: 'isHorizontal',
    layoutInstant: 'isLayoutInstant',
    originLeft: 'isOriginLeft',
    originTop: 'isOriginTop',
    resize: 'isResizeBound',
    resizeContainer: 'isResizingContainer'
  };
  proto._create = function() {
    this.reloadItems();
    this.stamps = [];
    this.stamp(this.options.stamp);
    utils.extend(this.element.style, this.options.containerStyle);
    var canBindResize = this._getOption('resize');
    if (canBindResize) {
      this.bindResize();
    }
  };
  proto.reloadItems = function() {
    this.items = this._itemize(this.element.children);
  };
  proto._itemize = function(elems) {
    var itemElems = this._filterFindItemElements(elems);
    var Item = this.constructor.Item;
    var items = [];
    for (var i = 0; i < itemElems.length; i++) {
      var elem = itemElems[i];
      var item = new Item(elem, this);
      items.push(item);
    }
    return items;
  };
  proto._filterFindItemElements = function(elems) {
    return utils.filterFindElements(elems, this.options.itemSelector);
  };
  proto.getItemElements = function() {
    return this.items.map(function(item) {
      return item.element;
    });
  };
  proto.layout = function() {
    this._resetLayout();
    this._manageStamps();
    var layoutInstant = this._getOption('layoutInstant');
    var isInstant = layoutInstant !== undefined ? layoutInstant : !this._isLayoutInited;
    this.layoutItems(this.items, isInstant);
    this._isLayoutInited = true;
  };
  proto._init = proto.layout;
  proto._resetLayout = function() {
    this.getSize();
  };
  proto.getSize = function() {
    this.size = getSize(this.element);
  };
  proto._getMeasurement = function(measurement, size) {
    var option = this.options[measurement];
    var elem;
    if (!option) {
      this[measurement] = 0;
    } else {
      if (typeof option == 'string') {
        elem = this.element.querySelector(option);
      } else if (option instanceof HTMLElement) {
        elem = option;
      }
      this[measurement] = elem ? getSize(elem)[size] : option;
    }
  };
  proto.layoutItems = function(items, isInstant) {
    items = this._getItemsForLayout(items);
    this._layoutItems(items, isInstant);
    this._postLayout();
  };
  proto._getItemsForLayout = function(items) {
    return items.filter(function(item) {
      return !item.isIgnored;
    });
  };
  proto._layoutItems = function(items, isInstant) {
    this._emitCompleteOnItems('layout', items);
    if (!items || !items.length) {
      return;
    }
    var queue = [];
    items.forEach(function(item) {
      var position = this._getItemLayoutPosition(item);
      position.item = item;
      position.isInstant = isInstant || item.isLayoutInstant;
      queue.push(position);
    }, this);
    this._processLayoutQueue(queue);
  };
  proto._getItemLayoutPosition = function() {
    return {
      x: 0,
      y: 0
    };
  };
  proto._processLayoutQueue = function(queue) {
    this.updateStagger();
    queue.forEach(function(obj, i) {
      this._positionItem(obj.item, obj.x, obj.y, obj.isInstant, i);
    }, this);
  };
  proto.updateStagger = function() {
    var stagger = this.options.stagger;
    if (stagger === null || stagger === undefined) {
      this.stagger = 0;
      return;
    }
    this.stagger = getMilliseconds(stagger);
    return this.stagger;
  };
  proto._positionItem = function(item, x, y, isInstant, i) {
    if (isInstant) {
      item.goTo(x, y);
    } else {
      item.stagger(i * this.stagger);
      item.moveTo(x, y);
    }
  };
  proto._postLayout = function() {
    this.resizeContainer();
  };
  proto.resizeContainer = function() {
    var isResizingContainer = this._getOption('resizeContainer');
    if (!isResizingContainer) {
      return;
    }
    var size = this._getContainerSize();
    if (size) {
      this._setContainerMeasure(size.width, true);
      this._setContainerMeasure(size.height, false);
    }
  };
  proto._getContainerSize = noop;
  proto._setContainerMeasure = function(measure, isWidth) {
    if (measure === undefined) {
      return;
    }
    var elemSize = this.size;
    if (elemSize.isBorderBox) {
      measure += isWidth ? elemSize.paddingLeft + elemSize.paddingRight + elemSize.borderLeftWidth + elemSize.borderRightWidth : elemSize.paddingBottom + elemSize.paddingTop + elemSize.borderTopWidth + elemSize.borderBottomWidth;
    }
    measure = Math.max(measure, 0);
    this.element.style[isWidth ? 'width' : 'height'] = measure + 'px';
  };
  proto._emitCompleteOnItems = function(eventName, items) {
    var _this = this;
    function onComplete() {
      _this.dispatchEvent(eventName + 'Complete', null, [items]);
    }
    var count = items.length;
    if (!items || !count) {
      onComplete();
      return;
    }
    var doneCount = 0;
    function tick() {
      doneCount++;
      if (doneCount == count) {
        onComplete();
      }
    }
    items.forEach(function(item) {
      item.once(eventName, tick);
    });
  };
  proto.dispatchEvent = function(type, event, args) {
    var emitArgs = event ? [event].concat(args) : args;
    this.emitEvent(type, emitArgs);
    if (jQuery) {
      this.$element = this.$element || jQuery(this.element);
      if (event) {
        var $event = jQuery.Event(event);
        $event.type = type;
        this.$element.trigger($event, args);
      } else {
        this.$element.trigger(type, args);
      }
    }
  };
  proto.ignore = function(elem) {
    var item = this.getItem(elem);
    if (item) {
      item.isIgnored = true;
    }
  };
  proto.unignore = function(elem) {
    var item = this.getItem(elem);
    if (item) {
      delete item.isIgnored;
    }
  };
  proto.stamp = function(elems) {
    elems = this._find(elems);
    if (!elems) {
      return;
    }
    this.stamps = this.stamps.concat(elems);
    elems.forEach(this.ignore, this);
  };
  proto.unstamp = function(elems) {
    elems = this._find(elems);
    if (!elems) {
      return;
    }
    elems.forEach(function(elem) {
      utils.removeFrom(this.stamps, elem);
      this.unignore(elem);
    }, this);
  };
  proto._find = function(elems) {
    if (!elems) {
      return;
    }
    if (typeof elems == 'string') {
      elems = this.element.querySelectorAll(elems);
    }
    elems = utils.makeArray(elems);
    return elems;
  };
  proto._manageStamps = function() {
    if (!this.stamps || !this.stamps.length) {
      return;
    }
    this._getBoundingRect();
    this.stamps.forEach(this._manageStamp, this);
  };
  proto._getBoundingRect = function() {
    var boundingRect = this.element.getBoundingClientRect();
    var size = this.size;
    this._boundingRect = {
      left: boundingRect.left + size.paddingLeft + size.borderLeftWidth,
      top: boundingRect.top + size.paddingTop + size.borderTopWidth,
      right: boundingRect.right - (size.paddingRight + size.borderRightWidth),
      bottom: boundingRect.bottom - (size.paddingBottom + size.borderBottomWidth)
    };
  };
  proto._manageStamp = noop;
  proto._getElementOffset = function(elem) {
    var boundingRect = elem.getBoundingClientRect();
    var thisRect = this._boundingRect;
    var size = getSize(elem);
    var offset = {
      left: boundingRect.left - thisRect.left - size.marginLeft,
      top: boundingRect.top - thisRect.top - size.marginTop,
      right: thisRect.right - boundingRect.right - size.marginRight,
      bottom: thisRect.bottom - boundingRect.bottom - size.marginBottom
    };
    return offset;
  };
  proto.handleEvent = utils.handleEvent;
  proto.bindResize = function() {
    window.addEventListener('resize', this);
    this.isResizeBound = true;
  };
  proto.unbindResize = function() {
    window.removeEventListener('resize', this);
    this.isResizeBound = false;
  };
  proto.onresize = function() {
    this.resize();
  };
  utils.debounceMethod(Outlayer, 'onresize', 100);
  proto.resize = function() {
    if (!this.isResizeBound || !this.needsResizeLayout()) {
      return;
    }
    this.layout();
  };
  proto.needsResizeLayout = function() {
    var size = getSize(this.element);
    var hasSizes = this.size && size;
    return hasSizes && size.innerWidth !== this.size.innerWidth;
  };
  proto.addItems = function(elems) {
    var items = this._itemize(elems);
    if (items.length) {
      this.items = this.items.concat(items);
    }
    return items;
  };
  proto.appended = function(elems) {
    var items = this.addItems(elems);
    if (!items.length) {
      return;
    }
    this.layoutItems(items, true);
    this.reveal(items);
  };
  proto.prepended = function(elems) {
    var items = this._itemize(elems);
    if (!items.length) {
      return;
    }
    var previousItems = this.items.slice(0);
    this.items = items.concat(previousItems);
    this._resetLayout();
    this._manageStamps();
    this.layoutItems(items, true);
    this.reveal(items);
    this.layoutItems(previousItems);
  };
  proto.reveal = function(items) {
    this._emitCompleteOnItems('reveal', items);
    if (!items || !items.length) {
      return;
    }
    var stagger = this.updateStagger();
    items.forEach(function(item, i) {
      item.stagger(i * stagger);
      item.reveal();
    });
  };
  proto.hide = function(items) {
    this._emitCompleteOnItems('hide', items);
    if (!items || !items.length) {
      return;
    }
    var stagger = this.updateStagger();
    items.forEach(function(item, i) {
      item.stagger(i * stagger);
      item.hide();
    });
  };
  proto.revealItemElements = function(elems) {
    var items = this.getItems(elems);
    this.reveal(items);
  };
  proto.hideItemElements = function(elems) {
    var items = this.getItems(elems);
    this.hide(items);
  };
  proto.getItem = function(elem) {
    for (var i = 0; i < this.items.length; i++) {
      var item = this.items[i];
      if (item.element == elem) {
        return item;
      }
    }
  };
  proto.getItems = function(elems) {
    elems = utils.makeArray(elems);
    var items = [];
    elems.forEach(function(elem) {
      var item = this.getItem(elem);
      if (item) {
        items.push(item);
      }
    }, this);
    return items;
  };
  proto.remove = function(elems) {
    var removeItems = this.getItems(elems);
    this._emitCompleteOnItems('remove', removeItems);
    if (!removeItems || !removeItems.length) {
      return;
    }
    removeItems.forEach(function(item) {
      item.remove();
      utils.removeFrom(this.items, item);
    }, this);
  };
  proto.destroy = function() {
    var style = this.element.style;
    style.height = '';
    style.position = '';
    style.width = '';
    this.items.forEach(function(item) {
      item.destroy();
    });
    this.unbindResize();
    var id = this.element.outlayerGUID;
    delete instances[id];
    delete this.element.outlayerGUID;
    if (jQuery) {
      jQuery.removeData(this.element, this.constructor.namespace);
    }
  };
  Outlayer.data = function(elem) {
    elem = utils.getQueryElement(elem);
    var id = elem && elem.outlayerGUID;
    return id && instances[id];
  };
  Outlayer.create = function(namespace, options) {
    var Layout = subclass(Outlayer);
    Layout.defaults = utils.extend({}, Outlayer.defaults);
    utils.extend(Layout.defaults, options);
    Layout.compatOptions = utils.extend({}, Outlayer.compatOptions);
    Layout.namespace = namespace;
    Layout.data = Outlayer.data;
    Layout.Item = subclass(Item);
    utils.htmlInit(Layout, namespace);
    if (jQuery && jQuery.bridget) {
      jQuery.bridget(namespace, Layout);
    }
    return Layout;
  };
  function subclass(Parent) {
    function SubClass() {
      Parent.apply(this, arguments);
    }
    SubClass.prototype = Object.create(Parent.prototype);
    SubClass.prototype.constructor = SubClass;
    return SubClass;
  }
  var msUnits = {
    ms: 1,
    s: 1000
  };
  function getMilliseconds(time) {
    if (typeof time == 'number') {
      return time;
    }
    var matches = time.match(/(^\d*\.?\d*)(\w*)/);
    var num = matches && matches[1];
    var unit = matches && matches[2];
    if (!num.length) {
      return 0;
    }
    num = parseFloat(num);
    var mult = msUnits[unit] || 1;
    return num * mult;
  }
  Outlayer.Item = Item;
  return Outlayer;
}));
