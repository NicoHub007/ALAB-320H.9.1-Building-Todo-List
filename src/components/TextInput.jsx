function TextInput({state, setState}) {
  return (
    <input
      type='text'
      value={state}
      onChange={(evt) => setState(evt.target.value)}
    />
  )
};

export default TextInput