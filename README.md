# **Eco-Sho-App (Ecommerce Application)**

Please Read the README.md file

## 1. Introduction :

Our ecommerce application uses Next.js for the frontend and Spring Boot for the backend. It's Dockerized for easy deployment and secured with Keycloak for user authentication. We've integrated Stripe for handling payments securely, ensuring a smooth shopping experience for our users.

## 2. Demo :

## 3. Conception & Architecture :

### 3.1 Overview :

Our ecommerce application follows a modern microservices architecture, with a frontend built using Next.js and a backend powered by Spring Boot. This architecture ensures scalability, maintainability, and separation of concerns across different modules of our application.

### 3.2. Analysis and Planning :

Before starting the development of this ecommerce application, a thorough analysis was conducted. This process included creating essential diagrams to ensure a clear understanding of the system's requirements and structure.

#### 3.2.1. Entity-Relationship (ER) Diagram :

Following the Use Case Diagram, an Entity-Relationship (ER) Diagram was created. This diagram focused on the database structure, identifying the main entities, their attributes, and the relationships between them.

![alt text](./image%20for%20ReadMe/mcd1.png)

#### 3.2.2. Translation to Relational Schema :

After defining the entities and their relationships in the ER diagram, the next step was the Translation to a Relational Schema. This process involved converting the conceptual model from the ER diagram into a relational model, which could be implemented in a relational database.

![alt text](./image%20for%20ReadMe/relationelle.png)

#### 3.2.3. Microservice Decomposition :

![alt text](./image%20for%20ReadMe/decompositionMicroservices.png)

#### 3.2.4. Use Case Diagram :

The use case diagram helped identify the main interactions between users (administrators, customer) and the system.

![alt text](./image%20for%20ReadMe/useCaseDiagram.png)

### 3.3. Frontend Components :

Next.js serves as the frontend framework for our application, focusing on:

- **Rendering the User Interface:** Dynamically rendering pages for a responsive user experience.
- **Handling Client-Side Interactions:** Managing user inputs and interactions on the client side.
- **Managing Routing:** Simplifying navigation between different sections of the application.

#### 3.3.1. Implemented pages:

- <span style="color:rgb(0,180,255)">**Dashboard page**</span> : The dashboard provides administrators with an overview of key metrics and activities within the ecommerce platform. It includes summarized data on sales, customer engagement, and inventory status, offering insights for strategic decision-making.

![alt text](./image%20for%20ReadMe/dashboardPage.png)

- <span style="color:rgb(0,180,255)">**Add Product Page**</span>: Administrators use this page to add new products to the ecommerce platform. They can input product details such as name, description, pricing, and images. It includes functionality for assigning products to specific categories and managing inventory.

![alt text](./image%20for%20ReadMe/createProductPage.png)

- <span style="color:rgb(0,180,255)">**Add New Category Page**</span> : This page allows administrators to create and manage product categories. Administrators can add new categories, and organize products effectively within the ecommerce catalog.

![alt text](./image%20for%20ReadMe/addCategoryPage.png)

- <span style="color:rgb(0,180,255)">**Profile Page**</span> : The profile page enables users (both administrators and customers) to view their personal information.

![alt text](./image%20for%20ReadMe/useProfilePage.png)

- <span style="color:rgb(0,180,255)">**Orders Page**</span> : This page lists all orders placed by customers. Administrators can view order details, including order number, customer information, order status, and total amount.

![alt text](./image%20for%20ReadMe/allOrdersPage.png)

- <span style="color:rgb(0,180,255)">**One Order Page**</span> : For detailed order management, this page displays comprehensive information about a single order. It includes specifics such as ordered items, quantities, prices, and payment status.

![alt text](./image%20for%20ReadMe/oneOrderDetails.png)

- <span style="color:rgb(0,180,255)">**All Products Page**</span> : This page displays a comprehensive list of all products available in the ecommerce catalog. It provides an overview of product names, categories, prices, and availability. Administrators and Customers can search, filter, and sort products to facilitate efficient product management

![alt text](./image%20for%20ReadMe/allProductPage.png)

- <span style="color:rgb(0,180,255)">**Edit One Product Page**</span> : Administrators use this page to modify existing product details. They can edit product information such as name, description, pricing, and images. It includes functionality for updating inventory levels, adjusting product categories, and managing product variants.

![alt text](./image%20for%20ReadMe/editOneProduct.png)

- <span style="color:rgb(0,180,255)">**One Product Details Page**</span> : This page provides detailed information about a specific product. It includes product attributes, descriptions, images, pricing, and availability. Customers can view comprehensive product details to make informed purchasing decisions.

![alt text](./image%20for%20ReadMe/oneProductPage.png)

- <span style="color:rgb(0,180,255)">**Cart Page**</span> : The cart page displays a summary of items that customers have added for purchase. It includes functionality for viewing item details, adjusting quantities, removing items, and calculating the total purchase amount. Customers can proceed directly to checkout from this page. The payment process is securely handled using Stripe, ensuring a smooth and safe transaction experience.

![alt text](./image%20for%20ReadMe/cartPage.png)

### 3.4. Backend Components :

![alt text](./image%20for%20ReadMe/backendMicroservice.png)

- **Product Service** : Manages product-related operations, including CRUD operations on products.
- **Review Service** : Handles product reviews, including CRUD operations on reviews and associating reviews with users and products.
- **Cart Service** : Manages shopping cart functionalities, including adding, updating, and removing items from the cart.
- **Order Service** : Manages order-related operations, including creating and tracking orders.
- **User Service** : Manages user information and authentication.
- **Notification Service** : Sends notifications to users about order status, promotions, etc.
- **API Gateway** : Acts as a single entry point for all clients, routing requests to appropriate microservices and handling cross-cutting concerns like authentication, logging, and rate limiting.
- **Eureka Server** : Provides service discovery, enabling microservices to locate each other.
- **Keycloak** : Provides user authentication and authorization services.
- **PostgreSQL Databases** : Each microservice has its own dedicated PostgreSQL database for data storage.

### 3.5. Security with keycloak :

Keycloak is integrated to manage user authentication and authorization. It secures both frontend and backend resources, ensuring that only authorized users can access certain functionalities.

![alt text](./image%20for%20ReadMe/architectureShema.png)

When a user creates an account, they will receive a confirmation link via email (you can find in your box email, else it is in spams) to validate their email address. This step ensures that the email provided is valid and belongs to the user.

When a user authenticates, a JWT token is generated in the frontend using NextAuth and Keycloak. This JWT token is included in HTTP requests sent to the backend. The backend verifies the validity of the token; if the token is validated by Keycloak, the request is processed accordingly. This ensures that all interactions with the backend are secure and that only authenticated users can perform specific actions.

### 3.6. Setup and installation :

#### 3.6.1. Prerequisites :

Before starting, you need to be sure that you have installed :

- java 21.0.2
- Node.js v20.9.0
- Docker Desktop
- Docker Compose
- Intellij (the prefered editor)

#### 3.6.2. Clone the Repository :

```bash
git clone https://github.com/redaachouhad/eco-shop-app.git
cd eco-shop-app
```

#### 3.6.3. Keycloak configuration :

we need to configure keycloak, so let follow those step carefully:

open the folder eco-shop-backend with **Intellij editor** and **Docker Desktop**. ( Intellij is the best editor for spring boot project).

then , you need to comment (i mean transforming code to comment) this part of code in the file <span style="color:rgb(0,180,255)">**" eco-shop-app/eco-shop-backend/docker-compose.yml "**</span>

```yaml
zookeeper:
  image: confluentinc/cp-zookeeper:7.0.1
  container_name: zookeeper
  ports:
    - "2181:2181"
  environment:
    ZOOKEEPER_CLIENT_PORT: 2181
    ZOOKEEPER_TICK_TIME: 2000
  networks:
    - app-network

      .
      .
      .

grafana:
  image: grafana/grafana:latest
  container_name: grafana
  restart: always
  ports:
    - ${GRAFANA_LOCAL_PORT}:${GRAFANA_DOCKER_PORT}
  links:
    - prometheus:prometheus
  volumes:
    - ./grafana:/var/lib/grafana
  environment:
    - GF_SECURITY_ADMIN_USER=admin
    - GF_SECURITY_ADMIN_PASSWORD=password
    - GF_SERVER_HTTP_PORT=${GRAFANA_LOCAL_PORT}
  networks:
    - app-network
```

so **docker-compose.yaml** will be like this:

```yaml
services:
  keycloak_db:
    image: postgres:latest
    container_name: keycloak_db_container
    volumes:
      - postgres_data:/var/lib/postgresql/data
    environment:
      POSTGRES_DB: ${POSTGRES_DB}
      POSTGRES_USER: ${POSTGRES_USER}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
    ports:
      - ${POSTGRES_LOCAL}:${POSTGRES_DOCKER}
    networks:
      - app-network

  keycloak_web:
    image: quay.io/keycloak/keycloak:23.0.6
    container_name: keycloak-web-container
    environment:
      KEYCLOAK_ADMIN: ${KEYCLOAK_ADMIN}
      KEYCLOAK_ADMIN_PASSWORD: ${KEYCLOAK_ADMIN_PASSWORD}
      KC_DB: postgres
      KC_DB_URL: jdbc:postgresql://keycloak_db:${POSTGRES_DOCKER}/${POSTGRES_DB}
      KC_DB_USERNAME: ${POSTGRES_USER}
      KC_DB_PASSWORD: ${POSTGRES_PASSWORD}
      KEYCLOAK_LOGLEVEL: INFO
      ROOT_LOGLEVEL: INFO
      KEYCLOAK_FRONTEND_URL: http://localhost:8080/auth
    ports:
      - ${KEYCLOAK_PORT_LOCAL}:${KEYCLOAK_PORT_DOCKER}
    depends_on:
      - keycloak_db
    command: ["start-dev", "--import-realm"]
    volumes:
      - ./keycloak/realms/:/opt/keycloak/data/import
    networks:
      - app-network

# zookeeper:
#   image: confluentinc/cp-zookeeper:7.0.1
#   container_name: zookeeper
#   ports:
#     - "2181:2181"
#   environment:
#     ZOOKEEPER_CLIENT_PORT: 2181
#     ZOOKEEPER_TICK_TIME: 2000
#   networks:
#     - app-network

#       .
#       .
#       .

# nextJsApp:
#   image: redachouhad665/redachouhad-eco-shop/frontend-nextjs-app:latest
#   container_name: frontend_nextJsApp
#   build:
#     context: ./../eco-shop-frontend
#     dockerfile: Dockerfile
#   ports:
#     - ${FRONTEND_LOCAL_PORT}:${FRONTEND_DOCKER_PORT}
#   environment:
#     NODE_ENV: production
#     KEYCLOAK_ISSUER_DOCKER: http://keycloak_web:8080/realms/eco-shop-app
#   depends_on:
#     - keycloak_web
#     - apiGateway
#   networks:
#     - app-network

networks:
  app-network:
    driver: bridge

volumes:
  review_service_db:
  user_service_db:
  product_service_db:
  cart_service_db:
  order_service_db:
  postgres_data:
    driver: local
```

then, run those commandes:

```bash
cd eco-shop-backend

docker compose up -d
```

Remarque:in the folder **eco-shop-app/eco-shop-backend/keycloak/realms/**, you will find a file called "realm-export.json" which contains the partial configuration of keycloak and it is exported automatically when you run the command : <span style="color:rgb(0,180,255)">**docker compose up -d**</span>

then in the terminal you will get :

![alt text](./image%20for%20ReadMe/running%20docker%20compose.png)

then open the url <span style="color:rgb(0,180,255)">**http://localhost:8080/**</span> in the browser, and click **Administration Console**:

![alt text](./image%20for%20ReadMe/keycloak_1.png)

then insert credentials like in the image:

- username: **admin**
- password: **password**

and click **Sign in**:

![alt text](./image%20for%20ReadMe/keycloak_2.png)

now you get the home page:

![alt text](./image%20for%20ReadMe/keycloak_3.png)

then in the left menu click on **"Users"**, then in you right click **"admin"**, then add your email valid (in my case i have choosed gmail), and activate **"Email verified"** as in this image, then click **"Save"**:

![alt text](./image%20for%20ReadMe/keycloak_4.png)

now, let's move to the realm of **"Eco-shop-app"** and click to it as in this image:

![alt text](./image%20for%20ReadMe/keycloak_5.png)

then click on **"Realm settings"**, then click on Email: and add the email of the admin that we have add before:

![alt text](./image%20for%20ReadMe/keycloak_7.png)

then scroll down and add the same email again and the password is **"app passwords"** that you should generate from your google account, and then click on **"Save"**, and you can click on **"Test Connection"**:

![alt text](./image%20for%20ReadMe/keycloak_8.png)

if every things is good then you will receive and email like that:

![alt text](./image%20for%20ReadMe/keycloak_9.png)

and you need to add the same "email" and "apps passwords" into files **"eco-shop-app/eco-shop-backend/notification-service/src/main/resources/application.properties"** and **"eco-shop-app/eco-shop-backend/notification-service/src/main/resources/application-docker.properties"**:

```yaml
.
.
.

spring.mail.port=587
spring.mail.username= your_email   <----- add here email
spring.mail.password= your_app_passwords_generated  <-------- put here the generated app password
spring.mail.properties.mail.smtp.auth=true

.
.
.
```

then click on **"Client"** in the left menu, then click on the client ID **"eco-shop-app-frontend"** in the table, then click **"Credentials"**, then click **"Regenerate"** and you get the client secret as in the image :

![alt text](./image%20for%20ReadMe/keycloak_6.png)

you need to copy the client secret, and add it in the file **"eco-shop-app/eco-shop-frontend/.env"** :

```init
KEYCLOAK_CLIENT_ID=eco-shop-app-frontend
KEYCLOAK_CLIENT_SECRET= your_secret_client_id <---- add it here
KEYCLOAK_ISSUER=http://localhost:8080/realms/eco-shop-app
    .
    .
    .
```

then we need the administrator of our application manually, so click on **"Users"** in the left menu, then click **"Add user"**, then add your username, the email of the admin, first name, last name, and click **"Click"**:

![alt text](./image%20for%20ReadMe/keycloak_10.png)

then click **"Credential"**, then click on **"Set password"**, then add you password, then click **"Save"**, then **"Save password"**:

![alt text](./image%20for%20ReadMe/keycloak_11.png)

after that, we need to assign the role by clicking **"Role Mapping"** and click on **"Assign Role"**, then click **"admin"**, then click on **"Assign"**:

![alt text](./image%20for%20ReadMe/keycloak_12.png)

the created admin is automatically the role of "Customer", so we need to unassign it from this role , by clicking on **"Groups"**, then select **"group_of_customers"**, then click on **"Leave"**

![alt text](./image%20for%20ReadMe/keycloak_13.png)

Now, we have finished the configuration of keycloak

#### 3.6.4. Running the application:

- **Locally** :

  - **Frontend** :

    you need to run those commands:

```bash
  cd eco-shop-frontend

  npm run dev
```

- **Backend** :

  you need to run microservice using Intellij:

  ![alt text](./image%20for%20ReadMe/microserviceRunn.png)

- **Deployed in Docker** :

  I have implemented Dockerfiles to dockerize the frontend part and the microservice. To deploy the whole application (frontend with backend) in docker , you need to

  ![alt text](./image%20for%20ReadMe/cleanPackage.png)

  then you need to uncomment the part that we have commented previously of code in **" docker-compose.yaml "** :

  ```yaml
  services:

  keycloak_db:
    image: postgres:latest
    container_name: keycloak_db_container
    volumes:
      - postgres_data:/var/lib/postgresql/data
    environment:
      POSTGRES_DB: ${POSTGRES_DB}
      POSTGRES_USER: ${POSTGRES_USER}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
    ports:
      - ${POSTGRES_LOCAL}:${POSTGRES_DOCKER}
    networks:
      - app-network

  keycloak_web:
    image: quay.io/keycloak/keycloak:23.0.6
    container_name: keycloak-web-container
    environment:
      KEYCLOAK_ADMIN: ${KEYCLOAK_ADMIN}
      KEYCLOAK_ADMIN_PASSWORD: ${KEYCLOAK_ADMIN_PASSWORD}
      KC_DB: postgres
      KC_DB_URL: jdbc:postgresql://keycloak_db:${POSTGRES_DOCKER}/${POSTGRES_DB}
      KC_DB_USERNAME: ${POSTGRES_USER}
      KC_DB_PASSWORD: ${POSTGRES_PASSWORD}
      KEYCLOAK_LOGLEVEL: INFO
      ROOT_LOGLEVEL: INFO
      KEYCLOAK_FRONTEND_URL: http://localhost:8080/auth
    ports:
      - ${KEYCLOAK_PORT_LOCAL}:${KEYCLOAK_PORT_DOCKER}
    depends_on:
      - keycloak_db
    command: ["start-dev", "--import-realm"]
    volumes:
      - ./keycloak/realms/:/opt/keycloak/data/import
    networks:
      - app-network

  zookeeper:
    image: confluentinc/cp-zookeeper:7.0.1
    container_name: zookeeper
    ports:
      - "2181:2181"
    environment:
      ZOOKEEPER_CLIENT_PORT: 2181
      ZOOKEEPER_TICK_TIME: 2000
    networks:
      - app-network

        .
        .
        .
        .

  nextJsApp:
    image: redachouhad665/redachouhad-eco-shop/frontend-nextjs-app:latest
    container_name: frontend_nextJsApp
    build:
      context: ./../eco-shop-frontend
      dockerfile: Dockerfile
    ports:
      - ${FRONTEND_LOCAL_PORT}:${FRONTEND_DOCKER_PORT}
    environment:
      NODE_ENV: production
      KEYCLOAK_ISSUER_DOCKER: http://keycloak_web:8080/realms/eco-shop-app
    depends_on:
      - keycloak_web
      - apiGateway
    networks:
      - app-network

  networks:
    app-network:
      driver: bridge

  volumes:
    review_service_db:
    user_service_db:
    product_service_db:
    cart_service_db:
    order_service_db:
    postgres_data:
      driver: local
  ```

you need to use commands:

```bash
cd eco-shop-backend

docker compose up -d --build
```

#### 3.6.5. Use Application:

Access the different parts of the application using the following URLs:

- Frontend: http://localhost:3000
- Backend: http://localhost:8088
- Keycloak: http://localhost:8080
