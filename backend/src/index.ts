import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import {sign, verify} from 'hono/jwt';
import { userRouter } from './routes/user';
import { blogRouter } from './routes/blog';
import { cors } from 'hono/cors';

const app = new Hono<{
  Bindings: {
    DATABASE_URL : string,
    JWT_SECRET : string
  }
}>()
app.use("/*", cors());
//the above was done to remove the typescript error we were getting ince typescript was unaware of the type of DATABASE_URL

// app.get('/', (c) => {
//   return c.text('Hello Hono!')
// })
app.get("/test", (c) => {
  return c.text("Hello potu!")
})
app.route("/api/v1/user", userRouter);
app.route("/api/v1/blog", blogRouter);
export default app
