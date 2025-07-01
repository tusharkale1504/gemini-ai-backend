import Fastify from 'fastify';
import cors from '@fastify/cors'; // ✅ use @fastify/cors (not fastify-cors)
import { geminiRoutes } from './routes/gemini';

const fastify = Fastify();

async function startServer() {
  await fastify.register(cors, {
    origin: true, // or set to ['http://localhost:3000'] if you want to restrict
    methods: ['GET', 'POST']
  });

  fastify.register(geminiRoutes);

  fastify.listen({ port: 3000 }, (err, address) => {
    if (err) {
      fastify.log.error(err);
      process.exit(1);
    }
    console.log(`🚀 Server running at ${address}`);
  });
}

startServer();
