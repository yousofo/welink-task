
note: couldn't implement all requirements but i did *most* part in 18-20 hours total / 3-3.5 hours daily **(  i didn't have enough time )**

---

## business notes
- employee accounts must initially setup the gate in order for users to use it

## general notes
- make sure to turn off any 'video speed controller' extension in browser

---
## Project Setup
### Back-End
run 
1) npm i   
2) npm start

### Front-end
run
1) npm i
2) npm run build
3) npm run start

OR
1) npm i
2) npm run dev


---

## Backend changes
### edits

 old 
```	  app.use(cors) ```

new
 ```app.use(
      cors({
        origin: "http://localhost:3001",
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
        exposedHeaders: ["X-Custom-Header"],
        credentials: true,
      })
    );
  ``` 

for *CORS* issues


