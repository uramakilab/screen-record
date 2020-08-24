export default {
    state: {
        media: null,
        videoBlob: null
    },
    mutations: {
        setVideoBlob(state, payload) {
            state.videoBlob = payload;
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
        }
    },
}