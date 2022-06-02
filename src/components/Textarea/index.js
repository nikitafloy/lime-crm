import "./index.scss";

export const Textarea = ({ value, readOnly, onChange }) => {
  return (
    <div className="textarea-box">
      <textarea
        readOnly={readOnly}
        value={value}
        onChange={({ target }) => onChange(target.value)}
      />
    </div>
  );
};
