package org.example.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.entity.Category;
import org.example.entity.Product;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class ProductDtoWithoutProperties {
    private Product product;
    private Category category;
}
