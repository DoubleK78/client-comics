"use client";
import Product from "@/app/models/common/Product";
import { EStorageType } from "@/app/models/enums/EStorageType";
import { generateImageUrlByStorageType, generateRandomProduct } from "@/app/utils/HelperFunctions";
import { useEffect, useState } from "react";

export default function ProductBanner() {
    const [randomProduct, setRandomProduct] = useState<Product>();

    useEffect(() => {
        const product = generateRandomProduct();
        setRandomProduct(product);
    }, []);

    return randomProduct && (
        <a href={randomProduct.affLink} target="_blank">
            <img
                src={generateImageUrlByStorageType(EStorageType.S1, randomProduct.imgLink)}
                alt={`shoppe_${randomProduct.id}`}
                width="800"
            />
        </a>
    );
}