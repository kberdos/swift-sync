'use client'
import { createDocument } from "@/util/firebasetest";

const Page = () => {

  const handleCreate = async () => {
    const id = await createDocument("hello");
    console.log(id)
  }

  return (
    <div>
      <div
        onClick={handleCreate}
      >Create Document</div>
    </div>
  )
}

export default Page;
