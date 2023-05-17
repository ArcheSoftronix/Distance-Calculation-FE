import React, { useState } from "react";
import "./CalculateDistance.css";
import { userFormValidator } from "../validator/CalculateValidate";
import useForm from "../hooks/useForm";
import axios from "axios";
import img from "../assest/Reyna-logo.png";

const CalculateDistance = () => {
  // useState for set values
  const [isSubmit, setIsSubmit] = useState(false);
  const [error, setError] = useState("");

  // initial data
  const initData = {
    fromZipCode: "",
    toZipCode: "",
  };

  // useForm
  const { errors, handleChange, handleSubmit, data, setData, handleBlur } =
    useForm({
      validations: userFormValidator,
      initialValues: initData,
      isSubmit: isSubmit,
      setIsSubmit: setIsSubmit,
      onSubmit: () => {
        handleuser(data);
      },
    });

  // data post in api using axios
  const handleuser = (data) => {
    axios
      .post(
        "https://distancefinder-be.archesoftronix.in/api/Distance/GetDistanceByZipCodesAsync",
        {
          fromZipCode: data.fromZipCode,
          toZipCode: data.toZipCode,
        }
      )
      .then(function (response) {
        setError(response.data);
      })
      .catch(function (error) {});
  };

  return (
    <div className="rootMain">
      {/* create container */}
      <div className="container">
        <div className="mainContainer">
          {/* create logo in main side */}
          <div className="logoConatiner">
            <img src={img} alt="" />
          </div>
          <div className="mainForm">
            <h4 className="heading">Calculate Distance Between Zip Code</h4>

            {/* create form */}
            <div className="childform">
              <form action="" onSubmit={handleSubmit}>
                <div class="form-outline">
                  {/* for source code */}
                  <label class="form-label" for="typeNumber">
                    Enter Source Zip Code :
                  </label>
                  <input
                    type="tel"
                    id="typeNumber"
                    name="fromZipCode"
                    value={data?.fromZipCode?.replace(
                      /(\d{3})(\d{3})(\d{4})/,
                      "$1-$2-$3"
                    )}
                    onBlur={() => {
                      handleBlur("fromZipCode");
                    }}
                    class="form-control"
                    onChange={handleChange("fromZipCode", true)}
                  />
                  <p className="errorMessage">{errors && errors.fromZipCode}</p>
                </div>
                <div class="form-outline">
                  <div className="formLable">
                    {/* for destination code */}
                    <label class="form-label" for="typeNumber">
                      Enter Destination Zip Code :
                    </label>
                  </div>
                  <div className="formInput">
                    <input
                      type="tel"
                      id="typeNumber"
                      name="toZipCode"
                      class="form-control"
                      value={data?.toZipCode?.replace(
                        /(\d{3})(\d{3})(\d{4})/,
                        "$1-$2-$3"
                      )}
                      onBlur={() => {
                        handleBlur("toZipCode");
                      }}
                      onChange={handleChange("toZipCode", true)}
                    />
                    <p className="errorMessage">{errors && errors.toZipCode}</p>
                  </div>
                </div>
                <div className="text-center mt-5">
                  {/* submit and reset button */}
                  <button type="submit" class="btn btn-success">
                    Submit
                  </button>
                  <button
                    title="Reset"
                    type="reset"
                    onClick={() => {
                      setData(initData);
                      setError();
                    }}
                    class="btn btn-danger"
                  >
                    Reset
                  </button>
                </div>
              </form>
            </div>
            <div>
              {/* show response message */}
              {error ? (
                error.statusCode === 200 ? (
                  <> {<p className="response">{error.message}</p>}</>
                ) : (
                  <> {<p className="responseRed">{error.message}</p>}</>
                )
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalculateDistance;
