import { useRef } from "react";

import { useTimersContext } from "@/contexts/timers-context.tsx";
import BaseButton from "../BaseButton/index.tsx";
import BaseInput from "../BaseInput/index.tsx";
import BaseForm, { type FormHandle } from "../BaseForm/index.tsx";

export default function TimerAdd() {
  const form = useRef<FormHandle>(null);
  const { addTimer } = useTimersContext();

  function handleSaveTimer(data: unknown) {
    const extractedData = data as { name: string; duration: string };
    addTimer({ name: extractedData.name, duration: +extractedData.duration });
    form.current?.clear();
  }

  return (
    <BaseForm
      ref={form}
      onSave={handleSaveTimer}
      id="add-timer"
      className="max-w-20rem mx-auto mt-12 text-center"
    >
      <BaseInput type="text" label="Name" id="name" />
      <BaseInput type="number" label="Duration" id="duration" />
      <p>
        <BaseButton>Add Timer</BaseButton>
      </p>
    </BaseForm>
  );
}
