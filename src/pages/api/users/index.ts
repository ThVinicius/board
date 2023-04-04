import type { NextApiRequest, NextApiResponse } from 'next'

import { User } from '@prisma/client'
import { prisma } from 'lib/prisma'

type Data = {
  success: boolean
  info: User
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'POST') {
    const { authId, donate, lastDonate, image } = req.body

    const doc = await prisma.user.upsert({
      create: { authId, donate, lastDonate, image },
      update: { donate, lastDonate, image },
      where: { authId }
    })

    return res.status(201).json({ success: true, info: doc })
  }
}
