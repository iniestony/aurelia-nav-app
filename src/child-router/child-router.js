export class ChildRouter {
  heading = "Child Router";

  configureRouter(config, router) {
    config.map([
      { route: ["/", "/welcome"], name: "welcome",       moduleId: "../welcome/welcome",       nav: true, title: "Welcome" },
      { route: "/users",         name: "users",         moduleId: "../users/users",         nav: true, title: "Github Users" }
    ]);

    this.router = router;
  }
}
