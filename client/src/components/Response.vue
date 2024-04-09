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
    <h2>Generated Conversation</h2>
    <p>{{ response }}</p>
  </div>

  <div v-if="error">
    <p>Error: {{ error }}</p>
  </div>
</template>

<script>
import generateConversations from "../services/generateConversations.js";

export default {
  data() {
    return {
      name: "",
      skillLevel: "",
      language: "",
      interests: "",
      age: null,
      query: "",
      response: "",
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
        console.log(res)
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