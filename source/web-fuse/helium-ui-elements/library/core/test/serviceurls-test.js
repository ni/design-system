import { ServiceUrls } from '../ServiceUrls.js';

describe('ServiceURLs', () => {
    it('should return localhost as hostname', function () {
        let serviceUrls = new ServiceUrls({ protocol: 'http:', host: 'localhost:8000' });

        let hostname = serviceUrls.hostname();

        expect(hostname).toBe('http://localhost:8000');
    });

    it('should always return https', function () {
        let serviceUrls = new ServiceUrls({ protocol: 'http:', host: 'hosting-dev.systemlinkcloud.io' });

        let hostname = serviceUrls.hostname();

        expect(hostname).toBe('https://dev.systemlinkcloud.com');
    });

    it('should return dev.systemlinkcloud.com as hostname when on .io', function () {
        let serviceUrls = new ServiceUrls({ protocol: 'https:', host: 'hosting-dev.systemlinkcloud.io' });

        let hostname = serviceUrls.hostname();

        expect(hostname).toBe('https://dev.systemlinkcloud.com');
    });

    it('should return dev.systemlinkcloud.com as hostname', function () {
        let serviceUrls = new ServiceUrls({ protocol: 'https:', host: 'dev.systemlinkcloud.com' });

        let hostname = serviceUrls.hostname();

        expect(hostname).toBe('https://dev.systemlinkcloud.com');
    });

    it('should return test.systemlinkcloud.com as hostname when on .io', function () {
        let serviceUrls = new ServiceUrls({ protocol: 'https:', host: 'hosting-test.systemlinkcloud.io' });

        let hostname = serviceUrls.hostname();

        expect(hostname).toBe('https://test.systemlinkcloud.com');
    });

    it('should return test.systemlinkcloud.com as hostname', function () {
        let serviceUrls = new ServiceUrls({ protocol: 'https:', host: 'test.systemlinkcloud.com' });

        let hostname = serviceUrls.hostname();

        expect(hostname).toBe('https://test.systemlinkcloud.com');
    });

    it('should return www.systemlinkcloud.com as hostname when on .io', function () {
        let serviceUrls = new ServiceUrls({ protocol: 'https:', host: 'hosting.systemlinkcloud.io' });

        let hostname = serviceUrls.hostname();

        expect(hostname).toBe('https://www.systemlinkcloud.com');
    });

    it('should return www.systemlinkcloud.com as hostname', function () {
        let serviceUrls = new ServiceUrls({ protocol: 'https:', host: 'www.systemlinkcloud.com' });

        let hostname = serviceUrls.hostname();

        expect(hostname).toBe('https://www.systemlinkcloud.com');
    });

    it('isProduction should return true for www.systemlinkcloud.com', function () {
        let serviceUrls = new ServiceUrls({ protocol: 'https:', host: 'www.systemlinkcloud.com' });

        let isProduction = serviceUrls.isProduction();

        expect(isProduction).toBeTruthy();
    });

    it('isProduction should return false for dev.systemlinkcloud.com', function () {
        let serviceUrls = new ServiceUrls({ protocol: 'https:', host: 'dev.systemlinkcloud.com' });

        let isProduction = serviceUrls.isProduction();

        expect(isProduction).toBeFalsy();
    });

    it('isProduction should return false for test.systemlinkcloud.com', function () {
        let serviceUrls = new ServiceUrls({ protocol: 'https:', host: 'test.systemlinkcloud.com' });

        let isProduction = serviceUrls.isProduction();

        expect(isProduction).toBeFalsy();
    });

    it('getURL should return current location by default', function () {
        let serviceUrls = new ServiceUrls({ protocol: 'https:', host: 'www.systemlinkcloud.com' });

        let url = serviceUrls.getURL('any service');

        expect(url).toBe('https://www.systemlinkcloud.com');
    });

    it('getURL should return production hosting domain', function () {
        let serviceUrls = new ServiceUrls({ protocol: 'https:', host: 'www.systemlinkcloud.com' });

        let url = serviceUrls.getURL('contentHosting');

        expect(url).toBe('https://hosting.systemlinkcloud.io');
    });

    it('getURL should return test hosting domain', function () {
        let serviceUrls = new ServiceUrls({ protocol: 'https:', host: 'test.systemlinkcloud.com' });

        let url = serviceUrls.getURL('contentHosting');

        expect(url).toBe('https://hosting-test.systemlinkcloud.io');
    });

    it('getURL should return dev hosting domain', function () {
        let serviceUrls = new ServiceUrls({ protocol: 'https:', host: 'dev.systemlinkcloud.com' });

        let url = serviceUrls.getURL('contentHosting');

        expect(url).toBe('https://hosting-dev.systemlinkcloud.io');
    });

    it('getURL should return dev hosting domain for localhost', function () {
        let serviceUrls = new ServiceUrls({ protocol: 'http:', host: 'localhost:8000' });

        let url = serviceUrls.getURL('contentHosting');

        expect(url).toBe('https://hosting-dev.systemlinkcloud.io');
    });
});
