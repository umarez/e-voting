import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import { SignUpWithEmailPassword } from "../auth/signUp";
import { useAuth } from "../firebase/useAuth";
import { useUserQuery } from "../generated/graphql";
import { useAddUserMutation } from "../generated/graphql";

export default function Home() {
  const { data, loading, error } = useUserQuery();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [nama, setNama] = useState<string>("");
  const [angkatan, setAngkatan] = useState<number>(0);
  const [id, setId] = useState<string>("");

  const [addUser] = useAddUserMutation();
  const test = useAuth();
  console.log(test);

  return (
    !loading && (
      <div className='bg-gray-50 w-full h-[100vh] flex justify-center items-center'>
        <Head>
          <title>Home</title>
          <meta name='description' content='Home' />
          <link rel='icon' href='/favicon.ico' />
        </Head>
        {console.log(data)}
        <div className='flex flex-col pl-5 w-48 h-48'>
          <div>
            <h1 className='mr-5'>Email</h1>
            <input
              type='email'
              className='h-5 mt-0.5 p-3 py-4'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <h1 className='mr-5'>Password</h1>
            <input
              type='password'
              className='h-5 mt-0.5 p-3 py-4'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <h1 className='mr-5'>Nama</h1>
            <input
              className='h-5 mt-0.5 p-3 py-4'
              value={nama}
              onChange={(e) => setNama(e.target.value)}
            />
          </div>
          <div>
            <h1 className='mr-5'>Angkatan</h1>
            <input
              className='h-5 mt-0.5 p-3 py-4'
              value={angkatan}
              onChange={(e) => setAngkatan(Number(e.target.value))}
            />
          </div>
          <div
            onClick={async () => {
              SignUpWithEmailPassword(email, password, nama, angkatan, setId);
              if (id != "") {
                await addUser({
                  variables: {
                    id: id,
                    angkatan: angkatan,
                    nama: nama,
                    email: email,
                  },
                });
              }
            }}
            className='mt-5 hover:bg-blue-300 cursor-pointer w-24 py-1 px-3 bg-red-300 border-black border-2 rounded-md text-center'
          >
            Sign up
          </div>
        </div>
      </div>
    )
  );
}
