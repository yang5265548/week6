import { request, expect } from "./config.js";


describe("Favorites API", function () {
  describe("POST /favorites", function () {
    describe("when posting a foavorite airport,need to be authenticated", function () {
      it("no authenticated, shuold return status 401", async function () {
        const response = await request.post("/favorites").send({
          airport_id: "YBR",
          note: "Going to Canada",
        });

        expect(response.status).to.eql(401);
      });

    });
    describe("when user save and delete their favorite airports", function () {
      let favoriteId;
      before(async function () {
        // Clear the favorites database
        const deletres = await request
          .delete("/favorites")
          .set("Authorization", "Bearer token=5XwHCKAW5TNWHPzGXyLBeHCf");
        console.log("DELETE /favorites response body:", deletres.status);

        const allres = await request
        .get("/favorites")
        .set("Authorization", "Bearer token=5XwHCKAW5TNWHPzGXyLBeHCf ");
        console.log("GET /favorites response body:", allres.body);

        const postResponse = await request
          .post("/favorites")
          .set("Authorization", "Bearer token=5XwHCKAW5TNWHPzGXyLBeHCf")
          .send({
            airport_id: "HKG",
            note: "Going to Canada",
          });
        if (postResponse.status !== 201) {
          console.log("POST /favorites response body:", postResponse.body);
        }

        expect(postResponse.status).to.eql(201);
        expect(postResponse.body.data.attributes.airport.name).to.eql(
          "Hong Kong International Airport"
        );
        expect(postResponse.body.data.attributes.note).to.eql("Going to Canada");

        favoriteId = postResponse.body.data.id;
      });

      it("should return 200 and the new note", async function () {
        const putResponse = await request
          .put(`/favorites/${favoriteId}`)
          .set("Authorization", "Bearer token=5XwHCKAW5TNWHPzGXyLBeHCf")
          .send({
            note: "My usual layover when visiting family and friends",
          });

        expect(putResponse.status).to.eql(200);
        expect(putResponse.body.data.attributes.note).to.eql(
          "My usual layover when visiting family and friends"
        );
      })

      it("should return 201 and 400 when get it again ", async function () {
        const deleteResponse = await request
          .delete(`/favorites/${favoriteId}`)
          .set("Authorization", "Bearer token=5XwHCKAW5TNWHPzGXyLBeHCf");

        expect(deleteResponse.status).to.eql(204);

        const getResponse = await request
          .get(`/favorites/${favoriteId}`)
          .set("Authorization", "Bearer token=5XwHCKAW5TNWHPzGXyLBeHCf");

        expect(getResponse.status).to.eql(404);

      })

    });


  });
  describe("GET /favorites", function () {
    describe("when user get their favorite airports", function (){
     it("should return status 200", async function () {
      const postResponse = await request
        .get("/favorites")
        .set("Authorization", "Bearer token=5XwHCKAW5TNWHPzGXyLBeHCf ");
      expect(postResponse.status).to.eql(200);
    }); 
    }) 
    
  });
});
