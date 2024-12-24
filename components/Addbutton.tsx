"use client";

import React from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import add from "@/public/images/add.svg";

interface AddbuttonProps {
  setIsAdding:(value: boolean) => void,
  isAdding:boolean
}

const Addbutton:React.FC<AddbuttonProps> = ({setIsAdding,isAdding}) => {

  const addDocumentHandler = async () => {
    setIsAdding(true);
  };
  return (
    <Button
      type="submit"
      disabled={isAdding}
      className="bg-gradient-to-r bg-[#FF6500] hover:bg-[#FF4000] flex gap-1 shadow-md"
      onClick={addDocumentHandler}
    >
      <Image src={add} alt="Add" width={24} height={24} />
      <p className="hidden sm:block">Create a New Note</p>
    </Button>
  );
};

export default Addbutton;
