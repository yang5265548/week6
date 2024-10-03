const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const User = require("../models/userModel");
const Workout = require("../models/workoutModel");
const workouts = require("./data/workouts.js");

let token = null;

beforeAll(async () => {
  await User.deleteMany({});
  const result = await api
    .post("/api/user/signup")
    .send({ email: "mattiv@matti.fi", password: "R3g5T7#gh" });
  token = result.body.token;
});

describe("workout api", () => {
  describe("when there is initially some workouts saved", () => {
    beforeEach(async () => {
      await Workout.deleteMany({});
      await api
        .post("/api/workouts")
        .set("Authorization", "bearer " + token)
        .send(workouts[0])
        .send(workouts[1]);
    });
    describe("when get all workouts", () => {
      test("Workouts are returned as json", async () => {
        await api
          .get("/api/workouts")
          .set("Authorization", "bearer " + token)
          .expect(200)
          .expect("Content-Type", /application\/json/);
      });
    })
    describe("when add a new workout", () => {
      test("New workout added successfully", async () => {
        const newWorkout = {
          title: "testworkout",
          reps: 10,
          load: 100,
        };
        await api
          .post("/api/workouts")
          .set("Authorization", "bearer " + token)
          .send(newWorkout)
          .expect(201);
      });

    });
    describe("when delete a workout", () => {
      test("Workout deleted successfully and return 204", async () => {
        const result = await api
          .post("/api/workouts")
          .set("Authorization", "bearer " + token)
          .send(workouts[2]);

        await api
          .delete(`/api/workouts/${result.body._id}`)
          .set("Authorization", "bearer " + token)
          .expect(200);
      });
    });
    describe("when update a workout",()=>{
      it("then retrun 200 and json",async()=>{
        const result1 =await api
        .post("/api/workouts")
        .set("authorization","bearer "+token)
        .send(workouts[3]);

        const updateWorkout = {
         
          reps: 20,
          load: 200
        }
        
        await api
        .get(`/api/workouts/${result1.body._id}`)
        .set("authorization","bearer "+token)
        .expect(200)

        await api
        .patch(`/api/workouts/${result1.body._id}`)
        .set("authorization","bearer "+token)
        .send(updateWorkout)
        .expect(200)
        .expect("Content-Type",/application\/json/);

      })
    })

    describe("when get a workout",()=>{
      it("then return 200 and json",async()=>{
        const result = await api
        .post("/api/workouts")
        .set("authorization","bearer "+token)
        .send(workouts[3]);

        await api
        .get(`/api/workouts/${result.body._id}`)
        .set("authorization","bearer "+token)
        .expect(200)
        .expect("Content-Type",/application\/json/);
      })
    })

})
});


afterAll(() => {
  mongoose.connection.close();
});
