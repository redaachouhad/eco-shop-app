
FROM openjdk:17-jdk-slim
WORKDIR /usr/app
COPY /target/*.jar user-service.jar
ENTRYPOINT ["java", "-jar", "user-service.jar"]