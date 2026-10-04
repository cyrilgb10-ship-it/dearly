import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const MAX_MESSAGE_LENGTH = 500;
const MAX_FIELD_LENGTH = 100;

const RATE_LIMIT_WINDOW = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS = 10;

const requests = new Map<
  string,
  {
    count: number;
    resetAt: number;
  }
>();

function getClientIp(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");

  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim();
  }

  const realIp = request.headers.get("x-real-ip");

  if (realIp) {
    return realIp;
  }

  return "unknown";
}

function isRateLimited(ip: string) {
  const now = Date.now();
  const current = requests.get(ip);

  if (!current || now > current.resetAt) {
    requests.set(ip, {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW,
    });

    return false;
  }

  if (current.count >= MAX_REQUESTS) {
    return true;
  }

  current.count += 1;
  requests.set(ip, current);

  return false;
}

function cleanText(value: unknown) {
  return String(value ?? "")
    .trim()
    .replace(/\s+/g, " ");
}

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request);

    if (isRateLimited(ip)) {
      return NextResponse.json(
        {
          error:
            "Trop de créations en peu de temps. Veuillez réessayer dans quelques minutes.",
        },
        { status: 429 }
      );
    }

    const body = await request.json();

    const recipient = cleanText(body.recipient);
    const sender = cleanText(body.sender);
    const content = String(body.content ?? "").trim();
    const type = cleanText(body.type);
    const theme = cleanText(body.theme);

    // Vérification des champs obligatoires
    if (!recipient || !sender || !content || !type || !theme) {
      return NextResponse.json(
        {
          error: "Tous les champs sont obligatoires.",
        },
        { status: 400 }
      );
    }

    // Limites destinées à éviter les abus
    if (recipient.length > MAX_FIELD_LENGTH) {
      return NextResponse.json(
        {
          error: "Le nom du destinataire est trop long.",
        },
        { status: 400 }
      );
    }

    if (sender.length > MAX_FIELD_LENGTH) {
      return NextResponse.json(
        {
          error: "Le nom de l'expéditeur est trop long.",
        },
        { status: 400 }
      );
    }

    if (content.length > MAX_MESSAGE_LENGTH) {
      return NextResponse.json(
        {
          error: "Le message ne peut pas dépasser 500 caractères.",
        },
        { status: 400 }
      );
    }

    if (type.length > 50) {
      return NextResponse.json(
        {
          error: "Type de message invalide.",
        },
        { status: 400 }
      );
    }

    if (theme.length > 50) {
      return NextResponse.json(
        {
          error: "Thème invalide.",
        },
        { status: 400 }
      );
    }

    // Vérification des valeurs réellement disponibles
    const allowedTypes = [
      "love",
      "birthday",
      "thanks",
      "congrats",
      "family",
      "custom",
    ];

    const allowedThemes = [
      "cream",
      "rose",
      "night",
      "lavender",
      "peach",
      "sky",
      "mint",
      "sage",
      "butter",
      "coral",
      "plum",
      "ocean",
      "sand",
      "midnight-blue",
      "forest",
    ];

    if (!allowedTypes.includes(type)) {
      return NextResponse.json(
        {
          error: "Type de message invalide.",
        },
        { status: 400 }
      );
    }

    if (!allowedThemes.includes(theme)) {
      return NextResponse.json(
        {
          error: "Thème invalide.",
        },
        { status: 400 }
      );
    }

    const message = await prisma.message.create({
      data: {
        recipient,
        sender,
        content,
        type,
        theme,
      },
    });

    return NextResponse.json(
      {
        success: true,
        id: message.id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erreur création message:", error);

    return NextResponse.json(
      {
        error: "Impossible de créer le message.",
      },
      { status: 500 }
    );
  }
}
