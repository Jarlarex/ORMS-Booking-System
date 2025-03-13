<template>
  <div class="home">
    <section class="hero">
      <div class="container">
        <h1>Welcome to Setanta Restaurant</h1>
        <p>Experience the finest dining in town</p>
        <router-link to="/booking" class="btn">Book a Table</router-link>
      </div>
    </section>
    
    <section class="features">
      <div class="container">
        <h2>Why Choose Us</h2>
        <div class="feature-grid">
          <div class="feature-card">
            <div class="feature-icon">🍽️</div>
            <h3>Exquisite Cuisine</h3>
            <p>Our chefs prepare the most delicious dishes using only the freshest ingredients.</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">🥂</div>
            <h3>Perfect Atmosphere</h3>
            <p>Enjoy your meal in our elegant and comfortable dining space.</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">👨‍🍳</div>
            <h3>Expert Staff</h3>
            <p>Our professional team is dedicated to providing you with the best service.</p>
          </div>
        </div>
      </div>
    </section>
    
    <section class="cta">
      <div class="container">
        <h2>Ready to Experience Setanta?</h2>
        <p>Book your table now and enjoy an unforgettable dining experience.</p>
        <router-link to="/booking" class="btn">Reserve Now</router-link>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Home'
}
</script>

<style scoped>
.home {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.hero {
  background-color: var(--dark-color);
  color: white;
  padding: 3rem 1rem;
  text-align: center;
  margin-bottom: 2rem;
  background-image: linear-gradient(rgba(8, 76, 97, 0.8), rgba(8, 76, 97, 0.8)), url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80');
  background-size: cover;
  background-position: center;
  width: 100%;
}

.hero h1 {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.hero p {
  font-size: 1.2rem;
  margin-bottom: 2rem;
}

.features {
  padding: 2rem 1rem;
  margin-bottom: 2rem;
  width: 100%;
}

.features h2 {
  text-align: center;
  margin-bottom: 2rem;
  color: var(--dark-color);
}

.feature-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
}

.feature-card {
  background-color: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.feature-icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.feature-card h3 {
  color: var(--primary-color);
  margin-bottom: 0.5rem;
}

.feature-card p {
  color: var(--text-color);
  font-weight: 500;
}

.cta {
  background-color: var(--accent-color);
  color: white;
  padding: 3rem 1rem;
  text-align: center;
  background-image: linear-gradient(rgba(240, 165, 0, 0.9), rgba(240, 165, 0, 0.9)), url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80');
  background-size: cover;
  background-position: center;
  width: 100%;
}

.cta h2 {
  margin-bottom: 1rem;
}

.cta p {
  margin-bottom: 2rem;
}

.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

/* Media queries for larger screens */
@media (min-width: 768px) {
  .hero {
    padding: 5rem 1rem;
  }
  
  .hero h1 {
    font-size: 2.5rem;
  }
  
  .feature-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (min-width: 992px) {
  .hero {
    padding: 7rem 1rem;
  }
  
  .hero h1 {
    font-size: 3rem;
    margin-bottom: 1.5rem;
  }
  
  .hero p {
    font-size: 1.5rem;
    margin-bottom: 2.5rem;
  }
  
  .features, .cta {
    padding: 4rem 1rem;
  }
  
  .features h2, .cta h2 {
    font-size: 2.5rem;
    margin-bottom: 3rem;
  }
}
</style>
