// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiEndpoints: {
    login        : 'http://localhost:8080/auth/login',

    stockListBaseUrl     : 'http://localhost:8080/api/stocks',
    stockList_users    : 'http://localhost:8080/api/stocks/users',
   
    // alpha vantage api 
    alphaVntgUrl : 'http://localhost:8080/av/stock',

    // portfolio api to add or sell stock
    portfolioUrl : 'http://localhost:8080/portfolio/stock'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
// src/environments/environment.ts
