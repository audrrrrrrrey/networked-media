// import the install libraries
require("dotenv").config();
const m = require("masto");
// const fetch = require('node-fetch');
const fs = require("fs");

const masto = m.createRestAPIClient({
  url: "https://networked-media.itp.io/",
  accessToken: process.env.TOKEN,
});

//day counter
let counter = 1;

//loading the data into an array
let response = fs.readFileSync("./words_dictionary.json", "utf-8");
let jsonResponse = JSON.parse(response);
let words = Object.keys(jsonResponse);

//empty arr for words that will be used
let nearPalindromes = [];

for (i = 0; i < words.length; i++) {
  let l = words[i].length;

  if (l > 6) {
    //req 1: be at least 7 letters just cuz it's too obvious if it's not

    if (isNearPalindrome(words[i])) {
      //req 2: be a near palindrome, so have roughly 1/2 of your first and last letters match

      if (!isPalindrome(words[i])) {
        //req 3: don't be a real palindrome

        nearPalindromes.push(words[i]);
      }
    }
  }
}

//posting statuses
//takes care of first day, otherwise we have to wait a day before writing
writePost();

//from day 2 onward, random set of statuses at an interval
setInterval(writePost, 86400000);
//5000 is five seconds, 1 is a ms
//it's accurate! for a day, just change the ms to be a day
//86400x1000 = 86400000

function isNearPalindrome(word) {
  let l = word.length;
  let chars = Math.round(l / 4); //max number of characters to match is around half of what should actually be checked for a real palindrome

  for (c = 0; c < chars; c++) {
    if (word.charAt(c) != word.charAt(l - c - 1)) return false;
  }

  return true;
}

function isPalindrome(word) {
  let l = word.length;
  let chars = Math.round(l / 2); //max number of characters to match is around half of what should actually be checked for a real palindrome

  for (c = 0; c < chars; c++) {
    if (word.charAt(c) != word.charAt(l - c - 1)) return false;
  }

  return true;
}

function writePost() {
  //picking a random word
  let randW = Math.floor(Math.random() * nearPalindromes.length);
  let word = nearPalindromes[randW];
  let wordUp = word.toUpperCase();

  //array with sentence structures, with random word inserted
  let sentences = [
    "Did you know that " + wordUp + " is a palindrome?",
    "Did you know that " + wordUp + " backwards is " + wordUp + "?",
    "You’ll never guess what " + wordUp + " backwards is.",
    "Guess what " +
      wordUp +
      " backwards is?" +
      "\n\nYup, that's right. It's " +
      wordUp +
      ".",
    "Palindrome Fact:\n\n" + wordUp + " is a palindrome.",
    wordUp + " is a palindrome." + "\n\nFollow for more tips.",
    wordUp + " backwards is " + wordUp + ".\n\nCool, right?",
    wordUp + ".\n\nNow read that backwards.",
    wordUp + ".\n\nNow spell that backwards.",
    wordUp + ".\n\nNow flip that around.",
    wordUp + ".\n\nFollow for more palindromes.",
  ];

  //pick a random emoji
  let emojis = [
    "",
    "💡",
    "📝",
    "👀",
    "🙆‍♀️",
    "📚",
    "🔍",
    "🕵️‍♀️",
    "‼️",
    "🔁",
    "↩️",
    "😎",
    "🖋",
  ];
  let randE = Math.floor(Math.random() * emojis.length);

  //pick a random sentence
  let randS = Math.floor(Math.random() * sentences.length);
  let post =
    sentences[randS] +
    " " +
    emojis[randE] +
    "\n\n#palindrome #palindromes #day" +
    counter;

  makeStatus(post);
  counter++;
}

//writing the make status function
async function makeStatus(text) {
  const status = await masto.v1.statuses.create({
    // the thing that will be posted
    status: text,

    //changes visibility for testing purposes
    visibility: "public",
  });

  console.log(status.url);
}