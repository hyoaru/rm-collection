import Image from "next/image";

// App imports
import CategoryNavigationCard from "@components/index/CategoryNavigationCard";
import LatestProductsFeed from "@components/index/LatestProductsFeed";
import DiscountedProductsFeed from "@components/index/DiscountedProductsFeed";
import { Button } from "@components/ui/button";

export default function Home() {
  return (
    <>
      <div className="space-y-12 sm:space-y-16 md:space-y-20 lg:space-y-24">
        <div className="mx-auto py-4 ">
          <div className="relative rounded-xl overflow-hidden shadow-[rgba(137,_24,_31,_0.15)_0px_30px_90px]">
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
            {/* <div className="absolute w-full h-full opacity-20 bg-gradient-to-r from-primary to-background"></div> */}
            <Image
              className="w-full object-cover h-[200px] sm:h-[250px] md:h-[300px] lg:h-[400px]"
              src={"/landing-page/images/main-banner.png"}
              quality={100}
              priority={true}
              width={2000}
              height={500}
              alt=""
            />
          </div>
        </div>

        <div className="mx-auto sm:w-11/12 lg:w-9/12">
          <p className="text-center text-base text-primary whitespace-pre-line xs:whitespace-normal xs:text-lg sm:text-xl lg:text-2xl">
            {"Find Your Signature Style \nin Our Array of Curated Collections."}
          </p>
          <div className="flex flex-col justify-center mt-4 gap-2 sm:gap-6 md:flex-row lg:mt-10">
            <div className="flex w-full">
              <CategoryNavigationCard
                link="/collection"
                imageSrc={"/landing-page/images/collection-thumbnail.png"}
                classNames={{ image: "h-[100px] w-full md:h-full", base: "w-full" }}
                label={"Collection"}
              />
            </div>
            <div className="flex flex-row gap-2 sm:gap-4 md:flex-col w-full">
              <CategoryNavigationCard
                link="/collection/earrings"
                imageSrc={"/landing-page/images/earring-thumbnail.png"}
                classNames={{ image: "h-[100px] w-full md:h-[200px]", base: "w-full" }}
                label={"Earrings"}
              />
              <CategoryNavigationCard
                link="/collection/necklaces"
                imageSrc={"/landing-page/images/necklace-thumbnail.png"}
                classNames={{ image: "h-[100px] w-full md:h-[250px]", base: "w-full" }}
                label={"Necklaces"}
              />
            </div>
            <div className="flex flex-row gap-2 sm:gap-4 md:flex-col w-full">
              <CategoryNavigationCard
                link="/collection/rings"
                imageSrc={"/landing-page/images/ring-thumbnail.png"}
                classNames={{ image: "h-[100px] w-full md:h-[250px]", base: "w-full" }}
                label={"Rings"}
              />
              <CategoryNavigationCard
                link="/collection/rings"
                imageSrc={"/landing-page/images/bracelet-thumbnail.png"}
                classNames={{ image: "h-[100px] w-full md:h-[200px]", base: "w-full" }}
                label={"Bracelets"}
              />
            </div>
          </div>
        </div>

        <div className="mx-auto">
          <p className="text-center text-base text-primary whitespace-pre-line xs:whitespace-normal xs:text-lg sm:text-xl lg:text-4xl">
            {"Discover the latest additions to the collection."}
          </p>

          <LatestProductsFeed />
        </div>

        <div className="mx-auto">
          <p className="text-center text-base text-primary whitespace-pre-line xs:whitespace-normal xs:text-lg sm:text-xl lg:text-4xl">
            {"Explore our range of discounted deals."}
          </p>

          <DiscountedProductsFeed />
        </div>

        <div className="mx-auto text-center text-primary">
          <p className="text-lg font-bold text-primary whitespace-pre-line xs:whitespace-normal sm:text-xl lg:text-4xl">
            {"Rea Mariz Collection Co.Ltd."}
          </p>
          <p className="text-xs sm:text-sm lg:mt-1 lg:text-xl">
            {'Empowering Your Choices with Diverse Collections Since 2019.'}
          </p>
        </div>

        <div className="h-[50em]"></div>
      </div>
    </>
  );
}
