/* Main-theme colors array */
var colors = [
'#16ae085',
'#27ae60',
'#2c3e50',
'#f39c12',
'#e74c3c',
'#9b59b6',
'#FB6964',
'#342224',
'#472E32',
'#bdbb99',
'#77B1A9',
'#738A57'];


/* array of quote&author objects because i didn't want to have to use an api to get real random quotes like the FCC example */
var quotes = [
{
  quote: "To be honest, i didn't take time to learn ajax to get the actual random quotes.",
  author: "Nick Perry" },

{
  quote: "You only live once. YOLO",
  author: "Drizzy Drake" },

{
  quote: "You got games on your phone?",
  author: "Jimbob McGee" },

{
  quote: "When you can't do, think. When you can't think, read. when you can't read, ixlkfjcnkalfksaduf;ljnbffji",
  author: "Nick Perry" },

{
  quote: "Sometimes i don't wanna be happy",
  author: "Dixie D'Amelio" },

{
  quote: "Real Gs move in silence, like lasagna",
  author: "Lil Wayne" },

{
  quote: "But are you the same animal, <em>and</em> a different beast?",
  author: "Kobe Bryant" },

{
  quote: "Sensational.",
  author: "Future" },

{
  quote: "Back it up, Terry!",
  author: "a man warning his friend (fireworks related)" },

{
  quote: "We live on a floating rock in space. you could die at any moment, for any reason. this is why i don't pay taxes",
  author: "Nick" }];



/* basic functions to execute Jquery functionality */

var currentQuote = '',
currentAuthor = '';

function getRandomQuote() {
  return quotes[Math.floor(Math.random() * quotes.length)];
}

function getQuote() {
  let randomQuote = getRandomQuote();

  currentQuote = randomQuote.quote;
  currentAuthor = randomQuote.author;

  $('#tweet-quote').attr(
  'href',
  'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' +
  encodeURIComponent('"' + currentQuote + '" ' + currentAuthor));


  $('.quote-text').animate({ opacity: 0 }, 500, function () {
    $(this).animate({ opacity: 1 }, 500);
    $('#text').html(randomQuote.quote);
  });

  $('.quote-author').animate({ opacity: 0 }, 500, function () {
    $(this).animate({ opacity: 1 }, 500);
    $('#author').html(randomQuote.author);
  });

  var color = Math.floor(Math.random() * colors.length);
  $('body').animate(
  {
    backgroundColor: colors[color],
    color: colors[color] },

  1000);

  $('.button').animate(
  {
    backgroundColor: colors[color] },

  1000);

}


/* Jquery section */
$(document).ready(function () {
  getQuote();

  $("#new-quote").on("click", getQuote);


});