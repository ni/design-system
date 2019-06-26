import '../storage-graph.js';

import { createFixture, isVisible } from '../../test/test-utils.js';
import { StorageGraphPage } from './storage-graph-page.js';

describe('Storage Graph', () => {
    beforeEach(function () {
        this.page = new StorageGraphPage();
    });

    describe('Basic', () => {
        beforeEach(function () {
            this.element = createFixture(
                `<sl-storage-graph header="File Storage Used" main-text="{usedValue}" details-text="{usedUnit} of {limitValue} {limitUnit}" limit="1073741824" used="536870912"></sl-storage-graph>`);
        });

        it('should show storage graph', function () {
            let pager = this.page.getMain();

            expect(isVisible(pager)).toBeTruthy();
        });

        it('should show header, storage used, limit and percentage', function () {
            let header = this.page.getHeader();
            let used = this.page.getUsed();
            let limit = this.page.getLimit();
            let percentage = this.page.getPercentage();

            expect(header.textContent).toBe('File Storage Used');
            expect(used.textContent).toBe('512');
            expect(limit.textContent).toBe('MB of 1 GB');
            expect(percentage.textContent).toBe('50 %');
        });

        it('should format properly when used is 0', function () {
            this.element.setAttribute('limit', '1073741824');
            this.element.setAttribute('used', '0');

            let used = this.page.getUsed();
            let limit = this.page.getLimit();
            let percentage = this.page.getPercentage();

            expect(used.textContent).toBe('0');
            expect(limit.textContent).toBe('B of 1 GB');
            expect(percentage.textContent).toBe('0 %');
        });

        it('should update header on change', function () {
            this.element.setAttribute('header', 'Tag Storage Used');

            let header = this.page.getHeader();
            expect(header.textContent).toBe('Tag Storage Used');
        });

        it('should update used on change', function () {
            this.element.setAttribute('used', '104857600');

            let used = this.page.getUsed();
            let limit = this.page.getLimit();
            let percentage = this.page.getPercentage();

            expect(used.textContent).toBe('100');
            expect(limit.textContent).toBe('MB of 1 GB');
            expect(percentage.textContent).toBe('10 %');
        });

        it('should update limit on change', function () {
            this.element.setAttribute('limit', '636870912');

            let used = this.page.getUsed();
            let limit = this.page.getLimit();
            let percentage = this.page.getPercentage();

            expect(used.textContent).toBe('512');
            expect(limit.textContent).toBe('MB of 607.37 MB');
            expect(percentage.textContent).toBe('84 %');
        });
    });

    describe('Size Format', () => {
        it('should format used and limit as gigabyte', function () {
            this.element = createFixture(
                `<sl-storage-graph header="File Storage Used" main-text="{usedValue}" details-text="{usedUnit} of {limitValue} {limitUnit}" limit="2147483648" used="1073741824"></sl-storage-graph>`);

            let used = this.page.getUsed();
            let limit = this.page.getLimit();

            expect(used.textContent).toBe('1');
            expect(limit.textContent).toBe('GB of 2 GB');
        });

        it('should format used as megabyte', function () {
            this.element = createFixture(
                `<sl-storage-graph header="File Storage Used" main-text="{usedValue}" details-text="{usedUnit} of {limitValue} {limitUnit}" limit="2147483648" used="53687091"></sl-storage-graph>`);

            let used = this.page.getUsed();
            let limit = this.page.getLimit();

            expect(used.textContent).toBe('51.2');
            expect(limit.textContent).toBe('MB of 2 GB');
        });

        it('should format used as kilobyte', function () {
            this.element = createFixture(
                `<sl-storage-graph header="File Storage Used" main-text="{usedValue}" details-text="{usedUnit} of {limitValue} {limitUnit}" limit="2147483648" used="357914"></sl-storage-graph>`);

            let used = this.page.getUsed();
            let limit = this.page.getLimit();

            expect(used.textContent).toBe('349.53');
            expect(limit.textContent).toBe('kB of 2 GB');
        });

        it('should format used as byte', function () {
            this.element = createFixture(
                `<sl-storage-graph header="File Storage Used" main-text="{usedValue}" details-text="{usedUnit} of {limitValue} {limitUnit}" limit="2147483648" used="123"></sl-storage-graph>`);

            let used = this.page.getUsed();
            let limit = this.page.getLimit();

            expect(used.textContent).toBe('123');
            expect(limit.textContent).toBe('B of 2 GB');
        });

        it('should format limit as megabyte', function () {
            this.element = createFixture(
                `<sl-storage-graph header="File Storage Used" main-text="{usedValue}" details-text="{usedUnit} of {limitValue} {limitUnit}" limit="63687091" used="53687091"></sl-storage-graph>`);

            let used = this.page.getUsed();
            let limit = this.page.getLimit();

            expect(used.textContent).toBe('51.2');
            expect(limit.textContent).toBe('MB of 60.74 MB');
        });

        it('should format limit as kilobyte', function () {
            this.element = createFixture(
                `<sl-storage-graph header="File Storage Used" main-text="{usedValue}" details-text="{usedUnit} of {limitValue} {limitUnit}" limit="457914" used="357914"></sl-storage-graph>`);

            let used = this.page.getUsed();
            let limit = this.page.getLimit();

            expect(used.textContent).toBe('349.53');
            expect(limit.textContent).toBe('kB of 447.18 kB');
        });

        it('should format limit as byte', function () {
            this.element = createFixture(
                `<sl-storage-graph header="File Storage Used" main-text="{usedValue}" details-text="{usedUnit} of {limitValue} {limitUnit}" limit="1000" used="123"></sl-storage-graph>`);

            let used = this.page.getUsed();
            let limit = this.page.getLimit();

            expect(used.textContent).toBe('123');
            expect(limit.textContent).toBe('B of 1000 B');
        });
    });
});
