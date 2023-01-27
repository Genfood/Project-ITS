function test(testVar) {
    return function () {
        console.log(testVar.val);
        testVar.val = 212;
    }
}

function test2(testVar) {
    return function () {
        alert(window.getHarloweVariable("$testVariable"))
    }
}

function verify() {
    return function (algo, ...args) {
        switch (algo) {
            case "rsa":
                var options = $.terminal.parse_options(args);
                if (!options.m) {
                    this.error("no message specified");
                    return;
                }
                const ms = textToNumber(options.m);
                console.log(ms);
                const e = 87011n, n = 7085811221n;
                const pk = { e, n };
                console.log(pk);
                var encs = ms.map(function (x) {
                    const c = encrypt(x, pk);
                    return Number(c);
                });
                console.log(encs);

                var cdC = window.getHarloweVariable("$cdContent");
                
                console.log(cdC);

                const file = cdC[1];
                var encM = file.get("content");
                if(encM === encs.join(' ')) {
                    this.echo("verified!");
                } else {
                    this.echo("wrong message!");
                    $("#guy-1").show();
                }

                break;

            default:
                this.error("Command 'verify " + algo + "' Not Found!");
                break;
        }
    };

}

function ls() {
    return function () {
        var insertedItem = window.getHarloweVariable("$insertedItem");
        var item = (insertedItem == 0) ? "" : insertedItem.get("name");
        switch (item) {
            case "CD":
                var cdContent = window.getHarloweVariable("$cdContent");
                cdContent.forEach(element => {
                    this.echo(element.get("name"));
                });
                break;

            case "USB-Stick":
                var cdContent = window.getHarloweVariable("$usbContent");
                cdContent.forEach(element => {
                    this.echo(element.get("name"));
                });
                break;

            default:
                this.echo("The directory is empty. 🥲");
                break;
        }
    }
}

function cat() {
    return function (file) {
        console.log(file);
        var insertedItem = window.getHarloweVariable("$insertedItem");
        //console.log(_insertedItem.get("name"));
        //console.log(_insertedItem);

        var item = (insertedItem == 0) ? "" : insertedItem.get("name");
        switch (item) {
            case "CD":
                var cdContent = window.getHarloweVariable("$cdContent");
                console.log(cdContent);
                for (let i = 0; i < cdContent.length; i++) {
                    const f = cdContent[i];
                    if (f.get("name") == file) {
                        // in case the file is encrypted
                        if(f.has("isEnc") && f.get("isEnc")) {
                            let console = this;
                            this.read("The file is encrypted, pls enter the password:").then(async function(inp) {
                                if(f.get("key") == inp) {
                                    let isCDChallengeSolved = window.getHarloweVariable("$isCDChallengeSolved");
                                    // in case the player has encrypted file "file" 
                                    if (file == "file" && !isCDChallengeSolved) {
                                        window.setHarloweVariable("$isCDChallengeSolved", true);
                                    }
                                    console.echo(f.get("content"));
                                    return;
                                } else {
                                    console.error("Wrong password has been entered. Try again.")
                                }
                            });
                            return;
                        }
                        this.echo(f.get("content"));
                        return;
                    }
                }
                this.error("cat: " + file +": No such file or directory");
                break;

            case "USB-Stick":
                var usbContent = window.getHarloweVariable("$usbContent");
                for (let i = 0; i < usbContent.length; i++) {
                    const f = usbContent[i];
                    if (f.get("name") == file) {
                        this.echo(f.get("content"));
                    }
                }
                break;

            default:
                this.error("cat: " + file +": No such file or directory");
                break;
        }
    }
}

function mount() {
    return function (volume) {

        if(!volume) {
            this.error("Error! Please specify a volume to be mounted.");
            return;
        }

        const inventory = window.getHarloweVariable("$inventory");
        console.log(inventory);
        var searchFor = "";
        if (volume == "cd" || volume == "CD") {
            searchFor = "CD";
        } else if(volume.includes("usb") || volume.includes("USB")) {
            searchFor = "USB-Stick";
        } else {
            this.error("no such volume '" + volume + "' found");
            return;
        }

        for (let i = 0; i < inventory.length; i++) {
            const item = inventory[i];
            console.log(item);
            const itemName = item.get("name");
            if (itemName == searchFor) {
                if (searchFor == "CD"){
                    $("#guy-cd").show();
                }
                window.setHarloweVariable("$insertedItem", item);
                window.setHarloweVariable("$path", "~/" + itemName);
                return;
            }
        }
        this.error("no such volume '" + volume + "' found");
    };
}

function decrypt() {
    return function (file) {
        function test(params) {

        }
        var k, k2;
        this.read("Enter key: ", key => {
            this.echo(key);
            k = key;
        });

        this.read("Enter key2: ", key2 => {
            this.echo(key);
            k2 = key2;
        });



    }
}


function sleep(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}
   
async function loading(term, n, delay ) {
    for (let i = 0; i < n; i++) {
        term.echo(".", {newline: false});
        await sleep(delay);
    }
}

// DH-Keyexchange Game
function connect () {
    return async function() {
        user = window.getHarloweVariable("$name");
        let c = this;
        this.read(`${user}@oldServer\'s password:`).then(async function(password) {
            console.log(typeof password);
            if(password === "Th!s!sS3CurEP455W0Rd") {

                window.setHarloweVariable("$isHashChallengeSolved", true);
                c.echo('Trying to connect to OLD-SERVER ...');
                //await loading(this,25,200);
                c.clear();
                c.echo('CONNECTED\n');

                // Shared prime

                var p = 23;
                // Shared generator
                var g = 12;
                
                //Servers secret
                var v = 8;
                //Servers 
                var b = Math.pow(g,v) % p;


                await c.echo("Welcome, glad to have you back! Your last login is 242 days ago. Therefor we have to agree on a new shared secret. " +
                "I propose that we use the algorithm for Diffie Hellman key exchange for this. Don\'t worry though, I\'ll guide you through the process! But first we have to agree on a prime number P and a natural number G. "+
                "I'll pick these for us. Trust me on this!", {typing: true, keepWords: true, delay: 100, finalize: function(div) { } });


                c.echo("\n\n")
                await c.echo('I picked '+ p + ' as our prime number and ' + g + ' as our natural number. Don\'t forget these!', {typing: true, keepWords: true, delay: 100 });
                c.echo("\n\n")
                await c.echo('Now, try to think about a number smaller than ' + p + ". Let's call it u! Keep this number to yourself and don't tell anyone!", {typing: true, keepWords: true, delay: 100 });
                await c.echo('I need you to find a pen and paper now and calculate the following term.', {typing: true, keepWords: true, delay: 100 });

                c.echo("<math><mrow><mi>a</mi> <mo>=</mo> <msup><mi>g</mi><mi>u</mi></msup> <mo>mod</mo> <mi>p</mi></mrow></math>", {raw: true});
                c.echo("<math> <mo>&#x21d2;</mo> <mrow><mi>a</mi> <mo>=</mo> <msup><mi>"+g+"</mi><mi>u</mi></msup> <mo>mod</mo> <mi>"+p+"</mi></mrow> </math>", {raw: true});
                await c.echo('Remember, p='+p+' and g='+g+'! Just use your secret number u. Easy!', {typing: true, keepWords: true, delay: 100 });

                c.echo("\n\n")
                await c.echo('While you did your number crunching, I was also doing a calculation. My value for b='+b+'! Keep it in mind, you\'ll need it!', {typing: true, keepWords: true, delay: 100 });

                c.read('Please tell me, a=').then(async function(a) {

                    if(Number(a) < 0 || Number(a) > 22) {
                        await c.echo('What?! This is impossible. Please try to connect again.', {typing: true, keepWords: true, delay: 100 });
                        return;
                    }

                    console.log(a);
                    await c.echo('Thanks! We\'re half way there, but I need you to do one last calculation.', {typing: true, keepWords: true, delay: 100 });
                    c.echo("<math><mrow><mi>k</mi> <mo>=</mo> <msup><mi>b</mi><mi>u</mi></msup> <mo>mod</mo> <mi>p</mi></mrow></math>", {raw: true});
                    c.echo("<math> <mo>&#x21d2;</mo> <mrow><mi>k</mi> <mo>=</mo> <msup><mi>"+b+"</mi><mi>u</mi></msup> <mo>mod</mo> <mi>"+p+"</mi></mrow> </math>", {raw: true});
                    await c.echo('Remember that u is your secret number', {typing: true, keepWords: true, delay: 100 });
                    await c.echo('I was also able to calculate the value of k with my the number you told me. This will be our shared secret from now on!', {typing: true, keepWords: true, delay: 100 });
                    
                    var k = Math.pow(a, v) % p;
                    window.setHarloweVariable("$dhSharedSecret", k);
                });
            } else {
                c.echo("SSH Login failed! Bye.");
            }  
        });    
    }
}
