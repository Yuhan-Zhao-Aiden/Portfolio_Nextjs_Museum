import { Button } from "@/components/ui/button";
import Link from "next/link";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-4">
        Welcome to the MetroPolitan Museum of Art!
      </h1>
      <p className="mb-4 text-secondary">
        The Metropolitan Museum of Art is an encyclopedic art museum in New York City. By floor area, it is the fourth-largest museum in the world and the largest art museum in the Americas.
      </p>
      <Button>
        <Link href="https://en.wikipedia.org/wiki/Metropolitan_Museum_of_Art">Learn More</Link>
      </Button>
    </>
  )
}