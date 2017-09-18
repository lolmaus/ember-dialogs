'use strict';

define('dummy/tests/acceptance/index-test', ['qunit', 'ember-cli-chai/qunit', 'dummy/tests/helpers/module-for-acceptance', 'dummy/tests/pages/index'], function (_qunit, _qunit2, _moduleForAcceptance, _index) {
  'use strict';

  function _asyncToGenerator(fn) {
    return function () {
      var gen = fn.apply(this, arguments);
      return new Promise(function (resolve, reject) {
        function step(key, arg) {
          try {
            var info = gen[key](arg);
            var value = info.value;
          } catch (error) {
            reject(error);
            return;
          }

          if (info.done) {
            resolve(value);
          } else {
            return Promise.resolve(value).then(function (value) {
              step("next", value);
            }, function (err) {
              step("throw", err);
            });
          }
        }

        return step("next");
      });
    };
  }

  (0, _moduleForAcceptance.default)('Acceptance | index');

  var m = void 0;

  (0, _qunit.test)('initial state', (0, _qunit2.withChai)(function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(expect) {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return visit('/');

            case 2:

              m = "backdrop existence";
              expect(_index.default.backdrop.exists, m).false;

              m = "dialog existence";
              expect(_index.default.dialog.exists, m).false;

            case 6:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }()));

  (0, _qunit.test)('prompt', (0, _qunit2.withChai)(function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(expect) {
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return visit('/');

            case 2:
              _context2.next = 4;
              return _index.default.promptTrigger.click();

            case 4:

              m = "#0 Initial: value";
              expect(_index.default.alertValue.text, m).equal("false");

              m = "#0 Initial: backdrop visibility";
              expect(_index.default.backdrop.visible, m).true;

              m = "#0 Initial: dialog visibility";
              expect(_index.default.dialog.visible, m).true;

              m = "#0 Initial: message text";
              expect(_index.default.dialog.message.text, m).equal("Type in a new value");

              m = "#0 Initial: input value";
              expect(_index.default.dialog.input.value, m).equal("foo");

              m = "#0 Initial: input placeholder";
              expect(_index.default.dialog.input.placeholder, m).equal("Please type something");

              m = "#0 Initial: ok button text";
              expect(_index.default.dialog.buttonOk.text, m).equal("Yup");

              m = "#0 Initial: cancel button text";
              expect(_index.default.dialog.buttonCancel.text, m).equal("Nah");

              _context2.next = 22;
              return _index.default.dialog.input.fill('bar');

            case 22:
              _context2.next = 24;
              return _index.default.dialog.buttonOk.click();

            case 24:

              m = "#1 After click on OK: value";
              expect(_index.default.promptValue.text, m).equal("bar");

              m = "#1 After click on OK: backdrop visibility";
              expect(_index.default.backdrop.visible, m).false;

              m = "#1 After click on OK: dialog visibility";
              expect(_index.default.dialog.visible, m).false;

            case 30:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    return function (_x2) {
      return _ref2.apply(this, arguments);
    };
  }()));
});
define('dummy/tests/app.lint-test', [], function () {
  'use strict';

  QUnit.module('ESLint | app');

  QUnit.test('app.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'app.js should pass ESLint\n\n');
  });

  QUnit.test('controllers/index.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/index.js should pass ESLint\n\n');
  });

  QUnit.test('resolver.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'resolver.js should pass ESLint\n\n');
  });

  QUnit.test('router.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'router.js should pass ESLint\n\n');
  });

  QUnit.test('transitions.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'transitions.js should pass ESLint\n\n');
  });
});
define('dummy/tests/helpers/destroy-app', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = destroyApp;
  var run = Ember.run;
  function destroyApp(application) {
    run(application, 'destroy');
  }
});
define('dummy/tests/helpers/module-for-acceptance', ['exports', 'qunit', 'dummy/tests/helpers/start-app', 'dummy/tests/helpers/destroy-app'], function (exports, _qunit, _startApp, _destroyApp) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  exports.default = function (name) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    (0, _qunit.module)(name, {
      beforeEach: function beforeEach() {
        this.application = (0, _startApp.default)();

        if (options.beforeEach) {
          return options.beforeEach.apply(this, arguments);
        }
      },
      afterEach: function afterEach() {
        var _this = this;

        var afterEach = options.afterEach && options.afterEach.apply(this, arguments);
        return resolve(afterEach).then(function () {
          return (0, _destroyApp.default)(_this.application);
        });
      }
    });
  };

  var resolve = Ember.RSVP.resolve;
});
define('dummy/tests/helpers/resolver', ['exports', 'dummy/resolver', 'dummy/config/environment'], function (exports, _resolver, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var resolver = _resolver.default.create();

  resolver.namespace = {
    modulePrefix: _environment.default.modulePrefix,
    podModulePrefix: _environment.default.podModulePrefix
  };

  exports.default = resolver;
});
define('dummy/tests/helpers/start-app', ['exports', 'dummy/app', 'dummy/config/environment'], function (exports, _app, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = startApp;
  var merge = Ember.merge;
  var run = Ember.run;
  function startApp(attrs) {
    var attributes = merge({}, _environment.default.APP);
    attributes = merge(attributes, attrs); // use defaults, but you can override;

    return run(function () {
      var application = _app.default.create(attributes);
      application.setupForTesting();
      application.injectTestHelpers();
      return application;
    });
  }
});
define('dummy/tests/integration/components/ember-dialogs-test', ['ember-qunit', 'ember-cli-chai/qunit', 'ember-cli-page-object', 'dummy/tests/pages/components/dialogs', 'ember-test-helpers/wait'], function (_emberQunit, _qunit, _emberCliPageObject, _dialogs, _wait) {
  'use strict';

  function _asyncToGenerator(fn) {
    return function () {
      var gen = fn.apply(this, arguments);
      return new Promise(function (resolve, reject) {
        function step(key, arg) {
          try {
            var info = gen[key](arg);
            var value = info.value;
          } catch (error) {
            reject(error);
            return;
          }

          if (info.done) {
            resolve(value);
          } else {
            return Promise.resolve(value).then(function (value) {
              step("next", value);
            }, function (err) {
              step("throw", err);
            });
          }
        }

        return step("next");
      });
    };
  }

  var $ = Ember.$;
  var run = Ember.run;


  var page = (0, _emberCliPageObject.create)(_dialogs.alert);
  var dialogs = void 0,
      m = void 0;

  (0, _emberQunit.moduleForComponent)('ember-dialogs', 'Integration | Component | ember dialogs', {
    integration: true,
    beforeEach: function beforeEach() {
      page.setContext(this);
      this.inject.service('dialogs');
      dialogs = this.get('dialogs');
    },
    afterEach: function afterEach() {
      page.removeContext();
      $('body').removeClass('-ember-dialogs-block-scrolling');
    }
  });

  (0, _emberQunit.test)('alert, most basic features', (0, _qunit.withChai)(function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(expect) {
      var value;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              this.render(Ember.HTMLBars.template({
                "id": "xIZPKiBp",
                "block": "{\"symbols\":[],\"statements\":[[1,[18,\"ember-dialogs\"],false]],\"hasEval\":false}",
                "meta": {}
              }));

              value = false;


              m = '#0 Initial: dialog existence';
              expect($('.ember-dialogs-dialog'), m).length(0);

              m = '#0 Initial: backdrop existence';
              expect($('.ember-dialogs-backdrop'), m).length(0);

              m = '#0 Initial: body hasClass -ember-dialogs-block-scrolling';
              expect($('body').hasClass('-ember-dialogs-block-scrolling'), m).false;

              run(function () {
                dialogs.alert({
                  message: 'lol',
                  actionOk: function actionOk() {
                    value = true;
                  }
                });
              });

              _context.next = 11;
              return (0, _wait.default)();

            case 11:

              m = '#1 After triggering dialog: dialog existence';
              expect($('.ember-dialogs-dialog'), m).length(1);

              m = '#1 After triggering dialog: backdrop existence';
              expect($('.ember-dialogs-backdrop'), m).length(1);

              m = '#1 After triggering dialog: message text';
              expect($('.ember-dialogs-dialog-message').text().trim(), m).equal('lol');

              m = '#1 After triggering dialog: button text';
              expect($('.ember-dialogs-dialog-button').text().trim(), m).equal('OK');

              m = '#1 After triggering dialog: body hasClass -ember-dialogs-block-scrolling';
              expect($('body').hasClass('-ember-dialogs-block-scrolling'), m).true;

              run(function () {
                return $('.ember-dialogs-dialog-button').click();
              });
              _context.next = 24;
              return (0, _wait.default)();

            case 24:

              m = '#2 After dismissing dialog: dialog existence';
              expect($('.ember-dialogs-dialog'), m).length(0);

              m = '#2 After dismissing dialog: backdrop existence';
              expect($('.ember-dialogs-backdrop'), m).length(0);

              m = '#2 After dismissing dialog: value';
              expect(value, m).ok;

              m = '#2 After dismissing dialog: body hasClass -ember-dialogs-block-scrolling';
              expect($('body').hasClass('-ember-dialogs-block-scrolling'), m).false;

            case 32:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    return function (_x) {
      return _ref2.apply(this, arguments);
    };
  }()));

  (0, _emberQunit.test)('empty message', (0, _qunit.withChai)(function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(expect) {
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              this.render(Ember.HTMLBars.template({
                "id": "xIZPKiBp",
                "block": "{\"symbols\":[],\"statements\":[[1,[18,\"ember-dialogs\"],false]],\"hasEval\":false}",
                "meta": {}
              }));

              run(function () {
                dialogs.alert();
              });
              _context2.next = 4;
              return (0, _wait.default)();

            case 4:

              m = 'message existence';
              expect($('.ember-dialogs-dialog-message'), m).length(0);

            case 6:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    return function (_x2) {
      return _ref3.apply(this, arguments);
    };
  }()));

  (0, _emberQunit.test)('backdrop click should dismiss - alert mode', (0, _qunit.withChai)(function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(expect) {
      var value;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              this.render(Ember.HTMLBars.template({
                "id": "xIZPKiBp",
                "block": "{\"symbols\":[],\"statements\":[[1,[18,\"ember-dialogs\"],false]],\"hasEval\":false}",
                "meta": {}
              }));

              value = false;


              run(function () {
                dialogs.alert({
                  message: 'lol',
                  actionOk: function actionOk() {
                    value = true;
                  }
                });
              });
              _context3.next = 5;
              return (0, _wait.default)();

            case 5:

              run(function () {
                return $('.ember-dialogs-backdrop').click();
              });
              _context3.next = 8;
              return (0, _wait.default)();

            case 8:

              m = 'dialog existence';
              expect($('.ember-dialogs-dialog'), m).length(0);

              m = 'backdrop existence';
              expect($('.ember-dialogs-backdrop'), m).length(0);

              m = 'value';
              expect(value, m).true;

            case 14:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    return function (_x3) {
      return _ref4.apply(this, arguments);
    };
  }()));

  (0, _emberQunit.test)('backdrop click should dismiss - prompt mode', (0, _qunit.withChai)(function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(expect) {
      var value;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              this.render(Ember.HTMLBars.template({
                "id": "xIZPKiBp",
                "block": "{\"symbols\":[],\"statements\":[[1,[18,\"ember-dialogs\"],false]],\"hasEval\":false}",
                "meta": {}
              }));

              value = false;


              run(function () {
                dialogs.prompt({
                  message: 'lol',
                  actionOk: function actionOk() {
                    value = true;
                  },
                  actionCancel: function actionCancel() {
                    value = ':D';
                  }
                });
              });
              _context4.next = 5;
              return (0, _wait.default)();

            case 5:

              run(function () {
                return $('.ember-dialogs-backdrop').click();
              });
              _context4.next = 8;
              return (0, _wait.default)();

            case 8:

              m = 'dialog existence';
              expect($('.ember-dialogs-dialog'), m).length(0);

              m = 'backdrop existence';
              expect($('.ember-dialogs-backdrop'), m).length(0);

              m = 'value';
              expect(value, m).equal(':D');

            case 14:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, this);
    }));

    return function (_x4) {
      return _ref5.apply(this, arguments);
    };
  }()));

  (0, _emberQunit.test)('backdrop click should not call cancel action when cancelVisible is false', (0, _qunit.withChai)(function () {
    var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(expect) {
      var value;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              this.render(Ember.HTMLBars.template({
                "id": "xIZPKiBp",
                "block": "{\"symbols\":[],\"statements\":[[1,[18,\"ember-dialogs\"],false]],\"hasEval\":false}",
                "meta": {}
              }));

              value = false;


              run(function () {
                dialogs.prompt({
                  message: 'lol',
                  cancelVisible: false,
                  actionOk: function actionOk() {
                    value = true;
                  },
                  actionCancel: function actionCancel() {
                    value = ':D';
                  }
                });
              });
              _context5.next = 5;
              return (0, _wait.default)();

            case 5:

              m = 'cancel button existence';
              expect($('.ember-dialogs-dialog-button.-ember-dialogs-cancel'), m).length(0);

              run(function () {
                return $('.ember-dialogs-backdrop').click();
              });
              _context5.next = 10;
              return (0, _wait.default)();

            case 10:

              m = 'dialog existence';
              expect($('.ember-dialogs-dialog'), m).length(0);

              m = 'backdrop existence';
              expect($('.ember-dialogs-backdrop'), m).length(0);

              m = 'value';
              expect(value, m).false;

            case 16:
            case 'end':
              return _context5.stop();
          }
        }
      }, _callee5, this);
    }));

    return function (_x5) {
      return _ref6.apply(this, arguments);
    };
  }()));

  (0, _emberQunit.test)('backdrop click should not dismiss when backdropClickable=false', (0, _qunit.withChai)(function () {
    var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(expect) {
      var value;
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              this.render(Ember.HTMLBars.template({
                "id": "xIZPKiBp",
                "block": "{\"symbols\":[],\"statements\":[[1,[18,\"ember-dialogs\"],false]],\"hasEval\":false}",
                "meta": {}
              }));

              value = false;


              run(function () {
                dialogs.alert({
                  message: 'lol',
                  backdropClickable: false,
                  actionOk: function actionOk() {
                    value = true;
                  }
                });
              });
              _context6.next = 5;
              return (0, _wait.default)();

            case 5:

              run(function () {
                return $('.ember-dialogs-backdrop').click();
              });
              _context6.next = 8;
              return (0, _wait.default)();

            case 8:

              m = 'dialog existence';
              expect($('.ember-dialogs-dialog'), m).length(1);

              m = 'backdrop existence';
              expect($('.ember-dialogs-backdrop'), m).length(1);

              m = 'value';
              expect(value, m).false;

            case 14:
            case 'end':
              return _context6.stop();
          }
        }
      }, _callee6, this);
    }));

    return function (_x6) {
      return _ref7.apply(this, arguments);
    };
  }()));

  (0, _emberQunit.test)('no backdrop, no action, no blockScrolling', (0, _qunit.withChai)(function () {
    var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(expect) {
      return regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              this.render(Ember.HTMLBars.template({
                "id": "xIZPKiBp",
                "block": "{\"symbols\":[],\"statements\":[[1,[18,\"ember-dialogs\"],false]],\"hasEval\":false}",
                "meta": {}
              }));

              run(function () {
                dialogs.alert({
                  message: 'lol',
                  backdrop: false,
                  blockScrolling: false
                });
              });
              _context7.next = 4;
              return (0, _wait.default)();

            case 4:

              m = 'body hasClass -ember-dialogs-block-scrolling';
              expect($('body').hasClass('-ember-dialogs-block-scrolling'), m).false;

              run(function () {
                return $('.ember-dialogs-backdrop').click();
              });
              _context7.next = 9;
              return (0, _wait.default)();

            case 9:

              m = 'dialog existence';
              expect($('.ember-dialogs-dialog'), m).length(1);

              m = 'backdrop existence';
              expect($('.ember-dialogs-backdrop'), m).length(0);

              run(function () {
                return $('.ember-dialogs-dialog-button').click();
              });
              _context7.next = 16;
              return (0, _wait.default)();

            case 16:

              m = 'dialog existence';
              expect($('.ember-dialogs-dialog'), m).length(0);

            case 18:
            case 'end':
              return _context7.stop();
          }
        }
      }, _callee7, this);
    }));

    return function (_x7) {
      return _ref8.apply(this, arguments);
    };
  }()));

  (0, _emberQunit.test)('confirm', (0, _qunit.withChai)(function () {
    var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(expect) {
      var value;
      return regeneratorRuntime.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              this.render(Ember.HTMLBars.template({
                "id": "xIZPKiBp",
                "block": "{\"symbols\":[],\"statements\":[[1,[18,\"ember-dialogs\"],false]],\"hasEval\":false}",
                "meta": {}
              }));

              value = false;


              run(function () {
                dialogs.confirm({
                  message: 'lol',
                  actionCancel: function actionCancel() {
                    value = true;
                  }
                });
              });
              _context8.next = 5;
              return (0, _wait.default)();

            case 5:

              m = 'cancel button existence';
              expect($('.ember-dialogs-dialog-button.-ember-dialogs-cancel'), m).length(1);

              m = 'cancel button text';
              expect($('.ember-dialogs-dialog-button.-ember-dialogs-cancel').text().trim(), m).equal('Cancel');

              run(function () {
                return $('.ember-dialogs-dialog-button.-ember-dialogs-cancel').click();
              });
              _context8.next = 12;
              return (0, _wait.default)();

            case 12:

              m = 'value';
              expect(value, m).true;

            case 14:
            case 'end':
              return _context8.stop();
          }
        }
      }, _callee8, this);
    }));

    return function (_x8) {
      return _ref9.apply(this, arguments);
    };
  }()));

  (0, _emberQunit.test)('custom button labels', (0, _qunit.withChai)(function () {
    var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(expect) {
      return regeneratorRuntime.wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              this.render(Ember.HTMLBars.template({
                "id": "xIZPKiBp",
                "block": "{\"symbols\":[],\"statements\":[[1,[18,\"ember-dialogs\"],false]],\"hasEval\":false}",
                "meta": {}
              }));

              run(function () {
                dialogs.confirm({
                  message: 'lol',
                  labelOk: 'Yup',
                  labelCancel: 'Nah'
                });
              });
              _context9.next = 4;
              return (0, _wait.default)();

            case 4:

              m = 'ok button text';
              expect($('.ember-dialogs-dialog-button.-ember-dialogs-ok').text().trim(), m).equal('Yup');

              m = 'cancel button text';
              expect($('.ember-dialogs-dialog-button.-ember-dialogs-cancel').text().trim(), m).equal('Nah');

            case 8:
            case 'end':
              return _context9.stop();
          }
        }
      }, _callee9, this);
    }));

    return function (_x9) {
      return _ref10.apply(this, arguments);
    };
  }()));

  (0, _emberQunit.test)('prompt', (0, _qunit.withChai)(function () {
    var _ref11 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(expect) {
      var value;
      return regeneratorRuntime.wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              this.render(Ember.HTMLBars.template({
                "id": "xIZPKiBp",
                "block": "{\"symbols\":[],\"statements\":[[1,[18,\"ember-dialogs\"],false]],\"hasEval\":false}",
                "meta": {}
              }));

              value = 'hee';


              run(function () {
                dialogs.prompt({
                  message: 'lol',
                  placeholder: 'woo',
                  value: value,
                  actionOk: function actionOk(userInput) {
                    value = userInput;
                  }
                });
              });
              _context10.next = 5;
              return (0, _wait.default)();

            case 5:

              m = 'cancel button existence';
              expect($('.ember-dialogs-dialog-button.-ember-dialogs-cancel'), m).length(1);

              m = 'input existence';
              expect($('.ember-dialogs-dialog-input'), m).length(1);

              m = 'input placeholder';
              expect($('.ember-dialogs-dialog-input').attr('placeholder'), m).equal('woo');

              m = 'input initial value';
              expect($('.ember-dialogs-dialog-input').val(), m).equal('hee');

              run(function () {
                return $('.ember-dialogs-dialog-input').val('heeyoo');
              });
              _context10.next = 16;
              return (0, _wait.default)();

            case 16:
              run(function () {
                return $('.ember-dialogs-dialog-input').change();
              });
              _context10.next = 19;
              return (0, _wait.default)();

            case 19:
              run(function () {
                return $('.ember-dialogs-dialog-button.-ember-dialogs-ok').click();
              });
              _context10.next = 22;
              return (0, _wait.default)();

            case 22:

              m = 'value';
              expect(value, m).equal('heeyoo');

              run(function () {
                dialogs.prompt({
                  message: 'lol',
                  placeholder: 'woo',
                  value: 'naa',
                  actionOk: function actionOk(userInput) {
                    value = userInput;
                  }
                });
              });
              _context10.next = 27;
              return (0, _wait.default)();

            case 27:

              m = 'input value after second invocation';
              expect($('.ember-dialogs-dialog-input').val(), m).equal('naa');

            case 29:
            case 'end':
              return _context10.stop();
          }
        }
      }, _callee10, this);
    }));

    return function (_x10) {
      return _ref11.apply(this, arguments);
    };
  }()));

  (0, _emberQunit.test)('prompt block form', (0, _qunit.withChai)(function () {
    var _ref12 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11(expect) {
      var value;
      return regeneratorRuntime.wrap(function _callee11$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              this.render(Ember.HTMLBars.template({
                "id": "7ONfMhfH",
                "block": "{\"symbols\":[\"params\"],\"statements\":[[0,\"\\n\"],[4,\"ember-dialogs\",null,null,{\"statements\":[[0,\"      \"],[6,\"div\"],[9,\"class\",\"dialog\"],[7],[0,\"\\n\"],[4,\"if\",[[19,1,[\"message\"]]],null,{\"statements\":[[0,\"          \"],[6,\"p\"],[9,\"class\",\"message\"],[7],[1,[19,1,[\"message\"]],false],[8],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"  \\n\"],[4,\"if\",[[25,\"eq\",[[19,1,[\"type\"]],\"prompt\"],null]],null,{\"statements\":[[0,\"          \"],[1,[25,\"input\",null,[[\"class\",\"value\",\"placeholder\",\"enter\"],[\"input\",[19,1,[\"userInput\"]],[19,1,[\"placeholder\"]],[25,\"action\",[[19,0,[]],[19,1,[\"actionOk\"]],[19,1,[\"userInput\"]]],null]]]],false],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"  \\n        \"],[6,\"button\"],[9,\"class\",\"ok\"],[3,\"action\",[[19,0,[]],[19,1,[\"actionOk\"]],[19,1,[\"userInput\"]]]],[7],[0,\"\\n          \"],[1,[19,1,[\"labelOk\"]],false],[0,\"\\n        \"],[8],[0,\"\\n  \\n\"],[4,\"if\",[[19,1,[\"shouldDisplayCancel\"]]],null,{\"statements\":[[0,\"          \"],[6,\"button\"],[9,\"class\",\"cancel\"],[3,\"action\",[[19,0,[]],[19,1,[\"actionCancel\"]]]],[7],[0,\"\\n            \"],[1,[19,1,[\"labelCancel\"]],false],[0,\"\\n          \"],[8],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"      \"],[8],[0,\"\\n\"]],\"parameters\":[1]},null],[0,\"  \"]],\"hasEval\":false}",
                "meta": {}
              }));

              value = 'bah';


              m = '#0 Initial: dialog existence';
              expect($('.dialog'), m).length(0);

              run(function () {
                dialogs.prompt({
                  message: 'lol',
                  placeholder: 'wut',
                  value: value,
                  actionOk: function actionOk(userInput) {
                    value = userInput;
                  }
                });
              });
              _context11.next = 7;
              return (0, _wait.default)();

            case 7:

              m = '#1 After triggering dialog: dialog existence';
              expect($('.dialog'), m).length(1);

              m = '#1 After triggering dialog: message text';
              expect($('.message').text().trim(), m).equal('lol');

              m = '#1 After triggering dialog: OK button text';
              expect($('.ok').text().trim(), m).equal('OK');

              m = '#1 After triggering dialog: Cancel button text';
              expect($('.cancel').text().trim(), m).equal('Cancel');

              m = '#1 After triggering dialog: input value';
              expect($('.input').val(), m).equal('bah');

              m = '#1 After triggering dialog: input placeholder';
              expect($('.input').attr('placeholder'), m).equal('wut');

              run(function () {
                return $('.input').val('bleh');
              });
              _context11.next = 22;
              return (0, _wait.default)();

            case 22:
              run(function () {
                return $('.input').change();
              });
              _context11.next = 25;
              return (0, _wait.default)();

            case 25:
              run(function () {
                return $('.ok').click();
              });
              _context11.next = 28;
              return (0, _wait.default)();

            case 28:

              m = '#2 After dismissing dialog: dialog existence';
              expect($('.ember-dialogs-dialog'), m).length(0);

              m = '#2 After dismissing dialog: value';
              expect(value, m).equal('bleh');

              value = 'nom';

              run(function () {
                dialogs.prompt({
                  message: 'lol',
                  placeholder: 'wut',
                  value: value,
                  actionOk: function actionOk(userInput) {
                    value = userInput;
                  }
                });
              });
              _context11.next = 36;
              return (0, _wait.default)();

            case 36:

              m = '#3 After re-triggering dialog: input value';
              expect($('.input').val(), m).equal('nom');

            case 38:
            case 'end':
              return _context11.stop();
          }
        }
      }, _callee11, this);
    }));

    return function (_x11) {
      return _ref12.apply(this, arguments);
    };
  }()));
});
define('dummy/tests/page-object', ['exports', 'ember-cli-page-object'], function (exports, _emberCliPageObject) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.fullScope = exports.getContext = exports.findElement = exports.findElementWithAssert = exports.buildSelector = exports.visitable = exports.value = exports.triggerable = exports.text = exports.property = exports.notHasClass = exports.isVisible = exports.isHidden = exports.is = exports.hasClass = exports.selectable = exports.fillable = exports.create = exports.count = exports.contains = exports.collection = exports.clickable = exports.clickOnText = exports.attribute = exports.alias = undefined;
  Object.defineProperty(exports, 'buildSelector', {
    enumerable: true,
    get: function () {
      return _emberCliPageObject.buildSelector;
    }
  });
  Object.defineProperty(exports, 'findElementWithAssert', {
    enumerable: true,
    get: function () {
      return _emberCliPageObject.findElementWithAssert;
    }
  });
  Object.defineProperty(exports, 'findElement', {
    enumerable: true,
    get: function () {
      return _emberCliPageObject.findElement;
    }
  });
  Object.defineProperty(exports, 'getContext', {
    enumerable: true,
    get: function () {
      return _emberCliPageObject.getContext;
    }
  });
  Object.defineProperty(exports, 'fullScope', {
    enumerable: true,
    get: function () {
      return _emberCliPageObject.fullScope;
    }
  });
  exports.alias = _emberCliPageObject.alias;
  exports.attribute = _emberCliPageObject.attribute;
  exports.clickOnText = _emberCliPageObject.clickOnText;
  exports.clickable = _emberCliPageObject.clickable;
  exports.collection = _emberCliPageObject.collection;
  exports.contains = _emberCliPageObject.contains;
  exports.count = _emberCliPageObject.count;
  exports.create = _emberCliPageObject.create;
  exports.fillable = _emberCliPageObject.fillable;
  exports.selectable = _emberCliPageObject.fillable;
  exports.hasClass = _emberCliPageObject.hasClass;
  exports.is = _emberCliPageObject.is;
  exports.isHidden = _emberCliPageObject.isHidden;
  exports.isVisible = _emberCliPageObject.isVisible;
  exports.notHasClass = _emberCliPageObject.notHasClass;
  exports.property = _emberCliPageObject.property;
  exports.text = _emberCliPageObject.text;
  exports.triggerable = _emberCliPageObject.triggerable;
  exports.value = _emberCliPageObject.value;
  exports.visitable = _emberCliPageObject.visitable;
  exports.default = {
    alias: _emberCliPageObject.alias,
    attribute: _emberCliPageObject.attribute,
    clickOnText: _emberCliPageObject.clickOnText,
    clickable: _emberCliPageObject.clickable,
    collection: _emberCliPageObject.collection,
    contains: _emberCliPageObject.contains,
    count: _emberCliPageObject.count,
    create: _emberCliPageObject.create,
    fillable: _emberCliPageObject.fillable,
    hasClass: _emberCliPageObject.hasClass,
    is: _emberCliPageObject.is,
    isHidden: _emberCliPageObject.isHidden,
    isVisible: _emberCliPageObject.isVisible,
    notHasClass: _emberCliPageObject.notHasClass,
    property: _emberCliPageObject.property,
    selectable: _emberCliPageObject.fillable,
    text: _emberCliPageObject.text,
    triggerable: _emberCliPageObject.triggerable,
    value: _emberCliPageObject.value,
    visitable: _emberCliPageObject.visitable
  };
});
define("dummy/tests/pages/components/_component", ["exports", "dummy/tests/page-object"], function (exports, _pageObject) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.jquery = jquery;
  exports.default = component;

  var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  var $ = Ember.$;

  // import _ from 'lodash'


  // A helper to leverage jQuery for page component queries
  function jquery(callback) {
    var errorIfMissing = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

    return {
      isDescriptor: true,

      get: function get() {
        var $el = (0, _pageObject.findElement)(this);

        if (errorIfMissing && !$el.length) {
          throw new Error("Element " + this.scope + " not found.");
        }

        return callback($el);
      }
    };
  }

  function component() {
    var scope = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
    var descriptor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    // If a descriptor is passed as the first arg
    if (scope === Object(scope)) {
      descriptor = scope;
      scope = null;
    }

    return _extends({}, scope ? { scope: scope, itemScope: scope } : {}, { // inject the scope only if it was provided

      $: jquery(function ($el) {
        return $el;
      }),
      attribute: (0, _pageObject.attribute)(),
      blur: jquery(function ($el) {
        return $el.blur();
      }),
      checked: jquery(function ($el) {
        return $el.is(":checked");
      }),
      click: (0, _pageObject.clickable)(),
      contains: jquery(function ($el) {
        return function (selector) {
          return $el.find(selector).length > 0;
        };
      }, false),
      disabled: jquery(function ($el) {
        return $el.is("[disabled]");
      }),
      empty: jquery(function ($el) {
        return $el.is(":empty") || !$el.children().length && !$el.text().trim().length;
      }),
      exists: jquery(function ($el) {
        return $el.length > 0;
      }, false), // false: don't spit an error if element isn't found
      fill: (0, _pageObject.fillable)(),
      focus: jquery(function ($el) {
        return $el.focus();
      }),
      index: jquery(function ($el) {
        return $el.index();
      }),
      hasClass: jquery(function ($el) {
        return function (className) {
          return $el.hasClass(className);
        };
      }),
      active: (0, _pageObject.hasClass)("active"),
      disabledViaClass: (0, _pageObject.hasClass)("disabled"),
      visible: (0, _pageObject.isVisible)(),
      placeholder: (0, _pageObject.attribute)("placeholder"),
      text: (0, _pageObject.text)(),
      value: (0, _pageObject.value)(),

      keyup: function keyup(code) {
        var event = new $.Event("keyup");
        event.which = code;
        event.keyCode = code;
        return this.$.trigger(event);
      }
    }, descriptor);
  }

  /**
   * A test-selector driven decorator for the `component` function
   *
   * First argument -- first argument of test selector
   * Last argument -- optional object for component()
   * In between -- optional arguments for test selector
   */
  // export function t (selectorBefore, ...args) {
  //   const obj =
  //         _.isObject(args[args.length - 1])
  //           ? args.pop()
  //           : {}
  //
  //   const selectorAfter = testSelector(selectorBefore, ...args)
  //   return component(selectorAfter, obj)
  // }
});
define('dummy/tests/pages/components/dialogs', ['exports', 'dummy/tests/pages/components/_component'], function (exports, _component) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.dialog = exports.backdrop = undefined;
  var backdrop = exports.backdrop = (0, _component.default)('.ember-dialogs-backdrop');

  var dialog = exports.dialog = (0, _component.default)('.ember-dialogs-dialog', {
    resetScope: true,

    message: (0, _component.default)('.ember-dialogs-dialog-message'),
    input: (0, _component.default)('.ember-dialogs-dialog-input'),
    buttonOk: (0, _component.default)('.ember-dialogs-dialog-button.-ember-dialogs-ok'),
    buttonCancel: (0, _component.default)('.ember-dialogs-dialog-button.-ember-dialogs-cancel')
  });
});
define('dummy/tests/pages/index', ['exports', 'ember-cli-page-object', 'dummy/tests/pages/components/_component', 'dummy/tests/pages/components/dialogs'], function (exports, _emberCliPageObject, _component, _dialogs) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = (0, _emberCliPageObject.create)({
    visit: (0, _emberCliPageObject.visitable)('/'),

    alertValue: (0, _component.default)('.route-index-alertValue'),
    alertTrigger: (0, _component.default)('.route-index-alertTrigger'),

    confirmValue: (0, _component.default)('.route-index-confirmValue'),
    confirmTrigger: (0, _component.default)('.route-index-confirmTrigger'),

    promptValue: (0, _component.default)('.route-index-promptValue'),
    promptTrigger: (0, _component.default)('.route-index-promptTrigger'),

    backdrop: _dialogs.backdrop,
    dialog: _dialogs.dialog
  });
});
define('dummy/tests/test-helper', ['dummy/tests/helpers/resolver', 'ember-qunit', 'ember-cli-qunit'], function (_resolver, _emberQunit, _emberCliQunit) {
  'use strict';

  (0, _emberQunit.setResolver)(_resolver.default);
  (0, _emberCliQunit.start)();
});
define('dummy/tests/tests.lint-test', [], function () {
  'use strict';

  QUnit.module('ESLint | tests');

  QUnit.test('acceptance/index-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'acceptance/index-test.js should pass ESLint\n\n');
  });

  QUnit.test('helpers/destroy-app.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/destroy-app.js should pass ESLint\n\n');
  });

  QUnit.test('helpers/module-for-acceptance.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/module-for-acceptance.js should pass ESLint\n\n');
  });

  QUnit.test('helpers/resolver.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/resolver.js should pass ESLint\n\n');
  });

  QUnit.test('helpers/start-app.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/start-app.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/ember-dialogs-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/ember-dialogs-test.js should pass ESLint\n\n');
  });

  QUnit.test('pages/index.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'pages/index.js should pass ESLint\n\n');
  });

  QUnit.test('test-helper.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'test-helper.js should pass ESLint\n\n');
  });
});
require('dummy/tests/test-helper');
EmberENV.TESTS_FILE_LOADED = true;
//# sourceMappingURL=tests.map
