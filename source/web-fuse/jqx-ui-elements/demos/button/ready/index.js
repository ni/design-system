var NationalInstruments = {};
NationalInstruments.JQXElement = { Elements: [] };
// ****************************************
// Custom Element Extensions
// ****************************************
(function () {
    'use strict';
    // Static Private Reference Aliases

    // The list of jqx elements that we support along with their element info
    var _elements = [];
    _elements.push({ tagName: 'jqx-numeric-text-box', propertyName: 'value', attributeName: 'value', eventName: 'change', isTextEditFocusable: true });
    _elements.push({ tagName: 'jqx-progress-bar', propertyName: 'value', attributeName: 'value', eventName: '', isTextEditFocusable: false });
    _elements.push({ tagName: 'jqx-circular-progress-bar', propertyName: 'value', attributeName: 'value', eventName: '', isTextEditFocusable: false });
    _elements.push({ tagName: 'jqx-tank', propertyName: 'value', attributeName: 'value', eventName: 'change', isTextEditFocusable: false });
    _elements.push({ tagName: 'jqx-slider', propertyName: 'value', attributeName: 'value', eventName: 'change', isTextEditFocusable: false });
    _elements.push({ tagName: 'jqx-button', propertyName: 'value', attributeName: 'value', eventName: 'change', isTextEditFocusable: false });

    var create = function (element, elementInfo) {
        var bindingInfo;


        // update internal properties from attribute values

        Object.defineProperty(element, 'isTextEditFocusable', {
            configurable: false,
            enumerable: false,
            writable: false,
            value: function () {
                return elementInfo.isTextEditFocusable;
            }
        });
        Object.defineProperty(element, 'setFont', {
            configurable: false,
            enumerable: false,
            writable: false,
            value: function (fontSize, fontFamily, fontWeight, fontStyle, textDecoration) {
                this.style.fontSize = fontSize;
                this.style.fontFamily = fontFamily;
                this.style.fontWeight = fontWeight;
                this.style.fontStyle = fontStyle;
                this.style.textDecoration = textDecoration;
            }
        });
    };

    var attach = function (element) {
        if (!element.firstAttach) {
            element.firstAttach = true;
            return;
        }

        // this is for reparenting. Properties set in attach will not be applied to the elements appearance
        // (but during reparenting they are not changing anyway)
        setup(element);
    };

    var ready = function (element) {
        element.firstAttach = false;
        // this is for first time setup - the properties set here will be applied to the elements appearance
        setup(element);

    };




    var setup = function (element) {
        element.model = { clickMode: 'release', value: "Value", contentVisible: true, glyph: "", content: "Text" };
        var counter = 0;
        element.addEventListener('click', function () {
            element.model = { clickMode: 'press', value: "Value", contentVisible: true, glyph: "", content: "Text" + counter++ };
            element.updateContent();
        });

        element.createContent();
        element.updateContent();

        element.clickMode = element.model.clickMode;
        element.value = element.model.value.toString();
    };

    var detach = function (element) {

    };

    var addProperties = function (proto, tagName) {

        Object.defineProperty(proto, 'elementInfo', {
            configurable: false,
            enumerable: true,
            value: { tagName: tagName, valuePropertyDescriptor: { propertyName: '', attributeName: '', eventName: '', propertyNameNonSignaling: '' } },
            writable: true
        });
    };

    // Extensions to multiple prototypes
    var toReg;

    var handleRegistered = function (proto, elementInfo) {
        addProperties(proto, elementInfo.tagName);
        proto.onCreated = function () {
            if (this.tagName === elementInfo.tagName.toUpperCase()) {
                create(this, elementInfo);
            }
        };

        proto.onReady = function () {
            if (this.tagName === elementInfo.tagName.toUpperCase()) {
                ready(this);
            }
        };

        proto.onAttached = function () {
            if (this.tagName === elementInfo.tagName.toUpperCase()) {
                attach(this);
            }
        };

        proto.onDetached = function () {
            if (this.tagName === elementInfo.tagName.toUpperCase()) {
                detach(this);
            }
        };

        proto.createContent = function () {
            var childElement = this.firstElementChild;
            if (childElement) {
                childElement.innerHTML = '';
                var glyphDiv = document.createElement('div');
                glyphDiv.classList.add('ni-glyph');
                childElement.appendChild(glyphDiv);
                var contentSpan = document.createElement('span');
                contentSpan.classList.add('ni-text');
                childElement.appendChild(contentSpan);
            }
        };

        proto.updateContent = function () {
            this.createContent();
            var childElement = this.firstElementChild;
            var glyphDiv = childElement.childNodes[0];
            var contentSpan = childElement.childNodes[1];
            contentSpan.textContent = this.model.content;
            glyphDiv.textContent = String.fromCharCode(this.model.glyph);
            if (this.model.contentVisible === true) {
                if (this.model.glyph !== 0) {
                    glyphDiv.style.display = 'inline';
                } else {
                    glyphDiv.style.display = 'none';
                }

                contentSpan.style.display = 'inline';
            } else {
                glyphDiv.style.display = 'none';
                contentSpan.style.display = 'none';
            }
        };
    };

    var whenRegistered = function (elementInfo) {
        window.JQX.Elements.whenRegistered(elementInfo.tagName, function (proto) {
            handleRegistered(proto, elementInfo);
        });
    };

    for (toReg in _elements) {
        if (_elements.hasOwnProperty(toReg)) {
            whenRegistered(_elements[toReg]);
        }
    }

    NationalInstruments.JQXElement._registerElements = function () {
        window.JQX.Elements.registerElements();
    };

}());
