import Head from 'next/head';
import Link from 'next/link';

import styles from './styles.module.scss';

export default function About() {
  return (
    <>
      <Head>
        <title>About Smoove</title>
        <meta
          name='description'
          content={`Smoove's About page highlights their innovative approach as a fully online Bay Area moving company. They emphasize their commitment to convenience, efficiency, and exceptional service. Learn more about their team, mission, and services as you explore their website.`}
        />
      </Head>

      <main className={styles.main}>
        <h2>About</h2>
        <Link href='/'>Home</Link>
      </main>
    </>
  );
}
