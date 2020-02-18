# Yello Pizza Frontend

> Live Url- https://yellow-pizza-dlxpvf.firebaseapp.com/
> Signup with dummy email to test

[![NPM Version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Downloads Stats][npm-downloads]][npm-url]

A elegent chat bot which helps you in ordering your pizza.

![](ss.jpg)

## Installation

```sh
npm install
npm run serve
```

## Usage example

- Bot: Hello user, you can start by asking for menu
  - User: Hi
- Bot: Hello user,
  - User: show me the menu
- Bot: Below are some of our delicous pizzas.,
  - User: add orange pizza, yellow pizza to cart
- Bot: orange pizza and yellow pizza added to the cart.,
  - User: place the order
- Bot: Please enter your name to continue.,
  - User: Himanshu
- Bot: that a nice name, now please enter your delivery address.,
  - User: Bengaluru
- Bot: Ok, now for the last detail please enter your mobile number.,
  - User: 123456789
- Bot: Order id- 0c2b90f8 placed successfully. track by asking 'track my order/where is my order' followed by order id,
  - User: track order 0c2b90f8
- Bot: Your order containing orange pizza has status processing

## Features

- Powered by DialogFlow, Firebase Realtime Database, Heroku
- Vuejs based ui
- NodeJs/Express backend for rest api and webhook
- Built on quasar framework
- Real time chat
- Responsive design
- Natural Language Processing
- Context processing
- Collect user details from chat
- track order from chat
