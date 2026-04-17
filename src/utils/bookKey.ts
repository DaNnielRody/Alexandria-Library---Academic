export function normalizeBookKey(key: string): string {
  return key.replace('/works/', '');
}

export function toBookKey(id: string): string {
  if (id.startsWith('/works/')) {
    return id;
  }
  return `/works/${id}`;
}

export function extractWorkId(bookKey: string): string {
  if (bookKey.startsWith('/works/')) {
    return bookKey.replace('/works/', '');
  }
  return bookKey;
}
