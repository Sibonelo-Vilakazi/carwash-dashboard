// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
// import * as dotenv from 'dotenv';

// dotenv.config();
export const environment = {
  production: false,
  baseUrl: 'http://localhost:3007/api',
  // apiKey: process.env.API_KEY,
  // authDomain: process.env.AUTH_DOMAIN,
  // projectId: process.env.PROJECT_ID,
  // storageBucket: process.env.STORAGE_BUCKET,
  // messagingSenderId: process.env.MESSAGING_SENDER_ID,
  // appId: process.env.APP_ID,
  // measurementId: process.env.MEASUREMENT_ID
  firebase: {
    apiKey: "AIzaSyAu54hIstXQh7NkpN02jNVTGddOzwd6x5o",
  authDomain: "easy-wash-68220.firebaseapp.com",
  projectId: "easy-wash-68220",
  storageBucket: "easy-wash-68220.firebasestorage.app",
  messagingSenderId: "1063480700299",
  appId: "1:1063480700299:web:0da9b330767c3f0350538e",
  measurementId: "G-05QKJJ834Z"}
  
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
