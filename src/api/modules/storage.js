import firebase from 'firebase';

export default {
    upload: (payload) => {
        console.log("Payload API", payload)
        var storageRef = firebase.storage().ref();
        var uploadTask = storageRef.child(`${payload.folder}/${payload.name}.${payload.extension}`).put(payload.media);

        return uploadTask
    },
    getObject: async (payload) => {
        var axios = require('axios')
        var storage = firebase.storage();
        let url = await storage.ref(`${payload.folder}/${payload.name}.${payload.extension}`).getDownloadURL().then(async (url) => {
            return await axios.get(url, {
                responseType: 'blob',
                timeout: 30000,
            }).then(res => res.data)
        }).catch(err => {
            console.error(err);
        });
        return url;
    }
}