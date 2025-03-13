<template>
  <div class="not-found">
    <div class="container">
      <div class="not-found-content">
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <p>The page you are looking for doesn't exist or has been moved.</p>
        <router-link to="/" class="btn">Return to Home</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotFound'
}
</script>

<style scoped>
.not-found {
  padding: 4rem 0;
  min-height: 70vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: var(--light-color);
}

.not-found-content {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 3rem 2rem;
  max-width: 500px;
  width: 100%;
  position: relative;
  overflow: hidden;
}

.not-found-content::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 5px;
  background: linear-gradient(to right, var(--primary-color), var(--accent-color));
}

h1 {
  font-size: 5rem;
  color: var(--primary-color);
  margin-bottom: 0.5rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
}

h2 {
  margin-bottom: 1.5rem;
  color: var(--dark-color);
}

p {
  margin-bottom: 2rem;
  color: var(--secondary-color);
}

@media (min-width: 768px) {
  .not-found {
    padding: 6rem 0;
  }
  
  .not-found-content {
    padding: 4rem 3rem;
  }
  
  h1 {
    font-size: 6rem;
  }
  
  h2 {
    font-size: 1.8rem;
  }
}
</style>
