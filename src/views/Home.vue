<template>
  <div style="background-color: #b9cceb; height: 100%">
    <v-row justify="space-around" style="margin-top: 30px">
      <video width="45%" id="webcam" class="video" muted autoplay></video>

      <video width="45%" id="screen" class="video" autoplay></video>

      <audio id="audio" muted></audio>
    </v-row>

    <v-col>
      <video v-if="mediaWebCam" :src="mediaWebCam" id="recordWC" width="60%" class="video" controls></video>
      <v-col v-if="mediaWebCam" class="mx-5">
        <v-text-field v-model="webcamMeta.title" class="mr-5" label="Title" />
        <v-textarea v-model="webcamMeta.description" label="Description"></v-textarea>
      </v-col>

      <video v-if="mediaScreen" :src="mediaScreen" id="record" width="60%" class="video" controls></video>
      <v-col class="mx-5" v-if="mediaScreen">
        <v-text-field v-model="screenMeta.title" class="mr-5" label="Title" />
        <v-textarea v-model="screenMeta.description" label="Description"></v-textarea>
      </v-col>

      <div class="mb-3" v-if="mediaAudio">
        <audio :src="mediaAudio" id="Recordaudio" style="width: 60%" controls></audio>

        <v-col class="mx-5">
          <v-text-field v-model="audioMeta.title" class="mr-5" label="Title" />
          <v-textarea v-model="audioMeta.description" label="Description"></v-textarea>
        </v-col>
      </div>

      <v-btn v-if="mediaScreen || mediaAudio || mediaWebCam" @click="submit">
        <v-icon left>mdi-content-save</v-icon>submit
      </v-btn>
    </v-col>

    <!-- Speed Dial -->
    <v-speed-dial v-model="fab" fixed class="mr-3" bottom right open-on-hover>
      <template v-slot:activator>
        <v-tooltip left>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-model="fab"
              large
              fab
              class="btn-fix"
              v-bind="attrs"
              v-on="on"
              @click="!recording?startRecord():stopRecord()"
            >
              <v-icon color="red">{{recording ? 'mdi-close-circle' : 'mdi-circle'}}</v-icon>
            </v-btn>
          </template>
          <span>{{recording ? 'Stop Recording' : 'Record'}}</span>
        </v-tooltip>
      </template>

      <v-tooltip left>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            @click="!webcam?startWebCamCapture():stopWebCamCapture()"
            fab
            small
            v-bind="attrs"
            v-on="on"
          >
            <v-icon v-if="!webcam">mdi-account</v-icon>
            <v-icon v-else>mdi-account-cancel</v-icon>
          </v-btn>
        </template>
        <span>{{webcam? 'Stop' : 'Start'}} Camera</span>
      </v-tooltip>

      <v-tooltip left>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            @click="!screen?startScreenCapture():stopScreenCapture()"
            fab
            small
            v-bind="attrs"
            v-on="on"
          >
            <v-icon v-if="!screen">mdi-monitor</v-icon>
            <v-icon v-else>mdi-monitor-off</v-icon>
          </v-btn>
        </template>
        <span>{{audio ? 'Stop' : 'Start'}} Screen Share</span>
      </v-tooltip>

      <v-tooltip left>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            @click="!audio?startAudioCapture():stopAudioCapture()"
            fab
            small
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>{{audio?'mdi-volume-mute':'mdi-volume-high'}}</v-icon>
          </v-btn>
        </template>
        <span>{{audio ? 'Stop' : 'Start'}} Audio Capture</span>
      </v-tooltip>
    </v-speed-dial>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  components: {},
  data: () => ({
    recording: false,
    webcam: false,
    screen: false,
    audio: false,
    options: {
      video: true,
      audio: true,
    },
    recordWebCam: null,
    recordScreen: null,
    recordAudio: null,
    mediaWebCam: null,
    mediaScreen: null,
    mediaAudio: null,
    uploadMediaScreen: null,
    uploadMediaWebCam: null,
    uploadMediaAudio: null,
    fab: false,
    webcamMeta: {
      title: "",
      description: "",
    },
    screenMeta: {
      title: "",
      description: "",
    },
    audioMeta: {
      title: "",
      description: "",
    },
  }),
  methods: {
    startWebCamCapture() {
      this.webcam = true;
      navigator.mediaDevices
        .getUserMedia(this.options)
        .then((mediaStreamObj) => {
          let video = document.getElementById("webcam");
          if ("srcObject" in video) {
            video.srcObject = mediaStreamObj;
          } else {
            video.src = window.URL.createObjectURL(mediaStreamObj);
          }
          this.recordWebCam = new MediaRecorder(mediaStreamObj);
          let recordingWebCam = [];

          this.recordWebCam.ondataavailable = function (ev) {
            recordingWebCam.push(ev.data);
          };

          this.recordWebCam.onstop = () => {
            let blob = new Blob(recordingWebCam, { type: "video/mp4;" });
            recordingWebCam = [];

            this.uploadMediaWebCam = { blob: blob, name: mediaStreamObj.id };
            this.mediaWebCam = window.URL.createObjectURL(blob);
          };
        })
        .catch((err) => {
          console.error("Error:" + err);
        });
    },
    stopWebCamCapture() {
      this.webcam = false;
      let videoElem = document.getElementById("webcam");
      let tracks = videoElem.srcObject.getTracks();
      tracks.forEach((track) => track.stop());
      videoElem.srcObject = null;
    },
    startScreenCapture() {
      this.screen = true;
      navigator.mediaDevices
        .getDisplayMedia(this.options)
        .then((mediaStreamObj) => {
          let video = document.getElementById("screen");
          if ("srcObject" in video) {
            video.srcObject = mediaStreamObj;
          } else {
            video.src = window.URL.createObjectURL(mediaStreamObj);
          }
          this.recordScreen = new MediaRecorder(mediaStreamObj);
          let recordingScreen = [];

          this.recordScreen.ondataavailable = function (ev) {
            console.log(ev);
            recordingScreen.push(ev.data);
          };

          this.recordScreen.onstop = () => {
            let blob = new Blob(recordingScreen, { type: "video/mp4;" });
            recordingScreen = [];
            this.uploadMediaScreen = { blob: blob, name: mediaStreamObj.id };
            this.mediaScreen = window.URL.createObjectURL(blob);
          };
        })
        .catch((err) => {
          console.error("Error:" + err);
          return null;
        });
    },
    stopScreenCapture() {
      this.screen = false;
      let videoElem = document.getElementById("screen");
      let tracks = videoElem.srcObject.getTracks();
      tracks.forEach((track) => track.stop());
      videoElem.srcObject = null;
    },
    startAudioCapture() {
      this.audio = true;
      let audioOptions = {
        video: false,
        audio: true,
      };
      navigator.mediaDevices
        .getUserMedia(audioOptions)
        .then((mediaStreamObj) => {
          let video = document.getElementById("audio");
          if ("srcObject" in video) {
            video.srcObject = mediaStreamObj;
          } else {
            video.src = window.URL.createObjectURL(mediaStreamObj);
          }
          this.recordAudio = new MediaRecorder(mediaStreamObj);
          let recordingAudio = [];

          this.recordAudio.ondataavailable = function (ev) {
            recordingAudio.push(ev.data);
          };

          this.recordAudio.onstop = () => {
            let blob = new Blob(recordingAudio, { type: "audio/mp4;" });
            recordingAudio = [];

            this.uploadMediaAudio = { blob: blob, name: mediaStreamObj.id };
            this.mediaAudio = window.URL.createObjectURL(blob);
          };
        })
        .catch((err) => {
          console.error("Error:" + err);
        });
    },
    stopAudioCapture() {
      this.audio = false;
      let AudioEle = document.getElementById("audio");
      let tracks = AudioEle.srcObject.getTracks();
      tracks.forEach((track) => track.stop());
      AudioEle.srcObject = null;
    },
    startRecord() {
      console.log("Recording....");
      this.recording = true;
      if (this.recordScreen) {
        this.recordScreen.start();
      }
      if (this.recordWebCam) {
        this.recordWebCam.start();
      }
      if (this.recordAudio) {
        this.recordAudio.start();
      }
    },
    stopRecord() {
      console.log("Stop Record");
      this.recording = false;
      if (this.recordScreen) {
        this.recordScreen.stop();
      }
      if (this.recordWebCam) {
        this.recordWebCam.stop();
      }
      if (this.recordAudio) {
        this.recordAudio.stop();
      }
    },
    submit() {
      if (this.mediaAudio) {
        this.$store.dispatch("uploadMedia", {
          media: this.uploadMediaAudio.blob,
          name: this.uploadMediaAudio.name,
          folder: "audios",
          meta: Object.assign({}, this.audioMeta),
        });
      }

      if (this.mediaWebCam) {
        this.$store.dispatch("uploadMedia", {
          media: this.uploadMediaWebCam.blob,
          name: this.uploadMediaWebCam.name,
          folder: "videos",
          meta: Object.assign({}, this.webcamMeta),
        });
      }

      if (this.mediaScreen) {
        this.$store.dispatch("uploadMedia", {
          media: this.uploadMediaScreen.blob,
          name: this.uploadMediaScreen.name,
          folder: "videos",
          meta: Object.assign({}, this.screenMeta),
        });
      }
    },
  },
};
</script>

<style scoped>
.video {
  border: 1px solid black;
}
</style>
