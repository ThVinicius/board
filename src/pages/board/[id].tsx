import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import Head from 'next/head'
import { FiCalendar } from 'react-icons/fi'

import { format } from 'date-fns'
import { prisma } from 'lib/prisma'

import styles from './task.module.scss'

type Task = {
  id: string
  created: string | Date
  createdFormated?: string
  task: string
  userId: string
  name: string
}

interface TaskListProps {
  data: string
}

export default function Task({ data }: TaskListProps) {
  const task = JSON.parse(data) as Task

  return (
    <>
      <Head>
        <title>Detalhes da sua tarefa</title>
      </Head>
      <article className={styles.container}>
        <div className={styles.actions}>
          <div>
            <FiCalendar size={30} color="#FFF" />
            <span>Tarefa criada:</span>
            <time>{task.createdFormated}</time>
          </div>
        </div>
        <p>{task.task}</p>
      </article>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({
  req,
  params
}) => {
  const id = params?.id as string
  const session = await getSession({ req })

  if (!session?.vip) {
    return {
      redirect: {
        destination: '/board',
        permanent: false
      }
    }
  }

  const data = await prisma.task
    .findUnique({ where: { id } })
    .then(task => {
      const data = {
        id: task?.id,
        created: task?.created,
        createdFormated: format(task?.created as Date, 'dd MMMM yyyy'),
        task: task?.task,
        userId: task?.userId,
        name: task?.name
      }

      return JSON.stringify(data)
    })
    .catch(() => {
      return {}
    })

  if (Object.keys(data).length === 0) {
    return {
      redirect: {
        destination: '/board',
        permanent: false
      }
    }
  }

  return {
    props: {
      data
    }
  }
}
