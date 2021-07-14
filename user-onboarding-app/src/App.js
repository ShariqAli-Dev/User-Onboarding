import { useState, useEffect } from "react";
import "./App.css";
import Form from "./components/Form";
import Users from "./components/Users";
import axios from "axios";
import { initial } from "lodash";

const initialFormValues = {
  //name email password checkbox (terms of service) submit button
  name: "",
  email: "",
  password: "",
  agreeToTerms: false,
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

function App() {
  // initializing users and form values
  const [users, setUsers] = useState(initialUsers);
  const [formValues, setFormValues] = useState(initialFormValues);
  console.log(users);
  // axios.get call when the page loads
  useEffect(() => {
    axios
      .get("https://reqres.in/api/users/")
      .then((res) => {
        // res.data.data.forEach((user) => {
        //   setUsers([...users, user]);
        // });
        setUsers(users.concat(res.data.data));
      })
      .catch((err) => {
        console.log(err);
        debugger;
      });
  }, []);

  const formSubmit = () => {
    const newUser = {
      name: formValues.name.trim(),
      email: formValues.email.trim(),
      password: formValues.password.trim(),
      agreeToTerms: formValues.agreeToTerms,
    };
    postNewUser(newUser);
  };

  // when user is posted, do the post and reset state of form
  const postNewUser = (newUser) => {
    axios
      .post("https://reqres.in/api/users/", newUser)
      .then((res) => {
        console.log(res.data);
        setUsers([...users, res.data.data]);
      })
      .catch((err) => {
        console.log(err);
        debugger;
      })
      .finally(() => {
        setFormValues(initialFormValues);
      });
  };

  return (
    // return the form
    // return the users
    <div className="container">
      <header>
        <h1>Users App</h1>
      </header>
      <Form values={formValues} submit={formSubmit} />
      {/* input change is missing from above, disabled is also missing, along with yup components */}
      <Users users={users} />
    </div>
  );
}

export default App;
