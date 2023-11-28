const express = require("express");
const {
    Octokit
} = require('octokit')
//create express app
const app = express();

//port at which the server will run
const port = 3000;

//create end point
app.get("/", async (request, response) => {
    try {
        const {
            owner,
            repository,
            oid
        } = request.query;
        const octokit = new Octokit({
            auth: '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'
        })
    
        let data = await octokit.request('GET /repos/{owner}/{repo}/commits/{ref}', {
            owner: owner,
            repo: repository,
            ref: oid,
            headers: {
                'X-GitHub-Api-Version': '2022-11-28'
            }
        })
        response.send(data);
    } catch (error) {
        console.log(error.message);
    }
});

app.get("/diff", async (request, response) => {
   try {
    const {
        owner,
        repository,
        baseBranch
    } = request.query;
    const octokit = new Octokit({
        auth: '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'
      })
      
     let data = await octokit.request('GET /repos/{owner}/{repo}/compare/{basehead}', {
        owner:owner,
        repo: repository,
        basehead: baseBranch,
        headers: {
          'X-GitHub-Api-Version': '2022-11-28'
        }
      })
    response.send(data);
   } catch (error) {
        console.log(error);
   }
});

//start server and listen for the request
app.listen(port, () =>
    //a callback that will be called as soon as server start listening
    console.log(`server is listening at http://localhost:${port}`)
);