<template>
  <div>
    <v-row>
      <v-col cols="3">
        <v-list>
          <v-subheader>My videos</v-subheader>
          <v-list-item-group v-model="select" color="primary">
            <v-list-item @click="getvideo(item)" v-for="(item, i) in list" :key="i">
              <v-list-item-content>
                <v-list-item-title v-text="item.name"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-col>
      <v-col>
        <video v-if="videoURL" :src="videoURL" controls width="800" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  name: "Upload",
  data() {
    return {
      select: null,
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
    getvideo(item) {
      let name = item.name.split(".")[0];
      this.$store.dispatch("getVideo", {
        name: name
      });
    },
    onUpload() {
      this.picture = null;

      const storageRef = firebase
        .storage()
        .ref(`${this.imageData.name}`)
        .put(this.imageData);
      storageRef.on(
        `state_changed`,
        snapshot => {
          this.uploadValue =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        error => {
          console.error(error.message);
        },
        () => {
          this.uploadValue = 100;
          storageRef.snapshot.ref.getDownloadURL().then(url => {
            this.picture = url;
          });
        }
      );
    }
  },
  computed: {
    videoURL() {
      if(this.$store.state.mediaRecords.videoBlob) {
        console.log("nahsdaj");
        return window.URL.createObjectURL(this.$store.state.mediaRecords.videoBlob);
      }

      return '';
    },
    list() {
      return this.$store.state.mediaRecords.list;
    }
  },
  created() {
    if (!this.$store.state.mediaRecords.list) {
      this.$store.dispatch("getListVideos", { folder: "videos" });
    }
  }
};
</script>