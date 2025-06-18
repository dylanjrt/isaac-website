import { getContactItems } from "@/sanity/queries";
import { ContactItem } from "@/types/sanity.types";
import Link from "next/link";

export default async function Contact() {
  const contactItems: ContactItem[] = await getContactItems();

  return (
    <div className="flex w-full max-w-4xl flex-col gap-8 p-12">
      <div className="flex flex-col gap-6">
        {contactItems.map((item) => (
          <div key={item._id}>
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
    </div>
  );
}
