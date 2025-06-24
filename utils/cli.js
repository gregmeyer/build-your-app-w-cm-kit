#!/usr/bin/env node

const path = require('path');
const fs = require('fs');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
};

// Available commands
const commands = {
  'session-start': require('./commands/session-start'),
  'session-wrapup': require('./commands/session-wrapup'),
  'status-report': require('./commands/status-report'),
  'list-tickets': require('./commands/list-tickets'),
  'list-stories': require('./commands/list-stories'),
  'list-issues': require('./commands/list-issues'),
  'validate-structure': require('./commands/validate-structure'),
  'validate-docs': require('./commands/validate-docs'),
  'check-deps': require('./commands/check-deps'),
  'pick-ticket': require('./commands/pick-ticket'),
  'pick-story': require('./commands/pick-story'),
  'update-ticket': require('./commands/update-ticket'),
  'test': require('./commands/test'),
  'qa-test': require('./commands/qa-test'),
  'sprint-report': require('./commands/sprint-report'),
  'archive-project': require('./commands/archive-project'),
  'remove-demo': require('./commands/remove-demo'),
  'restore-demo': require('./commands/restore-demo'),
};

// Parse command line arguments
function parseArgs() {
  const args = process.argv.slice(2);
  const command = args[0];
  const options = {};

  for (let i = 1; i < args.length; i++) {
    const arg = args[i];
    if (arg.startsWith('--')) {
      const [key, value] = arg.slice(2).split('=');
      options[key] = value || true;
    }
  }

  return { command, options };
}

// Display help information
function showHelp() {
  console.log(`${colors.bright}${colors.blue}Project CLI${colors.reset}\n`);
  console.log('Available commands:\n');

  Object.entries(commands).forEach(([name, cmd]) => {
    console.log(`${colors.cyan}${name}${colors.reset} - ${cmd.description}`);
  });

  console.log('\nExamples:');
  console.log('  node utils/cli.js session-start');
  console.log('  node utils/cli.js status-report');
  console.log('  node utils/cli.js check-deps');
  console.log('  node utils/cli.js pick-ticket');
}

// Main CLI function
async function main() {
  const { command, options } = parseArgs();

  if (!command || command === 'help' || command === '--help' || command === '-h') {
    showHelp();
    return;
  }

  if (!commands[command]) {
    console.error(`${colors.red}Error: Unknown command '${command}'${colors.reset}`);
    console.log(`Run 'node utils/cli.js help' to see available commands.`);
    process.exit(1);
  }

  try {
    console.log(`${colors.bright}${colors.blue}Running: ${command}${colors.reset}\n`);
    await commands[command].run(options);
    console.log(`\n${colors.green}✅ Command '${command}' completed successfully${colors.reset}`);
  } catch (error) {
    console.error(`\n${colors.red}❌ Command '${command}' failed:${colors.reset}`);
    console.error(error.message);
    process.exit(1);
  }
}

main().catch(console.error);