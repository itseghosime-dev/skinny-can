import '@testing-library/jest-dom'

// Polyfill pointer capture and scroll APIs for Radix UI Select in JSDOM
if (typeof Element !== 'undefined') {
  Element.prototype.hasPointerCapture =
    Element.prototype.hasPointerCapture ||
    function () {
      return false
    }
  Element.prototype.setPointerCapture =
    Element.prototype.setPointerCapture || function () {}
  Element.prototype.releasePointerCapture =
    Element.prototype.releasePointerCapture || function () {}
  Element.prototype.scrollIntoView =
    Element.prototype.scrollIntoView || function () {}
}
