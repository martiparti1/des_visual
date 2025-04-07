class DESEncryptor {
    constructor() {
      this.IP = [
        58, 50, 42, 34, 26, 18, 10, 2, 60, 52, 44, 36, 28, 20, 12, 4, 62, 54, 46,
        38, 30, 22, 14, 6, 64, 56, 48, 40, 32, 24, 16, 8, 57, 49, 41, 33, 25, 17,
        9, 1, 59, 51, 43, 35, 27, 19, 11, 3, 61, 53, 45, 37, 29, 21, 13, 5, 63,
        55, 47, 39, 31, 23, 15, 7,
      ];
  
      this.FP = [
        40, 8, 48, 16, 56, 24, 64, 32, 39, 7, 47, 15, 55, 23, 63, 31, 38, 6, 46,
        14, 54, 22, 62, 30, 37, 5, 45, 13, 53, 21, 61, 29, 36, 4, 44, 12, 52, 20,
        60, 28, 35, 3, 43, 11, 51, 19, 59, 27, 34, 2, 42, 10, 50, 18, 58, 26, 33,
        1, 41, 9, 49, 17, 57, 25,
      ];
  
      this.E = [
        32, 1, 2, 3, 4, 5, 4, 5, 6, 7, 8, 9, 8, 9, 10, 11, 12, 13, 12, 13, 14, 15,
        16, 17, 16, 17, 18, 19, 20, 21, 20, 21, 22, 23, 24, 25, 24, 25, 26, 27,
        28, 29, 28, 29, 30, 31, 32, 1,
      ];
  
      this.P = [
        16, 7, 20, 21, 29, 12, 28, 17, 1, 15, 23, 26, 5, 18, 31, 10, 2, 8, 24, 14,
        32, 27, 3, 9, 19, 13, 30, 6, 22, 11, 4, 25,
      ];
  
      this.PC1 = [
        57, 49, 41, 33, 25, 17, 9, 1, 58, 50, 42, 34, 26, 18, 10, 2, 59, 51, 43,
        35, 27, 19, 11, 3, 60, 52, 44, 36, 63, 55, 47, 39, 31, 23, 15, 7, 62, 54,
        46, 38, 30, 22, 14, 6, 61, 53, 45, 37, 29, 21, 13, 5, 28, 20, 12, 4,
      ];
  
      this.PC2 = [
        14, 17, 11, 24, 1, 5, 3, 28, 15, 6, 21, 10, 23, 19, 12, 4, 26, 8, 16, 7,
        27, 20, 13, 2, 41, 52, 31, 37, 47, 55, 30, 40, 51, 45, 33, 48, 44, 49, 39,
        56, 34, 53, 46, 42, 50, 36, 29, 32,
      ];
  
      this.S_BOXES = [
        [
          [14, 4, 13, 1, 2, 15, 11, 8, 3, 10, 6, 12, 5, 9, 0, 7],
          [0, 15, 7, 4, 14, 2, 13, 1, 10, 6, 12, 11, 9, 5, 3, 8],
          [4, 1, 14, 8, 13, 6, 2, 11, 15, 12, 9, 7, 3, 10, 5, 0],
          [15, 12, 8, 2, 4, 9, 1, 7, 5, 11, 3, 14, 10, 0, 6, 13],
        ],
  
        [
          [15, 1, 8, 14, 6, 11, 3, 4, 9, 7, 2, 13, 12, 0, 5, 10],
          [3, 13, 4, 7, 15, 2, 8, 14, 12, 0, 1, 10, 6, 9, 11, 5],
          [0, 14, 7, 11, 10, 4, 13, 1, 5, 8, 12, 6, 9, 3, 2, 15],
          [13, 8, 10, 1, 3, 15, 4, 2, 11, 6, 7, 12, 0, 5, 14, 9],
        ],
  
        [
          [10, 0, 9, 14, 6, 3, 15, 5, 1, 13, 12, 7, 11, 4, 2, 8],
          [13, 7, 0, 9, 3, 4, 6, 10, 2, 8, 5, 14, 12, 11, 15, 1],
          [13, 6, 4, 9, 8, 15, 3, 0, 11, 1, 2, 12, 5, 10, 14, 7],
          [1, 10, 13, 0, 6, 9, 8, 7, 4, 15, 14, 3, 11, 5, 2, 12],
        ],
  
        [
          [7, 13, 14, 3, 0, 6, 9, 10, 1, 2, 8, 5, 11, 12, 4, 15],
          [13, 8, 11, 5, 6, 15, 0, 3, 4, 7, 2, 12, 1, 10, 14, 9],
          [10, 6, 9, 0, 12, 11, 7, 13, 15, 1, 3, 14, 5, 2, 8, 4],
          [3, 15, 0, 6, 10, 1, 13, 8, 9, 4, 5, 11, 12, 7, 2, 14],
        ],
  
        [
          [2, 12, 4, 1, 7, 10, 11, 6, 8, 5, 3, 15, 13, 0, 14, 9],
          [14, 11, 2, 12, 4, 7, 13, 1, 5, 0, 15, 10, 3, 9, 8, 6],
          [4, 2, 1, 11, 10, 13, 7, 8, 15, 9, 12, 5, 6, 3, 0, 14],
          [11, 8, 12, 7, 1, 14, 2, 13, 6, 15, 0, 9, 10, 4, 5, 3],
        ],
  
        [
          [12, 1, 10, 15, 9, 2, 6, 8, 0, 13, 3, 4, 14, 7, 5, 11],
          [10, 15, 4, 2, 7, 12, 9, 5, 6, 1, 13, 14, 0, 11, 3, 8],
          [9, 14, 15, 5, 2, 8, 12, 3, 7, 0, 4, 10, 1, 13, 11, 6],
          [4, 3, 2, 12, 9, 5, 15, 10, 11, 14, 1, 7, 6, 0, 8, 13],
        ],
  
        [
          [4, 11, 2, 14, 15, 0, 8, 13, 3, 12, 9, 7, 5, 10, 6, 1],
          [13, 0, 11, 7, 4, 9, 1, 10, 14, 3, 5, 12, 2, 15, 8, 6],
          [1, 4, 11, 13, 12, 3, 7, 14, 10, 15, 6, 8, 0, 5, 9, 2],
          [6, 11, 13, 8, 1, 4, 10, 7, 9, 5, 0, 15, 14, 2, 3, 12],
        ],
  
        [
          [13, 2, 8, 4, 6, 15, 11, 1, 10, 9, 3, 14, 5, 0, 12, 7],
          [1, 15, 13, 8, 10, 3, 7, 4, 12, 5, 6, 11, 0, 14, 9, 2],
          [7, 11, 4, 1, 9, 12, 14, 2, 0, 6, 10, 13, 15, 3, 5, 8],
          [2, 1, 14, 7, 4, 10, 8, 13, 15, 12, 9, 0, 3, 5, 6, 11],
        ],
      ];
  
      this.SHIFT_SCHEDULE = [1, 1, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 1];
      
      // Create a TextEncoder for proper UTF-8 handling
      this.encoder = new TextEncoder();
      this.decoder = new TextDecoder("utf-8");
    }
    
    padInput(input) {
      const blockSize = 8;
      const bytes = this.encoder.encode(input);
      const padLength = blockSize - (bytes.length % blockSize);
      const padChar = String.fromCharCode(padLength);
      return input + padChar.repeat(padLength);
    }
  
    unpadInput(input) {
      // Get the last character's code point
      const lastChar = input.charAt(input.length - 1);
      const padLength = lastChar.charCodeAt(0);
      
      // Ensure pad value is valid
      if (padLength > 0 && padLength <= 8) {
        // Check if all padding characters are the same
        const padding = input.slice(-padLength);
        if (padding.split('').every(char => char === lastChar)) {
          return input.slice(0, -padLength);
        }
      }
      
      // If padding seems invalid, return the original input
      return input;
    }
  
    // Convert string to binary, properly handling UTF-8 characters
    stringToBinary(str) {
      const bytes = this.encoder.encode(str);
      return Array.from(bytes)
        .map(byte => byte.toString(2).padStart(8, "0"))
        .join("");
    }
  
    // Convert binary back to string with proper UTF-8 handling
    binaryToString(binary) {
      const bytes = new Uint8Array(binary.length / 8);
      for (let i = 0; i < binary.length; i += 8) {
        bytes[i / 8] = parseInt(binary.substr(i, 8), 2);
      }
      return this.decoder.decode(bytes);
    }
  
    binaryToBase64(binary) {
      const bytes = new Uint8Array(binary.length / 8);
      for (let i = 0; i < binary.length; i += 8) {
        bytes[i / 8] = parseInt(binary.substr(i, 8), 2);
      }
      // Convert bytes to a string
      let binaryString = '';
      bytes.forEach(byte => {
        binaryString += String.fromCharCode(byte);
      });
      return btoa(binaryString);
    }
  
    binaryToHex(binary) {
      let hex = "";
      for (let i = 0; i < binary.length; i += 4) {
        let chunk = binary.substr(i, 4);
        hex += parseInt(chunk, 2).toString(16).toUpperCase().padStart(1, "0");
      }
      return hex;
    }
  
    permute(input, table) {
      return table.map((index) => input[index - 1]).join("");
    }
  
    xor(a, b) {
      return a
        .split("")
        .map((bit, i) => (bit === b[i] ? "0" : "1"))
        .join("");
    }
  
    sBoxSubstitution(input) {
      let result = "";
      for (let i = 0; i < 8; i++) {
        let block = input.substr(i * 6, 6);
        let row = parseInt(block[0] + block[5], 2);
        let col = parseInt(block.substr(1, 4), 2);
        let val = this.S_BOXES[i][row][col];
        result += val.toString(2).padStart(4, "0");
      }
      return result;
    }
  
    generateSubKeys(key) {
      // Ensure key is at least 8 characters (64 bits)
      if (key.length < 8) {
        key = key.padEnd(8, '#');
      } else if (key.length > 8) {
        key = key.substring(0, 8);
      }
      
      let permutedKey = this.permute(this.stringToBinary(key), this.PC1);
  
      let left = permutedKey.substr(0, 28);
      let right = permutedKey.substr(28);
  
      let subKeys = [];
  
      for (let i = 0; i < 16; i++) {
        left = this.circularLeftShift(left, this.SHIFT_SCHEDULE[i]);
        right = this.circularLeftShift(right, this.SHIFT_SCHEDULE[i]);
  
        let combinedKey = left + right;
        let roundKey = this.permute(combinedKey, this.PC2);
        subKeys.push(roundKey);
      }
  
      return subKeys;
    }
  
    circularLeftShift(bits, shift) {
      return bits.substr(shift) + bits.substr(0, shift);
    }
  
    feistelFunction(right, roundKey) {
      let expandedRight = this.permute(right, this.E);
  
      let xorResult = this.xor(expandedRight, roundKey);
  
      let sBoxOutput = this.sBoxSubstitution(xorResult);
  
      return this.permute(sBoxOutput, this.P);
    }
  
    encrypt(input, key) {
      const paddedInput = this.padInput(input);
  
      let cipherBlocks = [];
      // Process the input in 8-character chunks (64 bits)
      for (let i = 0; i < paddedInput.length; i += 8) {
        let block = paddedInput.substr(i, 8);
        let binaryInput = this.stringToBinary(block);
  
        // Ensure binary input is exactly 64 bits (8 bytes)
        if (binaryInput.length > 64) {
          binaryInput = binaryInput.substring(0, 64);
        } else if (binaryInput.length < 64) {
          binaryInput = binaryInput.padEnd(64, '0');
        }
  
        let permutedInput = this.permute(binaryInput, this.IP);
  
        let left = permutedInput.substr(0, 32);
        let right = permutedInput.substr(32);
  
        let subKeys = this.generateSubKeys(key);
  
        for (let j = 0; j < 16; j++) {
          let oldLeft = left;
          left = right;
  
          let feistelOutput = this.feistelFunction(right, subKeys[j]);
          right = this.xor(oldLeft, feistelOutput);
        }
  
        let finalBlock = right + left;
  
        let cipherBlock = this.permute(finalBlock, this.FP);
        cipherBlocks.push(cipherBlock);
      }
  
      const finalCiphertext = cipherBlocks.join("");
      return {
        binary: finalCiphertext,
        plaintext: this.binaryToString(finalCiphertext),
        hex: this.binaryToHex(finalCiphertext),
        base64: this.binaryToBase64(finalCiphertext),
      };
    }
  
    decrypt(ciphertext, key) {
      let plainBlocks = [];
      const binaryCiphertext =
        typeof ciphertext === "string" 
          ? (/^[01]+$/.test(ciphertext) 
              ? ciphertext 
              : /^[0-9A-Fa-f]+$/.test(ciphertext) 
                ? this.hexToBinary(ciphertext) 
                : this.base64ToBinary(ciphertext))
          : ciphertext.binary;
  
      for (let i = 0; i < binaryCiphertext.length; i += 64) {
        let block = binaryCiphertext.substr(i, 64);
  
        let permutedInput = this.permute(block, this.IP);
  
        let left = permutedInput.substr(0, 32);
        let right = permutedInput.substr(32);
  
        let subKeys = this.generateSubKeys(key).reverse();
  
        for (let j = 0; j < 16; j++) {
          let oldLeft = left;
          left = right;
  
          let feistelOutput = this.feistelFunction(right, subKeys[j]);
          right = this.xor(oldLeft, feistelOutput);
        }
  
        let finalBlock = right + left;
  
        let plainBlock = this.permute(finalBlock, this.FP);
        plainBlocks.push(plainBlock);
      }
  
      const binaryPlaintext = plainBlocks.join("");
      const plaintextString = this.binaryToString(binaryPlaintext);
      return {
        binary: binaryPlaintext,
        plaintext: this.unpadInput(plaintextString),
        hex: this.binaryToHex(binaryPlaintext),
        base64: this.binaryToBase64(binaryPlaintext),
      };
    }
  
    visualizeEncryption(input, key) {
      const paddedInput = this.padInput(input);
  
      let steps = $("#steps");
      steps.empty();
  
      let final = $('#final_result');
      final.empty();
  
      let cipherBlocks = [];
      for (let i = 0; i < paddedInput.length; i += 8) {
        let block = paddedInput.substr(i, 8);
        steps.append(
          `<div class="block-header">Processing Block: ${block}</div>`
        );
  
        let binaryInput = this.stringToBinary(block);
        // Ensure binary input is exactly 64 bits
        if (binaryInput.length > 64) {
          binaryInput = binaryInput.substring(0, 64);
        } else if (binaryInput.length < 64) {
          binaryInput = binaryInput.padEnd(64, '0');
        }
  
        let permutedInput = this.permute(binaryInput, this.IP);
        steps.append(`
                  <div class="step">
                      <h3>Step 1: Initial Permutation</h3>
                      <p>Original Input (Text): ${block}</p>
                      <p>Original Input (Binary): ${binaryInput}</p>
                      <p>Permuted Input: ${permutedInput}</p>
                  </div>
              `);
  
        let left = permutedInput.substr(0, 32);
        let right = permutedInput.substr(32);
  
        let subKeys = this.generateSubKeys(key);
  
        for (let j = 0; j < 16; j++) {
          let oldLeft = left;
          left = right;
  
          let expandedRight = this.permute(right, this.E);
          let xorResult = this.xor(expandedRight, subKeys[j]);
          let sBoxOutput = this.sBoxSubstitution(xorResult);
          let feistelOutput = this.permute(sBoxOutput, this.P);
          right = this.xor(oldLeft, feistelOutput);
  
          steps.append(`
                      <div class="step">
                          <h3>Round ${j + 1}</h3>
                          <div class="round-details">
                              <p>Left Half: ${left}</p>
                              <p>Right Half: ${right}</p>
                              <p>Round Key: ${subKeys[j]}</p>
                              <p>Expanded Right Half: ${expandedRight}</p>
                              <p>XOR Result: ${xorResult}</p>
                              <p>S-Box Output: ${sBoxOutput}</p>
                              <p>P-Box Output: ${feistelOutput}</p>
                          </div>
                      </div>
                  `);
        }
  
        let finalBlock = right + left;
  
        let cipherBlock = this.permute(finalBlock, this.FP);
        cipherBlocks.push(cipherBlock);
  
        steps.append(`
                  <div class="step">
                      <h3>Final Block Output</h3>
                      <p>Final Block (Binary): ${cipherBlock}</p>
                  </div>
              `);
      }
  
      let finalCiphertext = cipherBlocks.join("");
      $('#final_result').append(`
              <div class="final-output">
                  <h3>Complete Encryption Result</h3>
                  <p>Ciphertext (Base64): ${this.binaryToBase64(finalCiphertext)}</p>
              </div>
          `);
  
      return {
        binary: finalCiphertext,
        hex: this.binaryToHex(finalCiphertext),
        base64: this.binaryToBase64(finalCiphertext),
      };
    }
  
    visualizeDecryption(ciphertext, key) {
      let binaryCiphertext;
      if (typeof ciphertext === "string") {
        if (/^[01]+$/.test(ciphertext)) {
          binaryCiphertext = ciphertext;
        } else if (/^[0-9A-Fa-f]+$/.test(ciphertext)) {
          binaryCiphertext = this.hexToBinary(ciphertext);
        } else {
          binaryCiphertext = this.base64ToBinary(ciphertext);
        }
      } else {
        binaryCiphertext = ciphertext.binary;
      }
  
      let steps = $("#steps");
      steps.empty();
  
      let final = $('#final_result')
      final.empty();
  
      let plainBlocks = [];
      for (let i = 0; i < binaryCiphertext.length; i += 64) {
        let block = binaryCiphertext.substr(i, 64);
        steps.append(
          `<div class="block-header">Processing Cipher Block: ${block}</div>`
        );
  
        let permutedInput = this.permute(block, this.IP);
        steps.append(`
                  <div class="step">
                      <h3>Step 1: Initial Permutation</h3>
                      <p>Original Ciphertext (Binary): ${block}</p>
                      <p>Permuted Input: ${permutedInput}</p>
                  </div>
              `);
  
        let left = permutedInput.substr(0, 32);
        let right = permutedInput.substr(32);
  
        let subKeys = this.generateSubKeys(key).reverse();
  
        for (let j = 0; j < 16; j++) {
          let oldLeft = left;
          left = right;
  
          let expandedRight = this.permute(right, this.E);
          let xorResult = this.xor(expandedRight, subKeys[j]);
          let sBoxOutput = this.sBoxSubstitution(xorResult);
          let feistelOutput = this.permute(sBoxOutput, this.P);
          right = this.xor(oldLeft, feistelOutput);
  
          steps.append(`
                      <div class="step">
                          <h3>Decryption Round ${j + 1}</h3>
                          <div class="round-details">
                              <p>Left Half: ${left}</p>
                              <p>Right Half: ${right}</p>
                              <p>Round Key: ${subKeys[j]}</p>
                              <p>Expanded Right Half: ${expandedRight}</p>
                              <p>XOR Result: ${xorResult}</p>
                              <p>S-Box Output: ${sBoxOutput}</p>
                              <p>P-Box Output: ${feistelOutput}</p>
                          </div>
                      </div>
                  `);
        }
  
        let finalBlock = right + left;
  
        let plainBlock = this.permute(finalBlock, this.FP);
        plainBlocks.push(plainBlock);
  
        steps.append(`
                  <div class="step">
                      <h3>Final Block Output</h3>
                      <p>Plain Block (Binary): ${plainBlock}</p>
                  </div>
              `);
      }
  
      const binaryPlaintext = plainBlocks.join("");
      const plaintextString = this.binaryToString(binaryPlaintext);
      const unpadded = this.unpadInput(plaintextString);
  
      $('#final_result').append(`
              <div class="final-output">
                  <h3>Decryption Result</h3>
                  <p>Plaintext: ${unpadded}</p>
              </div>
          `);
  
      return {
        binary: binaryPlaintext,
        plaintext: unpadded,
        hex: this.binaryToHex(binaryPlaintext),
        base64: this.binaryToBase64(binaryPlaintext),
      };
    }
  
    hexToBinary(hex) {
      return hex
        .split("")
        .map((h) => parseInt(h, 16).toString(2).padStart(4, "0"))
        .join("");
    }
  
    base64ToBinary(base64) {
      try {
        const bytes = atob(base64).split('').map(char => char.charCodeAt(0));
        return bytes.map(byte => byte.toString(2).padStart(8, '0')).join('');
      } catch (e) {
        console.error("Error decoding base64:", e);
        return "";
      }
    }
  }