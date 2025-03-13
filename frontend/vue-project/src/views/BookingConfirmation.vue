<template>
  <div class="booking-confirmation">
    <div class="container">
      <div class="confirmation-card">
        <div v-if="isLoading" class="loading">
          Loading booking details...
        </div>
        
        <div v-else-if="error" class="error-message">
          {{ error }}
          <div class="error-actions">
            <router-link to="/booking" class="btn">Try Booking Again</router-link>
          </div>
        </div>
        
        <div v-else-if="booking" class="success-content">
          <div class="success-icon">✓</div>
          <h1>Booking Confirmed!</h1>
          <p class="confirmation-message">
            Thank you, {{ booking.name }}! Your reservation has been confirmed.
          </p>
          
          <div class="booking-details">
            <h2>Reservation Details</h2>
            
            <div class="detail-row">
              <div class="detail-label">Date:</div>
              <div class="detail-value">{{ formatDate(booking.date) }}</div>
            </div>
            
            <div class="detail-row">
              <div class="detail-label">Time:</div>
              <div class="detail-value">{{ booking.time }}</div>
            </div>
            
            <div class="detail-row">
              <div class="detail-label">Party Size:</div>
              <div class="detail-value">{{ booking.partySize }} {{ booking.partySize === 1 ? 'person' : 'people' }}</div>
            </div>
            
            <div class="detail-row">
              <div class="detail-label">Table:</div>
              <div class="detail-value">{{ tableName }}</div>
            </div>
            
            <div class="detail-row" v-if="booking.specialRequests">
              <div class="detail-label">Special Requests:</div>
              <div class="detail-value">{{ booking.specialRequests }}</div>
            </div>
          </div>
          
          <div class="confirmation-info">
            <p>A confirmation email has been sent to <strong>{{ booking.email }}</strong>.</p>
            <p>Your booking reference is: <strong>{{ booking.id }}</strong></p>
          </div>
          
          <div class="confirmation-actions">
            <router-link to="/" class="btn">Return to Home</router-link>
            <router-link to="/my-bookings" class="btn btn-secondary">View My Bookings</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { bookingsApi, tablesApi } from '../services/api';

export default {
  name: 'BookingConfirmation',
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      booking: null,
      table: null,
      isLoading: true,
      error: null
    };
  },
  computed: {
    tableName() {
      return this.table ? this.table.name : 'Unknown';
    }
  },
  async created() {
    try {
      // Fetch booking details
      this.booking = await bookingsApi.getBooking(this.id);
      
      // Fetch table details
      const tables = await tablesApi.getAllTables();
      this.table = tables.find(t => t.id.toString() === this.booking.tableId);
    } catch (error) {
      this.error = 'Failed to load booking details. The booking may not exist or has been cancelled.';
      console.error(error);
    } finally {
      this.isLoading = false;
    }
  },
  methods: {
    formatDate(dateString) {
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    }
  }
};
</script>

<style scoped>
.booking-confirmation {
  padding: 2rem 0;
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--light-color);
  width: 100%;
}

.container {
  width: 100%;
  max-width: 1000px;
  padding: 0 1rem;
}

.confirmation-card {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
}

.loading, .error-message {
  text-align: center;
  padding: 2rem 0;
}

.error-message {
  color: var(--error-color);
}

.error-actions {
  margin-top: 1.5rem;
}

.success-content {
  text-align: center;
}

.success-icon {
  background-color: var(--success-color);
  color: white;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  margin: 0 auto 1.5rem;
  box-shadow: 0 4px 10px rgba(56, 176, 0, 0.3);
}

.confirmation-message {
  font-size: 1.2rem;
  margin-bottom: 2rem;
  color: var(--secondary-color);
}

.booking-details {
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  text-align: left;
  color: #333; /* Darker text for better contrast */
}

.booking-details h2 {
  margin-bottom: 1.5rem;
  color: var(--dark-color);
  text-align: center;
}

.detail-row {
  display: flex;
  margin-bottom: 0.75rem;
  flex-direction: column;
}

.detail-label {
  font-weight: bold;
  color: var(--dark-color); /* Darker color for better contrast */
}

.confirmation-info {
  margin-bottom: 2rem;
  color: #333; /* Darker text for better contrast */
}

.confirmation-info p {
  margin-bottom: 0.5rem;
}

.confirmation-actions {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
}

.btn-secondary {
  background-color: var(--secondary-color);
  color: white;
}

.btn-secondary:hover {
  background-color: #1e2749; /* Darker blue */
}

/* Media queries for larger screens */
@media (min-width: 768px) {
  .confirmation-card {
    padding: 3rem;
  }
  
  .detail-row {
    flex-direction: row;
  }
  
  .detail-label {
    width: 150px;
  }
  
  .confirmation-actions {
    flex-direction: row;
    justify-content: center;
    gap: 1.5rem;
  }
}

@media (min-width: 992px) {
  .booking-confirmation {
    padding: 4rem 0;
  }
  
  .confirmation-card {
    padding: 4rem;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  }
  
  .success-icon {
    width: 100px;
    height: 100px;
    font-size: 3rem;
    margin-bottom: 2rem;
  }
  
  .confirmation-message {
    font-size: 1.5rem;
  }
  
  .booking-details {
    margin: 2rem auto;
    max-width: 600px;
  }
}
</style>
