const request = require("supertest");
const app = require("../app/app.server");

describe("Unit testing the / route", () => {
  let server;
  beforeEach(() => {
    server = app.listen();
  });
  afterEach(() => {
    server.close();
  });

  it("should return OK status", () => request(server)
    .get("/")
    .then((response) => {
      expect(response.status).toEqual(200);
    }));

  it("should there is an element with id='application' to render react app", () => request(server)
    .get("/")
    .then((response) => {
      expect(response.text).toContain("<div id=\"application\"></div>");
    }));

  it("should there is login.js on rendering", () => request(server)
    .get("/")
    .then((response) => {
      expect(response.text).toMatch(
        /<script src="\/dist\/login-.[a-z0-9]+\.js"><\/script>/,
      );
    }));
});
