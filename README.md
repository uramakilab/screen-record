# Screen Record
This tool was created and develeped with the intention of learning how to capture and save video (both webcam and screen capture) and audio to a database (firebase) using mainly Javascript, Html and Vue.js.

## Firebase Project Setup
To be able to upload your videos/audios to firebase, you first need to create your own project in your [Firebase Console](console.firebase.google.com/)

Once you have created your project, in the left bar click "Realtime Database" and then "Create Database", follow the steps on the popup and configure your Firebase Database.

With your database created, you now have to configure you Firebase Storage. Again in the left bar, now click "Storage" and then "First Steps",  and follow the steps on the popup. After the storage is created click the "Rules" tab on the top and, in line 5, remove the 

```
: if request.auth != null
```

Your final rules should look something like:
```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write;
    }
  }
}
```

Having these parts setup, now go to your project's settings page and all the way at the bottom in the "Your Apps" section, click the web icon (</>) to add a Web App to your project. Follow the steps on the popup and configure your web app according to your needs.

Your Firebase project is now ready to receive videos and audios from our tool!

## Project setup
Once your firebase project is ready, it is still necessary to setup the screen-record project. Start by cloning the repository to the folder of your choice and make sure you have [Node.js](https://nodejs.org/en/download/) installed in your machine. Now, in the root directory of the project, run the command:

```
npm install
```

Now, for the final step you will have to create a file called ".env" in the root directory of the project. Inside this file is where all the firebase keys will go. In your firebase project, go to the settings page and all the way at the bottom, in the "Your Apps" section, there should be an open Web App that was [previously created](#firebase-project-setup). Under the "Firebase SDK Snippet" subscetion click on the "Configuration" button and you will have something like:

```
const firebaseConfig = {
  apiKey: "AIzaSyABPa_dcht9vdFtqHlZ5UXdnKbYAbVEV1I",
  authDomain: "screen-record-ef6a9.firebaseapp.com",
  databaseURL: "https://screen-record-ef6a9-default-rtdb.firebaseio.com",
  projectId: "screen-record-ef6a9",
  storageBucket: "screen-record-ef6a9.appspot.com",
  messagingSenderId: "569269779531",
  appId: "1:569269779531:web:7956caf969b2fab3fe61ce"
};
```

These are the keys you will be filling your .env file with. It is important to notice that the names in the .env file will not be exactly the same as the ones in the `firebaseConfig` variable, but will always be similar, for example, `projectId` will be `VUE_APP_FIREBASE_PROJECT_ID` and others will follow this rule. In the end your .env file should look like this: 

```
VUE_APP_FIREBASE_API_KEY = AIzaSyABPa_dcht9vdFtqHlZ5UXdnKbYAbVEV1I
VUE_APP_FIREBASE_AUTH_DOMAIN = screen-record-ef6a9.firebaseapp.com
VUE_APP_FIREBASE_PROJECT_ID = screen-record-ef6a9
VUE_APP_FIREBASE_STORAGE_BUCKET = screen-record-ef6a9.appspot.com
VUE_APP_FIREBASE_DB_URL = https://screen-record-ef6a9-default-rtdb.firebaseio.com
VUE_APP_FIREBASE_SENDER_ID = 569269779531
VUE_APP_FIREBASE_APP_ID = 1:569269779531:web:7956caf969b2fab3fe61ce
```

*The .env variable names **cannot** be changed*

With that, you are all set. Once you run the project, your videos/audios should be uploaded to your Firebase Storage!

### Running the project
To be able to run the project, all you need to do is have [Node.js](https://nodejs.org/en/download/) installed on your machine and run the command in the project root directory:
```
npm run serve
```

This a hot reaload way to run a development enviroment, for production compiles run the command:
```
npm run build
```