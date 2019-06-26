import '../upload.js';

import { createFixture, isVisible } from '../../test/test-utils.js';
import { UploadPage } from './upload-page.js';

describe('Upload', () => {
    beforeEach(function () {
        this.page = new UploadPage();
    });

    describe('Status "Start"', () => {
        beforeEach(function () {
            this.element = createFixture(
                `<mc-upload status="start" file-type=".nipkg" upload-button-text="browse" start-text="Drag and drop .nipkg or" pending-text="Uploading..." success-text="Success!" failure-text="Failed to upload!"></mc-upload>`);
        });

        it('should show upload', function () {
            let upload = this.page.getUpload();

            expect(isVisible(upload)).toBeTruthy();
        });

        it('should show browse button', function () {
            let browse = this.page.getBrowse();

            expect(isVisible(browse)).toBeTruthy();
            expect(browse.textContent).toBe('browse');
        });

        it('should set the file-type as accepting extension', function () {
            let input = this.page.getInput();

            expect(input.accept).toBe('.nipkg');
        });
    });

    describe('Status "Pending"', () => {
        beforeEach(function () {
            this.element = createFixture(
                `<mc-upload status="pending" file-type=".nipkg" upload-button-text="browse" start-text="Drag and drop .nipkg or" pending-text="Uploading..." success-text="Success!" failure-text="Failed to upload!"></mc-upload>`);
        });

        it('should show Uploading... message', function () {
            let formText = this.page.getFormText();

            expect(formText.textContent).toBe('Uploading...');
        });
    });

    describe('Status "Success"', () => {
        beforeEach(function () {
            this.element = createFixture(
                `<mc-upload status="success" file-type=".nipkg" upload-button-text="browse" start-text="Drag and drop .nipkg or" pending-text="Uploading..." success-text="Success!" failure-text="Failed to upload!">
                    <mc-upload-failure-link name="upload-again" text="Upload" description="another web app"></mc-upload-link>
                    <mc-upload-failure-link name="learn" text="Learn" description="about upload limitations"></mc-upload-link>
                    <mc-upload-success-link name="view" text="View" description="this web app"></mc-upload-link>
                </mc-upload>`);
        });

        it('should show success message', function () {
            let formText = this.page.getFormText();

            expect(formText.textContent).toBe('Success!');
        });

        it('should render only success links', function () {
            let link = this.page.getLinks();

            expect(link.length).toBe(1);
            expect(link[0].textContent).toBe('View this web app');
        });

        it('should fire upload-link-click event on item click', function () {
            let event = false;
            this.element.addEventListener('upload-link-click', function (e) {
                event = e;
            });

            this.page.clickLink(0);

            expect(event.detail.name).toBe('view');
        });
    });

    describe('Status "Failure"', () => {
        beforeEach(function () {
            this.element = createFixture(
                `<mc-upload status="failure" file-type=".nipkg" upload-button-text="browse" start-text="Drag and drop .nipkg or" pending-text="Uploading..." success-text="Success!" failure-text="Failed to upload!">
                    <mc-upload-failure-link name="upload-again" text="Upload" description="another web app"></mc-upload-link>
                    <mc-upload-failure-link name="learn" text="Learn" description="about upload limitations"></mc-upload-link>
                    <mc-upload-success-link name="view" text="View" description="this web app"></mc-upload-link>
                </mc-upload>`);
        });

        it('should show the default error message', function () {
            let formText = this.page.getFormText();
            let errorMessage = this.page.getErrorMessage();

            expect(formText.textContent).toContain('Failed to upload!');
            expect(errorMessage.textContent).toBe('An error has ocurred while uploading.');
        });

        it('should show the provided error message', function () {
            this.element.setAttribute('error-message', 'ERROR happened');

            let errorMessage = this.page.getErrorMessage();

            expect(errorMessage.textContent).toBe('ERROR happened');
        });

        it('should render only the failure links', function () {
            let link = this.page.getLinks();

            expect(link.length).toBe(2);
            expect(link[0].textContent).toBe('Upload another web app');
            expect(link[1].textContent).toBe('Learn about upload limitations');
        });

        it('should fire upload-link-click event on item click', function () {
            let event = false;
            this.element.addEventListener('upload-link-click', function (e) {
                event = e;
            });

            this.page.clickLink(1);

            expect(event.detail.name).toBe('learn');
        });
    });
});
