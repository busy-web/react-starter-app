#!/bin/sh

hasDir=false

GRAY='\033[1;30m'
RED='\033[1;31m'
BLUE='\033[1;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

while true; do
	read -t 1 input
	if [[ $input = 'q' ]]; then
		break
	else
		if [ -d "dist" ]; then
			if [ $hasDir = false ]; then
				hasDir=true
				clear

				echo "\n"
				echo "${GRAY}"
				printf '%*s\n' "${COLUMNS:-$(tput cols)}" '' | tr ' ' _
				echo "${NC}"
				echo "\n"

				echo "${YELLOW}ls dist: =>${NC}"
				echo "${BLUE}"
				printf '%*s\n' "${COLUMNS:-$(tput cols)}" '' | tr ' ' -
				echo "${NC}"

				ls -alG dist

				echo "\n\n"

				echo "${YELLOW}ls dist/assets: =>${NC}"
				echo "${BLUE}"
				printf '%*s\n' "${COLUMNS:-$(tput cols)}" '' | tr ' ' -
				echo "${NC}"

				ls -alG dist/assets

				echo "\n"
				echo "${GRAY}"
				printf '%*s\n' "${COLUMNS:-$(tput cols)}" '' | tr ' ' _
				echo "${NC}"
				echo "\n"
			fi
		else
			if [ $hasDir = true ]; then
				hasDir=false
			fi
		fi
		#echo ls -d ./ | entr -d 'ls -al dist'
	fi
done
