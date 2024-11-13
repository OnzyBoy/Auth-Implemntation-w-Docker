# Build stage
FROM node:18-alpine as build

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy project files
COPY . .

# Set your Supabase credentials directly in the build
ENV REACT_APP_SUPABASE_URL=https://dhkozwizddpbuwheeqar.supabase.co
ENV REACT_APP_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRoa296d2l6ZGRwYnV3aGVlcWFyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE1MDI0NzEsImV4cCI6MjA0NzA3ODQ3MX0.DrDtFvcVcbSqIAhGSp9iCqHw9tnvqzaHTRJVgQugULo

# Create production build
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy built assets from build stage
COPY --from=build /app/build /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]