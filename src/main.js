import 'bootstrap';

export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .developmentLogging()
    // .globalResources('tooltip')
    // .globalResources('carousel')
    // .globalResources('responsive')
    ;

  aurelia.start().then(a => a.setRoot());
}
