export class GridPage {
    constructor (element) {
        this._element = element;
    }

    getRoot () {
        return this._element ? this._element.shadowRoot : document.querySelector('sl-grid').shadowRoot;
    }

    getMain () {
        return this.getRoot().querySelector('.sl-grid-main');
    }

    getRows () {
        return this.getRoot().querySelectorAll('.sl-grid-body .sl-grid-row');
    }

    getRow (rowIndex) {
        return this.getRows()[rowIndex];
    }

    getCells (rowIndex) {
        let row = this.getRow(rowIndex);
        return row.querySelectorAll('.sl-grid-cell');
    }

    getCell (rowIndex, columnIndex) {
        let cells = this.getCells(rowIndex);
        return cells[columnIndex];
    }

    clickCell (rowIndex, columnIndex) {
        let cell = this.getCell(rowIndex, columnIndex);
        cell.click();
    }

    getMenuEntry (index) {
        return this.getRoot().querySelector(`.sl-grid-dropdown-content a:nth-child(${index + 1})`);
    }

    clickMenuEntry (index) {
        let entry = this.getMenuEntry(index);
        entry.click();
    }

    getHeaderTexts () {
        return this.getRoot().querySelectorAll('.sl-grid-header-text');
    }

    getHeaderText (columnIndex) {
        return this.getHeaderTexts()[columnIndex];
    }

    clickHeaderText (columnIndex) {
        this.getHeaderText(columnIndex).click();
    }

    getHeaderCellMenuButtons () {
        return this.getRoot().querySelectorAll('.sl-grid-header-cell-menu');
    }

    getHeaderCellMenuButton (columnIndex) {
        return this.getHeaderCellMenuButtons()[columnIndex];
    }

    clickHeaderCellMenuButton (columnIndex) {
        this.getHeaderCellMenuButton(columnIndex).click();
    }

    getHeaderCellMenu () {
        return this.getRoot().querySelector('.sl-grid-column-select-dropdown-content');
    }

    getHeaderCellMenuCheckboxes () {
        return this.getHeaderCellMenu().querySelectorAll('.dropdown-menu-item .sl-grid-checkbox');
    }

    getHeaderCellMenuItems () {
        return this.getHeaderCellMenu().querySelectorAll('.dropdown-menu-item');
    }

    getHeaderCellMenuItem (index) {
        return this.getHeaderCellMenuItems()[index];
    }

    clickHeaderCellMenuItem (columnIndex) {
        this.getHeaderCellMenuItem(columnIndex).click();
    }

    getLink (element) {
        return element.querySelector('a');
    }

    getButton (element) {
        return element.querySelector('button');
    }

    getInput (element) {
        return element.querySelector('input');
    }

    clickNextPage () {
        this.getPagerRoot().querySelector('.mc-pager-button-next').click();
    }

    getSelectAll () {
        return this.getRoot().querySelector('#sl-grid-select-all-checkbox');
    }

    getCheckboxes () {
        return this.getRoot().querySelectorAll('.sl-grid-checkbox');
    }

    getPagerRoot () {
        return this.getRoot().querySelector('mc-pager').shadowRoot;
    }
}
