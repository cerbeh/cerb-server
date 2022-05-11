const shell = require('shelljs');

if (!shell.which('git')) {
  shell.echo('Sorry, this script requires git');
  shell.exit(1);
}

const repositories = [
  'WDI-Project-One'
];

shell.echo('Beginning Front end fetch and builds');

const cloneRepo = repoName => {
  shell.echo(`cloning repo ${repoName} into './ui/${repoName}'`);
  shell.exec(`git submodule add https://github.com/cerbeh/${repoName}.git ./ui/${repoName}`);
};

repositories.forEach(cloneRepo);
