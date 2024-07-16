package org.example.service;

import lombok.AllArgsConstructor;
import org.example.client.ReviewClient;
import org.example.dto.*;
import org.example.entity.Category;
import org.example.entity.Product;
import org.example.entity.Property;
import org.example.respository.CategoryRepository;
import org.example.respository.ProductRepository;
import org.example.respository.PropertyRepository;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigInteger;
import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@Service
public class ProductService {
    private CategoryRepository categoryRepository;
    private ProductRepository productRepository;
    private PropertyRepository propertyRepository;
    private ReviewClient reviewClient;

    // category
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    @Transactional
    public boolean addOneCategory(Category category) {
        boolean existCategory = categoryRepository.exists(Example.of(category));
        if (!existCategory) {
            categoryRepository.save(category);
            return true;
        }
        return false;
    }

    @Transactional
    public boolean deleteOneCategory(Long categoryId) {
        boolean existCategory = categoryRepository.existsById(categoryId);
        if (!existCategory) {
            return false;
        }
        categoryRepository.deleteById(categoryId);
        List<Product> products = productRepository.findAllByProductCategoryId(categoryId);
        productRepository.deleteAll(products);
        List<Long> idProductList = products.stream().map(Product::getProductId).toList();
        propertyRepository.deleteAllByPropertyProductIdList(idProductList);
        return true;
    }


    @Transactional
    public boolean updateOneCategory(Long categoryId, String categoryName) {
        Optional<Category> categoryOptional = categoryRepository.findById(categoryId);
        Optional<Category> categoryOptional1 = categoryRepository.findByCategoryName(categoryName);
        if (categoryOptional.isEmpty() || categoryOptional1.isPresent()) {
            return false;
        }
        Category category = Category.builder()
                .categoryId(categoryOptional.get().getCategoryId())
                .categoryName(categoryName)
                .build();
        categoryRepository.save(category);
        return true;
    }

    // product
    public List<ProductDtoWithoutProperties> getAllProducts() {

        return productRepository.findAllProductsWithCategories();
    }

    @Transactional
    public boolean addOneProduct(ProductDtoWithoutCategory productDtoWithoutCategory) {
        // adding the id of category to product and saving it.
        Product product = productDtoWithoutCategory.getProduct();
        Example<Product> productExample = Example.of(product);
        boolean existProduct = productRepository.existsByProductTitle(product.getProductTitle());
        if (existProduct) {
            return false;
        }

        existProduct = productRepository.exists(productExample);
        if (existProduct) {
            return false;
        }

        // adding the id of product to each property and saving them
        Product productSaved = productRepository.save(product);
        List<Property> properties = productDtoWithoutCategory.getProperties()
                .stream()
                .map(
                        item -> Property.builder()
                                .propertyProductId(productSaved.getProductId())
                                .propertyName(item.getPropertyName())
                                .propertyValue(item.getPropertyValue())
                                .build()
                )
                .toList();
        propertyRepository.saveAll(properties);
        return true;
    }

    @Transactional
    public boolean deleteOneProduct(Long productId) {
        boolean exist = productRepository.existsById(productId);
        if (!exist) {
            return false;
        }
        productRepository.deleteById(productId);
        propertyRepository.deleteAllPropertiesForOneProduct(productId);
        reviewClient.deleteReviewsByProductId(productId);
        return true;
    }


    public ProductFormInterface getOneProduct(Long productId, Long form) {

        Optional<Product> productOptional = productRepository.findById(productId);
        if (productOptional.isEmpty()) {
            return null;
        }
        Optional<Category> categoryOptional = categoryRepository.findById(productOptional.get().getProductCategoryId());
        if (categoryOptional.isEmpty()) {
            return null;
        }
        List<Property> properties = propertyRepository.findByPropertyProductId(productOptional.get().getProductId());
        ProductDto productDto = ProductDto.builder()
                .product(productOptional.get())
                .category(categoryOptional.get())
                .properties(properties)
                .build();
        if (form == 0) {
            return productDto;
        }
        List<ReviewWithUsers> reviewWithUsersList = reviewClient.getAllReviewsByProductId(productId).getBody();

        return OneProductDtoWithReviewsAndUsers.builder()
                .productDto(productDto)
                .reviewWithUsersList(reviewWithUsersList)
                .build();

    }


    public void editOneProduct(ProductDtoWithoutCategory productDtoWithoutCategory) {
        Optional<Product> productOptional = productRepository.findById(productDtoWithoutCategory.getProduct().getProductId());
        if (productOptional.isPresent()) {
            Product productToUpdate = productOptional.get();
            Product updatedProduct = Product.builder()
                    .productId(productToUpdate.getProductId())
                    .productCategoryId(productDtoWithoutCategory.getProduct().getProductCategoryId())
                    .productTitle(productDtoWithoutCategory.getProduct().getProductTitle())
                    .productDescription(productDtoWithoutCategory.getProduct().getProductDescription())
                    .productImage(productDtoWithoutCategory.getProduct().getProductImage())
                    .productPrice(productDtoWithoutCategory.getProduct().getProductPrice())
                    .productRating(productToUpdate.getProductRating())
                    .productNumberOfSales(productToUpdate.getProductNumberOfSales())
                    .productRemainingQuantity(productDtoWithoutCategory.getProduct().getProductRemainingQuantity())
                    .build();
            productRepository.save(updatedProduct);
            propertyRepository.deleteAllPropertiesForOneProduct(updatedProduct.getProductId());
            propertyRepository.saveAll(productDtoWithoutCategory.getProperties());
        }
    }

    public Page<ProductDtoWithoutProperties> getAllProductByFilter(FilterOfProduct filterOfProduct) {
        Integer size = filterOfProduct.getSize();
        Integer page = filterOfProduct.getPage();
        Integer filterMinPrice = filterOfProduct.getFilterMinPrice();
        Integer filterMaxPrice = filterOfProduct.getFilterMaxPrice();
        Integer filterCategory = filterOfProduct.getFilterCategory();
        Integer filterSortedBy = filterOfProduct.getFilterSortedBy();

        Pageable pageable = PageRequest.of(page, size);

        if (filterMinPrice<filterMaxPrice && filterMaxPrice != 0) {
            if (filterCategory == 0) {
                if (filterSortedBy == 1) {
                    return productRepository.getAllProductsByFiltersMinPriceMaxPriceSortedBy1(filterMinPrice, filterMaxPrice, pageable);
                } else if (filterSortedBy == 2) {
                    return productRepository.getAllProductsByFiltersMinPriceMaxPriceSortedBy2(filterMinPrice, filterMaxPrice, pageable);
                } else if (filterSortedBy == 3) {
                    return productRepository.getAllProductsByFiltersMinPriceMaxPriceSortedBy3(filterMinPrice, filterMaxPrice, pageable);
                } else if (filterSortedBy == 4) {
                    return productRepository.getAllProductsByFiltersMinPriceMaxPriceSortedBy4(filterMinPrice, filterMaxPrice, pageable);
                }
                return productRepository.getAllProductsByFiltersMinPriceMaxPrice0(filterMinPrice, filterMaxPrice, pageable);
            }

            if (filterSortedBy == 1) {
                return productRepository.getAllProductsByFiltersMinPriceMaxPriceCategorySortedBy1(filterMinPrice, filterMaxPrice, filterCategory, pageable);
            } else if (filterSortedBy == 2) {
                return productRepository.getAllProductsByFiltersMinPriceMaxPriceCategorySortedBy2(filterMinPrice, filterMaxPrice, filterCategory, pageable);
            } else if (filterSortedBy == 3) {
                return productRepository.getAllProductsByFiltersMinPriceMaxPriceCategorySortedBy3(filterMinPrice, filterMaxPrice, filterCategory, pageable);
            } else if (filterSortedBy == 4) {
                return productRepository.getAllProductsByFiltersMinPriceMaxPriceCategorySortedBy4(filterMinPrice, filterMaxPrice, filterCategory, pageable);
            }
            return productRepository.getAllProductsByFiltersMinPriceMaxPriceCategory0(filterMinPrice, filterMaxPrice, filterCategory, pageable);
        }
        if (filterCategory == 0) {
            if (filterSortedBy == 1) {
                return productRepository.getAllProductsByFiltersSortedBy1(pageable);
            } else if (filterSortedBy == 2) {
                return productRepository.getAllProductsByFiltersSortedBy2(pageable);
            } else if (filterSortedBy == 3) {
                return productRepository.getAllProductsByFiltersSortedBy3(pageable);
            } else if (filterSortedBy == 4) {
                return productRepository.getAllProductsByFiltersSortedBy4(pageable);
            }

            return productRepository.getAllProductsByFilters0(pageable);
        }

        if (filterSortedBy == 1) {
            return productRepository.getAllProductsByFiltersCategorySortedBy1(filterCategory, pageable);
        } else if (filterSortedBy == 2) {
            return productRepository.getAllProductsByFiltersCategorySortedBy2(filterCategory, pageable);
        } else if (filterSortedBy == 3) {
            return productRepository.getAllProductsByFiltersCategorySortedBy3(filterCategory, pageable);
        } else if (filterSortedBy == 4) {
            return productRepository.getAllProductsByFiltersCategorySortedBy4(filterCategory, pageable);
        }
        return productRepository.getAllProductsByFiltersCategory0(filterCategory, pageable);
    }

    public List<Product> getAllSimpleProductById(List<Long> listOfIds) {
        return productRepository.findAllProductsByListOfIds(listOfIds);
    }


    public Integer changingRemainingQuantity(Long productId, Long operation, BigInteger quantityToOrder) {
        Optional<Product> productOptional = productRepository.findById(productId);
        if (productOptional.isEmpty()){
            return 0;
        }
        Product product = productOptional.get();
        BigInteger actualRemainingQuantity = product.getProductRemainingQuantity();
        if (operation == 0){
            if (actualRemainingQuantity.compareTo(quantityToOrder) >= 0){
                actualRemainingQuantity = actualRemainingQuantity.subtract(quantityToOrder);
                product.setProductRemainingQuantity(actualRemainingQuantity);
                productRepository.save(product);
                return 1;
            }else{
                return 2;
            }
        }
        actualRemainingQuantity = actualRemainingQuantity.add(quantityToOrder);
        product.setProductRemainingQuantity(actualRemainingQuantity);
        productRepository.save(product);
        return 3;
    }


    public void changingRatingProduct(Long productId, double productRating) {
        Optional<Product> productOptional = productRepository.findById(productId);
        if (productOptional.isPresent()){
            Product product = productOptional.get();
            product.setProductRating(productRating);
            productRepository.save(product);
        }

    }


}
