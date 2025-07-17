import { getContactItems, getContactPage } from "@/sanity/queries";
import { ContactItem } from "@/types/sanity.types";
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/urlFor";
export const revalidate = 300;

export default async function Contact() {
  const [contactItems, contactPage] = await Promise.all([
    getContactItems(),
    getContactPage(),
  ]);

  return (
    <div className="flex w-full flex-col justify-start gap-8 p-4 text-base sm:p-6 sm:text-lg md:p-8 lg:flex-row lg:gap-16 lg:px-24">
      <div className="flex flex-col gap-4 sm:gap-6">
        {contactItems.map((item: ContactItem) => (
          <div className="flex flex-col gap-1 sm:gap-2" key={item._id}>
            <span className="text-sm font-bold sm:text-base">{item.name}:</span>{" "}
            {item.link ? (
              <Link
                href={item.link}
                className="text-sm break-all underline sm:text-base"
                target="_blank"
                rel="noopener noreferrer"
              >
                {item.displayedAs || item.link}
              </Link>
            ) : (
              <span className="text-sm sm:text-base">{item.displayedAs}</span>
            )}
          </div>
        ))}
      </div>
      {contactPage?.image && (
        <div className="mt-6 lg:mt-0 lg:mb-8">
          <Image
            src={urlFor(contactPage.image).url()}
            alt="Contact page image"
            width={600}
            height={400}
            className="h-auto w-full max-w-full rounded-lg"
          />
        </div>
      )}
    </div>
  );
}
