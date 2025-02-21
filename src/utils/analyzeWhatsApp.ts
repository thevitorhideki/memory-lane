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
  laughs: { author: string; laugh_count: number }[];
}

export class AnalyzeWhatsApp {
  private messages: ChatMessage[];

  constructor(textContent: string) {
    this.messages = this.parseWhatsAppContent(textContent);
  }

  // Detect the type of message based on its content.
  private detectType(message: string): string {
    const msgLower = message.toLowerCase();
    if (msgLower.startsWith('location: https://maps.google.com/'))
      return 'location';
    if (msgLower.includes('video call')) return 'video call';
    if (msgLower.includes('voice call')) return 'voice call';
    if (msgLower.includes('group call')) return 'group call';
    if (msgLower.includes('contact card omitted')) return 'contact';
    if (msgLower.includes('sticker omitted')) return 'sticker';
    if (msgLower.includes('gif omitted')) return 'gif';
    if (msgLower.includes('image omitted')) return 'image';
    if (msgLower.includes('video omitted')) return 'video';
    if (
      msgLower.includes('audio omitted') ||
      msgLower.endsWith('.m4a document omitted')
    )
      return 'audio';
    if (msgLower.includes('document omitted')) return 'document';
    if (msgLower.includes('pinned a message')) return 'pinned message';
    if (msgLower.startsWith('poll:')) return 'poll';
    if (
      msgLower.includes('this message was deleted') ||
      msgLower.includes('you deleted this message')
    )
      return 'deleted message';
    if (
      msgLower.includes('turned on disappearing messages') ||
      msgLower.includes('turned off disappearing messages')
    )
      return 'disappearing message notification';
    if (msgLower.includes('messages and calls are end-to-end encrypted'))
      return 'encryption notice';
    if (msgLower.includes('only messages that mention @meta ai'))
      return 'meta ai notice';
    if (msgLower.endsWith('<this message was edited>')) return 'text'; // Edited text message
    return 'text'; // Default to text if no other match
  }

  // Parse the WhatsApp text content into an array of ChatMessage objects.
  private parseWhatsAppContent(textContent: string): ChatMessage[] {
    const messages: ChatMessage[] = [];

    // Define both patterns
    const bracketPattern =
      /\[(\d{2}\/\d{2}\/\d{2}),?\s(\d{2}:\d{2}:\d{2})\]\s(.*?):\s(.+)/g;
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
      const year =
        parseInt(yearStr, 10) + (parseInt(yearStr, 10) < 50 ? 2000 : 1900);
      const monthIndex = parseInt(month, 10) - 1;

      let datetime: Date;
      // If using the bracket pattern, expect hh:mm:ss; otherwise hh:mm (assume seconds = 0)
      if (pattern === bracketPattern) {
        const [hour, minute, second] = timeStr
          .split(':')
          .map((v) => parseInt(v, 10));
        datetime = new Date(
          year,
          monthIndex,
          parseInt(day, 10),
          hour,
          minute,
          second
        );
      } else {
        const [hour, minute] = timeStr.split(':').map((v) => parseInt(v, 10));
        datetime = new Date(
          year,
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
      const words = msg.message.toLowerCase().split(/\W+/).filter(Boolean);
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
  public laughsPerAuthor(): { author: string; laugh_count: number }[] {
    const counts: { [author: string]: number } = {};
    this.messages.forEach((msg) => {
      const haMatches = msg.message.match(/(?:ha){2,}/gi);
      const kMatches = msg.message.match(/k{3,}/gi);
      const count =
        (haMatches ? haMatches.length : 0) + (kMatches ? kMatches.length : 0);
      counts[msg.author] = (counts[msg.author] || 0) + count;
    });
    return this.jsonize(counts, ['author', 'laugh_count']);
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
}
