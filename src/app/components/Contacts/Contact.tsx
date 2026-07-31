import React from "react";

type LinkItem = {
  title: string;
  href: string;
};

const Contact: React.FC = () => {
  const links: LinkItem[] = [
    { title: "Email", href: "mailto:anubhavbng4@gmail.com" },
    { title: "Github", href: "https://github.com/4nubhav-v" },
    { title: "LinkedIn", href: "https://www.linkedin.com/in/4nubhav/" },
  ];

  return (
    <div className="bg-black">
      <div className="mx-auto h-screen max-w-7xl px-8 py-4">
        <h1
          className="my-36 text-center text-7xl font-bold tracking-tight"
          id="contacts"
        >
          Contacts
        </h1>
        <div className="flex justify-center">
          <ul className="h-4xl flex w-4xl flex-col gap-4 p-4 text-center">
            {links.map((link) => (
              <li
                key={link.href}
                className="text-2xl font-semibold hover:text-green-400"
              >
                <a href={link.href} target="_blank">
                  {link.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Contact;
