define('app',["exports"], function (_exports) {
  "use strict";

  _exports.__esModule = true;
  _exports.App = void 0;

  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

  function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

  var App = /*#__PURE__*/function () {
    function App() {
      this.repos = [];
      this.getRepos();
    }

    var _proto = App.prototype;

    _proto.getRepos = function getRepos() {
      var _this = this;

      require(["node-fetch"], /*#__PURE__*/function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(fetch) {
          var req, res, result;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return fetch("https://api.github.com/users/mWalrus/repos");

                case 2:
                  req = _context.sent;
                  _context.next = 5;
                  return req.json();

                case 5:
                  res = _context.sent;
                  result = res.map(function (repo) {
                    return {
                      name: repo.name.replace(/-/g, " "),
                      description: repo.description,
                      html_url: repo.html_url,
                      language: repo.language,
                      languageLower: repo.language.toLowerCase() // release: await this.getLatest(repo.name, fetch),

                    };
                  });
                  _this.repos = result;

                case 8:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        }));

        return function (_x) {
          return _ref.apply(this, arguments);
        };
      }());
    };

    return App;
  }();

  _exports.App = App;
});;
define('text!app.html',[],function(){return "<template>\n  <header>\n    <h1>mWalrus' Homepage</h1>\n    <p>\n      Feel free to bookmark this page to keep up to date with my projects\n      &colon;&rpar;\n    </p>\n  </header>\n  <div class=\"main\">\n    <div class=\"repos\">\n      <h1 class=\"section-title\">Repos</h1>\n      <a repeat.for=\"repo of repos\" href=\"${repo.html_url}\" class=\"repo\">\n        <h3 class=\"repo-title\">${repo.name}</h3>\n        <p class=\"desc\">${repo.description}</p>\n        <p class=\"language ${repo.languageLower}\">${repo.language}</p>\n      </a>\n    </div>\n  </div>\n</template>\n";});;
define('text!css/main.css',[],function(){return "@import url(\"https://fonts.googleapis.com/css2?family=Bungee&display=swap\");\n@import url(\"https://fonts.googleapis.com/css2?family=Pragati+Narrow:wght@400;700&display=swap\");\nbody {\n  margin: 0;\n  padding: 0;\n  background-color: #1d201f;\n  color: #fffffa;\n  font-family: \"Pragati Narrow\", sans-serif;\n}\nbody header {\n  background-color: #9381ff;\n  text-align: center;\n  padding: 3rem;\n}\nbody header h1 {\n  margin: 0;\n  font-family: \"Bungee\", cursive;\n  font-size: 2.5rem;\n}\nbody header p {\n  font-size: 1.2rem;\n  margin: 0;\n}\nbody .main .repos {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  width: 50%;\n  row-gap: 3rem;\n  justify-items: center;\n  margin: auto;\n  margin-top: 2rem;\n}\nbody .main .repos .section-title {\n  font-family: \"Bungee\", cursive;\n  grid-column: 1/4;\n  margin: 0;\n}\nbody .main .repos .repo {\n  width: 80%;\n  border: 2px solid #6247aa;\n  color: #fffffa;\n  border-radius: 1rem;\n  text-decoration: none;\n  position: relative;\n}\nbody .main .repos .repo * {\n  margin: 0;\n  padding: 0 1rem;\n}\nbody .main .repos .repo h3 {\n  background-color: #6247aa;\n  border-top-right-radius: 0.8rem;\n  border-top-left-radius: 0.8rem;\n}\nbody .main .repos .repo .desc {\n  padding: 1rem 1rem 2rem 1rem;\n}\nbody .main .repos .repo .language {\n  position: absolute;\n  bottom: 0;\n  left: 1.2rem;\n}\nbody .main .repos .repo .language::before {\n  content: \" \";\n  position: absolute;\n  left: -0.2rem;\n  width: 1rem;\n  height: 1rem;\n  top: calc(50% - 0.5rem);\n  border-radius: 50%;\n  background-color: #fff;\n}\nbody .main .repos .repo .javascript::before {\n  background-color: #fc6471;\n}\nbody .main .repos .repo .html::before {\n  background-color: #fc9f5b;\n}\nbody .main .repos .repo .java::before {\n  background-color: #16bac5;\n}\nbody .main .repos .repo:hover {\n  animation: 0.1s bgFade forwards;\n}\n\n@keyframes bgFade {\n  100% {\n    background-color: #6247aa;\n  }\n}";});;
define('environment',["exports"], function (_exports) {
  "use strict";

  _exports.__esModule = true;
  _exports.default = void 0;
  var _default = {
    debug: true,
    testing: true
  };
  _exports.default = _default;
});;
define('main',["exports", "regenerator-runtime/runtime", "./environment"], function (_exports, _runtime, _environment) {
  "use strict";

  _exports.__esModule = true;
  _exports.configure = configure;
  _environment = _interopRequireDefault(_environment);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  // regenerator-runtime is to support async/await syntax in ESNext.
  // If you target latest browsers (have native support), or don't use async/await, you can remove regenerator-runtime.
  function configure(aurelia) {
    aurelia.use.standardConfiguration().feature('resources');
    aurelia.use.developmentLogging(_environment.default.debug ? 'debug' : 'warn');

    if (_environment.default.testing) {
      aurelia.use.plugin('aurelia-testing');
    }

    aurelia.start().then(function () {
      return aurelia.setRoot();
    });
  }
});;
define('resources/index',["exports"], function (_exports) {
  "use strict";

  _exports.__esModule = true;
  _exports.configure = configure;

  function configure(config) {//config.globalResources([]);
  }
});;
define('resources',['resources/index'],function(m){return m;});
//# sourceMappingURL=app-bundle.js.map