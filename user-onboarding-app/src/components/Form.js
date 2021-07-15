import styled from "styled-components";

const StyledForm = styled.form`
  box-sizing: border-box;

  p {
    margin-left: auto;
    margin-right: 40%;
  }

  button {
    margin-right: auto;
    margin-left: 40%;
  }

  .form-group {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
  }

  .button-group {
    display: flex;
    justify-content: center;
  }
`;

export default function Form(props) {
  const { values, submit, change, disabled, errors } = props;

  const onSubmit = (evt) => {
    evt.preventDefault();
    submit();
  };
  const onChange = (evt) => {
    const { name, value, type, checked } = evt.target;
    const valueToUse = type === "checkbox" ? checked : value;
    change(name, valueToUse);
  };

  return (
    <StyledForm onSubmit={onSubmit}>
      {/* getting user information */}
      <div className="form-group inputs">
        {/* user text inputs */}
        <label>
          Name:
          <input value={values.name} onChange={onChange} name="name" type="text" />
          {/* name, email, password, agreeToTerms */}
        </label>

        <label>
          Email:
          <input value={values.email} onChange={onChange} name="email" type="email" />
        </label>

        <label>
          Password:
          <input value={values.password} onChange={onChange} name="password" type="password" />
        </label>
        {/* checkbox */}
        <label>
          Agree To Terms:
          <input type="checkbox" name="agreeToTerms" checked={values.agreeToTerms} onChange={onChange} />
        </label>
      </div>

      <div className="form-group submit">
        {/* Disabling Button */}
        <div class="button-group">
          <p>Add User:</p>
          <button disabled={disabled}>Submit</button>
        </div>

        <div className="errors">
          <div>{errors.name}</div>
          <div>{errors.email}</div>
          <div>{errors.password}</div>
          <div>{errors.agreeToTerms}</div>
        </div>
      </div>
    </StyledForm>
  );
}
