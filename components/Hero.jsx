import Image from "next/image";
const Hero = () => {
  return (
    <div className="relative left-0 w-screen h-125 mt-3">
      <Image
        src="https://upload.wikimedia.org/wikipedia/commons/3/30/Metropolitan_Museum_of_Art_%28The_Met%29_-_Central_Park%2C_NYC.jpg"
        alt="museum"
        fill
        style={{ objectFit: "cover" }}
        className="rounded-lg"
      />
    </div>
  )
}

export default Hero;