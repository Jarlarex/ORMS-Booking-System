// API base URL - adjust this based on your backend URL
const API_BASE_URL = 'http://localhost:3000/api';

/**
 * Generic fetch function with error handling
 */
async function fetchApi(endpoint, options = {}) {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
}

/**
 * Tables API
 */
export const tablesApi = {
  // Get all tables
  getAllTables() {
    return fetchApi('/tables');
  },
};

/**
 * Bookings API
 */
export const bookingsApi = {
  // Get all bookings
  getAllBookings() {
    return fetchApi('/bookings');
  },

  // Get a specific booking
  getBooking(id) {
    return fetchApi(`/bookings/${id}`);
  },

  // Create a new booking
  createBooking(bookingData) {
    return fetchApi('/bookings', {
      method: 'POST',
      body: JSON.stringify(bookingData),
    });
  },

  // Update a booking
  updateBooking(id, bookingData) {
    return fetchApi(`/bookings/${id}`, {
      method: 'PUT',
      body: JSON.stringify(bookingData),
    });
  },

  // Delete a booking
  deleteBooking(id) {
    return fetchApi(`/bookings/${id}`, {
      method: 'DELETE',
    });
  },
};

/**
 * Availability API
 */
export const availabilityApi = {
  // Check availability for a specific date, time, and party size
  checkAvailability(date, time, partySize) {
    const params = new URLSearchParams();
    params.append('date', date);
    params.append('time', time);
    if (partySize) {
      params.append('partySize', partySize);
    }
    
    return fetchApi(`/availability?${params.toString()}`);
  },
};

export default {
  tables: tablesApi,
  bookings: bookingsApi,
  availability: availabilityApi,
};
