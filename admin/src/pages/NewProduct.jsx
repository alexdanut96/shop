import { useState, useEffect } from "react";

const NewProduct = () => {
  const [titleValidationError, setTitleValidationError] = useState(false);
  const [descriptionValidationError, setDescriptionValidationError] =
    useState(false);

  return (
    <div className="right-side-container">
      <div className="newProduct-container animated">
        <div className="newProductTitle">New Product</div>
        {/* Form */}
        <form>
          <div className="form-group field">
            {/* title */}
            <div className="wrapper">
              <label htmlFor="title" className="form-label">
                Title *
              </label>
              <div className="input-wrapper">
                <input
                  type="text"
                  className={`form-field title ${
                    titleValidationError ? "error" : ""
                  }`}
                  placeholder="Title"
                  name="title"
                  id="title"
                  required
                />
              </div>
              {titleValidationError ? (
                <div className="username error-message">
                  This field is required!
                </div>
              ) : (
                <></>
              )}
            </div>
            {/* description */}
            <div className="wrapper">
              <label htmlFor="description" className="form-label">
                Description *
              </label>
              <div className="input-wrapper">
                <input
                  type="text"
                  className={`form-field title ${
                    descriptionValidationError ? "error" : ""
                  }`}
                  placeholder="Description"
                  name="description"
                  id="description"
                  required
                />
              </div>
              {descriptionValidationError ? (
                <div className="description error-message">
                  This field is required!
                </div>
              ) : (
                <></>
              )}
            </div>
            {/* size */}
            <div className="wrapper">
              <label htmlFor="description" className="form-label">
                Size *
              </label>
              <div className="input-wrapper">
                <select>
                  <option>XS</option>
                  <option>S</option>
                  <option>M</option>
                  <option>L</option>
                  <option>XL</option>
                </select>
              </div>
              {descriptionValidationError ? (
                <div className="description error-message">
                  This field is required!
                </div>
              ) : (
                <></>
              )}
            </div>

            {/* category */}
            <div className="wrapper">
              <label htmlFor="category" className="form-label">
                Category *
              </label>
              <div className="input-wrapper">
                <select>
                  <option>XS</option>
                  <option>S</option>
                  <option>M</option>
                  <option>L</option>
                  <option>XL</option>
                </select>
              </div>
              {descriptionValidationError ? (
                <div className="category error-message">
                  This field is required!
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
          <button
            //  onClick={addNewUser}
            className="save-changes"
          >
            Save changes
          </button>
        </form>
      </div>
    </div>
  );
};
export default NewProduct;
