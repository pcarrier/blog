---
title: "Trick: catching FIXMEs"
date: 2025-04-07
prism: true
---

Add `FIXME` comments on code that's not ready to be committed, or never should be.

Make sure not to merge them by failing a CI job.  
If you want them to go through, turn them into `TODO`s.

Example with GitHub Actions:

```yaml
name: Leftover FIX\MEs

on:
  pull_request:
    branches:
      - main

jobs:
  scan:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: |
          set +e
          git grep FIX\ME -- ':(exclude)**/vendor/**'
          if [[ $? -eq 0 ]]; then
            echo 'Found FIX\MEs'
            exit 1
          fi
```

Acquired from [David Glasser](https://www.linkedin.com/in/david-glasser-a89ba1114/).
