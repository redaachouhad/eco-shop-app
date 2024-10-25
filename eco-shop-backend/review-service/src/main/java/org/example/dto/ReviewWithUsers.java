package org.example.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.entity.Review;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class ReviewWithUsers {
    private UserEntity userEntity;
    private Review review;
}
