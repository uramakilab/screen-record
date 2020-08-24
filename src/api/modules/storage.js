import firebase from 'firebase';

export default {
    upload: (payload) => {
        console.log("Payload API", payload)
        var storageRef = firebase.storage().ref();
        var uploadTask = storageRef.child(`${payload.folder}/${payload.name}.${payload.extension}`).put(payload.media);

        return uploadTask
    },
    getObject: (payload) => {
        var storage = firebase.storage();
        let url = storage.ref(`${payload.folder}/${payload.name}.${payload.extension}`).getDownloadURL().then((url) => {
            return url;
        }).catch(err => {
            console.error(err);
        });

        return url
    }
}