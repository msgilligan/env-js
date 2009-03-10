#!/bin/sh
mkdir -p test-output
./JSDomTransform.sh dom-noop.js test-input/test.svg test-output/test-noop.svg env-rhino-patched.js
