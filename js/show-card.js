'use strict';

window.showCard = (function () {
  return function (onCloseCallback) {
    var dialog = document.querySelector('.dialog');
    var dialogClose = dialog.querySelector('.dialog__close');

    var closeClickDialogHandler = function () {
      hideDialog();
    };

    dialogClose.addEventListener('click', closeClickDialogHandler);

    var hideDialog = function () {
      dialog.style.display = 'none';
      dialog.setAttribute('aria-hidden', true);
      document.removeEventListener('keydown', closeKeydownHandler);
      dialogClose.removeEventListener('click', closeClickDialogHandler);

      if (window.utils.isFunction(onCloseCallback)) {
        onCloseCallback();
      }
    };

    function closeKeydownHandler(event) {
      if (window.utils.isKeyEsc(event)) {
        hideDialog();
      }
    }

    dialog.style.display = 'block';
    dialog.setAttribute('aria-hidden', false);
    document.addEventListener('keydown', closeKeydownHandler);
  };
})();
