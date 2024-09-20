import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const ListCategoryAccordion = ({ category, onToggle, expanded }) => {
  return (
    <Accordion
      expanded={expanded}
      onChange={onToggle}
      className="accordion-container"
      sx={{ border: "none", boxShadow: "none" }}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography sx={{ fontWeight: "bold" }}>{category.name}</Typography>
        <Typography sx={{ marginLeft: "auto" }}>
          {category.deleted
            ? `Fecha de eliminación: ${category.deleteDatetime}`
            : `Fecha de creación: ${category.creationDateTime}`}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>{category.description}</Typography>
      </AccordionDetails>
    </Accordion>
  );
};

export default ListCategoryAccordion;
