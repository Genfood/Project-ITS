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
                }

                break;

            default:
                this.error("Command 'verify " + algo + "' Not Found!");
                break;
        }
    };

}

function ls(insertedItem, cdContent) {
    return function () {
        var item = (insertedItem == 0) ? "" : insertedItem.get("name");
        switch (item) {
            case "CD":
                cdContent.forEach(element => {
                    this.echo(element.get("name"));
                });
                break;

            case "USB":
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
                        this.echo(f.get("content"));
                        return;
                    }
                }
                this.error("cat: " + file +": No such file or directory");
                break;

            default:
                this.error("cat: " + file +": No such file or directory");
                break;
        }
    }
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
