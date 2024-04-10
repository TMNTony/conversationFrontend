<template>
  <div>
    <div>{{ this.dialogue }}</div>
    <form v-if="currentQuestion < 9" @submit.prevent="submitResponse">
      <label>{{this.questions.at(this.currentQuestion).questionInEnglish}}</label>
      <input type="text" v-model="this.userResponse">
      <button>Submit Response</button>
    </form>
    <button v-if="currentQuestion > 8" @click="getAnalysis">Get Analysis</button>
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
      dialogue: this.questions.at(this.currentQuestion).questionInEnglish
    }
  },
  methods: {
    async submitResponse() {

      try {
        const response = {
          previousQuestion: this.questions.at(this.currentQuestion),
          userResponse: this.userResponse,
          nextQuestion: this.questions.at(this.currentQuestion + 1)
        }

        const res = await respondToUser.respond(response)
        this.currentQuestion += 1
        this.dialogue = this.dialogue + res.data.questionInEnglish
        this.userResponse = ""

      } catch (err) {
        console.log(err)
      }
    },
    async getAnalysis() {
      try {
        const res = await analyzeConversation.analyzeResponse(this.dialogue)
        console.log(res)
      } catch (err) {
        console.log(err)
      }

    }
  }
}

</script>

<style scoped>

</style>