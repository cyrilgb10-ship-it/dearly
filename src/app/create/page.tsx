"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const messageTypes = [
  { id: "love", emoji: "❤️", label: "Amour" },
  { id: "birthday", emoji: "🎂", label: "Anniversaire" },
  { id: "thanks", emoji: "🙏", label: "Merci" },
  { id: "congrats", emoji: "🎉", label: "Félicitations" },
  { id: "family", emoji: "🤍", label: "Famille" },
  { id: "custom", emoji: "💌", label: "Autre" },
];

const themes = [
  { id: "cream", name: "Élégance", background: "#f4e9e5", text: "#171717" },
  { id: "rose", name: "Rose", background: "#f8dfe5", text: "#4a2028" },
  { id: "night", name: "Minuit", background: "#191919", text: "#ffffff" },
  { id: "lavender", name: "Lavande", background: "#e9e4f5", text: "#29243d" },
  { id: "peach", name: "Pêche", background: "#f9dfcf", text: "#4a2c20" },
  { id: "sky", name: "Ciel", background: "#dcecf7", text: "#1d3545" },
  { id: "mint", name: "Menthe", background: "#dcefe7", text: "#1d3b31" },
  { id: "sage", name: "Sauge", background: "#dfe6d5", text: "#303a28" },
  { id: "butter", name: "Vanille", background: "#f8edc9", text: "#463c1d" },
  { id: "coral", name: "Corail", background: "#f5c9c2", text: "#542620" },
  { id: "plum", name: "Prune", background: "#e5d5e6", text: "#3d263f" },
  { id: "ocean", name: "Océan", background: "#d4e6e8", text: "#18363b" },
  { id: "sand", name: "Sable", background: "#e9dfd0", text: "#40372c" },
  {
    id: "midnight-blue",
    name: "Bleu nuit",
    background: "#202b3d",
    text: "#ffffff",
  },
  { id: "forest", name: "Forêt", background: "#d5e2d8", text: "#20352a" },
];

const typeContent: Record<
  string,
  {
    eyebrow: string;
    title: string;
    icon: string;
    footer: string;
  }
> = {
  love: {
    eyebrow: "Un message pour toi",
    title: "Avec tout mon cœur",
    icon: "♡",
    footer: "Une pensée rien que pour toi",
  },
  birthday: {
    eyebrow: "Une surprise pour toi",
    title: "Joyeux anniversaire",
    icon: "🎂",
    footer: "Que cette journée soit inoubliable",
  },
  thanks: {
    eyebrow: "Quelques mots sincères",
    title: "Merci",
    icon: "✦",
    footer: "Avec toute ma gratitude",
  },
  congrats: {
    eyebrow: "Une belle nouvelle",
    title: "Félicitations !",
    icon: "✦",
    footer: "Tu peux être fier(e) de toi",
  },
  family: {
    eyebrow: "Pour quelqu'un de précieux",
    title: "Pour toi, avec amour",
    icon: "♡",
    footer: "La famille, c'est précieux",
  },
  custom: {
    eyebrow: "Un petit mot pour toi",
    title: "Juste parce que",
    icon: "💌",
    footer: "Un message rien que pour toi",
  },
};

export default function CreatePage() {
  const router = useRouter();

  const [type, setType] = useState("love");
  const [recipient, setRecipient] = useState("");
  const [sender, setSender] = useState("");
  const [message, setMessage] = useState("");
  const [theme, setTheme] = useState("cream");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const selectedTheme =
    themes.find((item) => item.id === theme) ?? themes[0];

  const selectedType = typeContent[type] ?? typeContent.custom;

  async function handleCreateMessage() {
    setError("");

    if (!recipient.trim()) {
      setError("Veuillez indiquer le destinataire.");
      return;
    }

    if (!sender.trim()) {
      setError("Veuillez indiquer votre prénom.");
      return;
    }

    if (!message.trim()) {
      setError("Veuillez écrire votre message.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          recipient: recipient.trim(),
          sender: sender.trim(),
          content: message.trim(),
          type,
          theme,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Impossible de créer le message."
        );
      }

      // Après la création, on affiche la page
      // qui permet de copier et partager le lien.
      router.push(`/created?id=${data.id}`);
    } catch (err) {
      console.error(err);

      setError(
        err instanceof Error
          ? err.message
          : "Une erreur est survenue."
      );

      setLoading(false);
    }
  }

  function renderDecorations() {
    if (type === "love") {
      return (
        <>
          <div className="absolute left-8 top-16 text-2xl opacity-20">
            ♡
          </div>

          <div className="absolute right-10 top-28 text-xl opacity-20">
            ♡
          </div>

          <div className="absolute bottom-28 left-12 text-xl opacity-15">
            ♡
          </div>

          <div className="absolute bottom-20 right-8 text-2xl opacity-20">
            ♡
          </div>
        </>
      );
    }

    if (type === "birthday") {
      return (
        <>
          <div className="absolute left-6 top-12 text-xl opacity-60">
            ✦
          </div>

          <div className="absolute right-8 top-20 text-2xl opacity-50">
            ✦
          </div>

          <div className="absolute bottom-24 left-10 text-lg opacity-50">
            •
          </div>

          <div className="absolute bottom-16 right-12 text-xl opacity-50">
            ✦
          </div>

          <div className="absolute left-1/2 top-8 h-1 w-1 rounded-full bg-current opacity-40" />

          <div className="absolute bottom-20 left-1/3 h-1 w-1 rounded-full bg-current opacity-40" />
        </>
      );
    }

    if (type === "thanks") {
      return (
        <>
          <div className="absolute left-8 top-20 text-xl opacity-20">
            ✦
          </div>

          <div className="absolute right-10 top-32 text-2xl opacity-20">
            ✦
          </div>

          <div className="absolute bottom-28 right-12 text-xl opacity-20">
            ✦
          </div>
        </>
      );
    }

    if (type === "congrats") {
      return (
        <>
          <div className="absolute left-7 top-14 rotate-12 text-xl opacity-50">
            ✦
          </div>

          <div className="absolute right-8 top-24 -rotate-12 text-xl opacity-50">
            ✦
          </div>

          <div className="absolute bottom-24 left-10 rotate-12 text-lg opacity-50">
            •
          </div>

          <div className="absolute bottom-16 right-10 -rotate-12 text-2xl opacity-50">
            ✦
          </div>
        </>
      );
    }

    if (type === "family") {
      return (
        <>
          <div className="absolute left-8 top-20 text-2xl opacity-20">
            ♡
          </div>

          <div className="absolute right-10 top-32 text-xl opacity-20">
            ♡
          </div>

          <div className="absolute bottom-24 left-12 text-xl opacity-20">
            ♡
          </div>
        </>
      );
    }

    return (
      <>
        <div className="absolute left-8 top-20 text-xl opacity-20">
          ✦
        </div>

        <div className="absolute right-10 top-28 text-xl opacity-20">
          ♡
        </div>
      </>
    );
  }

  return (
    <main className="min-h-screen bg-[#faf9f7] text-[#171717]">
      {/* Navigation */}
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-7 lg:px-10">
        <Link
          href="/"
          className="text-2xl font-semibold tracking-[-0.04em]"
        >
          dearly<span className="text-[#e86b6b]">.</span>
        </Link>

        <Link
          href="/"
          className="text-sm text-black/45 transition hover:text-black"
        >
          ← Retour
        </Link>
      </nav>

      <section className="mx-auto max-w-7xl px-6 pb-20 pt-8 lg:px-10">
        {/* Header */}
        <div className="max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#e86b6b]">
            Créer un message
          </p>

          <h1 className="mt-3 text-5xl font-semibold tracking-[-0.06em] sm:text-6xl">
            Quelque chose
            <br />
            <span className="font-serif font-normal italic">
              rien que pour eux.
            </span>
          </h1>

          <p className="mt-6 text-base leading-7 text-black/50">
            Choisissez une occasion, écrivez vos mots et créez une
            expérience unique à partager.
          </p>
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_430px]">
          {/* FORMULAIRE */}
          <div className="space-y-8">
            {/* Type */}
            <div>
              <label className="text-sm font-semibold">
                Quel type de message ?
              </label>

              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {messageTypes.map((item) => {
                  const active = type === item.id;

                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setType(item.id)}
                      className={`rounded-2xl border p-4 text-left transition ${
                        active
                          ? "border-black bg-black text-white shadow-lg"
                          : "border-black/10 bg-white hover:-translate-y-0.5 hover:border-black/20 hover:shadow-md"
                      }`}
                    >
                      <div className="text-xl">{item.emoji}</div>

                      <div className="mt-3 text-sm font-medium">
                        {item.label}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Destinataire */}
            <div>
              <label
                htmlFor="recipient"
                className="text-sm font-semibold"
              >
                À qui est destiné ce message ?
              </label>

              <input
                id="recipient"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                placeholder="Ex. Maman, Sarah, Paul..."
                className="mt-3 w-full rounded-2xl border border-black/10 bg-white px-5 py-4 outline-none transition placeholder:text-black/25 focus:border-black/30 focus:ring-4 focus:ring-black/5"
              />
            </div>

            {/* Expéditeur */}
            <div>
              <label
                htmlFor="sender"
                className="text-sm font-semibold"
              >
                Votre prénom
              </label>

              <input
                id="sender"
                value={sender}
                onChange={(e) => setSender(e.target.value)}
                placeholder="Ex. Cyril"
                className="mt-3 w-full rounded-2xl border border-black/10 bg-white px-5 py-4 outline-none transition placeholder:text-black/25 focus:border-black/30 focus:ring-4 focus:ring-black/5"
              />
            </div>

            {/* Message */}
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="message"
                  className="text-sm font-semibold"
                >
                  Votre message
                </label>

                <span className="text-xs text-black/30">
                  {message.length}/500
                </span>
              </div>

              <textarea
                id="message"
                value={message}
                maxLength={500}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Écrivez quelque chose de sincère..."
                rows={7}
                className="mt-3 w-full resize-none rounded-2xl border border-black/10 bg-white px-5 py-4 leading-7 outline-none transition placeholder:text-black/25 focus:border-black/30 focus:ring-4 focus:ring-black/5"
              />
            </div>

            {/* Thèmes */}
            <div>
              <div className="flex items-center justify-between">
                <label className="text-sm font-semibold">
                  Choisissez un thème
                </label>

                <span className="text-xs text-black/35">
                  {themes.length} thèmes
                </span>
              </div>

              <div className="mt-5 grid grid-cols-3 gap-3 sm:grid-cols-5">
                {themes.map((item) => {
                  const active = theme === item.id;

                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setTheme(item.id)}
                      title={item.name}
                      className={`group rounded-2xl border p-2 transition ${
                        active
                          ? "border-black bg-white shadow-md ring-2 ring-black/10"
                          : "border-black/5 bg-white hover:-translate-y-0.5 hover:border-black/15 hover:shadow-sm"
                      }`}
                    >
                      <div
                        className="relative h-16 overflow-hidden rounded-xl"
                        style={{
                          backgroundColor: item.background,
                        }}
                      >
                        {active && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div
                              className="flex h-7 w-7 items-center justify-center rounded-full"
                              style={{
                                backgroundColor: item.text,
                                color: item.background,
                              }}
                            >
                              ✓
                            </div>
                          </div>
                        )}
                      </div>

                      <p className="mt-2 truncate px-1 pb-1 text-xs font-medium">
                        {item.name}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Erreur */}
            {error && (
              <div className="rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-600">
                {error}
              </div>
            )}

            {/* Bouton */}
            <button
              type="button"
              onClick={handleCreateMessage}
              disabled={loading}
              className="w-full rounded-full bg-[#171717] px-7 py-4 text-sm font-medium text-white transition hover:-translate-y-0.5 hover:bg-black hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading
                ? "Création de votre message..."
                : "Créer mon lien 💌"}
            </button>

            <p className="text-center text-xs text-black/30">
              Gratuit · Aucun compte nécessaire
            </p>
          </div>

          {/* APERÇU */}
          <div className="lg:sticky lg:top-8 lg:self-start">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm font-semibold">Aperçu</p>

              <span className="text-xs text-black/35">
                {selectedType.title}
              </span>
            </div>

            <div className="rounded-[32px] bg-white p-4 shadow-[0_30px_80px_rgba(0,0,0,0.08)]">
              <div
                className="relative min-h-[560px] overflow-hidden rounded-[25px] px-7 py-14 text-center transition-all duration-500"
                style={{
                  backgroundColor: selectedTheme.background,
                  color: selectedTheme.text,
                }}
              >
                {/* Décorations spécifiques au type */}
                {renderDecorations()}

                {/* Halo */}
                <div
                  className="absolute -right-16 -top-16 h-40 w-40 rounded-full opacity-20 blur-3xl"
                  style={{
                    backgroundColor: selectedTheme.text,
                  }}
                />

                <div
                  className="absolute -bottom-20 -left-16 h-44 w-44 rounded-full opacity-10 blur-3xl"
                  style={{
                    backgroundColor: selectedTheme.text,
                  }}
                />

                {/* Contenu */}
                <div className="relative">
                  <div className="text-4xl">
                    {selectedType.icon}
                  </div>

                  <p className="mt-8 text-[10px] uppercase tracking-[0.28em] opacity-45">
                    {selectedType.eyebrow}
                  </p>

                  <h2 className="mt-5 font-serif text-4xl italic leading-tight">
                    {recipient || "Pour toi"}
                  </h2>

                  <div
                    className="mx-auto mt-7 h-px w-10 opacity-20"
                    style={{
                      backgroundColor: selectedTheme.text,
                    }}
                  />

                  <h3 className="mt-7 text-xl font-medium">
                    {selectedType.title}
                  </h3>

                  <div className="mx-auto mt-7 max-w-xs">
                    <p className="whitespace-pre-wrap text-sm leading-7 opacity-70">
                      {message ||
                        "Votre message apparaîtra ici au fur et à mesure que vous l'écrivez..."}
                    </p>
                  </div>

                  <div className="mx-auto mt-12 max-w-[180px]">
                    <div
                      className="h-px w-full opacity-15"
                      style={{
                        backgroundColor: selectedTheme.text,
                      }}
                    />
                  </div>

                  <div className="mt-6 text-sm opacity-50">
                    {sender
                      ? `Avec affection, ${sender}`
                      : selectedType.footer}
                  </div>
                </div>
              </div>
            </div>

            {/* Thème */}
            <div className="mt-4 rounded-2xl border border-black/5 bg-white p-4">
              <p className="text-xs text-black/35">
                Thème sélectionné
              </p>

              <div className="mt-2 flex items-center gap-3">
                <div
                  className="h-7 w-7 rounded-full border border-black/10"
                  style={{
                    backgroundColor: selectedTheme.background,
                  }}
                />

                <span className="text-sm font-medium">
                  {selectedTheme.name}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
