FROM openjdk:17-jdk-slim
WORKDIR /usr/app
COPY /target/*.jar notification-service.jar
ENTRYPOINT ["java", "-jar", "notification-service.jar"]