import { document, console } from 'global';
import { storiesOf } from '@storybook/html';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { addReadme } from 'storybook-readme/html';
// import '../../../../dist/js/elements/slgraph.js';
// import '../../../../dist/deps/niwebcharts-5.4.2.js';
import '../../../../dist/styles/root.css';
import readme from '../README.md';

storiesOf('Graph', module)
    .addDecorator(withKnobs)
    .addDecorator(addReadme)
    .addParameters({ readme: { sidebar: readme } })
    // .add('Graph', () => `
    //     <div id="main" style="height: 100%">
    //         <sl-graph>
    //             <sl-graph-plot label="CPU"></sl-graph-plot>
    //             <sl-graph-plot label="Memory"></sl-graph-plot>
    //         </sl-graph>
    //     </div>`);
