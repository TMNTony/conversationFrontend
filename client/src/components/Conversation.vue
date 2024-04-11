<template>
  <div>
    <h2>Conversation</h2>
    <div v-html="dialogue"></div>
    <form v-if="currentQuestion < questions.length" @submit.prevent="submitResponse">
      <input type="text" v-model="userResponse">
      <button>Submit Response</button>
    </form>
    <div v-if="showModal">
      <h2>Feedback</h2>
      <div v-html="analysisResults"></div>
    </div>


  </div>

</template>

<script>
import respondToUser from "../services/respondToUser.js";
import analyzeConversation from "../services/analyzeConversation.js";

export default {

  props: {
    questions: Array
  },

  data() {
    return {
      userResponse: "",
      currentQuestion: 0,
      dialogue: this.questions.at(0).questionInEnglish,
      showModal: false,
      analysisResults: ""
    }
  },
  methods: {
    async submitResponse() {
      const nextQuestion = this.currentQuestion < this.questions.length - 1 ? this.questions[this.currentQuestion + 1] : "That was the final question"

      try {
        const response = {
          previousQuestion: this.questions[this.currentQuestion],
          userResponse: this.userResponse,
          nextQuestion: nextQuestion
        }

        const res = await respondToUser.respond(response)
        this.currentQuestion += 1

        this.dialogue += `<br>${this.userResponse}<br>${res.data.questionInEnglish}`;
        await this.getAnalysis()
        this.userResponse = ""

      } catch (err) {
        console.log(err)
      }
    },
    async getAnalysis() {
      try {
        const query = {
          dialogue: {
            questionInTargetLanguage: this.questions[this.currentQuestion].questionInTargetLanguage,
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