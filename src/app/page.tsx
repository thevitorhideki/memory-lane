import { Form } from '@/components/Form';
import { How } from './how';
import { Why } from './why';

export default async function Home() {
  return (
    <main>
      <section className="flex max-w-screen-xl m-auto h-screen justify-center items-center">
        <h1 className="text-8xl font-serif w-2/3">
          Faça uma
          <br />
          surpresa <b>criativa</b>
          <br />
          para o seu <b className="text-red-500 bg-zinc">amor</b>
        </h1>

        <Form />
      </section>

      <section
        id="why"
        className="flex max-w-screen-xl m-auto h-screen items-center flex-col"
      >
        <h1 className="text-6xl text-center font-serif mt-16">
          Analise a sua conversa do <b className="text-green-500">WhatsApp</b> e
          <br />
          compartilhe com o seu <b className="text-red-500">amor</b>
        </h1>

        <Why />
      </section>

      <How />
    </main>
  );
}
