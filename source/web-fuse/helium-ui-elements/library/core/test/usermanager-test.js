import { UserManager } from '../UserManager.js';
import { RemoteConnectionFake } from './remote-connection-fake.js';

describe('UserManager', () => {
    describe('getCurrentUser', () => {
        it('should call /user', async function () {
            let remoteConnection = new RemoteConnectionFake({
                get: { status: 204 }
            });

            await new UserManager(remoteConnection).getCurrentUser();

            expect(remoteConnection.path).toBe('/user');
        });

        it('should parse logged-in user response from /user', async function () {
            let remoteConnection = new RemoteConnectionFake({
                get: {
                    status: 200,
                    responseText: '{"firstName":"Thomas","lastName":"Schmitt","email":"thomas.schmitt@ni.com","id":"1f52b868-f3a0-43b1-80f6-b79cf1adccfe"}'
                }
            });

            let user = await new UserManager(remoteConnection).getCurrentUser();

            expect(user.firstName).toBe('Thomas');
            expect(user.lastName).toBe('Schmitt');
            expect(user.email).toBe('thomas.schmitt@ni.com');
            expect(user.id).toBe('1f52b868-f3a0-43b1-80f6-b79cf1adccfe');
        });

        it('should parse empty response for anonymous users from /user', async function () {
            let remoteConnection = new RemoteConnectionFake({
                get: { status: 204 }
            });

            let user = await new UserManager(remoteConnection).getCurrentUser();

            expect(user).toBeUndefined();
        });
    });

    describe('checkEntitlements', () => {
        beforeEach(function () {
            localStorage.removeItem('mc-launcher-entitlements-notification');
        });

        it('should return OK if it has been checked today already', async function () {
            localStorage.setItem(
                'mc-launcher-entitlements-notification',
                JSON.stringify({
                    lastCheck: new Date().toDateString(),
                    period: 'more-than-one-month',
                    expiresOn: new Date()
                })
            );

            let result = await new UserManager().checkEntitlements();

            expect(result.status).toBe('OK');
        });

        it('should return NotAuthenticated if user is not logged-in', async function () {
            let remoteConnection = new RemoteConnectionFake({
                get: { status: 204 }
            });

            let result = await new UserManager(remoteConnection).checkEntitlements();

            expect(result.status).toBe('NotAuthenticated');
        });

        it('should return OK if entitlement cannot expire', async function () {
            let remoteConnection = new RemoteConnectionFake({
                get: {
                    status: 200,
                    responseText: JSON.stringify({
                        expiresOn: null,
                        evaluation: { used: false, expiresOn: null },
                        entitled: 'yes',
                        timestamp: '2019-03-04T06:59:36.953Z'
                    })
                }
            });

            let result = await new UserManager(remoteConnection).checkEntitlements();

            expect(result.status).toBe('OK');
        });

        it('should return OK if entitlement expires in more than a month', async function () {
            let remoteConnection = new RemoteConnectionFake({
                get: {
                    status: 200,
                    responseText: JSON.stringify({
                        expiresOn: '2019-09-03T17:29:16.983Z',
                        evaluation: { used: false, expiresOn: null },
                        entitled: 'yes',
                        timestamp: '2019-03-04T06:59:36.953Z'
                    })
                }
            });

            let result = await new UserManager(remoteConnection).checkEntitlements();

            expect(result.status).toBe('OK');
        });

        it('should return NotifyUser if entitlement expires in less than a month', async function () {
            let remoteConnection = new RemoteConnectionFake({
                get: {
                    status: 200,
                    responseText: JSON.stringify({
                        expiresOn: '2019-03-27T12:10:22.123Z',
                        evaluation: { used: false, expiresOn: null },
                        entitled: 'yes',
                        timestamp: '2019-03-04T06:59:36.953Z'
                    })
                }
            });

            let result = await new UserManager(remoteConnection).checkEntitlements();

            expect(result.status).toBe('NotifyUser');
            expect(result.days).toBe(24);
            expect(result.evaluation).toBeFalsy();
            expect(result.period).toBe('less-than-one-month');
        });

        it('should return NotifyUser if entitlement expires in less than three weeks', async function () {
            let remoteConnection = new RemoteConnectionFake({
                get: {
                    status: 200,
                    responseText: JSON.stringify({
                        expiresOn: '2019-03-21T12:10:22.123Z',
                        evaluation: { used: false, expiresOn: null },
                        entitled: 'yes',
                        timestamp: '2019-03-04T06:59:36.953Z'
                    })
                }
            });

            let result = await new UserManager(remoteConnection).checkEntitlements();

            expect(result.status).toBe('NotifyUser');
            expect(result.days).toBe(18);
            expect(result.evaluation).toBeFalsy();
            expect(result.period).toBe('less-than-three-weeks');
        });

        it('should return NotifyUser if entitlement expires in less than a week', async function () {
            let remoteConnection = new RemoteConnectionFake({
                get: {
                    status: 200,
                    responseText: JSON.stringify({
                        expiresOn: '2019-03-06T12:10:22.123Z',
                        evaluation: { used: false, expiresOn: null },
                        entitled: 'yes',
                        timestamp: '2019-03-04T06:59:36.953Z'
                    })
                }
            });

            let result = await new UserManager(remoteConnection).checkEntitlements();

            expect(result.status).toBe('NotifyUser');
            expect(result.days).toBe(3);
            expect(result.evaluation).toBeFalsy();
            expect(result.period).toBe('only-3-days-left');
        });

        it('should return ok if entitlements have been already checked', async function () {
            let remoteConnection = new RemoteConnectionFake({
                get: {
                    status: 200,
                    responseText: JSON.stringify({
                        expiresOn: '2019-03-06T12:10:22.123Z',
                        evaluation: { used: false, expiresOn: null },
                        entitled: 'yes',
                        timestamp: '2019-03-04T06:59:36.953Z'
                    })
                }
            });

            await new UserManager(remoteConnection).checkEntitlements();

            let result = await new UserManager(remoteConnection).checkEntitlements();

            expect(result.status).toBe('OK');
        });

        it('should return OK if evaluation expires in more than a month', async function () {
            let remoteConnection = new RemoteConnectionFake({
                get: {
                    status: 200,
                    responseText: JSON.stringify({
                        expiresOn: '2019-09-03T17:29:16.983Z',
                        evaluation: { used: true, inProgres: true, expiresOn: '2019-09-03T17:29:16.983Z' },
                        entitled: 'yes',
                        timestamp: '2019-03-04T06:59:36.953Z'
                    })
                }
            });

            let result = await new UserManager(remoteConnection).checkEntitlements();

            expect(result.status).toBe('OK');
        });

        it('should return NotifyUser if evaluation expires in less than a month', async function () {
            let remoteConnection = new RemoteConnectionFake({
                get: {
                    status: 200,
                    responseText: JSON.stringify({
                        expiresOn: '2019-03-27T12:10:22.123Z',
                        evaluation: { used: true, inProgres: true, expiresOn: '2019-03-27T12:10:22.123Z' },
                        entitled: 'yes',
                        timestamp: '2019-03-04T06:59:36.953Z'
                    })
                }
            });

            let result = await new UserManager(remoteConnection).checkEntitlements();

            expect(result.status).toBe('NotifyUser');
            expect(result.days).toBe(24);
            expect(result.evaluation).toBeTruthy();
            expect(result.period).toBe('less-than-one-month');
        });

        it('should return NotifyUser if evaluation expires in less than three weeks', async function () {
            let remoteConnection = new RemoteConnectionFake({
                get: {
                    status: 200,
                    responseText: JSON.stringify({
                        expiresOn: '2019-03-21T12:10:22.123Z',
                        evaluation: { used: true, inProgres: true, expiresOn: '2019-03-21T12:10:22.123Z' },
                        entitled: 'yes',
                        timestamp: '2019-03-04T06:59:36.953Z'
                    })
                }
            });

            let result = await new UserManager(remoteConnection).checkEntitlements();

            expect(result.status).toBe('NotifyUser');
            expect(result.days).toBe(18);
            expect(result.evaluation).toBeTruthy();
            expect(result.period).toBe('less-than-three-weeks');
        });

        it('should return NotifyUser if evaluation expires in less than a week', async function () {
            let remoteConnection = new RemoteConnectionFake({
                get: {
                    status: 200,
                    responseText: JSON.stringify({
                        expiresOn: '2019-03-06T12:10:22.123Z',
                        evaluation: { used: true, inProgres: true, expiresOn: '2019-03-06T12:10:22.123Z' },
                        entitled: 'yes',
                        timestamp: '2019-03-04T06:59:36.953Z'
                    })
                }
            });

            let result = await new UserManager(remoteConnection).checkEntitlements();

            expect(result.status).toBe('NotifyUser');
            expect(result.days).toBe(3);
            expect(result.evaluation).toBeTruthy();
            expect(result.period).toBe('only-3-days-left');
        });
    });
});
