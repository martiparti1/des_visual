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
      
      this.encoder = new TextEncoder();
      this.decoder = new TextDecoder("utf-8");
    }
    
    padInput(input) {
      const blockSize = 8;
      const bytes = this.encoder.encode(input);
      const padLength = blockSize - (bytes.length % blockSize);
      
      const paddedBytes = new Uint8Array(bytes.length + padLength);
      paddedBytes.set(bytes);
      
      for (let i = 0; i < padLength; i++) {
        paddedBytes[bytes.length + i] = padLength;
      }
      
      return paddedBytes;
    }
  
    unpadInput(paddedBytes) {
      if (paddedBytes.length === 0) return new Uint8Array(0);
  
      const padLength = paddedBytes[paddedBytes.length - 1];
  
      if (padLength > 0 && padLength <= 8) {
        let validPadding = true;
        for (let i = paddedBytes.length - padLength; i < paddedBytes.length; i++) {
          if (paddedBytes[i] !== padLength) {
            validPadding = false;
            break;
          }
        }
        
        if (validPadding) {
          return paddedBytes.slice(0, paddedBytes.length - padLength);
        }
      }
  
      return paddedBytes;
    }
  
    bytesToBinary(bytes) {
      return Array.from(bytes)
        .map(byte => byte.toString(2).padStart(8, "0"))
        .join("");
    }
  
    binaryToBytes(binary) {
      const bytesArray = [];
      for (let i = 0; i < binary.length; i += 8) {
        if (i + 8 <= binary.length) {
          bytesArray.push(parseInt(binary.substr(i, 8), 2));
        }
      }
      
      return new Uint8Array(bytesArray);
    }
  
    binaryToBase64(binary) {
      const bytes = this.binaryToBytes(binary);
  
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
        hex += parseInt(chunk, 2).toString(16).toUpperCase();
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
      let keyBytes;
      if (typeof key === 'string') {
        keyBytes = this.encoder.encode(key);
      } else if (key instanceof Uint8Array) {
        keyBytes = key;
      } else {
        throw new Error("Invalid key format");
      }
      
      const paddedKeyBytes = new Uint8Array(8);
      paddedKeyBytes.fill(0);
      
      const bytesToCopy = Math.min(keyBytes.length, 8);
      for (let i = 0; i < bytesToCopy; i++) {
        paddedKeyBytes[i] = keyBytes[i];
      }
      
      let keyBinary = this.bytesToBinary(paddedKeyBytes);
      
      let permutedKey = this.permute(keyBinary, this.PC1);
      
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
  
    processBlock(block, subKeys, encrypt = true) {
      let permutedBlock = this.permute(block, this.IP);
      
      let left = permutedBlock.substr(0, 32);
      let right = permutedBlock.substr(32);
      
      const keys = encrypt ? subKeys : [...subKeys].reverse();
  
      for (let i = 0; i < 16; i++) {
        let oldLeft = left;
        left = right;
        
        let feistelOutput = this.feistelFunction(right, keys[i]);
        right = this.xor(oldLeft, feistelOutput);
      }
  
      let finalBlock = right + left;
  
      return this.permute(finalBlock, this.FP);
    }
  
    encrypt(input, key) {
      const paddedBytes = this.padInput(input);
      
      let cipherBlocks = [];
      for (let i = 0; i < paddedBytes.length; i += 8) {
        const blockBytes = paddedBytes.slice(i, i + 8);
        
        const binaryBlock = this.bytesToBinary(blockBytes);
        
        const subKeys = this.generateSubKeys(key);
        
        const cipherBlock = this.processBlock(binaryBlock, subKeys, true);
        cipherBlocks.push(cipherBlock);
      }
      
      const finalCipherBinary = cipherBlocks.join("");
      const cipherBytes = this.binaryToBytes(finalCipherBinary);
      
      return {
        binary: finalCipherBinary,
        bytes: cipherBytes,
        plaintext: this.decoder.decode(cipherBytes),
        hex: this.binaryToHex(finalCipherBinary),
        base64: this.binaryToBase64(finalCipherBinary),
      };
    }
    
    decrypt(ciphertext, key) {
      let cipherBytes;
      
      if (typeof ciphertext === "string") {
        if (/^[01]+$/.test(ciphertext)) {
          cipherBytes = this.binaryToBytes(ciphertext);
        } 
        else if (/^[0-9A-Fa-f]+$/.test(ciphertext)) {
          const binaryString = ciphertext
            .split("")
            .map(h => parseInt(h, 16).toString(2).padStart(4, "0"))
            .join("");
          cipherBytes = this.binaryToBytes(binaryString);
        }
        else {
          try {
            const decoded = atob(ciphertext);
            cipherBytes = new Uint8Array(decoded.length);
            for (let i = 0; i < decoded.length; i++) {
              cipherBytes[i] = decoded.charCodeAt(i);
            }
          } catch (e) {
            console.error("Error decoding base64:", e);
            return { error: "Invalid base64 input" };
          }
        }
      } 
      else if (ciphertext.binary) {
        cipherBytes = this.binaryToBytes(ciphertext.binary);
      }
      else if (ciphertext instanceof Uint8Array) {
        cipherBytes = ciphertext;
      }
      else {
        return { error: "Invalid ciphertext format" };
      }
  
      const subKeys = this.generateSubKeys(key);
      
      let plainBlocks = [];
      for (let i = 0; i < cipherBytes.length; i += 8) {
        const blockBytes = cipherBytes.slice(i, i + 8);
        const binaryBlock = this.bytesToBinary(blockBytes);
        
        const plainBlock = this.processBlock(binaryBlock, subKeys, false);
        plainBlocks.push(plainBlock);
      }
      
      const binaryPlaintext = plainBlocks.join("");
      const plaintextBytes = this.binaryToBytes(binaryPlaintext);
      
      const unpaddedBytes = this.unpadInput(plaintextBytes);
      
      return {
        binary: binaryPlaintext,
        bytes: unpaddedBytes,
        plaintext: this.decoder.decode(unpaddedBytes),
        hex: this.binaryToHex(binaryPlaintext),
        base64: this.binaryToBase64(binaryPlaintext),
      };
    }
  
    visualizeEncryption(input, key) {
      const paddedBytes = this.padInput(input);
      const originalInputLength = this.encoder.encode(input).length;
      
      let steps = $("#steps");
      steps.empty();
    
      let final = $('#final_result');
      final.empty();
    
      let cipherBlocks = [];
      for (let i = 0; i < paddedBytes.length; i += 8) {
        const blockBytes = paddedBytes.slice(i, i + 8);
        const binaryBlock = this.bytesToBinary(blockBytes);
        const subKeys = this.generateSubKeys(key);
        const blockText = this.decoder.decode(blockBytes);
  
        const visibleChars = Array.from(blockText).map((char, index) => {
          const isPadding = (i + index) >= originalInputLength;
          return `<span class="block-char${isPadding ? ' padding-char' : ''}">${char}</span>`;
        }).join('');
  
        steps.append(
          `<div class="block-header">Processing Block: ${visibleChars}</div>`
        );
  
        let permutedBlock = this.permute(binaryBlock, this.IP);
        if (i === 0) {
          steps.append(`
            <div class="step">
              <h3>Step 1: Initial Permutation</h3>
              <p>Original Input (Text): ${visibleChars}</p>
              <p>Original Input (Binary): ${binaryBlock}</p>
              <p>Permuted Input: ${permutedBlock}</p>
              <p>K: ${key}</p>
              <p>K(n): ${subKeys.join(' ')}</p>
              <p>K(16): ${subKeys[15]}</p>
            </div>
          `);
        } else {
          steps.append(`
            <div class="step">
              <h3>Step 1: Initial Permutation</h3>
              <p>Original Input (Text): ${visibleChars}</p>
              <p>Original Input (Binary): ${binaryBlock}</p>
              <p>Permuted Input: ${permutedBlock}</p>
            </div>
          `);
        }
  
        let left = permutedBlock.substr(0, 32);
        let right = permutedBlock.substr(32);
  
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
            <p>Swapped Block: ${finalBlock}</p>
            <p>Final Block (Binary): ${cipherBlock}</p>
          </div>
        `);
      }
      
      const finalCipherBinary = cipherBlocks.join("");
      const cipherBytes = this.binaryToBytes(finalCipherBinary);
      
      $('#final_result').append(`
        <div class="final-output">
          <h3>Complete Encryption Result</h3>
          <p>Ciphertext (Binary): ${finalCipherBinary}</p>
          <p>Ciphertext (Hex): ${this.binaryToHex(finalCipherBinary)}</p>
          <p>Ciphertext (Base64): ${this.binaryToBase64(finalCipherBinary)}</p>
        </div>
      `);
      
      return {
        binary: finalCipherBinary,
        bytes: cipherBytes,
        hex: this.binaryToHex(finalCipherBinary),
        base64: this.binaryToBase64(finalCipherBinary)
      };
    }
    
    visualizeDecryption(ciphertext, key) {
      let cipherBytes;
      let binaryCiphertext;
      
      if (typeof ciphertext === "string") {
        if (/^[01]+$/.test(ciphertext)) {
          binaryCiphertext = ciphertext;
          cipherBytes = this.binaryToBytes(ciphertext);
        } 
        else if (/^[0-9A-Fa-f]+$/.test(ciphertext)) {
          binaryCiphertext = this.hexToBinary(ciphertext);
          cipherBytes = this.binaryToBytes(binaryCiphertext);
        }
        else {
          try {
            binaryCiphertext = this.base64ToBinary(ciphertext);
            cipherBytes = this.binaryToBytes(binaryCiphertext);
          } catch (e) {
            console.error("Error decoding base64:", e);
            return { error: "Invalid base64 input" };
          }
        }
      } 
      else if (ciphertext.binary) {
        binaryCiphertext = ciphertext.binary;
        cipherBytes = this.binaryToBytes(binaryCiphertext);
      }
      else if (ciphertext instanceof Uint8Array) {
        cipherBytes = ciphertext;
        binaryCiphertext = this.bytesToBinary(cipherBytes);
      }
      else {
        return { error: "Invalid ciphertext format" };
      }
      
      let steps = $("#steps");
      steps.empty();
    
      let final = $('#final_result');
      final.empty();
  
      const subKeys = this.generateSubKeys(key);
      
      let plainBlocks = [];
      for (let i = 0; i < binaryCiphertext.length; i += 64) {
        let block = binaryCiphertext.substr(i, 64);
        steps.append(
          `<div class="block-header">Processing Cipher Block: ${block}</div>`
        );
  
        let permutedBlock = this.permute(block, this.IP);
        steps.append(`
          <div class="step">
            <h3>Step 1: Initial Permutation</h3>
            <p>Original Ciphertext (Binary): ${block}</p>
            <p>Permuted Input: ${permutedBlock}</p>
          </div>
        `);
    
        let left = permutedBlock.substr(0, 32);
        let right = permutedBlock.substr(32);
  
        const decryptSubKeys = [...subKeys].reverse();
  
        for (let j = 0; j < 16; j++) {
          let oldLeft = left;
          left = right;
          
          let expandedRight = this.permute(right, this.E);
          let xorResult = this.xor(expandedRight, decryptSubKeys[j]);
          let sBoxOutput = this.sBoxSubstitution(xorResult);
          let feistelOutput = this.permute(sBoxOutput, this.P);
          
          right = this.xor(oldLeft, feistelOutput);
          
          steps.append(`
            <div class="step">
              <h3>Decryption Round ${j + 1}</h3>
              <div class="round-details">
                <p>Left Half: ${left}</p>
                <p>Right Half: ${right}</p>
                <p>Round Key: ${decryptSubKeys[j]}</p>
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
            <p>Swapped Block: ${finalBlock}</p>
            <p>Plain Block (Binary): ${plainBlock}</p>
          </div>
        `);
      }
      
      const binaryPlaintext = plainBlocks.join("");
      const plaintextBytes = this.binaryToBytes(binaryPlaintext);
  
      const unpaddedBytes = this.unpadInput(plaintextBytes);
      const plaintextString = this.decoder.decode(unpaddedBytes);
      
      $('#final_result').append(`
        <div class="final-output">
          <h3>Decryption Result</h3>
          <p>Binary Plaintext: ${binaryPlaintext}</p>
          <p>Hex Plaintext: ${this.binaryToHex(binaryPlaintext)}</p>
          <p>Plaintext: ${plaintextString}</p>
        </div>
      `);
      
      return {
        binary: binaryPlaintext,
        bytes: unpaddedBytes,
        plaintext: plaintextString,
        hex: this.binaryToHex(binaryPlaintext),
        base64: this.binaryToBase64(binaryPlaintext)
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
        const binaryString = atob(base64);
        const bytes = new Uint8Array(binaryString.length);
        
        for (let i = 0; i < binaryString.length; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }
        
        return this.bytesToBinary(bytes);
      } catch (e) {
        console.error("Error decoding base64:", e);
        return "";
      }
    }
  }