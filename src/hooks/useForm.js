import { useState } from "react";
import { useNavigate } from "react-router-dom";

const useForm = (options) => {
  const [data, setData] = useState(options?.initialValues || {});
  const [errors, setErrors] = useState({});
  const [ref, setRef] = useState({});
  const [id, setId] = useState(null);
  const [disable, setDisable] = useState(options?.intialDisable || {});
  const navigate = useNavigate();
  const [change, setChange] = useState(false);
  const [touched, setTouched] = useState({});

  const handleChange =
    (key, number, sanitizeFn, disable, enable, change) => (e) => {
      const value = sanitizeFn
        ? sanitizeFn(
          e.target.type === "file"
            ? e.target.files[0]
            : e.target.type === "checkbox"
              ? e.target.checked
              : e.target.value.trimLeft()
        )
        : e.target.type === "radio"
          ? e.target.id
          : e.target.type === "file"
            ? e.target.files[0]
            : e.target.type === "checkbox"
              ? e.target.checked
              : e.target.value.trimLeft();
      const finalValue = number ? value.replace(/[^0-9.]/g, "") : value;
      change ? setChange(true) : setChange(false);
      e.target.id && setId(e.target.id);
      disable && setDisable(disable);
      e.target.value && enable && setDisable(enable);
      setData({
        ...data,
        [key]: finalValue,
      });
    };

  const handleSubmit = (e) => {
    if (e) {
      e.preventDefault();
    }
    if (options.setIsSubmit) {
      options?.setIsSubmit(true);
    }
    const validations = options?.validations;

    if (validations) {
      let valid = true;
      const newErrors = {};
      for (const key in validations) {
        const value = data[key];
        const validation = validations[key];
        const pattern = validation?.pattern;
        const custom = validation?.custom;

        if (validation?.required?.value && !value) {
          valid = false;
          newErrors[key] = validation?.required?.message;
        } else if (pattern?.value && !RegExp(pattern.value).test(value)) {
          valid = false;
          newErrors[key] = pattern.message;
        } else if (custom?.isValid && !custom.isValid(value)) {
          valid = false;
          newErrors[key] = custom.message;
        }
      }

      if (!valid) {
        setErrors(newErrors);
        const ref = options?.ref;
        if (ref) {
          for (const key in newErrors) {
            let value = ref[key];
            value && value.current && value.current.focus();
          }
        }
        return;
      } else {
        options.navigate &&
          navigate(options.navigate, { state: options?.state });
      }
    }

    setErrors({});
    if (options?.onSubmit) {
      options.onSubmit();
    }
  };

  const handleBlur = (key) => {
    setTouched({ ...touched, [key]: true });
    const validations = options?.validations;
    const value = data[key];
    const validation = validations[key];
    const pattern = validation?.pattern;
    const custom = validation?.custom;
    let valid = true;
    if (validations) {
      if (validation?.required?.value && !value) {
        valid = false;
        setErrors({ ...errors, [key]: validation?.required?.message });
      } else if (pattern?.value && !RegExp(pattern.value).test(value)) {
        valid = false;
        setErrors({ ...errors, [key]: pattern.message });
      } else if (custom?.isValid && !custom.isValid(value)) {
        valid = false;
        setErrors({ ...errors, [key]: custom.message });
      }
    }
    if (valid) {
      setErrors({ ...errors, [key]: "" });
    }
  };

  return {
    data,
    setData,
    errors,
    handleChange,
    handleSubmit,
    handleBlur,
    setErrors,
    disable,
    setDisable,
    ref,
    setRef,
    change,
    setChange,
  };
};

export default useForm;
