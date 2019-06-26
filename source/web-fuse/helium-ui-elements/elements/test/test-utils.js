import rootCss from '../root/root.css';
import documentCss from '../root/document.css';

const styles = [rootCss, documentCss];

function prependStyles (element, styles) {
    for (let style of styles.reverse()) {
        let styleElement = document.createElement('style');
        styleElement.type = 'text/css';
        styleElement.appendChild(document.createTextNode(style));
        element.prepend(styleElement);
    }
}

function removeFixture () {
    let fixture = document.getElementById('fixture');
    if (fixture) {
        document.body.removeChild(fixture);
    }
}

export function createFixture (element, customize) {
    removeFixture();
    const style = document.createElement('style');
    style.type = 'text/css';
    style.appendChild(document.createTextNode(rootCss));

    const fixture = document.createElement('div');
    fixture.id = 'fixture';
    fixture.innerHTML = element;
    prependStyles(fixture, styles);

    let instance = fixture.lastChild;

    if (customize) {
        customize(instance);
    }

    document.body.prepend(fixture);

    return instance;
}

export function isVisible (element) {
    return element.offsetWidth > 0 && element.offsetHeight > 0;
}

export function pressKey (element, code) {
    let keyCode = 0;
    switch (code) {
    case 'Enter': {
        keyCode = 13;
        break;
    }
    case 'Escape': {
        keyCode = 27;
        break;
    }
    case 'Up': {
        keyCode = 38;
        break;
    }
    case 'Down': {
        keyCode = 40;
        break;
    }
    };

    let pressEvent = new KeyboardEvent('keydown', {
        'bubbles': true,
        'cancelable': true,
        'keyCode': keyCode,
        'code': code,
        'key': code
    });

    element.dispatchEvent(pressEvent);
}

export function selectOption (element, value) {
    element.value = value;

    let changeEvent = new CustomEvent('change');
    element.dispatchEvent(changeEvent);
}

export function enterValue (element, value) {
    element.value = value;

    let inputEvent = new CustomEvent('input');
    element.dispatchEvent(inputEvent);

    let changeEvent = new CustomEvent('change');
    element.dispatchEvent(changeEvent);
}

export function focus (element) {
    let changeEvent = new CustomEvent('focus');
    element.dispatchEvent(changeEvent);
}
