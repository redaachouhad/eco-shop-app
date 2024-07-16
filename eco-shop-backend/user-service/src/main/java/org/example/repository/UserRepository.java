package org.example.repository;

import org.example.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Long> {
    @Query("SELECT userEntity from UserEntity userEntity where userEntity.userEmail = :userEmail")
    UserEntity findUserByEmail(String userEmail);

    @Query("SELECT userEntity from UserEntity userEntity where userEntity.userId IN :usersId")
    List<UserEntity> findAllUsersByListOfIds(List<Long> usersId);
}
