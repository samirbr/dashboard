'use strict';

System.register([], function (_export, _context) {
  "use strict";

  return {
    setters: [],
    execute: function () {
      function script(url) {
        return new Promise(function (resolve, reject) {
          var name = url.replace(/\W+/g, '_');

          if (!document.body.querySelector('script[name="' + name + '"]')) {
            var element = document.createElement('script');
            element.name = name;
            element.onload = resolve;
            element.onerror = reject;
            element.src = url;
            document.body.appendChild(element);
          } else {
            setTimeout(resolve);
          }
        });
      }

      _export('script', script);
    }
  };
});
//# sourceMappingURL=util.js.map
