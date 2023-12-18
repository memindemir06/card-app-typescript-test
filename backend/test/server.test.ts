import Prisma from "../src/db";
import { server } from "../src/server";

describe("server test", () => {
  it("should assert 1 + 1 is 2", () => {
    expect(1 + 1).toEqual(2);
  });
});

describe("GET /get/", () => {
  it("should return all entries", async () => {
    // Arrange: Create a test entry
    const testEntry = {
      title: "Test Title",
      description: "Test Description",
      created_at: new Date(),
      scheduled_date: new Date(),
    };
    const createdEntry = await Prisma.entry.create({ data: testEntry });

    // Act: Request all entries
    const response = await server.inject({
      method: "GET",
      url: "/get/",
    });

    const responseBody = JSON.parse(response.body);

    // Assert: Check the response
    expect(response.statusCode).toEqual(200);
    expect(responseBody).toContainEqual({
      id: createdEntry.id,
      title: testEntry.title,
      description: testEntry.description,
      created_at: createdEntry.created_at.toISOString(),
      scheduled_date: createdEntry.scheduled_date.toISOString(),
    });

    // Clean up: Delete the test entry
    await Prisma.entry.delete({ where: { id: createdEntry.id } });
  });
});

describe("POST /create/", () => {
  it("should create a new entry and return it", async () => {
    const response = await server.inject({
      method: "POST",
      url: "/create/",
      payload: {
        title: "Test Title",
        description: "Test Description",
        created_at: new Date(),
        scheduled_date: new Date(),
      },
    });

    const responseBody = JSON.parse(response.body);

    expect(response.statusCode).toEqual(200);
    expect(responseBody).toHaveProperty("id");
    expect(responseBody.title).toEqual("Test Title");
    expect(responseBody.description).toEqual("Test Description");

    // Clean up: delete the test entry
    await Prisma.entry.delete({ where: { id: responseBody.id } });
  });
});

describe("GET /get/:id", () => {
  it("should return the entry with the specified id", async () => {
    // Arrange: Create a test entry
    const testEntry = {
      title: "Test Title",
      description: "Test Description",
      created_at: new Date(),
      scheduled_date: new Date(),
    };
    const createdEntry = await Prisma.entry.create({ data: testEntry });

    // Act: Request the entry with the specified id
    const response = await server.inject({
      method: "GET",
      url: `/get/${createdEntry.id}`,
    });

    const responseBody = JSON.parse(response.body);

    // Assert: Check the response
    expect(response.statusCode).toEqual(200);
    expect(responseBody).toEqual({
      id: createdEntry.id,
      title: testEntry.title,
      description: testEntry.description,
      created_at: createdEntry.created_at.toISOString(),
      scheduled_date: createdEntry.scheduled_date.toISOString(),
    });

    // Clean up: Delete the test entry
    await Prisma.entry.delete({ where: { id: createdEntry.id } });
  });
});

describe("DELETE /delete/:id", () => {
  it("should delete the entry with the specified id", async () => {
    // Arrange: Create a test entry
    const testEntry = {
      title: "Test Title",
      description: "Test Description",
      created_at: new Date(),
      scheduled_date: new Date(),
    };
    const createdEntry = await Prisma.entry.create({ data: testEntry });

    // Act: Delete the entry with the specified id
    const response = await server.inject({
      method: "DELETE",
      url: `/delete/${createdEntry.id}`,
    });

    const responseBody = JSON.parse(response.body);

    // Assert: Check the response
    expect(response.statusCode).toEqual(200);
    expect(responseBody).toEqual({ msg: "Deleted successfully" });
  });
});

describe("PUT /update/:id", () => {
  it("should update the entry with the specified id", async () => {
    // Arrange: Create a test entry
    const testEntry = {
      title: "Test Title",
      description: "Test Description",
      created_at: new Date(),
      scheduled_date: new Date(),
    };
    const createdEntry = await Prisma.entry.create({ data: testEntry });

    // Act: Update the entry with the specified id
    const response = await server.inject({
      method: "PUT",
      url: `/update/${createdEntry.id}`,
      payload: {
        title: "Updated Title",
        description: "Updated Description",
        created_at: new Date(),
        scheduled_date: new Date(),
      },
    });

    const responseBody = JSON.parse(response.body);

    // Assert: Check the response
    expect(response.statusCode).toEqual(200);
    expect(responseBody).toEqual({ msg: "Updated successfully" });

    // Clean up: Delete the test entry
    await Prisma.entry.delete({ where: { id: createdEntry.id } });
  });
});
