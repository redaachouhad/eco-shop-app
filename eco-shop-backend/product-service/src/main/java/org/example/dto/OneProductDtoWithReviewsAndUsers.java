package org.example.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class OneProductDtoWithReviewsAndUsers implements ProductFormInterface{
    private ProductDto productDto;
    private List<ReviewWithUsers> reviewWithUsersList;
}
