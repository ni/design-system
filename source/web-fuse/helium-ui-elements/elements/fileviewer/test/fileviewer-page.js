import { GridPage } from '../../grid/test/grid-page.js';
import { ToolbarPage } from '../../toolbar/test/toolbar-page.js';
import { DialogPage } from '../../dialog/test/dialog-page.js';
import { FilterBuilderPage } from '../../filter-builder/test/filter-builder-page.js';
import { UploadPage } from '../../upload/test/upload-page.js';
import { FileViewerDetailsPage } from './fileviewer-details-page.js';

export class FileViewerPage {
    getRoot () {
        return document.querySelector('sl-fileviewer').shadowRoot;
    }

    getDetailsPage () {
        return new FileViewerDetailsPage(this.getRoot().querySelector('sl-fileviewer-details'));
    }

    getUploadPage () {
        return new UploadPage(this.getRoot().querySelector('mc-upload'));
    }

    getGridPage () {
        return new GridPage(this.getRoot().querySelector('sl-grid'));
    }

    getFilterBuilderPage () {
        return new FilterBuilderPage(this.getRoot().querySelector('sl-filter-builder'));
    }

    getActionToolbarPage () {
        return new ToolbarPage(this.getRoot().querySelector('.sl-fileviewer-action'));
    }

    getFilterToolbarPage () {
        return new ToolbarPage(this.getRoot().querySelector('.sl-fileviewer-filter'));
    }

    getDialogPage () {
        return new DialogPage(this.getRoot().querySelector('mc-dialog'));
    }

    getMain () {
        return this.getRoot().querySelector('.sl-fileviewer-main');
    }

    getRows () {
        return this.getGridPage().getRows();
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

    clickCheckbox (rowIndex) {
        let cell = this.getCell(rowIndex, 0);
        let checkbox = cell.querySelector('input');
        checkbox.click();
    }

    clickEdit (rowIndex) {
        let cell = this.getCell(rowIndex, 1);
        cell.click();
    }

    clickUpload () {
        this.getActionToolbarPage().getToolbarItems()[0].click();
    }

    clickDeleteFile () {
        let item = this.getActionToolbarPage().getToolbarItems()[3];
        let clickEvent = new CustomEvent('click');
        item.dispatchEvent(clickEvent);
    }

    startUpload (content, fileName) {
        this.getUploadPage().startUpload(content, fileName);
    }

    getUploadText () {
        return this.getUploadPage().getFormText();
    }

    clickUpdateButton () {
        this.getDialogPage().getLeftButton().click();
    }

    clickDialogOKButton () {
        this.getDialogPage().getMiddleButton().click();
    }

    getDialogHeader () {
        return this.getDialogPage().getHeader();
    }

    clickFilter () {
        this.getFilterToolbarPage().getToolbarItems()[0].click();
    }

    getFilterBuilderFieldSelector (index) {
        return this.getFilterBuilderPage().getFieldSelector(index);
    }

    getFilterBuilderValueInput (index) {
        return this.getFilterBuilderPage().getValueInput(index);
    }

    getSearchInput () {
        return this.getRoot().querySelector('.sl-fileviewer-search-input');
    }
}
