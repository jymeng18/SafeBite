// to detect errors and timestamp
export class Logger {
  // Formats messages with timestamp and level
  private static formatMessage(level: string, message: string): string {
    const timestamp = new Date().toISOString();
    return `[${timestamp}] [${level. toUpperCase()}] ${message}`;
  }

  // For general information
  static info(message: string): void {
    console.log(this.formatMessage('info', message));
  }

  // For errors
  static error(message: string, error?: any): void {
    console.error(this.formatMessage('error', message));
    if (error) {
      console.error(error);
    }
  }

  // For warnings
  static warn(message: string): void {
    console.warn(this.formatMessage('warn', message));
  }

  // For debugging (only in development)
  static debug(message: string): void {
    if (process.env.NODE_ENV === 'development') {
      console.debug(this.formatMessage('debug', message));
    }
  }
}
