# **Eco-Sho-App (Ecommerce Application)**

## 1. Overview :

Our ecommerce application uses Next.js for the frontend and Spring Boot for the backend. It's Dockerized for easy deployment and secured with Keycloak for user authentication. We've integrated Stripe for handling payments securely, ensuring a smooth shopping experience for our users.

## 2. Features :

- ### **Product browsing and filtering**:

  Customers can browse a diverse range of products categorized and filtered by criteria such as category, price range, and popularity.

- ### **Cart management for customers**:

  Customers can add products to their cart, view contents, adjust quantities, and remove items before proceeding to checkout.

- ### **Secure checkout with Stripe for payments**:

  Integrated Stripe ensures secure and seamless payment processing. Payment details are handled securely to ensure a smooth transaction experience.

- ### **Admin portal for product and order management**:

  Administrators access a dedicated portal to manage product listings, update inventory, add new products, and track orders. They can also view and manage customer information as needed.

- ### **User (Admin or Customer) authentication and authorization with Keycloak integration**:

  Keycloak integration provides robust authentication and authorization for both admins and customers. It ensures secure access to application features and data, ensuring privacy and security.

## 3. Architecture :

### 3.1 Overview :

Our ecommerce application follows a modern microservices architecture, with a frontend built using Next.js and a backend powered by Spring Boot. This architecture ensures scalability, maintainability, and separation of concerns across different modules of our application.

### 3.2. Frontend Components :

Next.js serves as the frontend framework for our application, focusing on:

- **Rendering the User Interface:** Dynamically rendering pages for a responsive user experience.
- **Handling Client-Side Interactions:** Managing user inputs and interactions on the client side.
- **Managing Routing:** Simplifying navigation between different sections of the application.

#### 3.2.1. Implemented pages:

- **[Dashboard page](https://github.com/)** : The dashboard provides administrators with an overview of key metrics and activities within the ecommerce platform. It includes summarized data on sales, customer engagement, and inventory status, offering insights for strategic decision-making.

![alt text](./image%20for%20ReadMe/dashboardPage.png)

- **[Add Product Page](https://github.com/)** : Administrators use this page to add new products to the ecommerce platform. They can input product details such as name, description, pricing, and images. It includes functionality for assigning products to specific categories and managing inventory.

![alt text](./image%20for%20ReadMe/createProductPage.png)

- **[Add New Category Page](https://github.com/)** : This page allows administrators to create and manage product categories. Administrators can add new categories, and organize products effectively within the ecommerce catalog.

![alt text](./image%20for%20ReadMe/addCategoryPage.png)

- **[Profile Page](https://github.com/)** : The profile page enables users (both administrators and customers) to view their personal information.

![alt text](./image%20for%20ReadMe/useProfilePage.png)

- **[Orders Page](https://github.com/)** : This page lists all orders placed by customers. Administrators can view order details, including order number, customer information, order status, and total amount.

![alt text](./image%20for%20ReadMe/allOrdersPage.png)

- **[One Order Page](https://github.com/)** : For detailed order management, this page displays comprehensive information about a single order. It includes specifics such as ordered items, quantities, prices, and payment status.

![alt text](./image%20for%20ReadMe/oneOrderDetails.png)

- **[All Products Page](https://github.com/)** : This page displays a comprehensive list of all products available in the ecommerce catalog. It provides an overview of product names, categories, prices, and availability. Administrators and Customers can search, filter, and sort products to facilitate efficient product management

![alt text](./image%20for%20ReadMe/allProductPage.png)

- **[Edit One Product Page](https://github.com/)** : Administrators use this page to modify existing product details. They can edit product information such as name, description, pricing, and images. It includes functionality for updating inventory levels, adjusting product categories, and managing product variants.

![alt text](./image%20for%20ReadMe/editOneProduct.png)

- **[One Product Details Page](https://github.com/)** : This page provides detailed information about a specific product. It includes product attributes, descriptions, images, pricing, and availability. Customers can view comprehensive product details to make informed purchasing decisions.

![alt text](./image%20for%20ReadMe/oneProductPage.png)

- **[Cart Page](https://github.com/)** : The cart page displays a summary of items that customers have added for purchase. It includes functionality for viewing item details, adjusting quantities, removing items, and calculating the total purchase amount. Customers can proceed to checkout directly from this page.

![alt text](./image%20for%20ReadMe/cartPage.png)
