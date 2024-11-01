const useTextfieldTheme = () => {
  const styles = {
    variant: "filled",
    InputProps: {
      style: {
        borderColor: "#d7c4ab",
        color: "white",
      },
    },
    InputLabelProps: {
      style: {
        color: "#d1d1d1",
      },
    },
  };
  return styles;
};

export default useTextfieldTheme;
