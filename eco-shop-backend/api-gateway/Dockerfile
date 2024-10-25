# Stage 2: Use OpenJDK 17 to run the application
FROM openjdk:17-jdk-slim
WORKDIR /usr/app
COPY /target/*.jar api-gateway.jar
ENTRYPOINT ["java", "-jar", "api-gateway.jar"]