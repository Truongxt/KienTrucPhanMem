class XmlJsonAdapter {
  constructor(legacyXmlSystem) {
    this.legacyXmlSystem = legacyXmlSystem;
  }

  send(jsonPayload) {
    const xml = this.jsonToXml(jsonPayload);
    const xmlResponse = this.legacyXmlSystem.send(xml);
    return this.xmlToJson(xmlResponse);
  }

  jsonToXml(data) {
    const entries = Object.entries(data)
      .map(([key, value]) => `<${key}>${String(value)}</${key}>`)
      .join("");
    return `<request>${entries}</request>`;
  }

  xmlToJson(xml) {
    const statusMatch = xml.match(/<status>(.*?)<\/status>/);
    const rawMatch = xml.match(/<raw>(.*?)<\/raw>/);
    return {
      status: statusMatch ? statusMatch[1] : "unknown",
      rawXml: rawMatch ? rawMatch[1] : ""
    };
  }
}

module.exports = XmlJsonAdapter;
