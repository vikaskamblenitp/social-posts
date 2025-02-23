# Social Media Posts

## Table of Contents

- [About](#about)
- [Getting Started](#getting_started)
- [Usage](#usage)
- [Technologies used](#technologies)

## About <a name = "about"></a>

A simple project allowing adding posts and filter them based on keyword and tag

## Getting Started <a name = "getting_started"></a>

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Install dependencies
- Docker
- Node.js
- npm

### Installing

A step by step series of examples that tell you how to get a development env running.

install npm dependencies
```
npm install
```

up the docker container
```
docker compose up -d
```

copy .env.example to .env.local
```
copy .env.example .env.local -- windows
cp .env.example .env.local -- linux
```

start ther server
```
npm run dev
```

## Usage <a name = "usage"></a>

Add posts and fetch them using the [Postman Collection](https://dark-flare-835344.postman.co/workspace/Team-Workspace~7b28f28d-23c3-4567-86bc-c4b8e1f7822c/collection/22252908-1a4ec2f2-171e-41ac-a097-f719e844de4f?action=share&creator=22252908)

## Usage <a name = "technologies"></a>
Below technologies are used
- Node.js
- MongoDB
- Mongoose
- Docker
