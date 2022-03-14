import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react/cjs/react.development';
export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push("/admin/dashboard");

  }, []);


  return (
    <div>
      <Head>
        <title>Movie</title>
        <meta name="description" content="Movie by Brendyn" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

    </div>
  );
}
