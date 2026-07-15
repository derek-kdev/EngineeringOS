"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Eye, EyeOff, Mail } from "lucide-react";
import api from "@/lib/api";


export default function SigninPage() {

  const router = useRouter();


  const [showPassword, setShowPassword] = useState(false);


  const [form, setForm] = useState({
    email: "",
    password: "",
  });


  const [loading,setLoading] = useState(false);


  const [message,setMessage] = useState("");



  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

  };



  const handleSubmit = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    setMessage("");
    setLoading(true);


    try {


      const response = await api.post(
        "/auth/login",
        {
          email: form.email,
          password: form.password,
        }
      );



      const {
        accessToken,
        refreshToken
      } = response.data.tokens;



      localStorage.setItem(
        "accessToken",
        accessToken
      );


      localStorage.setItem(
        "refreshToken",
        refreshToken
      );



      router.push("/dashboard");


    } catch(error:any){


      console.error(error);


      setMessage(
        error.response?.data?.message ||
        "Invalid email or password"
      );


    } finally {

      setLoading(false);

    }

  };




return (

<main
className="
min-h-screen
bg-[#0B132B]
flex
items-center
justify-center
px-6
text-white
"
>


<div
className="
absolute
inset-0
bg-[radial-gradient(circle_at_center,rgba(0,210,255,0.15),transparent_60%)]
"
/>



<div
className="
relative
w-full
max-w-md
bg-white/5
border
border-white/10
backdrop-blur-xl
rounded-3xl
p-8
shadow-2xl
"
>


<Link
href="/"
className="
absolute
top-5
left-5
text-white/70
hover:text-white
transition
"
>

<ArrowLeft size={22}/>

</Link>



<h1
className="
text-3xl
font-bold
text-center
mt-6
"
>

Welcome Back

</h1>


<p
className="
text-center
text-white/60
mt-2
"
>

Sign in to EngineeringOS

</p>



{
message && (

<div
className="
mt-5
rounded-xl
bg-red-500/20
border
border-red-400/30
px-4
py-3
text-sm
text-red-200
"
>

{message}

</div>

)

}



<form
onSubmit={handleSubmit}
className="
mt-6
space-y-5
"
>


<div>

<label className="text-sm">
Email
</label>


<div
className="
mt-2
flex
items-center
gap-3
bg-black/20
border
border-white/10
rounded-xl
px-4
"
>

<Mail size={18}/>


<input

name="email"

type="email"

required

value={form.email}

onChange={handleChange}

className="
bg-transparent
outline-none
w-full
py-3
"
/>


</div>


</div>




<div>

<label className="text-sm">
Password
</label>


<div
className="
mt-2
flex
items-center
bg-black/20
border
border-white/10
rounded-xl
px-4
"
>


<input

name="password"

type={
showPassword
?
"text"
:
"password"
}

required

value={form.password}

onChange={handleChange}

className="
bg-transparent
outline-none
w-full
py-3
"
/>


<button

type="button"

onClick={()=>
setShowPassword(!showPassword)
}

>

{
showPassword
?
<EyeOff size={18}/>
:
<Eye size={18}/>
}

</button>


</div>


</div>





<button

disabled={loading}

className="
w-full
rounded-xl
py-3
font-semibold
bg-gradient-to-r
from-[#FF6B00]
to-[#FFB300]
hover:scale-[1.02]
transition
"

>

{
loading
?
"Signing in..."
:
"Sign In"
}


</button>



</form>




<div
className="
mt-6
text-center
text-sm
text-white/60
"
>

Don't have an account?

<Link
href="/register"
className="
text-[#00D2FF]
ml-2
"
>

Create account

</Link>


</div>



</div>



</main>

);

}