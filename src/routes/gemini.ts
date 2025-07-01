import { FastifyInstance } from 'fastify';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY!;
const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-2.0-flash';

export async function geminiRoutes(fastify: FastifyInstance) {
  fastify.post('/ask-gemini', async (request, reply) => {
    const { prompt } = request.body as { prompt: string };

    try {
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`,
        {
          contents: [
            {
              parts: [{ text: prompt }]
            }
          ]
        },
        {
          headers: { 'Content-Type': 'application/json' }
        }
      );

      const result = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || 'No response';
      reply.send({ response: result });

    } catch (err: any) {
      console.error('Gemini API Error:', err.response?.data || err.message);
      reply.status(500).send({ error: 'Gemini API call failed' });
    }
  });
}
