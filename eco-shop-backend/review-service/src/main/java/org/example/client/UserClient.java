package org.example.client;


import org.example.dto.UserEntity;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;
import java.util.Set;

@FeignClient(name = "user-service", path = "/users")
public interface UserClient {
    @GetMapping("/getUserByEmail")
    ResponseEntity<UserEntity> getUser(@RequestParam("userEmail") String userEmail);

    @PostMapping("/getUsersByIdsList")
    ResponseEntity<List<UserEntity>> getUsersByIdsList(@RequestBody List<Long> usersId);

}
