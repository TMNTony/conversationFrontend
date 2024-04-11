<template>
  <div>
    <h2>Conversation</h2>
    <div v-html="dialogue"></div>
    <Audio :question="currentQuestion" />
    <form v-if="currentQuestionIndex < questions.length" @submit.prevent="submitResponse">
      <input type="text" v-model="userResponse">
      <button>Submit Response</button>
    </form>
    <div>or</div>
    <SendFile @updateResponse="userResponse = $event"/>
    <div v-if="showModal">
      <h2>Feedback</h2>
      <div v-html="analysisResults"></div>
    </div>


  </div>

</template>

<script>
import respondToUser from "../services/respondToUser.js";
import analyzeConversation from "../services/analyzeConversation.js";
import SendFile from "./SendFile.vue";
import Audio from "./Audio.vue"

export default {

  props: {
    questions: Array
  },
  components : {
    SendFile,
    Audio
  },

  data() {
    return {
      userResponse: "",
      currentQuestionIndex: 0,
      currentQuestion: this.questions.at(this.currentQuestionIndex).questionInEnglish,
      dialogue: this.questions.at(0).questionInEnglish,
      analysisResults: "",
      showModal: false
    }
  },
  methods: {
    async submitResponse() {
      const nextQuestion = this.currentQuestionIndex < this.questions.length - 1 ? this.questions[this.currentQuestionIndex + 1] : "That was the final question"

      try {
        const response = {
          previousQuestion: this.questions[this.currentQuestionIndex],
          userResponse: this.userResponse,
          nextQuestion: nextQuestion
        }

        const res = await respondToUser.respond(response)


        this.dialogue += `<br>${this.userResponse}<br>${res.data.questionInEnglish}`;
        this.currentQuestion = res.data.questionInEnglish
        await this.getAnalysis()
        this.userResponse = ""
        this.currentQuestionIndex += 1

      } catch (err) {
        console.log(err)
      }
    },
    async getAnalysis() {
      try {
        const query = {
          dialogue: {
            questionInTargetLanguage: this.questions[this.currentQuestionIndex].questionInTargetLanguage,
            userResponse: this.userResponse
          }
        }
        const res = await analyzeConversation.analyzeResponse(query)
        this.analysisResults = res.data.analysis.replace(/\n/g, '<br>')
        this.showModal = true

      } catch (err) {
        console.log(err)
      }

    }
  }
}

</script>

<style scoped>

</style>