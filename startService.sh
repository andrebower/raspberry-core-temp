#!/bin/bash
killall node
cd core-temp-service/
node tempservice.js  2>&1 > logfile &
