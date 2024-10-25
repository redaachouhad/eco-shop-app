package org.example.controller;

import lombok.AllArgsConstructor;
import org.example.dto.CartWithProduct;
import org.example.entity.Cart;
import org.example.service.CartService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/carts")
@AllArgsConstructor
public class CartController {
    private CartService cartService;
    @GetMapping("/getCartWithProductsByUserEmail")
    public ResponseEntity<List<CartWithProduct>> getCartWithProductsByUserEmail(@RequestParam("userEmail") String userEmail){
        return ResponseEntity.status(HttpStatus.OK).body(cartService.getCartWithProductsByUserEmail(userEmail));
    }

    @PostMapping("/addProductToCart")
    public ResponseEntity<Integer> addProductToCart(@RequestParam("userEmail") String userEmail, @RequestBody Cart cart){
        Integer response = cartService.addProductToCart(userEmail, cart);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }


    @DeleteMapping("/deleteProductOfCart")
    public ResponseEntity<Integer> deleteProductFromCart(@RequestParam("cartId") Long cartId){
        return ResponseEntity.status(HttpStatus.OK).body(cartService.deleteProductFromCart(cartId));
    }

    @PostMapping("/deleteListOfCart")
    public ResponseEntity<String> deleteListOfProductOfCart(@RequestBody List<Cart> listCarts){
        return ResponseEntity.status(HttpStatus.OK).body(cartService.deleteListOfProductOfCart(listCarts));
    }
}
