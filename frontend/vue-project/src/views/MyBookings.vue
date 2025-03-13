<template>
  <div class="my-bookings">
    <div class="container">
      <h1>My Bookings</h1>
      <p class="subtitle">View and manage your reservations</p>
      
      <div v-if="error" class="error-message">
        {{ error }}
      </div>
      
      <div class="search-section">
        <div class="form-group">
          <label for="searchEmail">Enter your email to find your bookings</label>
          <div class="search-input">
            <input 
              type="email" 
              id="searchEmail" 
              v-model="searchEmail" 
              placeholder="Your email address"
              required
            >
            <button @click="searchBookings" class="btn" :disabled="isLoading">
              {{ isLoading ? 'Searching...' : 'Search' }}
            </button>
          </div>
        </div>
      </div>
      
      <div v-if="isLoading" class="loading">
        Loading bookings...
      </div>
      
      <div v-else-if="bookings.length === 0 && hasSearched" class="no-bookings">
        <p>No bookings found for this email address.</p>
      </div>
      
      <div v-else-if="bookings.length > 0" class="bookings-list">
        <div v-for="booking in bookings" :key="booking.id" class="booking-card">
          <div class="booking-header">
            <h3>Reservation for {{ booking.name }}</h3>
            <span class="booking-date">{{ formatDate(booking.date) }}</span>
          </div>
          
          <div class="booking-details">
            <div class="detail-item">
              <strong>Time:</strong> {{ booking.time }}
            </div>
            <div class="detail-item">
              <strong>Party Size:</strong> {{ booking.partySize }} {{ booking.partySize === 1 ? 'person' : 'people' }}
            </div>
            <div class="detail-item">
              <strong>Table:</strong> {{ getTableName(booking.tableId) }}
            </div>
            <div class="detail-item" v-if="booking.specialRequests">
              <strong>Special Requests:</strong> {{ booking.specialRequests }}
            </div>
          </div>
          
          <div class="booking-actions">
            <button @click="cancelBooking(booking.id)" class="btn-secondary" :disabled="isCancelling === booking.id">
              {{ isCancelling === booking.id ? 'Cancelling...' : 'Cancel Reservation' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { bookingsApi, tablesApi } from '../services/api';

export default {
  name: 'MyBookings',
  data() {
    return {
      searchEmail: '',
      bookings: [],
      tables: [],
      isLoading: false,
      isCancelling: null,
      error: null,
      hasSearched: false
    };
  },
  async created() {
    try {
      // Load tables data for reference
      this.tables = await tablesApi.getAllTables();
    } catch (error) {
      console.error('Failed to load tables:', error);
    }
  },
  methods: {
    async searchBookings() {
      if (!this.searchEmail) {
        this.error = 'Please enter your email address.';
        return;
      }
      
      try {
        this.isLoading = true;
        this.error = null;
        this.hasSearched = true;
        
        // In a real application, we would have an API endpoint to search bookings by email
        // For this demo, we'll fetch all bookings and filter on the client side
        const allBookings = await bookingsApi.getAllBookings();
        this.bookings = allBookings.filter(booking => 
          booking.email.toLowerCase() === this.searchEmail.toLowerCase()
        );
      } catch (error) {
        this.error = 'Failed to load bookings. Please try again.';
        console.error(error);
      } finally {
        this.isLoading = false;
      }
    },
    
    async cancelBooking(id) {
      if (confirm('Are you sure you want to cancel this reservation?')) {
        try {
          this.isCancelling = id;
          this.error = null;
          
          await bookingsApi.deleteBooking(id);
          
          // Remove the cancelled booking from the list
          this.bookings = this.bookings.filter(booking => booking.id !== id);
        } catch (error) {
          this.error = 'Failed to cancel booking. Please try again.';
          console.error(error);
        } finally {
          this.isCancelling = null;
        }
      }
    },
    
    formatDate(dateString) {
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    },
    
    getTableName(tableId) {
      const table = this.tables.find(t => t.id.toString() === tableId);
      return table ? table.name : 'Unknown';
    }
  }
};
</script>

<style scoped>
.my-bookings {
  padding: 2rem 0;
  width: 100%;
  display: flex;
  justify-content: center;
}

.container {
  width: 100%;
  max-width: 1000px;
  padding: 0 1rem;
}

.subtitle {
  margin-bottom: 2rem;
  color: var(--secondary-color);
}

.search-section {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  margin-bottom: 2rem;
  width: 100%;
}

.search-input {
  display: flex;
  gap: 1rem;
  flex-direction: column;
}

.loading, .no-bookings {
  text-align: center;
  padding: 2rem;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
}

.bookings-list {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  width: 100%;
}

.booking-card {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.booking-header {
  background-color: var(--dark-color);
  color: white;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}

.booking-date {
  font-size: 0.9rem;
  opacity: 0.8;
}

.booking-details {
  padding: 1rem;
  color: #333; /* Darker text for better contrast */
}

.detail-item {
  margin-bottom: 0.5rem;
}

.booking-actions {
  padding: 1rem;
  border-top: 1px solid #eee;
  text-align: right;
}

.error-message {
  background-color: #f8d7da;
  color: #721c24;
  padding: 1rem;
  border-radius: 4px;
  margin-bottom: 1.5rem;
  width: 100%;
}

/* Media queries for larger screens */
@media (min-width: 768px) {
  .search-input {
    flex-direction: row;
  }
  
  .search-input input {
    flex: 1;
    margin-bottom: 0;
  }
  
  .bookings-list {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .booking-header {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  
  .search-section {
    padding: 2rem;
  }
}

@media (min-width: 992px) {
  .my-bookings {
    padding: 3rem 0;
  }
  
  .bookings-list {
    grid-template-columns: repeat(3, 1fr);
  }
  
  .booking-card {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  
  .booking-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }
}
</style>
