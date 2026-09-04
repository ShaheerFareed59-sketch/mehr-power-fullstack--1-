// wa.me needs the number with country code, digits only (no +, spaces or leading 0).
export const WHATSAPP_NUMBER = "923301450272";

export function buildWhatsAppLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
