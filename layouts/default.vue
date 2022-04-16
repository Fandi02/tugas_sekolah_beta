<template>
  <div id="app">
    <Header />

    <Nuxt />

    <Footer />
  </div>
</template>

<script>
//memanggil component sesuai lokasi masing - masing file
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";

export default {
  // Dideklarasiakn agar dapat diakses oleh template
  components: {
    Header,
    Footer,
  },
};
</script>
<style></style>
