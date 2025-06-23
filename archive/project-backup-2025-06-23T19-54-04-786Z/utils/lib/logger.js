const fs = require('fs');
const path = require('path');

class Logger {
  constructor(options = {}) {
    this.logLevel = options.logLevel || 'info';
    this.logFile = options.logFile || path.join(process.cwd(), 'logs', 'cli.log');
    this.consoleOutput = options.consoleOutput !== false;
    this.timestamp = options.timestamp !== false;
    this.sessionId = this.generateSessionId();
    // Ensure logs directory exists
    const logsDir = path.dirname(this.logFile);
    if (!fs.existsSync(logsDir)) {
      fs.mkdirSync(logsDir, { recursive: true });
    }
  }
  generateSessionId() {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
  getSessionId() {
    return this.sessionId;
  }
  log(level, message, data = {}) {
    const timestamp = new Date().toISOString();
    const logEntry = {
      timestamp,
      level,
      message,
      sessionId: this.sessionId,
      ...data
    };
    const logString = JSON.stringify(logEntry) + '\n';
    if (this.consoleOutput) {
      console.log(`[${timestamp}] [${level.toUpperCase()}] ${message}`);
    }
    fs.appendFileSync(this.logFile, logString);
  }
  info(message, data) {
    this.log('info', message, data);
  }
  error(message, data) {
    this.log('error', message, data);
  }
  command(message, data) {
    this.log('command', message, data);
  }
  performance(message, duration) {
    this.log('performance', message, { duration });
  }
}

module.exports = Logger; 