import 'bootstrap/dist/css/bootstrap.css';

export class Root {
  configureRouter(config, router) {
    config.title = 'Root Component';

    config.map([
      { route: ['', 'login'], name: 'login',  moduleId: '../login/login', nav: true, title: 'Login'},
      { route: 'dashboard', name: 'dashboard', moduleId: '../dashboard/dashboard', nav: true, title: 'Dashboard'}
    ]);

    this.router = router;
  }
}
