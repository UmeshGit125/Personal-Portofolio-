import { defineConfig, loadEnv, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import { Readable } from 'node:stream'
import type { ReadableStream as NodeReadableStream } from 'node:stream/web'

// Serves /api/chat during `npm run dev`, using the same handler as the Vercel function
function chatApi(env: Record<string, string>): Plugin {
  return {
    name: 'chat-api',
    configureServer(server) {
      server.middlewares.use('/api/chat', async (req, res) => {
        const { handleChat } = await server.ssrLoadModule('/server/chat.ts')
        const chunks: Buffer[] = []
        for await (const chunk of req) chunks.push(chunk as Buffer)
        const request = new Request('http://localhost/api/chat', {
          method: req.method,
          headers: { 'Content-Type': 'application/json' },
          body: req.method === 'POST' ? Buffer.concat(chunks) : undefined,
        })
        const response: Response = await handleChat(request, env, req.socket.remoteAddress)
        res.statusCode = response.status
        response.headers.forEach((value, key) => res.setHeader(key, value))
        if (response.body) Readable.fromWeb(response.body as NodeReadableStream).pipe(res)
        else res.end()
      })
    },
  }
}

export default defineConfig(({ mode }) => ({
  plugins: [react(), chatApi(loadEnv(mode, process.cwd(), ''))],
}))
