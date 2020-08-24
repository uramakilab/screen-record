import api from '@/api/index'

export default {
    actions: {
        async uploadbject(_, payload) {
            try {
                var mediaRef = await api.storage.upload(payload)
                return mediaRef
            } catch (err) {
                console.error("Error", err)
            }
        },
        async getObject(_, payload) {
            try {
                var url = await api.storage.getObject(payload);
                return url;
            } catch (err) {
                console.error(err);
            }
        }
    }
}