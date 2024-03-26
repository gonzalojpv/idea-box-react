import { type ReactNode } from "react";

interface HintBoxProps {
  mode: "hint";
  children: ReactNode;
}

interface WarningBoxProps {
  mode: "warning";
  severity: "low" | "medium" | "high";
  children: ReactNode;
}

type InfoBoxProps = HintBoxProps | WarningBoxProps;

const InfoBox = (props: InfoBoxProps) => {
  const { mode, children } = props;

  if (mode === "hint") {
    return (
      <aside className="infobox infobox-hint">
        <p>{children}</p>
      </aside>
    );
  }

  const { severity } = props;

  return (
    <aside className={`p-2 my-8 text-center rounded shadow infobox-warning warning--${severity}`}>
      <h2 className="my-2 text-2xl font-bold">Warning</h2>
      <p className="text-base">{children}</p>
    </aside>
  );
};

export default InfoBox;
