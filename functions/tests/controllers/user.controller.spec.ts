import request from "supertest";
import { expect } from "chai";
import app from "../../src/app"
import { User } from "../../src/models/user.interface"
import { describe } from "mocha"
import * as userService from "../../src/services/user.service";

import {stub, restore} from "sinon";


describe("User API", () => {
  let token: string;


  it("should create a new user", async function() {
    this.timeout(5000);

    const newUser: User = {
      email: "testuser@example.com",
    };
    stub(userService, "loginService").resolves("fake-jwt-token");
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
        token: "fake-jwt-token",
      }
    };

    expect(response.status).to.equal(201);
    expect(response.body).to.be.eql(responseBody);


    restore();
  });

  it("should get the created user", async function() {
    this.timeout(5000);
    stub(userService, "loginService").resolves("fake-jwt-token");
    stub(userService, "getUserByEmail").resolves({
      email: "fake.email@email.com",
      id: "1234"
    });
    const response = await request(app)
      .get(`/users/${encodeURIComponent("testuser@example.com")}`)
      .set("Authorization", `Bearer ${token}`);

    const responseBody = {
      status: "SUCCESS",
      statusCode: 200,
      message: "User found",
      result: {
        token: "fake-jwt-token",
      },
    };
    expect(response.status).to.equal(200);
    expect(response.body).to.be.eql(responseBody);
    restore();
  });

  it("should return 404 for a non-existing user", async function () {
    this.timeout(5000);
    stub(userService, "loginService").resolves(null);
    const response = await request(app)
      .get("/users/nonexistentuser@example.com")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).to.equal(404);
  });
});
