import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // ВАЖНО: Имя должно точно совпадать с именем репозитория на GitHub
  base: '/Calculator/', 
})