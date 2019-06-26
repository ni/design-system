import { componentUtils } from '../common/component-utils.js';
import { html } from '../../library/html-utils.js';

import webchartsStyle from '../../../node_modules/ni-webcharts/styles/webchartsLight.css';
import jqxBaseStyle from '../../../node_modules/jqwidgets-scripts/jqwidgets/styles/jqx.base.css';
import jqxFreshStyle from '../../../node_modules/jqwidgets-scripts/jqwidgets/styles/jqx.fresh.css';
import webchartsLegendsStyle from '../../../node_modules/ni-webcharts-legends/styles/webcharts-legends.css';
import webchartsLegendsIconStyle from '../../../node_modules/ni-webcharts-legends/styles/webcharts-legends.icons.css';
import graphStyle from './graph.css';

const styles = [webchartsStyle, jqxBaseStyle, jqxFreshStyle, webchartsLegendsStyle, webchartsLegendsIconStyle, graphStyle];

const PLOT_COLORS = [
    'rgba(67, 134, 185, 1)', 'rgba(123, 22, 26, 1)', 'rgba(226, 182, 131, 1)', 'rgba(183, 172, 31, 1)', 'rgba(174, 220, 239, 1)',
    'rgba(160, 139, 176, 1)', 'rgba(127, 127, 127, 1)', 'rgba(60, 7, 38, 1)', 'rgba(213, 255, 0, 1)', 'rgba(255, 0, 86, 1)',
    'rgba(158, 0, 142, 1)', 'rgba(14, 76, 161, 1)', 'rgba(255, 229, 2, 1)', 'rgba(0, 95, 57, 1)', 'rgba(0, 255, 0, 1)',
    'rgba(149, 0, 58, 1)', 'rgba(255, 147, 126, 1)', 'rgba(164, 36, 0, 1)', 'rgba(0, 21, 68, 1)', 'rgba(145, 208, 203, 1)',
    'rgba(98, 14, 0, 1)', 'rgba(107, 104, 130, 1)', 'rgba(0, 0, 255, 1)', 'rgba(0, 125, 181, 1)', 'rgba(106, 130, 108, 1)',
    'rgba(0, 174, 126, 1)', 'rgba(194, 140, 159, 1)', 'rgba(190, 153, 112, 1)', 'rgba(0, 143, 156, 1)', 'rgba(95, 173, 78, 1)',
    'rgba(255, 0, 0, 1)', 'rgba(255, 0, 246, 1)', 'rgba(255, 2, 157, 1)', 'rgba(104, 61, 59, 1)', 'rgba(255, 116, 163, 1)',
    'rgba(150, 138, 232, 1)', 'rgba(152, 255, 82, 1)', 'rgba(167, 87, 64, 1)', 'rgba(1, 255, 254, 1)', 'rgba(255, 238, 232, 1)',
    'rgba(254, 137, 0, 1)', 'rgba(189, 198, 255, 1)', 'rgba(1, 208, 255, 1)', 'rgba(187, 136, 0, 1)', 'rgba(117, 68, 177, 1)',
    'rgba(165, 255, 210, 1)', 'rgba(255, 166, 254, 1)', 'rgba(119, 77, 0, 1)', 'rgba(122, 71, 130, 1)', 'rgba(38, 52, 0, 1)',
    'rgba(0, 71, 84, 1)', 'rgba(67,, 0, 44, 1)', 'rgba(181, 0, 255, 1)', 'rgba(255, 177, 103, 1)', 'rgba(255, 219, 102, 1)',
    'rgba(144, 251, 146, 1)', 'rgba(126, 45, 210, 1)', 'rgba(189, 211, 147, 1)', 'rgba(229, 111, 254, 1)', 'rgba(222, 255, 116, 1)',
    'rgba(0, 255, 120, 1)', 'rgba(0, 155, 255, 1)', 'rgba(0, 100, 1, 1)', 'rgba(0, 118, 255, 1)', 'rgba(133, 169, 0, 1)',
    'rgba(0, 185, 23, 1)', 'rgba(120, 130, 49, 1)', 'rgba(0, 255, 198, 1)', 'rgba(255, 110, 65, 1)', 'rgba(232, 94, 190, 1)'
];

// The difference between JS epoch (1970) and LV Epoch (1904) in seconds
const LV_EPOCH_DIFF_IN_SECONDS = 2082844800;
// Offset in seconds for timestamp representation in webcharts
const EPOCH_OFFSET_IN_SECONDS = 62135596800;

(function () {
    class SLGraph extends HTMLElement {
        set data (data) {
            this._data = data;
            this._renderData(this._data);
        }

        get data () {
            return this._data;
        }

        connectedCallback () {
            componentUtils.upgradeProperty(this, 'data');
            this._init();
            this._render();
            this._renderData(this._data);
        }

        _onGraphLoaded () {
            this._initialized = true;
            this._renderData(this._data);
        }

        _init () {
            this._i18nPath = this.getAttribute('i18n-path') || '';
            this._webchartsPath = this.getAttribute('webcharts-path') || 'niwebcharts-5.4.2.js';
            this._plots = this._createPlots();

            window.i18nPath = this._i18nPath;
            window.i18nFiles = window.i18nFiles || [];
            if (!window.i18nFiles.includes('Webcharts')) {
                window.i18nFiles.push('Webcharts');
            }
        }

        _createPlots () {
            let elements = [...this.querySelectorAll('sl-graph-plot')];
            return elements.map((item, i) => {
                return {
                    label: item.getAttribute('label'),
                    color: PLOT_COLORS[i % PLOT_COLORS.length]
                };
            });
        }

        _render () {
            componentUtils.addStylesToElement(this, styles);

            let container = document.createElement('div');
            container.classList.add('sl-graph-container');
            container.innerHTML = `
            <ni-cartesian-graph id="sl-graph-main" graph-ref="28">
                <ni-cartesian-axis id="sl-graph-x-axis" show axis-ref="Time" label="Time" show-label axis-position="bottom" showTickLabels="major" format="LVTime:"></ni-cartesian-axis>
                <ni-cartesian-axis id="sl-graph-y-axis" show axis-ref="Value" label="Value" show-label axis-position="left" format="Int32"></ni-cartesian-axis>
                ${this._plots.map((plot) => html`
                    <ni-cartesian-plot show xaxis="Time" yaxis="Value" label="${plot.label}" enable-hover class="ni-cartesian-plot-element">
                        <ni-cartesian-plot-renderer line-width="1" line-stroke="${plot.color}" point-color="${plot.color}" class="ni-cartesian-plot-renderer-element"></ni-cartesian-plot-renderer>
                    </ni-cartesian-plot>
                `.trim()).join('')}
            </ni-cartesian-graph>
            <ni-light-plot-legend show graph-ref="28"></ni-light-plot-legend>
            <ni-plot-legend tooltips graph-ref="28"></ni-plot-legend>
            <ni-graph-tools graph-ref="28" mode="locked"></ni-graph-tools>
            `;
            this.appendChild(container);

            this._attachEvents();

            let depsScript = document.createElement('script');
            depsScript.src = this._webchartsPath;
            depsScript.defer = true;
            this.appendChild(depsScript);
        }

        _formatTooltip (xVal, yVal) {
            return html`<div class="sl-graph-tooltip">
                            <b>Time: </b>${this._intToDate(xVal)}<br/>
                            <b>Value: </b>${yVal}
                        </div>`;
        }

        _attachEvents () {
            let graph = this._getGraph();
            graph.onReady = () => this._onGraphLoaded();

            let plots = [...document.querySelectorAll('ni-cartesian-plot')];
            for (let plot of plots) {
                plot.hoverFormat = this._formatTooltip.bind(this);
            }
        }

        _renderData (data) {
            if (!data || !this._initialized) {
                return;
            }
            let formattedData = data.map((d) => {
                return {
                    Timestamp: this._formatTimestamps(d.Timestamp),
                    Values: d.Values
                };
            });

            this._updateAxis(formattedData);

            let graph = this._getGraph();
            graph.setData(formattedData);
        }

        _updateAxis (data) {
            let limits = this._getLimits(data);
            let x = this._getXAxis();
            x.setAttribute('minimum', limits.timestamp.min || 0);
            x.setAttribute('maximum', limits.timestamp.max || 0);
            let y = this._getYAxis();
            y.setAttribute('minimum', limits.value.min || 0);
            y.setAttribute('maximum', limits.value.max || 0);
        }

        _getLimits (data) {
            let timestampMin;
            let timestampMax;
            let valueMin;
            let valueMax;
            for (let entry of data) {
                for (let timestamp of entry.Timestamp) {
                    if (timestamp > timestampMax || timestampMax === undefined) {
                        timestampMax = timestamp;
                    }
                    if (timestamp < timestampMin || timestampMin === undefined) {
                        timestampMin = timestamp;
                    }
                }
                for (let value of entry.Values) {
                    if (value > valueMax || valueMax === undefined) {
                        valueMax = value;
                    }
                    if (value < valueMin || valueMin === undefined) {
                        valueMin = value;
                    }
                }
            }

            return {
                timestamp: { min: timestampMin, max: timestampMax },
                value: { min: valueMin, max: valueMax }
            };
        }

        _formatTimestamps (timestamps) {
            return timestamps.map((t) => this._dateToInt(t));
        }

        _dateToInt (date) {
            /* global NITimestamp:true */
            let niTime = new NITimestamp(date);
            return niTime.seconds + EPOCH_OFFSET_IN_SECONDS - LV_EPOCH_DIFF_IN_SECONDS + niTime.fractions;
        }

        _intToDate (value) {
            /* global NITimestamp:true */
            let niTime = new NITimestamp(value - EPOCH_OFFSET_IN_SECONDS + LV_EPOCH_DIFF_IN_SECONDS);
            let options = {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric'
            };
            return niTime.toDate().toLocaleDateString(undefined, options);
        }

        _getGraph () {
            return this.querySelector('#sl-graph-main');
        }

        _getXAxis () {
            return this.querySelector('#sl-graph-x-axis');
        }

        _getYAxis () {
            return this.querySelector('#sl-graph-y-axis');
        }
    }
    componentUtils.registerCustomElement('sl-graph', SLGraph);
})();
