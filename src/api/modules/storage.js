import firebase from 'firebase';

export default {
    upload: (payload) => {
        console.log("Payload API", payload)
        var storageRef = firebase.storage().ref();
        var uploadTask = storageRef.child(`${payload.folder}/${payload.name}.${payload.extension}`).put(payload.media);

        return uploadTask
    },
    getObject: async (payload) => {
        var storage = firebase.storage();
        let url = await storage.ref(`${payload.folder}/${payload.name}.${payload.extension}`).getDownloadURL().then((url) => {
            var xhr = new XMLHttpRequest();
            var blob = null;
            xhr.responseType = 'blob';
            xhr.onload = function () {
                blob = xhr.response;
                console.log("storage", blob)
            };
            xhr.open('GET', url);
            xhr.send();
            // return url;
        }).catch(err => {
            console.error(err);
        });

        console.log("url", url)
        return url;
    }
}