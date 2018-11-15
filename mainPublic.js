const nforce = require('nforce');

let org = nforce.createConnection({
  clientId: 'clientId',
  clientSecret: 'secret',
  redirectUri: 'http://localhost:3000/',
  apiVersion: 'v43.0',
  environment: 'production',
  mode: 'single'
});

  // authenticate and return OAuth token
  org.authenticate({
    username: "usuario",
    password: "password" + "securityToken"
  }, function(err, resp){
    if (!err) {
      console.log('Successfully logged in! Cached Token: ' + org.oauth.access_token);
      // execute the query
      org.query({ query: 'select id, name from account limit 5' }, function(err, resp){
        if(!err && resp.records) {
          // output the account names
          for (i=0; i<resp.records.length;i++) {
            console.log(resp.records[i].get('name'));
          }
        }
      });
    }
    if (err) console.log(err);
  });