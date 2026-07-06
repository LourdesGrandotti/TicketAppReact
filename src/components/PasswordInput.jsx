import { useState } from "react";

function PasswordInput({ id, label, value, onChange, placeholder }) {
    const [visible, setVisible] = useState(false);

    return (
        <div className="mb-3 text-start">
            <label htmlFor={id} className="form-label small fw-medium text-white-70 mb-2">
                {label}
            </label>
            <div className="auth-input-wrapper password-container position-relative">
                <span className="auth-input-icon">
                    <i className="bx bx-lock-alt"></i>
                </span>
                <input
                    type={visible ? "text" : "password"}
                    className="form-control auth-input password-input"
                    id={id}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    required
                />
                <button
                    type="button"
                    onClick={() => setVisible(!visible)}
                    className="position-absolute end-0 top-50 translate-middle-y btn border-0 bg-transparent text-white-50 px-3 py-0"
                >
                    <i className={`bx ${visible ? "bx-hide" : "bx-show"} fs-5`}></i>
                </button>
            </div>
        </div>
    );
}

export default PasswordInput;