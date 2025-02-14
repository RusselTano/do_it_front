import { useForm } from "react-hook-form";
import useAuthStore from "../../store/auth.store";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {

  const {register, handleSubmit, formState: {errors}} = useForm();
  const login = useAuthStore((state: any) => state.login)
  const navigate = useNavigate();

  const onSubmit = async (data: object) => {
    const response = await login(data);

    if(response.success){
      navigate("/dashboard")
    }
    else {
      alert(response.message)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Email</label>
        <input
          {...register("tutorEmail", { required: "L'email est requis" })}
        />
        {errors.tutorEmail && <p>{errors.tutorEmail.message as string}</p>}
      </div>

      <div>
        <label>Mot de passe</label>
        <input
          type="password"
          {...register("password", { required: "Le mot de passe est requis" })}
        />
        {errors.password && <p>{errors.password.message as string}</p>}
      </div>

      <button type="submit">Se connecter</button>
    </form>
  );
};

export default LoginForm;
