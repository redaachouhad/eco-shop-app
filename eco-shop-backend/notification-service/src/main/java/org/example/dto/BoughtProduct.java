package org.example.dto;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.math.BigInteger;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder

public class BoughtProduct {
    private Long boughtProductId;
    private Long orderId;
    private Long productId;
    private BigInteger boughtProductQuantity;
    private BigDecimal boughtProductPricePerUnit;
    private String productName;
}
