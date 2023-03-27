import { prisma } from "../../prisma"
import asyncHandler from "express-async-handler"



export const createPost = asyncHandler(async (req, res, next) => {
    const { slug, title, body, authorId } = req.body
    const post = await prisma.post.create({
        data: {
            slug, title, body, author: {
                connect: { id: authorId }
            }
        }
    })

    res.json(post)
})


export const updatePost = asyncHandler(async (req, res, next) => {
    const { id } = req.params
    const { title, body } = req.body

    const result = await prisma.post.update({ where: { id: id }, data: { title: title, body: body } })

    res.json(result)
    
})