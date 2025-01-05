# Tasks

A simple command-line [Node.js](https://nodejs.org/) To-Do app made with [Typescript](https://www.npmjs.com/package/typescript) and [Commander](https://www.npmjs.com/package/commander) 

# Installation

Clone the repo
```sh
git clone https://github.com/anandaramr/tasks-cli.git
```

Install all the dependencies
```sh
cd tasks-cli
npm install
```

Build and link the package
```sh
npm run link
```

Ensure the app works by running the command
```sh
$ tasks -V
v1.0.0
```

## Commands

```yaml
Usage: tasks [options]

Options:
  -V, --version      output the version number
  -a, --all          List all tasks
  -t, --todo         List all incomplete tasks
  -n, --new <NAME>   Create new task
  -d, --done <ID>    Mark task as completed
  -u, --undo <ID>    Mark task as incomplete
  -D, --delete <ID>  Delete a task
  -C, --clear        Delete all tasks
  -h, --help         display help for command
```