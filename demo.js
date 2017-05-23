const pool=require("./demo1");

pool.connect(function(err, client, done) {
  if(err) {
    return console.error('error fetching client from pool', err);
  }

  //use the client for executing the query
  client.query("select * from users", function(err, result) {
    //call `done(err)` to release the client back to the pool (or destroy it if there is an error)
    done(err);

    if(err) {
      return console.error('error running query', err);
    }
    console.log(result.rows[0].email);
    //output: 1
  });
});
