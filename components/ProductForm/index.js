import { StyledForm, StyledHeading, StyledLabel } from "./ProductForm.styled";
import { StyledButton } from "../Button/Button.styled";

export default function ProductForm({ onSubmit, editMode, value }) {
  return (
    <StyledForm onSubmit={onSubmit}>
      {editMode ? (
        <StyledHeading>edit Product</StyledHeading>
      ) : (
        <StyledHeading>Add a new Fish</StyledHeading>
      )}
      <StyledLabel htmlFor="name">
        Name:
        {editMode ? (
          <input type="text" id="name" name="name" defaultValue={value.name} />
        ) : (
          <input type="text" id="name" name="name" />
        )}
      </StyledLabel>
      <StyledLabel htmlFor="description">
        Description:
        {editMode ? (
          <input
            type="text"
            id="description"
            name="description"
            defaultValue={value.description}
          />
        ) : (
          <input type="text" id="description" name="description" />
        )}
      </StyledLabel>
      <StyledLabel htmlFor="price">
        Price:
        {editMode ? (
          <input
            type="number"
            id="price"
            name="price"
            min="0"
            defaultValue={value.price}
          />
        ) : (
          <input type="number" id="price" name="price" min="0" />
        )}
      </StyledLabel>
      <StyledLabel htmlFor="currency">
        Currency:
        <select id="currency" name="currency">
          <option value="EUR">EUR</option>
          <option value="USD">USD</option>
          <option value="GBP">GBP</option>
        </select>
      </StyledLabel>
      <StyledButton type="submit">Submit</StyledButton>
    </StyledForm>
  );
}
