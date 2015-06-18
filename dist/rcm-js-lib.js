/**
 * rcmGuid
 * @type {{generate: Function}}
 */
var rcmGuid = {

    generate: function () {

        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }

        var guid = function () {
            return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                s4() + '-' + s4() + s4() + s4();
        };

        return guid();
    }
};


/**
 * RcmEventManager
 * REQUIRES: rcmGuid
 * @constructor
 */
var RcmEventManager = function () {

    var self = this;

    /**
     * events
     * @type {{}}
     */
    var events = {};

    /**
     * promises
     * @type {{}}
     */
    var promises = {};

    /**
     * guid
     * @type {{generate: Function}}
     */
    var guid = rcmGuid;

    /**
     * on - register listener
     * @param {string} event
     * @param {function} method
     * @param {string} [id] - Can specify an even id so only on listener will be registered
     * @param {bool} [checkPromise] - Defaults to true. Calls listener immediately if the event has already fired
     * @returns {string} evnet id
     */
    self.on = function (event, method, id, checkPromise) {

        if (!events[event]) {
            events[event] = {};
        }

        if (typeof id === 'undefined' || id === null || id === '') {

            id = guid.generate();
        }

        events[event][id] = method;

        //checkPromise defaults to true
        if (checkPromise || typeof checkPromise == 'undefined') {
            honorPromise(event, method);
        }

        return id;
    };

    /**
     * remove listener
     * @param event
     * @param id
     */
    self.remove = function (event, id) {

        if (!events[event]) {
            return;
        }

        events[event][id] = undefined;

        try {
            delete events[event][id];
        } catch (e) {

        }
    };

    /**
     * trigger listener
     * @param event
     * @param args
     */
    self.trigger = function (event, args) {

        if (events[event]) {
            jQuery.each(
                events[event],
                function (index, value) {
                    if (typeof value === 'function') {
                        value(args);
                    }
                }
            );
        }

        makePromise(event, args);
    };

    /**
     * makePromise
     * @param event
     * @param args
     */
    var makePromise = function (event, args) {

        promises[event] = args;
    };

    /**
     * honorPromise
     * @param event
     * @param method
     */
    var honorPromise = function (event, method) {

        if (promises[event]) {
            method(promises[event]);
        }
    };

    /**
     * hasEvent
     * @param event
     * @param id
     * @returns {boolean}
     */
    self.hasEvent = function (event, id) {

        if (!events[event]) {
            return false;
        }

        if (!events[event][id]) {
            return false;
        }

        return (typeof events[event][id] === 'function');
    };

    /**
     *
     * @param event
     * @returns {boolean}
     */
    self.hasEvents = function (event) {

        if (!events[event]) {
            return false;
        }

        jQuery.each(
            events[event],
            function (index, value) {
                if (typeof value === 'function') {
                    return true;
                }
            }
        );

        return false;
    };
};

/**
 * RcmJsLib Module
 */
angular.module('RcmJsLib', []);

/**
 * rcmGuid Service
 * - Shared service
 */
angular.module('RcmJsLib').service(
    'rcmGuid',
    function () {

        return rcmGuid;
    }
);

/**
 * RcmEventManagerClass
 * returns RcmEventManagerClass
 * - use new RcmEventManagerClass() to instantiate
 */
angular.module('RcmJsLib').factory(
    'RcmEventManagerClass',
    function () {

        return RcmEventManager;
    }
);

/**
 * rcmEventManager Service
 * - Shared service
 */
angular.module('RcmJsLib').service(
    'rcmEventManager',
    function () {

        return new RcmEventManager();
    }
);
