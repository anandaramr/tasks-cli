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
Usage:
	tasks [options] [command]

Options:
	-V, --version          output the version number
    -h, --help             display help for command

Commands: 
	list [options]         Display tasks
    new <name>             Create new task
    update [options] <ID>  Update task status
    delete [options]       Delete tasks
    help [command]         display help for command
```

### Listing tasks
```yaml
    Usage: tasks list [options]

    Options:
		-t, --todo          Display only incomplete tasks
        -H, --head [limit]  Display only first [limit] number of tasks
        -c, --count         Display the number of tasks retrieved
        -s, --search <key>  Search for task
        -h, --help          display help for command
```

### Create tasks
```yaml
    Usage: tasks new [options] <name>

    Options:
		-h, --help  display help for command
```

### Update task status
```yaml
    Usage: tasks update [options] <ID>

    Options:
		-d, --done  Mark task as completed
        -u, --undo  Mark task as incomplete
        -h, --help  display help for command
```

### Delete tasks
```yaml
    Usage: tasks delete [options]

    Options:
		-i, --id <ID>  Delete task by ID
        -a, --all      Delete all tasks
        -h, --help     display help for command
```