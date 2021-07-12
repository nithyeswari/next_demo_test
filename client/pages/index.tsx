import Head from 'next/head'
import styles from '../styles/Home.module.css' 

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Profiles</title>
        <meta name="description" content="Search profiles" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome !
        </h1> 
        
        <div className={styles.grid}>
          <a href="/profiles" className={styles.card}>
            <h2>Search profiles &rarr;</h2> 
          </a> 
        
        </div>
      </main>

      <footer className={styles.footer}>
       
      </footer>
    </div>
  )
}
