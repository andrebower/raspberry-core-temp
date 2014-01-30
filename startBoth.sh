#!/bin/bash
node core-temp-service/tempservice.js  2>&1 > core-temp-service/logfile &
node core-temp-server/app.js 2>&1 > core-temp-server/logfile &