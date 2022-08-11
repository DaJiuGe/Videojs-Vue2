<template>
  <div>
    <video-player :class="['video-player', 'vjs-big-play-centered', { loading: !state }]" :options="playerOptions"
      :sources="mediaConfig.sources" :poster="mediaConfig.poster" :tracks="mediaConfig.tracks" cross-origin="anonymous"
      @mounted="handleMounted" />
    <play-list :index="playMediaIndex" @update:index="handleMediaChange" />
  </div>
</template>

<script setup lang="ts">
import { shallowRef, shallowReactive, computed, nextTick, onMounted } from 'vue'
import { videoPlayer } from 'vue-video-player'
// import 'video.js/dist/video-js.css'
import '../lib/videojs/video-js.min.css'

import PlayList from './PlayList.vue'
import { videoSources } from './videoSources'
import { decrypt } from '../utils/image-decrypt'

// onMounted(async () => {
//   const poster = videoSources[0].poster
//   const base64 = await decrypt(poster)
//   console.log(base64)
//   videoSources[0].poster = base64
// })

const player = shallowRef()
const state = shallowRef()
const playMediaIndex = shallowRef(0)
const playerOptions = shallowReactive({
  autoplay: true,
  volume: 0.8,
  controlBar: {
    remainingTimeDisplay: {
      displayNegative: false
    }
  },
  playbackRate: 1,
  playbackRates: [0.5, 1, 1.5, 2],
  controls: true,
  muted: false,
  loop: false,
  fluid: true,
  aspectRatio: '16:9',
  sources: videoSources[playMediaIndex.value].sources,
  poster: videoSources[playMediaIndex.value].poster,
  tracks: (videoSources[playMediaIndex.value].textTracks as any) ?? []
})

const mediaConfig = computed(() => ({
  sources: videoSources[playMediaIndex.value].sources,
  poster: videoSources[playMediaIndex.value].poster,
  tracks: (videoSources[playMediaIndex.value].textTracks as any) ?? []
}))

const handleMounted = (payload: any) => {
  state.value = payload.state
  player.value = payload.player
}

const handleMediaChange = (index: number) => {
  playMediaIndex.value = index
  nextTick(() => {
    player.value?.play()
  })
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
@import '@/styles/mixins.scss';

.video-player {
  position: relative;
  max-width: 100%;
  width: 80vh;

  &.loading {
    min-width: 680px;
    background-color: $black;
  }
}
</style>
