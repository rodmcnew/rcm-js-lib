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
