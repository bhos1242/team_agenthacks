import { useMutation } from "@tanstack/react-query";
import axios from "axios";

interface SignupData {
  name: string;
  email: string;
  password: string;
  avatar?: File;
}

interface SignupResponse {
  message: string;
  email: string;
}

export function useSignup() {
  return useMutation({
    mutationFn: async (data: SignupData) => {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("password", data.password);
      
      if (data.avatar) {
        formData.append("avatar", data.avatar);
      }

      const response = await axios.post<SignupResponse>(
        "/api/auth/signup",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      
      return response.data;
    },
  });
}
