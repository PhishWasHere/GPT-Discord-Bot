import { getServerSession } from 'next-auth';
import { options } from '../api/auth/[...nextauth]/options'

export default async function Test() {
  const session = await getServerSession(options);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {session? (
        <>hi</>
      ) : (
        <>bye</>
      )}
    </main>
  )
}
