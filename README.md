# cron-scheduler

### Description
description

### Reasoning behind technical decisions
reaosning

### Trade-offs made
tradeoff

### Installation

	$ npm install telda-scheduler

### Usage

Import telda-scheduler & create a cronjob to be scheduled every minute:

```javascript

const { createCronJob } = require('cron-scheduler')

const printHelloWorld = () => {
    console.log('hello world')
}

createCronJob({
    frequency: '*/15 * * * *',
    expectedRunDuration: 20,
    func: printHelloWorld,
    jobID: 1
})

```

## Supported Formats for the Scheuduling Frequency:
1. Cron format
2. (0-59)min or (0-59)hr or...

### Tests

	$ npm test

### Possible future improvements
1.



