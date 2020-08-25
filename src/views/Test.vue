<template>
  <div>
    <v-row>
      <v-col cols="3">
        <v-list>
          <v-subheader>My videos</v-subheader>
          <v-list-item-group v-model="selectVideo" color="primary">
            <v-list-item
              @click="getvideo(item), selectAudio =null"
              v-for="(item, i) in listVideos"
              :key="i"
            >
              <v-list-item-content>
                <v-list-item-title v-text="item.name"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
        <v-divider></v-divider>
        <v-list>
          <v-subheader>My audios</v-subheader>
          <v-list-item-group v-model="selectAudio" color="primary">
            <v-list-item
              @click="getAudio(item), selectVideo = null"
              v-for="(item, i) in listAudios"
              :key="i"
            >
              <v-list-item-content>
                <v-list-item-title v-text="item.name"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-col>
      <v-col>
        <video v-if="videoURL && selectVideo != null" :src="videoURL" controls width="800" />
        <audio v-if="audioURL && selectAudio  != null " :src="audioURL" controls />
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
      selectVideo: null,
      selectAudio: null,
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
    getAudio(item) {
      let name = item.name.split(".")[0];
      this.$store.dispatch("getAudio", {
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
      if (this.$store.state.mediaRecords.videoBlob) {
        return window.URL.createObjectURL(
          this.$store.state.mediaRecords.videoBlob
        );
      }
      return "";
    },
    audioURL() {
      if (this.$store.state.mediaRecords.audioBlob) {
        return window.URL.createObjectURL(
          this.$store.state.mediaRecords.audioBlob
        );
      }
      return "";
    },
    listVideos() {
      return this.$store.state.mediaRecords.listVideos;
    },
    listAudios() {
      return this.$store.state.mediaRecords.listAudios;
    }
  },
  created() {
    if (!this.$store.state.mediaRecords.listVideos) {
      this.$store.dispatch("getListMedia", {
        list: "setlistVideos",
        folder: "videos"
      });
    }
    if (!this.$store.state.mediaRecords.listAudios) {
      this.$store.dispatch("getListMedia", {
        list: "setlistAudios",
        folder: "audios"
      });
    }
  }
};
</script>