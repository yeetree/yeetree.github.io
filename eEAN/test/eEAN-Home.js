var term, parser;
var files = {
   "initscreen": [
      "*** eEAN Static Access Console v0.1 ***",
      "type 'help' for a list of commands."
    ],
   "help": [
       "Commands:",
       "  help .................... display this screen",
       "  test .............................. tests I/O"
    ]
};

function openTerminal() {
   if (!term || term.closed) {
      // create and open a terminal
      term = new Terminal(
         {
            handler: commandShell,
            termDiv: "termDiv",
            ps: ">",
            greeting: files.initscreen
         }
      );
      term.open();
      
      // create and configure the parser
      parser = new Parser();
      // only accept double and single quotes as quote characters
      parser.quoteChars = { "\"": true, "'": true };
      // set "-" (minus) as the option character (same as default)
      parser.optionChars = { "-": true };
   }
}

function commandShell() {
   this.newLine();
   parser.parseLine(this);
   if (this.argv.length == 0) {
   }
   else {
      var cmd = this.argv[this.argc++];
      cmd = cmd.toLowerCase();
      
      switch (cmd) {
         case "help":
            this.write(files.help);
            break;
		 case "test":
			this.write("testReturn");
            break;
	  }
   }
   this.prompt();
}
