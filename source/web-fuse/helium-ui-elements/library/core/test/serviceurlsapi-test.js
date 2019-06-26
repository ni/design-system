import { ServiceUrlsAPI } from '../ServiceUrlsAPI.js';

describe('ServiceURLs', () => {
    it('should return api-dev.systemlinkcloud.com for localhost', function () {
        let serviceUrls = new ServiceUrlsAPI({ protocol: 'http:', host: 'localhost:8000' });

        let hostname = serviceUrls.hostname();

        expect(hostname).toBe('https://api-dev.systemlinkcloud.com');
    });

    it('should always return https', function () {
        let serviceUrls = new ServiceUrlsAPI({ protocol: 'http:', host: 'hosting-dev.systemlinkcloud.io' });

        let hostname = serviceUrls.hostname();

        expect(hostname).toBe('https://api-dev.systemlinkcloud.com');
    });

    it('should return api-dev.systemlinkcloud.com as hostname', function () {
        let serviceUrls = new ServiceUrlsAPI({ protocol: 'https:', host: 'dev.systemlinkcloud.com' });

        let hostname = serviceUrls.hostname();

        expect(hostname).toBe('https://api-dev.systemlinkcloud.com');
    });

    it('should return api-test.systemlinkcloud.com as hostname', function () {
        let serviceUrls = new ServiceUrlsAPI({ protocol: 'https:', host: 'test.systemlinkcloud.com' });

        let hostname = serviceUrls.hostname();

        expect(hostname).toBe('https://api-test.systemlinkcloud.com');
    });

    it('should return api.systemlinkcloud.com as hostname', function () {
        let serviceUrls = new ServiceUrlsAPI({ protocol: 'https:', host: 'www.systemlinkcloud.com' });

        let hostname = serviceUrls.hostname();

        expect(hostname).toBe('https://api.systemlinkcloud.com');
    });

    it('isProduction should return true for www.systemlinkcloud.com', function () {
        let serviceUrls = new ServiceUrlsAPI({ protocol: 'https:', host: 'www.systemlinkcloud.com' });

        let isProduction = serviceUrls.isProduction();

        expect(isProduction).toBeTruthy();
    });

    it('isProduction should return false for dev.systemlinkcloud.com', function () {
        let serviceUrls = new ServiceUrlsAPI({ protocol: 'https:', host: 'dev.systemlinkcloud.com' });

        let isProduction = serviceUrls.isProduction();

        expect(isProduction).toBeFalsy();
    });

    it('isProduction should return false for test.systemlinkcloud.com', function () {
        let serviceUrls = new ServiceUrlsAPI({ protocol: 'https:', host: 'test.systemlinkcloud.com' });

        let isProduction = serviceUrls.isProduction();

        expect(isProduction).toBeFalsy();
    });

    it('getURL should return api-dev.systemlinkcloud.com for localhost', function () {
        let serviceUrls = new ServiceUrlsAPI({ protocol: 'http:', host: 'localhost:8000' });

        let url = serviceUrls.getURL();

        expect(url).toBe('https://api-dev.systemlinkcloud.com');
    });

    it('getURL should always return https', function () {
        let serviceUrls = new ServiceUrlsAPI({ protocol: 'http:', host: 'hosting-dev.systemlinkcloud.io' });

        let url = serviceUrls.getURL();

        expect(url).toBe('https://api-dev.systemlinkcloud.com');
    });

    it('getURL should return api-dev.systemlinkcloud.com as hostname', function () {
        let serviceUrls = new ServiceUrlsAPI({ protocol: 'https:', host: 'dev.systemlinkcloud.com' });

        let url = serviceUrls.getURL();

        expect(url).toBe('https://api-dev.systemlinkcloud.com');
    });

    it('getURL should return api-test.systemlinkcloud.com as hostname', function () {
        let serviceUrls = new ServiceUrlsAPI({ protocol: 'https:', host: 'test.systemlinkcloud.com' });

        let url = serviceUrls.getURL();

        expect(url).toBe('https://api-test.systemlinkcloud.com');
    });

    it('getURL should return api.systemlinkcloud.com as hostname', function () {
        let serviceUrls = new ServiceUrlsAPI({ protocol: 'https:', host: 'www.systemlinkcloud.com' });

        let url = serviceUrls.getURL();

        expect(url).toBe('https://api.systemlinkcloud.com');
    });
});
