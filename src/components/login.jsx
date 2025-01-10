import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { BeatLoader } from "react-spinners";
import Error from "./error";
import * as Yup from "yup";

const Login = () => {
  const [errors, seterrors] = useState([]);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleLogin = async () => {
    seterrors([]);
    try {
      const schema = Yup.object.shape({
        email: Yup.string()
          .email("Invalid Email")
          .required("Email is Required"),
        password: Yup.string()
          .min(6, "Passwords must be at least 6 characters")
          .required("Password is Required"),
      });

      await schema.validate(formData, { abortEarly: false });
      // api call
    } catch (e) {
      const newErrors = {};

      e?.inner?.forEach((err) => {
        newErrors[err.path] = err.message;
      });

      seterrors(newErrors);
    }
  };

  return (
    <div>
      <Card className="bg-black text-white">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>
            to your account if you already have one
          </CardDescription>
          <Error message={"Login Failed"} />
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="space-y-1">
            <Input
              name="email"
              type="email"
              placeholder="Enter Email"
              className="text-black"
              onChange={handleInputChange}
            />
            {errors.email && <Error message={"Some error"} />}
          </div>
          <div className="space-y-1">
            <Input
              name="password"
              type="password"
              placeholder="Enter Password"
              className="text-black"
              onChange={handleInputChange}
            />
           { errors.password && <Error message={"Some error"} />}
          </div>
        </CardContent>
        <CardFooter>
          <Button onChange={handleLogin}>
            {true ? <BeatLoader size={10} color="#36d7b7" /> : "Login"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
