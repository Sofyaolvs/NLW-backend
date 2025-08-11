import { env } from './env.ts';
import { fastifyCors } from '@fastify/cors';
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod';
import { fastify } from 'fastify';
import { getRoomsRoute } from './http/routes/get-rooms.ts';
import { createRoomRoute } from './http/routes/create-rooms.ts';
import { getRoomQuestions } from './http/routes/get-room-questions.ts';
import { createQuestionRoute } from './http/routes/create-question.ts';
import { uploadAudioRoute } from './http/routes/upload-audio.ts';

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.register(fastifyCors, {
  origin: 'http://localhost:5173', // pode ajustar depois para produção
});

app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);

app.get('/health', () => {
  return 'OK';
});

app.register(getRoomsRoute);
app.register(createRoomRoute);
app.register(getRoomQuestions);
app.register(createQuestionRoute);
app.register(uploadAudioRoute);

// Usa a porta do Render ou padrão local
const port = env.PORT || 3333;
const host = process.env.RENDER ? '0.0.0.0' : 'localhost';

app.listen({ port, host })
  .then(() => {
    console.log(`🚀 Server running at http://${host}:${port}`);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
