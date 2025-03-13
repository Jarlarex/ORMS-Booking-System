<template>
  <div class="booking-form">
    <div class="container">
      <h1>Book a Table</h1>
      <p class="subtitle">Reserve your table at Setanta Restaurant</p>
      
      <div v-if="error" class="error-message">
        {{ error }}
      </div>
      
      <form @submit.prevent="submitForm" class="form">
        <div class="form-section">
          <h2>Reservation Details</h2>
          
          <div class="form-group">
            <label for="date">Date</label>
            <input 
              type="date" 
              id="date" 
              v-model="booking.date" 
              required
              :min="minDate"
            >
          </div>
          
          <div class="form-group">
            <label for="time">Time</label>
            <select id="time" v-model="booking.time" required @change="checkAvailability">
              <option value="">Select a time</option>
              <option v-for="time in availableTimes" :key="time" :value="time">
                {{ time }}
              </option>
            </select>
          </div>
          
          <div class="form-group">
            <label for="partySize">Number of Guests</label>
            <select id="partySize" v-model="booking.partySize" required @change="checkAvailability">
              <option value="">Select number of guests</option>
              <option v-for="size in partySizes" :key="size" :value="size">
                {{ size }} {{ size === 1 ? 'person' : 'people' }}
              </option>
            </select>
          </div>
        </div>
        
        <div class="form-section" v-if="availableTables.length > 0">
          <h2>Available Tables</h2>
          <p class="help-text">Select a table for your reservation</p>
          
          <div class="tables-grid">
            <div 
              v-for="table in availableTables" 
              :key="table.id"
              class="table-card"
              :class="{ 'selected': booking.tableId === table.id.toString() }"
              @click="selectTable(table)"
            >
              <h3>{{ table.name }}</h3>
              <p>Capacity: {{ table.capacity }} people</p>
              <p>Location: {{ table.location }}</p>
            </div>
          </div>
        </div>
        
        <div class="form-section">
          <h2>Your Information</h2>
          
          <div class="form-columns">
            <div class="form-column">
              <div class="form-group">
                <label for="name">Full Name</label>
                <input type="text" id="name" v-model="booking.name" required>
              </div>
              
              <div class="form-group">
                <label for="email">Email</label>
                <input type="email" id="email" v-model="booking.email" required>
              </div>
            </div>
            
            <div class="form-column">
              <div class="form-group">
                <label for="phone">Phone Number</label>
                <input type="tel" id="phone" v-model="booking.phone">
              </div>
              
              <div class="form-group">
                <label for="specialRequests">Special Requests</label>
                <textarea id="specialRequests" v-model="booking.specialRequests" rows="3"></textarea>
              </div>
            </div>
          </div>
        </div>
        
        <div class="form-actions">
          <button type="submit" class="btn" :disabled="isSubmitting || !isFormValid">
            {{ isSubmitting ? 'Booking...' : 'Book Now' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { availabilityApi, bookingsApi } from '../services/api';

export default {
  name: 'BookingForm',
  data() {
    return {
      booking: {
        date: '',
        time: '',
        partySize: '',
        tableId: '',
        name: '',
        email: '',
        phone: '',
        specialRequests: ''
      },
      availableTables: [],
      isSubmitting: false,
      error: null,
      availableTimes: [
        '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
        '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00'
      ],
      partySizes: [1, 2, 3, 4, 5, 6, 7, 8]
    };
  },
  computed: {
    minDate() {
      const today = new Date();
      return today.toISOString().split('T')[0];
    },
    isFormValid() {
      return (
        this.booking.date &&
        this.booking.time &&
        this.booking.partySize &&
        this.booking.tableId &&
        this.booking.name &&
        this.booking.email
      );
    }
  },
  methods: {
    async checkAvailability() {
      if (!this.booking.date || !this.booking.time || !this.booking.partySize) {
        return;
      }
      
      try {
        this.error = null;
        const response = await availabilityApi.checkAvailability(
          this.booking.date,
          this.booking.time,
          this.booking.partySize
        );
        
        this.availableTables = response.availableTables;
        
        // Reset table selection if previously selected table is no longer available
        if (this.booking.tableId && !this.availableTables.some(table => table.id.toString() === this.booking.tableId)) {
          this.booking.tableId = '';
        }
        
        if (this.availableTables.length === 0) {
          this.error = 'No tables available for the selected date, time, and party size.';
        }
      } catch (error) {
        this.error = 'Failed to check availability. Please try again.';
        console.error(error);
      }
    },
    
    selectTable(table) {
      this.booking.tableId = table.id.toString();
    },
    
    async submitForm() {
      if (!this.isFormValid) {
        this.error = 'Please fill in all required fields.';
        return;
      }
      
      try {
        this.isSubmitting = true;
        this.error = null;
        
        const response = await bookingsApi.createBooking(this.booking);
        
        // Navigate to confirmation page
        this.$router.push({
          name: 'BookingConfirmation',
          params: { id: response.id }
        });
      } catch (error) {
        this.error = error.message || 'Failed to create booking. Please try again.';
        console.error(error);
      } finally {
        this.isSubmitting = false;
      }
    }
  },
  watch: {
    'booking.date'() {
      this.checkAvailability();
    }
  }
};
</script>

<style scoped>
.booking-form {
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
  color: var(--primary-color);
  font-weight: 600;
  font-size: 1.2rem;
}

.form {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  width: 100%;
}

.form-section {
  padding: 1.5rem;
  border-bottom: 1px solid #eee;
}

.form-section h2 {
  margin-bottom: 1.5rem;
  color: var(--dark-color);
  font-size: 1.5rem;
}

.help-text {
  margin-bottom: 1rem;
  color: var(--text-color);
  font-weight: 500;
}

.tables-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

.table-card {
  border: 2px solid #eee;
  border-radius: 8px;
  padding: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.table-card:hover {
  border-color: var(--primary-color);
}

.table-card.selected {
  border-color: var(--primary-color);
  background-color: rgba(30, 111, 92, 0.05);
}

.table-card h3 {
  margin-bottom: 0.5rem;
  color: var(--dark-color);
}

.table-card p {
  color: #000000;
  font-weight: 500;
}

.form-actions {
  padding: 1.5rem;
  text-align: center;
}

.error-message {
  background-color: #f8d7da;
  color: #721c24;
  padding: 1rem;
  border-radius: 4px;
  margin-bottom: 1.5rem;
}

.form-columns {
  display: flex;
  flex-direction: column;
}

.form-column {
  width: 100%;
}

@media (min-width: 768px) {
  .tables-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .form-section {
    padding: 2rem;
  }
  
  .form-columns {
    flex-direction: row;
    gap: 2rem;
  }
  
  .form-column {
    flex: 1;
  }
}

@media (min-width: 992px) {
  .booking-form {
    padding: 3rem 0;
  }
  
  .tables-grid {
    grid-template-columns: repeat(3, 1fr);
  }
  
  .form-section {
    padding: 2.5rem;
  }
  
  .form-section h2 {
    font-size: 1.8rem;
  }
}
</style>
