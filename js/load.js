'use strict';

window.load = (function () {
  return function (url, onLoad) {

    var xhr = new XMLHttpRequest();

    xhr.addEventListener('load', function (event) {
      if (event.target.status >= 400) {
        throw new Error('Failed to load data. Server returned status: ' + event.target.status);
      } else if (event.target.status >= 200) {
        onLoad(event.target.response);
      }
    });

    xhr.responseType = 'json';
    xhr.open('GET', url);
    xhr.send();
  };
})();
