import type { NextApiRequest, NextApiResponse } from 'next'

import { prisma } from 'lib/prisma'

type Data = {
  success: boolean
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'DELETE') {
    const { taskId } = req.query

    await prisma.task.delete({ where: { id: String(taskId) } })

    return res.status(200).json({ success: true })
  }
}
