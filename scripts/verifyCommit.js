/* eslint no-console: 0 */
const chalk = require('chalk');
const msgPath = process.env.GIT_PARAMS;
const msg = require('fs')
    .readFileSync(msgPath, 'utf-8')
    .trim();

const commitRE = /^(revert: |Merge.+)|(feat|fix|docs|dx|style|refactor|perf|test|workflow|build|chore|types|wip|merge)(\(.+\))?: .+/;

if (!commitRE.test(msg)) {
    console.error(`  ${chalk.bgRed.white(' ERROR ')} ${chalk.red('invalid commit message format.')}\n\n`);
    process.exit(1);
}
