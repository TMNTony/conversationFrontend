<template>
  <form @submit.prevent="submitQuery">
    <label for="name">Name</label>
    <input type="text" id="name" v-model="name" required>

    <label for="skillLevel">Skill Level</label>
    <input type="text" id="skillLevel" v-model="skillLevel" required>

    <label for="language">Language</label>
    <input type="text" id="language" v-model="language" required>

    <label for="interests">Interests</label>
    <input type="text" id="interests" v-model="interests" required>

    <label for="age">Age</label>
    <input type="number" id="age" v-model.number="age" required>

    <button type="submit">Generate Conversation</button>
  </form>
  <div v-if="response">
    <h2>Instructions</h2>
    <p>{{ response }}</p>
  </div>
  <Conversation v-if="questions.length > 0" :questions="questions"/>

  <div v-if="error">
    <p>Error: {{ error }}</p>
  </div>
</template>

<script>
import generateConversations from "../services/generateConversations.js";
import Conversation from "./Conversation.vue";

export default {
  components: {
    Conversation
  },
  data() {
    return {
      name: "",
      skillLevel: "",
      language: "",
      interests: "",
      age: null,
      response: "",
      questions: [],
      error: null
    }
  },
  methods: {
    async submitQuery() {
      const query = {
        name: this.name,
        skillLevel: this.skillLevel,
        language: this.language,
        interests: this.interests,
        age: this.age
      };

      try {
        const res = await generateConversations.generateConversation(query);
        this.response = res.data.summary;
        this.questions = res.data.questions;

      } catch (error) {
        console.error("Error generating conversation", error);
        this.error = "An error occurred while generating conversation.";
      }
    }
  }
}

</script>

<style scoped>

</style>