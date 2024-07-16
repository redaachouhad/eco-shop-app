package org.example.entity;

import jakarta.persistence.*;
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
@Entity
@Table(name = "bought_products_table")
public class BoughtProduct {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long boughtProductId;
    private Long orderId;
    private Long productId;
    private BigInteger boughtProductQuantity;
    private BigDecimal boughtProductPricePerUnit;
    private String productName;
}
