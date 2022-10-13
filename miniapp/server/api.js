const httpClient = require('http');
const BASE_PORT = 3000;
const fs = require('fs');

const baseHeader = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "OPTIONS, POST, GET, PUT, DELETE",
    "Content-Type": 'application/json; charset=UTF-8',
    "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
};

httpClient.createServer((request, response) => {
    if (request.method === 'OPTIONS') {
        response.writeHead(204, baseHeader);
        response.end();
    } else if (request.method === 'POST') {
        console.log("POST Request");
        saveUser(request, response, baseHeader);
    } else {
        console.log("GET Request");
        getUserList(response, baseHeader);
    }

}).listen(BASE_PORT);

console.log("Server listening on port: " + BASE_PORT);

async function saveUser(request, response, header) {
    await request.on('data', (data) => {
        let user = {};
        try {
            user = JSON.parse(data);
            const userList = JSON.parse(fs.readFileSync('db.json'));
            userList.users.push(user);
            fs.writeFileSync('db.json', JSON.stringify(userList, null, 2));
        } catch (err) {
            console.log(err);
            response.writeHead(500, baseHeader);
            response.end('Server error in file writting');
            return;
        }
        const savedUser = { name: user.name }
        response.writeHead(201, header);
        response.end(JSON.stringify(savedUser));
    });
}

function getUserList(response, header) {
    let allUserList;
    try {
        let data = fs.readFileSync('db.json');
        allUserList = JSON.parse(data).users;
    } catch (err) {
        console.log(err);
        response.writeHead(500, baseHeader);
        response.end('Server error in file-reading');
        return;
    }

    if (allUserList) {
        allUserList.reverse();
        response.writeHead(200, header);
        response.end(JSON.stringify(allUserList));
    } else {
        response.end(JSON.stringify([]))
    }

}