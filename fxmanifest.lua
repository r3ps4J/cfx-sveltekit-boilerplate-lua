fx_version "cerulean"
games { "gta5", "rdr3" }
lua54 "yes"

description "Basic SvelteKit & Lua boilerplate"
author "r3ps4J"
version "1.0.0"
repository "https://github.com/r3ps4J/cfx-sveltekit-boilerplate-lua"

client_script "client/**/*.lua"
server_script "server/**/*.lua"

ui_page "web/build/index.html"

files {
    "web/build/index.html",
    "web/build/**/*",
}
