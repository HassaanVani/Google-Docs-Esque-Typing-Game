export interface Quote {
  text: string;
  source: string;
  length: number;
}

export const quotes: Quote[] = [
  {
    text: "The only way to do great work is to love what you do. If you haven't found it yet, keep looking. Don't settle.",
    source: "Steve Jobs",
    length: 112
  },
  {
    text: "In the middle of difficulty lies opportunity.",
    source: "Albert Einstein",
    length: 45
  },
  {
    text: "It is not the strongest of the species that survives, nor the most intelligent, but the one most responsive to change.",
    source: "Charles Darwin",
    length: 119
  },
  {
    text: "The future belongs to those who believe in the beauty of their dreams.",
    source: "Eleanor Roosevelt",
    length: 69
  },
  {
    text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    source: "Winston Churchill",
    length: 86
  },
  {
    text: "Two things are infinite: the universe and human stupidity; and I'm not sure about the universe.",
    source: "Albert Einstein",
    length: 94
  },
  {
    text: "Be the change that you wish to see in the world.",
    source: "Mahatma Gandhi",
    length: 49
  },
  {
    text: "The only thing we have to fear is fear itself.",
    source: "Franklin D. Roosevelt",
    length: 46
  },
  {
    text: "Life is what happens when you're busy making other plans.",
    source: "John Lennon",
    length: 56
  },
  {
    text: "To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.",
    source: "Ralph Waldo Emerson",
    length: 110
  },
  {
    text: "The greatest glory in living lies not in never falling, but in rising every time we fall.",
    source: "Nelson Mandela",
    length: 88
  },
  {
    text: "Tell me and I forget. Teach me and I remember. Involve me and I learn.",
    source: "Benjamin Franklin",
    length: 69
  },
  {
    text: "It is during our darkest moments that we must focus to see the light.",
    source: "Aristotle",
    length: 68
  },
  {
    text: "The way to get started is to quit talking and begin doing.",
    source: "Walt Disney",
    length: 57
  },
  {
    text: "If life were predictable it would cease to be life, and be without flavor.",
    source: "Eleanor Roosevelt",
    length: 73
  },
  {
    text: "Whoever is happy will make others happy too.",
    source: "Anne Frank",
    length: 44
  },
  {
    text: "Do not go where the path may lead, go instead where there is no path and leave a trail.",
    source: "Ralph Waldo Emerson",
    length: 87
  },
  {
    text: "You will face many defeats in life, but never let yourself be defeated.",
    source: "Maya Angelou",
    length: 70
  },
  {
    text: "The only impossible journey is the one you never begin.",
    source: "Tony Robbins",
    length: 55
  },
  {
    text: "In three words I can sum up everything I've learned about life: it goes on.",
    source: "Robert Frost",
    length: 74
  },
  {
    text: "Many of life's failures are people who did not realize how close they were to success when they gave up.",
    source: "Thomas Edison",
    length: 104
  },
  {
    text: "The purpose of our lives is to be happy.",
    source: "Dalai Lama",
    length: 40
  },
  {
    text: "You only live once, but if you do it right, once is enough.",
    source: "Mae West",
    length: 58
  },
  {
    text: "If you look at what you have in life, you'll always have more. If you look at what you don't have in life, you'll never have enough.",
    source: "Oprah Winfrey",
    length: 131
  },
  {
    text: "The mind is everything. What you think you become.",
    source: "Buddha",
    length: 50
  },
  {
    text: "An unexamined life is not worth living.",
    source: "Socrates",
    length: 38
  },
  {
    text: "I have not failed. I've just found ten thousand ways that won't work.",
    source: "Thomas Edison",
    length: 68
  },
  {
    text: "The best time to plant a tree was twenty years ago. The second best time is now.",
    source: "Chinese Proverb",
    length: 79
  },
  {
    text: "Everything you've ever wanted is on the other side of fear.",
    source: "George Addair",
    length: 59
  },
  {
    text: "We must be willing to let go of the life we planned so as to have the life that is waiting for us.",
    source: "Joseph Campbell",
    length: 98
  }
];

export function getRandomQuote(): Quote {
  return quotes[Math.floor(Math.random() * quotes.length)];
}
