#!/usr/bin/env bash

expectedCoverage=90

npm run lint && \
npm run cover-cobertura && \
npm run diff-cover 2>/dev/null | \
tail -n 2 | head -n 1 \
| sed 's/^Coverage: \([0-9]*\)%$/\1/' | \
{ \
    read realCoverage; \
    if [ "$realCoverage" -lt "$expectedCoverage" ]; then \
        exit -1; \
    else \
        exit 0; \
    fi \
}
