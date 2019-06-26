import '../tagviewer.js';

import { createFixture, isVisible, enterValue, selectOption } from '../../test/test-utils.js';
import { TagViewerPage } from './tagviewer-page.js';

const TAGVIEWER_I18N = {
    toolbar: {
        create: 'Create',
        update: 'Update',
        resetAggregates: 'Reset Aggregates',
        delete: 'Delete',
        history: 'History',
        csvExport: 'Export to CSV',
        csvExportHistory: 'Export History',
        csvExportDetails: 'Export Details',
        filter: 'Filter',
        search: 'Filter'
    },
    grid: {
        path: 'Path',
        value: 'Current Value',
        min: 'Min',
        max: 'Max',
        mean: 'Mean',
        count: 'Count',
        updated: 'Updated',
        type: 'Type',
        keywords: 'Keywords',
        collectAggregates: 'Collect Aggregates',
        goToPageLabel: 'Go to page: ',
        pageSizeLabel: 'Show rows: ',
        currentPageLabel: '{from}-{to} of {total}',
        locale: 'en-US'
    },
    filter: {
        MATCHES: 'matches',
        EQUALS: 'equals'
    },
    createDialog: {
        header: 'Create Tag',
        create: 'CREATE',
        cancel: 'CANCEL',
        path: 'Path:',
        type: 'Type:',
        retention: 'Retention:',
        collectAggregates: 'Collect Aggregates:'
    },
    queryTagHistory: {
        header: 'Query for Tag History',
        getHistory: 'QUERY HISTORY',
        cancel: 'CANCEL',
        range: 'Select Time Range:',
        samples: 'Samples:',
        _30d: '30 Days',
        _6m: '6 Months',
        _1y: '1 Year',
        mustBePositiveInteger: 'Samples must be a positive integer!'
    },
    types: {
        INT: '32-bit Integer',
        DOUBLE: 'Double',
        U_INT64: '64-bit Unsigned Integer',
        STRING: 'String',
        BOOLEAN: 'Boolean',
        DATE_TIME: 'Timestamp'
    },
    retention: {
        NONE: 'None',
        COUNT: 'Count',
        DURATION: 'Duration',
        PERMANENT: 'Permanent'
    },
    errorDialog: {
        header: {
            tagData: 'Could not load tag data!',
            tagCreate: 'Could not create tag!',
            tagDelete: 'Could not delete tag!',
            tagResetAggregates: 'Could not reset tag aggregates!',
            tagUpdateValues: 'Could not update tag values!',
            tagUpdate: 'Could not update tags!',
            tagHistory: 'Could not get tag history!',
            tagExportDetails: 'Could not export tag details!',
            tagExportHistory: 'Could not export tag history!'
        },
        close: 'CLOSE'
    },
    deleteDialog: {
        delete: 'DELETE',
        cancel: 'CANCEL',
        singleMessage: 'Are you sure you want to delete "{path}"?',
        multipleMessage: 'Are you sure you want to delete {count} tags?'
    },
    detailsDialog: {
        header: 'Update Tag Details',
        update: 'Update',
        delete: 'Delete',
        cancel: 'Cancel'
    },
    details: {
        path: 'Path:',
        value: 'Value:',
        updated: 'Updated:',
        collectAggregates: 'Collect Aggregates:',
        retentionLabels: {
            text: 'Retention:',
            maxCount: 'Max Count',
            days: 'Days:'
        },
        retention: {
            NONE: 'None',
            COUNT: 'Count',
            DURATION: 'Duration',
            PERMANENT: 'Permanent'
        },
        type: 'Type:',
        keywords: 'Keywords:',
        keywordsPlaceholder: 'Keyword',
        properties: 'Properties:',
        propertiesKey: 'Key',
        propertiesValue: 'Value',
        locale: 'en-US',
        types: {
            INT: '32-bit Integer',
            DOUBLE: 'Double',
            U_INT64: '64-bit Unsigned Integer',
            STRING: 'String',
            BOOLEAN: 'Boolean',
            DATE_TIME: 'Timestamp'
        },
        validationErrors: {
            mustBeInteger: 'Tag value must be an integer!',
            mustBePositiveInteger: 'Tag value must be a positive integer!',
            mustBeDouble: 'Tag value must be a double!',
            mustBeTimestamp: 'Tag value must be a timestamp!',
            mustBeBoolean: 'Tag value must be boolean! (true or false)'
        }
    }
};

describe('Tag Viewer', () => {
    let createTag = function (path, type, value, collectAggregates, keywords, properties) {
        return {
            tag: {
                path: path,
                type: type,
                collectAggregates: collectAggregates || false,
                properties: properties || {},
                keywords: keywords || []
            },
            current: {
                updated: new Date(2019, 2, 3, 14, 1, 1, 123),
                value: {
                    type: type,
                    value: value
                }
            },
            value: value
        };
    };

    let generateItems = function (count) {
        let result = [];
        for (let i = 1; i <= count; i++) {
            result.push({
                tag: {
                    path: 'tag-' + i,
                    type: 'INT',
                    collectAggregates: true,
                    properties: {
                        'a': 1,
                        'b': 2,
                        'nitagRetention': 'COUNT',
                        'nitagMaxHistoryCount': '20'
                    },
                    keywords: ['keyword-a', 'keyword-b']
                },
                current: {
                    timestamp: new Date(2019, 2, 3, 14, 1, 1, 123),
                    value: {
                        type: 'INT',
                        value: i
                    }
                },
                aggregates: {
                    avg: 1.5,
                    min: 1,
                    max: 2,
                    count: 11,
                    type: 'INT'
                }
            });
        }
        return result;
    };

    let loadItems = function (totalCount, page, pageSize, sortBy, sortOrder) {
        let items = generateItems(totalCount);
        let startIndex = (page - 1) * pageSize;
        let endIndex = page * pageSize;
        return items.slice(startIndex, endIndex);
    };

    beforeEach(function () {
        this.page = new TagViewerPage();
    });

    describe('Basic', () => {
        beforeEach(function () {
            this.element = createFixture(
                `<sl-tagviewer></sl-tagviewer>`);
            this.element.i18n = TAGVIEWER_I18N;
            this.element.data = {
                items: loadItems(21, 1, 20),
                totalCount: 21
            };
            this.element.addEventListener('tag-data', (e) => {
                let page = e.detail.page;
                let pageSize = e.detail.pageSize;
                let sortBy = e.detail.sortBy;
                let sortOrder = e.detail.sortOrder;
                this.element.data = {
                    items: loadItems(21, page, pageSize, sortBy, sortOrder),
                    totalCount: 21
                };
            });
        });

        it('should show the tagviewer', function () {
            let main = this.page.getMain();

            expect(isVisible(main)).toBeTruthy();
        });

        it('should show the rows', function () {
            let rows = this.page.getRows();
            expect(rows.length).toBe(20);

            let cell1 = this.page.getCell(0, 2);
            expect(cell1.textContent).toBe('tag-1');

            let cell2 = this.page.getCell(0, 3);
            expect(cell2.textContent).toBe('1');

            let cell3 = this.page.getCell(0, 4);
            expect(cell3.textContent).toBe('1');

            let cell4 = this.page.getCell(0, 5);
            expect(cell4.textContent).toBe('2');

            let cell5 = this.page.getCell(0, 6);
            expect(cell5.textContent).toBe('1.5');

            let cell6 = this.page.getCell(0, 7);
            expect(cell6.textContent).toBe('11');

            let cell7 = this.page.getCell(0, 8);
            expect(cell7.textContent).toBe('Mar 3, 2019 at 2:01 PM');
        });

        it('should display dialog on error', function () {
            this.element.showErrorDialog(this.element._i18n.errorDialog.header.tagResetAggregates);

            expect(this.page.getDialogHeader().textContent).toBe('Could not reset tag aggregates!');
        });
    });

    describe('Create Tag', () => {
        beforeEach(function () {
            this.element = createFixture(`<sl-tagviewer></sl-tagviewer>`);
            this.element.i18n = TAGVIEWER_I18N;
        });

        it('should fire event when creating a new tag', function () {
            this.element.addEventListener('tag-create', (e) => {
                this.eventDetail = e.detail;
            });

            this.page.clickCreateTag();
            enterValue(this.page.getNewTagPath(), 'my-new-tag');

            this.page.clickCreateButton();

            expect(this.eventDetail.tag).toEqual({
                path: 'my-new-tag',
                type: 'INT',
                collectAggregates: false,
                keywords: [],
                properties: {
                    nitagRetention: 'NONE'
                }
            });
        });

        it('should disable create button without tag path', function () {
            this.page.clickCreateTag();

            let button = this.page.getCreateButton();

            expect(button.disabled).toBeTruthy();
        });

        it('should create tag with aggregates, count retention and type', function () {
            this.element.addEventListener('tag-create', (e) => {
                this.eventDetail = e.detail;
            });

            this.page.clickCreateTag();
            enterValue(this.page.getNewTagPath(), 'my-new-tag');
            selectOption(this.page.getNewTagType(), 'STRING');
            selectOption(this.page.getNewTagRetention(), 'COUNT');
            this.page.getNewTagCollectAggregates().click();

            this.page.clickCreateButton();

            expect(this.eventDetail.tag).toEqual({
                path: 'my-new-tag',
                type: 'STRING',
                collectAggregates: true,
                keywords: [],
                properties: {
                    nitagRetention: 'COUNT',
                    nitagMaxHistoryCount: '10000'
                }
            });
        });

        it('should create tag with duration retention', function () {
            this.element.addEventListener('tag-create', (e) => {
                this.eventDetail = e.detail;
            });

            this.page.clickCreateTag();
            enterValue(this.page.getNewTagPath(), 'my-new-tag');
            selectOption(this.page.getNewTagType(), 'DATE_TIME');
            selectOption(this.page.getNewTagRetention(), 'DURATION');

            this.page.clickCreateButton();

            expect(this.eventDetail.tag).toEqual({
                path: 'my-new-tag',
                type: 'DATE_TIME',
                collectAggregates: false,
                keywords: [],
                properties: {
                    nitagRetention: 'DURATION',
                    nitagHistoryTTLDays: '30'
                }
            });
        });
    });

    describe('Update Value', () => {
        beforeEach(function () {
            this.element = createFixture(`<sl-tagviewer></sl-tagviewer>`);
            this.element.i18n = TAGVIEWER_I18N;
            this.element.data = {
                items: [
                    createTag('tag-1', 'INT', '1'),
                    createTag('tag-2', 'INT', '2'),
                    createTag('tag-3', 'STRING', 'test'),
                    createTag('tag-4', 'DOUBLE', '1.2'),
                    createTag('tag-5', 'U_INT64', '199'),
                    createTag('tag-6', 'DATE_TIME', '2000-01-01T01:01:01Z'),
                    createTag('tag-7', 'BOOLEAN', 'true')
                ],
                totalCount: 7
            };
        });

        it('should fire event when updating a tag value', function () {
            this.element.addEventListener('tag-update-values', (e) => {
                this.eventDetail = e.detail;
            });

            this.page.clickCheckbox(0);
            this.page.clickUpdate();

            enterValue(this.page.getDetailsPage().getValueInput(), '11');

            this.page.clickUpdateButton();

            expect(this.eventDetail.tags.length).toBe(1);
            expect(this.eventDetail.tags[0].path).toBe('tag-1');
            expect(this.eventDetail.value).toBe('11');
        });

        it('should fire event when updating multiple tag values', function () {
            this.element.addEventListener('tag-update-values', (e) => {
                this.eventDetail = e.detail;
            });

            this.page.clickCheckbox(0);
            this.page.clickCheckbox(1);
            this.page.clickUpdate();

            enterValue(this.page.getDetailsPage().getValueInput(), '11');

            this.page.clickUpdateButton();

            expect(this.eventDetail.tags.length).toBe(2);
            expect(this.eventDetail.tags[0].path).toBe('tag-1');
            expect(this.eventDetail.tags[1].path).toBe('tag-2');
            expect(this.eventDetail.value).toBe('11');
        });

        it('should show validation error when value is not INT', function () {
            this.element.addEventListener('tag-update-values', (e) => {
                this.eventDetail = e.detail;
            });

            this.page.clickCheckbox(0);
            this.page.clickCheckbox(1);
            this.page.clickUpdate();

            enterValue(this.page.getDetailsPage().getValueInput(), 'not-INT');

            this.page.clickUpdateButton();

            expect(this.page.getDetailsPage().getValueErrorMessage().textContent).toBe('Tag value must be an integer!');
        });

        it('should allow updating INT and STRING tag values when value is INT', function () {
            this.element.addEventListener('tag-update-values', (e) => {
                this.eventDetail = e.detail;
            });

            this.page.clickCheckbox(0);
            this.page.clickCheckbox(2);
            this.page.clickUpdate();

            enterValue(this.page.getDetailsPage().getValueInput(), '11');

            this.page.clickUpdateButton();

            expect(this.eventDetail.tags.length).toBe(2);
            expect(this.eventDetail.tags[0].path).toBe('tag-1');
            expect(this.eventDetail.tags[0].type).toBe('INT');
            expect(this.eventDetail.tags[1].path).toBe('tag-3');
            expect(this.eventDetail.tags[1].type).toBe('STRING');
            expect(this.eventDetail.value).toBe('11');
        });

        it('should show validation error when updating INT and STRING tag values with a STRING value', function () {
            this.element.addEventListener('tag-update-values', (e) => {
                this.eventDetail = e.detail;
            });

            this.page.clickCheckbox(0);
            this.page.clickCheckbox(2);
            this.page.clickUpdate();

            enterValue(this.page.getDetailsPage().getValueInput(), 'not-INT');

            this.page.clickUpdateButton();

            expect(this.page.getDetailsPage().getValueErrorMessage().textContent).toBe('Tag value must be an integer!');
        });

        it('should show validation error when updating DOUBLE with an invalid value', function () {
            this.element.addEventListener('tag-update-values', (e) => {
                this.eventDetail = e.detail;
            });

            this.page.clickCheckbox(3);
            this.page.clickUpdate();

            enterValue(this.page.getDetailsPage().getValueInput(), 'not-Double');

            this.page.clickUpdateButton();

            expect(this.page.getDetailsPage().getValueErrorMessage().textContent).toBe('Tag value must be a double!');
        });

        it('should show validation error when updating U_INT64 with an invalid value', function () {
            this.element.addEventListener('tag-update-values', (e) => {
                this.eventDetail = e.detail;
            });

            this.page.clickCheckbox(4);
            this.page.clickUpdate();

            enterValue(this.page.getDetailsPage().getValueInput(), 'INVALID');

            this.page.clickUpdateButton();

            expect(this.page.getDetailsPage().getValueErrorMessage().textContent).toBe('Tag value must be a positive integer!');
        });

        it('should show validation error when updating U_INT64 with a negative number', function () {
            this.element.addEventListener('tag-update-values', (e) => {
                this.eventDetail = e.detail;
            });

            this.page.clickCheckbox(4);
            this.page.clickUpdate();

            enterValue(this.page.getDetailsPage().getValueInput(), '-1');

            this.page.clickUpdateButton();

            expect(this.page.getDetailsPage().getValueErrorMessage().textContent).toBe('Tag value must be a positive integer!');
        });

        it('should show validation error when updating DATE_TIME with an invalid date', function () {
            this.element.addEventListener('tag-update-values', (e) => {
                this.eventDetail = e.detail;
            });

            this.page.clickCheckbox(5);
            this.page.clickUpdate();

            enterValue(this.page.getDetailsPage().getValueInput(), 'not-DATE');

            this.page.clickUpdateButton();

            expect(this.page.getDetailsPage().getValueErrorMessage().textContent).toBe('Tag value must be a timestamp!');
        });

        it('should show validation error when updating BOOLEAN with an invalid value', function () {
            this.element.addEventListener('tag-update-values', (e) => {
                this.eventDetail = e.detail;
            });

            this.page.clickCheckbox(6);
            this.page.clickUpdate();

            enterValue(this.page.getDetailsPage().getValueInput(), 'not-BOOLEAN');

            this.page.clickUpdateButton();

            expect(this.page.getDetailsPage().getValueErrorMessage().textContent).toBe('Tag value must be boolean! (true or false)');
        });
    });

    describe('Reset Aggregates', () => {
        beforeEach(function () {
            this.element = createFixture(`<sl-tagviewer></sl-tagviewer>`);
            this.element.i18n = TAGVIEWER_I18N;
            this.element.data = {
                items: [
                    createTag('tag-1', 'INT', '1')
                ],
                totalCount: 1
            };
        });

        it('should fire reset aggregates event when clicking toolbar button', function () {
            this.element.addEventListener('tag-reset-aggregates', (e) => {
                this.eventDetail = e.detail;
            });

            this.page.clickCheckbox(0);
            this.page.clickResetAggregates();

            expect(this.eventDetail.tags.length).toBe(1);
            expect(this.eventDetail.tags[0].path).toBe('tag-1');
        });
    });

    describe('Delete Tag', () => {
        beforeEach(function () {
            this.element = createFixture(`<sl-tagviewer></sl-tagviewer>`);
            this.element.i18n = TAGVIEWER_I18N;
            this.element.data = {
                items: [
                    createTag('tag-1', 'INT', '1'),
                    createTag('tag-2', 'STRING', 'my-val'),
                    createTag('tag-3', 'DOUBLE', '2.0')
                ],
                totalCount: 2
            };
        });

        it('should show dialog message when deleting single tag', function () {
            this.page.clickCheckbox(0);
            this.page.clickDeleteTag();

            expect(this.page.getDialogHeader().textContent).toBe('Are you sure you want to delete "tag-1"?');
        });

        it('should show dialog message when deleting multiple tags', function () {
            this.page.clickCheckbox(0);
            this.page.clickCheckbox(2);
            this.page.clickDeleteTag();

            expect(this.page.getDialogHeader().textContent).toBe('Are you sure you want to delete 2 tags?');
        });

        it('should fire event when deleting multiple tags', function () {
            this.element.addEventListener('tag-delete', (e) => {
                this.eventDetail = e.detail;
            });

            this.page.clickCheckbox(0);
            this.page.clickCheckbox(2);
            this.page.clickDeleteTag();

            this.page.clickOKButton();

            expect(this.eventDetail.tags.length).toBe(2);
            expect(this.eventDetail.tags[0].path).toBe('tag-1');
            expect(this.eventDetail.tags[1].path).toBe('tag-3');
        });
    });

    describe('Filter', () => {
        beforeEach(function () {
            this.element = createFixture(`<sl-tagviewer></sl-tagviewer>`);
            this.element.i18n = TAGVIEWER_I18N;
        });

        it('should filter builder when clicking on filter button', function () {
            this.page.clickFilter();

            expect(isVisible(this.page.getFilterBuilderFieldSelector(0))).toBeTruthy();
        });

        it('should fire data event when changing the filter', function () {
            this.element.addEventListener('tag-data', (e) => {
                this.eventDetail = e.detail;
            });

            this.page.clickFilter();
            selectOption(this.page.getFilterBuilderFieldSelector(0), 'path');
            enterValue(this.page.getFilterBuilderValueInput(0), 'tag-a');

            expect(this.eventDetail).toEqual({
                page: 1,
                pageSize: 20,
                sortBy: undefined,
                sortOrder: undefined,
                searchTerm: undefined,
                filters: [
                    { name: 'path', operation: 'MATCHES', value: 'tag-a' }
                ],
                trigger: 'filter'
            });
        });

        it('should fire data event when entering search term', function () {
            this.element.addEventListener('tag-data', (e) => {
                this.eventDetail = e.detail;
            });

            enterValue(this.page.getSearchInput(), 'tag-x');

            expect(this.eventDetail).toEqual({
                page: 1,
                pageSize: 20,
                sortBy: undefined,
                sortOrder: undefined,
                searchTerm: 'tag-x',
                filters: undefined,
                trigger: 'search'
            });
        });
    });

    describe('Edit Tag', () => {
        beforeEach(function () {
            this.element = createFixture(`<sl-tagviewer></sl-tagviewer>`);
            this.element.i18n = TAGVIEWER_I18N;
            this.element.data = {
                items: [
                    createTag('tag-1', 'INT', '1'),
                    createTag('tag-2', 'STRING', 'test', false, ['keywordA'], { 'hello': 'world', 'test': '1234' }),
                    createTag('tag-3', 'DOUBLE', '1.2', false, [], { 'nitagRetention': 'COUNT', 'nitagMaxHistoryCount': '25' }),
                    createTag('tag-4', 'U_INT64', '199', false, [], { 'nitagRetention': 'DURATION', 'nitagHistoryTTLDays': '30' }),
                    createTag('tag-5', 'DATE_TIME', '2000-01-01T01:01:01Z', true),
                    createTag('tag-6', 'BOOLEAN', 'true')
                ],
                totalCount: 6
            };
        });

        it('should show tag details', function () {
            this.page.clickEdit(0);

            let detailsPage = this.page.getDetailsPage();
            expect(detailsPage.getPath().textContent).toBe('tag-1');
            expect(detailsPage.getType().textContent).toBe('32-bit Integer');
            expect(detailsPage.getValueInput().value).toBe('1');
            expect(detailsPage.getCollectAggregatesSelect().checked).toBe(false);
            expect(detailsPage.getRetentionSelect().value).toBe('NONE');
            expect(isVisible(detailsPage.getRetentionDaysInput())).toBeFalsy();
            expect(isVisible(detailsPage.getRetentionCountInput())).toBeFalsy();
            expect(detailsPage.getKeywordsListEditorPage().getRows().length).toBe(1);
            expect(detailsPage.getPropertiesListEditorPage().getRows().length).toBe(1);
        });

        it('should show keywords and properties', function () {
            this.page.clickEdit(1);

            let detailsPage = this.page.getDetailsPage();
            expect(detailsPage.getPath().textContent).toBe('tag-2');
            expect(detailsPage.getType().textContent).toBe('String');
            expect(detailsPage.getKeywordsListEditorPage().getRows().length).toBe(2);
            expect(detailsPage.getPropertiesListEditorPage().getRows().length).toBe(3);
        });

        it('should show retention count', function () {
            this.page.clickEdit(2);

            let detailsPage = this.page.getDetailsPage();
            expect(detailsPage.getPath().textContent).toBe('tag-3');
            expect(detailsPage.getType().textContent).toBe('Double');
            expect(detailsPage.getRetentionSelect().value).toBe('COUNT');
            expect(detailsPage.getRetentionCountInput().value).toBe('25');
            expect(isVisible(detailsPage.getRetentionDaysInput())).toBeFalsy();
            expect(detailsPage.getPropertiesListEditorPage().getRows().length).toBe(1);
        });

        it('should show retention days', function () {
            this.page.clickEdit(3);

            let detailsPage = this.page.getDetailsPage();
            expect(detailsPage.getPath().textContent).toBe('tag-4');
            expect(detailsPage.getType().textContent).toBe('64-bit Unsigned Integer');
            expect(detailsPage.getRetentionSelect().value).toBe('DURATION');
            expect(detailsPage.getRetentionDaysInput().value).toBe('30');
            expect(isVisible(detailsPage.getRetentionCountInput())).toBeFalsy();
            expect(detailsPage.getPropertiesListEditorPage().getRows().length).toBe(1);
        });

        it('should check collect aggregates', function () {
            this.page.clickEdit(4);

            let detailsPage = this.page.getDetailsPage();
            expect(detailsPage.getPath().textContent).toBe('tag-5');
            expect(detailsPage.getType().textContent).toBe('Timestamp');
            expect(detailsPage.getCollectAggregatesSelect().checked).toBe(true);
        });

        it('should update retention to COUNT', function () {
            this.element.addEventListener('tag-update', (e) => {
                this.eventDetail = e.detail;
            });

            this.page.clickEdit(0);
            selectOption(this.page.getDetailsPage().getRetentionSelect(), 'COUNT');
            enterValue(this.page.getDetailsPage().getRetentionCountInput(), 1234);
            this.page.clickUpdateButton();

            expect(this.eventDetail.tags).toEqual([{
                path: 'tag-1',
                type: 'INT',
                collectAggregates: false,
                keywords: [],
                properties: {
                    nitagRetention: 'COUNT',
                    nitagMaxHistoryCount: '1234'
                }
            }]);
        });

        it('should update retention to DURATION', function () {
            this.element.addEventListener('tag-update', (e) => {
                this.eventDetail = e.detail;
            });

            this.page.clickEdit(0);
            selectOption(this.page.getDetailsPage().getRetentionSelect(), 'DURATION');
            enterValue(this.page.getDetailsPage().getRetentionDaysInput(), 37);
            this.page.clickUpdateButton();

            expect(this.eventDetail.tags).toEqual([{
                path: 'tag-1',
                type: 'INT',
                collectAggregates: false,
                keywords: [],
                properties: {
                    nitagRetention: 'DURATION',
                    nitagHistoryTTLDays: '37'
                }
            }]);
        });

        it('should update retention to PERMANENT', function () {
            this.element.addEventListener('tag-update', (e) => {
                this.eventDetail = e.detail;
            });

            this.page.clickEdit(0);
            selectOption(this.page.getDetailsPage().getRetentionSelect(), 'PERMANENT');
            this.page.clickUpdateButton();

            expect(this.eventDetail.tags).toEqual([{
                path: 'tag-1',
                type: 'INT',
                collectAggregates: false,
                keywords: [],
                properties: {
                    nitagRetention: 'PERMANENT'
                }
            }]);
        });

        it('should fire tag-update-values event', function () {
            this.element.addEventListener('tag-update-values', (e) => {
                this.eventDetail = e.detail;
            });

            this.page.clickEdit(0);
            enterValue(this.page.getDetailsPage().getValueInput(), '1234');
            this.page.clickUpdateButton();

            expect(this.eventDetail.tags[0].path).toBe('tag-1');
            expect(this.eventDetail.value).toBe('1234');
        });

        it('should show validation error if value is invalid', function () {
            this.page.clickEdit(0);
            enterValue(this.page.getDetailsPage().getValueInput(), 'INVALID');
            this.page.clickUpdateButton();

            let errorMessage = this.page.getDetailsPage().getValueErrorMessage();
            expect(errorMessage.textContent).toBe('Tag value must be an integer!');
        });

        it('should add new keyword', function () {
            this.element.addEventListener('tag-update', (e) => {
                this.eventDetail = e.detail;
            });

            this.page.clickEdit(0);
            this.page.getDetailsPage().getKeywordsListEditorPage().enterListValue(0, 'new keyword');

            this.page.clickUpdateButton();

            expect(this.eventDetail.tags[0].keywords).toEqual(['new keyword']);
        });

        it('should add new property', function () {
            this.element.addEventListener('tag-update', (e) => {
                this.eventDetail = e.detail;
            });

            this.page.clickEdit(0);
            this.page.getDetailsPage().getPropertiesListEditorPage().enterListKeyValue(0, 'new-key', 'new-value');

            this.page.clickUpdateButton();

            expect(this.eventDetail.tags[0].properties['new-key']).toEqual('new-value');
        });
    });

    describe('Bulk Edit', () => {
        beforeEach(function () {
            this.element = createFixture(`<sl-tagviewer></sl-tagviewer>`);
            this.element.i18n = TAGVIEWER_I18N;
        });

        it('should show multiple tags and leave fields empty which have different values', function () {
            this.element.data = {
                items: [
                    createTag('tag-1', 'INT', '1', true, ['other keyword'], { 'nitagRetention': 'PERMANENT' }),
                    createTag('tag-2', 'STRING', 'test', false, ['keywordA'], { 'hello': 'world', 'test': '1234' })
                ],
                totalCount: 2
            };

            this.page.clickCheckbox(0);
            this.page.clickCheckbox(1);
            this.page.clickUpdate();

            let detailsPage = this.page.getDetailsPage();
            expect(detailsPage.getPath().textContent).toBe('tag-1, tag-2');
            expect(detailsPage.getType().textContent).toBe('');
            expect(detailsPage.getValueInput().value).toBe('');
            expect(detailsPage.getCollectAggregatesSelect().checked).toBe(false);
            expect(detailsPage.getRetentionSelect().value).toBe('');
            expect(isVisible(detailsPage.getRetentionDaysInput())).toBeFalsy();
            expect(isVisible(detailsPage.getRetentionCountInput())).toBeFalsy();
            expect(detailsPage.getKeywordsListEditorPage().getRows().length).toBe(1);
            expect(detailsPage.getPropertiesListEditorPage().getRows().length).toBe(1);
        });

        it('should show multiple tags and and common field values', function () {
            this.element.data = {
                items: [
                    createTag('tag-1', 'STRING', 'test', true, ['keywordA'], { 'hello': 'world', 'test': '1234' }),
                    createTag('tag-2', 'STRING', 'test', true, ['keywordA'], { 'hello': 'world', 'test': '1234' })
                ],
                totalCount: 2
            };

            this.page.clickCheckbox(0);
            this.page.clickCheckbox(1);
            this.page.clickUpdate();

            let detailsPage = this.page.getDetailsPage();
            expect(detailsPage.getPath().textContent).toBe('tag-1, tag-2');
            expect(detailsPage.getType().textContent).toBe('String');
            expect(detailsPage.getValueInput().value).toBe('test');
            expect(detailsPage.getCollectAggregatesSelect().checked).toBe(true);
            expect(detailsPage.getRetentionSelect().value).toBe('NONE');
            expect(isVisible(detailsPage.getRetentionDaysInput())).toBeFalsy();
            expect(isVisible(detailsPage.getRetentionCountInput())).toBeFalsy();
            expect(detailsPage.getKeywordsListEditorPage().getRows().length).toBe(2);
            expect(detailsPage.getPropertiesListEditorPage().getRows().length).toBe(3);
        });

        it('should fire tag-update event when changing aggregates', function () {
            this.element.data = {
                items: [
                    createTag('tag-1', 'INT', '1', false),
                    createTag('tag-2', 'STRING', 'test', false)
                ],
                totalCount: 2
            };
            this.element.addEventListener('tag-update', (e) => {
                this.eventDetail = e.detail;
            });

            this.page.clickCheckbox(0);
            this.page.clickCheckbox(1);
            this.page.clickUpdate();

            let detailsPage = this.page.getDetailsPage();
            detailsPage.getCollectAggregatesSelect().click();
            this.page.clickUpdateButton();

            expect(this.eventDetail).toEqual({
                tags: [
                    { path: 'tag-1', type: 'INT', collectAggregates: true, properties: {}, keywords: [] },
                    { path: 'tag-2', type: 'STRING', collectAggregates: true, properties: {}, keywords: [] }
                ]
            });
        });

        it('should fire tag-update event when changing retention to count', function () {
            this.element.data = {
                items: [
                    createTag('tag-1', 'INT', '1'),
                    createTag('tag-2', 'STRING', 'test')
                ],
                totalCount: 2
            };
            this.element.addEventListener('tag-update', (e) => {
                this.eventDetail = e.detail;
            });

            this.page.clickCheckbox(0);
            this.page.clickCheckbox(1);
            this.page.clickUpdate();

            let detailsPage = this.page.getDetailsPage();
            selectOption(detailsPage.getRetentionSelect(), 'COUNT');
            enterValue(detailsPage.getRetentionCountInput(), 1234);
            this.page.clickUpdateButton();

            expect(this.eventDetail).toEqual({
                tags: [
                    { path: 'tag-1', type: 'INT', collectAggregates: false, properties: { nitagRetention: 'COUNT', nitagMaxHistoryCount: '1234' }, keywords: [] },
                    { path: 'tag-2', type: 'STRING', collectAggregates: false, properties: { nitagRetention: 'COUNT', nitagMaxHistoryCount: '1234' }, keywords: [] }
                ]
            });
        });

        it('should fire tag-update event with default retention count', function () {
            this.element.data = {
                items: [
                    createTag('tag-1', 'INT', '1'),
                    createTag('tag-2', 'STRING', 'test')
                ],
                totalCount: 2
            };
            this.element.addEventListener('tag-update', (e) => {
                this.eventDetail = e.detail;
            });

            this.page.clickCheckbox(0);
            this.page.clickCheckbox(1);
            this.page.clickUpdate();

            let detailsPage = this.page.getDetailsPage();
            selectOption(detailsPage.getRetentionSelect(), 'COUNT');
            this.page.clickUpdateButton();

            expect(this.eventDetail).toEqual({
                tags: [
                    { path: 'tag-1', type: 'INT', collectAggregates: false, properties: { nitagRetention: 'COUNT', nitagMaxHistoryCount: '10000' }, keywords: [] },
                    { path: 'tag-2', type: 'STRING', collectAggregates: false, properties: { nitagRetention: 'COUNT', nitagMaxHistoryCount: '10000' }, keywords: [] }
                ]
            });
        });

        it('should fire tag-update event when changing retention to days', function () {
            this.element.data = {
                items: [
                    createTag('tag-1', 'INT', '1'),
                    createTag('tag-2', 'STRING', 'test')
                ],
                totalCount: 2
            };
            this.element.addEventListener('tag-update', (e) => {
                this.eventDetail = e.detail;
            });

            this.page.clickCheckbox(0);
            this.page.clickCheckbox(1);
            this.page.clickUpdate();

            let detailsPage = this.page.getDetailsPage();
            selectOption(detailsPage.getRetentionSelect(), 'DURATION');
            enterValue(detailsPage.getRetentionDaysInput(), 1234);
            this.page.clickUpdateButton();

            expect(this.eventDetail).toEqual({
                tags: [
                    { path: 'tag-1', type: 'INT', collectAggregates: false, properties: { nitagRetention: 'DURATION', nitagHistoryTTLDays: '1234' }, keywords: [] },
                    { path: 'tag-2', type: 'STRING', collectAggregates: false, properties: { nitagRetention: 'DURATION', nitagHistoryTTLDays: '1234' }, keywords: [] }
                ]
            });
        });

        it('should fire tag-update event with default retention days', function () {
            this.element.data = {
                items: [
                    createTag('tag-1', 'INT', '1'),
                    createTag('tag-2', 'STRING', 'test')
                ],
                totalCount: 2
            };
            this.element.addEventListener('tag-update', (e) => {
                this.eventDetail = e.detail;
            });

            this.page.clickCheckbox(0);
            this.page.clickCheckbox(1);
            this.page.clickUpdate();

            let detailsPage = this.page.getDetailsPage();
            selectOption(detailsPage.getRetentionSelect(), 'DURATION');
            this.page.clickUpdateButton();

            expect(this.eventDetail).toEqual({
                tags: [
                    { path: 'tag-1', type: 'INT', collectAggregates: false, properties: { nitagRetention: 'DURATION', nitagHistoryTTLDays: '30' }, keywords: [] },
                    { path: 'tag-2', type: 'STRING', collectAggregates: false, properties: { nitagRetention: 'DURATION', nitagHistoryTTLDays: '30' }, keywords: [] }
                ]
            });
        });

        it('should fire tag-update event when changing keywords', function () {
            this.element.data = {
                items: [
                    createTag('tag-1', 'INT', '1', false, ['existing keyword']),
                    createTag('tag-2', 'STRING', 'test', false, [])
                ],
                totalCount: 2
            };
            this.element.addEventListener('tag-update', (e) => {
                this.eventDetail = e.detail;
            });

            this.page.clickCheckbox(0);
            this.page.clickCheckbox(1);
            this.page.clickUpdate();

            this.page.getDetailsPage().getKeywordsListEditorPage().enterListValue(0, 'other keyword');
            this.page.clickUpdateButton();

            expect(this.eventDetail).toEqual({
                tags: [
                    { path: 'tag-1', type: 'INT', collectAggregates: false, properties: { }, keywords: ['other keyword'] },
                    { path: 'tag-2', type: 'STRING', collectAggregates: false, properties: { }, keywords: ['other keyword'] }
                ]
            });
        });

        it('should fire tag-update event when adding keyword', function () {
            this.element.data = {
                items: [
                    createTag('tag-1', 'INT', '1', false, ['existing keyword']),
                    createTag('tag-2', 'STRING', 'test', false, ['existing keyword'])
                ],
                totalCount: 2
            };
            this.element.addEventListener('tag-update', (e) => {
                this.eventDetail = e.detail;
            });

            this.page.clickCheckbox(0);
            this.page.clickCheckbox(1);
            this.page.clickUpdate();

            this.page.getDetailsPage().getKeywordsListEditorPage().enterListValue(1, 'other keyword');
            this.page.clickUpdateButton();

            expect(this.eventDetail).toEqual({
                tags: [
                    { path: 'tag-1', type: 'INT', collectAggregates: false, properties: { }, keywords: ['existing keyword', 'other keyword'] },
                    { path: 'tag-2', type: 'STRING', collectAggregates: false, properties: { }, keywords: ['existing keyword', 'other keyword'] }
                ]
            });
        });

        it('should fire tag-update event when deleting keyword', function () {
            this.element.data = {
                items: [
                    createTag('tag-1', 'INT', '1', false, ['existing keyword']),
                    createTag('tag-2', 'STRING', 'test', false, ['existing keyword'])
                ],
                totalCount: 2
            };
            this.element.addEventListener('tag-update', (e) => {
                this.eventDetail = e.detail;
            });

            this.page.clickCheckbox(0);
            this.page.clickCheckbox(1);
            this.page.clickUpdate();

            this.page.getDetailsPage().getKeywordsListEditorPage().clickIcon(0);
            this.page.clickUpdateButton();

            expect(this.eventDetail).toEqual({
                tags: [
                    { path: 'tag-1', type: 'INT', collectAggregates: false, properties: { }, keywords: [] },
                    { path: 'tag-2', type: 'STRING', collectAggregates: false, properties: { }, keywords: [] }
                ]
            });
        });

        it('should fire tag-update event when changing properties', function () {
            this.element.data = {
                items: [
                    createTag('tag-1', 'INT', '1', false, [], { 'hello': 'world' }),
                    createTag('tag-2', 'STRING', 'test', false, [], {})
                ],
                totalCount: 2
            };
            this.element.addEventListener('tag-update', (e) => {
                this.eventDetail = e.detail;
            });

            this.page.clickCheckbox(0);
            this.page.clickCheckbox(1);
            this.page.clickUpdate();

            this.page.getDetailsPage().getPropertiesListEditorPage().enterListKeyValue(0, 'other', 'property');
            this.page.clickUpdateButton();

            expect(this.eventDetail).toEqual({
                tags: [
                    { path: 'tag-1', type: 'INT', collectAggregates: false, properties: { 'other': 'property' }, keywords: [] },
                    { path: 'tag-2', type: 'STRING', collectAggregates: false, properties: { 'other': 'property' }, keywords: [] }
                ]
            });
        });

        it('should fire tag-update event when adding property', function () {
            this.element.data = {
                items: [
                    createTag('tag-1', 'INT', '1', false, [], { 'existing': '1' }),
                    createTag('tag-2', 'STRING', 'test', false, [], { 'existing': '1' })
                ],
                totalCount: 2
            };
            this.element.addEventListener('tag-update', (e) => {
                this.eventDetail = e.detail;
            });

            this.page.clickCheckbox(0);
            this.page.clickCheckbox(1);
            this.page.clickUpdate();

            this.page.getDetailsPage().getPropertiesListEditorPage().enterListKeyValue(1, 'new', '2');
            this.page.clickUpdateButton();

            expect(this.eventDetail).toEqual({
                tags: [
                    { path: 'tag-1', type: 'INT', collectAggregates: false, properties: { 'existing': '1', 'new': '2' }, keywords: [] },
                    { path: 'tag-2', type: 'STRING', collectAggregates: false, properties: { 'existing': '1', 'new': '2' }, keywords: [] }
                ]
            });
        });

        it('should fire tag-update event when deleting property', function () {
            this.element.data = {
                items: [
                    createTag('tag-1', 'INT', '1', false, [], { 'existing': '1' }),
                    createTag('tag-2', 'STRING', 'test', false, [], { 'existing': '1' })
                ],
                totalCount: 2
            };
            this.element.addEventListener('tag-update', (e) => {
                this.eventDetail = e.detail;
            });

            this.page.clickCheckbox(0);
            this.page.clickCheckbox(1);
            this.page.clickUpdate();

            this.page.getDetailsPage().getPropertiesListEditorPage().clickIcon(0);
            this.page.clickUpdateButton();

            expect(this.eventDetail).toEqual({
                tags: [
                    { path: 'tag-1', type: 'INT', collectAggregates: false, properties: { }, keywords: [] },
                    { path: 'tag-2', type: 'STRING', collectAggregates: false, properties: { }, keywords: [] }
                ]
            });
        });
    });

    describe('History', () => {
        beforeEach(function () {
            this.element = createFixture(`<sl-tagviewer></sl-tagviewer>`);
            this.element.i18n = TAGVIEWER_I18N;
            this.element.data = {
                items: [
                    createTag('tag-1', 'INT', '1'),
                    createTag('tag-2', 'STRING', 'test')
                ],
                totalCount: 2
            };
        });

        it('should fire event when clicking history', function () {
            this.element.addEventListener('tag-history', (e) => {
                this.eventDetail = e.detail;
            });

            this.page.clickCheckbox(0);
            this.page.clickCheckbox(1);
            this.page.clickHistory();

            expect(this.eventDetail.tags.length).toBe(2);
            expect(this.eventDetail.tags[0].path).toBe('tag-1');
            expect(this.eventDetail.tags[1].path).toBe('tag-2');
        });
    });

    describe('Export to CSV', () => {
        beforeEach(function () {
            this.element = createFixture(`<sl-tagviewer></sl-tagviewer>`);
            this.element.i18n = TAGVIEWER_I18N;
            this.element.data = {
                items: [
                    createTag('tag-1', 'INT', '1'),
                    createTag('tag-2', 'STRING', 'test')
                ],
                totalCount: 2
            };

            this.page.clickCheckbox(0);
            this.page.clickCheckbox(1);
            this.page.clickExport();
        });

        it('should open drop down when clicking export', function () {
            let exportDropDownItems = this.page.getExportDropDownItems();

            expect(exportDropDownItems.length).toBe(2);
            expect(exportDropDownItems[0].text).toBe('Export History');
            expect(exportDropDownItems[1].text).toBe('Export Details');
            expect(exportDropDownItems[0].attributes['sl-dropdown-context'].value).toBe('export');
            expect(exportDropDownItems[1].attributes['sl-dropdown-context'].value).toBe('export');
        });

        describe('History', () => {
            it('should fire event when clicking export history', function () {
                this.page.clickExportHistory();

                let queryHistoryDialogPage = this.page.getDialogPage();
                expect(isVisible(queryHistoryDialogPage.getDialog())).toBeTruthy();
                expect(queryHistoryDialogPage.getHeader().textContent).toBe('Query for Tag History');
                expect(queryHistoryDialogPage.getMiddleButtonText().textContent).toBe('QUERY HISTORY');

                enterValue(this.page.getExportHistorySamples(), '2000');

                this.element.addEventListener('tag-export-history', (e) => {
                    this.eventDetail = e.detail;
                });

                this.page.clickExportHisoryButton();

                expect(this.eventDetail.tags.length).toBe(2);
                expect(this.eventDetail.tags[0].path).toBe('tag-1');
                expect(this.eventDetail.tags[1].path).toBe('tag-2');

                let expectedEndTime = new Date();
                let expectedStartTime = new Date(); expectedStartTime.setDate(expectedEndTime.getDate() - 30);
                expect(this.eventDetail.params).toBeTruthy();
                expect(this.eventDetail.params.take).toBe('2000');
                expect(new Date(this.eventDetail.params.startTime).toDateString()).toBe(expectedStartTime.toDateString());
                expect(new Date(this.eventDetail.params.endTime).toDateString()).toBe(expectedEndTime.toDateString());
            });
        });

        describe('Details', () => {
            it('should fire event when clicking export details', function () {
                this.element.addEventListener('tag-export-details', (e) => {
                    this.eventDetail = e.detail;
                });

                this.page.clickExportDetails();

                expect(this.eventDetail.tags.length).toBe(2);
                expect(this.eventDetail.tags[0].path).toBe('tag-1');
                expect(this.eventDetail.tags[1].path).toBe('tag-2');
            });
        });
    });
});
