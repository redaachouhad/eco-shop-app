package org.example.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.entity.BoughtProduct;


@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class ProductWithBoughtProduct {
    private Product product;
    private BoughtProduct boughtProduct;
}
