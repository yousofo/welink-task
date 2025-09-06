# Backend changes
## edits
### 1
  old 
  ```
    app.use(cors)
  ```
  new
  ```
    app.use(
      cors({
        origin: "http://localhost:3001",
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
        exposedHeaders: ["X-Custom-Header"],
        credentials: true,
      })
    );
  ```


## addidtions