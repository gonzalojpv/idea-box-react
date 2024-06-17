import { ComponentPropsWithRef } from "react";

type ButtonProps = ComponentPropsWithRef<"button"> & { href?: never };

type AnchorProps = ComponentPropsWithRef<"a"> & { href?: string };

// Type predicates & Facing TypeScript
function isAnchorProps(props: AnchorProps | ButtonProps): props is AnchorProps {
  return "href" in props;
}

const BaseButton = (props: AnchorProps | ButtonProps) => {
  if (isAnchorProps(props)) {
    return <a className="underline inline-block" {...props}></a>;
  }

  return (
    <button
      className="px-2 py-1 rounded-md border border-teal-500 bg-teal-500 text-white cursor-pointer transition duration-300 ease-in-out hover:bg-teal-600 hover:border-teal-600 focus:outline-none focus:ring focus:ring-teal-300 focus:ring-opacity-50"
      {...props}
    ></button>
  );
};

export default BaseButton;
