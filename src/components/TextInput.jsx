function TextInput({state, setState}) {
  return (
    <input
      type='text'
      value={state}
      onChange={(evt) => setState(evt.target.value)}
      placeholder='Enter New Task Here...'
    />
  )
};

export default TextInput