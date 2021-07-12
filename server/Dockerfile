# Install dependencies only when needed
FROM node:14-alpine AS deps  
WORKDIR /app/worker
COPY . . 
RUN npm install    
RUN addgroup -g 1001 -S nodejs
RUN adduser -S serverjs -u 1001
USER serverjs 
CMD gunicorn --bind 0.0.0.0:$PORT wsgi
CMD ["npm","start"]