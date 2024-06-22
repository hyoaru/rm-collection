import Image from "next/image";

// App imports
import CategoryNavigationCard from "@components/index/CategoryNavigationCard";
import DiscountedProductsFeed from "@components/index/DiscountedProductsFeed";
import LatestProductsFeed from "@components/index/LatestProductsFeed";
import { AuroraBackground } from "@components/ui/aurora-background";
import { Button } from "@components/ui/button";
import BaseContainer from "@components/base/layout/BaseContainer";

export default function Home() {
  return (
    <>
      <div className="">
        <div className="mx-auto pb-4 ">
          <div className="relative w-full h-full shadow-[rgba(137,_24,_31,_0.05)_0px_30px_90px]">
            <div className="absolute w-full bottom-0 right-0 z-10">
              <BaseContainer>
                <div className="mb-8 xs:mb-6 sm:mb-10 lg:mb-14 px-2">
                  <div className="flex mb-4">
                    <Button
                      variant={"outline"}
                      className="ms-auto rounded-md backdrop-blur-md bg-transparent border-primary text-primary font-bold px-3 h-[25px] sm:px-5 sm:h-[30px] md:h-[40px] sm:text-base"
                    >
                      Shop now
                    </Button>
                  </div>
                  <p className="font-bold text-lg leading-[1.1] text-primary whitespace-pre-line text-end sm:text-2xl md:text-4xl">
                    {"Embrace Elegance, \nEmbody Timelessness."}
                  </p>
                </div>
              </BaseContainer>
            </div>
            <AuroraBackground className="absolute w-full h-full opacity-85"> </AuroraBackground>
            <div className="absolute w-full h-full opacity-30 backdrop-blur-[5px]"></div>
            <Image
              className="w-full object-cover h-[250px] sm:h-[300px] md:h-[350px] lg:h-[520px]"
              src={"/landing-page/images/main-banner.png"}
              quality={100}
              priority={true}
              width={2000}
              height={1000}
              alt=""
            />
          </div>
        </div>

        <BaseContainer>
          <div className="mx-auto sm:w-11/12 lg:w-11/12 my-12 sm:my-16 md:my-20 lg:my-32">
            <div className="space-y-10 sm:space-y-16 md:space-y-20 lg:space-y-32">
              <div className="">
                <p className="text-base text-center sm:text-xl lg:text-2xl">
                  {"Find Your Signature Style \nin Our Array of Curated Collections."}
                </p>
                <div className="grid grid-rows-2 grid-cols-2 md:grid-cols-3 gap-4 mt-4 md:h-[25rem] lg:mt-10">
                  <div className="col-span-full md:col-span-1 md:row-span-full rounded-md overflow-hidden">
                    <CategoryNavigationCard
                      link="/collection"
                      imageSrc={"/landing-page/images/collection-thumbnail.png"}
                      classNames={{ image: "w-full h-[120px] md:h-full", base: "w-full" }}
                      label={"Collection"}
                    />
                  </div>
                  <div className="rounded-md overflow-hidden">
                    <CategoryNavigationCard
                      link="/collection/earrings"
                      imageSrc={"/landing-page/images/earring-thumbnail.png"}
                      classNames={{ image: "w-full h-[120px] md:h-full", base: "w-full" }}
                      label={"Earrings"}
                    />
                  </div>
                  <div className="rounded-md overflow-hidden">
                    <CategoryNavigationCard
                      link="/collection/necklaces"
                      imageSrc={"/landing-page/images/necklace-thumbnail.png"}
                      classNames={{ image: "w-full h-[120px] md:h-full", base: "w-full" }}
                      label={"Necklaces"}
                    />
                  </div>
                  <div className="rounded-md overflow-hidden">
                    <CategoryNavigationCard
                      link="/collection/rings"
                      imageSrc={"/landing-page/images/ring-thumbnail.png"}
                      classNames={{ image: "w-full h-[120px] md:h-full", base: "w-full" }}
                      label={"Rings"}
                    />
                  </div>
                  <div className="rounded-md overflow-hidden">
                    <CategoryNavigationCard
                      link="/collection/rings"
                      imageSrc={"/landing-page/images/bracelet-thumbnail.png"}
                      classNames={{ image: "w-full h-[120px] md:h-full", base: "w-full" }}
                      label={"Bracelets"}
                    />
                  </div>
                </div>
              </div>
              <div className="mx-auto">
                <p className="text-base text-center mb-4 lg:mb-10 sm:text-xl lg:text-2xl">
                  {"Discover the Latest Additions to the Collection."}
                </p>
                <LatestProductsFeed />
              </div>
              <div className="mx-auto">
                <p className="mb-4 lg:mb-10 text-center text-base sm:text-xl lg:text-2xl">
                  {"Explore Our Range of Discounted Deals."}
                </p>
                <DiscountedProductsFeed />
              </div>
              <div className="mx-auto text-center">
                <p className="text-lg font-bold whitespace-pre-line xs:whitespace-normal sm:text-xl lg:text-2xl">
                  {"Rea Mariz Collection Co.Ltd."}
                </p>
                <p className="text-xs sm:text-sm lg:mt-1 lg:text-xl">
                  {"Empowering Your Choices with Diverse Collections Since 2019."}
                </p>
              </div>
            </div>
          </div>

          <div className="h-[50em]"></div>
        </BaseContainer>
      </div>
    </>
  );
}
