class DESEncryptor {
    constructor() {
        // Initial Permutation Table
        this.IP = [
            58, 50, 42, 34, 26, 18, 10, 2,
            60, 52, 44, 36, 28, 20, 12, 4,
            62, 54, 46, 38, 30, 22, 14, 6,
            64, 56, 48, 40, 32, 24, 16, 8,
            57, 49, 41, 33, 25, 17, 9, 1,
            59, 51, 43, 35, 27, 19, 11, 3,
            61, 53, 45, 37, 29, 21, 13, 5,
            63, 55, 47, 39, 31, 23, 15, 7
        ];

        // Final Permutation (Inverse IP)
        this.FP = [
            40, 8, 48, 16, 56, 24, 64, 32,
            39, 7, 47, 15, 55, 23, 63, 31,
            38, 6, 46, 14, 54, 22, 62, 30,
            37, 5, 45, 13, 53, 21, 61, 29,
            36, 4, 44, 12, 52, 20, 60, 28,
            35, 3, 43, 11, 51, 19, 59, 27,
            34, 2, 42, 10, 50, 18, 58, 26,
            33, 1, 41, 9, 49, 17, 57, 25
        ];

        // Expansion Permutation
        this.E = [
            32, 1, 2, 3, 4, 5,
            4, 5, 6, 7, 8, 9,
            8, 9, 10, 11, 12, 13,
            12, 13, 14, 15, 16, 17,
            16, 17, 18, 19, 20, 21,
            20, 21, 22, 23, 24, 25,
            24, 25, 26, 27, 28, 29,
            28, 29, 30, 31, 32, 1
        ];

        // P-Box Permutation
        this.P = [
            16, 7, 20, 21, 29, 12, 28, 17,
            1, 15, 23, 26, 5, 18, 31, 10,
            2, 8, 24, 14, 32, 27, 3, 9,
            19, 13, 30, 6, 22, 11, 4, 25
        ];

        // PC-1 Permutation (Key Generation)
        this.PC1 = [
            57, 49, 41, 33, 25, 17, 9,
            1, 58, 50, 42, 34, 26, 18,
            10, 2, 59, 51, 43, 35, 27, 19,
            11, 3, 60, 52, 44, 36, 63, 55,
            47, 39, 31, 23, 15, 7, 62, 54,
            46, 38, 30, 22, 14, 6, 61, 53,
            45, 37, 29, 21, 13, 5, 28, 20,
            12, 4
        ];

        // PC-2 Permutation (Key Generation)
        this.PC2 = [
            14, 17, 11, 24, 1, 5, 3, 28,
            15, 6, 21, 10, 23, 19, 12, 4,
            26, 8, 16, 7, 27, 20, 13, 2,
            41, 52, 31, 37, 47, 55, 30, 40,
            51, 45, 33, 48, 44, 49, 39, 56,
            34, 53, 46, 42, 50, 36, 29, 32
        ];

        // Complete S-Boxes
        this.S_BOXES = [
            // S-Box 1
            [
                [14, 4, 13, 1, 2, 15, 11, 8, 3, 10, 6, 12, 5, 9, 0, 7],
                [0, 15, 7, 4, 14, 2, 13, 1, 10, 6, 12, 11, 9, 5, 3, 8],
                [4, 1, 14, 8, 13, 6, 2, 11, 15, 12, 9, 7, 3, 10, 5, 0],
                [15, 12, 8, 2, 4, 9, 1, 7, 5, 11, 3, 14, 10, 0, 6, 13]
            ],
            // S-Box 2
            [
                [15, 1, 8, 14, 6, 11, 3, 4, 9, 7, 2, 13, 12, 0, 5, 10],
                [3, 13, 4, 7, 15, 2, 8, 14, 12, 0, 1, 10, 6, 9, 11, 5],
                [0, 14, 7, 11, 10, 4, 13, 1, 5, 8, 12, 6, 9, 3, 2, 15],
                [13, 8, 10, 1, 3, 15, 4, 2, 11, 6, 7, 12, 0, 5, 14, 9]
            ],
            // S-Box 3
            [
                [10, 0, 9, 14, 6, 3, 15, 5, 1, 13, 12, 7, 11, 4, 2, 8],
                [13, 7, 0, 9, 3, 4, 6, 10, 2, 8, 5, 14, 12, 11, 15, 1],
                [13, 6, 4, 9, 8, 15, 3, 0, 11, 1, 2, 12, 5, 10, 14, 7],
                [1, 10, 13, 0, 6, 9, 8, 7, 4, 15, 14, 3, 11, 5, 2, 12]
            ],
            // S-Box 4
            [
                [7, 13, 14, 3, 0, 6, 9, 10, 1, 2, 8, 5, 11, 12, 4, 15],
                [13, 8, 11, 5, 6, 15, 0, 3, 4, 7, 2, 12, 1, 10, 14, 9],
                [10, 6, 9, 0, 12, 11, 7, 13, 15, 1, 3, 14, 5, 2, 8, 4],
                [3, 15, 0, 6, 10, 1, 13, 8, 9, 4, 5, 11, 12, 7, 2, 14]
            ],
            // S-Box 5
            [
                [2, 12, 4, 1, 7, 10, 11, 6, 8, 5, 3, 15, 13, 0, 14, 9],
                [14, 11, 2, 12, 4, 7, 13, 1, 5, 0, 15, 10, 3, 9, 8, 6],
                [4, 2, 1, 11, 10, 13, 7, 8, 15, 9, 12, 5, 6, 3, 0, 14],
                [11, 8, 12, 7, 1, 14, 2, 13, 6, 15, 0, 9, 10, 4, 5, 3]
            ],
            // S-Box 6
            [
                [12, 1, 10, 15, 9, 2, 6, 8, 0, 13, 3, 4, 14, 7, 5, 11],
                [10, 15, 4, 2, 7, 12, 9, 5, 6, 1, 13, 14, 0, 11, 3, 8],
                [9, 14, 15, 5, 2, 8, 12, 3, 7, 0, 4, 10, 1, 13, 11, 6],
                [4, 3, 2, 12, 9, 5, 15, 10, 11, 14, 1, 7, 6, 0, 8, 13]
            ],
            // S-Box 7
            [
                [4, 11, 2, 14, 15, 0, 8, 13, 3, 12, 9, 7, 5, 10, 6, 1],
                [13, 0, 11, 7, 4, 9, 1, 10, 14, 3, 5, 12, 2, 15, 8, 6],
                [1, 4, 11, 13, 12, 3, 7, 14, 10, 15, 6, 8, 0, 5, 9, 2],
                [6, 11, 13, 8, 1, 4, 10, 7, 9, 5, 0, 15, 14, 2, 3, 12]
            ],
            // S-Box 8
            [
                [13, 2, 8, 4, 6, 15, 11, 1, 10, 9, 3, 14, 5, 0, 12, 7],
                [1, 15, 13, 8, 10, 3, 7, 4, 12, 5, 6, 11, 0, 14, 9, 2],
                [7, 11, 4, 1, 9, 12, 14, 2, 0, 6, 10, 13, 15, 3, 5, 8],
                [2, 1, 14, 7, 4, 10, 8, 13, 15, 12, 9, 0, 3, 5, 6, 11]
            ]
        ];

        // Rotation schedule for key generation
        this.SHIFT_SCHEDULE = [1, 1, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 1];
    }

    // Helper function to convert string to binary
    stringToBinary(str) {
        return str.split('').map(char => 
            char.charCodeAt(0).toString(2).padStart(8, '0')
        ).join('');
    }

    // Helper function to convert binary to string
    binaryToString(binary) {
        let result = '';
        for (let i = 0; i < binary.length; i += 8) {
            result += String.fromCharCode(parseInt(binary.substr(i, 8), 2));
        }
        return result;
    }

    // Permutation function
    permute(input, table) {
        return table.map(index => input[index - 1]).join('');
    }

    // XOR operation
    xor(a, b) {
        return a.split('').map((bit, i) => 
            bit === b[i] ? '0' : '1'
        ).join('');
    }

    // S-Box substitution
    sBoxSubstitution(input) {
        let result = '';
        for (let i = 0; i < 8; i++) {
            let block = input.substr(i * 6, 6);
            let row = parseInt(block[0] + block[5], 2);
            let col = parseInt(block.substr(1, 4), 2);
            let val = this.S_BOXES[i][row][col];
            result += val.toString(2).padStart(4, '0');
        }
        return result;
    }

    // Key generation
    generateSubKeys(key) {
        // Perform PC-1 permutation
        let permutedKey = this.permute(this.stringToBinary(key), this.PC1);
        
        // Split key into left and right halves
        let left = permutedKey.substr(0, 28);
        let right = permutedKey.substr(28);

        let subKeys = [];

        // Generate 16 round keys
        for (let i = 0; i < 16; i++) {
            // Perform left shifts
            left = this.circularLeftShift(left, this.SHIFT_SCHEDULE[i]);
            right = this.circularLeftShift(right, this.SHIFT_SCHEDULE[i]);

            // Combine halves and apply PC-2
            let combinedKey = left + right;
            let roundKey = this.permute(combinedKey, this.PC2);
            subKeys.push(roundKey);
        }

        return subKeys;
    }

    // Circular left shift
    circularLeftShift(bits, shift) {
        return bits.substr(shift) + bits.substr(0, shift);
    }

    // Feistel Function
    feistelFunction(right, roundKey) {
        // Expand right half
        let expandedRight = this.permute(right, this.E);

        // XOR with round key
        let xorResult = this.xor(expandedRight, roundKey);

        // S-Box substitution
        let sBoxOutput = this.sBoxSubstitution(xorResult);

        // P-Box permutation
        return this.permute(sBoxOutput, this.P);
    }

    // Main encryption function
    encrypt(input, key) {
        // Ensure input is 8 characters
        input = input.padEnd(8, '\0');
        input = input.substr(0, 8);

        // Convert input to binary
        let binaryInput = this.stringToBinary(input);

        // Initial Permutation
        let permutedInput = this.permute(binaryInput, this.IP);

        // Split into left and right halves
        let left = permutedInput.substr(0, 32);
        let right = permutedInput.substr(32);

        // Generate round keys
        let subKeys = this.generateSubKeys(key);

        // 16 Rounds of Encryption
        for (let i = 0; i < 16; i++) {
            let oldLeft = left;
            left = right;

            // Feistel Function
            let feistelOutput = this.feistelFunction(right, subKeys[i]);
            right = this.xor(oldLeft, feistelOutput);
        }

        // Swap left and right for final round
        let finalBlock = right + left;

        // Final Permutation (Inverse IP)
        let ciphertext = this.permute(finalBlock, this.FP);

        return ciphertext;
    }

    // Visualization function
    visualizeEncryption(input, key) {
        let steps = $('#steps');
        steps.empty();

        // Convert input to binary
        let binaryInput = this.stringToBinary(input);

        // Step 1: Initial Permutation
        let permutedInput = this.permute(binaryInput, this.IP);
        steps.append(`
            <div class="step">
                <h3>Step 1: Initial Permutation</h3>
                <p>Original Input (Binary): ${binaryInput}</p>
                <p>Permuted Input: ${permutedInput}</p>
            </div>
        `);

        // Split into left and right halves
        let left = permutedInput.substr(0, 32);
        let right = permutedInput.substr(32);

        // Generate round keys
        let subKeys = this.generateSubKeys(key);

        // 16 Rounds of Encryption
        for (let i = 0; i < 16; i++) {
            let oldLeft = left;
            left = right;

            // Feistel Function
            let expandedRight = this.permute(right, this.E);
            let xorResult = this.xor(expandedRight, subKeys[i]);
            let sBoxOutput = this.sBoxSubstitution(xorResult);
            let feistelOutput = this.permute(sBoxOutput, this.P);
            right = this.xor(oldLeft, feistelOutput);

            // Append round details
            steps.append(`
                <div class="step">
                    <h3>Round ${i + 1}</h3>
                    <div class="round-details">
                        <p>Left Half: ${left}</p>
                        <p>Right Half: ${right}</p>
                        <p>Round Key: ${subKeys[i]}</p>
                        <p>Expanded Right Half: ${expandedRight}</p>
                        <p>XOR Result: ${xorResult}</p>
                        <p>S-Box Output: ${sBoxOutput}</p>
                        <p>P-Box Output: ${feistelOutput}</p>
                    </div>
                </div>
            `);
        }

        // Swap left and right for final round
        let finalBlock = right + left;

        // Final Permutation
        let ciphertext = this.permute(finalBlock, this.FP);

        // Final Output
        steps.append(`
            <div class="step">
                <h3>Final Output</h3>
                <p>Ciphertext (Binary): ${ciphertext}</p>
                <p>Ciphertext (Hex): ${this.binaryToHex(ciphertext)}</p>
            </div>
        `);

        return ciphertext;
    }

    // Binary to Hex conversion
    binaryToHex(binary) {
        let hex = '';
        for (let i = 0; i < binary.length; i += 4) {
            let chunk = binary.substr(i, 4);
            hex += parseInt(chunk, 2).toString(16).toUpperCase();
        }
        return hex;
    }
}