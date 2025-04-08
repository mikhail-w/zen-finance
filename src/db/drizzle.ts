import { neon, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { DefaultLogger } from 'drizzle-orm/logger';

// Enable WebSocket pooling for better performance in production
if (process.env.NODE_ENV === 'production') {
  neonConfig.webSocketConstructor = require('ws');
  neonConfig.fetchConnectionCache = true;
}

export function getDb() {
  // Add connection retry logic
  const sql = neon(process.env.DATABASE_URL!);
  
  // Add logging in development
  const logger = process.env.NODE_ENV === 'development' 
    ? new DefaultLogger({ 
        writer: { 
          write: (msg) => console.log(msg) 
        } 
      }) 
    : undefined;
  
  return drizzle(sql, { logger });
}

// For backward compatibility
export const db = getDb();