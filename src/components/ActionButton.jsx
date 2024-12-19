function ActionButton({ children, dispatch, type, payload, disabled }) {
  return (
    <button
      onClick={() => dispatch && dispatch({ type, payload })}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default ActionButton;
