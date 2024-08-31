## Ethiopia Phone Number Formatter 🇪🇹

A simple npm package to format Ethiopian phone numbers to the ISP standard code.

### Installation via npm

```
npm install  --save phone-formater-eth
```

### Via CDN

```
<script src="https://cdn.jsdelivr.net/npm/phone-formater-eth@1.1.7/dist/index.min.js"></script>
```
 
### Usage
 ```
 const { formatPhone, checkOperator, isValid, parse} = require('phone-formater-eth');
   
   Or

 import { formatPhone, checkOperator, isValid, parse } from 'phone-formater-eth';

 ```

1. <b>formatPhone</b> - Formats an Ethiopian phone number to the ISP standard code.
     ##### Parameters - phone (string), type (string) ("local" | "international" (default)): The phone number to format.
     ##### Returns  - (string): The formatted phone number in ISP standard code.
     ### Examples

```
console.log(formatPhone('0912345678'));            // Outputs: +251912345678 - Int'l format
console.log(formatPhone('+251712345678',"local")); // Outputs: 0712345678    - Local
console.log(formatPhone('251912345678'."local"));  // Outputs: 0912345678    - Local
console.log(formatPhone('09123456789'));           // Outputs: +2519123456789
console.log(formatPhone('0712345678',"local"));    // Outputs: 0712345678    - Local
console.log(formatPhone('25191234567'));           // Outputs: +25191234567
console.log(formatPhone('0801234567'));            // Outputs: Invalid Phone
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


4. <b>parse</b> - Parse phone number to remove special characters like '-' and '(' ')' 
    ##### Parameters - phone (string): The phone number to cleaned.
    ##### Returns  - (string): The cleaned phone number if the phone is valid else "INVALID_PHONE_NUMBER"
    ### Examples

```
console.log(parse("(251) 911-123-456")); //25191112456
console.log(parse("(251) 911-123-456")); //25191112456
console.log(parse("251-911-123-456"));   //25191112456
console.log(parse("2519-11-123-456"));   //25191112456
```

### TODO  ☑️

1. isMobile - check if it's mobile sim. eg 09/07/+2519/7
2. isLandline - check if it's landline sim. eg.  +2511

   

### Contributions
PLease submit your contributions as PRs and also leave a good description for the PR




### License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.
