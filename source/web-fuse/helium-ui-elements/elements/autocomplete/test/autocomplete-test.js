import '../autocomplete.js';

import { createFixture, isVisible, pressKey } from '../../test/test-utils.js';
import { AutocompletePage } from './autocomplete-page.js';

describe('Autocomplete', () => {
    beforeEach(function () {
        this.page = new AutocompletePage();
    });

    describe('Initial state', () => {
        beforeEach(function () {
            this.element = createFixture(
                `<mc-autocomplete placeholder='My Palceholder'></mc-autocomplete>`);

            this.element.items = ['aaa', 'bbb', 'ccc', 'dddd'];
        });

        it('should show input', function () {
            let input = this.page.getInput();
            expect(input).toBeTruthy();
            expect(isVisible(input)).toBeTruthy();
        });

        it('should not have error message', function () {
            let error = this.page.getErrorMessage();
            expect(error).toBeTruthy();
            expect(isVisible(error)).toBeFalsy();
        });

        it('should show placeholder', function () {
            let placeholder = this.page.getPlaceholder();
            expect(placeholder).toBe('My Palceholder');
        });
    });

    describe('Error state', () => {
        beforeEach(function () {
            this.element = createFixture(
                `<mc-autocomplete placeholder='My Palceholder'></mc-autocomplete>`);

            this.page.setInputValue('bad value');
            this.element.setAttribute('error-message', 'Bad input bro.');
        });

        it('should show error', function () {
            let error = this.page.getErrorMessage();
            expect(error).toBeTruthy();
            expect(isVisible(error)).toBeTruthy();
        });

        it('should show error with expected mesage', function () {
            let error = this.page.getErrorMessage();
            expect(error.innerText).toBe('Bad input bro.');
        });

        it('should hide error if typing', function () {
            let error = this.page.getErrorMessage();
            this.page.setInputValue('ab');
            expect(error).toBeTruthy();
            expect(isVisible(error)).toBeFalsy();
        });
    });

    describe('drop down', () => {
        beforeEach(function () {
            this.element = createFixture(
                `<mc-autocomplete placeholder='My Palceholder'></mc-autocomplete>`);
            this.element.items = ['aaa', 'aac', 'acc', 'bbb', 'ccc', 'dddd'];
        });

        it('should not show drop down when typing if there is no match', function () {
            this.page.setInputValue('xx');
            let dropDown = this.page.getDropDown();
            expect(dropDown).toBeFalsy();
        });

        it('should show drop down and matched items when typing', function () {
            this.page.setInputValue('aa');
            let dropItems = this.page.getDropDownItems();

            expect(dropItems.length).toBe(2);
            expect(isVisible(dropItems[0])).toBeTruthy();
            expect(isVisible(dropItems[1])).toBeTruthy();
        });

        it('should show drop down when typing and have matched elements', function () {
            this.page.setInputValue('aa');
            let dropItems = this.page.getDropDownItems();
            expect(dropItems[0].innerText).toBe('aaa');
            expect(dropItems[1].innerText).toBe('aac');
        });

        it('should submit when clicking an item', function () {
            this.page.setInputValue('aa');

            let value, triggered;
            this.element.addEventListener('input-submitted', (evt) => {
                triggered = true;
                value = evt.detail.value;
            });

            this.page.clickDropDownItem(1);

            expect(triggered).toBeTruthy();
            expect(value).toBeTruthy('aac');
        });
    });

    describe('Up down Keys', () => {
        beforeEach(function () {
            this.element = createFixture(
                `<mc-autocomplete placeholder='My Palceholder'></mc-autocomplete>`);
            this.element.items = ['aaa', 'aac', 'acc', 'bbb', 'ccc', 'dddd'];
        });

        it('should higlight selected item in drop down (down, down)', function () {
            this.page.setInputValue('a');
            let dropItems = this.page.getDropDownItems();
            pressKey(this.page.getInput(), 'Down');
            pressKey(this.page.getInput(), 'Down');

            expect(dropItems[0].classList.value.includes('autocomplete-active')).toBeFalsy();
            expect(dropItems[1].classList.value.includes('autocomplete-active')).toBeTruthy();
            expect(dropItems[2].classList.value.includes('autocomplete-active')).toBeFalsy();
        });

        it('should higlight selected item in drop down (down)', function () {
            this.page.setInputValue('a');
            let dropItems = this.page.getDropDownItems();
            pressKey(this.page.getInput(), 'Down');

            expect(dropItems[0].classList.value.includes('autocomplete-active')).toBeTruthy();
            expect(dropItems[1].classList.value.includes('autocomplete-active')).toBeFalsy();
            expect(dropItems[2].classList.value.includes('autocomplete-active')).toBeFalsy();
        });

        it('should higlight selected item in drop down (up)', function () {
            this.page.setInputValue('a');
            let dropItems = this.page.getDropDownItems();
            pressKey(this.page.getInput(), 'UP');

            expect(dropItems[0].classList.value.includes('autocomplete-active')).toBeFalsy();
            expect(dropItems[1].classList.value.includes('autocomplete-active')).toBeFalsy();
            expect(dropItems[2].classList.value.includes('autocomplete-active')).toBeFalsy();
        });

        it('should higlight selected item in drop down (down, down, up)', function () {
            this.page.setInputValue('a');
            let dropItems = this.page.getDropDownItems();
            pressKey(this.page.getInput(), 'Down');
            pressKey(this.page.getInput(), 'Down');
            pressKey(this.page.getInput(), 'Up');

            expect(dropItems[0].classList.value.includes('autocomplete-active')).toBeTruthy();
            expect(dropItems[1].classList.value.includes('autocomplete-active')).toBeFalsy();
            expect(dropItems[2].classList.value.includes('autocomplete-active')).toBeFalsy();
        });

        it('should higlight selected item in drop down (down, down, down, down)', function () {
            this.page.setInputValue('a');
            let dropItems = this.page.getDropDownItems();
            pressKey(this.page.getInput(), 'Down');
            pressKey(this.page.getInput(), 'Down');
            pressKey(this.page.getInput(), 'Down');
            pressKey(this.page.getInput(), 'Down');

            expect(dropItems[0].classList.value.includes('autocomplete-active')).toBeTruthy();
            expect(dropItems[1].classList.value.includes('autocomplete-active')).toBeFalsy();
            expect(dropItems[2].classList.value.includes('autocomplete-active')).toBeFalsy();
        });
    });

    describe('Enter key', () => {
        beforeEach(function () {
            this.element = createFixture(
                `<mc-autocomplete placeholder='My Palceholder'></mc-autocomplete>`);
            this.element.items = ['aaa', 'aac', 'acc', 'bbb', 'ccc', 'dddd'];
        });

        it('should trigger submit event with current value', function () {
            this.page.setInputValue('a');
            let value, triggered;
            this.element.addEventListener('input-submitted', (evt) => {
                triggered = true;
                value = evt.detail.value;
            });

            pressKey(this.page.getInput(), 'Enter');
            expect(triggered).toBeTruthy();
            expect(value).toBeTruthy('a');
        });

        it('should not clear input value', function () {
            this.page.setInputValue('a');
            pressKey(this.page.getInput(), 'Enter');
            let value = this.page.getInput().value;
            expect(value).toBe('a');
        });

        it('should close drop down', function () {
            this.page.setInputValue('a');
            pressKey(this.page.getInput(), 'Enter');
            let dropDown = this.page.getDropDown();
            expect(dropDown).toBeFalsy();
        });

        describe(' when dropdown item selected', () => {
            it('should trigger submit event', function () {
                this.page.setInputValue('a');
                let triggered;
                this.element.addEventListener('input-submitted', (evt) => {
                    triggered = true;
                });
                pressKey(this.page.getInput(), 'Down');
                pressKey(this.page.getInput(), 'Enter');

                expect(triggered).toBeTruthy();
            });

            it('should change input value to be the one of the selected drop down item', function () {
                this.page.setInputValue('a');
                pressKey(this.page.getInput(), 'Down');
                pressKey(this.page.getInput(), 'Enter');

                expect(this.page.getInput().value).toBe('aaa');
            });
        });
    });
});
