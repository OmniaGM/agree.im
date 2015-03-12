requirejs.config({
  baseUrl: '/assets/js',
  deps: ['main'],
  paths: {
    jQuery: "../../bower_components/jquery/dist/jquery.min",
    firebase: "../../bower_components/firebase/firebase",
    angular: "../../bower_components/angular/angular.min",
    angularfire: "../../bower_components/angularfire/dist/angularfire.min",
    "angular-route": "../../bower_components/angular-route/angular-route.min",
    "underscore": "../../bower_components/underscore-amd/underscore-min"
  },
  shim: {
    firebase: {
      exports: "firebase"
    },
    angular: {
      exports: "angular"
    },
    angularfire: {
      deps: ["firebase", "angular"],
      exports: "angularfire"
    },
    "angular-route": {
      deps: ["angular"],
      exports: "angular-route"
    }
  }
});
