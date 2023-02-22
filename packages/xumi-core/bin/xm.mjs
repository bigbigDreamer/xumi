#!/usr/bin/env node
import { program } from 'commander';

program
    .command('dev', "Start a local service to start the project")
    .usage('<command> [options]')
    .parse(process.argv)
