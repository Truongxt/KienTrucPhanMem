/*
Adapter Pattern: JSON <-> XML bridge

JSON payload -> XmlJsonAdapter -> LegacyXmlSystem
                                   XML response -> adapter -> JSON
*/
const JsonWebService = require("./JsonWebService");
const LegacyXmlSystem = require("./LegacyXmlSystem");
const XmlJsonAdapter = require("./XmlJsonAdapter");

function runAdapterDemo() {
  const payload = {
    userId: 10,
    action: "borrow",
    item: "book"
  };

  const jsonService = new JsonWebService();
  jsonService.send(payload);

  const legacyXmlSystem = new LegacyXmlSystem();
  const adapter = new XmlJsonAdapter(legacyXmlSystem);
  const adaptedResponse = adapter.send(payload);

  console.log("Adapter response as JSON:", adaptedResponse);
}

module.exports = { runAdapterDemo };
