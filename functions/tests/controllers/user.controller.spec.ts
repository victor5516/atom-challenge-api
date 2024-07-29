import request from "supertest";
import { expect } from "chai";
import app from "../../src/app"
import { User } from "../../src/models/user.interface"
import { describe } from "mocha"
import * as userService from "../../src/services/user.service";

import {stub, restore} from "sinon";


describe("User API", () => {

  afterEach(() => {
    restore();
  });

  it("should create a new user", async function() {
    this.timeout(5000);

    const newUser: User = {
      email: "testuser@example.com",
    };

    stub(userService, "addUser").resolves({ id: "1234" });

    const response = await request(app)
      .post("/users")
      .send(newUser);
    const responseBody = {
      status: "SUCCESS",
      statusCode: 201,
      message: "User created",
      result: {
        newUser: {
          id: "1234",
        },

      }
    };

    expect(response.status).to.equal(201);
    expect(response.body).to.be.eql(responseBody);



  });

  it("should get the created user", async function() {
    this.timeout(5000);

    stub(userService, "getUserByEmail").resolves({
      email: "fake.email@email.com",
      id: "1234"
    });
    const response = await request(app)
      .get(`/users/${encodeURIComponent("testuser@example.com")}`)


    const responseBody = {
      status: "SUCCESS",
      statusCode: 200,
      message: "User found",
      result: {
        user: {
          email: "fake.email@email.com",
          id: "1234"
        },
      },
    };
    expect(response.status).to.equal(200);
    expect(response.body).to.be.eql(responseBody);

  });

  it("should return 404 for a non-existing user", async function () {
    this.timeout(5000);
    stub(userService, "getUserByEmail").resolves(null);
    const response = await request(app)
      .get("/users/nonexistentuser@example.com")


    expect(response.status).to.equal(404);
  });
});
