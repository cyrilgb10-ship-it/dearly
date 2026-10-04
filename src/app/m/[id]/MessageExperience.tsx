"use client";

import { useState } from "react";

type Theme = {
  background: string;
  text: string;
};

type Content = {
  eyebrow: string;
  title: string;
  icon: string;
};

type Props = {
  recipient: string;
  sender: string;
  message: string;
  type: string;
  theme: Theme;
  content: Content;
};

export default function MessageExperience({
  recipient,
  sender,
  message,
  type,
  theme,
  content,
}: Props) {
  const [opened, setOpened] = useState(false);
  const [copied, setCopied] = useState(false);
  const [sharing, setSharing] = useState(false);

  const copyLink = async () => {
    const messageUrl = window.location.href;

    try {
      await navigator.clipboard.writeText(messageUrl);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2500);
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

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2500);
    }
  };

  const shareMessage = async () => {
    const messageUrl = window.location.href;

    if (!navigator.share) {
      await copyLink();
      return;
    }

    try {
      setSharing(true);

      await navigator.share({
        title: `Un message pour ${recipient}`,
        text: `${recipient}, tu as reçu un message sur dearly.`,
        url: messageUrl,
      });
    } catch {
      // L'utilisateur a fermé la fenêtre de partage.
    } finally {
      setSharing(false);
    }
  };

  const shareWhatsApp = () => {
    const messageUrl = window.location.href;

    const text = encodeURIComponent(
      `💌 ${recipient}, tu as reçu un message sur dearly.\n\nOuvre-le ici : ${messageUrl}`
    );

    window.open(
      `https://wa.me/?text=${text}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <main
      className="relative min-h-screen overflow-hidden"
      style={{
        backgroundColor: theme.background,
        color: theme.text,
      }}
    >
      {/* Halo principal */}
      <div
        className={`pointer-events-none absolute left-1/2 top-1/2 h-[320px] w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[100px] transition-all duration-[1800ms] ease-out ${
          opened
            ? "scale-[4] opacity-20"
            : "scale-75 opacity-10"
        }`}
        style={{
          backgroundColor: theme.text,
        }}
      />

      {/* Halo décoratif gauche */}
      <div
        className={`pointer-events-none absolute left-[15%] top-[20%] h-20 w-20 rounded-full blur-[60px] transition-all duration-[2000ms] ${
          opened ? "scale-[3] opacity-20" : "opacity-5"
        }`}
        style={{
          backgroundColor: theme.text,
        }}
      />

      {/* Halo décoratif droit */}
      <div
        className={`pointer-events-none absolute bottom-[20%] right-[15%] h-24 w-24 rounded-full blur-[70px] transition-all duration-[2000ms] ${
          opened ? "scale-[3] opacity-20" : "opacity-5"
        }`}
        style={{
          backgroundColor: theme.text,
        }}
      />

      {/* Décorations Amour */}
      {type === "love" && (
        <>
          <span
            className={`absolute left-[8%] top-[18%] text-5xl transition-all duration-[1800ms] ${
              opened
                ? "translate-y-[-30px] scale-125 opacity-20"
                : "opacity-10"
            }`}
          >
            ♡
          </span>

          <span
            className={`absolute right-[10%] top-[25%] text-6xl transition-all duration-[2000ms] ${
              opened
                ? "translate-y-[-40px] scale-125 opacity-20"
                : "opacity-10"
            }`}
          >
            ♡
          </span>

          <span
            className={`absolute bottom-[18%] left-[12%] text-4xl transition-all duration-[1800ms] ${
              opened
                ? "translate-y-[30px] scale-125 opacity-20"
                : "opacity-10"
            }`}
          >
            ♡
          </span>

          <span
            className={`absolute bottom-[15%] right-[12%] text-5xl transition-all duration-[2000ms] ${
              opened
                ? "translate-y-[30px] scale-125 opacity-20"
                : "opacity-10"
            }`}
          >
            ♡
          </span>
        </>
      )}

      {/* Décorations Famille */}
      {type === "family" && (
        <>
          <span
            className={`absolute left-[10%] top-[20%] text-5xl transition-all duration-[1800ms] ${
              opened ? "scale-125 opacity-20" : "opacity-10"
            }`}
          >
            ♡
          </span>

          <span
            className={`absolute right-[12%] top-[28%] text-4xl transition-all duration-[2000ms] ${
              opened ? "scale-125 opacity-20" : "opacity-10"
            }`}
          >
            ♡
          </span>

          <span
            className={`absolute bottom-[20%] left-[14%] text-4xl transition-all duration-[1800ms] ${
              opened ? "scale-125 opacity-20" : "opacity-10"
            }`}
          >
            ♡
          </span>

          <span
            className={`absolute bottom-[15%] right-[10%] text-5xl transition-all duration-[2000ms] ${
              opened ? "scale-125 opacity-20" : "opacity-10"
            }`}
          >
            ♡
          </span>
        </>
      )}

      {/* Décorations Anniversaire */}
      {type === "birthday" && (
        <>
          <span
            className={`absolute left-[8%] top-[16%] text-3xl transition-all duration-[1500ms] ${
              opened
                ? "translate-y-[-35px] scale-150 opacity-60"
                : "opacity-30"
            }`}
          >
            ✦
          </span>

          <span
            className={`absolute right-[10%] top-[22%] text-4xl transition-all duration-[1700ms] ${
              opened
                ? "translate-y-[-25px] scale-150 opacity-60"
                : "opacity-30"
            }`}
          >
            ✦
          </span>

          <span
            className={`absolute bottom-[20%] left-[12%] text-2xl transition-all duration-[1600ms] ${
              opened
                ? "translate-y-[30px] scale-150 opacity-60"
                : "opacity-30"
            }`}
          >
            •
          </span>

          <span
            className={`absolute bottom-[15%] right-[14%] text-4xl transition-all duration-[1900ms] ${
              opened
                ? "translate-y-[35px] scale-150 opacity-60"
                : "opacity-30"
            }`}
          >
            ✦
          </span>
        </>
      )}

      {/* Décorations Merci */}
      {type === "thanks" && (
        <>
          <span
            className={`absolute left-[12%] top-[24%] text-3xl transition-all duration-[1800ms] ${
              opened
                ? "translate-x-[-20px] scale-150 opacity-25"
                : "opacity-15"
            }`}
          >
            ✦
          </span>

          <span
            className={`absolute bottom-[24%] right-[14%] text-4xl transition-all duration-[2000ms] ${
              opened
                ? "translate-x-[20px] scale-150 opacity-25"
                : "opacity-15"
            }`}
          >
            ✦
          </span>
        </>
      )}

      {/* Décorations Félicitations */}
      {type === "congrats" && (
        <>
          <span
            className={`absolute left-[8%] top-[18%] text-4xl transition-all duration-[1500ms] ${
              opened
                ? "translate-y-[-35px] scale-150 opacity-50"
                : "opacity-30"
            }`}
          >
            ✦
          </span>

          <span
            className={`absolute right-[10%] top-[28%] text-5xl transition-all duration-[1700ms] ${
              opened
                ? "translate-y-[-25px] scale-150 opacity-50"
                : "opacity-30"
            }`}
          >
            ✦
          </span>

          <span
            className={`absolute bottom-[18%] left-[15%] text-2xl transition-all duration-[1600ms] ${
              opened
                ? "translate-y-[30px] scale-150 opacity-50"
                : "opacity-30"
            }`}
          >
            •
          </span>

          <span
            className={`absolute bottom-[20%] right-[15%] text-3xl transition-all duration-[1800ms] ${
              opened
                ? "translate-y-[30px] scale-150 opacity-50"
                : "opacity-30"
            }`}
          >
            ✦
          </span>
        </>
      )}

      {/* Décorations Autre */}
      {type === "custom" && (
        <>
          <span
            className={`absolute left-[12%] top-[20%] text-2xl transition-all duration-[1800ms] ${
              opened ? "scale-150 opacity-30" : "opacity-20"
            }`}
          >
            ✦
          </span>

          <span
            className={`absolute right-[12%] top-[28%] text-3xl transition-all duration-[1900ms] ${
              opened ? "scale-150 opacity-25" : "opacity-15"
            }`}
          >
            ♡
          </span>

          <span
            className={`absolute bottom-[20%] left-[15%] text-2xl transition-all duration-[2000ms] ${
              opened ? "scale-150 opacity-30" : "opacity-15"
            }`}
          >
            ✦
          </span>
        </>
      )}

      {/* Logo */}
      <div
        className={`absolute left-1/2 top-8 z-30 -translate-x-1/2 transition-all duration-1000 ${
          opened ? "opacity-30" : "opacity-40"
        }`}
      >
        <p className="text-sm font-semibold tracking-[-0.02em]">
          dearly<span className="opacity-70">.</span>
        </p>
      </div>

      {/* ============================== */}
      {/* ÉCRAN AVANT OUVERTURE */}
      {/* ============================== */}

      {!opened && (
        <section className="relative z-10 flex min-h-screen items-center justify-center px-6">
          <div className="w-full max-w-xl text-center animate-[entrance_1.2s_ease-out]">
            <div
              className="mx-auto flex h-28 w-28 items-center justify-center rounded-full border transition-all duration-500 hover:scale-105"
              style={{
                borderColor: `${theme.text}20`,
                backgroundColor: `${theme.text}08`,
              }}
            >
              <span className="text-5xl">{content.icon}</span>
            </div>

            <p className="mt-10 text-xs font-medium uppercase tracking-[0.3em] opacity-40">
              Un message pour toi
            </p>

            <h1 className="mt-6 font-serif text-5xl italic tracking-[-0.05em] sm:text-7xl">
              {recipient}
            </h1>

            <p className="mx-auto mt-7 max-w-md text-sm leading-7 opacity-55 sm:text-base">
              Quelqu&apos;un a pris le temps de t&apos;écrire quelques mots.
            </p>

            <button
              type="button"
              onClick={() => setOpened(true)}
              className="group relative mt-10 inline-flex items-center gap-3 overflow-hidden rounded-full px-8 py-4 text-sm font-semibold shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:scale-[1.03] active:scale-[0.98]"
              style={{
                backgroundColor: theme.text,
                color: theme.background,
              }}
            >
              <span className="absolute inset-0 -translate-x-full bg-white/10 transition-transform duration-700 group-hover:translate-x-full" />

              <span className="relative">
                Ouvrir mon message
              </span>

              <span className="relative text-base transition-transform duration-300 group-hover:translate-x-1">
                ✦
              </span>
            </button>

            <p className="mt-6 text-[11px] uppercase tracking-[0.2em] opacity-25">
              Une petite surprise rien que pour toi
            </p>
          </div>
        </section>
      )}

      {/* ============================== */}
      {/* MESSAGE OUVERT */}
      {/* ============================== */}

      {opened && (
        <section className="relative z-10 flex min-h-screen items-center justify-center px-6 py-24">
          <div className="w-full max-w-2xl text-center">
            <div className="animate-[iconReveal_1s_ease-out] text-5xl">
              {content.icon}
            </div>

            <p className="mt-8 animate-[textReveal_1.1s_ease-out] text-xs uppercase tracking-[0.3em] opacity-40">
              {content.eyebrow}
            </p>

            <h1 className="mt-7 animate-[textReveal_1.3s_ease-out] font-serif text-5xl italic tracking-[-0.05em] sm:text-7xl">
              {recipient}
            </h1>

            <h2 className="mt-8 animate-[textReveal_1.5s_ease-out] text-xl font-medium opacity-80 sm:text-2xl">
              {content.title}
            </h2>

            <div
              className="mx-auto mt-8 h-px w-12 animate-[lineReveal_1.7s_ease-out]"
              style={{
                backgroundColor: theme.text,
                opacity: 0.2,
              }}
            />

            <div className="mx-auto mt-10 max-w-xl animate-[messageReveal_2s_ease-out]">
              <p className="whitespace-pre-wrap text-base leading-8 opacity-75 sm:text-lg sm:leading-9">
                {message}
              </p>
            </div>

            <div className="mt-14 animate-[signatureReveal_2.4s_ease-out]">
              <p className="text-xs uppercase tracking-[0.2em] opacity-35">
                Avec affection
              </p>

              <p className="mt-3 font-serif text-2xl italic">
                {sender}
              </p>
            </div>

            {/* ============================== */}
            {/* PARTAGE */}
            {/* ============================== */}

            <div className="mt-16 animate-[fadeIn_2.8s_ease-out]">
              <p className="text-xs uppercase tracking-[0.2em] opacity-30">
                Une petite attention mérite d&apos;être partagée
              </p>

              <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
                {/* Copier le lien */}
                <button
                  type="button"
                  onClick={copyLink}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full border px-6 py-3 text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 sm:w-auto"
                  style={{
                    borderColor: `${theme.text}20`,
                    backgroundColor: `${theme.text}05`,
                  }}
                >
                  <span>{copied ? "✓" : "⧉"}</span>

                  <span>
                    {copied ? "Lien copié" : "Copier le lien"}
                  </span>
                </button>

                {/* WhatsApp */}
                <button
                  type="button"
                  onClick={shareWhatsApp}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 sm:w-auto"
                  style={{
                    backgroundColor: theme.text,
                    color: theme.background,
                  }}
                >
                  <span>💬</span>
                  <span>WhatsApp</span>
                </button>

                {/* Partage natif */}
                <button
                  type="button"
                  onClick={shareMessage}
                  disabled={sharing}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full border px-6 py-3 text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-50 sm:w-auto"
                  style={{
                    borderColor: `${theme.text}20`,
                    backgroundColor: `${theme.text}05`,
                  }}
                >
                  <span>↗</span>

                  <span>
                    {sharing ? "Partage..." : "Partager"}
                  </span>
                </button>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-12 animate-[fadeIn_3s_ease-out]">
              <p className="text-xs opacity-25">
                Un message créé avec dearly.
              </p>
            </div>
          </div>
        </section>
      )}

      <style jsx global>{`
        @keyframes entrance {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.98);
          }

          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes iconReveal {
          0% {
            opacity: 0;
            transform: scale(0.4) rotate(-12deg);
          }

          60% {
            opacity: 1;
            transform: scale(1.08) rotate(3deg);
          }

          100% {
            opacity: 1;
            transform: scale(1) rotate(0);
          }
        }

        @keyframes textReveal {
          from {
            opacity: 0;
            transform: translateY(24px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes lineReveal {
          from {
            width: 0;
            opacity: 0;
          }

          to {
            width: 48px;
            opacity: 0.2;
          }
        }

        @keyframes messageReveal {
          from {
            opacity: 0;
            transform: translateY(30px);
            filter: blur(8px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
            filter: blur(0);
          }
        }

        @keyframes signatureReveal {
          from {
            opacity: 0;
            transform: translateY(20px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }

          to {
            opacity: 1;
          }
        }
      `}</style>
    </main>
  );
}
