export function formatPhone(input: string): string {
  let digits = input.replace(/\D/g, '');

  if (digits.startsWith('380')) {
    digits = digits.slice(3);
  } else if (digits.startsWith('0')) {
    digits = digits.slice(1);
  }

  const d = digits.slice(0, 9);
  if (!d) return '';

  let result = '+380 (' + d.slice(0, 3);
  if (d.length > 3) result += ') ' + d.slice(3, 6);
  if (d.length > 6) result += '-' + d.slice(6, 8);
  if (d.length > 8) result += '-' + d.slice(8, 9);

  return result;
}

export function formatDate(date: Date): string {
  const dd = String(date.getDate()).padStart(2, '0');
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  return `${dd}.${mm}.${date.getFullYear()}`;
}

export function toIsoDate(date: Date): string {
  const dd = String(date.getDate()).padStart(2, '0');
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  return `${date.getFullYear()}-${mm}-${dd}`;
}

export function isoToDisplay(iso: string): string {
  const [y, m, d] = iso.split('-');
  return `${d}.${m}.${y}`;
}
