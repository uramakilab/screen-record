<template>
  <div>
    <video :src="videoURL" controls width="800" />
    {{videoURL}}
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  name: "Upload",
  data() {
    return {
      uploadValue: 0
    };
  },
  methods: {
    log() {
      console.log("log", this.imageData);
    },
    previewImage(event) {
      this.uploadValue = 0;
      this.picture = null;
      this.imageData = event.target.files[0];
    },

    onUpload() {
      this.picture = null;
      
      const storageRef = firebase
        .storage()
        .ref(`${this.imageData.name}`)
        .put(this.imageData);
      storageRef.on(
        `state_changed`,
        (snapshot) => {
          this.uploadValue =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        (error) => {
          console.error(error.message);
        },
        () => {
          this.uploadValue = 100;
          storageRef.snapshot.ref.getDownloadURL().then((url) => {
            this.picture = url;
          });
        }
      );
    }
  },
  computed:{
    videoURL() {
      if(this.$store.state.mediaRecords.videoBlob) {
        console.log("nahsdaj");
        return window.URL.createObjectURL(this.$store.state.mediaRecords.videoBlob);
      }

      return '';
    }
  },
  created() {
    if(!this.$store.state.mediaRecords.video) {
      this.$store.dispatch("getVideo", {name: 'ttlCZ0N6Gfx2We5nr3FdsEteIh3Yp4CzZpfE'})
    }
  }
};
</script>