<template>
  <div>
    <v-row justify="space-around" class="mt-3">
      <v-btn @click="!webcam?startWebCamCapture():stopWebCamCapture()">
        <v-icon left>mdi-account</v-icon>Start Camera
      </v-btn>

      <v-btn @click="!recording?startRecord():stopRecord()">
        <v-icon left color="red">mdi-circle</v-icon>Record
      </v-btn>

      <v-btn @click="!screen?startScreenCapture():stopScreenCapture()">
        <v-icon left>mdi-monitor</v-icon>Start Screen Share
      </v-btn>

      <v-btn @click="!audio?startAudioCapture():stopAudioCapture()">
        <v-icon left>{{audio?'mdi-stop':'mdi-play'}}</v-icon>Start Audio Capture
      </v-btn>
    </v-row>
    <v-row justify="space-around" style="margin-top: 30px">
      <video width="45%" id="webcam" class="video" autoplay></video>

      <video width="45%" id="screen" class="video" autoplay></video>

      <audio id="audio" autoplay></audio>
      <!-- Saved Media  -->
      <video v-if="mediaWebCam" :src="mediaWebCam" width="45%" id="recordWC" class="video" controls></video>
      <video v-if="mediaScreen" :src="mediaScreen" width="45%" id="record" class="video" controls></video>
      <audio v-if="mediaAudio" :src="mediaAudio" id="Recordaudio" controls></audio>
    </v-row>
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
      audio: true
    },
    recordWebCam: null,
    recordScreen: null,
    recordAudio: null,
    mediaWebCam: null,
    mediaScreen: null,
    mediaAudio: null
  }),
  methods: {
    startWebCamCapture() {
      this.webcam = true;
      navigator.mediaDevices
        .getUserMedia(this.options)
        .then(mediaStreamObj => {
          let video = document.getElementById("webcam");
          if ("srcObject" in video) {
            video.srcObject = mediaStreamObj;
          } else {
            video.src = window.URL.createObjectURL(mediaStreamObj);
          }
          this.recordWebCam = new MediaRecorder(mediaStreamObj);
          let recordingWebCam = [];

          this.recordWebCam.ondataavailable = function(ev) {
            recordingWebCam.push(ev.data);
          };

          this.recordWebCam.onstop = () => {
            let blob = new Blob(recordingWebCam, { type: "video/mp4;" });
            recordingWebCam = [];
            this.mediaWebCam = window.URL.createObjectURL(blob);
          };
        })
        .catch(err => {
          console.error("Error:" + err);
        });
    },
    stopWebCamCapture() {
      this.webcam = false;
      let videoElem = document.getElementById("webcam");
      let tracks = videoElem.srcObject.getTracks();
      tracks.forEach(track => track.stop());
      videoElem.srcObject = null;
    },
    startScreenCapture() {
      this.screen = true;
      navigator.mediaDevices
        .getDisplayMedia(this.options)
        .then(mediaStreamObj => {
          let video = document.getElementById("screen");
          if ("srcObject" in video) {
            video.srcObject = mediaStreamObj;
          } else {
            video.src = window.URL.createObjectURL(mediaStreamObj);
          }
          this.recordScreen = new MediaRecorder(mediaStreamObj);
          let recordingScreen = [];

          this.recordScreen.ondataavailable = function(ev) {
            recordingScreen.push(ev.data);
          };

          this.recordScreen.onstop = () => {
            let blob = new Blob(recordingScreen, { type: "video/mp4;" });
            recordingScreen = [];
            this.mediaScreen = window.URL.createObjectURL(blob);
          };
        })
        .catch(err => {
          console.error("Error:" + err);
          return null;
        });
    },
    stopScreenCapture() {
      this.screen = false;
      let videoElem = document.getElementById("screen");
      let tracks = videoElem.srcObject.getTracks();
      tracks.forEach(track => track.stop());
      videoElem.srcObject = null;
    },
    startAudioCapture() {
      this.audio = true;
      let audioOptions = {
        video: false,
        audio: true
      };
      navigator.mediaDevices
        .getUserMedia(audioOptions)
        .then(mediaStreamObj => {
          let video = document.getElementById("audio");
          if ("srcObject" in video) {
            video.srcObject = mediaStreamObj;
          } else {
            video.src = window.URL.createObjectURL(mediaStreamObj);
          }
          this.recordAudio = new MediaRecorder(mediaStreamObj);
          let recordingAudio = [];

          this.recordAudio.ondataavailable = function(ev) {
            recordingAudio.push(ev.data);
          };

          this.recordAudio.onstop = () => {
            let blob = new Blob(recordingAudio, { type: "audio/mp3;" });
            recordingAudio = [];
            this.mediaAudio = window.URL.createObjectURL(blob);
          };
        })
        .catch(err => {
          console.error("Error:" + err);
        });
    },
    stopAudioCapture() {
      this.audio = false;
      let AudioEle = document.getElementById("audio");
      let tracks = AudioEle.srcObject.getTracks();
      tracks.forEach(track => track.stop());
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
    }
  }
};
</script>

<style scoped>
.video {
  border: 1px solid black;
}
</style>
