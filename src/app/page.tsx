import { Form } from '@/components/Form';
import { Button } from '@/components/ui/button';
import { How } from './how';
import { Why } from './why';

export default async function Home() {
  return (
    <main>
      <header className="fixed top-0 z-50 flex w-full items-center justify-between border-b p-4 backdrop-blur">
        <h1 className="text-xl font-bold">Memory Lane</h1>
        <Button asChild>
          <a href="./wrapped">Dashboard</a>
        </Button>
      </header>

      <section className="m-auto flex h-screen max-w-(--breakpoint-xl) flex-col items-center justify-center gap-8 lg:flex-row">
        <h1 className="serif-text px-4 text-center text-5xl lg:w-2/3 lg:text-left lg:text-8xl">
          Faça uma surpresa <b>criativa</b> para o seu{' '}
          <b className="bg-zinc text-red-500">amor</b>
        </h1>

        <Form />
      </section>

      <section
        id="why"
        className="m-auto flex max-w-(--breakpoint-xl) flex-col items-center px-4 lg:h-screen"
      >
        <h1 className="serif-text mt-16 text-center text-3xl lg:text-6xl">
          Analise a sua conversa do <b className="text-green-500">WhatsApp</b> e
          <br />
          compartilhe com o seu <b className="text-red-500">amor</b>
        </h1>

        <Why />
      </section>

      <section
        id="how"
        className="relative flex w-full flex-col items-center px-4 lg:h-screen"
      >
        <h1 className="serif-text mt-10 text-center text-3xl lg:text-4xl">
          Como baixar o histórico da conversa
        </h1>

        <How />
      </section>
    </main>
  );
}
