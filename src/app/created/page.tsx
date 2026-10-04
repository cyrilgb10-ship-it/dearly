"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function CreatedPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [messageUrl, setMessageUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [sharing, setSharing] = useState(false);

  useEffect(() => {
    if (!id) return;

    setMessageUrl(`${window.location.origin}/m/${id}`);
  }, [id]);

  const copyLink = async () => {
    if (!messageUrl) return;

    try {
      await navigator.clipboard.writeText(messageUrl);
    } catch {
      const textarea = document.createElement("textarea");

      textarea.value = messageUrl;
      textarea.style.position = "fixed";
      textarea.style.left = "-9999px";

      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();

      document.execCommand("copy");
      textarea.remove();
    }

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2500);
  };

  const shareWhatsApp = () => {
    if (!messageUrl) return;

    const text = encodeURIComponent(
      `💌 Tu as reçu un message sur dearly.\n\nOuvre-le ici : ${messageUrl}`
    );

    window.open(
      `https://wa.me/?text=${text}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const shareMessage = async () => {
    if (!messageUrl) return;

    if (!navigator.share) {
      await copyLink();
      return;
    }

    try {
      setSharing(true);

      await navigator.share({
        title: "Un message pour toi 💌",
        text: "Tu as reçu un message sur dearly.",
        url: messageUrl,
      });
    } catch {
      // Partage annulé par l'utilisateur.
    } finally {
      setSharing(false);
    }
  };

  if (!id) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#faf9f7] px-6 text-[#171717]">
        <div className="text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-black/5">
            <span className="text-3xl">💌</span>
          </div>

          <h1 className="mt-7 font-serif text-4xl italic">
            Aucun message trouvé
          </h1>

          <p className="mt-4 text-sm text-black/45">
            Le lien de création semble invalide.
          </p>

          <Link
            href="/create"
            className="mt-8 inline-flex rounded-full bg-[#171717] px-7 py-3.5 text-sm font-medium text-white transition-all hover:-translate-y-0.5"
          >
            Créer un message
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#faf9f7] text-[#171717]">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[450px] w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#e86b6b]/10 blur-[130px]" />

      <div className="pointer-events-none absolute left-[10%] top-[20%] text-5xl opacity-10">
        ♡
      </div>

      <div className="pointer-events-none absolute bottom-[20%] right-[10%] text-5xl opacity-10">
        ✦
      </div>

      <div className="relative z-10 flex min-h-screen items-center justify-center px-6 py-16">
        <div className="w-full max-w-xl text-center">
          <Link
            href="/"
            className="text-lg font-semibold tracking-[-0.03em]"
          >
            dearly<span className="text-[#e86b6b]">.</span>
          </Link>

          <div className="mx-auto mt-14 flex h-24 w-24 animate-[pop_0.8s_ease-out] items-center justify-center rounded-full border border-black/10 bg-white shadow-sm">
            <span className="text-4xl">💌</span>
          </div>

          <p className="mt-10 text-xs font-medium uppercase tracking-[0.3em] text-black/35">
            C&apos;est prêt
          </p>

          <h1 className="mt-5 font-serif text-5xl italic tracking-[-0.05em] sm:text-6xl">
            Votre message
            <br />
            est prêt.
          </h1>

          <p className="mx-auto mt-7 max-w-md text-sm leading-7 text-black/50 sm:text-base">
            Votre message a bien été créé. Il ne reste plus qu&apos;à
            partager ce lien avec la personne à qui il est destiné.
          </p>

          <div className="mt-10 rounded-[2rem] border border-black/10 bg-white/80 p-5 shadow-sm backdrop-blur">
            <p className="text-left text-[10px] font-semibold uppercase tracking-[0.2em] text-black/35">
              Votre lien unique
            </p>

            <div className="mt-3 flex items-center gap-3">
              <div className="min-w-0 flex-1 rounded-2xl bg-[#faf9f7] px-4 py-3.5 text-left">
                <p className="truncate text-sm text-black/55">
                  {messageUrl}
                </p>
              </div>

              <button
                type="button"
                onClick={copyLink}
                className="shrink-0 rounded-full bg-[#171717] px-5 py-3.5 text-sm font-medium text-white transition-all duration-300 hover:-translate-y-0.5"
              >
                {copied ? "✓ Copié" : "Copier"}
              </button>
            </div>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={shareWhatsApp}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#171717] px-6 py-4 text-sm font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
            >
              <span>💬</span>
              <span>WhatsApp</span>
            </button>

            <button
              type="button"
              onClick={shareMessage}
              disabled={sharing}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-black/10 bg-white px-6 py-4 text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 hover:border-black/20 disabled:opacity-50"
            >
              <span>↗</span>
              <span>{sharing ? "Partage..." : "Partager"}</span>
            </button>
          </div>

          <Link
            href={`/m/${id}`}
            className="mt-9 inline-flex items-center gap-2 text-sm font-medium text-black/45 transition-colors hover:text-black"
          >
            <span>Voir le message</span>
            <span>→</span>
          </Link>

          <div className="mt-20 border-t border-black/5 pt-8">
            <Link
              href="/create"
              className="text-xs uppercase tracking-[0.2em] text-black/30 transition-colors hover:text-black"
            >
              + Créer un autre message
            </Link>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes pop {
          0% {
            opacity: 0;
            transform: scale(0.6);
          }

          70% {
            opacity: 1;
            transform: scale(1.08);
          }

          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </main>
  );
}
