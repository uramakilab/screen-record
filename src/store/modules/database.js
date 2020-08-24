import api from '@/api/index'

export default{
    actions:{
        async uploadbject(_,payload){
            try {
                var mediaRef = await  api.storage.upload(payload)
                return mediaRef
            } catch (err) {
                console.error("Error",err)
            }
        },
    }
}