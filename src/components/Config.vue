<template>
  <v-dialog v-model="dialog" persistent width="500">
    <v-card>
      <v-card-title class="px-4" dense>Capture Configuration</v-card-title>
      <v-tabs v-model="tab">
        <v-tab>Web Cam</v-tab>
        <v-tab>Shared Screen</v-tab>
        <v-tab>Audio</v-tab>
      </v-tabs>
      <div v-if="tab==0 && auxConfigWebCam">
        <div class="mx-2" style="display:flex; align-items:center;">
          <p class="ma-0" style="width:150px">Video config default:</p>
          <v-switch class="mx-2" v-model="video"></v-switch>
        </div>
        <div class="mx-4" v-if="!video">
          <div class="mx-2" style="display:flex;align-items:center;">
            <p class="ma-0" style="width:100px">Facing Mode :</p>
            <v-select
              class="mx-4"
              dense
              :items="facingModes"
              v-model="auxConfigWebCam.video.facingMode"
            ></v-select>
          </div>
          <div class="mx-2" style="display:flex; align-items:center;">
            <p class="ma-0" style="width:100px">Resolution :</p>
            <v-select
              class="mx-4"
              dense
              return-object
              v-model="resolution"
              :items="resolutions"
              item-text="text"
              item-value="value"
            ></v-select>
          </div>
        </div>
        <div class="mx-2" style="display:flex; align-items:center;">
          <p class="ma-0" style="width:150px">Audio Capture:</p>
          <v-switch class="mx-2" v-model="auxConfigWebCam.audio"></v-switch>
        </div>
        {{auxConfigWebCam}}
      </div>
      <div v-else-if="tab==1">
        <div class="mx-2" style="display:flex;align-items:center;">
          <p class="ma-0" style="width:100px">Cursor :</p>
          <v-select class="mx-4" dense :items="cursorModes" v-model="auxConfigScreen.cursor"></v-select>
        </div>
      </div>
      <div v-else-if="tab==2">
        <v-container fluid>
          <div class="mx-2" style="display:flex; align-items:center;">
            Echo Cancellation:
            <v-switch class="mx-2" v-model="auxConfigAudio.echoCancellation"></v-switch>
          </div>
          <div class="mx-2" style="display:flex;align-items:center;">
            Noise Suppression:
            <v-switch class="mx-2" v-model="auxConfigAudio.noiseSuppression"></v-switch>
          </div>
        </v-container>
      </div>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="error" text @click="$emit('close')">Cancel</v-btn>
        <v-btn color="success" @click="save">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ["dialog", "options"],
  data: () => ({
    tab: 0,
    video: null,
    auxConfigWebCam: null,
    auxConfigScreen: null,
    auxConfigAudio: null,
    cursorModes: ["always", "motion", "never"],
    facingModes: ["user", "environment", "left", "right"],
    resolution: { height: 240, width: 352 },
    resolutions: [
      { text: "240p", value: { height: 240, width: 352 } },
      { text: "360p", value: { height: 360, width: 480 } },
      { text: "480p", value: { height: 480, width: 858 } },
      { text: "720p", value: { height: 720, width: 1280 } },
      { text: "1080p", value: { height: 1080, width: 1920 } },
      { text: "2160p", value: { height: 2160, width: 3860 } }
    ]
  }),
  methods: {
    save() {
      Object.assign(this.options.configAudio.audio, this.auxConfigAudio);
      Object.assign(this.options.configWebCam, this.auxConfigWebCam);
      Object.assign(this.options.configScreen.video, this.auxConfigScreen);
      this.$emit("close");
    },
    change(item) {
      console.log(item);
    }
  },
  watch: {
    video() {
      if (this.video != undefined && this.auxConfigWebCam) {
        if (this.video == false) {
          if (typeof this.options.configWebCam.video == "boolean") {
            console.log("True", this.auxConfigWebCam.video);
            this.auxConfigWebCam.video = Object.assign(
              {},
              {
                facingMode: "user",
                height: 240,
                width: 352
              }
            );
          } else {
            this.auxConfigWebCam.video = Object.assign(
              {},
              this.options.configWebCam.video
            );
            this.resolution = {
              height: this.options.configWebCam.video.height,
              width: this.options.configWebCam.video.width
            };
          }
        } else if (this.video == true) {
          this.auxConfigWebCam.video = true;
        }
      }
    },
    resolution() {
      Object.assign(this.auxConfigWebCam.video, this.resolution.value);
    }
  },
  mounted() {
    this.auxConfigWebCam = Object.assign({}, this.options.configWebCam);
    this.video =
      typeof this.options.configWebCam.video == "boolean"
        ? this.options.configWebCam.video
        : false;
    this.auxConfigScreen = Object.assign({}, this.options.configScreen.video);
    this.auxConfigAudio = Object.assign({}, this.options.configAudio.audio);
  }
};
</script>

<style>
</style>