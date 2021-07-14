import { useState, useEffect } from "react";
import "./App.css";
import Form from "./components/Form";
import Users from "./components/Users";
import Axios from "axios";
import * as yup from "yup";
import schema from "./validation/formSchema";

const initialFormValues = {
  //name email password checkbox (terms of service) submit button
  name: "",
  email: "",
  password: "",
  agreeToTerms: false,
};

const initialFormErrors = {
  name: "",
  email: "",
  password: "",
};

const initialUsers = [
  {
    name: "shariq",
    email: "shariqali2195@gmail.com",
    password: "abc123",
    agreeToTerms: true,
  },
  {
    name: "chris",
    email: "chris@email.com",
    password: "123 abc",
    agreeToTerms: false,
  },
];

const initialDisabled = true;

function App() {
  const [users, setUsers] = useState(initialUsers);
  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState(initialFormErrors);
  const [disabled, setDisabled] = useState(initialDisabled);

  useEffect(() => {
    Axios.get("https://reqres.in/api/users/")
      .then((res) => {
        setUsers(users.concat(res.data.data));
      })
      .catch((err) => {
        debugger;
      });
  }, []);

  const inputChange = (name, value) => {
    validate(name, value);
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  useEffect(() => {
    schema.isValid(formValues).then((valid) => {
      setDisabled(!valid);
    });
  }, [formValues]);

  const validate = (name, value) => {
    yup
      .reach(schema, name)
      .validate(value)
      .then((valid) => {
        setFormErrors({
          ...formErrors,
          [name]: "",
        });
      })
      .catch((err) => {
        setFormErrors({
          ...formErrors,
          [name]: err.errors[0],
        });
      });
  };

  const postNewUser = (newUser) => {
    Axios.post("https://reqres.in/api/users/", newUser)
      .then((res) => {
        !res.data.data ? setUsers(users.concat(res.data)) : setUsers(users.concat(res.data.data));
      })
      .catch((err) => {
        debugger;
      })
      .finally(() => {
        setFormValues(initialFormValues);
      });
  };

  const formSubmit = () => {
    const newUser = {
      name: formValues.name.trim(),
      email: formValues.email.trim(),
      password: formValues.password.trim(),
      agreeToTerms: formValues.agreeToTerms,
    };
    postNewUser(newUser);
  };

  return (
    // return the form
    // return the users
    <div className="container">
      <header>
        <h1>Users App</h1>
      </header>
      <Form values={formValues} change={inputChange} submit={formSubmit} disabled={disabled} errors={formErrors} />
      {/* input change is missing from above, disabled is also missing, along with yup components */}
      <Users users={users} />
    </div>
  );
}

export default App;
