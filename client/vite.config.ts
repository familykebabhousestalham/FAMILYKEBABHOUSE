// client/vite.config.ts
import { defineConfig } from 'vite'
import react       from '@vitejs/plugin-react'
import * as path   from 'path'

export default defineConfig({  
base: '/FAMILYKEBABHOUSE/',    
plugins: [react()],
resolve: {
    alias: {
      // any import starting with "@/…" maps to client/src/…
    '@': path.resolve(__dirname, 'src'),
    }
}
})
