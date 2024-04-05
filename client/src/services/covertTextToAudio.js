import axios from "axios";

const url = "localhost:3000/convertTextToAudio"

export default {
    convertTextToAudio(query){
        return axios.post(url, query)
    }
}