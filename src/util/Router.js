class HashRouter {
  constructor() {
      this.router = {};
      this.currentUrl = "";
      this.history = [];
      this.currentIndex = this.history.length - 1;
      this.backIndex = this.history.length - 1;
      this.isBack = false;
      window.addEventListener('load', this.refresh.bind(this));
      window.addEventListener('hashchange', this.refresh.bind(this));
  }

  route(path, callback) {
    this.router[path] = callback || function() {};
  }

  refresh() {
    this.currentUrl = location.hash.slice(1) || '/';
    this.history.push(this.currentUrl);
    this.currentIndex++;
    if(!this.isBack) {
      this.backIndex = this.currentIndex;
    }
    this.router[this.currentUrl]();
    this.isBack = false;
  }

  back() {
    this.isBack = true;
    this.backIndex <= 0 ? 0 : this.backIndex - 1;
    location.hash = `#${this.history[this.backIndex]}`;
  }
}

class HistoryRouter {
  constructor() {
    this.router = {};
    window.addEventListener('popstate', this.handleHistoryChange.bind(this));
  }
  route(path, callback) {
    this.router[path] = callback || function() {};
  }

  back() {
    history.go(-1);
  }

  handleHistoryChange(e) {
    const path = e.state.path;
    this.router[path]();
  }
}
