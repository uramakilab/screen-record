export default {
    state: {
        media: null,
        videoBlob: null,
        audioBlob:null,
        listVideos: null,
        listAudios: null
    },
    mutations: {
        setVideoBlob(state, payload) {
            state.videoBlob = payload;
        },
        setAudioBlob(state, payload) {
            state.audioBlob = payload;
        },
        setlistVideos(state, payload) {
            state.listVideos = payload
        },
        setlistAudios(state, payload) {
            state.listAudios = payload
        }
    },
    getters: {
        media(state) {
            return state.media
        }
    },
    actions: {
        uploadMedia({ dispatch }, payload) {
            payload = Object.assign(payload, { extension: 'mp4' })
            let mediaRef = dispatch('uploadbject', payload)
                .catch(() => {
                    console.error("Error to upload video")
                })
            return mediaRef
        },
        getVideo({ dispatch, commit }, payload) {
            payload = Object.assign(payload, { folder: 'videos', extension: 'mp4' });

            dispatch("getObject", payload)
                .then((blob) => {
                    commit('setVideoBlob', blob);
                })
                .catch(err => {
                    console.error(err);
                })
        },
        getAudio({ dispatch, commit }, payload) {
            payload = Object.assign(payload, { folder: 'audios', extension: 'mp4' });

            dispatch("getObject", payload)
                .then((blob) => {
                    commit('setAudioBlob', blob);
                })
                .catch(err => {
                    console.error(err);
                })
        },
        getListMedia({ dispatch, commit }, payload) {
            dispatch("getList", payload)
                .then((list) => {
                    commit(payload.list, list);
                })
                .catch(err => {
                    console.error(err);
                })
        }
    },
}