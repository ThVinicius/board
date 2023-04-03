import type { NextApiRequest, NextApiResponse } from 'next'

import { Task } from '@prisma/client'
import { prisma } from 'lib/prisma'

type Data = {
  success: boolean
  info?: Task
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'POST') {
    const { created, task, userId, name } = req.body

    const doc = await prisma.task.create({
      data: { created, task, userId, name }
    })

    return res.status(201).json({ success: true, info: doc })
  }

  if (req.method === 'PATCH') {
    const { taskId, task } = req.body

    await prisma.task.update({
      where: { id: taskId },
      data: { task }
    })

    return res.status(200).json({ success: true })
  }
}
