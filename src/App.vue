<template>
  <div id="app" class="container">
    <nav class="navbar navbar-expand-sm bg-light">
      <ul class="navbar-nav">
        <li class="nav-item">
          <router-link :to="{ name: 'Create' }" class="nav-link">Add Item</router-link>
        </li>
        <li class="nav-item">
          <router-link :to="{ name: 'Index' }" class="nav-link">All Items</router-link>
        </li>
      </ul>
    </nav>

      <transition name="fade" mode="out-in">
        <router-view/>
    </transition>
  </div>
</template>

<script>

export default {
}
</script>

<style>

  @import "https://cdn.jsdelivr.net/npm/animate.css@3.5.1";
   
    .fade-enter-active, .fade-leave-active {
      transition: opacity .5s
    }
    .fade-enter, .fade-leave-active {
      opacity: 0
    }
    .gap {
      margin-top: 50px;
    }
    .page {
    position: fixed;
    width: inherit;
  }


</style>
