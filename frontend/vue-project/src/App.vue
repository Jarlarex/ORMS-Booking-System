<template>
  <div class="app">
    <RestaurantHeader />
    <main class="main-content">
      <router-view />
    </main>
    <footer class="footer">
      <p>&copy; {{ new Date().getFullYear() }} Setanta Restaurant. All rights reserved.</p>
    </footer>
  </div>
</template>

<script>
import RestaurantHeader from './components/RestaurantHeader.vue';

export default {
  name: 'App',
  components: {
    RestaurantHeader
  }
}
</script>

<style>
:root {
  --primary-color: #1e6f5c;
  --secondary-color: #29335c;
  --accent-color: #f0a500;
  --text-color: #222;
  --light-color: #f8f9fa;
  --dark-color: #084c61;
  --success-color: #38b000;
  --error-color: #d62828;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  line-height: 1.6;
  color: var(--text-color);
  background-color: var(--light-color);
  width: 100%;
  overflow-x: hidden;
}

.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
}

.main-content {
  flex: 1;
  padding: 1rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.footer {
  background-color: var(--dark-color);
  color: white;
  text-align: center;
  padding: 1rem;
  margin-top: 2rem;
  width: 100%;
}

.container {
  width: 100%;
  padding: 0 1rem;
  margin: 0 auto;
  max-width: 100%;
}

.btn {
  display: inline-block;
  background-color: var(--primary-color);
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;
}

.btn:hover {
  background-color: #164b3e;
}

.btn-secondary {
  background-color: var(--secondary-color);
  color: white;
  font-weight: 600;
}

.btn-secondary:hover {
  background-color: #1e2749;
}

input, select, textarea {
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
  color: #000000;
}

@media (min-width: 768px) {
  .container {
    max-width: 720px;
    margin: 0 auto;
  }
}

@media (min-width: 992px) {
  .container {
    max-width: 960px;
    margin: 0 auto;
  }
}

@media (min-width: 1200px) {
  .container {
    max-width: 1140px;
    margin: 0 auto;
  }
}
</style>
