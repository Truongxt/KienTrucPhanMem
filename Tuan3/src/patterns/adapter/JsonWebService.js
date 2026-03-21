class JsonWebService {
  send(jsonPayload) {
    console.log("JsonWebService received:", jsonPayload);
    return { success: true, data: jsonPayload };
  }
}

module.exports = JsonWebService;
