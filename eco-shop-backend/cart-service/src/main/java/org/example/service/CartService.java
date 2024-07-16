package org.example.service;

import lombok.AllArgsConstructor;
import org.example.client.ProductClient;
import org.example.client.UserClient;
import org.example.dto.CartWithProduct;
import org.example.dto.Product;
import org.example.dto.UserEntity;
import org.example.entity.Cart;
import org.example.repository.CartRepository;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@AllArgsConstructor
@Service
public class CartService {
    private CartRepository cartRepository;
    private UserClient userClient;
    private ProductClient productClient;
    public List<CartWithProduct> getCartWithProductsByUserEmail(String userEmail) {
        List<CartWithProduct> cartWithProducts = new ArrayList<>();
        UserEntity user = userClient.getUser(userEmail).getBody();
        Long userId = user.getUserId();
        List<Cart> carts = cartRepository.findAllByUserId(userId);
        List<Long> listOfIdsProducts = carts.stream().map(Cart::getProductId).toList();
        List<Product> productList = productClient.getAllSimpleProductById(listOfIdsProducts).getBody();
        if (productList == null){
            return cartWithProducts;
        }
        Map<Long, Product> mapOfProducts = productList.stream().collect(Collectors.toMap(Product::getProductId,product -> product));
        for (Cart cart:carts){
            cartWithProducts.add(
                    CartWithProduct.builder()
                            .cart(cart)
                            .product(mapOfProducts.get(cart.getProductId()))
                            .build()
            );
        }
        return cartWithProducts;
    }

    public Integer addProductToCart(String userEmail, Cart cart) {
        Long userId = Objects.requireNonNull(userClient.getUser(userEmail).getBody()).getUserId();
        Cart cartToAdd = Cart.builder()
                .userId(userId)
                .productId(cart.getProductId())
                .selectedProductQuantity(cart.getSelectedProductQuantity())
                .pricePerUnit(cart.getPricePerUnit())
                .build();
        Integer response = productClient.changingRemainingQuantity(cart.getProductId(),0,cart.getSelectedProductQuantity()).getBody();
        if (response == 0){
            return 0;
        }else if(response == 2){
            return 2;
        }
        cartRepository.save(cartToAdd);
        return 1;

    }

    public Integer deleteProductFromCart(Long cartId) {
        Cart cart = cartRepository.findById(cartId).get();
        Integer response = productClient.changingRemainingQuantity(cart.getProductId(),1,cart.getSelectedProductQuantity()).getBody();
        cartRepository.deleteById(cartId);
        if (response == 0){
            return 0;
        }else if(response == 2){
            return 2;
        }
        return 1;
    }

    public String deleteListOfProductOfCart(List<Cart> listCarts) {
        cartRepository.deleteAll(listCarts);
        return "Cart deleted";
    }
}
