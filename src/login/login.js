import {inject} from "aurelia-framework";
import {Router} from "aurelia-router";
import {HttpClient} from "aurelia-http-client";

@inject(Router, HttpClient)
export class Login {
  heading = "登录页面";
  username = "";
  password = "";

  constructor(router, http) {
    this.router = router;
    this.http = http;
  }
  
  login() {
    console.log(this.username, this.password);
    this.router.navigateToRoute("dashboard");
  }

}
