## Ethiopia Phone Number Formatter 🇪🇹

A simple npm package to format Ethiopian phone numbers to the ISP standard code.

### Installation via npm

```
npm install  --save phone-formater-eth
```

### Via CDN

* Coming Soon
 
### Usage
 ```
 const { formatPhone, checkOperator, isValid } = require('phone-formater-eth');
   
   Or

 import { formatPhone, checkOperator, isValid } from 'phone-formater-eth';

 ```

1. <b>formatPhone</b> - Formats an Ethiopian phone number to the ISP standard code.
     ##### Parameters - phone (string): The phone number to format.
     ##### Returns  - (string): The formatted phone number in ISP standard code.
     ### Examples

```
console.log(formatPhone('0912345678'));    // Outputs: +251912345678
console.log(formatPhone('+251712345678')); // Outputs: +251712345678
console.log(formatPhone('251912345678'));  // Outputs: +251912345678
console.log(formatPhone('09123456789'));   // Outputs: +2519123456789
console.log(formatPhone('071234567'));     // Outputs: +25171234567
console.log(formatPhone('25191234567'));   // Outputs: +25191234567
console.log(formatPhone('0801234567'));    // Outputs: Invalid Phone
```

2. <b>checkOperator</b> - Checks the phone operator based on the formatted Ethiopian phone number.
    ##### Parameters - phone (string): The phone number to check.
    ##### Returns  - (string): The operator name or "Unknown" if the operator can't be determined.
    ### Examples

```
console.log(checkOperator('712345678'));      // Outputs: Safaricom
console.log(checkOperator('+251912345678'));  // Outputs: Ethio Telecom
console.log(checkOperator('0712345678'));     // Outputs: Safaricom
console.log(checkOperator('251912345678'));   // Outputs: Ethio Telecom
console.log(checkOperator('0812345678'));     // Outputs: Unknown
```

3. <b>isValid</b> - Checks if phone number is valid or not
    ##### Parameters - phone (string): The phone number to check.
    ##### Returns  - (boolean): <i>true</i> if the phone is valid else <i>false</i>
    ### Examples

```
console.log(isValid('712345678'));      // Outputs: true
console.log(isValid('+251912345678'));  // Outputs: true
console.log(isValid('07812345678'));    // Outputs: false
console.log(isValid('251912345678'));   // Outputs: true
console.log(isValid('0812345678'));     // Outputs: false
```

### TODO  ☑️

1. Parse - Cleans up or  normalizes phone.e.g  special characters  like - and ()
2. toLocal - Converts phone number to local | Ethiopian format. 09 or 07 format
3. toInternational - Converts phone number to Int'l | Ethiopian format. +2519/7
4. isMobile - check if it's mobile sim. eg 09/07/+2519/7
5. isLandline - check if it's landline sim. eg.  +2511

   

### Contributions
PLease submit your contributions as PRs and also leave a good description for the PR




### Licenses
MIT License


Copyright (c) 2024 Hulunlante Worku

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.