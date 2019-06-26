import '../pager/pager.js';

import buttonCss from '../common/styles/button.css';
import checkboxCss from '../common/styles/checkbox.css';
import linkCss from '../common/styles/link.css';
import iconsCss from '../common/styles/icons.css';
import gridStyle from './grid.css';

import { componentUtils } from '../common/component-utils.js';
import { dateUtils } from '../common/date-utils.js';

const styles = [buttonCss, checkboxCss, linkCss, iconsCss, gridStyle];

(function () {
    class SLGrid extends HTMLElement {
        constructor () {
            super();

            this._outsideMenuClickHandler = e => {
                let target = e.composedPath()[0];

                let contents = this.shadowRoot.querySelectorAll('.sl-grid-dropdown-content');
                for (let content of contents) {
                    if (target.getAttribute('data-grid-menu-row') !== content.getAttribute('data-grid-menu-row')) {
                        content.parentNode.removeChild(content);
                    }
                }
                contents = this.shadowRoot.querySelectorAll('.sl-grid-column-select-dropdown-content');
                for (let content of contents) {
                    if (target.getAttribute('column-select-menu') !== content.getAttribute('column-select-menu')) {
                        content.parentNode.removeChild(content);
                    }
                }
            };
        }

        set data (data) {
            this._items = data.items;
            this._totalCount = data.totalCount;

            this._renderItems();
        }

        connectedCallback () {
            componentUtils.upgradeProperty(this, 'data');
            if (!this.shadowRoot) {
                this._init();
                this._renderGrid();
            }
            this._renderItems();
            document.addEventListener('click', this._outsideMenuClickHandler);
        }

        disconnectedCallback () {
            document.removeEventListener('click', this._outsideMenuClickHandler);
        }

        _renderGrid () {
            this.attachShadow({ mode: 'open' });

            let container = document.createElement('div');
            container.classList.add('sl-grid-main');

            let header = this._createHeader();
            container.appendChild(header);

            let body = this._createBody();
            container.appendChild(body);

            let pager = this._createPager();

            let dynamicStyle = this._createGridTemplateStyle();
            let dynamicStyleElement = componentUtils.createStyleElement(dynamicStyle);
            dynamicStyleElement.id = 'sl-grid-dynamic-style';

            componentUtils.addStylesToElement(this.shadowRoot, styles);
            this.shadowRoot.appendChild(dynamicStyleElement);
            this.shadowRoot.appendChild(container);
            this.shadowRoot.appendChild(pager);
        }

        _init () {
            this._page = 1;
            this._pageSize = this._parseInteger(this.getAttribute('page-size') || '20');
            this._pageSizeLabel = this.getAttribute('page-size-label');
            this._goToPageLabel = this.getAttribute('go-to-page-label');
            this._currentPageLabel = this.getAttribute('current-page-label');
            this._locale = this.getAttribute('locale');
            this._showSelectAll = this._parseBoolean(this.getAttribute('show-select-all') || 'false');

            this._settings = this._loadSettings();
            this._columns = this._createColumns();
        }

        _createColumns () {
            let elements = [...this.querySelectorAll('sl-grid-column')];
            return elements.map((item) => {
                return {
                    type: item.getAttribute('type'),
                    name: item.getAttribute('name'),
                    title: item.getAttribute('title'),
                    field: item.getAttribute('field'),
                    width: item.getAttribute('width'),
                    icon: item.getAttribute('icon'),
                    optional: this._parseBoolean(item.getAttribute('optional') || 'false'),
                    show: this._isColumnVisible(item),
                    showOnMobile: this._parseBoolean(item.getAttribute('show-on-mobile') || 'true'),
                    sortable: this._parseBoolean(item.getAttribute('sortable') || 'true'),
                    items: this._createColumnItems(item)
                };
            });
        }

        _isColumnVisible (item) {
            let name = item.getAttribute('name');
            let columnSettings = this._settings.columns[name];
            if (columnSettings) {
                return columnSettings.visible;
            }
            return this._parseBoolean(item.getAttribute('show') || 'true');
        }

        _createColumnItems (item) {
            let elements = [...item.querySelectorAll('sl-grid-column-item')];
            return elements.map((item) => {
                return {
                    name: item.getAttribute('name'),
                    title: item.getAttribute('title')
                };
            });
        }

        _parseInteger (str) {
            return parseInt(str);
        }

        _parseBoolean (str) {
            return str === 'true';
        }

        _updateSort (sortBy, sortOrder) {
            let headerTexts = this._getHeaderTexts();
            for (let text of headerTexts) {
                let columnName = text.parentNode.getAttribute('data-column-name');
                if (columnName === sortBy && sortOrder === 'asc') {
                    text.classList.remove('sl-grid-sort-desc');
                    text.classList.add('sl-grid-sort-asc');
                } else if (columnName === sortBy && sortOrder === 'desc') {
                    text.classList.add('sl-grid-sort-desc');
                    text.classList.remove('sl-grid-sort-asc');
                } else {
                    text.classList.remove('sl-grid-sort-desc');
                    text.classList.remove('sl-grid-sort-asc');
                }
            }
        }

        _createGridTemplateStyle () {
            let widths = '';
            let mobileWidths = '';
            for (let column of this._columns) {
                let width = column.show ? (column.width || '1fr') : ' 0px';
                widths += ' ' + width;
                mobileWidths += column.showOnMobile ? ' ' + width : ' 0px';
            }

            let dynamicStyle = `
                .sl-grid-row {
                    display: grid;
                    grid-template-columns: ${widths};
                }

                @media (max-width: 425px) {
                    .sl-grid-row {
                        grid-template-columns: ${mobileWidths};
                    }
                }
                `;
            return dynamicStyle;
        }

        _createHeader () {
            let header = document.createElement('div');
            header.classList.add('sl-grid-header');
            header.classList.add('sl-grid-row');

            for (let column of this._columns) {
                let element = this._createHeaderCell(column);
                if (this._showHeaderMenu(column, this._columns)) {
                    this._renderHeaderCellMenu(element);
                }
                header.appendChild(element);
            }
            return header;
        }

        _createHeaderCell (column) {
            let element = document.createElement('div');
            element.classList.add('sl-grid-cell');
            element.setAttribute('data-column-name', column.name);
            element.id = 'header-cell-column-' + column.name;

            let title = document.createElement('div');
            title.classList.add('sl-grid-header-text');
            title.textContent = column.title;
            element.appendChild(title);

            if (column.sortable) {
                title.addEventListener('click', () => {
                    if (this._sortBy !== column.name) {
                        this._sortBy = column.name;
                        this._sortOrder = 'asc';
                    } else if (this._sortBy === column.name && this._sortOrder === 'asc') {
                        this._sortOrder = 'desc';
                    } else if (this._sortBy === column.name) {
                        delete this._sortBy;
                        delete this._sortOrder;
                    }
                    this._updateSort(this._sortBy, this._sortOrder);
                    this._updateEvent();
                });
            }
            if (this._showSelectAll && column.type === 'checkbox') {
                this._appendSelectAll(element);
            }
            return element;
        }

        _renderHeaderCellMenu (cell) {
            let iconElement = document.createElement('div');
            iconElement.classList.add('sl-grid-cell-icon-menu');
            iconElement.classList.add('sl-grid-header-cell-menu');
            let icon = document.createElement('strong');
            iconElement.appendChild(icon);
            icon.classList.add('fa');
            icon.innerHTML = '&#xf078';
            cell.appendChild(iconElement);

            iconElement.addEventListener('click', (e) => {
                if (!this._isMenuOpen('column-select-menu', cell.id)) {
                    let menu = this._renderColumnSelectMenu(cell.id);
                    menu.style.display = 'block';
                    menu.style.visibility = 'hidden';
                    this.shadowRoot.appendChild(menu);

                    let buttonRect = iconElement.getBoundingClientRect();
                    let menuRect = menu.getBoundingClientRect();
                    menu.style.left = this._calculateInsideViewPort(buttonRect.left, menuRect.width, window.innerWidth) + 'px';
                    menu.style.top = (buttonRect.bottom + window.scrollY) + 'px';
                    menu.style.visibility = 'visible';
                }
            });

            iconElement.setAttribute('column-select-menu', cell.id);
            icon.setAttribute('column-select-menu', cell.id);
        }

        _calculateInsideViewPort (start, size, total) {
            if (start + size > total) {
                return total - size;
            }
            return start;
        }

        _renderColumnSelectMenu (id) {
            let content = document.createElement('div');
            content.setAttribute('column-select-menu', id);
            content.classList.add('sl-grid-column-select-dropdown-content');
            content.classList.add('sl-grid-dropdown-content');

            for (let column of this._columns) {
                if (column.optional) {
                    let menuItem = this._renderColumnSelectMenuItem(column, id);
                    content.appendChild(menuItem);
                }
            }
            return content;
        }

        _renderColumnSelectMenuItem (column, id) {
            let checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.id = 'sl-column-select-' + column.title;
            checkbox.classList.add('mc-checkbox');
            checkbox.classList.add('sl-grid-checkbox');
            checkbox.checked = column.show;
            checkbox.setAttribute('column-select-menu', id);

            let label = document.createElement('label');
            label.setAttribute('for', checkbox.id);
            label.innerHTML = column.title;
            label.classList.add('sl-column-select-checkbox-label');
            label.setAttribute('column-select-menu', id);

            let menuItem = document.createElement('div');
            menuItem.setAttribute('column-select-menu', id);
            menuItem.classList.add('dropdown-menu-item');

            menuItem.appendChild(checkbox);
            menuItem.appendChild(label);

            menuItem.addEventListener('click', () => {
                checkbox.checked = !checkbox.checked;
                column.show = checkbox.checked;
                let style = this._getDynamicStyleElement();
                style.textContent = this._createGridTemplateStyle();
                this._settings.columns[column.name] = { visible: checkbox.checked };
                this._saveSettings(this._settings);
            });

            return menuItem;
        }

        _appendSelectAll (element) {
            let checkbox = document.createElement('input');
            checkbox.id = 'sl-grid-select-all-checkbox';
            checkbox.type = 'checkbox';
            checkbox.classList.add('mc-checkbox');
            checkbox.addEventListener('change', () => {
                let checked = checkbox.checked;
                for (let c of this._getCheckboxes()) {
                    if (c.checked !== checked) {
                        c.checked = checked;
                        c.dispatchEvent(new Event('change'));
                    }
                }
            });

            let label = document.createElement('label');
            label.setAttribute('for', checkbox.id);

            element.classList.add('sl-grid-cell-checkbox');
            element.appendChild(checkbox);
            element.appendChild(label);
        }

        _updateHeaderCheckbox () {
            if (this._showSelectAll) {
                let checked = true;
                for (let c of this._getCheckboxes()) {
                    if (!c.checked) {
                        checked = false;
                        break;
                    }
                }

                let selectAllCheckbox = this._getSelectAllCheckbox();
                selectAllCheckbox.checked = checked;
            }
        }

        _createBody () {
            let body = document.createElement('div');
            body.classList.add('sl-grid-body');
            return body;
        }

        _renderItems () {
            if (!this._items) {
                return;
            }

            let body = this._getBody();
            body.innerHTML = '';
            for (let [rowNumber, item] of this._items.entries()) {
                let row = this._renderRow(rowNumber, item);
                body.appendChild(row);
            }

            this._updatePager();
            this._updateHeaderCheckbox();
        }

        _renderRow (rowNumber, item) {
            let row = document.createElement('div');
            row.classList.add('sl-grid-row');
            if (this._isAlternateRow(rowNumber)) {
                row.classList.add('sl-grid-row-alt');
            }
            for (let column of this._columns) {
                let cell = this._renderCell(rowNumber, column, item);
                row.appendChild(cell);
            }
            return row;
        }

        _isAlternateRow (rowNumber) {
            return (rowNumber & 1) === 1;
        }

        _renderCell (rowNumber, column, item) {
            let cell = document.createElement('div');
            cell.classList.add('sl-grid-cell');

            switch (column.type) {
            case 'checkbox':
                this._renderCellCheckbox(cell, column, item, rowNumber);
                break;
            case 'icon':
                this._renderCellIcon(cell, column, item);
                break;
            case 'icon-menu':
                this._renderCellIconMenu(cell, column, item, rowNumber);
                break;
            case 'text':
                this._renderCellText(cell, column, item);
                break;
            case 'url':
                this._renderCellUrl(cell, column, item);
                break;
            case 'date':
                this._renderCellDate(cell, column, item);
                break;
            case 'button':
                this._renderCellButton(cell, column, item);
                break;
            }
            return cell;
        }

        _showHeaderMenu (column, allColumns) {
            let anyOptionalColumns = allColumns.some((c) => c.optional);
            return anyOptionalColumns && !(['checkbox', 'icon', 'icon-menu'].includes(column.type));
        }

        _renderCellCheckbox (cell, column, item, rowNumber) {
            cell.classList.add('sl-grid-cell-checkbox');

            let checkbox = document.createElement('input');
            checkbox.id = 'sl-grid-checkbox-' + rowNumber;
            checkbox.type = 'checkbox';
            checkbox.classList.add('mc-checkbox');
            checkbox.classList.add('sl-grid-checkbox');
            checkbox.checked = item.checked;
            checkbox.addEventListener('change', () => {
                item.checked = checkbox.checked;
                this._checkboxChangeEvent(item.checked, item);
                this._updateHeaderCheckbox();
            });

            let label = document.createElement('label');
            label.setAttribute('for', checkbox.id);

            cell.appendChild(checkbox);
            cell.appendChild(label);
        }

        _renderCellIcon (cell, column, item) {
            cell.classList.add('sl-grid-cell-icon');
            cell.addEventListener('click', e => {
                this._actionEvent(column.name, item);
            });

            let iconElement = document.createElement('strong');
            iconElement.classList.add('fa');
            iconElement.textContent = column.icon;
            cell.appendChild(iconElement);
        }

        _renderCellText (cell, column, item) {
            cell.textContent = this._getField(item, column.field);
        }

        _renderCellUrl (cell, column, item) {
            let text = this._getField(item, column.field);
            let url = this._getField(item, column.field + 'Url');

            let link = document.createElement('a');
            link.classList.add('mc-link');
            link.href = url;
            link.textContent = text;
            cell.appendChild(link);
        }

        _renderCellDate (cell, column, item) {
            let value = this._getField(item, column.field);
            let formattedDate = dateUtils.format(value, this._locale);
            cell.textContent = formattedDate;
        }

        _renderCellButton (cell, column, item) {
            let button = document.createElement('button');
            button.classList.add('mc-button');
            button.classList.add('sl-grid-button');
            button.textContent = this._getField(item, column.field);
            button.addEventListener('click', e => {
                this._actionEvent(column.name, item);
            });
            cell.appendChild(button);
        }

        _renderCellIconMenu (cell, column, item, rowNumber) {
            cell.classList.add('sl-grid-cell-icon-menu');
            cell.setAttribute('data-grid-menu-row', rowNumber);

            let iconElement = document.createElement('strong');
            iconElement.classList.add('fa');
            iconElement.textContent = column.icon;
            iconElement.setAttribute('data-grid-menu-row', rowNumber);
            cell.appendChild(iconElement);

            cell.addEventListener('click', (e) => {
                if (this._isMenuOpen('data-grid-menu-row', rowNumber)) {
                    return;
                }

                let menu = this._createMenu(column.items, item);
                menu.setAttribute('data-grid-menu-row', rowNumber);
                let rect = cell.getBoundingClientRect();
                menu.style.left = (rect.left + window.scrollX) + 'px';
                menu.style.top = (rect.bottom + window.scrollY) + 'px';
                this.shadowRoot.appendChild(menu);
            });
        }

        _getField (item, field) {
            let pathArray = field.split('.');
            return pathArray.reduce((obj, key) => (obj && obj[key] !== 'undefined') ? obj[key] : '', item);
        }

        _isMenuOpen (indexAttribute, value) {
            return this.shadowRoot.querySelector(`.sl-grid-dropdown-content[${indexAttribute}="${value}"]`) !== null;
        }

        _createMenu (menuItems, item) {
            let content = document.createElement('div');
            content.classList.add('sl-grid-dropdown-content');

            for (let menuItem of menuItems) {
                let link = this._createMenuItemLink(menuItem, item);
                content.appendChild(link);
            }
            return content;
        }

        _createMenuItemLink (menuItem, item) {
            let link = document.createElement('a');
            link.textContent = menuItem.title;
            link.addEventListener('click', e => {
                this._actionEvent(menuItem.name, item);
            });
            return link;
        }

        _createPager () {
            let pager = document.createElement('mc-pager');
            pager.setAttribute('page-size-label', this._pageSizeLabel);
            pager.setAttribute('go-to-page-label', this._goToPageLabel);
            pager.setAttribute('current-page-label', this._currentPageLabel);

            pager.addEventListener('page-change', (e) => {
                this._page = e.detail.page;
                this._pageSize = e.detail.pageSize;
                this._updateEvent();
            });

            return pager;
        }

        _updatePager () {
            let pager = this.shadowRoot.querySelector('mc-pager');
            pager.setAttribute('page-size', this._pageSize);
            pager.setAttribute('page', this._page);
            pager.setAttribute('items', this._totalCount);
        }

        _checkboxChangeEvent (checked, item) {
            let event = new Event('grid-checkbox-change');
            event.detail = {
                checked: checked,
                item: item
            };
            this.dispatchEvent(event);
        }

        _actionEvent (action, item) {
            let event = new Event('grid-action');
            event.detail = {
                action: action,
                item: item
            };
            this.dispatchEvent(event);
        }

        _updateEvent () {
            let eventData = {
                page: this._page,
                pageSize: this._pageSize,
                sortBy: this._sortBy,
                sortOrder: this._sortOrder
            };
            this.dispatchEvent(new CustomEvent('grid-update-data', { detail: eventData }));
        }

        _getHeaderTexts () {
            return this.shadowRoot.querySelectorAll('.sl-grid-header-text');
        }

        _getBody () {
            return this.shadowRoot.querySelector('.sl-grid-body');
        }

        _getSelectAllCheckbox () {
            return this.shadowRoot.querySelector('#sl-grid-select-all-checkbox');
        }

        _getCheckboxes () {
            return this.shadowRoot.querySelectorAll('.sl-grid-checkbox');
        }

        _getDynamicStyleElement () {
            return this.shadowRoot.querySelector('#sl-grid-dynamic-style');
        }

        _loadSettings () {
            let settings = localStorage.getItem(this.id + '-settings');
            if (!settings) {
                return { columns: {} };
            }
            return JSON.parse(settings);
        }

        _saveSettings (settings) {
            if (this._shouldSaveSettings()) {
                localStorage.setItem(this.id + '-settings', JSON.stringify(settings));
            }
        }

        _shouldSaveSettings () {
            if (this.id) {
                return true;
            }
            return false;
        }
    }

    componentUtils.registerCustomElement('sl-grid', SLGrid);
})();
