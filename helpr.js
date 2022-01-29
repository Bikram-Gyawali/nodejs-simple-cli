const fs = require("fs");
const args = process.argv;
const currentDir = args[1].slice(0, -8);

if (fs.existsSync(currentDir + "todo.txt") === false) {
  let createStream = fs.createWriteStream("todo.txt");
  createStream.end();
}

if (fs.existsSync(currentDir + "done.txt") === false) {
  let createStream = fs.createWriteStream("done.txt");
  createStream.end();
}

const infoFunction = () => {
    console.log("hello from info");
  const usageText = `
      Usage:-
      $ node index.js new "todo task"   ---add a new task
      $ node index.js show              ---show all remaining tasks
      $ node index.js del Number        ---delete task
      $ node index.js done Number       ---complete task
      $ node index.js help              ---show instructions
      $ node index.js report            ---show stat  
      `;
  console.log(usageText);
};

const givemeFilter = (val) => {
  data = [];
  const fileData = fs.readFileSync(currentDir + val).toString();

  data = fileData.split("\n");

  return (filterData = data.filter(function (value) {
    return value != "";
  }));
};

const listFunction = () => {
  givemeFilter("todo.txt");
  if (filterData.length === 0) {
    console.log("There are no pending todos!");
  }

  for (let i = 0; i < filterData.length; i++) {
    console.log(filterData.length - i + ". " + filterData[i]);
  }
};

const addNewTodo = () => {
  const newTask = args[3];

  if (newTask) {
    const fileData = fs.readFileSync(currentDir + "todo.txt").toString();
    fs.writeFile(currentDir + "todo.txt", newTask + "\n" + fileData, (err) => {
      if (err) throw err;

      console.log('added todo:"' + newTask + '"');
    });
  } else {
    console.log("Error:unable to add new task... kei bigaris input feri her");
  }
};

const deleteFunction = () => {
  const deleteIndex = args[3];

  if (deleteIndex) {
    givemeFilter("todo.txt");

    if (deleteIndex > filterData.length || deleteIndex <= 0) {
      console.log(
        "Error: todo #" + deleteIndex + " does not exist.. unable to delete"
      );
    } else {
      filterData.splice(filterData.length - deleteIndex, 1);
      const newData = filterData.join("\n");

      fs.writeFile(currentDir + "todo.txt", newData, function (err) {
        if (err) throw err;

        console.log("Deleted todo #" + deleteIndex);
      });
    }
  } else {
    console.log("unable to delete any todo task");
  }
};

const doneFunction = () => {
  const doneIndex = args[3];

  if (doneIndex) {
    let dateObj = new Date();

    let dateString = dateObj.toISOString().substring(0, 10);

    const fileData = fs.readFileSync(currentDir + "todo.txt").toString();

    const doneData = fs.readFileSync(currentDir + "done.txt").toString();
    givemeFilter("done.txt");

    if (doneIndex > filterData.length || doneIndex < 0) {
      console.log("Error todo #" + doneIndex + "is not available");
    } else {
      const deleted = filterData.splice(fileData.length - doneIndex, 1);
      const newData = filterData.join("\n");

      fs.writeFile(currentDir + "todo.txt", newData, function (err) {
        if (err) throw err;
      });

      fs.writeFile(
        currentDir + "done.txt",
        "x " + dateString + " " + deleted + "\n" + doneData,
        function (err) {
          if (err) throw err;
          console.log("Marked todo #" + doneIndex + " as done.");
        }
      );
    }
  } else {
    console.log("argument pugena mero vai feri gar gandu");
  }
};

const reportFunction = () => {
  let todoData = [];
  let doneData = [];
  let dateObj = new Date();

  let dateString = dateObj.toISOString().substring(0, 10);

  const todo = fs.readFileSync(currentDir + "todo.txt").toString();
  const done = fs.readFileSync(currentDir + "done.txt").toString();

  todoData = todo.split("\n");
  let filterData = todoData.filter(function (value) {
    return value !== "";
  });

  givemeFilter("todo.txt");
  givemeFilter("done.txt");

  doneData = done.split("\n");
  let filterDoneData = doneData.filter(function (value) {
    return value !== "";
  });

  console.log(
    dateString +
      " " +
      "Pending: " +
      filterData.length +
      " Completed:" +
      filterDoneData.length
  );
};

module.exports = {
  infoFunction,
  addNewTodo,
  reportFunction,
  doneFunction,
  deleteFunction,
  listFunction,
};
