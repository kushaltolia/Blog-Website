import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import {sign, verify} from 'hono/jwt';

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL : string,
    JWT_SECRET : string
  },
  Variables: {
    userId : string
  }
}>()
blogRouter.use("/*", async(c, next) => {
    const header = c.req.header("authorization") ||"";
    try {
        const user = await verify(header, c.env.JWT_SECRET);
        if(!user) {
            c.status(401);
            return c.json({ 
                error : "Unauthorized user"
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
blogRouter.post("/", async (c) => {
    const body = await c.req.json();
    const authorId = c.get("userId");
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());

    const blog = await prisma.blog.create({
        data : {
            title : body.title,
            content : body.content,
            authorId : Number(authorId)
        }
    })
    return c.json({
        id : blog.id
    })
})
blogRouter.put("/", async (c) => {
    const body = await c.req.json();
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());
    const blog = await prisma.blog.update({
        where : {
            id :body.id
        }, 
        data : {
            title : body.title,
            content : body.content
        }
    })
    return c.json({
        id : blog.id
    })
})

// add pagination
blogRouter.get("/bulk", async (c) => {
    try {
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL
        }).$extends(withAccelerate());
        const blogs = await prisma.blog.findMany({
            select : {
                content : true,
                title : true,
                id : true,
                author : {
                    select : {
                        name : true
                    }
                }
            }
        });
        return c.json({
            blogs
        })
    } catch (error) {
        c.status(411);
        return c.json({
            message : "Error while fetching blog"
        })
    }
})

blogRouter.get("/:id", async (c) => {
    try {
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL
        }).$extends(withAccelerate());
        const id = c.req.param("id");
        const blog = await prisma.blog.findFirst({
            where : {
                id : Number(id)
            }, select : {
                content : true,
                title : true,
                id : true,
                author : {
                    select : {
                        name : true
                    }
                }
            }
        })
        return c.json({
            blog
        })
    } catch (error) {
        c.status(411);
        return c.json({
            message : "Error while fetching blog"
        })
    }
})
  