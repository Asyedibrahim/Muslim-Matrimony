const customStyles = {
    control: (provided, state) => ({
      ...provided,
      borderColor: state.isFocused ? '#D63A68' : '#D1D5DB', // Change color on focus
      boxShadow: state.isFocused ? '0 0 0 1px #D63A68' : null,
      '&:hover': {
        borderColor: state.isFocused ? '#D63A68' : '#D1D5DB', // Change color on hover
      },
    }),
    menu: (provided) => ({
      ...provided,
      zIndex: 9999, // Ensure dropdown appears above other elements
    }),
};

export default customStyles;