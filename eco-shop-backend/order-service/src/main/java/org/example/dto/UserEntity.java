package org.example.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class UserEntity {
    private Long userId;
    private String userEmail;
    private String preferredUsername;
    private String givenName;
    private String familyName;
}
