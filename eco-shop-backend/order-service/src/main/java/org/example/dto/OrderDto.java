package org.example.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import org.example.entity.BoughtProduct;
import org.example.entity.Order;

import java.math.BigDecimal;
import java.util.List;

@AllArgsConstructor
@Data
@Builder
public class OrderDto {
    private Order order;
    private List<BoughtProduct> boughtProducts;
}
