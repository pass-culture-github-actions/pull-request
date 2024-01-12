const core = require('@actions/core');
const github = require('@actions/github');
const { exec } = require('child_process');

try {
  const token = core.getInput('github-oauth-token');
  const { GITHUB_REPOSITORY, GITHUB_SHA } = process.env;
  const curlOptions = `-s -H "Accept: application/vnd.github.groot-preview+json" -H "Authorization: token ${token}"`
  const commandPrNumber = `curl ${curlOptions} https://api.github.com/repos/${GITHUB_REPOSITORY}/commits/${GITHUB_SHA}/pulls`;
  exec(commandPrNumber, (errPulls, pulls, stderrPulls) => {
    if (errPulls) {
      throw errPulls;
    }
    const jsonPulls = JSON.parse(pulls);
    if (jsonPulls && jsonPulls[0] && jsonPulls[0].number) {
      const number = jsonPulls[0].number;

      core.setOutput("number", number);
      const commandPr = `curl ${curlOptions} https://api.github.com/repos/${GITHUB_REPOSITORY}/pulls/${number}`;
      exec(commandPr, (err, pr, stderr) => {
        if (err) {
          throw err;
        }

        const json = JSON.parse(pr);

        core.setOutput("title", json.title);
        core.setOutput("url", json.html_url);
      })
    }
  });
} catch (error) {
  core.setFailed(error.message);
}
