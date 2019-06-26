class ComponentUtils {
    upgradeProperty (instance, prop) {
        if (instance.hasOwnProperty(prop)) {
            let value = instance[prop];
            delete instance[prop];
            instance[prop] = value;
        }
    }

    addStylesToElement (element, styles) {
        for (let style of styles) {
            let styleElement = this.createStyleElement(style);
            element.appendChild(styleElement);
        }
    }

    createStyleElement (style) {
        let styleElement = document.createElement('style');
        styleElement.type = 'text/css';
        styleElement.appendChild(document.createTextNode(style));
        return styleElement;
    }

    registerCustomElement (name, clazz) {
        if (!window.MCRegistered) {
            window.MCRegistered = {};
        }
        if (!window.MCRegistered[name]) {
            window.customElements.define(name, clazz);
            window.MCRegistered[name] = true;
        }
    }
}

export let componentUtils = new ComponentUtils();
