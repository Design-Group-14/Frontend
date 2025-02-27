
## Overview

Our product is a location-based platform for Trinity students with personalized content, and tag-based post discovery to enhance campus connectivity. Our product runs using a react.js front-end with a python django backend and a postgreSQL database hosted on Avian.

This is the react-based front-end for the project. Here, the user can Register/Login and access their Dashboard. Currently, we have built a login/register screen, a dashboard screen (no functionality yet) and a user information screen (no functionality yet also).

Create an account, browse your empty dashboard and view your boilerplate user information screen!

We are using Firebase to authenticate users using their email and password service. Information about Users and their posts are stored on our postgreSQL database. To send requests to it, you must first get our django backend running (explained in our readme here -> https://github.com/Design-Group-14/Backend). 

## How to Run

You will need Node.Js (latest version preferred) installed.

#### Steps
Before you run this, the django backend must be running to respond to requests -> https://github.com/Design-Group-14/Backend. Once django is running, continue below:
 
1. Clone this repo
2. Navigate to this repo on your machine
3. install dependencies - `npm install`
4. start dev server -`npm start `
Project is now running on `http://localhost:3000`. Congrats!

First create an account (any formatting errors should be printed to browser console). <br> After logging in, you should automatically be brought to your dashboard. <br> If you check console, we automatically send a request to retrieve all latest posts in database. These are test values in our database but we wanted to demonstrate that we can retrieve posts in our database from our frontend. <br> You can also click on your account but it currently only holds boilerplate values.

#### Backend

Firebase - go to https://firebase.google.com/. Click on go to console and login using these credentials.
Email - Group14TCD@gmail.com
Password - group14password
All accounts are visible in Authentication - Users.

Steps to access database are mentioned in readme at https://github.com/Design-Group-14/Backend






