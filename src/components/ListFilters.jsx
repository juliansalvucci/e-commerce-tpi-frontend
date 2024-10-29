import React from "react";
import { Stack, Typography, Checkbox, FormControlLabel } from "@mui/material";

const ListFilters = ({
  lowStockFilter,
  setLowStockFilter,
  brandFilter,
  setBrandFilter,
  categoryFilter,
  setCategoryFilter,
  subCategoryFilter,
  setSubCategoryFilter,
}) => {
  const style = {
    color: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };
  return (
    <Stack direction="row" spacing={1} style={style}>
      <FormControlLabel
        style={style}
        control={
          <Checkbox
            style={style}
            checked={lowStockFilter}
            onChange={(e) => setLowStockFilter(e.target.checked)}
          />
        }
        label="Bajo Stock"
      />
      <FormControlLabel
        style={style}
        control={
          <Checkbox
            style={style}
            checked={!!brandFilter}
            onChange={(e) =>
              setBrandFilter(e.target.checked ? brandFilter : "")
            }
          />
        }
        label="Marca"
      />
      <FormControlLabel
        style={style}
        control={
          <Checkbox
            style={style}
            checked={!!categoryFilter}
            onChange={(e) =>
              setCategoryFilter(e.target.checked ? categoryFilter : "")
            }
          />
        }
        label="Categoría"
      />
      <FormControlLabel
        style={style}
        control={
          <Checkbox
            style={style}
            checked={!!subCategoryFilter}
            onChange={(e) =>
              setSubCategoryFilter(e.target.checked ? subCategoryFilter : "")
            }
          />
        }
        label="Subcategoría"
      />
    </Stack>
  );
};

export default ListFilters;
