class LegacyXmlSystem {
  send(xmlPayload) {
    console.log("LegacyXmlSystem received XML:", xmlPayload);
    return `<response><status>ok</status><raw>${xmlPayload}</raw></response>`;
  }
}

module.exports = LegacyXmlSystem;
