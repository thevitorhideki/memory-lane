import { por, removeStopwords } from 'stopword';

export interface ChatMessage {
  datetime: Date;
  author: string;
  message: string;
  type: string;
  dateStr: string;
  timeStr: string;
}

export interface AnalyzedData {
  totalMessages: number;
  messagesPerMonth: { month: string; count: number }[];
  messagesPerAuthor: { author: string; count: number }[];
  activityByHour: { hour: string; count: number }[];
  activityByDay: { day: string; count: number }[];
  frequentWords: { word: string; count: number }[];
  laughs: { author: string; count: number }[];
  messagesPerPersonPerMonth: { [key: string]: number | string }[];
  averageResponseTime: { author: string; avgTime: number }[];
  commonNGrams: {
    author: string;
    ngrams: { phrase: string; count: number }[];
  }[];
  messagesPerDayOfWeek: { day: string; count: number }[];
  emojisPerPerson: {
    author: string;
    emojis: { emoji: string; count: number }[];
  }[];
  conversationStarters: { author: string; count: number }[];
}

export class AnalyzeWhatsApp {
  private messages: ChatMessage[];

  // Todos os dados são retornados assim com n valores e x items
  // [{"mes":01/20, "vitor":34922, "Rafa":29031},
  //  {"mes":02/20, "vitor":28047, "Rafa":12042},
  //  ...]

  constructor(textContent: string) {
    this.messages = this.parseWhatsAppContent(textContent);
  }

  // Detect the type of message based on its content.
  private detectType(message: string): string {
    const msgLower = message.toLowerCase();
    if (msgLower.startsWith('location: https://maps.google.com/'))
      return 'location';
    if (msgLower.includes('video call')) return 'video call';
    if (msgLower.includes('ligação de vídeo')) return 'video call';

    if (msgLower.includes('voice call')) return 'voice call';
    if (msgLower.includes('ligação de voz')) return 'voice call';

    if (msgLower.includes('group call')) return 'group call';
    if (msgLower.includes('ligação em grupo')) return 'group call';

    if (msgLower.includes('contact card omitted')) return 'contact';
    if (msgLower.includes('cartão do contato omitido')) return 'contact';

    if (msgLower.startsWith('null')) return 'media';
    if (msgLower.includes('<media omitted>')) return 'media';

    if (msgLower.includes('sticker omitted')) return 'sticker';
    if (msgLower.includes('figurinha omitida')) return 'sticker';

    if (msgLower.includes('gif omitted')) return 'gif';
    if (msgLower.includes('gif omitido')) return 'gif';

    if (msgLower.includes('image omitted')) return 'image';
    if (msgLower.includes('imagem ocultada')) return 'image';

    if (msgLower.includes('video omitted')) return 'video';
    if (msgLower.includes('vídeo omitido')) return 'video';

    if (
      msgLower.includes('audio omitted') ||
      msgLower.endsWith('.m4a document omitted')
    )
      return 'audio';
    if (
      msgLower.includes('áudio ocultado') ||
      msgLower.endsWith('.m4a document omitted')
    )
      return 'audio';

    if (msgLower.includes('document omitted')) return 'document';
    if (msgLower.includes('documento omitido')) return 'document';

    if (msgLower.includes('pinned a message')) return 'pinned message';

    if (msgLower.startsWith('poll:')) return 'poll';

    if (
      msgLower.includes('this message was deleted') ||
      msgLower.includes('you deleted this message')
    )
      return 'deleted message';
    if (msgLower.includes('mensagem apagada')) return 'deleted message';

    return 'text';
  }

  // Parse the WhatsApp text content into an array of ChatMessage objects.
  private parseWhatsAppContent(textContent: string): ChatMessage[] {
    const messages: ChatMessage[] = [];

    // Define both patterns
    const bracketPattern =
      /\[(\d{2}\/\d{2}\/\d{2,4}),?\s(\d{2}:\d{2}:\d{2})\]\s(.*?):\s(.+)/g;
    const nonBracketPattern =
      /(\d{1,2}\/\d{1,2}\/\d{2}),\s(\d{1,2}:\d{2})\s-\s(.*?):\s(.+)/g;

    // Decide which pattern to use based on whether the text starts with '['
    const trimmedText = textContent.trim();
    const pattern = trimmedText.startsWith('[')
      ? bracketPattern
      : nonBracketPattern;

    let match: RegExpExecArray | null;

    while ((match = pattern.exec(textContent)) !== null) {
      const [, dateStr, timeStr, author, messageRaw] = match;
      // Remove the "<This message was edited>" text if present.
      const message = messageRaw
        .replace('<This message was edited>', '')
        .trim();

      // Parse the date (d/m/yy or dd/mm/yy) and adjust the year.
      const [day, month, yearStr] = dateStr.split('/');
      const year = (parseInt(yearStr) < 100 ? 20 : '') + yearStr;
      const monthIndex = parseInt(month, 10) - 1;

      let datetime: Date;
      // If using the bracket pattern, expect hh:mm:ss; otherwise hh:mm (assume seconds = 0)
      if (pattern === bracketPattern) {
        const [hour, minute, second] = timeStr
          .split(':')
          .map((v) => parseInt(v, 10));
        datetime = new Date(
          parseInt(year),
          monthIndex,
          parseInt(day, 10),
          hour,
          minute,
          second
        );
      } else {
        const [hour, minute] = timeStr.split(':').map((v) => parseInt(v, 10));
        datetime = new Date(
          parseInt(year),
          monthIndex,
          parseInt(day, 10),
          hour,
          minute,
          0
        );
      }

      const type = this.detectType(message);
      // Only keep text messages
      if (type !== 'text') {
        continue;
      }

      messages.push({
        datetime,
        author,
        message,
        type,
        dateStr,
        timeStr,
      });
    }

    return messages;
  }

  // Helper to convert an object of key-value pairs into an array of objects.
  private jsonize(
    data: { [key: string]: number },
    labels: [string, string] = ['key', 'count']
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ): any[] {
    return Object.entries(data).map(([key, count]) => ({
      [labels[0]]: key,
      [labels[1]]: count,
    }));
  }

  // Total number of text messages.
  public messagesCount(): number {
    return this.messages.length;
  }

  // Return an array of objects with message counts per month (formatted as "YYYY-MM").
  public messageCountPerMonth(): { month: string; count: number }[] {
    const counts: { [month: string]: number } = {};
    this.messages.forEach((msg) => {
      const year = msg.datetime.getFullYear();
      const month = (msg.datetime.getMonth() + 1).toString().padStart(2, '0');
      const key = `${year}-${month}`;
      counts[key] = (counts[key] || 0) + 1;
    });
    return this.jsonize(counts, ['month', 'count']);
  }

  // Return message counts per author.
  public messageCountPerAuthor(): { author: string; count: number }[] {
    const counts: { [author: string]: number } = {};
    this.messages.forEach((msg) => {
      counts[msg.author] = (counts[msg.author] || 0) + 1;
    });
    return this.jsonize(counts, ['author', 'count']);
  }

  // Count messages per hour of the day (0–23).
  public activityTimeOfDay(): { hour: string; count: number }[] {
    const counts: { [hour: string]: number } = {};
    this.messages.forEach((msg) => {
      const hour = msg.datetime.getHours(); // 0-23
      counts[hour] = (counts[hour] || 0) + 1;
    });
    const sortedKeys = Object.keys(counts).sort(
      (a, b) => parseInt(a) - parseInt(b)
    );
    const sortedCounts: { [hour: string]: number } = {};
    sortedKeys.forEach((key) => (sortedCounts[key] = counts[key]));
    return this.jsonize(sortedCounts, ['hour', 'count']);
  }

  // Count messages per day of the week (0 = Monday, ... 6 = Sunday).
  public activityDayOfWeek(): { day: string; count: number }[] {
    const counts: { [day: string]: number } = {};
    this.messages.forEach((msg) => {
      // Adjust JavaScript’s getDay() (0=Sunday) so that 0 becomes Monday.
      const jsDay = msg.datetime.getDay();
      const day = (jsDay + 6) % 7; // Now 0 = Monday, 6 = Sunday
      counts[day] = (counts[day] || 0) + 1;
    });
    const sortedKeys = Object.keys(counts).sort(
      (a, b) => parseInt(a) - parseInt(b)
    );
    const sortedCounts: { [day: string]: number } = {};
    sortedKeys.forEach((key) => (sortedCounts[key] = counts[key]));
    return this.jsonize(sortedCounts, ['day', 'count']);
  }

  // Return the most frequently occurring words across all messages.
  public mostFreqWords(): { word: string; count: number }[] {
    const counts: { [word: string]: number } = {};

    this.messages.forEach((msg) => {
      // Split the message into words based on non-word characters and filter out empties.
      let words = msg.message
        .toLowerCase()
        .replace(/[?!\,\.]/g, '')
        .split(' ')
        .filter(Boolean);

      // Remove stop words em português
      words = removeStopwords(words, por);

      words.forEach((word) => {
        counts[word] = (counts[word] || 0) + 1;
      });
    });

    const sortedEntries = Object.entries(counts).sort((a, b) => b[1] - a[1]);
    return sortedEntries.map(([word, count]) => ({ word, count }));
  }

  // Return the most frequent words for a specific author.
  public mostFreqWordsPerAuthor(
    author: string
  ): { word: string; count: number }[] {
    const counts: { [word: string]: number } = {};
    this.messages
      .filter((msg) => msg.author === author)
      .forEach((msg) => {
        const words = msg.message.toLowerCase().split(/\W+/).filter(Boolean);
        words.forEach((word) => {
          counts[word] = (counts[word] || 0) + 1;
        });
      });
    const sortedEntries = Object.entries(counts).sort((a, b) => b[1] - a[1]);
    return sortedEntries.map(([word, count]) => ({ word, count }));
  }

  // Count the number of "laugh" patterns (e.g. "hahaha" or "kkk") per author.
  public laughsPerAuthor(): { author: string; count: number }[] {
    const counts: { [author: string]: number } = {};
    this.messages.forEach((msg) => {
      const haMatches = msg.message.match(/(?:ha){2,}/gi);
      const kMatches = msg.message.match(/k{3,}/gi);
      const count =
        (haMatches ? haMatches.length : 0) + (kMatches ? kMatches.length : 0);
      counts[msg.author] = (counts[msg.author] || 0) + count;
    });
    return this.jsonize(counts, ['author', 'count']);
  }

  // Calculate the average length of laugh expressions per author for "ha" and "k" laughs.
  public laughsLengthPerAuthor(): {
    author: string;
    laugh_length_ha: number;
    laugh_length_k: number;
  }[] {
    const results: {
      [author: string]: {
        totalHa: number;
        countHa: number;
        totalK: number;
        countK: number;
      };
    } = {};

    this.messages.forEach((msg) => {
      const author = msg.author;
      if (!results[author]) {
        results[author] = { totalHa: 0, countHa: 0, totalK: 0, countK: 0 };
      }
      const haMatches = msg.message.match(/(?:ha){2,}/gi);
      const kMatches = msg.message.match(/k{3,}/gi);

      if (haMatches) {
        haMatches.forEach((match) => {
          results[author].totalHa += match.length;
          results[author].countHa += 1;
        });
      }
      if (kMatches) {
        kMatches.forEach((match) => {
          results[author].totalK += match.length;
          results[author].countK += 1;
        });
      }
    });

    return Object.entries(results).map(([author, data]) => ({
      author,
      laugh_length_ha: data.countHa ? data.totalHa / data.countHa : 0,
      laugh_length_k: data.countK ? data.totalK / data.countK : 0,
    }));
  }
  public messagesPerPersonPerMonth(): {
    month: string;
    [author: string]: number | string;
  }[] {
    const monthlyData: { [month: string]: { [author: string]: number } } = {};

    this.messages.forEach((msg) => {
      const year = msg.datetime.getFullYear();
      const month = (msg.datetime.getMonth() + 1).toString().padStart(2, '0');
      const key = `${year}-${month}`;
      const author = msg.author;

      if (!monthlyData[key]) {
        monthlyData[key] = {};
      }

      monthlyData[key][author] = (monthlyData[key][author] || 0) + 1;
    });

    // Convert to array of objects
    return Object.entries(monthlyData)
      .sort(([monthA], [monthB]) => monthA.localeCompare(monthB))
      .map(([month, authorCounts]) => {
        return { month, ...authorCounts };
      });
  }

  // Average response time per person (in seconds)
  public averageResponseTime(): { author: string; avgTime: number }[] {
    const responseTimes: { [author: string]: number[] } = {};
    const sortedMessages = [...this.messages].sort(
      (a, b) => a.datetime.getTime() - b.datetime.getTime()
    );

    // Calculate response times
    for (let i = 1; i < sortedMessages.length; i++) {
      const currentMsg = sortedMessages[i];
      const prevMsg = sortedMessages[i - 1];

      // Only consider responses between different authors
      if (currentMsg.author !== prevMsg.author) {
        const timeDiff =
          (currentMsg.datetime.getTime() - prevMsg.datetime.getTime()) / 1000; // in seconds

        // Filter out unreasonably long response times (e.g., > 24 hours)
        if (timeDiff <= 86400) {
          if (!responseTimes[currentMsg.author]) {
            responseTimes[currentMsg.author] = [];
          }
          responseTimes[currentMsg.author].push(timeDiff);
        }
      }
    }

    // Calculate average response time for each author
    return Object.entries(responseTimes).map(([author, times]) => {
      const avgTime = times.length
        ? times.reduce((sum, time) => sum + time, 0) / times.length
        : 0;
      return { author, avgTime };
    });
  }

  // Helper function to extract N-grams from text
  private extractNGrams(text: string, n: number): string[] {
    const words = text
      .toLowerCase()
      .replace(/[?!\,\.]/g, '')
      .split(' ')
      .filter(Boolean);

    const ngrams: string[] = [];
    for (let i = 0; i <= words.length - n; i++) {
      ngrams.push(words.slice(i, i + n).join(' '));
    }

    return ngrams;
  }

  // Most common n-gram phrases per person and overall
  public commonNGrams(
    n: number = 2,
    top: number = 10
  ): {
    author: string;
    ngrams: { phrase: string; count: number }[];
  }[] {
    const authorNGrams: { [author: string]: { [phrase: string]: number } } = {};
    const overallNGrams: { [phrase: string]: number } = {};

    // Calculate for each author and overall
    this.messages.forEach((msg) => {
      const ngrams = this.extractNGrams(msg.message, n);

      // Initialize author entry if not exists
      if (!authorNGrams[msg.author]) {
        authorNGrams[msg.author] = {};
      }

      // Count n-grams
      ngrams.forEach((phrase) => {
        authorNGrams[msg.author][phrase] =
          (authorNGrams[msg.author][phrase] || 0) + 1;
        overallNGrams[phrase] = (overallNGrams[phrase] || 0) + 1;
      });
    });

    // Process results for each author
    const results = Object.entries(authorNGrams).map(([author, phrases]) => {
      const sortedPhrases = Object.entries(phrases)
        .sort((a, b) => b[1] - a[1])
        .slice(0, top)
        .map(([phrase, count]) => ({ phrase, count }));

      return { author, ngrams: sortedPhrases };
    });

    // Add overall results
    const overallSorted = Object.entries(overallNGrams)
      .sort((a, b) => b[1] - a[1])
      .slice(0, top)
      .map(([phrase, count]) => ({ phrase, count }));

    results.push({ author: 'Overall', ngrams: overallSorted });

    return results;
  }

  // Most used emojis per person
  public mostUsedEmojis(): {
    author: string;
    emojis: { emoji: string; count: number }[];
  }[] {
    const authorEmojis: { [author: string]: { [emoji: string]: number } } = {};

    // Regex to match emojis
    const emojiRegex =
      /[\u{1F300}-\u{1F6FF}\u{1F900}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu;

    this.messages.forEach((msg) => {
      const emojis = msg.message.match(emojiRegex) || [];

      if (!authorEmojis[msg.author]) {
        authorEmojis[msg.author] = {};
      }

      emojis.forEach((emoji) => {
        authorEmojis[msg.author][emoji] =
          (authorEmojis[msg.author][emoji] || 0) + 1;
      });
    });

    // Convert to desired output format
    return Object.entries(authorEmojis).map(([author, emojiCounts]) => {
      const sortedEmojis = Object.entries(emojiCounts)
        .sort((a, b) => b[1] - a[1])
        .map(([emoji, count]) => ({ emoji, count }));

      return { author, emojis: sortedEmojis };
    });
  }

  // Who starts more conversations
  public conversationStarters(
    timeThreshold: number = 3600
  ): { author: string; count: number }[] {
    const starters: { [author: string]: number } = {};
    const sortedMessages = [...this.messages].sort(
      (a, b) => a.datetime.getTime() - b.datetime.getTime()
    );

    let lastMessageTime = new Date(0); // Initialize with epoch time

    sortedMessages.forEach((msg) => {
      // If more than timeThreshold seconds since the last message, consider it a new conversation
      const timeSinceLastMessage =
        (msg.datetime.getTime() - lastMessageTime.getTime()) / 1000;
      if (timeSinceLastMessage > timeThreshold) {
        starters[msg.author] = (starters[msg.author] || 0) + 1;
      }

      lastMessageTime = msg.datetime;
    });

    return Object.entries(starters)
      .sort((a, b) => b[1] - a[1])
      .map(([author, count]) => ({ author, count }));
  }

  // Enhanced version of laughsPerAuthor with more laugh patterns
  public enhancedLaughsPerAuthor(): { author: string; count: number }[] {
    const counts: { [author: string]: number } = {};

    this.messages.forEach((msg) => {
      // Match both 'hahaha', 'kkk', and other common laugh patterns
      const haMatches = msg.message.match(/(?:ha){2,}/gi);
      const kMatches = msg.message.match(/k{3,}/gi);
      const lolMatches = msg.message.match(/(?:lo+l|lma+o|rofl)/gi);
      const rsMatches = msg.message.match(/(?:rs+|hue+|heh+)/gi);

      const count =
        (haMatches ? haMatches.length : 0) +
        (kMatches ? kMatches.length : 0) +
        (lolMatches ? lolMatches.length : 0) +
        (rsMatches ? rsMatches.length : 0);

      counts[msg.author] = (counts[msg.author] || 0) + count;
    });

    return this.jsonize(counts, ['author', 'count']);
  }

  // Comprehensive analysis method that returns all data
  public analyze(): AnalyzedData {
    return {
      totalMessages: this.messagesCount(),
      messagesPerMonth: this.messageCountPerMonth(),
      messagesPerAuthor: this.messageCountPerAuthor(),
      activityByHour: this.activityTimeOfDay(),
      activityByDay: this.activityDayOfWeek(),
      frequentWords: this.mostFreqWords(),
      laughs: this.enhancedLaughsPerAuthor(),
      messagesPerPersonPerMonth: this.messagesPerPersonPerMonth(),
      averageResponseTime: this.averageResponseTime(),
      commonNGrams: this.commonNGrams(2, 10), // Bigrams by default
      messagesPerDayOfWeek: this.activityDayOfWeek(),
      emojisPerPerson: this.mostUsedEmojis(),
      conversationStarters: this.conversationStarters(),
    };
  }
}
