import request from "supertest";
import app from "../app.js";
import { getCollections } from "../database/connect.js";

beforeAll(async () => {
    await getCollections();
});

describe("Profiles endpoints", () => {
    describe("POST /profiles", () => {
        test("it should create a new profile with valid data", async () => {
            const response = await request(app)
                .post("/profiles")
                .send({ name: "Test Profile" });
            expect(response.statusCode).toBe(201);
            expect(response.body.message).toBe(
                "New Profile created successfully"
            );
        });

        test("it should return 400 if receive invalid data", async () => {
            const response = await request(app)
                .post("/profiles")
                .send({ description: "test bad request" });
            expect(response.statusCode).toBe(400);
            expect(response.body.message).toBe("Name is required");
        });
    });

    describe("GET /profiles", () => {
        test("it should return all profiles", async () => {
            const response = await request(app).get("/profiles");
            expect(response.statusCode).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);
            expect(response.body.length > 0).toBe(true);
        });
    });

    describe("GET /profiles/:id", () => {
        test("it should return a profile if exist", async () => {
            const response = await request(app).get("/profiles/1");
            expect(response.statusCode).toBe(200);
        });
        test("it should return 404 if profile doesn't exist", async () => {
            const response = await request(app).get("/profiles/100");
            expect(response.statusCode).toBe(404);
            expect(response.body.message).toBe("Profile for Id 100 not found");
        });
    });
});

describe("Users endpoints", () => {
    describe("POST /users", () => {
        test("it should create a new user and profile with valid data", async () => {
            const response = await request(app)
                .post("/users")
                .send({ name: "Test User" });
            expect(response.statusCode).toBe(201);
            expect(response.body.message).toBe("User created successfully");
            expect(response.body.userId).not.toBeNull();
        });

        test("it should return 400 if receive invalid data", async () => {
            const response = await request(app)
                .post("/users")
                .send({ description: "test bad request" });
            expect(response.statusCode).toBe(400);
            expect(response.body.message).toBe("User Name is required");
        });
    });

    describe("GET /users", () => {
        test("it should return all users", async () => {
            const response = await request(app).get("/users");
            expect(response.statusCode).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);
            expect(response.body.length > 0).toBe(true);
        });
    });

    describe("GET /users/:id", () => {
        test("it should return a user if exist", async () => {
            const response = await request(app).get("/users/1");
            expect(response.statusCode).toBe(200);
            expect(response.body.name).not.toBeNull();
        });
        test("it should return 404 if user doesn't exist", async () => {
            const response = await request(app).get("/users/100");
            expect(response.statusCode).toBe(404);
            expect(response.body.message).toBe("User with Id 100 not found");
        });
    });

    describe("POST /users/:userId/commnents", () => {
        test("it should create a new comment for user if data is valid", async () => {
            const response = await request(app)
                .post("/users/1/comments")
                .send({
                    title: "test comment",
                    description: "this is test for commenting",
                    vote: { mbti: "ISFJ", enneagram: null, zodiac: null },
                });
            expect(response.statusCode).toBe(201);
            expect(response.body.message).toBe(
                "Created a new Comment for User 1"
            );
            expect(response.body.commentId).not.toBeNull();
        });
        test("it should return 404 if user doesn't exist", async () => {
            const response = await request(app)
                .post("/users/100/comments")
                .send({
                    title: "test comment",
                    description: "this is test for commenting",
                    vote: { mbti: "ISFJ", enneagram: null, zodiac: null },
                });
            expect(response.statusCode).toBe(404);
            expect(response.body.message).toBe(
                "User not found"
            );
        });
        test("it should return 400 if detail of comment is missing", async () => {
            const response = await request(app)
                .post("/users/1/comments")
                .send({
                    description: "this is test for commenting",
                });
            expect(response.statusCode).toBe(400);
            expect(response.body.message).toBe(
                "Missing detail of comment"
            );
        });
    });

    describe("GET /users/:userId/commnents", () => {
        test("it should return all comments for user if user exist", async () => {
            const response = await request(app)
                .get("/users/1/comments");
            expect(response.statusCode).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);
        });
        test("it should return 404 if user doesn't exist", async () => {
            const response = await request(app)
                .get("/users/100/comments");
            expect(response.statusCode).toBe(404);
            expect(response.body.message).toBe(
                "User not found"
            );
        });
    });
});

describe("Comments endpoints", () => {
    describe("POST /comments/:commentId/like", () => {
        test("it should do like operation successfully if comment exist", async () => {
            const response = await request(app)
                .post("/comments/1/like");
            expect(response.statusCode).toBe(200);
            expect(response.body.message).toBe("Successfully liked");
            expect(response.body.comment).not.toBeNull();
        });

        test("it should return 404 if comment doesn't exist", async () => {
            const response = await request(app)
                .post("/comments/100/like");
            expect(response.statusCode).toBe(404);
            expect(response.body.message).toBe("Comment not found");
        });
    });

    describe("POST /comments/:commentId/unlike", () => {
        test("it should do unlike operation successfully if comment exist", async () => {
            const response = await request(app)
                .post("/comments/1/unlike");
            expect(response.statusCode).toBe(200);
            expect(response.body.message).toBe("Successfully disliked");
            expect(response.body.comment).not.toBeNull();
        });

        test("it should return 404 if comment doesn't exist", async () => {
            const response = await request(app)
                .post("/comments/100/unlike");
            expect(response.statusCode).toBe(404);
            expect(response.body.message).toBe("Comment not found");
        });
    });
})