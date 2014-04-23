peer-dependency-cleaner
=======================
Simple command line tool to clean up the mess that npm link and peerDependencies creates (https://github.com/npm/npm/issues/5080). Takes the name of a module as an argument, and will then walk down your node_modules tree and delete any instances of that module except the top one. Think of it as a very violent and despotic dedupe.

### Installation
```bash
npm install -g peer-dependency-cleaner
```
### Usage
```bash
cleanpeerdeps my-module
```
