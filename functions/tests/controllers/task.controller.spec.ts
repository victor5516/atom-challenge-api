import request from "supertest";
import { expect } from "chai";
import app from "../../src/app"
import { Task } from "../../src/models/task.interface"
import { describe } from "mocha"
import * as taskService from "../../src/services/task.service";

import {stub, restore, useFakeTimers} from "sinon";

describe("Task API", () => {
  const now = new Date();
  let clock: sinon.SinonFakeTimers;
  beforeEach(() => {
    clock = useFakeTimers(now.getTime());
  });
  afterEach(() => {
    clock.restore();
    restore();
  });

  it("should create a new task", async function() {
    this.timeout(5000);
    const newTask: Partial<Task> = {
      title: "test task",
      description: "test description",
      completed: false,
    };
    stub(taskService, "addTask").resolves({ id: "1234" })
    const response = await request(app)
      .post("/tasks")
      .send(newTask);
    const responseBody = {
      status: "SUCCESS",
      statusCode: 201,
      message: "Task created",
      result: {
        id: "1234",
      }
    };
    expect(response.status).to.equal(201);
    expect(response.body).to.be.eql(responseBody);

  }
  );
  it("should get all tasks", async function() {
    this.timeout(5000);
    stub(taskService, "getTasks").resolves([
      {
        id: "1234",
        title: "test task",
        description: "test description",
        completed: false,
        createdAt: now,
      }
    ]);
    const response = await request(app)
      .get("/tasks");
    const responseBody = {
      status: "SUCCESS",
      statusCode: 200,
      message: "Tasks found",
      result: [
        {
          id: "1234",
          title: "test task",
          description: "test description",
          completed: false,
          createdAt: now.toISOString(),
        }
      ]
    };
    expect(response.status).to.equal(200);
    expect(response.body).to.be.eql(responseBody);

  }
  );
});

it("should update a task", async function() {
  this.timeout(5000);
  const updatedTask: Partial<Task> = {
    title: "updated task",
    description: "updated description",
    completed: true,
  };
  stub(taskService, "updateTask").resolves();
  const response = await request(app)
    .put("/tasks/1234")
    .send(updatedTask);
  const responseBody = {
    status: "SUCCESS",
    statusCode: 200,
    result: "Task updated",
  }
  expect(response.status).to.equal(200);
  expect(response.body).to.be.eql(responseBody);

}
);
it("should delete a task", async function() {
  this.timeout(5000);
  stub(taskService, "deleteTask").resolves();
  const response = await request(app)
    .delete("/tasks/1234");
  const responseBody = {
    status: "SUCCESS",
    statusCode: 200,
    result: "Task deleted",
  }
  expect(response.status).to.equal(200);
  expect(response.body).to.be.eql(responseBody);

}
);