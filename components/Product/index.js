import useSWR from "swr";
import { useState } from "react";
import { useRouter } from "next/router";
import { ProductCard } from "./Product.styled";
import { StyledLink } from "../Link/Link.styled";
import ProductForm from "../ProductForm";
import { StyledButton } from "../Link/Link.styled";

export default function Product() {
  const [isEditMode, setIsEditMode] = useState(false);
  const router = useRouter();
  const { id } = router.query;

  const { data, isLoading, mutate } = useSWR(`/api/products/${id}`);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (!data) {
    return;
  }

  async function handleEditProduct(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const productData = Object.fromEntries(formData);

    const response = await fetch(`/api/products/${id}`, {
      method: "PUT",

      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    });
    if (response.ok) {
      mutate();
    }
  }

  async function handleDeleteProduct() {
    const response = await fetch(`/api/products/${id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      router.push("/");
    }
  }
  return (
    <ProductCard>
      <h2>{data.name}</h2>
      <p>Description: {data.description}</p>
      <p>
        Price: {data.price} {data.currency}
      </p>
      <ul>
        {data.reviews.map((review) => (
          <li key={review._id}>
            <p>
              <div>{review.title}</div>
              {review.rating}/5: {review.text}
            </p>
          </li>
        ))}
      </ul>
      <StyledButton onClick={() => setIsEditMode(!isEditMode)}>
        Edit Product
      </StyledButton>
      <StyledButton onClick={handleDeleteProduct}>Delete Product</StyledButton>
      {isEditMode && (
        <ProductForm value={data} onSubmit={handleEditProduct} editMode />
      )}
      <StyledLink href="/">Back to all</StyledLink>
    </ProductCard>
  );
}
