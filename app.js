HEAD
import http from "http";

let tasks = [];
let idCounter = 1;

const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "application/json");

  const urlParts = req.url.split("/");
  const id = parseInt(urlParts[2]);

  // GET /tasks
  if (req.method === "GET" && req.url === "/tasks") {
    res.writeHead(200);
    res.end(JSON.stringify(tasks));
    return;
  }

  // GET /tasks/:id
  if (req.method === "GET" && urlParts[1] === "tasks" && id) {
    const task = tasks.find(t => t.id === id);

    if (!task) {
      res.writeHead(404);
      res.end(JSON.stringify({ message: "Task not found" }));
      return;
    }

    res.writeHead(200);
    res.end(JSON.stringify(task));
    return;
  }

  // POST /tasks
  if (req.method === "POST" && req.url === "/tasks") {
    let body = "";

    req.on("data", chunk => {
      body += chunk.toString();
    });

    req.on("end", () => {
      const newTask = JSON.parse(body);

      const task = {
        id: idCounter++,
        title: newTask.title
      };

      tasks.push(task);

      res.writeHead(201);
      res.end(JSON.stringify(task));
    });

    return;
  }

  // PATCH /tasks/:id
  if (req.method === "PATCH" && urlParts[1] === "tasks" && id) {
    let body = "";

    req.on("data", chunk => {
      body += chunk.toString();
    });

    req.on("end", () => {
      const update = JSON.parse(body);
      const task = tasks.find(t => t.id === id);

      if (!task) {
        res.writeHead(404);
        res.end(JSON.stringify({ message: "Task not found" }));
        return;
      }

      if (update.title) {
        task.title = update.title;
      }

      res.writeHead(200);
      res.end(JSON.stringify(task));
    });

    return;
  }

  // DELETE /tasks/:id
  if (req.method === "DELETE" && urlParts[1] === "tasks" && id) {
    const index = tasks.findIndex(t => t.id === id);

    if (index === -1) {
      res.writeHead(404);
      res.end(JSON.stringify({ message: "Task not found" }));
      return;
    }

    const deleted = tasks.splice(index, 1);

    res.writeHead(200);
    res.end(JSON.stringify(deleted[0]));
    return;
  }

  // 404 fallback
  res.writeHead(404);
  res.end(JSON.stringify({ message: "Route not found" }));
});

server.listen(3000, () => {
  console.log("Todo API running on http://localhost:3000");

import http from 'http';
import fs from 'fs';

const PORT = 3000;

const server = http.createServer((req, res) => {
  let filePath = '';

  if (req.url === '/home') {
    filePath = './pages/home.html';
  } else if (req.url === '/contact') {
    filePath = './pages/contact.html';
  } else {
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.end('<h1>404 - Page Not Found</h1>');
    return;
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/html' });
      res.end('<h1>500 - Server Error</h1>');
      return;
    }

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(data);
  });
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
764050f0cfc93374efc0196ba5ed359aa2011f94
});