import Head from 'next/head'
import Register from '../components/register'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>

      <main className={styles.main}>
        <Register/>
      </main>
    </div>
  )
}
