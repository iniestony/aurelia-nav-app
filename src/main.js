// comment out if you don't want a Promise polyfill (remove also from webpack.config.js)
import * as Bluebird from 'bluebird';
Bluebird.config({ warnings: false });

// import esNextPromise from 'es6-promise';
// esNextPromise.polyfill();

export async function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .developmentLogging();

  await aurelia.start();
  aurelia.setRoot("pages/app");
}