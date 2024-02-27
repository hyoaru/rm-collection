import Image from "next/image";
import CategoryNavigationCard from "@components/index/CategoryNavigationCard";
import { Button } from "@components/ui/button";

export default function Home() {
  return (
    <>
      <div className="space-y-12 sm:space-y-16 md:space-y-20 lg:space-y-24">
        <div className="w-11/12 mx-auto py-4 sm:w-full sm:px-4">
          <div
            className="relative rounded-xl overflow-hidden bg-center bg-cover"
            style={{ backgroundImage: `url(/landing-page/images/main-banner.png)` }}
          >
            <div className="absolute bottom-0 right-0 m-8 z-10 xs:m-6 sm:m-10 lg:m-14">
              <div className="flex mb-4">
                <Button
                  variant={"outline"}
                  className="ms-auto rounded-lg bg-transparent border-2 border-background text-background text-sm font-bold px-3 h-[30px] sm:px-5 sm:h-[40px] sm:text-base"
                >
                  Shop now
                </Button>
              </div>
              <p className="font-bold text-xl leading-[1.1] text-background whitespace-pre-line text-end xs:text-2xl sm:text-4xl lg:text-5xl">
                {"Embrace Elegance, \nEmbody Timelessness."}
              </p>
            </div>
            <div className="absolute w-full h-full opacity-50 backdrop-blur-[10px]"></div>
            <div className="w-full h-[200px] sm:h-[250px] md:h-[300px] lg:h-[400px]"></div>
          </div>
        </div>

        <div className="w-11/12 mx-auto lg:w-9/12">
          <p className="text-center text-base whitespace-pre-line sm:whitespace-normal xs:text-lg sm:text-xl lg:text-2xl">
            {'Find Your Signature Style \nin Our Array of Curated Collections.'}
          </p>
          <div className="flex flex-col justify-center mt-4 gap-2 sm:gap-4 md:flex-row lg:mt-10">
            <div className="flex w-full">
              <CategoryNavigationCard
                imageSrc={"/landing-page/images/collection-thumbnail.png"}
                classNames={{ image: "h-[100px] w-full md:h-full", base: "w-full" }}
                label={"Collection"}
              />
            </div>
            <div className="flex flex-row gap-2 sm:gap-4 md:flex-col w-full">
              <CategoryNavigationCard
                imageSrc={"/landing-page/images/earring-thumbnail.png"}
                classNames={{ image: "h-[100px] w-full md:h-[200px]", base: "w-full" }}
                label={"Earrings"}
              />
              <CategoryNavigationCard
                imageSrc={"/landing-page/images/necklace-thumbnail.png"}
                classNames={{ image: "h-[100px] w-full md:h-[250px]", base: "w-full" }}
                label={"Necklaces"}
              />
            </div>
            <div className="flex flex-row gap-2 sm:gap-4 md:flex-col w-full">
              <CategoryNavigationCard
                imageSrc={"/landing-page/images/ring-thumbnail.png"}
                classNames={{ image: "h-[100px] w-full md:h-[250px]", base: "w-full" }}
                label={"Rings"}
              />
              <CategoryNavigationCard
                imageSrc={"/landing-page/images/bracelet-thumbnail.png"}
                classNames={{ image: "h-[100px] w-full md:h-[200px]", base: "w-full" }}
                label={"Bracelets"}
              />
            </div>
          </div>
        </div>

        <div className="h-[50em]"></div>
      </div>
    </>
  );
}
