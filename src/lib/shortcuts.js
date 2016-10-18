/* globals AFRAME */
var Events = require('./Events');
var shouldCaptureKeyEvent = AFRAME.utils.shouldCaptureKeyEvent;
import {removeSelectedEntity, cloneSelectedEntity} from '../actions/entity';

module.exports = {
  onKeyUp: function (event) {
    if (!shouldCaptureKeyEvent(event)) { return; }

    // h: help
    if (event.keyCode === 72) {
      Events.emit('open-help-modal');
    }

    // esc: close inspector
    if (event.keyCode === 27) {
      AFRAME.INSPECTOR.close();
      return;
    }

    // w: translate
    if (event.keyCode === 87) {
      Events.emit('transform-mode-changed', 'translate');
    }

    // e: rotate
    if (event.keyCode === 69) {
      Events.emit('transform-mode-changed', 'rotate');
    }

    // r: scale
    if (event.keyCode === 82) {
      Events.emit('transform-mode-changed', 'scale');
    }

    // g: toggle grid
    if (event.keyCode === 71) {
      Events.emit('toggle-grid');
    }

    // n: new entity
    if (event.keyCode === 78) {
      Events.emit('create-new-entity', {element: 'a-entity', components: {}});
    }

    // backspace & supr: remove selected entity
    if (event.keyCode === 8 || event.keyCode === 46) {
      removeSelectedEntity();
    }

    // d: clone selected entity
    if (event.keyCode === 68) {
      cloneSelectedEntity();
    }
  },
  enable: function () {
    window.addEventListener('keyup', this.onKeyUp, false);
  },
  disable: function () {
    window.removeEventListener('keyup', this.onKeyUp);
  }
};
