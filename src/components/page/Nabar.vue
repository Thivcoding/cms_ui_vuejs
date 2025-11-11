<template>
  <nav class="bg-[#1e3a8a] sticky top-0 z-50 text-white flex justify-between items-center 2xl:px-24 md:px-12 px-4 py-5 shadow">
    <!-- Logo -->
    <div class="flex items-center space-x-3">
      <h1 class="text-2xl font-bold">HOK VANTHIV</h1>
    </div>

    <!-- Menu (Desktop) -->
    <ul class="lg:flex hidden space-x-10 items-center text-[17px] bayon-regular">
      <li v-for="cat in categories" :key="cat.id">
        <router-link
          :to="cat.path"
          :class="[ 
            'pb-1 transition-all duration-200',
            isActive(cat.path)
              ? 'border-b-4 border-yellow-400 font-bold text-yellow-300'
              : 'hover:border-b-4 hover:border-yellow-400'
          ]"
        >
          {{ cat.name }}
        </router-link>
      </li>
    </ul>

    <!-- Right: Search & Mobile -->
    <div class="flex items-center space-x-3 relative">
      <!-- Search Icon -->
      <button @click="showSearch = !showSearch" class="text-xl cursor-pointer">
        <i class="bi bi-search"></i>
      </button>

      <!-- Search Dropdown -->
      <transition name="fade">
        <div
          v-if="showSearch"
          class="absolute right-0 top-12 bg-white text-gray-800 rounded-md shadow-lg p-2 w-72 flex flex-col gap-2 z-50"
        >
          <input
            type="text"
            v-model="searchQuery"
            placeholder="ស្វែងរកអត្ថបទ..."
            class="w-full px-2 py-1 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <ul v-if="filteredArticles.length" class="max-h-48 overflow-y-auto">
            <li
              v-for="article in filteredArticles"
              :key="article.id"
              class="p-1 hover:bg-gray-100 cursor-pointer"
              @click="goArticle(article.slug)"
            >
              {{ article.title }}
            </li>
          </ul>
          <p v-else class="text-gray-500 text-sm">មិនមានលទ្ធផល...</p>
        </div>
      </transition>

      <!-- Mobile Menu Icon -->
      <button @click="toggleMenu" class="lg:hidden text-3xl focus:outline-none">
        <i v-if="!menuOpen" class="bi bi-list"></i>
        <i v-else class="bi bi-x-lg"></i>
      </button>
    </div>

    <!-- Mobile Sidebar -->
    <transition name="slide">
      <div
        v-if="menuOpen"
        class="fixed top-0 md:w-1/2 w-[75%] left-0 h-full bg-blue-900 text-white p-6 shadow-2xl z-50"
      >
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-xl font-bold flex items-center gap-2">
            <i class="bi bi-menu-button-wide"></i> HOK VANTHIV
          </h2>
          <button @click="toggleMenu" class="text-2xl focus:outline-none hover:text-yellow-300">
            <i class="bi bi-x-lg"></i>
          </button>
        </div>

        <!-- Mobile Search -->
        <div class="mb-6 relative">
          <input
            type="text"
            v-model="searchQuery"
            placeholder="ស្វែងរកអត្ថបទ..."
            class="w-full px-3 py-2 rounded-md text-white focus:outline-none border focus:ring-2 focus:ring-yellow-400"
          />
          <i class="bi bi-search absolute right-3 top-1/2 -translate-y-1/2 text-white"></i>
          <!-- Mobile autocomplete -->
          <ul v-if="filteredArticles.length" class="absolute left-0 mt-12 bg-white text-gray-800 w-full rounded-md shadow-lg max-h-48 overflow-y-auto z-50">
            <li
              v-for="article in filteredArticles"
              :key="article.id"
              class="p-2 hover:bg-gray-100 cursor-pointer"
              @click="goArticle(article.slug)"
            >
              {{ article.title }}
            </li>
          </ul>
        </div>

        <!-- Menu Items -->
        <ul class="space-y-4 bayon-regular">
          <li v-for="cat in categories" :key="cat.id">
            <router-link
              :to="cat.path"
              @click="toggleMenu"
              :class="[ 
                'block transition-all duration-200',
                isActive(cat.path)
                  ? 'text-yellow-300 font-bold border-l-4 border-yellow-400 pl-2'
                  : 'hover:text-yellow-300'
              ]"
            >
              {{ cat.name }}
            </router-link>
          </li>
        </ul>
      </div>
    </transition>

    <!-- Overlay -->
    <div v-if="menuOpen" class="fixed inset-0 bg-black/50 lg:hidden z-40" @click="toggleMenu"></div>
  </nav>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useArticleStore } from "../store/article";

const router = useRouter();
const route = useRoute();
const menuOpen = ref(false);
const showSearch = ref(false);
const searchQuery = ref("");
const articleStore = useArticleStore();

const toggleMenu = () => (menuOpen.value = !menuOpen.value);
const isActive = (path) => route.path === path;

// Categories menu
const categories = [
  { id: 1, name: "ទំព័រដើម", path: "/" },
  { id: 2, name: "អត្ថបទ", path: "/articles" },
  { id: 3, name: "សេដ្ឋកិច្ច", path: "/category/1" },
  { id: 4, name: "បច្ចេកវិទ្យា", path: "/category/2" },
  { id: 5, name: "វប្បធម៌", path: "/category/3" },
  { id: 6, name: "ច្បាប់", path: "/category/4" },
  { id: 7, name: "នយោបាយ", path: "/category/5" },
  { id: 8, name: "អំពីយើង", path: "/aboutUs" },
];

// Fetch all articles
onMounted(async () => {
  await articleStore.fetchActicle();
});

// Filter articles dynamically
const filteredArticles = computed(() => {
  if (!searchQuery.value) return [];
  const q = searchQuery.value.toLowerCase();
  return articleStore.articles.filter(
    article =>
      article.title.toLowerCase().includes(q) ||
      article.content.toLowerCase().includes(q)
  );
});

// Navigate to article detail
const goArticle = (slug) => {
  router.push(`/article/${slug}`);
  searchQuery.value = "";
  showSearch.value = false;
};
</script>

<style scoped>
/* Sidebar slide */
.slide-enter-active,
.slide-leave-active { transition: transform 0.3s ease; }
.slide-enter-from { transform: translateX(-100%); }
.slide-leave-to { transform: translateX(-100%); }

/* Fade search dropdown */
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
