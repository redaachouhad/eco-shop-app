FROM openjdk:17-jdk-slim
WORKDIR /usr/app
COPY /target/*.jar review-service.jar
ENTRYPOINT ["java", "-jar", "review-service.jar"]