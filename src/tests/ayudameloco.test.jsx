import { render, screen } from "@testing-library/react";
import ListEditButton from "../components/ListEditButton";
import React from "react";

it("renderiza el botón de editar", () => {
  render(<ListEditButton onClick={() => {}} />);
  const editButton = screen.getByTestId("edit-button");
  expect(editButton).toBeInTheDocument();
});
