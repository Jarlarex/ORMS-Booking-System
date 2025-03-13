<template>
  <header class="header">
    <div class="container header-container">
      <div class="logo">
        <h1>Setanta Restaurant</h1>
      </div>
      <nav class="nav">
        <ul class="nav-list">
          <li class="nav-item">
            <router-link to="/" class="nav-link">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/booking" class="nav-link">Book a Table</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/my-bookings" class="nav-link">My Bookings</router-link>
          </li>
        </ul>
      </nav>
      <button class="menu-toggle" @click="toggleMenu" aria-label="Toggle menu">
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
      </button>
    </div>
  </header>
</template>

<script>
export default {
  name: 'RestaurantHeader',
  data() {
    return {
      menuOpen: false
    }
  },
  methods: {
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
      const navList = document.querySelector('.nav-list');
      if (this.menuOpen) {
        navList.classList.add('show');
      } else {
        navList.classList.remove('show');
      }
    }
  }
}
</script>

<style scoped>
.header {
  background-color: var(--dark-color);
  color: white;
  padding: 1rem 0;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
}

.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo h1 {
  font-size: 1.5rem;
  margin: 0;
  color: white;
  font-weight: 700;
  letter-spacing: 0.5px;
}

.nav-list {
  display: none;
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-item {
  margin-left: 1.5rem;
}

.nav-link {
  color: white;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
}

.nav-link:hover {
  color: var(--accent-color);
}

.menu-toggle {
  display: block;
  background: none;
  border: none;
  cursor: pointer;
}

.bar {
  display: block;
  width: 25px;
  height: 3px;
  margin: 5px auto;
  background-color: white;
  transition: all 0.3s ease;
}

/* Mobile menu when active */
.nav-list.show {
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 60px;
  left: 0;
  right: 0;
  background-color: var(--dark-color);
  padding: 1rem;
  z-index: 100;
}

.nav-list.show .nav-item {
  margin: 0.5rem 0;
}

/* Media query for larger screens */
@media (min-width: 768px) {
  .header {
    padding: 1.2rem 0;
  }
  
  .logo h1 {
    font-size: 1.8rem;
  }
  
  .nav-list {
    display: flex;
  }
  
  .menu-toggle {
    display: none;
  }
  
  .nav-link {
    padding: 0.5rem 1rem;
    border-radius: 4px;
    transition: all 0.3s ease;
  }
  
  .nav-link:hover {
    background-color: rgba(255, 255, 255, 0.1);
    color: var(--accent-color);
  }
}

@media (min-width: 992px) {
  .header-container {
    max-width: 960px;
    margin: 0 auto;
  }
  
  .logo h1 {
    font-size: 2rem;
  }
  
  .nav-item {
    margin-left: 2rem;
  }
}
</style>
