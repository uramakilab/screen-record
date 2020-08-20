<template>
  <div>
    <v-row justify="space-around" class="mt-3">
      <v-btn>
        <v-icon left>mdi-account</v-icon>
        Start Camera</v-btn>

      <v-btn>
        <v-icon left color="red">mdi-circle</v-icon>
        Record</v-btn>
      <v-btn>
        <v-icon left>mdi-monitor</v-icon>
        Start Screen Share</v-btn>
    </v-row>
    <v-row justify="space-around" style="margin-top: 30px">
      <video width="45%" class="video" autoplay></video>

      <video width="45%" class="video" autoplay></video>
    </v-row>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  components: {},
};
</script>

<style scoped>
.video {
  border: 1px solid black;
}
</style>
