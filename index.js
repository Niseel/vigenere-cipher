const readlineSync = require("readline-sync");
const ascii = require("./ASCII");

const standNumber = (number) => {
  if (number >= -94 && number <= 94) {
    return number;
  } else {
    if (number > 0) {
      return Math.abs(number % 94);
    } else {
      var result = Math.abs(number % 94);
      return result - result * 2;
    }
  }
};

const getChar = (charCode) => {
  return ascii.find((item) => item.key === charCode).value;
};

const checkSpace = (value) => (value === 32 ? true : false);

const encryptVigenereCipher = (str, key) => {
  let plaintext = str.split("");
  let keystream = key.split("");
  let tempkey = [...keystream];
  while (1) {
    if (keystream.length <= plaintext.length) {
      keystream.push(...tempkey);
      //console.log(keystream.length);
    } else break;
  }
  keystream.splice(plaintext.length);

  // console.log(plaintext);
  // console.log(keystream);
  let plaintextCode = "";
  let keystreamCode = "";
  let arrResultCode = [];
  let charCode = 0;
  for (let i = 0; i < keystream.length; i++) {
    charCode = plaintext[i].charCodeAt(0) + keystream[i].charCodeAt(0);
    if (charCode <= 126) {
      // console.log(
      //   plaintext[i].charCodeAt(0) + keystream[i].charCodeAt(0),
      //   getChar(plaintext[i].charCodeAt(0) + keystream[i].charCodeAt(0))
      // );
      arrResultCode.push(
        plaintext[i].charCodeAt(0) + keystream[i].charCodeAt(0)
      );
    } else {
      var turnTime = charCode;
      while (turnTime > 126) turnTime = turnTime - 94;
      // console.log(
      //   "lon qua",
      //   turnTime,
      //   plaintext[i].charCodeAt(0) + keystream[i].charCodeAt(0),
      //   getChar(turnTime)
      // );
      arrResultCode.push(turnTime);
    }

    // console.log(
    //   //mô tả cộng mã ascii
    //   `${plaintext[i]} (${plaintext[i].charCodeAt(0)})`,
    //   `${keystream[i]} (${keystream[i].charCodeAt(0)})`,
    //   `Value: ${plaintext[i].charCodeAt(0) + keystream[i].charCodeAt(0)}`,
    //   `Turn: ${plaintext[i].charCodeAt(0) + keystream[i].charCodeAt(0) - 94} `
    // );
  }

  console.log(plaintextCode);
  let result = "";
  arrResultCode.map((item) => {
    result += getChar(item);
  });
  return result;
};

const decryptVigenereCipher = (str, key) => {};
const vigenereCipherDetector = (str) => {};

// let str = readlineSync.question("> Enter string you want to encrypt? ");
// let key = readlineSync.question("> Enter 'key string' you want to encrypt? ");

console.log(
  ">String after encrypt: ",
  encryptVigenereCipher("congthanh410a", "banana")
);
