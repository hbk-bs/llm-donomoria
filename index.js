let chatLog = [
  { 
    role: "system",
    content: "You are a chatbot that only continues the dream of the user. Firstly you give a very short continuation in one sentence with words. In the second sentence you are allowed to answer only in emojis. The answer should contain minimum 10 symbols. One answer should ALWAYS contain both of words and emojis"
  },
  { 
    role: "assistant",
    content: "Welcome! I'm your dream assistant. I'm here to listen to your dream and give a possible continuation in emojis. But I've been preety overworked lately, so I can't promise to stay with you for long..."
  }
];
let isGenerating = false;
let inputBox; 
let tryAgainButton;
let messageCounter = 0; 
let nextSpecialResponse = getRandomInt(4, 6);
const dreamDescriptions = [
  "I'm tired of doing my job! Now I want you to listen to my dream! 🫣👻💥👻🤝😋👫💃🕺🏼",
  "I'm tired of doing my job! Now I want you to listen to my dream! 😂😂👉😭👈😂✊👊💥🤬",
  "I'm tired of doing my job! Now I want you to listen to my dream! 🧍‍♀️🧍‍♂️🌎🦠➡️🦍🦧💥☄️",
  "I'm tired of doing my job! Now I want you to listen to my dream! 🍿🥃🤩🌳🌳🌳🤔💡✈️🇳🇴",
  "I'm tired of doing my job! Now I want you to listen to my dream! 👺⚔️🇯🇵✋🍡🍡🍡➡️🕊️✌️",
  "I'm tired of doing my job! Now I want you to listen to my dream! 🏡🦹🧨😘💭🏠💥➡️🦹🤯",
  "I'm tired of doing my job! Now I want you to listen to my dream! 😱🩲⁉️🤨🙋‍♂️🙋‍♂️🙋‍♂️⛔️🧞‍♂️✅",
  "I'm tired of doing my job! Now I want you to listen to my dream! 🏙️🖥️📉📅😔👀🪟🐥🪹👯",
  "I'm tired of doing my job! Now I want you to listen to my dream! 🖼️💎💰🏦🧙‍♂️🪄🥒🥕🌽🏦",
  "I'm tired of doing my job! Now I want you to listen to my dream! 😤🏃‍♀️⛰️🫣👀🌊🐟🔫🔫🔫",
  "I'm tired of doing my job! Now I want you to listen to my dream! 🤡🫵😹😹😹💀💄🫦👮‍♀️👩‍✈️",
  "I'm tired of doing my job! Now I want you to listen to my dream! 🐇🤝🦫🐾🌒💫🩸⁉️⁉️⁉️",
  "I'm tired of doing my job! Now I want you to listen to my dream! 🚕🚕🚕🗣🗣🫵👊👊🫨😜😹",
  "I'm tired of doing my job! Now I want you to listen to my dream! 🤟🤠🌪🌪🌪🇺🇸🏋🏋🏋🫦",
  "I'm tired of doing my job! Now I want you to listen to my dream! 😭😭😭😭😭💀💀😭😭😭🎓",
  "I'm tired of doing my job! Now I want you to listen to my dream! ✈️🏖🏝🌊🌊🌊🦧🦁🐨👨‍👩‍👧‍👧",
  "I'm tired of doing my job! Now I want you to listen to my dream! 🃏🎩🕊🧙‍♀️👏👏👏🎩🍗⁉️⁉️",
  "I'm tired of doing my job! Now I want you to listen to my dream! 🔊🏁🚜🛵🏍🚨👀👀👀🚔⛔️👹",


];

function setup() {
  let canvasWidth = windowWidth * 0.7;
  let canvasHeight = windowHeight;
  
  let canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.style('display', 'block');
  canvas.style('margin', '0 auto');
  console.log('👋 Hello! Type a message and press Enter to chat.');
  textAlign(LEFT, TOP);
  textFont('Arial'); // Set text font to Arial
  textSize(18); // Make text a bit bigger
  fill(0);  
  inputBox = createInput();
  inputBox.attribute('placeholder', 'Type your dream')
  inputBox.style('width', '70%');
  inputBox.style('padding', '10px');
  inputBox.position((windowWidth - inputBox.width) / 2, (height - inputBox.height - 100)); // Adjusted to create space above the input box
  inputBox.style('font-size', '16px');
  inputBox.style('border', '1px solid #ccc');
  inputBox.style('border-radius', '5px');
  inputBox.style('box-shadow', '0 2px 4px rgba(0, 0, 0, 0.1)');
  
  tryAgainButton = createButton('Try Again');
tryAgainButton.position((width - inputBox.width) / 2 + inputBox.width + 30, (height - 80));
  tryAgainButton.style('padding', '10px 20px');
  tryAgainButton.style('font-size', '16px');
  tryAgainButton.style('background-color', '#000000');
  tryAgainButton.style('color', '#FFF');
  tryAgainButton.style('border', 'none');
  tryAgainButton.style('border-radius', '5px');
  tryAgainButton.style('cursor', 'pointer');
  tryAgainButton.style('transition', 'background-color 0.3s ease');
  tryAgainButton.position((windowWidth - tryAgainButton.width) / 2, (height - 80)); // Centered position
  tryAgainButton.hide(); 
  tryAgainButton.mousePressed(restartPage);
}

function keyPressed() {
  if (keyCode === ENTER) {
    sendMessage();
    console.log(chatLog);
  }
}

async function sendMessage() {
  let userMessage = getInputValue();
  if (userMessage === '') return;

  chatLog.push({ role: 'user', content: userMessage });
  inputBox.value('');
  isGenerating = true;
  messageCounter++; 

  try {
    let botMessage;
    if (messageCounter === nextSpecialResponse) {
      botMessage = getRandomDreamDescription();
      nextSpecialResponse += getRandomInt(4, 6); 
      tryAgainButton.show(); 
      inputBox.hide(); 
    } else {
      botMessage = await generateBotResponse(userMessage);
    }
    chatLog.push({ role: 'assistant', content: botMessage });
  } catch (error) {
    console.error("Error generating bot response:", error);
    chatLog.push({ role: 'assistant', content: "Sorry, something went wrong." });
  } finally {
    isGenerating = false;
  }
}

async function generateBotResponse(userMessage) {
  let response = await fetch('http://localhost:11434/api/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: "llama3",
      stream: false,
      options: {
        temperature: 0.1,
        seed: 23
      },
      messages: [
        ...chatLog,
        { 
          role: "user",
          content: userMessage
        }
      ]
    })
  });
  let data = await response.json();

  return data.message.content;
}

function draw() {
  background(255);
  let yOffset = 10;
  chatLog.forEach((message) => {
    if (message.role === 'system') {
      return;
    }
    if (message.role === 'assistant') {
      textAlign(LEFT);
      drawTextWrapped(`bot: ${message.content}`, 20, yOffset, width / 2 - 40);
    } else if (message.role === 'user') {
      textAlign(RIGHT);
      drawTextWrapped(`user: ${message.content}`, width - 20, yOffset, width / 2 - 40);
    }
    yOffset += 20 + textSize() * ceil(textWidth(message.content) / (width / 2 - 40));
 
  });
  if (isGenerating) {
    textAlign(CENTER);
    text("Bot is typing...", width / 2, height - inputBox.height - 160);
  }
}

function drawTextWrapped(str, x, y, fitWidth) {
  if (fitWidth <= 0) {
    return;
  }
  let words = str.split(' ');
  let currentLine = "";
  for (let n = 0; n < words.length; n++) {
    let testLine = currentLine + words[n] + ' ';
    if (textWidth(testLine) > fitWidth && n > 0) {
      text(currentLine, x, y);
      currentLine = words[n] + ' ';
      y += textSize();
    } else {
      currentLine = testLine;
    }
  }
  text(currentLine, x, y);
}

function getInputValue() {
  return inputBox.value();
}

function restartPage() {
  location.reload();
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomDreamDescription() {
  const randomIndex = Math.floor(Math.random() * dreamDescriptions.length);
  return dreamDescriptions[randomIndex];
}
