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
    <div className="flex w-full justify-start gap-16 p-8 px-24 text-lg">
      <div className="flex flex-col gap-6">
        {contactItems.map((item: ContactItem) => (
          <div className="flex flex-col gap-2" key={item._id}>
            <span className="font-bold">{item.name}:</span>{" "}
            {item.link ? (
              <Link
                href={item.link}
                className="underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {item.displayedAs || item.link}
              </Link>
            ) : (
              <span>{item.displayedAs}</span>
            )}
          </div>
        ))}
      </div>
      {contactPage?.image && (
        <div className="mb-8">
          <Image
            src={urlFor(contactPage.image).url()}
            alt="Contact page image"
            width={600}
            height={400}
          />
        </div>
      )}
    </div>
  );
}
