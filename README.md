# Task Manager API

## Description

this API helps us to create, read, update and delete our tasks. It's goal is helps you to reach your goals and manage your days and helps you to planning your days

## Requirements
list of _requirements_ you should have to install:

1.docker

## Installation
list of steps you should take to install:

1.clon project
2.use docker to create image of app
3.create a contatiner from image of app

### Clone project
in your terminal run this command:
```bash
git clone https://github.com/MahdiProgman/task-manager-api
```
### Use Docker to Create Image Of app
first change your directory to folder of app:
```bash
cd task-manager-api
```
next in your terminal run this command:
```bash
docker build -t task-manager-api .
```

### Create a Container From Image Of App
in your terminal run this command:
```bash
docker run --name task-manager-api -d -p 3000:3000 task-manager-api 
```
So Now You Can See My Wonderful API in:
```bash
http://localhost:3000
```