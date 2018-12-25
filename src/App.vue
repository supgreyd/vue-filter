<template>
  <div id="app">
    <header>
      <empty-section></empty-section>
    </header>
    <main>
      <product-section></product-section>
    </main>
    <footer>
      <empty-section></empty-section>
    </footer>
  </div>
</template>

<script>
  import emptySection from './components/emptySection'
  import productSection from './components/productSection'

export default {
  name: 'app',
  components: {
      emptySection,
      productSection
  }
}
</script>

<style>
  *{
    line-height: 1;
  }
  /*body {*/
    /*min-height: 100vh;*/
  /*}*/
  /*footer {*/
    /*position: absolute;*/
    /*bottom: 0;*/
    /*width: 100%;*/
  /*}*/
</style>
