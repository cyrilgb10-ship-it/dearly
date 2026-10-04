import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#faf9f7] text-[#171717]">
      {/* Navigation */}
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-7 lg:px-10">
        <Link
          href="/"
          className="text-2xl font-semibold tracking-[-0.05em]"
        >
          dearly<span className="text-[#e86b6b]">.</span>
        </Link>

        <Link
          href="/create"
          className="rounded-full border border-black/10 bg-white px-5 py-2.5 text-sm font-medium transition hover:border-black/20 hover:bg-black hover:text-white"
        >
          Créer un message
        </Link>
      </nav>

      {/* Hero */}
      <section className="mx-auto flex min-h-[calc(100vh-100px)] max-w-7xl items-center px-6 pb-24 pt-10 lg:px-10">
        <div className="grid w-full items-center gap-16 lg:grid-cols-2">
          {/* Texte */}
          <div className="max-w-2xl">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-2 text-sm text-black/55">
              <span className="h-2 w-2 rounded-full bg-[#e86b6b]" />
              Un petit message peut tout changer.
            </div>

            <h1 className="text-6xl font-semibold leading-[0.94] tracking-[-0.07em] sm:text-7xl lg:text-[92px]">
              Quelque chose
              <br />
              <span className="font-serif font-normal italic">
                juste pour eux.
              </span>
            </h1>

            <p className="mt-8 max-w-xl text-lg leading-8 text-black/50">
              Écrivez un message personnel, transformez-le en une expérience
              unique et partagez simplement le lien avec quelqu'un qui compte
              pour vous.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                href="/create"
                className="rounded-full bg-[#171717] px-7 py-4 text-sm font-medium text-white transition hover:-translate-y-0.5 hover:bg-black"
              >
                Créer mon message →
              </Link>

              <Link
                href="#how"
                className="rounded-full border border-black/10 bg-white px-7 py-4 text-sm font-medium transition hover:border-black/20"
              >
                Découvrir Dearly
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3 text-sm text-black/35">
              <span>100 % gratuit</span>
              <span>•</span>
              <span>Aucun compte nécessaire</span>
              <span>•</span>
              <span>Un simple lien</span>
            </div>
          </div>

          {/* Carte */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="absolute -left-8 top-10 h-52 w-52 rounded-full bg-[#f3d7d2] blur-3xl" />

            <div className="relative w-full max-w-[450px] rotate-[2deg] rounded-[34px] bg-white p-4 shadow-[0_35px_90px_rgba(0,0,0,0.10)]">
              <div className="rounded-[27px] bg-[#f4e9e5] px-8 py-16 text-center">
                <div className="text-4xl">♡</div>

                <p className="mt-9 text-[10px] uppercase tracking-[0.3em] text-black/35">
                  A message for you
                </p>

                <h2 className="mt-5 font-serif text-4xl italic sm:text-5xl">
                  Pour toi, maman.
                </h2>

                <p className="mx-auto mt-7 max-w-xs text-sm leading-7 text-black/55">
                  Il y a des choses qu'on ne dit pas assez souvent. Alors
                  aujourd'hui, je voulais simplement te dire merci.
                </p>

                <div className="mt-12 text-sm text-black/40">
                  Avec tout mon amour ❤️
                </div>
              </div>
            </div>

            {/* Petite carte flottante */}
            <div className="absolute -bottom-7 -left-2 hidden rounded-2xl border border-black/5 bg-white px-5 py-4 shadow-xl sm:block">
              <p className="text-xs text-black/35">Un message pour</p>
              <p className="mt-1 text-sm font-semibold">quelqu'un de spécial ✨</p>
            </div>
          </div>
        </div>
      </section>

      {/* Comment ça marche */}
      <section
        id="how"
        className="border-t border-black/5 bg-white px-6 py-24 lg:px-10"
      >
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#e86b6b]">
              Comment ça marche
            </p>

            <h2 className="mt-4 text-4xl font-semibold leading-tight tracking-[-0.05em] sm:text-5xl">
              Quelques mots.
              <br />
              Un lien.
              <br />
              Une émotion.
            </h2>
          </div>

          <div className="mt-16 grid gap-5 md:grid-cols-3">
            <Step
              number="01"
              title="Créez"
              description="Écrivez votre message, choisissez votre style et personnalisez votre petite surprise."
            />

            <Step
              number="02"
              title="Partagez"
              description="Dearly transforme votre création en un lien unique que vous pouvez envoyer à qui vous voulez."
            />

            <Step
              number="03"
              title="Surprenez"
              description="La personne ouvre le lien et découvre votre message dans une expérience pensée pour elle."
            />
          </div>
        </div>
      </section>

      {/* Types de messages */}
      <section className="bg-[#faf9f7] px-6 py-24 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#e86b6b]">
                Pour toutes les occasions
              </p>

              <h2 className="mt-4 text-4xl font-semibold tracking-[-0.05em] sm:text-5xl">
                Quand les mots
                <br />
                comptent vraiment.
              </h2>
            </div>

            <Link
              href="/create"
              className="w-fit rounded-full bg-[#171717] px-6 py-3 text-sm font-medium text-white transition hover:-translate-y-0.5"
            >
              Créer le mien →
            </Link>
          </div>

          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Occasion emoji="❤️" title="Amour" />
            <Occasion emoji="🎂" title="Anniversaire" />
            <Occasion emoji="🙏" title="Merci" />
            <Occasion emoji="🎉" title="Félicitations" />
            <Occasion emoji="🤍" title="Famille" />
            <Occasion emoji="💌" title="Juste parce que" />
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="bg-[#171717] px-6 py-28 text-white lg:px-10">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm uppercase tracking-[0.25em] text-white/40">
            Dearly
          </p>

          <h2 className="mt-6 text-5xl font-semibold tracking-[-0.06em] sm:text-6xl lg:text-7xl">
            Il y a sûrement
            <br />
            quelqu'un à qui
            <br />
            vous voulez parler.
          </h2>

          <p className="mx-auto mt-7 max-w-lg text-base leading-7 text-white/50">
            Prenez quelques secondes pour lui laisser quelque chose qu'il
            pourra garder.
          </p>

          <Link
            href="/create"
            className="mt-10 inline-flex rounded-full bg-white px-8 py-4 text-sm font-medium text-black transition hover:-translate-y-0.5 hover:bg-white/90"
          >
            Créer un message 💌
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#171717] px-6 pb-8 text-white lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-5 border-t border-white/10 pt-7 sm:flex-row sm:items-center">
          <Link
            href="/"
            className="text-xl font-semibold tracking-[-0.05em]"
          >
            dearly<span className="text-[#e86b6b]">.</span>
          </Link>

          <p className="text-sm text-white/30">
            Made for the people who matter.
          </p>
        </div>
      </footer>
    </main>
  );
}

function Step({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-[28px] border border-black/5 bg-[#faf9f7] p-8">
      <div className="text-sm text-black/25">{number}</div>

      <h3 className="mt-14 text-2xl font-semibold">{title}</h3>

      <p className="mt-4 leading-7 text-black/50">{description}</p>
    </div>
  );
}

function Occasion({
  emoji,
  title,
}: {
  emoji: string;
  title: string;
}) {
  return (
    <Link
      href="/create"
      className="group flex items-center justify-between rounded-[24px] border border-black/5 bg-white p-6 transition hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="flex items-center gap-5">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#faf9f7] text-2xl">
          {emoji}
        </div>

        <span className="font-medium">{title}</span>
      </div>

      <span className="text-black/20 transition group-hover:translate-x-1 group-hover:text-black">
        →
      </span>
    </Link>
  );
}
