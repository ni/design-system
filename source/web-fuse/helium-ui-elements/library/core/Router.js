export class Router {
    constructor (location, current) {
        this._routes = [];
        this._location = location || window.location;
        this._current = current;
    }

    route (regex, onNavigate) {
        this._routes.push({ regex: regex, onNavigate: onNavigate });
        return this;
    }

    listen () {
        window.addEventListener('popstate', (e) => {
            if (e.state) {
                this._navigate(e.state);
            }
        });
        let path = this._getCurrentPath();
        if (this._current !== path) {
            this.navigateTo(path);
        }
        return this;
    }

    navigateTo (path) {
        if (history.state !== path) {
            history.pushState(path, null, path);
        }
        this._navigate(path);
        return this;
    }

    _navigate (path) {
        if (this._current !== path) {
            this._current = path;
            this._fireOnNavigateEvent(this._current);
        }
    }

    _fireOnNavigateEvent (path) {
        path = path || '';
        for (let route of this._routes) {
            let match = path.match(route.regex);
            if (match) {
                match.shift();
                route.onNavigate(match);
                break;
            }
        }
        return this;
    }

    _getCurrentPath () {
        return decodeURIComponent(this._location.pathname);
    }
}
