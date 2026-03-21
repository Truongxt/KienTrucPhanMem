const Observer = require("../core/Observer");

class TeamMember extends Observer {
  constructor(name) {
    super();
    this.name = name;
  }

  update({ id, title, status }) {
    console.log(`[TeamMember: ${this.name}] Task #${id} (${title}) -> ${status}`);
  }
}

module.exports = TeamMember;
