# qwertyKey

[![E-time](https://www.e-time.it/wp-content/uploads/2017/07/E-time_white_bo.png)](https://www.e-time.it)

[![Dependency Status](https://david-dm.org/e-time-it/qwertyKey.svg)](https://david-dm.org/e-time-it/qwertyKey)
[![Build Status](https://travis-ci.org/e-time-it/qwertyKey.svg?branch=master)](https://travis-ci.org/e-time-it/qwertyKey)

Password repository for individuals and teams

## Getting Started

Clone the repo and make it yours:

```bash
git clone https://github.com/e-time-it/qwertyKey
```

Install dependencies:

```bash
npm install
```

Environment config:
```
cp config/database-local.dist.js config/database-local.js
```
and edit it with your MongoDb's credentials

```
cp ./config/mail-local.dist.js ./config/mail-local.js
```
and edit it with your SMTP's credentials

## Running Locally

```bash
npm start
```

## Running in Production

```bash
npm start
```

## Run tests

```bash
npm test
```
