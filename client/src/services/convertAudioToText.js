import axios from "axios";

const url = "localhost:3000/convertAudioToText"

export default {
    convertAudioToText(file){
        return axios.post(url, file)
    }
}