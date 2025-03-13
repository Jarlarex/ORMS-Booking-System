# Multi-stage build for restaurant-booking system

# Stage 1: Build the frontend
FROM node:18-alpine AS frontend-builder
WORKDIR /app/frontend
COPY frontend/vue-project/package*.json ./
RUN npm install
COPY frontend/vue-project/ ./
RUN npm run build

# Stage 2: Build the backend
FROM node:18-alpine AS backend-builder
WORKDIR /app/backend
COPY backend/package*.json ./
RUN npm install
COPY backend/ ./
RUN npm run build

# Stage 3: Production image
FROM node:18-alpine
WORKDIR /app

# Copy backend
COPY --from=backend-builder /app/backend /app/backend
# Copy frontend build
COPY --from=frontend-builder /app/frontend/dist /app/frontend/dist

# Install production dependencies only
WORKDIR /app/backend
RUN npm install --production

# Copy start script
COPY start-docker.js /app/

# Expose ports
EXPOSE 3000 5173

# Set environment variables
ENV NODE_ENV=production

# Start the application
CMD ["node", "/app/start-docker.js"]
