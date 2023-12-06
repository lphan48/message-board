import React from "react";
import { Button } from "@mui/material";

type PaginationButtonsProps = {
  currentPage: number;
  totalPages: number;
  onPreviousPage: () => void;
  onNextPage: () => void;
};

const PaginationButtons: React.FC<PaginationButtonsProps> = ({
  currentPage,
  totalPages,
  onPreviousPage,
  onNextPage,
}) => {
  return (
    <div
      style={{
        position: "fixed",
        bottom: 75,
        left: "50%",
        transform: "translateX(-50%)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Button
        style={{
          borderRadius: 10,
          backgroundColor: "white",
          fontSize: "16px",
          marginRight: 20,
          fontWeight: "bold",
          padding: "3px",
          border: "2px solid #fab5d1",
          color: "#fab5d1",
        }}
        variant="contained"
        onClick={onPreviousPage}
        disabled={currentPage === 1}
      >
        {"<"}
      </Button>
      <Button
        variant="contained"
        onClick={onNextPage}
        disabled={currentPage === totalPages}
        style={{
          borderRadius: 10,
          backgroundColor: "white",
          fontSize: "16px",
          fontWeight: "bold",
          padding: "3px",
          border: "2px solid #fab5d1",
          color: "#fab5d1",
        }}
      >
        {">"}
      </Button>
    </div>
  );
};

export default PaginationButtons;
