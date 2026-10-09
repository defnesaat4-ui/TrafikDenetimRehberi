/**
 * Turkish string normalization utility for fast fuzzy search.
 * Converts Turkish characters to lower case and removes diacritics.
 */
export function normalizeTurkishText(text: string): string {
  if (!text) return '';
  return text
    .toLocaleLowerCase('tr-TR')
    .replace(/i̇/g, 'i')
    .replace(/ı/g, 'i')
    .replace(/ğ/g, 'g')
    .replace(/ü/g, 'u')
    .replace(/ş/g, 's')
    .replace(/ö/g, 'o')
    .replace(/ç/g, 'c')
    .replace(/[^a-z0-9]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Checks whether a violation item matches search query terms.
 * Supports:
 * - madde numarası ("48", "48/5", "36", "65", "65/1-a")
 * - alt madde ("5", "3-a", "1-a")
 * - ihlal başlığı
 * - anahtar kelimeler ("alkol", "ehliyetsiz", "sahte plaka", "mükerrer plaka", "kırmızı ışık", "hız", "telefon", "muayene", "sigorta", "kemer")
 * - açıklama / tam metin
 * - kanuni dayanak ("2918", "7574", "TCK", "KTY")
 */
export function matchesSearchQuery(
  searchQuery: string,
  fields: {
    article: string;
    title: string;
    description: string;
    fullDescription?: string;
    keywords?: string[];
    categoryName?: string;
    legalBasis?: string;
    actionProcedure?: string;
    officerNotes?: string;
  }
): boolean {
  const query = normalizeTurkishText(searchQuery);
  if (!query) return true;

  const queryTerms = query.split(' ').filter(Boolean);

  // Combine all searchable fields
  const searchableBlob = normalizeTurkishText(
    `${fields.article} ${fields.title} ${fields.description} ${fields.fullDescription || ''} ${(fields.keywords || []).join(' ')} ${fields.categoryName || ''} ${fields.legalBasis || ''} ${fields.actionProcedure || ''} ${fields.officerNotes || ''}`
  );

  // Check if every query term exists in the blob
  return queryTerms.every((term) => searchableBlob.includes(term));
}

/**
 * Formats Turkish Lira currency nicely (e.g., "12.977 ₺")
 */
export function formatCurrency(amount: number): string {
  if (amount === 0) return '0 ₺';
  return (
    new Intl.NumberFormat('tr-TR', {
      maximumFractionDigits: 2,
      minimumFractionDigits: amount % 1 === 0 ? 0 : 2,
    }).format(amount) + ' ₺'
  );
}
