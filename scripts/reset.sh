#!/bin/bash
# reset.sh
# Author: Alexander Burdiss
# Since: 2/4/22
# Version: 1.0.0
# Description: Does a basic reset of a React Native project

watchman watch-del-all
npm start -- --reset-cache
