import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import {sign, verify} from 'hono/jwt';

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL : string,
    JWT_SECRET : string
  },
  Variables: {
    userId : string
  }
}>()

userRouter.use("/profile/*", async(c, next) => {
  const header = c.req.header("authorization") ||"";
  try {
    const user = await verify(header, c.env.JWT_SECRET);
    if(!user) {
      c.status(401);
      return c.json({
        error : "user doest not exist"
      });
    } else {
      c.set("userId", user.id);
      await next();
    }
  } catch (error) {
    c.status(401);
    return c.json({ 
        error : "Unauthorized user"
    });
  }
})
userRouter.post("/signup", async (c) => {
    try {
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL, 
          }).$extends(withAccelerate())
        
          const body = await c.req.json();
          const user = await prisma.user.create({
            data : {
              username : body.username,
              password : body.password,
              name : body.name,
            }
          })
          const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
          return c.json({ jwt, userData : { username : user.username, name : user.name}});
    } catch (error) {
        c.status(411);
        return c.text("Erorr while signing up");
    }
})
userRouter.post('/signin', async (c) => {
      try {
        const prisma = new PrismaClient({
            datasourceUrl: c.env?.DATABASE_URL	,
        }).$extends(withAccelerate());
    
        const body = await c.req.json();
        const user = await prisma.user.findUnique({
            where: {
                username: body.username,
                password : body.password
            }
        });
    
        if (!user) {
            c.status(403);
            return c.json({ error: "user not found" });
        } 
    
        const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
        return c.json({ jwt, userData : { username : user.username, name : user.name}});
      } catch (error) {
        return c.text("Error while signing in");
      }
  })

userRouter.post("/profile/:item/:id", async (c) => {
  try {
    const prisma = new PrismaClient({datasourceUrl: c.env?.DATABASE_URL}).$extends(withAccelerate());
    let id = c.req.param("id");
    let item = c.req.param("item");
    let userId = c.get("userId");
    console.log("userId", userId);
    console.log("id", id);
    if(userId.toString() === id.toString()) {
      console.log("inside");
      const body = await c.req.json();
      if(item === "password") {
        const oldPassword = body.oldPassword;
        const user = await prisma.user.findUnique({
          where : {
            id : Number(id)
          }
        })
        // @ts-ignore
        console.log("user password is : ", user.password);
        //@ts-ignore
        if(user.password !== oldPassword) {
          c.status(400);
          return c.json({ error : "Old password is incorrect" });
        }
        if(body.newPassword === "" || body.newPassword === null || body.newPassword === undefined) {
          c.status(400);
          return c.json({ error : "Password cannot be empty" });
        }
        //@ts-ignore
        await prisma.user.update({
          where : {
            id : Number(id)
          },
          data : {
            password : body.newPassword
          }
        
        })
        c.status(200)
        return c.json({ message : "Password updated Successfully" });
      } else if(item === "name") {
        if(body.name === "" || body.name === null || body.name === undefined) {
          c.status(400);
          return c.json({ error : "Name cannot be empty" });
        }
        const user = await prisma.user.update({
          where : {
            id : Number(id)
          },
          data : {
            name : body.name
          }
        })
        c.status(200)
        return c.json({ message : "Name updated Successfully" });
      } else {
        c.status(400);
        return c.json({ error : "Invalid item" });
      }
    } else {
      c.status(401);
      return c.json({ error : "You cant change someone else's profile"});
    }
  } catch (error) {
    c.status(500);
    console.log("error", error)
    return c.json({ error : "Internal Server Error"});
  }
})