import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import MessageExperience from "./MessageExperience";

const themes = [
  { id: "cream", background: "#f4e9e5", text: "#171717" },
  { id: "rose", background: "#f8dfe5", text: "#4a2028" },
  { id: "night", background: "#191919", text: "#ffffff" },
  { id: "lavender", background: "#e9e4f5", text: "#29243d" },
  { id: "peach", background: "#f9dfcf", text: "#4a2c20" },
  { id: "sky", background: "#dcecf7", text: "#1d3545" },
  { id: "mint", background: "#dcefe7", text: "#1d3b31" },
  { id: "sage", background: "#dfe6d5", text: "#303a28" },
  { id: "butter", background: "#f8edc9", text: "#463c1d" },
  { id: "coral", background: "#f5c9c2", text: "#542620" },
  { id: "plum", background: "#e5d5e6", text: "#3d263f" },
  { id: "ocean", background: "#d4e6e8", text: "#18363b" },
  { id: "sand", background: "#e9dfd0", text: "#40372c" },
  { id: "midnight-blue", background: "#202b3d", text: "#ffffff" },
  { id: "forest", background: "#d5e2d8", text: "#20352a" },
];

const typeContent: Record<
  string,
  {
    eyebrow: string;
    title: string;
    icon: string;
  }
> = {
  love: {
    eyebrow: "Un message pour toi",
    title: "Avec tout mon cœur",
    icon: "♡",
  },

  birthday: {
    eyebrow: "Une surprise pour toi",
    title: "Joyeux anniversaire",
    icon: "🎂",
  },

  thanks: {
    eyebrow: "Quelques mots sincères",
    title: "Merci",
    icon: "✦",
  },

  congrats: {
    eyebrow: "Une belle nouvelle",
    title: "Félicitations !",
    icon: "✦",
  },

  family: {
    eyebrow: "Pour quelqu'un de précieux",
    title: "Pour toi, avec amour",
    icon: "♡",
  },

  custom: {
    eyebrow: "Un petit mot pour toi",
    title: "Juste parce que",
    icon: "💌",
  },
};

export default async function MessagePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const message = await prisma.message.findUnique({
    where: {
      id,
    },
  });

  if (!message) {
    notFound();
  }

  const theme =
    themes.find((item) => item.id === message.theme) ?? themes[0];

  const content =
    typeContent[message.type] ?? typeContent.custom;

  return (
    <MessageExperience
      recipient={message.recipient}
      sender={message.sender}
      message={message.content}
      type={message.type}
      theme={{
        background: theme.background,
        text: theme.text,
      }}
      content={content}
    />
  );
}