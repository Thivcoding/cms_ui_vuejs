<template>
  <div class="2xl:px-24 md:px-12 py-10 px-4">
    <!-- Article detail -->
    <div v-if="loading" class="flex flex-col justify-center items-center h-64">
      <p>កំពុងបង្ហាញទិន្នន័យ...</p>
    </div>
    <div v-else>
      <h1 class="text-3xl font-bold mb-3">{{ article.title }}</h1>
      <img :src="article.thumbnail" class="w-full rounded-md h-[400px] object-cover mb-4" />
      <p class="text-xl mb-6">{{ article.content }}</p>
    </div>

    <!-- Comments section -->
    <div class="mt-8">
        <h2 class="text-2xl font-bold mb-4">Comments ({{ totalComments }})</h2>
      <!-- List comments -->
      <div v-if="comments.length">
        <div v-for="c in comments" :key="c.id" class="mb-4 p-4 border rounded-md">
          <p class="font-bold">{{ c.name }} ({{ c.email }})</p>
          <p class="text-red-500 font-bold">{{ c.body }}</p>
          <small class="text-gray-500">{{ c.created_at.split('T')[0] }}</small>
        </div>
      </div>
      <p v-else class="text-gray-400">មិនមាន comment នៅឡើយទេ</p>

      <!-- Add new comment -->
      <div class="mt-6 p-4 border rounded-md">
        <h3 class="text-xl font-semibold mb-3">Add a comment</h3>
        <form @submit.prevent="addComment" class="flex flex-col gap-3">
          <input
            v-model="name"
            type="text"
            placeholder="Your Name"
            class="border p-2 rounded-md"
            required
          />
          <input
            v-model="email"
            type="email"
            placeholder="Your Email"
            class="border p-2 rounded-md"
            required
          />
          <textarea
            v-model="commentText"
            placeholder="Your Comment"
            class="border p-2 rounded-md"
            required
          ></textarea>
          <button
            type="submit"
            class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import axios from 'axios'
import { useRoute } from 'vue-router'

const route = useRoute()
const article = ref({})
const loading = ref(true)
const comments = ref([])
const totalComments = ref(0)

// Input fields
const name = ref('')
const email = ref('')
const commentText = ref('')

// Fetch article
const fetchArticle = async () => {
  loading.value = true
  try {
    const res = await axios.get(`http://127.0.0.1:8000/api/articles/${route.params.slug}`)
    article.value = res.data.data || res.data
    fetchComments()
  } catch (err) {
    console.error(err)
  } finally {
    loading.value = false
  }
}

// Fetch comments for this article
const fetchComments = async () => {
  try {
    const res = await axios.get(`http://127.0.0.1:8000/api/comments/article/${article.value.id}`)
    comments.value = res.data.comments || res.data
    totalComments.value = res.data.total_comments
  } catch (err) {
    console.error(err)
  }
}

// Add new comment
const addComment = async () => {
  if (!commentText.value || !name.value || !email.value) return

  try {
    const res = await axios.post('http://127.0.0.1:8000/api/comments', {
      article_id: article.value.id,
      name: name.value,
      email: email.value,
      body: commentText.value,
    })
    
    totalComments.value += 1
    comments.value.push(res.data.comment)
    
    // Clear inputs
    name.value = ''
    email.value = ''
    commentText.value = ''
  } catch (err) {
    console.error(err.response?.data || err)
  }
}

onMounted(() => {
  fetchArticle()
})

// Watch route slug → reload data when it changes
watch(
  () => route.params.slug,
  (newSlug, oldSlug) => {
    if (newSlug !== oldSlug) {
      fetchArticle()
    }
  }
)
</script>
