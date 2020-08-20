<template>
  <div>
    <v-row justify="space-around" class="mt-3">
      <v-btn @click="startWebCamCapture">
        <v-icon left>mdi-account</v-icon>Start Camera
      </v-btn>

      <v-btn @click="!recording?startRecord():stopRecord()">
        <v-icon left color="red">mdi-circle</v-icon>Record
      </v-btn>

      <v-btn @click="startScreenCapture">
        <v-icon left>mdi-monitor</v-icon>Start Screen Share
      </v-btn>
    </v-row>
    <v-row justify="space-around" style="margin-top: 30px">
      <video width="45%" id="webcam" class="video" autoplay></video>

      <video width="45%" id="screen" class="video" autoplay></video>

       <video v-if="MediaWebCam"  :src="MediaWebCam" width="45%" id="recordWC" class="video" controls></video>
      <!--<video width="45%" id="record" class="video" controls></video> -->
      {{recordWebCam}}
      {{recordScreen}}
    </v-row>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  components: {},
  data: () => ({
    recording: false,
    options: {
      video: true,
      audio: false
    },
    recordWebCam: null,
    recordScreen: null,
    MediaWebCam:null
  }),
  methods: {
    startWebCamCapture() {
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
            this.MediaWebCam = window.URL.createObjectURL(blob);            
          };
        })
        .catch(err => {
          console.error("Error:" + err);
        });
    },
    startScreenCapture() {
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
            this.recordScreen = window.URL.createObjectURL(blob);
          };
        })
        .catch(err => {
          console.error("Error:" + err);
          return null;
        });
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
    }
  }
};
</script>

<style scoped>
.video {
  border: 1px solid black;
}
</style>
