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

  return <button className="bg-gray-500 p-2 inline-block" {...props}></button>;
};

export default BaseButton;
