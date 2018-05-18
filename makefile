
# env argument default value is dev
env := dev

server:
	node node_modules/webpack-dev-server/bin/webpack-dev-server --config ./webpack.config.js --env $(env)

build:
	node node_modules/webpack/bin/webpack --config ./webpack.config.js --env $(env)
