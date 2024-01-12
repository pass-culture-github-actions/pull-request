# Google Cloud Storage or Azure Cache Action

This action will retrieve PR informations.

- URL
- Title
- Number

## Usage

> workflow.yml

```yaml
- name: Get PR information
  id: pr
  uses: pass-culture-github-actions/pull-request@v1.0.0
- run: echo url="${{ steps.pr.outputs.url }}"
- run: echo title="${{ steps.pr.outputs.title }}"
- run: echo number="${{ steps.pr.outputs.number }}"

```

## Outputs

### `url`

The url of the PR

### `title`

The title of the PR

### `number`

The title of the PR
