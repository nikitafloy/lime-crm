import "./index.css";

export const Textarea = ({ value, readOnly }) => {
  return (
    <div className="textarea-box">
      <textarea
        readOnly={readOnly}
        className="textarea-box__current"
        value={value}
      />
    </div>
  );
};
