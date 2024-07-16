package org.example.controller;

import lombok.AllArgsConstructor;
import org.example.dto.*;
import org.example.entity.Category;
import org.example.entity.Product;
import org.example.service.ProductService;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.math.BigInteger;
import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/products")
public class ProductController {
    private ProductService productService;

    // category
    @GetMapping("/getAllCategories")
    public  ResponseEntity<List<Category>> getAllCategories(){
        return ResponseEntity.status(HttpStatus.OK).body(productService.getAllCategories());
    }


    @PostMapping("/addOneCategory")
    public ResponseEntity<String> addOneCategory(@RequestBody Category category){
        boolean added = productService.addOneCategory(category);
        if (added){
            return ResponseEntity.status(HttpStatus.OK).body("The category is added successfully");
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("The category ("+category.getCategoryName() + ") already exist");
    }


    @PutMapping("/updateOneCategory")
    public ResponseEntity<String> updateOneCategory(@RequestParam("categoryId") Long categoryId,@RequestBody String categoryName){
        boolean updated = productService.updateOneCategory(categoryId, categoryName.trim());
        if (updated) {
            return ResponseEntity.status(HttpStatus.OK).body("The name of category with id "+categoryId + " is updated");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Category with id " + categoryId + " is not found or the category already " + categoryName.trim() +" exist");
    }


    @DeleteMapping("/deleteOneCategory")
    public ResponseEntity<String> deleteOneCategory(@RequestParam("categoryId") Long categoryId){
        System.out.println(categoryId);
        boolean deleted = productService.deleteOneCategory(categoryId);

        if (deleted){
            return ResponseEntity.status(HttpStatus.OK).body("Category deleted successfully");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Category not founded");
    }



    // products
    @GetMapping("/getAllProducts")
    public ResponseEntity<List<ProductDtoWithoutProperties>> getAllProducts(){
        return ResponseEntity.status(HttpStatus.OK).body(productService.getAllProducts());
    }

    @PostMapping("/getAllProductByFilter")
    public ResponseEntity<Page<ProductDtoWithoutProperties>> getAllProductByFilter(@RequestBody FilterOfProduct filterOfProduct){
        return ResponseEntity.status(HttpStatus.OK).body(productService.getAllProductByFilter(filterOfProduct));
    }

    @GetMapping("/getOneProduct")
    public ResponseEntity<ProductFormInterface> getOneProduct(@RequestParam("productId") Long productId, @RequestParam("form") Long form){
        ProductFormInterface productDtoList = productService.getOneProduct(productId, form);
        return ResponseEntity.status(HttpStatus.OK).body(productDtoList);
    }



    @PutMapping("/editOneProduct")
    public ResponseEntity<String> editOneProduct(@RequestBody ProductDtoWithoutCategory productDtoWithoutCategory){
        productService.editOneProduct(productDtoWithoutCategory);
        return ResponseEntity.status(HttpStatus.OK).body("The changes are successfully saved");
    }

    @PostMapping("/addOneProduct")
    public ResponseEntity<Boolean> addOneProduct(@RequestBody ProductDtoWithoutCategory productDtoWithoutCategory){
        boolean added = productService.addOneProduct(productDtoWithoutCategory);
        if (added){
            return ResponseEntity.status(HttpStatus.OK).body(true);
        }
        return ResponseEntity.status(HttpStatus.OK).body(false);
    }


    @DeleteMapping("/deleteOneProduct")
    public ResponseEntity<String> deleteOneProduct(@RequestParam("productId") Long productId){
        boolean deleted = productService.deleteOneProduct(productId);
        if (deleted){
            return ResponseEntity.status(HttpStatus.OK).body("The product with id " + productId + " is deleted");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("The product with id " + productId + " Not found");
    }


    @PostMapping("/getAllSimpleProductById")
    public ResponseEntity<List<Product>> getAllSimpleProductById(@RequestBody List<Long> listOfIds){
        return ResponseEntity.status(HttpStatus.OK).body(productService.getAllSimpleProductById(listOfIds));
    }


    @PostMapping("/changingRemainingQuantity")
    public ResponseEntity<Integer> changingRemainingQuantity(@RequestParam("productId") Long productId, @RequestParam("operation") Long operation, @RequestBody BigInteger quantityToOrder){
        Integer message = productService.changingRemainingQuantity(productId, operation, quantityToOrder);
        return ResponseEntity.status(HttpStatus.OK).body(message);
    }

    @PutMapping("/changingRatingProduct")
    public ResponseEntity<String> changingRatingProduct(@RequestParam("productId") Long productId,@RequestParam("productRating") double productRating){
        productService.changingRatingProduct(productId, productRating);
        return ResponseEntity.status(HttpStatus.OK).body("rating of product is changed");
    }



}
