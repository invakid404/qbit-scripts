oclif-hello-world
=================

oclif example Hello World CLI

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/oclif-hello-world.svg)](https://npmjs.org/package/oclif-hello-world)
[![CircleCI](https://circleci.com/gh/oclif/hello-world/tree/main.svg?style=shield)](https://circleci.com/gh/oclif/hello-world/tree/main)
[![Downloads/week](https://img.shields.io/npm/dw/oclif-hello-world.svg)](https://npmjs.org/package/oclif-hello-world)
[![License](https://img.shields.io/npm/l/oclif-hello-world.svg)](https://github.com/oclif/hello-world/blob/main/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g qbit-scripts
$ qbit-scripts COMMAND
running command...
$ qbit-scripts (--version)
qbit-scripts/0.0.0 linux-x64 node-v18.8.0
$ qbit-scripts --help [COMMAND]
USAGE
  $ qbit-scripts COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`qbit-scripts hello PERSON`](#qbit-scripts-hello-person)
* [`qbit-scripts hello world`](#qbit-scripts-hello-world)
* [`qbit-scripts help [COMMAND]`](#qbit-scripts-help-command)
* [`qbit-scripts plugins`](#qbit-scripts-plugins)
* [`qbit-scripts plugins:install PLUGIN...`](#qbit-scripts-pluginsinstall-plugin)
* [`qbit-scripts plugins:inspect PLUGIN...`](#qbit-scripts-pluginsinspect-plugin)
* [`qbit-scripts plugins:install PLUGIN...`](#qbit-scripts-pluginsinstall-plugin-1)
* [`qbit-scripts plugins:link PLUGIN`](#qbit-scripts-pluginslink-plugin)
* [`qbit-scripts plugins:uninstall PLUGIN...`](#qbit-scripts-pluginsuninstall-plugin)
* [`qbit-scripts plugins:uninstall PLUGIN...`](#qbit-scripts-pluginsuninstall-plugin-1)
* [`qbit-scripts plugins:uninstall PLUGIN...`](#qbit-scripts-pluginsuninstall-plugin-2)
* [`qbit-scripts plugins update`](#qbit-scripts-plugins-update)

## `qbit-scripts hello PERSON`

Say hello

```
USAGE
  $ qbit-scripts hello [PERSON] -f <value>

ARGUMENTS
  PERSON  Person to say hello to

FLAGS
  -f, --from=<value>  (required) Who is saying hello

DESCRIPTION
  Say hello

EXAMPLES
  $ oex hello friend --from oclif
  hello friend from oclif! (./src/commands/hello/index.ts)
```

_See code: [dist/commands/hello/index.ts](https://github.com/invakid404/qbit-scripts/blob/v0.0.0/dist/commands/hello/index.ts)_

## `qbit-scripts hello world`

Say hello world

```
USAGE
  $ qbit-scripts hello world

DESCRIPTION
  Say hello world

EXAMPLES
  $ qbit-scripts hello world
  hello world! (./src/commands/hello/world.ts)
```

## `qbit-scripts help [COMMAND]`

Display help for qbit-scripts.

```
USAGE
  $ qbit-scripts help [COMMAND] [-n]

ARGUMENTS
  COMMAND  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for qbit-scripts.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v5.1.15/src/commands/help.ts)_

## `qbit-scripts plugins`

List installed plugins.

```
USAGE
  $ qbit-scripts plugins [--core]

FLAGS
  --core  Show core plugins.

DESCRIPTION
  List installed plugins.

EXAMPLES
  $ qbit-scripts plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v2.1.4/src/commands/plugins/index.ts)_

## `qbit-scripts plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ qbit-scripts plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.
  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.


ALIASES
  $ qbit-scripts plugins add

EXAMPLES
  $ qbit-scripts plugins:install myplugin 

  $ qbit-scripts plugins:install https://github.com/someuser/someplugin

  $ qbit-scripts plugins:install someuser/someplugin
```

## `qbit-scripts plugins:inspect PLUGIN...`

Displays installation properties of a plugin.

```
USAGE
  $ qbit-scripts plugins:inspect PLUGIN...

ARGUMENTS
  PLUGIN  [default: .] Plugin to inspect.

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Displays installation properties of a plugin.

EXAMPLES
  $ qbit-scripts plugins:inspect myplugin
```

## `qbit-scripts plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ qbit-scripts plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.
  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.


ALIASES
  $ qbit-scripts plugins add

EXAMPLES
  $ qbit-scripts plugins:install myplugin 

  $ qbit-scripts plugins:install https://github.com/someuser/someplugin

  $ qbit-scripts plugins:install someuser/someplugin
```

## `qbit-scripts plugins:link PLUGIN`

Links a plugin into the CLI for development.

```
USAGE
  $ qbit-scripts plugins:link PLUGIN

ARGUMENTS
  PATH  [default: .] path to plugin

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Links a plugin into the CLI for development.
  Installation of a linked plugin will override a user-installed or core plugin.

  e.g. If you have a user-installed or core plugin that has a 'hello' command, installing a linked plugin with a 'hello'
  command will override the user-installed or core plugin implementation. This is useful for development work.


EXAMPLES
  $ qbit-scripts plugins:link myplugin
```

## `qbit-scripts plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ qbit-scripts plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ qbit-scripts plugins unlink
  $ qbit-scripts plugins remove
```

## `qbit-scripts plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ qbit-scripts plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ qbit-scripts plugins unlink
  $ qbit-scripts plugins remove
```

## `qbit-scripts plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ qbit-scripts plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ qbit-scripts plugins unlink
  $ qbit-scripts plugins remove
```

## `qbit-scripts plugins update`

Update installed plugins.

```
USAGE
  $ qbit-scripts plugins update [-h] [-v]

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Update installed plugins.
```
<!-- commandsstop -->
