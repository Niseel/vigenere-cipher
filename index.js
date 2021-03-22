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
      while (turnTime > 126) turnTime = turnTime - 95;
      // console.log(
      //   "lon qua",
      //   turnTime,
      //   plaintext[i].charCodeAt(0) + keystream[i].charCodeAt(0),
      //   getChar(turnTime)
      // );
      arrResultCode.push(turnTime);
    }

    console.log(
      //mô tả cộng mã ascii
      `${plaintext[i]} (${plaintext[i].charCodeAt(0)})`,
      `${keystream[i]} (${keystream[i].charCodeAt(0)})`,
      `Value: ${plaintext[i].charCodeAt(0) + keystream[i].charCodeAt(0)}`,
      `Turn: ${plaintext[i].charCodeAt(0) + keystream[i].charCodeAt(0) - 95} `
    );
  }

  console.log(plaintextCode);
  console.log(keystream);
  let result = "";
  arrResultCode.map((item) => {
    result += getChar(item);
  });
  return result;
};

const decryptVigenereCipher = (str, key) => {
  let ciphertext = str.split("");
  let keystream = key.split("");
  let tempkey = [...keystream];
  while (1) {
    if (keystream.length <= ciphertext.length) {
      keystream.push(...tempkey);
    } else break;
  }
  keystream.splice(ciphertext.length);

  let arrResult = [];
  for (let i = 0; i < ciphertext.length; i++) {
    // console.log(
    //   ciphertext[i].charCodeAt(0),
    //   " - ",
    //   keystream[i].charCodeAt(0),
    //   ":  ",
    //   `${ciphertext[i].charCodeAt(0) - keystream[i].charCodeAt(0)}`
    // );
    let curr = ciphertext[i].charCodeAt(0) - keystream[i].charCodeAt(0);
    let step = 1;
    while (1) {
      if (curr >= 32 && curr <= 126) {
        step = 1;
        break;
      } else {
        curr =
          ciphertext[i].charCodeAt(0) + 95 * step - keystream[i].charCodeAt(0);
        step++;
      }
    }

    //console.log(curr);
    let test = "";
    test += getChar(curr).toString();

    arrResult.push(test);
    // let currChar = ciphertext[i].charCodeAt(0) - keystream[i].charCodeAt(0);
    // if (currChar < 32 || currChar > 126) {
    //   currChar = ciphertext[i].charCodeAt(0) * 2 - keystream[i].charCodeAt(0);
    //   console.log(currChar);
    // }
  }
  // console.log(ciphertext, ciphertext.length);
  // console.log(keystream, keystream.length);
  var strResult = arrResult.join("");
  return strResult;
};
const vigenereCipherDetector = (str) => {};

// let str = readlineSync.question("> Enter string you want to encrypt? ");
// let key = readlineSync.question("> Enter 'key string' you want to encrypt? ");

// console.log(
//   ">String after encrypt: ",
//   encryptVigenereCipher("Truong dai hoc Sai Gon (SGU)", "sguUGS")
// );

// console.log(decryptVigenereCipher(`hz,eV[4lw_g\\$k6II]4O&dg{gOk~`, "sguUGS"));

function showMenu() {
  console.log("1> Encrypt string with Vigenere-Cipher");
  console.log("2> Decrypt string with Vigenere-Cipher");
  console.log("3> End Program");
}
function main() {
  showMenu();
  let choose = readlineSync.question("> Choose your option? ");
  switch (parseInt(choose)) {
    case 1:
      let plaintext = readlineSync.question(
        "> Enter plantext you want to encrypt? "
      );
      var key = readlineSync.question(
        "> Enter 'k number' you want to encrypt? "
      );
      console.log("> Your Ciphertext: ", encryptVigenereCipher(plaintext, key));
      console.log("\n \n");
      console.log(
        "============================================================="
      );
      main();
      break;
    case 2:
      let ciphertext = readlineSync.question(
        "> Enter ciphertext you want to decrypt? "
      );
      var key = readlineSync.question("> Enter 'k number' ");
      console.log("> Your plaintext: ", decryptVigenereCipher(ciphertext, key));
      console.log("\n \n");
      console.log(
        "============================================================="
      );
      main();
      break;
    case 3:
      console.log("End Program");
      break;
  }
}

main();
