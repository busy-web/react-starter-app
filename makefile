
# env argument default value is dev
env := dev
#port := 4200

server:
	node node_modules/webpack-dev-server/bin/webpack-dev-server --config config/webpack.$(env).js

#--port $(port) --hot

build:
	node node_modules/webpack/bin/webpack --config config/webpack.$(env).js
