FROM node:20-alpine

WORKDIR /em-api

# Copy application files
COPY ./dist .

# Enable yarn and install deps
RUN corepack enable
RUN NODE_ENV=production yarn install

# Start the app
CMD ["api/src/main"]
