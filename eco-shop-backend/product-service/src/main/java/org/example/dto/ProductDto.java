package org.example.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.entity.Category;
import org.example.entity.Product;
import org.example.entity.Property;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class ProductDto implements ProductFormInterface{
    private Product product;
    private Category category;
    private List<Property> properties;
}
