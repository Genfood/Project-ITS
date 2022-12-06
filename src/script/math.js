//console.log(Math.pow(12, 12, 12));

var l = 'asd*#?ö'.split('').map(function (c) {
  return c.charCodeAt(0);
});

rsaExample();

function rsaExample() {
  const p = 73589n;
  const q = 96289n;

  const n = p * q;
  const phi = (p - 1n) * (q - 1n);

  const e = generateEncryptionExponent(phi);
  const d = computeDecryptionExponent(e, phi);

  const publicKey = { e, n };
  const secretKey = { d, n };
  console.log(Number(d));
  console.log(Number(n));

  const ms = textToNumber('^rR!*#.8ß');
  console.log(ms);

  var encs = ms.map(function (m) {
    const c = encrypt(m, publicKey);
    return c;
  });

  console.log(
    encs.map(function (x) {
      return x.toString();
    })
  );

  console.log('test1');
  var ms2 = encs.map(function (c) {
    return decrypt(c, secretKey);
  });

  console.log(
    ms2.map(function (x) {
      return x.toString();
    })
  );

  console.log(numberToText(ms2));
  // Hi
}

function numberToText(numbers) {
  return numbers
    .map(function (x) {
      return String.fromCharCode(Number(x));
    })
    .join('');
}

function textToNumber(text) {
  return text.split('').map(function (c) {
    return BigInt(c.charCodeAt(0));
  });
}

function computeDecryptionExponent(e, phi) {
  let d = extendedGcd(e, phi)[1];
  while (d < 1n) {
    d += phi;
  }

  return d;
}
function generateEncryptionExponent(phi) {
  let e = 87011n;

  while (gcd(e, phi) !== 1n) {
    e += 2n;
  }

  return e;
}

function encrypt(m, publicKey) {
  const { e, n } = publicKey;

  if (m < 0n || m >= n) {
    throw new Error(`Condition 0 <= m < n not met. m = ${m}`);
  }

  if (gcd(m, n) !== 1n) {
    throw new Error('Condition gcd(m, n) = 1 not met.');
  }

  const c = m ** e % n;

  return c;
}

function decrypt(c, secretKey) {
  const { d, n } = secretKey;

  const m = pow(c, d, n); //*/ c ** d % n;

  return m;
}

function extendedGcd(a, b) {
  var x = 0n,
    y = 1n,
    u = 1n,
    v = 0n;
  while (a != 0n) {
    let q = b / a;
    let r = b % a;
    let m = x - u * q;
    let n = y - v * q;
    b = a;
    a = r;
    x = u;
    y = v;
    u = m;
    v = n;
  }
  let gcd = b;
  return [gcd, x, y];
}

function gcd(m, n) {
  if (n == 0n) return m;
  return gcd(n, m % n);
}

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

// OTP stuff

function OTPExample() {
  mb = "100010101011100111110000011000110011111011000";            
  kb = "011110111110000001101011000011000111000011111";            
  const m = BigInt("0b" + mb);                                      // 19066400827352
  const k = BigInt("0b" + kb);                                      // 17025474858527
  const c = m ^ k; // 111100010101100110011011011011110100111000111 // 33170895268295
  console.log("m: " + m);
  console.log("k: " + k);
  console.log("c: " + c);
  console.log("kb: " + kb);
  console.log("mb: " + mb);
  console.log("cb: " + c.toString(2));

}