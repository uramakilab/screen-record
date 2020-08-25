import firebase from 'firebase';

export default {
    upload: (payload) => {
        var storageRef = firebase.storage().ref();
        var mediaRef = storageRef.child(`${payload.folder}/${payload.name}.${payload.extension}`)
        var newMetadata = {
            customMetadata: {
                'title': null,
                'description': null
            }
        }

        var uploadTask = mediaRef.put(payload.media).then(() => {
            if (payload.meta.title.length) {
                newMetadata.customMetadata.title = payload.meta.title
            }
            if (payload.meta.description.length) {
                newMetadata.customMetadata.description = payload.meta.description
            }
            if (payload.meta.title.length || payload.meta.description.length)
                mediaRef.updateMetadata(newMetadata).then(() => console.log("Sent metadata"))
                    .catch(err => console.error(err));

        }).catch(err => console.error(err));

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

        return url
    },
    getList: (payload) => {
        var storage = firebase.storage();

        var listRef = storage.ref().child(payload.folder);
        let list = []
        listRef.listAll().then(function (res) {
            res.items.forEach(function (itemRef) {
                itemRef.getMetadata().then((meta) => {
                    list.push({ name: itemRef.name, path: itemRef.fullPath, meta: meta.customMetadata ? Object.assign({}, meta.customMetadata) : Object.assign({}) })
                })
            });
        }).catch(function (error) {
            console.error(error)
        });

        return list
    }
}