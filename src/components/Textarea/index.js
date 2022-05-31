import "./index.css";

export const Textarea = ({ value, readOnly, onChange }) => {
  return (
    <div className="textarea-box">
      <textarea
        readOnly={readOnly}
        className="textarea-box__current"
        value={value}
        onChange={({ target }) => onChange(target.value)}
      />
    </div>
  );
};
