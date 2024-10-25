package org.example.service;

import lombok.AllArgsConstructor;
import org.apache.catalina.User;
import org.example.entity.UserEntity;
import org.example.repository.UserRepository;
import org.springframework.data.domain.Example;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@Service
public class UserService {
    private UserRepository userRepository;

    public List<UserEntity> getAllUsers() {
        return userRepository.findAll();
    }

    public UserEntity getUser(String userEmail) {
        return userRepository.findUserByEmail(userEmail);
    }

    public boolean addUser(UserEntity user) {
        UserEntity user_found_result = userRepository.findUserByEmail(user.getUserEmail());
        if (user_found_result != null){
            return false;
        }
        UserEntity user_created = UserEntity.builder()
                .givenName(user.getGivenName())
                .familyName(user.getFamilyName())
                .preferredUsername(user.getPreferredUsername())
                .userEmail(user.getUserEmail())
                .build();
        userRepository.save(user_created);
        return true;
    }


    public List<UserEntity> getUsersByIdsList(List<Long> usersId) {
        return userRepository.findAllUsersByListOfIds(usersId);
    }

    public UserEntity getUserById(Long userId) {
        return userRepository.findById(userId).get();
    }
}
