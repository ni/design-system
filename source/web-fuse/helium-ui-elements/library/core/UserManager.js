export class UserManager {
    constructor (remoteConnection) {
        this._remoteConnection = remoteConnection;
    }

    async getCurrentUser () {
        let response = await this._remoteConnection.get('userservices', '/user');
        if (response.status === 200) {
            return JSON.parse(response.responseText);
        }
    }

    async checkEntitlements () {
        let state = this._getNotificationState() || {};
        if (this._checkedEntitlementsToday(state)) {
            return { status: 'OK' };
        }

        let response = await this._remoteConnection.get('userservices', '/user/entitlements');
        if (response.status === 204) {
            return { status: 'NotAuthenticated' };
        }

        let data = JSON.parse(response.responseText);
        let result = this._evaluateEntitlementsResponse(data, state);

        this._storeNotificationState(result.period, result.expiresOn);
        return result;
    }

    _evaluateEntitlementsResponse (entitlements, state) {
        if (!this._entitlementCanExpire(entitlements)) {
            return {
                status: 'OK',
                period: state.period,
                expiresOn: state.expiresOn
            };
        }

        let expiresOn = entitlements.expiresOn;
        let days = this._getDaysBetween(new Date(entitlements.timestamp), new Date(expiresOn));
        let period = this._getExpirationPeriod(days);
        let evaluation = this._evaluationInProgress(entitlements.evaluation, entitlements.timestamp);

        let status = this._shouldNotifyInPeriod(state, period, expiresOn)
            ? 'NotifyUser'
            : 'OK';

        return {
            status: status,
            days: days,
            evaluation: evaluation,
            period: period,
            expiresOn: expiresOn
        };
    }

    _entitlementCanExpire (entitlements) {
        return entitlements.entitled === 'yes' && entitlements.expiresOn;
    }

    _evaluationInProgress (evaluation, timestamp) {
        return evaluation && evaluation.used && new Date(evaluation.expiresOn) >= new Date(timestamp);
    }

    _getDaysBetween (start, end) {
        return Math.ceil((end - start) / 86400000);
    }

    _getExpirationPeriod (days) {
        if (days > 28) {
            return 'more-than-one-month';
        } else if (days <= 28 && days > 21) {
            return 'less-than-one-month';
        } else if (days <= 21 && days > 7) {
            return 'less-than-three-weeks';
        } else {
            return 'only-' + days + '-days-left';
        }
    }

    _shouldNotifyInPeriod (state, period, expiresOn) {
        if (period === 'more-than-one-month') {
            return false;
        }
        if (this._alreadyNotifiedInPeriod(state, period, expiresOn)) {
            return false;
        }
        return true;
    }

    _alreadyNotifiedInPeriod (state, period, expiresOn) {
        return state.period === period && state.expiresOn === expiresOn;
    }

    _checkedEntitlementsToday (state) {
        return state.lastCheck === new Date().toDateString();
    }

    _storeNotificationState (period, expiresOn) {
        localStorage.setItem(
            'mc-launcher-entitlements-notification',
            JSON.stringify({
                lastCheck: new Date().toDateString(),
                period: period,
                expiresOn: expiresOn
            })
        );
    }

    _getNotificationState () {
        let state = localStorage.getItem('mc-launcher-entitlements-notification');
        if (state) {
            return JSON.parse(state);
        }
    }
}
