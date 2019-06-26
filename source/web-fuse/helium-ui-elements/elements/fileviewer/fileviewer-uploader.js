import '../dialog/dialog.js';
import '../upload/upload.js';

export class FileViewerUploader {
    constructor (i18n) {
        this._i18n = i18n;
    }

    create (uploadAction, onSuccess, onFailure) {
        let dialog = document.createElement('mc-dialog');
        dialog.setAttribute('header', '');
        dialog.setAttribute('show-middle-button', 'false');
        dialog.setAttribute('show-right-button', 'true');
        dialog.setAttribute('text-right-button', this._i18n.cancel);
        let upload = this._createUploader();
        upload.addEventListener('upload-file-selected', (e) => {
            upload.setAttribute('status', 'pending');
            uploadAction(e.detail.file).then(() => {
                this._handleUploadSuccess(onSuccess, upload, dialog);
            }, (err) => {
                this._handleUploadFailure(err, onFailure, upload, dialog);
            });
        });
        upload.addEventListener('upload-link-click', (e) => {
            this._handleLinkClick(e.detail.name, upload, dialog);
        });

        let slot = document.createElement('span');
        slot.id = 'content';
        slot.setAttribute('slot', 'content');
        slot.appendChild(upload);
        dialog.appendChild(slot);

        return dialog;
    }

    _handleLinkClick (name, upload, dialog) {
        switch (name) {
        case 'upload-again': {
            dialog.setAttribute('text-right-button', this._i18n.cancel);
            upload.setAttribute('status', 'start');
            break;
        }
        case 'learn': {
            this._openHref('/faq#limitation', '_self');
        }
        }
    }

    _openHref (href, target) {
        let win = window.open(href, target);
        // win is undefined, if the window cannot be opened (e.g.popup blocker)
        if (win) {
            win.focus();
        }
    }

    _handleUploadSuccess (onSuccess, upload, dialog) {
        dialog.setAttribute('text-right-button', this._i18n.close);
        upload.setAttribute('status', 'success');
        onSuccess();
    }

    _handleUploadFailure (errorMessage, onFailure, upload, dialog) {
        dialog.setAttribute('text-right-button', this._i18n.close);
        upload.setAttribute('error-message', errorMessage);
        upload.setAttribute('status', 'failure');
        onFailure(errorMessage);
    }

    _createUploader () {
        let upload = document.createElement('mc-upload');
        upload.setAttribute('start-text', this._i18n.startText);
        upload.setAttribute('pending-text', this._i18n.pendingText);
        upload.setAttribute('success-text', this._i18n.successText);
        upload.setAttribute('failure-text', this._i18n.failureText);
        upload.setAttribute('upload-button-text', this._i18n.buttonText);

        upload.setAttribute('status', 'start');
        upload.setAttribute('file-type', '*');
        upload.innerHTML =
            `<mc-upload-failure-link name="upload-again" text="${this._i18n.uploadAgain.text}" description="${this._i18n.uploadAgain.description}"></mc-upload-link>
             <mc-upload-failure-link name="learn" text="${this._i18n.learn.text}" description="${this._i18n.learn.description}"></mc-upload-link>
             <mc-upload-success-link name="upload-again" text="${this._i18n.uploadAgain.text}" description="${this._i18n.uploadAgain.description}"></mc-upload-link>`;
        return upload;
    }
}
