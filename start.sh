#!/bin/bash
pwd

pm2 start server --name "dataQuent" --max-memory-restart 1000M

tail -f /dev/null