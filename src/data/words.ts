export const commonWords: string[] = [
  'the', 'be', 'to', 'of', 'and', 'a', 'in', 'that', 'have', 'i',
  'it', 'for', 'not', 'on', 'with', 'he', 'as', 'you', 'do', 'at',
  'this', 'but', 'his', 'by', 'from', 'they', 'we', 'say', 'her', 'she',
  'or', 'an', 'will', 'my', 'one', 'all', 'would', 'there', 'their', 'what',
  'so', 'up', 'out', 'if', 'about', 'who', 'get', 'which', 'go', 'me',
  'when', 'make', 'can', 'like', 'time', 'no', 'just', 'him', 'know', 'take',
  'people', 'into', 'year', 'your', 'good', 'some', 'could', 'them', 'see', 'other',
  'than', 'then', 'now', 'look', 'only', 'come', 'its', 'over', 'think', 'also',
  'back', 'after', 'use', 'two', 'how', 'our', 'work', 'first', 'well', 'way',
  'even', 'new', 'want', 'because', 'any', 'these', 'give', 'day', 'most', 'us',
  'great', 'between', 'need', 'large', 'under', 'never', 'each', 'right', 'last', 'place',
  'same', 'another', 'around', 'thought', 'help', 'hand', 'high', 'keep', 'point', 'house',
  'world', 'still', 'found', 'where', 'every', 'part', 'head', 'old', 'long', 'much',
  'before', 'line', 'too', 'mean', 'let', 'here', 'turn', 'move', 'thing', 'might',
  'close', 'live', 'walk', 'change', 'off', 'play', 'run', 'small', 'number', 'always',
  'next', 'learn', 'should', 'while', 'own', 'down', 'side', 'been', 'call', 'find',
  'did', 'many', 'set', 'show', 'begin', 'three', 'both', 'end', 'open', 'start',
  'read', 'write', 'few', 'real', 'left', 'put', 'yet', 'light', 'tell', 'kind',
  'against', 'second', 'without', 'again', 'home', 'along', 'through', 'must', 'hard', 'group',
  'story', 'different', 'important', 'school', 'city', 'land', 'study', 'water', 'able', 'name',
  'those', 'power', 'state', 'made', 'away', 'life', 'may', 'such', 'little', 'early',
  'country', 'far', 'night', 'together', 'face', 'family', 'white', 'ask', 'form', 'level',
  'program', 'system', 'company', 'children', 'human', 'follow', 'during', 'enough', 'public', 'problem',
  'seem', 'stand', 'answer', 'grow', 'care', 'young', 'order', 'clear', 'reason', 'leave',
  'since', 'full', 'best', 'woman', 'child', 'area', 'feel', 'plan', 'example', 'heart',
  'mind', 'body', 'almost', 'love', 'build', 'near', 'late', 'short', 'often', 'done',
  'became', 'happen', 'hold', 'air', 'food', 'room', 'idea', 'money', 'above', 'better',
  'word', 'strong', 'whole', 'paper', 'bring', 'however', 'book', 'develop', 'certain', 'today',
  'sometimes', 'class', 'remember', 'surface', 'special', 'morning', 'question', 'usually', 'produce', 'simple',
  'result', 'music', 'within', 'letter', 'sense', 'include', 'present', 'language', 'interest', 'common',
];

export function generateWords(count: number): string {
  const words: string[] = [];
  for (let i = 0; i < count; i++) {
    words.push(commonWords[Math.floor(Math.random() * commonWords.length)]);
  }
  return words.join(' ');
}

export function generateTimedWords(): string {
  // Generate enough words for even fast typists (200+ WPM for 120s)
  return generateWords(500);
}
