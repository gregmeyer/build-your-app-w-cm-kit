const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

module.exports = {
  description: 'Generate a comprehensive sprint report',
  run: async (options) => {
    console.log('📊 Sprint Report Generator');
    console.log('============================================================');
    
    const projectRoot = process.cwd();
    const report = {
      timestamp: new Date().toISOString(),
      project: 'CM Kit Next.js Application',
      sprint: getCurrentSprint(),
      summary: {},
      tickets: [],
      stories: [],
      issues: [],
      metrics: {},
      recommendations: []
    };

    try {
      // 1. Project Overview
      console.log('📋 Gathering project overview...');
      report.summary = await getProjectOverview(projectRoot);

      // 2. Tickets Analysis
      console.log('🎫 Analyzing tickets...');
      report.tickets = await getTicketsAnalysis(projectRoot);

      // 3. Stories Analysis  
      console.log('📖 Analyzing user stories...');
      report.stories = await getStoriesAnalysis(projectRoot);

      // 4. Issues Analysis
      console.log('🐛 Analyzing issues...');
      report.issues = await getIssuesAnalysis(projectRoot);

      // 5. Development Metrics
      console.log('📈 Calculating development metrics...');
      report.metrics = await getDevelopmentMetrics(projectRoot);

      // 6. Generate Recommendations
      console.log('💡 Generating recommendations...');
      report.recommendations = generateRecommendations(report);

      // 7. Display Report
      displaySprintReport(report);

      // 8. Save Report
      await saveSprintReport(report, projectRoot);

    } catch (error) {
      console.error('❌ Sprint report generation failed:', error.message);
    }

    console.log('============================================================');
  }
};

function getCurrentSprint() {
  const now = new Date();
  const year = now.getFullYear();
  const week = Math.ceil((now.getDate() + new Date(now.getFullYear(), 0, 1).getDay()) / 7);
  return `Sprint ${year}-W${week}`;
}

async function getProjectOverview(projectRoot) {
  const packageJson = JSON.parse(fs.readFileSync(path.join(projectRoot, 'package.json'), 'utf8'));
  const agentContext = fs.readFileSync(path.join(projectRoot, 'tickets/AGENT-CONTEXT.md'), 'utf8');
  
  return {
    name: packageJson.name,
    version: packageJson.version,
    description: packageJson.description,
    technologies: extractTechnologies(agentContext),
    lastUpdated: new Date().toISOString(),
    status: 'Active Development'
  };
}

function extractTechnologies(context) {
  const techMatch = context.match(/## Key Technologies\n\n([\s\S]*?)(?=\n##|$)/);
  if (techMatch) {
    return techMatch[1].split('\n').filter(line => line.trim().startsWith('-')).map(line => line.replace('- ', '').trim());
  }
  return ['Next.js 15', 'TypeScript', 'Tailwind CSS', 'React 18+'];
}

async function getTicketsAnalysis(projectRoot) {
  const ticketsDir = path.join(projectRoot, 'tickets');
  const tickets = [];
  
  if (fs.existsSync(ticketsDir)) {
    const files = fs.readdirSync(ticketsDir).filter(file => file.endsWith('.md') && file !== 'AGENT-CONTEXT.md');
    
    for (const file of files) {
      const content = fs.readFileSync(path.join(ticketsDir, file), 'utf8');
      const ticket = parseTicketFile(content, file);
      tickets.push(ticket);
    }
  }
  
  return {
    total: tickets.length,
    byStatus: groupByStatus(tickets),
    byPriority: groupByPriority(tickets),
    tickets: tickets
  };
}

function parseTicketFile(content, filename) {
  const lines = content.split('\n');
  const ticket = {
    id: filename.replace('.md', ''),
    title: '',
    status: 'Unknown',
    priority: 'Medium',
    assignee: '',
    created: '',
    description: ''
  };

  for (const line of lines) {
    if (line.startsWith('# ')) {
      ticket.title = line.replace('# ', '').trim();
    } else if (line.startsWith('**Status:**')) {
      ticket.status = line.replace('**Status:**', '').trim();
    } else if (line.startsWith('**Priority:**')) {
      ticket.priority = line.replace('**Priority:**', '').trim();
    } else if (line.startsWith('**Assignee:**')) {
      ticket.assignee = line.replace('**Assignee:**', '').trim();
    } else if (line.startsWith('**Created:**')) {
      ticket.created = line.replace('**Created:**', '').trim();
    }
  }

  return ticket;
}

function groupByStatus(tickets) {
  return tickets.reduce((acc, ticket) => {
    acc[ticket.status] = (acc[ticket.status] || 0) + 1;
    return acc;
  }, {});
}

function groupByPriority(tickets) {
  return tickets.reduce((acc, ticket) => {
    acc[ticket.priority] = (acc[ticket.priority] || 0) + 1;
    return acc;
  }, {});
}

async function getStoriesAnalysis(projectRoot) {
  const storiesDir = path.join(projectRoot, 'stories');
  const stories = [];
  
  if (fs.existsSync(storiesDir)) {
    const files = fs.readdirSync(storiesDir).filter(file => file.endsWith('.md'));
    
    for (const file of files) {
      const content = fs.readFileSync(path.join(storiesDir, file), 'utf8');
      const story = parseStoryFile(content, file);
      stories.push(story);
    }
  }
  
  return {
    total: stories.length,
    byStatus: groupByStatus(stories),
    stories: stories
  };
}

function parseStoryFile(content, filename) {
  const lines = content.split('\n');
  const story = {
    id: filename.replace('.md', ''),
    title: '',
    status: 'Unknown',
    points: 0,
    description: ''
  };

  for (const line of lines) {
    if (line.startsWith('# ')) {
      story.title = line.replace('# ', '').trim();
    } else if (line.startsWith('**Status:**')) {
      story.status = line.replace('**Status:**', '').trim();
    } else if (line.startsWith('**Story Points:**')) {
      story.points = parseInt(line.replace('**Story Points:**', '').trim()) || 0;
    }
  }

  return story;
}

async function getIssuesAnalysis(projectRoot) {
  const issuesDir = path.join(projectRoot, 'issues');
  const issues = [];
  
  if (fs.existsSync(issuesDir)) {
    const files = fs.readdirSync(issuesDir).filter(file => file.endsWith('.md'));
    
    for (const file of files) {
      const content = fs.readFileSync(path.join(issuesDir, file), 'utf8');
      const issue = parseIssueFile(content, file);
      issues.push(issue);
    }
  }
  
  return {
    total: issues.length,
    bySeverity: groupBySeverity(issues),
    issues: issues
  };
}

function parseIssueFile(content, filename) {
  const lines = content.split('\n');
  const issue = {
    id: filename.replace('.md', ''),
    title: '',
    severity: 'Medium',
    status: 'Open',
    description: ''
  };

  for (const line of lines) {
    if (line.startsWith('# ')) {
      issue.title = line.replace('# ', '').trim();
    } else if (line.startsWith('**Severity:**')) {
      issue.severity = line.replace('**Severity:**', '').trim();
    } else if (line.startsWith('**Status:**')) {
      issue.status = line.replace('**Status:**', '').trim();
    }
  }

  return issue;
}

function groupBySeverity(issues) {
  return issues.reduce((acc, issue) => {
    acc[issue.severity] = (acc[issue.severity] || 0) + 1;
    return acc;
  }, {});
}

async function getDevelopmentMetrics(projectRoot) {
  try {
    // Git metrics
    const gitStats = getGitStats(projectRoot);
    
    // File metrics
    const fileStats = getFileStats(projectRoot);
    
    // Test metrics
    const testStats = await getTestStats(projectRoot);
    
    return {
      git: gitStats,
      files: fileStats,
      tests: testStats
    };
  } catch (error) {
    return {
      git: { error: error.message },
      files: {},
      tests: {}
    };
  }
}

function getGitStats(projectRoot) {
  try {
    const commitCount = execSync('git rev-list --count HEAD', { cwd: projectRoot, encoding: 'utf8' }).trim();
    const lastCommit = execSync('git log -1 --format="%h - %s (%cr)"', { cwd: projectRoot, encoding: 'utf8' }).trim();
    const branch = execSync('git branch --show-current', { cwd: projectRoot, encoding: 'utf8' }).trim();
    
    return {
      totalCommits: parseInt(commitCount),
      lastCommit,
      currentBranch: branch,
      hasUncommittedChanges: hasUncommittedChanges(projectRoot)
    };
  } catch (error) {
    return { error: 'Git not available' };
  }
}

function hasUncommittedChanges(projectRoot) {
  try {
    const status = execSync('git status --porcelain', { cwd: projectRoot, encoding: 'utf8' });
    return status.trim().length > 0;
  } catch {
    return false;
  }
}

function getFileStats(projectRoot) {
  const stats = {
    totalFiles: 0,
    byType: {},
    byDirectory: {}
  };

  function countFiles(dir) {
    const items = fs.readdirSync(dir);
    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules') {
        stats.byDirectory[item] = 0;
        countFiles(fullPath);
      } else if (stat.isFile()) {
        stats.totalFiles++;
        const ext = path.extname(item);
        stats.byType[ext] = (stats.byType[ext] || 0) + 1;
        
        const parentDir = path.basename(path.dirname(fullPath));
        if (stats.byDirectory[parentDir] !== undefined) {
          stats.byDirectory[parentDir]++;
        }
      }
    }
  }

  countFiles(projectRoot);
  return stats;
}

async function getTestStats(projectRoot) {
  try {
    const testFiles = fs.readdirSync(path.join(projectRoot, 'tests')).filter(file => file.endsWith('.test.js') || file.endsWith('.spec.js'));
    return {
      totalTestFiles: testFiles.length,
      hasJestConfig: fs.existsSync(path.join(projectRoot, 'jest.config.js')),
      hasPlaywrightConfig: fs.existsSync(path.join(projectRoot, 'playwright.config.js'))
    };
  } catch {
    return { totalTestFiles: 0 };
  }
}

function generateRecommendations(report) {
  const recommendations = [];

  // Ticket recommendations
  if (report.tickets.total === 0) {
    recommendations.push('Create initial tickets for project planning');
  }
  
  if (report.tickets.byStatus['In Progress'] > 5) {
    recommendations.push('Consider reducing work in progress to improve focus');
  }

  // Story recommendations
  if (report.stories.total === 0) {
    recommendations.push('Add user stories to define feature requirements');
  }

  // Issue recommendations
  if (report.issues.total > 0) {
    recommendations.push('Address open issues to maintain code quality');
  }

  // Git recommendations
  if (report.metrics.git.hasUncommittedChanges) {
    recommendations.push('Commit pending changes to maintain clean repository state');
  }

  // Test recommendations
  if (report.metrics.tests.totalTestFiles === 0) {
    recommendations.push('Add unit tests to ensure code reliability');
  }

  return recommendations;
}

function displaySprintReport(report) {
  console.log('\n📊 SPRINT REPORT');
  console.log('============================================================');
  console.log(`Sprint: ${report.sprint}`);
  console.log(`Generated: ${new Date(report.timestamp).toLocaleString()}`);
  console.log(`Project: ${report.summary.name} v${report.summary.version}`);
  
  console.log('\n📋 PROJECT OVERVIEW');
  console.log('------------------------------------------------------------');
  console.log(`Technologies: ${report.summary.technologies.join(', ')}`);
  console.log(`Status: ${report.summary.status}`);
  
  console.log('\n🎫 TICKETS SUMMARY');
  console.log('------------------------------------------------------------');
  console.log(`Total Tickets: ${report.tickets.total}`);
  if (report.tickets.byStatus) {
    Object.entries(report.tickets.byStatus).forEach(([status, count]) => {
      console.log(`  ${status}: ${count}`);
    });
  }
  
  console.log('\n📖 STORIES SUMMARY');
  console.log('------------------------------------------------------------');
  console.log(`Total Stories: ${report.stories.total}`);
  if (report.stories.byStatus) {
    Object.entries(report.stories.byStatus).forEach(([status, count]) => {
      console.log(`  ${status}: ${count}`);
    });
  }
  
  console.log('\n🐛 ISSUES SUMMARY');
  console.log('------------------------------------------------------------');
  console.log(`Total Issues: ${report.issues.total}`);
  if (report.issues.bySeverity) {
    Object.entries(report.issues.bySeverity).forEach(([severity, count]) => {
      console.log(`  ${severity}: ${count}`);
    });
  }
  
  console.log('\n📈 DEVELOPMENT METRICS');
  console.log('------------------------------------------------------------');
  if (report.metrics.git.error) {
    console.log(`Git: ${report.metrics.git.error}`);
  } else {
    console.log(`Git Commits: ${report.metrics.git.totalCommits}`);
    console.log(`Current Branch: ${report.metrics.git.currentBranch}`);
    console.log(`Uncommitted Changes: ${report.metrics.git.hasUncommittedChanges ? 'Yes' : 'No'}`);
  }
  console.log(`Total Files: ${report.metrics.files.totalFiles}`);
  console.log(`Test Files: ${report.metrics.tests.totalTestFiles}`);
  
  console.log('\n💡 RECOMMENDATIONS');
  console.log('------------------------------------------------------------');
  if (report.recommendations.length === 0) {
    console.log('✅ No immediate recommendations - project is in good shape!');
  } else {
    report.recommendations.forEach((rec, index) => {
      console.log(`${index + 1}. ${rec}`);
    });
  }
}

async function saveSprintReport(report, projectRoot) {
  const reportsDir = path.join(projectRoot, 'reports');
  if (!fs.existsSync(reportsDir)) {
    fs.mkdirSync(reportsDir);
  }
  
  const filename = `sprint-report-${report.sprint.replace(/\s+/g, '-').toLowerCase()}.json`;
  const filepath = path.join(reportsDir, filename);
  
  fs.writeFileSync(filepath, JSON.stringify(report, null, 2));
  console.log(`\n💾 Report saved to: ${filepath}`);
} 