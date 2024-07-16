package org.example.respository;

import org.example.dto.ProductDtoWithoutProperties;
import org.example.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findAllByProductCategoryId(Long categoryId);


    boolean existsByProductTitle(String productTitle);


    @Query( "SELECT new org.example.dto.ProductDtoWithoutProperties(p, c)"+
            " FROM Product p JOIN Category c ON p.productCategoryId = c.categoryId"
    )
    List<ProductDtoWithoutProperties> findAllProductsWithCategories();


    @Query( "SELECT new org.example.dto.ProductDtoWithoutProperties(p, c)"+
            " FROM Product p JOIN Category c ON p.productCategoryId = c.categoryId"+
            " WHERE p.productPrice >= :filterMinPrice AND p.productPrice <= :filterMaxPrice"
    )
    Page<ProductDtoWithoutProperties> getAllProductsByFiltersMinPriceMaxPrice0(Integer filterMinPrice, Integer filterMaxPrice, Pageable pageable);



    @Query( "SELECT new org.example.dto.ProductDtoWithoutProperties(p, c)"+
            " FROM Product p JOIN Category c ON p.productCategoryId = c.categoryId"+
            " WHERE p.productPrice >= :filterMinPrice AND p.productPrice <= :filterMaxPrice"+
            " ORDER BY p.productPrice ASC"
    )
    Page<ProductDtoWithoutProperties> getAllProductsByFiltersMinPriceMaxPriceSortedBy1(Integer filterMinPrice, Integer filterMaxPrice, Pageable pageable);


    @Query( "SELECT new org.example.dto.ProductDtoWithoutProperties(p, c)"+
            " FROM Product p JOIN Category c ON p.productCategoryId = c.categoryId"+
            " WHERE p.productPrice >= :filterMinPrice AND p.productPrice <= :filterMaxPrice"+
            " ORDER BY p.productPrice DESC"
    )
    Page<ProductDtoWithoutProperties> getAllProductsByFiltersMinPriceMaxPriceSortedBy2(Integer filterMinPrice, Integer filterMaxPrice, Pageable pageable);


    @Query( "SELECT new org.example.dto.ProductDtoWithoutProperties(p, c)"+
            " FROM Product p JOIN Category c ON p.productCategoryId = c.categoryId"+
            " WHERE p.productPrice >= :filterMinPrice AND p.productPrice <= :filterMaxPrice"+
            " ORDER BY p.productRating ASC"
    )
    Page<ProductDtoWithoutProperties> getAllProductsByFiltersMinPriceMaxPriceSortedBy3(Integer filterMinPrice, Integer filterMaxPrice, Pageable pageable);


    @Query( "SELECT new org.example.dto.ProductDtoWithoutProperties(p, c)"+
            " FROM Product p JOIN Category c ON p.productCategoryId = c.categoryId"+
            " WHERE p.productPrice >= :filterMinPrice AND p.productPrice <= :filterMaxPrice"+
            " ORDER BY p.productRating DESC"
    )
    Page<ProductDtoWithoutProperties> getAllProductsByFiltersMinPriceMaxPriceSortedBy4(Integer filterMinPrice, Integer filterMaxPrice, Pageable pageable);


    @Query( "SELECT new org.example.dto.ProductDtoWithoutProperties(p, c)"+
            " FROM Product p JOIN Category c ON p.productCategoryId = c.categoryId"+
            " WHERE p.productPrice >= :filterMinPrice AND p.productPrice <= :filterMaxPrice AND p.productCategoryId = :filterCategory"
    )
    Page<ProductDtoWithoutProperties> getAllProductsByFiltersMinPriceMaxPriceCategory0(Integer filterMinPrice, Integer filterMaxPrice, Integer filterCategory, Pageable pageable);

    @Query( "SELECT new org.example.dto.ProductDtoWithoutProperties(p, c)"+
            " FROM Product p JOIN Category c ON p.productCategoryId = c.categoryId"+
            " WHERE p.productPrice >= :filterMinPrice AND p.productPrice <= :filterMaxPrice AND p.productCategoryId = :filterCategory" +
            " ORDER BY p.productPrice ASC"
    )
    Page<ProductDtoWithoutProperties> getAllProductsByFiltersMinPriceMaxPriceCategorySortedBy1(Integer filterMinPrice, Integer filterMaxPrice, Integer filterCategory, Pageable pageable);

    @Query( "SELECT new org.example.dto.ProductDtoWithoutProperties(p, c)"+
            " FROM Product p JOIN Category c ON p.productCategoryId = c.categoryId"+
            " WHERE p.productPrice >= :filterMinPrice AND p.productPrice <= :filterMaxPrice AND p.productCategoryId = :filterCategory"+
            " ORDER BY p.productPrice DESC"
    )
    Page<ProductDtoWithoutProperties> getAllProductsByFiltersMinPriceMaxPriceCategorySortedBy2(Integer filterMinPrice, Integer filterMaxPrice, Integer filterCategory, Pageable pageable);

    @Query( "SELECT new org.example.dto.ProductDtoWithoutProperties(p, c)"+
            " FROM Product p JOIN Category c ON p.productCategoryId = c.categoryId"+
            " WHERE p.productPrice >= :filterMinPrice AND p.productPrice <= :filterMaxPrice AND p.productCategoryId = :filterCategory"+
            " ORDER BY p.productRating ASC"
    )
    Page<ProductDtoWithoutProperties> getAllProductsByFiltersMinPriceMaxPriceCategorySortedBy3(Integer filterMinPrice, Integer filterMaxPrice, Integer filterCategory, Pageable pageable);

    @Query( "SELECT new org.example.dto.ProductDtoWithoutProperties(p, c)"+
            " FROM Product p JOIN Category c ON p.productCategoryId = c.categoryId"+
            " WHERE p.productPrice >= :filterMinPrice AND p.productPrice <= :filterMaxPrice AND p.productCategoryId = :filterCategory"+
            " ORDER BY p.productRating DESC"
    )
    Page<ProductDtoWithoutProperties> getAllProductsByFiltersMinPriceMaxPriceCategorySortedBy4(Integer filterMinPrice, Integer filterMaxPrice, Integer filterCategory, Pageable pageable);


    @Query( "SELECT new org.example.dto.ProductDtoWithoutProperties(p, c)"+
            " FROM Product p JOIN Category c ON p.productCategoryId = c.categoryId"+
            " ORDER BY p.productPrice ASC"
    )
    Page<ProductDtoWithoutProperties> getAllProductsByFiltersSortedBy1(Pageable pageable);

    @Query( "SELECT new org.example.dto.ProductDtoWithoutProperties(p, c)"+
            " FROM Product p JOIN Category c ON p.productCategoryId = c.categoryId"+
            " ORDER BY p.productPrice DESC"
    )
    Page<ProductDtoWithoutProperties> getAllProductsByFiltersSortedBy2(Pageable pageable);

    @Query( "SELECT new org.example.dto.ProductDtoWithoutProperties(p, c)"+
            " FROM Product p JOIN Category c ON p.productCategoryId = c.categoryId"+
            " ORDER BY p.productRating ASC"
    )
    Page<ProductDtoWithoutProperties> getAllProductsByFiltersSortedBy3(Pageable pageable);

    @Query( "SELECT new org.example.dto.ProductDtoWithoutProperties(p, c)"+
            " FROM Product p JOIN Category c ON p.productCategoryId = c.categoryId"+
            " ORDER BY p.productRating DESC"
    )
    Page<ProductDtoWithoutProperties> getAllProductsByFiltersSortedBy4(Pageable pageable);

    @Query( "SELECT new org.example.dto.ProductDtoWithoutProperties(p, c)"+
            " FROM Product p JOIN Category c ON p.productCategoryId = c.categoryId"
    )
    Page<ProductDtoWithoutProperties> getAllProductsByFilters0(Pageable pageable);

    @Query( "SELECT new org.example.dto.ProductDtoWithoutProperties(p, c)"+
            " FROM Product p JOIN Category c ON p.productCategoryId = c.categoryId"+
            " WHERE p.productCategoryId = :filterCategory" +
            " ORDER BY p.productPrice ASC"
    )
    Page<ProductDtoWithoutProperties> getAllProductsByFiltersCategorySortedBy1(Integer filterCategory, Pageable pageable);

    @Query( "SELECT new org.example.dto.ProductDtoWithoutProperties(p, c)"+
            " FROM Product p JOIN Category c ON p.productCategoryId = c.categoryId"+
            " WHERE p.productCategoryId = :filterCategory"+
            " ORDER BY p.productPrice DESC"
    )
    Page<ProductDtoWithoutProperties> getAllProductsByFiltersCategorySortedBy2(Integer filterCategory, Pageable pageable);

    @Query( "SELECT new org.example.dto.ProductDtoWithoutProperties(p, c)"+
            " FROM Product p JOIN Category c ON p.productCategoryId = c.categoryId"+
            " WHERE p.productCategoryId = :filterCategory"+
            " ORDER BY p.productRating ASC"
    )
    Page<ProductDtoWithoutProperties> getAllProductsByFiltersCategorySortedBy3(Integer filterCategory, Pageable pageable);

    @Query( "SELECT new org.example.dto.ProductDtoWithoutProperties(p, c)"+
            " FROM Product p JOIN Category c ON p.productCategoryId = c.categoryId"+
            " WHERE p.productCategoryId = :filterCategory"+
            " ORDER BY p.productRating DESC"
    )
    Page<ProductDtoWithoutProperties> getAllProductsByFiltersCategorySortedBy4(Integer filterCategory, Pageable pageable);

    @Query( "SELECT new org.example.dto.ProductDtoWithoutProperties(p, c)"+
            " FROM Product p JOIN Category c ON p.productCategoryId = c.categoryId"+
            " WHERE p.productCategoryId = :filterCategory"
    )
    Page<ProductDtoWithoutProperties> getAllProductsByFiltersCategory0(Integer filterCategory, Pageable pageable);


    @Query("SELECT product from Product product where product.productId IN :listOfIds")
    List<Product> findAllProductsByListOfIds(List<Long> listOfIds);
}
