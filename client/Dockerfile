# Install dependencies only when needed
FROM node:14-alpine AS deps  
WORKDIR /app/web 
COPY . .
RUN npm install 
RUN npm run build
 

#FROM node:alpine AS runner
#WORKDIR /app

#ENV NODE_ENV production

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001
 
#COPY --from=builder /app/public ./public
#COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
#COPY --from=builder /app/node_modules ./node_modules
#COPY --from=builder /app/package.json ./package.json 
USER nextjs
CMD ["npm","start"]