// Vercel serverless function: POST /api/chat
import { handleChat } from '../server/chat'

export const config = { runtime: 'edge' }

export default function handler(req: Request) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0].trim() || 'unknown'
  return handleChat(req, process.env, ip)
}
