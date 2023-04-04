import { GetStaticProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'

import { User } from '@prisma/client'
import { prisma } from 'lib/prisma'

import styles from 'styles/styles.module.scss'

import boarUser from '../../public/images/board-user.svg'

interface HomeProps {
  data: string
}

export default function Home({ data }: HomeProps) {
  const [donaters] = useState<User[]>(JSON.parse(data))

  return (
    <>
      <Head>
        <title>Board - Organizando suas tarefas.</title>
      </Head>
      <main className={styles.contentContainer}>
        <Image src={boarUser} alt="Ferramenta board" />

        <section className={styles.callToAction}>
          <h1>
            Uma ferramenta para seu dia a dia Escreva, planeje e organize-se..
          </h1>
          <p>
            <span>100% Gratuita</span> e online.
          </p>
        </section>

        {donaters.length !== 0 && <h3>Apoiadores:</h3>}
        <div className={styles.donaters}>
          {donaters.map(item => (
            <Image
              width={65}
              height={65}
              key={item.image}
              src={item.image}
              alt="Usuarios"
            />
          ))}
        </div>
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const data = JSON.stringify(await prisma.user.findMany())

  return {
    props: {
      data
    },
    revalidate: 60 * 60 // Atualiza a cada 60 minutos.
  }
}
