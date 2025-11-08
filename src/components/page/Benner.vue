<template>
  <!-- Hero Banner -->
    <section class="relative bg-gradient-to-r from-blue-700 via-purple-700 to-pink-600 h-[400px] flex items-center justify-center overflow-hidden rounded-b-3xl shadow-lg mb-12">
    <!-- Background pattern -->
   <div
        class="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        :style="{ backgroundImage: `url(${benner})` }"
    ></div>


    <!-- Floating shapes -->
    <div class="absolute top-10 left-10 w-24 h-24 bg-white/10 rounded-full blur-2xl animate-pulse"></div>
    <div class="absolute bottom-10 right-16 w-32 h-32 bg-yellow-400/20 rounded-full blur-3xl animate-ping"></div>

    <!-- Content -->
    <div class="relative text-center text-white z-10 px-6">
        <h1 class="text-4xl md:text-6xl font-extrabold mb-4 bayon-regular animate-fadeInDown">
        ស្វាគមន៍មកកាន់គេហទំព័រព័ត៌មានថ្មីៗ!
        </h1>
        <p class="text-lg bayon-regular md:text-2xl mb-6 text-white/90 animate-fadeInUp">
        សិក្សា និងទស្សនាព័ត៌មានសំខាន់ៗពីសេដ្ឋកិច្ច បច្ចេកវិទ្យា វប្បធម៌ និងច្បាប់។
        </p>
        <router-link
        to="/articles"
        class="bg-white bayon-regular text-blue-700 font-bold py-2 px-6 rounded-full shadow-lg hover:scale-105 hover:bg-gray-100 transition-all duration-300"
        >
        ចាប់ផ្តើមអានអត្ថបទ
        </router-link>
    </div>
    </section>

</template>

<script setup>
import benner from '../../assets/image/benner.jpg'

</script>

<style scoped>
@keyframes fadeInDown {
  from { opacity: 0; transform: translateY(-30px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fadeInDown {
  animation: fadeInDown 1s ease-out forwards;
}
.animate-fadeInUp {
  animation: fadeInUp 1.2s ease-out forwards;
}

</style>