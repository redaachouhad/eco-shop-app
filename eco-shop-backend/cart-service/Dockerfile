FROM openjdk:17-jdk-slim
WORKDIR /usr/app
COPY /target/*.jar cart-service.jar
ENTRYPOINT ["java", "-jar", "cart-service.jar"]