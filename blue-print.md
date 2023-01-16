# Blue Print

## Solve Container / Caesar-Chiffre challenge

### Requirements
- none

### Steps to solve
1. go to office
2. go to desk
3. collect important note containing a password, encrypted with Caeser-Chiffre with a shift of 5
4. go to book shelf
5. collect book about Caeser-Chiffre to learn about it
6. decrypt the password in the note and write it down somewhere
7. enter password at office container
8. you now have access to the office container and collect the items stored there

## Solve USB-stick / MD5-Hash challenge

### Requirements
- solve container / Caeser-Chiffre challenge
- have the USB-stick from the drawer in the inventory

### Steps to solve
1. go to office
2. go to desk
3. collect folder containing rainbow table with some MD5 hashes
4. go to lab
5. go to PC
6. type `mount USB` or go to the inventory a click on the USB stick to insert it into the PC
7. type `ls` to see the content of the USB stick
8. use `cat` to see content of `README` and `server.md5`
9. note down the hash value you find in `server.md5`
10. open the rainbow table you found and note down the correct plain text password using the hash value

## Solve Server / Diffie-Hellman-Keyexchange

### Requirement
- obtain smartphone from the container
- finished MD5-Hash challenge

1. Go to PC
2. Execute `connect`
3. Use the password obtained by the rainbow table (MD5-Hash challenge)
4. Filecounter increases for solving MD5
5. Text guides through the Diffie-Hellman key exchange
6. Note down the calculated shared secret
7. Use the shared secret as a PIN for the smartphone
8. Filecounter increases for solving the Diffie-Hellman challenge

## Solve CD / RSA challenge

### Requirements

- solve container container / Caeser-Chiffre challenge
- have the CD from the drawer in the inventory

### Steps to solve

1. go to the PC
2. type `mount CD` or go to the inventory a click on the CD to insert it into the PC
3. type `ls` to see the content of the CD
4. with `cat` you can see the content of non encrypted files.
5. The file `RSA_file.info` contains important information on how to decrypt the file `RSA_file.enc`. The file `RSA_file.key` contains a RSA private key, which could be used to decrypt `RSA_file.enc`.  
<details><summary>6. Next we have to write an program or script to decrypt the content of `RSA_file.enc`, to get the content of it, type `cat RSA_file.enc`</summary>
<p>

  This is just an example of how to solve. [A running version of the script below, can be found on StackBlitz.](https://stackblitz.com/edit/js-duq9k8?file=index.js)
  
```js
 function rsaExample() {
  const n = 7085811221n;
  const d = 7085071307n;
  const encryptedMessages = [
    51191029n,
    2221684278n,
    1235109347n,
    5932720573n,
    5722816980n,
    407222931n,
    1597934719n,
    6297126078n,
    7002519417n,
  ];

  const secretKey = { d, n };
  console.log('Priv key decryption exponent: ' + Number(d));
  console.log('Priv key mod: ' + Number(n));
  console.log('Print all encrypted letters:');
  console.log(
    encryptedMessages.map(function (x) {
      return x.toString();
    })
  );

  var messages = encryptedMessages.map(function (c) {
    return decrypt(c, secretKey);
  });

  console.log(
    messages.map(function (x) {
      return x.toString();
    })
  );

  console.log(numberToText(messages));
}

function decrypt(c, secretKey) {
  const { d, n } = secretKey;

  const m = pow(c, d, n); //*/ c ** d % n;

  return m;
}

// Binary Exponentiation, because of large numbers...
function pow(a, b, n) {
  a = a % n;
  var result = 1n;
  var x = a;

  while (b > 0n) {
    var leastSignificantBit = b % 2n;
    b = b / 2n;

    if (leastSignificantBit == 1n) {
      result = result * x;
      result = result % n;
    }

    x = x * x;
    x = x % n;
  }
  return result;
}

function numberToText(numbers) {
  return numbers
    .map(function (x) {
      return String.fromCharCode(Number(x));
    })
    .join('');
}

rsaExample();

```

</p>
</details>

7. The decrypted password can now be used to see the content of `OTP_file.key.encfromrsa`, to open it type `cat OTP_file.key.encfromrsa` and enter the password.
8. Copy the presented decimal representation if the one-time-pad key and type `cat OTP_file.data` to the the one-time-pad encrypted data, copy it as well.

<details><summary>9. Write a script or prgram to get the decrypted message</summary>
<p>
  
  This is just an example of how to solve. [A running version of the script below, can be found on StackBlitz.](https://stackblitz.com/edit/js-25tea6?file=index.js)

```javascript
 function OTPExample() {
  const c = 33170895268295n;
  const k = 17025474858527n;
  const m = c ^ k;
  console.log('m: ' + m);
  console.log('k: ' + k);
  console.log('c: ' + c);
}
OTPExample();
```

</p>
</details>

10. Type `cat file` and use the decimal message as password
11. congrats you solved this challenge, the file counter should now be increased
