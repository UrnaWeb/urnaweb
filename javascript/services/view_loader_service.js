'use strict';

angular.module('UrnaWeb').factory('ViewLoader', ["$document", "$compile", "$rootScope", "$controller", "$timeout",
  function ($document, $compile, $rootScope, $controller, $timeout) {
    var defaults = {
      data: null,
      id: null,
      template: null,
      templateUrl: null,
      title: 'Título',
      subtitle: 'Subtítulo',
      success: {label: 'OK', fn: null},
      cancel: {label: 'Close', fn: null},
      controller: null, //just like route controller declaration
      footerTemplate: null,
      modalClass: "modal"
    };
    var body = $document.find('body');

    return function Dialog(templateUrl/*optional*/, options, passedInLocals) {

      // Handle arguments if optional template isn't provided.
      if(angular.isObject(templateUrl)){
        passedInLocals = options;
        options = templateUrl;
      } else {
        options.templateUrl = templateUrl;
      }

      options = angular.extend({}, defaults, options); //options defined in constructor

      var key;
      var idAttr = options.id ? ' id="' + options.id + '" ' : '';
      var defaultFooter = '<button class="btn" ng-click="$modalCancel()">{{$modalCancelLabel}}</button>' +
        '<button class="btn btn-primary" ng-click="$modalSuccess()">{{$modalSuccessLabel}}</button>';
      var footerTemplate = '<div class="modal-footer">' +
        (options.footerTemplate || defaultFooter) +
        '</div>';
      var modalBody = (function(){
        if(options.template){
          if(angular.isString(options.template)){
            // Simple string template
            return '<div class="modal-body">' + options.template + '</div>';
          } else {
            // jQuery/JQlite wrapped object
            return '<div class="modal-body">' + options.template.html() + '</div>';
          }
        } else {
          // Template url
          return '<div class="modal-body" ng-include="\'' + options.templateUrl + '\'"></div>'
        }
      })();
      //We don't have the scope we're gonna use yet, so just get a compile function for modal
      var modalEl = angular.element(
                '<section class="' + options.modalClass + '"' + idAttr + ' style="display: block;">' +
                  '<header id="simple-page-header" class="wrapper-row">'+
                    '<div class="close-button" ng-click="$modalCancel()">'+
                      '<svg class="close-icon icon-kiik-close"><use xlink:href="#icon-kiik-close"></use></svg>'+
                    '</div>'+
                    '<div class="header-title-container">'+
                      '<h1 class="page-title">'+
                        '{{$title}}'+
                      '</h1>'+
                      '<p class="page-sub-title">'+
                        '{{$subtitle}}'+
                      '</p>'+
                    '</div>'+
                  '</header>'+
                  modalBody +
                '</section>');

      var handleEscPressed = function (event) {
        if (event.keyCode === 27) {
          scope.$modalCancel();
        }
      };

      var closeFn = function () {
        modalEl.removeClass('fade-in');
        $timeout(function () {
          body.unbind('keydown', handleEscPressed);
          modalEl.remove();
        }, 500);
      };

      body.bind('keydown', handleEscPressed);

      var ctrl, locals,
        scope = options.scope || $rootScope.$new();

      scope.$title = options.title;
      scope.$subtitle = options.subtitle;
      scope.$data = options.data;
      scope.$modalClose = closeFn;
      scope.$modalCancel = function () {
        var callFn = options.cancel.fn || closeFn;
        callFn.call(this);
        scope.$modalClose();
      };
      scope.$modalSuccess = function () {
        var callFn = options.success.fn || closeFn;
        callFn.call(this);
        scope.$modalClose();
      };
      scope.$modalSuccessLabel = options.success.label;
      scope.$modalCancelLabel = options.cancel.label;

      if (options.controller) {
        locals = angular.extend({$scope: scope}, passedInLocals);
        ctrl = $controller(options.controller, locals);
        // Yes, ngControllerController is not a typo
        modalEl.contents().data('$ngControllerController', ctrl);
      }

      $compile(modalEl)(scope);
      body.append(modalEl);

      $timeout(function () {
        modalEl.addClass('fade-in');
      }, 100);
    };
  }]);
