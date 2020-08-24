export default{
    state:{
        media:null
    },
    mutation:{},
    getters:{
        media(state){
            return state.media
        }
    },
    actions:{
        uploadVideo({ dispatch},payload){
            payload = Object.assign(payload,{folder: 'viedos'})
            let mediaRef = dispatch('uploadbject',payload)
            .catch(() =>{
                console.error("Error to upload video")
            })
            return mediaRef
        }
    },
}