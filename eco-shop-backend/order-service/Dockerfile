FROM openjdk:17-jdk-slim
WORKDIR /usr/app
COPY /target/*.jar order-service.jar
ENTRYPOINT ["java", "-jar", "order-service.jar"]