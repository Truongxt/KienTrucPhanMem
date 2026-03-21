const Task = require("./Task");
const TeamMember = require("./TeamMember");

function runTaskObserverDemo() {
  const task = new Task(101, "Design class diagram");

  const an = new TeamMember("An");
  const binh = new TeamMember("Binh");

  task.subscribe(an);
  task.subscribe(binh);

  task.setStatus("In Progress");
  task.setStatus("Done");
}

module.exports = { runTaskObserverDemo };
