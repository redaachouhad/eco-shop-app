package org.example.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.entity.Cart;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class CartWithProduct {
    public Cart cart;
    public Product product;
}
