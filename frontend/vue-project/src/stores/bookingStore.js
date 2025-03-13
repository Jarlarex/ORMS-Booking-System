import { defineStore } from 'pinia';
import api from '../services/api';

export const useBookingStore = defineStore('booking', {
  state: () => ({
    availableTables: [],
    bookings: [],
    currentBooking: null,
    loading: false,
    error: null,
  }),
  
  getters: {
    hasAvailableTables: (state) => state.availableTables.length > 0,
    getBookingById: (state) => (id) => {
      return state.bookings.find(booking => booking.id === id);
    }
  },
  
  actions: {
    // Check availability for a specific date, time, and party size
    async checkAvailability(date, time, partySize) {
      this.loading = true;
      this.error = null;
      
      try {
        const response = await api.availability.checkAvailability(date, time, partySize);
        this.availableTables = response.availableTables;
        return this.availableTables;
      } catch (error) {
        console.error('Failed to check availability:', error);
        this.error = error.message;
        throw error;
      } finally {
        this.loading = false;
      }
    },
    
    // Create a new booking
    async createBooking(bookingData) {
      this.loading = true;
      this.error = null;
      
      try {
        const response = await api.bookings.createBooking(bookingData);
        this.currentBooking = response;
        
        // Add to bookings list if we have it loaded
        if (this.bookings.length > 0) {
          this.bookings.push(response);
        }
        
        return response;
      } catch (error) {
        console.error('Failed to create booking:', error);
        this.error = error.message;
        throw error;
      } finally {
        this.loading = false;
      }
    },
    
    // Get all bookings
    async fetchBookings() {
      this.loading = true;
      this.error = null;
      
      try {
        const response = await api.bookings.getAllBookings();
        this.bookings = response;
        return response;
      } catch (error) {
        console.error('Failed to fetch bookings:', error);
        this.error = error.message;
        throw error;
      } finally {
        this.loading = false;
      }
    },
    
    // Get a specific booking
    async fetchBooking(id) {
      this.loading = true;
      this.error = null;
      
      try {
        const response = await api.bookings.getBooking(id);
        this.currentBooking = response;
        return response;
      } catch (error) {
        console.error(`Failed to fetch booking ${id}:`, error);
        this.error = error.message;
        throw error;
      } finally {
        this.loading = false;
      }
    },
    
    // Update a booking
    async updateBooking(id, bookingData) {
      this.loading = true;
      this.error = null;
      
      try {
        const response = await api.bookings.updateBooking(id, bookingData);
        this.currentBooking = response;
        
        // Update in bookings list if we have it loaded
        if (this.bookings.length > 0) {
          const index = this.bookings.findIndex(b => b.id === id);
          if (index !== -1) {
            this.bookings[index] = response;
          }
        }
        
        return response;
      } catch (error) {
        console.error(`Failed to update booking ${id}:`, error);
        this.error = error.message;
        throw error;
      } finally {
        this.loading = false;
      }
    },
    
    // Cancel a booking
    async cancelBooking(id) {
      this.loading = true;
      this.error = null;
      
      try {
        await api.bookings.deleteBooking(id);
        
        // Remove from bookings list if we have it loaded
        if (this.bookings.length > 0) {
          this.bookings = this.bookings.filter(b => b.id !== id);
        }
        
        // Clear current booking if it's the one we just cancelled
        if (this.currentBooking && this.currentBooking.id === id) {
          this.currentBooking = null;
        }
        
        return true;
      } catch (error) {
        console.error(`Failed to cancel booking ${id}:`, error);
        this.error = error.message;
        throw error;
      } finally {
        this.loading = false;
      }
    },
    
    // Get all tables
    async fetchTables() {
      this.loading = true;
      this.error = null;
      
      try {
        const response = await api.tables.getAllTables();
        return response;
      } catch (error) {
        console.error('Failed to fetch tables:', error);
        this.error = error.message;
        throw error;
      } finally {
        this.loading = false;
      }
    },
    
    // Reset the store state
    resetState() {
      this.availableTables = [];
      this.currentBooking = null;
      this.error = null;
    }
  }
});
