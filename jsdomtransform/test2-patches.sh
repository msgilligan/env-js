#!/bin/sh
mkdir -p test-output
./JSDomTransform.sh dom-addclass.js test-input/test.svg test-output/test-addclass.svg env-rhino-patched.js

