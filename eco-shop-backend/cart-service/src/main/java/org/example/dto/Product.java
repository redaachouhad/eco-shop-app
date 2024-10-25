package org.example.dto;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Product {

    private Long productId;
    private Long productCategoryId;
    private String productTitle;
    @Column(length = 1000)
    private String productDescription;
    private String productImage;
    private BigDecimal productPrice;
    private Double productRating;
    private Long productNumberOfSales;
    private Long productRemainingQuantity;
}
