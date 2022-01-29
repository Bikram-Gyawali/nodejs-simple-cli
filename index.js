const args = process.argv;
const helper = require("./helpr.js");


switch (args[2]) {
  case "new": {
    helper.addNewTodo();
    break;
  }

  case "show": {
    helper.listFunction();
    break;
  }

  case "delete": {
    helper.deleteFunction();
    break;
  }

  case "done": {
    helper.doneFunction();
    break;
  }

  case "help": {
    helper.infoFunction();
    break;
  }

  case "report": {
    helper.reportFunction();
  }
  default: {
    helper.infoFunction();
  }
}
