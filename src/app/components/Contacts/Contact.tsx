import React from "react";

type LinkItem = {
  title: string;
  href: string;
};

const Contact: React.FC = () => {
  const links: LinkItem[] = [
    { title: "<Email/>", href: "mailto:anubhavbng4@gmail.com" },
    { title: "<Github/>", href: "https://github.com/4nubhav-v" },
    { title: "<LinkedIn/>", href: "https://www.linkedin.com/in/4nubhav/" },
  ];

  return (
    <div className="bg-gb-bg-light dark:bg-black" id="contact">
      <div className="mx-auto h-screen max-w-7xl px-8 py-4">
        <h1
          className="my-36 text-center text-7xl font-bold tracking-tight [text-shadow:0_4px_8px_rgba(0_0_0/0.2)] dark:[text-shadow:0_4px_8px_rgba(255_255_255/0.4)]"
          id="contacts"
        >
          Contacts
        </h1>
        <div className="flex justify-center">
          <ul className="h-4xl flex w-4xl items-center justify-center gap-x-8 gap-y-4 p-4 text-center">
            {links.map((link) => (
              <li key={link.href} className="text-2xl font-semibold">
                <a
                  href={link.href}
                  target="_blank"
                  className="text-black transition duration-300 hover:[text-shadow:0_4px_8px_rgba(0_0_0/0.4)] dark:text-white hover:dark:[text-shadow:0_4px_8px_rgba(255_255_255/0.8)]"
                >
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
