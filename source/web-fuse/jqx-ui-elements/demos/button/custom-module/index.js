class ColorModule {
    static get properties() {
        const properties =
        {
            'color': {
                value: 'red',
                type: 'string',
                observer: 'setColor'
            }
        }

        return properties;
    }

    attached() {
    }

    detached() {
    }

    created() {
    }

    ready() {
        this.ownerElement.$.button.style.color = this.color;
    }

    setColor(oldColor, color) {
        this.ownerElement.$.button.style.color = this.color;
    }
}

window.JQX.Elements.whenRegistered('jqx-button', function (proto) {
    proto.addModule(ColorModule);
});

function clickMe(event) {
    const button = document.getElementById("button");
    button.color = 'green';
}