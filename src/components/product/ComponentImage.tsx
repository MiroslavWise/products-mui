"use client"

import Image from "next/image"

interface IProps {
  image: string
}

function ComponentImage({ image }: IProps) {
  return (
    <div className="w-[25rem] h-auto aspect-square relative">
      <Image src={image} alt={image} width={480} height={480} className="absolute inset-0 object-contain aspect-square w-full h-full" />
    </div>
  )
}

ComponentImage.displayName = "ComponentImage"
export default ComponentImage
