import firebase from 'firebase';

export default {
    upload:(payload)=>{
        console.log("Payload API",payload)
        var storageRef = firebase.storage().ref();
        var uploadTask = storageRef.child(`${payload.folder}/${payload.name}.${payload.extension}`).put(payload.media);

        return uploadTask
    }
}