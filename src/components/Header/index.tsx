import Image from 'next/image'
import Link from 'next/link'

import logo from '../../../public/images/logo.svg'
import { SignInButton } from '../SignInButton'
import styles from './styles.module.scss'

export function Header() {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <Link href="/">
          <span>
            <Image src={logo} alt="Logo Meu board" />
          </span>
        </Link>
        <nav>
          <Link href="/">
            <span>Home</span>
          </Link>
          <Link href="/board">
            <span>Meu board</span>
          </Link>
        </nav>

        <SignInButton />
      </div>
    </header>
  )
}
