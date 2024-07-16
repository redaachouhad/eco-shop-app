package org.example.controller;

import lombok.AllArgsConstructor;
import org.example.entity.UserEntity;
import org.example.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/users")
public class UserController {
    private UserService userService;

    @GetMapping("/getAllUsers")
    public ResponseEntity<List<UserEntity>> getAllUsers(){
        return ResponseEntity.status(HttpStatus.OK).body( userService.getAllUsers());
    }

    @GetMapping("/getUserByEmail")
    public ResponseEntity<UserEntity> getUser(@RequestParam("userEmail") String userEmail){
        return ResponseEntity.status(HttpStatus.OK).body(userService.getUser(userEmail));
    }

//    @GetMapping("/getUserBy")

    @PostMapping("/addUser")
    public ResponseEntity<String> addUser(@RequestBody UserEntity user){
        boolean added = userService.addUser(user);
        if (added){
            return ResponseEntity.status(HttpStatus.OK).body("the user is added successfully");
        }
        return ResponseEntity.status(HttpStatus.OK).body("the user already exists");
    }

    @PostMapping("/getUsersByIdsList")
    public ResponseEntity<List<UserEntity>> getUsersByIdsList(@RequestBody List<Long> usersId){
        return ResponseEntity.status(HttpStatus.OK).body(userService.getUsersByIdsList(usersId));
    }

    @GetMapping("/getUserById")
    public  ResponseEntity<UserEntity> getUserById(@RequestParam("userId") Long userId){
        return ResponseEntity.status(HttpStatus.OK).body(userService.getUserById(userId));
    }
}
