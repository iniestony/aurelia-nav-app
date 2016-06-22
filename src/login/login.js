import {inject} from "aurelia-framework";
import {Router} from "aurelia-router";
import {HttpClient} from "aurelia-http-client";

@inject(Router, HttpClient)
export class Login {
  heading = "登录页面";
  username = "";
  password = "";

  constructor(router, http) {//use a constructor to adapt the injected
    this.router = router;
    this.http = http;
  }
  
  login() {
    console.log(this.username, this.password);
    this.router.navigateToRoute("dashboard");//navigate with router name
    // this.router.navigate("/dashboard/child-router");//navigate with router url
    // this.router.navigateToRoute('dashboard', {id: 10});
    // this.router.navigate("/dashboard/10");
  }

}
