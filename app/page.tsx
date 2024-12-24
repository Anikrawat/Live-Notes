import Image from "next/image";
import myWeb from '@/public/images/myWeb.png'

export default function Home() {
  return (
      <div className="w-full flex flex-col items-center gap-115 text-white my-10">
        <div className="w-[25vw] flex flex-col items-center">
          <h1 className="text-3xl"><strong>Fast</strong> and <strong>Collaborative</strong> notes </h1>
          <h1 className="text-xl">for you and your team.</h1>
        </div>
        <div>
          <Image
              src={myWeb}
              alt = 'my web'
              width={1200}
              height={1200}
          />
        </div>
      </div>
  );
}
